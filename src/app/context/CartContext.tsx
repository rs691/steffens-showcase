"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem } from "@/types";

type CartContextValue = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "steffens-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Array<Partial<CartItem> & Omit<CartItem, "kind">>;
        setCart(
          parsed.map((item) => ({
            ...item,
            kind: item.kind === "product" ? "product" : "custom-sign",
            id: item.id ?? crypto.randomUUID(),
            text: item.text ?? "Custom Sign",
            stain: item.stain ?? "woodBackground",
            size: item.size ?? "medium",
            price: Number(item.price) || 0,
            productId: item.productId,
            graphic: item.graphic,
          })),
        );
      }
    } catch {
      setCart([]);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  const addToCart = (item: Omit<CartItem, "id">) => {
    setCart((previous) => [
      ...previous,
      { ...item, id: crypto.randomUUID() },
    ]);
  };

  const removeFromCart = (id: string) => {
    setCart((previous) => previous.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.length;
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price, 0),
    [cart],
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
