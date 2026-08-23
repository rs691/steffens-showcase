import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-headline text-3xl font-bold text-primary">Product not found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        That piece may have been removed or the link is outdated.
      </p>
      <Button asChild className="mt-8">
        <Link href="/products">Browse all products</Link>
      </Button>
    </div>
  );
}
