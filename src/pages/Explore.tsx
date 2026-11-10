import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Play, Search, Check, X, ArrowRight, Layers, SlidersHorizontal, Volume2, Info, RefreshCw } from 'lucide-react';
import { MOCK_RAGAS, Raga, MusicalTradition } from '../lib/ragaData';
import { RagaArtwork } from '../components/ui/RagaArtwork';
import { audioEngine } from '../lib/audioEngine';

export const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [selectedThaat, setSelectedThaat] = useState<string>('All');
  const [selectedPhrase, setSelectedPhrase] = useState<string[]>(['N.', 'R', 'G']);
  const [selectedPrahar, setSelectedPrahar] = useState<string>('All');
  const [selectedRasa, setSelectedRasa] = useState<string>('All');
  const [selectedJati, setSelectedJati] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  
  // Audio playback state
  const [playingRagaId, setPlayingRagaId] = useState<string | null>(null);

  // Compare Tray state
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>(['darbari', 'megh']);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // 12-Sargam Hindustani Swara Matrix
  const activeSwaraMatrix = [
    { token: 'S', name: 'Shadja', label: 'S' },
    { token: 'r', name: 'Komal Re', label: 'r' },
    { token: 'R', name: 'Shuddha Re', label: 'R' },
    { token: 'g', name: 'Komal Ga', label: 'g' },
    { token: 'G', name: 'Shuddha Ga', label: 'G' },
    { token: 'm', name: 'Shuddha Ma', label: 'm' },
    { token: "M'", name: 'Teevra Ma', label: "M'" },
    { token: 'P', name: 'Panchama', label: 'P' },
    { token: 'd', name: 'Komal Dha', label: 'd' },
    { token: 'D', name: 'Shuddha Dha', label: 'D' },
    { token: 'n', name: 'Komal Ni', label: 'n' },
    { token: 'N', name: 'Shuddha Ni', label: 'N' }
  ];

  const toggleSwaraInPhrase = (token: string) => {
    // Play note on click
    audioEngine.playSwara(token, 0.7);

    setSelectedPhrase(prev => {
      if (prev.includes(token)) {
        return prev.filter(t => t !== token);
      } else {
        return [...prev, token];
      }
    });
  };

  const toggleCompare = (ragaId: string) => {
    setSelectedForCompare(prev => {
      if (prev.includes(ragaId)) {
        return prev.filter(id => id !== ragaId);
      } else {
        if (prev.length >= 3) {
          return [prev[1], prev[2], ragaId];
        }
        return [...prev, ragaId];
      }
    });
  };

  // Filtering Logic
  const filteredRagas = useMemo(() => {
    return MOCK_RAGAS.filter(raga => {
      // Thaat filter
      const matchesThaat = selectedThaat === 'All' || raga.thaat.toLowerCase().includes(selectedThaat.toLowerCase());

      // Prahar filter
      const matchesPrahar = selectedPrahar === 'All' || 
        (selectedPrahar === 'Morning' && (raga.timeCategory === 'Morning' || raga.time.includes('Dawn') || raga.time.includes('05:00'))) ||
        (selectedPrahar === 'Afternoon' && raga.timeCategory === 'Afternoon') ||
        (selectedPrahar === 'Evening' && raga.timeCategory === 'Evening') ||
        (selectedPrahar === 'Midnight' && (raga.timeCategory === 'Midnight' || raga.timeCategory === 'Late Night'));

      // Rasa filter
      const matchesRasa = selectedRasa === 'All' || raga.primaryRasa.toLowerCase().includes(selectedRasa.toLowerCase()) || raga.mood.some(m => m.toLowerCase().includes(selectedRasa.toLowerCase()));

      // Jati filter
      const matchesJati = selectedJati === 'All' || raga.jati.toLowerCase().includes(selectedJati.toLowerCase());

      // Text Search
      const matchesSearch = !searchQuery.trim() || 
        raga.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        raga.thaat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        raga.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (raga.devanagari && raga.devanagari.includes(searchQuery));

      // Swara Phrase filter: if phrase is active, raga must contain those notes in its scale
      const matchesPhrase = selectedPhrase.length === 0 || selectedPhrase.every(token => {
        const clean = token.replace(/['\.]/g, '');
        return raga.swaraList.some(s => s.replace(/['\.]/g, '') === clean);
      });

      return matchesThaat && matchesPrahar && matchesRasa && matchesJati && matchesSearch && matchesPhrase;
    });
  }, [selectedThaat, selectedPrahar, selectedRasa, selectedJati, searchQuery, selectedPhrase]);

  const handlePlayPakad = async (e: React.MouseEvent, raga: Raga) => {
    e.stopPropagation();
    if (playingRagaId === raga.id) {
      setPlayingRagaId(null);
      return;
    }
    setPlayingRagaId(raga.id);
    const swaras = raga.swaraList.slice(0, 5);
    for (const s of swaras) {
      audioEngine.playSwara(s, 0.7);
      await new Promise(res => setTimeout(res, 500));
    }
    setPlayingRagaId(null);
  };

  const comparedRagas = MOCK_RAGAS.filter(r => selectedForCompare.includes(r.id));

  return (
    <div className="w-full bg-[#F5F2EC] dark:bg-[#171716] min-h-screen text-[#252421] dark:text-[#F2EEE7] pt-8 pb-32 px-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Cartographic Index Header (Matching Reference Image 1) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-6 border-b border-[#DCD6CC] dark:border-[#2E2D2A]">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                CARTOGRAPHIC INDEX · VOL. IV / HINDUSTANI CLASSICAL CANONS
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
              The Raga Atlas<span className="text-[#A9232D]">.</span>
            </h1>
          </div>

          <div className="max-w-md">
            <p className="text-xs md:text-sm text-[#77736D] leading-relaxed">
              A curated journey through 1,200 classical frameworks across Hindustani lineages and Ashta Prahar cycles. Visualized through contemporary archival artworks and microtonal contours.
            </p>
          </div>
        </div>

        {/* 10 Bhatkhande Thaats Filter Bar & Temperament Callout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'All', label: 'All Thaats' },
              { id: 'Bilawal', label: 'Bilawal' },
              { id: 'Kalyan', label: 'Kalyan' },
              { id: 'Khamaj', label: 'Khamaj' },
              { id: 'Kafi', label: 'Kafi' },
              { id: 'Asavari', label: 'Asavari' },
              { id: 'Bhairav', label: 'Bhairav' },
              { id: 'Bhairavi', label: 'Bhairavi' },
              { id: 'Todi', label: 'Todi' },
              { id: 'Poorvi', label: 'Poorvi' },
              { id: 'Marwa', label: 'Marwa' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedThaat(t.id)}
                className={`px-3 py-1.5 rounded text-xs transition-colors flex items-center gap-1.5 ${
                  selectedThaat === t.id
                    ? 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] font-semibold'
                    : 'bg-[#EAE5DC] dark:bg-[#22211F] text-[#77736D] hover:text-[#252421] dark:hover:text-[#F2EEE7]'
                }`}
              >
                {selectedThaat === t.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
                )}
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          <div className="text-[11px] font-mono tracking-wider uppercase text-[#77736D] flex items-center gap-2 whitespace-nowrap">
            <span className="w-6 h-[1px] bg-[#DCD6CC] dark:bg-[#2E2D2A]" />
            <span>TEMPERAMENT: JUST INTONATION (22 SHRU-TIS)</span>
          </div>
        </div>

        {/* Arohana / Phrase Navigator (Matching Reference Image 1) */}
        <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                AROHANA / PHRASE NAVIGATOR
              </span>
              {selectedPhrase.length > 0 && (
                <span className="px-2 py-0.5 rounded bg-[#A9232D] text-white text-[9px] font-bold uppercase tracking-wider">
                  Phrase Active
                </span>
              )}
            </div>

            {selectedPhrase.length > 0 && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#77736D]">Selected:</span>
                <span className="font-bold text-[#252421] dark:text-[#F2EEE7] font-mono">
                  {selectedPhrase.join(' — ')}
                </span>
                <button
                  onClick={() => setSelectedPhrase([])}
                  className="p-1 text-[#77736D] hover:text-[#A9232D] transition-colors"
                  title="Clear Phrase"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* 12 Swara Buttons Row */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {activeSwaraMatrix.map((btn) => {
              const isSelected = selectedPhrase.some(p => p.replace(/['\.]/g, '') === btn.token.replace(/['\.]/g, ''));
              return (
                <button
                  key={btn.token}
                  onClick={() => toggleSwaraInPhrase(btn.token)}
                  className={`p-2.5 rounded text-center transition-all flex flex-col items-center justify-center border ${
                    isSelected
                      ? 'bg-[#EAE5DC] dark:bg-[#171716] border-[#A9232D] ring-1 ring-[#A9232D]'
                      : 'bg-[#F5F2EC] dark:bg-[#1C1B19] border-[#DCD6CC] dark:border-[#2E2D2A] hover:border-[#77736D]'
                  }`}
                >
                  <span className={`text-base font-bold ${isSelected ? 'text-[#A9232D]' : 'text-[#252421] dark:text-[#F2EEE7]'}`}>
                    {btn.label}
                  </span>
                  <span className={`text-[10px] leading-tight block ${isSelected ? 'text-[#A9232D] font-medium' : 'text-[#77736D]'}`}>
                    {btn.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 4 Dropdown Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-[#DCD6CC] dark:border-[#2E2D2A]">
            {/* Thaat */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                BHATKHANDE THAAT
              </label>
              <select
                value={selectedThaat}
                onChange={(e) => setSelectedThaat(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs text-[#252421] dark:text-[#F2EEE7] focus:outline-none focus:border-[#A9232D]"
              >
                <option value="All">All 10 Bhatkhande Thaats ▾</option>
                <option value="Bilawal">Bilawal (Shuddha Scale)</option>
                <option value="Kalyan">Kalyan (Teevra Ma)</option>
                <option value="Khamaj">Khamaj (Komal Ni)</option>
                <option value="Kafi">Kafi (Komal Ga, Komal Ni)</option>
                <option value="Asavari">Asavari (Komal Ga, Dha, Ni)</option>
                <option value="Bhairav">Bhairav (Komal Re, Komal Dha)</option>
                <option value="Bhairavi">Bhairavi (All Komal: r, g, d, n)</option>
                <option value="Todi">Todi (Komal Re, Ga, Dha + Teevra Ma)</option>
                <option value="Poorvi">Poorvi (Komal Re, Dha + Teevra Ma)</option>
                <option value="Marwa">Marwa (Komal Re + Teevra Ma)</option>
              </select>
            </div>

            {/* Prahar / Chronology */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                PRAHAR / CHRONOLOGY
              </label>
              <select
                value={selectedPrahar}
                onChange={(e) => setSelectedPrahar(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs text-[#252421] dark:text-[#F2EEE7] focus:outline-none focus:border-[#A9232D]"
              >
                <option value="All">All Chronological Prahars ▾</option>
                <option value="Morning">Morning & Dawn (4am–9am)</option>
                <option value="Afternoon">Sun High & Afternoon (12pm–3pm)</option>
                <option value="Evening">Evening & Dusk (6pm–9pm)</option>
                <option value="Midnight">Midnight Royal Watch (9pm–2am)</option>
              </select>
            </div>

            {/* Predominant Rasa */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                PREDOMINANT RASA
              </label>
              <select
                value={selectedRasa}
                onChange={(e) => setSelectedRasa(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs text-[#252421] dark:text-[#F2EEE7] focus:outline-none focus:border-[#A9232D]"
              >
                <option value="All">All Aesthetic Rasas ▾</option>
                <option value="Shanti">Shanti (Equanimity & Peace)</option>
                <option value="Shringara">Shringara (Romantic Yearning)</option>
                <option value="Karuna">Karuna (Pathos & Compassion)</option>
                <option value="Gambhir">Gambhir (Solemn Gravity)</option>
                <option value="Veera">Veera (Valor & Heroic Grace)</option>
                <option value="Bhakti">Bhakti (Pious Devotion)</option>
              </select>
            </div>

            {/* Jati / Count */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] block">
                JATI / COUNT
              </label>
              <select
                value={selectedJati}
                onChange={(e) => setSelectedJati(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs text-[#252421] dark:text-[#F2EEE7] focus:outline-none focus:border-[#A9232D]"
              >
                <option value="All">All Jatis ▾</option>
                <option value="Sampoorna">Sampoorna (Heptatonic 7 notes)</option>
                <option value="Audav">Audav (Pentatonic 5 notes)</option>
                <option value="Shadav">Shadav (Hexatonic 6 notes)</option>
                <option value="Vakra">Vakra Phrasing (Zig-zag)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Archive Catalog Header */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
              Archive Catalog
            </h2>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#77736D] bg-[#EAE5DC] dark:bg-[#22211F] px-2 py-0.5 rounded">
              SHOWING {filteredRagas.length} OF 1,248
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#77736D]">
            <span>Order:</span>
            <span className="font-semibold text-[#252421] dark:text-[#F2EEE7]">Canonical Weight</span>
          </div>
        </div>

        {/* 6 Ragas Grid (Matching Reference Image 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRagas.map((raga) => {
            const isCompared = selectedForCompare.includes(raga.id);
            return (
              <div
                key={raga.id}
                className="rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] overflow-hidden hover:border-[#A9232D] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Visual Mount / Canvas Header */}
                  <div className="p-3 bg-[#EAE5DC] dark:bg-[#171716] border-b border-[#DCD6CC] dark:border-[#2E2D2A]">
                    <div className="rounded overflow-hidden border border-[#DCD6CC] dark:border-[#2E2D2A] bg-[#F5F2EC] h-48 relative">
                      <RagaArtwork raga={raga} className="w-full h-full group-hover:scale-102 transition-transform duration-300" />
                      
                      {/* Top Label */}
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
                        <span>{raga.name.toUpperCase()}</span>
                      </div>

                      {/* Prahar Badge */}
                      <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white font-mono">
                        {raga.time}
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#77736D]">
                      <span>{raga.jati}</span>
                      <span className="text-[#A9232D]">{raga.primaryRasa}</span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-[#252421] dark:text-[#F2EEE7] group-hover:text-[#A9232D] transition-colors">
                        {raga.name}
                      </h3>
                      {raga.devanagari && (
                        <span className="text-xs text-[#77736D] block">{raga.devanagari}</span>
                      )}
                    </div>

                    <p className="text-xs text-[#77736D] leading-relaxed line-clamp-2">
                      {raga.description}
                    </p>

                    {/* Swaras List */}
                    <div className="pt-1 flex items-center justify-between text-xs">
                      <span className="text-[#77736D]">Swaras:</span>
                      <span className="font-mono font-semibold text-[#252421] dark:text-[#F2EEE7]">
                        {raga.arohana}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 pb-5 pt-3 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between text-xs">
                  {/* Audio Play Pakad */}
                  <button
                    onClick={(e) => handlePlayPakad(e, raga)}
                    className="flex items-center gap-1.5 text-[#252421] dark:text-[#F2EEE7] hover:text-[#A9232D] transition-colors font-medium"
                  >
                    <Play size={12} fill="currentColor" className={playingRagaId === raga.id ? 'text-[#A9232D] animate-pulse' : ''} />
                    <span>{playingRagaId === raga.id ? 'Playing...' : '0:45 · Pakad'}</span>
                  </button>

                  <div className="flex items-center gap-4">
                    {/* Compare Checkbox */}
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs text-[#77736D] hover:text-[#252421] select-none">
                      <input
                        type="checkbox"
                        checked={isCompared}
                        onChange={() => toggleCompare(raga.id)}
                        className="rounded border-[#DCD6CC] text-[#A9232D] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>Compare</span>
                    </label>

                    {/* View Exhibition Button */}
                    <Link
                      to={`/raga/${raga.id}`}
                      className="text-[#252421] dark:text-[#F2EEE7] font-semibold hover:text-[#A9232D] flex items-center gap-1 transition-colors"
                    >
                      <span>View</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Persistent Bottom Comparative Analysis Tray (Matching Reference Image 1) */}
        {selectedForCompare.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-4 animate-in slide-in-from-bottom-4 duration-200">
            <div className="p-4 rounded-xl bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A9232D]" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
                      COMPARATIVE ANALYSIS TRAY
                    </span>
                  </div>
                  <div className="text-xs md:text-sm font-bold text-[#252421] dark:text-[#F2EEE7]">
                    {selectedForCompare.length} Ragas Selected ·{' '}
                    <span className="text-[#77736D] font-normal">
                      {comparedRagas.map(r => r.name).join(' & ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedForCompare([])}
                  className="px-3 py-1.5 text-xs text-[#77736D] hover:text-[#252421] dark:hover:text-[#F2EEE7] transition-colors"
                >
                  Clear Selection
                </button>
                <button
                  onClick={() => setShowComparisonModal(true)}
                  className="px-5 py-2.5 rounded bg-[#A9232D] text-white text-xs font-semibold hover:bg-[#8D1C24] transition-all flex items-center gap-2 shadow-sm"
                >
                  <Layers size={14} />
                  <span>Run Acoustic Comparison</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Side-by-Side Comparison Modal */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-5xl bg-[#F5F2EC] dark:bg-[#1C1B19] rounded-xl border border-[#DCD6CC] dark:border-[#2E2D2A] shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between sticky top-0 bg-[#F5F2EC] dark:bg-[#1C1B19] z-10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
                  SIDE-BY-SIDE MODAL ACOUSTIC ANALYSIS
                </span>
                <h3 className="text-2xl font-bold text-[#252421] dark:text-[#F2EEE7]">
                  Comparative Raga Examination
                </h3>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="p-1.5 rounded-full hover:bg-[#EAE5DC] dark:hover:bg-[#2E2D2A] text-[#77736D]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {comparedRagas.map(raga => (
                <div key={raga.id} className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A9232D]">
                        {raga.thaat} Thaat · {raga.tradition}
                      </span>
                      <h4 className="text-2xl font-bold text-[#252421] dark:text-[#F2EEE7] mt-0.5">{raga.name}</h4>
                      {raga.devanagari && <span className="text-xs text-[#77736D]">{raga.devanagari}</span>}
                    </div>
                    <span className="text-xs font-mono text-[#77736D]">{raga.time}</span>
                  </div>

                  {/* Swara scales */}
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[#77736D] block font-semibold">Arohana (Ascent):</span>
                      <span className="font-mono font-bold text-[#252421] dark:text-[#F2EEE7]">{raga.arohana}</span>
                    </div>
                    <div>
                      <span className="text-[#77736D] block font-semibold">Avarohana (Descent):</span>
                      <span className="font-mono font-bold text-[#252421] dark:text-[#F2EEE7]">{raga.avarohana}</span>
                    </div>
                    <div>
                      <span className="text-[#77736D] block font-semibold">Pakad (Catch Phrase):</span>
                      <span className="font-mono text-[#A9232D]">{raga.pakad}</span>
                    </div>
                  </div>

                  {/* Vadi / Samvadi Table */}
                  <div className="p-3 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#77736D] block text-[10px]">Vadi Swara:</span>
                      <strong className="text-[#252421] dark:text-[#F2EEE7]">{raga.vadi}</strong>
                    </div>
                    <div>
                      <span className="text-[#77736D] block text-[10px]">Samvadi Swara:</span>
                      <strong className="text-[#252421] dark:text-[#F2EEE7]">{raga.samvadi}</strong>
                    </div>
                    <div>
                      <span className="text-[#77736D] block text-[10px]">Primary Rasa:</span>
                      <strong className="text-[#252421] dark:text-[#F2EEE7]">{raga.primaryRasa}</strong>
                    </div>
                    <div>
                      <span className="text-[#77736D] block text-[10px]">Jati Archetype:</span>
                      <strong className="text-[#252421] dark:text-[#F2EEE7]">{raga.jati}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-[#77736D] leading-relaxed">
                    {raga.description}
                  </p>

                  <Link
                    to={`/raga/${raga.id}`}
                    onClick={() => setShowComparisonModal(false)}
                    className="w-full py-2.5 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white transition-colors"
                  >
                    <span>Open Full Exhibition Dossier</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
