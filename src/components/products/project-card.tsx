import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export type Project = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dataAiHint?: string;
  detailsUrl?: string; // Optional link to a dedicated project page
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col h-full rounded-lg">
      <CardHeader className="p-0">
        <div className="aspect-video relative w-full">
          <Image
            src={project.imageUrl}
            alt={project.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={project.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl font-semibold text-primary mb-2">{project.name}</CardTitle>
        <CardDescription className="text-foreground/80 line-clamp-3">{project.description}</CardDescription>
      </CardContent>
      {project.detailsUrl && (
         <CardFooter className="p-6 pt-0">
            <Button asChild className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href={project.detailsUrl}>
                View Details <Eye className="ml-2 h-4 w-4" />
              </Link>
            </Button>
        </CardFooter>
      )}
    </Card>
  );
}
