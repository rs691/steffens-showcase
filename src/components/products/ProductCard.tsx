import { AddProductToCartButton } from "@/components/products/AddProductToCartButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/types";
import { Eye, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.imageUrl ?? product.image;
  const purchasable = product.priceCents != null && product.priceCents > 0;

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="relative block aspect-video w-full">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          ) : null}
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="mb-2 font-headline text-xl">
          <Link href={`/products/${product.id}`} className="transition-colors hover:text-primary">
            {product.name}
          </Link>
        </CardTitle>
        <p className="mb-4 line-clamp-4 min-h-[5rem] text-base text-muted-foreground">
          {product.description}
        </p>
        <p className="text-lg font-semibold text-primary">{product.price}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 p-6 pt-0 sm:flex-row">
        <Button asChild variant={purchasable ? "outline" : "default"} className="w-full sm:flex-1">
          <Link href={`/products/${product.id}`} className="inline-flex items-center justify-center gap-2">
            <Eye className="h-4 w-4" />
            View details
          </Link>
        </Button>
        {purchasable ? (
          <AddProductToCartButton product={product} className="w-full sm:flex-1" />
        ) : (
          <Button asChild variant="outline" className="w-full sm:flex-1">
            <Link
              href={`/contact?subject=${encodeURIComponent(`Inquiry: ${product.name}`)}`}
              className="inline-flex items-center justify-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Inquire
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
