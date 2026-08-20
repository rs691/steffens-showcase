"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, clearCart, removeFromCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center space-y-4">
        <p className="text-lg">Your cart is empty.</p>
        <Button asChild>
          <Link href="/custom-sign">Design a custom sign</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <ul className="space-y-3">
        {cart.map((item) => (
          <li key={item.id} className="border rounded-lg p-4 shadow-sm flex justify-between gap-4">
            <div>
              <p className="font-semibold">{item.text || "Custom Sign"}</p>
              <p>Wood: {item.stain}</p>
              <p>Size: {item.size}</p>
              <p className="font-bold">${item.price.toFixed(2)}</p>
            </div>
            <Button variant="outline" onClick={() => removeFromCart(item.id)}>
              Remove
            </Button>
          </li>
        ))}
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
