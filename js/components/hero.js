/**
 * ATOMVERSE - Hero Component: Visual Microcosm Zoom
 * 5-beat interactive visual journey zooming from Matter to Quantum Subatomic particles.
 * Low-spec laptop friendly (pure lightweight SVG/Canvas with CSS transitions).
 */

window.ATOMVERSE = window.ATOMVERSE || {};

window.ATOMVERSE.Hero = (function () {
  const beats = [
    {
      step: 1,
      title: "1. Macroscopic Matter",
      subtitle: "The Observable World",
      scale: "10⁰ m (Meters)",
      description: "Everything you see and touch—a crystal of salt, a droplet of water, or a breath of air—is macroscopic matter obeying classical physical laws. But zoom in a billion times, and continuous solid matter dissolves into discrete particles.",
      graphic: `
        <svg class="hero-svg" viewBox="0 0 400 300" aria-label="Macroscopic droplet and crystal">
          <defs>
            <radialGradient id="dropGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
              <stop offset="60%" stop-color="#0284c7" stop-opacity="0.7"/>
              <stop offset="100%" stop-color="#0369a1" stop-opacity="0.3"/>
            </radialGradient>
            <linearGradient id="crystGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#d97706" stop-opacity="0.3"/>
            </linearGradient>
          </defs>
          <!-- Water drop shape -->
          <path d="M 160,70 C 160,70 110,150 110,185 C 110,215 132,240 160,240 C 188,240 210,215 210,185 C 210,150 160,70 160,70 Z" fill="url(#dropGrad)" stroke="#38bdf8" stroke-width="2"/>
          <ellipse cx="145" cy="170" rx="12" ry="24" fill="#ffffff" opacity="0.3" transform="rotate(-20 145 170)"/>
          <!-- Crystal isometric block -->
          <polygon points="260,110 320,80 320,150 260,180" fill="url(#crystGrad)" stroke="#fbbf24" stroke-width="1.5"/>
          <polygon points="260,110 200,80 200,150 260,180" fill="#f59e0b" fill-opacity="0.4" stroke="#fbbf24" stroke-width="1.5"/>
          <polygon points="260,110 320,80 260,50 200,80" fill="#fef3c7" fill-opacity="0.7" stroke="#fbbf24" stroke-width="1.5"/>
          <text x="200" y="275" text-anchor="middle" fill="#94a3b8" font-size="13" font-family="inherit">Liquid Water & Mineral Crystals at Human Scale</text>
        </svg>
      `
    },
    {
      step: 2,
      title: "2. Molecular Networks",
      subtitle: "The Nanoscale Frontier",
      scale: "10⁻⁹ m (Nanometers)",
      description: "Passing through the surface boundary, individual chemical molecules emerge. Water is not a smooth continuous gel—it is billions of discrete H₂O molecules held together by dynamic hydrogen bonds and polar attractions.",
      graphic: `
        <svg class="hero-svg" viewBox="0 0 400 300" aria-label="Water molecules network">
          <g class="pulsing-mol">
            <!-- Molecule 1 (Center) -->
            <line x1="200" y1="140" x2="160" y2="105" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
            <line x1="200" y1="140" x2="240" y2="105" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
            <circle cx="200" cy="140" r="18" fill="#ef4444" stroke="#fca5a5" stroke-width="2"/>
            <text x="200" y="145" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">O</text>
            <circle cx="160" cy="105" r="11" fill="#e2e8f0" stroke="#ffffff" stroke-width="2"/>
            <text x="160" y="109" fill="#0f172a" font-size="10" font-weight="bold" text-anchor="middle">H</text>
            <circle cx="240" cy="105" r="11" fill="#e2e8f0" stroke="#ffffff" stroke-width="2"/>
            <text x="240" y="109" fill="#0f172a" font-size="10" font-weight="bold" text-anchor="middle">H</text>

            <!-- Intermolecular hydrogen bonds (dashed) -->
            <line x1="240" y1="105" x2="290" y2="140" stroke="#38bdf8" stroke-dasharray="4,4" stroke-width="2"/>
            <line x1="160" y1="105" x2="110" y2="140" stroke="#38bdf8" stroke-dasharray="4,4" stroke-width="2"/>

            <!-- Molecule 2 (Right) -->
            <circle cx="290" cy="140" r="14" fill="#ef4444" opacity="0.8"/>
            <circle cx="320" cy="165" r="9" fill="#e2e8f0" opacity="0.8"/>
            <line x1="290" y1="140" x2="320" y2="165" stroke="#94a3b8" stroke-width="2"/>

            <!-- Molecule 3 (Left) -->
            <circle cx="110" cy="140" r="14" fill="#ef4444" opacity="0.8"/>
            <circle cx="80" cy="165" r="9" fill="#e2e8f0" opacity="0.8"/>
            <line x1="110" y1="140" x2="80" y2="165" stroke="#94a3b8" stroke-width="2"/>
          </g>
          <text x="200" y="275" text-anchor="middle" fill="#94a3b8" font-size="13" font-family="inherit">Covalent H₂O Clusters with Hydrogen Bonding</text>
        </svg>
      `
    },
    {
      step: 3,
      title: "3. The Atomic Horizon",
      subtitle: "The Bohr Architecture",
      scale: "10⁻¹⁰ m (Angstroms / 0.1 nm)",
      description: "Zooming inside an individual atom reveals that it is mostly empty space. Negatively charged electrons orbit the center along quantized energy levels (shells K, L, M), forming an electron cloud around a miniscule center.",
      graphic: `
        <svg class="hero-svg" viewBox="0 0 400 300" aria-label="Bohr atom shells">
          <!-- Shells -->
          <circle cx="200" cy="140" r="40" fill="none" stroke="#22d3ee" stroke-dasharray="3,3" stroke-width="1.5" opacity="0.6"/>
          <circle cx="200" cy="140" r="75" fill="none" stroke="#22d3ee" stroke-dasharray="4,4" stroke-width="1.5" opacity="0.5"/>
          <circle cx="200" cy="140" r="105" fill="none" stroke="#22d3ee" stroke-dasharray="5,5" stroke-width="1" opacity="0.3"/>

          <!-- Orbiting electrons -->
          <circle cx="200" cy="100" r="6" fill="#22d3ee" filter="drop-shadow(0 0 4px #06b6d4)"/>
          <circle cx="200" cy="180" r="6" fill="#22d3ee" filter="drop-shadow(0 0 4px #06b6d4)"/>
          <circle cx="275" cy="140" r="6" fill="#22d3ee" filter="drop-shadow(0 0 4px #06b6d4)"/>
          <circle cx="125" cy="140" r="6" fill="#22d3ee" filter="drop-shadow(0 0 4px #06b6d4)"/>

          <!-- Nucleus dot -->
          <circle cx="200" cy="140" r="14" fill="#f59e0b" filter="drop-shadow(0 0 8px #fbbf24)"/>
          <text x="200" y="144" fill="#1e1b4b" font-size="10" font-weight="bold" text-anchor="middle">Nucleus</text>

          <text x="200" y="275" text-anchor="middle" fill="#94a3b8" font-size="13" font-family="inherit">Quantized Shells (K=2, L=8) Surrounding Dense Core</text>
        </svg>
      `
    },
    {
      step: 4,
      title: "4. The Atomic Nucleus",
      subtitle: "The Mass Center",
      scale: "10⁻¹⁵ m (Femtometers)",
      description: "Over 99.94% of the atom's total mass is concentrated in this dense nucleus. Positively charged protons and neutral neutrons are locked together by the Strong Nuclear Force, completely overcoming electrostatic proton-proton repulsion.",
      graphic: `
        <svg class="hero-svg" viewBox="0 0 400 300" aria-label="Nucleus protons and neutrons">
          <defs>
            <radialGradient id="nucGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="200" cy="140" r="90" fill="url(#nucGlow)"/>

          <!-- Protons (Amber) & Neutrons (Slate/Olive) clustered -->
          <circle cx="185" cy="125" r="18" fill="#f59e0b" stroke="#fcd34d" stroke-width="2"/>
          <text x="185" y="131" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">p⁺</text>

          <circle cx="215" cy="125" r="18" fill="#64748b" stroke="#94a3b8" stroke-width="2"/>
          <text x="215" y="131" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">n⁰</text>

          <circle cx="180" cy="155" r="18" fill="#64748b" stroke="#94a3b8" stroke-width="2"/>
          <text x="180" y="161" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">n⁰</text>

          <circle cx="215" cy="155" r="18" fill="#f59e0b" stroke="#fcd34d" stroke-width="2"/>
          <text x="215" y="161" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">p⁺</text>

          <circle cx="200" cy="140" r="17" fill="#f59e0b" stroke="#fcd34d" stroke-width="2"/>
          <text x="200" y="146" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">p⁺</text>

          <text x="200" y="275" text-anchor="middle" fill="#94a3b8" font-size="13" font-family="inherit">Protons (p⁺) & Neutrons (n⁰) Bound by Nuclear Force</text>
        </svg>
      `
    },
    {
      step: 5,
      title: "5. Chemical Bonds & Elements",
      subtitle: "Building the Entire Universe",
      scale: "The Complete Microcosm",
      description: "By varying the proton count (Atomic Number Z) and sharing or transferring valence electrons, 118 distinct elements combine into millions of chemical compounds that form everything in existence.",
      graphic: `
        <svg class="hero-svg" viewBox="0 0 400 300" aria-label="Chemical synthesis and elements">
          <g transform="translate(100, 130)">
            <circle cx="0" cy="0" r="30" fill="#38bdf8" fill-opacity="0.2" stroke="#38bdf8" stroke-width="2"/>
            <text x="0" y="6" fill="#38bdf8" font-size="16" font-weight="bold" text-anchor="middle">H</text>
          </g>
          <text x="150" y="136" fill="#fbbf24" font-size="24" font-weight="bold" text-anchor="middle">+</text>
          <g transform="translate(200, 130)">
            <circle cx="0" cy="0" r="38" fill="#ef4444" fill-opacity="0.2" stroke="#ef4444" stroke-width="2"/>
            <text x="0" y="6" fill="#ef4444" font-size="18" font-weight="bold" text-anchor="middle">O</text>
          </g>
          <text x="250" y="136" fill="#fbbf24" font-size="24" font-weight="bold" text-anchor="middle">→</text>
          <g transform="translate(300, 130)">
            <circle cx="0" cy="0" r="32" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2"/>
            <text x="0" y="5" fill="#10b981" font-size="14" font-weight="bold" text-anchor="middle">H₂O</text>
          </g>
          <text x="200" y="275" text-anchor="middle" fill="#94a3b8" font-size="13" font-family="inherit">Explore the 5 interactive wings below</text>
        </svg>
      `
    }
  ];

  let currentBeatIndex = 0;
  let autoTimer = null;
  let isPlaying = true;

  function render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="hero-container">
        <div class="hero-header-badge">
          <span class="pulse-dot"></span> Class 9 Interactive Science Museum
        </div>
        <h1 class="hero-title">Welcome to <span class="gradient-text">ATOMVERSE</span></h1>
        <p class="hero-subtitle">Journey deep into the foundational architecture of matter, from observable crystals down to quantized subatomic particles.</p>

        <!-- Interactive Journey Stepper -->
        <div class="zoom-stepper-wrapper">
          <div class="zoom-stepper-header">
            <div class="zoom-step-indicator">
              <span id="hero-step-badge" class="badge badge-amber">Beat 1 of 5</span>
              <span id="hero-scale-badge" class="badge badge-olive">Scale: 10⁰ m</span>
            </div>
            <div class="zoom-controls">
              <button id="hero-prev-btn" class="btn btn-ghost btn-sm" title="Previous Zoom Scale">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
                Prev
              </button>
              <button id="hero-play-btn" class="btn btn-outline btn-sm" title="Auto-advance toggle">
                <span id="play-pause-icon">⏸ Pause</span>
              </button>
              <button id="hero-next-btn" class="btn btn-ghost btn-sm" title="Next Zoom Scale">
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>

          <!-- Stepper Track / Progress Bar -->
          <div class="zoom-track">
            ${beats.map((b, idx) => `
              <button class="zoom-step-node ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                <span class="step-num">${b.step}</span>
                <span class="step-label">${b.title.split('. ')[1]}</span>
              </button>
            `).join('')}
          </div>

          <!-- Active Beat Showcase Panel -->
          <div class="zoom-stage card" id="hero-stage">
            <div class="zoom-visual-box" id="hero-visual">
              ${beats[0].graphic}
            </div>
            <div class="zoom-info-box">
              <h2 id="hero-stage-title" class="zoom-stage-title">${beats[0].title}</h2>
              <div id="hero-stage-sub" class="zoom-stage-sub">${beats[0].subtitle}</div>
              <p id="hero-stage-desc" class="zoom-stage-desc">${beats[0].description}</p>
              <div class="zoom-actions">
                <a href="#atom-explorer" class="btn btn-primary btn-sm">Jump into Atom Explorer ↓</a>
                <a href="#molecule-explorer" class="btn btn-secondary btn-sm">Explore Molecules ↓</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    bindEvents();
    startAutoAdvance();
  }

  function showBeat(index) {
    currentBeatIndex = (index + beats.length) % beats.length;
    const beat = beats[currentBeatIndex];

    const titleEl = document.getElementById("hero-stage-title");
    const subEl = document.getElementById("hero-stage-sub");
    const descEl = document.getElementById("hero-stage-desc");
    const visualEl = document.getElementById("hero-visual");
    const stepBadge = document.getElementById("hero-step-badge");
    const scaleBadge = document.getElementById("hero-scale-badge");

    if (titleEl) titleEl.textContent = beat.title;
    if (subEl) subEl.textContent = beat.subtitle;
    if (descEl) descEl.textContent = beat.description;
    if (stepBadge) stepBadge.textContent = `Beat ${beat.step} of 5`;
    if (scaleBadge) scaleBadge.textContent = `Scale: ${beat.scale}`;

    if (visualEl) {
      visualEl.style.opacity = "0";
      setTimeout(() => {
        visualEl.innerHTML = beat.graphic;
        visualEl.style.opacity = "1";
      }, 150);
    }

    document.querySelectorAll(".zoom-step-node").forEach((node, idx) => {
      node.classList.toggle("active", idx === currentBeatIndex);
    });
  }

  function startAutoAdvance() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      if (isPlaying) {
        showBeat(currentBeatIndex + 1);
      }
    }, 6000);
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    const icon = document.getElementById("play-pause-icon");
    if (icon) {
      icon.textContent = isPlaying ? "⏸ Pause" : "▶ Play";
    }
  }

  function bindEvents() {
    const prevBtn = document.getElementById("hero-prev-btn");
    const nextBtn = document.getElementById("hero-next-btn");
    const playBtn = document.getElementById("hero-play-btn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        showBeat(currentBeatIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        showBeat(currentBeatIndex + 1);
      });
    }

    if (playBtn) {
      playBtn.addEventListener("click", togglePlay);
    }

    document.querySelectorAll(".zoom-step-node").forEach(node => {
      node.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.getAttribute("data-index"), 10);
        showBeat(idx);
      });
    });
  }

  return {
    render: render
  };
})();
