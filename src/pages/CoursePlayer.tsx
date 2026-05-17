import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Play, SkipBack, SkipForward, List, Settings, Maximize2 } from 'lucide-react';
import { MughalCorners } from '../components/ui/MughalCorners';

export const CoursePlayer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen bg-deep-raat flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row gap-12">
        {/* Left: Video Player Area */}
        <div className="lg:w-2/3 flex flex-col gap-8">
           <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-mitti hover:text-kesar-gold transition-colors text-xs font-bold uppercase tracking-widest w-fit">
              <ArrowLeft size={16} /> Back to Course
           </button>
           
           <div className="aspect-video mughal-card bg-black flex items-center justify-center relative group overflow-hidden">
              <MughalCorners opacity={0.2} />
              <img src="https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale" />
              <div className="relative z-10 w-24 h-24 rounded-full border-2 border-ivory/50 flex items-center justify-center text-ivory/50 backdrop-blur-md group-hover:scale-110 group-hover:border-kesar-gold group-hover:text-kesar-gold transition-all cursor-pointer">
                 <Play fill="currentColor" size={40} />
              </div>
              
              {/* Controls Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="flex items-center gap-6">
                    <SkipBack size={20} className="text-ivory cursor-pointer hover:text-kesar-gold" />
                    <Play size={24} className="text-ivory cursor-pointer hover:text-kesar-gold" />
                    <SkipForward size={20} className="text-ivory cursor-pointer hover:text-kesar-gold" />
                    <div className="flex-1 h-1 bg-ivory/20 rounded-full relative">
                       <div className="absolute left-0 top-0 h-full w-1/3 bg-kesar-gold rounded-full" />
                    </div>
                    <div className="flex items-center gap-4 text-ivory">
                       <Settings size={18} className="cursor-pointer hover:text-kesar-gold" />
                       <Maximize2 size={18} className="cursor-pointer hover:text-kesar-gold" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <div className="flex justify-between items-end">
                 <div>
                    <span className="text-kesar-gold text-[10px] font-bold tracking-[3px] uppercase">Lesson 4 of 12</span>
                    <h1 className="text-4xl font-display text-ivory mt-2">The Intricacies of Rishabh in Yaman</h1>
                 </div>
                 <div className="flex gap-4">
                    <button className="px-6 py-2 border border-teak-border rounded-full text-xs font-bold text-mitti hover:border-kesar-gold hover:text-kesar-gold transition-colors">Resources</button>
                    <button className="px-6 py-2 border border-teak-border rounded-full text-xs font-bold text-mitti hover:border-kesar-gold hover:text-kesar-gold transition-colors">Discussion</button>
                 </div>
              </div>
              <p className="text-sandstone leading-relaxed">
                 In this lesson, Guru Ji explains the specific treatment of Rishabh (Re) in Raga Yaman, which is often omitted in the Arohana and used delicately in the Avarohana to maintain the raga's identity.
              </p>
           </div>
        </div>

        {/* Right: Sidebar / Playlist */}
        <div className="lg:w-1/3 space-y-8">
           <div className="mughal-card p-8 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                 <List className="text-kesar-gold" size={20} />
                 <h3 className="text-xl font-display text-ivory">Course Content</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                 <PlaylistTrack number={1} title="Introduction to Kalyan Thaat" duration="12:40" completed />
                 <PlaylistTrack number={2} title="Structure of Yaman" duration="18:15" completed />
                 <PlaylistTrack number={3} title="The Madhyam in Yaman" duration="24:10" completed />
                 <PlaylistTrack number={4} title="The Intricacies of Rishabh" duration="22:30" active />
                 <PlaylistTrack number={5} title="Descending Patterns (Taan)" duration="30:05" />
                 <PlaylistTrack number={6} title="Meend and Oscillations" duration="26:45" />
                 <PlaylistTrack number={7} title="Tihais in Yaman" duration="15:20" />
              </div>

              <div className="mt-8 pt-8 border-t border-teak-border/30">
                 <button className="w-full py-4 grad-cta text-deep-raat font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-kesar-gold/20">
                    Next Lesson
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const PlaylistTrack = ({ number, title, duration, active, completed }: { number: number, title: string, duration: string, active?: boolean, completed?: boolean }) => (
  <div className={cn(
    "p-4 rounded-xl border transition-all cursor-pointer group",
    active ? "bg-kesar-gold/10 border-kesar-gold/50" : "bg-deep-raat border-teak-border/30 hover:border-kesar-gold/30"
  )}>
    <div className="flex items-center gap-4">
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border",
        completed ? "bg-kesar-gold border-kesar-gold text-deep-raat" : 
        active ? "border-kesar-gold text-kesar-gold" : "border-teak-border text-mitti"
      )}>
        {completed ? "✓" : number}
      </div>
      <div className="flex-1">
        <h5 className={cn("text-xs font-medium", active ? "text-kesar-gold" : "text-ivory group-hover:text-kesar-gold")}>{title}</h5>
        <p className="text-[10px] text-mitti mt-1">{duration}</p>
      </div>
      {active && <Play size={14} className="text-kesar-gold" />}
    </div>
  </div>
);

import { cn } from '../lib/utils';
