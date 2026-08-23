import { woods } from "@/content/catalog";
import { CUSTOM_SIGN_PRICE_CENTS, getChargeAmountCents } from "@/lib/pricing";
import type { DesignDraft } from "@/lib/agent/design-tools";

export type { DesignDraft } from "@/lib/agent/design-tools";

export type AgentToolCall = {
  tool: "listWoods" | "quoteSign" | "suggestDesign";
  input: Record<string, string>;
  output: unknown;
};

export type AgentResponse = {
  reply: string;
  draft: DesignDraft;
  quoteCents: number;
  tools: AgentToolCall[];
};

const stainAliases: Record<string, DesignDraft["stain"]> = {
  walnut: "amerBlackWalnut",
  "black walnut": "amerBlackWalnut",
  ash: "amerWhiteAsh",
  "white ash": "amerWhiteAsh",
  zebra: "zebrano",
  zebrano: "zebrano",
  oak: "redOak",
  "red oak": "redOak",
  cherry: "americanCherry",
  "american cherry": "americanCherry",
  natural: "woodBackground",
};

function listWoods(query?: string) {
  const needle = query?.trim().toLowerCase();
  const matches = needle
    ? woods.filter((wood) =>
        `${wood.name} ${wood.characteristics} ${wood.facts}`.toLowerCase().includes(needle),
      )
    : woods;
  return matches.map((wood) => ({
    id: wood.id,
    name: wood.name,
    pricing: wood.pricing,
    facts: wood.facts,
  }));
}

function quoteSign(itemCount = 1) {
  return {
    itemCount,
    unitPriceCents: CUSTOM_SIGN_PRICE_CENTS,
    totalCents: getChargeAmountCents(Math.max(1, itemCount)),
  };
}

function suggestDesign(message: string, draft: DesignDraft): DesignDraft {
  const lower = message.toLowerCase();
  const next = { ...draft };

  for (const [alias, stain] of Object.entries(stainAliases)) {
    if (lower.includes(alias)) {
      next.stain = stain;
      break;
    }
  }

  if (lower.includes("small")) next.size = "small";
  if (lower.includes("medium")) next.size = "medium";
  if (lower.includes("large") || lower.includes("big")) next.size = "large";

  const quoted = message.match(/"([^"]{2,80})"/);
  if (quoted?.[1]) {
    next.text = quoted[1];
  } else if (!next.text && /family|welcome|name/i.test(message)) {
    next.text = "The Family Name";
  }

  return next;
}

/** Deterministic fallback used when AI Gateway is not configured (and in unit tests). */
export function runDesignAssistant(
  message: string,
  draft: DesignDraft,
): AgentResponse {
  const tools: AgentToolCall[] = [];
  const woodQuery = message.match(
    /\b(oak|walnut|ash|cherry|maple|pine|sapele|zebrano|zebra)\b/i,
  )?.[1];

  const woodsResult = listWoods(woodQuery);
  tools.push({
    tool: "listWoods",
    input: { query: woodQuery ?? "" },
    output: woodsResult.slice(0, 3),
  });

  const nextDraft = suggestDesign(message, draft);
  tools.push({
    tool: "suggestDesign",
    input: { message },
    output: nextDraft,
  });

  const quote = quoteSign(1);
  tools.push({
    tool: "quoteSign",
    input: { itemCount: "1" },
    output: quote,
  });

  const woodName = woodsResult[0]?.name ?? "the selected hardwood";
  const reply = [
    `I would cut this as a ${nextDraft.size} sign in ${woodName}.`,
    nextDraft.text ? `Text: "${nextDraft.text}".` : "Add the exact wording you want on the sign.",
    `Quoted price is $${(quote.totalCents / 100).toFixed(2)} before shipping.`,
    "This assistant only calls local catalog and pricing tools. It never receives payment credentials.",
  ].join(" ");

  return {
    reply,
    draft: nextDraft,
    quoteCents: quote.totalCents,
    tools,
  };
}
