import React from 'react';
import { motion } from 'motion/react';
import { MughalCorners } from '../ui/MughalCorners';
import { Raga } from '@/src/lib/ragaData';
import { SwaraNotation } from './SwaraNotation';

interface RagaDetectionCardProps {
  raga: Raga;
  confidence: number;
}

export const RagaDetectionCard: React.FC<RagaDetectionCardProps> = ({ raga, confidence }) => {
  return (
    <div className="mughal-card w-full max-w-xl">
      <MughalCorners />
      
      {/* Header Strip */}
      <div className="bg-deep-raat p-6 border-b border-teak-border flex justify-between items-start">
        <div>
          <span className="text-[11px] font-medium tracking-[2px] uppercase text-mitti">Detected Raga</span>
          <h2 className="text-[36px] font-display mt-1">{raga.name}</h2>
          <div className="flex gap-2 mt-2">
             <span className="text-[11px] font-semibold bg-rosewood text-kesar-gold border border-teak-border px-3 py-1 rounded-full uppercase tracking-wider">
              Thaat: {raga.thaat}
             </span>
             {raga.mood.map(m => (
               <span key={m} className="text-[11px] font-semibold bg-[#2A1800] text-saffron border border-[#3A2200] px-3 py-1 rounded-full uppercase tracking-wider">
                {m}
               </span>
             ))}
          </div>
        </div>
        <div className="bg-[#0D200D] text-[#4CAF50] border border-[#1A4A1A] rounded-full px-4 py-1.5 text-[13px] font-semibold">
          {confidence}% Match
        </div>
      </div>

      {/* Body Area */}
      <div className="p-6 space-y-6">
        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
           <div className="flex justify-between border-b border-teak-border/30 pb-2">
             <span className="text-xs text-mitti uppercase">Jati</span>
             <span className="text-[13px] font-medium text-kesar-gold">{raga.jati}</span>
           </div>
           <div className="flex justify-between border-b border-teak-border/30 pb-2">
             <span className="text-xs text-mitti uppercase">Time</span>
             <span className="text-[13px] font-medium text-kesar-gold truncate max-w-[120px]">{raga.time}</span>
           </div>
           <div className="flex justify-between border-b border-teak-border/30 pb-2">
             <span className="text-xs text-mitti uppercase">Vadi</span>
             <span className="text-[13px] font-medium text-kesar-gold">{raga.vadi}</span>
           </div>
           <div className="flex justify-between border-b border-teak-border/30 pb-2">
             <span className="text-xs text-mitti uppercase">Samvadi</span>
             <span className="text-[13px] font-medium text-kesar-gold">{raga.samvadi}</span>
           </div>
        </div>

        {/* Confidence Bar */}
        <div className="space-y-2">
           <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-mitti uppercase tracking-widest">Confidence</span>
              <span className="text-xs text-kesar-gold font-medium">{confidence}%</span>
           </div>
           <div className="h-1.5 bg-rosewood rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full grad-cta"
              />
           </div>
        </div>

        {/* Swara Notation */}
        <div className="space-y-4 pt-2">
           <SwaraNotation label="Arohana" swaras={raga.arohana} />
           <SwaraNotation label="Avarohana" swaras={raga.avarohana} />
           <SwaraNotation label="Pakad" swaras={raga.pakad} highlightedIndices={[3, 4, 5]} />
        </div>
      </div>

      {/* Footer Strip */}
      <div className="bg-oud-wood p-4 border-t border-teak-border flex items-center justify-between">
        <span className="text-[10px] text-mitti uppercase font-bold tracking-widest">Alternative Matches</span>
        <div className="flex gap-2">
           <button className="text-[11px] bg-rosewood text-sandstone border border-teak-border px-3 py-1 rounded-full hover:border-kesar-gold transition-colors">
            Kalyan (12%)
           </button>
           <button className="text-[11px] bg-rosewood text-sandstone border border-teak-border px-3 py-1 rounded-full hover:border-kesar-gold transition-colors">
            Shuddha Kalyan (4%)
           </button>
        </div>
      </div>
    </div>
  );
};
