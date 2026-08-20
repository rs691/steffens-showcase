import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { getChargeAmountCents } from "@/lib/pricing";
import { getStripe } from "@/lib/stripe";

const itemSchema = z.object({
  text: z.string().trim().min(1).max(200),
  stain: z.string().trim().min(1).max(80),
  size: z.enum(["small", "medium", "large"]),
});

const bodySchema = z.object({
  items: z.array(itemSchema).min(1, "Cart is empty."),
  email: z.string().trim().email().optional(),
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
      { error: parsed.error.issues[0]?.message ?? "Invalid checkout payload." },
      { status: 400 },
    );
  }

  const user = await getCurrentUser();
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
  const amount = getChargeAmountCents(parsed.data.items.length);

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      customer_email: parsed.data.email ?? user?.email,
      success_url: `${origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      line_items: parsed.data.items.map((item) => ({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: amount / parsed.data.items.length,
          product_data: {
            name: "Custom Wooden Sign",
            description: `${item.size} · ${item.stain} · ${item.text}`,
          },
        },
      })),
      metadata: {
        userId: user?.id ?? "",
        itemCount: String(parsed.data.items.length),
        items: JSON.stringify(parsed.data.items),
      },
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (error) {
    console.error("Checkout session failed:", error);
    return NextResponse.json(
      { error: "Could not start Stripe Checkout. Check STRIPE_SECRET_KEY." },
      { status: 500 },
    );
  }
}
