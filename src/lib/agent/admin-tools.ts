import { tool } from "ai";
import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getSupabaseServiceRoleKey } from "@/lib/supabase/env";

export type OrderRow = {
  id: string;
  email: string | null;
  amount_cents: number | null;
  status: string | null;
  created_at: string | null;
  items: unknown;
};

export type InquiryRow = {
  id: string;
  name: string | null;
  email: string | null;
  message: string | null;
  created_at: string | null;
};

function maskEmail(email: string | null | undefined): string {
  if (!email || !email.includes("@")) return "(none)";
  const [local, domain] = email.split("@");
  const safeLocal = local.length <= 2 ? `${local[0] ?? "*"}*` : `${local.slice(0, 2)}***`;
  return `${safeLocal}@${domain}`;
}

function itemCount(items: unknown): number {
  if (Array.isArray(items)) return items.length;
  return 0;
}

/** Pure aggregator — no SQL. Used by the tool and unit tests. */
export function summarizeOrderRows(rows: OrderRow[], days: number) {
  const byStatus: Record<string, number> = {};
  let revenueCents = 0;

  for (const row of rows) {
    const status = (row.status ?? "unknown").toLowerCase();
    byStatus[status] = (byStatus[status] ?? 0) + 1;
    revenueCents += row.amount_cents ?? 0;
  }

  const recent = rows.slice(0, 8).map((row) => ({
    status: row.status ?? "unknown",
    amountDisplay: `$${((row.amount_cents ?? 0) / 100).toFixed(2)}`,
    email: maskEmail(row.email),
    itemCount: itemCount(row.items),
    createdAt: row.created_at,
  }));

  return {
    windowDays: days,
    orderCount: rows.length,
    revenueCents,
    revenueDisplay: `$${(revenueCents / 100).toFixed(2)}`,
    byStatus,
    recent,
  };
}

/** Pure aggregator — no SQL. Used by the tool and unit tests. */
export function summarizeInquiryRows(rows: InquiryRow[], days: number) {
  const recent = rows.slice(0, 8).map((row) => ({
    name: row.name ?? "Anonymous",
    email: maskEmail(row.email),
    preview: (row.message ?? "").slice(0, 120),
    createdAt: row.created_at,
  }));

  return {
    windowDays: days,
    inquiryCount: rows.length,
    recent,
  };
}

async function fetchRecentOrders(days: number, limit: number): Promise<OrderRow[]> {
  if (!getSupabaseServiceRoleKey()) {
    throw new Error("Supabase service role is not configured.");
  }
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const admin = createAdminSupabaseClient();
  const { data, error } = await admin
    .from("orders")
    .select("id, email, amount_cents, status, created_at, items")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as OrderRow[];
}

async function fetchRecentInquiries(days: number, limit: number): Promise<InquiryRow[]> {
  if (!getSupabaseServiceRoleKey()) {
    throw new Error("Supabase service role is not configured.");
  }
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const admin = createAdminSupabaseClient();
  const { data, error } = await admin
    .from("inquiries")
    .select("id, name, email, message, created_at")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as InquiryRow[];
}

export function createAdminTools() {
  return {
    summarizeOrders: tool({
      description:
        "Summarize recent Stripe orders (counts, revenue, status breakdown). Uses fixed Supabase selects — never invent totals.",
      inputSchema: z.object({
        days: z
          .number()
          .int()
          .min(1)
          .max(90)
          .default(30)
          .describe("Look-back window in days"),
      }),
      execute: async ({ days }) => {
        const window = days ?? 30;
        const rows = await fetchRecentOrders(window, 100);
        return summarizeOrderRows(rows, window);
      },
    }),

    summarizeInquiries: tool({
      description:
        "Summarize recent contact-form inquiries (counts + previews with masked emails). Never invent messages.",
      inputSchema: z.object({
        days: z
          .number()
          .int()
          .min(1)
          .max(90)
          .default(30)
          .describe("Look-back window in days"),
      }),
      execute: async ({ days }) => {
        const window = days ?? 30;
        const rows = await fetchRecentInquiries(window, 100);
        return summarizeInquiryRows(rows, window);
      },
    }),
  };
}

export function getAdminSystemPrompt() {
  return [
    "You are the Admin Copilot for Steffens Sign & Design.",
    "Only help with shop operations: orders and contact inquiries.",
    "Always call summarizeOrders or summarizeInquiries before stating counts, revenue, or message content.",
    "Never invent numbers. Never run or suggest raw SQL. Never expose full customer emails — tools already mask them.",
    "Keep replies concise (2–5 sentences) with clear totals.",
    "Refuse requests outside orders/inquiries (design help belongs on /custom-sign).",
  ].join(" ");
}
