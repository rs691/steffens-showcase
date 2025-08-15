import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const products = [
    {
        title: "Mahogany Executive Desk",
        description: "A large, imposing desk with hidden compartments and brass fittings. Built for a client's home office.",
        image: "/steffens-showcase/mahagDesk.svg",
       
    },
    {
        title: "Cedar Hope Chest",
        description: "Aromatic cedar chest with dovetail joinery and a custom-engraved lid. A wedding gift.",
        image: "/steffens-showcase/cedarChest.png",
      
    },
    {
        title: "Oak Bookshelf",
        description: "An intricate, handcrafted bookshelf with individually carved pieces. A true test of patience.",
        image: "/steffens-showcase/bookshelf.png",
    },
    {
        title: "Cherry Wood Dining Table",
        description: "A classic design, updated for modern comfort. Hand-sanded to a smooth, warm finish.",
        image: "/steffens-showcase/cherrywood.svg",
    },
    {
        title: "Restaurant Bar Installation",
        description: "Complete design and build of a commercial bar, including countertops, shelving, and paneling.",
        image: "/steffens-showcase/barSet.svg",
        
    },
    {
        title: "Japanese-style Garden Bench",
        description: "A minimalist outdoor bench made from weather-resistant teak, featuring elegant, simple lines.",
        image: "/steffens-showcase/gb.svg",
    }
];

export default function ProductsPage() {
    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Products Page</h1>
                <p className="mt-4 text-lg text-muted-foreground">A selection of the most popular products that showcase what I can do for you.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                    <Card
                        key={index}
                        className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-[420px]"
                    >
                        <CardHeader className="p-0">
                            <div className="w-full h-[200px] relative">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 600px"
                                    className="object-cover"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 flex-grow flex flex-col justify-between">
                            <CardTitle className="font-headline">{product.title}</CardTitle>
                            <CardDescription className="mt-2">{product.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
