"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";

const products: Product[] = [
    {
        id: "1",
        name: "Mahogany Executive Desk",
        description: "A large, imposing desk with hidden compartments and brass fittings. Built for a client's home office.",
        imageUrl: "/mahagDesk.svg",
        price: 2500,
        category: "Furniture",
        dataAiHint: "mahogany desk"
    },
    {
        id: "2",
        name: "Cedar Hope Chest",
        description: "Aromatic cedar chest with dovetail joinery and a custom-engraved lid. A wedding gift.",
        imageUrl: "/cedarChest.png",
        price: 450,
        category: "Furniture",
        dataAiHint: "cedar chest"
    },
    {
        id: "3",
        name: "Oak Bookshelf",
        description: "An intricate, handcrafted bookshelf with individually carved pieces. A true test of patience.",
        imageUrl: "/bookshelf.png",
        price: 1200,
        category: "Furniture",
        dataAiHint: "oak bookshelf"
    },
    {
        id: "4",
        name: "Cherry Wood Dining Table",
        description: "A classic design, updated for modern comfort. Hand-sanded to a smooth, warm finish.",
        imageUrl: "/cherrywood.svg",
        price: 1800,
        category: "Furniture",
        dataAiHint: "dining table"
    },
    {
        id: "5",
        name: "Restaurant Bar Installation",
        description: "Complete design and build of a commercial bar, including countertops, shelving, and paneling.",
        imageUrl: "/barSet.png",
        price: 5000,
        category: "Commercial",
        dataAiHint: "bar installation"
    },
    {
        id: "6",
        name: "Japanese-style Garden Bench",
        description: "A minimalist outdoor bench made from weather-resistant teak, featuring elegant, simple lines.",
        imageUrl: "/gb.svg",
        price: 600,
        category: "Outdoor",
        dataAiHint: "garden bench"
    }
];

export default function ProductsPage() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { addToCart } = useCart();

    const handleOpen = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleClose = () => {
        setSelectedProduct(null);
    };

    const handleAddToCart = () => {
        if (selectedProduct) {
            addToCart(selectedProduct);
            handleClose();
        }
    };

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Products Page</h1>
                <p className="mt-4 text-lg text-muted-foreground">A selection of the most popular products that showcase what I can do for you.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        onClick={() => handleOpen(product)}
                        className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-[420px] cursor-pointer"
                    >
                        <CardHeader className="p-0">
                            <div className="w-full h-[200px] relative">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 600px"
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 flex-grow flex flex-col justify-between">
                            <CardTitle className="font-headline">{product.name}</CardTitle>
                            <CardDescription className="mt-2 line-clamp-3">{product.description}</CardDescription>
                            <p className="font-semibold text-lg text-primary mt-2">${product.price}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && handleClose()}>
                <DialogContent className="sm:max-w-xl">
                    {selectedProduct && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selectedProduct.name}</DialogTitle>
                                <DialogDescription>
                                    {selectedProduct.description}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="relative w-full h-64 md:h-80 rounded-md overflow-hidden my-4">
                                <Image
                                    src={selectedProduct.imageUrl}
                                    alt={selectedProduct.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-primary">${selectedProduct.price}</span>
                                <DialogFooter>
                                    <Button onClick={handleAddToCart}>Add to Cart</Button>
                                </DialogFooter>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
