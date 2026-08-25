import { Button } from "@/components/ui/button";
import PageContainer from "@/components/ui/PageContainer";
import FeaturedProjects from "@/components/products/featured-projects";
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
            Steffens Sign &amp; Design
          </p>
          <h1 className="mt-3 max-w-2xl font-headline text-3xl font-bold text-white sm:text-5xl md:text-6xl">
            Handcrafted wood signs &amp; furniture
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">
            Custom pieces built in Omaha — design a sign online, or commission furniture made to last.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button size="lg" asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
              <Link href="/custom-sign">Design a custom sign</Link>
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
        <section>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Built for homes that last</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Custom signs you can design here, plus furniture and restoration from the workshop.
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
                description: "Tables, shelves, and one-off pieces built around how you actually live.",
              },
              {
                title: "Restoration",
                description: "Careful repairs that keep the character of pieces you already love.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-border pt-5">
                <h3 className="font-headline text-xl font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
        <FeaturedProjects />
      </PageContainer>
    </>
  );
}
