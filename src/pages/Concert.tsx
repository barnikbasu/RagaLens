import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Volume2, Disc, Radio, Clock, Sparkles, ArrowRight, User } from 'lucide-react';
import { RagaArtwork } from '../components/ui/RagaArtwork';
import { audioEngine } from '../lib/audioEngine';

export const Concert: React.FC = () => {
  const navigate = useNavigate();
  const [selectedConcertIdx, setSelectedConcertIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isTanpuraActive, setIsTanpuraActive] = useState<boolean>(false);

  const concerts = [
    {
      title: 'Midnight Darbari Kanada in All India Radio Studio',
      artist: 'Ustad Amir Khan',
      style: 'Khayal in Vilambit Jhoomra & Drut Teentaal',
      gharana: 'Indore Gharana',
      year: '1968 Archival Recording',
      ragaId: 'darbari',
      duration: '48:30',
      art: 'darbari-oil-frame',
      notes: 'Celebrated for its prolonged mandra saptak (lower octave) meend and profound philosophical calm.'
    },
    {
      title: 'Historic Alap & Jod in Raga Yaman',
      artist: 'Ustad Vilayat Khan',
      style: 'Sitar Solo (Gayaki Ang)',
      gharana: 'Imdadkhani / Etawah Gharana',
      year: '1964 Archival Master',
      ragaId: 'yaman',
      duration: '38:15',
      art: 'yaman-archival-photo',
      notes: 'Showcasing the vocal imitation technique on sitar frets with four-note meend glides.'
    },
    {
      title: 'Raga Ahir Bhairav Dawn Mehfil',
      artist: 'Pt. Hariprasad Chaurasia',
      style: 'Bansuri (Bamboo Flute)',
      gharana: 'Maihar Gharana',
      year: '1974 Varanasi Archive',
      ragaId: 'ahir-bhairav',
      duration: '34:20',
      art: 'ahir-bhairav-watercolor',
      notes: 'Early morning meditation performed by the holy Ganga river at dawn.'
    },
    {
      title: 'Megh Malhar Monsoon Dhrupad',
      artist: 'Ustad Zia Mohiuddin Dagar',
      style: 'Rudra Veena Dhrupad',
      gharana: 'Dagarvani',
      year: '1967 National Archive',
      ragaId: 'megh',
      duration: '41:10',
      art: 'megh-monsoon',
      notes: 'Ancient rain invocation capturing deep bass oscillations and thunderous resonance.'
    }
  ];

  const current = concerts[selectedConcertIdx];

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioEngine.stopTanpura();
      setIsPlaying(false);
      setIsTanpuraActive(false);
    } else {
      audioEngine.startTanpura('Pa', 138.59);
      setIsPlaying(true);
      setIsTanpuraActive(true);
    }
  };

  return (
    <div className="w-full bg-[#F5F2EC] dark:bg-[#171716] min-h-screen text-[#252421] dark:text-[#F2EEE7] pt-8 pb-24 px-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#DCD6CC] dark:border-[#2E2D2A]">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                DIGITAL MEHFIL
              </span>
              <span className="text-xs text-[#77736D]">•</span>
              <span className="text-xs font-mono text-[#77736D]">Historic Performance Stage</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
              The Living Baithak<span className="text-[#A9232D]">.</span>
            </h1>
            <p className="text-xs md:text-sm text-[#77736D] leading-relaxed">
              Immerse yourself in legendary live performances digitized from rare tape spools and 78 RPM shellac discs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (isTanpuraActive) {
                  audioEngine.stopTanpura();
                  setIsTanpuraActive(false);
                } else {
                  audioEngine.startTanpura('Pa', 138.59);
                  setIsTanpuraActive(true);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold transition-all ${
                isTanpuraActive
                  ? 'bg-[#A9232D] text-white'
                  : 'bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] text-[#252421] dark:text-[#F2EEE7] hover:border-[#A9232D]'
              }`}
            >
              <Volume2 size={13} className={isTanpuraActive ? 'animate-pulse' : ''} />
              <span>{isTanpuraActive ? 'Tanpura Live Active' : 'Enable Ambient Tanpura'}</span>
            </button>
          </div>
        </div>

        {/* Featured Live Baithak Stage */}
        <div className="rounded-xl bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Artwork/Stage Visualizer */}
          <div className="lg:col-span-7 h-80 lg:h-auto overflow-hidden bg-[#EAE5DC] dark:bg-[#171716] border-b lg:border-b-0 lg:border-r border-[#DCD6CC] dark:border-[#2E2D2A] relative p-3">
            <div className="rounded-lg overflow-hidden h-full w-full border border-[#DCD6CC] dark:border-[#2E2D2A] relative bg-[#F5F2EC]">
              <RagaArtwork type={current.art as any} className="h-full w-full" />
              <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono uppercase tracking-wider text-white">
                ● Live Stage Feed
              </div>
            </div>
          </div>

          {/* Right Performance Info & Playback Bar */}
          <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#77736D] block">{current.year} • {current.duration}</span>
                <h2 className="text-3xl font-bold text-[#252421] dark:text-[#F2EEE7]">{current.artist}</h2>
                <p className="text-sm text-[#A9232D] font-medium">{current.title}</p>
                <span className="text-xs text-[#77736D] block">{current.gharana} • {current.style}</span>
              </div>

              <p className="text-xs text-[#77736D] leading-relaxed pt-2">
                {current.notes}
              </p>
            </div>

            {/* Play Button & Wave */}
            <div className="space-y-4 pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleTogglePlay}
                  className="w-12 h-12 rounded-full bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] flex items-center justify-center hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white transition-colors"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                </button>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-[#252421] dark:text-[#F2EEE7]">
                    {isPlaying ? 'Streaming Restored Master Reel' : 'Click to Audition Recording'}
                  </div>
                  <div className="text-[10px] font-mono text-[#77736D]">
                    {isPlaying ? 'AIR Archives Master • 24-bit 96kHz' : 'Preserved by Sangeet Natak'}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <button
                  onClick={() => navigate(`/raga/${current.ragaId}`)}
                  className="text-[#A9232D] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>View Raga Profile</span>
                  <ArrowRight size={13} />
                </button>
                <span className="text-[10px] font-mono text-[#77736D]">Lossless FLAC</span>
              </div>
            </div>
          </div>

        </div>

        {/* Concert Spools Playlist */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#252421] dark:text-[#F2EEE7]">Historic Concert Catalog</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {concerts.map((c, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedConcertIdx(idx);
                  setIsPlaying(false);
                }}
                className={`p-4 rounded-lg border cursor-pointer transition-colors space-y-2 ${
                  selectedConcertIdx === idx
                    ? 'bg-white dark:bg-[#22211F] border-[#A9232D] ring-1 ring-[#A9232D]'
                    : 'bg-white dark:bg-[#1C1B19] border-[#DCD6CC] dark:border-[#2E2D2A] hover:border-[#77736D]'
                }`}
              >
                <span className="text-[10px] font-mono text-[#77736D] block">{c.year}</span>
                <h4 className="font-bold text-sm text-[#252421] dark:text-[#F2EEE7] truncate">{c.title}</h4>
                <p className="text-xs text-[#77736D] truncate">{c.artist}</p>
                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-[#77736D]">
                  <span>{c.duration}</span>
                  {selectedConcertIdx === idx && <span className="text-[#A9232D] font-bold">● Active</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
