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
    <div className="container mx-auto max-w-xl space-y-4 px-4 py-20 text-center">
      <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
        {paid ? "Payment received" : "Thanks — checking your order"}
      </h1>
      <p className="text-lg text-muted-foreground">
        {paid
          ? `Stripe confirmed this demo checkout${email ? ` for ${email}` : ""}. The order is recorded via webhook to Supabase.`
          : "If you just paid, give Stripe a moment and refresh. Paid orders are persisted when the Stripe webhook is configured."}
      </p>
      <Button asChild size="lg">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
