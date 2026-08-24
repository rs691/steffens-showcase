import assert from "node:assert/strict";
import test from "node:test";
import {
  summarizeInquiryRows,
  summarizeOrderRows,
  type InquiryRow,
  type OrderRow,
} from "./admin-tools";

test("summarizeOrders aggregates revenue and status without inventing rows", () => {
  const rows: OrderRow[] = [
    {
      id: "1",
      email: "alice@example.com",
      amount_cents: 12000,
      status: "paid",
      created_at: "2026-08-20T12:00:00Z",
      items: [{ id: "a" }],
    },
    {
      id: "2",
      email: "bob@example.com",
      amount_cents: 24000,
      status: "paid",
      created_at: "2026-08-21T12:00:00Z",
      items: [{ id: "b" }, { id: "c" }],
    },
    {
      id: "3",
      email: null,
      amount_cents: 0,
      status: "unpaid",
      created_at: "2026-08-22T12:00:00Z",
      items: [],
    },
  ];

  const summary = summarizeOrderRows(rows, 30);
  assert.equal(summary.orderCount, 3);
  assert.equal(summary.revenueCents, 36000);
  assert.equal(summary.revenueDisplay, "$360.00");
  assert.equal(summary.byStatus.paid, 2);
  assert.equal(summary.byStatus.unpaid, 1);
  assert.match(summary.recent[0].email, /\*\*\*/);
  assert.doesNotMatch(summary.recent[0].email, /alice@/);
});

test("summarizeInquiries masks emails and truncates previews", () => {
  const rows: InquiryRow[] = [
    {
      id: "1",
      name: "Casey",
      email: "casey@shop.test",
      message: "I want a walnut welcome sign for our cabin porch, about 24 inches wide.",
      created_at: "2026-08-22T10:00:00Z",
    },
  ];

  const summary = summarizeInquiryRows(rows, 14);
  assert.equal(summary.inquiryCount, 1);
  assert.equal(summary.recent[0].name, "Casey");
  assert.match(summary.recent[0].email, /ca\*\*\*@shop\.test/);
  assert.ok(summary.recent[0].preview.length <= 120);
  assert.match(summary.recent[0].preview, /walnut/i);
});
