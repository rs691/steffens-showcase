import { ProductCard } from "@/components/products/ProductCard";
import { getProducts } from "@/lib/catalog";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Products</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Catalog pieces in the demo shop — priced items checkout via Stripe; commission pieces use
          Inquire.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
