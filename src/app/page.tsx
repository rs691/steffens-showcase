import FeaturedProjects from "@/components/products/featured-projects";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/ui/PageContainer";
import { Brush, Hammer, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const featuredProjects = [
    {
      title: "Handcrafted Oak Table",
      description:
        "A centerpiece for any dining room, built with traditional joinery.",
      image: "/steffens-showcase/table.png",
    },
    {
      title: "Custom Bookshelf",
      description:
        "Floor-to-ceiling bookshelf tailored to fit the client's library.",
      image: "/steffens-showcase/bookshelf.png",
    },
    {
      title: "Vintage-Inspired Armchair",
      description:
        "A comfortable and stylish armchair with hand-carved details.",
      image: "/steffens-showcase/chair.svg",
    },
  ];

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
      {/* Hero */}

      
  <section className="relative h-[55vh] md:h-[65vh] rounded-xl overflow-hidden shadow-2xl">
  {/* Background image */}
  <Image
    src="/steffens-showcase/machineWoodcut.svg"
    alt="Hero image showcasing handcrafted woodworks"
    fill
    priority
    className="object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 flex flex-col items-center justify-center text-center px-6">
    <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-[0_3px_6px_rgba(0,0,0,0.7)]">
      Crafted Woodworks, Uniquely Yours
    </h1>
    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
      Discover bespoke signs, decor, and furniture, handcrafted with passion and precision at Steffens Sign & Design.
    </p>
    <Button
      size="lg"
      asChild
      className="bg-primary hover:bg-primary/90 hover:scale-105 transition-transform duration-200 text-primary-foreground shadow-lg"
    >
      <Link href="/products">Explore Our Collections</Link>
    </Button>
  </div>
</section>
      {/* Services */}
      <section className="w-full pt-8 pb-16 md:pt-12 md:pb-24">
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">
              What I Do
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              From concept to creation, excellence in every detail.
            </p>
          </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {services.map((service) => (
    <div
      key={service.title}
      className="bg-white rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300
                 shadow-md hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:-translate-y-1"
    >
      {service.icon}
      <h3 className="mt-4 text-2xl font-headline font-semibold">{service.title}</h3>
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
