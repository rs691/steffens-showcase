import stripe from "@/lib/stripe"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, email, description, metadata } = await request.json()

    if (!amount || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      description,
      receipt_email: email,
      metadata: metadata || {},
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
