/**
 * OLYTHOS - Ancient Sanctuary Ambient Soundscape
 * Real-time synthesis of Mediterranean sea-breeze, temple bell resonances, and Dorian lyre tones.
 */

class SanctuaryAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.windNode = null;
    this.gainMaster = null;
    this.lyreTimer = null;
    this.scale = [220, 247.5, 261.63, 293.66, 329.63, 349.23, 392.0]; // Ancient Dorian Mode (A B C D E F G)
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.gainMaster = this.ctx.createGain();
      this.gainMaster.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.gainMaster.connect(this.ctx.destination);
    }
  }

  toggle() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Mediterranean Breeze Wind Generator (Pink/Brown noise filter)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
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
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Lowpass filter modulating like wind gust through columns
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    // LFO for gentle wind oscillation
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // 8-second cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(220, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(windGain);
    windGain.connect(this.gainMaster);

    whiteNoise.start();
    lfo.start();
    this.windNode = { whiteNoise, lfo, windGain };

    // Gentle Dorian Lyre notes at calm intervals
    this.scheduleLyreNotes();
    this.playTempleBowlChime(440);
  }

  scheduleLyreNotes() {
    if (!this.isPlaying) return;
    const interval = 3500 + Math.random() * 4000;
    this.lyreTimer = setTimeout(() => {
      if (this.isPlaying) {
        this.playPluckedLyre();
        this.scheduleLyreNotes();
      }
    }, interval);
  }

  playPluckedLyre() {
    if (!this.ctx || !this.isPlaying) return;
    const note = this.scale[Math.floor(Math.random() * this.scale.length)];
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(note, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    osc.connect(gain);
    gain.connect(this.gainMaster);

    osc.start(now);
    osc.stop(now + 3);
  }

  playTempleBowlChime(freq = 528) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

    osc.connect(gain);
    gain.connect(this.gainMaster);

    osc.start(now);
    osc.stop(now + 4);
  }

  stop() {
    this.isPlaying = false;
    if (this.windNode) {
      try {
        this.windNode.whiteNoise.stop();
        this.windNode.lfo.stop();
      } catch (e) {}
      this.windNode = null;
    }
    if (this.lyreTimer) {
      clearTimeout(this.lyreTimer);
      this.lyreTimer = null;
    }
  }
}

window.sanctuaryAudio = new SanctuaryAudioEngine();
