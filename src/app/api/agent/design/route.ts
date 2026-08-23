import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { runDesignAssistant } from "@/lib/agent/design-assistant";
import {
  createDesignTools,
  designDraftSchema,
  getDesignModelId,
  getDesignSystemPrompt,
  isAiGatewayConfigured,
  type DesignDraft,
} from "@/lib/agent/design-tools";

export const maxDuration = 30;
export const runtime = "nodejs";

const requestSchema = z.object({
  messages: z.array(z.any()).optional(),
  message: z.string().trim().min(1).max(500).optional(),
  draft: designDraftSchema.partial().optional(),
});

function normalizeDraft(partial?: Partial<DesignDraft>): DesignDraft {
  const parsed = designDraftSchema.safeParse({
    text: partial?.text ?? "",
    stain: partial?.stain ?? "woodBackground",
    size: partial?.size ?? "medium",
  });
  if (parsed.success) return parsed.data;
  return { text: "", stain: "woodBackground", size: "medium" };
}

function legacyFallback(message: string, draft: DesignDraft) {
  const result = runDesignAssistant(message, draft);
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 },
    );
  }

  const draft = normalizeDraft(parsed.data.draft);

  // Legacy single-shot JSON path (tests / no gateway)
  if (parsed.data.message && !parsed.data.messages?.length) {
    if (!isAiGatewayConfigured()) {
      return legacyFallback(parsed.data.message, draft);
    }
  }

  const uiMessages = (parsed.data.messages ?? []) as UIMessage[];

  if (!uiMessages.length && parsed.data.message) {
    // Upgrade legacy call into a one-shot UI message stream when gateway is on
    uiMessages.push({
      id: crypto.randomUUID(),
      role: "user",
      parts: [{ type: "text", text: parsed.data.message }],
    } as UIMessage);
  }

  if (!uiMessages.length) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  if (!isAiGatewayConfigured()) {
    const lastUser = [...uiMessages].reverse().find((m) => m.role === "user");
    const textPart = lastUser?.parts?.find((p) => p.type === "text");
    const text =
      textPart && "text" in textPart ? String(textPart.text) : "Help me design a sign.";
    return legacyFallback(text, draft);
  }

  try {
    const result = streamText({
      model: getDesignModelId(),
      system: getDesignSystemPrompt(draft),
      messages: await convertToModelMessages(uiMessages),
      tools: createDesignTools(draft),
      stopWhen: stepCountIs(5),
      temperature: 0.4,
      maxOutputTokens: 600,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Design copilot failed:", error);
    return NextResponse.json(
      {
        error:
          "Design Copilot is temporarily unavailable. Check AI Gateway credentials.",
      },
      { status: 502 },
    );
  }
}
