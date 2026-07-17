import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = (productsData as Product[]).find(p => p.id.toString() === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
