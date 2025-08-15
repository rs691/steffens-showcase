"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function FeaturedProjects() {
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

  const [open, setOpen] = useState(false);
  type Projects = {
    title: string;
    description: string;
    image: string;
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  interface Project {
    title: string;
    description: string;
    image: string;
  };

  interface HandleOpen {
    (project: Projects): void;
  }

  const handleOpen: HandleOpen = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  return (
    <section className="w-full bg-secondary py-16 md:py-24 rounded-xl shadow-lg">
      <div className="container mx-auto px-6">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center md:text-left">
            Featured Projects
          </h2>
          <Button
            variant="link"
            asChild
            className="text-primary hover:underline transition-colors"
          >
            <Link href="/gallery">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <Card
              key={index}
              onClick={() => handleOpen(project)}
              className="cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <CardHeader className="p-0">
                <div className="w-full aspect-[3/2] relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-1">
                <CardTitle className="text-xl font-headline font-semibold">
                  {project.title}
                </CardTitle>
                <p className="mt-2 text-muted-foreground flex-1">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-xl">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedProject.title}</DialogTitle>
                  <DialogDescription>
                    {selectedProject.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="relative w-full h-64 md:h-96 rounded-md overflow-hidden">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
