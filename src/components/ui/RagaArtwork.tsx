import React from 'react';
import { Raga } from '../../lib/ragaData';

interface RagaArtworkProps {
  raga?: Raga | null;
  type?: 'yaman-archival-photo' | 'darbari-oil-frame' | 'megh-monsoon' | 'ahir-bhairav-watercolor' | 'malkauns-charcoal' | 'bhimpalasi-ochre' | 'generic';
  className?: string;
  showFramed?: boolean;
  archivalBadge?: string;
}

export const RagaArtwork: React.FC<RagaArtworkProps> = ({
  raga,
  type,
  className = '',
  showFramed = false,
  archivalBadge
}) => {
  const selectedType = type || (raga ? getArtworkTypeForRaga(raga.id) : 'yaman-archival-photo');

  const content = (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {renderArtworkContent(selectedType, raga)}
      
      {/* Archival Ref Tag if requested */}
      {archivalBadge && (
        <div className="absolute bottom-4 right-4 bg-[#FAF6F0]/95 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#D8C7B0] text-[11px] font-mono tracking-wider text-[#3D2E24] shadow-sm">
          <span className="text-[9px] uppercase tracking-widest text-[#8A7564] block font-sans">Archival Ref:</span>
          <span className="font-bold">{archivalBadge}</span>
        </div>
      )}
    </div>
  );

  if (showFramed) {
    return (
      <div className="relative p-2 md:p-3 bg-[#EAE2D5] rounded-xl shadow-lg border border-[#D5C6B1]">
        <div className="rounded-lg overflow-hidden border border-[#C5B39B] shadow-inner bg-[#FAF7F2]">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

function getArtworkTypeForRaga(ragaId: string): string {
  switch (ragaId) {
    case 'yaman':
      return 'yaman-archival-photo';
    case 'darbari':
      return 'darbari-oil-frame';
    case 'megh':
      return 'megh-monsoon';
    case 'ahir-bhairav':
      return 'ahir-bhairav-watercolor';
    case 'malkauns':
      return 'malkauns-charcoal';
    case 'bhimpalasi':
      return 'bhimpalasi-ochre';
    default:
      return 'generic';
  }
}

function renderArtworkContent(type: string, raga?: Raga | null) {
  switch (type) {
    case 'yaman-archival-photo':
      // Archival vintage sepia photo of maestro with sitar in classical haveli archway (Matching image 2 & 3 in reference)
      return (
        <div className="relative w-full h-full min-h-[360px] bg-[#E8DEC8] flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 600 450" className="w-full h-full object-cover">
            <defs>
              <filter id="sepia-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0.12 0" />
                <feBlend mode="multiply" in="SourceGraphic" in2="noise" />
              </filter>
              <linearGradient id="haveli-arch" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A382A" />
                <stop offset="50%" stopColor="#2D2118" />
                <stop offset="100%" stopColor="#1C140E" />
              </linearGradient>
              <radialGradient id="arch-vignette" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#EDE0CC" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#CDBDA5" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#352417" stopOpacity="0.95" />
              </radialGradient>
            </defs>

            {/* Background Haveli Pillar & Arch */}
            <rect width="600" height="450" fill="url(#arch-vignette)" />
            
            {/* Mughal Carved Arch Pillars */}
            <path d="M40 0 L40 450 M70 0 L70 450 M530 0 L530 450 M560 0 L560 450" stroke="#7A6553" strokeWidth="2" opacity="0.3" />
            <path d="M40 180 Q300 -20 560 180" fill="none" stroke="#685241" strokeWidth="8" opacity="0.4" />
            <path d="M60 190 Q300 20 540 190" fill="none" stroke="#8A7360" strokeWidth="2" opacity="0.5" />
            
            {/* Courtyard Floor Rug Texture */}
            <polygon points="0,340 600,340 600,450 0,450" fill="#3D2D20" opacity="0.85" />
            <line x1="0" y1="340" x2="600" y2="340" stroke="#8E7862" strokeWidth="3" opacity="0.6" />
            
            {/* Sitarist Silhouette & Detailed Line Art */}
            <g transform="translate(140, 70)" opacity="0.95">
              {/* Turban & Head */}
              <ellipse cx="160" cy="110" rx="36" ry="32" fill="#E6D7C3" />
              <path d="M130 95 C140 70, 190 70, 200 95 C205 115, 185 130, 155 130 C135 130, 125 115, 130 95 Z" fill="#D3C1A9" stroke="#3A281B" strokeWidth="1.5" />
              <path d="M140 100 Q165 85 190 100" stroke="#4A3425" strokeWidth="2" fill="none" />
              {/* Face & Beard */}
              <circle cx="165" cy="120" r="18" fill="#D9C7B0" />
              <path d="M152 125 Q165 148 178 125 Z" fill="#8C7D6E" />
              {/* Shawl & Kurta */}
              <path d="M100 160 C120 135, 210 135, 230 160 L260 260 L70 260 Z" fill="#C9B89E" stroke="#3A281B" strokeWidth="1.5" />
              <path d="M125 155 Q165 195 205 155" stroke="#685340" strokeWidth="2" fill="none" />
              {/* Seated Crossed Legs */}
              <ellipse cx="165" cy="270" rx="120" ry="30" fill="#B3A086" stroke="#3A281B" strokeWidth="1.5" />

              {/* Sitar Instrument */}
              {/* Tumba (Gourd) */}
              <circle cx="105" cy="235" r="54" fill="#66462C" stroke="#2B1A0F" strokeWidth="3" />
              <ellipse cx="100" cy="230" rx="46" ry="46" fill="#845C3B" />
              <path d="M70 230 Q105 270 140 230" stroke="#4A301E" strokeWidth="3" fill="none" opacity="0.6" />
              {/* Tabli (Wooden soundboard face) */}
              <circle cx="105" cy="235" r="42" fill="#9E734D" stroke="#3A2213" strokeWidth="2" />
              <circle cx="105" cy="235" r="30" fill="#B88A5E" opacity="0.8" />
              
              {/* Dandi (Sitar Neck / Fretboard) */}
              <polygon points="105,210 320,60 334,76 119,226" fill="#543720" stroke="#26160A" strokeWidth="2" />
              
              {/* Metallic Frets (Pardas) */}
              {[
                { x1: 130, y1: 198, x2: 142, y2: 210 },
                { x1: 155, y1: 180, x2: 167, y2: 192 },
                { x1: 180, y1: 162, x2: 192, y2: 174 },
                { x1: 205, y1: 144, x2: 217, y2: 156 },
                { x1: 230, y1: 126, x2: 242, y2: 138 },
                { x1: 255, y1: 108, x2: 267, y2: 120 },
                { x1: 280, y1: 90, x2: 292, y2: 102 },
                { x1: 305, y1: 72, x2: 317, y2: 84 }
              ].map((fret, i) => (
                <line key={i} x1={fret.x1} y1={fret.y1} x2={fret.x2} y2={fret.y2} stroke="#C4A875" strokeWidth="2" />
              ))}

              {/* Sitar Pegbox & Upper Tumba */}
              <circle cx="320" cy="55" r="18" fill="#543720" stroke="#26160A" strokeWidth="2" />
              {/* Pegs */}
              <line x1="315" y1="42" x2="305" y2="30" stroke="#3A2213" strokeWidth="3" />
              <line x1="330" y1="48" x2="340" y2="36" stroke="#3A2213" strokeWidth="3" />
              <line x1="325" y1="65" x2="338" y2="72" stroke="#3A2213" strokeWidth="3" />

              {/* Steel Strings */}
              <line x1="105" y1="235" x2="325" y2="65" stroke="#EAE5DC" strokeWidth="1" opacity="0.9" />
              <line x1="108" y1="237" x2="327" y2="67" stroke="#EAE5DC" strokeWidth="0.8" opacity="0.8" />
              <line x1="111" y1="239" x2="329" y2="69" stroke="#EAE5DC" strokeWidth="0.8" opacity="0.7" />

              {/* Hands on Sitar */}
              <ellipse cx="145" cy="205" rx="14" ry="9" fill="#D3C0A7" stroke="#3A281B" strokeWidth="1.2" />
              <ellipse cx="235" cy="135" rx="12" ry="8" fill="#D3C0A7" stroke="#3A281B" strokeWidth="1.2" />
            </g>

            {/* Brass Water Lota Vessel on Carpet */}
            <ellipse cx="130" cy="385" rx="18" ry="12" fill="#8C6E42" stroke="#4A341B" strokeWidth="1.5" />
            <path d="M120 375 L140 375 L135 365 L125 365 Z" fill="#A88755" />

            {/* Vintage Sepia Wash Overlay */}
            <rect width="600" height="450" fill="#947452" opacity="0.1" style={{ mixBlendMode: 'color' }} />
            <rect width="600" height="450" stroke="#5A422F" strokeWidth="1" fill="none" opacity="0.4" />
          </svg>
        </div>
      );

    case 'darbari-oil-frame':
      // Rich impasto oil painting on canvas with veena & swirling royal night pigments (Matching image 6 & 9)
      return (
        <div className="relative w-full h-full min-h-[320px] bg-[#EFE9DF] flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 400" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="oil-swirl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#251E28" />
                <stop offset="35%" stopColor="#4A3546" />
                <stop offset="70%" stopColor="#9C7348" />
                <stop offset="100%" stopColor="#C9A364" />
              </linearGradient>
              <radialGradient id="canvas-glow" cx="40%" cy="45%" r="50%">
                <stop offset="0%" stopColor="#DBC7A6" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#8A644D" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#241B22" stopOpacity="0.95" />
              </radialGradient>
            </defs>

            {/* Canvas Base Texture */}
            <rect width="500" height="400" fill="#FAF6EE" />
            
            {/* Swirling Impasto Oil Strokes */}
            <path d="M-20 200 C80 80, 240 300, 380 140 C440 80, 520 120, 520 240 C520 360, 320 380, 180 340 Z" fill="url(#canvas-glow)" opacity="0.85" />
            <path d="M40 320 C140 180, 300 240, 440 120 C380 280, 220 380, 60 360 Z" fill="url(#oil-swirl)" opacity="0.7" />
            
            {/* Abstract Rudra Veena / Sitar Twin Gourds (Tumbas) */}
            <g transform="translate(110, 60)">
              {/* Lower Tumba */}
              <circle cx="80" cy="180" r="50" fill="#754728" stroke="#3D200E" strokeWidth="2.5" />
              <circle cx="76" cy="176" r="42" fill="#966139" opacity="0.9" />
              <circle cx="68" cy="168" r="28" fill="#C48E5C" opacity="0.6" />
              
              {/* Upper Tumba */}
              <circle cx="210" cy="80" r="38" fill="#754728" stroke="#3D200E" strokeWidth="2.5" />
              <circle cx="206" cy="76" r="32" fill="#966139" opacity="0.9" />
              
              {/* Central Hollow Tube (Dandi) */}
              <polygon points="60,200 230,50 244,66 74,216" fill="#422512" stroke="#1F0E05" strokeWidth="2" />
              
              {/* Frets & Strings */}
              <line x1="90" y1="170" x2="102" y2="182" stroke="#D8BD7D" strokeWidth="3" />
              <line x1="120" y1="140" x2="132" y2="152" stroke="#D8BD7D" strokeWidth="3" />
              <line x1="150" y1="110" x2="162" y2="122" stroke="#D8BD7D" strokeWidth="3" />
              <line x1="180" y1="80" x2="192" y2="92" stroke="#D8BD7D" strokeWidth="3" />
              
              <line x1="60" y1="200" x2="235" y2="55" stroke="#FFF7EB" strokeWidth="1.2" />
              <line x1="65" y1="205" x2="240" y2="60" stroke="#FFF7EB" strokeWidth="1.2" />
            </g>

            {/* Handwritten Devanagari Sanskrit Swara Script Accents */}
            <text x="70" y="90" fill="#70523C" fontFamily="serif" fontSize="13" fontStyle="italic" opacity="0.7">
              तदन तदन ना धी ना
            </text>
            <text x="60" y="120" fill="#70523C" fontFamily="serif" fontSize="11" opacity="0.6">
              " निर्मल मे जगाव "
            </text>
            <text x="310" y="320" fill="#8C6648" fontFamily="serif" fontSize="12" fontStyle="italic" opacity="0.65">
              सा रे ग म प ध नि सां
            </text>
            
            {/* Signature on bottom right */}
            <text x="380" y="365" fill="#543A26" fontFamily="serif" fontSize="12" fontStyle="italic" opacity="0.8">
              R. Varma
            </text>

            {/* Gold Leaf Splatters */}
            {[
              { cx: 120, cy: 90, r: 3 },
              { cx: 280, cy: 110, r: 4 },
              { cx: 340, cy: 220, r: 3.5 },
              { cx: 190, cy: 280, r: 2.5 },
              { cx: 410, cy: 160, r: 3 }
            ].map((dot, i) => (
              <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill="#D4AF37" opacity="0.85" />
            ))}
          </svg>
        </div>
      );

    case 'megh-monsoon':
      // Monsoon storm clouds, lightning streaks, rainfall wash, and sitar sketch (Matching image 4 & 5)
      return (
        <div className="relative w-full h-full min-h-[220px] bg-[#DCE4EE] flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 600 280" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="monsoon-sky" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7E96B3" />
                <stop offset="40%" stopColor="#475C75" />
                <stop offset="80%" stopColor="#2A384A" />
                <stop offset="100%" stopColor="#1E2836" />
              </linearGradient>
              <radialGradient id="storm-cloud" cx="45%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#C4D5E8" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#6C839F" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#253549" stopOpacity="0.95" />
              </radialGradient>
            </defs>

            {/* Paper Texture Background */}
            <rect width="600" height="280" fill="#FAF6EE" />
            
            {/* Watercolor Raincloud Wash */}
            <path d="M30 60 C120 -10, 280 10, 360 40 C440 20, 560 50, 580 140 C600 230, 480 260, 340 250 C200 260, 60 230, 20 160 Z" fill="url(#storm-cloud)" opacity="0.9" />
            <path d="M90 120 C180 80, 320 90, 420 110 C500 130, 520 200, 450 230 C350 250, 180 240, 100 200 Z" fill="url(#monsoon-sky)" opacity="0.6" />

            {/* Lightning Streaks */}
            <path d="M220 30 L205 80 L230 95 L210 160" stroke="#FFF7D6" strokeWidth="2.5" fill="none" opacity="0.9" />
            <path d="M205 80 L180 110" stroke="#FFF7D6" strokeWidth="1.2" fill="none" opacity="0.7" />
            <path d="M380 40 L365 85 L385 100 L370 150" stroke="#FFF7D6" strokeWidth="2" fill="none" opacity="0.85" />

            {/* Raindrops / Downpour streaks */}
            {[
              { x: 120, y: 150 }, { x: 160, y: 190 }, { x: 250, y: 180 }, { x: 320, y: 200 },
              { x: 410, y: 170 }, { x: 480, y: 190 }, { x: 530, y: 160 }
            ].map((p, i) => (
              <line key={i} x1={p.x} y1={p.y} x2={p.x - 15} y2={p.y + 40} stroke="#ADC1D8" strokeWidth="1.5" strokeDasharray="4,6" opacity="0.6" />
            ))}

            {/* Surbahar / Sitar Symmetrical Outline in Storm */}
            <g transform="translate(380, 20)" opacity="0.75">
              <circle cx="120" cy="180" r="45" fill="#2E3C4E" stroke="#1A2430" strokeWidth="2" />
              <polygon points="120,160 30,30 40,20 130,150" fill="#253140" stroke="#151E28" strokeWidth="2" />
              <circle cx="30" cy="20" r="14" fill="#2E3C4E" />
            </g>

            {/* Title Calligraphy Watermark */}
            <text x="80" y="70" fill="#536B88" fontFamily="serif" fontSize="18" fontStyle="italic" opacity="0.5">
              मेघ मल्हार
            </text>
          </svg>
        </div>
      );

    case 'ahir-bhairav-watercolor':
      // Morning golden sunrise watercolor wash with sitar & temple tanpura (Matching image 4 & 5)
      return (
        <div className="relative w-full h-full min-h-[320px] bg-[#F7EFE3] flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 420" className="w-full h-full object-cover">
            <defs>
              <radialGradient id="morning-sun-glow" cx="40%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#F5D7A1" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#DFAD6D" stopOpacity="0.85" />
                <stop offset="75%" stopColor="#A86D3B" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#4A301D" stopOpacity="0.85" />
              </radialGradient>
              <linearGradient id="warm-wash" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EED9BA" />
                <stop offset="60%" stopColor="#C9945F" />
                <stop offset="100%" stopColor="#694121" />
              </linearGradient>
            </defs>

            {/* Textured Canvas Base */}
            <rect width="500" height="420" fill="#FAF6EE" />
            
            {/* Flowing Morning Watercolor Washes */}
            <path d="M-10 140 C80 40, 260 20, 380 90 C460 140, 520 220, 480 320 C420 400, 260 420, 140 380 C40 340, -20 260, -10 140 Z" fill="url(#morning-sun-glow)" opacity="0.9" />
            <path d="M40 220 C120 150, 280 180, 390 140 C440 240, 340 360, 180 370 Z" fill="url(#warm-wash)" opacity="0.6" />

            {/* Sitar & Tanpura Outline Sketch */}
            <g transform="translate(100, 80)">
              {/* Main Sitar Body */}
              <circle cx="150" cy="200" r="56" fill="#8C5C33" stroke="#472A12" strokeWidth="2" opacity="0.9" />
              <ellipse cx="145" cy="195" rx="46" ry="46" fill="#AD7949" opacity="0.8" />
              
              {/* Tanpura neck reaching across */}
              <polygon points="140,170 320,30 332,44 152,184" fill="#5E381A" stroke="#2B1607" strokeWidth="2" />
              
              {/* Soundboard decoration */}
              <circle cx="150" cy="200" r="32" fill="#D6A56E" opacity="0.8" />
              <circle cx="150" cy="200" r="16" fill="#915B29" opacity="0.9" />

              {/* Sitar Pegs & Head */}
              <circle cx="325" cy="25" r="16" fill="#5E381A" />
              <line x1="315" y1="12" x2="305" y2="2" stroke="#3A200C" strokeWidth="2.5" />
              <line x1="335" y1="18" x2="345" y2="8" stroke="#3A200C" strokeWidth="2.5" />

              {/* Strings */}
              <line x1="150" y1="200" x2="325" y2="35" stroke="#FFF7E6" strokeWidth="1.2" />
              <line x1="153" y1="203" x2="328" y2="38" stroke="#FFF7E6" strokeWidth="0.8" />
            </g>

            {/* Sanskrit Shloka Calligraphy */}
            <text x="60" y="80" fill="#755030" fontFamily="serif" fontSize="13" fontStyle="italic" opacity="0.6">
              प्रातःस्मरणम् • अहीर भैरव
            </text>
            <text x="60" y="110" fill="#8F6743" fontFamily="serif" fontSize="10" opacity="0.5">
              सा रे ग म प ध नि सां
            </text>

            {/* Gold Dust Shimmer */}
            {[
              { cx: 80, cy: 130 }, { cx: 200, cy: 80 }, { cx: 330, cy: 110 }, { cx: 380, cy: 260 }, { cx: 160, cy: 340 }
            ].map((p, i) => (
              <circle key={i} cx={p.cx} cy={p.cy} r={3} fill="#E5B942" opacity="0.8" />
            ))}
          </svg>
        </div>
      );

    case 'malkauns-charcoal':
      // Deep midnight indigo and charcoal sketch for Malkauns
      return (
        <div className="relative w-full h-full min-h-[220px] bg-[#E5E9F0] flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 300" className="w-full h-full object-cover">
            <defs>
              <radialGradient id="midnight-indigo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#445577" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#253248" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#141C2A" stopOpacity="0.98" />
              </radialGradient>
            </defs>
            <rect width="500" height="300" fill="#FAF7F2" />
            <path d="M20 50 C140 10, 360 20, 460 70 C500 130, 480 240, 380 270 C240 290, 80 260, 30 200 Z" fill="url(#midnight-indigo)" opacity="0.8" />
            
            {/* Charcoal Veena Silhouette */}
            <g transform="translate(140, 50)" opacity="0.85">
              <circle cx="110" cy="120" r="42" fill="#1C2433" stroke="#0E131C" strokeWidth="2" />
              <polygon points="110,100 240,20 248,32 118,112" fill="#161D29" />
              <circle cx="244" cy="24" r="14" fill="#1C2433" />
              <line x1="110" y1="120" x2="244" y2="24" stroke="#CAD8EC" strokeWidth="1" opacity="0.7" />
            </g>

            {/* Moon crescent */}
            <path d="M400 60 A 24 24 0 0 0 420 90 A 20 20 0 0 1 400 60 Z" fill="#E8F0FE" opacity="0.8" />

            <text x="50" y="60" fill="#4B6082" fontFamily="serif" fontSize="12" fontStyle="italic" opacity="0.6">
              मध्यरात्रि राग • मालकौंस
            </text>
          </svg>
        </div>
      );

    case 'bhimpalasi-ochre':
      // Warm terracotta & sepia watercolor for Bhimpalasi
      return (
        <div className="relative w-full h-full min-h-[220px] bg-[#F7EFE4] flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 300" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="terracotta-wash" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8CDB2" />
                <stop offset="50%" stopColor="#C48E66" />
                <stop offset="100%" stopColor="#784928" />
              </linearGradient>
            </defs>
            <rect width="500" height="300" fill="#FAF6EE" />
            <path d="M30 40 C160 -10, 380 20, 470 80 C510 160, 460 250, 360 270 C220 280, 80 260, 20 180 Z" fill="url(#terracotta-wash)" opacity="0.8" />
            
            {/* Tanpura & Sargam Calligraphy */}
            <g transform="translate(120, 50)" opacity="0.8">
              <circle cx="130" cy="130" r="46" fill="#8C522C" stroke="#47240E" strokeWidth="2" />
              <polygon points="130,105 260,15 270,25 140,115" fill="#5C3114" />
              <line x1="130" y1="130" x2="265" y2="20" stroke="#FFF2E0" strokeWidth="1" />
            </g>

            <text x="60" y="60" fill="#855431" fontFamily="serif" fontSize="12" fontStyle="italic" opacity="0.7">
              अपराह्न राग • भीमपलासी
            </text>
          </svg>
        </div>
      );

    default:
      return (
        <div className="relative w-full h-full min-h-[260px] bg-[#F4EFE6] flex items-center justify-center p-6 text-center">
          <div className="space-y-2">
            <h4 className="text-2xl font-bold text-[#252421] dark:text-[#F2EEE7]">{raga?.name || 'Classical Raga'}</h4>
            <p className="text-xs text-[#77736D] italic">{raga?.artMedium || 'Indian Heritage Art & Music'}</p>
          </div>
        </div>
      );
  }
}
