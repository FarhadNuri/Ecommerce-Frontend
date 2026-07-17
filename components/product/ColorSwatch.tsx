"use client";

const COLOR_MAP: Record<string, string> = {
  "Charcoal": "#333333",
  "Navy": "#1A237E",
  "Camel": "#C19A6B",
  "White": "#FFFFFF",
  "Black": "#000000",
  "Forest Green": "#2E7D32",
  "Grey": "#9E9E9E",
  "Light Blue": "#81D4FA",
  "Olive": "#556B2F",
  "Slate": "#708090",
  "Ivory": "#FFFFF0",
  "Maroon": "#800000",
  "Emerald": "#50C878",
  "Off-white": "#F8F8F8",
  "Beige": "#F5F5DC",
};

export default function ColorSwatch({
  colors,
  selectedColor,
  onChange
}: {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
}) {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="mb-6">
      <p className="text-xs text-text-primary mb-3">Color: <span className="font-medium text-text-secondary">{selectedColor || 'Select'}</span></p>
      <div className="flex items-center gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor === color;
          const hex = COLOR_MAP[color] || "#000000";
          return (
            <button
              key={color}
              onClick={() => onChange(color)}
              aria-label={`Select ${color}`}
              className={`w-7 h-7 rounded-full border border-[#D1D1D1] flex items-center justify-center transition-all ${
                isSelected ? 'ring-[1.5px] ring-text-primary ring-offset-[3px]' : 'hover:scale-110'
              }`}
            >
              <span className="w-full h-full rounded-full" style={{ backgroundColor: hex }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
