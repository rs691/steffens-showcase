import { Button } from "@/components/ui/button";
import { Bot, CreditCard, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const demoSteps = [
  {
    icon: Sparkles,
    title: "Design Copilot",
    description:
      'Open Custom Sign and ask: "Large walnut outdoor sign for The Millers — what\'s the price?" Watch RAG, quoting, and live preview updates.',
    href: "/custom-sign",
    cta: "Open Custom Sign",
  },
  {
    icon: CreditCard,
    title: "Checkout flow",
    description:
      "Add a sign to cart, register or log in, and run Stripe test checkout. Orders persist via webhook to Supabase.",
    href: "/cart",
    cta: "View cart",
  },
  {
    icon: Bot,
    title: "Admin Copilot",
    description:
      "Register, then promote your user with is_admin in Supabase. Visit /admin and ask the Admin Copilot to summarize orders or inquiries.",
    href: "/admin",
    cta: "Go to admin",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">About</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Production-style e-commerce replica by Robert Stewart — built to showcase full-stack and
          AI engineering.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="mb-4 font-headline text-3xl font-semibold">Why this project</h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Steffens Sign &amp; Design is a fictional shop theme used to showcase production-style
                web engineering: catalog, auth, Stripe checkout, admin tools, and AI copilots with
                RAG — not an official storefront for a live business.
              </p>
              <p>
                The experience is intentionally realistic so recruiters can evaluate a shipped app:
                custom sign designer, persistent cart, Stripe checkout, contact inquiries, and
                role-gated admin features with two streaming copilots.
              </p>
              <p>
                Built by{" "}
                <a
                  href="https://robert-stewart.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Robert Stewart
                </a>
                . Source on{" "}
                <a
                  href="https://github.com/rs691/steffens-showcase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          </div>
          <div className="relative h-64 min-h-[300px] md:h-full">
            <Image
              src="/cncWoodcut2.jpg"
              alt="Custom desk in progress on a CNC mill"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-center font-headline text-3xl font-bold">How to try the AI features</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-muted-foreground">
          A 60-second path for hiring managers and Handshake reviewers.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {demoSteps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-md"
            >
              <step.icon className="h-7 w-7 text-primary" aria-hidden />
              <h3 className="mt-4 font-headline text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 flex-1 text-base text-muted-foreground">{step.description}</p>
              <Button asChild className="mt-6 w-full">
                <Link href={step.href}>{step.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-base text-muted-foreground">
          Admin access: after registering, run{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            UPDATE public.users SET is_admin = true WHERE email = &apos;you@example.com&apos;;
          </code>{" "}
          in Supabase.
        </p>
      </section>
    </div>
  );
}
