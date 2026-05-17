import React, { useState } from 'react';
import { Waveform } from '../components/audio/Waveform';
import { RagaDetectionCard } from '../components/raga/RagaDetectionCard';
import { TaalCircle } from '../components/audio/TaalCircle';
import { MOCK_RAGAS, MOCK_TAALS } from '../lib/ragaData';
import { Search, LayoutGrid, BrainCircuit, History } from 'lucide-react';
import { MughalCorners } from '../components/ui/MughalCorners';
import { Divider } from '../components/ui/Divider';
import { motion } from 'motion/react';

import { useNavigate } from 'react-router-dom';

export const Detect: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col items-center text-center mb-20 max-w-3xl mx-auto">
        <span className="text-kesar-gold text-[11px] font-bold tracking-[6px] uppercase mb-4 block">Analytical Tool</span>
        <h1 className="text-5xl md:text-7xl font-display leading-[0.9]">Instant Raga <span className="text-kesar-gold italic">Detection.</span></h1>
        <p className="text-sandstone mt-6 leading-relaxed">
          Record your singing or upload an audio file. Our advanced neural network will analyze the swara patterns, microtonal variations, and phrasing to identify the Raga with professional precision.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column - Controls & Input (Cols 5) */}
        <div className="lg:col-span-5 space-y-10">
          <div onClick={() => setIsRecording(!isRecording)} className="cursor-pointer">
            <Waveform isRecording={isRecording} />
          </div>

          <div 
            onClick={() => {
              // Simulate upload
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'audio/*';
              input.onchange = () => {
                setIsRecording(true);
                setTimeout(() => setIsRecording(false), 3000);
              };
              input.click();
            }}
            className="mughal-card p-12 border-dashed border-2 flex flex-col items-center justify-center border-teak-border hover:border-kesar-gold/50 transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-deep-raat flex items-center justify-center border border-teak-border mb-6 group-hover:scale-110 transition-transform">
                <LayoutGrid className="text-mitti group-hover:text-kesar-gold transition-colors" size={24} />
            </div>
            <p className="text-ivory font-display text-lg">Upload Audio</p>
            <p className="text-[13px] text-mitti mt-2">MP3, WAV, or AAC (Max 50MB)</p>
          </div>

          {/* History / Recent Detections */}
          <div className="mughal-card p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <History size={18} className="text-kesar-gold" />
                    <span className="text-[11px] font-bold uppercase tracking-[2px] text-ivory">Recent Analysis</span>
                </div>
                <button className="text-[10px] text-mitti hover:text-kesar-gold transition-colors uppercase font-bold">Clear All</button>
            </div>
            
            <div className="space-y-4">
                {[
                  { id: 'yaman', name: 'Yaman', date: 'Oct 12, 10:45 AM', match: '92.4%' },
                  { id: 'malkauns', name: 'Malkauns', date: 'Oct 11, 09:20 PM', match: '88.7%' },
                  { id: 'bhimpalasi', name: 'Bhimpalasi', date: 'Oct 10, 06:15 PM', match: '85.2%' }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => navigate(`/raga/${item.id}`)}
                    className="flex justify-between items-center p-3 sub-card border border-teak-border/30 rounded-lg hover:border-kesar-gold/40 transition-colors cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-ivory group-hover:text-kesar-gold transition-colors">{item.name}</h4>
                      <p className="text-[10px] text-mitti mt-0.5">{item.date}</p>
                    </div>
                    <span className="text-xs font-mono text-kesar-gold">{item.match}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Column - Results (Cols 7) */}
        <div className="lg:col-span-7 space-y-10">
          <RagaDetectionCard raga={MOCK_RAGAS[0]} confidence={92.4} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TaalCircle taal={MOCK_TAALS[0]} isPlaying={isRecording} />
            
            <div className="mughal-card p-10 flex flex-col justify-between border-l-4 border-kesar-gold relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <BrainCircuit size={80} className="text-kesar-gold" />
                </div>
                
                <div className="relative z-10">
                    <span className="text-kesar-gold text-[11px] font-bold tracking-[3px] uppercase mb-2 block">AI Feedback</span>
                    <h4 className="text-2xl font-display text-ivory mb-6">Master Your Phrasing</h4>
                    
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-1 h-12 bg-morpankh rounded-full" />
                            <div>
                                <p className="text-[10px] font-bold text-morpankh uppercase">Pitch Precision</p>
                                <p className="text-xs text-sandstone mt-1 leading-relaxed">Your "Ma" (Madhyam) is perfectly centered. No deviations detected.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1 h-12 bg-sindoor rounded-full opacity-60" />
                            <div>
                                <p className="text-[10px] font-bold text-sindoor uppercase tracking-widest">Meend Quality</p>
                                <p className="text-xs text-sandstone mt-1 leading-relaxed">The slide from D to N could be more fluid. Try vocalizing "Aa" more smoothly.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-teak-border/50">
                    <button 
                      onClick={() => navigate(`/raga/${MOCK_RAGAS[0].id}`)}
                      className="text-ivory text-xs font-bold uppercase tracking-[2px] flex items-center gap-2 hover:text-kesar-gold transition-colors"
                    >
                        View Detailed Insights <Search size={14} />
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
