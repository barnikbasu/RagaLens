import React, { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { Menu, X, Hexagon } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Explore');

  const links = ['Explore', 'Detect', 'Learn', 'Concert', 'Archive', 'Tools'];

  return (
    <nav className="fixed top-0 left-0 w-full h-[64px] bg-deep-raat/80 backdrop-blur-2xl saturate-180 border-b border-[#2A1E10] z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <Hexagon className="text-kesar-gold fill-kesar-gold/20 group-hover:rotate-180 transition-transform duration-700" size={24} />
          <span className="font-display text-xl text-kesar-gold tracking-[2px] font-bold">RAGALENS</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => setActiveLink(link)}
              className={cn(
                "relative text-[13px] font-medium transition-colors duration-300 py-1",
                activeLink === link ? "text-kesar-gold" : "text-mitti hover:text-kesar-gold"
              )}
            >
              {link}
              {activeLink === link && (
                <div className="absolute -bottom-[21px] left-0 w-full h-[2px] bg-kesar-gold rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-[13px] font-medium text-sandstone hover:text-ivory transition-colors">
            Sign In
          </button>
          <button className="grad-cta text-deep-raat px-6 py-2 rounded-full text-[13px] font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all">
            Start Free
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-kesar-gold" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 top-[64px] bg-deep-raat z-40 flex flex-col p-6 animate-in slide-in-from-right duration-300">
           {links.map((link) => (
            <button
              key={link}
              onClick={() => { setActiveLink(link); setIsOpen(false); }}
              className={cn(
                "py-4 text-left text-lg font-medium border-b border-teak-border/30",
                activeLink === link ? "text-kesar-gold" : "text-sandstone"
              )}
            >
              {link}
            </button>
          ))}
          <div className="mt-8 flex flex-col gap-4">
            <button className="w-full py-4 text-center border border-teak-border rounded-lg text-sandstone">
              Sign In
            </button>
            <button className="w-full py-4 text-center grad-cta rounded-lg text-deep-raat font-bold">
              Start Free
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
