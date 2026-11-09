import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Play, Pause, Volume2, ArrowLeft, ArrowRight, Bookmark, Share2, Check, SlidersHorizontal, Layers, Music, Info } from 'lucide-react';
import { MOCK_RAGAS, Raga } from '../lib/ragaData';
import { RagaArtwork } from '../components/ui/RagaArtwork';
import { audioEngine } from '../lib/audioEngine';

export const RagaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeRecordingIdx, setActiveRecordingIdx] = useState<number | null>(null);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [activeSwara, setActiveSwara] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSynthActive, setIsSynthActive] = useState(false);

  const raga = MOCK_RAGAS.find(r => r.id === id) || MOCK_RAGAS[0];

  const handlePlaySequence = async (swarasString: string) => {
    if (isPlayingSequence) return;
    setIsPlayingSequence(true);
    const cleaned = swarasString
      .replace(/[·,()~]/g, ' ')
      .split(/\s+/)
      .filter(s => s && s !== 'S' || s);

    for (const s of cleaned) {
      if (s) {
        setActiveSwara(s);
        audioEngine.playSwara(s, 0.85);
        await new Promise(res => setTimeout(res, 520));
      }
    }
    setActiveSwara(null);
    setIsPlayingSequence(false);
  };

  const handleTogglePlayer = () => {
    if (isPlayingAudio) {
      audioEngine.stopTanpura();
      setIsPlayingAudio(false);
    } else {
      audioEngine.startTanpura('Pa', 138.59);
      setIsPlayingAudio(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleMicrotoneSynth = () => {
    if (isSynthActive) {
      audioEngine.stopTanpura();
      setIsSynthActive(false);
    } else {
      // Play oscillating Komal Ga
      audioEngine.playSwara('g', 2.0);
      setIsSynthActive(true);
      setTimeout(() => setIsSynthActive(false), 2500);
    }
  };

  return (
    <div className="w-full bg-[#F5F2EC] dark:bg-[#171716] min-h-screen text-[#252421] dark:text-[#F2EEE7] pt-6 pb-32 px-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Curatorial Header Dossier Bar (Matching Reference Image 3) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCD6CC] dark:border-[#2E2D2A] text-[11px] text-[#77736D]">
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/explore" className="hover:text-[#252421] dark:hover:text-[#F2EEE7] flex items-center gap-1 font-semibold">
              <ArrowLeft size={13} />
              <span>DIGITAL ARCHIVE</span>
            </Link>
            <span>/</span>
            <span>CORPUS: {raga.thaat.toUpperCase()} THAAT</span>
            <span>/</span>
            <span className="text-[#A9232D] font-mono font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
              EXHIBITION PROFILE {raga.archivalRef}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono">
            <span>PAHARI RATRI DWITIYA (12 AM - 3 AM)</span>
            <span>·</span>
            <span>Standard Pitch: 240.00 Hz (C#)</span>
            <span>·</span>
            <button onClick={handleCopyLink} className="hover:text-[#A9232D] flex items-center gap-1">
              {copiedLink ? <Check size={12} className="text-green-600" /> : <Share2 size={12} />}
              <span>Curatorial Dossier</span>
            </button>
          </div>
        </div>

        {/* Hero Raga Header: Visual Mount & Royal Exegesis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Large Artwork Mount */}
          <div className="lg:col-span-6 space-y-3">
            <div className="p-3 bg-[#EAE5DC] dark:bg-[#22211F] rounded-lg border border-[#DCD6CC] dark:border-[#2E2D2A]">
              <div className="rounded overflow-hidden border border-[#DCD6CC] dark:border-[#2E2D2A] bg-[#F5F2EC] h-80 md:h-[400px] relative">
                <RagaArtwork raga={raga} className="w-full h-full" />
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-white font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
                  <span>VISUAL RENDERING: SONOROUS WEIGHT</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] text-[#77736D] px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
                <span className="font-medium text-[#252421] dark:text-[#F2EEE7]">{raga.name} · {raga.artMedium}</span>
              </span>
              <span className="font-mono">Acquisition No. 2024.11</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {[raga.time, `${raga.thaat} Thaat`, 'Kafi Ang', 'Gwalior & Kirana Heritage', raga.jati].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#EAE5DC] dark:bg-[#22211F] text-[10px] font-mono uppercase tracking-wider text-[#77736D]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Raga Profile & Acoustical Archetype */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                {raga.devanagari && (
                  <span className="text-xl md:text-2xl text-[#77736D] font-normal">
                    {raga.devanagari}
                  </span>
                )}
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#A9232D] font-semibold">
                  ROYAL NOCTURNE
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7] mt-1">
                {raga.name}<span className="text-[#A9232D]">.</span>
              </h1>
              <p className="text-xs md:text-sm text-[#77736D] leading-relaxed mt-4">
                {raga.description}
              </p>
            </div>

            {/* 4 Metadata Cards Matrix */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                  PRAKRITI (TEMPERAMENT)
                </span>
                <span className="font-bold text-sm text-[#252421] dark:text-[#F2EEE7] block">Gambhir</span>
                <span className="text-[10px] text-[#77736D]">Solemn · Meditative</span>
              </div>

              <div className="p-3.5 rounded bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                  PRINCIPAL SAPTAK
                </span>
                <span className="font-bold text-sm text-[#252421] dark:text-[#F2EEE7] block">Mandra</span>
                <span className="text-[10px] text-[#77736D]">Lower Octave Focus</span>
              </div>

              <div className="p-3.5 rounded bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                  VADI SWARA (KING)
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
                  <span className="font-bold text-sm text-[#252421] dark:text-[#F2EEE7]">
                    {raga.vadi}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                  SAMVADI (QUEEN)
                </span>
                <span className="font-bold text-sm text-[#252421] dark:text-[#F2EEE7] block">
                  {raga.samvadi}
                </span>
              </div>
            </div>

            {/* Master Audio Player Bar */}
            <div className="p-4 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between gap-4 shadow-sm">
              <button
                onClick={handleTogglePlayer}
                className="w-10 h-10 rounded-full bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] flex items-center justify-center hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white transition-colors"
              >
                {isPlayingAudio ? <Pause size={16} /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#252421] dark:text-[#F2EEE7]">
                    Vilambit Khayal • Ustad Amir Khan
                  </span>
                  <span className="text-[11px] font-mono text-[#77736D]">18:42</span>
                </div>
                <div className="text-[10px] text-[#77736D]">
                  Recorded 1968 • Jhoomra Taal • 240Hz Sa
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full h-1 bg-[#EAE5DC] dark:bg-[#171716] rounded-full overflow-hidden">
                  <div className={`h-full bg-[#A9232D] ${isPlayingAudio ? 'w-1/3 animate-pulse' : 'w-0'}`} />
                </div>
              </div>

              <span className="text-[10px] font-mono text-[#77736D] whitespace-nowrap">
                {isPlayingAudio ? '04:12' : '00:00'}
              </span>
            </div>

          </div>
        </div>

        {/* Section 1: Melodic Architecture (Matching Reference Image 3) */}
        <section className="space-y-6 pt-6 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                  GRAMMAR & OCTAVE MECHANICS
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7] mt-1">
                Melodic Architecture<span className="text-[#A9232D]">.</span>
              </h2>
            </div>
            <div className="text-xs font-mono text-[#77736D]">
              Tonal Center: <strong className="text-[#252421] dark:text-[#F2EEE7]">Shadaj (C#)</strong> · Octave Archetype: Mandra-Madhya
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Arohana Card */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#77736D] uppercase tracking-wider">
                  AROHANA · ASCENDING LINE
                </span>
                <span className="px-2 py-0.5 rounded bg-[#EAE5DC] dark:bg-[#171716] text-[10px] font-mono text-[#77736D]">
                  Vakra Ascent
                </span>
              </div>

              {/* Swara Display Grid */}
              <div className="p-4 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A]">
                <div className="text-lg md:text-xl font-bold text-[#252421] dark:text-[#F2EEE7] font-mono tracking-wider flex items-center justify-between flex-wrap gap-2">
                  {raga.arohana.split(' · ').map((sw, idx) => (
                    <span key={idx} className={`hover:text-[#A9232D] transition-colors ${activeSwara === sw ? 'text-[#A9232D] underline' : ''}`}>
                      {sw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[11px] text-[#77736D] italic">
                  *Note bypass on Gandhar: directly grazed through Madhyam*
                </span>
                <button
                  onClick={() => handlePlaySequence(raga.arohana)}
                  disabled={isPlayingSequence}
                  className="text-xs font-semibold text-[#A9232D] hover:underline flex items-center gap-1"
                >
                  <Play size={12} fill="currentColor" />
                  <span>PLAY SEQUENCE</span>
                </button>
              </div>
            </div>

            {/* Avarohana Card */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#77736D] uppercase tracking-wider">
                  AVAROHANA · DESCENDING LINE
                </span>
                <span className="px-2 py-0.5 rounded bg-[#EAE5DC] dark:bg-[#171716] text-[10px] font-mono text-[#77736D]">
                  Meend Glissando
                </span>
              </div>

              {/* Swara Display Grid */}
              <div className="p-4 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A]">
                <div className="text-lg md:text-xl font-bold text-[#252421] dark:text-[#F2EEE7] font-mono tracking-wider flex items-center justify-between flex-wrap gap-2">
                  {raga.avarohana.split(' · ').map((sw, idx) => (
                    <span key={idx} className={`hover:text-[#A9232D] transition-colors ${activeSwara === sw ? 'text-[#A9232D] underline' : ''}`}>
                      {sw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[11px] text-[#77736D] italic">
                  *Characteristic slow meend glissando connecting Pa to Re*
                </span>
                <button
                  onClick={() => handlePlaySequence(raga.avarohana)}
                  disabled={isPlayingSequence}
                  className="text-xs font-semibold text-[#A9232D] hover:underline flex items-center gap-1"
                >
                  <Play size={12} fill="currentColor" />
                  <span>PLAY SEQUENCE</span>
                </button>
              </div>
            </div>
          </div>

          {/* Pakad Signature Chalan Bar */}
          <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
                  PAKAD · SIGNATURE CHALAN
                </span>
              </div>
              <div className="text-xl md:text-2xl font-bold font-mono text-[#252421] dark:text-[#F2EEE7]">
                {raga.pakad}
              </div>
              <p className="text-xs text-[#77736D] pt-1">
                The soul-defining phrase: low octave Dha-Ni-Pa transitioning through subtle oscillation on Gandhar landing calmly on the Shadja.
              </p>
            </div>

            <button
              onClick={() => handlePlaySequence(raga.pakad)}
              disabled={isPlayingSequence}
              className="px-5 py-2.5 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] text-xs font-semibold hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white transition-colors flex items-center gap-2 self-start md:self-auto"
            >
              <Play size={13} fill="currentColor" />
              <span>Audition Chalan Phrase</span>
            </button>
          </div>
        </section>

        {/* Section 2: Microtonal Oscillation (Andolan) (Matching Reference Image 3) */}
        <section className="space-y-6 pt-6 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                  ACOUSTIC ANALYSIS & CENTS DEVIATION
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7] mt-1">
                Microtonal Oscillation (Andolan)<span className="text-[#A9232D]">.</span>
              </h2>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#77736D]">
              PRECISION: CENT-LEVEL CENTS TRACE (SRG LAB)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sinusoidal Waveform Canvas */}
            <div className="lg:col-span-8 p-6 md:p-8 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#252421] dark:text-[#F2EEE7]">
                  Waveform Drift: {raga.andolanDetails?.swara || 'Komal Gandhar (g)'}
                  <span className="text-[#A9232D] ml-2 font-mono">
                    {raga.andolanDetails?.range || '286c — 316c'}
                  </span>
                </span>
                <span className="font-mono text-[#77736D] text-[11px]">
                  PERIOD: {raga.andolanDetails?.period || '~1.05 SECONDS'}
                </span>
              </div>

              {/* Interactive Vector Sine Curve */}
              <div className="relative w-full h-44 bg-[#F5F2EC] dark:bg-[#171716] rounded border border-[#DCD6CC] dark:border-[#2E2D2A] p-4 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#77736D]">
                  <span>316 Cents (Peak Deflection)</span>
                  <span className="text-[#A9232D] font-bold">● 316c</span>
                </div>
                <div className="text-[10px] font-mono text-[#77736D] border-b border-dashed border-[#DCD6CC] dark:border-[#2E2D2A] pb-0.5">
                  300 Cents (Standard 12-TET Komal Ga)
                </div>
                <div className="text-[10px] font-mono text-[#77736D]">
                  284 Cents (Ati-Komal Valleys)
                </div>

                {/* SVG Curve */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 600 150">
                  <path
                    d="M 20 75 Q 80 15, 150 75 T 280 75 T 410 75 T 540 75 T 590 75"
                    fill="none"
                    stroke="#A9232D"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="150" cy="75" r="4" fill="#A9232D" />
                  <circle cx="215" cy="25" r="5" fill="#A9232D" className="animate-ping" />
                  <circle cx="215" cy="25" r="4" fill="#A9232D" />
                  <circle cx="345" cy="125" r="4" fill="#A9232D" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#77736D]">
                <span>— Oscillation Traverse (Heavy, deliberate andolan gamak)</span>
                <span>Measured on Rudra Veena (Asad Ali Khan Archive)</span>
              </div>
            </div>

            {/* Scholarly Exegesis & Microtone Synth Trigger */}
            <div className="lg:col-span-4 p-6 rounded-lg bg-[#EAE5DC] dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D] block">
                SCHOLARLY EXEGESIS
              </span>
              <blockquote className="text-xs md:text-sm text-[#252421] dark:text-[#F2EEE7] italic leading-relaxed">
                "{raga.andolanDetails?.quote || 'The authenticity of Darbari Kanada relies strictly on microtonal andolan in the mandra saptak (lower octave), distinguishing it decisively from Adana and Jaunpuri.'}"
              </blockquote>
              <div className="text-[11px] text-[#77736D] font-mono">
                {raga.andolanDetails?.scholar || 'Prof. B.C. Deva · Indian Musicology Corpus'}
              </div>

              <button
                onClick={toggleMicrotoneSynth}
                className="w-full py-2.5 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] text-xs font-semibold hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <SlidersHorizontal size={13} />
                <span>{isSynthActive ? 'Synthesizing...' : 'Interactive Microtone Synth · LAUNCH'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Seminal Archival Recordings (Matching Reference Image 3) */}
        <section className="space-y-6 pt-6 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                  ACOUSTIC PATRIMONY
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7] mt-1">
                Seminal Archival Recordings<span className="text-[#A9232D]">.</span>
              </h2>
            </div>
            <p className="text-xs text-[#77736D]">
              High-fidelity digitizations licensed from historic 78 RPM shellac and magnetic reel collections.
            </p>
          </div>

          <div className="space-y-3">
            {raga.recordings.map((rec, idx) => (
              <div
                key={rec.id || idx}
                className="p-5 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] hover:border-[#A9232D] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <span className="text-xl font-bold font-mono text-[#77736D]">
                    0{idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-[#252421] dark:text-[#F2EEE7] group-hover:text-[#A9232D] transition-colors">
                        {rec.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded bg-[#EAE5DC] dark:bg-[#171716] text-[9px] font-mono text-[#77736D] uppercase">
                        {rec.instrumentOrStyle}
                      </span>
                    </div>
                    <p className="text-xs text-[#77736D] mt-0.5">
                      {rec.artist} · {rec.gharana} · {rec.year}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end sm:self-auto text-xs">
                  <div className="text-right hidden md:block">
                    <span className="font-mono font-bold text-[#252421] dark:text-[#F2EEE7] block">
                      {rec.audioDuration}
                    </span>
                    <span className="text-[10px] font-mono text-[#77736D]">
                      {rec.tapeId || 'AIR ARCHIVE TAPE'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (activeRecordingIdx === idx) {
                        audioEngine.stopTanpura();
                        setActiveRecordingIdx(null);
                      } else {
                        audioEngine.startTanpura('Pa', 138.59);
                        setActiveRecordingIdx(idx);
                      }
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      activeRecordingIdx === idx
                        ? 'bg-[#A9232D] text-white'
                        : 'bg-[#EAE5DC] dark:bg-[#171716] text-[#252421] dark:text-[#F2EEE7] hover:bg-[#A9232D] hover:text-white'
                    }`}
                  >
                    {activeRecordingIdx === idx ? <Pause size={14} /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                  </button>

                  <button className="text-[#77736D] hover:text-[#A9232D]">
                    <Bookmark size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Historical Context & Akbar Court Lore (Matching Reference Image 3) */}
        <section className="space-y-6 pt-6 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Historic Mughal Court Folio */}
            <div className="lg:col-span-5 p-3 bg-[#EAE5DC] dark:bg-[#22211F] rounded-lg border border-[#DCD6CC] dark:border-[#2E2D2A]">
              <div className="rounded overflow-hidden border border-[#DCD6CC] dark:border-[#2E2D2A] bg-[#F5F2EC] h-72">
                <img
                  src="/public/assets/aistudio/image_2813f1ff.png"
                  alt="Manuscript Folio 448"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>
              <div className="pt-2 text-[10px] font-mono text-[#77736D] text-center">
                Manuscript Folio 448 · Ain-i-Akbari Reference
              </div>
            </div>

            {/* Right: Narrative Lore & Quote */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                  HISTORICAL CONTEXT · 16TH CENTURY
                </span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
                Born from the Regal Solitude of Akbar's Royal Darbar<span className="text-[#A9232D]">.</span>
              </h3>

              <p className="text-xs md:text-sm text-[#77736D] leading-relaxed">
                The nomenclature "Darbari" derives directly from the Persian loanword for the royal court (Darbar). Tansen created this variation of the ancient Kanada form to be rendered exclusively in the private midnight chambers of the Emperor.
              </p>

              <p className="text-xs md:text-sm text-[#77736D] leading-relaxed">
                While afternoon and twilight ragas possess dramatic kinetic tension, Darbari Kanada is deliberately architected to dispel psychological restlessness. Its heavy, hypnotic andolan notes demand extreme breath control from vocalists and unhurried slow-glide meends across instrument frets.
              </p>

              {/* Vilayat Khan Quote Box */}
              <div className="p-4 rounded bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] border-l-4 border-l-[#A9232D]">
                <blockquote className="text-xs md:text-sm text-[#252421] dark:text-[#F2EEE7] italic">
                  “One does not simply sing Darbari; one surrenders the ego to its sovereign cadence. It is a court that grants audience only to silence.”
                </blockquote>
                <span className="text-[10px] font-mono tracking-wider text-[#A9232D] font-bold block mt-2">
                  — USTAD VILAYAT KHAN
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* Section 5: Kinship & Contrasting Ragas (Matching Reference Image 3) */}
        {raga.kinship && raga.kinship.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
                  COMPARATIVE MUSICOLOGY
                </span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7] mt-0.5">
                  Kinship & Contrasting Ragas<span className="text-[#A9232D]">.</span>
                </h3>
              </div>

              <Link to="/explore" className="text-xs text-[#77736D] hover:text-[#A9232D] flex items-center gap-1 font-semibold">
                <span>EXPLORE ENTIRE CANON</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {raga.kinship.map((kin) => (
                <div
                  key={kin.id}
                  className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] hover:border-[#A9232D] transition-colors space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#A9232D] block">
                      {kin.relationship}
                    </span>
                    <h4 className="text-xl font-bold text-[#252421] dark:text-[#F2EEE7]">
                      {kin.name}
                    </h4>
                    <span className="font-mono text-xs text-[#77736D] block">
                      {kin.swaras}
                    </span>
                    <p className="text-xs text-[#77736D] leading-relaxed pt-1">
                      {kin.keyDifference}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-[#77736D]">{kin.tempo}</span>
                    <Link
                      to={`/explore?q=${encodeURIComponent(kin.name)}`}
                      className="text-[#252421] dark:text-[#F2EEE7] font-semibold hover:text-[#A9232D] flex items-center gap-1"
                    >
                      <span>Compare</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
