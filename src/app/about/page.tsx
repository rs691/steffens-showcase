import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">About</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Omaha woodworker behind Steffens Sign &amp; Design.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="mb-4 font-headline text-3xl font-semibold">The workshop</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                I build custom signs, furniture, and restorations from my shop in the Omaha area —
                mixing hand tools with CNC when it helps the piece, not when it replaces the craft.
              </p>
              <p>
                Most projects start with a simple conversation: what the piece needs to do, which wood
                fits the space, and how long it should last. From there I cut, join, finish, and
                deliver work meant to stay in the home for years.
              </p>
              <p>
                You can design a custom sign on this site, browse finished work in the gallery, or
                reach out for a commission. I&apos;m also on Instagram, Facebook, and Etsy as Steffens
                Sign &amp; Design.
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
