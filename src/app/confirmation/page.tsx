import { Button } from "@/components/ui/button";
import { getStripe } from "@/lib/stripe";
import Link from "next/link";

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  let paid = false;
  let email: string | null = null;

  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === "paid";
      email = session.customer_email;
    } catch {
      paid = false;
    }
  }

  return (
    <div className="container mx-auto max-w-xl py-20 px-4 text-center space-y-4">
      <h1 className="text-3xl font-headline font-bold">
        {paid ? "Payment received" : "Thanks — checking your order"}
      </h1>
      <p className="text-muted-foreground">
        {paid
          ? `Stripe confirmed this checkout${email ? ` for ${email}` : ""}. I will follow up about your custom piece.`
          : "If you just paid, give Stripe a moment and refresh. A webhook records the order when STRIPE_WEBHOOK_SECRET is set."}
      </p>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
