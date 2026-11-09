import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Play, Volume2, ArrowRight, Search, Mic, Disc, Compass, Sparkles, Check, FileText } from 'lucide-react';
import { MOCK_RAGAS, Raga } from '../lib/ragaData';
import { RagaArtwork } from '../components/ui/RagaArtwork';
import { audioEngine } from '../lib/audioEngine';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isPlayingAroha, setIsPlayingAroha] = useState(false);
  const [activeSwara, setActiveSwara] = useState<string | null>(null);
  const [selectedRasa, setSelectedRasa] = useState<string>('Shanti');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredRaga = MOCK_RAGAS.find(r => r.id === 'yaman') || MOCK_RAGAS[0];

  const handlePlayAroha = async () => {
    if (isPlayingAroha) return;
    setIsPlayingAroha(true);
    const swaras = ["N.", "R", "G", "M", "D", "N", "S'"];
    for (const s of swaras) {
      setActiveSwara(s);
      audioEngine.playSwara(s, 0.85);
      await new Promise(r => setTimeout(r, 550));
    }
    setActiveSwara(null);
    setIsPlayingAroha(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const prahars = [
    {
      prahar: '1ST PRAHAR',
      time: '06:00 - 09:00',
      raga: 'Bhairav',
      desc: 'Early Dawn Awaken',
      notes: 'Komal Re, Dha · Austere',
      active: false
    },
    {
      prahar: '2ND PRAHAR',
      time: '09:00 - 12:00',
      raga: 'Miyan Ki Todi',
      desc: 'Late Morning Solitude',
      notes: 'Tivra Ma, Komal Ga · Deep Pathos',
      active: false
    },
    {
      prahar: '3RD PRAHAR',
      time: '12:00 - 15:00',
      raga: 'Bhimpalasi',
      desc: 'Sun High & Resignation',
      notes: 'Kafi Thaat · Shringara & Peace',
      active: false
    },
    {
      prahar: '4TH PRAHAR',
      time: '18:00 - 21:00',
      raga: 'Yaman · Purvi',
      desc: 'Twilight Junction (Sandhi)',
      notes: 'Optimal Rasa',
      active: true,
      badge: 'NOW'
    },
    {
      prahar: '5TH PRAHAR',
      time: '21:00 - 00:00',
      raga: 'Darbari Kanada',
      desc: 'Midnight Royal Gravity',
      notes: 'Slow Andolan on Ga & Dha · Majesty',
      active: false
    },
    {
      prahar: '6TH PRAHAR',
      time: '00:00 - 03:00',
      raga: 'Malkauns',
      desc: 'Deep Inward Trance',
      notes: 'Pentatonic Audav · Meditative',
      active: false
    }
  ];

  const rasaCards: Record<string, { raga: string; thaat: string; subtitle: string; desc: string; master: string }[]> = {
    'Shanti': [
      {
        raga: 'Malkauns',
        thaat: 'BHAIRAVI THAAT',
        subtitle: 'Universal Shanti',
        desc: 'Devoid of Rishabh and Pancham, Malkauns draws its quiet power from the intense oscillation of Komal Gandhar and Komal Dhaivat, inducing an unshakeable inner calm.',
        master: 'Ustad Amir Khan'
      },
      {
        raga: 'Bageshri',
        thaat: 'KHAMAJ THAAT',
        subtitle: 'Serene Contemplation',
        desc: 'Depicting the lover waiting patiently in deep stillness. The gliding transitions (meend) from Madhyam to Dhaivat capture delicate balance between longing and tranquility.',
        master: 'Pt. Kumar Gandharva'
      },
      {
        raga: 'Ahir Bhairav',
        thaat: 'BHAIRAV THAAT',
        subtitle: 'Prabhat Transcendence',
        desc: 'A hybrid morning masterpiece combining the solemnity of Bhairav with the sweetness of Kafi. Restores equilibrium to the waking mind at daybreak.',
        master: 'Pt. Hariprasad Chaurasia'
      }
    ],
    'Shringara': [
      {
        raga: 'Yaman',
        thaat: 'KALYAN THAAT',
        subtitle: 'Lover’s Twilight',
        desc: 'The grand sovereign of dusk, celebrating the anticipation of meeting the beloved under evening lamps.',
        master: 'Vidushi Kishori Amonkar'
      },
      {
        raga: 'Khamaj',
        thaat: 'KHAMAJ THAAT',
        subtitle: 'Playful Romance',
        desc: 'Sweet, lyric-centered melodies immortalized in classical Thumri and Dadra.',
        master: 'Ustad Bade Ghulam Ali Khan'
      },
      {
        raga: 'Pilu',
        thaat: 'KHAMAJ THAAT',
        subtitle: 'Pastoral Tenderness',
        desc: 'Touches all twelve semitones in lighter classical expressions with folk intimacy.',
        master: 'Pt. Shivkumar Sharma'
      }
    ],
    'Veera': [
      {
        raga: 'Darbari Kanada',
        thaat: 'ASAVARI THAAT',
        subtitle: 'Imperial Valor & Majesty',
        desc: 'Endowed with slow, unhurried, royal authority designed for Mughal darbars.',
        master: 'Ustad Vilayat Khan'
      },
      {
        raga: 'Shankara',
        thaat: 'BILAWAL THAAT',
        subtitle: 'Cosmic Strength',
        desc: 'Fiery, abrupt zigzag ascents invoking Lord Shiva’s cosmic dance.',
        master: 'Pt. Mallikarjun Mansur'
      },
      {
        raga: 'Kedar',
        thaat: 'KALYAN THAAT',
        subtitle: 'Noble Elevation',
        desc: 'Complex twisted phrases demanding tremendous lung capacity and mental focus.',
        master: 'Pt. Bhimsen Joshi'
      }
    ],
    'Karuna': [
      {
        raga: 'Bhimpalasi',
        thaat: 'KAFI THAAT',
        subtitle: 'Viraha Longing',
        desc: 'The poignant ache of separation sung during the quiet fading hours of late afternoon.',
        master: 'Pt. Mallikarjun Mansur'
      },
      {
        raga: 'Miyan Ki Todi',
        thaat: 'TODI THAAT',
        subtitle: 'Heartbroken Austerity',
        desc: 'Piercing microtones that evoke forest solitude and total surrender.',
        master: 'Pt. Bhimsen Joshi'
      },
      {
        raga: 'Jogiya',
        thaat: 'BHAIRAV THAAT',
        subtitle: 'Ascetic Pity',
        desc: 'Sung by wandering mendicants, capturing pure tears of devotion.',
        master: 'Dr. Prabha Atre'
      }
    ],
    'Bhakti': [
      {
        raga: 'Bhairavi',
        thaat: 'BHAIRAVI THAAT',
        subtitle: 'Divine Mother',
        desc: 'The concluding sanctuary of Indian classical music, dissolving all dualities.',
        master: 'Ustad Bismillah Khan'
      },
      {
        raga: 'Ahir Bhairav',
        thaat: 'BHAIRAV THAAT',
        subtitle: 'Morning Prayer',
        desc: 'Temple bells and sanctum peace at the breaking of dawn.',
        master: 'Pt. Hariprasad Chaurasia'
      },
      {
        raga: 'Brindavani Sarang',
        thaat: 'KAFI THAAT',
        subtitle: 'Pastoral Worship',
        desc: 'Clear midday devotion celebrating the flute of Krishna in holy Vrindavan.',
        master: 'Pt. Nikhil Banerjee'
      }
    ]
  };

  return (
    <div className="w-full bg-[#F5F2EC] dark:bg-[#171716] min-h-screen text-[#252421] dark:text-[#F2EEE7] transition-colors">
      
      {/* Hero Section (Matching Reference Image 2: "Every raga has a world.") */}
      <section className="pt-10 pb-16 px-6 max-w-7xl mx-auto space-y-8">
        
        {/* Editorial Eyebrow */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
            ARCHIVE EDITION VOL. IV · Sangeet Shastra Corpus
          </span>
        </div>

        {/* Massive Headline */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7] leading-[1.05]">
            Every raga has a world<span className="text-[#A9232D]">.</span>
          </h1>
          <p className="text-sm md:text-base text-[#77736D] leading-relaxed max-w-2xl font-normal">
            Explore the melodies, traditions, artists and ideas that shape Indian classical music through archival recordings, visual ragamala art, and computational acoustics.
          </p>
        </div>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl">
          <div className="flex items-center gap-3 p-2 bg-white dark:bg-[#22211F] rounded-lg border border-[#DCD6CC] dark:border-[#2E2D2A] shadow-sm">
            <Search size={18} className="text-[#77736D] ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by raga, thaat, swara set (e.g. S R G)"
              className="flex-1 bg-transparent text-xs md:text-sm text-[#252421] dark:text-[#F2EEE7] placeholder-[#77736D] focus:outline-none"
            />
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#77736D] pr-2">
              <span className="text-[10px] uppercase font-bold tracking-wider">quick:</span>
              {['Yaman', 'Darbari', 'Bhairav', 'Megh'].map(q => (
                <button
                  type="button"
                  key={q}
                  onClick={() => setSearchQuery(q)}
                  className="px-2 py-0.5 rounded bg-[#EAE5DC] dark:bg-[#2E2D2A] text-[#252421] dark:text-[#F2EEE7] hover:border-[#A9232D] border border-transparent transition-colors"
                >
                  {q}
                </button>
              ))}
              <kbd className="text-[10px] bg-[#EAE5DC] dark:bg-[#2E2D2A] px-1.5 py-0.5 rounded font-mono">
                ⌘K
              </kbd>
            </div>
          </div>
        </form>

        {/* Daily Selection Featured Raga (Plate No. 042 - Yaman) */}
        <div className="pt-8">
          <div className="p-6 md:p-10 rounded-xl bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Plate 042 Ragamala Canvas */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold tracking-widest uppercase text-[#77736D]">
                <span>PLATE NO. 042 · RAGAMALA INTERPRETATION</span>
                <span className="text-[#A9232D] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A9232D]" />
                  DAILY SELECTION
                </span>
              </div>

              {/* Museum Ivory Frame */}
              <div className="p-3 bg-[#EAE5DC] dark:bg-[#171716] rounded-lg border border-[#DCD6CC] dark:border-[#2E2D2A]">
                <div className="rounded overflow-hidden border border-[#DCD6CC] dark:border-[#2E2D2A] bg-[#F5F2EC] h-64 md:h-80">
                  <RagaArtwork raga={featuredRaga} className="w-full h-full" />
                </div>
              </div>

              <p className="text-[11px] text-[#77736D] italic">
                Medium: Hand-ground pigment & 24k gold dust on Khadi rag paper · Archival Collection · Sangeet Natak
              </p>
            </div>

            {/* Right: Raga Grammar, Swaras, and Audio Exegesis */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D]">
                  EVENING SANDHIPRAKASH · AUDAV-SAMPURNA
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7] mt-1">
                  {featuredRaga.name}
                </h2>
                <p className="text-xs md:text-sm text-[#77736D] leading-relaxed mt-3">
                  {featuredRaga.description}
                </p>
              </div>

              {/* Aroha / Avaroha Grammar Table */}
              <div className="p-4 rounded-lg bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#77736D]">
                  <span className="font-bold uppercase tracking-wider">Aroha / Avaroha Grammar</span>
                  <span className="text-[#A9232D] font-bold">Tivra Ma (M')</span>
                </div>

                <div className="flex items-center gap-3 text-sm font-semibold tracking-wider flex-wrap">
                  {['Ṇ', 'R', 'G', "M'", 'D', 'N', 'Ṡ'].map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => audioEngine.playSwara(s, 0.9)}
                      className={`px-2.5 py-1 rounded transition-all text-xs ${
                        s.includes("M'") 
                          ? 'text-[#A9232D] font-bold bg-[#A9232D]/10' 
                          : 'text-[#252421] dark:text-[#F2EEE7] hover:bg-white dark:hover:bg-[#22211F]'
                      } ${activeSwara === s ? 'ring-2 ring-[#A9232D] scale-110' : ''}`}
                      title={`Audition swara ${s}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between text-[11px] text-[#77736D]">
                  <span>Vadi: <strong className="text-[#252421] dark:text-[#F2EEE7]">Ga (300Hz)</strong></span>
                  <span>Samvadi: <strong className="text-[#252421] dark:text-[#F2EEE7]">Ni (450Hz)</strong></span>
                  <span>Thaat: <strong className="text-[#252421] dark:text-[#F2EEE7]">Kalyan</strong></span>
                </div>
              </div>

              {/* Audio Player Component */}
              <div className="p-3 rounded-lg bg-white dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between gap-4">
                <button
                  onClick={handlePlayAroha}
                  disabled={isPlayingAroha}
                  className="flex items-center gap-3 text-left flex-1"
                >
                  <div className={`w-9 h-9 rounded-full bg-[#A9232D] text-white flex items-center justify-center transition-transform ${isPlayingAroha ? 'scale-105' : 'hover:scale-105'}`}>
                    <Play size={15} fill="currentColor" className="ml-0.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#252421] dark:text-[#F2EEE7] block">
                      Aroha & Pakad Vistar
                    </span>
                    <span className="text-[11px] text-[#77736D]">
                      {isPlayingAroha ? 'Synthesizing Swaras...' : 'Pt. Nikhil Banerjee · 0:48'}
                    </span>
                  </div>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/raga/${featuredRaga.id}`)}
                    className="px-3 py-1.5 rounded border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs font-semibold text-[#252421] dark:text-[#F2EEE7] hover:bg-[#EAE5DC] dark:hover:bg-[#2E2D2A] transition-colors"
                  >
                    Notation Sheet
                  </button>
                </div>
              </div>

              {/* Bottom Quick Link */}
              <div className="flex items-center justify-between text-xs text-[#77736D]">
                <span>Recommended Listening: 18:00 – 21:00</span>
                <Link
                  to={`/explore?thaat=Kalyan`}
                  className="text-[#A9232D] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Explore Kalyan Thaat</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Temporal Resonance: Time & The Raga (Matching Reference Image 2) */}
      <section className="py-16 bg-[#EAE5DC] dark:bg-[#171716] border-y border-[#DCD6CC] dark:border-[#2E2D2A] px-6 transition-colors">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                  THE ASHTA PRAHAR CYCLE
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
                Temporal Resonance: Time & The Raga
              </h2>
              <p className="text-xs md:text-sm text-[#77736D] leading-relaxed">
                Indian classical music aligns microtonal structures with circadian biorhythms. Each raga flowers in its consecrated three-hour watch (prahar) of the sun and stars.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#A9232D] bg-white dark:bg-[#22211F] px-3.5 py-1.5 rounded border border-[#DCD6CC] dark:border-[#2E2D2A]">
              <span className="w-2 h-2 rounded-full bg-[#A9232D] animate-ping" />
              <span>ACTIVE PRAHAR: Sandhiprakash (Dusk)</span>
            </div>
          </div>

          {/* 6 Prahar Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {prahars.map((p, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/explore?prahar=${idx + 1}`)}
                className={`p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  p.active
                    ? 'bg-white dark:bg-[#22211F] border-[#A9232D] shadow-md ring-1 ring-[#A9232D]'
                    : 'bg-[#F5F2EC] dark:bg-[#1C1B19] border-[#DCD6CC] dark:border-[#2E2D2A] hover:border-[#252421]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#77736D]">
                    <span>{p.prahar}</span>
                    {p.badge && (
                      <span className="text-[9px] font-bold bg-[#A9232D] text-white px-1.5 py-0.2 rounded">
                        ● {p.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-[#77736D] block mt-0.5">{p.time}</span>
                  
                  <h3 className="font-bold text-sm md:text-base text-[#252421] dark:text-[#F2EEE7] mt-3">
                    {p.raga}
                  </h3>
                  <p className="text-[11px] text-[#77736D] mt-1">{p.desc}</p>
                </div>

                <div className="pt-3 border-t border-[#DCD6CC] dark:border-[#2E2D2A] text-[10px] text-[#77736D]">
                  {p.notes}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* The Navarasa Spectrum (Matching Reference Image 2) */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-10">
        
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
              AESTHETIC FRAMEWORK
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
            The Navarasa Spectrum
          </h2>
          <p className="text-xs md:text-sm text-[#77736D] leading-relaxed">
            A raga does not convey vague sentiment; it targets precise emotional currents formulated in Bharata Muni's Natyashastra. Select a rasa to explore its tonal archetypes.
          </p>
        </div>

        {/* Rasa Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'Shanti', label: 'Shanti · Peace' },
            { id: 'Shringara', label: 'Shringara · Love & Longing' },
            { id: 'Veera', label: 'Veera · Valor & Majesty' },
            { id: 'Karuna', label: 'Karuna · Pathos & Compassion' },
            { id: 'Bhakti', label: 'Bhakti · Devotion' }
          ].map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRasa(r.id)}
              className={`px-4 py-2 rounded text-xs transition-colors ${
                selectedRasa === r.id
                  ? 'bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] font-semibold'
                  : 'bg-[#EAE5DC] dark:bg-[#22211F] text-[#77736D] hover:text-[#252421] dark:hover:text-[#F2EEE7]'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* 3 Rasa Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(rasaCards[selectedRasa] || rasaCards['Shanti']).map((card, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/explore?q=${encodeURIComponent(card.raga)}`)}
              className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] hover:border-[#A9232D] transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#77736D]">
                  <span>{card.thaat}</span>
                  <span className="text-[#A9232D]">{card.subtitle}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#252421] dark:text-[#F2EEE7] group-hover:text-[#A9232D] transition-colors">
                  {card.raga}
                </h3>
                <p className="text-xs text-[#77736D] leading-relaxed pt-1">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex items-center justify-between text-xs text-[#77736D]">
                <span>Key Archival Master: {card.master}</span>
                <ArrowRight size={13} className="text-[#77736D] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Master Heritage Quote & Lineages (Matching Reference Image 2: Ustad Amir Khan) */}
      <section className="py-16 bg-[#EAE5DC] dark:bg-[#171716] border-y border-[#DCD6CC] dark:border-[#2E2D2A] px-6 transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Vintage Sepia/Graphite Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center p-6 bg-[#F5F2EC] dark:bg-[#22211F] rounded-lg border border-[#DCD6CC] dark:border-[#2E2D2A]">
            <img
              src="/public/assets/aistudio/image_c298b7eb.png"
              alt="Ustad Amir Khan"
              className="w-64 h-80 object-cover rounded grayscale contrast-125 border border-[#DCD6CC] dark:border-[#2E2D2A]"
            />
            <div className="mt-4 text-center">
              <h3 className="font-bold text-base text-[#252421] dark:text-[#F2EEE7]">Ustad Amir Khan</h3>
              <p className="text-xs text-[#77736D]">1912 – 1974 · Founder, Indore Gharana</p>
              <span className="text-[10px] font-mono text-[#A9232D] font-bold block mt-1">
                Ati Vilambit Pioneer
              </span>
            </div>
          </div>

          {/* Right: The Living Entity Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                PHILOSOPHY OF SWARA
              </span>
            </div>

            <blockquote className="text-2xl md:text-4xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7] leading-tight">
              “The raga is not merely a scale, but a living entity. It demands patience, surrender, and a lifelong pursuit of the perfect note.”
            </blockquote>

            <p className="text-xs md:text-sm text-[#77736D] leading-relaxed">
              Through the Guru-Shishya Parampara, master musicians have preserved oral notations and microtonal nuances across centuries. Each Gharana represents an idiosyncratic aesthetic syntax, breath discipline, and architecture of improvisation.
            </p>

            {/* Lineages Mini Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                { name: 'Kirana', detail: 'Swara purity · Abdul Karim Khan' },
                { name: 'Gwalior', detail: 'Oldest Lineage · Robust Bandish' },
                { name: 'Agra', detail: 'Nom-Tom Alap · Faiyaz Khan' },
                { name: 'Patiala', detail: 'Intricate Taans · Bade Ghulam Ali' },
                { name: 'Maihar', detail: 'Sitar & Sarod · Allauddin Khan' },
                { name: 'Indore', detail: 'Contemplative Merukhand' }
              ].map((g, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-[#22211F] rounded border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs space-y-0.5">
                  <span className="font-bold text-[#252421] dark:text-[#F2EEE7] block">{g.name}</span>
                  <span className="text-[10px] text-[#77736D] leading-tight block">{g.detail}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-semibold">
              <Link
                to="/artists"
                className="px-5 py-2.5 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white transition-colors"
              >
                Browse 450+ Master Lineages ↗
              </Link>
              <Link
                to="/archive"
                className="text-[#252421] dark:text-[#F2EEE7] hover:text-[#A9232D] transition-colors"
              >
                Listen to Historic 78 RPM Transfers →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Acoustic Intelligence Studio Banner (Matching Reference Image 2: "Listen closer.") */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="p-8 md:p-12 rounded-xl bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A9232D]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#77736D]">
                COMPUTATIONAL MUSICOLOGY ENGINE
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#252421] dark:text-[#F2EEE7]">
              Listen closer. Identify pitch contours and raga grammar in real time.
            </h2>
            <p className="text-xs md:text-sm text-[#77736D] leading-relaxed max-w-2xl">
              Upload an audio passage, hum a melody, or stream from a concert. Our acoustic analysis identifies tonic (Sa) alignment, Pakad melodic movements, and predicts likely raga candidates with probabilistic confidence.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <div className="p-3 rounded bg-[#F5F2EC] dark:bg-[#171716] border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs text-[#77736D] flex items-center gap-3">
              <Mic size={18} className="text-[#A9232D]" />
              <div>
                <span className="font-semibold text-[#252421] dark:text-[#F2EEE7] block">Microphone or Audio File</span>
                <span className="text-[10px]">WAV, FLAC, MP3 supported</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/detect')}
              className="px-6 py-3.5 rounded bg-[#A9232D] text-white text-xs font-semibold hover:bg-[#8D1C24] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Open AI Detection Studio</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

        {/* Archival Partners Citation */}
        <div className="mt-8 pt-6 border-t border-[#DCD6CC] dark:border-[#2E2D2A] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#77736D]">
          <p>
            <strong className="text-[#252421] dark:text-[#F2EEE7]">ARCHIVAL & ACADEMIC PARTNERS:</strong> CompMusic MTG (Universitat Pompeu Fabra) · ITC Sangeet Research Academy · Saraga Open Music Corpus
          </p>
          <span className="text-[10px] font-mono">
            Open Research License · CC BY-NC 4.0
          </span>
        </div>
      </section>

    </div>
  );
};
