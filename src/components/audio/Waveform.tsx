import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { MughalCorners } from '../ui/MughalCorners';
import { LotusTile } from '../ui/Divider';
import { Mic, Square } from 'lucide-react';

export const Waveform: React.FC<{ isRecording?: boolean }> = ({ isRecording = false }) => {
  const [bars, setBars] = useState<number[]>(new Array(40).fill(4));

  useEffect(() => {
    if (!isRecording) {
      setBars(new Array(40).fill(4));
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.floor(Math.random() * 32) + 4));
    }, 100);

    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <div className="mughal-card p-6 flex flex-col items-center justify-between min-h-[240px]">
      <MughalCorners />
      <LotusTile opacity={0.05} />
      
      <div className="w-full flex justify-between items-center mb-4 z-10">
        <span className="text-[11px] font-medium tracking-[2px] uppercase text-mitti">Live Audio Input</span>
        {isRecording && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sindoor animate-pulse" />
            <span className="text-xs font-mono text-ivory">00:12:45</span>
          </div>
        )}
      </div>

      <div className="flex items-end justify-center gap-[3px] h-24 mb-8 z-10 w-full overflow-hidden">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            initial={{ height: 4 }}
            animate={{ height }}
            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
            className={cn(
              "w-[3px] rounded-full",
              isRecording ? "bg-kesar-gold" : "bg-teak-border opacity-80"
            )}
          />
        ))}
      </div>

      <div className="relative z-10 group">
        <button 
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
            isRecording ? "bg-sindoor shadow-[0_0_20px_rgba(139,0,0,0.4)]" : "grad-cta hover:scale-105"
          )}
          style={isRecording ? { animation: 'pulse 1.4s infinite' } : {}}
        >
          {isRecording ? <Square className="text-ivory fill-ivory" size={24} /> : <Mic className="text-deep-raat" size={28} />}
        </button>
        
        <div className="mt-4 flex flex-col items-center">
            <span className="text-[13px] text-sandstone">
              {isRecording ? "Listening to your Alaap..." : "Click to detect Your Raga"}
            </span>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201, 162, 39, 0.4); }
          50% { box-shadow: 0 0 0 16px rgba(201, 162, 39, 0); }
        }
      `}</style>
    </div>
  );
};
