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

  // Continuous Tanpura Drone Synthesis
  public startTanpura(firstString: 'Pa' | 'Ma' | 'Ni' = 'Pa', rootFreq: number = 138.59, onTick?: (stringIdx: number) => void) {
    this.initContext();
    if (this.isTanpuraPlaying) this.stopTanpura();

    this.isTanpuraPlaying = true;
    let step = 0;

    const pluckPattern = [
      firstString === 'Pa' ? 'P.' : (firstString === 'Ma' ? 'M.' : 'N.'),
      'S',
      'S',
      '.S'
    ];

    const pluck = () => {
      if (!this.isTanpuraPlaying) return;
      const swara = pluckPattern[step % 4];
      this.playTanpuraString(swara, rootFreq);
      if (onTick) onTick(step % 4);
      step++;
    };

    pluck();
    this.tanpuraInterval = window.setInterval(pluck, 1100);
  }

  private playTanpuraString(swara: string, rootFreq: number) {
    if (!this.ctx || !this.masterGain) return;
    const freq = this.getFrequency(swara, rootFreq);
    const now = this.ctx.currentTime;
    const duration = 3.5;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 3, now);
    filter.Q.setValueAtTime(3, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
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

  // Play acoustic Tabla Bol
  public playTablaBol(bol: string) {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const b = bol.toLowerCase().trim();

      if (b.includes('dha') || b.includes('dhin')) {
        this.playBayan(75, 0.4);
        this.playDayan(280, 0.25);
      } else if (b.includes('ge') || b.includes('ga') || b.includes('kat')) {
        this.playBayan(65, 0.35);
      } else if (b.includes('tin') || b.includes('ta') || b.includes('na') || b.includes('ti')) {
        this.playDayan(320, 0.3);
      } else {
        this.playDayan(250, 0.2);
      }
    } catch (e) {
      console.warn('Tabla bol error:', e);
    }
  }

  private playBayan(freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq + 20, now);
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.1);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + duration);
  }

  private playDayan(freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + duration);
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
