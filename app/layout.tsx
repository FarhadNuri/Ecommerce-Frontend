import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VERA | Modern Essentials",
  description: "Elevating the essentials through meticulous craftsmanship and sustainable linen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#FAF9F8]" suppressHydrationWarning>
        <CartProvider>
          <LayoutWrapper navbar={<Navbar />} footer={<Footer />}>
            {children}
          </LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
