import type { DesignDraft } from "@/lib/agent/design-tools";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getSupabaseServiceRoleKey } from "@/lib/supabase/env";

export type AgentSessionWrite = {
  sessionId: string;
  feature?: string;
  messages: unknown[];
  draft?: Partial<DesignDraft>;
  toolCalls?: unknown[];
  userId?: string | null;
};

export async function upsertAgentSession(input: AgentSessionWrite): Promise<void> {
  if (!getSupabaseServiceRoleKey()) return;

  try {
    const admin = createAdminSupabaseClient();
    const { error } = await admin.from("agent_sessions").upsert(
      {
        id: input.sessionId,
        feature: input.feature ?? "design-copilot",
        messages: input.messages,
        draft: input.draft ?? {},
        tool_calls: input.toolCalls ?? [],
        user_id: input.userId ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );
    if (error) {
      console.error("Failed to upsert agent session:", error);
    }
  } catch (error) {
    console.error("Agent session persistence error:", error);
  }
}

export async function countRecentAgentSessions(hours = 24): Promise<number> {
  if (!getSupabaseServiceRoleKey()) return 0;
  try {
    const admin = createAdminSupabaseClient();
    const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
    const { count } = await admin
      .from("agent_sessions")
      .select("id", { count: "exact", head: true })
      .gte("updated_at", since);
    return count ?? 0;
  } catch {
    return 0;
  }
}
