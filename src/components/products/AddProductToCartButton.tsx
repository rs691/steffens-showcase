"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types";
import { ShoppingCart } from "lucide-react";

type AddProductToCartButtonProps = {
  product: Product;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "secondary" | "ghost";
};

export function AddProductToCartButton({
  product,
  className,
  size = "default",
  variant = "default",
}: AddProductToCartButtonProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product.priceCents) {
    return null;
  }

  function handleAdd() {
    addToCart({
      kind: "product",
      productId: product.id,
      text: product.name,
      stain: product.woodType ?? product.category,
      size: "standard",
      price: product.priceCents! / 100,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} is ready for checkout.`,
    });
  }

  return (
    <Button type="button" size={size} variant={variant} className={className} onClick={handleAdd}>
      <ShoppingCart className="h-4 w-4" />
      Add to cart
    </Button>
  );
}
