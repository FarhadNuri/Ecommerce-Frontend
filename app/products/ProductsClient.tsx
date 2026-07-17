"use client";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo, useCallback, useState, useEffect } from 'react';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import { filterProducts, getFeaturedProducts } from '@/lib/filterProducts';
import ProductGrid from '@/components/product/ProductGrid';
import Link from 'next/link';
import SearchBar from '@/components/filters/SearchBar';
import CategoryFilter from '@/components/filters/CategoryFilter';
import PriceFilter from '@/components/filters/PriceFilter';
import SortDropdown from '@/components/filters/SortDropdown';

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query = searchParams.get('q') || '';
  const rawCategories = searchParams.getAll('category');
  const categories = rawCategories.filter(c => c !== 'All');
  const minPrice = Number(searchParams.get('min')) || 0;
  const maxPrice = Number(searchParams.get('max')) || 500;
  const sort = searchParams.get('sort') || 'newest';

  const updateFilters = useCallback((key: string, value: string | string[] | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(key);
    } else if (Array.isArray(value)) {
      params.delete(key);
      value.forEach(v => params.append(key, v));
    } else {
      params.set(key, value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const clearFilters = useCallback(() => {
    router.replace(pathname);
  }, [pathname, router]);

  const filteredProducts = useMemo(() => {
    return filterProducts(productsData as Product[], {
      query, categories, minPrice, maxPrice, sort
    });
  }, [query, categories, minPrice, maxPrice, sort]);

  const allCategories = ['Woman', 'Man', 'Accessories', 'Bags', 'Jewelry', 'Footwear'];

  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    setVisibleCount(9);
  }, [filteredProducts]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const handleLoadMore = () => setVisibleCount(prev => prev + 9);

  return (
    <div className="w-full bg-[#FAF9F8]">
      {query ? (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 md:py-16 min-h-[calc(100vh-64px)]">
          <h1 className="font-serif text-[26px] md:text-4xl lg:text-[44px] text-text-primary mb-2 md:mb-6">
            Search Results for <span className="italic">'{query}'</span>
          </h1>

          <div className="hidden md:flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-4 border-b border-[#E5E5E5]">
            <p className="text-[13px] text-text-secondary">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} for '{query}'
            </p>
            <SortDropdown sort={sort} onChange={(s) => updateFilters('sort', s)} />
          </div>

          <div className="md:hidden mb-8">
            <p className="text-[11px] text-text-secondary mb-5">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
            </p>
            <div className="flex gap-3">
              <button className="flex-1 bg-black text-white rounded-[20px] py-2.5 text-[9px] font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21v-7" /><path d="M4 10V3" /><path d="M12 21v-9" /><path d="M12 8V3" /><path d="M20 21v-5" /><path d="M20 12V3" /><path d="M1 14h6" /><path d="M9 8h6" /><path d="M17 16h6" /></svg>
                Filter
              </button>
              <div className="flex-1 relative">
                <select
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  value={sort}
                  onChange={(e) => updateFilters('sort', e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price Low-High</option>
                  <option value="price-desc">Price High-Low</option>
                </select>
                <div className="h-full border border-[#D1D1D1] rounded-[20px] py-2.5 text-[9px] font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-1 text-text-primary bg-white pointer-events-none">
                  Sort By: {sort === 'newest' ? 'Newest' : sort === 'price-asc' ? 'Low-High' : 'High-Low'}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <>
              <ProductGrid
                products={displayedProducts}
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
              />

              {filteredProducts.length > visibleCount && (
                <div className="flex flex-col items-center mt-12 md:mt-20 gap-6">
                  <span className="text-[12px] text-text-secondary">Showing {displayedProducts.length} of {filteredProducts.length} items</span>
                  <div className="w-48 h-[1px] bg-[#E5E5E5] mb-2">
                    <div className="h-full bg-text-primary transition-all duration-300" style={{ width: `${Math.min((displayedProducts.length / filteredProducts.length) * 100, 100)}%` }}></div>
                  </div>
                  <button
                    onClick={handleLoadMore}
                    className="w-full md:w-auto border border-[#D1D1D1] bg-[#FAF9F8] text-text-primary px-16 py-3.5 text-[9px] font-bold tracking-[0.2em] uppercase hover:border-text-primary transition-colors rounded-[2px] md:rounded-none cursor-pointer"
                  >
                    Load More Results
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="pt-12 pb-16 md:pt-24 md:pb-32">
              <div className="text-center mb-16 md:mb-24 px-4">
                <div className="w-[88px] h-[88px] bg-[#F5F5F5] rounded-full mx-auto flex items-center justify-center mb-8 relative">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                  <div className="absolute bottom-2 right-2 bg-text-secondary rounded-full p-0.5 border-[3px] border-white flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                  </div>
                </div>
                <h3 className="font-serif text-[28px] md:text-[44px] lg:text-[54px] leading-tight text-text-primary mb-4 font-bold md:font-normal">No results found</h3>
                <p className="text-text-secondary text-[13px] md:text-[14px] max-w-sm mx-auto mb-10 leading-relaxed">
                  We couldn't find anything matching <span className="font-bold italic text-text-primary">'{query}'</span>. Try broader keywords or browse our new arrivals.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-block bg-[#1B4D3E] text-white px-10 py-3.5 rounded-[30px] md:rounded-[4px] text-[13px] md:text-[11px] font-bold tracking-wide md:tracking-widest capitalize md:uppercase hover:bg-[#1B4D3E]/90 transition-colors shadow-sm"
                >
                  Back to Shop
                </button>
              </div>

              <div className="border-t border-[#E5E5E5] pt-12 md:pt-16">
                <div className="flex justify-between items-end mb-8 md:mb-10 px-4 md:px-0">
                  <h4 className="font-serif text-[15px] md:text-[22px] text-text-primary md:italic">Recommended for you</h4>
                  <Link href="/products" className="text-[11px] md:text-[10px] md:uppercase tracking-[0.1em] md:tracking-[0.15em] border-b border-text-primary pb-0.5 text-text-primary hover:text-text-secondary hover:border-text-secondary transition-colors md:font-bold">
                    View All
                  </Link>
                </div>
                <ProductGrid
                  products={getFeaturedProducts(productsData as Product[])}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 md:py-16 text-left">
            <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-4 md:mb-4">Collections</h1>
            <p className="text-[13px] text-text-secondary max-w-lg leading-relaxed hidden md:block">
              A curated selection of modern essentials, merging traditional craftsmanship with contemporary silhouettes.
            </p>
          </div>

          <div className="block md:hidden border-t border-b border-[#E5E5E5] bg-[#FAF9F8] sticky top-[64px] z-40">
            <div className="flex overflow-x-auto gap-2 px-4 py-4 hide-scrollbar">
              <button
                onClick={() => updateFilters('category', 'All')}
                className={`shrink-0 px-5 py-2 rounded-full text-[11px] font-bold tracking-wide transition-colors ${categories.length === 0 ? 'bg-black text-white' : 'bg-[#E5E5E5] text-text-primary hover:bg-[#D1D1D1]'}`}
              >
                All Items
              </button>
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => updateFilters('category', cat)}
                  className={`shrink-0 px-5 py-2 rounded-full text-[11px] font-bold tracking-wide transition-colors ${categories.includes(cat) ? 'bg-black text-white' : 'bg-[#E5E5E5] text-text-primary hover:bg-[#D1D1D1]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex border-t border-[#E5E5E5]">
              <button className="flex-1 py-3 flex items-center justify-center gap-2 border-r border-[#E5E5E5] text-[10px] font-bold uppercase tracking-widest text-text-primary hover:bg-black/5 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21v-7" /><path d="M4 10V3" /><path d="M12 21v-9" /><path d="M12 8V3" /><path d="M20 21v-5" /><path d="M20 12V3" /><path d="M1 14h6" /><path d="M9 8h6" /><path d="M17 16h6" /></svg>
                Filter
              </button>
              <div className="flex-1 flex items-center justify-center hover:bg-black/5 transition-colors">
                <div className="relative w-full h-full flex justify-center py-3">
                  <select
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    value={sort}
                    onChange={(e) => updateFilters('sort', e.target.value)}
                  >
                    <option value="newest">Relevance</option>
                    <option value="price-asc">Price Low-High</option>
                    <option value="price-desc">Price High-Low</option>
                  </select>
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-primary pointer-events-none">
                    Sort By
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#FAF9F8] md:bg-white md:border-t md:border-[#E5E5E5]">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 md:py-12">
              <div className="flex flex-col md:flex-row gap-12 lg:gap-16">

                <aside className="hidden md:block w-full md:w-60 shrink-0 space-y-10">
                  <CategoryFilter
                    allCategories={allCategories}
                    selectedCategories={categories}
                    onChange={(newCategories) => updateFilters('category', newCategories.length > 0 ? newCategories : 'All')}
                  />
                  <PriceFilter
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onChange={(min, max) => {
                      updateFilters('min', min.toString());
                      updateFilters('max', max.toString());
                    }}
                  />
                  <button
                    onClick={clearFilters}
                    className="text-xs text-text-secondary hover:text-text-primary underline decoration-1 underline-offset-[3px]"
                  >
                    Clear filters
                  </button>
                </aside>
                <main className="flex-1">
                  <div className="hidden md:flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                    <SearchBar
                      query={query}
                      onChange={(q) => updateFilters('q', q ? q : null)}
                    />
                    <div className="flex items-center gap-4 text-[13px] font-medium text-text-secondary w-full sm:w-auto shrink-0 justify-end">
                      <span className="tracking-wide">Showing {filteredProducts.length} products</span>
                      <SortDropdown
                        sort={sort}
                        onChange={(s) => updateFilters('sort', s)}
                      />
                    </div>
                  </div>

                  {filteredProducts.length > 0 ? (
                    <>
                      <ProductGrid
                        products={displayedProducts}
                        className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6 lg:gap-8"
                      />

                      {filteredProducts.length > visibleCount && (
                        <div className="flex flex-col items-center mt-12 md:mt-20 gap-6">
                          <span className="text-[12px] text-text-secondary">Showing {displayedProducts.length} of {filteredProducts.length} items</span>
                          <div className="w-48 h-[1px] bg-[#E5E5E5] mb-2">
                            <div className="h-full bg-text-primary transition-all duration-300" style={{ width: `${Math.min((displayedProducts.length / filteredProducts.length) * 100, 100)}%` }}></div>
                          </div>
                          <button
                            onClick={handleLoadMore}
                            className="w-full md:w-auto border border-[#D1D1D1] bg-white text-text-primary px-16 py-3.5 text-[9px] font-bold tracking-[0.2em] uppercase hover:border-text-primary transition-colors cursor-pointer"
                          >
                            Load More
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="py-24 text-center">
                      <h3 className="font-serif text-[26px] text-text-primary mb-3">No products found</h3>
                      <p className="text-text-secondary text-[13px] max-w-sm mx-auto">We couldn't find any products matching your current filters. Try adjusting your criteria.</p>
                      <button
                        onClick={clearFilters}
                        className="mt-8 inline-block bg-accent text-white px-8 py-3 rounded-[4px] text-[11px] font-bold tracking-widest uppercase hover:bg-accent/90 transition-colors shadow-soft"
                      >
                        Clear All Selected Filters
                      </button>
                    </div>
                  )}
                </main>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
