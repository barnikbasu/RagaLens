import React from 'react';
import { cn } from '@/src/lib/utils';

export const Divider: React.FC<{ className?: string, showDiamond?: boolean }> = ({ 
  className, 
  showDiamond = true 
}) => {
  return (
    <div className={cn("relative flex items-center justify-center w-full my-8", className)}>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-teak-border to-transparent" />
      {showDiamond && (
        <div className="absolute bg-deep-raat px-4">
          <span className="text-kesar-gold text-sm">◆</span>
        </div>
      )}
    </div>
  );
};

export const LotusTile: React.FC<{ className?: string, opacity?: number }> = ({ 
  className, 
  opacity = 0.12 
}) => {
  return (
    <div 
      className={cn("absolute inset-0 lotus-pattern pointer-events-none", className)}
      style={{ opacity }}
    />
  );
};
