export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  dataAiHint?: string;
}

export interface EventInfo {
  id: string;
  name: string;
  date: string;
  location: string;
  description?: string;
  imageUrl: string;
  dataAiHint?: string;
}


export type CartItem = {
  product: Product;
  quantity: number;
};