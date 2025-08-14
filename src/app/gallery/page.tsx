import Image from "next/image";

const galleryImages = [
  // use images from local file public
  { src: "/bespokeChair.svg", alt: "Close-up of wood grain" },
  { src: "/signs.svg", alt: "Finished bookshelf in a room" },
  { src: "/mahagDesk.svg", alt: "Mahaogany Desk" },
  // { src: "/images/sustainable-lumber.jpg", alt: "A stack of sustainable lumber" },
  // { src: "/images/restored-antique-chair.jpg", alt: "Restored antique chair" },
  // { src: "/images/custom-table-leg-carving.jpg", alt: "Custom table leg carving" },
  // { src: "/images/polishing-finished-surface.jpg", alt: "Polishing a finished surface" },
  // { src: "/images/completed-dining-set.jpg", alt: "The completed dining set" },
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}
