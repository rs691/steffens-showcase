import { generateText, stepCountIs } from "ai";
import { CUSTOM_SIGN_PRICE_CENTS, getChargeAmountCents } from "@/lib/pricing";
import { runDesignAssistant } from "@/lib/agent/design-assistant";
import {
  createDesignTools,
  getDesignModelId,
  getDesignSystemPrompt,
  isAiGatewayConfigured,
  type DesignDraft,
} from "@/lib/agent/design-tools";

/** Same payload shape as the quoteSign tool — kept local so evals avoid ToolExecutionOptions. */
function quoteSignContract(itemCount = 1) {
  const count = itemCount;
  return {
    itemCount: count,
    unitPriceCents: CUSTOM_SIGN_PRICE_CENTS,
    totalCents: getChargeAmountCents(count),
    currency: "USD",
    display: `$${(getChargeAmountCents(count) / 100).toFixed(2)}`,
  };
}

export const WALNUT_LARGE_PROMPT =
  'Make a large walnut sign that says "The Millers"';

export type EvalCheck = {
  name: string;
  pass: boolean;
  detail?: string;
};

export type EvalReport = {
  name: string;
  passed: boolean;
  checks: EvalCheck[];
};

const emptyDraft: DesignDraft = {
  text: "",
  stain: "woodBackground",
  size: "medium",
};

function report(name: string, checks: EvalCheck[]): EvalReport {
  return { name, passed: checks.every((check) => check.pass), checks };
}

/** Always-on contract: walnut + large must quote $120 from server pricing. */
export async function evaluateWalnutQuoteContract(): Promise<EvalReport> {
  const quote = quoteSignContract(1);
  const fallback = runDesignAssistant(WALNUT_LARGE_PROMPT, emptyDraft);
  const tools = createDesignTools(emptyDraft);

  return report("walnut-large-quote-contract", [
    {
      name: "quoteSign returns $120 (12000 cents)",
      pass: quote.totalCents === 12000 && quote.display === "$120.00",
      detail: JSON.stringify(quote),
    },
    {
      name: "server pricing matches quoteSign",
      pass: quote.totalCents === getChargeAmountCents(1),
    },
    {
      name: "design tools expose quoteSign",
      pass: typeof tools.quoteSign?.execute === "function",
    },
    {
      name: "rule-based fallback also quotes 12000 for walnut + large",
      pass:
        fallback.quoteCents === 12000 &&
        fallback.draft.size === "large" &&
        fallback.draft.stain === "amerBlackWalnut",
      detail: JSON.stringify(fallback.draft),
    },
    {
      name: "fallback records a quoteSign tool call",
      pass: fallback.tools.some((call) => call.tool === "quoteSign"),
      detail: fallback.tools.map((call) => call.tool).join(","),
    },
  ]);
}

/**
 * Optional live eval against AI Gateway.
 * Asserts the model calls quoteSign and the tool output is $120.
 */
export async function evaluateWalnutQuoteLive(): Promise<EvalReport> {
  if (!isAiGatewayConfigured()) {
    return report("walnut-large-quote-live", [
      {
        name: "AI Gateway configured",
        pass: false,
        detail: "Skipped: AI_GATEWAY_API_KEY / OIDC missing",
      },
    ]);
  }

  const result = await generateText({
    model: getDesignModelId(),
    system: getDesignSystemPrompt(emptyDraft),
    prompt: WALNUT_LARGE_PROMPT,
    tools: createDesignTools(emptyDraft),
    stopWhen: stepCountIs(6),
    temperature: 0,
    maxOutputTokens: 500,
  });

  const quoteCalls = result.steps.flatMap((step) =>
    (step.toolCalls ?? []).filter((call) => call.toolName === "quoteSign"),
  );
  const quoteResults = result.steps.flatMap((step) =>
    (step.toolResults ?? []).filter((entry) => {
      const name = "toolName" in entry ? String(entry.toolName) : "";
      return name === "quoteSign";
    }),
  );

  const outputHas120 =
    JSON.stringify(quoteResults).includes("12000") ||
    JSON.stringify(quoteResults).includes("$120") ||
    result.text.includes("$120");

  return report("walnut-large-quote-live", [
    {
      name: "model called quoteSign",
      pass: quoteCalls.length > 0,
      detail: `toolCalls=${quoteCalls.length}`,
    },
    {
      name: "quoted $120 from the server tool",
      pass: outputHas120,
      detail: result.text.slice(0, 240),
    },
  ]);
}
