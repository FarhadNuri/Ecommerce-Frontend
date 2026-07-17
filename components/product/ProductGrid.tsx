import { Product } from '@/types/product';
import ProductCard from './ProductCard';

export default function ProductGrid({ 
  products,
  className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6"
}: { 
  products: Product[],
  className?: string
}) {
  return (
    <div className={className}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
