import {
  events as localEvents,
  products as localProducts,
  woods as localWoods,
} from "@/content/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { EventInfo, Product } from "@/types";
import type { WoodSpecies } from "@/content/catalog";

type ProductRow = {
  id: string;
  name: string;
  description: string | null;
  price: number | string | null;
  image_url: string | null;
  category: string | null;
  wood_type?: string | null;
};

/** Known broken or missing paths → real files in /public */
const IMAGE_ALIASES: Record<string, string> = {
  "products/table.jpg": "/table.jpg",
  "products/maple-hand.jpg": "/customTable.jpg",
  "products/oak-stool.jpg": "/customChair1.png",
  "products/cherry-wood-bookshelf-modern-design.jpg": "/bookshelf.png",
  "/mahagDesk.svg": "/mahoganyDesk.png",
  "/cherrywood.svg": "/cherrywoodDineTable.jpg",
  "/cedarChest.png": "/cedarChest3.jpg",
  "/barSet.png": "/woodBar.png",
};

function normalizeImagePath(raw: string | null | undefined, fallback = "/bookshelf.png"): string {
  if (!raw?.trim()) return fallback;
  const trimmed = raw.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (IMAGE_ALIASES[trimmed]) {
    return IMAGE_ALIASES[trimmed];
  }

  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  if (IMAGE_ALIASES[withSlash]) {
    return IMAGE_ALIASES[withSlash];
  }

  // Strip accidental "products/" prefix used by older seed data
  if (withSlash.startsWith("/products/")) {
    const remapped = IMAGE_ALIASES[withSlash.slice(1)] ?? `/${withSlash.slice("/products/".length)}`;
    return remapped;
  }

  return withSlash;
}

function formatPrice(price: number | string | null | undefined): string {
  if (price === null || price === undefined || Number(price) === 0) {
    return "Commission";
  }
  return `$${Number(price).toFixed(0)}`;
}

function mapProductRow(row: ProductRow): Product {
  return {
    id: String(row.id),
    name: row.name,
    description: row.description ?? "",
    price: formatPrice(row.price),
    image: normalizeImagePath(row.image_url),
    imageUrl: normalizeImagePath(row.image_url),
    category: row.category ?? "furniture",
    woodType: row.wood_type ?? undefined,
  };
}

async function fromSupabase<T>(table: string): Promise<T[] | null> {
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }

  try {
    const { data, error } = await createAdminSupabaseClient().from(table).select("*");
    if (error || !data) {
      return null;
    }
    return data as T[];
  } catch {
    return null;
  }
}

export async function getProducts(): Promise<Product[]> {
  const rows = await fromSupabase<ProductRow>("products");

  if (!rows?.length) {
    return localProducts.map((product) => ({
      ...product,
      image: normalizeImagePath(product.image),
      imageUrl: normalizeImagePath(product.imageUrl ?? product.image),
    }));
  }

  return rows.map(mapProductRow);
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!id) return null;

  if (isSupabaseConfigured() && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { data, error } = await createAdminSupabaseClient()
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!error && data) {
        return mapProductRow(data as ProductRow);
      }
    } catch {
      // fall through to local catalog
    }
  }

  const local = localProducts.find((product) => product.id === id);
  if (!local) return null;

  return {
    ...local,
    image: normalizeImagePath(local.image),
    imageUrl: normalizeImagePath(local.imageUrl ?? local.image),
  };
}

export async function getEvents(): Promise<EventInfo[]> {
  const rows = await fromSupabase<{
    id: string;
    name: string;
    event_date: string;
    location: string | null;
    description: string | null;
    image_path: string | null;
  }>("events");

  if (!rows?.length) {
    return localEvents;
  }

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    date: row.event_date,
    location: row.location ?? "",
    description: row.description ?? undefined,
    imageUrl: row.image_path ? normalizeImagePath(row.image_path) : undefined,
  }));
}

export async function getWoods(): Promise<WoodSpecies[]> {
  const rows = await fromSupabase<WoodSpecies>("woods");
  return rows?.length ? rows : localWoods;
}
