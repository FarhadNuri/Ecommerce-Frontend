"use client";
import { CartItemType, useCart } from '@/context/CartContext';
import { X } from 'lucide-react';
import Link from 'next/link';

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();
  const decrease = () => { if (item.quantity > 1) updateQuantity(item.cartItemId, item.quantity - 1); };
  const increase = () => { updateQuantity(item.cartItemId, item.quantity + 1); };

  return (
    <div className="flex gap-4 md:gap-6 py-6 md:py-10 border-b border-[#E5E5E5] first:border-t-0 relative">
      <button
        onClick={() => removeItem(item.cartItemId)}
        className="md:hidden absolute top-6 right-0 p-1 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
        aria-label="Remove item"
      >
        <X size={16} strokeWidth={1.5} />
      </button>

      <Link href={`/products/${item.product.id}`} className="shrink-0 block">
        <div className="w-[90px] md:w-[120px] h-[115px] md:h-[150px] bg-[#F5F5F5] rounded-[2px] md:rounded-[4px] overflow-hidden">
          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
        </div>
      </Link>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="pr-6 md:pr-0">
          <div className="flex justify-between items-start mb-1.5">
            <h3 className="font-serif text-[15px] md:text-[17px] text-text-primary">
              <Link href={`/products/${item.product.id}`}>{item.product.name}</Link>
            </h3>
            {item.size && <p className="text-[12px] text-text-secondary mt-0.5">Size: {item.size}</p>}
            <span className="hidden md:inline-block font-medium text-[15px] text-text-primary">${item.product.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between items-end md:items-end">
          <div className="flex items-center justify-between rounded-[2px] md:rounded-[4px] h-[34px] md:h-[38px] px-3 w-[80px] md:w-[90px] bg-[#F5F5F5] md:bg-[#FAF9F8] md:border border-[#E5E5E5]">
            <button onClick={decrease} className="text-text-secondary hover:text-text-primary text-lg pb-0.5 cursor-pointer" aria-label="Decrease quantity">−</button>
            <span className="text-[12px] md:text-[13px] font-medium text-text-primary">
              {item.quantity.toString().padStart(2, '0')}
            </span>
            <button onClick={increase} className="text-text-secondary hover:text-text-primary text-lg pb-0.5 cursor-pointer" aria-label="Increase quantity">+</button>
          </div>

          <span className="md:hidden font-medium text-[15px] text-text-primary mb-1">${(item.product.price * item.quantity).toFixed(2)}</span>

          <button
            onClick={() => removeItem(item.cartItemId)}
            className="hidden md:flex items-center gap-1.5 text-[12px] text-text-secondary hover:text-text-primary transition-colors pb-1 cursor-pointer"
          >
            <X size={14} strokeWidth={1.5} /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}
