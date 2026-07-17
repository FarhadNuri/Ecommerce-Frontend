import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function EmptyCart() {
  return (
    <div className="py-24 text-center">
      <h2 className="font-serif text-3xl mb-4 text-text-primary">Your cart is empty</h2>
      <p className="text-text-secondary text-[13px] mb-8">
        Looks like you haven't added anything to your cart yet.
      </p>
      <Link 
        href="/products"
        className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3.5 rounded-[4px] text-[11px] font-bold tracking-widest uppercase hover:bg-accent/90 transition-colors shadow-soft"
      >
        Continue Shopping <ArrowRight size={14} />
      </Link>
    </div>
  );
}
