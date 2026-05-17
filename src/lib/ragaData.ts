export interface Raga {
  id: string;
  name: string;
  thaat: string;
  arohana: string;
  avarohana: string;
  pakad: string;
  vadi: string;
  samvadi: string;
  time: string;
  mood: string[];
  jati: string;
  confidence?: number;
  description?: string;
  image?: string;
}

export const MOCK_RAGAS: Raga[] = [
  {
    id: 'yaman',
    name: 'Yaman',
    thaat: 'Kalyan',
    arohana: 'N R G M̃ D N Ṡ',
    avarohana: 'Ṡ N D M̃ G R S',
    pakad: 'N R G M̃ D — M̃ G R S',
    vadi: 'Gandhar (G)',
    samvadi: 'Nishad (N)',
    time: 'First Prahar of Night (7pm–10pm)',
    mood: ['Shringar', 'Shant'],
    jati: 'Sampurna-Sampurna',
    confidence: 92.4,
    description: 'A deeply romantic and peaceful raga, typically performed at nightfall.'
  },
  {
    id: 'bhairav',
    name: 'Bhairav',
    thaat: 'Bhairav',
    arohana: 'S r G M P d N Ṡ',
    avarohana: 'Ṡ N d P M G r S',
    pakad: 'G r S — d P M G r S',
    vadi: 'Dhaivat (d)',
    samvadi: 'Rishabh (r)',
    time: 'Early morning (5am–8am)',
    mood: ['Bhakti', 'Shant', 'Karuna'],
    jati: 'Sampurna-Sampurna',
    confidence: 88.7,
    description: 'A majestic and solemn raga associated with Lord Shiva and dawn.'
  },
  {
    id: 'bhairavi',
    name: 'Bhairavi',
    thaat: 'Bhairavi',
    arohana: 'S r g M P d n Ṡ',
    avarohana: 'Ṡ n d P M g r S',
    pakad: 'g r S — n d P M g r S',
    vadi: 'Madhyam (M)',
    samvadi: 'Shadaj (S)',
    time: 'Early morning, also farewell raga',
    mood: ['Karuna', 'Shant', 'Shringar'],
    jati: 'Sampurna-Sampurna',
    confidence: 85.2,
    description: 'A versatile and emotionally rich raga often played as the concluding piece of a concert.'
  }
];

export interface Taal {
  id: string;
  name: string;
  beats: number;
  vibhaags: number;
  sam: number;
  khali: number | number[];
  vibhaag_starts: number[];
  bols: string;
  tempo_range: {
    vilambit: string;
    madhya: string;
    drut: string;
  };
}

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
    tempo_range: { vilambit: "30-60 bpm", madhya: "60-120 bpm", drut: "120-180 bpm" }
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
    tempo_range: { vilambit: "10-40 bpm", madhya: "40-80 bpm", drut: "80-160 bpm" }
  }
];
