"use client";
import { useState, useEffect } from 'react';

export default function PriceFilter({
  minPrice,
  maxPrice,
  onChange
}: {
  minPrice: number,
  maxPrice: number,
  onChange: (min: number, max: number) => void
}) {
  const [localMax, setLocalMax] = useState(maxPrice);
  
  useEffect(() => {
    setLocalMax(maxPrice);
  }, [maxPrice]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localMax !== maxPrice) {
        onChange(minPrice, localMax);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [localMax, minPrice, maxPrice, onChange]);

  return (
    <div className="pt-6 border-t border-border-divider mt-6">
      <h3 className="font-serif font-bold text-sm mb-6 text-text-primary">Price Range</h3>
      <div className="relative h-[2px] bg-[#E5E5E5] rounded-full mb-6 mx-1">
        <div 
          className="absolute h-full bg-accent rounded-full" 
          style={{ left: '0%', right: `${100 - (localMax / 500) * 100}%` }}
        />
        <input 
          type="range"
          min="0"
          max="500"
          step="10"
          value={localMax}
          onChange={(e) => setLocalMax(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div 
          className="absolute w-3 h-3 bg-accent rounded-full -mt-[5px] shadow-sm pointer-events-none"
          style={{ left: `calc(${(localMax / 500) * 100}% - 6px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] font-bold text-text-primary">
        <span>${minPrice}</span>
        <span>${localMax}</span>
      </div>
    </div>
  );
}
