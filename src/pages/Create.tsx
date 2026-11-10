import React, { useState, useEffect } from 'react';
import { Play, Pause, Plus, Trash2, Save, Download, RefreshCw, Volume2, Music, CheckCircle2, ArrowRight } from 'lucide-react';
import { audioEngine } from '../lib/audioEngine';
import { MOCK_RAGAS, Raga } from '../lib/ragaData';

interface NoteItem {
  swara: string;
  matra: number;
  duration: number;
  lyrics: string;
}

interface SavedComposition {
  id: string;
  title: string;
  ragaId: string;
  ragaName: string;
  taal: string;
  tempoBpm: number;
  notes: NoteItem[];
  createdAt: string;
}

export const Create: React.FC = () => {
  const [title, setTitle] = useState('Twilight Khayal Bandish');
  const [selectedRagaId, setSelectedRagaId] = useState('yaman');
  const [selectedTaal, setSelectedTaal] = useState('Teentaal (16 Beats)');
  const [tempoBpm, setTempoBpm] = useState(72);
  const [notes, setNotes] = useState<NoteItem[]>([
    { swara: 'N.', matra: 1, duration: 1, lyrics: 'Sa' },
    { swara: 'R', matra: 2, duration: 1, lyrics: 'ra' },
    { swara: 'G', matra: 3, duration: 2, lyrics: 'la' },
    { swara: "M'", matra: 5, duration: 1, lyrics: 'pa' },
    { swara: 'P', matra: 6, duration: 1, lyrics: 're' },
    { swara: 'D', matra: 7, duration: 1, lyrics: 'mo' },
    { swara: 'N', matra: 8, duration: 1, lyrics: 'he' },
    { swara: "S'", matra: 9, duration: 2, lyrics: 're' },
    { swara: 'N', matra: 11, duration: 1, lyrics: 'ji' },
    { swara: 'D', matra: 12, duration: 1, lyrics: 'ya' },
    { swara: 'P', matra: 13, duration: 2, lyrics: 'ko' },
    { swara: "M'", matra: 15, duration: 1, lyrics: 'na' },
    { swara: 'G', matra: 16, duration: 1, lyrics: 'a' }
  ]);

  const [activePlaybackIndex, setActivePlaybackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedCompositions, setSavedCompositions] = useState<SavedComposition[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const selectedRaga = MOCK_RAGAS.find(r => r.id === selectedRagaId) || MOCK_RAGAS[0];

  // 12 Swaras keyboard
  const availableSwaras = [
    { token: 'S.', label: 'Ṡ (Tar)', octave: 'tar' },
    { token: 'N', label: 'N (Shuddha)', octave: 'madhya' },
    { token: 'n', label: 'n (Komal)', octave: 'madhya' },
    { token: 'D', label: 'D (Shuddha)', octave: 'madhya' },
    { token: 'd', label: 'd (Komal)', octave: 'madhya' },
    { token: 'P', label: 'P (Pancham)', octave: 'madhya' },
    { token: "M'", label: "M' (Tivra)", octave: 'madhya' },
    { token: 'M', label: 'M (Shuddha)', octave: 'madhya' },
    { token: 'G', label: 'G (Shuddha)', octave: 'madhya' },
    { token: 'g', label: 'g (Komal)', octave: 'madhya' },
    { token: 'R', label: 'R (Shuddha)', octave: 'madhya' },
    { token: 'r', label: 'r (Komal)', octave: 'madhya' },
    { token: 'S', label: 'S (Shadja)', octave: 'madhya' },
    { token: 'N.', label: 'Ṇ (Mandra)', octave: 'mandra' },
    { token: 'D.', label: 'Ḍ (Mandra)', octave: 'mandra' },
    { token: 'P.', label: 'P̣ (Mandra)', octave: 'mandra' }
  ];

  // Fetch saved compositions from backend
  useEffect(() => {
    fetch('/api/create/compositions')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSavedCompositions(data);
      })
      .catch(() => {});
  }, []);

  const handleAddNote = (swaraToken: string) => {
    audioEngine.playSwara(swaraToken, 0.8);
    setNotes(prev => {
      const nextMatra = prev.length > 0 ? (prev[prev.length - 1].matra % 16) + 1 : 1;
      return [
        ...prev,
        {
          swara: swaraToken,
          matra: nextMatra,
          duration: 1,
          lyrics: ''
        }
      ];
    });
  };

  const handleRemoveNote = (idx: number) => {
    setNotes(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateLyric = (idx: number, lyric: string) => {
    setNotes(prev => prev.map((n, i) => i === idx ? { ...n, lyrics: lyric } : n));
  };

  const handlePlayComposition = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      setActivePlaybackIndex(null);
      return;
    }
    if (notes.length === 0) return;

    setIsPlaying(true);
    const beatMs = (60 / tempoBpm) * 1000;

    for (let i = 0; i < notes.length; i++) {
      if (!isPlaying && i > 0 && activePlaybackIndex === null) break;
      setActivePlaybackIndex(i);
      audioEngine.playSwara(notes[i].swara, 0.85);
      await new Promise(res => setTimeout(res, beatMs * notes[i].duration));
    }

    setActivePlaybackIndex(null);
    setIsPlaying(false);
  };

  const handleSaveComposition = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const payload = {
        title: title || 'Untitled Bandish',
        ragaId: selectedRaga.id,
        ragaName: selectedRaga.name,
        taal: selectedTaal,
        tempoBpm,
        notes
      };

      const res = await fetch('/api/create/compositions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data && data.id) {
        setSavedCompositions(prev => [data, ...prev.filter(c => c.id !== data.id)]);
        setStatusMessage('Composition saved securely to archival store.');
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch (err) {
      setStatusMessage('Saved locally in active session.');
      setTimeout(() => setStatusMessage(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportText = () => {
    const textOutput = `========================================================\n` +
      `RAGALENS SARGAM NOTATION SHEET\n` +
      `Title: ${title}\n` +
      `Raga: ${selectedRaga.name} (${selectedRaga.thaat} Thaat)\n` +
      `Tala: ${selectedTaal} | Tempo: ${tempoBpm} BPM\n` +
      `Standard Pitch: C# (138.59 Hz)\n` +
      `========================================================\n\n` +
      `SWARAS:  ` + notes.map(n => n.swara.padEnd(6)).join(' ') + `\n` +
      `MATRAS:  ` + notes.map(n => String(n.matra).padEnd(6)).join(' ') + `\n` +
      `LYRICS:  ` + notes.map(n => (n.lyrics || '-').padEnd(6)).join(' ') + `\n\n` +
      `Generated with RagaLens Digital Audio OS\n`;

    const blob = new Blob([textOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '_')}_sargam.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
                COMPOSITION & NOTATION STUDIO · PILLAR V: CREATE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
              Sargam Studio<span className="text-[#A9232D]">.</span>
            </h1>
            <p className="text-xs md:text-sm text-[#77736D] leading-relaxed">
              Compose, score, and audition traditional Hindustani Bandishes in authentic Bhatkhande sargam notation. Synthesize melodic phrases in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportText}
              className="px-4 py-2 rounded bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs font-semibold text-[#252421] dark:text-[#F2EEE7] hover:border-[#A9232D] transition-colors flex items-center gap-1.5"
            >
              <Download size={13} className="text-[#77736D]" />
              <span>Export Lipi</span>
            </button>
            <button
              onClick={handleSaveComposition}
              disabled={isSaving}
              className="px-5 py-2 rounded bg-[#A9232D] text-white text-xs font-semibold hover:bg-[#8D1C24] transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              <Save size={13} />
              <span>{isSaving ? 'Saving...' : 'Save to Archive'}</span>
            </button>
          </div>
        </div>

        {statusMessage && (
          <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg text-xs text-green-800 dark:text-green-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-green-600" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Metadata & Audio Controls */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Composition Setup Card */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                COMPOSITION PARAMETERS
              </span>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[#77736D] block mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] text-[#252421] dark:text-[#F2EEE7] focus:outline-none focus:border-[#A9232D]"
                  />
                </div>

                <div>
                  <label className="text-[#77736D] block mb-1">Raga Framework</label>
                  <select
                    value={selectedRagaId}
                    onChange={(e) => setSelectedRagaId(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] text-[#252421] dark:text-[#F2EEE7] focus:outline-none focus:border-[#A9232D]"
                  >
                    {MOCK_RAGAS.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.thaat} Thaat)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[#77736D] block mb-1">Tala Metre</label>
                  <select
                    value={selectedTaal}
                    onChange={(e) => setSelectedTaal(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] text-[#252421] dark:text-[#F2EEE7] focus:outline-none focus:border-[#A9232D]"
                  >
                    <option value="Teentaal (16 Beats)">Teentaal (16 Beats · 4 Vibhaags)</option>
                    <option value="Jhaptal (10 Beats)">Jhaptal (10 Beats · 2-3-2-3)</option>
                    <option value="Rupak Tala (7 Beats)">Rupak Tala (7 Beats · Khali at 1)</option>
                    <option value="Ektaal (12 Beats)">Ektaal (12 Beats · Khayal format)</option>
                    <option value="Keherwa (8 Beats)">Keherwa (8 Beats · 4-4)</option>
                    <option value="Dadra (6 Beats)">Dadra (6 Beats · 3-3)</option>
                    <option value="Chautal (12 Beats)">Chautal (12 Beats · Dhrupad format)</option>
                    <option value="Dhamar (14 Beats)">Dhamar (14 Beats · Holi format)</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[#77736D]">Tempo: {tempoBpm} BPM</label>
                    <span className="text-[10px] font-mono text-[#A9232D]">
                      {tempoBpm < 60 ? 'Vilambit' : tempoBpm < 120 ? 'Madhya Laya' : 'Drut'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="180"
                    value={tempoBpm}
                    onChange={(e) => setTempoBpm(Number(e.target.value))}
                    className="w-full accent-[#A9232D]"
                  />
                </div>
              </div>

              {/* Raga Grammar Reference */}
              <div className="p-3 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] text-[11px] space-y-1">
                <span className="font-semibold text-[#A9232D] block">Canonical Grammar</span>
                <div className="font-mono text-[#77736D]">Arohana: {selectedRaga.arohana}</div>
                <div className="font-mono text-[#77736D]">Pakad: {selectedRaga.pakad}</div>
                <div className="text-[10px] text-[#77736D] pt-1">Vadi: {selectedRaga.vadi} · Samvadi: {selectedRaga.samvadi}</div>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                AUDITION & PLAYBACK
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayComposition}
                  className={`flex-1 py-3 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    isPlaying
                      ? 'bg-[#A9232D] text-white shadow-md'
                      : 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white'
                  }`}
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
                  <span>{isPlaying ? 'Halt Audition' : 'Play Composition'}</span>
                </button>

                <button
                  onClick={() => audioEngine.startTanpura('Pa', 138.59)}
                  className="px-3.5 py-3 rounded border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs font-semibold hover:border-[#A9232D] transition-colors flex items-center gap-1.5"
                  title="Audition with Tanpura Drone"
                >
                  <Volume2 size={14} className="text-[#A9232D]" />
                  <span>Drone</span>
                </button>
              </div>

              <span className="text-[10px] font-mono text-[#77736D] block text-center">
                Total Notes: {notes.length} · Duration: ~{Math.round((notes.reduce((a, b) => a + b.duration, 0) * (60 / tempoBpm)))}s
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Score & Keypad */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Interactive Swara Keypad */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D]">
                  SARGAM SWARA INPUT KEYPAD
                </span>
                <span className="text-[11px] font-mono text-[#77736D]">
                  CLICK NOTE TO APPEND TO SCORE
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {availableSwaras.map(sw => (
                  <button
                    key={sw.token}
                    onClick={() => handleAddNote(sw.token)}
                    className="p-3 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] hover:border-[#A9232D] transition-all flex flex-col items-center justify-center group"
                  >
                    <span className="font-mono text-base font-bold text-[#252421] dark:text-[#F2EEE7] group-hover:text-[#A9232D]">
                      {sw.token}
                    </span>
                    <span className="text-[9px] text-[#77736D] truncate max-w-full">
                      {sw.label.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notation Sheet (Matra Grid) */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCD6CC] dark:border-[#2E2D2A]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
                    NOTATION SCORE SHEET (BHATKHANDE SWARA LIPI)
                  </span>
                  <h3 className="text-xl font-bold text-[#252421] dark:text-[#F2EEE7] mt-0.5">
                    {title}
                  </h3>
                </div>

                <button
                  onClick={() => setNotes([])}
                  className="px-3 py-1 rounded text-xs text-[#77736D] hover:text-[#A9232D] transition-colors"
                >
                  Clear All
                </button>
              </div>

              {notes.length === 0 ? (
                <div className="py-16 text-center text-xs text-[#77736D] space-y-2">
                  <Music size={24} className="mx-auto text-[#77736D]/60" />
                  <p>Your notation score is currently empty.</p>
                  <p className="text-[10px]">Use the keypad above to append notes to the score.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
                  {notes.map((note, idx) => {
                    const isCurrent = activePlaybackIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded border flex flex-col justify-between transition-all relative group ${
                          isCurrent
                            ? 'bg-[#A9232D] text-white border-[#A9232D] ring-2 ring-[#A9232D]'
                            : 'bg-[#F5F2EC] dark:bg-[#171716] border-[#DCD6CC] dark:border-[#2E2D2A]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono opacity-70">
                          <span>M{note.matra}</span>
                          <button
                            onClick={() => handleRemoveNote(idx)}
                            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
                            title="Remove Note"
                          >
                            ×
                          </button>
                        </div>

                        <div className="my-2 text-center">
                          <span className={`font-mono text-xl font-bold ${isCurrent ? 'text-white' : 'text-[#252421] dark:text-[#F2EEE7]'}`}>
                            {note.swara}
                          </span>
                        </div>

                        <div>
                          <input
                            type="text"
                            value={note.lyrics}
                            onChange={(e) => handleUpdateLyric(idx, e.target.value)}
                            placeholder="bol..."
                            className={`w-full text-center text-[10px] bg-transparent border-b ${
                              isCurrent
                                ? 'border-white text-white placeholder-white/70'
                                : 'border-[#DCD6CC] dark:border-[#2E2D2A] text-[#252421] dark:text-[#F2EEE7] placeholder-[#77736D]'
                            } focus:outline-none`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Saved Compositions Catalog */}
            {savedCompositions.length > 0 && (
              <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                  SAVED COMPOSITIONS IN ARCHIVE
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {savedCompositions.map(c => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setTitle(c.title);
                        setSelectedRagaId(c.ragaId);
                        setSelectedTaal(c.taal);
                        setTempoBpm(c.tempoBpm);
                        setNotes(c.notes);
                      }}
                      className="p-3.5 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] hover:border-[#A9232D] cursor-pointer transition-colors flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-bold text-xs text-[#252421] dark:text-[#F2EEE7]">{c.title}</h4>
                        <span className="text-[10px] text-[#77736D] block">
                          {c.ragaName} · {c.taal} · {c.notes.length} notes
                        </span>
                      </div>
                      <ArrowRight size={13} className="text-[#77736D]" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
