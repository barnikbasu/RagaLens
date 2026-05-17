import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_RAGAS } from '../lib/ragaData';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Music, Heart, Share2, Play } from 'lucide-react';
import { MughalCorners } from '../components/ui/MughalCorners';
import { SwaraNotation } from '../components/raga/SwaraNotation';
import { cn } from '../lib/utils';

export const RagaDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const raga = MOCK_RAGAS.find(r => r.id === id);

  if (!raga) {
    return (
      <div className="pt-40 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-display text-ivory mb-4">Raga Not Found</h1>
        <button onClick={() => navigate('/explore')} className="text-kesar-gold flex items-center gap-2">
           <ArrowLeft size={20} /> Back to Explore
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen"
    >
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-mitti hover:text-kesar-gold transition-colors mb-12 text-xs font-bold uppercase tracking-widest"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Info */}
        <div className="lg:col-span-7 space-y-12">
           <div>
              <div className="flex items-center gap-4 mb-6">
                 <span className="text-kesar-gold text-[11px] font-bold tracking-[3px] uppercase px-3 py-1 border border-kesar-gold/30 rounded-full bg-kesar-gold/5">
                   {raga.thaat} Thaat
                 </span>
                 <span className="text-morpankh text-[11px] font-bold tracking-[3px] uppercase px-3 py-1 border border-morpankh/30 rounded-full bg-morpankh/5">
                   {raga.jati}
                 </span>
              </div>
              <h1 className="text-7xl md:text-9xl font-display text-ivory leading-[0.8] mb-8">{raga.name}</h1>
              <p className="text-sandstone text-lg leading-relaxed max-w-2xl">{raga.description}</p>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-teak-border/30">
              <InfoItem label="Time" value={raga.time} icon={<Clock size={16} />} />
              <InfoItem label="Vadi" value={raga.vadi} />
              <InfoItem label="Samvadi" value={raga.samvadi} />
              <InfoItem label="Mood" value={raga.mood.join(', ')} />
           </div>

           <div className="space-y-8">
              <h3 className="text-2xl font-display text-ivory">Swara Framework</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <NotationCard title="Arohana (Ascending)" notation={raga.arohana} />
                 <NotationCard title="Avarohana (Descending)" notation={raga.avarohana} />
              </div>
              <div className="mughal-card p-8">
                 <h4 className="text-[10px] text-mitti uppercase font-bold tracking-[3px] mb-4">Pakad (Catch Phrase)</h4>
                 <p className="text-3xl font-display text-kesar-gold">{raga.pakad}</p>
              </div>
           </div>
        </div>

        {/* Right: Actions / Media */}
        <div className="lg:col-span-5 space-y-8">
           <div className="mughal-card p-8 bg-gradient-to-br from-oud-wood to-deep-raat relative overflow-hidden">
              <MughalCorners opacity={0.5} />
              <div className="relative z-10">
                 <div className="aspect-square rounded-2xl bg-deep-raat border border-teak-border flex items-center justify-center mb-8 group cursor-pointer relative overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600`} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" />
                    <div className="w-20 h-20 rounded-full border-2 border-ivory flex items-center justify-center text-ivory backdrop-blur-md group-hover:scale-110 transition-transform">
                       <Play fill="currentColor" size={32} />
                    </div>
                 </div>
                 <div className="flex justify-between items-center mb-8">
                    <div>
                       <h4 className="text-ivory font-bold">Standard Performance</h4>
                       <p className="text-mitti text-xs">Ustad Rashid Khan • 42:15</p>
                    </div>
                    <div className="flex gap-3">
                       <button className="w-10 h-10 rounded-full border border-teak-border flex items-center justify-center text-mitti hover:text-kesar-gold transition-colors"><Heart size={18} /></button>
                       <button className="w-10 h-10 rounded-full border border-teak-border flex items-center justify-center text-mitti hover:text-kesar-gold transition-colors"><Share2 size={18} /></button>
                    </div>
                 </div>
                 <button className="w-full py-4 grad-cta text-deep-raat font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-kesar-gold/20">
                    OPEN IN CONCERT MODE
                 </button>
              </div>
           </div>

           <div className="mughal-card p-8">
              <h4 className="text-[10px] text-mitti uppercase font-bold tracking-[3px] mb-6">Expert Analysis</h4>
              <div className="space-y-6">
                 <AnalysisItem text="High concentration on Gandhar (G)." color="bg-kesar-gold" />
                 <AnalysisItem text="Avoid Rishabh (R) in Arohana." color="bg-sindoor" />
                 <AnalysisItem text="Micro-slide between Ma and Pa is critical." color="bg-morpankh" />
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const InfoItem = ({ label, value, icon }: { label: string, value: string, icon?: React.ReactNode }) => (
  <div>
    <p className="text-[10px] text-mitti uppercase font-bold tracking-widest mb-2 flex items-center gap-1.5">
      {icon} {label}
    </p>
    <p className="text-ivory font-medium">{value}</p>
  </div>
);

const NotationCard = ({ title, notation }: { title: string, notation: string }) => (
  <div className="mughal-card p-6 bg-deep-raat/50 border-teak-border/30">
    <h4 className="text-[10px] text-mitti uppercase font-bold tracking-widest mb-4">{title}</h4>
    <SwaraNotation notation={notation} />
  </div>
);

const AnalysisItem = ({ text, color }: { text: string, color: string }) => (
  <div className="flex gap-4">
    <div className={cn("w-1 h-10 rounded-full shrink-0", color)} />
    <p className="text-sandstone text-sm italic py-1">{text}</p>
  </div>
);
