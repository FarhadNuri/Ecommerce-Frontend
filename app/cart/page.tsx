"use client";
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import ProductGrid from '@/components/product/ProductGrid';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';

export default function CartPage() {
  const { state, cartCount } = useCart();
  const fallbackProducts = (productsData as Product[]).slice(0, 4);

  return (
    <div className="w-full bg-[#FAF9F8] min-h-[calc(100vh-64px)] pt-12 pb-24 md:pt-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="mb-12">
          <h1 className="font-serif text-4xl lg:text-[44px] text-text-primary mb-4 leading-none">Your Cart</h1>
          <p className="text-[13px] text-text-secondary font-serif italic">
            You have {cartCount} {cartCount === 1 ? 'item' : 'items'} in your bag.
          </p>
        </div>

        {state.items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 mb-24 items-start">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="border-t border-[#E5E5E5]">
                {state.items.map(item => (
                  <CartItem key={item.cartItemId} item={item} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 xl:col-span-4 sticky top-[88px]">
              <CartSummary />
            </div>
          </div>
        )}
        <section className="pt-20 border-t border-[#E5E5E5]">
          <h2 className="font-serif text-[26px] mb-10 text-text-primary">Complete the Look</h2>
          <ProductGrid products={fallbackProducts} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" />
        </section>
      </div>
    </div>
  );
}
