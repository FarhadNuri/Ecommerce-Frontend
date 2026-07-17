"use client";
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartCount } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/products`);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'Cart', href: '/cart' },
  ];

  return (
    <header className="w-full bg-[#FAF9F8] border-b border-border-divider relative z-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-[64px] flex items-center justify-between relative">
        <div className="flex items-center gap-4 sm:hidden relative z-10">
          <button
            className="text-text-primary hover:text-text-secondary transition-colors"
            aria-label="Menu"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsMobileSearchOpen(false);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
          </button>
        </div>
        <Link href="/" className="font-serif text-[22px] font-bold tracking-tight text-text-primary absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 z-0">
          VERA
        </Link>
        <nav className="hidden sm:flex items-center gap-8 text-[13px]">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={`pb-0.5 ${pathname === link.href ? 'border-b border-text-primary text-text-primary' : 'text-text-secondary hover:text-text-primary transition-colors'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 sm:gap-5 relative z-10">
          <button
            aria-label="Search"
            className="sm:hidden text-text-primary hover:text-text-secondary transition-colors"
            onClick={() => {
              setIsMobileSearchOpen(!isMobileSearchOpen);
              setIsMobileMenuOpen(false);
            }}
          >
            <Search size={18} strokeWidth={1.5} />
          </button>
          <form onSubmit={handleSearch} className="relative hidden md:flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-[180px] h-[34px] bg-white border border-[#E5E5E5] rounded-[4px] pl-3 pr-8 text-[11px] placeholder:text-text-secondary/70 focus:outline-none focus:border-text-primary transition-all"
            />
            <button type="submit" aria-label="Search" className="absolute right-2.5 text-text-primary hover:text-text-secondary transition-colors">
              <Search size={14} strokeWidth={2} />
            </button>
          </form>
          <Link href="/cart" aria-label="Cart" className="relative text-text-primary hover:text-text-secondary transition-colors">
            <ShoppingBag size={16} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex items-center justify-center w-[14px] h-[14px] text-[8px] font-bold text-white bg-text-primary rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-[64px] left-0 w-full bg-[#FAF9F8] border-b border-border-divider flex flex-col sm:hidden shadow-lg z-40">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className={`py-4 px-6 text-[14px] ${pathname === link.href ? 'font-bold text-text-primary' : 'text-text-secondary'} border-b border-[#E5E5E5] last:border-none`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}

        {isMobileSearchOpen && (
          <div className="absolute top-[64px] left-0 w-full bg-white border-b border-border-divider p-4 sm:hidden shadow-lg z-40">
            <form onSubmit={(e) => { handleSearch(e); setIsMobileSearchOpen(false); }} className="relative flex items-center w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-[44px] bg-white border border-[#E5E5E5] rounded-[4px] pl-4 pr-10 text-[13px] placeholder:text-text-secondary/70 focus:outline-none focus:border-text-primary transition-all"
                autoFocus
              />
              <button type="submit" aria-label="Search" className="absolute right-4 text-text-primary">
                <Search size={18} strokeWidth={1.5} />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
