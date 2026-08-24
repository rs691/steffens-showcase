import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { isAiGatewayConfigured } from "@/lib/agent/design-tools";
import { seedKnowledgeChunks } from "@/lib/agent/rag";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Admin-only: embed woods + FAQ + process docs into Supabase pgvector.
 * POST /api/agent/seed-knowledge
 */
export async function POST() {
  const user = await getCurrentUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Admin only." }, { status: 403 });
  }

  if (!isAiGatewayConfigured()) {
    return NextResponse.json(
      { error: "AI_GATEWAY_API_KEY (or Vercel OIDC) is required." },
      { status: 400 },
    );
  }

  try {
    const result = await seedKnowledgeChunks();
    return NextResponse.json({
      message: "Knowledge base seeded.",
      ...result,
    });
  } catch (error) {
    console.error("Knowledge seed failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to seed knowledge.",
      },
      { status: 500 },
    );
  }
}
