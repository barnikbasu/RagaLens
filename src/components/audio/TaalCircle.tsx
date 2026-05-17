import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Taal } from '@/src/lib/ragaData';

interface TaalCircleProps {
  taal: Taal;
  bpm?: number;
  isPlaying?: boolean;
}

export const TaalCircle: React.FC<TaalCircleProps> = ({ 
  taal, 
  bpm = 60, 
  isPlaying = false 
}) => {
  const [currentBeat, setCurrentBeat] = useState(1);
  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  useEffect(() => {
    if (!isPlaying) return;

    const beatInterval = (60 / bpm) * 1000;
    const interval = setInterval(() => {
      setCurrentBeat(prev => (prev % taal.beats) + 1);
    }, beatInterval);

    return () => clearInterval(interval);
  }, [isPlaying, bpm, taal.beats]);

  const getCoordinates = (beat: number) => {
    const angle = (beat - 1) * (360 / taal.beats) - 90;
    const angleRad = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleRad),
      y: centerY + radius * Math.sin(angleRad),
    };
  };

  const isSam = (beat: number) => beat === taal.sam;
  const isKhali = (beat: number) => Array.isArray(taal.khali) ? taal.khali.includes(beat) : beat === taal.khali;
  const isVibhaag = (beat: number) => taal.vibhaag_starts.includes(beat) && !isSam(beat) && !isKhali(beat);

  return (
    <div className="mughal-card p-6 flex flex-col items-center gap-4 min-w-[280px]">
      <div className="w-full flex justify-between items-center mb-2">
        <span className="text-[11px] font-medium tracking-[2px] uppercase text-mitti">Taal Visualiser</span>
        <span className="text-xs font-mono text-kesar-gold">{bpm} BPM</span>
      </div>

      <svg width="200" height="200" viewBox="0 0 200 200" className="z-10">
        {/* Connection track */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={radius} 
          fill="none" 
          stroke="#3A2A18" 
          strokeWidth="1" 
          strokeOpacity={0.5} 
        />

        {/* Beat dots */}
        {Array.from({ length: taal.beats }).map((_, i) => {
          const beat = i + 1;
          const { x, y } = getCoordinates(beat);
          const active = beat === currentBeat;
          
          let dotColor = "#3A2A18";
          let dotSize = 4;
          
          if (isSam(beat)) {
            dotColor = "#E8871A";
            dotSize = 7;
          } else if (isKhali(beat)) {
            dotColor = "#1A7F7A";
            dotSize = 6;
          } else if (isVibhaag(beat)) {
            dotColor = "#C9A227";
            dotSize = 5;
          }

          return (
            <g key={beat}>
              {isSam(beat) && (
                <circle 
                  cx={x} 
                  cy={y} 
                  r={dotSize + 4} 
                  fill={dotColor} 
                  className="opacity-20 animate-pulse" 
                />
              )}
              <motion.circle
                cx={x}
                cy={y}
                r={dotSize}
                fill={dotColor}
                animate={active ? { scale: [1, 1.6, 1] } : {}}
                transition={{ duration: 0.2 }}
                className={cn(active && "drop-shadow-[0_0_8px_rgba(232,135,26,0.6)]")}
              />
              {/* Labels for sam and khali */}
              {isSam(beat) && (
                <text x={x} y={y - 12} fontSize="10" fill="#E8871A" textAnchor="middle" className="font-bold">X</text>
              )}
              {isKhali(beat) && (
                <text x={x} y={y - 12} fontSize="10" fill="#1A7F7A" textAnchor="middle" className="font-bold">O</text>
              )}
            </g>
          );
        })}

        {/* Path cursor */}
        {isPlaying && (
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="transparent"
          >
            <animateTransform 
              attributeName="transform" 
              type="rotate" 
              from={`0 ${centerX} ${centerY}`} 
              to={`360 ${centerX} ${centerY}`} 
              dur={`${(60 / bpm) * taal.beats}s`} 
              repeatCount="indefinite" 
            />
          </motion.circle>
        )}

        {/* Center info */}
        <text x={centerX} y={centerY - 5} fontSize="18" fill="#C9A227" textAnchor="middle" className="font-display font-medium">
          {taal.name}
        </text>
        <text x={centerX} y={centerY + 15} fontSize="12" fill="#6B5A45" textAnchor="middle" className="font-sans">
          Beat {currentBeat}
        </text>
      </svg>

      <div className="w-full flex justify-between items-center mt-4 pt-4 border-t border-teak-border">
         <div className="flex flex-col">
            <span className="text-[10px] text-mitti uppercase">Vibhaag</span>
            <span className="text-[13px] text-ivory">{taal.vibhaags} sections</span>
         </div>
         <div className="flex flex-col text-right">
            <span className="text-[10px] text-mitti uppercase">Bols</span>
            <span className="text-[11px] text-sandstone italic truncate max-w-[140px]">{taal.bols}</span>
         </div>
      </div>
    </div>
  );
};
