"use client";

import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, totalPrice, totalItems } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  if (totalItems === 0) {
    router.replace("/cart");
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
          items: cart.map((item) => ({
            text: item.text || "Custom Sign",
            stain: item.stain,
            size: item.size,
          })),
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="lg:order-2">
          <h2 className="text-2xl font-bold mb-6 font-headline">Order Summary</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between gap-4">
                  <div>
                    <p className="font-medium">{item.text || "Custom Sign"}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.stain} · {item.size}
                    </p>
                  </div>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <Button variant="outline" asChild className="w-full">
                <Link href="/cart">Edit cart</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:order-1 space-y-6">
          <h1 className="text-3xl font-bold font-headline">Checkout</h1>
          <p className="text-muted-foreground">
            You will finish payment on Stripe Checkout. The charged amount is
            calculated on the server at $120 per sign.
          </p>
          <div className="space-y-2">
            <Label htmlFor="email">Receipt email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <Button
            className="w-full text-lg"
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
