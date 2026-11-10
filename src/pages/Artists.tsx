import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Disc, Music, Sparkles, BookOpen, Layers } from 'lucide-react';
import { MOCK_ARTISTS, MOCK_GHARANAS, MOCK_RAGAS, Artist, GharanaLineage } from '../lib/ragaData';

export const Artists: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGharana, setSelectedGharana] = useState<string>('All');

  const filteredArtists = MOCK_ARTISTS.filter(artist => {
    return selectedGharana === 'All' || artist.gharana.toLowerCase().includes(selectedGharana.toLowerCase());
  });

  const gharanas = [
    { id: 'All', label: 'All Gharanas' },
    { id: 'Kirana', label: 'Kirana' },
    { id: 'Indore', label: 'Indore' },
    { id: 'Maihar', label: 'Maihar' },
    { id: 'Jaipur', label: 'Jaipur-Atrauli' },
    { id: 'Patiala', label: 'Patiala' },
    { id: 'Gwalior', label: 'Gwalior' },
    { id: 'Agra', label: 'Agra' }
  ];

  return (
    <div className="w-full bg-[#F5F2EC] dark:bg-[#171716] min-h-screen text-[#252421] dark:text-[#F2EEE7] pt-8 pb-24 px-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
              GENEALOGICAL CORPUS · GURU-SHISHYA PARAMPARA
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
            Masters & Lineages.
          </h1>
          <p className="text-sm md:text-base text-[#77736D] leading-relaxed">
            Preserving centuries of oral musical memory across Gharana genealogies, vocal aesthetics, and instrumental masters of the Hindustani classical tradition.
          </p>
        </div>

        {/* Hindustani Gharana Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#DCD6CC] dark:border-[#2E2D2A]">
          {/* Gharana Segmented Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {gharanas.map(g => (
              <button
                key={g.id}
                onClick={() => setSelectedGharana(g.id)}
                className={`px-3.5 py-1.5 rounded text-xs transition-colors flex items-center gap-1.5 ${
                  selectedGharana === g.id
                    ? 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] font-semibold'
                    : 'bg-[#EAE5DC] dark:bg-[#22211F] text-[#77736D] hover:text-[#252421] dark:hover:text-[#F2EEE7]'
                }`}
              >
                {selectedGharana === g.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
                )}
                <span>{g.label}</span>
              </button>
            ))}
          </div>

          <div className="text-[11px] font-mono tracking-wider uppercase text-[#77736D]">
            <span>HINDUSTANI VOCAL & INSTRUMENTAL MAESTROS</span>
          </div>
        </div>

        {/* Featured Master Tribute Card (Ustad Amir Khan) */}
        <div className="p-6 md:p-10 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[#F5F2EC] dark:bg-[#171716] rounded border border-[#DCD6CC] dark:border-[#2E2D2A]">
            <img 
              src="/public/assets/aistudio/image_c298b7eb.png" 
              alt="Ustad Amir Khan" 
              className="w-48 h-56 object-cover rounded shadow-md grayscale contrast-125"
            />
            <div className="mt-4 text-center">
              <h3 className="font-bold text-base text-[#252421] dark:text-[#F2EEE7]">Ustad Amir Khan</h3>
              <p className="text-xs text-[#77736D]">1912 – 1974 · Founder, Indore Gharana</p>
              <span className="text-[10px] font-mono text-[#A9232D] font-semibold mt-1 inline-block">
                Ati Vilambit Pioneer
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#77736D]">
              PHILOSOPHY OF SWARA & MERUKHAND
            </span>
            <blockquote className="text-xl md:text-2xl font-bold text-[#252421] dark:text-[#F2EEE7] leading-snug">
              “The raga is not merely a scale, but a living entity. It demands patience, surrender, and a lifelong pursuit of the perfect note.”
            </blockquote>
            <p className="text-xs md:text-sm text-[#77736D] leading-relaxed">
              Through the Guru-Shishya Parampara, master musicians have preserved oral notations and microtonal nuances across centuries. Each Gharana represents an idiosyncratic aesthetic syntax, breath discipline, and architecture of improvisation.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="text-[#77736D] font-medium mr-2">Core Canonical Ragas:</span>
              {['Darbari Kanada', 'Malkauns', 'Marwa', 'Megh'].map(r => (
                <Link
                  key={r}
                  to={`/explore?q=${encodeURIComponent(r)}`}
                  className="px-2.5 py-1 rounded bg-[#EAE5DC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] text-[#252421] dark:text-[#F2EEE7] hover:border-[#A9232D] transition-colors"
                >
                  {r}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Artists Directory Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
              Archival Artists Catalog ({filteredArtists.length})
            </h2>
            <Link to="/archive" className="text-xs text-[#77736D] hover:text-[#A9232D] flex items-center gap-1">
              <span>Explore Living Archive</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map(artist => (
              <div
                key={artist.id}
                className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] hover:border-[#A9232D] transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#252421] dark:text-[#F2EEE7] group-hover:text-[#A9232D] transition-colors">
                        {artist.name}
                      </h3>
                      {artist.devanagari && (
                        <span className="text-xs text-[#77736D] block">{artist.devanagari}</span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-[#77736D]">{artist.years}</span>
                  </div>

                  <div className="text-xs text-[#77736D]">
                    <span className="font-semibold text-[#252421] dark:text-[#F2EEE7]">{artist.gharana}</span>
                    <span className="mx-1.5">·</span>
                    <span>{artist.role}</span>
                  </div>

                  <p className="text-xs text-[#77736D] leading-relaxed line-clamp-3">
                    {artist.biography}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A] space-y-3">
                  <div className="text-[11px] text-[#77736D]">
                    <span className="font-medium text-[#252421] dark:text-[#F2EEE7]">Signature Aesthetic:</span> {artist.signatureStyle}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[11px] font-mono text-[#77736D]">
                      {artist.recordingsCount} Ingested Takes
                    </span>
                    <Link
                      to={`/explore?q=${encodeURIComponent(artist.keyRagas[0] || '')}`}
                      className="text-[#A9232D] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Audition Ragas</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gharana Lineages Summary */}
        <div className="p-8 rounded-lg bg-[#EAE5DC] dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
                HERITAGE TRANSMISSION
              </span>
              <h2 className="text-2xl font-bold text-[#252421] dark:text-[#F2EEE7] mt-1">
                Gharanas & Guru-Shishya Genealogies
              </h2>
            </div>
            <Link
              to="/archive"
              className="px-4 py-2 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] text-xs font-semibold hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white transition-colors self-start md:self-auto"
            >
              View Full Parampara Lineage Tree →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_GHARANAS[0].pillars.slice(0, 3).map((pillar, idx) => (
              <div key={idx} className="p-4 rounded bg-white dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-2">
                <span className="text-xs font-bold text-[#A9232D] font-mono">{pillar.title}</span>
                <p className="text-xs text-[#77736D] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
