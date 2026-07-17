"use client";
import Link from 'next/link';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';

export default function ProductCard({ product, index = 0 }: { product: Product, index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/products/${product.id}`} className="group block">
        <div className="aspect-[3/4] relative bg-[#F5F5F5] mb-4 overflow-hidden rounded-[12px]">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="space-y-1">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.04em] text-text-secondary font-bold">
            {product.category}
          </p>
          <h3 className="text-[12px] sm:text-sm font-medium text-text-primary group-hover:underline decoration-1 underline-offset-4">
            {product.name}
          </h3>
          <p className="text-[12px] sm:text-sm font-bold sm:font-normal text-text-secondary">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
