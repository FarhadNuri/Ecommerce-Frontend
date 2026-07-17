"use client";

export default function QuantityStepper({
  quantity,
  onChange,
  max = 10
}: {
  quantity: number;
  onChange: (q: number) => void;
  max?: number;
}) {
  const decrease = () => { if (quantity > 1) onChange(quantity - 1); };
  const increase = () => { if (quantity < max) onChange(quantity + 1); };

  return (
    <div className="flex items-center justify-between border border-border-divider rounded-[4px] h-[44px] px-4 w-[110px] bg-white">
      <button onClick={decrease} className="text-text-secondary hover:text-text-primary text-lg pb-0.5 cursor-pointer" aria-label="Decrease quantity">−</button>
      <span className="text-[13px] font-medium text-text-primary">{quantity}</span>
      <button onClick={increase} className="text-text-secondary hover:text-text-primary text-lg pb-0.5 cursor-pointer" aria-label="Increase quantity">+</button>
    </div>
  );
}
