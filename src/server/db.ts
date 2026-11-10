import fs from 'fs';
import path from 'path';

export type MusicalTradition = 'Hindustani';

export interface Recording {
  id: string;
  title: string;
  artist: string;
  gharana?: string;
  instrumentOrStyle: string;
  year: string;
  location?: string;
  audioDuration?: string;
  format?: '78 RPM Shellac' | 'AIR Master Tape' | 'Acetate Master Tape' | 'Live Reel Archive';
  tapeId?: string;
  archiveRef?: string;
  sampleAudio?: string;
}

export interface KinshipRaga {
  id: string;
  name: string;
  relationship: string;
  swaras: string;
  keyDifference: string;
  tempo: string;
}

export interface Composition {
  id: string;
  title: string;
  ragaId: string;
  ragaName: string;
  tradition: MusicalTradition;
  type: 'Khayal Bandish' | 'Tarana' | 'Dhrupad Pada' | 'Dhamar' | 'Thumri';
  tala: string;
  composer: string;
  language: string;
  sthai: string;
  antara?: string;
  notation: Array<{
    matra: number;
    bol?: string;
    swara: string;
    octave?: 'mandra' | 'madhya' | 'tar';
  }>;
  audioDuration?: string;
}

export interface Raga {
  id: string;
  name: string;
  devanagari?: string;
  tradition: MusicalTradition;
  thaat: 'Bilawal' | 'Kalyan' | 'Khamaj' | 'Kafi' | 'Asavari' | 'Bhairav' | 'Bhairavi' | 'Todi' | 'Poorvi' | 'Marwa';
  arohana: string;
  avarohana: string;
  pakad: string;
  chalan?: string;
  vadi: string;
  samvadi: string;
  nyasa?: string;
  time: string;
  praharNumber?: number;
  praharName?: string;
  timeCategory: 'Morning' | 'Afternoon' | 'Evening' | 'Midnight' | 'Late Night' | 'Monsoon' | 'Universal';
  season?: string;
  mood: string[];
  primaryRasa: string;
  secondaryRasa?: string;
  jati: string;
  centsDeviation?: {
    swara: string;
    cents: number;
    description: string;
  };
  andolanDetails?: {
    swara: string;
    range: string;
    period: string;
    quote: string;
    scholar: string;
  };
  acousticCurve?: number[];
  description: string;
  story: string;
  historicalContext: string;
  archivalRef: string;
  artMedium: string;
  artPalette: {
    primary: string;
    secondary: string;
    accent: string;
    bgGradient: string;
  };
  swaraList: string[];
  recordings: Recording[];
  compositions?: string[];
  kinship?: KinshipRaga[];
}

export interface Artist {
  id: string;
  name: string;
  devanagari?: string;
  years: string;
  role: string;
  gharana: string;
  tradition: MusicalTradition;
  biography: string;
  keyRagas: string[];
  signatureStyle: string;
  portraitArtwork?: string;
  recordingsCount: number;
  lineageGeneration?: number;
  mentor?: string;
  disciples?: string[];
}

export interface Taal {
  id: string;
  name: string;
  beats: number;
  vibhaags: number;
  sam: number;
  khali: number | number[];
  vibhaag_starts: number[];
  bols: string;
  bolList: string[];
  tempo_range: {
    vilambit: string;
    madhya: string;
    drut: string;
  };
  tradition: MusicalTradition;
  description: string;
}

export interface Instrument {
  id: string;
  name: string;
  category: 'Stringed (Plucked)' | 'Stringed (Bowed)' | 'Wind (Aerophone)' | 'Percussion (Membranophone)' | 'Harmonium / Drone';
  tradition: MusicalTradition;
  construction: string;
  tuningStandard: string;
  prominentExponents: string[];
  historicalEra: string;
  description: string;
}

export interface RiyazSession {
  id: string;
  date: string;
  timestamp: number;
  raga: string;
  minutes: number;
  focusArea: 'Swara Sadhana' | 'Alankar & Speed' | 'Bandish & Tala' | 'Meend & Microtones' | 'Alap & Improvisation';
  notes: string;
  tonic: string;
}

export interface CustomComposition {
  id: string;
  title: string;
  ragaId: string;
  ragaName: string;
  taal: string;
  tempoBpm: number;
  notes: Array<{
    swara: string;
    matra: number;
    duration: number; // in beats
    lyrics?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface AppDatabase {
  ragas: Raga[];
  artists: Artist[];
  compositions: Composition[];
  taals: Taal[];
  instruments: Instrument[];
  riyazSessions: RiyazSession[];
  bookmarks: string[]; // IDs of saved ragas or recordings
  customCompositions: CustomComposition[];
}

// Data Directory and File
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

// Initial Verified Seed Data
const INITIAL_DATABASE: AppDatabase = {
  ragas: [
    {
      id: 'yaman',
      name: 'Raag Yaman',
      devanagari: 'राग यमन',
      tradition: 'Hindustani',
      thaat: 'Kalyan',
      arohana: "Ṇ · R · G · M' · D · N · Ṡ",
      avarohana: "Ṡ · N · D · P · M' · G · R · S",
      pakad: "Ṇ R G , M' D N Ṡ , R' N D P , M' G R S",
      chalan: "Ṇ R G, R G M' P, M' D N Ṡ, Ṡ N D P, M' G R, G R Ṇ S",
      vadi: 'Gandhar (G)',
      samvadi: 'Nishad (N)',
      nyasa: 'Gandhar (G), Nishad (N), Pancham (P)',
      time: 'Evening Sandhiprakash (18:00 - 21:00)',
      praharNumber: 4,
      praharName: 'Sandhiprakash (Dusk Watch)',
      timeCategory: 'Evening',
      mood: ['Shanti', 'Shringara', 'Bhakti', 'Tranquility'],
      primaryRasa: 'Shanti & Shringara',
      secondaryRasa: 'Pious Devotion',
      jati: 'Sampoorna (Vakra Arohana)',
      centsDeviation: {
        swara: "Teevra Madhyam (M')",
        cents: 590,
        description: '+12 cents sharpened tritone elevating twilight rest'
      },
      acousticCurve: [0, 40, 110, 220, 380, 520, 600, 530, 390, 240, 120, 30, 0],
      description: 'The sovereign gateway to North Indian classical music. Yaman paints the sacred stillness of twilight with pure notes and a luminous sharp fourth (Teevra Madhyam).',
      story: 'Attributed to Amir Khusrau in the 13th century as a confluence of Persian Aiman and ancient Indian Kalyan traditions. It demands patience and unhurried phrase evolution.',
      historicalContext: 'Systematized in Pandit Vishnu Narayan Bhatkhande’s Kalyan Thaat as the foundational pedagogical framework for student initiation.',
      archivalRef: '#RL-YM-0042',
      artMedium: 'Hand-ground Pigment & 24k Gold Dust on Khadi Rag Paper',
      artPalette: {
        primary: '#C49746',
        secondary: '#5C4A32',
        accent: '#A9232D',
        bgGradient: 'linear-gradient(135deg, #F9F6F0 0%, #EBDBC1 50%, #C9B28F 100%)'
      },
      swaraList: ['N.', 'R', 'G', "M'", 'P', 'D', 'N', "S'"],
      compositions: ['comp-ym-01'],
      recordings: [
        {
          id: 'rec-ym-01',
          title: 'Yaman Vilambit Khayal: "Piya Ki Nazariya"',
          artist: 'Vidushi Kishori Amonkar',
          gharana: 'Jaipur-Atrauli Gharana',
          instrumentOrStyle: 'Vocal Khayal in Vilambit Ektaal',
          year: '1976 Pune Live Recording',
          location: 'Pune Mehfil Archive',
          audioDuration: '32:15',
          format: 'AIR Master Tape',
          tapeId: 'AIR-TAPE #KA-76'
        },
        {
          id: 'rec-ym-02',
          title: 'Sitar Alap & Gat in Teentaal',
          artist: 'Ustad Vilayat Khan',
          gharana: 'Imdadkhani Gharana',
          instrumentOrStyle: 'Sitar Solo (Gayaki Ang)',
          year: '1964 Archival Master',
          location: 'Calcutta Studio',
          audioDuration: '38:15',
          format: 'Acetate Master Tape',
          tapeId: 'MASTER-REEL #VK-64'
        }
      ],
      kinship: [
        {
          id: 'shuddha-kalyan',
          name: 'Raag Shuddha Kalyan',
          relationship: 'Pentatonic-Heptatonic Twin',
          swaras: "S · R · G · P · D · Ṡ / Ṡ · N · D · P · M' · G · R · S",
          keyDifference: 'Omits Madhyam and Nishad in ascent (Aroha); descends in Yaman heptatonic form.',
          tempo: 'Vilambit & Madhya'
        },
        {
          id: 'bhoopali',
          name: 'Raag Bhoopali',
          relationship: 'Audav Kalyan Sibling',
          swaras: 'S · R · G · P · D · Ṡ',
          keyDifference: 'Strictly pentatonic in both ascent and descent with Gandhar as Vadi.',
          tempo: 'All Layas'
        }
      ]
    },
    {
      id: 'darbari',
      name: 'Darbari Kanada',
      devanagari: 'दरबारी कान्हड़ा',
      tradition: 'Hindustani',
      thaat: 'Asavari',
      arohana: "S · R · (g)M · P · d · n · Ṡ",
      avarohana: "Ṡ · d · n · P , M · P · g ~ m R , S",
      pakad: "S , d. n. P. , M. P. g ~ m R , S",
      chalan: "S , d. n. P. , M. P. g ~ m R , S",
      vadi: 'Komal Gandhar (g)',
      samvadi: 'Komal Dhaivat (d)',
      nyasa: 'Pancham (P) & Rishabh (R)',
      time: 'Midnight · 00:00 (Prahar 5)',
      praharNumber: 5,
      praharName: 'Midnight Prahar (21:00 - 00:00)',
      timeCategory: 'Midnight',
      mood: ['Gambhir', 'Shanta', 'Majestic', 'Karuna'],
      primaryRasa: 'Gambhir & Majesty',
      secondaryRasa: 'Introspective Royalty',
      jati: 'Asavari Thaat · Vakra Sampoorna',
      centsDeviation: {
        swara: 'Komal Gandhar (g)',
        cents: 290,
        description: '-14 cents below equal-tempered minor third (Heavy Andolan)'
      },
      andolanDetails: {
        swara: 'Komal Gandhar (g)',
        range: '280c – 310c',
        period: '~1.05 seconds',
        quote: 'The authenticity of Darbari Kanada relies strictly on microtonal andolan in the mandra saptak (lower octave), distinguishing it decisively from Adana and Jaunpuri.',
        scholar: 'Prof. B.C. Deva, Indian Musicology Corpus'
      },
      acousticCurve: [10, 24, 48, 85, 120, 160, 210, 280, 310, 290, 260, 200, 140, 70, 20],
      description: 'Attributed to Miyan Tansen in the royal court of Emperor Akbar. A raga of majestic gravitas, royal introspection, and profound emotional weight.',
      story: 'Created to soothe Emperor Akbar’s nocturnal restlessness in the quiet corridors of Fatehpur Sikri.',
      historicalContext: 'A pinnacle of Khayal and Dhrupad performance, requiring immense breath control for sustained mandra saptak andolan micro-oscillations.',
      archivalRef: '#RL-DK-1556',
      artMedium: 'Oil on Raw Linen · Acquisition No. 2024.11',
      artPalette: {
        primary: '#2B2129',
        secondary: '#5E4856',
        accent: '#B08848',
        bgGradient: 'linear-gradient(135deg, #EAE5E8 0%, #CDC2C9 50%, #9B8996 100%)'
      },
      swaraList: ['S', 'R', 'g', 'M', 'P', 'd', 'n'],
      compositions: ['comp-dk-01'],
      recordings: [
        {
          id: 'rec-dk-01',
          title: 'Eri Aali Piya Bina (Vilambit Jhoomra)',
          artist: 'Ustad Amir Khan',
          gharana: 'Indore Gharana',
          instrumentOrStyle: 'Vocal Khayal',
          year: '1968 Calcutta Conference',
          audioDuration: '28:44',
          format: 'AIR Master Tape'
        }
      ],
      kinship: [
        {
          id: 'adana',
          name: 'Raag Adana',
          relationship: 'Counterpart · Uttaranga Pradhan',
          swaras: 'S · R · M · P · d · n · Ṡ',
          keyDifference: 'Eliminates heavy lower-octave oscillation; darts rapidly into the tar saptak.',
          tempo: 'Drut · Vibrant'
        }
      ]
    },
    {
      id: 'megh',
      name: 'Raag Megh',
      devanagari: 'राग मेघ',
      tradition: 'Hindustani',
      thaat: 'Kafi',
      arohana: 'S · R · M · P · n · Ṡ',
      avarohana: 'Ṡ · n · P · M · R · S',
      pakad: 'R M P n P , M R n. S',
      vadi: 'Pancham (P)',
      samvadi: 'Shadja (S)',
      nyasa: 'R, P, M',
      time: 'Monsoon Season (Any Time) or Midnight',
      timeCategory: 'Monsoon',
      season: 'Varsha Ritu (Rain)',
      mood: ['Veera', 'Gambhir', 'Shanta', 'Rain Invocation'],
      primaryRasa: 'Rain & Longing',
      jati: 'Audav - Audav (Pentatonic)',
      description: 'Ancient pentatonic cloud-summoner. Bypasses Gandhar and Dhaivat entirely, echoing the thunderous resonance of monsoon skies.',
      story: 'Legend records that singing Megh with absolute shruti fidelity summons rain clouds over parched earth.',
      historicalContext: 'Categorized among the six original purusha ragas in ancient treatises such as Sangeeta Makaranda.',
      archivalRef: '#RL-MG-0005',
      artMedium: 'Ink Wash, Charcoal Dust & Natural Indigo on Textured Khadi Paper',
      artPalette: {
        primary: '#243342',
        secondary: '#586A7A',
        accent: '#C79A3B',
        bgGradient: 'linear-gradient(135deg, #ECEFF2 0%, #C7D1D9 50%, #8A9CA8 100%)'
      },
      swaraList: ['S', 'R', 'M', 'P', 'n'],
      recordings: [
        {
          id: 'rec-mg-01',
          title: 'Monsoon Dhrupad on Rudra Veena',
          artist: 'Ustad Zia Mohiuddin Dagar',
          instrumentOrStyle: 'Rudra Veena Solo',
          year: '1967 National Archive',
          audioDuration: '41:10',
          format: 'AIR Master Tape'
        }
      ]
    },
    {
      id: 'malkauns',
      name: 'Raag Malkauns',
      devanagari: 'राग मालकौंस',
      tradition: 'Hindustani',
      thaat: 'Bhairavi',
      arohana: 'S · g · M · d · n · Ṡ',
      avarohana: 'Ṡ · n · d · M · g · S',
      pakad: 'd. n. S M , g M d M g S',
      vadi: 'Madhyam (M)',
      samvadi: 'Shadja (S)',
      nyasa: 'M, g, d',
      time: 'Midnight (3rd Prahar of Night)',
      timeCategory: 'Midnight',
      mood: ['Veera', 'Gambhir', 'Shanta', 'Trance'],
      primaryRasa: 'Veera & Meditative',
      jati: 'Audav - Audav (Pentatonic)',
      description: 'One of the oldest ragas in the corpus. Entirely omits both Rishabh and Panchama, creating deep, austere silence and inward meditative focus.',
      story: 'Legend relates that Malkauns was conceived from the cosmic Tandava dance of Lord Shiva.',
      historicalContext: 'Mentioned in ancient Sanskrit treatises including the Sangita Ratnakara (13th century) and systematized by Pandit Bhatkhande under Bhairavi Thaat.',
      archivalRef: '#RL-MK-0004',
      artMedium: 'Charcoal, Indigo & Raw Umber Wash with Gold Speckles on Hand-pressed Paper',
      artPalette: {
        primary: '#30394F',
        secondary: '#5C6E8F',
        accent: '#D4AF37',
        bgGradient: 'linear-gradient(135deg, #EDEDF2 0%, #CCD0DB 50%, #8C96AB 100%)'
      },
      swaraList: ['S', 'g', 'M', 'd', 'n'],
      compositions: ['comp-mk-01'],
      recordings: [
        {
          id: 'rec-mk-01',
          title: 'Vilambit Khayal: "Pirat Lagayi"',
          artist: 'Pt. Bhimsen Joshi',
          gharana: 'Kirana Gharana',
          instrumentOrStyle: 'Vocal Khayal',
          year: '1971 Sawai Gandharva Festival',
          audioDuration: '34:20',
          format: 'Live Reel Archive'
        }
      ]
    },
    {
      id: 'ahir-bhairav',
      name: 'Raag Ahir Bhairav',
      devanagari: 'राग अहीर भैरव',
      tradition: 'Hindustani',
      thaat: 'Bhairav',
      arohana: 'S · r · G · M · P · D · n · Ṡ',
      avarohana: 'Ṡ · n · D · P · M · G · r · S',
      pakad: 'G M P D n D P , M G r S',
      vadi: 'Madhyam (M)',
      samvadi: 'Shadja (S)',
      nyasa: 'M, r, G',
      time: 'Early Dawn (Brahma Muhurta, 05:00 - 08:00)',
      timeCategory: 'Morning',
      mood: ['Shanta', 'Karuna', 'Bhakti', 'Awakening'],
      primaryRasa: 'Devotion & Dawn',
      jati: 'Sampoorna - Sampoorna',
      description: 'A serene synthesis of Bhairav in the poorvanga (S r G M) and Kafi in the uttaranga (P D n Ṡ). Evokes the holy stillness of dawn on sacred river ghats.',
      story: 'Originated from the pastoral Ahir community who sang folk melodies in Northern and Western India, later elevated into high classical khayal by Maihar and Gwalior masters.',
      historicalContext: 'A morning masterpiece that calms the human nervous system through gentle Komal Re to Sa resolutions.',
      archivalRef: '#RL-AB-0108',
      artMedium: 'Warm Watercolor Wash & Tanpura Outline on Natural Raw Canvas',
      artPalette: {
        primary: '#B6732B',
        secondary: '#E2BD8A',
        accent: '#8C2B22',
        bgGradient: 'linear-gradient(135deg, #FAF4EB 0%, #EFE1CF 50%, #D8BEA1 100%)'
      },
      swaraList: ['S', 'r', 'G', 'M', 'P', 'D', 'n'],
      recordings: [
        {
          id: 'rec-ab-01',
          title: 'Dawn Alap & Gat on Bansuri',
          artist: 'Pt. Hariprasad Chaurasia',
          gharana: 'Maihar Gharana',
          instrumentOrStyle: 'Bansuri (Bamboo Flute)',
          year: '1974 Varanasi Archive',
          audioDuration: '34:20',
          format: 'Live Reel Archive'
        }
      ]
    },
    {
      id: 'bhimpalasi',
      name: 'Raag Bhimpalasi',
      devanagari: 'राग भीमपलासी',
      tradition: 'Hindustani',
      thaat: 'Kafi',
      arohana: 'n. · S · g · M · P · n · Ṡ',
      avarohana: 'Ṡ · n · D · P · M · g · R · S',
      pakad: 'n. S M , M g P M g , R S',
      vadi: 'Madhyam (M)',
      samvadi: 'Shadja (S)',
      nyasa: 'M, P, g',
      time: 'Late Afternoon (14:00 - 17:00)',
      timeCategory: 'Afternoon',
      mood: ['Shringara', 'Karuna', 'Yearning', 'Peace'],
      primaryRasa: 'Karuna & Yearning',
      jati: 'Audav - Sampoorna',
      description: 'Sung in the mellow late afternoon heat. Omits Rishabh and Dhaivat in ascent, culminating in the deep expressive pull of Madhyam.',
      story: 'A timeless khayal archetype capturing the bittersweet passage of afternoon daylight into twilight.',
      historicalContext: 'Celebrated across Gwalior, Agra, and Patiala Gharanas for its gentle meend glides connecting Gandhar to Madhyam.',
      archivalRef: '#RL-BP-0022',
      artMedium: 'Umber & Ochre Wash on Khadi Rag Paper',
      artPalette: {
        primary: '#7A4833',
        secondary: '#B5795C',
        accent: '#2B4A3D',
        bgGradient: 'linear-gradient(135deg, #F8F4EE 0%, #EBDBCB 50%, #C9AE97 100%)'
      },
      swaraList: ['n.', 'S', 'g', 'M', 'P', 'D', 'n'],
      recordings: [
        {
          id: 'rec-bp-01',
          title: 'Vilambit & Drut Khayal: "Ja Re Ja Kagwa"',
          artist: 'Ustad Bade Ghulam Ali Khan',
          gharana: 'Patiala Gharana',
          instrumentOrStyle: 'Vocal Khayal',
          year: '1959 All India Radio',
          audioDuration: '22:10',
          format: 'AIR Master Tape'
        }
      ]
    },
    {
      id: 'todi',
      name: 'Miyan Ki Todi',
      devanagari: 'मियाँ की तोड़ी',
      tradition: 'Hindustani',
      thaat: 'Todi',
      arohana: "S · r · g · M' · d · N · Ṡ",
      avarohana: "Ṡ · N · d · P · M' · g · r · S",
      pakad: "r / g \ r \ S , M' d N Ṡ",
      vadi: 'Komal Dhaivat (d)',
      samvadi: 'Komal Gandhar (g)',
      nyasa: 'g, d, r',
      time: 'Late Morning (09:00 - 12:00)',
      timeCategory: 'Morning',
      mood: ['Karuna', 'Pathos', 'Solitude', 'Bhakti'],
      primaryRasa: 'Deep Pathos & Solitude',
      jati: 'Sampoorna - Sampoorna',
      description: 'The monumental crown of morning ragas. Known for its microtonal komal swaras and devastating emotional gravity.',
      story: 'Legend tells of Miyan Tansen singing Todi in dense forest clearings, where wild deer would gather mesmerized by the austere grief of Komal Gandhar.',
      historicalContext: 'Parent raga of the Todi Thaat, characterized by an ultra-low Komal Gandhar and a sharp Teevra Madhyam.',
      archivalRef: '#RL-TD-0012',
      artMedium: 'Charcoal & Ochre on Weathered Palm Leaf',
      artPalette: {
        primary: '#4D3B2F',
        secondary: '#8C6F56',
        accent: '#A9232D',
        bgGradient: 'linear-gradient(135deg, #F4EFEB 0%, #DDD2C7 50%, #B9A596 100%)'
      },
      swaraList: ['S', 'r', 'g', "M'", 'P', 'd', 'N'],
      compositions: ['comp-td-01'],
      recordings: [
        {
          id: 'rec-td-01',
          title: 'Todi Drut Bandish: "Langar Kankariya"',
          artist: 'Pt. Bhimsen Joshi',
          gharana: 'Kirana Gharana',
          instrumentOrStyle: 'Vocal Khayal in Teentaal',
          year: '1965 Pune Mehfil',
          audioDuration: '19:40',
          format: 'AIR Master Tape'
        }
      ]
    },
    {
      id: 'bageshri',
      name: 'Raag Bageshri',
      devanagari: 'राग बागेश्री',
      tradition: 'Hindustani',
      thaat: 'Kafi',
      arohana: 'S · g · M · D · n · Ṡ',
      avarohana: 'Ṡ · n · D · M · P · D · g · M · g · R · S',
      pakad: 'D. n. S , M , P D g , M g R S',
      vadi: 'Madhyam (M)',
      samvadi: 'Shadja (S)',
      nyasa: 'M, D, g',
      time: 'Midnight (21:00 - 00:00)',
      timeCategory: 'Midnight',
      mood: ['Shringara', 'Karuna', 'Romantic Longing'],
      primaryRasa: 'Serene Contemplation & Love',
      jati: 'Audav - Sampoorna',
      description: 'The raga of reunion and tender late-night devotion. Omits Rishabh and Panchama in ascent, dwelling intimately on Madhyam.',
      story: 'Celebrates the emotional union of lovers waiting in quiet nocturnal chambers, resolving doubts with warmth and solace.',
      historicalContext: 'A favorite across all vocal gharanas and sitar masters, often sung in deep Vilambit or medium-tempo Jhaptal.',
      archivalRef: '#RL-BG-0078',
      artMedium: 'Midnight Blue Watercolor & Silver Leaf on Khadi Paper',
      artPalette: {
        primary: '#1D2A3A',
        secondary: '#4A6278',
        accent: '#D4AF37',
        bgGradient: 'linear-gradient(135deg, #E6ECF2 0%, #C4D3E0 50%, #89A4BC 100%)'
      },
      swaraList: ['S', 'g', 'M', 'P', 'D', 'n', 'R'],
      compositions: ['comp-bg-01'],
      recordings: [
        {
          id: 'rec-bg-01',
          title: 'Vilambit Khayal: "Kaun Gat Bhayi"',
          artist: 'Ustad Amir Khan',
          gharana: 'Indore Gharana',
          instrumentOrStyle: 'Vocal Khayal in Jhoomra',
          year: '1961 Calcutta',
          audioDuration: '33:15',
          format: 'AIR Master Tape'
        }
      ]
    }
  ],

  compositions: [
    {
      id: 'comp-ym-01',
      title: 'Piya Ki Nazariya Jadu Bhari',
      ragaId: 'yaman',
      ragaName: 'Raag Yaman',
      tradition: 'Hindustani',
      type: 'Khayal Bandish',
      tala: 'Ektaal (12 beats)',
      composer: 'Traditional Sadarang Heritage',
      language: 'Braj Bhasha',
      sthai: 'Piya ki nazariya jadu bhari, jaadu bhari man mohi liyo re...',
      antara: 'Jab se dekhi main to bhabhari bhayi, chain nahi aavat rain dina...',
      notation: [
        { matra: 1, bol: 'Dhin', swara: "N." },
        { matra: 2, bol: 'Dhin', swara: 'R' },
        { matra: 3, bol: 'Dha', swara: 'G' },
        { matra: 4, bol: 'Tu', swara: "M'" },
        { matra: 5, bol: 'Na', swara: 'D' },
        { matra: 6, bol: 'Kat', swara: 'N' },
        { matra: 7, bol: 'Ta', swara: "S'" },
        { matra: 8, bol: 'Dha', swara: 'N' },
        { matra: 9, bol: 'Ge', swara: 'D' },
        { matra: 10, bol: 'Dhin', swara: 'P' },
        { matra: 11, bol: 'Na', swara: 'G' },
        { matra: 12, bol: 'Dha', swara: 'R' }
      ],
      audioDuration: '04:45'
    },
    {
      id: 'comp-dk-01',
      title: 'Eri Aali Piya Bina Surata Na Suhave',
      ragaId: 'darbari',
      ragaName: 'Darbari Kanada',
      tradition: 'Hindustani',
      type: 'Khayal Bandish',
      tala: 'Jhoomra (14 beats)',
      composer: 'Miyan Tansen Heritage',
      language: 'Avadhi / Braj',
      sthai: 'Eri aali piya bina, kal na parat more jiya ko...',
      antara: 'Suna sagaro jagat mohe, nis din barasat nain...',
      notation: [
        { matra: 1, bol: 'Dhin', swara: 'S' },
        { matra: 2, bol: 'Dha', swara: 'd.' },
        { matra: 3, bol: 'Trik', swara: 'n.' },
        { matra: 4, bol: 'Dhin', swara: 'P.' },
        { matra: 5, bol: 'Dhin', swara: 'M.' },
        { matra: 6, bol: 'Dha', swara: 'P.' },
        { matra: 7, bol: 'Trik', swara: 'g' },
        { matra: 8, bol: 'Tin', swara: 'm' },
        { matra: 9, bol: 'Ta', swara: 'R' },
        { matra: 10, bol: 'Trik', swara: 'S' }
      ],
      audioDuration: '06:12'
    },
    {
      id: 'comp-td-01',
      title: 'Langar Kankariya Ji Na Maro',
      ragaId: 'todi',
      ragaName: 'Miyan Ki Todi',
      tradition: 'Hindustani',
      type: 'Khayal Bandish',
      tala: 'Teentaal (16 beats)',
      composer: 'Traditional Khayal Repertory',
      language: 'Braj Bhasha',
      sthai: 'Langar kankariya ji na maro, mori gagariya phoot gayi...',
      antara: 'Aavat jaavat panighat ke dhar, rasiya biraj ke kanha...',
      notation: [
        { matra: 1, bol: 'Dha', swara: 'g' },
        { matra: 2, bol: 'Dhin', swara: 'r' },
        { matra: 3, bol: 'Dhin', swara: 'S' },
        { matra: 4, bol: 'Dha', swara: 'r' },
        { matra: 5, bol: 'Dha', swara: 'g' },
        { matra: 6, bol: 'Dhin', swara: "M'" },
        { matra: 7, bol: 'Dhin', swara: 'd' },
        { matra: 8, bol: 'Dha', swara: 'N' },
        { matra: 9, bol: 'Dha', swara: "S'" },
        { matra: 10, bol: 'Tin', swara: 'd' },
        { matra: 11, bol: 'Tin', swara: 'P' },
        { matra: 12, bol: 'Ta', swara: "M'" },
        { matra: 13, bol: 'Ta', swara: 'g' },
        { matra: 14, bol: 'Dhin', swara: 'r' },
        { matra: 15, bol: 'Dhin', swara: 'S' },
        { matra: 16, bol: 'Dha', swara: 'S' }
      ],
      audioDuration: '05:15'
    },
    {
      id: 'comp-mk-01',
      title: 'Pirat Lagayi Re More Piya',
      ragaId: 'malkauns',
      ragaName: 'Raag Malkauns',
      tradition: 'Hindustani',
      type: 'Khayal Bandish',
      tala: 'Teentaal (16 beats)',
      composer: 'Traditional Agra Heritage',
      language: 'Braj Bhasha',
      sthai: 'Pirat lagayi re more man mandir mein...',
      antara: 'Nis din dhyan dharat more naina...',
      notation: [
        { matra: 1, bol: 'Dha', swara: 'S' },
        { matra: 2, bol: 'Dhin', swara: 'g' },
        { matra: 3, bol: 'Dhin', swara: 'M' },
        { matra: 4, bol: 'Dha', swara: 'd' },
        { matra: 5, bol: 'Dha', swara: 'n' },
        { matra: 6, bol: 'Dhin', swara: "S'" },
        { matra: 7, bol: 'Dhin', swara: 'n' },
        { matra: 8, bol: 'Dha', swara: 'd' }
      ],
      audioDuration: '04:30'
    },
    {
      id: 'comp-bg-01',
      title: 'Kaun Gat Bhayi Sajani',
      ragaId: 'bageshri',
      ragaName: 'Raag Bageshri',
      tradition: 'Hindustani',
      type: 'Khayal Bandish',
      tala: 'Jhaptal (10 beats)',
      composer: 'Traditional Sadarang',
      language: 'Braj Bhasha',
      sthai: 'Kaun gat bhayi sajani mori, bin dekhe piya ko...',
      antara: 'Suni sej darawan laage, rain andheri bhayi...',
      notation: [
        { matra: 1, bol: 'Dhi', swara: 'M' },
        { matra: 2, bol: 'Na', swara: 'P' },
        { matra: 3, bol: 'Dhi', swara: 'D' },
        { matra: 4, bol: 'Dhi', swara: 'n' },
        { matra: 5, bol: 'Na', swara: "S'" },
        { matra: 6, bol: 'Ti', swara: 'D' },
        { matra: 7, bol: 'Na', swara: 'M' },
        { matra: 8, bol: 'Dhi', swara: 'g' },
        { matra: 9, bol: 'Dhi', swara: 'R' },
        { matra: 10, bol: 'Na', swara: 'S' }
      ],
      audioDuration: '05:00'
    }
  ],

  artists: [
    {
      id: 'amir-khan',
      name: 'Ustad Amir Khan',
      devanagari: 'उस्ताद अमीर ख़ान',
      years: '1912 – 1974',
      role: 'Vocal Maestro · Founder of Indore Gharana',
      gharana: 'Indore Gharana',
      tradition: 'Hindustani',
      biography: 'One of the most towering vocal philosophers in the history of Indian classical music. Created an unhurried, monumental ati-vilambit style incorporating Merukhand swara permutations and subtle meends.',
      keyRagas: ['Darbari Kanada', 'Marwa', 'Malkauns', 'Megh', 'Bhairav'],
      signatureStyle: 'Ati-Vilambit Jhoomra laya, serene gamakless alap, and contemplative Merukhand taan elaboration.',
      recordingsCount: 148,
      lineageGeneration: 1,
      disciples: ['Pt. Amarnath', 'Pandit Gokulotsavji Maharaj']
    },
    {
      id: 'bhimsen-joshi',
      name: 'Pt. Bhimsen Joshi',
      devanagari: 'पं. भीमसेन जोशी',
      years: '1922 – 2011',
      role: 'Vocal Titan · Bharat Ratna',
      gharana: 'Kirana Gharana',
      tradition: 'Hindustani',
      biography: 'Legendary exponent of the Kirana tradition. Celebrated for his breathtaking breath capacity (prana-shakti), thunderous gamak taans, and passionate devotional khayals and abhangs.',
      keyRagas: ['Miyanki Todi', 'Shuddha Kalyan', 'Malkauns', 'Puriya Dhanashree'],
      signatureStyle: 'Sustained Kharja Sa resonance, soaring high-octave bol-alap, and electrifying sapat taans.',
      recordingsCount: 380,
      lineageGeneration: 3,
      mentor: 'Sawai Gandharva'
    },
    {
      id: 'nikhil-banerjee',
      name: 'Pt. Nikhil Banerjee',
      devanagari: 'पं. निखिल बनर्जी',
      years: '1931 – 1986',
      role: 'Sitar Virtuoso',
      gharana: 'Maihar Gharana',
      tradition: 'Hindustani',
      biography: 'Disciple of Acharya Allauddin Khan and Ustad Ali Akbar Khan. Blended the majestic Dhrupad architecture of Maihar with delicate vocal Gayaki Ang nuances on sitar.',
      keyRagas: ['Darbari Kanada', 'Yaman', 'Manjh Khamaj', 'Sohini', 'Chayanat'],
      signatureStyle: 'Unbroken four-note sitar meend, crystalline bols, and spiritual inward focus.',
      recordingsCount: 215,
      lineageGeneration: 2,
      mentor: 'Acharya Allauddin Khan'
    },
    {
      id: 'kishori-amonkar',
      name: 'Vidushi Kishori Amonkar',
      devanagari: 'विदुषी किशोरी आमोणकर',
      years: '1932 – 2017',
      role: 'Vocal Philosopher · Padma Vibhushan',
      gharana: 'Jaipur-Atrauli Gharana',
      tradition: 'Hindustani',
      biography: 'Visionary musical philosopher who investigated microtonal shrutis to their deepest emotional core, transcending rigid dogma in service of pure Rasa.',
      keyRagas: ['Yaman', 'Bhoop', 'Jaunpuri', 'Bageshri', 'Bilaskhani Todi'],
      signatureStyle: 'Exquisite microtonal discernment, fluid meends, and deep exploration of Rasa theory.',
      recordingsCount: 165,
      lineageGeneration: 2,
      mentor: 'Mogubai Kurdikar'
    },
    {
      id: 'bade-ghulam-ali',
      name: 'Ustad Bade Ghulam Ali Khan',
      devanagari: 'उस्ताद बड़े ग़ुलाम अली ख़ान',
      years: '1902 – 1968',
      role: 'Vocal Sovereign · Khan Sahib',
      gharana: 'Patiala Gharana',
      tradition: 'Hindustani',
      biography: 'The uncrowned monarch of 20th-century Khayal and Thumri. Endowed with a flexible, velvet 3-octave voice that executed lightning sapat taans with peerless intonation.',
      keyRagas: ['Bhimpalasi', 'Darbari Kanada', 'Pahari', 'Gunakri', 'Kamod'],
      signatureStyle: 'Effortless 3-octave range, crystalline sapat taans, and intensely expressive Punjab-ang Thumri.',
      recordingsCount: 240,
      lineageGeneration: 1
    },
    {
      id: 'vilayat-khan',
      name: 'Ustad Vilayat Khan',
      devanagari: 'उस्ताद विलायत ख़ान',
      years: '1928 – 2004',
      role: 'Sitar Doyen · Aftab-e-Sitar',
      gharana: 'Imdadkhani Gharana',
      tradition: 'Hindustani',
      biography: 'Revolutionized sitar construction and technique by developing the Gayaki Ang, enabling the instrument to literally mimic every nuance, murki, and meend of human vocal khayal.',
      keyRagas: ['Yaman', 'Darbari Kanada', 'Bhairavi', 'Marwa', 'Rageshree'],
      signatureStyle: 'Singing sitar (Gayaki Ang), exquisite 5-note meends from a single fret, and electrifying jhalas.',
      recordingsCount: 310,
      lineageGeneration: 3
    }
  ],

  taals: [
    {
      id: 'teentaal',
      name: 'Teentaal',
      beats: 16,
      vibhaags: 4,
      sam: 1,
      khali: 9,
      vibhaag_starts: [1, 5, 9, 13],
      bols: 'Dha Dhin Dhin Dha | Dha Dhin Dhin Dha | Dha Tin Tin Ta | Ta Dhin Dhin Dha',
      bolList: ['Dha', 'Dhin', 'Dhin', 'Dha', 'Dha', 'Dhin', 'Dhin', 'Dha', 'Dha', 'Tin', 'Tin', 'Ta', 'Ta', 'Dhin', 'Dhin', 'Dha'],
      tempo_range: { vilambit: '30-60 bpm', madhya: '60-140 bpm', drut: '140-320 bpm' },
      tradition: 'Hindustani',
      description: 'The king of Hindustani rhythmic cycles. Symmetrical 16-beat tala with 3 claps (Tali at 1, 5, 13) and 1 wave (Khali at 9).'
    },
    {
      id: 'jhaptal',
      name: 'Jhaptal',
      beats: 10,
      vibhaags: 4,
      sam: 1,
      khali: 6,
      vibhaag_starts: [1, 3, 6, 8],
      bols: 'Dhi Na | Dhi Dhi Na | Ti Na | Dhi Dhi Na',
      bolList: ['Dhi', 'Na', 'Dhi', 'Dhi', 'Na', 'Ti', 'Na', 'Dhi', 'Dhi', 'Na'],
      tempo_range: { vilambit: '40-70 bpm', madhya: '70-130 bpm', drut: '130-220 bpm' },
      tradition: 'Hindustani',
      description: 'Asymmetric 10-beat cycle partitioned 2-3-2-3 with Tali at 1, 3, 8 and Khali at 6. Favored for introspective madhya-laya bandishes.'
    },
    {
      id: 'rupak',
      name: 'Rupak Tala',
      beats: 7,
      vibhaags: 3,
      sam: 1,
      khali: 1,
      vibhaag_starts: [1, 4, 6],
      bols: 'Tin Tin Na | Dhi Na | Dhi Na',
      bolList: ['Tin', 'Tin', 'Na', 'Dhi', 'Na', 'Dhi', 'Na'],
      tempo_range: { vilambit: '40-60 bpm', madhya: '60-120 bpm', drut: '120-180 bpm' },
      tradition: 'Hindustani',
      description: 'Unique 7-beat tala starting directly on a wave (Khali at beat 1), creating a hovering cyclical tension partitioned 3-2-2.'
    },
    {
      id: 'ektaal',
      name: 'Ektaal',
      beats: 12,
      vibhaags: 6,
      sam: 1,
      khali: [3, 7],
      vibhaag_starts: [1, 3, 5, 7, 9, 11],
      bols: 'Dhin Dhin | Dha Ge | Tir Kit | Tu Na | Kat Ta | Dha Ge | Tir Kit | Dhi Na',
      bolList: ['Dhin', 'Dhin', 'Dha', 'Ge', 'Tir', 'Kit', 'Tu', 'Na', 'Kat', 'Ta', 'Dha', 'Ge'],
      tempo_range: { vilambit: '10-40 bpm', madhya: '40-80 bpm', drut: '80-180 bpm' },
      tradition: 'Hindustani',
      description: 'Traditional 12-beat cycle partitioned into 6 vibhaags of 2 beats each. The cornerstone of grand Vilambit Khayal.'
    },
    {
      id: 'keherwa',
      name: 'Keherwa',
      beats: 8,
      vibhaags: 2,
      sam: 1,
      khali: 5,
      vibhaag_starts: [1, 5],
      bols: 'Dha Ge Na Tin | Na Ka Dhin Na',
      bolList: ['Dha', 'Ge', 'Na', 'Tin', 'Na', 'Ka', 'Dhin', 'Na'],
      tempo_range: { vilambit: '60-90 bpm', madhya: '90-160 bpm', drut: '160-260 bpm' },
      tradition: 'Hindustani',
      description: 'Lively 8-beat rhythm cycle partitioned 4+4. Ubiquitous in Thumri, Dadra, Ghazal, and light classical forms.'
    },
    {
      id: 'dadra',
      name: 'Dadra',
      beats: 6,
      vibhaags: 2,
      sam: 1,
      khali: 4,
      vibhaag_starts: [1, 4],
      bols: 'Dha Dhi Na | Dha Ti Na',
      bolList: ['Dha', 'Dhi', 'Na', 'Dha', 'Ti', 'Na'],
      tempo_range: { vilambit: '60-100 bpm', madhya: '100-180 bpm', drut: '180-280 bpm' },
      tradition: 'Hindustani',
      description: 'Graceful 6-beat syncopated cycle partitioned 3+3 with Sam at 1 and Khali at 4. The heartbeat of Purab-ang semi-classical music.'
    },
    {
      id: 'chautal',
      name: 'Chautal (Char Taal)',
      beats: 12,
      vibhaags: 6,
      sam: 1,
      khali: [3, 7],
      vibhaag_starts: [1, 3, 5, 7, 9, 11],
      bols: 'Dha Dha | Din Ta | Ki Te | Dha Dhe | Te Te | Ka Ta | Ga Di | Ga Na',
      bolList: ['Dha', 'Dha', 'Din', 'Ta', 'Ki', 'Te', 'Dha', 'Dhe', 'Te', 'Te', 'Ka', 'Ta'],
      tempo_range: { vilambit: '20-50 bpm', madhya: '50-100 bpm', drut: '100-160 bpm' },
      tradition: 'Hindustani',
      description: 'Ancient 12-beat Pakhawaj cycle dedicated to Dhrupad singing and Rudra Veena recitals.'
    },
    {
      id: 'dhamar',
      name: 'Dhamar',
      beats: 14,
      vibhaags: 4,
      sam: 1,
      khali: 8,
      vibhaag_starts: [1, 6, 8, 11],
      bols: 'Ka Dhi Ta Dhi Ta | Dha - | Ga Ti Te | Te Ta -',
      bolList: ['Ka', 'Dhi', 'Ta', 'Dhi', 'Ta', 'Dha', 'S', 'Ga', 'Ti', 'Te', 'Te', 'Ta', 'S', 'Dha'],
      tempo_range: { vilambit: '30-60 bpm', madhya: '60-100 bpm', drut: '100-140 bpm' },
      tradition: 'Hindustani',
      description: 'Stately 14-beat Pakhawaj rhythm (5+2+3+4) associated with the heroic Hori Dhamar vocal genre celebrating Braj springtime.'
    }
  ],

  instruments: [
    {
      id: 'tanpura',
      name: 'Tanpura / Tambura',
      category: 'Harmonium / Drone',
      tradition: 'Hindustani',
      construction: 'Large seasoned dried gourd resonator (tumba), long hollow teak or tun wood neck, flat curved bone bridge (jawari) with cotton thread micro-adjusters.',
      tuningStandard: 'Pa-Sa-Sa-Sa (Pancham), Ma-Sa-Sa-Sa (Madhyam), or Ni-Sa-Sa-Sa (Nishad)',
      prominentExponents: ['Miraj Craftsmen', 'Kolkata Luthiers'],
      historicalEra: 'Ancient to Present',
      description: 'The sacred, unbroken acoustic drone providing the reference tonic (Sa) and infinite rich harmonic overtones through jawari bridge shimmer.'
    },
    {
      id: 'tabla',
      name: 'Tabla (Dayan & Bayan)',
      category: 'Percussion (Membranophone)',
      tradition: 'Hindustani',
      construction: 'Pair of hand drums: right-hand Dayan (carved rosewood/shisham, layered goatskin with black syahi iron-paste center) and left-hand Bayan (hammered copper or brass kettle with off-center syahi for bass modulation).',
      tuningStandard: 'Dayan tuned precisely to Vocalist Sa; Bayan resonant bass modulation',
      prominentExponents: ['Ustad Zakir Hussain', 'Ustad Alla Rakha', 'Pt. Kishan Maharaj', 'Ustad Ahmedjan Thirakwa'],
      historicalEra: '18th Century to Present',
      description: 'The premier percussion instrument of North Indian classical music, capable of reproducing intricate tonal bols from crisp metallic rim hits to deep sliding bass modulations.'
    },
    {
      id: 'harmonium',
      name: 'Harmonium',
      category: 'Harmonium / Drone',
      tradition: 'Hindustani',
      construction: 'Seasoned teak wood body, hand-pumped multi-fold leather bellows, dual or triple reed ranks (8-foot male, 4-foot female registers), brass reed tongues, and ivory/wood sargam keys.',
      tuningStandard: '22-Shruti just intonation or concert pitch (A440 calibrated to C#)',
      prominentExponents: ['Pt. Appa Jalgaonkar', 'Pt. Tulsidas Borkar', 'Pt. Vyas'],
      historicalEra: '19th Century to Present',
      description: 'The irreplaceable melodic accompaniment of vocal Khayal, Thumri, and lehra practice, providing sustained reed tone and supportive melodic architecture.'
    },
    {
      id: 'swarmandal',
      name: 'Swarmandal',
      category: 'Stringed (Plucked)',
      tradition: 'Hindustani',
      construction: 'Trapezoidal wooden soundbox fitted with 30 to 40 fine steel and brass strings, tuned individually to the notes of the raga across three octaves.',
      tuningStandard: 'Tuned precisely to the specific swaras and vadi-samvadi of the chosen raga',
      prominentExponents: ['Ustad Bade Ghulam Ali Khan', 'Pt. Jasraj', 'Pt. Bhimsen Joshi'],
      historicalEra: 'Ancient (Katyayana Veena roots)',
      description: 'The celestial harp strum used by master vocalists to cascade resonant glissandi during alaps and bandish expositions.'
    },
    {
      id: 'sitar',
      name: 'Sitar',
      category: 'Stringed (Plucked)',
      tradition: 'Hindustani',
      construction: 'Seasoned toon or teak wood, rounded gourd resonator (tumba), curved movable brass frets, 7 main playing strings, and 11 to 13 sympathetic tarab strings.',
      tuningStandard: 'Kharja Sa (C / C#)',
      prominentExponents: ['Pt. Ravi Shankar', 'Ustad Vilayat Khan', 'Pt. Nikhil Banerjee'],
      historicalEra: '17th–18th Century',
      description: 'The iconic plucked chordophone of North India, celebrated for sustained multi-fret meend glissandi, gayaki vocal emulation, and sparkling jhala virtuosity.'
    },
    {
      id: 'sarod',
      name: 'Sarod',
      category: 'Stringed (Plucked)',
      tradition: 'Hindustani',
      construction: 'Single hollowed teak or tun block with goat-skin membrane resonator, fretless mirror-polished stainless steel fingerboard, played with a coconut shell plectrum (java).',
      tuningStandard: 'Mandra Sa / Kharja Sa',
      prominentExponents: ['Ustad Amjad Ali Khan', 'Ustad Ali Akbar Khan', 'Ustad Hafiz Ali Khan'],
      historicalEra: '19th Century (Afghan Rabab heritage)',
      description: 'Renowned for its deep, resonant, and sustained fretless glides (meends) and crisp percussive right-hand strokes.'
    },
    {
      id: 'bansuri',
      name: 'Bansuri',
      category: 'Wind (Aerophone)',
      tradition: 'Hindustani',
      construction: 'Single seamless piece of special seasoned Assam bamboo with 6 or 7 finger holes, tuned entirely through embouchure and finger placement.',
      tuningStandard: 'E (base flute), C#, or D',
      prominentExponents: ['Pt. Hariprasad Chaurasia', 'Pt. Pannalal Ghosh', 'Pt. Ronu Majumdar'],
      historicalEra: 'Ancient (Vedic roots)',
      description: 'The sublime bamboo transverse flute capable of producing pure vocal breath inflections, microtonal shrutis, and soaring pastoral meends.'
    },
    {
      id: 'sarangi',
      name: 'Sarangi',
      category: 'Stringed (Bowed)',
      tradition: 'Hindustani',
      construction: 'Carved from a single block of cedar or tun wood, skin-covered soundbox, 3 heavy gut melody strings bowed with a horsehair bow, and up to 35 sympathetic steel resonance strings.',
      tuningStandard: 'Sa-Pa-Sa or Sa-Ma-Sa',
      prominentExponents: ['Ustad Sultan Khan', 'Pt. Ram Narayan', 'Ustad Bundu Khan'],
      historicalEra: 'Ancient to Present',
      description: 'The instrument considered closest to the human vocal cord ("Sau Rangi" = hundred colors), played by sliding fingernail cuticles along the gut strings.'
    },
    {
      id: 'shehnai',
      name: 'Shehnai',
      category: 'Wind (Aerophone)',
      tradition: 'Hindustani',
      construction: 'Tubular wooden body with flaring metal bell and quadruple reed, played with circular breathing.',
      tuningStandard: 'C# / D',
      prominentExponents: ['Ustad Bismillah Khan'],
      historicalEra: 'Medieval to Present',
      description: 'The auspicious quadruple-reed aerophone elevated from wedding courtyards to international concert stages by Ustad Bismillah Khan.'
    },
    {
      id: 'santoor',
      name: 'Santoor',
      category: 'Stringed (Plucked)',
      tradition: 'Hindustani',
      construction: 'Trapezoidal walnut box with 72 to 100 steel strings stretched over 24 to 25 wooden bridges, struck with delicate curved walnut mallets (mezrab).',
      tuningStandard: 'Tuned to individual raga scale',
      prominentExponents: ['Pt. Shivkumar Sharma', 'Pt. Bhajan Sopori'],
      historicalEra: 'Ancient (Shatatantri Veena roots, refined from Kashmir)',
      description: 'Transformed by Pt. Shivkumar Sharma into a sovereign classical concert instrument capable of sustained meend glides.'
    },
    {
      id: 'rudra-veena',
      name: 'Rudra Veena',
      category: 'Stringed (Plucked)',
      tradition: 'Hindustani',
      construction: 'Tubular dandi bamboo or teak body resting on two large dried pumpkin resonators (tumbas), 24 fixed wooden frets set in wax.',
      tuningStandard: 'Mandra Saptak Kharja Sa',
      prominentExponents: ['Ustad Zia Mohiuddin Dagar', 'Ustad Asad Ali Khan', 'Ustad Shamsuddin Faridi Desai'],
      historicalEra: 'Ancient (Vedic Dhrupad roots)',
      description: 'The sovereign meditative instrument of ancient Dhrupad, producing profound bass oscillations and slow Khandarbani alaps.'
    },
    {
      id: 'pakhawaj',
      name: 'Pakhawaj',
      category: 'Percussion (Membranophone)',
      tradition: 'Hindustani',
      construction: 'Asymmetrical barrel-shaped wooden drum with two leather heads; right head has permanent black syahi, left head receives temporary fresh wheat dough application for deep bass resonance.',
      tuningStandard: 'Right head tuned to Sa; left head tuned to deep resonant octave bass',
      prominentExponents: ['Pt. Ramashish Pathak', 'Pt. Bhavani Shankar', 'Ustad Mohan Shyam Sharma'],
      historicalEra: 'Ancient (Mridanga roots in Dhrupad)',
      description: 'The majestic barrel drum of North Indian Dhrupad and Dhamar genres, known for solemn open-hand strokes and thundering bols.'
    }
  ],

  riyazSessions: [
    {
      id: 'riyaz-01',
      date: 'Nov 8, 2026',
      timestamp: Date.now() - 86400000 * 2,
      raga: 'Yaman',
      minutes: 45,
      focusArea: 'Meend & Microtones',
      notes: 'Worked on Tivra Ma glide into Pa. Slower tempo Vilambit Teentaal.',
      tonic: 'C# (138.59 Hz)'
    },
    {
      id: 'riyaz-02',
      date: 'Nov 6, 2026',
      timestamp: Date.now() - 86400000 * 4,
      raga: 'Darbari Kanada',
      minutes: 60,
      focusArea: 'Swara Sadhana',
      notes: 'Mandra saptak Komal Gandhar andolan sustain with Miraj Tanpura drone.',
      tonic: 'C# (138.59 Hz)'
    }
  ],

  bookmarks: ['darbari', 'yaman', 'todi'],

  customCompositions: [
    {
      id: 'custom-01',
      title: 'Dusk Meditation in Yaman',
      ragaId: 'yaman',
      ragaName: 'Raag Yaman',
      taal: 'Teentaal',
      tempoBpm: 72,
      notes: [
        { swara: 'N.', matra: 1, duration: 1, lyrics: 'Sa' },
        { swara: 'R', matra: 2, duration: 1, lyrics: 're' },
        { swara: 'G', matra: 3, duration: 2, lyrics: 'ga' },
        { swara: "M'", matra: 5, duration: 1, lyrics: 'ma' },
        { swara: 'P', matra: 6, duration: 1, lyrics: 'pa' },
        { swara: 'D', matra: 7, duration: 1, lyrics: 'dha' },
        { swara: 'N', matra: 8, duration: 1, lyrics: 'ni' }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
};

class DatabaseManager {
  private data: AppDatabase;

  constructor() {
    this.data = this.loadDatabase();
  }

  private loadDatabase(): AppDatabase {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.warn('Could not read from persistent store, using seeded initial data:', err);
    }
    // Save initial seed data to disk
    this.saveToDisk(INITIAL_DATABASE);
    return INITIAL_DATABASE;
  }

  private saveToDisk(data: AppDatabase) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write to database file:', err);
    }
  }

  // Ragas
  public getRagas(): Raga[] {
    return this.data.ragas;
  }

  public getRagaById(id: string): Raga | undefined {
    return this.data.ragas.find(r => r.id.toLowerCase() === id.toLowerCase());
  }

  // Artists
  public getArtists(): Artist[] {
    return this.data.artists;
  }

  public getArtistById(id: string): Artist | undefined {
    return this.data.artists.find(a => a.id.toLowerCase() === id.toLowerCase());
  }

  // Compositions
  public getCompositions(ragaId?: string): Composition[] {
    if (ragaId) {
      return this.data.compositions.filter(c => c.ragaId.toLowerCase() === ragaId.toLowerCase());
    }
    return this.data.compositions;
  }

  // Taals
  public getTaals(): Taal[] {
    return this.data.taals;
  }

  // Instruments
  public getInstruments(): Instrument[] {
    return this.data.instruments;
  }

  // Riyaz Sessions
  public getRiyazSessions(): RiyazSession[] {
    return this.data.riyazSessions;
  }

  public addRiyazSession(session: Omit<RiyazSession, 'id' | 'timestamp'>): RiyazSession {
    const newSession: RiyazSession = {
      ...session,
      id: `riyaz-${Date.now()}`,
      timestamp: Date.now()
    };
    this.data.riyazSessions.unshift(newSession);
    this.saveToDisk(this.data);
    return newSession;
  }

  public deleteRiyazSession(id: string): boolean {
    const initLen = this.data.riyazSessions.length;
    this.data.riyazSessions = this.data.riyazSessions.filter(s => s.id !== id);
    if (this.data.riyazSessions.length !== initLen) {
      this.saveToDisk(this.data);
      return true;
    }
    return false;
  }

  // Bookmarks
  public getBookmarks(): string[] {
    return this.data.bookmarks;
  }

  public toggleBookmark(id: string): { bookmarked: boolean; count: number } {
    const idx = this.data.bookmarks.indexOf(id);
    let bookmarked = false;
    if (idx >= 0) {
      this.data.bookmarks.splice(idx, 1);
    } else {
      this.data.bookmarks.push(id);
      bookmarked = true;
    }
    this.saveToDisk(this.data);
    return { bookmarked, count: this.data.bookmarks.length };
  }

  // Custom Compositions (Create Studio)
  public getCustomCompositions(): CustomComposition[] {
    return this.data.customCompositions;
  }

  public saveCustomComposition(comp: Partial<CustomComposition>): CustomComposition {
    const now = new Date().toISOString();
    let saved: CustomComposition;
    if (comp.id) {
      const idx = this.data.customCompositions.findIndex(c => c.id === comp.id);
      if (idx >= 0) {
        saved = {
          ...this.data.customCompositions[idx],
          ...comp,
          updatedAt: now
        } as CustomComposition;
        this.data.customCompositions[idx] = saved;
      } else {
        saved = {
          ...comp,
          id: comp.id,
          createdAt: now,
          updatedAt: now
        } as CustomComposition;
        this.data.customCompositions.push(saved);
      }
    } else {
      saved = {
        ...comp,
        id: `comp-${Date.now()}`,
        createdAt: now,
        updatedAt: now
      } as CustomComposition;
      this.data.customCompositions.push(saved);
    }
    this.saveToDisk(this.data);
    return saved;
  }

  public deleteCustomComposition(id: string): boolean {
    const initLen = this.data.customCompositions.length;
    this.data.customCompositions = this.data.customCompositions.filter(c => c.id !== id);
    if (this.data.customCompositions.length !== initLen) {
      this.saveToDisk(this.data);
      return true;
    }
    return false;
  }
}

export const db = new DatabaseManager();
