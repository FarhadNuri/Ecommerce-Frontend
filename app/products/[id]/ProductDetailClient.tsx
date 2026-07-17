"use client";
import { useState } from 'react';
import { Product } from '@/types/product';
import ProductGallery from '@/components/product/ProductGallery';
import QuantityStepper from '@/components/product/QuantityStepper';
import SizeSelector from '@/components/product/SizeSelector';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);

  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }

    addItem({
      cartItemId: `${product.id}-${selectedSize}`,
      product,
      size: selectedSize,
      color: "",
      quantity
    });

    setAdded(true);
    setSelectedSize("");
    setQuantity(1);

    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="w-full bg-[#FAF9F8] min-h-[calc(100vh-64px)] pb-24 md:pb-16 pt-0 md:pt-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 xl:gap-24">
          <div className="-mx-4 sm:mx-0 w-[calc(100%+32px)] sm:w-full md:mx-0">
            <ProductGallery images={product.images} />
          </div>

          <div className="flex flex-col pt-2 lg:pt-4 w-full relative">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold tracking-[0.04em] uppercase text-text-secondary">
                {product.category} / ESSENTIALS
              </span>
              {product.isTrending && (
                <div className="flex items-center gap-1.5 bg-[#FFF0E5] px-2 py-1 rounded-[4px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E57A3C]"></span>
                  <span className="text-[9px] font-bold tracking-widest text-[#E57A3C] uppercase pt-[1px]">Trending</span>
                </div>
              )}
            </div>

            <h1 className="font-serif text-[32px] md:text-4xl lg:text-[44px] text-text-primary mb-2 leading-[1.1]">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-[16px] md:text-[22px] text-text-primary font-medium">${product.price.toFixed(2)}</span>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onChange={(s) => {
                  setSelectedSize(s);
                  setSizeError(false);
                }}
                error={sizeError}
              />
            )}

            <div className="hidden md:flex gap-3 mb-4">
              <QuantityStepper quantity={quantity} onChange={setQuantity} />
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 flex items-center justify-center gap-2 rounded-[4px] text-[13px] tracking-wide font-medium transition-colors cursor-pointer ${added
                    ? 'bg-success text-white'
                    : 'bg-[#1B4D3E] text-white hover:bg-[#1B4D3E]/90'
                  }`}
              >
                {added ? (
                  <><Check size={16} /> Added to Cart</>
                ) : (
                  <><ShoppingBag size={16} strokeWidth={2} /> Add to Cart</>
                )}
              </button>
            </div>

            <div className="md:hidden flex gap-3 mb-10">
              <div className="flex-1">
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-text-primary mb-3 block">Quantity</span>
                <QuantityStepper quantity={quantity} onChange={setQuantity} />
              </div>
            </div>

            <hr className="border-[#E5E5E5] mb-8" />

            <div className="space-y-8">
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.1em] uppercase text-text-primary mb-4">Description</h4>
                <p className="text-[13px] text-text-secondary leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div>
                <h4 className="text-[10px] font-bold tracking-[0.1em] uppercase text-text-primary mb-4">Material & Care</h4>
                <ul className="space-y-3 text-[13px] text-text-secondary list-disc pl-4 marker:text-text-secondary">
                  <li>100% Organic Cotton Canvas</li>
                  <li>Cold Wash Only, Hang Dry</li>
                  <li>Sustainably Crafted in Portugal</li>
                </ul>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#FAF9F8] border-t border-[#E5E5E5] md:hidden z-40">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full h-12 flex items-center justify-center gap-2 rounded-[2px] text-[11px] font-bold tracking-widest uppercase transition-colors cursor-pointer ${added
                    ? 'bg-success text-white'
                    : 'bg-[#1B4D3E] text-white hover:bg-[#1B4D3E]/90'
                  }`}
              >
                {added ? (
                  <>Added to Cart</>
                ) : (
                  <>Add to Cart — ${product.price.toFixed(2)}</>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
