import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const paths = [
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
  ];

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
