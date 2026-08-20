import assert from "node:assert/strict";
import test from "node:test";
import { CUSTOM_SIGN_PRICE_CENTS, getChargeAmountCents } from "./pricing";

test("custom signs are $120 each and never trust a client amount", () => {
  assert.equal(CUSTOM_SIGN_PRICE_CENTS, 12000);
  assert.equal(getChargeAmountCents(1), 12000);
  assert.equal(getChargeAmountCents(3), 36000);
  assert.throws(() => getChargeAmountCents(0));
  assert.throws(() => getChargeAmountCents(1.5));
});
