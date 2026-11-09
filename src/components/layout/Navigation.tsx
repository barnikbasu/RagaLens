import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, Bookmark, User, Moon, Sun, X, ArrowRight, Music, SlidersHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_RAGAS, MOCK_ARTISTS } from '../../lib/ragaData';

export const Navigation: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [bookmarkedCount, setBookmarkedCount] = useState(2);
  const navigate = useNavigate();

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Detect', path: '/detect' },
    { name: 'Learn', path: '/learn' },
    { name: 'Archive', path: '/archive' },
    { name: 'Artists', path: '/artists' },
    { name: 'Toolkit', path: '/toolkit' }
  ];

  const filteredSearchResults = query.trim()
    ? {
        ragas: MOCK_RAGAS.filter(r => 
          r.name.toLowerCase().includes(query.toLowerCase()) || 
          r.thaat.toLowerCase().includes(query.toLowerCase()) ||
          r.primaryRasa.toLowerCase().includes(query.toLowerCase()) ||
          r.swaraList.some(s => s.toLowerCase() === query.toLowerCase())
        ),
        artists: MOCK_ARTISTS.filter(a =>
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.gharana.toLowerCase().includes(query.toLowerCase())
        )
      }
    : null;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F5F2EC]/95 dark:bg-[#171716]/95 backdrop-blur-md border-b border-[#DCD6CC] dark:border-[#2E2D2A] transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-1.5 focus:outline-none group">
            <span className="font-semibold text-xl tracking-tight text-[#252421] dark:text-[#F2EEE7]">
              RagaLens
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
          </Link>

          {/* Primary Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => cn(
                  "text-xs tracking-wider transition-colors py-1 relative",
                  isActive
                    ? "font-semibold text-[#252421] dark:text-[#F2EEE7]"
                    : "font-normal text-[#77736D] hover:text-[#252421] dark:hover:text-[#F2EEE7]"
                )}
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#A9232D]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Quick Global Search Bar */}
          <div className="flex-1 max-w-sm hidden md:block">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full h-8 px-3 rounded border border-[#DCD6CC] dark:border-[#2E2D2A] bg-white/70 dark:bg-[#22211F]/70 flex items-center justify-between text-xs text-[#77736D] hover:border-[#252421] dark:hover:border-[#77736D] transition-colors cursor-text"
            >
              <div className="flex items-center gap-2">
                <Search size={13} className="text-[#77736D]" />
                <span className="truncate">Search ragas, swaras, artists...</span>
              </div>
              <kbd className="text-[10px] bg-[#EAE5DC] dark:bg-[#2E2D2A] px-1.5 py-0.5 rounded text-[#252421] dark:text-[#F2EEE7] font-mono">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* System Status & Utility Controls */}
          <div className="flex items-center gap-3">
            {/* Tuning Standard Badge */}
            <Link
              to="/toolkit"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#EAE5DC] dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] text-[11px] font-medium text-[#252421] dark:text-[#F2EEE7] hover:border-[#A9232D] transition-colors"
              title="Acoustic Calibration Standard"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
              <span className="font-semibold">SA</span>
              <span className="text-[#77736D]">C# · 240Hz</span>
            </Link>

            {/* Bookmarks */}
            <Link
              to="/archive"
              className="p-1.5 text-[#77736D] hover:text-[#252421] dark:hover:text-[#F2EEE7] transition-colors relative"
              title="Saved Archival Items"
            >
              <Bookmark size={16} />
              {bookmarkedCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 text-[#77736D] hover:text-[#252421] dark:hover:text-[#F2EEE7] transition-colors"
              title="Toggle Light / Dark Canvas"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden p-1.5 text-[#77736D] hover:text-[#252421]"
              aria-label="Search"
            >
              <Search size={17} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden border-t border-[#DCD6CC] dark:border-[#2E2D2A] px-6 py-2 overflow-x-auto flex items-center gap-5 text-xs">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => cn(
                "whitespace-nowrap py-1 transition-colors",
                isActive 
                  ? "font-semibold text-[#A9232D]" 
                  : "text-[#77736D] hover:text-[#252421] dark:hover:text-[#F2EEE7]"
              )}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </header>

      {/* Global Command / Search Modal (⌘K) */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-xl bg-[#F5F2EC] dark:bg-[#22211F] rounded-lg border border-[#DCD6CC] dark:border-[#2E2D2A] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Input Header */}
            <div className="p-4 border-b border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center gap-3">
              <Search size={18} className="text-[#77736D]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by raga name, thaat, swara (e.g. S R G M), or artist..."
                autoFocus
                className="w-full bg-transparent text-sm text-[#252421] dark:text-[#F2EEE7] placeholder-[#77736D] focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-[#77736D] hover:text-[#252421] dark:hover:text-[#F2EEE7]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Suggestions / Results */}
            <div className="max-h-96 overflow-y-auto p-4 space-y-4">
              {filteredSearchResults ? (
                <>
                  {filteredSearchResults.ragas.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-[#77736D]">
                        Ragas ({filteredSearchResults.ragas.length})
                      </span>
                      <div className="space-y-1">
                        {filteredSearchResults.ragas.map((raga) => (
                          <div
                            key={raga.id}
                            onClick={() => {
                              navigate(`/raga/${raga.id}`);
                              setSearchOpen(false);
                            }}
                            className="p-2.5 rounded bg-white dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] hover:border-[#A9232D] cursor-pointer flex items-center justify-between group transition-colors"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-xs text-[#252421] dark:text-[#F2EEE7] group-hover:text-[#A9232D]">
                                  {raga.name}
                                </span>
                                {raga.devanagari && (
                                  <span className="text-xs text-[#77736D]">{raga.devanagari}</span>
                                )}
                              </div>
                              <span className="text-[11px] text-[#77736D]">
                                {raga.thaat} Thaat · {raga.time} · {raga.jati}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-[#77736D] group-hover:text-[#A9232D]">
                              {raga.arohana}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredSearchResults.artists.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-[#77736D]">
                        Artists & Gharana Maestros
                      </span>
                      <div className="space-y-1">
                        {filteredSearchResults.artists.map((artist) => (
                          <div
                            key={artist.id}
                            onClick={() => {
                              navigate('/artists');
                              setSearchOpen(false);
                            }}
                            className="p-2.5 rounded bg-white dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] hover:border-[#A9232D] cursor-pointer flex items-center justify-between group transition-colors"
                          >
                            <div>
                              <span className="font-semibold text-xs text-[#252421] dark:text-[#F2EEE7] group-hover:text-[#A9232D]">
                                {artist.name}
                              </span>
                              <p className="text-[11px] text-[#77736D]">
                                {artist.gharana} · {artist.role}
                              </p>
                            </div>
                            <ArrowRight size={14} className="text-[#77736D] group-hover:translate-x-1 transition-transform" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredSearchResults.ragas.length === 0 && filteredSearchResults.artists.length === 0 && (
                    <div className="text-center py-8 text-xs text-[#77736D]">
                      No matching ragas, swaras, or artists found for "{query}".
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-3">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-[#77736D]">
                    Suggested Inquiries
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Yaman', 'Darbari', 'Megh', 'Bhairav', 'Malkauns', 'Kirana Gharana', 'Amir Khan', '22 Shrutis'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-2.5 py-1 rounded bg-[#EAE5DC] dark:bg-[#2E2D2A] text-xs text-[#252421] dark:text-[#F2EEE7] hover:border-[#A9232D] border border-transparent transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-[#EAE5DC] dark:bg-[#171716] border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between text-[11px] text-[#77736D]">
              <span>Press <kbd className="font-mono bg-white dark:bg-[#2E2D2A] px-1 py-0.5 rounded text-[#252421] dark:text-[#F2EEE7]">ESC</kbd> to exit</span>
              <span className="font-medium text-[#252421] dark:text-[#F2EEE7]">RagaLens Archival Search</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
