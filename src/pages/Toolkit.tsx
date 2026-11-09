import React, { useState, useEffect } from 'react';
import { Volume2, Play, Pause, RefreshCw, SlidersHorizontal, ArrowRight, Mic, CheckCircle2, Clock, BookOpen, Music, Save, Trash2 } from 'lucide-react';
import { audioEngine } from '../lib/audioEngine';
import { MOCK_TAALS, Taal } from '../lib/ragaData';

export const Toolkit: React.FC = () => {
  const [activeWorkspace, setActiveWorkspace] = useState<'drone' | 'metronome' | 'riyaz' | 'shrutis'>('drone');

  // Tanpura state
  const [isDroneActive, setIsDroneActive] = useState(false);
  const [selectedTonic, setSelectedTonic] = useState('C#');
  const [selectedBody, setSelectedBody] = useState<'miraj' | 'tanjore'>('miraj');
  const [tuningMode, setTuningMode] = useState<'Pa' | 'Ma' | 'Ni'>('Pa');
  const [activeStringIndex, setActiveStringIndex] = useState<number | null>(null);

  // Tala Metronome state
  const [selectedTaalId, setSelectedTaalId] = useState<string>('teentaal');
  const [bpm, setBpm] = useState<number>(80);
  const [isTalaPlaying, setIsTalaPlaying] = useState<boolean>(false);
  const [currentBeat, setCurrentBeat] = useState<number>(0);

  // Riyaz Timer & Session Notes state
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [practicedRaga, setPracticedRaga] = useState('Yaman');
  const [sessionNotes, setSessionNotes] = useState('');
  const [practiceHistory, setPracticeHistory] = useState<Array<{ date: string; raga: string; minutes: number; notes: string }>>([
    { date: 'Nov 8, 2026', raga: 'Yaman', minutes: 45, notes: 'Worked on Tivra Ma glide into Pa. Slower tempo Vilambit Teentaal.' },
    { date: 'Nov 6, 2026', raga: 'Darbari Kanada', minutes: 60, notes: 'Mandra saptak Komal Gandhar andolan sustain with Miraj Tanpura.' }
  ]);

  const [activeShruti, setActiveShruti] = useState<string>('G2');

  const tonics = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#'];
  const currentTaal = MOCK_TAALS.find(t => t.id === selectedTaalId) || MOCK_TAALS[0];

  const shrutis = [
    { code: 'S', name: 'Shadja', ratio: '1/1', cents: '0c', swara: 'S' },
    { code: 'r1', name: 'K. Rishabh', ratio: '256/243', cents: '90c', swara: 'r' },
    { code: 'R2', name: 'Sh. Rishabh', ratio: '9/8', cents: '204c', swara: 'R' },
    { code: 'g2', name: 'K. Gandhar', ratio: '6/5', cents: '316c', swara: 'g' },
    { code: 'G2', name: 'Antara Ga', ratio: '5/4', cents: '386c', swara: 'G' },
    { code: 'm1', name: 'Sh. Madhyam', ratio: '4/3', cents: '498c', swara: 'M' },
    { code: 'M2', name: 'T. Madhyam', ratio: '45/32', cents: '590c', swara: "M'" },
    { code: 'P', name: 'Pancham', ratio: '3/2', cents: '702c', swara: 'P' },
    { code: 'd1', name: 'K. Dhaivat', ratio: '8/5', cents: '814c', swara: 'd' },
    { code: 'D2', name: 'Sh. Dhaivat', ratio: '5/3', cents: '884c', swara: 'D' },
    { code: 'n2', name: 'K. Nishad', ratio: '9/5', cents: '1018c', swara: 'n' },
    { code: 'N2', name: 'Kakali Ni', ratio: '15/8', cents: '1088c', swara: 'N' }
  ];

  // Tanpura toggle
  const toggleDrone = () => {
    if (isDroneActive) {
      audioEngine.stopTanpura();
      setIsDroneActive(false);
      setActiveStringIndex(null);
    } else {
      audioEngine.startTanpura(tuningMode, selectedTonic === 'C#' ? 138.59 : 146.83, (strIdx) => {
        setActiveStringIndex(strIdx);
      });
      setIsDroneActive(true);
    }
  };

  // Tala Metronome loop
  useEffect(() => {
    let interval: any;
    if (isTalaPlaying) {
      const stepMs = (60 / bpm) * 1000;
      interval = setInterval(() => {
        setCurrentBeat((prev) => {
          const next = (prev + 1) % currentTaal.beats;
          const bol = currentTaal.bolList[next] || 'Dha';
          audioEngine.playTablaBol(bol);
          return next;
        });
      }, stepMs);
    } else {
      setCurrentBeat(0);
    }
    return () => clearInterval(interval);
  }, [isTalaPlaying, bpm, currentTaal]);

  const handleToggleTala = () => {
    if (isTalaPlaying) {
      setIsTalaPlaying(false);
    } else {
      setCurrentBeat(0);
      const bol = currentTaal.bolList[0] || 'Dha';
      audioEngine.playTablaBol(bol);
      setIsTalaPlaying(true);
    }
  };

  // Timer loop
  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleSaveSession = () => {
    const mins = Math.max(1, Math.round(timerSeconds / 60));
    setPracticeHistory(prev => [
      {
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        raga: practicedRaga,
        minutes: mins,
        notes: sessionNotes || 'Focused riyaz session.'
      },
      ...prev
    ]);
    setTimerSeconds(0);
    setIsTimerRunning(false);
    setSessionNotes('');
  };

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-[#F5F2EC] dark:bg-[#171716] min-h-screen text-[#252421] dark:text-[#F2EEE7] pt-8 pb-32 px-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#DCD6CC] dark:border-[#2E2D2A]">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                ACOUSTIC SUITE · RIYAZ & CONCERT PRACTICE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
              The Musician's Toolkit<span className="text-[#A9232D]">.</span>
            </h1>
            <p className="text-xs md:text-sm text-[#77736D] leading-relaxed">
              Dedicated workspaces for acoustic riyaz: electronic Tanpura drone, Tala metronome with tabla bols, practice timer with session logs, and 22-Shruti microtone calibration.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#EAE5DC] dark:bg-[#22211F] rounded-lg border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs">
            {[
              { id: 'drone', label: 'Tanpura Drone' },
              { id: 'metronome', label: 'Tala Metronome' },
              { id: 'riyaz', label: 'Riyaz Timer & Logs' },
              { id: 'shrutis', label: '22 Shrutis' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveWorkspace(tab.id as any)}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeWorkspace === tab.id
                    ? 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] font-semibold'
                    : 'text-[#77736D] hover:text-[#252421] dark:hover:text-[#F2EEE7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Workspace 1: Tanpura Drone */}
        {activeWorkspace === 'drone' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 p-6 md:p-8 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                    TONIC GROUND (SA)
                  </span>
                  <div className="flex items-center gap-1">
                    {tonics.map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedTonic(t)}
                        className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors ${
                          selectedTonic === t
                            ? 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716]'
                            : 'bg-[#F5F2EC] dark:bg-[#1C1B19] text-[#77736D] hover:text-[#252421]'
                        }`}
                      >
                        {selectedTonic === t && '• '}
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                    ACOUSTIC BODY
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedBody('miraj')}
                      className={`px-3 py-1 rounded text-xs transition-colors ${
                        selectedBody === 'miraj'
                          ? 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] font-semibold'
                          : 'bg-[#F5F2EC] dark:bg-[#1C1B19] text-[#77736D]'
                      }`}
                    >
                      Miraj Shellac
                    </button>
                    <button
                      onClick={() => setSelectedBody('tanjore')}
                      className={`px-3 py-1 rounded text-xs transition-colors ${
                        selectedBody === 'tanjore'
                          ? 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] font-semibold'
                          : 'bg-[#F5F2EC] dark:bg-[#1C1B19] text-[#77736D]'
                      }`}
                    >
                      Tanjore Carved
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
                <div className="flex items-center gap-6 text-xs">
                  <div>
                    <span className="text-[10px] text-[#77736D] block">FUNDAMENTAL CYCLE</span>
                    <strong className="text-sm font-mono text-[#252421] dark:text-[#F2EEE7]">8.4s / loop</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#77736D] block">JAWARI SHIMMER</span>
                    <strong className="text-sm font-mono text-[#A9232D]">3.2 Hz acoustic beat</strong>
                  </div>
                </div>

                <button
                  onClick={toggleDrone}
                  className={`px-6 py-3 rounded text-xs font-semibold flex items-center gap-2 transition-all shadow-sm ${
                    isDroneActive
                      ? 'bg-[#A9232D] text-white animate-pulse'
                      : 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] hover:bg-[#A9232D]'
                  }`}
                >
                  <span>{isDroneActive ? 'DRONE RUNNING (CLICK TO STOP)' : 'INITIATE DRONE ENGINE'}</span>
                </button>
              </div>

              {/* 4 Strings Visualizer */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                {[
                  { name: 'Pancham', note: 'Pa · 360Hz', sub: `Mode: ${tuningMode}` },
                  { name: 'Jodi Sa (I)', note: 'Madhya · 240Hz', sub: '± 0.0c · Stable' },
                  { name: 'Jodi Sa (II)', note: 'Madhya · 240.25Hz', sub: '+1.8c · Beating' },
                  { name: 'Kharja Sa', note: 'Mandra · 120Hz', sub: 'Rich Wool' }
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded border text-xs transition-colors ${
                      activeStringIndex === idx
                        ? 'bg-[#EAE5DC] dark:bg-[#171716] border-[#A9232D]'
                        : 'bg-[#F5F2EC] dark:bg-[#1C1B19] border-[#DCD6CC] dark:border-[#2E2D2A]'
                    }`}
                  >
                    <span className="text-[10px] text-[#77736D] block">STRING 0{idx + 1}</span>
                    <h5 className="font-bold text-[#252421] dark:text-[#F2EEE7] mt-0.5">{s.name}</h5>
                    <span className="text-[10px] font-mono text-[#77736D] block">{s.note}</span>
                    <span className="text-[10px] text-[#A9232D] font-mono block mt-1">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Jawari Principle Explanation */}
            <div className="lg:col-span-5 p-6 rounded-lg bg-[#EAE5DC] dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A9232D] block">
                JAWARI (DHWANI) PRINCIPLE & ACOUSTIC DISPERSION
              </span>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Unlike Western fixed temperaments, a hand-tuned tanpura generates an infinite dense microtonal cloud through non-linear thread friction against the convex wooden bridge. The deliberate phase beat between the dual Jodi Sa strings generates the hallmark meditative envelope of Indian classical concerts.
              </p>
              <div className="pt-2 border-t border-[#DCD6CC] dark:border-[#2E2D2A] text-xs text-[#77736D]">
                <span>Pluck Cadence: </span>
                <strong className="text-[#252421] dark:text-[#F2EEE7]">1 → 2 → 3 → 4</strong>
              </div>
            </div>
          </div>
        )}

        {/* Workspace 2: Tala Metronome */}
        {activeWorkspace === 'metronome' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 p-6 md:p-8 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#252421] dark:text-[#F2EEE7]">
                    {currentTaal.name} — {currentTaal.beats} Matras
                  </h3>
                  <p className="text-xs text-[#77736D] mt-0.5">{currentTaal.description}</p>
                </div>

                <button
                  onClick={handleToggleTala}
                  className={`px-6 py-2.5 rounded text-xs font-semibold flex items-center gap-2 transition-all ${
                    isTalaPlaying
                      ? 'bg-[#A9232D] text-white animate-pulse'
                      : 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] hover:bg-[#A9232D]'
                  }`}
                >
                  {isTalaPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                  <span>{isTalaPlaying ? 'Stop Metronome' : 'Start Metronome'}</span>
                </button>
              </div>

              {/* Tempo Slider */}
              <div className="p-4 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Tempo (Laya): <strong className="text-[#A9232D] font-mono">{bpm} BPM</strong></span>
                  <span className="text-[11px] font-mono text-[#77736D]">
                    {bpm < 60 ? 'Vilambit (Slow)' : bpm <= 120 ? 'Madhya (Medium)' : 'Drut (Fast)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="200"
                  value={bpm}
                  onChange={(e) => setBpm(Number(e.target.value))}
                  className="w-full accent-[#A9232D] cursor-pointer"
                />
              </div>

              {/* Active Beats Grid */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                  ACTIVE MATRA PULSE SEQUENCE
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {currentTaal.bolList.map((bol, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded text-center border transition-all ${
                        currentBeat === idx && isTalaPlaying
                          ? 'bg-[#A9232D] text-white border-[#A9232D] scale-105 font-bold shadow-md'
                          : idx === 0
                          ? 'bg-[#EAE5DC] dark:bg-[#171716] border-[#A9232D] font-bold'
                          : 'bg-[#F5F2EC] dark:bg-[#1C1B19] border-[#DCD6CC] dark:border-[#2E2D2A]'
                      }`}
                    >
                      <span className="text-base font-mono block">{bol}</span>
                      <span className={`text-[10px] font-mono block ${currentBeat === idx && isTalaPlaying ? 'text-white' : 'text-[#77736D]'}`}>
                        {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Taal Bols String */}
              <div className="p-3 bg-[#F5F2EC] dark:bg-[#171716] rounded border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs font-mono text-center text-[#77736D]">
                {currentTaal.bols}
              </div>
            </div>

            {/* Taal Selector Sidebar */}
            <div className="lg:col-span-4 p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                CLASSICAL TAAL CYCLES
              </span>
              <div className="space-y-1.5">
                {MOCK_TAALS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTaalId(t.id);
                      setIsTalaPlaying(false);
                    }}
                    className={`w-full p-3 rounded text-left border text-xs transition-colors flex items-center justify-between ${
                      selectedTaalId === t.id
                        ? 'bg-[#EAE5DC] dark:bg-[#171716] border-[#A9232D] font-semibold'
                        : 'bg-[#F5F2EC] dark:bg-[#1C1B19] border-[#DCD6CC] dark:border-[#2E2D2A] hover:border-[#77736D]'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-[#252421] dark:text-[#F2EEE7]">{t.name}</span>
                      <span className="text-[10px] text-[#77736D] block">{t.beats} Beats · {t.vibhaags} Vibhaags</span>
                    </div>
                    {selectedTaalId === t.id && (
                      <span className="text-xs text-[#A9232D] font-bold font-mono">● Active</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Workspace 3: Riyaz Timer & Notes History */}
        {activeWorkspace === 'riyaz' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 p-6 md:p-8 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                    DAILY PRACTICE COMPANION
                  </span>
                  <h3 className="text-2xl font-bold text-[#252421] dark:text-[#F2EEE7]">Riyaz Session Logger</h3>
                </div>
                <div className="text-3xl md:text-5xl font-mono font-bold text-[#A9232D]">
                  {formatTimer(timerSeconds)}
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-6 py-2.5 rounded text-xs font-semibold flex items-center gap-2 transition-all ${
                    isTimerRunning
                      ? 'bg-[#A9232D] text-white'
                      : 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] hover:bg-[#A9232D]'
                  }`}
                >
                  {isTimerRunning ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                  <span>{isTimerRunning ? 'Pause Session' : 'Start Riyaz Timer'}</span>
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(0);
                  }}
                  className="px-4 py-2.5 rounded border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs font-semibold hover:border-[#252421]"
                >
                  Reset
                </button>
              </div>

              {/* Session Input Form */}
              <div className="space-y-4 pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                      PRACTICED RAGA
                    </label>
                    <input
                      type="text"
                      value={practicedRaga}
                      onChange={(e) => setPracticedRaga(e.target.value)}
                      placeholder="e.g. Yaman, Darbari, Bhairav..."
                      className="w-full px-3 py-2 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs text-[#252421] dark:text-[#F2EEE7] focus:outline-none focus:border-[#A9232D]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                    SESSION OBSERVATIONS & INTENSITY NOTES
                  </label>
                  <textarea
                    rows={3}
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    placeholder="Focus areas, microtonal tuning challenges, meend glides practiced..."
                    className="w-full px-3 py-2 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs text-[#252421] dark:text-[#F2EEE7] focus:outline-none focus:border-[#A9232D]"
                  />
                </div>

                <button
                  onClick={handleSaveSession}
                  className="px-5 py-2.5 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] text-xs font-semibold hover:bg-[#A9232D] transition-colors flex items-center gap-2"
                >
                  <Save size={14} />
                  <span>Save Session to Archival Log</span>
                </button>
              </div>
            </div>

            {/* Practice History Ledger */}
            <div className="lg:col-span-5 p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                ARCHIVED RIYAZ LOGS
              </span>

              <div className="space-y-3">
                {practiceHistory.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#252421] dark:text-[#F2EEE7]">{item.raga}</span>
                      <span className="font-mono text-[#A9232D] font-semibold">{item.minutes} Mins</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#77736D] block">{item.date}</span>
                    <p className="text-xs text-[#77736D] leading-relaxed pt-1">
                      {item.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Workspace 4: 22 Shrutis */}
        {activeWorkspace === 'shrutis' && (
          <div className="p-6 md:p-8 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                  ANCIENT TONAL GRAMMAR
                </span>
                <h3 className="text-2xl font-bold text-[#252421] dark:text-[#F2EEE7]">
                  22 Shrutis Microtonal Reference Matrix
                </h3>
              </div>
              <span className="text-xs font-mono text-[#77736D]">
                Grounded in Bharata's Natyashastra & Sangeeta Ratnakara
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {shrutis.map((shr) => (
                <button
                  key={shr.code}
                  onClick={() => {
                    setActiveShruti(shr.code);
                    audioEngine.playSwara(shr.swara, 1.2);
                  }}
                  className={`p-3 rounded text-center border transition-all ${
                    activeShruti === shr.code
                      ? 'bg-[#EAE5DC] dark:bg-[#171716] border-[#A9232D] ring-1 ring-[#A9232D]'
                      : 'bg-[#F5F2EC] dark:bg-[#1C1B19] border-[#DCD6CC] dark:border-[#2E2D2A] hover:border-[#77736D]'
                  }`}
                >
                  <span className={`text-base font-bold font-mono ${activeShruti === shr.code ? 'text-[#A9232D]' : 'text-[#252421] dark:text-[#F2EEE7]'}`}>
                    {shr.code}
                  </span>
                  <span className="text-xs text-[#77736D] block mt-0.5">{shr.name}</span>
                  <span className="text-[10px] font-mono text-[#77736D] block">{shr.ratio}</span>
                  <span className="text-[10px] font-mono text-[#A9232D] block">{shr.cents}</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
