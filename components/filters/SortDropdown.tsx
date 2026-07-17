"use client";
import { ChevronDown } from 'lucide-react';

export default function SortDropdown({ sort, onChange }: { sort: string, onChange: (s: string) => void }) {
  return (
    <div className="relative inline-flex items-center text-[9px] tracking-widest border border-[#D1D1D1] rounded-[4px] h-[34px] px-3 bg-white">
      <span className="text-text-secondary mr-1 font-bold uppercase">Sort by:</span>
      <div className="relative h-full flex items-center">
        <select 
          value={sort} 
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-transparent text-text-primary pr-4 focus:outline-none cursor-pointer outline-none uppercase"
        >
          <option value="newest">Relevance</option>
          <option value="price-asc">Price Low-High</option>
          <option value="price-desc">Price High-Low</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-text-primary">
          <ChevronDown size={12} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
