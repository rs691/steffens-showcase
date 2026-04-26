"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, CreditCard, LayoutDashboard, ShoppingCart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ReviewPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-10">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Recruiter Quick Review</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          This guided view provides instant access to core product, chatbot, admin, and checkout features without registration or email verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><LayoutDashboard className="h-5 w-5" /> Admin + BI Bot</CardTitle>
            <CardDescription>Open dashboard analytics and the admin assistant chat experience.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/admin">Open Admin Dashboard</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShoppingCart className="h-5 w-5" /> Cart Flow</CardTitle>
            <CardDescription>View cart states and load a demo item for checkout in one click.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/cart">Open Cart</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> Checkout + Confirmation</CardTitle>
            <CardDescription>Run Stripe checkout when configured, or use built-in demo confirmation mode.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/checkout">Open Checkout</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5" /> Chatbot Showcase</CardTitle>
            <CardDescription>Use the floating assistant on every page, with admin context in dashboard mode.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/">Open Public Site</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 rounded-xl border bg-slate-50 dark:bg-slate-900/40 p-5">
        <p className="text-sm text-muted-foreground">
          <Sparkles className="inline h-4 w-4 mr-1" /> Tip: Start on Admin, then Cart, then Checkout to evaluate the full product narrative in under 5 minutes.
        </p>
      </div>
    </div>
  );
}
