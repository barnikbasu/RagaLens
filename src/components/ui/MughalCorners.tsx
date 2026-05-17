import React from 'react';
import { cn } from '@/src/lib/utils';

interface MughalCornersProps {
  className?: string;
  color?: string;
  opacity?: number;
}

export const MughalCorners: React.FC<MughalCornersProps> = ({ 
  className, 
  color = '#C9A227', 
  opacity = 0.55 
}) => {
  const styles = {
    borderColor: color,
    opacity,
  };

  return (
    <div className={cn("absolute inset-0 pointer-events-none p-1.5", className)}>
      <div 
        className="absolute top-1.5 left-1.5 w-[18px] height-[18px] border-l-2 border-t-2"
        style={styles}
      />
      <div 
        className="absolute top-1.5 right-1.5 w-[18px] height-[18px] border-r-2 border-t-2"
        style={styles}
      />
      <div 
        className="absolute bottom-1.5 left-1.5 w-[18px] height-[18px] border-l-2 border-b-2"
        style={styles}
      />
      <div 
        className="absolute bottom-1.5 right-1.5 w-[18px] height-[18px] border-r-2 border-b-2"
        style={styles}
      />
    </div>
  );
};
