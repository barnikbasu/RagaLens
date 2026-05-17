import React from 'react';
import { motion } from 'motion/react';
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
  };

  return (
    <div className={cn("absolute inset-0 pointer-events-none p-1.5 overflow-hidden", className)}>
      {/* Glow Effect on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}15 0%, transparent 70%)`
        }}
      />

      <motion.div 
        initial={{ opacity }}
        whileHover={{ opacity: 1, x: -2, y: -2 }}
        className="absolute top-1.5 left-1.5 w-[18px] h-[18px] border-l-2 border-t-2 group-hover:scale-110 transition-transform duration-500"
        style={styles}
      />
      <motion.div 
        initial={{ opacity }}
        whileHover={{ opacity: 1, x: 2, y: -2 }}
        className="absolute top-1.5 right-1.5 w-[18px] h-[18px] border-r-2 border-t-2 group-hover:scale-110 transition-transform duration-500"
        style={styles}
      />
      <motion.div 
        initial={{ opacity }}
        whileHover={{ opacity: 1, x: -2, y: 2 }}
        className="absolute bottom-1.5 left-1.5 w-[18px] h-[18px] border-l-2 border-b-2 group-hover:scale-110 transition-transform duration-500"
        style={styles}
      />
      <motion.div 
        initial={{ opacity }}
        whileHover={{ opacity: 1, x: 2, y: 2 }}
        className="absolute bottom-1.5 right-1.5 w-[18px] h-[18px] border-r-2 border-b-2 group-hover:scale-110 transition-transform duration-500"
        style={styles}
      />
    </div>
  );
};
