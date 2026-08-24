import assert from "node:assert/strict";
import test from "node:test";
import { buildKnowledgeCorpus, retrieveKnowledge } from "./rag";

test("knowledge corpus includes woods and FAQ content", () => {
  const corpus = buildKnowledgeCorpus();
  assert.ok(corpus.length >= 10);
  assert.ok(corpus.some((chunk) => chunk.source === "woods"));
  assert.ok(corpus.some((chunk) => chunk.source === "faq"));
  assert.ok(corpus.some((chunk) => chunk.title.toLowerCase().includes("sign")));
});

test("lexical RAG fallback retrieves outdoor wood guidance", async () => {
  const previousKey = process.env.AI_GATEWAY_API_KEY;
  const previousOidc = process.env.VERCEL_OIDC_TOKEN;
  delete process.env.AI_GATEWAY_API_KEY;
  delete process.env.VERCEL_OIDC_TOKEN;

  const chunks = await retrieveKnowledge("outdoor wood for signs");
  assert.ok(chunks.length > 0);
  assert.ok(
    chunks.some((chunk) =>
      `${chunk.title} ${chunk.content}`.toLowerCase().includes("outdoor"),
    ),
  );

  if (previousKey) process.env.AI_GATEWAY_API_KEY = previousKey;
  if (previousOidc) process.env.VERCEL_OIDC_TOKEN = previousOidc;
});
