"use client";

export default function SizeSelector({
  sizes,
  selectedSize,
  onChange,
  error
}: {
  sizes: string[];
  selectedSize: string;
  onChange: (size: string) => void;
  error?: boolean;
}) {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-3">
        <p className="text-xs text-text-primary">Size</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => onChange(size)}
              className={`py-2.5 text-[11px] tracking-wider transition-colors border rounded-[4px] cursor-pointer ${
                isSelected 
                  ? 'bg-[#1B4D3E] border-[#1B4D3E] text-white font-medium' 
                  : 'bg-white border-border-divider text-text-primary hover:border-text-primary'
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
      {error && <p className="text-error text-xs mt-2">Please select a size before adding to cart.</p>}
    </div>
  );
}
