/**
 * ATOMVERSE - Element Explorer Component
 * Interactive Periodic Table Grid (1-118), Category Filters, Live Search, and Museum Inspector Panel.
 */

window.ATOMVERSE = window.ATOMVERSE || {};

window.ATOMVERSE.ElementExplorer = (function () {
  let activeElement = null;
  let activeCategory = "all";
  let searchQuery = "";

  function render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const elements = window.ATOMVERSE_DATA.ELEMENTS || [];
    const categories = window.ATOMVERSE_DATA.CATEGORIES || {};

    // Default to Carbon (Z=6)
    activeElement = elements.find(el => el.number === 6) || elements[0];

    container.innerHTML = `
      <div class="section-header">
        <div class="section-badge"><span class="badge badge-olive">The Periodic Table</span></div>
        <h2 class="section-title">Element Explorer</h2>
        <p class="section-desc">Examine the fundamental building blocks of all chemical matter. Search by name, symbol, or atomic number, filter by chemical classification, and inspect verified properties.</p>
      </div>

      <div class="element-explorer-wrapper">
        <!-- Search & Filter Header -->
        <div class="table-toolbar card">
          <div class="search-box">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" id="elem-search-input" placeholder="Search by name, symbol, or atomic number (e.g. 'C', 'Gold', '26')..." autocomplete="off"/>
            <button id="elem-search-clear" class="btn btn-ghost btn-xs">Clear</button>
          </div>

          <div class="category-filters">
            <button class="cat-pill active" data-cat="all">All Elements</button>
            ${Object.keys(categories).map(catKey => `
              <button class="cat-pill" data-cat="${catKey}">
                <span class="cat-dot" style="background-color: ${categories[catKey].color}"></span>
                ${categories[catKey].name}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Main Periodic Table Layout (Grid + Inspector Panel) -->
        <div class="ptable-layout">
          <!-- Scrollable Periodic Grid -->
          <div class="ptable-grid-container card">
            <div class="ptable-grid" id="ptable-grid">
              <!-- Dynamically Populated Grid Cells -->
            </div>

            <!-- Lanthanides & Actinides Rows -->
            <div class="ptable-fblock" id="ptable-fblock">
              <!-- Populated by renderGrid() -->
            </div>
          </div>

          <!-- Inspector Dossier Panel -->
          <div class="card element-inspector-card" id="element-inspector">
            <!-- Populated by updateInspector() -->
          </div>
        </div>
      </div>
    `;

    renderGrid();
    updateInspector(activeElement);
    bindEvents();
  }

  function renderGrid() {
    const gridEl = document.getElementById("ptable-grid");
    const fblockEl = document.getElementById("ptable-fblock");
    if (!gridEl || !fblockEl) return;

    const elements = window.ATOMVERSE_DATA.ELEMENTS || [];
    const categories = window.ATOMVERSE_DATA.CATEGORIES || {};

    gridEl.innerHTML = "";
    fblockEl.innerHTML = "";

    // Main 18-column grid for standard elements (Periods 1 to 7 without 57-71 and 89-103)
    elements.forEach(elem => {
      const isLanthanide = elem.category === "lanthanide";
      const isActinide = elem.category === "actinide";
      const catMeta = categories[elem.category] || { color: "#94a3b8", name: "Unknown" };

      // Matching filter & search
      const matchesCat = activeCategory === "all" || elem.category === activeCategory;
      const matchesSearch = !searchQuery ||
        elem.name.toLowerCase().includes(searchQuery) ||
        elem.symbol.toLowerCase().includes(searchQuery) ||
        elem.number.toString() === searchQuery;

      const isVisible = matchesCat && matchesSearch;
      const isSelected = activeElement && activeElement.number === elem.number;

      const cell = document.createElement("button");
      cell.className = `ptable-cell ${isSelected ? 'selected' : ''} ${!isVisible ? 'dimmed' : ''}`;
      cell.setAttribute("data-number", elem.number);
      cell.style.setProperty("--cell-color", catMeta.color);

      // Explicit grid positioning if in main grid
      if (!isLanthanide && !isActinide) {
        cell.style.gridColumn = elem.group;
        cell.style.gridRow = elem.period;
        cell.innerHTML = `
          <span class="cell-num">${elem.number}</span>
          <span class="cell-sym">${elem.symbol}</span>
          <span class="cell-name">${elem.name}</span>
          <span class="cell-mass">${elem.mass.toFixed(1)}</span>
        `;
        gridEl.appendChild(cell);
      } else {
        // Render in f-block
        cell.innerHTML = `
          <span class="cell-num">${elem.number}</span>
          <span class="cell-sym">${elem.symbol}</span>
          <span class="cell-name">${elem.name}</span>
        `;
        fblockEl.appendChild(cell);
      }

      cell.addEventListener("click", () => {
        activeElement = elem;
        document.querySelectorAll(".ptable-cell").forEach(c => c.classList.remove("selected"));
        cell.classList.add("selected");
        updateInspector(elem);
      });
    });
  }

  function updateInspector(elem) {
    const inspector = document.getElementById("element-inspector");
    if (!inspector || !elem) return;

    const categories = window.ATOMVERSE_DATA.CATEGORIES || {};
    const catMeta = categories[elem.category] || { name: elem.category, color: "#94a3b8" };

    const shellStr = elem.shells ? elem.shells.join(", ") : "N/A";
    const valencyStr = elem.valency !== undefined ? elem.valency : "Variable";
    const stdNeutrons = elem.standardNeutrons !== undefined ? elem.standardNeutrons : Math.round(elem.mass - elem.number);

    inspector.innerHTML = `
      <div class="inspector-header" style="border-left-color: ${catMeta.color};">
        <div class="inspector-badge-box" style="border-color: ${catMeta.color}; color: ${catMeta.color};">
          <span class="ib-num">${elem.number}</span>
          <span class="ib-sym">${elem.symbol}</span>
          <span class="ib-mass">${elem.mass}</span>
        </div>
        <div class="inspector-title-meta">
          <h3 class="inspector-name">${elem.name}</h3>
          <span class="inspector-cat" style="background-color: ${catMeta.color}22; color: ${catMeta.color}; border: 1px solid ${catMeta.color}44;">
            ${catMeta.name}
          </span>
        </div>
      </div>

      <div class="inspector-facts-grid">
        <div class="if-item">
          <span class="if-label">Atomic Number (Z)</span>
          <span class="if-val">${elem.number}</span>
        </div>
        <div class="if-item">
          <span class="if-label">Atomic Mass</span>
          <span class="if-val">${elem.mass} u</span>
        </div>
        <div class="if-item">
          <span class="if-label">Standard Neutrons</span>
          <span class="if-val">${stdNeutrons}</span>
        </div>
        <div class="if-item">
          <span class="if-label">Class 9 Valency</span>
          <span class="if-val text-amber">${valencyStr}</span>
        </div>
        <div class="if-item">
          <span class="if-label">Electron Shells (2-8-8)</span>
          <span class="if-val text-cyan">${shellStr}</span>
        </div>
        <div class="if-item">
          <span class="if-label">Period & Group</span>
          <span class="if-val">Period ${elem.period}, Grp ${elem.group || 'f-block'}</span>
        </div>
      </div>

      <div class="inspector-fact-box">
        <div class="fact-box-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          Verified Scientific Fact
        </div>
        <p class="fact-box-content">${elem.fact}</p>
      </div>

      ${elem.number <= 20 ? `
        <button id="load-in-atom-explorer-btn" class="btn btn-primary btn-sm w-100" data-z="${elem.number}">
          Build ${elem.name} in Atom Explorer ➔
        </button>
      ` : ''}
    `;

    document.getElementById("load-in-atom-explorer-btn")?.addEventListener("click", (e) => {
      const z = parseInt(e.currentTarget.getAttribute("data-z"), 10);
      const target = window.ATOMVERSE_DATA.ELEMENTS.find(el => el.number === z);
      if (target && window.ATOMVERSE.AtomExplorer) {
        // Trigger hash navigation
        window.location.hash = "atom-explorer";
      }
    });
  }

  function bindEvents() {
    const searchInput = document.getElementById("elem-search-input");
    const clearBtn = document.getElementById("elem-search-clear");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        renderGrid();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        searchQuery = "";
        renderGrid();
      });
    }

    document.querySelectorAll(".cat-pill").forEach(pill => {
      pill.addEventListener("click", (e) => {
        document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
        e.currentTarget.classList.add("active");
        activeCategory = e.currentTarget.getAttribute("data-cat");
        renderGrid();
      });
    });
  }

  return {
    render: render
  };
})();
