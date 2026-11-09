import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Disc, Play, Pause, Volume2, ArrowRight, BookOpen, Layers, Sparkles, Check, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import { MOCK_GHARANAS, MOCK_MANUSCRIPTS, MOCK_RAGAS } from '../lib/ragaData';
import { audioEngine } from '../lib/audioEngine';

export const Archive: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGharanaId, setSelectedGharanaId] = useState<string>('kirana');
  const [activeTapeIdx, setActiveTapeIdx] = useState<number | null>(null);
  const [isSynthPlaying, setIsSynthPlaying] = useState<boolean>(false);

  const activeGharana = MOCK_GHARANAS.find(g => g.id === selectedGharanaId) || MOCK_GHARANAS[0];

  const handlePlayTape = (idx: number, swara: string = 'S') => {
    if (activeTapeIdx === idx) {
      audioEngine.stopTanpura();
      setActiveTapeIdx(null);
    } else {
      audioEngine.startTanpura('Pa', 138.59);
      audioEngine.playSwara(swara, 1.5);
      setActiveTapeIdx(idx);
    }
  };

  const handleCompareTuning = () => {
    if (isSynthPlaying) {
      audioEngine.stopTanpura();
      setIsSynthPlaying(false);
    } else {
      setIsSynthPlaying(true);
      audioEngine.playSwara('g', 2.0);
      setTimeout(() => setIsSynthPlaying(false), 2500);
    }
  };

  return (
    <div className="w-full bg-[#F5F2EC] dark:bg-[#171716] min-h-screen text-[#252421] dark:text-[#F2EEE7] pt-8 pb-32 px-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section (Matching Reference Image 7: The Living Archive) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
              CULTURAL REPOSITORY · SANGEET ITIHAS
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
              The Living Archive<span className="text-[#A9232D]">.</span>
            </h1>
            <p className="text-xs md:text-sm text-[#77736D] max-w-xl leading-relaxed">
              Preserving living oral traditions, Guru-Shishya Parampara genealogies, calibrated 78 RPM shellac transfers, and illustrated musical treatises across six centuries of classical continuum.
            </p>
          </div>

          {/* 4 Stat Badges Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
            <div className="p-3 bg-white dark:bg-[#22211F] rounded border border-[#DCD6CC] dark:border-[#2E2D2A]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                INGESTED SHELLACS
              </span>
              <span className="text-lg md:text-xl font-bold text-[#252421] dark:text-[#F2EEE7] font-mono">
                14,820 Takes
              </span>
            </div>

            <div className="p-3 bg-white dark:bg-[#22211F] rounded border border-[#DCD6CC] dark:border-[#2E2D2A]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                LINEAGE NODES
              </span>
              <span className="text-lg md:text-xl font-bold text-[#252421] dark:text-[#F2EEE7] font-mono">
                1,204 Maestros
              </span>
            </div>

            <div className="p-3 bg-white dark:bg-[#22211F] rounded border border-[#DCD6CC] dark:border-[#2E2D2A]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                PRESERVATION STANDARD
              </span>
              <span className="text-lg md:text-xl font-bold text-[#252421] dark:text-[#F2EEE7] font-mono">
                192kHz / 24-bit FLAC
              </span>
            </div>

            <div className="p-3 bg-white dark:bg-[#22211F] rounded border border-[#DCD6CC] dark:border-[#2E2D2A]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                ACOUSTIC CALIBRATION
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
                <span className="text-base md:text-lg font-bold text-[#252421] dark:text-[#F2EEE7] font-mono">
                  Sa = 240Hz Standard
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Guru-Shishya Parampara Lineage Tree (Matching Reference Image 7) */}
        <section className="space-y-6 pt-6 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                  ACOUSTIC GENEALOGY · PARAMPARA ENGINE
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7] mt-1">
                Guru-Shishya Parampara Lineage Tree<span className="text-[#A9232D]">.</span>
              </h2>
            </div>
            <p className="text-xs text-[#77736D] max-w-md">
              Trace pedagogical inheritance, transmission of vocal aesthetic nuances, microtonal inflection (shruti), and stylistic signatures through generations.
            </p>
          </div>

          {/* Lineage Tabs Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'gwalior', name: 'Gwalior' },
              { id: 'kirana', name: 'Kirana [Active]' },
              { id: 'agra', name: 'Agra' },
              { id: 'patiala', name: 'Patiala' },
              { id: 'maihar', name: 'Maihar (Inst.)' },
              { id: 'bishnupur', name: 'Bishnupur' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedGharanaId(tab.id === 'kirana' ? 'kirana' : 'kirana')}
                className={`px-3.5 py-1.5 rounded whitespace-nowrap transition-colors ${
                  tab.id === 'kirana'
                    ? 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] font-semibold'
                    : 'bg-[#EAE5DC] dark:bg-[#22211F] text-[#77736D] hover:text-[#252421] dark:hover:text-[#F2EEE7]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Main Lineage 2-Column Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: 3 Generations Tree Hierarchy */}
            <div className="lg:col-span-8 p-6 md:p-8 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-8">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCD6CC] dark:border-[#2E2D2A] text-xs">
                <span className="font-bold text-[#252421] dark:text-[#F2EEE7]">
                  KIRANA GHARANA PARAMPARA · Western UP — c. 1870
                </span>
                <span className="font-mono text-[#77736D] text-[11px]">
                  22-Shruti Exact Tuning
                </span>
              </div>

              {/* Generation I */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D]">
                  GENERATION I · FOUNDERS & ROOTS (19TH CENTURY)
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeGharana.generations[0].masters.map((m, idx) => (
                    <div key={idx} className="p-4 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#A9232D]">
                        <span>{m.role}</span>
                        <span>{m.recordingsCount} Cylinders</span>
                      </div>
                      <h4 className="font-bold text-base text-[#252421] dark:text-[#F2EEE7]">{m.name}</h4>
                      <span className="text-xs font-mono text-[#77736D] block">{m.years}</span>
                      <p className="text-xs text-[#77736D] leading-relaxed pt-1">
                        {m.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generation II */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D]">
                  GENERATION II · DISCIPLE TRANSMISSION
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {activeGharana.generations[1].masters.map((m, idx) => (
                    <div key={idx} className="p-4 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-1.5">
                      <span className="text-[9px] font-mono uppercase text-[#A9232D] block">{m.role}</span>
                      <h4 className="font-bold text-sm text-[#252421] dark:text-[#F2EEE7]">{m.name}</h4>
                      <span className="text-[11px] font-mono text-[#77736D] block">{m.years}</span>
                      <p className="text-[11px] text-[#77736D] leading-relaxed pt-1">
                        {m.notes}
                      </p>
                      <span className="text-[10px] font-mono text-[#77736D] block pt-1">
                        {m.recordingsCount} Transfers
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generation III */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D]">
                  GENERATION III · THE MODERN MAESTROS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {activeGharana.generations[2].masters.map((m, idx) => (
                    <div key={idx} className="p-4 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-1.5">
                      <span className="text-[9px] font-mono uppercase text-[#A9232D] block">{m.role}</span>
                      <h4 className="font-bold text-sm text-[#252421] dark:text-[#F2EEE7]">{m.name}</h4>
                      <span className="text-[11px] font-mono text-[#77736D] block">{m.years}</span>
                      <p className="text-[11px] text-[#77736D] leading-relaxed pt-1">
                        {m.notes}
                      </p>
                      <span className="text-[10px] font-mono text-[#77736D] block pt-1">
                        {m.recordingsCount} Ingested Takes
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Stylistic Pillars of Kirana & Field Quote */}
            <div className="lg:col-span-4 p-6 rounded-lg bg-[#EAE5DC] dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
                    ACOUSTIC ANATOMY
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#252421] dark:text-[#F2EEE7]">
                  Stylistic Pillars of Kirana
                </h3>
              </div>

              <div className="space-y-4">
                {activeGharana.pillars.map((pillar, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-xs font-bold text-[#A9232D] font-mono">
                      {pillar.title}
                    </span>
                    <p className="text-xs text-[#77736D] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleCompareTuning}
                className="w-full py-2.5 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] text-xs font-semibold hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white transition-colors"
              >
                {isSynthPlaying ? 'Analyzing Kirana Microtones...' : 'COMPARE LINEAGE MICRO-TUNING'}
              </button>

              {activeGharana.fieldRecordQuote && (
                <div className="pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A] space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#77736D]">
                    FIELD RECORDING LOG · {activeGharana.fieldRecordQuote.year}
                  </span>
                  <p className="text-xs italic text-[#252421] dark:text-[#F2EEE7] leading-relaxed">
                    "{activeGharana.fieldRecordQuote.quote}"
                  </p>
                  <span className="text-[10px] text-[#A9232D] font-semibold block">
                    — {activeGharana.fieldRecordQuote.author}
                  </span>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Section 2: The Shellac & Tape Vault (Matching Reference Image 7) */}
        <section className="space-y-6 pt-6 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                  SOUND PRESERVATION UNIT
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7] mt-1">
                The Shellac & Tape Vault<span className="text-[#A9232D]">.</span>
              </h2>
            </div>
            <p className="text-xs text-[#77736D] max-w-md">
              Calibrated direct audio transfers from Gramophone Co. 78 RPM discs, AIR broadcast reels, and private acetate pressings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vault Card 1: 78 RPM Shellac */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#77736D]">
                  <span className="font-bold text-[#A9232D]">78 RPM SHELLAC</span>
                  <span>Matrix #CE-1249</span>
                </div>
                <span className="text-[10px] font-mono text-[#77736D] block">1935 GRAMOPHONE CO.</span>
                <h3 className="text-2xl font-bold text-[#252421] dark:text-[#F2EEE7]">Raag Jhinjhoti</h3>
                <p className="text-xs text-[#77736D]">Ustad Abdul Karim Khan (Miraj)</p>
                <div className="text-[10px] font-mono text-[#77736D] pt-1">
                  Duration: 03:10 · Pitch: C# (241.2 Hz) · Speed: 78.26 RPM
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#77736D]">Direct Stylus Transcription</span>
                  <button
                    onClick={() => handlePlayTape(0, 'S')}
                    className="flex items-center gap-1.5 text-[#A9232D] font-bold"
                  >
                    <Play size={12} fill="currentColor" />
                    <span>01:42 / 03:10</span>
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#77736D]">
                  <span>Licensing: Sangeet Natak Akademi</span>
                  <span className="font-semibold text-green-700">Lossless FLAC</span>
                </div>
              </div>
            </div>

            {/* Vault Card 2: AIR Master Tape */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#77736D]">
                  <span className="font-bold text-[#A9232D]">AIR MASTER TAPE</span>
                  <span>Reel #AIR-ND-641</span>
                </div>
                <span className="text-[10px] font-mono text-[#77736D] block">1956 ALL INDIA RADIO</span>
                <h3 className="text-2xl font-bold text-[#252421] dark:text-[#F2EEE7]">Raag Darbari Kanada Alap</h3>
                <p className="text-xs text-[#77736D]">Roshan Ara Begum (Kirana Gharana)</p>
                <div className="text-[10px] font-mono text-[#77736D] pt-1">
                  Duration: 28:44 · Pitch: D (288.0 Hz) · Format: 15 IPS Tape
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#77736D]">Andolan Resonance Inspection</span>
                  <button
                    onClick={() => handlePlayTape(1, 'g')}
                    className="flex items-center gap-1.5 text-[#A9232D] font-bold"
                  >
                    <Play size={12} fill="currentColor" />
                    <span>09:12 / 28:44</span>
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#77736D]">
                  <span>Licensing: Prasar Bharati Archives</span>
                  <span className="font-semibold text-green-700">Lossless FLAC</span>
                </div>
              </div>
            </div>

            {/* Vault Card 3: Acetate / Master Tape */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#77736D]">
                  <span className="font-bold text-[#A9232D]">ACETATE / MASTER TAPE</span>
                  <span>Lahore Live #LHR-60</span>
                </div>
                <span className="text-[10px] font-mono text-[#77736D] block">1960 LIVE CONCERT RECORDING</span>
                <h3 className="text-2xl font-bold text-[#252421] dark:text-[#F2EEE7]">Raag Yaman (Vilambit & Drut)</h3>
                <p className="text-xs text-[#77736D]">Roshan Ara Begum</p>
                <div className="text-[10px] font-mono text-[#77736D] pt-1">
                  Duration: 41:10 · Pitch: D# (308.0 Hz) · Full Baithak Take
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#77736D]">Unabridged Concert Audio</span>
                  <button
                    onClick={() => handlePlayTape(2, 'G')}
                    className="flex items-center gap-1.5 text-[#A9232D] font-bold"
                  >
                    <Play size={12} fill="currentColor" />
                    <span>00:00 / 41:10</span>
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#77736D]">
                  <span>Licensing: Private Tape Repository</span>
                  <span className="font-semibold text-green-700">Lossless FLAC</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Manuscripts, Treatises & Iconography (Matching Reference Image 7) */}
        <section className="space-y-6 pt-6 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                  ICONOGRAPHIC CORPUS
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7] mt-1">
                Manuscripts, Treatises & Iconography<span className="text-[#A9232D]">.</span>
              </h2>
            </div>
            <p className="text-xs text-[#77736D] max-w-md">
              Direct high-resolution folio scans of foundational musicological treatises, early twentieth-century field notations, and contemporary Ragamala expressions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_MANUSCRIPTS.map((ms) => (
              <div
                key={ms.id}
                className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4 flex flex-col justify-between group hover:border-[#A9232D] transition-colors"
              >
                <div className="space-y-3">
                  <div className="p-2 bg-[#EAE5DC] dark:bg-[#171716] rounded border border-[#DCD6CC] dark:border-[#2E2D2A] h-44 overflow-hidden relative">
                    <img
                      src="/public/assets/aistudio/image_8475f0d2.png"
                      alt={ms.title}
                      className="w-full h-full object-cover grayscale contrast-125 rounded group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-mono text-white">
                      {ms.folioReference}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-[#77736D] block">
                    {ms.period} · {ms.language}
                  </span>

                  <h3 className="text-xl font-bold text-[#252421] dark:text-[#F2EEE7] group-hover:text-[#A9232D] transition-colors">
                    {ms.title}
                  </h3>

                  <p className="text-xs text-[#77736D] leading-relaxed line-clamp-3">
                    {ms.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between text-xs">
                  <span className="text-[10px] text-[#77736D]">{ms.archiveLocation}</span>
                  <span className="text-[#A9232D] font-bold text-xs uppercase tracking-wider">
                    VIEW 8K SCAN →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Collaborative Custodianship & Ingestion Protocol (Matching Reference Image 7) */}
        <section className="p-8 md:p-12 rounded-xl bg-[#EAE5DC] dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                COLLABORATIVE CUSTODIANSHIP
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
              Contribute to the Living Archive<span className="text-[#A9232D]">.</span>
            </h2>

            <p className="text-xs md:text-sm text-[#77736D] leading-relaxed">
              The digital archive operates under open archival principles. Private collectors with rare tape reels, university ethnomusicology departments, and descendants of Gharana ustads are invited to submit recordings for non-destructive digital restoration and microtonal indexing.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
              <button
                onClick={() => navigate('/explore')}
                className="px-5 py-2.5 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white transition-colors"
              >
                Explore Open Corpora (CC BY-NC 4.0)
              </button>
              <button
                onClick={() => navigate('/toolkit')}
                className="text-[#252421] dark:text-[#F2EEE7] hover:text-[#A9232D] transition-colors"
              >
                • Submit Archival Reel for Digitization
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-lg bg-white dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-3 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D] block">
              ARCHIVAL INGESTION PROTOCOL
            </span>
            <ul className="space-y-2 text-[#77736D]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D] mt-1.5 shrink-0" />
                <span><strong className="text-[#252421] dark:text-[#F2EEE7]">Non-destructive Laser Scanning:</strong> Shellac and fragile 78s are digitized via non-contact optical methods preserving cracked matrices.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D] mt-1.5 shrink-0" />
                <span><strong className="text-[#252421] dark:text-[#F2EEE7]">Continuous Shruti Calibration:</strong> Raw audio is stamped with tonometric tuning curves to correct historical motor speed fluctuations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D] mt-1.5 shrink-0" />
                <span><strong className="text-[#252421] dark:text-[#F2EEE7]">Oral Provenance Metadata:</strong> Direct artist lineage attribution vetted by academic advisory board prior to public ingestion.</span>
              </li>
            </ul>
            <div className="pt-2 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between text-[10px] text-[#77736D] font-mono">
              <span>Creative Commons 4.0 Archive</span>
              <span className="text-[#A9232D]">Protocol v2.2</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
