import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const projects = [
  {
    title: "Mahogany Executive Desk",
    description: "A large, imposing desk with hidden compartments and brass fittings. Built for a client's home office.",
    image: "https://placehold.co/600x400.png",
    hint: "executive desk"
  },
  {
    title: "Cedar Hope Chest",
    description: "Aromatic cedar chest with dovetail joinery and a custom-engraved lid. A wedding gift.",
    image: "https://placehold.co/600x400.png",
    hint: "cedar chest"
  },
  {
    title: "Walnut & Maple Chessboard",
    description: "An intricate, handcrafted chessboard with individually carved pieces. A true test of patience.",
    image: "https://placehold.co/600x400.png",
    hint: "wood chessboard"
  },
  {
    title: "Cherry Wood Rocking Chair",
    description: "A classic design, updated for modern comfort. Hand-sanded to a smooth, warm finish.",
    image: "https://placehold.co/600x400.png",
    hint: "rocking chair"
  },
  {
    title: "Restaurant Bar Installation",
    description: "Complete design and build of a commercial bar, including countertops, shelving, and paneling.",
    image: "https://placehold.co/600x400.png",
    hint: "restaurant bar"
  },
  {
    title: "Japanese-style Garden Bench",
    description: "A minimalist outdoor bench made from weather-resistant teak, featuring elegant, simple lines.",
    image: "https://placehold.co/600x400.png",
    hint: "garden bench"
  }
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Past Projects</h1>
        <p className="mt-4 text-lg text-muted-foreground">A selection of work that showcases my dedication to the craft.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="aspect-w-3 aspect-h-2">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint={project.hint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="font-headline">{project.title}</CardTitle>
              <CardDescription className="mt-2">{project.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
