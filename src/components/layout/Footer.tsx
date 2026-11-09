import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#EAE5DC] dark:bg-[#171716] text-[#252421] dark:text-[#F2EEE7] border-t border-[#DCD6CC] dark:border-[#2E2D2A] pt-14 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Manifesto */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-lg tracking-tight text-[#252421] dark:text-[#F2EEE7]">
                RagaLens
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
              <span className="text-xs uppercase tracking-widest text-[#77736D] ml-2">
                ARCHIVE CORPUS
              </span>
            </div>
            <p className="text-xs text-[#77736D] leading-relaxed max-w-sm">
              A computational research archive and acoustic laboratory preserving the microtonal heritage and modal architecture of Indian classical music.
            </p>
            <div className="pt-2 text-[10px] font-mono tracking-widest uppercase text-[#77736D]">
              MONOCHROME HERITAGE × CONTEMPORARY INDIAN ART
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            {/* Research */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
                Research
              </h4>
              <ul className="space-y-2 text-[#252421] dark:text-[#F2EEE7]">
                <li><Link to="/archive" className="hover:text-[#A9232D] transition-colors">Principles</Link></li>
                <li><Link to="/archive" className="hover:text-[#A9232D] transition-colors">Corpora</Link></li>
                <li><Link to="/learn" className="hover:text-[#A9232D] transition-colors">Sargam Guide</Link></li>
                <li><Link to="/archive" className="hover:text-[#A9232D] transition-colors">Institutional Access</Link></li>
              </ul>
            </div>

            {/* Collection */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
                Collection
              </h4>
              <ul className="space-y-2 text-[#252421] dark:text-[#F2EEE7]">
                <li><Link to="/explore?time=Morning" className="hover:text-[#A9232D] transition-colors">Morning Ragas</Link></li>
                <li><Link to="/explore?time=Late%20Night" className="hover:text-[#A9232D] transition-colors">Nocturnal Modes</Link></li>
                <li><Link to="/explore?jati=Audav" className="hover:text-[#A9232D] transition-colors">Rare Dhrupads</Link></li>
                <li><Link to="/archive" className="hover:text-[#A9232D] transition-colors">Parampara Vault</Link></li>
              </ul>
            </div>

            {/* Acoustic Lab */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
                Acoustic Lab
              </h4>
              <ul className="space-y-2 text-[#252421] dark:text-[#F2EEE7]">
                <li><Link to="/detect" className="hover:text-[#A9232D] transition-colors">Pitch Extraction</Link></li>
                <li><Link to="/toolkit" className="hover:text-[#A9232D] transition-colors">Shruti Tuner</Link></li>
                <li><Link to="/explore" className="hover:text-[#A9232D] transition-colors">Aaroh-Avaroh Engine</Link></li>
                <li><Link to="/toolkit" className="hover:text-[#A9232D] transition-colors">Spectrogram API</Link></li>
              </ul>
            </div>

            {/* Institutional */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
                Institutional
              </h4>
              <ul className="space-y-2 text-[#252421] dark:text-[#F2EEE7]">
                <li><span className="text-[#77736D] cursor-pointer hover:text-[#A9232D] transition-colors">Archival Registry</span></li>
                <li><span className="text-[#77736D] cursor-pointer hover:text-[#A9232D] transition-colors">Curatorial Board</span></li>
                <li><span className="text-[#77736D] cursor-pointer hover:text-[#A9232D] transition-colors">Preservation Standards</span></li>
                <li><span className="text-[#77736D] cursor-pointer hover:text-[#A9232D] transition-colors">Citation Protocol</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#77736D]">
          <p>© 2025 RAGALENS DIGITAL ARCHIVE · ALL RIGHTS RESERVED</p>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-wider">
            <span className="hover:text-[#252421] dark:hover:text-[#F2EEE7] cursor-pointer">Acoustic Integrity Policy</span>
            <span>·</span>
            <span className="hover:text-[#252421] dark:hover:text-[#F2EEE7] cursor-pointer">Terms of Ingestion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
