"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function SeedKnowledgeButton() {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);

  async function handleSeed() {
    setPending(true);
    try {
      const response = await fetch("/api/agent/seed-knowledge", { method: "POST" });
      const data = (await response.json()) as {
        error?: string;
        upserted?: number;
        embeddingModel?: string;
      };
      if (!response.ok) {
        toast({
          title: "Seed failed",
          description: data.error ?? "Could not seed knowledge.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Knowledge base seeded",
        description: `${data.upserted ?? 0} chunks embedded with ${data.embeddingModel}.`,
      });
    } catch {
      toast({
        title: "Seed failed",
        description: "Network error while seeding.",
        variant: "destructive",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <Button type="button" onClick={handleSeed} disabled={pending}>
      {pending ? "Embedding…" : "Seed RAG knowledge"}
    </Button>
  );
}
