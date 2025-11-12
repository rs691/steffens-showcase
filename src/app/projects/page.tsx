"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const projects = [
  {
    title: "Mahogany Executive Desk",
    description: "A large, imposing desk with hidden compartments and brass fittings. Built for a client's home office.",
    image: "/mahagDesk.svg",
 
  },
  {
    title: "Cedar Hope Chest",
    description: "Aromatic cedar chest with dovetail joinery and a custom-engraved lid. A wedding gift.",
    image: "/cedarChest.png",
  
  },
  {
    title: "Oak Bookshelf",
    description: "An intricate, handcrafted bookshelf with individually carved pieces. A true test of patience.",
    image: "/bookshelf.png",
  },
  {
    title: "Cherry Wood Dining Table",
    description: "A classic design, updated for modern comfort. Hand-sanded to a smooth, warm finish.",
    image: "/table.jpg",
  },
  {
    title: "Restaurant Bar Installation",
    description: "Complete design and build of a commercial bar, including countertops, shelving, and paneling.",
    image: "/woodBar.png",
 
  },
  {
    title: "Japanese-style Garden Bench",
    description: "A minimalist outdoor bench made from weather-resistant teak, featuring elegant, simple lines.",
      image: "/gb.svg",
   
  }
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">See what we've done in the past</h1>
        <p className="mt-4 text-lg text-muted-foreground">A visual journey through the details and artistry of some of my projects.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
           <Card
                                  key={index}
                                  className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-[420px]"
                              >
                                  <CardHeader className="p-0">
                                      <div className="w-full h-[200px] relative">
                                          <Image
                                              src={project.image}
                                              alt={project.title}
                                              fill
                                              sizes="(max-width: 768px) 100vw, 600px"
                                              className="object-cover"
                                          />
                                      </div>
                                  </CardHeader>
                                  <CardContent className="p-6 flex-grow flex flex-col justify-between">
                                      <CardTitle className="font-headline">{project.title}</CardTitle>
                                      <CardDescription className="mt-2">{project.description}</CardDescription>
                                  </CardContent>
                              </Card>
        ))}
      </div>
    </div>
  );
}
