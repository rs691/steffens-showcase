import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getSupabaseServiceRoleKey } from "@/lib/supabase/env";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  message: z.string().trim().min(10).max(2000),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check your name, email, and message." },
      { status: 400 },
    );
  }

  if (!getSupabaseServiceRoleKey()) {
    return NextResponse.json(
      { error: "Contact storage is not configured." },
      { status: 503 },
    );
  }

  try {
    const { error } = await createAdminSupabaseClient().from("inquiries").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    });
    if (error) {
      throw error;
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form failed:", error);
    return NextResponse.json(
      { error: "Could not save your message. Please try again." },
      { status: 500 },
    );
  }
}
