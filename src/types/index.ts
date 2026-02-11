export interface Product {
  id: string;
  name: string;
  description: string;
  price: string | number;
  image?: string;
  imageUrl?: string;
  category: string;
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
  product: Product;
  quantity: number;
  text?: string;
  stain?: string;
  size?: string;
  price?: number;
};