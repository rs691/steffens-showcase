"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"

function ConfirmationContent() {
  const { clearCart } = useCart()
  const searchParams = useSearchParams()
  const paymentIntentId = searchParams.get("payment_intent")
  const redirectStatus = searchParams.get("redirect_status")

  useEffect(() => {
    if (redirectStatus === "succeeded") {
      clearCart()
      // Here you would also update your database via a server action or API call
    }
  }, [redirectStatus, clearCart])

  return (
    <div className="container mx-auto py-24 px-4">
      <Card className="max-w-xl mx-auto text-center p-8 border-none shadow-2xl bg-white dark:bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
        <CardHeader>
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-500">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <CardTitle className="text-4xl font-headline font-bold mb-2">Order Confirmed!</CardTitle>
          <p className="text-slate-500 dark:text-slate-400">
            Thank you for supporting handcrafted wood craftsmanship.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl text-left border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-400">Transaction Details</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono font-medium truncate ml-4">#{paymentIntentId ? paymentIntentId.slice(-8) : "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="text-emerald-500 font-bold uppercase tracking-tighter">SUCCESSFUL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Estimate</span>
                <span className="font-medium">2-3 Weeks (Handcrafted)</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-slate-500 italic">
            You will receive a confirmation email shortly with tracking details once Steffen begins working on your piece.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link href="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Shop More
              </Link>
            </Button>
            <Button asChild size="lg" className="w-full group">
              <Link href="/">
                Return Home
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Visual background flourish */}
      <div className="fixed -z-10 top-0 left-0 w-full h-full opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl animate-pulse delay-700" />
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
