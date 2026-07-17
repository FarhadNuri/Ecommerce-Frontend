"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="aspect-[3/4] relative bg-[#F5F5F5] w-full overflow-hidden rounded-[8px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={images[activeIndex]}
            alt="Product main image"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`aspect-square relative bg-[#F5F5F5] rounded-[8px] overflow-hidden transition-all ${activeIndex === idx ? 'ring-1 ring-text-primary ring-offset-1' : 'opacity-70 hover:opacity-100'
                }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
