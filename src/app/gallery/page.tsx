import { galleryImages } from "@/content/catalog";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function GalleryPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Gallery</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ideas brought to life through craftsmanship.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryImages.map((image) => (
          <Card
            key={image.src}
            className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-full aspect-[3/2] relative">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
