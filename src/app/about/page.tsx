import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">About</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A full-stack portfolio demo by Robert Stewart.
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
                The product experience is intentionally realistic so you can walk through a custom
                sign designer, cart and checkout, contact inquiries, and role-gated admin features
                the way a hiring manager would evaluate a shipped app.
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
                . Prefer email or LinkedIn? Start from the{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  contact page
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="relative min-h-[300px] h-64 md:h-full">
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
    </div>
  );
}
