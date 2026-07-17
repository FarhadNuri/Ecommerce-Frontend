"use client";
import { useCart } from '@/context/CartContext';
import { ArrowRight, CreditCard, Banknote, Landmark } from 'lucide-react';
import Link from 'next/link';
export default function CartSummary() {
  const { cartTotal } = useCart();
  const shipping = cartTotal > 250 ? 0 : null;

  return (
    <div className="bg-[#FAF9F8] md:bg-[#F5F4F1] p-6 md:p-8 lg:p-10 rounded-none md:rounded-[4px] mt-8 md:mt-0 w-full max-w-full">
      <h2 className="hidden md:block font-serif text-[22px] mb-8 text-text-primary">Order Summary</h2>

      <div className="space-y-3 md:space-y-5 mb-8 md:mb-10 text-[12px] md:text-[13px]">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal</span>
          <span className="font-medium text-text-primary">${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>Shipping</span>
          <span className={shipping === 0 ? "italic text-text-primary" : "text-text-secondary"}>{shipping === 0 ? "$0.00" : "Calculated at checkout"}</span>
        </div>
        <div className="hidden md:flex justify-between text-text-secondary">
          <span>Tax</span>
          <span>$0.00</span>
        </div>
      </div>

      <div className="hidden md:block mb-10">
        <p className="text-[9px] font-bold tracking-widest uppercase text-text-primary mb-3">Promotional Code</p>
        <div className="flex gap-2 h-[42px]">
          <input
            type="text"
            placeholder="Enter code"
            className="flex-1 border border-[#D1D1D1] bg-transparent rounded-[4px] px-3 text-[13px] focus:outline-none focus:border-text-primary placeholder:text-text-secondary/50"
          />
          <button className="border border-[#D1D1D1] rounded-[4px] px-6 text-[13px] font-medium hover:border-text-primary transition-colors bg-transparent cursor-pointer">
            Apply
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 md:mb-8 pt-0 md:pt-6 md:border-t md:border-[#E5E5E5]">
        <span className="font-serif text-[18px] md:text-[20px] font-bold text-text-primary">Total</span>
        <span className="font-bold text-[18px] text-text-primary">${cartTotal.toFixed(2)}</span>
      </div>

      <Link href="/checkout" className="w-full bg-black md:bg-[#1B4D3E] text-white h-[48px] rounded-[2px] md:rounded-[4px] text-[10px] md:text-[11px] font-bold tracking-widest uppercase hover:bg-black/90 md:hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 mb-6 md:mb-8 shadow-sm cursor-pointer">
        Proceed to Checkout <ArrowRight size={14} className="hidden md:block" />
      </Link>

      <div className="hidden md:flex justify-center gap-4 mb-6 text-text-secondary/60">
        <CreditCard size={20} strokeWidth={1.5} />
        <Landmark size={20} strokeWidth={1.5} />
        <Banknote size={20} strokeWidth={1.5} />
      </div>

      <p className="hidden md:block text-[9px] text-center tracking-[0.15em] uppercase text-text-secondary">
        Free shipping on orders over $250
      </p>
      <p className="md:hidden text-[8px] text-center tracking-[0.15em] uppercase text-text-secondary/60">
        Secure checkout powered by VERA
      </p>
    </div>
  );
}
