import { NextResponse } from "next/server";
import { z } from "zod";
import { runDesignAssistant, type DesignDraft } from "@/lib/agent/design-assistant";

const bodySchema = z.object({
  message: z.string().trim().min(1).max(500),
  draft: z
    .object({
      text: z.string(),
      stain: z.string(),
      size: z.enum(["small", "medium", "large"]),
    })
    .optional(),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid prompt." },
      { status: 400 },
    );
  }

  const draft: DesignDraft = {
    text: parsed.data.draft?.text ?? "",
    stain: parsed.data.draft?.stain ?? "woodBackground",
    size: parsed.data.draft?.size ?? "medium",
  };
  const result = runDesignAssistant(parsed.data.message, draft);

  return NextResponse.json(result);
}
