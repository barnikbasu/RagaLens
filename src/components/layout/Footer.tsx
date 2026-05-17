import React from 'react';
import { Heart } from 'lucide-react';
import { LotusTile } from '../ui/Divider';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-40 border-t border-teak-border pt-20 pb-10 overflow-hidden bg-deep-raat">
      <LotusTile opacity={0.05} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6 group w-fit">
                <div className="w-8 h-8 rounded-full grad-cta group-hover:scale-110 transition-transform" />
                <span className="font-display text-2xl text-kesar-gold tracking-[2px] font-bold">RAGALENS</span>
              </Link>
              <p className="text-mitti max-w-sm mb-8 leading-relaxed text-sm">
                Preserving and evolving the world's oldest musical tradition through cutting-edge technology. Empowering the next generation of classical artists.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-teak-border flex items-center justify-center hover:border-kesar-gold text-mitti hover:text-kesar-gold cursor-pointer transition-all hover:bg-kesar-gold/5">
                  <Heart size={18} />
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-ivory font-bold mb-6 text-sm uppercase tracking-widest">Explore</h4>
              <ul className="space-y-4 text-mitti text-[13px]">
                  <li className="hover:text-kesar-gold cursor-pointer transition-colors"><Link to="/explore">Raga Archive</Link></li>
                  <li className="hover:text-kesar-gold cursor-pointer transition-colors"><Link to="/concert">Digital Mehfil</Link></li>
                  <li className="hover:text-kesar-gold cursor-pointer transition-colors"><Link to="/learn">Learning Path</Link></li>
                  <li className="hover:text-kesar-gold cursor-pointer transition-colors">Community</li>
              </ul>
            </div>
            <div>
              <h4 className="text-ivory font-bold mb-6 text-sm uppercase tracking-widest">Resources</h4>
              <ul className="space-y-4 text-mitti text-[13px]">
                  <li className="hover:text-kesar-gold cursor-pointer transition-colors"><Link to="/toolkit">The Toolkit</Link></li>
                  <li className="hover:text-kesar-gold cursor-pointer transition-colors"><Link to="/detect">AI Maestro</Link></li>
                  <li className="hover:text-kesar-gold cursor-pointer transition-colors">Guru Network</li>
                  <li className="hover:text-kesar-gold cursor-pointer transition-colors">API & Research</li>
              </ul>
            </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-teak-border/30 gap-6">
            <span className="text-[11px] text-mitti tracking-[2px] uppercase font-bold">© 2026 RAGALENS — THE OS FOR CLASSICAL MUSIC</span>
            <div className="flex gap-8 text-[11px] text-mitti tracking-[2px] uppercase font-bold">
              <span className="hover:text-kesar-gold cursor-pointer">Privacy</span>
              <span className="hover:text-kesar-gold cursor-pointer">Terms</span>
              <span className="hover:text-kesar-gold cursor-pointer">Archive</span>
            </div>
        </div>
      </div>
    </footer>
  );
};
