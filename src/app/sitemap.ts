import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const staticPaths = [
    "",
    "/about",
    "/products",
    "/gallery",
    "/faq",
    "/contact",
    "/custom-sign",
    "/learn",
    "/events",
    "/projects",
    "/login",
    "/register",
  ];

  const products = await getProducts();
  const productPaths = products.map((product) => `/products/${product.id}`);

  return [...staticPaths, ...productPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
