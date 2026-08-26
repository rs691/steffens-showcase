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
      image: "/custom-table.jpg",
    },
    {
      title: "Custom Bookshelf",
      description:
        "Floor-to-ceiling bookshelf tailored to fit the client's library.",
      image: "/bookshelf.jpg",
    },
    {
      title: "Outdoor Adirondack Chair",
      description:
        "A comfortable hardwood Adirondack chair built for porch and patio use.",
      image: "/chair.jpg",
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
    <section className="w-full rounded-xl bg-secondary px-0 py-8 shadow-lg sm:py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Row */}
        <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:mb-10 md:flex-row md:items-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Featured Projects
          </h2>
          <Button
            variant="link"
            asChild
            className="h-auto px-0 text-lg font-semibold text-primary"
          >
            <Link href="/gallery">
              View all
              <ArrowRight className="h-5 w-5" />
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
                <CardTitle className="font-headline text-xl font-semibold">
                  {project.title}
                </CardTitle>
                <p className="mt-2 flex-1 text-base text-muted-foreground">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-h-[90vh] w-[calc(100vw-1.5rem)] overflow-y-auto sm:max-w-xl">
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
