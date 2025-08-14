import { Card } from "@/components/ui/card";
import Image from "next/image";


export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">About Me</h1>
        <p className="mt-4 text-lg text-muted-foreground">A craftsman's journey, from a single piece of wood to a work of art.</p>
      </div>

      <Card className="overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-headline font-semibold mb-4">The Artisan</h2>
            <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                From a young age, I was fascinated by the transformative power of woodworking. What begins as a rough-hewn log can, with patience and skill, become a thing of beauty and function. My workshop is my sanctuary, a place where traditional techniques meet contemporary design.
              </p>
              <p>
                Every piece I create is imbued with a story. It's a dialogue between me, the wood, and the future owner. I source my materials sustainably, believing that the respect we show our environment is reflected in the quality of our work.
              </p>
              <p>
                Whether it's a custom dining table that will host family gatherings for generations, or the careful restoration of a beloved heirloom, my commitment is to craftsmanship, durability, and timeless elegance.
              </p>
            </div>
          </div>
          <div className="relative h-64 md:h-full min-h-[300px]">
            <Image
              src="/chair.svg"
              alt="Custom Chair"
              fill
              className="w-full h-full object-cover"
            />
            <img
              src="/customChair.svg"
              alt="Custom Chair"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
