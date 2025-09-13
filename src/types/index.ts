export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  category: string;
}

export interface EventInfo {
  id: string;
  name: string;
  date: string;
  location: string;
  description?: string;
  image: string;
 
}


export type CartItem = {
  product: Product;
  quantity: number;
};