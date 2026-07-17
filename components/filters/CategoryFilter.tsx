"use client";
import { Check } from 'lucide-react';

export default function CategoryFilter({
  allCategories,
  selectedCategories,
  onChange,
}: {
  allCategories: string[],
  selectedCategories: string[],
  onChange: (categories: string[]) => void
}) {
  const toggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter(c => c !== category));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  return (
    <div>
      <h3 className="font-serif font-bold text-sm mb-4 text-text-primary">Categories</h3>
      <div className="space-y-3">
        {allCategories.map(category => {
          const isSelected = selectedCategories.includes(category);
          return (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="hidden" 
                checked={isSelected}
                onChange={() => toggle(category)}
              />
              <div className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${isSelected ? 'bg-accent border-accent text-white' : 'border-[#D1D1D1] bg-white group-hover:border-accent'}`}>
                {isSelected && <Check size={12} strokeWidth={3} />}
              </div>
              <span className={`text-sm transition-colors ${isSelected ? 'font-bold text-accent' : 'text-text-primary'}`}>
                {category}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
