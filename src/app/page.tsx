import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brush, Hammer, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const featuredProjects = [
    {
      title: "Handcrafted Oak Table",
      description: "A centerpiece for any dining room, built with traditional joinery.",
      image: "https://placehold.co/600x400.png",
      hint: "oak table",
    },
    {
      title: "Custom Bookshelf",
      description: "Floor-to-ceiling bookshelf tailored to fit the client's library.",
      image: "https://placehold.co/600x400.png",
      hint: "custom bookshelf",
    },
    {
      title: "Vintage-Inspired Armchair",
      description: "A comfortable and stylish armchair with hand-carved details.",
      image: "https://placehold.co/600x400.png",
      hint: "vintage armchair",
    },
  ];

  const services = [
    {
      icon: <Hammer className="h-10 w-10 text-primary" />,
      title: "Custom Furniture",
      description: "Bespoke pieces designed and built to your specifications."
    },
    {
      icon: <Brush className="h-10 w-10 text-primary" />,
      title: "Restoration",
      description: "Bringing antique and cherished furniture back to life."
    },
    {
      icon: <Ruler className="h-10 w-10 text-primary" />,
      title: "Consultation",
      description: "Expert advice on wood selection, design, and care."
    }
  ]

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-secondary py-20 md:py-32">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter text-primary">Steffen's Showcase</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Mastering the art of woodworking. Crafting timeless pieces with passion and precision.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/projects">Explore Projects</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">What I Do</h2>
            <p className="mt-2 text-lg text-muted-foreground">From concept to creation, excellence in every detail.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="flex flex-col items-center text-center">
                {service.icon}
                <h3 className="mt-4 text-2xl font-headline font-semibold">{service.title}</h3>
                <p className="mt-2 text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="w-full bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Featured Projects</h2>
            <Button variant="link" asChild>
              <Link href="/gallery">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    data-ai-hint={project.hint}
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-headline">{project.title}</CardTitle>
                  <p className="mt-2 text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Ready to Start a Project?</h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
              Let's collaborate to create something beautiful and lasting.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">Contact Me</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
