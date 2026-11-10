// Web Audio API Synthesizer and Pitch Extraction Engine for Indian Classical Music

class IndianAudioEngine {
  private ctx: AudioContext | null = null;
  private tanpuraInterval: number | null = null;
  private isTanpuraPlaying = false;
  private masterGain: GainNode | null = null;
  private micStream: MediaStream | null = null;
  private micSource: MediaStreamAudioSourceNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPitchDetecting = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Base frequencies for standard tonic (Sa at C# / 138.59 Hz or D / 146.83 Hz or 240.0 Hz)
  public getFrequency(swara: string, rootFreq: number = 138.59): number {
    const clean = swara.trim().replace(/['\.]/g, '');
    const isHighOctave = swara.includes("'") || swara.includes("Ṡ") || swara.includes("S'");
    const isLowOctave = swara.startsWith(".") || swara.endsWith(".");

    let multiplier = 1.0;

    switch (clean.toUpperCase()) {
      case 'S':
      case 'SA':
        multiplier = 1.0;
        break;
      case 'R':
        multiplier = (swara === 'r' || swara.includes('komal') || swara.includes('b2')) ? 16 / 15 : 9 / 8;
        break;
      case 'G':
        multiplier = (swara === 'g' || swara.includes('komal') || swara.includes('b3')) ? 6 / 5 : 5 / 4;
        break;
      case 'M':
      case 'M̃':
        multiplier = (swara === "M'" || swara === 'M̃' || swara === 'm' || swara.includes('tivra') || swara.includes('#4')) ? 45 / 32 : 4 / 3;
        break;
      case 'P':
      case 'PA':
        multiplier = 3 / 2;
        break;
      case 'D':
        multiplier = (swara === 'd' || swara.includes('komal') || swara.includes('b6')) ? 8 / 5 : 5 / 3;
        break;
      case 'N':
        multiplier = (swara === 'n' || swara.includes('komal') || swara.includes('b7')) ? 9 / 5 : 15 / 8;
        break;
      default:
        multiplier = 1.0;
    }

    let freq = rootFreq * multiplier;
    if (isHighOctave) freq *= 2;
    if (isLowOctave) freq /= 2;
    return freq;
  }

  // Play a single resonant Swara
  public playSwara(swara: string, duration: number = 1.4, rootFreq: number = 138.59) {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const freq = this.getFrequency(swara, rootFreq);
      const now = this.ctx.currentTime;

      // Rich harmonic synthesis
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const osc3 = this.ctx.createOscillator();

      const gain = this.ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);

      osc3.type = 'sawtooth';
      osc3.frequency.setValueAtTime(freq * 3, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.frequency.exponentialRampToValueAtTime(400, now + duration);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      osc1.stop(now + duration);
      osc2.stop(now + duration);
      osc3.stop(now + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Continuous Tanpura Drone Synthesis with Dual Tanpura support and fine tuning
  public startTanpura(
    firstString: 'Pa' | 'Ma' | 'Ni' = 'Pa',
    rootFreq: number = 138.59,
    fineCents: number = 0,
    dualTanpura: boolean = false,
    onTick?: (stringIdx: number) => void
  ) {
    this.initContext();
    if (this.isTanpuraPlaying) this.stopTanpura();

    this.isTanpuraPlaying = true;
    let step = 0;

    const tunedRoot = rootFreq * Math.pow(2, fineCents / 1200);

    const pluckPattern = [
      firstString === 'Pa' ? 'P.' : (firstString === 'Ma' ? 'M.' : 'N.'),
      'S',
      'S',
      '.S'
    ];

    const pluck = () => {
      if (!this.isTanpuraPlaying) return;
      const swara = pluckPattern[step % 4];
      this.playTanpuraString(swara, tunedRoot);
      if (dualTanpura) {
        // Tanpura 2 plucks with slight acoustic offset and +2 cents jawari detune
        setTimeout(() => {
          if (this.isTanpuraPlaying) {
            this.playTanpuraString(swara, tunedRoot * Math.pow(2, 2.5 / 1200), 0.7);
          }
        }, 220);
      }
      if (onTick) onTick(step % 4);
      step++;
    };

    pluck();
    this.tanpuraInterval = window.setInterval(pluck, 1100);
  }

  private playTanpuraString(swara: string, rootFreq: number, volumeFactor: number = 1.0) {
    if (!this.ctx || !this.masterGain) return;
    const freq = this.getFrequency(swara, rootFreq);
    const now = this.ctx.currentTime;
    const duration = 3.8;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const osc3 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.001, now);

    // Subtle jawari shimmer overtone
    osc3.type = 'sawtooth';
    osc3.frequency.setValueAtTime(freq * 3.003, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 3.2, now);
    filter.Q.setValueAtTime(2.8, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12 * volumeFactor, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0004, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
    osc3.stop(now + duration);
  }

  public stopTanpura() {
    this.isTanpuraPlaying = false;
    if (this.tanpuraInterval !== null) {
      clearInterval(this.tanpuraInterval);
      this.tanpuraInterval = null;
    }
  }

  public isTanpuraActive(): boolean {
    return this.isTanpuraPlaying;
  }

  // --- Harmonium Reed Synthesis (Additive Multi-Reed with Bellows Dynamics) ---
  public playHarmoniumNote(swara: string, duration: number = 0.8, rootFreq: number = 138.59, bellowsIntensity: number = 0.8) {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const freq = this.getFrequency(swara, rootFreq);
      const now = this.ctx.currentTime;

      // 8-foot fundamental reed + 4-foot octave reed with 1.2Hz detune beat
      const reedMale = this.ctx.createOscillator();
      const reedFemale = this.ctx.createOscillator();
      const reedSub = this.ctx.createOscillator();

      reedMale.type = 'sawtooth';
      reedMale.frequency.setValueAtTime(freq, now);

      reedFemale.type = 'sawtooth';
      reedFemale.frequency.setValueAtTime(freq * 2 + 1.2, now);

      reedSub.type = 'triangle';
      reedSub.frequency.setValueAtTime(freq, now);

      // Acoustic reed cavity formant filter (box wood resonance)
      const formant = this.ctx.createBiquadFilter();
      formant.type = 'bandpass';
      formant.frequency.setValueAtTime(780, now);
      formant.Q.setValueAtTime(1.8, now);

      const gain = this.ctx.createGain();
      const targetGain = 0.22 * bellowsIntensity;

      // Bellows attack envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(targetGain, now + 0.06);
      gain.gain.setValueAtTime(targetGain * 0.9, now + duration * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      reedMale.connect(formant);
      reedFemale.connect(formant);
      reedSub.connect(gain);
      formant.connect(gain);
      gain.connect(this.masterGain);

      reedMale.start(now);
      reedFemale.start(now);
      reedSub.start(now);

      reedMale.stop(now + duration);
      reedFemale.stop(now + duration);
      reedSub.stop(now + duration);
    } catch (e) {
      console.warn('Harmonium note error:', e);
    }
  }

  // --- Swarmandal Harp Strum (Raga Glissando Sweep) ---
  public async strumSwarmandal(
    swaras: string[] = ['S', 'R', 'G', "M'", 'P', 'D', 'N', "S'"],
    rootFreq: number = 138.59,
    direction: 'up' | 'down' = 'up'
  ) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const notes = direction === 'up' ? [...swaras] : [...swaras].reverse();
    const delayStep = 0.055; // fast finger glissando sweep

    notes.forEach((swara, idx) => {
      setTimeout(() => {
        if (!this.ctx || !this.masterGain) return;
        const now = this.ctx.currentTime;
        const freq = this.getFrequency(swara, rootFreq);
        const duration = 2.4;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3200, now);
        filter.frequency.exponentialRampToValueAtTime(600, now + duration);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + duration);
      }, idx * delayStep * 1000);
    });
  }

  // --- Lehra / Nagma Continuous Melodic Cycle for Riyaz ---
  private lehraInterval: number | null = null;
  private isLehraPlaying = false;

  public startLehra(
    taalId: string = 'teentaal',
    ragaId: string = 'yaman',
    bpm: number = 80,
    rootFreq: number = 138.59,
    onBeat?: (matra: number, note: string) => void
  ) {
    this.initContext();
    if (this.isLehraPlaying) this.stopLehra();

    this.isLehraPlaying = true;

    // Authentic Hindustani nagma phrase tables
    const nagmaScores: Record<string, Record<string, string[]>> = {
      teentaal: {
        yaman: ['N.', 'R', 'G', "M'", 'P', 'D', 'N', "S'", "S'", 'N', 'D', 'P', "M'", 'G', 'R', 'S'],
        bhairav: ['S', 'r', 'G', 'M', 'P', 'd', 'N', "S'", "S'", 'N', 'd', 'P', 'M', 'G', 'r', 'S'],
        kafi: ['S', 'R', 'g', 'M', 'P', 'D', 'n', "S'", "S'", 'n', 'D', 'P', 'M', 'g', 'R', 'S']
      },
      jhaptal: {
        yaman: ['N.', 'R', 'G', "M'", 'P', 'D', 'N', "S'", 'D', 'P'],
        bhairav: ['S', 'r', 'G', 'M', 'P', 'd', 'N', "S'", 'd', 'P'],
        kafi: ['S', 'R', 'g', 'M', 'P', 'D', 'n', "S'", 'D', 'P']
      },
      rupak: {
        yaman: ['G', "M'", 'P', 'D', 'N', 'D', 'P'],
        bhairav: ['G', 'M', 'P', 'd', 'N', 'd', 'P'],
        kafi: ['g', 'M', 'P', 'D', 'n', 'D', 'P']
      },
      ektaal: {
        yaman: ['N.', 'R', 'G', "M'", 'P', 'D', 'N', "S'", 'N', 'D', 'P', "M'"],
        bhairav: ['S', 'r', 'G', 'M', 'P', 'd', 'N', "S'", 'N', 'd', 'P', 'M'],
        kafi: ['S', 'R', 'g', 'M', 'P', 'D', 'n', "S'", 'n', 'D', 'P', 'M']
      }
    };

    const taalScore = nagmaScores[taalId] || nagmaScores['teentaal'];
    const phrase = taalScore[ragaId] || taalScore['yaman'] || taalScore[Object.keys(taalScore)[0]];

    let currentMatraIndex = 0;
    const stepMs = (60 / bpm) * 1000;

    const playStep = () => {
      if (!this.isLehraPlaying) return;
      const note = phrase[currentMatraIndex % phrase.length];
      this.playHarmoniumNote(note, stepMs / 1000 * 0.95, rootFreq, 0.75);
      if (onBeat) onBeat((currentMatraIndex % phrase.length) + 1, note);
      currentMatraIndex++;
    };

    playStep();
    this.lehraInterval = window.setInterval(playStep, stepMs);
  }

  public stopLehra() {
    this.isLehraPlaying = false;
    if (this.lehraInterval !== null) {
      clearInterval(this.lehraInterval);
      this.lehraInterval = null;
    }
  }

  public isLehraActive(): boolean {
    return this.isLehraPlaying;
  }

  // --- Physical-Modelled Tabla Engine (Dayan & Bayan) ---
  public playTablaBol(bol: string) {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const b = bol.toLowerCase().trim();

      if (b === 'dha') {
        // Simultaneous resonant Dayan + Bayan
        this.playDayan(280, 0.28, true);
        this.playBayan(75, 0.45, true);
      } else if (b === 'dhin') {
        // Sustained ringing Dayan + Bayan modulation
        this.playDayan(280, 0.35, true);
        this.playBayan(85, 0.5, true);
      } else if (b === 'ge' || b === 'ga') {
        // Resonant deep Bayan bass modulation with pitch glide
        this.playBayan(70, 0.45, true);
      } else if (b === 'kat' || b === 'ke') {
        // Flat muted closed Bayan slap
        this.playBayan(110, 0.08, false);
      } else if (b === 'tin' || b === 'ti') {
        // Open resonant Dayan strike on sur
        this.playDayan(310, 0.32, true);
      } else if (b === 'ta' || b === 'na') {
        // Crisp metallic rim strike on kinar
        this.playDayan(340, 0.24, true);
      } else if (b === 'tu') {
        // Open center stroke on Dayan
        this.playDayan(240, 0.35, true);
      } else {
        // Generic articulation (tit, trik, etc.)
        this.playDayan(260, 0.12, false);
      }
    } catch (e) {
      console.warn('Tabla bol error:', e);
    }
  }

  private playBayan(freq: number, duration: number, isResonant: boolean = true) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    if (isResonant) {
      // Characteristic bayan upward/downward bend
      osc.frequency.setValueAtTime(freq + 25, now);
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.12);
    } else {
      osc.frequency.setValueAtTime(freq, now);
    }

    gain.gain.setValueAtTime(isResonant ? 0.42 : 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + duration);
  }

  private playDayan(freq: number, duration: number, isResonant: boolean = true) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.01, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = isResonant ? 'bandpass' : 'lowpass';
    filter.frequency.setValueAtTime(freq, now);
    filter.Q.setValueAtTime(isResonant ? 6.0 : 1.5, now);

    gain.gain.setValueAtTime(0.38, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  // --- Real-time Pitch Detection Engine (Autocorrelation) ---
  public async startPitchDetection(
    rootFreq: number = 240.0,
    onPitch: (f0: number, cents: number, nearestSwara: string) => void
  ): Promise<() => void> {
    this.initContext();
    if (!this.ctx) return () => {};

    try {
      this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.micSource = this.ctx.createMediaStreamSource(this.micStream);
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 2048;

      this.micSource.connect(this.analyser);
      this.isPitchDetecting = true;

      const buffer = new Float32Array(this.analyser.fftSize);

      const detectLoop = () => {
        if (!this.isPitchDetecting || !this.analyser || !this.ctx) return;

        this.analyser.getFloatTimeDomainData(buffer);
        const f0 = this.autoCorrelate(buffer, this.ctx.sampleRate);

        if (f0 > 60 && f0 < 1200) {
          // Normalize to octave above root
          let normalized = f0;
          while (normalized < rootFreq * 0.95) normalized *= 2;
          while (normalized > rootFreq * 1.95) normalized /= 2;

          const ratio = normalized / rootFreq;
          const cents = Math.round(1200 * Math.log2(ratio));
          const nearestSwara = this.centsToSwara(cents);

          onPitch(Math.round(f0 * 10) / 10, cents, nearestSwara);
        }

        requestAnimationFrame(detectLoop);
      };

      detectLoop();

      return () => {
        this.isPitchDetecting = false;
        if (this.micStream) {
          this.micStream.getTracks().forEach(t => t.stop());
          this.micStream = null;
        }
      };
    } catch (err) {
      console.warn("Microphone not available, using synthetic monitor:", err);
      return () => {};
    }
  }

  private autoCorrelate(buffer: Float32Array, sampleRate: number): number {
    let SIZE = buffer.length;
    let rms = 0;

    for (let i = 0; i < SIZE; i++) {
      const val = buffer[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return -1; // Too quiet

    let r1 = 0, r2 = SIZE - 1, thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buffer[i]) < thres) { r1 = i; break; }
    }
    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buffer[SIZE - i]) < thres) { r2 = SIZE - i; break; }
    }

    const trimmed = buffer.slice(r1, r2);
    SIZE = trimmed.length;

    const c = new Float32Array(SIZE);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] = c[i] + trimmed[j] * trimmed[j + i];
      }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;
    for (let i = d; i < SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }

    let T0 = maxpos;
    if (T0 === -1) return -1;

    return sampleRate / T0;
  }

  private centsToSwara(cents: number): string {
    const swarasByCents = [
      { name: 'S', cents: 0 },
      { name: 'r', cents: 112 },
      { name: 'R', cents: 204 },
      { name: 'g', cents: 316 },
      { name: 'G', cents: 386 },
      { name: 'M', cents: 498 },
      { name: "M'", cents: 590 },
      { name: 'P', cents: 702 },
      { name: 'd', cents: 814 },
      { name: 'D', cents: 884 },
      { name: 'n', cents: 1018 },
      { name: 'N', cents: 1088 },
      { name: "S'", cents: 1200 }
    ];

    let closest = swarasByCents[0];
    let minDiff = Math.abs(cents - closest.cents);

    for (const sw of swarasByCents) {
      const diff = Math.abs(cents - sw.cents);
      if (diff < minDiff) {
        minDiff = diff;
        closest = sw;
      }
    }
    return closest.name;
  }
}

export const audioEngine = new IndianAudioEngine();
