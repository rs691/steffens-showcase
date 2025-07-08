import Image from "next/image";

const galleryImages = [
  { src: "https://placehold.co/600x400.png", alt: "Close-up of wood grain", hint: "wood grain" },
  { src: "https://placehold.co/400x600.png", alt: "Hand-carved detail", hint: "wood carving" },
  { src: "https://placehold.co/600x400.png", alt: "Finished bookshelf in a room", hint: "bookshelf room" },
  { src: "https://placehold.co/600x400.png", alt: "Artisan at work in the workshop", hint: "artisan workshop" },
  { src: "https://placehold.co/400x600.png", alt: "A stack of sustainable lumber", hint: "wood lumber" },
  { src: "https://placehold.co/600x400.png", alt: "Restored antique chair", hint: "antique chair" },
  { src: "https://placehold.co/600x400.png", alt: "Custom table leg carving", hint: "table leg" },
  { src: "https://placehold.co/400x600.png", alt: "Polishing a finished surface", hint: "wood polishing" },
  { src: "https://placehold.co/600x400.png", alt: "The completed dining set", hint: "dining set" },
];

export default function GalleryPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Gallery</h1>
        <p className="mt-4 text-lg text-muted-foreground">A visual journey through the details and artistry of my work.</p>
      </div>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {galleryImages.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 break-inside-avoid">
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              data-ai-hint={image.hint}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
