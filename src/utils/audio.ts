/**
 * Web Audio API synthesizer for peaceful, hospital-safe ambient sounds and cues.
 * Completely self-contained, lightweight, zero external network dependency.
 */

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientSource: AudioNode | null = null;
  private ambientGain: GainNode | null = null;

  constructor() {
    // Check saved mute state
    const saved = localStorage.getItem('huv_sound_muted');
    if (saved !== null) {
      this.isMuted = saved === 'true';
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('huv_sound_muted', String(this.isMuted));
    if (this.isMuted) {
      this.stopAmbient();
    }
    return this.isMuted;
  }

  /**
   * Plays a warm, gentle meditative bell chime (432Hz harmonic tone)
   */
  public playBowlChime(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const frequencies = [432, 864, 1296];
    const gains = [0.22, 0.08, 0.03];

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(gains[idx], now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.6);
    });
  }

  /**
   * Plays a celebratory gentle completion triad chime (C-E-G warm harmony)
   */
  public playCompletionChime(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const startTime = ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteStart = startTime + index * 0.12;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteStart);

      gain.gain.setValueAtTime(0, noteStart);
      gain.gain.linearRampToValueAtTime(0.15, noteStart + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteStart);
      osc.stop(noteStart + 1.9);
    });
  }

  /**
   * Subtle tick/drop sound for step transitions
   */
  public playStepTick(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  /**
   * Generates continuous soothing soft breeze / pink noise ambient
   */
  public startAmbientBreeze(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    this.stopAmbient();

    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to soft soothing low frequencies
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.04, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start();
    this.ambientSource = whiteNoise;
    this.ambientGain = gainNode;
  }

  public stopAmbient(): void {
    if (this.ambientSource) {
      try {
        (this.ambientSource as AudioBufferSourceNode).stop();
        this.ambientSource.disconnect();
      } catch {
        // already stopped
      }
      this.ambientSource = null;
    }
  }
}

export const soundService = new SoundSynthesizer();
