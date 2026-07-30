// Procedurally synthesized sound via the Web Audio API — no external audio
// files exist in this project, so rain, thunder, clicks, and the dialogue
// typewriter tick are all generated on the fly. Keeps the game self-contained
// and avoids sourcing licensed audio.

let ctx = null;
let masterGain = null;
let rainSource = null;
let rainExtraNodes = [];
let thunderTimer = null;
let muted = false;

function ensureContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.gain.value = muted ? 0 : 0.5;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function makeNoiseBuffer(seconds) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

// Flat white noise reads as radio static — real rain (and wind, surf, etc.)
// has a spectrum weighted toward lower frequencies. This is the standard
// Paul Kellet "refined" pink-noise filter: cheap, and enough to make broadband
// noise sound like a natural wash instead of hiss even before any filtering.
function makePinkNoiseBuffer(seconds) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    b6 = white * 0.115926;
    data[i] = pink * 0.11;
  }
  return buffer;
}

export function setMuted(value) {
  muted = value;
  if (masterGain) masterGain.gain.value = muted ? 0 : 0.5;
}

export function isMuted() {
  return muted;
}

export function playClick() {
  if (!ctx) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(720, t);
  osc.frequency.exponentialRampToValueAtTime(320, t + 0.05);
  gain.gain.setValueAtTime(0.18, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
  osc.connect(gain).connect(masterGain);
  osc.start(t);
  osc.stop(t + 0.07);
}

export function playTypeTick() {
  if (!ctx) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(1300 + Math.random() * 250, t);
  gain.gain.setValueAtTime(0.035, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.02);
  osc.connect(gain).connect(masterGain);
  osc.start(t);
  osc.stop(t + 0.025);
}

export function playWinSting() {
  if (!ctx) return;
  const t = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6 — a simple major arpeggio
  notes.forEach((freq, i) => {
    const start = t + i * 0.11;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.22, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);
    osc.connect(gain).connect(masterGain);
    osc.start(start);
    osc.stop(start + 0.55);
  });
}

export function playLoseSting() {
  if (!ctx) return;
  const t = ctx.currentTime;
  const notes = [311.13, 293.66, 261.63]; // Eb4 D4 C4 — a slow, deflating descent
  notes.forEach((freq, i) => {
    const start = t + i * 0.22;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.16, start + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.7);
    osc.connect(gain).connect(masterGain);
    osc.start(start);
    osc.stop(start + 0.75);
  });
}

function playThunder() {
  const t = ctx.currentTime;

  // Sharp initial crack — a brief, only lightly filtered noise burst — so
  // there's a real transient up front, not just a soft rumble swelling in.
  const crack = ctx.createBufferSource();
  crack.buffer = makeNoiseBuffer(0.4);
  const crackFilter = ctx.createBiquadFilter();
  crackFilter.type = 'lowpass';
  crackFilter.frequency.value = 1000;
  const crackGain = ctx.createGain();
  crackGain.gain.setValueAtTime(0.0001, t);
  crackGain.gain.exponentialRampToValueAtTime(0.32, t + 0.015);
  crackGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
  crack.connect(crackFilter).connect(crackGain).connect(masterGain);
  crack.start(t);
  crack.stop(t + 0.35);

  // Rolling low-frequency rumble that follows the crack and decays slowly.
  const src = ctx.createBufferSource();
  src.buffer = makeNoiseBuffer(2.2);

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.setValueAtTime(140, t + 0.1);
  lowpass.frequency.linearRampToValueAtTime(55, t + 2.2);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.22, t + 0.25);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);

  src.connect(lowpass).connect(gain).connect(masterGain);
  src.start(t);
  src.stop(t + 2.3);
}

// First clap lands soon after the rain starts (so it's not a coin-flip
// whether a short playtest ever hears one); later claps space out further,
// like a storm settling in rather than a drum machine.
function scheduleThunder(isFirst) {
  const delay = isFirst ? 2500 + Math.random() * 2500 : 9000 + Math.random() * 16000;
  thunderTimer = setTimeout(() => {
    if (!rainSource) return; // ambience was stopped
    playThunder();
    scheduleThunder(false);
  }, delay);
}

export function startRainAmbience() {
  ensureContext();
  if (rainSource) return;

  // Body: pink noise (naturally weighted toward lows, unlike flat white
  // noise) through a gentle lowpass, with the cutoff drifting slowly via an
  // LFO so it reads as a moving wash of rain rather than a static tone.
  const body = ctx.createBufferSource();
  body.buffer = makePinkNoiseBuffer(4);
  body.loop = true;

  const bodyLowpass = ctx.createBiquadFilter();
  bodyLowpass.type = 'lowpass';
  bodyLowpass.frequency.value = 1400;
  bodyLowpass.Q.value = 0.3;

  const bodyLFO = ctx.createOscillator();
  bodyLFO.type = 'sine';
  bodyLFO.frequency.value = 0.11;
  const bodyLFODepth = ctx.createGain();
  bodyLFODepth.gain.value = 350;
  bodyLFO.connect(bodyLFODepth).connect(bodyLowpass.frequency);
  bodyLFO.start();

  const bodyGain = ctx.createGain();
  bodyGain.gain.value = 0.09;
  body.connect(bodyLowpass).connect(bodyGain).connect(masterGain);
  body.start();

  // Sparkle: a much quieter high-passed white-noise layer for the sense of
  // individual droplets, with its own slow, gentle gain flutter so it never
  // sits still enough to register as a flat hiss.
  const sparkle = ctx.createBufferSource();
  sparkle.buffer = makeNoiseBuffer(4);
  sparkle.loop = true;

  const sparkleHighpass = ctx.createBiquadFilter();
  sparkleHighpass.type = 'highpass';
  sparkleHighpass.frequency.value = 3200;

  const sparkleGain = ctx.createGain();
  sparkleGain.gain.value = 0.012;

  const sparkleLFO = ctx.createOscillator();
  sparkleLFO.type = 'sine';
  sparkleLFO.frequency.value = 0.29;
  const sparkleLFODepth = ctx.createGain();
  sparkleLFODepth.gain.value = 0.009;
  sparkleLFO.connect(sparkleLFODepth).connect(sparkleGain.gain);
  sparkleLFO.start();

  sparkle.connect(sparkleHighpass).connect(sparkleGain).connect(masterGain);
  sparkle.start();

  rainSource = body;
  rainExtraNodes = [sparkle, bodyLFO, sparkleLFO];

  scheduleThunder(true);
}

export function stopRainAmbience() {
  if (rainSource) {
    rainSource.stop();
    rainSource = null;
  }
  rainExtraNodes.forEach((node) => node.stop());
  rainExtraNodes = [];
  clearTimeout(thunderTimer);
}
