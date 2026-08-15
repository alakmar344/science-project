/**
 * ATOMVERSE - Atom Explorer Component
 * Interactive Bohr Model Builder with Live Protons, Neutrons, Electrons manipulation.
 * Strict Class 9 Logic (Fill order 2-8-8, exact Isotope & Ion calculation).
 */

window.ATOMVERSE = window.ATOMVERSE || {};

window.ATOMVERSE.AtomExplorer = (function () {
  // State
  let protons = 6;
  let neutrons = 6;
  let electrons = 6;

  let animFrameId = null;
  let angleK = 0;
  let angleL = 0;
  let angleM = 0;

  const PRESETS = [
    { label: "Hydrogen (H-1)", p: 1, n: 0, e: 1 },
    { label: "Helium (He-4)", p: 2, n: 2, e: 2 },
    { label: "Carbon-12", p: 6, n: 6, e: 6 },
    { label: "Carbon-14 (Isotope)", p: 6, n: 8, e: 6 },
    { label: "Oxygen-16", p: 8, n: 8, e: 8 },
    { label: "Sodium Ion (Na⁺)", p: 11, n: 12, e: 10 },
    { label: "Chloride Ion (Cl⁻)", p: 17, n: 18, e: 18 },
    { label: "Argon (Ar-40)", p: 18, n: 22, e: 18 }
  ];

  function render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="section-header">
        <div class="section-badge"><span class="badge badge-amber">Interactive Laboratory</span></div>
        <h2 class="section-title">Atom Explorer</h2>
        <p class="section-desc">Build any atom from first subatomic principles. Adjust protons, neutrons, and electrons to observe real-time isotopic shifts, ionization charges, and Bohr electron shell filling (2-8-8).</p>
      </div>

      <div class="atom-explorer-grid">
        <!-- Visual Canvas Stage -->
        <div class="card visual-stage-card">
          <div class="visual-canvas-header">
            <div class="color-legend">
              <span class="legend-item"><span class="legend-dot dot-proton"></span> Proton (p⁺)</span>
              <span class="legend-item"><span class="legend-dot dot-neutron"></span> Neutron (n⁰)</span>
              <span class="legend-item"><span class="legend-dot dot-electron"></span> Electron (e⁻)</span>
            </div>
            <div class="shell-occupancy-pill" id="shell-occupancy-pill">
              K: 2 | L: 4 | M: 0
            </div>
          </div>

          <div class="canvas-wrapper">
            <canvas id="atom-canvas" width="460" height="460"></canvas>
          </div>

          <!-- Quick Presets -->
          <div class="presets-bar">
            <span class="presets-label">Quick Presets:</span>
            <div class="preset-buttons">
              ${PRESETS.map((pr, idx) => `
                <button class="preset-chip ${idx === 2 ? 'active' : ''}" data-p="${pr.p}" data-n="${pr.n}" data-e="${pr.e}">
                  ${pr.label}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Controls & Output Panel -->
        <div class="controls-panel">
          <!-- Real-Time Identification Card -->
          <div class="card identity-card" id="atom-identity-box">
            <!-- Dynamic Content Injected by updateIdentity() -->
          </div>

          <!-- Counter Controls -->
          <div class="card subatomic-controls-card">
            <h3 class="panel-subtitle">Subatomic Controls</h3>

            <!-- Protons Control -->
            <div class="counter-row proton-row">
              <div class="counter-meta">
                <span class="counter-dot dot-proton"></span>
                <div>
                  <div class="counter-title">Protons (p⁺)</div>
                  <div class="counter-sub">Determines Atomic Number (Z)</div>
                </div>
              </div>
              <div class="counter-btns">
                <button class="btn btn-icon btn-p-dec" aria-label="Decrease Protons">−</button>
                <span class="counter-val" id="val-protons">${protons}</span>
                <button class="btn btn-icon btn-p-inc" aria-label="Increase Protons">+</button>
              </div>
            </div>

            <!-- Neutrons Control -->
            <div class="counter-row neutron-row">
              <div class="counter-meta">
                <span class="counter-dot dot-neutron"></span>
                <div>
                  <div class="counter-title">Neutrons (n⁰)</div>
                  <div class="counter-sub">Controls Nuclear Mass & Isotopes</div>
                </div>
              </div>
              <div class="counter-btns">
                <button class="btn btn-icon btn-n-dec" aria-label="Decrease Neutrons">−</button>
                <span class="counter-val" id="val-neutrons">${neutrons}</span>
                <button class="btn btn-icon btn-n-inc" aria-label="Increase Neutrons">+</button>
              </div>
            </div>

            <!-- Electrons Control -->
            <div class="counter-row electron-row">
              <div class="counter-meta">
                <span class="counter-dot dot-electron"></span>
                <div>
                  <div class="counter-title">Electrons (e⁻)</div>
                  <div class="counter-sub">Controls Net Charge & Shells (2-8-8)</div>
                </div>
              </div>
              <div class="counter-btns">
                <button class="btn btn-icon btn-e-dec" aria-label="Decrease Electrons">−</button>
                <span class="counter-val" id="val-electrons">${electrons}</span>
                <button class="btn btn-icon btn-e-inc" aria-label="Increase Electrons">+</button>
              </div>
            </div>

            <div class="control-actions">
              <button id="atom-reset-btn" class="btn btn-ghost btn-sm">Reset to Carbon-12</button>
              <button id="atom-random-btn" class="btn btn-outline btn-sm">Random Element</button>
            </div>
          </div>
        </div>
      </div>
    `;

    bindEvents();
    update();
    startAnimation();
  }

  function getShellDistribution(eCount) {
    let k = Math.min(eCount, 2);
    let l = Math.min(Math.max(eCount - 2, 0), 8);
    let m = Math.min(Math.max(eCount - 10, 0), 8);
    return { k, l, m, total: k + l + m };
  }

  function computeAtomProperties(p, n, e) {
    const elements = window.ATOMVERSE_DATA.ELEMENTS || [];
    const matchedElement = elements.find(el => el.number === p);

    let elementName = "Unknown/Unstable";
    let elementSymbol = "?";
    let isMatched = false;
    let standardNeutrons = null;
    let category = "unknown";

    if (p >= 1 && matchedElement) {
      elementName = matchedElement.name;
      elementSymbol = matchedElement.symbol;
      isMatched = true;
      standardNeutrons = matchedElement.standardNeutrons !== undefined ? matchedElement.standardNeutrons : Math.round(matchedElement.mass - p);
      category = matchedElement.category;
    }

    const massNumber = p + n;
    const chargeVal = p - e;

    // Charge logic strictly per spec:
    // Charge = protons - electrons -> 0 = neutral; !=0 = ion (cation if +, anion if -)
    let chargeLabel = "0 (Neutral Atom)";
    let chargeType = "neutral";
    if (chargeVal > 0) {
      chargeLabel = `+${chargeVal} (Cation)`;
      chargeType = "cation";
    } else if (chargeVal < 0) {
      chargeLabel = `${chargeVal} (Anion)`;
      chargeType = "anion";
    }

    // Isotope logic strictly per spec:
    // Isotope = proton count matches a known element AND neutron count != that element's standard isotope
    // -> label "Element-[mass number], isotope of [Element]"
    let isotopeLabel = "";
    let isIsotope = false;

    if (isMatched) {
      if (standardNeutrons !== null && n !== standardNeutrons) {
        isotopeLabel = `${elementName}-${massNumber}, isotope of ${elementName}`;
        isIsotope = true;
      } else {
        isotopeLabel = `${elementName}-${massNumber} (Standard Isotope)`;
      }
    } else {
      isotopeLabel = "Not a recognized standard ground-state isotope";
    }

    return {
      p, n, e,
      isMatched,
      elementName,
      elementSymbol,
      massNumber,
      chargeVal,
      chargeLabel,
      chargeType,
      isotopeLabel,
      isIsotope,
      category,
      shells: getShellDistribution(e)
    };
  }

  function update() {
    // Update counters in DOM
    const pEl = document.getElementById("val-protons");
    const nEl = document.getElementById("val-neutrons");
    const eEl = document.getElementById("val-electrons");

    if (pEl) pEl.textContent = protons;
    if (nEl) nEl.textContent = neutrons;
    if (eEl) eEl.textContent = electrons;

    const data = computeAtomProperties(protons, neutrons, electrons);

    // Update Shell Occupancy Pill
    const shellPill = document.getElementById("shell-occupancy-pill");
    if (shellPill) {
      shellPill.textContent = `K: ${data.shells.k} | L: ${data.shells.l} | M: ${data.shells.m}`;
    }

    // Update Identity Box
    const idBox = document.getElementById("atom-identity-box");
    if (idBox) {
      idBox.innerHTML = `
        <div class="identity-header">
          <div class="element-box ${data.isMatched ? 'matched' : 'unmatched'}">
            <div class="elem-z">${data.isMatched ? protons : '?'}</div>
            <div class="elem-sym">${data.elementSymbol}</div>
            <div class="elem-mass">${data.massNumber}</div>
          </div>
          <div class="identity-meta">
            <div class="identity-name">${data.elementName}</div>
            <div class="identity-category-tag ${data.category}">${data.isMatched ? data.category.replace('-', ' ') : 'Hypothetical'}</div>
            <div class="identity-isotope ${data.isIsotope ? 'highlight-isotope' : ''}">${data.isotopeLabel}</div>
          </div>
        </div>

        <div class="metrics-grid">
          <div class="metric-item">
            <span class="metric-label">Atomic Number (Z)</span>
            <span class="metric-val text-amber">${protons}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Mass Number (A)</span>
            <span class="metric-val text-slate">${data.massNumber}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Net Charge (p - e)</span>
            <span class="metric-val ${data.chargeType === 'cation' ? 'text-amber' : data.chargeType === 'anion' ? 'text-cyan' : 'text-neutral'}">
              ${data.chargeLabel}
            </span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Bohr Config</span>
            <span class="metric-val text-cyan">${data.shells.k}, ${data.shells.l}, ${data.shells.m}</span>
          </div>
        </div>
      `;
    }
  }

  function startAnimation() {
    const canvas = document.getElementById("atom-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw Orbit Shells
      const shellRadii = [70, 130, 190];
      const shellLabels = ["K (max 2)", "L (max 8)", "M (max 8)"];
      const shells = getShellDistribution(electrons);

      ctx.save();
      shellRadii.forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(34, 211, 238, 0.2)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label
        ctx.fillStyle = "rgba(148, 163, 184, 0.4)";
        ctx.font = "10px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.fillText(shellLabels[i], cx - r + 8, cy - 6);
      });
      ctx.restore();

      // Draw Electrons on K shell
      angleK += 0.025;
      for (let i = 0; i < shells.k; i++) {
        const theta = angleK + (i * Math.PI * 2) / Math.max(shells.k, 1);
        const ex = cx + shellRadii[0] * Math.cos(theta);
        const ey = cy + shellRadii[0] * Math.sin(theta);
        drawElectron(ctx, ex, ey);
      }

      // Draw Electrons on L shell
      angleL += 0.015;
      for (let i = 0; i < shells.l; i++) {
        const theta = -angleL + (i * Math.PI * 2) / Math.max(shells.l, 1);
        const ex = cx + shellRadii[1] * Math.cos(theta);
        const ey = cy + shellRadii[1] * Math.sin(theta);
        drawElectron(ctx, ex, ey);
      }

      // Draw Electrons on M shell
      angleM += 0.009;
      for (let i = 0; i < shells.m; i++) {
        const theta = angleM + (i * Math.PI * 2) / Math.max(shells.m, 1);
        const ex = cx + shellRadii[2] * Math.cos(theta);
        const ey = cy + shellRadii[2] * Math.sin(theta);
        drawElectron(ctx, ex, ey);
      }

      // Draw Nucleus cluster
      drawNucleus(ctx, cx, cy, protons, neutrons);

      animFrameId = requestAnimationFrame(draw);
    }

    if (animFrameId) cancelAnimationFrame(animFrameId);
    draw();
  }

  function drawElectron(ctx, x, y) {
    ctx.save();
    // Cyan glow
    const grad = ctx.createRadialGradient(x, y, 1, x, y, 10);
    grad.addColorStop(0, "rgba(34, 211, 238, 1)");
    grad.addColorStop(0.5, "rgba(6, 182, 212, 0.6)");
    grad.addColorStop(1, "rgba(6, 182, 212, 0)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();

    // Solid core
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawNucleus(ctx, cx, cy, pCount, nCount) {
    const total = pCount + nCount;
    ctx.save();

    // Outer faint glow
    const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 45);
    glow.addColorStop(0, "rgba(245, 158, 11, 0.35)");
    glow.addColorStop(1, "rgba(245, 158, 11, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, 45, 0, Math.PI * 2);
    ctx.fill();

    if (total === 0) {
      ctx.fillStyle = "rgba(148, 163, 184, 0.4)";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Empty Core", cx, cy + 4);
      ctx.restore();
      return;
    }

    // Deterministic sphere packing for nucleus particles
    const particles = [];
    for (let i = 0; i < pCount; i++) particles.push({ type: "p" });
    for (let i = 0; i < nCount; i++) particles.push({ type: "n" });

    // Deterministic golden spiral packing
    const rBase = 8;
    const c = 6.2;
    particles.forEach((pt, idx) => {
      let r = idx === 0 ? 0 : c * Math.sqrt(idx);
      let theta = idx * 2.3999632; // Golden angle in radians
      let px = cx + r * Math.cos(theta);
      let py = cy + r * Math.sin(theta);

      ctx.beginPath();
      ctx.arc(px, py, rBase, 0, Math.PI * 2);

      if (pt.type === "p") {
        // Proton: Amber / Gold
        ctx.fillStyle = "#f59e0b";
        ctx.fill();
        ctx.strokeStyle = "#fef08a";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("+", px, py + 1);
      } else {
        // Neutron: Slate / Olive Neutral
        ctx.fillStyle = "#64748b";
        ctx.fill();
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 8px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("n", px, py);
      }
    });

    ctx.restore();
  }

  function bindEvents() {
    // Proton buttons
    document.querySelector(".btn-p-dec")?.addEventListener("click", () => {
      if (protons > 0) {
        protons--;
        update();
      }
    });
    document.querySelector(".btn-p-inc")?.addEventListener("click", () => {
      if (protons < 20) {
        protons++;
        update();
      }
    });

    // Neutron buttons
    document.querySelector(".btn-n-dec")?.addEventListener("click", () => {
      if (neutrons > 0) {
        neutrons--;
        update();
      }
    });
    document.querySelector(".btn-n-inc")?.addEventListener("click", () => {
      if (neutrons < 30) {
        neutrons++;
        update();
      }
    });

    // Electron buttons
    document.querySelector(".btn-e-dec")?.addEventListener("click", () => {
      if (electrons > 0) {
        electrons--;
        update();
      }
    });
    document.querySelector(".btn-e-inc")?.addEventListener("click", () => {
      if (electrons < 18) {
        electrons++;
        update();
      }
    });

    // Presets
    document.querySelectorAll(".preset-chip").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".preset-chip").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");

        protons = parseInt(e.currentTarget.getAttribute("data-p"), 10);
        neutrons = parseInt(e.currentTarget.getAttribute("data-n"), 10);
        electrons = parseInt(e.currentTarget.getAttribute("data-e"), 10);
        update();
      });
    });

    // Reset & Random
    document.getElementById("atom-reset-btn")?.addEventListener("click", () => {
      protons = 6;
      neutrons = 6;
      electrons = 6;
      update();
    });

    document.getElementById("atom-random-btn")?.addEventListener("click", () => {
      const randZ = Math.floor(Math.random() * 18) + 1;
      const el = window.ATOMVERSE_DATA.ELEMENTS.find(item => item.number === randZ);
      protons = randZ;
      neutrons = el && el.standardNeutrons !== undefined ? el.standardNeutrons : Math.round(el.mass - randZ);
      electrons = randZ;
      update();
    });
  }

  return {
    render: render
  };
})();
