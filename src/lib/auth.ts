import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type CurrentUser = {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("users")
    .select("username, full_name, is_admin, email")
    .eq("id", user.id)
    .maybeSingle();

  return {
    id: user.id,
    email: profile?.email ?? user.email ?? "",
    username:
      profile?.full_name ??
      (user.user_metadata?.full_name as string | undefined) ??
      profile?.username ??
      user.email?.split("@")[0] ??
      "member",
    isAdmin: Boolean(profile?.is_admin),
  };
}
