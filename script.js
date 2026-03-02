// After Sign-Off: Interference
// Canvas CRT + optional video channels + slow "serious" distortion build-up

const CHANNELS = [
  // You can replace these placeholders with your real clips.
  // Put the files in /assets/videos and update src.
  { ch:  1, type: 'color', name: 'POLTERTV',   hex: '#18b507cb', r:26,  g:24,  b:20,  desc:'OR THE LIFE IF U PREFER'},
  { ch:  2, type: 'video', name: 'Tape',  hex: '#2e3d4f', r:46,  g:61,  b:79,  desc:'archive fragment', src:'./assets/videos/clip-02.mp4' },
  { ch:  3, type: 'video', name: 'Room',  hex: '#6b7f8e', r:107, g:127, b:142, desc:'still laughing',    src:'./assets/videos/clip-03.mp4' },
  { ch:  4, type: 'video', name: 'Rain',  hex: '#8fafc2', r:143, g:175, b:194, desc:'the sky at midnight', src:'./assets/videos/clip-01.mp4' },
  { ch:  5, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',      src:'./assets/videos/clip-05.mp4' },
  { ch:  6, type: 'video', name: 'Clay',  hex: '#9c7c5e', r:156, g:124, b:94,  desc:'exposed earth', src:'./assets/videos/clip-06.mp4' },
  { ch:  7, type: 'video', name: 'Ochre', hex: '#c4893a', r:196, g:137, b:58,  desc:'amber before the storm', src:'./assets/videos/clip-07.mp4' },
  { ch:  8, type: 'video', name: 'Petal', hex: '#d4a5a0', r:212, g:165, b:160, desc:'wild rose, last bloom', src:'./assets/videos/clip-08.mp4' },
  { ch:  9, type: 'video', name: 'Dust',  hex: '#c8bfad', r:200, g:191, b:173, desc:'dry road before rain', src:'./assets/videos/clip-09.mp4' },
  { ch: 10, type: 'video', name: 'Stone', hex: '#e8e2d9', r:232, g:226, b:217, desc:'limestone in afternoon light', src:'./assets/videos/clip-10.mp4' },
  { ch:  11, type: 'video', name: 'Petal', hex: '#d4a5a0', r:212, g:165, b:160, desc:'wild rose, last bloom', src:'./assets/videos/clip-11.mp4' },
  { ch:  12, type: 'video', name: 'Petal', hex: '#d4a5a0', r:212, g:165, b:160, desc:'wild rose, last bloom', src:'./assets/videos/clip-12.mp4' },
  { ch:  13, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',      src:'./assets/videos/clip-13.mp4' },
  { ch:  14, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',      src:'./assets/videos/clip-14.mp4' },
  { ch:  15, type: 'video', name: 'Ochre', hex: '#c4893a', r:196, g:137, b:58,  desc:'amber before the storm', src:'./assets/videos/clip-15.mp4' },
  { ch:  16, type: 'video', name: 'Tape',  hex: '#2e3d4f', r:46,  g:61,  b:79,  desc:'archive fragment', src:'./assets/videos/clip-16.mp4' },
  { ch:  17, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',      src:'./assets/videos/clip-17.mp4' },
  { ch:  18, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',      src:'./assets/videos/clip-18.mp4' },
  { ch:  19, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',      src:'./assets/videos/clip-19.mp4' },
  { ch:  20, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',      src:'./assets/videos/clip-20.mp4' },
  { ch:  21, type: 'video', name: 'Ochre', hex: '#c4893a', r:196, g:137, b:58,  desc:'amber before the storm', src:'./assets/videos/clip-21.mp4' },
  { ch:  22, type: 'video', name: 'Room',  hex: '#6b7f8e', r:107, g:127, b:142, desc:'still laughing',    src:'./assets/videos/clip-22.mp4' },
  { ch:  23, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',      src:'./assets/videos/clip-23.mp4' },
  { ch:  24, type: 'video', name: 'Dust',  hex: '#c8bfad', r:200, g:191, b:173, desc:'dry road before rain', src:'./assets/videos/clip-24.mp4' },
  { ch:  25, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',      src:'./assets/videos/clip-25.mp4' },
  { ch:  26, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',      src:'./assets/videos/clip-26.mp4' },
  { ch:  27, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',      src:'./assets/videos/clip-27.mp4' },
  { ch:  28, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',      src:'./assets/videos/clip-28.mp4' },
];

const tvScreen = document.getElementById('tvScreen');
const canvas   = document.getElementById('screen');
const ctx      = canvas.getContext('2d', { alpha: false });
const glow     = document.getElementById('glow');
const videoEl  = document.getElementById('srcVideo');

let CW, CH, DPR;
function resizeCanvas() {
  const rect = tvScreen.getBoundingClientRect();
  DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  CW = Math.floor(rect.width * DPR);
  CH = Math.floor(rect.height * DPR);
  canvas.width  = CW;
  canvas.height = CH;
  canvas.style.width  = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.setTransform(1,0,0,1,0,0);
}
resizeCanvas();
window.addEventListener('resize', () => {
  clearTimeout(resizeCanvas._t);
  resizeCanvas._t = setTimeout(resizeCanvas, 100);
});

// State
let currentIdx   = 0;
let staticNoise  = null;
let noiseAge     = 0;
let staticBurst  = 0;
let switching    = false;
let scanOffset   = 0;
let glitchTimer  = 0;
let frameCount  = 0;

// Power
let tvOn = true;
const powerBtn = document.getElementById('powerBtn');
const ledEl = document.getElementById('led');
const volBtn = document.getElementById('volBtn');

// Volume (0..4 steps) + OSD
let volumeStep = 3; // 0..4 (default pretty loud)
const VOLUME_STEPS = [0.0, 0.25, 0.5, 0.75, 1.0];
let volumeOSDUntil = 0;
function setVolumeStep(step, showOsd = true) {
  volumeStep = Math.max(0, Math.min(4, step));
  const v = VOLUME_STEPS[volumeStep];

  // Mute step is real mute.
  try {
    videoEl.muted = (v === 0);
    videoEl.volume = v; // fallback / also affects some implementations
  } catch {}

  // If audio chain exists, masterGain is the authoritative control.
  if (audioEnabled && masterGain && audioCtx) {
    masterGain.gain.setTargetAtTime(v, audioCtx.currentTime, 0.03);
  }

  if (showOsd) volumeOSDUntil = performance.now() + 1800;
}
function bumpVolume(delta) {
  if (!tvOn) return;

  // Keep the "self-typing" behavior moving even while other actions happen.
  tickPossessedTyping();
  ensureAudio();
  if (audioCtx && audioCtx.state === 'suspended') { try { audioCtx.resume(); } catch {} }

  // Retro TV cycle: 1→2→3→4→MUTE→1...
  if (delta > 0) {
    setVolumeStep((volumeStep + 1) % 5);
  } else if (delta < 0) {
    setVolumeStep((volumeStep + 4) % 5);
  }
}

function setPowerState(isOn) {
  tvOn = !!isOn;

  document.body.classList.toggle('tv-off', !tvOn);
  tvScreen.classList.toggle('off', !tvOn);
  if (powerBtn) powerBtn.setAttribute('aria-pressed', String(tvOn));

  // Disable channel buttons while off
  channelButtons.forEach(btn => (btn.disabled = !tvOn));

  // Freeze video/audio while off
  if (!tvOn) {
    resetChannelInput();
    staticBurst = 0;
    try { videoEl.pause(); } catch {}
  } else {
    // Try resume if current channel is video
    loadVideoForChannel(CHANNELS[currentIdx]);
    // Apply volume to current mode
    setVolumeStep(volumeStep, false);
    // Small burst for that "power on" feel
    staticBurst = 0.9;
  }
}

function togglePower() {
  lastUserActionAt = performance.now();
  if (switching) return;

  // Power OFF: play CRT collapse, then actually switch off
  if (tvOn) {
    switching = true;
    staticBurst = 1.0;
    tvScreen.classList.add('switching');

    setTimeout(() => {
      setPowerState(false);
      tvScreen.classList.remove('switching');
      switching = false;
    }, 450);

    return;
  }

  // Power ON: switch on first, then play the same CRT wake animation
  setPowerState(true);
  ensureAudio();
  if (audioCtx && audioCtx.state === 'suspended') { try { audioCtx.resume(); } catch {} }

  switching = true;
  staticBurst = 0.9;
  tvScreen.classList.add('switching');

  setTimeout(() => {
    tvScreen.classList.remove('switching');
    switching = false;
  }, 450);
}

let switchCount  = 0;
let timeAlive    = 0;

// Corruzione continua 0..1 (cresce lentamente nel tempo e con gli switch)
let corruption = 0;

// Distorsione "base" + spike occasionali (per dare colpi forti ogni tanto)
let distortionLevel = 0;       // 0..3 (stadi grossi)
let distortionStrength = 0.0;  // 0..1 (fine-tuning)
let spikeAmp = 0.0;            // 0..1 (picchi brevi, audio+video)
let spikeT = 0.0;              // timer spike
let nextSpikeAt = 5.0;         // in secondi (varia nel tempo)

// Late-game autonomy (TV starts doing things by itself)
let nextAutonomyAt = 9999;

// Scary flashes (late-game): quick red wash + OSD hit
let scareFlash = 0.0; // 0..1
let scareHold = 0.0;  // seconds

// Possession Phase 2 (ultra): self-dial 666, power blink, freeze-frame hits
let flickerOffUntil = 0;        // timestamp ms (render black while active)
let hardCooldownUntil = 0;      // timestamp ms (prevents big scares spamming)
let possessedTyping = false;    // TV is typing the channel number by itself
let possessedTarget = '';       // e.g. '666'
let possessedNextTypeAt = 0;    // timestamp ms
let possessedAttempts = 0;      // count attempts in current run
let freezeUntil = 0;            // timestamp ms (freeze video)
let freezeText = '';            // overlay message during freeze
let freezeTextUntil = 0;        // timestamp ms
let stingerUntil = 0;           // timestamp ms (strong red/flash overlay)


// Secret channel unlock (7391)
const secretSeq = [7,3,9,1];
let inputBuf = [];

const strip = document.getElementById('channelStrip');

// Retro channel input (digit keypad, shows underscore cursor)
let channelInput = '';
let channelInputTimer = null;
// You said: channels up to 150, and the secret channel must be 666.
// Keep the OSD consistent and allow 3-digit input.
const MAX_CHANNEL_NUMBER = 150;
const SECRET_CHANNEL_NUMBER = 666;
const CHANNEL_INPUT_MAX_DIGITS = String(Math.max(MAX_CHANNEL_NUMBER, SECRET_CHANNEL_NUMBER)).length; // => 3
const CHANNEL_INPUT_COMMIT_MS = 1100; // a bit more time to type 3 digits

function resetChannelInput() {
  channelInput = '';
  if (channelInputTimer) {
    clearTimeout(channelInputTimer);
    channelInputTimer = null;
  }
}

function commitChannelInput() {
  if (!channelInput.length) return;
  const num = parseInt(channelInput, 10);
  resetChannelInput();

  // Find by channel number (ch field), fallback: ignore invalid
  const idx = CHANNELS.findIndex(c => c.ch === num);
  if (idx !== -1) switchTo(idx);
}

function pushDigit(d) {
  if (!tvOn) return;
  ensureAudio();
  if (audioCtx && audioCtx.state === 'suspended') { try { audioCtx.resume(); } catch {} }

    // Allow composing channel numbers (e.g. 5_ then 53_). After max digits, restart.
  if (channelInput.length >= CHANNEL_INPUT_MAX_DIGITS) channelInput = '';
  channelInput += String(d);

  // Track secret sequence as individual digits
  inputBuf.push(d);
  if (inputBuf.length > 4) inputBuf.shift();
  if (inputBuf.length === 4 && inputBuf.every((v, i) => v === secretSeq[i])) {
    unlockSecretChannel();
  }

  // Auto-commit after a short pause, like old TVs
  if (channelInputTimer) clearTimeout(channelInputTimer);
  channelInputTimer = setTimeout(() => commitChannelInput(), CHANNEL_INPUT_COMMIT_MS);
}

// Build keypad buttons 1..9 + 0
const channelButtons = [];
const digits = [1,2,3,4,5,6,7,8,9,0];
digits.forEach(d => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'ch-btn';
  btn.textContent = String(d);
  btn.setAttribute('aria-label', `Numero canale ${d}`);
  btn.addEventListener('click', () => pushDigit(d));
  strip.appendChild(btn);
  channelButtons.push(btn);
});

function updateButtons(idx) {
  // Optional: highlight the digit buttons? We keep it clean, no active state.
}

// Phosphor glow
function setGlow(ch) {
  const { r, g, b } = ch;
  const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  const a = 0.25 + brightness * 0.3;
  glow.style.boxShadow = `
    0 0 18px rgba(${r},${g},${b},${a}),
    0 0 45px rgba(${r},${g},${b},${a * 0.6}),
    0 0 90px rgba(${r},${g},${b},${a * 0.3})
  `;
}


// Small helper for rounded rectangles (keeps compatibility if roundRect() isn't supported)
function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

// Noise buffer
function makeNoiseBuffer() {
  const off = document.createElement('canvas');
  off.width = CW; off.height = CH;
  const oc = off.getContext('2d');
  const id = oc.createImageData(CW, CH);
  const d  = id.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = (Math.random() * 255) | 0;
    d[i] = d[i+1] = d[i+2] = v;
    d[i+3] = 255;
  }
  oc.putImageData(id, 0, 0);
  return off;
}

// Video setup per channel
let currentVideoSrc = '';
function loadVideoForChannel(ch) {
  if (ch.type !== 'video') {
    videoEl.pause();
    videoEl.removeAttribute('src');
    currentVideoSrc = '';
    return;
  }
  if (ch.src === currentVideoSrc) return;
  currentVideoSrc = ch.src;

  videoEl.pause();
  videoEl.muted = false; // set true if you want silent by default
  // No loop: when a clip ends we can auto-advance to the next channel.
  videoEl.loop = false;
  videoEl.playsInline = true;

  videoEl.src = ch.src;
  const playAttempt = () => videoEl.play().catch(() => {
    // Autoplay might be blocked until user interacts.
  });

  // Try to play once metadata is ready
  videoEl.onloadedmetadata = playAttempt;
  playAttempt();
}

// When a video ends, auto-advance if user isn't interacting.
let lastUserActionAt = performance.now();
videoEl.addEventListener('ended', () => {
  if (!tvOn) return;
  const ch = CHANNELS[currentIdx];
  if (!ch || ch.type !== 'video') return;
  if (switching) return;
  // If the user touched something in the last 2.5s, don't auto-jump.
  if (performance.now() - lastUserActionAt < 2500) return;
  next();
});


// ── AUDIO (Web Audio API) ─────────────────────────────────────────
// Nota: per policy dei browser, l'audio può partire solo dopo una gesture utente.
let audioCtx = null;
let mediaSrc = null;
let masterGain = null;
let preGain = null;
let lpFilter = null;
let shaper = null;
let delay = null;
let delayGain = null;
let feedbackGain = null;

let audioEnabled = false;
let firstGestureSeen = false;

function makeDistortionCurve(amount = 0) {
  // amount: 0..1
  const n = 2048;
  const curve = new Float32Array(n);
  const k = 2 + amount * 98; // 2..100
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / (n - 1) - 1;
    curve[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
  }
  return curve;
}

function ensureAudio() {
  if (audioEnabled) return;

  // Mark we had a gesture
  firstGestureSeen = true;

  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Media element source can be created only once per element.
    mediaSrc = audioCtx.createMediaElementSource(videoEl);

    // Chain: media -> preGain -> lowpass -> shaper -> delay mix -> master
    preGain = audioCtx.createGain();
    lpFilter = audioCtx.createBiquadFilter();
    lpFilter.type = 'lowpass';

    shaper = audioCtx.createWaveShaper();
    shaper.oversample = '2x';

    delay = audioCtx.createDelay(1.0);
    delay.delayTime.value = 0.12;

    delayGain = audioCtx.createGain();     // wet amount
    feedbackGain = audioCtx.createGain();  // feedback loop

    masterGain = audioCtx.createGain();

    // Feedback loop: delay -> feedback -> delay
    delay.connect(feedbackGain);
    feedbackGain.connect(delay);

    // Routing: dry + wet
    mediaSrc.connect(preGain);
    preGain.connect(lpFilter);
    lpFilter.connect(shaper);

    // Dry to master
    shaper.connect(masterGain);

    // Wet to master
    shaper.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(masterGain);

    masterGain.connect(audioCtx.destination);

    // Start in "clean" mode (then apply volume step)
    masterGain.gain.value = 0.9;
    preGain.gain.value = 1.0;
    lpFilter.frequency.value = 18000;
    shaper.curve = makeDistortionCurve(0);
    delayGain.gain.value = 0.0;
    feedbackGain.gain.value = 0.0;

    audioEnabled = true;

    // Apply current volume step to the audio chain
    setVolumeStep(volumeStep, false);
  } catch (e) {
    // If audio fails, we just keep visuals.
    audioEnabled = false;
  }
}

// Applies audio params based on corruption and spikes
function setAudioMood(c, spikeAmp) {
  if (!audioEnabled || !audioCtx) return;

  // c: 0..1
  // Early: almost clean. Late: darker, thicker, slightly unstable.
  const dark = c * c; // ease in

  const cutoff = 18000 - dark * 14000;         // 18k -> 4k
  const drive  = Math.min(1, dark * 0.9 + spikeAmp * 0.8);
  const wet    = Math.min(0.55, dark * 0.22 + spikeAmp * 0.35);
  const fb     = Math.min(0.45, dark * 0.18 + spikeAmp * 0.25);

  lpFilter.frequency.setTargetAtTime(cutoff, audioCtx.currentTime, 0.02);
  shaper.curve = makeDistortionCurve(drive);

  delayGain.gain.setTargetAtTime(wet, audioCtx.currentTime, 0.03);
  feedbackGain.gain.setTargetAtTime(fb, audioCtx.currentTime, 0.03);

  // Slight master tremble when very corrupted
  const tremble = dark > 0.65 ? (0.985 + Math.sin(frameCount * 0.07) * 0.015) : 1.0;
  masterGain.gain.setTargetAtTime(0.9 * tremble, audioCtx.currentTime, 0.02);

  // Pitch wobble via playbackRate (subtle). Spike makes it noticeable.
  if (videoEl && CHANNELS[currentIdx] && CHANNELS[currentIdx].type === 'video') {
    const baseRate = 1.0 - dark * 0.03;
    const wobble = (dark > 0.35 ? Math.sin(frameCount * 0.03) * (0.002 + dark * 0.004) : 0);
    const spikeDrop = spikeAmp * 0.06;
    const r = Math.max(0.85, Math.min(1.02, baseRate + wobble - spikeDrop));
    videoEl.playbackRate = r;
  }
}

// Distortion schedule

function smoothstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

// Distortion schedule: parte "easy" e poi diventa sempre più inquietante.
// - base: cresce lentamente
// - spike: colpi forti ogni tanto (audio+video)
// - late game: più frequente, più scuro, più instabile
function updateDistortion(dt) {
  timeAlive += dt;

  // Corruzione continua (0..1) con easing
  const tTime = smoothstep(25, 320, timeAlive);        // molto lenta
  const tSw   = smoothstep(8, 180, switchCount);       // pressione da switch
  corruption = clamp01(Math.max(tTime * 0.85, tSw * 0.75));

  // Stadi grossi, ma all'inizio restano bassi
  distortionLevel = Math.floor(corruption * 3.2); // 0..3
  distortionStrength = clamp01(corruption * 1.05);

  // Scheduler spike: rarissimi all'inizio, più frequenti dopo.
  // Intervallo medio: 18s early -> 7s late, then 6s -> 3.5s in late late.
  const lateBoost = smoothstep(0.75, 0.98, corruption); // ramps near the end
  const mean = (18 - corruption * 11) - lateBoost * 2.4;
  spikeT += dt;

  if (spikeT >= nextSpikeAt) {
    spikeT = 0;

    // Probabilità: all'inizio bassa, poi cresce. Non sempre spike, così resta imprevedibile.
    const p = (0.12 + corruption * 0.45) + lateBoost * 0.22; // rarer early, heavier late
    if (Math.random() < p) {
      // Spike amplitude: usually moderate, occasionally a nasty hit (even early)
      const nasty = Math.random() < (0.10 + lateBoost * 0.10);
      const rand = 0.75 + Math.random() * 0.55;
      spikeAmp = (0.22 + corruption * 0.52 + lateBoost * 0.20) * rand + (nasty ? 0.22 : 0);
      spikeAmp = Math.min(1.1, spikeAmp);
      staticBurst = Math.max(staticBurst, nasty ? 1.0 : 0.85);
    }

    // Prossimo spike con jitter
    nextSpikeAt = Math.max(4.5, mean + (Math.random() - 0.5) * 6);
  }

  // Decadimento spike (brevissimo, "colpo" tipo interferenza)
  spikeAmp = spikeAmp > 0.001 ? spikeAmp * (0.78 - corruption * 0.10 - lateBoost * 0.06) : 0;

  // Late-game scare flashes (rare): red wash + hit.
  // Kept rare so it stays effective.
  if (corruption > 0.82) {
    const ultra = smoothstep(0.88, 0.99, corruption);
    const chancePerSec = 0.0012 + ultra * 0.006; // ~0.12%/s early late → ~0.72%/s ultra
    if (Math.random() < chancePerSec * dt) {
      scareFlash = 1.0;
      scareHold = 0.16 + ultra * 0.10;
      // Force a strong spike (audio+visual) for the "hit"
      spikeAmp = Math.max(spikeAmp, 1.0);
      staticBurst = Math.max(staticBurst, 1.0);
    }
  }


// Auto-unlock 666 in extreme late game (possession forces the archive channel to exist)
if (!secretUnlocked && corruption > 0.93 && timeAlive > 320) {
  unlockSecretChannel();
}

  // Applica mood audio (se attivo)
  setAudioMood(corruption, spikeAmp);
}

function updateAutonomy(dt) {
  // Progressive "TV possesses itself" behavior.
  // Not gated only by inactivity: it can happen even while the user is active,
  // but activity reduces frequency. Late-game ramps hard.

  if (!tvOn) return;

  const now = performance.now();
  const idleMs = now - lastUserActionAt;

  // Arm window: starts subtly, becomes aggressive.
  const late     = (timeAlive > 170 && corruption > 0.70);
  const veryLate = (timeAlive > 260 && corruption > 0.82);
  const ultra    = (timeAlive > 360 && corruption > 0.90);

  if (!late) {
    nextAutonomyAt = now + 999999;
    return;
  }

  // Cooldown scheduling (so it doesn't spam actions every frame).
  if (now < nextAutonomyAt) return;

  // Activity factor: 0 when actively interacting, 1 when idle for ~9s+
  const activity = clamp01(idleMs / 9000);

  // Chance per second to trigger an action.
  // Even when active, keep a small baseline so it can happen while scrolling.
  const c = clamp01(corruption);
  const base = 0.015 + c * 0.045;                 // 0.015..0.060
  const idleBoost = activity * (0.020 + c * 0.060); // adds when idle
  const lateBoost = veryLate ? 0.025 : 0.0;
  const ultraBoost = ultra ? 0.040 : 0.0;

  const chancePerSec = base + idleBoost + lateBoost + ultraBoost;

  // Roll
  const roll = Math.random();

if (roll < chancePerSec * dt) {
  // Choose an action (weighted by severity)
  const r = Math.random();

  // Ultra events (rare but spicy)
  if (ultra && r < 0.12) {
    triggerStinger();
  } else if ((veryLate || ultra) && r < (ultra ? 0.24 : 0.14)) {
    triggerPowerBlink();
  } else if ((veryLate || ultra) && r < (ultra ? 0.46 : 0.30)) {
    const msgs = ['YOU WERE HERE', 'STAY', 'NO SIGNAL', 'DO NOT SWITCH'];
    startFreezeHit(msgs[(Math.random() * msgs.length) | 0]);
  } else if ((veryLate || ultra) && r < (ultra ? 0.66 : 0.48)) {
    // It wants 666
    startPossessedTyping(SECRET_CHANNEL_NUMBER);
  } else if (r < (ultra ? 0.82 : veryLate ? 0.78 : 0.66)) {
    // Self channel hop (small -> bigger as it gets worse)
    const maxHop = ultra ? 6 : veryLate ? 4 : 2;
    const hop = (Math.random() < 0.5 ? -1 : 1) * (1 + ((Math.random() * maxHop) | 0));
    resetChannelInput();
    switchTo(currentIdx + hop);
  } else if (r < (ultra ? 0.92 : veryLate ? 0.90 : 0.86)) {
    // Volume twitch (subtle early, meaner later)
    const delta = (Math.random() < 0.55 ? 1 : -1) * (ultra ? 2 : 1);
    setVolumeStep(volumeStep + delta);
  } else {
    // Strong interference hit (visual + audio)
    spikeAmp = Math.max(spikeAmp, 0.55 + (veryLate ? 0.22 : 0.08) + (ultra ? 0.10 : 0));
    staticBurst = Math.max(staticBurst, 1.0);
  }
    // Schedule next action sooner as it gets worse.
    const baseMs = ultra ? 1300 : veryLate ? 2200 : 3600;
    const jitter = (Math.random() - 0.5) * (ultra ? 800 : veryLate ? 1200 : 1800);
    nextAutonomyAt = now + Math.max(750, baseMs + jitter);
  } else {
    // No action: check again soon (but not every frame)
    nextAutonomyAt = now + (ultra ? 250 : 450);
  }
}

function clamp01(x) { return Math.max(0, Math.min(1, x)); }


function canDoHardScare() {
  const now = performance.now();
  return now >= hardCooldownUntil && tvOn && !switching;
}

function setHardCooldown(ms) {
  hardCooldownUntil = performance.now() + ms;
}

function triggerPowerBlink() {
  if (!canDoHardScare()) return;

  // CRT collapse + brief black, without actually turning TV off
  switching = true;
  staticBurst = 1.0;
  tvScreen.classList.add('switching');

  const now = performance.now();
  flickerOffUntil = now + 140; // black for a blink

  setTimeout(() => {
    tvScreen.classList.remove('switching');
    switching = false;
  }, 450);

  setHardCooldown(2200);
}

function startFreezeHit(text) {
  if (!canDoHardScare()) return;

  // Freeze current video frame by pausing for a short moment
  if (CHANNELS[currentIdx] && CHANNELS[currentIdx].type === 'video') {
    try { videoEl.pause(); } catch {}
  }

  const now = performance.now();
  freezeUntil = now + 520; // total freeze time
  freezeText = text || '';
  freezeTextUntil = now + 520;

  // Strong interference
  spikeAmp = Math.max(spikeAmp, 1.0);
  staticBurst = Math.max(staticBurst, 1.0);
  scareFlash = Math.max(scareFlash, 0.85);
  scareHold = Math.max(scareHold, 0.12);

  setHardCooldown(2600);
}

function endFreezeIfNeeded(now) {
  if (freezeUntil && now >= freezeUntil) {
    freezeUntil = 0;
    freezeTextUntil = 0;
    freezeText = '';
    if (tvOn && CHANNELS[currentIdx] && CHANNELS[currentIdx].type === 'video') {
      try { videoEl.play(); } catch {}
    }
  }
}

function startPossessedTyping(targetStr) {
  if (!tvOn) return;
  possessedTyping = true;
  possessedTarget = String(targetStr || '');
  possessedAttempts = 0;
  possessedNextTypeAt = performance.now() + 250;
}

function stopPossessedTyping() {
  possessedTyping = false;
  possessedTarget = '';
  possessedNextTypeAt = 0;
  possessedAttempts = 0;
  resetChannelInput();
}

function tickPossessedTyping() {
  if (!possessedTyping || !tvOn) return;

  const now = performance.now();
  if (now < possessedNextTypeAt) return;

  // If user is typing, back off.
  if (channelInput.length > 0) {
    possessedNextTypeAt = now + 650;
    return;
  }

  // Type 1 digit at a time, showing CH 6_ / CH 66_ / CH 666
  const nextLen = (channelInput.length || 0) + 1;
  channelInput = possessedTarget.slice(0, nextLen);

  // occasional "hesitation"
  const hesitation = Math.random() < 0.22;
  possessedNextTypeAt = now + (hesitation ? 520 : 220);

  if (channelInput.length >= possessedTarget.length) {
    // Commit after a short pause
    possessedNextTypeAt = now + 380;
    possessedAttempts++;

    // Commit now
    commitChannelInput();

    // Stop after a couple attempts to avoid spam
    if (possessedAttempts >= 2) {
      stopPossessedTyping();
    }
  }
}

function triggerStinger() {
  if (!canDoHardScare()) return;

  // A rare "oh no" moment: red wash + spike + blink, then it tries to go 666.
  const now = performance.now();
  stingerUntil = now + 350;

  spikeAmp = Math.max(spikeAmp, 1.05);
  staticBurst = Math.max(staticBurst, 1.0);
  scareFlash = Math.max(scareFlash, 1.0);
  scareHold = Math.max(scareHold, 0.18);

  // Start typing 666 shortly after
  setTimeout(() => startPossessedTyping(SECRET_CHANNEL_NUMBER), 180);

  setHardCooldown(4200);
}


// Visual effects

function applyFlicker(strength) {
  if (strength <= 0) return;
  const a = 0.012 + strength * 0.06;
  const p = 0.06 + strength * 0.22;
  if (Math.random() < p) {
    ctx.fillStyle = `rgba(0,0,0,${a + Math.random() * a})`;
    ctx.fillRect(0, 0, CW, CH);
  }
}



function applyShear(strength) {
  if (strength <= 0) return;
  const p = 0.05 + strength * 0.28;
  if (Math.random() > p) return;

  const bandH = Math.floor(CH * (0.02 + Math.random() * (0.05 + strength * 0.05)));
  const y = Math.floor(Math.random() * Math.max(1, (CH - bandH)));
  const dx = Math.floor((Math.random() - 0.5) * CW * (0.01 + strength * 0.06));

  const img = ctx.getImageData(0, y, CW, bandH);
  ctx.putImageData(img, dx, y);

  // Clean edges lightly (keeps it "aesthetic", not noisy garbage)
  ctx.fillStyle = 'rgba(0,0,0,0.10)';
  if (dx > 0) ctx.fillRect(0, y, dx, bandH);
  else ctx.fillRect(CW + dx, y, -dx, bandH);
}



function applyRgbSplit(strength) {
  if (strength <= 0) return;

  const off = document.createElement('canvas');
  off.width = CW; off.height = CH;
  const oc = off.getContext('2d');
  oc.drawImage(canvas, 0, 0);

  const shift = Math.floor((1 + Math.random() * 2) * (0.8 + strength * 3.2)) * DPR;

  ctx.globalAlpha = 0.18 + strength * 0.22;
  ctx.globalCompositeOperation = 'screen';
  ctx.drawImage(off, -shift, 0);
  ctx.drawImage(off, shift, 0);

  // occasional vertical offset gives that "tape slip" feeling
  if (strength > 0.55 && Math.random() < 0.25) {
    const vy = Math.floor((Math.random() - 0.5) * (6 + strength * 10)) * DPR;
    ctx.drawImage(off, 0, vy);
  }

  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
}


// Draw helpers
function drawVignette() {
  const vg = ctx.createRadialGradient(CW/2, CH/2, CH*0.1, CW/2, CH/2, CH*0.72);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(0,0,0,0.38)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, CW, CH);
}

function drawPhosphorWarmth(ch) {
  const { r, g, b } = ch;
  const luma = (r*0.299 + g*0.587 + b*0.114) / 255;
  const a  = 0.10 + luma * 0.14;
  const pg = ctx.createRadialGradient(CW/2, CH/2, 0, CW/2, CH/2, CH*0.55);
  pg.addColorStop(0, `rgba(255,255,255,${a})`);
  pg.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = pg;
  ctx.fillRect(0, 0, CW, CH);
}

function drawScanBand() {
  scanOffset = (scanOffset + (0.35 * DPR)) % CH;
  ctx.fillStyle = 'rgba(255,255,255,0.02)';
  for (let y = scanOffset % (80*DPR); y < CH; y += (80*DPR)) {
    ctx.fillRect(0, y, CW, 2*DPR);
  }
}

function drawStatic(alpha) {
  if (alpha <= 0.01) return;
  if (!staticNoise || noiseAge++ > 3) {
    staticNoise = makeNoiseBuffer();
    noiseAge = 0;
  }
  ctx.globalAlpha = alpha;
  ctx.drawImage(staticNoise, 0, 0);
  ctx.globalAlpha = 1;
}


function drawHauntOverlay(strength, spike) {
  // "Inclinazione satanica" (creepy serio): degradazione + presenza.
  // - tinta rossa scura che cresce nel tempo
  // - ghost OSD "666" rarissimo
  // - flash "NO CARRIER" durante scare hits (jumpscare light, non gore)

  // Scare flash (indipendente dalla soglia)
  if (scareFlash > 0.01) {
    ctx.save();
    ctx.scale(DPR, DPR);

    const w = CW / DPR, h = CH / DPR;
    const a = clamp01(scareFlash);

    // Red wash
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = `rgba(180, 0, 0, ${0.22 + a * 0.55})`;
    ctx.fillRect(0, 0, w, h);

    // Text hit
    ctx.globalCompositeOperation = 'screen';
    const fs = Math.floor(w * 0.08);
    ctx.font = `bold ${fs}px 'VT323', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = `rgba(0,0,0,${0.55})`;
    ctx.fillText('NO CARRIER', w/2 + 2, h*0.33 + 2);
    ctx.fillStyle = `rgba(232,226,217,${0.70})`;
    ctx.fillText('NO CARRIER', w/2, h*0.33);

    ctx.restore();
  }

  if (strength < 0.45 && spike < 0.6) return;

  const s = clamp01((strength - 0.45) / 0.55);

  // Persistent dark red vignette as corruption grows (subtle early, heavy late)
  ctx.save();
  ctx.scale(DPR, DPR);

  const w = CW / DPR, h = CH / DPR;
  const redA = 0.04 + s * 0.16 + spike * 0.10; // max ~0.3
  ctx.globalCompositeOperation = 'multiply';

  // Vignette
  const vg = ctx.createRadialGradient(w/2, h/2, Math.min(w,h)*0.15, w/2, h/2, Math.min(w,h)*0.75);
  vg.addColorStop(0, `rgba(120,0,0,${0.0})`);
  vg.addColorStop(1, `rgba(160,0,0,${redA})`);
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);

  ctx.restore();

  // Rare ghost OSD "666"
  const chance = 0.010 + s * 0.020 + spike * 0.050;
  if (Math.random() < chance) {
    ctx.save();
    ctx.scale(DPR, DPR);

    const fontSize = Math.floor((CW/DPR) * 0.06);
    ctx.font = `bold ${fontSize}px 'VT323', monospace`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';

    const jx = (Math.random() - 0.5) * 6;
    const jy = (Math.random() - 0.5) * 6;

    const x = (CW/DPR) - (CW/DPR) * 0.06 + jx;
    const y = (CH/DPR) * 0.06 + jy;

    ctx.fillStyle = `rgba(0,0,0,${0.25 + s * 0.18})`;
    ctx.fillText('666', x + 1, y + 1);

    ctx.fillStyle = `rgba(232,226,217,${0.18 + s * 0.18})`;
    ctx.fillText('666', x, y);

    ctx.restore();
  }
}

function drawChannelLabel(ch, osdInput) {
  const { ch: chNum } = ch;

  // Position (top-left). If you ever want it top-right, flip these.
  const x = Math.floor(CW * 0.05);
  const y = Math.floor(CW * 0.10);

  ctx.save();
  ctx.scale(DPR, DPR);

  const fontSize = Math.floor((CW/DPR) * 0.078);
  ctx.font = `bold ${fontSize}px 'VT323', monospace`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  const typing = !!(osdInput && osdInput.length);
  const labelNum = typing ? osdInput : String(chNum).padStart(CHANNEL_INPUT_MAX_DIGITS, '0');

  // Blinking cursor underscore when typing (old TV vibe)
  const blinkOn = (Math.floor(frameCount / 20) % 2) === 0;
  const cursor = (typing && blinkOn) ? '_' : (typing ? ' ' : '');

  const labelText = `CH ${labelNum}${cursor}`;

  // Strong OSD plate behind text (high contrast, always readable)
  const padX = Math.floor(fontSize * 0.42);
  const padY = Math.floor(fontSize * 0.32);
  const metrics = ctx.measureText(labelText);
  const boxW = Math.ceil(metrics.width) + padX * 2;
  const boxH = Math.ceil(fontSize * 1.08) + padY * 2;

  const bx = Math.floor((x/DPR) - padX);
  const by = Math.floor((y/DPR) - fontSize - padY);

  // Plate
  ctx.fillStyle = 'rgba(0,0,0,0.72)';
  ctx.beginPath();
  roundRect(ctx, bx, by, boxW, boxH, Math.floor(fontSize * 0.22));
  ctx.fill();

  // Outer rim like a real OSD
  ctx.strokeStyle = 'rgba(232,226,217,0.18)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Text: thick dark outline + bright fill
  ctx.lineJoin = 'round';
  ctx.miterLimit = 2;

  ctx.strokeStyle = 'rgba(0,0,0,0.85)';
  ctx.lineWidth = Math.max(2, Math.floor(fontSize * 0.11));
  ctx.strokeText(labelText, (x/DPR), (y/DPR));

  ctx.fillStyle = 'rgba(232,226,217,0.95)';
  ctx.shadowColor = 'rgba(0,0,0,0.55)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  ctx.fillText(labelText, (x/DPR), (y/DPR));

  ctx.restore();
}

function drawVolumeOSD() {
  if (!tvOn) return;
  const now = performance.now();
  if (now > volumeOSDUntil) return;

  const t = clamp01((volumeOSDUntil - now) / 1800);
  const alpha = 0.20 + t * 0.55;

  ctx.save();
  ctx.scale(DPR, DPR);

  const w = CW / DPR;
  const h = CH / DPR;
  const fontSize = Math.floor(w * 0.055);
  const pad = Math.floor(fontSize * 0.35);
  const barW = Math.floor(fontSize * 0.38);
  const barGap = Math.floor(fontSize * 0.22);
  const bars = 4;
  const filled = (volumeStep === 0) ? 0 : volumeStep;

  const text = 'VOL';
  const muteLabel = (volumeStep === 0) ? 'MUTE' : '';
  ctx.font = `bold ${fontSize}px 'VT323', monospace`;
  const tw = ctx.measureText(text).width;

  const boxW = pad * 2 + tw + pad + (bars * barW) + ((bars - 1) * barGap);
  const boxH = Math.floor(fontSize * 1.05) + pad * 2;

  const x = w - boxW - Math.floor(w * 0.05);
  const y = Math.floor(h * 0.10);

  ctx.fillStyle = `rgba(0,0,0,${0.34 * alpha})`;
  ctx.beginPath();
  roundRect(ctx, x, y, boxW, boxH, Math.floor(fontSize * 0.18));
  ctx.fill();
  ctx.strokeStyle = `rgba(232,226,217,${0.10 * alpha})`;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = `rgba(232,226,217,${0.85 * alpha})`;
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  ctx.fillText(text, x + pad, y + pad + fontSize);
  if (muteLabel) {
    ctx.textAlign = 'right';
    ctx.fillStyle = `rgba(232,226,217,${alpha})`;
    ctx.fillText(muteLabel, x + boxW - pad, y + pad + fontSize);
    ctx.textAlign = 'left';
  }


  // Bars: increasing height like old TVs
  const bx = x + pad + tw + pad;
  const by = y + pad;
  for (let i = 0; i < bars; i++) {
    const level = i + 1;
    const bh = Math.floor((boxH - pad * 2) * (0.25 + (level / bars) * 0.75));
    const xx = bx + i * (barW + barGap);
    const yy = y + boxH - pad - bh;
    const on = i < filled;
    ctx.fillStyle = on
      ? `rgba(16,200,19,${0.75 * alpha})`
      : `rgba(232,226,217,${0.14 * alpha})`;
    ctx.fillRect(xx, yy, barW, bh);
  }

  ctx.restore();
}

function drawInfoText(ch) {
  const { r, g, b, hex, name, desc } = ch;
  const luma = (r*0.299 + g*0.587 + b*0.114) / 255;

  const textLight = `rgba(232,226,217,0.92)`;
  const textDark  = `rgba(26,24,20,0.80)`;
  const subLight  = `rgba(200,191,173,0.65)`;
  const subDark   = `rgba(46,24,20,0.55)`;
  const dimLight  = `rgba(200,191,173,0.40)`;
  const dimDark   = `rgba(46,24,20,0.38)`;

  const mainColor = luma < 0.45 ? textLight : textDark;
  const subColor  = luma < 0.45 ? subLight  : subDark;
  const dimColor  = luma < 0.45 ? dimLight  : dimDark;

  ctx.save();
  ctx.scale(DPR, DPR);

  // Big title
  const nameSize = (CW/DPR) * 0.155;
  ctx.font = `${Math.floor(nameSize)}px 'VT323', monospace`;
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.fillText(String(name).toUpperCase(), (CW/DPR)/2 + 2, (CH/DPR)/2 + nameSize*0.34 + 2);
  ctx.fillStyle = mainColor;
  ctx.fillText(String(name).toUpperCase(), (CW/DPR)/2, (CH/DPR)/2 + nameSize*0.34);

  // Sub text
  ctx.font = `${Math.floor((CW/DPR) * 0.055)}px 'Share Tech Mono', monospace`;
  ctx.fillStyle = subColor;
  ctx.fillText(String(hex).toUpperCase(), (CW/DPR)/2, (CH/DPR)/2 + nameSize*0.34 + (CW/DPR)*0.075);

  ctx.font = `${Math.floor((CW/DPR) * 0.038)}px 'Share Tech Mono', monospace`;
  ctx.fillStyle = dimColor;
  ctx.fillText(String(desc), (CW/DPR)/2, (CH/DPR)/2 + nameSize*0.34 + (CW/DPR)*0.13);

  ctx.restore();
}

// Main draw
function drawChannel(ch) {
  // TV OFF: render a dead screen
  if (!tvOn) {
    ctx.fillStyle = '#060504';
    ctx.fillRect(0, 0, CW, CH);
    drawVignette();
    drawStatic(0.02);
    return;
  }

  // Power blink: brief black-out while still "on"
  const nowMs = performance.now();
  if (nowMs < flickerOffUntil) {
    ctx.fillStyle = '#050403';
    ctx.fillRect(0, 0, CW, CH);
    drawVignette();
    drawStatic(0.06);
    return;
  }

  // Base
  ctx.fillStyle = ch.hex;
  ctx.fillRect(0, 0, CW, CH);

  // Video
  if (ch.type === 'video' && videoEl.readyState >= 2) {
    ctx.drawImage(videoEl, 0, 0, CW, CH);
  }

  // CRT flavor
  drawVignette();
  drawPhosphorWarmth(ch);
  drawScanBand();

  // Glitch line (subtle)
  glitchTimer++;
  const glitchChance = 0.02 + distortionLevel * 0.02;
  if (glitchTimer > (140 - distortionLevel * 20) && Math.random() < glitchChance) {
    glitchTimer = 0;
    const gy = (Math.random() * CH) | 0;
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * (0.12 + distortionLevel * 0.08)})`;
    ctx.fillRect(0, gy, CW, (Math.random() * 2 + 1) * DPR);
  }

  // Channel label is always visible (retro OSD)
  drawChannelLabel(ch, channelInput);

  // Volume OSD (shows when user changes volume)
  drawVolumeOSD();


// Possession overlays (freeze text / stinger flash)
const nowO = performance.now();

if (nowO < stingerUntil) {
  const a = clamp01((stingerUntil - nowO) / 350);
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.fillStyle = `rgba(190, 0, 0, ${0.22 + a * 0.55})`;
  ctx.fillRect(0, 0, CW, CH);
  ctx.restore();
}

if (nowO < freezeTextUntil && freezeText) {
  ctx.save();
  ctx.scale(DPR, DPR);
  const w = CW / DPR, h = CH / DPR;
  const fs = Math.floor(w * 0.085);
  ctx.font = `bold ${fs}px 'VT323', monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Plate
  const tw = ctx.measureText(freezeText).width;
  const padX = Math.floor(fs * 0.45);
  const padY = Math.floor(fs * 0.30);
  const bx = (w - tw) / 2 - padX;
  const by = h * 0.33 - fs - padY;
  const bw = tw + padX * 2;
  const bh = fs * 1.20 + padY * 2;

  ctx.fillStyle = 'rgba(0,0,0,0.78)';
  ctx.beginPath();
  roundRect(ctx, bx, by, bw, bh, Math.floor(fs * 0.22));
  ctx.fill();

  ctx.strokeStyle = 'rgba(232,226,217,0.18)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.strokeStyle = 'rgba(0,0,0,0.9)';
  ctx.lineWidth = Math.max(2, Math.floor(fs * 0.10));
  ctx.strokeText(freezeText, w/2, h*0.33);

  ctx.fillStyle = 'rgba(232,226,217,0.92)';
  ctx.fillText(freezeText, w/2, h*0.33);
  ctx.restore();
}

  // Full info text only for color channels
  if (ch.type === 'color') drawInfoText(ch);

  // Distortion build-up (easy early, creepier late)
  // Base strength grows slowly, spikes add short violent hits.
  const base = distortionStrength;
  const spike = spikeAmp;

  // Visual strength: early subtle, late heavier, spikes punch.
  const vis = clamp01(base * 0.9 + spike * 0.95);

  if (vis > 0.01) {
    applyShear(vis);
    applyRgbSplit(vis);
    applyFlicker(vis);
    drawHauntOverlay(base, spike);
  }

  // Static burst after switching and during spikes
  const staticAlpha = clamp01(staticBurst + spike * 0.55) * (0.42 + base * 0.22);
  drawStatic(staticAlpha);
}

// Switching
function switchTo(idx) {
  if (!tvOn) return;
  if (switching) return;

  switching = true;
  switchCount++;

  currentIdx = ((idx % CHANNELS.length) + CHANNELS.length) % CHANNELS.length;

  updateButtons(currentIdx);
  const ch = CHANNELS[currentIdx];
  setGlow(ch);
  loadVideoForChannel(ch);

  staticBurst = 1.0;

  tvScreen.classList.add('switching');
  setTimeout(() => {
    tvScreen.classList.remove('switching');
    switching = false;
  }, 500);
}
function next() { if (!tvOn) return; lastUserActionAt = performance.now(); ensureAudio(); if (audioCtx && audioCtx.state === 'suspended') { try { audioCtx.resume(); } catch {} } resetChannelInput(); switchTo(currentIdx + 1); }
function prev() { if (!tvOn) return; lastUserActionAt = performance.now(); ensureAudio(); if (audioCtx && audioCtx.state === 'suspended') { try { audioCtx.resume(); } catch {} } resetChannelInput(); switchTo(currentIdx - 1); }

// Input
document.getElementById('nextKnob').addEventListener('click', next);
document.getElementById('prevKnob').addEventListener('click', prev);
tvScreen.addEventListener('click', () => { if (tvOn) { ensureAudio(); if (audioCtx && audioCtx.state === 'suspended') { try { audioCtx.resume(); } catch {} } next(); } });

// Volume button: click up, Shift+click down, wheel to adjust
if (volBtn) {
  volBtn.addEventListener('click', (e) => {
    lastUserActionAt = performance.now();
    bumpVolume(e.shiftKey ? -1 : +1);
  });
  volBtn.addEventListener('wheel', (e) => {
    e.preventDefault();
    lastUserActionAt = performance.now();
    bumpVolume(e.deltaY < 0 ? +1 : -1);
  }, { passive: false });
}

// Power button
if (powerBtn) powerBtn.addEventListener('click', togglePower);

// Keyboard
document.addEventListener('keydown', e => {
  lastUserActionAt = performance.now();
  // Power
  if (e.key === 'p' || e.key === 'P') {
    e.preventDefault();
    togglePower();
    return;
  }

  // Digits build the channel number like a retro TV
  if (/^[0-9]$/.test(e.key)) {
    e.preventDefault();
    pushDigit(parseInt(e.key, 10));
    return;
  }

  // Confirm / clear the composed channel
  if (e.key === 'Enter') {
    e.preventDefault();
    commitChannelInput();
    return;
  }
  if (e.key === 'Escape') {
    e.preventDefault();
    resetChannelInput();
    return;
  }
  if (e.key === 'Backspace') {
    e.preventDefault();
    if (channelInput.length) {
      channelInput = channelInput.slice(0, -1);
      if (!channelInput.length) {
        resetChannelInput();
      } else {
        if (channelInputTimer) clearTimeout(channelInputTimer);
        channelInputTimer = setTimeout(() => commitChannelInput(), CHANNEL_INPUT_COMMIT_MS);
      }
    } else {
      resetChannelInput();
    }
    return;
  }

  if (!tvOn) return;

  // Volume hotkeys
  if (e.key === '+' || e.key === '=' ) { e.preventDefault(); bumpVolume(+1); return; }
  if (e.key === '-' || e.key === '_' ) { e.preventDefault(); bumpVolume(-1); return; }

  // Knob style navigation still works
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowUp') {
    e.preventDefault();
    next();
  }
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowDown') {
    e.preventDefault();
    prev();
  }
});
// Treat scrolling / pointer movement as user activity (but autonomy can still act).
window.addEventListener('scroll', () => { lastUserActionAt = performance.now(); }, { passive: true });
window.addEventListener('pointermove', () => { lastUserActionAt = performance.now(); }, { passive: true });
window.addEventListener('pointerdown', () => { lastUserActionAt = performance.now(); }, { passive: true });

// NO auto-advance (requested). Channels change only by user input.

// Secret channel (in-memory)
let secretUnlocked = false;
let secretIdx = -1;

function unlockSecretChannel() {
  if (secretUnlocked) return;
  secretUnlocked = true;

  const secret = {
    ch: SECRET_CHANNEL_NUMBER,
    type: 'video',
    name: 'Archive',
    hex: '#0e0c08',
    r: 14, g: 12, b: 8,
    desc: 'signal interference',
    src: './assets/videos/clip-secret.mp4'
  };

  CHANNELS.push(secret);
  secretIdx = CHANNELS.length - 1;
  // No extra button: access CH 666 by typing 6 6 6 (only after unlock).

  // Spike distortion a little when it unlocks
  distortionLevel = Math.max(distortionLevel, 2);
  staticBurst = 1.0;
}

// Render loop
setGlow(CHANNELS[currentIdx]);
loadVideoForChannel(CHANNELS[currentIdx]);

// Initial power state
setPowerState(true);

let last = performance.now();
function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;

  frameCount++;
  updateDistortion(dt);
  updateAutonomy(dt);
  endFreezeIfNeeded(now);

  // Scare flash decay
  if (scareHold > 0) {
    scareHold -= dt;
  } else {
    scareFlash = scareFlash > 0.001 ? scareFlash * 0.78 : 0;
  }

  staticBurst = staticBurst > 0.01 ? staticBurst * 0.82 : 0;
  drawChannel(CHANNELS[currentIdx]);

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
