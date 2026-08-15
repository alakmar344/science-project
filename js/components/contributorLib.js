/**
 * ATOMVERSE - Contributor Library Component
 * Strictly the 11 Historical Pioneers with 5 verified biographical fields per scientist.
 * Features museum exhibit cards, live search, and clean progressive disclosure dossiers.
 */

window.ATOMVERSE = window.ATOMVERSE || {};

window.ATOMVERSE.ContributorLib = (function () {
  let activeScientistId = "democritus";
  let searchQuery = "";

  function render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scientists = window.ATOMVERSE_DATA.SCIENTISTS || [];

    container.innerHTML = `
      <div class="section-header">
        <div class="section-badge"><span class="badge badge-olive">The Scientific Pantheon</span></div>
        <h2 class="section-title">Contributor Library</h2>
        <p class="section-desc">Explore the groundbreaking researchers who decoded atomic structure, chemical periodicity, and fundamental physical laws. Verified historical dossiers with zero speculation.</p>
      </div>

      <div class="contributor-library-wrapper">
        <!-- Search Toolbar -->
        <div class="library-toolbar card">
          <div class="search-box">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" id="scientist-search-input" placeholder="Search scientists by name, discovery, or keyword (e.g. 'Rutherford', 'electron', 'gold foil', 'radioactivity')..." autocomplete="off"/>
            <button id="scientist-search-clear" class="btn btn-ghost btn-xs">Clear</button>
          </div>
          <div class="sci-count-pill" id="sci-count-pill">
            Showing ${scientists.length} of ${scientists.length} Historical Figures
          </div>
        </div>

        <!-- Layout: Gallery Grid + Active Dossier Drawer/Card -->
        <div class="sci-layout-grid">
          <!-- Scientists Exhibit Grid -->
          <div class="sci-cards-grid" id="sci-cards-grid">
            <!-- Dynamically populated by renderCards() -->
          </div>

          <!-- Scientist 5-Field Dossier Modal/Panel -->
          <div class="card sci-dossier-card" id="sci-dossier-card">
            <!-- Dynamically populated by updateDossier() -->
          </div>
        </div>
      </div>
    `;

    bindEvents();
    renderCards();
    updateDossier(scientists[0]);
  }

  function renderCards() {
    const grid = document.getElementById("sci-cards-grid");
    const countPill = document.getElementById("sci-count-pill");
    if (!grid) return;

    const scientists = window.ATOMVERSE_DATA.SCIENTISTS || [];
    grid.innerHTML = "";

    const filtered = scientists.filter(sci => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        sci.name.toLowerCase().includes(q) ||
        sci.era.toLowerCase().includes(q) ||
        sci.tagline.toLowerCase().includes(q) ||
        sci.tags.some(t => t.toLowerCase().includes(q)) ||
        sci.discovery.toLowerCase().includes(q) ||
        sci.who.toLowerCase().includes(q)
      );
    });

    if (countPill) {
      countPill.textContent = `Showing ${filtered.length} of ${scientists.length} Historical Figures`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-search-state">
          <p>No scientists match "${searchQuery}".</p>
        </div>
      `;
      return;
    }

    filtered.forEach(sci => {
      const isSelected = sci.id === activeScientistId;
      const card = document.createElement("button");
      card.className = `sci-exhibit-card ${isSelected ? 'selected' : ''}`;
      card.setAttribute("data-id", sci.id);

      card.innerHTML = `
        <div class="sci-card-header">
          <div class="sci-avatar">
            <span class="sci-initials">${getInitials(sci.name)}</span>
          </div>
          <div class="sci-header-text">
            <h4 class="sci-card-name">${sci.name}</h4>
            <span class="sci-card-lifespan">${sci.lifespan}</span>
          </div>
        </div>
        <p class="sci-card-tagline">${sci.tagline}</p>
        <div class="sci-tag-chips">
          ${sci.tags.slice(0, 3).map(t => `<span class="sci-mini-tag">${t}</span>`).join('')}
        </div>
      `;

      card.addEventListener("click", () => {
        activeScientistId = sci.id;
        document.querySelectorAll(".sci-exhibit-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        updateDossier(sci);
      });

      grid.appendChild(card);
    });
  }

  function getInitials(name) {
    return name.split(" ").map(part => part[0]).join("").slice(0, 2);
  }

  function updateDossier(sci) {
    const card = document.getElementById("sci-dossier-card");
    if (!card || !sci) return;

    card.innerHTML = `
      <div class="dossier-hero">
        <div class="dossier-avatar-large">
          <span class="avatar-text">${getInitials(sci.name)}</span>
        </div>
        <div>
          <div class="dossier-era-badge">${sci.era}</div>
          <h3 class="dossier-name">${sci.name}</h3>
          <div class="dossier-dates">${sci.lifespan}</div>
        </div>
      </div>

      <div class="dossier-tagline-quote">"${sci.tagline}"</div>

      <!-- 5 Verified Specification Fields -->
      <div class="dossier-sections-stack">
        <!-- 1. Who They Were -->
        <div class="dossier-block">
          <div class="dossier-block-header">
            <span class="block-num">1</span>
            <span class="block-title">Who They Were</span>
          </div>
          <p class="dossier-block-text">${sci.who}</p>
        </div>

        <!-- 2. What They Discovered -->
        <div class="dossier-block">
          <div class="dossier-block-header">
            <span class="block-num">2</span>
            <span class="block-title">What They Discovered</span>
          </div>
          <p class="dossier-block-text">${sci.discovery}</p>
        </div>

        <!-- 3. How They Did It -->
        <div class="dossier-block">
          <div class="dossier-block-header">
            <span class="block-num">3</span>
            <span class="block-title">How They Did It</span>
          </div>
          <p class="dossier-block-text">${sci.how}</p>
        </div>

        <!-- 4. Why It Mattered -->
        <div class="dossier-block">
          <div class="dossier-block-header">
            <span class="block-num">4</span>
            <span class="block-title">Why It Mattered</span>
          </div>
          <p class="dossier-block-text">${sci.impact}</p>
        </div>

        <!-- 5. Link to Modern Science -->
        <div class="dossier-block highlight-modern">
          <div class="dossier-block-header">
            <span class="block-num">5</span>
            <span class="block-title">Link to Modern Science</span>
          </div>
          <p class="dossier-block-text">${sci.modernLink}</p>
        </div>
      </div>
    `;
  }

  function bindEvents() {
    const searchInput = document.getElementById("scientist-search-input");
    const clearBtn = document.getElementById("scientist-search-clear");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim();
        renderCards();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        searchQuery = "";
        renderCards();
      });
    }
  }

  return {
    render: render
  };
})();
