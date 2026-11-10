import React, { useState, useEffect } from 'react';
import { Volume2, Play, Pause, RefreshCw, SlidersHorizontal, ArrowRight, Mic, CheckCircle2, Clock, BookOpen, Music, Save, Trash2, Sparkles, Wind } from 'lucide-react';
import { audioEngine } from '../lib/audioEngine';
import { MOCK_TAALS, Taal } from '../lib/ragaData';

export const Toolkit: React.FC = () => {
  const [activeWorkspace, setActiveWorkspace] = useState<'drone' | 'metronome' | 'harmonium' | 'riyaz'>('drone');

  // Tanpura & Swarmandal state
  const [isDroneActive, setIsDroneActive] = useState(false);
  const [selectedTonic, setSelectedTonic] = useState('C#');
  const [tuningMode, setTuningMode] = useState<'Pa' | 'Ma' | 'Ni'>('Pa');
  const [fineCents, setFineCents] = useState(0);
  const [dualTanpura, setDualTanpura] = useState(true);
  const [activeStringIndex, setActiveStringIndex] = useState<number | null>(null);
  const [swarmandalRaga, setSwarmandalRaga] = useState<'yaman' | 'darbari' | 'bhairav' | 'kafi' | 'todi'>('yaman');
  const [isStrumming, setIsStrumming] = useState(false);

  // Tabla & Lehra Studio state (iTablaPro / iLehra experience)
  const [selectedTaalId, setSelectedTaalId] = useState<string>('teentaal');
  const [bpm, setBpm] = useState<number>(80);
  const [isTablaPlaying, setIsTablaPlaying] = useState<boolean>(false);
  const [isLehraActive, setIsLehraActive] = useState<boolean>(false);
  const [lehraRaga, setLehraRaga] = useState<string>('yaman');
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [currentLehraNote, setCurrentLehraNote] = useState<string>('');

  // Harmonium Keypad state
  const [bellowsIntensity, setBellowsIntensity] = useState<number>(80);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [harmoniumRagaFilter, setHarmoniumRagaFilter] = useState<string>('yaman');

  // Riyaz Tracker & Tuner state
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [practicedRaga, setPracticedRaga] = useState('Yaman');
  const [focusArea, setFocusArea] = useState<'Swara Sadhana' | 'Alankar & Speed' | 'Bandish & Tala' | 'Meend & Microtones' | 'Alap & Improvisation'>('Swara Sadhana');
  const [sessionNotes, setSessionNotes] = useState('');
  const [practiceHistory, setPracticeHistory] = useState<Array<{ id?: string; date: string; raga: string; minutes: number; notes: string; focusArea?: string }>>([]);
  const [practiceMetrics, setPracticeMetrics] = useState<{ totalSessions: number; totalMinutes: number; totalHours: number; mostPracticedRaga: string; activeStreakDays: number }>({
    totalSessions: 0,
    totalMinutes: 0,
    totalHours: 0,
    mostPracticedRaga: 'Yaman',
    activeStreakDays: 1
  });

  // Tuner state
  const [isTunerActive, setIsTunerActive] = useState(false);
  const [detectedPitch, setDetectedPitch] = useState<{ freq: number; cents: number; swara: string } | null>(null);

  const tonics = [
    { label: 'A', freq: 110.0 },
    { label: 'A#', freq: 116.54 },
    { label: 'B', freq: 123.47 },
    { label: 'C', freq: 130.81 },
    { label: 'C#', freq: 138.59 },
    { label: 'D', freq: 146.83 },
    { label: 'D#', freq: 155.56 }
  ];

  const currentTaal = MOCK_TAALS.find(t => t.id === selectedTaalId) || MOCK_TAALS[0];
  const rootFreq = tonics.find(t => t.label === selectedTonic)?.freq || 138.59;

  // Load Riyaz history from backend
  const loadRiyazHistory = () => {
    fetch('/api/riyaz')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.sessions)) {
          setPracticeHistory(data.sessions);
          if (data.metrics) setPracticeMetrics(data.metrics);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadRiyazHistory();
  }, []);

  // Tanpura toggle
  const toggleDrone = () => {
    if (isDroneActive) {
      audioEngine.stopTanpura();
      setIsDroneActive(false);
      setActiveStringIndex(null);
    } else {
      audioEngine.startTanpura(tuningMode, rootFreq, fineCents, dualTanpura, (strIdx) => {
        setActiveStringIndex(strIdx);
      });
      setIsDroneActive(true);
    }
  };

  // Swarmandal Auto-Strum
  const handleStrumSwarmandal = async () => {
    if (isStrumming) return;
    setIsStrumming(true);

    const ragaSwaras: Record<string, string[]> = {
      yaman: ['N.', 'R', 'G', "M'", 'P', 'D', 'N', "S'"],
      darbari: ['S', 'R', 'g', 'M', 'P', 'd', 'n', "S'"],
      bhairav: ['S', 'r', 'G', 'M', 'P', 'd', 'N', "S'"],
      kafi: ['S', 'R', 'g', 'M', 'P', 'D', 'n', "S'"],
      todi: ['S', 'r', 'g', "M'", 'd', 'N', "S'"]
    };

    const notes = ragaSwaras[swarmandalRaga] || ragaSwaras.yaman;
    await audioEngine.strumSwarmandal(notes, rootFreq, 'up');
    setTimeout(() => setIsStrumming(false), 800);
  };

  // Tabla Metronome loop
  useEffect(() => {
    let interval: any;
    if (isTablaPlaying) {
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
  }, [isTablaPlaying, bpm, currentTaal]);

  const handleToggleTabla = () => {
    if (isTablaPlaying) {
      setIsTablaPlaying(false);
    } else {
      setCurrentBeat(0);
      const bol = currentTaal.bolList[0] || 'Dha';
      audioEngine.playTablaBol(bol);
      setIsTablaPlaying(true);
    }
  };

  // Lehra Nagma toggle
  const handleToggleLehra = () => {
    if (isLehraActive) {
      audioEngine.stopLehra();
      setIsLehraActive(false);
      setCurrentLehraNote('');
    } else {
      audioEngine.startLehra(selectedTaalId, lehraRaga, bpm, rootFreq, (matra, note) => {
        setCurrentLehraNote(note);
      });
      setIsLehraActive(true);
    }
  };

  // Riyaz Timer loop
  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleSaveSession = async () => {
    const mins = Math.max(1, Math.round(timerSeconds / 60));
    try {
      const res = await fetch('/api/riyaz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          raga: practicedRaga,
          minutes: mins,
          notes: sessionNotes || 'Focused Hindustani riyaz session.',
          focusArea,
          tonic: `${selectedTonic} (${rootFreq.toFixed(1)} Hz)`
        })
      });
      if (res.ok) {
        loadRiyazHistory();
      }
    } catch (err) {
      setPracticeHistory(prev => [
        {
          id: `local-${Date.now()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          raga: practicedRaga,
          minutes: mins,
          notes: sessionNotes || 'Focused Hindustani riyaz session.',
          focusArea
        },
        ...prev
      ]);
    }
    setTimerSeconds(0);
    setIsTimerRunning(false);
    setSessionNotes('');
  };

  const handleDeleteSession = async (id?: string) => {
    if (!id) return;
    try {
      await fetch(`/api/riyaz/${id}`, { method: 'DELETE' });
      loadRiyazHistory();
    } catch (err) {
      setPracticeHistory(prev => prev.filter(p => p.id !== id));
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Harmonium Keys Layout across 3 Saptaks
  const harmoniumKeys = [
    { token: '.P', label: 'P̣', octave: 'mandra', name: 'Mandra Pa', isBlack: false },
    { token: '.d', label: 'ḍ', octave: 'mandra', name: 'Komal Dha', isBlack: true },
    { token: '.D', label: 'Ḍ', octave: 'mandra', name: 'Shuddha Dha', isBlack: false },
    { token: '.n', label: 'ṇ', octave: 'mandra', name: 'Komal Ni', isBlack: true },
    { token: '.N', label: 'Ṇ', octave: 'mandra', name: 'Shuddha Ni', isBlack: false },
    { token: 'S', label: 'S', octave: 'madhya', name: 'Shadja (Sa)', isBlack: false },
    { token: 'r', label: 'r', octave: 'madhya', name: 'Komal Re', isBlack: true },
    { token: 'R', label: 'R', octave: 'madhya', name: 'Shuddha Re', isBlack: false },
    { token: 'g', label: 'g', octave: 'madhya', name: 'Komal Ga', isBlack: true },
    { token: 'G', label: 'G', octave: 'madhya', name: 'Shuddha Ga', isBlack: false },
    { token: 'm', label: 'm', octave: 'madhya', name: 'Shuddha Ma', isBlack: false },
    { token: "M'", label: "M'", octave: 'madhya', name: 'Teevra Ma', isBlack: true },
    { token: 'P', label: 'P', octave: 'madhya', name: 'Panchama', isBlack: false },
    { token: 'd', label: 'd', octave: 'madhya', name: 'Komal Dha', isBlack: true },
    { token: 'D', label: 'D', octave: 'madhya', name: 'Shuddha Dha', isBlack: false },
    { token: 'n', label: 'n', octave: 'madhya', name: 'Komal Ni', isBlack: true },
    { token: 'N', label: 'N', octave: 'madhya', name: 'Shuddha Ni', isBlack: false },
    { token: "S'", label: "Ṡ", octave: 'tar', name: 'Tar Sa', isBlack: false },
    { token: "R'", label: "Ṙ", octave: 'tar', name: 'Tar Re', isBlack: false }
  ];

  const handlePlayHarmonium = (token: string) => {
    setActiveKey(token);
    audioEngine.playHarmoniumNote(token, 0.75, rootFreq, bellowsIntensity / 100);
    setTimeout(() => setActiveKey(null), 300);
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
                ACOUSTIC SUITE · HINDUSTANI RIYAZ COMPANION
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
              The Musician's Toolkit<span className="text-[#A9232D]">.</span>
            </h1>
            <p className="text-xs md:text-sm text-[#77736D] leading-relaxed">
              Professional accompaniment and calibration engine: Dual Tanpura with jawari shimmer, Swarmandal auto-strum, Tabla & Harmonium Lehra studio, and live Riyaz tracking.
            </p>
          </div>

          {/* 4 Dedicated Hindustani Workspaces Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EAE5DC] dark:bg-[#22211F] rounded-lg border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs">
            {[
              { id: 'drone', label: 'Tanpura & Swarmandal' },
              { id: 'metronome', label: 'Tabla & Lehra Studio' },
              { id: 'harmonium', label: 'Harmonium Keypad' },
              { id: 'riyaz', label: 'Riyaz Tracker & Tuner' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveWorkspace(tab.id as any)}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeWorkspace === tab.id
                    ? 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] font-semibold shadow-sm'
                    : 'text-[#77736D] hover:text-[#252421] dark:hover:text-[#F2EEE7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* WORKSPACE 1: Dual Tanpura & Swarmandal */}
        {activeWorkspace === 'drone' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Tanpura Controls Card */}
            <div className="lg:col-span-8 p-6 md:p-8 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                    TONIC GROUND (SA)
                  </span>
                  <div className="flex items-center gap-1">
                    {tonics.map(t => (
                      <button
                        key={t.label}
                        onClick={() => {
                          setSelectedTonic(t.label);
                          if (isDroneActive) {
                            audioEngine.startTanpura(tuningMode, t.freq, fineCents, dualTanpura);
                          }
                        }}
                        className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors ${
                          selectedTonic === t.label
                            ? 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716]'
                            : 'bg-[#F5F2EC] dark:bg-[#1C1B19] text-[#77736D] hover:text-[#252421]'
                        }`}
                      >
                        {selectedTonic === t.label && '• '}
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                    FIRST STRING TUNING
                  </span>
                  <div className="flex items-center gap-1">
                    {(['Pa', 'Ma', 'Ni'] as const).map(mode => (
                      <button
                        key={mode}
                        onClick={() => {
                          setTuningMode(mode);
                          if (isDroneActive) {
                            audioEngine.startTanpura(mode, rootFreq, fineCents, dualTanpura);
                          }
                        }}
                        className={`px-3 py-1 rounded text-xs transition-colors ${
                          tuningMode === mode
                            ? 'bg-[#A9232D] text-white font-semibold'
                            : 'bg-[#F5F2EC] dark:bg-[#1C1B19] text-[#77736D] hover:text-[#252421]'
                        }`}
                      >
                        {mode}-Sa ({mode === 'Pa' ? 'Default' : mode === 'Ma' ? 'Madhyam' : 'Nishad'})
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dual Tanpura & Fine Tuning Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A]">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold">Fine Pitch Calibration:</span>
                    <span className="font-mono text-[#A9232D] font-bold">
                      {fineCents > 0 ? `+${fineCents}` : fineCents} cents
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-25"
                    max="25"
                    value={fineCents}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setFineCents(val);
                      if (isDroneActive) {
                        audioEngine.startTanpura(tuningMode, rootFreq, val, dualTanpura);
                      }
                    }}
                    className="w-full accent-[#A9232D]"
                  />
                  <span className="text-[10px] text-[#77736D] block">Microtonal cent offset for vocal alignment</span>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">Dual Tanpura Mode:</span>
                    <button
                      onClick={() => {
                        const next = !dualTanpura;
                        setDualTanpura(next);
                        if (isDroneActive) {
                          audioEngine.startTanpura(tuningMode, rootFreq, fineCents, next);
                        }
                      }}
                      className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors ${
                        dualTanpura ? 'bg-[#A9232D] text-white' : 'bg-[#EAE5DC] dark:bg-[#22211F] text-[#77736D]'
                      }`}
                    >
                      {dualTanpura ? 'DUAL ON (Stereo Beat)' : 'SINGLE TANPURA'}
                    </button>
                  </div>
                  <span className="text-[10px] text-[#77736D] block pt-2">
                    Simulates two acoustic instruments slightly detuned (+2.5 cents) for thick baithak resonance.
                  </span>
                </div>
              </div>

              {/* Action Buttons: Drone Toggle & Swarmandal Strum */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-[#77736D] block">FUNDAMENTAL SA</span>
                    <strong className="text-sm font-mono text-[#252421] dark:text-[#F2EEE7]">{rootFreq.toFixed(1)} Hz</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#77736D] block">JAWARI SHIMMER</span>
                    <strong className="text-sm font-mono text-[#A9232D]">3.2 Hz acoustic beat</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleStrumSwarmandal}
                    disabled={isStrumming}
                    className="px-4 py-3 rounded border border-[#DCD6CC] dark:border-[#2E2D2A] bg-white dark:bg-[#171716] text-xs font-semibold text-[#252421] dark:text-[#F2EEE7] hover:border-[#A9232D] transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Sparkles size={14} className="text-[#A9232D]" />
                    <span>{isStrumming ? 'Strumming...' : 'Swarmandal Strum'}</span>
                  </button>

                  <button
                    onClick={toggleDrone}
                    className={`px-6 py-3 rounded text-xs font-semibold flex items-center gap-2 transition-all shadow-sm ${
                      isDroneActive
                        ? 'bg-[#A9232D] text-white animate-pulse'
                        : 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] hover:bg-[#A9232D]'
                    }`}
                  >
                    <span>{isDroneActive ? 'DRONE RUNNING (STOP)' : 'INITIATE DUAL TANPURA'}</span>
                  </button>
                </div>
              </div>

              {/* 4 Plucked Strings Visualizer */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                {[
                  { name: `${tuningMode} (First)`, note: `${tuningMode} · ${(rootFreq * (tuningMode === 'Pa' ? 1.5 : tuningMode === 'Ma' ? 1.333 : 1.875)).toFixed(1)}Hz`, sub: `Pluck 1` },
                  { name: 'Jodi Sa (I)', note: `Madhya · ${(rootFreq).toFixed(1)}Hz`, sub: 'Pluck 2 · Stable' },
                  { name: 'Jodi Sa (II)', note: `Madhya · ${(rootFreq * 1.001).toFixed(1)}Hz`, sub: 'Pluck 3 · Beating' },
                  { name: 'Kharja Sa', note: `Mandra · ${(rootFreq / 2).toFixed(1)}Hz`, sub: 'Pluck 4 · Deep Bass' }
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded border text-xs transition-colors ${
                      activeStringIndex === idx
                        ? 'bg-[#EAE5DC] dark:bg-[#171716] border-[#A9232D] ring-1 ring-[#A9232D]'
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

            {/* Swarmandal Raga Tuning Box & Theory */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="p-6 rounded-lg bg-[#EAE5DC] dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A9232D] block">
                  SWARMANDAL HARP TUNING
                </span>
                <p className="text-xs text-[#77736D] leading-relaxed">
                  In Hindustani classical baithaks, masters strum the 36-string Swarmandal box harp during alaps to cascade pure raga swaras across the room.
                </p>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                    SELECT RAGA GLISSANDO
                  </label>
                  <select
                    value={swarmandalRaga}
                    onChange={(e) => setSwarmandalRaga(e.target.value as any)}
                    className="w-full px-3 py-2 rounded bg-white dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs text-[#252421] dark:text-[#F2EEE7] focus:outline-none focus:border-[#A9232D]"
                  >
                    <option value="yaman">Raag Yaman (Kalyan Thaat)</option>
                    <option value="darbari">Darbari Kanada (Asavari Thaat)</option>
                    <option value="bhairav">Raag Bhairav (Bhairav Thaat)</option>
                    <option value="kafi">Raag Kafi (Kafi Thaat)</option>
                    <option value="todi">Miyan Ki Todi (Todi Thaat)</option>
                  </select>
                </div>

                <button
                  onClick={handleStrumSwarmandal}
                  disabled={isStrumming}
                  className="w-full py-2.5 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] text-xs font-semibold hover:bg-[#A9232D] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles size={13} className="text-[#A9232D]" />
                  <span>Execute Raga Harp Sweep</span>
                </button>
              </div>

              <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                  JAWARI DHWANI ACOUSTICS
                </span>
                <p className="text-xs text-[#77736D] leading-relaxed">
                  The flat curved bridge of Miraj tanpuras uses cotton threads to induce high-frequency overtone dispersion. The slight detuning between the twin Jodi Sa strings generates the hallmark tranquil pulse of North Indian classical concerts.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* WORKSPACE 2: Tabla & Lehra Studio (iTablaPro / iLehra Experience) */}
        {activeWorkspace === 'metronome' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Main Accompaniment Engine */}
            <div className="lg:col-span-8 p-6 md:p-8 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#252421] dark:text-[#F2EEE7]">
                    {currentTaal.name} — {currentTaal.beats} Matras
                  </h3>
                  <p className="text-xs text-[#77736D] mt-0.5">{currentTaal.description}</p>
                </div>

                {/* Simultaneous Tabla & Lehra Toggles */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleTabla}
                    className={`px-4 py-2.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                      isTablaPlaying
                        ? 'bg-[#A9232D] text-white animate-pulse'
                        : 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] hover:bg-[#A9232D]'
                    }`}
                  >
                    {isTablaPlaying ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
                    <span>{isTablaPlaying ? 'Stop Tabla' : 'Start Tabla'}</span>
                  </button>

                  <button
                    onClick={handleToggleLehra}
                    className={`px-4 py-2.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                      isLehraActive
                        ? 'bg-[#A9232D] text-white border-[#A9232D]'
                        : 'bg-[#F5F2EC] dark:bg-[#1C1B19] text-[#252421] dark:text-[#F2EEE7] border-[#DCD6CC] dark:border-[#2E2D2A] hover:border-[#A9232D]'
                    }`}
                  >
                    <Music size={13} />
                    <span>{isLehraActive ? 'Stop Lehra' : 'Harmonium Lehra'}</span>
                  </button>
                </div>
              </div>

              {/* Tempo & Lehra Raga Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A]">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Tempo (Laya): <strong className="text-[#A9232D] font-mono">{bpm} BPM</strong></span>
                    <span className="text-[10px] font-mono text-[#77736D]">
                      {bpm < 50 ? 'Ati Vilambit' : bpm <= 75 ? 'Vilambit' : bpm <= 130 ? 'Madhya Laya' : 'Drut'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="220"
                    value={bpm}
                    onChange={(e) => setBpm(Number(e.target.value))}
                    className="w-full accent-[#A9232D] cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Lehra Melodic Framework:</span>
                    {currentLehraNote && (
                      <span className="font-mono text-xs text-[#A9232D] font-bold">
                        Note: {currentLehraNote}
                      </span>
                    )}
                  </div>
                  <select
                    value={lehraRaga}
                    onChange={(e) => {
                      setLehraRaga(e.target.value);
                      if (isLehraActive) {
                        audioEngine.stopLehra();
                        audioEngine.startLehra(selectedTaalId, e.target.value, bpm, rootFreq);
                      }
                    }}
                    className="w-full px-3 py-1.5 rounded bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs text-[#252421] dark:text-[#F2EEE7] focus:outline-none focus:border-[#A9232D]"
                  >
                    <option value="yaman">Raag Yaman (Nagra in Kalyan)</option>
                    <option value="bhairav">Raag Bhairav (Morning Nagma)</option>
                    <option value="kafi">Raag Kafi (Classical Theka Nagma)</option>
                  </select>
                </div>
              </div>

              {/* Matra Sequence Grid showing Sam 'X', Tali, Khali 'O' */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D]">
                    ACTIVE MATRA CYCLE & THEKA BOLS
                  </span>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-[#77736D]">
                    <span><strong className="text-[#A9232D]">X</strong> = Sam (Beat 1)</span>
                    <span><strong>O</strong> = Khali (Wave)</span>
                    <span><strong>+</strong> = Tali (Clap)</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {currentTaal.bolList.map((bol, idx) => {
                    const isSam = idx === 0;
                    const isKhali = Array.isArray(currentTaal.khali)
                      ? currentTaal.khali.includes(idx + 1)
                      : currentTaal.khali === idx + 1;
                    const isCurrent = currentBeat === idx && isTablaPlaying;

                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded text-center border transition-all ${
                          isCurrent
                            ? 'bg-[#A9232D] text-white border-[#A9232D] scale-105 font-bold shadow-md ring-2 ring-[#A9232D]'
                            : isSam
                            ? 'bg-[#EAE5DC] dark:bg-[#171716] border-[#A9232D] font-bold'
                            : isKhali
                            ? 'bg-[#F5F2EC] dark:bg-[#1C1B19] border-dashed border-[#77736D]'
                            : 'bg-[#F5F2EC] dark:bg-[#1C1B19] border-[#DCD6CC] dark:border-[#2E2D2A]'
                        }`}
                      >
                        <span className="text-base font-mono block">{bol}</span>
                        <div className="flex items-center justify-center gap-1 text-[10px] font-mono mt-0.5">
                          <span className={isCurrent ? 'text-white' : 'text-[#77736D]'}>{idx + 1}</span>
                          <span className={isCurrent ? 'text-white' : isSam ? 'text-[#A9232D] font-bold' : isKhali ? 'text-blue-600 font-bold' : 'text-[#77736D]'}>
                            {isSam ? 'X' : isKhali ? 'O' : '+'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Theka Bols Legend */}
              <div className="p-3 bg-[#F5F2EC] dark:bg-[#171716] rounded border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs font-mono text-center text-[#77736D]">
                {currentTaal.bols}
              </div>
            </div>

            {/* Hindustani Taal Selector Sidebar */}
            <div className="lg:col-span-4 p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                HINDUSTANI TAAL CYCLES
              </span>
              <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
                {MOCK_TAALS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTaalId(t.id);
                      setIsTablaPlaying(false);
                      if (isLehraActive) audioEngine.stopLehra();
                      setIsLehraActive(false);
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

        {/* WORKSPACE 3: Harmonium Sargam Keypad */}
        {activeWorkspace === 'harmonium' && (
          <div className="p-6 md:p-8 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D] block">
                  PHYSICAL REED ORGAN SYNTHESIZER
                </span>
                <h3 className="text-2xl font-bold text-[#252421] dark:text-[#F2EEE7] mt-0.5">
                  Harmonium Sargam Keypad
                </h3>
                <p className="text-xs text-[#77736D] mt-1">
                  Dual-reed acoustic synthesis (8' + 4' registers with detune beat). Click or tap keys to articulate authentic Hindustani sargam notes.
                </p>
              </div>

              {/* Bellows Airflow Dynamics Slider */}
              <div className="p-3 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center gap-3">
                <Wind size={16} className="text-[#A9232D]" />
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[11px]">Bellows Airflow:</span>
                    <span className="font-mono text-[11px] text-[#A9232D] font-bold">{bellowsIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={bellowsIntensity}
                    onChange={(e) => setBellowsIntensity(Number(e.target.value))}
                    className="w-32 accent-[#A9232D]"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Harmonium Keyboard */}
            <div className="p-6 rounded-xl bg-[#2B231E] border border-[#443831] shadow-2xl relative overflow-x-auto pb-8">
              <div className="flex items-start justify-center gap-1.5 min-w-[700px]">
                {harmoniumKeys.map(k => {
                  const isCurrent = activeKey === k.token;
                  return (
                    <button
                      key={k.token}
                      onClick={() => handlePlayHarmonium(k.token)}
                      className={`relative flex flex-col justify-end items-center rounded-b-md transition-all select-none ${
                        k.isBlack
                          ? 'w-10 h-32 bg-[#171716] text-white border border-black z-10 -mx-3 shadow-md hover:bg-[#252421]'
                          : 'w-14 h-48 bg-[#FFFDF9] text-[#252421] border border-[#D5CEC4] shadow-sm hover:bg-[#F2EEE7]'
                      } ${isCurrent ? '!bg-[#A9232D] !text-white scale-98 shadow-inner ring-2 ring-[#A9232D]' : ''}`}
                    >
                      <div className="pb-3 text-center">
                        <span className="font-mono text-base font-bold block">{k.label}</span>
                        <span className={`text-[9px] font-sans block ${k.isBlack ? 'text-neutral-400' : 'text-neutral-500'}`}>
                          {k.octave}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="text-center pt-4 text-[11px] text-amber-200/60 font-mono">
                Bellows Chamber · Miraj Seasoned Teak · Standard Pitch {selectedTonic} ({rootFreq.toFixed(1)} Hz)
              </div>
            </div>

            {/* Swara Reference Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 text-xs">
              {[
                { swara: 'S', name: 'Shadja', ratio: '1/1' },
                { swara: 'r / R', name: 'Rishabh (Komal/Shuddha)', ratio: '16/15 · 9/8' },
                { swara: 'g / G', name: 'Gandhar (Komal/Shuddha)', ratio: '6/5 · 5/4' },
                { swara: "m / M'", name: 'Madhyam (Shuddha/Teevra)', ratio: '4/3 · 45/32' },
                { swara: 'P', name: 'Panchama', ratio: '3/2' },
                { swara: 'd / D', name: 'Dhaivat (Komal/Shuddha)', ratio: '8/5 · 5/3' },
                { swara: 'n / N', name: 'Nishad (Komal/Shuddha)', ratio: '9/5 · 15/8' }
              ].map(item => (
                <div key={item.swara} className="p-2.5 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-0.5">
                  <span className="font-mono font-bold text-[#A9232D] block">{item.swara}</span>
                  <span className="font-semibold text-[11px] text-[#252421] dark:text-[#F2EEE7] block truncate">{item.name}</span>
                  <span className="text-[10px] font-mono text-[#77736D] block">{item.ratio}</span>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* WORKSPACE 4: Riyaz Tracker & Tuner */}
        {activeWorkspace === 'riyaz' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Stopwatch & Session Form */}
            <div className="lg:col-span-7 p-6 md:p-8 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                    DAILY ACOUSTIC PRACTICE
                  </span>
                  <h3 className="text-2xl font-bold text-[#252421] dark:text-[#F2EEE7]">Riyaz Stopwatch</h3>
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

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                      FOCUS AREA
                    </label>
                    <select
                      value={focusArea}
                      onChange={(e) => setFocusArea(e.target.value as any)}
                      className="w-full px-3 py-2 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs text-[#252421] dark:text-[#F2EEE7] focus:outline-none focus:border-[#A9232D]"
                    >
                      <option value="Swara Sadhana">Swara Sadhana (Long note sustain)</option>
                      <option value="Alankar & Speed">Alankar & Palta Permutations</option>
                      <option value="Bandish & Tala">Bandish & Tala Alignment</option>
                      <option value="Meend & Microtones">Meend & Microtonal Andolan</option>
                      <option value="Alap & Improvisation">Alap, Jod & Jhala</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                    OBSERVATIONS & PRACTICE LOG
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
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                  ARCHIVED RIYAZ LOGS ({practiceHistory.length})
                </span>
                <span className="text-xs font-mono text-[#A9232D] font-bold">
                  {practiceMetrics.totalHours} hrs logged
                </span>
              </div>

              {/* Summary Pill Bar */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A]">
                  <span className="text-[10px] text-[#77736D] block">Primary Focus:</span>
                  <strong className="text-[11px] text-[#252421] dark:text-[#F2EEE7] truncate block">{practiceMetrics.mostPracticedRaga}</strong>
                </div>
                <div className="p-2.5 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A]">
                  <span className="text-[10px] text-[#77736D] block">Active Streak:</span>
                  <strong className="text-[11px] text-[#252421] dark:text-[#F2EEE7] block">{practiceMetrics.activeStreakDays} Days Continuous</strong>
                </div>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {practiceHistory.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#77736D]">
                    No riyaz sessions recorded yet. Start the practice timer to log your first session.
                  </div>
                ) : (
                  practiceHistory.map((item, idx) => (
                    <div key={item.id || idx} className="p-3.5 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-1 text-xs relative group">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#252421] dark:text-[#F2EEE7]">{item.raga}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#A9232D] font-semibold">{item.minutes} Mins</span>
                          {item.id && (
                            <button
                              onClick={() => handleDeleteSession(item.id)}
                              className="text-[#77736D] hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 p-0.5"
                              title="Delete Session"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#77736D] block">{item.date}</span>
                      <p className="text-xs text-[#77736D] leading-relaxed pt-1">
                        {item.notes}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
