export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  /** Null when the piece is commission-only (not Stripe checkout). */
  priceCents: number | null;
  image: string;
  imageUrl?: string;
  category: string;
  woodType?: string;
  dataAiHint?: string;
}

export interface EventInfo {
  id: string;
  name: string;
  date: string;
  location: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  dataAiHint?: string;
}

export type CartItem = {
  id: string;
  kind: "custom-sign" | "product";
  text: string;
  graphic?: string | null;
  stain: string;
  size: string;
  price: number;
  productId?: string;
  /** Display-only customization — doesn't affect server pricing. */
  textColor?: string;
  shape?: "rectangle" | "oval" | "arch" | "house";
};
