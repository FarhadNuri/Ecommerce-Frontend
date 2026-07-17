import Link from 'next/link';
import productsData from '@/data/products.json';
import ProductGrid from '@/components/product/ProductGrid';
import { Product } from '@/types/product';
import { Suspense } from 'react';

import { getFeaturedProducts as getFeaturedProductsFromLib } from '@/lib/filterProducts';

async function getFeaturedProducts() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return getFeaturedProductsFromLib(productsData as Product[], 4);
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] bg-gray-200 mb-4 rounded-[12px]"></div>
          <div className="h-3 bg-gray-200 w-1/3 mb-2 rounded"></div>
          <div className="h-4 bg-gray-200 w-3/4 mb-2 rounded"></div>
          <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
        </div>
      ))}
    </div>
  );
}

async function FeaturedSection() {
  const products = await getFeaturedProducts();
  return <ProductGrid products={products} />;
}

export default function Home() {
  return (
    <div className="w-full">
      <section className="relative h-[80vh] min-h-[500px] sm:min-h-[600px] w-full bg-[#EAE8E4]">
        <img
          src="/Home.jpg"
          alt="Home banner"
          className="absolute inset-0 w-full h-full object-cover object-top brightness-90"
        />
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 h-full flex items-center justify-center sm:justify-start text-center sm:text-left">
          <div className="max-w-xl">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-text-primary mb-4 block">
              Spring / Summer 2026
            </span>
            <h1 className="font-serif text-[42px] sm:text-6xl md:text-[56px] text-white mb-8 leading-tight font-bold italic">
              The New Standard
            </h1>
            <Link
              href="/products"
              className="inline-block bg-text-primary text-white px-8 py-3.5 text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-text-primary/90 transition-colors shadow-sm"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-6 max-w-2xl mx-auto text-center">
        <p className="font-serif italic text-[14px] sm:text-lg text-text-secondary leading-relaxed">
          "Essentialism in form, sophistication in craft. A curated dialogue between modern silhouettes and archival quality."
        </p>
      </section>

      <section className="pb-16 sm:pb-24 max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-end mb-8 border-b border-text-primary/20 pb-4">
          <h2 className="font-serif text-[22px] sm:text-4xl text-text-primary">
            Featured Items
          </h2>
          <Link
            href="/products"
            className="text-[9px] font-bold text-text-primary hover:text-text-secondary transition-colors uppercase tracking-[0.15em]"
          >
            View All
          </Link>
        </div>

        <Suspense fallback={<ProductGridSkeleton />}>
          <FeaturedSection />
        </Suspense>
      </section>

      <section className="bg-[#FAF9F8] py-16 px-6 text-center">
        <h2 className="font-serif italic text-3xl mb-4 text-text-primary">Join the Inner Circle</h2>
        <p className="text-text-secondary text-[11px] max-w-sm mx-auto mb-8 leading-relaxed">
          Receive early access to seasonal drops and exclusive editorial content.
        </p>
        <form className="max-w-md mx-auto relative flex items-center border border-[#D1D1D1] focus-within:border-text-primary transition-colors">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-transparent px-4 py-3 text-[12px] placeholder:text-text-secondary/70 text-text-primary focus:outline-none"
            required
          />
          <button type="submit" className="absolute right-3 text-text-secondary hover:text-text-primary transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </form>
      </section>

      <section className="py-8 px-4 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/products?category=Accessories" className="group relative h-[200px] md:h-[300px] bg-gray-200 overflow-hidden flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800" alt="Accessories" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/10"></div>
            <span className="relative bg-white px-6 py-2.5 text-[9px] font-bold tracking-[0.2em] uppercase text-text-primary">
              Accessories
            </span>
          </Link>
          <Link href="/products?category=Footwear" className="group relative h-[200px] md:h-[300px] bg-gray-200 overflow-hidden flex items-center justify-center">
            <img src="/bg.jpg" alt="Footwear" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/10"></div>
            <span className="relative bg-white px-6 py-2.5 text-[9px] font-bold tracking-[0.2em] uppercase text-text-primary">
              Footwear
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
