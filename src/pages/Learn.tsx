import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Play, Pause, Volume2, ArrowRight, BookOpen, CheckCircle2, Lock, SlidersHorizontal, Mic, Trophy } from 'lucide-react';
import { audioEngine } from '../lib/audioEngine';

export const Learn: React.FC = () => {
  const navigate = useNavigate();
  const [activeInputNotes, setActiveInputNotes] = useState<string[]>(['G', 'M', 'D']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [feedbackScore, setFeedbackScore] = useState<number | null>(null);
  const [currentMatra, setCurrentMatra] = useState<number>(1);
  const [isTalaActive, setIsTalaActive] = useState<boolean>(false);
  const [layaSpeed, setLayaSpeed] = useState<'thah' | 'dugun' | 'chaugun'>('thah');

  // Handle Swara Identification verification
  const handleVerifySwaraQuiz = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setFeedbackScore(92);
    }, 600);
  };

  const handlePlayPromptSequence = async () => {
    const prompt = ['G', 'M', 'D'];
    for (const p of prompt) {
      audioEngine.playSwara(p, 0.7);
      await new Promise(r => setTimeout(r, 450));
    }
  };

  const handleAddNoteToBuffer = (note: string) => {
    audioEngine.playSwara(note, 0.8);
    setActiveInputNotes(prev => {
      if (prev.length >= 5) return [note];
      return [...prev, note];
    });
  };

  return (
    <div className="w-full bg-[#F5F2EC] dark:bg-[#171716] min-h-screen text-[#252421] dark:text-[#F2EEE7] pt-8 pb-32 px-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header (Matching Reference Image 6: The Learning Studio) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#DCD6CC] dark:border-[#2E2D2A]">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                PEDAGOGICAL ACADEMY · SANCHITA / CURATORIAL ARCHIVE VOL. IV
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
              The Learning Studio<span className="text-[#A9232D]">.</span>
            </h1>
            <p className="text-xs md:text-sm text-[#77736D] leading-relaxed">
              A structured journey into the grammar of Indian Classical Music. From foundational swara sthana to advanced raga improvisation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs font-mono flex items-center gap-2">
              <span className="text-[10px] text-[#77736D]">SESSION KEY:</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
              <strong className="text-[#252421] dark:text-[#F2EEE7]">Komal Re · 136.1 Hz</strong>
            </div>
            <button
              onClick={() => audioEngine.startTanpura('Pa', 136.1)}
              className="px-3.5 py-2 rounded bg-[#EAE5DC] dark:bg-[#22211F] text-xs font-semibold text-[#252421] dark:text-[#F2EEE7] hover:border-[#A9232D] border border-transparent transition-colors flex items-center gap-1.5"
            >
              <Volume2 size={13} className="text-[#A9232D]" />
              <span>Drone</span>
            </button>
          </div>
        </div>

        {/* Today's Prescribed Study Card (Matching Reference Image 6) */}
        <div className="p-6 md:p-8 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 font-mono text-[#77736D] text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#EAE5DC] dark:bg-[#171716] font-bold text-[#252421] dark:text-[#F2EEE7]">
                PRAHAR 4 · DUSK (18:00 — 21:00)
              </span>
              <span>SANDHIPRAKASH RIYAAZ</span>
            </div>
            <span className="font-mono text-[#77736D] text-[11px]">
              ⏱ RECOMMENDED DURATION: 30 MINUTES
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1 max-w-3xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A9232D]">
                TODAY'S PRESCRIBED STUDY
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252421] dark:text-[#F2EEE7]">
                Raag Yaman — Mastering the Tivra Ma Glide
              </h2>
              <p className="text-xs md:text-sm text-[#77736D] leading-relaxed pt-1">
                Focus on the quintessential <strong className="text-[#252421] dark:text-[#F2EEE7]">Ṇ R G</strong> opening phrase and the slow, microtonal suspension when resolving into Pancham through Tivra Madhyam.
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
              <button
                onClick={() => {
                  audioEngine.playSwara('M', 1.0);
                }}
                className="px-6 py-3 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] text-xs font-semibold hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Begin Daily Riyaz</span>
                <ArrowRight size={13} />
              </button>
              <span className="text-[10px] font-mono text-[#77736D]">
                2,418 Practitioners Active Today
              </span>
            </div>
          </div>

          {/* 3 Stage Modules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#77736D]">
                <span>01 · 10 MIN</span>
                <span className="text-[#A9232D] font-bold">STAGE 1</span>
              </div>
              <h4 className="font-bold text-sm text-[#252421] dark:text-[#F2EEE7]">Swara Sadhana</h4>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Mandra Saptak sustained pitch holding. Achieve zero-flutter resonance on Kharja Sa and Shuddha Nishad.
              </p>
              <div className="text-[10px] font-mono text-[#77736D] pt-1">RANGE: Ṇ — S — R — G</div>
            </div>

            <div className="p-4 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#77736D]">
                <span>02 · 10 MIN</span>
                <span className="text-[#A9232D] font-bold">STAGE 2</span>
              </div>
              <h4 className="font-bold text-sm text-[#252421] dark:text-[#F2EEE7]">Alankar Patterns</h4>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Vakra phrasing in Kalyan: S-R-G, R-G-M', G-M'-D, M'-D-N, D-N-Ṡ in Vilambit laya.
              </p>
              <div className="text-[10px] font-mono text-[#77736D] pt-1">METRONOME: 60 BPM</div>
            </div>

            <div className="p-4 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#77736D]">
                <span>03 · 10 MIN</span>
                <span className="text-[#A9232D] font-bold">STAGE 3</span>
              </div>
              <h4 className="font-bold text-sm text-[#252421] dark:text-[#F2EEE7]">Pakad & Meend</h4>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Gentle glissando descent from Tivra Madhyam to Gandhar: M' \ G holding microtonal shruti tension.
              </p>
              <div className="text-[10px] font-mono text-[#77736D] pt-1">INTONATION CURVE</div>
            </div>
          </div>
        </div>

        {/* Pathways to Mastery Curriculum (Matching Reference Image 6) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
                CURRICULUM FRAMEWORK
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7] mt-0.5">
                Pathways to Mastery<span className="text-[#A9232D]">.</span>
              </h2>
            </div>
            <span className="text-xs text-[#77736D] hidden md:inline">
              Sequential pedagogical tiers rooted in the Gandharva Mahavidyalaya and Bhatkhande sangeet traditions.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Level 1: Completed */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-[#77736D]">LEVEL I</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-green-700">
                    <CheckCircle2 size={12} />
                    <span>COMPLETED</span>
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#252421] dark:text-[#F2EEE7]">Foundations of Swara</h3>
                <p className="text-xs text-[#77736D] leading-relaxed">
                  The 7 Natural Swaras, 12 Sthanas, Shruti fundamentals, Tanpura listening, and vocal breath control.
                </p>
                <div className="pt-2 text-[10px] font-mono text-[#77736D] flex items-center justify-between">
                  <span>PROGRESS</span>
                  <span className="font-bold text-[#252421] dark:text-[#F2EEE7]">14 / 14 LESSONS (100%)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between text-xs">
                <span className="text-[10px] text-[#77736D] hover:underline cursor-pointer">Archived Certificate</span>
                <span className="text-[#A9232D] font-bold flex items-center gap-1 cursor-pointer">
                  <span>Review Notes</span>
                  <ArrowRight size={12} />
                </span>
              </div>
            </div>

            {/* Level 2: Current Focus */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#A9232D] ring-1 ring-[#A9232D] space-y-4 flex flex-col justify-between shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-[#A9232D] font-bold">LEVEL II · CURRENT FOCUS</span>
                  <span className="w-2 h-2 rounded-full bg-[#A9232D] animate-ping" />
                </div>
                <h3 className="text-xl font-bold text-[#252421] dark:text-[#F2EEE7]">The 10 Thaats & Melodic Classification</h3>
                <p className="text-xs text-[#77736D] leading-relaxed">
                  Understanding Bhatkhande's 10 Thaat framework, Bilawal to Bhairavi, parent scales vs janak ragas.
                </p>
                <div className="pt-2 text-[10px] font-mono text-[#77736D] flex items-center justify-between">
                  <span>LESSON 8 OF 20 · KALYAN SYSTEM</span>
                  <span className="font-bold text-[#A9232D]">40%</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between text-xs">
                <span className="text-[10px] text-[#77736D]">Next: Bhairav Thaat</span>
                <button
                  onClick={() => navigate('/explore?thaat=Kalyan')}
                  className="px-3.5 py-1.5 rounded bg-[#A9232D] text-white font-semibold text-xs flex items-center gap-1"
                >
                  <span>Resume Study</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* Level 3: Advanced Locked */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] opacity-80 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-[#77736D]">LEVEL III · ADVANCED</span>
                  <Lock size={12} className="text-[#77736D]" />
                </div>
                <h3 className="text-xl font-bold text-[#252421] dark:text-[#F2EEE7]">Raga Grammar & Improvisation</h3>
                <p className="text-xs text-[#77736D] leading-relaxed">
                  Vadi-Samvadi balance, Alap progression, Vakra bandish anatomy, Gamakas and Andolans.
                </p>
                <div className="pt-2 text-[10px] font-mono text-[#77736D] flex items-center justify-between">
                  <span>PREREQUISITES PENDING</span>
                  <span className="font-mono">0 / 25</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between text-[11px] text-[#77736D]">
                <span>Dhrupad Ang · Khayal Vilambit</span>
                <span>Unlocks at Level II</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Studio Modules (Matching Reference Image 6) */}
        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
              ACOUSTIC LABORATORY
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7] mt-0.5">
              Interactive Studio Modules<span className="text-[#A9232D]">.</span>
            </h2>
            <p className="text-xs text-[#77736D] mt-1">
              Algorithmic feedback tools designed to calibrate ear pitch detection, rhythmic subdivision, and microtonal contours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Module 1: Ear Training Swara Identification */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#77736D]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
                    EAR TRAINING
                  </span>
                  <span className="font-mono text-xs font-bold text-green-700">SCORE: 92%</span>
                </div>

                <h3 className="text-lg font-bold text-[#252421] dark:text-[#F2EEE7]">Swara Identification</h3>
                <p className="text-xs text-[#77736D] leading-relaxed">
                  Listen to randomized 3-note phrases in Bilawal and Yaman. Tap the corresponding sargam notes in sequence.
                </p>

                {/* Swara Keypad & Sequence */}
                <div className="p-3 bg-[#F5F2EC] dark:bg-[#171716] rounded border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#77736D]">
                    <span>INPUT BUFFER</span>
                    <button
                      onClick={handlePlayPromptSequence}
                      className="text-[#A9232D] font-semibold hover:underline flex items-center gap-1"
                    >
                      <Play size={10} fill="currentColor" />
                      <span>PLAY SEQUENCE</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 justify-center py-1">
                    {['S', 'R', 'G', 'M', 'P', 'D', 'N'].map(s => (
                      <button
                        key={s}
                        onClick={() => handleAddNoteToBuffer(s)}
                        className="w-8 h-8 rounded bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs font-mono font-bold text-[#252421] dark:text-[#F2EEE7] hover:border-[#A9232D]"
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <div className="text-[10px] text-center font-mono text-[#77736D]">
                    Selected notes: <strong className="text-[#252421] dark:text-[#F2EEE7]">{activeInputNotes.join(' · ')}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between text-xs">
                <span className="text-[10px] text-[#77736D]">LEVEL: INTERMEDIATE</span>
                <button
                  onClick={handleVerifySwaraQuiz}
                  className="px-4 py-1.5 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] text-xs font-semibold hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white transition-colors"
                >
                  {isVerifying ? 'Verifying...' : 'Verify'}
                </button>
              </div>
            </div>

            {/* Module 2: Layakari Studio Tala Subdivisions */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#77736D]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
                    LAYAKARI STUDIO
                  </span>
                  <span className="font-mono text-[11px] text-[#77736D]">TEENTAAL - 16 MATRAS</span>
                </div>

                <h3 className="text-lg font-bold text-[#252421] dark:text-[#F2EEE7]">Tala Subdivisions</h3>
                <p className="text-xs text-[#77736D] leading-relaxed">
                  Master the vibhag structures across Thah (1x), Dugun (2x), and Chaugun (4x) with active visual Sam pulses.
                </p>

                {/* 16-Beat Visual Matra Grid */}
                <div className="p-3 bg-[#F5F2EC] dark:bg-[#171716] rounded border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#77736D]">
                    <span>CURRENT BEAT: MATRA 1 (SAM)</span>
                    <span className="text-[#A9232D] font-bold">DHA</span>
                  </div>

                  <div className="grid grid-cols-8 gap-1 text-center font-mono text-xs">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(m => (
                      <span
                        key={m}
                        className={`py-1 rounded text-[10px] ${
                          m === 1
                            ? 'bg-[#A9232D] text-white font-bold'
                            : 'bg-white dark:bg-[#22211F] text-[#77736D]'
                        }`}
                      >
                        {m === 1 ? '1+' : m === 5 ? '5+' : m === 9 ? '9°' : m === 13 ? '13+' : m}
                      </span>
                    ))}
                  </div>

                  <div className="text-[10px] font-mono text-[#77736D] text-center pt-1">
                    Dha Dhin Dhin Dha | Dha Dhin Dhin Dha ...
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setLayaSpeed('dugun')}
                    className="px-2.5 py-1 rounded bg-[#EAE5DC] dark:bg-[#171716] text-[10px] font-medium"
                  >
                    Dugun
                  </button>
                  <button
                    onClick={() => setLayaSpeed('chaugun')}
                    className="px-2.5 py-1 rounded bg-[#EAE5DC] dark:bg-[#171716] text-[10px] font-medium"
                  >
                    Chaugun
                  </button>
                </div>
                <Link to="/toolkit" className="text-[#A9232D] font-semibold hover:underline">
                  Open Metronome
                </Link>
              </div>
            </div>

            {/* Module 3: Pitch Contour Meend & Gamaka */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#77736D]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
                    PITCH CONTOUR
                  </span>
                  <span className="font-mono text-[11px] text-[#77736D]">MICROTONAL CURVE</span>
                </div>

                <h3 className="text-lg font-bold text-[#252421] dark:text-[#F2EEE7]">Meend & Gamaka</h3>
                <p className="text-xs text-[#77736D] leading-relaxed">
                  Sing or play into your microphone to match the unbroken glissando curve of Pt. Nikhil Banerjee's sitar meend.
                </p>

                {/* Meend Vector Graph */}
                <div className="p-3 bg-[#F5F2EC] dark:bg-[#171716] rounded border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-2 relative h-24 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#77736D]">
                    <span>TARGET: G → M' → P</span>
                    <span className="text-green-700 font-bold">DEVIATION: ±3 CENTS</span>
                  </div>

                  <svg className="w-full h-12" preserveAspectRatio="none" viewBox="0 0 300 60">
                    <path
                      d="M 10 50 Q 80 45, 150 25 T 290 10"
                      fill="none"
                      stroke="#A9232D"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="flex items-center justify-between text-[9px] font-mono text-[#77736D]">
                    <span>G (GANDHAR)</span>
                    <span>TIVRA M'</span>
                    <span>P (PANCHAM)</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-[#77736D]">ACOUSTIC ENGINE V2.4</span>
                <button
                  onClick={() => audioEngine.playSwara('M', 1.0)}
                  className="px-3.5 py-1.5 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] text-xs font-semibold hover:bg-[#A9232D] transition-colors flex items-center gap-1.5"
                >
                  <Mic size={12} />
                  <span>Calibrate Mic</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Conversations with Living Traditions (Matching Reference Image 6) */}
        <div className="space-y-4 pt-6 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
                ARCHIVAL EXEGESIS
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7] mt-0.5">
                Conversations with Living Traditions<span className="text-[#A9232D]">.</span>
              </h2>
            </div>
            <Link to="/archive" className="text-xs text-[#77736D] hover:text-[#A9232D] flex items-center gap-1 font-semibold">
              <span>Explore Entire Archive</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rudra Veena Morphology */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
              <div className="p-3 bg-[#EAE5DC] dark:bg-[#171716] rounded border border-[#DCD6CC] dark:border-[#2E2D2A] h-52 overflow-hidden">
                <img
                  src="/public/assets/aistudio/image_91622b1d.png"
                  alt="Rudra Veena"
                  className="w-full h-full object-cover grayscale contrast-125 rounded"
                />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#A9232D] block">
                  EXEGESIS · GHARANA LINEAGE · FOLIO 104
                </span>
                <h3 className="text-xl font-bold text-[#252421] dark:text-[#F2EEE7] mt-1">
                  Rudra Veena Morphology & The Dhrupad Foundation
                </h3>
                <p className="text-xs text-[#77736D] leading-relaxed mt-2">
                  An archival breakdown of how the acoustic resonance chamber of the two gourds (tumbas) dictates the slow microtonal descent of <strong className="text-[#252421] dark:text-[#F2EEE7]">Raag Darbari Kanada</strong>. Comparative study between the Dagar Gharana vocal inflections and the veena plucking technique (bol-bant).
                </p>
              </div>

              <div className="pt-3 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Play size={12} fill="currentColor" className="text-[#A9232D]" />
                  <span className="font-semibold text-[#252421] dark:text-[#F2EEE7]">
                    Ustad Asad Ali Khan · Khandarbani Alap
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#77736D]">18:42</span>
              </div>
            </div>

            {/* Aesthetic Dialectic: Kirana vs Gwalior */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 bg-[#EAE5DC] dark:bg-[#171716] rounded border border-[#DCD6CC] dark:border-[#2E2D2A] h-52 overflow-hidden">
                  <img
                    src="/public/assets/aistudio/image_8475f0d2.png"
                    alt="Manuscript notation"
                    className="w-full h-full object-cover grayscale contrast-125 rounded"
                  />
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-[#A9232D] block">
                    AESTHETIC DIALECTIC · KIRANA VS GWALIOR
                  </span>
                  <h3 className="text-xl font-bold text-[#252421] dark:text-[#F2EEE7] mt-1">
                    The Interpretation of Gandhar
                  </h3>
                  <p className="text-xs text-[#77736D] leading-relaxed mt-2">
                    Comparing Pt. Bhimsen Joshi's thunderous expansion of Nishad-Gandhar symmetry with Krishnarao Shankar Pandit's bold, angular gamakas.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A] space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A]">
                    <span className="text-[10px] text-[#77736D] block">Kirana Approach:</span>
                    <strong className="text-[11px] text-[#252421] dark:text-[#F2EEE7]">Microtonal Glide · Shanti Rasa</strong>
                  </div>
                  <div className="p-2.5 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A]">
                    <span className="text-[10px] text-[#77736D] block">Gwalior Approach:</span>
                    <strong className="text-[11px] text-[#252421] dark:text-[#F2EEE7]">Direct Attack · Vira Rasa</strong>
                  </div>
                </div>

                <Link
                  to="/artists"
                  className="w-full py-2.5 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white transition-colors"
                >
                  <span>Read Full Comparative Treatise</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Banner: Submit Riyaz for Evaluation (Matching Reference Image 6) */}
        <div className="p-8 md:p-12 rounded-xl bg-[#EAE5DC] dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                GURU-SHISHYA DIGITAL FELLOWSHIP
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
              Submit your riyaz recordings for archival jury evaluation<span className="text-[#A9232D]">.</span>
            </h3>
            <p className="text-xs text-[#77736D]">
              Scholarly feedback from empaneled ustads and pandits. Certified progress reports aligned with university degree curriculum.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/detect')}
              className="px-5 py-2.5 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] text-xs font-semibold hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white transition-colors shadow-sm"
            >
              Submit Portfolio
            </button>
            <button
              onClick={() => navigate('/archive')}
              className="px-4 py-2.5 rounded border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs font-semibold text-[#252421] dark:text-[#F2EEE7] hover:bg-white dark:hover:bg-[#171716] transition-colors"
            >
              View Guidelines
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
