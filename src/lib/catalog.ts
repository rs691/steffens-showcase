import { events as localEvents, products as localProducts, woods as localWoods } from "@/content/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { EventInfo, Product } from "@/types";
import type { WoodSpecies } from "@/content/catalog";

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
  const rows = await fromSupabase<{
    id: string;
    name: string;
    description: string | null;
    price: number | string | null;
    image_url: string | null;
    category: string | null;
  }>("products");

  if (!rows?.length) {
    return localProducts;
  }

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description ?? "",
    price:
      row.price === null || Number(row.price) === 0
        ? "Commission"
        : `$${Number(row.price).toFixed(0)}`,
    image: row.image_url ?? "/bookshelf.png",
    category: row.category ?? "furniture",
  }));
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
    imageUrl: row.image_path ?? undefined,
  }));
}

export async function getWoods(): Promise<WoodSpecies[]> {
  const rows = await fromSupabase<WoodSpecies>("woods");
  return rows?.length ? rows : localWoods;
}
