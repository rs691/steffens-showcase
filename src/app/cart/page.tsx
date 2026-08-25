"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/CartContext";
import { getStainLabel } from "@/lib/stain-labels";
import Link from "next/link";

export default function CartPage() {
  const { cart, clearCart, removeFromCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="space-y-4 p-6 text-center">
        <p className="text-lg">Your cart is empty.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/custom-sign">Design a custom sign</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">Browse products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:p-8">
      <h1 className="font-headline text-3xl font-bold">Your Cart</h1>
      <ul className="space-y-3">
        {cart.map((item) => {
          const isProduct = item.kind === "product";
          return (
            <li
              key={item.id}
              className="flex justify-between gap-4 rounded-lg border p-4 shadow-sm"
            >
              <div>
                <p className="text-base font-semibold">{item.text || "Custom Sign"}</p>
                <p className="text-sm text-muted-foreground">
                  {isProduct
                    ? `Catalog piece · ${item.stain}`
                    : `Wood: ${getStainLabel(item.stain)} · Size: ${item.size}`}
                </p>
                <p className="mt-1 text-base font-bold">${item.price.toFixed(2)}</p>
              </div>
              <Button variant="outline" onClick={() => removeFromCart(item.id)}>
                Remove
              </Button>
            </li>
          );
        })}
      </ul>
      <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/checkout">Checkout</Link>
        </Button>
        <Button variant="destructive" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}
