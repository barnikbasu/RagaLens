import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Hero } from '../components/layout/Hero';
import { Waveform } from '../components/audio/Waveform';
import { TaalCircle } from '../components/audio/TaalCircle';
import { RagaDetectionCard } from '../components/raga/RagaDetectionCard';
import { Divider, LotusTile } from '../components/ui/Divider';
import { MOCK_RAGAS, MOCK_TAALS } from '../lib/ragaData';
import { motion } from 'motion/react';
import { 
  Mic2, 
  BrainCircuit, 
  Music2, 
  ArrowRight, 
  LayoutGrid
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Home: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="pt-[64px]">
      <Hero />

      {/* Features Strip */}
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              to="/detect"
              icon={<Mic2 className="text-kesar-gold" size={32} />} 
              title="Raga Detection" 
              description="Detect any Raga instantly from humming, singing, or instrumental recordings with absolute precision." 
            />
            <FeatureCard 
              to="/learn"
              icon={<BrainCircuit className="text-raga-purple" size={32} />} 
              title="AI Guru" 
              description="Personalized feedback systems to help you master pitch, meend, and laya through deep analysis." 
            />
            <FeatureCard 
              to="/concert"
              icon={<Music2 className="text-morpankh" size={32} />} 
              title="Concert Mode" 
              description="Transform your stage presence with real-time data visualization and audience engagement tools." 
            />
        </div>
      </div>

      <Divider showDiamond={true} />

      {/* Raga Detection Demo */}
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col items-center text-center mb-24">
            <span className="text-kesar-gold text-[11px] font-bold tracking-[5px] uppercase mb-4">Laboratory</span>
            <h2 className="text-5xl md:text-7xl font-display leading-[1.1] max-w-3xl">Experience the Intelligence of Raga.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left Column: Input */}
            <div className="space-y-10">
                <div onClick={() => setIsRecording(!isRecording)} className="cursor-pointer">
                <Waveform isRecording={isRecording} />
                </div>
                <div 
                  onClick={() => navigate('/detect')}
                  className="mughal-card p-12 border-dashed border-2 flex flex-col items-center justify-center border-teak-border hover:border-kesar-gold/50 transition-all cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-full bg-deep-raat flex items-center justify-center border border-teak-border mb-6 group-hover:scale-110 transition-transform">
                      <LayoutGrid className="text-mitti group-hover:text-kesar-gold transition-colors" size={24} />
                  </div>
                  <p className="text-ivory font-display text-lg">Upload Archive</p>
                  <p className="text-[13px] text-mitti mt-2">Drop your .mp3 or .wav files for instant deep analysis</p>
                </div>
            </div>

            {/* Right Column: Output */}
            <div className="space-y-10">
                <RagaDetectionCard raga={MOCK_RAGAS[0]} confidence={92.4} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="transform md:scale-105 origin-left">
                    <TaalCircle taal={MOCK_TAALS[0]} isPlaying={isRecording} />
                </div>
                <div className="mughal-card p-8 flex flex-col justify-between gap-6 border-l-4 border-l-kesar-gold">
                    <div className="space-y-1">
                        <span className="text-[11px] font-bold tracking-[2px] uppercase text-kesar-gold">AI Insights</span>
                        <h4 className="text-ivory font-display text-lg">Performance Score</h4>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="bg-deep-raat/50 p-4 rounded-lg border border-teak-border/40">
                            <span className="text-[10px] uppercase font-bold text-morpankh">Stability</span>
                            <p className="text-xs text-sandstone mt-1 leading-relaxed">Gandhar (G) resonance is at 98%. Your microtonal consistency is exceptional today.</p>
                        </div>
                        <div className="bg-deep-raat/50 p-4 rounded-lg border border-teak-border/40">
                            <span className="text-[10px] uppercase font-bold text-sindoor">Correction</span>
                            <p className="text-xs text-sandstone mt-1 leading-relaxed">Check the transition from M̃ to D. There's a 12-cent deviation from the ideal shruti.</p>
                        </div>
                    </div>

                    <button 
                      onClick={() => navigate('/detect')}
                      className="w-full py-3 text-[11px] font-bold uppercase tracking-[2px] border border-teak-border hover:border-kesar-gold text-mitti hover:text-kesar-gold transition-all"
                    >
                        Full Analysis Report
                    </button>
                </div>
                </div>
            </div>
        </div>
      </div>

      <Divider showDiamond={true} />

      {/* Editorial / Feature Section */}
      <section className="max-w-7xl mx-auto px-6 py-40">
        <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3">
                <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="sticky top-32"
                >
                <span className="text-kesar-gold text-[10px] font-bold tracking-[8px] uppercase mb-8 block">Depth & Detail</span>
                <h3 className="text-5xl font-display leading-[1.1] mb-8">The Architecture of Silence.</h3>
                <p className="text-mitti text-sm leading-relaxed mb-10">
                    Indian Classical Music is not just about sound; it is about the spaces between. Our AI understands the silence as much as the swaras.
                </p>
                <div className="h-[1px] w-12 bg-kesar-gold mb-10" />
                <div className="flex flex-col gap-8">
                    <div className="flex gap-4">
                        <span className="text-ivory font-display text-4xl">22</span>
                        <p className="text-[11px] text-mitti uppercase tracking-wider">Shrutis detected in real-time performance.</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-ivory font-display text-4xl">∞</span>
                        <p className="text-[11px] text-mitti uppercase tracking-wider">Possibilities in every improvisation.</p>
                    </div>
                </div>
                </motion.div>
            </div>
            
            <div className="lg:w-2/3 space-y-32">
                <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
                >
                <div className="aspect-[16/9] mughal-card group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-raat via-transparent to-transparent z-10" />
                    <div className="absolute inset-0 lotus-pattern opacity-10 group-hover:scale-110 transition-transform duration-1000" />
                    <img 
                    src="https://images.unsplash.com/photo-1514525253361-aa3729e8838d?auto=format&fit=crop&q=80&w=2670" 
                    alt="Tabla Performance" 
                    className="w-full h-full object-cover grayscale opacity-50 contrast-125"
                    />
                    <div className="absolute bottom-12 left-12 z-20 max-w-lg">
                        <h4 className="text-3xl font-display text-ivory mb-4 leading-tight">Mastering the Meend: The Glissando of the Soul.</h4>
                        <p className="text-sandstone text-sm leading-relaxed">
                        Discover how our neural networks trace the continuous pitch curves of the sitar with unprecedented accuracy.
                        </p>
                    </div>
                </div>
                </motion.div>

                <div className="border-l border-teak-border pl-12 py-4">
                    <p className="text-3xl font-display text-ivory/80 leading-relaxed italic">
                    "Music is the movement of sound to reach the soul for the education of its virtue."
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-teak-border overflow-hidden grayscale">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" referrerPolicy="no-referrer" alt="Portrait" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-kesar-gold uppercase tracking-widest">A.R. Rahman</p>
                        <p className="text-[10px] text-mitti uppercase">Composer</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <Divider showDiamond={true} />

      {/* Tools Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col lg:flex-row justify-between items-baseline mb-20 gap-8">
            <div className="max-w-2xl">
            <span className="text-kesar-gold text-[11px] font-bold tracking-[5px] uppercase mb-4 block">The Toolkit</span>
            <h2 className="text-5xl md:text-7xl font-display leading-[0.9]">Everything for the <span className="text-kesar-gold italic">Riyaz.</span></h2>
            </div>
            <div className="flex flex-wrap gap-3">
                {['Daily Practice', 'Tabla & Laya', 'AI Maestro', 'Future Tools'].map((tab, i) => (
                <button 
                  key={tab} 
                  onClick={() => navigate('/toolkit')}
                  className={cn(
                    "px-8 py-3 border rounded-full text-[12px] font-bold uppercase tracking-[1px] transition-all",
                    i === 0 ? "bg-kesar-gold text-deep-raat border-kesar-gold" : "border-teak-border text-mitti hover:border-kesar-gold hover:text-kesar-gold"
                )}>
                {tab}
                </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ToolCard 
              onClick={() => navigate('/toolkit')}
              category="Gold" title="Smart Tanpura" description="Studio-quality drones that adapt to your vocal texture and resonance." 
            />
            <ToolCard 
              onClick={() => navigate('/toolkit')}
              category="Teal" title="Laya Calculator" description="Compute matras, vibhaags, and precise tihai points for complex taals." 
            />
            <ToolCard 
              onClick={() => navigate('/toolkit')}
              category="Crimson" title="Bol Trainer" description="Visual bol guide with AI-assisted pronunciation and rhythmic timing." 
            />
            <ToolCard 
              onClick={() => navigate('/toolkit')}
              category="Purple" title="Swara Galaxy" description="An interactive 3D visualization of raga relationships and hierarchies." 
            />
            <ToolCard 
              onClick={() => navigate('/toolkit')}
              category="Gold" title="Shruti Map" description="Map all 22 shrutis with microtonal precision during performance." 
            />
            <ToolCard 
              onClick={() => navigate('/toolkit')}
              category="Teal" title="Metronome Pro" description="Advanced tala grid with customizable human-feel swing and accents." 
            />
            <ToolCard 
              onClick={() => navigate('/toolkit')}
              category="Crimson" title="Tihai Builder" description="One-tap generation of tihais based on any current beat and speed." 
            />
            <ToolCard 
              onClick={() => navigate('/toolkit')}
              category="Purple" title="Resonance Lab" description="Deep analysis of your voice harmonics and resonance chamber quality." 
            />
        </div>
      </div>
    </div>
  );
};

function FeatureCard({ icon, title, description, to }: { icon: React.ReactNode, title: string, description: string, to: string }) {
  return (
    <Link to={to} className="block group">
      <motion.div 
        whileHover={{ y: -8 }}
        className="mughal-card p-10 cursor-pointer h-full"
      >
        <div className="mb-6 p-4 rounded-2xl bg-deep-raat w-fit border border-teak-border group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <h3 className="text-2xl font-display mb-4">{title}</h3>
        <p className="text-sandstone leading-relaxed text-[15px]">{description}</p>
        <div className="mt-8 flex items-center gap-2 text-kesar-gold font-bold text-xs uppercase tracking-widest cursor-pointer group/link">
          Explore Feature <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.div>
    </Link>
  );
}

function ToolCard({ category, title, description, onClick }: { category: 'Gold' | 'Teal' | 'Crimson' | 'Purple', title: string, description: string, onClick?: () => void }) {
  const colors = {
    Gold: 'border-kesar-gold',
    Teal: 'border-morpankh',
    Crimson: 'border-sindoor',
    Purple: 'border-raga-purple'
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="mughal-card p-5 group flex flex-col hover:border-kesar-gold transition-colors duration-300 cursor-pointer"
    >
      <div className="flex items-start gap-4 h-full">
         <div className={cn("w-1 self-stretch rounded-full", colors[category])} style={{ 
           backgroundColor: category === 'Gold' ? '#C9A227' : category === 'Teal' ? '#1A7F7A' : category === 'Crimson' ? '#8B0000' : '#6B3FA0' 
         }} />
         <div className="flex-1">
            <h4 className="text-ivory font-bold text-sm mb-1 group-hover:text-kesar-gold transition-colors">{title}</h4>
            <p className="text-mitti text-[11px] leading-relaxed line-clamp-3">{description}</p>
         </div>
      </div>
    </motion.div>
  );
}
