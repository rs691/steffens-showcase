"use client";

import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, clearCart } = useCart();

  if (cart.length === 0) {
    return <p className="p-6 text-center text-lg">Your cart is empty.</p>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <ul className="space-y-3">
        {cart.map((item, index) => (
          <li key={index} className="border rounded-lg p-4 shadow">
            <p className="font-semibold">{item.text || "Custom Sign"}</p>
            <p>Wood: {item.stain}</p>
            <p>Size: {item.size}</p>
            <p className="font-bold">${item.price}</p>
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
