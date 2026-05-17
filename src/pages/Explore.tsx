import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MOCK_RAGAS, Raga } from '../lib/ragaData';
import { MughalCorners } from '../components/ui/MughalCorners';
import { Search, Filter, Clock, Heart, Music, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThaat, setSelectedThaat] = useState('All');

  const thaats = ['All', 'Kalyan', 'Bhairav', 'Bhairavi', 'Bilaval', 'Kafi', 'Asavari', 'Todi', 'Purvi', 'Marwa', 'Khamaaj'];

  const filteredRagas = MOCK_RAGAS.filter(raga => {
    const matchesSearch = raga.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesThaat = selectedThaat === 'All' || raga.thaat === selectedThaat;
    return matchesSearch && matchesThaat;
  });

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-xl">
          <span className="text-kesar-gold text-[11px] font-bold tracking-[5px] uppercase mb-4 block">Discovery</span>
          <h1 className="text-5xl md:text-7xl font-display leading-[0.9]">Explore the <span className="text-kesar-gold italic">Ragas.</span></h1>
          <p className="text-sandstone mt-6 leading-relaxed">
            Browse through our curated archive of Indian Classical Ragas. Filter by thaat, time of day, or mood to find your perfect melody.
          </p>
        </div>

        <div className="w-full md:w-96">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-mitti group-focus-within:text-kesar-gold transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by Raga name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-oud-wood border border-teak-border rounded-full py-4 pl-12 pr-6 text-sm text-ivory focus:outline-none focus:border-kesar-gold transition-all"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        <div className="flex items-center gap-2 mr-4 text-mitti text-[11px] font-bold uppercase tracking-widest">
          <Filter size={14} /> Thaat:
        </div>
        {thaats.map(thaat => (
          <button 
            key={thaat} 
            onClick={() => setSelectedThaat(thaat)}
            className={cn(
              "px-5 py-2 border rounded-full text-[12px] font-medium transition-all",
              selectedThaat === thaat ? "bg-kesar-gold text-deep-raat border-kesar-gold" : "border-teak-border text-mitti hover:border-kesar-gold hover:text-kesar-gold"
            )}
          >
            {thaat}
          </button>
        ))}
      </div>

      {/* Raga Grid */}
      {filteredRagas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRagas.map((raga, i) => (
            <RagaGridCard key={raga.id} raga={raga} index={i} />
          ))}
        </div>
      ) : (
        <div className="py-40 flex flex-col items-center justify-center text-center opacity-50">
          <div className="w-16 h-16 rounded-full border border-teak-border flex items-center justify-center mb-6">
            <Music className="text-mitti" size={24} />
          </div>
          <h3 className="text-2xl font-display text-ivory">No Ragas Found</h3>
          <p className="text-sandstone mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

const RagaGridCard = ({ raga, index }: { raga: Raga, index: number, key?: any }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mughal-card group cursor-pointer"
    >
      <MughalCorners opacity={0.3} />
      
      {/* Decorative header */}
      <div className="h-2 bg-gradient-to-r from-transparent via-teak-border to-transparent mb-6 opacity-50" />
      
      <div className="px-8 pb-8 pt-2">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold tracking-[3px] text-mitti uppercase">{raga.thaat} Thaat</span>
          <button className="text-mitti hover:text-sindoor transition-colors">
            <Heart size={16} />
          </button>
        </div>

        <h3 className="text-4xl font-display text-ivory group-hover:text-kesar-gold transition-colors mb-2">{raga.name}</h3>
        
        <div className="flex flex-wrap gap-2 mb-6">
           {raga.mood.map(m => (
             <span key={m} className="text-[9px] font-bold bg-rosewood text-saffron border border-teak-border px-2 py-0.5 rounded-full uppercase tracking-widest">
              {m}
             </span>
           ))}
        </div>

        <div className="space-y-4">
           <div className="flex items-center gap-3 text-mitti">
              <Clock size={16} />
              <span className="text-xs">{raga.time}</span>
           </div>
           
           <div className="bg-deep-raat/50 p-4 rounded-lg border border-teak-border/30 group-hover:border-kesar-gold/30 transition-colors">
              <div className="flex justify-between items-center mb-1">
                 <span className="text-[10px] text-mitti uppercase font-bold tracking-widest">Arohana</span>
                 <Music size={12} className="text-kesar-gold" />
              </div>
              <p className="text-kesar-gold font-mono text-[13px]">{raga.arohana}</p>
           </div>
        </div>

        <button className="w-full mt-8 py-3 rounded-full border border-teak-border text-[11px] font-bold uppercase tracking-[2px] text-mitti group-hover:border-kesar-gold group-hover:text-kesar-gold transition-all flex items-center justify-center gap-2">
          View Detail <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
};
