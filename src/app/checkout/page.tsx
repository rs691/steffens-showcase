"use client";

import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getStainLabel } from "@/lib/stain-labels";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { cart, totalPrice, totalItems } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (totalItems === 0) {
      router.replace("/cart");
    }
  }, [totalItems, router]);

  if (totalItems === 0) {
    return null;
  }

  async function handleCheckout() {
    setPending(true);
    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email || undefined,
          items: cart.map((item) =>
            item.kind === "product"
              ? {
                  kind: "product" as const,
                  productId: item.productId ?? "",
                  text: item.text || "Catalog piece",
                }
              : {
                  kind: "custom-sign" as const,
                  text: item.text || "Custom Sign",
                  stain: item.stain,
                  size: item.size as "small" | "medium" | "large",
                },
          ),
        }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout.");
      }
      window.location.href = data.url;
    } catch (error) {
      toast({
        title: "Checkout unavailable",
        description:
          error instanceof Error ? error.message : "Please try again shortly.",
        variant: "destructive",
      });
      setPending(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="lg:order-2">
          <h2 className="mb-6 font-headline text-2xl font-bold">Order Summary</h2>
          <Card>
            <CardContent className="space-y-4 p-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between gap-4">
                  <div>
                    <p className="text-base font-medium">{item.text || "Custom Sign"}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.kind === "product"
                        ? `Catalog · ${item.stain}`
                        : `${getStainLabel(item.stain)} · ${item.size}`}
                    </p>
                  </div>
                  <p className="text-base font-medium">${item.price.toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <p>Total</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <Button variant="outline" asChild className="w-full">
                <Link href="/cart">Edit cart</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6 lg:order-1">
          <h1 className="font-headline text-3xl font-bold">Checkout</h1>
          <p className="text-base text-muted-foreground">
            You will finish payment on Stripe Checkout. Custom signs are $120 each;
            catalog pieces use their listed server-side price.
          </p>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">
              Receipt email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="text-base"
            />
          </div>
          <Button
            className="w-full text-base"
            size="lg"
            onClick={handleCheckout}
            disabled={pending}
          >
            {pending ? "Redirecting..." : `Pay $${totalPrice.toFixed(2)} with Stripe`}
          </Button>
        </div>
      </div>
    </div>
  );
}
