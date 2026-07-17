import { Product } from '@/types/product';

export interface FilterOptions {
  query: string;
  categories: string[];
  minPrice: number;
  maxPrice: number;
  sort: string;
}

export function filterProducts(products: Product[], options: FilterOptions): Product[] {
  let result = [...products];
  if (options.query) {
    const q = options.query.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(q));
  }

  if (options.categories && options.categories.length > 0) {
    result = result.filter(p => options.categories.includes(p.category));
  }

  if (options.minPrice > 0) {
    result = result.filter(p => p.price >= options.minPrice);
  }
  if (options.maxPrice > 0 && options.maxPrice < 500) {
    result = result.filter(p => p.price <= options.maxPrice);
  }

  switch (options.sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
    default:
      result.sort((a, b) => b.id - a.id);
      break;
  }

  return result;
}

export function getFeaturedProducts(products: Product[], count: number = 5): Product[] {
  const categoriesSeen = new Set<string>();
  const featured: Product[] = [];
  
  for (const product of products) {
    if (!categoriesSeen.has(product.category)) {
      categoriesSeen.add(product.category);
      featured.push(product);
    }
    if (featured.length === count) break;
  }
  
  return featured;
}
