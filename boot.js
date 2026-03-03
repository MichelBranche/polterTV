/*
  Boot sequence:
  1) Play Hyper-Scroll intro (auto-run + skip)
  2) Fade out intro
  3) Reveal PolterTV and lazy-load the original script.js (so it starts AFTER the intro)
*/

(function () {
  const introEl = document.getElementById('hyperIntro');
  const appEl = document.getElementById('polterApp');
  const skipBtn = document.getElementById('hyperSkip');

  // Safety: if something is missing, just start PolterTV.
  if (!introEl || !appEl) {
    loadPolter();
    return;
  }

  // --- Hyper-Scroll (scoped) ---
  const CONFIG = {
    itemCount: 20,
    starCount: 150,
    zGap: 800,
    loopSize: 0, // calculated
    camSpeed: 2.5,
  };
  CONFIG.loopSize = CONFIG.itemCount * CONFIG.zGap;

  const TEXTS = ["IMPACT", "VELOCITY", "BRUTAL", "SYSTEM", "FUTURE", "DESIGN", "PIXEL", "HYPER", "NEON", "VOID"];

  const state = {
    scroll: 0,
    velocity: 0,
    targetSpeed: 0,
    mouseX: 0,
    mouseY: 0,
  };

  const world = document.getElementById('hyperWorld');
  const viewport = document.getElementById('hyperViewport');
  const items = [];

  const fpsEl = document.getElementById('hyperFps');
  const velEl = document.getElementById('hyperVel');
  const coordEl = document.getElementById('hyperCoord');

  let running = true;
  let done = false;

  function initHyper() {
    if (!world || !viewport || typeof Lenis === 'undefined') return false;

    // Create Items
    for (let i = 0; i < CONFIG.itemCount; i++) {
      const el = document.createElement('div');
      el.className = 'item';

      const isHeading = i % 4 === 0;

      if (isHeading) {
        const txt = document.createElement('div');
        txt.className = 'big-text';
        txt.innerText = TEXTS[i % TEXTS.length];
        el.appendChild(txt);
        items.push({ el, type: 'text', x: 0, y: 0, rot: 0, baseZ: -i * CONFIG.zGap });
      } else {
        const card = document.createElement('div');
        card.className = 'card';
        const randId = Math.floor(Math.random() * 9999);
        card.innerHTML = `
          <div class="card-header">
            <span class="card-id">ID-${randId}</span>
            <div style="width: 10px; height: 10px; background: var(--accent);"></div>
          </div>
          <h2>${TEXTS[i % TEXTS.length]}</h2>
          <div class="card-footer">
            <span>GRID: ${Math.floor(Math.random() * 10)}x${Math.floor(Math.random() * 10)}</span>
            <span>DATA_SIZE: ${(Math.random() * 100).toFixed(1)}MB</span>
          </div>
          <div style="position:absolute; bottom:2rem; right:2rem; font-size:4rem; opacity:0.1; font-weight:900;">0${i}</div>
        `;
        el.appendChild(card);

        const angle = (i / CONFIG.itemCount) * Math.PI * 6;
        const x = Math.cos(angle) * (window.innerWidth * 0.3);
        const y = Math.sin(angle) * (window.innerHeight * 0.3);
        const rot = (Math.random() - 0.5) * 30;

        items.push({ el, type: 'card', x, y, rot, baseZ: -i * CONFIG.zGap });
      }

      world.appendChild(el);
    }

    // Stars
    for (let i = 0; i < CONFIG.starCount; i++) {
      const el = document.createElement('div');
      el.className = 'star';
      world.appendChild(el);
      items.push({
        el,
        type: 'star',
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.5) * 3000,
        baseZ: -Math.random() * CONFIG.loopSize,
      });
    }

    window.addEventListener('mousemove', onMouseMove);
    return true;
  }

  function onMouseMove(e) {
    state.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    state.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  // Lenis
  const lenis = (typeof Lenis !== 'undefined')
    ? new Lenis({ smooth: true, lerp: 0.08, direction: 'vertical', gestureDirection: 'vertical', smoothTouch: true })
    : null;

  if (lenis) {
    lenis.on('scroll', ({ scroll, velocity }) => {
      state.scroll = scroll;
      state.targetSpeed = velocity;
    });
  }

  let lastTime = 0;
  function raf(time) {
    if (!running) return;

    if (lenis) lenis.raf(time);

    // FPS
    const delta = time - lastTime;
    lastTime = time;
    if (fpsEl && delta > 0 && (time % 10) < 1) fpsEl.innerText = String(Math.round(1000 / delta));

    // Smooth velocity
    state.velocity += (state.targetSpeed - state.velocity) * 0.1;

    if (velEl) velEl.innerText = Math.abs(state.velocity).toFixed(2);
    if (coordEl) coordEl.innerText = String(state.scroll.toFixed(0));

    // Camera
    const tiltX = state.mouseY * 5 - state.velocity * 0.5;
    const tiltY = state.mouseX * 5;
    if (world) {
      world.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }

    // Perspective
    const baseFov = 1000;
    const fov = baseFov - Math.min(Math.abs(state.velocity) * 10, 600);
    if (viewport) viewport.style.perspective = `${fov}px`;

    // Render items
    const cameraZ = state.scroll * CONFIG.camSpeed;
    items.forEach((item) => {
      let relZ = item.baseZ + cameraZ;
      const modC = CONFIG.loopSize;
      let vizZ = ((relZ % modC) + modC) % modC;
      if (vizZ > 500) vizZ -= modC;

      let alpha = 1;
      if (vizZ < -3000) alpha = 0;
      else if (vizZ < -2000) alpha = (vizZ + 3000) / 1000;
      if (vizZ > 100 && item.type !== 'star') alpha = 1 - ((vizZ - 100) / 400);
      if (alpha < 0) alpha = 0;

      item.el.style.opacity = alpha;

      if (alpha > 0) {
        let trans = `translate3d(${item.x || 0}px, ${item.y || 0}px, ${vizZ}px)`;

        if (item.type === 'star') {
          const stretch = Math.max(1, Math.min(1 + Math.abs(state.velocity) * 0.1, 10));
          trans += ` scale3d(1, 1, ${stretch})`;
        } else if (item.type === 'text') {
          trans += ` rotateZ(${item.rot || 0}deg)`;
          if (Math.abs(state.velocity) > 1) {
            const offset = state.velocity * 2;
            item.el.style.textShadow = `${offset}px 0 red, ${-offset}px 0 cyan`;
          } else {
            item.el.style.textShadow = 'none';
          }
        } else {
          const t = time * 0.001;
          const float = Math.sin(t + (item.x || 0)) * 10;
          trans += ` rotateZ(${item.rot || 0}deg) rotateY(${float}deg)`;
        }

        item.el.style.transform = trans;
      }
    });

    requestAnimationFrame(raf);
  }

  function cleanupHyper() {
    running = false;
    window.removeEventListener('mousemove', onMouseMove);
    // Lenis has destroy in newer versions; if not present, ignore.
    try { if (lenis && typeof lenis.destroy === 'function') lenis.destroy(); } catch (_) {}
  }

  function finishIntro() {
    if (done) return;
    done = true;

    cleanupHyper();

    introEl.classList.add('hyper-out');

    // Reveal PolterTV under it
    appEl.classList.remove('is-hidden');

    // Load PolterTV script AFTER the fade starts (so any stutter is masked)
    setTimeout(loadPolter, 150);

    // Remove intro from DOM after transition
    const remove = () => {
      introEl.removeEventListener('transitionend', remove);
      if (introEl && introEl.parentNode) introEl.parentNode.removeChild(introEl);
    };
    introEl.addEventListener('transitionend', remove);

    // Fallback remove
    setTimeout(remove, 1200);
  }

  function loadPolter() {
    // Avoid double-load
    if (document.getElementById('polterScript')) return;

    const s = document.createElement('script');
    s.id = 'polterScript';
    s.src = './script.js';
    s.defer = true;
    document.body.appendChild(s);
  }

  function onSkipKey(e) {
    // Enter or Space
    if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      finishIntro();
    }
  }

  // Start
  const ok = initHyper();
  requestAnimationFrame(raf);

  // Auto-run camera forward
  // (If Lenis isn't available, we just time out and move on.)
  if (ok && lenis) {
    // Small delay so layout is ready
    setTimeout(() => {
      try {
        lenis.scrollTo(9000, { duration: 3.8, easing: (t) => t });
      } catch (_) {}
    }, 100);
  }

  // Duration cap (so it never traps you)
  setTimeout(finishIntro, 4200);

  // Skip handlers
  if (skipBtn) skipBtn.addEventListener('click', finishIntro);
  window.addEventListener('keydown', onSkipKey, { passive: false });

})();
