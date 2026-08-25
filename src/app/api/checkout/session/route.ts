import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { getProductById } from "@/lib/catalog";
import { CUSTOM_SIGN_PRICE_CENTS } from "@/lib/pricing";
import { getStripe } from "@/lib/stripe";

const customSignItemSchema = z.object({
  kind: z.literal("custom-sign"),
  text: z.string().trim().min(1).max(200),
  stain: z.string().trim().min(1).max(80),
  size: z.enum(["small", "medium", "large"]),
});

const productItemSchema = z.object({
  kind: z.literal("product"),
  productId: z.string().trim().min(1).max(80),
  text: z.string().trim().min(1).max(200),
});

const bodySchema = z.object({
  items: z
    .array(z.union([productItemSchema, customSignItemSchema]))
    .min(1, "Cart is empty."),
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

  try {
    const lineItems = [];
    const pricedMeta = [];

    for (const item of parsed.data.items) {
      if (item.kind === "product") {
        const product = await getProductById(item.productId);
        if (!product?.priceCents) {
          return NextResponse.json(
            { error: `"${item.text}" is commission-only and cannot be checked out online.` },
            { status: 400 },
          );
        }
        lineItems.push({
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: product.priceCents,
            product_data: {
              name: product.name,
              description: product.woodType
                ? `${product.category} · ${product.woodType}`
                : product.category,
            },
          },
        });
        pricedMeta.push({
          kind: "product",
          productId: product.id,
          text: product.name,
          amountCents: product.priceCents,
        });
      } else {
        lineItems.push({
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: CUSTOM_SIGN_PRICE_CENTS,
            product_data: {
              name: "Custom Wooden Sign",
              description: `${item.size} · ${item.stain} · ${item.text}`,
            },
          },
        });
        pricedMeta.push({
          kind: "custom-sign",
          text: item.text,
          stain: item.stain,
          size: item.size,
          amountCents: CUSTOM_SIGN_PRICE_CENTS,
        });
      }
    }

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      customer_email: parsed.data.email ?? user?.email,
      success_url: `${origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      line_items: lineItems,
      metadata: {
        userId: user?.id ?? "",
        itemCount: String(parsed.data.items.length),
        items: JSON.stringify(pricedMeta),
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
