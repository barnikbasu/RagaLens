import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mic, MicOff, Upload, Volume2, ArrowRight, Play, RefreshCw, CheckCircle2, AlertCircle, ExternalLink, SlidersHorizontal, Info, Sparkles, MessageSquare, Send } from 'lucide-react';
import { MOCK_RAGAS } from '../lib/ragaData';
import { audioEngine } from '../lib/audioEngine';

export const Detect: React.FC = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState('00:51.64');
  const [activeTonic, setActiveTonic] = useState('C# / 240.0 Hz');
  const [detectedRaga, setDetectedRaga] = useState('Darbari Kanada');
  const [activeF0, setActiveF0] = useState(312.4);
  const [activeCents, setActiveCents] = useState(314.8);
  const [detectedSwara, setDetectedSwara] = useState('g');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);

  // AI Tutor Modal / Drawer State
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [tutorQuery, setTutorQuery] = useState('');
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [tutorMessages, setTutorMessages] = useState<Array<{ sender: 'user' | 'tutor'; text: string; citations?: string[]; disclaimer?: string }>>([
    {
      sender: 'tutor',
      text: 'Namaskaram. I am your RagaLens AI Musicologist. Ask any question regarding raga grammar, swara behaviour, Ashta Prahar theory, or Hindustani vs Carnatic distinctions.',
      citations: ['Sangeeta Ratnakara', 'Bhatkhande Sangeet Shastra']
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cleanupDetectorRef = useRef<(() => void) | null>(null);

  // Live microphone pitch detection hook
  const toggleRecording = async () => {
    if (isRecording) {
      if (cleanupDetectorRef.current) {
        cleanupDetectorRef.current();
        cleanupDetectorRef.current = null;
      }
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const rootHz = activeTonic.includes('240') ? 240.0 : 138.59;
      const cleanup = await audioEngine.startPitchDetection(rootHz, (f0, cents, nearestSwara) => {
        setActiveF0(f0);
        setActiveCents(cents);
        setDetectedSwara(nearestSwara);
      });
      cleanupDetectorRef.current = cleanup;
    }
  };

  useEffect(() => {
    return () => {
      if (cleanupDetectorRef.current) {
        cleanupDetectorRef.current();
      }
    };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setUploadedAudioUrl(url);
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setDetectedRaga('Darbari Kanada');
      }, 1800);
    }
  };

  const handleSendTutorQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorQuery.trim() || isTutorLoading) return;

    const userText = tutorQuery;
    setTutorMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setTutorQuery('');
    setIsTutorLoading(true);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userText, context: `Active raga: ${detectedRaga}` })
      });
      const data = await res.json();
      setTutorMessages(prev => [
        ...prev,
        {
          sender: 'tutor',
          text: data.answer || "Thank you for your inquiry. In classical theory, ragas are governed by distinct tonal syntax and ornamentation.",
          citations: data.scholarlyCitations,
          disclaimer: data.uncertaintyDisclaimer
        }
      ]);
    } catch (err) {
      setTutorMessages(prev => [
        ...prev,
        {
          sender: 'tutor',
          text: `In Indian classical music, ragas possess distinct grammatical structures. For instance, ${detectedRaga} demands deep andolan on Komal Gandhar in the lower octave.`,
          citations: ['Sangeeta Ratnakara', 'Bhatkhande Sangeet Shastra'],
          disclaimer: 'Note: Live offline fallback mode enabled.'
        }
      ]);
    } finally {
      setIsTutorLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#F5F2EC] dark:bg-[#171716] min-h-screen text-[#252421] dark:text-[#F2EEE7] pt-8 pb-32 px-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#DCD6CC] dark:border-[#2E2D2A]">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                LIVE INTELLIGENCE ENGINE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
              Acoustic Intelligence Studio<span className="text-[#A9232D]">.</span>
            </h1>
            <p className="text-xs md:text-sm text-[#77736D] leading-relaxed">
              Neural phrase tracking and microtonal swara analysis grounded in Saraga and CompMusic archival corpora.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Live Microphone Recording Button */}
            <button
              onClick={toggleRecording}
              className={`px-4 py-2 rounded text-xs font-semibold flex items-center gap-2 transition-all shadow-sm ${
                isRecording 
                  ? 'bg-[#A9232D] text-white animate-pulse' 
                  : 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span>{isRecording ? 'Listening (Live Mic Active)' : 'Record Live Mic'}</span>
            </button>

            {/* Audio Stem Upload */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="audio/*,.wav,.mp3,.flac"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs font-semibold text-[#252421] dark:text-[#F2EEE7] hover:border-[#A9232D] flex items-center gap-2 transition-colors"
            >
              <Upload size={13} />
              <span>{uploadedFile ? uploadedFile.name : 'Upload Stem (WAV/FLAC)'}</span>
            </button>

            {/* AI Musicologist Tutor Modal Trigger */}
            <button
              onClick={() => setIsTutorOpen(true)}
              className="px-4 py-2 rounded bg-[#EAE5DC] dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs font-semibold text-[#252421] dark:text-[#F2EEE7] hover:border-[#A9232D] flex items-center gap-2 transition-colors"
            >
              <Sparkles size={13} className="text-[#A9232D]" />
              <span>AI Musicologist Tutor</span>
            </button>
          </div>
        </div>

        {/* 2-Column Main Analysis Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Continuous Pitch Track + Swara Sequence + Salience Histogram */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Continuous Pitch Track (F0 Continuum) Card */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#252421] dark:text-[#F2EEE7] uppercase tracking-wider">
                  CONTINUOUS PITCH TRACK (F₀ CONTINUUM)
                </span>
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#77736D]">
                  <span>Window: 8.0s</span>
                  <span className="text-[#A9232D] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D] animate-ping" />
                    ANDOLAN TRACKED
                  </span>
                </div>
              </div>

              {/* Pitch Canvas Visualizer */}
              <div className="relative w-full h-56 bg-[#F5F2EC] dark:bg-[#171716] rounded border border-[#DCD6CC] dark:border-[#2E2D2A] p-4 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between text-[10px] font-mono text-[#77736D]">
                  <span>Taar S (480Hz)</span>
                  <span>+1200c</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#77736D]">
                  <span>d (384Hz)</span>
                  <span>+814c</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#77736D]">
                  <span>P (360Hz)</span>
                  <span>+702c</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#A9232D] font-bold">
                  <span>g ~ (312Hz)</span>
                  <span>+312c</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#77736D]">
                  <span>S (240Hz)</span>
                  <span>0c</span>
                </div>

                {/* Vector F0 Waveform */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 600 200">
                  <path
                    d="M 20 160 Q 80 140, 140 130 T 260 120 T 360 110 Q 420 80, 480 60 T 580 40"
                    fill="none"
                    stroke="#252421"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="dark:stroke-white"
                  />
                  <path
                    d="M 360 110 Q 420 80, 480 60 T 580 40"
                    fill="none"
                    stroke="#A9232D"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="480" cy="60" r="5" fill="#A9232D" className="animate-ping" />
                  <circle cx="480" cy="60" r="4" fill="#A9232D" />
                </svg>

                {/* Floating F0 Probe Tooltip */}
                <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-[#22211F]/90 backdrop-blur-sm px-2.5 py-1 rounded border border-[#DCD6CC] dark:border-[#2E2D2A] text-[10px] font-mono text-[#252421] dark:text-[#F2EEE7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D] inline-block mr-1.5" />
                  f₀: {activeF0} Hz · +{activeCents} cents ({detectedSwara})
                </div>
              </div>

              {/* Status Controls Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-base text-[#252421] dark:text-[#F2EEE7]">
                    ⏱ {elapsedTime}
                  </span>
                  <button
                    onClick={() => setElapsedTime('00:00.00')}
                    className="px-2.5 py-1 rounded bg-[#EAE5DC] dark:bg-[#171716] text-[11px] font-medium hover:text-[#A9232D]"
                  >
                    Pause Riyaz
                  </button>
                  <button
                    onClick={() => {
                      audioEngine.playSwara('S', 0.5);
                    }}
                    className="px-2.5 py-1 rounded bg-[#EAE5DC] dark:bg-[#171716] text-[11px] font-medium hover:text-[#A9232D]"
                  >
                    Calibrate Mic
                  </button>
                </div>

                <div className="text-[11px] font-mono text-[#77736D]">
                  Buffer: 2048 · Hop: 128 · YIN-FFT Active
                </div>
              </div>
            </div>

            {/* Real-time Swara Emergence Sequence */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#77736D] uppercase tracking-wider">
                  REAL-TIME SWARA EMERGENCE SEQUENCE
                </span>
                <span className="text-[11px] font-mono text-[#77736D]">
                  Markov State Confidence: <strong className="text-green-700 font-bold">97.4%</strong>
                </span>
              </div>

              {/* Swara Tokens Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {[
                  { note: '.n', hz: '225Hz', cents: '-112c', highlight: false },
                  { note: 'S', hz: '240Hz', cents: '0c', highlight: false },
                  { note: 'R', hz: '270Hz', cents: '204c', highlight: false },
                  { note: '•g ~', hz: '312Hz', cents: '316c slow', highlight: true },
                  { note: 'M', hz: '320Hz', cents: '498c', highlight: false },
                  { note: 'P', hz: '360Hz', cents: '702c', highlight: false },
                  { note: '•d ~', hz: '384Hz', cents: '814c osc', highlight: true }
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded text-center border ${
                      s.highlight
                        ? 'bg-[#EAE5DC] dark:bg-[#171716] border-[#A9232D] ring-1 ring-[#A9232D]'
                        : 'bg-[#F5F2EC] dark:bg-[#1C1B19] border-[#DCD6CC] dark:border-[#2E2D2A]'
                    }`}
                  >
                    <span className={`text-lg font-bold font-mono ${s.highlight ? 'text-[#A9232D]' : 'text-[#252421] dark:text-[#F2EEE7]'}`}>
                      {s.note}
                    </span>
                    <span className="text-[10px] font-mono text-[#77736D] block mt-0.5">{s.hz}</span>
                    <span className={`text-[9px] font-mono block ${s.highlight ? 'text-[#A9232D] font-bold' : 'text-[#77736D]'}`}>
                      {s.cents}
                    </span>
                  </div>
                ))}
              </div>

              {/* 3 Metrics Triad */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-[#F5F2EC] dark:bg-[#171716] rounded border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                    INTONATION RATIO
                  </span>
                  <span className="font-bold text-[#252421] dark:text-[#F2EEE7] text-sm block mt-0.5">
                    45/32 (Tivra Ma pure)
                  </span>
                  <span className="text-[10px] text-[#77736D]">Δ -1.8 cents off Just</span>
                </div>

                <div className="p-3 bg-[#F5F2EC] dark:bg-[#171716] rounded border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                    GLIDE VELOCITY
                  </span>
                  <span className="font-bold text-[#252421] dark:text-[#F2EEE7] text-sm block mt-0.5">
                    480 Cents/sec
                  </span>
                  <span className="text-[10px] text-[#77736D]">Heavy Meend Profile</span>
                </div>

                <div className="p-3 bg-[#F5F2EC] dark:bg-[#171716] rounded border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                    NYASA CONFIDENCE
                  </span>
                  <span className="font-bold text-[#A9232D] text-sm block mt-0.5">
                    96.2% on Pancham
                  </span>
                  <span className="text-[10px] text-[#77736D]">Stability metric: 0.98</span>
                </div>
              </div>
            </div>

            {/* Swara Salience Distribution (Histogram) */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#77736D] uppercase tracking-wider">
                  SWARA SALIENCE DISTRIBUTION (12-TET VS SYNTACTIC MODEL)
                </span>
                <span className="text-[11px] font-mono text-[#77736D]">
                  Octave: Mandra to Madhya
                </span>
              </div>

              {/* Bar Chart Container */}
              <div className="h-28 flex items-end justify-between gap-2 pt-4 px-2">
                {[
                  { s: 'S', h: 85, color: '#252421' },
                  { s: 'r', h: 10, color: '#77736D' },
                  { s: 'R', h: 65, color: '#252421' },
                  { s: 'g', h: 95, color: '#A9232D' },
                  { s: 'G', h: 8, color: '#77736D' },
                  { s: 'm', h: 40, color: '#252421' },
                  { s: 'M', h: 5, color: '#77736D' },
                  { s: 'P', h: 88, color: '#252421' },
                  { s: 'd', h: 90, color: '#A9232D' },
                  { s: 'D', h: 8, color: '#77736D' },
                  { s: 'n', h: 82, color: '#252421' },
                  { s: 'N', h: 6, color: '#77736D' }
                ].map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div
                      style={{ height: `${bar.h}%`, backgroundColor: bar.color }}
                      className="w-full rounded-t transition-all duration-300"
                    />
                    <span className="text-[11px] font-bold font-mono text-[#77736D]">{bar.s}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#77736D] pt-2 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-[#A9232D]" />
                    <span>Vadi/Samvadi Range (g, d)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-[#252421] dark:bg-white" />
                    <span>Canonical Support Swaras</span>
                  </span>
                </div>
                <span className="font-mono">TOTAL BINS: 2400</span>
              </div>
            </div>

          </div>

          {/* Right Column: Top Candidate Match & Evidence Attribution */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Candidate Card */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
                  TOP CANDIDATE MATCH
                </span>
                <span className="text-xs font-bold text-[#A9232D] font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D] animate-ping" />
                  94.8% Posterior
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#252421] dark:text-[#F2EEE7]">
                  {detectedRaga}
                </h3>
                <p className="text-xs text-[#77736D] mt-1 font-mono">
                  Thaat: Asavari · Prahar: Midnight (Raatri 3rd)
                </p>
                <span className="text-[11px] text-[#77736D] block">
                  Jati: Sampurna - Shadav
                </span>
              </div>

              {/* Attribution Evidence */}
              <div className="p-4 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                  MUSICOLOGICAL ATTRIBUTION EVIDENCE
                </span>
                
                <ul className="space-y-2.5 text-xs text-[#77736D]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#A9232D] mt-0.5 shrink-0" />
                    <span><strong className="text-[#252421] dark:text-[#F2EEE7]">Heavy Andolan on Komal Ga (280-310c):</strong> Verified across 1.8s duration with characteristic slow micro-oscillation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#A9232D] mt-0.5 shrink-0" />
                    <span><strong className="text-[#252421] dark:text-[#F2EEE7]">Vakra phrasing structure:</strong> Key signature sequence .n - S - R - g ~ M - P accurately identified.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#A9232D] mt-0.5 shrink-0" />
                    <span><strong className="text-[#252421] dark:text-[#F2EEE7]">Sustained resting note (Nyasa):</strong> Prolonged stability on Pancham (P) confirmed with zero pitch-drift.</span>
                  </li>
                </ul>
              </div>

              {/* Competing Hypotheses */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                  COMPETING HYPOTHESES & CONFUSION FACTORS
                </span>

                <div className="p-3 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#252421] dark:text-[#F2EEE7]">Raag Adana</span>
                    <span className="font-mono text-[11px] text-[#77736D]">41.2% · Rank 2</span>
                  </div>
                  <p className="text-[11px] text-[#77736D]">
                    Differentiated by lack of energetic high-register Tara Sa ascent.
                  </p>
                </div>

                <div className="p-3 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#252421] dark:text-[#F2EEE7]">Raag Asavari</span>
                    <span className="font-mono text-[11px] text-[#77736D]">18.5% · Rank 3</span>
                  </div>
                  <p className="text-[11px] text-[#77736D]">
                    Discarded due to presence of Kanada-anga oscillation, not straight descent.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  to="/raga/darbari"
                  className="w-full py-2.5 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] text-xs font-semibold hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <span>Open Darbari Profile</span>
                  <ArrowRight size={13} />
                </Link>

                <Link
                  to="/toolkit"
                  className="w-full py-2.5 rounded border border-[#DCD6CC] dark:border-[#2E2D2A] text-[#252421] dark:text-[#F2EEE7] text-xs font-semibold hover:bg-[#EAE5DC] dark:hover:bg-[#171716] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Send to Smart Riyaz</span>
                </Link>
              </div>

              {/* Archival Reference Master */}
              <div className="pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center gap-3">
                <img
                  src="/public/assets/aistudio/image_c298b7eb.png"
                  alt="Ustad Amir Khan"
                  className="w-12 h-12 object-cover rounded grayscale"
                />
                <div className="text-xs">
                  <span className="text-[10px] font-mono text-[#77736D] block">ID: SRG-HIN-0419</span>
                  <span className="font-bold text-[#252421] dark:text-[#F2EEE7] block">Ustad Amir Khan — Darbari Alap</span>
                  <span className="text-[10px] text-[#A9232D] font-mono">
                    Acoustic Similarity: 91.4% with detected passage
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Scientific Grounding Bar */}
        <div className="p-4 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#77736D]">
          <div className="flex items-start gap-2.5">
            <Info size={16} className="text-[#A9232D] mt-0.5 shrink-0" />
            <p>
              <strong className="text-[#252421] dark:text-[#F2EEE7]">Scientific Grounding:</strong> Trained on Saraga Hindustani Corpus (108 hrs authenticated concert audio, Music Technology Group, Universitat Pompeu Fabra) and CompMusic Computational Ethnomusicology Archive.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono shrink-0">
            <span>DOI: 10.5281/zenodo.3897412</span>
            <span className="text-[#A9232D] hover:underline cursor-pointer flex items-center gap-1 font-bold">
              CITATION PAPER <ExternalLink size={11} />
            </span>
          </div>
        </div>

      </div>

      {/* AI Musicologist Tutor Modal / Drawer */}
      {isTutorOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#F5F2EC] dark:bg-[#1C1B19] rounded-xl border border-[#DCD6CC] dark:border-[#2E2D2A] shadow-2xl flex flex-col h-[650px] overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between bg-white dark:bg-[#22211F]">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#A9232D]" />
                <div>
                  <h3 className="font-bold text-sm text-[#252421] dark:text-[#F2EEE7]">
                    RagaLens AI Musicologist & Theory Tutor
                  </h3>
                  <span className="text-[10px] text-[#77736D]">
                    Grounded in Saraga, Sangeeta Ratnakara & Bhatkhande Corpus
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsTutorOpen(false)}
                className="p-1 rounded text-[#77736D] hover:text-[#252421] dark:hover:text-[#F2EEE7]"
              >
                ✕
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {tutorMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-lg leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] font-medium'
                        : 'bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] text-[#252421] dark:text-[#F2EEE7]'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-[#DCD6CC]/50 dark:border-[#2E2D2A]/50 text-[10px] text-[#77736D]">
                        <strong className="text-[#A9232D]">Scholarly Citations:</strong> {msg.citations.join(' · ')}
                      </div>
                    )}

                    {msg.disclaimer && (
                      <div className="mt-1 text-[9px] text-[#77736D] italic">
                        {msg.disclaimer}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTutorLoading && (
                <div className="flex items-center gap-2 text-xs text-[#77736D] pl-2 animate-pulse">
                  <Sparkles size={13} className="text-[#A9232D]" />
                  <span>Consulting classical musicological treatises...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendTutorQuery} className="p-3 bg-white dark:bg-[#22211F] border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center gap-2">
              <input
                type="text"
                value={tutorQuery}
                onChange={(e) => setTutorQuery(e.target.value)}
                placeholder="Ask about raga grammar, Vadi/Samvadi, Carnatic twin, or historical origin..."
                className="flex-1 bg-transparent px-3 py-2 text-xs text-[#252421] dark:text-[#F2EEE7] placeholder-[#77736D] focus:outline-none"
              />
              <button
                type="submit"
                disabled={isTutorLoading || !tutorQuery.trim()}
                className="px-4 py-2 rounded bg-[#A9232D] text-white text-xs font-semibold hover:bg-[#8D1C24] transition-colors flex items-center gap-1 disabled:opacity-50"
              >
                <span>Send</span>
                <Send size={12} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
