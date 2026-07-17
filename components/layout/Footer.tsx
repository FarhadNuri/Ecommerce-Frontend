import Link from 'next/link';
import { Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-divider pt-16">
      <div className="bg-[#FAF9F8] pt-12 sm:pt-16 pb-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 mb-12 sm:mb-16">
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-serif text-[22px] font-bold mb-4">VERA</h3>
              <p className="text-text-secondary text-[12px] max-w-[240px] leading-relaxed">
                Elevating the essentials. Our mission is to provide high-quality, timeless silhouettes for the modern individual.
              </p>
            </div>
            <div>
              <h4 className="text-[9px] font-bold tracking-[0.15em] uppercase mb-5 text-text-primary">Shop</h4>
              <ul className="space-y-3.5 text-[12px] text-text-secondary">
                <li><Link href="#" className="hover:text-text-primary transition-colors">New Arrivals</Link></li>
                <li><Link href="#" className="hover:text-text-primary transition-colors">Best Sellers</Link></li>
                <li><Link href="#" className="hover:text-text-primary transition-colors">Collection 01</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[9px] font-bold tracking-[0.15em] uppercase mb-5 text-text-primary">Support</h4>
              <ul className="space-y-3.5 text-[12px] text-text-secondary">
                <li><Link href="#" className="hover:text-text-primary transition-colors">Shipping & Returns</Link></li>
                <li><Link href="#" className="hover:text-text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[9px] font-bold tracking-[0.15em] uppercase mb-5 text-text-primary">Legal</h4>
              <ul className="space-y-3.5 text-[12px] text-text-secondary">
                <li><Link href="#" className="hover:text-text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center pt-8 border-t border-[#E5E5E5] text-[11px] text-text-secondary gap-6 sm:gap-0">
            <p>© 2026 VERA. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button aria-label="Region" className="w-8 h-8 rounded-full border border-[#D1D1D1] flex items-center justify-center hover:text-text-primary hover:border-text-primary transition-colors"><Globe size={14} strokeWidth={1.5} /></button>
              <button aria-label="Share" className="w-8 h-8 rounded-full border border-[#D1D1D1] flex items-center justify-center hover:text-text-primary hover:border-text-primary transition-colors"><Share2 size={14} strokeWidth={1.5} /></button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
