import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0">
        <div className="aspect-video relative w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.dataAiHint || "wood product"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{product.name}</CardTitle>
        <p className="text-muted-foreground text-sm mb-4 h-20 overflow-hidden">{product.description}</p>
        <p className="font-semibold text-lg text-primary">{product.price}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/products/${product.id}`} className="flex items-center gap-2">
            <Eye className="w-4 h-4" /> View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
