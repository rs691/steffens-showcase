import { tool } from "ai";
import { z } from "zod";
import { woods } from "@/content/catalog";
import { CUSTOM_SIGN_PRICE_CENTS, getChargeAmountCents } from "@/lib/pricing";
import { retrieveKnowledge } from "@/lib/agent/rag";

export const designDraftSchema = z.object({
  text: z.string().max(120).describe("Exact wording for the sign"),
  stain: z
    .enum([
      "woodBackground",
      "amerBlackWalnut",
      "amerWhiteAsh",
      "zebrano",
      "redOak",
      "americanCherry",
    ])
    .describe("Wood stain id that matches the custom-sign form"),
  size: z.enum(["small", "medium", "large"]).describe("Physical sign size"),
});

export type DesignDraft = z.infer<typeof designDraftSchema>;

export const STAIN_LABELS: Record<DesignDraft["stain"], string> = {
  woodBackground: "Natural wood",
  amerBlackWalnut: "American Black Walnut",
  amerWhiteAsh: "American White Ash",
  zebrano: "Zebrano",
  redOak: "Red Oak",
  americanCherry: "American Cherry",
};

export function createDesignTools(currentDraft: DesignDraft) {
  return {
    retrieveKnowledge: tool({
      description:
        "Retrieve grounded shop knowledge (woods, FAQ, custom-sign process) via RAG. Use for process, timelines, outdoor wood advice, or FAQ-style questions before answering.",
      inputSchema: z.object({
        query: z.string().min(2).max(200).describe("What to look up in the knowledge base"),
        source: z
          .enum(["woods", "faq", "process"])
          .optional()
          .describe("Optional filter to one knowledge source"),
      }),
      execute: async ({ query, source }) => {
        const chunks = await retrieveKnowledge(query, {
          matchCount: 4,
          source,
        });
        return {
          query,
          count: chunks.length,
          chunks: chunks.map((chunk) => ({
            source: chunk.source,
            title: chunk.title,
            content: chunk.content.slice(0, 500),
            similarity: chunk.similarity,
          })),
        };
      },
    }),

    searchWoods: tool({
      description:
        "Search the shop wood catalog for species facts and pricing notes. Use before recommending a stain.",
      inputSchema: z.object({
        query: z
          .string()
          .optional()
          .describe("Optional wood name or keyword, e.g. walnut or outdoor"),
      }),
      execute: async ({ query }) => {
        const needle = query?.trim().toLowerCase();
        const matches = needle
          ? woods.filter((wood) =>
              `${wood.name} ${wood.characteristics} ${wood.pricing} ${wood.facts}`
                .toLowerCase()
                .includes(needle),
            )
          : woods;
        return matches.slice(0, 5).map((wood) => ({
          id: wood.id,
          name: wood.name,
          characteristics: wood.characteristics,
          pricing: wood.pricing,
          facts: wood.facts,
        }));
      },
    }),

    quoteSign: tool({
      description:
        "Return the authoritative custom-sign price from the server. Never invent a price.",
      inputSchema: z.object({
        itemCount: z
          .number()
          .int()
          .min(1)
          .max(10)
          .default(1)
          .describe("How many signs to quote"),
      }),
      execute: async ({ itemCount }) => {
        const count = itemCount ?? 1;
        return {
          itemCount: count,
          unitPriceCents: CUSTOM_SIGN_PRICE_CENTS,
          totalCents: getChargeAmountCents(count),
          currency: "USD",
          display: `$${(getChargeAmountCents(count) / 100).toFixed(2)}`,
        };
      },
    }),

    applyDesignDraft: tool({
      description:
        "Apply a complete design to the customer's live custom-sign form. Call this when you have text, stain, and size ready.",
      inputSchema: designDraftSchema,
      execute: async (draft) => {
        const merged: DesignDraft = {
          text: draft.text.trim() || currentDraft.text,
          stain: draft.stain,
          size: draft.size,
        };
        return {
          applied: true,
          draft: merged,
          stainLabel: STAIN_LABELS[merged.stain],
        };
      },
    }),
  };
}

export function getDesignSystemPrompt(draft: DesignDraft) {
  return [
    "You are the Design Copilot for Steffen's Showcase, a custom woodworking shop.",
    "Help customers design a custom wooden sign by using tools — never invent prices or wood IDs.",
    "Allowed stain ids: woodBackground, amerBlackWalnut, amerWhiteAsh, zebrano, redOak, americanCherry.",
    "Allowed sizes: small (12x8), medium (18x12), large (24x16).",
    "Workflow: retrieveKnowledge for FAQ/process/outdoor advice, searchWoods for stain picks, quoteSign for price, applyDesignDraft to update the live preview.",
    "Ground answers in retrieved knowledge when available. Keep replies concise (2–4 sentences).",
    "Do not mention API keys, Stripe secrets, or internal env vars.",
    `Current draft: text=${JSON.stringify(draft.text)}, stain=${draft.stain}, size=${draft.size}.`,
  ].join(" ");
}

export function getDesignModelId(): string {
  return process.env.AI_MODEL?.trim() || "openai/gpt-5-mini";
}

export function isAiGatewayConfigured(): boolean {
  return Boolean(
    process.env.AI_GATEWAY_API_KEY?.trim() ||
      process.env.VERCEL_OIDC_TOKEN?.trim(),
  );
}
