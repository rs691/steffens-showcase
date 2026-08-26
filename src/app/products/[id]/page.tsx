import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddProductToCartButton } from "@/components/products/AddProductToCartButton";
import { getProductById, getProducts } from "@/lib/catalog";
import { ArrowLeft, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(String(id));
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: `${product.name} | Steffens Sign & Design`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(String(id));

  if (!product) {
    notFound();
  }

  const imageSrc = product.imageUrl ?? product.image;
  const related = (await getProducts())
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="mb-8 -ml-2">
        <Link href="/products" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>
      </Button>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="capitalize">
              {product.category}
            </Badge>
            {product.woodType ? (
              <Badge variant="outline" className="capitalize">
                {product.woodType}
              </Badge>
            ) : null}
          </div>

          <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-semibold text-foreground">{product.price}</p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {product.priceCents ? (
              <AddProductToCartButton product={product} size="lg" />
            ) : null}
            <Button asChild size="lg" variant={product.priceCents ? "outline" : "default"}>
              <Link
                href={`/contact?subject=${encodeURIComponent(`Inquiry: ${product.name}`)}`}
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Inquire about this piece
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/custom-sign">Design a custom sign</Link>
            </Button>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="font-headline mb-8 text-2xl font-semibold">More from the shop</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((item) => {
              const src = item.imageUrl ?? item.image;
              return (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-video w-full">
                    <Image
                      src={src}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-headline text-lg font-semibold">{item.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.price}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
