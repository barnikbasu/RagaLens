import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { MughalCorners } from '../ui/MughalCorners';
import { LotusTile } from '../ui/Divider';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background & Texture */}
      <div className="absolute inset-0 bg-deep-raat">
        <LotusTile opacity={0.08} />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="flex flex-col items-start text-left max-w-2xl">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[11px] font-medium tracking-[5px] text-mitti mb-6 uppercase"
          >
            The Operating System for Classical Music
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative pr-12 pb-4 mb-4"
          >
            <MughalCorners opacity={0.6} />
            <h1 className="text-[72px] md:text-[96px] leading-[0.9] font-display mb-2">
              Hear Every <span className="text-kesar-gold">Raga.</span>
            </h1>
            <h2 className="text-4xl md:text-5xl font-display text-sandstone mt-2">
              Understand every note.
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg text-sandstone max-w-md mt-8 mb-10 leading-relaxed font-normal"
          >
            The world's first AI-powered platform designed to detect, learn, and experience the profound depths of Indian Classical tradition.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-6"
          >
            <button 
              onClick={() => navigate('/detect')}
              className="grad-cta text-deep-raat px-10 py-4 rounded-full text-sm font-bold flex items-center gap-2 group hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-kesar-gold/10"
            >
              DETECT YOUR RAGA →
            </button>
            <button 
              onClick={() => navigate('/learn')}
              className="border border-kesar-gold text-kesar-gold px-10 py-4 rounded-full text-sm font-bold hover:bg-kesar-gold/10 active:scale-95 transition-all"
            >
              EXPLORE GURUS
            </button>
          </motion.div>
        </div>

        {/* Right Visuals */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:flex flex-col gap-8 relative"
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-20 bg-kesar-gold/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="scale-95 origin-right">
             <RagaCardDemo />
          </div>
          
          <div className="scale-90 origin-right translate-x-12 -mt-12">
             <TaalCardDemo />
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Accent */}
      <div className="absolute bottom-12 left-0 w-full flex justify-center opacity-30">
        <div className="h-[1px] w-1/3 bg-gradient-to-r from-transparent via-teak-border to-transparent" />
      </div>
    </section>
  );
};

// Simplified demo components for Hero
const RagaCardDemo = () => (
  <div className="mughal-card p-6 w-[440px] pointer-events-none">
    <MughalCorners opacity={0.4} />
    <div className="flex justify-between items-start mb-6">
      <div>
        <span className="text-[10px] tracking-[2px] text-mitti">DETECTED RAGA</span>
        <h3 className="text-4xl font-display text-ivory">Yaman</h3>
        <div className="flex gap-2 mt-2">
          <span className="px-2 py-0.5 rounded-full bg-[#2A1800] border border-[#3A2200] text-[10px] text-saffron uppercase font-bold">Kalyan Thaat</span>
          <span className="px-2 py-0.5 rounded-full bg-[#201800] border border-[#302200] text-[10px] text-kesar-gold uppercase font-bold">Shringar</span>
        </div>
      </div>
      <div className="bg-[#0D200D] border border-[#1A4A1A] text-[#4CAF50] px-3 py-1 rounded-full text-[10px] font-bold">92.4% MATCH</div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-6">
       <div className="flex flex-col gap-1 border-l border-teak-border pl-3">
          <span className="text-[10px] text-mitti uppercase">Vadi</span>
          <span className="text-sm text-kesar-gold font-medium">Gandhar (G)</span>
       </div>
       <div className="flex flex-col gap-1 border-l border-teak-border pl-3">
          <span className="text-[10px] text-mitti uppercase">Samvadi</span>
          <span className="text-sm text-kesar-gold font-medium">Nishad (N)</span>
       </div>
    </div>
    <div className="bg-deep-raat p-4 rounded-xl border border-teak-border/50">
       <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
             <span className="text-[10px] text-mitti w-14 uppercase">Arohana</span>
             <span className="font-mono text-kesar-gold text-xs">N R G M̃ D N Ṡ</span>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-[10px] text-mitti w-14 uppercase">Pakad</span>
             <span className="font-mono text-kesar-gold text-xs">N R G M̃ D — M̃ G R S</span>
          </div>
       </div>
    </div>
  </div>
);

const TaalCardDemo = () => (
  <div className="mughal-card p-6 w-[400px] flex gap-6 items-center pointer-events-none">
    <div className="relative w-24 h-24">
       <svg viewBox="0 0 100 100" className="w-full h-full rotate-[-90deg]">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#3A2A18" strokeWidth="1"/>
          <circle cx="50" cy="5" r="4" fill="#E8871A"/>
          <circle cx="95" cy="50" r="3" fill="#C9A227"/>
          <circle cx="50" cy="95" r="3" fill="#1A7F7A"/>
          <circle cx="5" cy="50" r="3" fill="#C9A227"/>
       </svg>
       <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-display text-[9px] text-kesar-gold leading-none uppercase">Teentaal</span>
          <span className="text-[7px] text-mitti mt-1">16 BEATS</span>
       </div>
    </div>
    <div className="flex-1 flex flex-col gap-3">
       <div className="flex justify-between items-center">
          <span className="text-[10px] text-mitti uppercase font-bold tracking-widest">Live Taal Analysis</span>
          <span className="flex items-center gap-1.5 text-[10px] text-sindoor font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-sindoor animate-pulse"></span> REC
          </span>
       </div>
       <div className="flex items-end gap-1 h-8">
          {[3, 8, 12, 10, 6, 2, 8, 11].map((h, i) => (
            <div key={i} className="bg-kesar-gold w-[3px] rounded-full" style={{ height: `${h * 2}px`, opacity: h > 5 ? 1 : 0.3 }} />
          ))}
       </div>
       <div className="flex justify-between items-center pt-1 border-t border-teak-border/30">
          <span className="text-[10px] text-kesar-gold font-mono">BPM: 112</span>
          <div className="flex gap-1">
             <div className="w-1 h-1 rounded-full bg-kesar-gold" />
             <div className="w-1 h-1 rounded-full bg-teak-border" />
             <div className="w-1 h-1 rounded-full bg-teak-border" />
          </div>
       </div>
    </div>
  </div>
);
