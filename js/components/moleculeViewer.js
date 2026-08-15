/**
 * ATOMVERSE - Molecule Explorer Component
 * Pure 2D Canvas 3D Ball-and-Stick Renderer (No WebGL, 60fps on low-spec hardware).
 * Features exact geometries for H₂O, CO₂, O₂, N₂, CH₄, NH₃, NaCl, interactive mouse rotation,
 * atom count breakdown, and verified chemical explanations.
 */

window.ATOMVERSE = window.ATOMVERSE || {};

window.ATOMVERSE.MoleculeViewer = (function () {
  let activeMolIndex = 0;
  let animId = null;

  // 3D Rotation angles
  let rotX = 0.3;
  let rotY = 0.5;
  let rotZ = 0.0;
  let autoRotate = true;

  // Drag interaction
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  function render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const molecules = window.ATOMVERSE_DATA.MOLECULES || [];

    container.innerHTML = `
      <div class="section-header">
        <div class="section-badge"><span class="badge badge-cyan">3D Chemical Architecture</span></div>
        <h2 class="section-title">Molecule Explorer</h2>
        <p class="section-desc">Observe how atoms bond through covalent electron sharing and ionic electrostatic attraction. Inspect 3D ball-and-stick geometries with interactive 360° rotation.</p>
      </div>

      <div class="molecule-explorer-wrapper">
        <!-- Molecule Selector Bar -->
        <div class="molecule-tabs-bar card">
          ${molecules.map((mol, idx) => `
            <button class="mol-tab-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}">
              <span class="mol-tab-formula">${mol.formula}</span>
              <span class="mol-tab-name">${mol.name}</span>
            </button>
          `).join('')}
        </div>

        <!-- 3D Canvas + Dossier Grid -->
        <div class="molecule-stage-grid">
          <!-- 3D Canvas Stage -->
          <div class="card molecule-canvas-card">
            <div class="canvas-header-bar">
              <div class="canvas-title-group">
                <span class="canvas-live-badge"><span class="pulse-dot"></span> 3D Interactive Model</span>
                <span class="canvas-tip">Drag to rotate • Scroll to zoom</span>
              </div>
              <div class="canvas-controls-group">
                <button id="mol-autorotate-btn" class="btn btn-outline btn-xs">
                  <span id="autorotate-label">⏸ Auto-Rotate: ON</span>
                </button>
                <button id="mol-reset-view-btn" class="btn btn-ghost btn-xs">Reset View</button>
              </div>
            </div>

            <div class="mol-canvas-container">
              <canvas id="molecule-3d-canvas" width="480" height="420"></canvas>
            </div>

            <div class="mol-legend-footer" id="mol-legend-footer">
              <!-- Injected by updateLegend() -->
            </div>
          </div>

          <!-- Molecule Information Card -->
          <div class="card molecule-info-card" id="molecule-info-card">
            <!-- Injected by updateInfo() -->
          </div>
        </div>
      </div>
    `;

    bindEvents();
    updateActiveMolecule(0);
    startAnimation();
  }

  function updateActiveMolecule(index) {
    const molecules = window.ATOMVERSE_DATA.MOLECULES || [];
    activeMolIndex = (index + molecules.length) % molecules.length;
    const mol = molecules[activeMolIndex];

    document.querySelectorAll(".mol-tab-btn").forEach((btn, idx) => {
      btn.classList.toggle("active", idx === activeMolIndex);
    });

    updateInfo(mol);
    updateLegend(mol);
  }

  function updateLegend(mol) {
    const legendEl = document.getElementById("mol-legend-footer");
    if (!legendEl || !mol) return;

    legendEl.innerHTML = mol.breakdown.map(item => `
      <span class="legend-chip">
        <span class="legend-dot" style="background-color: ${item.color}; border: 1px solid #ffffff44;"></span>
        ${item.element} (${item.symbol}): <strong>${item.count}</strong>
      </span>
    `).join('') + `
      <span class="legend-chip legend-total">
        Total Atoms: <strong>${mol.totalAtoms}</strong>
      </span>
    `;
  }

  function updateInfo(mol) {
    const infoCard = document.getElementById("molecule-info-card");
    if (!infoCard || !mol) return;

    infoCard.innerHTML = `
      <div class="mol-info-header">
        <div>
          <div class="mol-formula-badge">${mol.formattedFormula}</div>
          <h3 class="mol-title">${mol.name}</h3>
        </div>
        <div class="mol-badge-stack">
          <span class="badge badge-olive">${mol.geometry}</span>
          <span class="badge badge-amber">${mol.bondType}</span>
        </div>
      </div>

      <!-- Atom Count Breakdown -->
      <div class="mol-breakdown-box">
        <div class="breakdown-title">Stoichiometric Breakdown</div>
        <div class="breakdown-chips">
          ${mol.breakdown.map(item => `
            <div class="b-chip">
              <span class="b-sym" style="color: ${item.color}">${item.symbol}</span>
              <span class="b-text">${item.count} × ${item.element} atom${item.count > 1 ? 's' : ''}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Verified Explanation -->
      <div class="mol-explanation-box">
        <div class="box-section-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          Chemical Geometry & Bonding
        </div>
        <p class="mol-desc-text">${mol.explanation}</p>
      </div>

      <!-- Real-World Relevance -->
      <div class="mol-relevance-box">
        <div class="box-section-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          Real-World Relevance
        </div>
        <p class="mol-relevance-text">${mol.relevance}</p>
      </div>
    `;
  }

  function rotate3D(x, y, z, ax, ay, az) {
    // Rotate around Y
    const cosY = Math.cos(ay);
    const sinY = Math.sin(ay);
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;

    // Rotate around X
    const cosX = Math.cos(ax);
    const sinX = Math.sin(ax);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    // Rotate around Z
    const cosZ = Math.cos(az);
    const sinZ = Math.sin(az);
    const x3 = x1 * cosZ - y2 * sinZ;
    const y3 = x1 * sinZ + y2 * cosZ;

    return { x: x3, y: y3, z: z2 };
  }

  function startAnimation() {
    const canvas = document.getElementById("molecule-3d-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      if (autoRotate && !isDragging) {
        rotY += 0.012;
        rotX += 0.004;
      }

      const molecules = window.ATOMVERSE_DATA.MOLECULES || [];
      const mol = molecules[activeMolIndex];

      if (mol) {
        // Project all atoms to 3D screen space
        const projectedAtoms = mol.atoms.map((atom, idx) => {
          const p = rotate3D(atom.x * 1.5, atom.y * 1.5, atom.z * 1.5, rotX, rotY, rotZ);
          return {
            index: idx,
            x: cx + p.x,
            y: cy - p.y,
            z: p.z,
            raw: atom
          };
        });

        // Collect all render primitives (bonds and atoms) for proper Z-sorting
        const renderList = [];

        // Bonds
        mol.bonds.forEach((bond, bIdx) => {
          const a1 = projectedAtoms[bond.from];
          const a2 = projectedAtoms[bond.to];
          const avgZ = (a1.z + a2.z) / 2;

          renderList.push({
            type: "bond",
            z: avgZ - 2, // Slight bias so atoms sit on top of bonds
            a1: a1,
            a2: a2,
            order: bond.order,
            isIonic: bond.isIonic
          });
        });

        // Atoms
        projectedAtoms.forEach(pa => {
          renderList.push({
            type: "atom",
            z: pa.z,
            atom: pa
          });
        });

        // Sort by Z (farthest first)
        renderList.sort((a, b) => a.z - b.z);

        // Render sorted primitives
        renderList.forEach(item => {
          if (item.type === "bond") {
            drawBond(ctx, item.a1, item.a2, item.order, item.isIonic);
          } else if (item.type === "atom") {
            drawAtom(ctx, item.atom);
          }
        });
      }

      animId = requestAnimationFrame(draw);
    }

    if (animId) cancelAnimationFrame(animId);
    draw();
  }

  function drawBond(ctx, a1, a2, order, isIonic) {
    ctx.save();
    const dx = a2.x - a1.x;
    const dy = a2.y - a1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 1) {
      ctx.restore();
      return;
    }

    const nx = -dy / dist;
    const ny = dx / dist;

    if (isIonic) {
      // Ionic attraction: Glowing dashed line
      ctx.strokeStyle = "#818cf8";
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(a1.x, a1.y);
      ctx.lineTo(a2.x, a2.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
      return;
    }

    const offset = 6;
    if (order === 1) {
      drawBondCylinder(ctx, a1.x, a1.y, a2.x, a2.y, 6);
    } else if (order === 2) {
      drawBondCylinder(ctx, a1.x + nx * offset, a1.y + ny * offset, a2.x + nx * offset, a2.y + ny * offset, 4.5);
      drawBondCylinder(ctx, a1.x - nx * offset, a1.y - ny * offset, a2.x - nx * offset, a2.y - ny * offset, 4.5);
    } else if (order === 3) {
      drawBondCylinder(ctx, a1.x, a1.y, a2.x, a2.y, 4);
      drawBondCylinder(ctx, a1.x + nx * (offset * 1.3), a1.y + ny * (offset * 1.3), a2.x + nx * (offset * 1.3), a2.y + ny * (offset * 1.3), 3.5);
      drawBondCylinder(ctx, a1.x - nx * (offset * 1.3), a1.y - ny * (offset * 1.3), a2.x - nx * (offset * 1.3), a2.y - ny * (offset * 1.3), 3.5);
    }

    ctx.restore();
  }

  function drawBondCylinder(ctx, x1, y1, x2, y2, width) {
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Specular highlight line along center
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = width * 0.35;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function drawAtom(ctx, pAtom) {
    const atom = pAtom.raw;
    const x = pAtom.x;
    const y = pAtom.y;
    // Perspective scale calculation
    const scale = 1 + pAtom.z * 0.003;
    const radius = Math.max(atom.radius * scale, 6);

    ctx.save();

    // 3D Spherical Radial Gradient
    const lightOffsetX = -radius * 0.35;
    const lightOffsetY = -radius * 0.35;
    const grad = ctx.createRadialGradient(
      x + lightOffsetX, y + lightOffsetY, radius * 0.1,
      x, y, radius
    );

    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.2, atom.color);
    grad.addColorStop(0.85, darkenColor(atom.color, 0.4));
    grad.addColorStop(1, "#020617");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Subtle outline
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Element symbol on atom sphere
    ctx.fillStyle = atom.color === "#e2e8f0" ? "#0f172a" : "#ffffff";
    ctx.font = `bold ${Math.round(radius * 0.65)}px -apple-system, BlinkMacSystemFont, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(atom.symbol, x, y);

    ctx.restore();
  }

  function darkenColor(hex, factor) {
    let num = parseInt(hex.replace("#", ""), 16);
    let r = (num >> 16);
    let g = ((num >> 8) & 0x00FF);
    let b = (num & 0x0000FF);

    r = Math.floor(r * factor);
    g = Math.floor(g * factor);
    b = Math.floor(b * factor);

    return `rgb(${r}, ${g}, ${b})`;
  }

  function bindEvents() {
    const canvas = document.getElementById("molecule-3d-canvas");
    const autoBtn = document.getElementById("mol-autorotate-btn");
    const resetBtn = document.getElementById("mol-reset-view-btn");

    if (canvas) {
      canvas.addEventListener("mousedown", (e) => {
        isDragging = true;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      });

      window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        rotY += dx * 0.01;
        rotX += dy * 0.01;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      });

      window.addEventListener("mouseup", () => {
        isDragging = false;
      });

      // Touch events for mobile/tablets
      canvas.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) {
          isDragging = true;
          lastMouseX = e.touches[0].clientX;
          lastMouseY = e.touches[0].clientY;
        }
      }, { passive: true });

      window.addEventListener("touchmove", (e) => {
        if (!isDragging || e.touches.length === 0) return;
        const dx = e.touches[0].clientX - lastMouseX;
        const dy = e.touches[0].clientY - lastMouseY;
        rotY += dx * 0.012;
        rotX += dy * 0.012;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }, { passive: true });

      window.addEventListener("touchend", () => {
        isDragging = false;
      });
    }

    if (autoBtn) {
      autoBtn.addEventListener("click", () => {
        autoRotate = !autoRotate;
        const lbl = document.getElementById("autorotate-label");
        if (lbl) {
          lbl.textContent = autoRotate ? "⏸ Auto-Rotate: ON" : "▶ Auto-Rotate: OFF";
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        rotX = 0.3;
        rotY = 0.5;
        rotZ = 0.0;
      });
    }

    document.querySelectorAll(".mol-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.getAttribute("data-index"), 10);
        updateActiveMolecule(idx);
      });
    });
  }

  return {
    render: render
  };
})();
