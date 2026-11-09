export type MusicalTradition = 'Hindustani' | 'Carnatic' | 'Both';

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
  relationship: string; // e.g. "Counterpart · Uttaranga Pradhan", "Parent Thaat Archetype", "Kanada Sibling"
  swaras: string;
  keyDifference: string;
  tempo: string;
}

export interface Raga {
  id: string;
  name: string;
  devanagari?: string;
  tradition: MusicalTradition;
  thaat: string;
  melakartaNumber?: number;
  melakartaName?: string;
  arohana: string;
  avarohana: string;
  pakad: string;
  chalan?: string;
  vadi: string;
  samvadi: string;
  nyasa?: string;
  time: string;
  praharNumber?: number; // 1 to 8
  praharName?: string;
  timeCategory: 'Morning' | 'Afternoon' | 'Evening' | 'Midnight' | 'Late Night' | 'Monsoon' | 'Universal';
  season?: string;
  mood: string[];
  primaryRasa: string;
  secondaryRasa?: string;
  jati: string; // e.g. 'Sampoorna - Sampoorna', 'Audav - Sampoorna', 'Audav - Audav'
  centsDeviation?: {
    swara: string;
    cents: number;
    description: string;
  };
  andolanDetails?: {
    swara: string;
    range: string; // e.g. "280c - 310c"
    period: string; // e.g. "~1.05 seconds"
    quote: string;
    scholar: string;
  };
  acousticCurve?: number[]; // Cents contour array for visualization
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
  swaraList: string[]; // Standardized swara tokens: 'S', 'r', 'R', 'g', 'G', 'm', 'M', 'P', 'd', 'D', 'n', 'N'
  recordings: Recording[];
  kinship?: KinshipRaga[];
}

export interface Artist {
  id: string;
  name: string;
  devanagari?: string;
  years: string;
  role: string; // Vocalist, Sitar Maestro, Rudra Veena, Bansuri, etc.
  gharana: string;
  tradition: MusicalTradition;
  biography: string;
  keyRagas: string[];
  signatureStyle: string;
  portraitArtwork?: string;
  recordingsCount: number;
  lineageGeneration?: number;
  mentor?: string;
}

export interface GharanaLineage {
  id: string;
  name: string;
  region: string;
  era: string;
  founders: string[];
  pillars: {
    title: string;
    description: string;
  }[];
  generations: {
    generation: string;
    masters: {
      name: string;
      years: string;
      role: string;
      notes: string;
      recordingsCount: number;
    }[];
  }[];
  fieldRecordQuote?: {
    year: string;
    quote: string;
    author: string;
  };
}

export interface Manuscript {
  id: string;
  title: string;
  period: string;
  author: string;
  language: string;
  archiveLocation: string;
  description: string;
  folioReference: string;
  scanAvailable: boolean;
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
  description: string;
}

export const MOCK_RAGAS: Raga[] = [
  {
    id: 'darbari',
    name: 'Darbari Kanada',
    devanagari: 'दरबारी कान्हड़ा',
    tradition: 'Hindustani',
    thaat: 'Asavari',
    melakartaNumber: 20,
    melakartaName: 'Natabhairavi counterpart',
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
    description: 'Attributed to Miyan Tansen in the royal court of Emperor Akbar. A raga of majestic gravitas, royal introspection, and profound emotional weight, designed to calm the regal mind in the depth of midnight.',
    story: 'The nomenclature "Darbari" derives directly from the Persian loanword for the royal court (Darbar). Tansen created this variation of the ancient Kanada form to be rendered exclusively in the private midnight chambers of Emperor Akbar.',
    historicalContext: 'While afternoon and twilight ragas possess dramatic kinetic tension, Darbari Kanada is deliberately architected to dispel psychological restlessness. Its heavy, hypnotic andolan notes demand extreme breath control from vocalists and unhurried slow-glide meends across instrument frets.',
    archivalRef: '#RL-DK-1556',
    artMedium: 'Oil on Raw Linen · Acquisition No. 2024.11',
    artPalette: {
      primary: '#2B2129',
      secondary: '#5E4856',
      accent: '#B08848',
      bgGradient: 'linear-gradient(135deg, #EAE5E8 0%, #CDC2C9 50%, #9B8996 100%)'
    },
    swaraList: ['S', 'R', 'g', 'M', 'P', 'd', 'n'],
    recordings: [
      {
        id: 'rec-dk-01',
        title: 'Eri Aali Piya Bina',
        artist: 'Ustad Amir Khan',
        gharana: 'Indore Gharana',
        instrumentOrStyle: 'Vocal Khayal · Vilambit Jhoomra',
        year: 'Recorded Calcutta, 1968',
        location: 'Calcutta Music Conference',
        audioDuration: '28:44',
        format: 'AIR Master Tape',
        tapeId: 'MASTER TAPE #AK-68'
      },
      {
        id: 'rec-dk-02',
        title: 'Sitar Alap, Jod & Jhala',
        artist: 'Pt. Nikhil Banerjee',
        gharana: 'Maihar Gharana',
        instrumentOrStyle: 'Sitar · Unaccompanied Alap',
        year: 'Live in Amsterdam, 1972',
        location: 'Tropenmuseum Amsterdam',
        audioDuration: '41:10',
        format: 'Live Reel Archive',
        tapeId: 'CONCERT REEL #NB-72'
      },
      {
        id: 'rec-dk-03',
        title: 'Khayal Bandish: "Ghanghor Ghata Ghere"',
        artist: 'Ustad Bade Ghulam Ali Khan',
        gharana: 'Patiala Gharana',
        instrumentOrStyle: 'Vocal Khayal · Drut Teentaal',
        year: 'All India Radio Broadcast, 1954',
        location: 'Lahore & Delhi Studios',
        audioDuration: '14:02',
        format: '78 RPM Shellac',
        tapeId: 'AIR SHELLAC #BG-54'
      }
    ],
    kinship: [
      {
        id: 'adana',
        name: 'Raag Adana',
        relationship: 'Counterpart · Uttaranga Pradhan',
        swaras: 'S · R · M · P · d · n · Ṡ',
        keyDifference: 'Shares Darbari swaras but moves with rapid, spirited darting phrases in the upper octave (Tar Saptak). Crucially eliminates the prolonged, heavy oscillation on Komal Gandhar.',
        tempo: 'Drut · Vibrant'
      },
      {
        id: 'asavari',
        name: 'Raag Asavari',
        relationship: 'Parent Thaat Archetype · Morning Prahar',
        swaras: 'S · R · M · P · d · Ṡ',
        keyDifference: 'Features a straightforward descent without the characteristic Kanada "g ~ m R S" zigzag phrase. Employs Shuddha Rishabh with a calm morning piety rather than royal nocturnal drama.',
        tempo: 'Morning · Ascetic'
      },
      {
        id: 'nayaki-kanada',
        name: 'Raag Nayaki Kanada',
        relationship: 'Kanada Sibling · Kafi Thaat Ang',
        swaras: 'S · R · g · M · P · n · Ṡ',
        keyDifference: 'Utilizes both Komal and Shuddha forms with a distinct emphasis on Nishad-Pancham interplay. Lacks the mandra-weighted ponderous gravitas of Darbari, leaning more lyrical and romantic.',
        tempo: 'Late Night · Romantic'
      }
    ]
  },
  {
    id: 'yaman',
    name: 'Raag Yaman',
    devanagari: 'राग यमन',
    tradition: 'Hindustani',
    thaat: 'Kalyan',
    melakartaNumber: 65,
    melakartaName: 'Mechakalyani',
    arohana: "Ṇ · R · G · M' · D · N · Ṡ",
    avarohana: "Ṡ · N · D · M' · G · R · S",
    pakad: "Ṇ · R · G · M' · D — M' · G · R · S",
    chalan: "Ṇ · R · G , M' · D · N · Ṡ , Ṡ · N · D · M' · G · R · S",
    vadi: 'Gandhar (G)',
    samvadi: 'Nishad (N)',
    nyasa: 'Gandhar (G) & Nishad (N)',
    time: '1st Prahar · 19:00 (Evening)',
    praharNumber: 4,
    praharName: 'Sandhiprakash (Dusk 18:00 - 21:00)',
    timeCategory: 'Evening',
    mood: ['Shanti', 'Shringara', 'Bhakti'],
    primaryRasa: 'Shanti & Shringara',
    secondaryRasa: 'Serene Devotion',
    jati: 'Kalyan Thaat · Sampoorna-Sampoorna',
    centsDeviation: {
      swara: "Tivra Madhyam (M')",
      cents: 590,
      description: '+12 cents sharp just ratio 45/32 (Prati Madhyamam)'
    },
    acousticCurve: [0, 20, 60, 110, 180, 270, 390, 480, 520, 470, 360, 230, 120, 40, 0],
    description: 'Considered the gateway to North Indian classical raga repertoire, Yaman evokes pristine devotion, serene dusk contemplation, and romantic yearning through its prominent Tivra Madhyam.',
    story: 'As dusk envelops the ancient courtyards and oil lamps begin to flicker, Yaman awakens. It is the archetype of grace—opening with the lower Nishad (Ni) reaching upward to Rishabh (Re) and Gandhar (Ga), capturing quiet tenderness.',
    historicalContext: 'Rooted in the medieval Kalyan tradition and refined across Gwalior, Kirana, and Rampur-Sahaswan Gharanas. Historically linked to Amir Khusrau’s synthesis of Persian Maqam with Indian swaras.',
    archivalRef: '#RL-YM-1042',
    artMedium: 'Hand-ground pigment & 24k gold dust on Khadi rag paper · Archival Collection Sangeet Natak',
    artPalette: {
      primary: '#C48A2C',
      secondary: '#E6C687',
      accent: '#8C4318',
      bgGradient: 'linear-gradient(135deg, #F9F1E2 0%, #EBDBC1 50%, #D8C39E 100%)'
    },
    swaraList: ['N.', 'R', 'G', 'M', 'D', 'N', 'S'],
    recordings: [
      {
        id: 'rec-ym-01',
        title: 'Alap & Jod in Vilambit Tintal',
        artist: 'Pt. Nikhil Banerjee',
        gharana: 'Maihar Gharana',
        instrumentOrStyle: 'Sitar',
        year: '1976 Archival Tape',
        location: 'Calcutta Music Conference',
        audioDuration: '32:45',
        format: 'AIR Master Tape',
        tapeId: 'AIR-YM-76'
      },
      {
        id: 'rec-ym-02',
        title: 'Khayal: Eri Aali Piya Bina',
        artist: 'Vidushi Kishori Amonkar',
        gharana: 'Jaipur-Atrauli Gharana',
        instrumentOrStyle: 'Vocal Khayal',
        year: '1978 Recording',
        location: 'All India Radio Archives',
        audioDuration: '28:14',
        format: 'Acetate Master Tape',
        tapeId: 'AIR-KA-78'
      }
    ],
    kinship: [
      {
        id: 'shuddha-kalyan',
        name: 'Raag Shuddha Kalyan',
        relationship: 'Audav-Sampoorna Variant',
        swaras: "S · R · G · P · D · Ṡ / Ṡ · N · D · P · M' · G · R · S",
        keyDifference: 'Omits Ma and Ni in ascent with a purely pentatonic Bhoopali-like arohana, resolving through Tivra Ma only in descent.',
        tempo: 'Vilambit · Contemplative'
      },
      {
        id: 'yaman-kalyan',
        name: 'Raag Yaman Kalyan',
        relationship: 'Shuddha Ma Touch (Alpa-Prayoga)',
        swaras: "Ṇ · R · G · M' · P · D · N · Ṡ",
        keyDifference: 'Delicately introduces natural Shuddha Madhyam sandwiched between two Gandhar notes (G · M · G · R · S).',
        tempo: 'Romantic · Gayaki'
      }
    ]
  },
  {
    id: 'megh',
    name: 'Raag Megh',
    devanagari: 'राग मेघ',
    tradition: 'Hindustani',
    thaat: 'Kafi',
    melakartaNumber: 22,
    melakartaName: 'Kharaharapriya counterpart',
    arohana: "S · R · M · P · n · Ṡ",
    avarohana: "Ṡ · n · P · M · R · S",
    pakad: "S · R — ṇ · Ṇ — Ṃ · Ṇ · S",
    chalan: "S · R · M · P · n · Ṡ , Ṡ · n · P · M · R · S",
    vadi: 'Pancham (P)',
    samvadi: 'Shadaj (S)',
    nyasa: 'Rishabh (R) & Pancham (P)',
    time: 'Varsha Ritu · Rain Season (Any Hour)',
    praharNumber: 0,
    praharName: 'Varsha Ritu (Seasonal Rain)',
    timeCategory: 'Monsoon',
    season: 'Varsha Ritu',
    mood: ['Gambhir', 'Utsaha', 'Rain & Longing'],
    primaryRasa: 'Rain & Longing',
    secondaryRasa: 'Majestic Petrichor',
    jati: 'Kafi Ang · Audav-Audav (Pentatonic)',
    centsDeviation: {
      swara: 'Komal Nishad (n)',
      cents: 996,
      description: '-4 cents natural acoustic harmonic 7th'
    },
    acousticCurve: [30, 80, 160, 240, 310, 420, 500, 460, 380, 270, 180, 90, 30],
    description: 'Ancient pentatonic cloud-summoner. Bypasses Gandhar and Dhaivat entirely, echoing the heavy rumbling of monsoon thunderclouds through profound Rishabh-to-Pancham glides.',
    story: 'Legend recounts that when Miyan Tansen sang Raga Deepak to ignite palace lamps, his body burned with internal fever. Only his daughter Saraswati singing Raga Megh Malhar could summon torrential rains to extinguish the flames and restore life.',
    historicalContext: 'One of the six fundamental masculine ragas in ancient Ragamala classification. Closely intertwined with medieval seasonal festivals and Indian miniature paintings.',
    archivalRef: '#RL-MG-0891',
    artMedium: 'Monsoon Rain Watercolor Wash & Lightning Ink on Hand-beaten Khadi Paper',
    artPalette: {
      primary: '#3F516B',
      secondary: '#889BB7',
      accent: '#C79A42',
      bgGradient: 'linear-gradient(135deg, #E3E9F2 0%, #C4D2E5 50%, #90A6C5 100%)'
    },
    swaraList: ['S', 'R', 'M', 'P', 'n'],
    recordings: [
      {
        id: 'rec-mg-01',
        title: 'Ancient Dhrupad on Rudra Veena',
        artist: 'Ustad Zia Mohiuddin Dagar',
        gharana: 'Dagarvani',
        instrumentOrStyle: 'Rudra Veena',
        year: '1967 All India Radio',
        location: 'New Delhi National Programme',
        audioDuration: '38:40',
        format: 'AIR Master Tape',
        tapeId: 'AIR-RUD-67'
      }
    ],
    kinship: [
      {
        id: 'miyan-ki-malhar',
        name: 'Miyan Ki Malhar',
        relationship: 'Malhar Family Peer · Sampoorna',
        swaras: "S · R · g · M · P · D · n · N · Ṡ",
        keyDifference: 'Includes both Komal and Shuddha forms with the iconic Tansen phrase "M · P · n · D · N · Ṡ".',
        tempo: 'Gambhir · Midnight Rain'
      }
    ]
  },
  {
    id: 'bhimpalasi',
    name: 'Raag Bhimpalasi',
    devanagari: 'राग भीमपलासी',
    tradition: 'Hindustani',
    thaat: 'Kafi',
    melakartaNumber: 22,
    melakartaName: 'Kharaharapriya',
    arohana: "ṇ · S · g · M · P · n · Ṡ",
    avarohana: "Ṡ · n · D · P · M · g · R · S",
    pakad: "ṇ · S · M — g · P · M · P · g · R · S",
    chalan: "ṇ · S · M , g · P · M · P · g · R · S",
    vadi: 'Madhyam (M)',
    samvadi: 'Shadaj (S)',
    nyasa: 'Madhyam (M) & Gandhar (g)',
    time: '3rd Prahar · 15:00 (Afternoon)',
    praharNumber: 3,
    praharName: 'Afternoon Prahar (12:00 - 15:00)',
    timeCategory: 'Afternoon',
    mood: ['Karuna', 'Yearning', 'Shanta'],
    primaryRasa: 'Karuna & Yearning',
    secondaryRasa: 'Sweet Melancholy',
    jati: 'Kafi Thaat · Audav-Sampoorna',
    centsDeviation: {
      swara: 'Komal Gandhar (g)',
      cents: 300,
      description: '-16 cents on Gandhar (Cent: -16c on g · Sa: C# 277.18 Hz)'
    },
    acousticCurve: [15, 35, 75, 130, 210, 310, 380, 420, 390, 310, 190, 95, 20],
    description: 'Sung in the mellow late afternoon heat. Omits Rishabh and Dhaivat in ascent, culminating in the heart-rending gravitational pull of Madhyam.',
    story: 'Bhimpalasi captures the heavy golden warmth of late afternoon when shadows lengthen across dry courtyards. It embodies viraha—the bittersweet ache of longing for a beloved across distant lands.',
    historicalContext: 'A premier raga of the Kafi scale family, beloved across both Khayal and lighter classical forms like Thumri and Dadra.',
    archivalRef: '#RL-BP-0412',
    artMedium: 'Earthy Ochre & Sepia Watercolor with Tanpura String Calligraphy',
    artPalette: {
      primary: '#A86638',
      secondary: '#DCAB7E',
      accent: '#5E381A',
      bgGradient: 'linear-gradient(135deg, #FBF2E7 0%, #ECD7BF 50%, #D4B695 100%)'
    },
    swaraList: ['n.', 'S', 'g', 'M', 'P', 'D', 'n', 'R'],
    recordings: [
      {
        id: 'rec-bp-01',
        title: 'Bhimpalasi Khayal in Vilambit Ektaal',
        artist: 'Pt. Mallikarjun Mansur',
        gharana: 'Jaipur-Atrauli Gharana',
        instrumentOrStyle: 'Vocal Khayal',
        year: '1963 Studio Session',
        location: 'Bombay Sangeet Kendra',
        audioDuration: '26:50',
        format: '78 RPM Shellac',
        tapeId: 'AIR-MM-63'
      }
    ],
    kinship: [
      {
        id: 'bageshree',
        name: 'Raag Bageshree',
        relationship: 'Late Night Sister Raga',
        swaras: "S · g · M · D · n · Ṡ",
        keyDifference: 'Emphasizes Shuddha Dhaivat and omits Pa in ascent, creating a reunion bhava rather than late-afternoon longing.',
        tempo: 'Late Night · Romantic'
      }
    ]
  },
  {
    id: 'malkauns',
    name: 'Raag Malkauns',
    devanagari: 'राग मालकौंस',
    tradition: 'Both',
    thaat: 'Bhairavi',
    melakartaNumber: 8,
    melakartaName: 'Hanumatodi / Hindolam',
    arohana: "S · g · M · d · n · Ṡ",
    avarohana: "Ṡ · n · d · M · g · S",
    pakad: "g · M · d · n · d · M · g · S",
    chalan: "g · M · d · n · d · M · g · S",
    vadi: 'Madhyam (M)',
    samvadi: 'Shadaj (S)',
    nyasa: 'Madhyam (M) & Komal Gandhar (g)',
    time: '3rd Prahar · 02:00 (Late Night)',
    praharNumber: 6,
    praharName: 'Midnight Watch (00:00 - 03:00)',
    timeCategory: 'Late Night',
    mood: ['Veera', 'Meditative', 'Adbhuta'],
    primaryRasa: 'Veera & Meditative',
    secondaryRasa: 'Austerity & Trance',
    jati: 'Bhairavi Thaat · Audav-Audav (5 Notes Canonical Balance)',
    centsDeviation: {
      swara: 'Komal Dhaivat (d)',
      cents: 814,
      description: '-14 cents microtonal depression'
    },
    acousticCurve: [20, 60, 140, 260, 390, 480, 560, 520, 430, 290, 160, 50, 10],
    description: 'One of the oldest ragas in the corpus. Entirely omits both Rishabh and Panchama, creating deep, austere silence and inward meditative focus.',
    story: 'Legend relates that Malkauns was conceived from the cosmic Tandava dance of Lord Shiva. When Shiva’s anger threatened the universe, Goddess Parvati sang Malkauns to soothe his blazing wrath and bring tranquil equilibrium.',
    historicalContext: 'Mentioned in ancient Sanskrit treatises including the Sangita Ratnakara (13th century). In the Carnatic system, it is known and beloved as Raga Hindolam.',
    archivalRef: '#RL-MK-0004',
    artMedium: 'Charcoal, Indigo & Raw Umber Wash with Gold Speckles on Hand-pressed Paper',
    artPalette: {
      primary: '#30394F',
      secondary: '#5C6E8F',
      accent: '#9C7A38',
      bgGradient: 'linear-gradient(135deg, #E6E9F0 0%, #CAD2E0 50%, #A2B1C8 100%)'
    },
    swaraList: ['S', 'g', 'M', 'd', 'n'],
    recordings: [
      {
        id: 'rec-mk-01',
        title: 'Malkauns - Historic Vilambit Jhoomra',
        artist: 'Ustad Amir Khan',
        gharana: 'Indore Gharana',
        instrumentOrStyle: 'Vocal Khayal',
        year: '1958 Archival Session',
        location: 'Calcutta Music Conference',
        audioDuration: '41:12',
        format: 'AIR Master Tape',
        tapeId: 'AIR-AMIR-58'
      }
    ],
    kinship: [
      {
        id: 'chandrakauns',
        name: 'Raag Chandrakauns',
        relationship: 'Shuddha Nishad Variant',
        swaras: 'S · g · M · d · N · Ṡ',
        keyDifference: 'Replaces Komal Ni with brilliant Shuddha Ni (N), giving a lighter, lunar luminescence to the sombre Malkauns architecture.',
        tempo: 'Late Night · Nocturnal'
      }
    ]
  },
  {
    id: 'ahir-bhairav',
    name: 'Raag Ahir Bhairav',
    devanagari: 'राग अहीर भैरव',
    tradition: 'Both',
    thaat: 'Bhairav',
    melakartaNumber: 16,
    melakartaName: 'Chakravakam',
    arohana: "S · r · G · M · P · D · n · Ṡ",
    avarohana: "Ṡ · n · D · P · M · G · r · S",
    pakad: "G · M · r · S — Ḍ · ṇ · S · r · G",
    chalan: "G · M · r · S — Ḍ · ṇ · S · r · G",
    vadi: 'Madhyam (M)',
    samvadi: 'Shadaj (S)',
    nyasa: 'Madhyam (M) & Rishabh (r)',
    time: 'Brahma Muhurta · 05:00 (Dawn)',
    praharNumber: 1,
    praharName: 'Dawn Prahar (04:00 - 07:00)',
    timeCategory: 'Morning',
    mood: ['Bhakti', 'Karuna', 'Devotion & Dawn'],
    primaryRasa: 'Devotion & Dawn',
    secondaryRasa: 'Spiritual Awakening',
    jati: 'Bhairav Thaat · Sampoorna-Sampoorna',
    centsDeviation: {
      swara: 'Komal Rishabh (r)',
      cents: 112,
      description: '-8 cents pure harmonic ratio 16/15'
    },
    acousticCurve: [10, 40, 95, 180, 290, 410, 490, 440, 330, 210, 110, 40, 0],
    description: 'A serene synthesis of Bhairav in the poorvanga (S r G M) and Kafi in the uttaranga (P D n Ṡ). Evokes the holy stillness of dawn on sacred river ghats.',
    story: 'Originated from the pastoral Ahir community who sang folk melodies in Northern and Western India, later elevated into high classical khayal by Maihar and Gwalior masters.',
    historicalContext: 'In Carnatic music, it corresponds directly to the 16th Melakarta Chakravakam. Its balance of ascetic restraint and warm compassion makes it universally revered.',
    archivalRef: '#RL-AB-0108',
    artMedium: 'Warm Watercolor Wash & Tanpura Outline on Natural Raw Canvas',
    artPalette: {
      primary: '#B6732B',
      secondary: '#E2BD8A',
      accent: '#6E421C',
      bgGradient: 'linear-gradient(135deg, #F7EFE1 0%, #ECD8B9 50%, #DCBD93 100%)'
    },
    swaraList: ['S', 'r', 'G', 'M', 'P', 'D', 'n'],
    recordings: [
      {
        id: 'rec-ab-01',
        title: 'Morning Symphony on Bansuri',
        artist: 'Pt. Hariprasad Chaurasia',
        gharana: 'Maihar Gharana',
        instrumentOrStyle: 'Bansuri (Bamboo Flute)',
        year: '1974 Archival Master',
        location: 'Varanasi Dhrupad Mela',
        audioDuration: '34:20',
        format: 'AIR Master Tape',
        tapeId: 'AIR-FLUTE-74'
      }
    ],
    kinship: [
      {
        id: 'bhairav',
        name: 'Raag Bhairav',
        relationship: 'Patriarch Morning Canon',
        swaras: 'S · r · G · M · P · d · N · Ṡ',
        keyDifference: 'Features Komal Dhaivat and Shuddha Nishad with heavy meditative oscillation (andolan) on Re and Dha.',
        tempo: 'Dawn · Austere'
      }
    ]
  },
  {
    id: 'kalyani',
    name: 'Mechakalyani (Kalyani)',
    devanagari: 'कल्याणी / மேசகல்யாணி',
    tradition: 'Carnatic',
    thaat: 'Kalyan counterpart',
    melakartaNumber: 65,
    melakartaName: 'Mechakalyani (65th Melakarta)',
    arohana: "S · R₂ · G₃ · M₂ · P · D₂ · N₃ · Ṡ",
    avarohana: "Ṡ · N₃ · D₂ · P · M₂ · G₃ · R₂ · S",
    pakad: "S · R₂ · G₃ · M₂ · P · D₂ · N₃ · Ṡ",
    chalan: "P · M₂ · G₃ · R₂ · S · Ṇ₃ · R₂ · G₃",
    vadi: 'Gandharam (G₃)',
    samvadi: 'Nishadam (N₃)',
    nyasa: 'Panchamam (P) & Gandharam (G₃)',
    time: 'Evening · Pradosham',
    praharNumber: 4,
    praharName: 'Evening Sandhiprakash',
    timeCategory: 'Evening',
    mood: ['Shringara', 'Bhakti', 'Auspiciousness'],
    primaryRasa: 'Mangala & Bhakti',
    secondaryRasa: 'Regal Splendour',
    jati: 'Sampoorna - Sampoorna',
    centsDeviation: {
      swara: 'Prati Madhyamam (M₂)',
      cents: 600,
      description: 'Luminous sharp fourth dominating the temple sanctum'
    },
    acousticCurve: [10, 45, 100, 190, 320, 460, 580, 520, 390, 260, 140, 50, 10],
    description: 'The monarch of Carnatic Melakartas. One of the greatest fundamental scales in South Indian classical music, evoking universal joy, grandeur, and divine grace.',
    story: 'Revered as the 65th Melakarta in Venkatamakhin’s scheme, Kalyani is an inexhaustible ocean of major kritis by Saint Tyagaraja, Muthuswami Dikshitar, and Syama Sastri.',
    historicalContext: 'Direct modal twin of Hindustani Yaman, yet articulated with distinct gamakas (kampita, nokku) rather than long unhurried meend glissandos.',
    archivalRef: '#RL-KL-0065',
    artMedium: 'Temple Gopuram Gold Dust & Vermilion on Palm Leaf Parchment',
    artPalette: {
      primary: '#9A3A26',
      secondary: '#E09278',
      accent: '#B08832',
      bgGradient: 'linear-gradient(135deg, #FDF3E7 0%, #F5DEC5 50%, #E3BA8C 100%)'
    },
    swaraList: ['S', 'R', 'G', 'M', 'P', 'D', 'N'],
    recordings: [
      {
        id: 'rec-kl-01',
        title: 'Kriti: "Birana Varalichi"',
        artist: 'M. S. Subbulakshmi',
        gharana: 'Carnatic Vocal Tradition',
        instrumentOrStyle: 'Vocal Kriti in Rupaka Tala',
        year: '1966 Live at UN General Assembly',
        location: 'New York UN Hall',
        audioDuration: '24:30',
        format: 'AIR Master Tape',
        tapeId: 'UN-MSS-66'
      }
    ]
  },
  {
    id: 'charukesi',
    name: 'Raag Charukesi',
    devanagari: 'चारुकेशी / சாருகேசி',
    tradition: 'Both',
    thaat: 'Asavari / Bilawal hybrid',
    melakartaNumber: 26,
    melakartaName: 'Charukesi (26th Melakarta)',
    arohana: "S · R · G · M · P · d · n · Ṡ",
    avarohana: "Ṡ · n · d · P · M · G · R · S",
    pakad: "M · P · d · n · d · P — G · M · R · S",
    chalan: "S · R · G · M · P · d · n · Ṡ",
    vadi: 'Madhyam (M)',
    samvadi: 'Shadaj (S)',
    nyasa: 'Pancham (P) & Gandhar (G)',
    time: '2nd Prahar · 11:00 (Mid-Day)',
    praharNumber: 2,
    praharName: 'Late Morning Prahar',
    timeCategory: 'Morning',
    mood: ['Karuna', 'Bhakti', 'Tender Longing'],
    primaryRasa: 'Karuna & Tenderness',
    secondaryRasa: 'Intimate Yearning',
    jati: 'Sampoorna - Sampoorna',
    centsDeviation: {
      swara: 'Komal Dhaivat (d)',
      cents: 800,
      description: 'Minor 6th transition from pure major Gandhar'
    },
    acousticCurve: [15, 50, 110, 200, 310, 440, 520, 470, 360, 230, 110, 30, 0],
    description: 'An emotionally captivating raga blending a brilliant major 3rd (Shuddha Gandhar) with a mournful minor 6th and 7th (Komal Dhaivat & Nishad).',
    story: 'Originally the 26th Melakarta in the Carnatic system, Charukesi was adopted into Hindustani music in the 20th century by maestros such as Pt. Ravi Shankar and Pt. Jasraj.',
    historicalContext: 'Its extraordinary emotional symmetry bridges classical austerity and instant romantic pathos, making it one of the most loved cross-tradition ragas.',
    archivalRef: '#RL-CK-0026',
    artMedium: 'Soft Indigo & Terra Cotta Watercolor on Natural Ivory Canvas',
    artPalette: {
      primary: '#3E5669',
      secondary: '#8DA6B8',
      accent: '#AC6644',
      bgGradient: 'linear-gradient(135deg, #EDF2F5 0%, #D3DFE6 50%, #AEC2CD 100%)'
    },
    swaraList: ['S', 'R', 'G', 'M', 'P', 'd', 'n'],
    recordings: [
      {
        id: 'rec-ck-01',
        title: 'Kriti: "Adamodi Galade"',
        artist: 'Dr. M. Balamuralikrishna',
        gharana: 'Carnatic Tradition',
        instrumentOrStyle: 'Vocal Kriti in Adi Tala',
        year: '1979 Chennai Music Academy',
        location: 'Madras Academy',
        audioDuration: '18:15',
        format: 'Live Reel Archive',
        tapeId: 'CMA-BMK-79'
      }
    ]
  }
];

export const MOCK_ARTISTS: Artist[] = [
  {
    id: 'amir-khan',
    name: 'Ustad Amir Khan',
    devanagari: 'उस्ताद अमीर ख़ान',
    years: '1912 – 1974',
    role: 'Vocalist · Founder of Indore Gharana',
    gharana: 'Indore Gharana',
    tradition: 'Hindustani',
    biography: 'One of the most influential and revered vocalists in Indian classical music. He pioneered the contemplative, ultra-slow Vilambit style (Ati Vilambit) and introduced Merukhand improvisation with supreme pitch precision.',
    keyRagas: ['Darbari Kanada', 'Malkauns', 'Marwa', 'Megh', 'Bairagi'],
    signatureStyle: 'Deep mandra-octave resonance, elimination of theatrical acrobatics, and pure unhurried meditation on each swara.',
    portraitArtwork: '/public/assets/aistudio/image_c298b7eb.png',
    recordingsCount: 142,
    lineageGeneration: 1
  },
  {
    id: 'bhimsen-joshi',
    name: 'Pt. Bhimsen Joshi',
    devanagari: 'पंडित भीमसेन जोशी',
    years: '1922 – 2011',
    role: 'Vocal Khayal Maestro · Bharat Ratna',
    gharana: 'Kirana Gharana',
    tradition: 'Hindustani',
    biography: 'Legendary doyen of the Kirana Gharana endowed with astonishing vocal stamina, emotional surrender, and thunderous gamak taans that transfixed generations of listeners worldwide.',
    keyRagas: ['Miyan Ki Todi', 'Shuddha Kalyan', 'Marwa', 'Puriya Dhanashree', 'Bhairavi'],
    signatureStyle: 'High-octave brilliance (prana-shakti), immense breath control, and intensely devotional bhava.',
    recordingsCount: 310,
    lineageGeneration: 3,
    mentor: 'Sawai Gandharva'
  },
  {
    id: 'nikhil-banerjee',
    name: 'Pt. Nikhil Banerjee',
    devanagari: 'पंडित निखिल बनर्जी',
    years: '1931 – 1986',
    role: 'Sitar Maestro',
    gharana: 'Maihar Gharana',
    tradition: 'Hindustani',
    biography: 'Disciple of Baba Allauddin Khan and Ustad Ali Akbar Khan. Celebrated for his introspective, deeply pure Gayaki Ang and electrifying sitar bols that avoided commercial showmanship.',
    keyRagas: ['Yaman', 'Darbari Kanada', 'Malkauns', 'Khamaj', 'Sohini'],
    signatureStyle: 'Sustained 5-fret meend glides, pristine intonation, and sublime nocturnal quietude.',
    recordingsCount: 98,
    lineageGeneration: 2,
    mentor: 'Baba Allauddin Khan'
  },
  {
    id: 'kishori-amonkar',
    name: 'Vidushi Kishori Amonkar',
    devanagari: 'विदुषी किशोरी आमोणकर',
    years: '1932 – 2017',
    role: 'Vocal Visionary · Padma Vibhushan',
    gharana: 'Jaipur-Atrauli Gharana',
    tradition: 'Hindustani',
    biography: 'Revolutionary aesthetic philosopher of Indian Classical Music who probed microtonal shrutis to their deepest emotional core, transcending rigid gharana dogmas.',
    keyRagas: ['Yaman', 'Bhoop', 'Jaunpuri', 'Bageshree', 'Bilaskhani Todi'],
    signatureStyle: 'Unmatched microtonal discernment, soulful meends, and deep exploration of Rasa theory.',
    recordingsCount: 165,
    lineageGeneration: 2,
    mentor: 'Mogubai Kurdikar'
  },
  {
    id: 'subbulakshmi',
    name: 'M. S. Subbulakshmi',
    devanagari: 'एम. एस. सुब्बुलक्ष्मी',
    years: '1916 – 2004',
    role: 'Carnatic Vocal Legend · Bharat Ratna',
    gharana: 'Carnatic Classical Tradition',
    tradition: 'Carnatic',
    biography: 'The foremost cultural ambassador of South Indian Classical Music. First Indian musician to perform at the UN General Assembly and recipient of India’s highest civilian honour.',
    keyRagas: ['Mechakalyani', 'Shankarabharanam', 'Charukesi', 'Bhairavi', 'Yamunakalayani'],
    signatureStyle: 'Purity of shruti alignment, supreme diction, and divine spiritual resonance.',
    recordingsCount: 420,
    lineageGeneration: 1
  }
];

export const MOCK_GHARANAS: GharanaLineage[] = [
  {
    id: 'kirana',
    name: 'Kirana Gharana',
    region: 'Western Uttar Pradesh / Miraj & Maharashtra',
    era: 'Late 19th Century to Present',
    founders: ['Ustad Abdul Karim Khan', 'Ustad Bande Ali Khan (Beenkar)'],
    pillars: [
      {
        title: '01 · Swara Shuddhata',
        description: 'Absolute pitch accuracy where microtones (shrutis) are held steady like polished crystals before moving to adjacent notes.'
      },
      {
        title: '02 · Badhat & Alap Pradhan',
        description: 'Note-by-note architectural ascent. Minutes are dedicated solely to resting on the Mandra Nishad and Rishabh in contemplative silence.'
      },
      {
        title: '03 · Vocal Meend & Glissando',
        description: 'Directly descended from Beenkar instrumental technique, the vocal connection between notes never breaks, curving gracefully in space.'
      },
      {
        title: '04 · Bhava (Emotional Surrender)',
        description: 'Prioritizes profound Karuna (pathos) and Shanta (tranquility) rasa above athletic displays of speed or rhythmic calculations.'
      }
    ],
    generations: [
      {
        generation: 'Generation I · Founders & Roots (19th Century)',
        masters: [
          {
            name: 'Ustad Bande Ali Khan',
            years: 'c. 1830 – 1895',
            role: 'Beenkar · Rudra Veena',
            notes: 'The source of the unbroken vocal meend and slow, contemplative swara elaboration rooted in Beenkar technique.',
            recordingsCount: 8
          },
          {
            name: 'Ustad Abdul Karim Khan',
            years: '1872 – 1937',
            role: 'Founder Patriarch · Vocal',
            notes: 'Formalized the emotional surrender (bhava) and micro-tonal precision of Komal Gandhar and Nishad.',
            recordingsCount: 34
          }
        ]
      },
      {
        generation: 'Generation II · Disciple Transmission',
        masters: [
          {
            name: 'Sawai Gandharva',
            years: '1886 – 1952',
            role: 'Direct Shishya',
            notes: 'Master mentor who transplanted North Indian Kirana vocalism to Karnataka and Maharashtra.',
            recordingsCount: 12
          },
          {
            name: 'Hirabai Barodekar',
            years: '1905 – 1989',
            role: 'Daughter & Disciple',
            notes: 'Pioneered public performance spaces for women classical vocalists.',
            recordingsCount: 28
          },
          {
            name: 'Roshan Ara Begum',
            years: '1917 – 1982',
            role: 'Direct Shishya',
            notes: 'Famed for blistering yet crystal-clear bol-taans and regal Darbari expositions.',
            recordingsCount: 19
          }
        ]
      },
      {
        generation: 'Generation III · The Modern Maestros',
        masters: [
          {
            name: 'Pt. Bhimsen Joshi',
            years: '1922 – 2011 · Bharat Ratna',
            role: 'Master Vocalist',
            notes: 'Unrivaled breath control (prana-shakti), immense tonal power, and ecstatic devotional surrender.',
            recordingsCount: 86
          },
          {
            name: 'Gangubai Hangal',
            years: '1913 – 2009 · Hubli',
            notes: 'Resolute, deep chest-register delivery preserving ancient Kirana purity.',
            role: 'Doyen of Kirana',
            recordingsCount: 42
          },
          {
            name: 'Dr. Prabha Atre',
            years: '1932 – 2024 · Pune',
            notes: 'Sculpted modern Kirana through musicological brilliance and delicate ornamentation.',
            role: 'Scholar & Vocalist',
            recordingsCount: 38
          }
        ]
      }
    ],
    fieldRecordQuote: {
      year: '1934',
      quote: 'To sing Kirana is to stand inside the swara until the world outside dissolves. There is no haste, no vanity; only the continuous prayer of sound.',
      author: 'Ustad Abdul Karim Khan (Miraj Notes)'
    }
  }
];

export const MOCK_MANUSCRIPTS: Manuscript[] = [
  {
    id: 'sangeeta-ratnakara',
    title: 'Sangeeta Ratnakara Manuscript',
    period: 'c. 1210 – 1247 CE',
    author: 'Sarangadeva',
    language: 'Sanskrit · Sharada Script',
    archiveLocation: 'Oriental Research Institute · Folio 48, Adhyaya II',
    description: 'Penned at the court of King Singhana II of the Yadava dynasty, establishing the foundational modal theory of 22 microtones (Shrutis), 7 fundamental swaras, and ancient Grama-Murchhana scales.',
    folioReference: 'FOLIO 48 · ADHYAYA II',
    scanAvailable: true
  },
  {
    id: 'ragamala-darbari',
    title: 'Ragamala: Raag Darbari Kanada',
    period: 'Contemporary Impasto on Linen Interpretation',
    author: 'RagaLens Curated Collection',
    language: 'Visual Symbology · Pigment & Charcoal',
    archiveLocation: 'Exhibition Plate XIX · Archival Series',
    description: 'Capturing the nocturnal gravity, stately weight, and undulating komal andolans of Darbari through layered pigments of charcoal, umber, and imperial violet.',
    folioReference: 'PLATE XIX · EXHIBITION PLATE',
    scanAvailable: true
  },
  {
    id: 'bhatkhande-notebook',
    title: 'Bhatkhande Field Notebook',
    period: 'c. 1910 – 1918 CE',
    author: 'Pt. Vishnu Narayan Bhatkhande',
    language: 'Marathi & Hindi · Bhatkhande Notation',
    archiveLocation: 'National Centre for the Performing Arts · Vol. IV',
    description: 'The seminal field ledger documenting the first standardized classification of the 10 Thaat modal framework directly from ustads of Rampur and Gwalior.',
    folioReference: 'GWALIOR NOTEBOOK · VOL IV',
    scanAvailable: true
  }
];

export const MOCK_TAALS: Taal[] = [
  {
    id: 'teentaal',
    name: 'Teentaal',
    beats: 16,
    vibhaags: 4,
    sam: 1,
    khali: 9,
    vibhaag_starts: [1, 5, 9, 13],
    bols: "Dha Dhin Dhin Dha | Dha Dhin Dhin Dha | Dha Tin Tin Ta | Ta Dhin Dhin Dha",
    bolList: ["Dha", "Dhin", "Dhin", "Dha", "Dha", "Dhin", "Dhin", "Dha", "Dha", "Tin", "Tin", "Ta", "Ta", "Dhin", "Dhin", "Dha"],
    tempo_range: { vilambit: "30-60 bpm", madhya: "60-120 bpm", drut: "120-180 bpm" },
    description: "The undisputed king of Hindustani rhythm cycles, symmetrical 4+4+4+4 structure."
  },
  {
    id: 'jhaptal',
    name: 'Jhaptal',
    beats: 10,
    vibhaags: 4,
    sam: 1,
    khali: 6,
    vibhaag_starts: [1, 3, 6, 8],
    bols: "Dhi Na | Dhi Dhi Na | Ti Na | Dhi Dhi Na",
    bolList: ["Dhi", "Na", "Dhi", "Dhi", "Na", "Ti", "Na", "Dhi", "Dhi", "Na"],
    tempo_range: { vilambit: "25-50 bpm", madhya: "50-100 bpm", drut: "100-150 bpm" },
    description: "Asymmetrical 2+3+2+3 structure, graceful and introspective."
  },
  {
    id: 'ektaal',
    name: 'Ektaal',
    beats: 12,
    vibhaags: 6,
    sam: 1,
    khali: [3, 7],
    vibhaag_starts: [1, 3, 5, 7, 9, 11],
    bols: "Dhin Dhin | Dha Ge | Tir Kit | Tu Na | Kat Ta | Dha Ge | Tir Kit | Dhi Na",
    bolList: ["Dhin", "Dhin", "Dha", "Ge", "Tir", "Kit", "Tu", "Na", "Kat", "Ta", "Dha", "Ge"],
    tempo_range: { vilambit: "10-40 bpm", madhya: "40-80 bpm", drut: "80-160 bpm" },
    description: "Traditional 12-beat cycle for grand Vilambit Khayal and Drut bandishes."
  },
  {
    id: 'adi-tala',
    name: 'Adi Tala (Carnatic)',
    beats: 8,
    vibhaags: 3,
    sam: 1,
    khali: 5,
    vibhaag_starts: [1, 5, 7],
    bols: "Laghu (4) + Dhrutam (2) + Dhrutam (2)",
    bolList: ["Tha", "Ka", "Dhi", "Mi", "Tha", "Ka", "Jhu", "Nu"],
    tempo_range: { vilambit: "40-70 bpm", madhya: "70-120 bpm", drut: "120-180 bpm" },
    description: "The primary rhythmic cycle of Carnatic music (Chaturasra Jati Triputa Tala), 8 beats."
  }
];
