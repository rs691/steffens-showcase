import assert from "node:assert/strict";
import test from "node:test";
import { getChargeAmountCents } from "@/lib/pricing";
import { designDraftSchema, getDesignModelId } from "./design-tools";

test("design draft schema accepts form values", () => {
  const parsed = designDraftSchema.parse({
    text: "The Millers",
    stain: "amerBlackWalnut",
    size: "large",
  });
  assert.equal(parsed.size, "large");
});

test("server-owned custom sign price remains $120", () => {
  assert.equal(getChargeAmountCents(1), 12000);
});

test("default model uses provider/model gateway format", () => {
  assert.match(getDesignModelId(), /\w+\/[\w.-]+/);
});
