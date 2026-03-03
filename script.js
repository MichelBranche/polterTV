// After Sign-Off: Interference
// Canvas CRT + video channels + progressive corruption + possession behaviors
// Fix: no random early autoskips, robust end detection, robust stall recovery

const CHANNELS = [
  { ch:  1, type: 'color', name: 'POLTERTV', hex: '#18b507cb', r:26, g:24, b:20, desc:'OR THE LIFE IF U PREFER' },
  { ch:  2, type: 'video', name: 'Tape',  hex: '#2e3d4f', r:46,  g:61,  b:79,  desc:'archive fragment',      src:'./assets/videos/clip-02.mp4' },
  { ch:  3, type: 'video', name: 'Room',  hex: '#6b7f8e', r:107, g:127, b:142, desc:'still laughing',         src:'./assets/videos/clip-03.mp4' },
  { ch:  4, type: 'video', name: 'Rain',  hex: '#8fafc2', r:143, g:175, b:194, desc:'the sky at midnight',    src:'./assets/videos/clip-01.mp4' },
  { ch:  5, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-05.mp4' },
  { ch:  6, type: 'video', name: 'Clay',  hex: '#9c7c5e', r:156, g:124, b:94,  desc:'exposed earth',          src:'./assets/videos/clip-06.mp4' },
  { ch:  7, type: 'video', name: 'Ochre', hex: '#c4893a', r:196, g:137, b:58,  desc:'amber before the storm', src:'./assets/videos/clip-07.mp4' },
  { ch:  8, type: 'video', name: 'Petal', hex: '#d4a5a0', r:212, g:165, b:160, desc:'wild rose, last bloom',  src:'./assets/videos/clip-08.mp4' },
  { ch:  9, type: 'video', name: 'Dust',  hex: '#c8bfad', r:200, g:191, b:173, desc:'dry road before rain',   src:'./assets/videos/clip-09.mp4' },
  { ch: 10, type: 'video', name: 'Stone', hex: '#e8e2d9', r:232, g:226, b:217, desc:'limestone in afternoon light', src:'./assets/videos/clip-10.mp4' },
  { ch: 11, type: 'video', name: 'Petal', hex: '#d4a5a0', r:212, g:165, b:160, desc:'wild rose, last bloom',  src:'./assets/videos/clip-11.mp4' },
  { ch: 12, type: 'video', name: 'Petal', hex: '#d4a5a0', r:212, g:165, b:160, desc:'wild rose, last bloom',  src:'./assets/videos/clip-12.mp4' },
  { ch: 13, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-13.mp4' },
  { ch: 14, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-14.mp4' },
  { ch: 15, type: 'video', name: 'Ochre', hex: '#c4893a', r:196, g:137, b:58,  desc:'amber before the storm', src:'./assets/videos/clip-15.mp4' },
  { ch: 16, type: 'video', name: 'Tape',  hex: '#2e3d4f', r:46,  g:61,  b:79,  desc:'archive fragment',      src:'./assets/videos/clip-16.mp4' },
  { ch: 17, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-17.mp4' },
  { ch: 18, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-18.mp4' },
  { ch: 19, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-19.mp4' },
  { ch: 20, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-20.mp4' },
  { ch: 21, type: 'video', name: 'Ochre', hex: '#c4893a', r:196, g:137, b:58,  desc:'amber before the storm', src:'./assets/videos/clip-21.mp4' },
  { ch: 22, type: 'video', name: 'Room',  hex: '#6b7f8e', r:107, g:127, b:142, desc:'still laughing',         src:'./assets/videos/clip-22.mp4' },
  { ch: 23, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-23.mp4' },
  { ch: 24, type: 'video', name: 'Dust',  hex: '#c8bfad', r:200, g:191, b:173, desc:'dry road before rain',   src:'./assets/videos/clip-24.mp4' },
  { ch: 25, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-25.mp4' },
  { ch: 26, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-26.mp4' },
  { ch: 27, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-27.mp4' },
  { ch: 28, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-28.mp4' },
  { ch: 29, type: 'video', name: 'Tape',  hex: '#2e3d4f', r:46,  g:61,  b:79,  desc:'archive fragment',      src:'./assets/videos/clip-29.mp4' },
  { ch: 30, type: 'video', name: 'Tape',  hex: '#2e3d4f', r:46,  g:61,  b:79,  desc:'archive fragment',      src:'./assets/videos/clip-30.mp4' },
  { ch: 31, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-31.mp4' },
  { ch: 32, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-32.mp4' },
  { ch: 33, type: 'video', name: 'Ochre', hex: '#c4893a', r:196, g:137, b:58,  desc:'amber before the storm', src:'./assets/videos/clip-33.mp4' },
  { ch: 34, type: 'video', name: 'Ochre', hex: '#c4893a', r:196, g:137, b:58,  desc:'amber before the storm', src:'./assets/videos/clip-34.mp4' },
  { ch: 35, type: 'video', name: 'Petal', hex: '#d4a5a0', r:212, g:165, b:160, desc:'wild rose, last bloom',  src:'./assets/videos/clip-35.mp4' },
  { ch: 36, type: 'video', name: 'Petal', hex: '#d4a5a0', r:212, g:165, b:160, desc:'wild rose, last bloom',  src:'./assets/videos/clip-36.mp4' },
  { ch: 37, type: 'video', name: 'Rain',  hex: '#8fafc2', r:143, g:175, b:194, desc:'the sky at midnight',    src:'./assets/videos/clip-37.mp4' },
  { ch: 38, type: 'video', name: 'Rain',  hex: '#8fafc2', r:143, g:175, b:194, desc:'the sky at midnight',    src:'./assets/videos/clip-38.mp4' },
  { ch: 39, type: 'video', name: 'Rain',  hex: '#8fafc2', r:143, g:175, b:194, desc:'the sky at midnight',    src:'./assets/videos/clip-39.mp4' },
  { ch: 40, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-40.mp4' },
  { ch: 41, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-41.mp4' },
  { ch: 42, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-42.mp4' },
  { ch: 43, type: 'video', name: 'Tape',  hex: '#2e3d4f', r:46,  g:61,  b:79,  desc:'archive fragment',      src:'./assets/videos/clip-43.mp4' },
  { ch: 44, type: 'video', name: 'Ochre', hex: '#c4893a', r:196, g:137, b:58,  desc:'amber before the storm', src:'./assets/videos/clip-44.mp4' },
  { ch: 45, type: 'video', name: 'Ochre', hex: '#c4893a', r:196, g:137, b:58,  desc:'amber before the storm', src:'./assets/videos/clip-45.mp4' },
  { ch: 46, type: 'video', name: 'Echo',  hex: '#4a5e45', r:74,  g:94,  b:69,  desc:'replay drift',           src:'./assets/videos/clip-46.mp4' },
  { ch: 47, type: 'video', name: 'Petal', hex: '#d4a5a0', r:212, g:165, b:160, desc:'wild rose, last bloom',  src:'./assets/videos/clip-47.mp4' },
  { ch: 48, type: 'video', name: 'Petal', hex: '#d4a5a0', r:212, g:165, b:160, desc:'wild rose, last bloom',  src:'./assets/videos/clip-48.mp4' },
  { ch: 49, type: 'video', name: 'Room',  hex: '#6b7f8e', r:107, g:127, b:142, desc:'still laughing',         src:'./assets/videos/clip-49.mp4' },
  { ch: 50, type: 'video', name: 'Room',  hex: '#ee0404', r:107, g:127, b:142, desc:'still laughing',         src:'./assets/videos/clip-50.mp4' },
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
let frameCount   = 0;

// Power
let tvOn = true;
const powerBtn = document.getElementById('powerBtn');
const volBtn   = document.getElementById('volBtn');

// Volume (0..4 steps) + OSD
let volumeStep = 3; // 0..4
const VOLUME_STEPS = [0.0, 0.25, 0.5, 0.75, 1.0];
let volumeOSDUntil = 0;

function setVolumeStep(step, showOsd = true) {
  volumeStep = Math.max(0, Math.min(4, step));
  const v = VOLUME_STEPS[volumeStep];

  try {
    videoEl.muted = (v === 0);
    videoEl.volume = v;
  } catch {}

  if (audioEnabled && masterGain && audioCtx) {
    masterGain.gain.setTargetAtTime(v, audioCtx.currentTime, 0.03);
  }

  if (showOsd) volumeOSDUntil = performance.now() + 1800;
}

function bumpVolume(delta) {
  if (!tvOn) return;
  tickPossessedTyping();

  ensureAudio();
  if (audioCtx && audioCtx.state === 'suspended') { try { audioCtx.resume(); } catch {} }

  if (delta > 0) setVolumeStep((volumeStep + 1) % 5);
  else if (delta < 0) setVolumeStep((volumeStep + 4) % 5);
}

function setPowerState(isOn) {
  tvOn = !!isOn;

  document.body.classList.toggle('tv-off', !tvOn);
  tvScreen.classList.toggle('off', !tvOn);
  if (powerBtn) powerBtn.setAttribute('aria-pressed', String(tvOn));

  channelButtons.forEach(btn => (btn.disabled = !tvOn));

  if (!tvOn) {
    resetChannelInput();
    staticBurst = 0;
    try { videoEl.pause(); } catch {}
  } else {
    loadVideoForChannel(CHANNELS[currentIdx]);
    setVolumeStep(volumeStep, false);
    staticBurst = 0.9;
  }
}

function togglePower() {
  lastUserActionAt = performance.now();
  if (switching) return;

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

// Corruption / distortion
let switchCount  = 0;
let timeAlive    = 0;
let corruption   = 0;

let distortionLevel = 0;       // 0..3
let distortionStrength = 0.0;  // 0..1
let spikeAmp = 0.0;            // 0..1
let spikeT = 0.0;
let nextSpikeAt = 5.0;

// Autonomy
let nextAutonomyAt = 9999;

// Scary flashes
let scareFlash = 0.0;
let scareHold  = 0.0;

// Possession phase 2
let flickerOffUntil = 0;
let hardCooldownUntil = 0;
let possessedTyping = false;
let possessedTarget = '';
let possessedNextTypeAt = 0;
let possessedAttempts = 0;
let freezeUntil = 0;
let freezeText = '';
let freezeTextUntil = 0;
let stingerUntil = 0;

// Freeze-frame buffer
const freezeFrame = document.createElement('canvas');
const freezeFrameCtx = freezeFrame.getContext('2d', { alpha: false });

// Secret channel unlock
const secretSeq = [7,3,9,1];
let inputBuf = [];

// Retro channel strip / keypad
const strip = document.getElementById('channelStrip');
const channelButtons = [];
const digits = [1,2,3,4,5,6,7,8,9,0];

// Retro channel input
let channelInput = '';
let channelInputTimer = null;
const MAX_CHANNEL_NUMBER = 150;
const SECRET_CHANNEL_NUMBER = 666;
const CHANNEL_INPUT_MAX_DIGITS = String(Math.max(MAX_CHANNEL_NUMBER, SECRET_CHANNEL_NUMBER)).length; // 3
const CHANNEL_INPUT_COMMIT_MS = 1100;

// Micro-frame + cult mode
let lastMicroFrameAt = 0;
let microFrameUntil = 0;
let lastCultAt = 0;
let cultModeActive = false;
let cultUntil = 0;

// Video stability tracking (THIS is the fix)
let videoLoadStartedAt = 0;    // ms
let videoLastTime = 0;         // seconds
let videoLastProgressAt = 0;   // ms
let videoStallSince = 0;       // ms (0 = not stalling)
let currentVideoSrc = '';

function clamp01(x) { return Math.max(0, Math.min(1, x)); }

function smoothstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

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

  const idx = CHANNELS.findIndex(c => c.ch === num);
  if (idx !== -1) switchTo(idx);
}

function pushDigit(d) {
  if (!tvOn) return;

  ensureAudio();
  if (audioCtx && audioCtx.state === 'suspended') { try { audioCtx.resume(); } catch {} }

  if (channelInput.length >= CHANNEL_INPUT_MAX_DIGITS) channelInput = '';
  channelInput += String(d);

  inputBuf.push(d);
  if (inputBuf.length > 4) inputBuf.shift();
  if (inputBuf.length === 4 && inputBuf.every((v, i) => v === secretSeq[i])) {
    unlockSecretChannel();
  }

  if (channelInputTimer) clearTimeout(channelInputTimer);
  channelInputTimer = setTimeout(() => commitChannelInput(), CHANNEL_INPUT_COMMIT_MS);
}

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

function updateButtons() {}

// Glow
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

// Small helper for rounded rectangles
function roundRect(ctx2, x, y, w, h, r) {
  const rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
  ctx2.moveTo(x + rr, y);
  ctx2.arcTo(x + w, y, x + w, y + h, rr);
  ctx2.arcTo(x + w, y + h, x, y + h, rr);
  ctx2.arcTo(x, y + h, x, y, rr);
  ctx2.arcTo(x, y, x + w, y, rr);
  ctx2.closePath();
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

// Video load (robust)
function resetVideoHealth(nowMs) {
  videoLoadStartedAt = nowMs;
  videoLastTime = 0;
  videoLastProgressAt = nowMs;
  videoStallSince = 0;
}

function loadVideoForChannel(ch) {
  const nowMs = performance.now();
  resetVideoHealth(nowMs);

  if (ch.type !== 'video') {
    try { videoEl.pause(); } catch {}
    videoEl.removeAttribute('src');
    currentVideoSrc = '';
    return;
  }

  currentVideoSrc = ch.src;

  try { videoEl.pause(); } catch {}

  try {
    videoEl.loop = false;
    videoEl.playsInline = true;
    videoEl.muted = false;
    videoEl.src = ch.src;
    videoEl.currentTime = 0;
    videoEl.load();
  } catch {}

  const playAttempt = () => {
    videoEl.play().catch(() => {
      // autoplay may be blocked until a gesture
    });
  };

  videoEl.onloadedmetadata = () => {
    resetVideoHealth(performance.now());
    playAttempt();
  };

  // small extra attempt for cached metadata situations
  setTimeout(playAttempt, 60);
  setTimeout(playAttempt, 260);
}

// Auto-next rules
let lastUserActionAt = performance.now();

function safeAutoNext(reason) {
  if (!tvOn) return;
  if (switching) return;

  const ch = CHANNELS[currentIdx];
  if (!ch || ch.type !== 'video') return;

  // if user is typing digits, do not sabotage
  if (channelInput && channelInput.length) return;

  // do not chain multiple triggers in the same instant
  const now = performance.now();
  if (now - lastUserActionAt < 120) return;

  next();
}

// Video events (do not overreact)
videoEl.addEventListener('timeupdate', () => {
  const now = performance.now();
  const t = videoEl.currentTime || 0;
  if (t > videoLastTime + 0.01) {
    videoLastTime = t;
    videoLastProgressAt = now;
    videoStallSince = 0;
  }
});

videoEl.addEventListener('playing', () => {
  const now = performance.now();
  videoLastProgressAt = now;
  videoStallSince = 0;
});

videoEl.addEventListener('ended', () => {
  // Always go next when ended, unless user typing digits
  safeAutoNext('ended');
});

videoEl.addEventListener('error', () => {
  // If decode fails or file missing, do not freeze
  staticBurst = Math.max(staticBurst, 1.0);
  spikeAmp = Math.max(spikeAmp, 0.75);
  setTimeout(() => safeAutoNext('error'), 220);
});

videoEl.addEventListener('stalled', () => {
  // stalled can happen in normal buffering, do NOT skip immediately
  const now = performance.now();
  if (!videoStallSince) videoStallSince = now;

  // try recover
  try { videoEl.play(); } catch {}

  // if it persists, watchdog will handle it (3+ seconds)
});

videoEl.addEventListener('waiting', () => {
  const now = performance.now();
  if (!videoStallSince) videoStallSince = now;
});

// AUDIO (Web Audio API)
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

function makeDistortionCurve(amount = 0) {
  const n = 2048;
  const curve = new Float32Array(n);
  const k = 2 + amount * 98;
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / (n - 1) - 1;
    curve[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
  }
  return curve;
}

function ensureAudio() {
  if (audioEnabled) return;

  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    mediaSrc = audioCtx.createMediaElementSource(videoEl);

    preGain = audioCtx.createGain();
    lpFilter = audioCtx.createBiquadFilter();
    lpFilter.type = 'lowpass';

    shaper = audioCtx.createWaveShaper();
    shaper.oversample = '2x';

    delay = audioCtx.createDelay(1.0);
    delay.delayTime.value = 0.12;

    delayGain = audioCtx.createGain();
    feedbackGain = audioCtx.createGain();

    masterGain = audioCtx.createGain();

    delay.connect(feedbackGain);
    feedbackGain.connect(delay);

    mediaSrc.connect(preGain);
    preGain.connect(lpFilter);
    lpFilter.connect(shaper);

    shaper.connect(masterGain);

    shaper.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(masterGain);

    masterGain.connect(audioCtx.destination);

    masterGain.gain.value = 0.9;
    preGain.gain.value = 1.0;
    lpFilter.frequency.value = 18000;
    shaper.curve = makeDistortionCurve(0);
    delayGain.gain.value = 0.0;
    feedbackGain.gain.value = 0.0;

    audioEnabled = true;
    setVolumeStep(volumeStep, false);
  } catch {
    audioEnabled = false;
  }
}

function setAudioMood(c, spike) {
  if (!audioEnabled || !audioCtx) return;

  const dark = c * c;

  const cutoff = 18000 - dark * 11000;
  const drive  = Math.min(1, dark * 0.55 + spike * 0.75);
  const wet    = Math.min(0.35, dark * 0.12 + spike * 0.30);
  const fb     = Math.min(0.28, dark * 0.10 + spike * 0.22);

  lpFilter.frequency.setTargetAtTime(cutoff, audioCtx.currentTime, 0.02);
  shaper.curve = makeDistortionCurve(drive);

  delayGain.gain.setTargetAtTime(wet, audioCtx.currentTime, 0.03);
  feedbackGain.gain.setTargetAtTime(fb, audioCtx.currentTime, 0.03);

  const tremble = dark > 0.75 ? (0.99 + Math.sin(frameCount * 0.06) * 0.01) : 1.0;
  masterGain.gain.setTargetAtTime(VOLUME_STEPS[volumeStep] * tremble, audioCtx.currentTime, 0.02);

  if (videoEl && CHANNELS[currentIdx] && CHANNELS[currentIdx].type === 'video') {
    const baseRate = 1.0 - dark * 0.02;
    const wobble = (dark > 0.45 ? Math.sin(frameCount * 0.03) * (0.001 + dark * 0.003) : 0);
    const spikeDrop = spike * 0.055;
    const r = Math.max(0.88, Math.min(1.02, baseRate + wobble - spikeDrop));
    videoEl.playbackRate = r;
  }
}

// Distortion schedule
function updateDistortion(dt) {
  timeAlive += dt;

  // ramp earlier for live pacing
  const tTime = smoothstep(20, 180, timeAlive);
  const tSw   = smoothstep(8, 180, switchCount);
  corruption = clamp01(Math.max(tTime * 0.90, tSw * 0.75));

  if (timeAlive > 600) corruption = clamp01(corruption + 0.0006);

  distortionLevel = Math.floor(corruption * 3.2);
  distortionStrength = clamp01(corruption * 1.05);

  const lateBoost = smoothstep(0.75, 0.98, corruption);
  const mean = (18 - corruption * 11) - lateBoost * 2.4;

  spikeT += dt;

  if (spikeT >= nextSpikeAt) {
    spikeT = 0;

    const p = (0.10 + corruption * 0.40) + lateBoost * 0.20;
    if (Math.random() < p) {
      const nasty = Math.random() < (0.10 + lateBoost * 0.10);
      const rand = 0.75 + Math.random() * 0.55;

      spikeAmp = (0.18 + corruption * 0.48 + lateBoost * 0.18) * rand + (nasty ? 0.20 : 0);
      spikeAmp = Math.min(1.1, spikeAmp);
      staticBurst = Math.max(staticBurst, nasty ? 1.0 : 0.85);
    }

    nextSpikeAt = Math.max(4.5, mean + (Math.random() - 0.5) * 6);
  }

  spikeAmp = spikeAmp > 0.001 ? spikeAmp * (0.80 - corruption * 0.10 - lateBoost * 0.06) : 0;

  if (corruption > 0.82) {
    const ultra = smoothstep(0.88, 0.99, corruption);
    const chancePerSec = 0.0012 + ultra * 0.006;
    if (Math.random() < chancePerSec * dt) {
      scareFlash = 1.0;
      scareHold = 0.16 + ultra * 0.10;
      spikeAmp = Math.max(spikeAmp, 1.0);
      staticBurst = Math.max(staticBurst, 1.0);
    }
  }

  // Cult earlier (4 min), intensify after 6 min, then 10 min
  updateCultMode(dt);

  // auto unlock 666 very late
  if (!secretUnlocked && corruption > 0.93 && timeAlive > 320) unlockSecretChannel();

  setAudioMood(corruption, spikeAmp);
}

function updateCultMode(dt) {
  const now = performance.now();

  // starts around 4 minutes (live pacing)
  if (timeAlive < 240) return;

  if (cultModeActive && now >= cultUntil) cultModeActive = false;

  // keep a cooldown so it is a "phase", not noise
  if (now - lastCultAt < 32000) return;

  const after6  = timeAlive >= 360;
  const after10 = timeAlive >= 600;

  const baseChance = after10 ? 0.10 : after6 ? 0.075 : 0.055;
  if (Math.random() < baseChance * dt) {
    lastCultAt = now;
    cultModeActive = true;
    const dur = after10 ? 7000 : after6 ? 5200 : 3400;
    cultUntil = now + dur;
  }
}

// Autonomy (possession does stuff even if active, becomes frequent later)
function updateAutonomy(dt) {
  if (!tvOn) return;

  const now = performance.now();
  const idleMs = now - lastUserActionAt;

  const late     = (timeAlive > 150 && corruption > 0.68);
  const veryLate = (timeAlive > 230 && corruption > 0.80);
  const ultra    = (timeAlive > 320 && corruption > 0.88);

  if (!late) {
    nextAutonomyAt = now + 999999;
    return;
  }

  if (now < nextAutonomyAt) return;

  const activity = clamp01(idleMs / 7000);
  const c = clamp01(corruption);

  const base = 0.040 + c * 0.080;                  // baseline, even while active
  const idleBoost = activity * (0.030 + c * 0.070);
  const lateBoost = veryLate ? 0.030 : 0.0;
  const ultraBoost = ultra ? 0.050 : 0.0;

  const chancePerSec = base + idleBoost + lateBoost + ultraBoost;

  if (Math.random() < chancePerSec * dt) {
    const r = Math.random();

    if (ultra && r < 0.14) {
      triggerStinger();
    } else if ((veryLate || ultra) && r < (ultra ? 0.30 : 0.18)) {
      triggerPowerBlink();
    } else if ((veryLate || ultra) && r < (ultra ? 0.52 : 0.38)) {
      const msgs = ['YOU WERE HERE', 'STAY', 'NO SIGNAL', 'DO NOT SWITCH'];
      startFreezeHit(msgs[(Math.random() * msgs.length) | 0]);
    } else if ((veryLate || ultra) && r < (ultra ? 0.72 : 0.56)) {
      startPossessedTyping(SECRET_CHANNEL_NUMBER);
    } else if (r < (ultra ? 0.86 : veryLate ? 0.80 : 0.72)) {
      const maxHop = ultra ? 6 : veryLate ? 4 : 2;
      const hop = (Math.random() < 0.5 ? -1 : 1) * (1 + ((Math.random() * maxHop) | 0));
      resetChannelInput();
      switchTo(currentIdx + hop);
    } else if (r < (ultra ? 0.94 : veryLate ? 0.92 : 0.88)) {
      const delta = (Math.random() < 0.55 ? 1 : -1) * (ultra ? 2 : 1);
      setVolumeStep(volumeStep + delta);
    } else {
      spikeAmp = Math.max(spikeAmp, 0.60 + (veryLate ? 0.22 : 0.10) + (ultra ? 0.12 : 0));
      staticBurst = Math.max(staticBurst, 1.0);
    }

    const baseMs = ultra ? 900 : veryLate ? 1500 : 2400;
    const jitter = (Math.random() - 0.5) * (ultra ? 500 : veryLate ? 800 : 1100);
    nextAutonomyAt = now + Math.max(650, baseMs + jitter);
  } else {
    nextAutonomyAt = now + (ultra ? 220 : 360);
  }
}

function canDoHardScare() {
  const now = performance.now();
  return now >= hardCooldownUntil && tvOn && !switching;
}

function setHardCooldown(ms) {
  hardCooldownUntil = performance.now() + ms;
}

function triggerPowerBlink() {
  if (!canDoHardScare()) return;

  switching = true;
  staticBurst = 1.0;
  tvScreen.classList.add('switching');

  const now = performance.now();
  flickerOffUntil = now + 140;

  setTimeout(() => {
    tvScreen.classList.remove('switching');
    switching = false;
  }, 450);

  setHardCooldown(1800);
}

function startFreezeHit(text) {
  if (!canDoHardScare()) return;

  if (CHANNELS[currentIdx] && CHANNELS[currentIdx].type === 'video' && videoEl.readyState >= 2) {
    try {
      freezeFrame.width = CW;
      freezeFrame.height = CH;
      freezeFrameCtx.setTransform(1,0,0,1,0,0);
      freezeFrameCtx.drawImage(videoEl, 0, 0, CW, CH);
      videoEl.pause();
    } catch {}
  }

  const now = performance.now();
  freezeUntil = now + 520;
  freezeText = text || '';
  freezeTextUntil = now + 520;

  spikeAmp = Math.max(spikeAmp, 1.0);
  staticBurst = Math.max(staticBurst, 1.0);
  scareFlash = Math.max(scareFlash, 0.85);
  scareHold = Math.max(scareHold, 0.12);

  setHardCooldown(2200);
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

  if (channelInput.length > 0) {
    possessedNextTypeAt = now + 650;
    return;
  }

  const nextLen = (channelInput.length || 0) + 1;
  channelInput = possessedTarget.slice(0, nextLen);

  const hesitation = Math.random() < 0.22;
  possessedNextTypeAt = now + (hesitation ? 520 : 220);

  if (channelInput.length >= possessedTarget.length) {
    possessedNextTypeAt = now + 380;
    possessedAttempts++;
    commitChannelInput();
    if (possessedAttempts >= 2) stopPossessedTyping();
  }
}

function triggerStinger() {
  if (!canDoHardScare()) return;

  const now = performance.now();
  stingerUntil = now + 350;

  spikeAmp = Math.max(spikeAmp, 1.05);
  staticBurst = Math.max(staticBurst, 1.0);
  scareFlash = Math.max(scareFlash, 1.0);
  scareHold = Math.max(scareHold, 0.18);

  setTimeout(() => startPossessedTyping(SECRET_CHANNEL_NUMBER), 180);

  setHardCooldown(3200);
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
  if (scareFlash > 0.01) {
    ctx.save();
    ctx.scale(DPR, DPR);

    const w = CW / DPR, h = CH / DPR;
    const a = clamp01(scareFlash);

    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = `rgba(180, 0, 0, ${0.22 + a * 0.55})`;
    ctx.fillRect(0, 0, w, h);

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

  ctx.save();
  ctx.scale(DPR, DPR);

  const w = CW / DPR, h = CH / DPR;
  const redA = 0.04 + s * 0.16 + spike * 0.10;
  ctx.globalCompositeOperation = 'multiply';

  const vg = ctx.createRadialGradient(w/2, h/2, Math.min(w,h)*0.15, w/2, h/2, Math.min(w,h)*0.75);
  vg.addColorStop(0, `rgba(120,0,0,0)`);
  vg.addColorStop(1, `rgba(160,0,0,${redA})`);
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);

  ctx.restore();

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

// Micro-frame
function maybeDrawMicroFrame() {
  const now = performance.now();

  if (now < microFrameUntil) {
    drawMicroFrameOverlay();
    return;
  }

  const minGap = timeAlive > 360 ? 13000 : 20000;
  if (now - lastMicroFrameAt < minGap) return;
  if (corruption < 0.58) return;

  const p = 0.0028 + clamp01((corruption - 0.58) / 0.42) * 0.0060;
  if (Math.random() < p) {
    lastMicroFrameAt = now;
    microFrameUntil = now + (Math.random() < 0.25 ? 34 : 17);
    drawMicroFrameOverlay();
  }
}

function drawMicroFrameOverlay() {
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.85)';
  ctx.fillRect(0, 0, CW, CH);

  ctx.scale(DPR, DPR);
  const w = CW / DPR, h = CH / DPR;
  const fs = Math.floor(w * 0.10);
  ctx.font = `bold ${fs}px 'VT323', monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = 'rgba(180, 0, 0, 0.92)';
  const messages = ['YOU MISSED IT', 'DO NOT SWITCH', 'WE ARE STILL LIVE'];
  const msg = messages[(Math.random() * messages.length) | 0];
  ctx.fillText(msg, w / 2, h / 2);

  ctx.restore();
}

// Cult Mode overlay
function drawCultModeOverlay() {
  if (!cultModeActive) return;

  ctx.save();
  ctx.scale(DPR, DPR);

  const w = CW / DPR, h = CH / DPR;

  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = 'rgba(110, 0, 0, 0.30)';
  ctx.fillRect(0, 0, w, h);

  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  const fs = Math.floor(w * 0.055);
  ctx.font = `bold ${fs}px 'Share Tech Mono', monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 10;
  ctx.fillText('', w / 2, h * 0.56);

  ctx.restore();
}

function drawChannelLabel(ch, osdInput) {
  const { ch: chNum } = ch;

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

  const blinkOn = (Math.floor(frameCount / 20) % 2) === 0;
  const cursor = (typing && blinkOn) ? '_' : (typing ? ' ' : '');

  let labelText = `CH ${labelNum}${cursor}`;

  if (corruption > 0.55 && Math.random() < (0.08 + corruption * 0.12)) {
    labelText = labelText.replace(/0/g, 'O').replace(/1/g, 'I');
    if (corruption > 0.82 && Math.random() < 0.25) {
      labelText = labelText.replace(/6/g, (Math.random() < 0.5 ? '9' : 'G'));
    }
  }

  if (corruption > 0.86 && Math.random() < 0.012) {
    labelText = `CH 666${cursor}`;
  }

  const padX = Math.floor(fontSize * 0.42);
  const padY = Math.floor(fontSize * 0.32);
  const metrics = ctx.measureText(labelText);
  const boxW = Math.ceil(metrics.width) + padX * 2;
  const boxH = Math.ceil(fontSize * 1.08) + padY * 2;

  const bx = Math.floor((x/DPR) - padX);
  const by = Math.floor((y/DPR) - fontSize - padY);

  ctx.fillStyle = 'rgba(0,0,0,0.72)';
  ctx.beginPath();
  roundRect(ctx, bx, by, boxW, boxH, Math.floor(fontSize * 0.22));
  ctx.fill();

  ctx.strokeStyle = 'rgba(232,226,217,0.18)';
  ctx.lineWidth = 1;
  ctx.stroke();

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

  const bx = x + pad + tw + pad;
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

  const nameSize = (CW/DPR) * 0.155;
  ctx.font = `${Math.floor(nameSize)}px 'VT323', monospace`;
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.fillText(String(name).toUpperCase(), (CW/DPR)/2 + 2, (CH/DPR)/2 + nameSize*0.34 + 2);
  ctx.fillStyle = mainColor;
  ctx.fillText(String(name).toUpperCase(), (CW/DPR)/2, (CH/DPR)/2 + nameSize*0.34);

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
  if (!tvOn) {
    ctx.fillStyle = '#060504';
    ctx.fillRect(0, 0, CW, CH);
    drawVignette();
    drawStatic(0.02);
    return;
  }

  const nowMs = performance.now();

  if (nowMs < flickerOffUntil) {
    ctx.fillStyle = '#050403';
    ctx.fillRect(0, 0, CW, CH);
    drawVignette();
    drawStatic(0.06);
    return;
  }

  ctx.fillStyle = ch.hex;
  ctx.fillRect(0, 0, CW, CH);

  if (ch.type === 'video' && videoEl.readyState >= 2) {
    if (nowMs < freezeUntil && freezeFrame.width === CW && freezeFrame.height === CH) {
      ctx.drawImage(freezeFrame, 0, 0, CW, CH);
    } else {
      ctx.drawImage(videoEl, 0, 0, CW, CH);
    }
  }

  drawVignette();
  drawPhosphorWarmth(ch);
  drawScanBand();

  glitchTimer++;
  const glitchChance = 0.02 + distortionLevel * 0.02;
  if (glitchTimer > (140 - distortionLevel * 20) && Math.random() < glitchChance) {
    glitchTimer = 0;
    const gy = (Math.random() * CH) | 0;
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * (0.12 + distortionLevel * 0.08)})`;
    ctx.fillRect(0, gy, CW, (Math.random() * 2 + 1) * DPR);
  }

  drawChannelLabel(ch, channelInput);
  drawVolumeOSD();

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

  if (ch.type === 'color') drawInfoText(ch);

  const base = distortionStrength;
  const spike = spikeAmp;
  const vis = clamp01(base * 0.9 + spike * 0.95);

  if (vis > 0.01) {
    applyShear(vis);
    applyRgbSplit(vis);
    applyFlicker(vis);
    drawHauntOverlay(base, spike);
  }

  drawCultModeOverlay();
  maybeDrawMicroFrame();

  const staticAlpha = clamp01(staticBurst + spike * 0.55) * (0.42 + base * 0.22);
  drawStatic(cultModeActive ? staticAlpha * 0.45 : staticAlpha);
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

function next() {
  if (!tvOn) return;
  lastUserActionAt = performance.now();
  ensureAudio();
  if (audioCtx && audioCtx.state === 'suspended') { try { audioCtx.resume(); } catch {} }
  resetChannelInput();
  switchTo(currentIdx + 1);
}

function prev() {
  if (!tvOn) return;
  lastUserActionAt = performance.now();
  ensureAudio();
  if (audioCtx && audioCtx.state === 'suspended') { try { audioCtx.resume(); } catch {} }
  resetChannelInput();
  switchTo(currentIdx - 1);
}

// Input
document.getElementById('nextKnob').addEventListener('click', next);
document.getElementById('prevKnob').addEventListener('click', prev);

tvScreen.addEventListener('click', () => {
  if (!tvOn) return;
  ensureAudio();
  if (audioCtx && audioCtx.state === 'suspended') { try { audioCtx.resume(); } catch {} }
  next();
});

// Volume
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

// Power
if (powerBtn) powerBtn.addEventListener('click', togglePower);

// Keyboard
document.addEventListener('keydown', e => {
  lastUserActionAt = performance.now();

  if (e.key === 'p' || e.key === 'P') {
    e.preventDefault();
    togglePower();
    return;
  }

  if (/^[0-9]$/.test(e.key)) {
    e.preventDefault();
    pushDigit(parseInt(e.key, 10));
    return;
  }

  if (e.key === 'Enter') { e.preventDefault(); commitChannelInput(); return; }
  if (e.key === 'Escape') { e.preventDefault(); resetChannelInput(); return; }

  if (e.key === 'Backspace') {
    e.preventDefault();
    if (channelInput.length) {
      channelInput = channelInput.slice(0, -1);
      if (!channelInput.length) resetChannelInput();
      else {
        if (channelInputTimer) clearTimeout(channelInputTimer);
        channelInputTimer = setTimeout(() => commitChannelInput(), CHANNEL_INPUT_COMMIT_MS);
      }
    } else {
      resetChannelInput();
    }
    return;
  }

  if (!tvOn) return;

  if (e.key === '+' || e.key === '=' ) { e.preventDefault(); bumpVolume(+1); return; }
  if (e.key === '-' || e.key === '_' ) { e.preventDefault(); bumpVolume(-1); return; }

  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); next(); }
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowDown') { e.preventDefault(); prev(); }
});

window.addEventListener('scroll', () => { lastUserActionAt = performance.now(); }, { passive: true });
window.addEventListener('pointermove', () => { lastUserActionAt = performance.now(); }, { passive: true });
window.addEventListener('pointerdown', () => { lastUserActionAt = performance.now(); }, { passive: true });

// Secret channel
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

  distortionLevel = Math.max(distortionLevel, 2);
  staticBurst = 1.0;
}

// Watchdog: end and stall detection WITHOUT random skips
function watchdogVideo(nowMs) {
  const ch = CHANNELS[currentIdx];
  if (!tvOn || !ch || ch.type !== 'video') return;
  if (switching) return;

  // If ended flag true, go next
  if (videoEl.ended) {
    safeAutoNext('watchdog-ended');
    return;
  }

  // If metadata never loads for too long, go next
  if (videoEl.readyState < 2) {
    if (nowMs - videoLoadStartedAt > 6500) {
      safeAutoNext('watchdog-no-decode');
    }
    return;
  }

  const dur = videoEl.duration || 0;
  const t = videoEl.currentTime || 0;

  // If it is basically at the end and paused, go next (covers browsers that fail ended)
  if (dur > 0.5 && t >= dur - 0.08 && (videoEl.paused || videoEl.currentTime === videoLastTime)) {
    safeAutoNext('watchdog-near-end');
    return;
  }

  // Stall detection: if no progress for 3.2s while not paused, go next
  if (!videoEl.paused) {
    const noProgressMs = nowMs - videoLastProgressAt;
    if (noProgressMs > 3200) {
      safeAutoNext('watchdog-stall');
      return;
    }
  }

  // If buffering state persists for too long, go next
  if (videoStallSince && (nowMs - videoStallSince > 3600)) {
    safeAutoNext('watchdog-buffer-stuck');
    return;
  }
}

// Init
setGlow(CHANNELS[currentIdx]);
loadVideoForChannel(CHANNELS[currentIdx]);
setPowerState(true);

let last = performance.now();
function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;

  frameCount++;

  updateDistortion(dt);
  updateAutonomy(dt);
  tickPossessedTyping();
  endFreezeIfNeeded(now);

  // decay scare flash
  if (scareHold > 0) scareHold -= dt;
  else scareFlash = scareFlash > 0.001 ? scareFlash * 0.78 : 0;

  staticBurst = staticBurst > 0.01 ? staticBurst * 0.82 : 0;

  watchdogVideo(now);

  drawChannel(CHANNELS[currentIdx]);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);