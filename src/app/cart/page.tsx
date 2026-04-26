"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cartItems, addToCart, clearCart, removeFromCart, totalPrice } = useCart();

  const loadDemoCartAndCheckout = () => {
    addToCart(
      {
        id: "demo-cedar-sign",
        name: "Cedar Welcome Sign (Demo)",
        description: "Demo product used for portfolio checkout walkthroughs.",
        price: 129,
        imageUrl: "/table.png",
        category: "Signs",
      },
      1
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-slate-100 dark:bg-slate-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="h-12 w-12 text-slate-400" />
          </div>
          <h1 className="text-3xl font-headline font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">Looks like you haven&apos;t added any handcrafted pieces yet.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/products">Browse Collection</Link>
            </Button>
            <Button asChild size="lg" onClick={loadDemoCartAndCheckout}>
              <Link href="/checkout">Load Demo Cart &amp; Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-headline font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item, index) => (
            <Card key={`${item.product.id}-${index}`} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-48 h-48 relative bg-slate-100">
                    <Image 
                      src={item.product.imageUrl || "/placeholder.png"} 
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{item.product.category}</p>
                      </div>
                      <p className="text-xl font-bold text-primary">${item.product.price}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-slate-500">
                        Qty: {item.quantity}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-destructive h-8 px-2 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={clearCart} className="text-muted-foreground">
              Clear All Items
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-none shadow-xl bg-slate-50 dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-emerald-500 font-medium">Calculated at next step</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full h-14 text-lg font-bold group" size="lg">
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <p className="text-center text-xs text-muted-foreground mt-4 px-6">
            Secure checkout powered by Stripe. All designs are handcrafted to order.
          </p>
        </div>
      </div>
    </div>
  );
}
