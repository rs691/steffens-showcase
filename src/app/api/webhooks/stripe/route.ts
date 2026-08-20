import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getSupabaseServiceRoleKey } from "@/lib/supabase/env";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing Stripe webhook signature or STRIPE_WEBHOOK_SECRET." },
      { status: 400 },
    );
  }

  const payload = await request.text();
  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (getSupabaseServiceRoleKey()) {
      const supabase = createAdminSupabaseClient();
      const userId = session.metadata?.userId || null;
      let items: unknown = [];
      try {
        items = JSON.parse(session.metadata?.items || "[]");
      } catch {
        items = [];
      }
      const { error } = await supabase.from("orders").upsert(
        {
          stripe_session_id: session.id,
          user_id: userId || null,
          email: session.customer_email,
          amount_cents: session.amount_total ?? 0,
          total_amount: (session.amount_total ?? 0) / 100,
          status: session.payment_status ?? "paid",
          items,
        },
        { onConflict: "stripe_session_id" },
      );
      if (error) {
        console.error("Failed to persist order:", error);
        return NextResponse.json({ error: "Order persist failed." }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
