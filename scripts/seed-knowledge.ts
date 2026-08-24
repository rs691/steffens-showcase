/**
 * Seed RAG knowledge chunks into Supabase.
 * Usage: npx tsx --env-file=.env.local scripts/seed-knowledge.ts
 */
import { seedKnowledgeChunks } from "../src/lib/agent/rag";

async function main() {
  const result = await seedKnowledgeChunks();
  console.log(
    `Seeded ${result.upserted} chunks with model ${result.embeddingModel}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
