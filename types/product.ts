export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  isTrending?: boolean;
  sizes?: string[];
}
