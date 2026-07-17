"use client";
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SearchBar({ query, onChange }: { query: string, onChange: (q: string) => void }) {
  const [localQuery, setLocalQuery] = useState(query);
  
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onChange(localQuery);
    }
  };

  const handleBlur = () => {
    if (localQuery !== query) {
      onChange(localQuery);
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
        <Search size={16} />
      </div>
      <input
        type="text"
        placeholder="Search products... (Press Enter)"
        className="block w-full pl-10 pr-3 py-2 border border-border-divider bg-transparent text-sm focus:outline-none focus:border-text-primary"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    </div>
  );
}
