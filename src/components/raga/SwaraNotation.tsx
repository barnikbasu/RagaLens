import React from 'react';
import { cn } from '@/src/lib/utils';

interface SwaraNotationProps {
  label: string;
  swaras: string;
  className?: string;
  highlightedIndices?: number[];
}

export const SwaraNotation: React.FC<SwaraNotationProps> = ({ 
  label, 
  swaras, 
  className,
  highlightedIndices = []
}) => {
  const swaraList = swaras.split(' ');

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-xs text-mitti uppercase tracking-wider min-w-[80px]">{label}:</span>
      <div className="flex gap-2 font-mono text-[15px]">
        {swaraList.map((swara, i) => (
          <span 
            key={i} 
            className={cn(
              "transition-colors duration-300",
              highlightedIndices.includes(i) ? "text-saffron font-bold" : "text-kesar-gold"
            )}
          >
            {swara}
          </span>
        ))}
      </div>
    </div>
  );
};
