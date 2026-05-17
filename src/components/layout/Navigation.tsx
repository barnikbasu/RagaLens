import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Menu, X, Hexagon } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: 'Explore', path: '/explore' },
    { name: 'Detect', path: '/detect' },
    { name: 'Learn', path: '/learn' },
    { name: 'Concert', path: '/concert' },
    { name: 'Archive', path: '/archive' },
    { name: 'Tools', path: '/toolkit' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-[64px] bg-deep-raat/80 backdrop-blur-2xl saturate-180 border-b border-[#2A1E10] z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <Hexagon className="text-kesar-gold fill-kesar-gold/20 group-hover:rotate-180 transition-transform duration-700" size={24} />
          <span className="font-display text-xl text-kesar-gold tracking-[2px] font-bold">RAGALENS</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => cn(
                "relative text-[11px] font-bold tracking-[2px] uppercase transition-colors duration-300 py-1",
                isActive ? "text-kesar-gold" : "text-mitti hover:text-kesar-gold"
              )}
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <div className="absolute -bottom-[21px] left-0 w-full h-[2px] bg-kesar-gold rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-[12px] font-bold uppercase tracking-[2px] text-sandstone hover:text-ivory transition-colors">
            Sign In
          </button>
          <button 
            onClick={() => navigate('/detect')}
            className="grad-cta text-deep-raat px-8 py-2.5 rounded-full text-[12px] font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            GET STARTED
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
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => cn(
                "py-6 text-left text-2xl font-display border-b border-teak-border/30",
                isActive ? "text-kesar-gold" : "text-sandstone"
              )}
            >
              {link.name}
            </NavLink>
          ))}
          <div className="mt-auto mb-8 flex flex-col gap-4">
            <button className="w-full py-5 rounded-xl border border-teak-border text-sandstone font-bold uppercase tracking-widest text-xs">
              Sign In
            </button>
            <button 
              onClick={() => { navigate('/detect'); setIsOpen(false); }}
              className="w-full py-5 rounded-xl grad-cta text-deep-raat font-bold uppercase tracking-widest text-xs"
            >
              Start Free
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
