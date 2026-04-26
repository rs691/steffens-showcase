import FeaturedProjects from "@/components/products/featured-projects";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/ui/PageContainer";
import { Brush, Hammer, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const services = [
    {
      icon: <Hammer className="h-10 w-10 text-primary" />,
      title: "Custom Furniture",
      description:
        "Bespoke pieces designed and built to your specifications.",
    },
    {
      icon: <Brush className="h-10 w-10 text-primary" />,
      title: "Restoration",
      description:
        "Bringing antique and cherished furniture back to life.",
    },
    {
      icon: <Ruler className="h-10 w-10 text-primary" />,
      title: "Consultation",
      description:
        "Expert advice on wood selection, design, and care.",
    },
  ];

  return (
    <PageContainer className="space-y-16 md:space-y-24">
      <section className="relative h-[55vh] md:h-[65vh] rounded-xl overflow-hidden shadow-2xl">
        <Image
          src="/machineWoodcut.svg"
          alt="Hero image showcasing handcrafted woodworking"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/50 to-black/75 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-[0_3px_6px_rgba(0,0,0,0.7)]">
            Crafted Woodworks, Designed to Stand Out
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            Explore bespoke signs, decor, and furniture built with precision, care, and a portfolio-first presentation.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-primary hover:bg-primary/90 hover:scale-105 transition-transform duration-200 text-primary-foreground shadow-lg"
          >
            <Link href="/review">Start Quick Review</Link>
          </Button>
        </div>
      </section>
      {/* Services */}
      <section className="w-full pt-8 pb-16 md:pt-12 md:pb-24">
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">
              Services
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              From concept to creation, every detail is built to be seen and remembered.
            </p>
          </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {services.map((service) => (
    <div
      key={service.title}
      className="bg-white rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:-translate-y-1"
    >
      {service.icon}
      <h3 className="mt-4 text-2xl font-headline font-semibold text-primary">{service.title}</h3>
      <p className="mt-2 text-muted-foreground">{service.description}</p>
    </div>
  ))}
</div>

        </div>
      </section>
      <FeaturedProjects />

      
    </PageContainer>
  );
}
