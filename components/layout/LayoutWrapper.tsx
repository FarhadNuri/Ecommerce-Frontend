"use client";
import { usePathname } from 'next/navigation';

export default function LayoutWrapper({ 
  children, 
  navbar, 
  footer 
}: { 
  children: React.ReactNode, 
  navbar: React.ReactNode, 
  footer: React.ReactNode 
}) {
  const pathname = usePathname();
  const isCheckout = pathname?.startsWith('/checkout');

  return (
    <>
      {!isCheckout && navbar}
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      {!isCheckout && footer}
    </>
  );
}
