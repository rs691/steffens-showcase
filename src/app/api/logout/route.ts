import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function POST() {
  if (isSupabaseConfigured()) {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();
  }
  return NextResponse.json({ success: true });
}
