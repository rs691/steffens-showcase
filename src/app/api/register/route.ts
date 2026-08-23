import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const registerSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  name: z.string().trim().max(80).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid registration data." },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase();
  const displayName =
    parsed.data.name?.trim() || email.split("@")[0] || "member";

  try {
    const admin = createAdminSupabaseClient();
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password: parsed.data.password,
      email_confirm: true,
      user_metadata: { full_name: displayName, username: email },
    });

    if (createError) {
      const conflict = /already|registered|exists/i.test(createError.message);
      return NextResponse.json(
        {
          error: conflict
            ? "An account with that email already exists."
            : createError.message,
        },
        { status: conflict ? 409 : 400 },
      );
    }

    if (created.user) {
      const { error: profileError } = await admin.from("users").upsert(
        {
          id: created.user.id,
          email,
          full_name: displayName,
          username: email.split("@")[0],
          is_admin: false,
        },
        { onConflict: "id" },
      );
      if (profileError) {
        console.error("Profile upsert failed:", profileError);
      }
    }

    const supabase = await createServerSupabaseClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: parsed.data.password,
    });

    if (signInError) {
      return NextResponse.json(
        {
          message: "Account created. Please sign in.",
          signedIn: false,
        },
        { status: 201 },
      );
    }

    return NextResponse.json(
      { message: "Account created.", signedIn: true, email },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json(
      { error: "Could not create the account. Check Supabase keys." },
      { status: 500 },
    );
  }
}
