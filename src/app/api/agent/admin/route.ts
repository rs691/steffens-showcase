import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createAdminTools,
  getAdminSystemPrompt,
} from "@/lib/agent/admin-tools";
import {
  getDesignModelId,
  isAiGatewayConfigured,
} from "@/lib/agent/design-tools";
import { upsertAgentSession } from "@/lib/agent/sessions";
import { getCurrentUser } from "@/lib/auth";

export const maxDuration = 30;
export const runtime = "nodejs";

const requestSchema = z.object({
  messages: z.array(z.any()).optional(),
  sessionId: z.string().uuid().optional(),
});

function extractToolCalls(messages: UIMessage[]) {
  const calls: Array<{ tool: string; state?: string }> = [];
  for (const message of messages) {
    for (const part of message.parts ?? []) {
      if (typeof part.type === "string" && part.type.startsWith("tool-")) {
        calls.push({
          tool: part.type.replace(/^tool-/, ""),
          state: "state" in part ? String((part as { state?: string }).state) : undefined,
        });
      }
    }
  }
  return calls;
}

/**
 * Admin-only shop ops copilot.
 * Tools: summarizeOrders, summarizeInquiries (fixed selects — no raw SQL).
 */
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Admin only." }, { status: 403 });
  }

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

  if (!isAiGatewayConfigured()) {
    return NextResponse.json(
      { error: "AI_GATEWAY_API_KEY (or Vercel OIDC) is required." },
      { status: 503 },
    );
  }

  const uiMessages = (parsed.data.messages ?? []) as UIMessage[];
  if (!uiMessages.length) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const sessionId = parsed.data.sessionId;

  try {
    const result = streamText({
      model: getDesignModelId(),
      system: getAdminSystemPrompt(),
      messages: await convertToModelMessages(uiMessages),
      tools: createAdminTools(),
      stopWhen: stepCountIs(5),
      temperature: 0.2,
      maxOutputTokens: 600,
      onFinish: async ({ steps }) => {
        if (!sessionId) return;
        const toolCalls = steps.flatMap((step) =>
          (step.toolCalls ?? []).map((call) => ({
            tool: call.toolName,
            input: "input" in call ? call.input : undefined,
          })),
        );
        await upsertAgentSession({
          sessionId,
          feature: "admin-copilot",
          messages: uiMessages,
          toolCalls,
          userId: user.id,
        });
      },
    });

    return result.toUIMessageStreamResponse({
      onFinish: async ({ messages }) => {
        if (!sessionId) return;
        await upsertAgentSession({
          sessionId,
          feature: "admin-copilot",
          messages,
          toolCalls: extractToolCalls(messages),
          userId: user.id,
        });
      },
    });
  } catch (error) {
    console.error("Admin copilot failed:", error);
    return NextResponse.json(
      {
        error:
          "Admin Copilot is temporarily unavailable. Check AI Gateway credentials.",
      },
      { status: 502 },
    );
  }
}
