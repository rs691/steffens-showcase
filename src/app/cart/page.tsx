"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, clearCart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <p className="p-6 text-center text-lg">Your cart is empty.</p>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <ul className="space-y-3">
        {cart.map((item, index) => (
          <li key={index} className="border rounded-lg p-4 shadow flex justify-between items-center bg-card text-card-foreground">
            <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">{item.product.category}</p>
                <p className="font-bold text-primary">${item.product.price}</p>
            </div>
            <button
                onClick={() => removeFromCart(item.product.id)}
                className="px-3 py-1 bg-destructive text-destructive-foreground text-sm rounded hover:bg-destructive/90 transition-colors"
            >
                Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={clearCart}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Clear Cart
      </button>
    </div>
  );
}
