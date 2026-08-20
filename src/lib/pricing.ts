export const CUSTOM_SIGN_PRICE_USD = 120;
export const CUSTOM_SIGN_PRICE_CENTS = CUSTOM_SIGN_PRICE_USD * 100;

export type PricedCartItem = {
  text: string;
  stain: string;
  size: string;
};

export function getChargeAmountCents(itemCount: number): number {
  if (!Number.isInteger(itemCount) || itemCount < 1) {
    throw new Error("Cart must contain at least one item.");
  }
  return itemCount * CUSTOM_SIGN_PRICE_CENTS;
}
