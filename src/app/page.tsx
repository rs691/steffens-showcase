import { Button } from "@/components/ui/button";
import PageContainer from "@/components/ui/PageContainer";
import FeaturedProjects from "@/components/products/featured-projects";
import { Bot, Database, Shield, Sparkles, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="relative isolate min-h-[70vh] w-full overflow-hidden">
        <Image
          src="/woodMachine.jpg"
          alt="Craftsman working wood in the workshop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/25" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 sm:pb-20 md:justify-center md:pt-24">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
            Production-style shop replica
          </p>
          <h1 className="mt-3 max-w-2xl font-headline text-3xl font-bold text-white sm:text-5xl md:text-6xl">
            Handcrafted wood signs &amp; furniture
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">
            A full-stack e-commerce demo with AI copilots, Stripe checkout, and admin tooling —
            built by Robert Stewart for recruiters and hiring managers.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button size="lg" asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
              <Link href="/custom-sign">Try the Design Copilot</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full border-white/40 bg-black/30 text-white hover:bg-black/50 hover:text-white sm:w-auto"
            >
              <Link href="/products">Browse the shop</Link>
            </Button>
          </div>
        </div>
      </section>

      <PageContainer className="space-y-10 py-8 md:space-y-12 md:py-10">
        <section className="rounded-xl border border-border bg-card p-6 shadow-lg sm:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              AI showcase
            </p>
            <h2 className="mt-2 font-headline text-3xl font-bold md:text-4xl">
              Two copilots, one production-style app
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Customer-facing Design Copilot with RAG and tool calling, plus a role-gated Admin
              Copilot for orders and inquiries — rate-limited APIs and contract evals included.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Sparkles,
                title: "Design Copilot",
                description: "Streaming chat on /custom-sign — suggests wood, quotes $120, updates the live preview.",
              },
              {
                icon: Database,
                title: "RAG knowledge",
                description: "pgvector over woods, FAQ, and process docs so answers stay grounded in shop data.",
              },
              {
                icon: Wrench,
                title: "Tool calling",
                description: "retrieveKnowledge, searchWoods, quoteSign, and applyDesignDraft run server-side.",
              },
              {
                icon: Bot,
                title: "Admin Copilot",
                description: "Summarize orders and inquiries from /admin — fixed queries, no raw SQL.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-border pt-5">
                <item.icon className="mb-3 h-6 w-6 text-primary" aria-hidden />
                <h3 className="font-headline text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-base text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/custom-sign">Try the Design Copilot</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Recruiter demo path</Link>
            </Button>
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <Shield className="h-4 w-4 shrink-0" aria-hidden />
            Not an official business site — a production app replica for portfolio review.
          </p>
        </section>

        <section>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Built like a real shop</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Catalog, cart, Stripe checkout, contact inquiries, and admin dashboards — the full
              stack behind the AI features.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Custom signs",
                description: "Pick text, wood, and size — then check out securely for $120 per sign.",
              },
              {
                title: "Furniture & decor",
                description: "Browse catalog pieces with add-to-cart or commission inquire flows.",
              },
              {
                title: "Admin & data",
                description: "Supabase auth, order webhooks, inquiry storage, and copilot session logs.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-border pt-5">
                <h3 className="font-headline text-xl font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-base text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
        <FeaturedProjects />
      </PageContainer>
    </>
  );
}
