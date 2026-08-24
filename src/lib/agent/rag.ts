import { embed, embedMany } from "ai";
import { woods } from "@/content/catalog";
import { faqs, processDocs } from "@/content/faq";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getSupabaseServiceRoleKey } from "@/lib/supabase/env";

function isAiGatewayConfigured(): boolean {
  return Boolean(
    process.env.AI_GATEWAY_API_KEY?.trim() ||
      process.env.VERCEL_OIDC_TOKEN?.trim(),
  );
}

export type KnowledgeChunkInput = {
  source: string;
  title: string;
  content: string;
  metadata?: Record<string, string>;
};

export type RetrievedChunk = {
  id?: string;
  source: string;
  title: string;
  content: string;
  similarity?: number;
};

export function getEmbeddingModelId(): string {
  return process.env.AI_EMBEDDING_MODEL?.trim() || "openai/text-embedding-3-small";
}

export function buildKnowledgeCorpus(): KnowledgeChunkInput[] {
  const woodChunks: KnowledgeChunkInput[] = woods.map((wood) => ({
    source: "woods",
    title: wood.name,
    content: [
      `${wood.name} (${wood.origin}).`,
      wood.characteristics,
      `Pricing: ${wood.pricing}.`,
      wood.facts,
    ].join(" "),
    metadata: { woodId: wood.id },
  }));

  const faqChunks: KnowledgeChunkInput[] = [...faqs, ...processDocs].map((entry) => ({
    source: entry.question.toLowerCase().includes("sign") ? "process" : "faq",
    title: entry.question,
    content: `${entry.question} ${entry.answer}`,
  }));

  return [...woodChunks, ...faqChunks];
}

function lexicalRetrieve(query: string, limit = 5): RetrievedChunk[] {
  const tokens = query
    .toLowerCase()
    .split(/\W+/)
    .filter((token) => token.length > 2);
  const scored = buildKnowledgeCorpus().map((chunk) => {
    const hay = `${chunk.title} ${chunk.content}`.toLowerCase();
    const score = tokens.reduce(
      (sum, token) => sum + (hay.includes(token) ? 1 : 0),
      0,
    );
    return { chunk, score };
  });
  return scored
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ chunk, score }) => ({
      source: chunk.source,
      title: chunk.title,
      content: chunk.content,
      similarity: score / Math.max(tokens.length, 1),
    }));
}

export async function embedText(value: string): Promise<number[]> {
  const { embedding } = await embed({
    model: getEmbeddingModelId(),
    value,
  });
  return embedding;
}

export async function retrieveKnowledge(
  query: string,
  options?: { matchCount?: number; source?: string },
): Promise<RetrievedChunk[]> {
  const matchCount = options?.matchCount ?? 5;
  const trimmed = query.trim();
  if (!trimmed) return [];

  if (!isAiGatewayConfigured() || !getSupabaseServiceRoleKey()) {
    return lexicalRetrieve(trimmed, matchCount);
  }

  try {
    const embedding = await embedText(trimmed);
    const admin = createAdminSupabaseClient();
    const { data, error } = await admin.rpc("match_knowledge_chunks", {
      query_embedding: embedding,
      match_count: matchCount,
      filter_source: options?.source ?? null,
    });

    if (error || !data?.length) {
      return lexicalRetrieve(trimmed, matchCount);
    }

    return (data as Array<{
      id: string;
      source: string;
      title: string;
      content: string;
      similarity: number;
    }>).map((row) => ({
      id: row.id,
      source: row.source,
      title: row.title,
      content: row.content,
      similarity: row.similarity,
    }));
  } catch (error) {
    console.error("RAG retrieve failed, using lexical fallback:", error);
    return lexicalRetrieve(trimmed, matchCount);
  }
}

export async function seedKnowledgeChunks(): Promise<{
  upserted: number;
  embeddingModel: string;
}> {
  if (!isAiGatewayConfigured()) {
    throw new Error("AI Gateway is required to seed embeddings.");
  }
  if (!getSupabaseServiceRoleKey()) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required to seed knowledge.");
  }

  const corpus = buildKnowledgeCorpus();
  const { embeddings } = await embedMany({
    model: getEmbeddingModelId(),
    values: corpus.map((chunk) => chunk.content),
  });

  const admin = createAdminSupabaseClient();
  // Replace previous seed so re-runs stay clean
  await admin.from("knowledge_chunks").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  const rows = corpus.map((chunk, index) => ({
    source: chunk.source,
    title: chunk.title,
    content: chunk.content,
    metadata: chunk.metadata ?? {},
    embedding: embeddings[index],
  }));

  const { error } = await admin.from("knowledge_chunks").insert(rows);
  if (error) {
    throw new Error(error.message);
  }

  return { upserted: rows.length, embeddingModel: getEmbeddingModelId() };
}
