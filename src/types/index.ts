export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
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
  imageUrl?: string;
  dataAiHint?: string;
}
