/**
 * ATOMVERSE - Main Application Coordinator
 * Zero AI/API dependencies, completely offline-capable, highly optimized for low-spec laptops.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Theme Engine (Dark Ink / Light Ivory Paper)
  initThemeToggle();

  // Initialize Background Ambient Canvas
  initAmbientParticles();

  // Initialize Core Components
  if (window.ATOMVERSE) {
    if (window.ATOMVERSE.Hero) window.ATOMVERSE.Hero.render("hero-container");
    if (window.ATOMVERSE.AtomExplorer) window.ATOMVERSE.AtomExplorer.render("atom-explorer-container");
    if (window.ATOMVERSE.ElementExplorer) window.ATOMVERSE.ElementExplorer.render("element-explorer-container");
    if (window.ATOMVERSE.MoleculeViewer) window.ATOMVERSE.MoleculeViewer.render("molecule-explorer-container");
    if (window.ATOMVERSE.Challenges) window.ATOMVERSE.Challenges.render("challenges-container");
    if (window.ATOMVERSE.ContributorLib) window.ATOMVERSE.ContributorLib.render("contributor-library-container");
  }

  // Persistent Nav ScrollSpy & Smooth Navigation
  initNavScrollSpy();

  // Web Audio UI sound effects
  initAudioClicks();
});

/**
 * Theme Engine (Deep Ink Dark Mode & Crisp Ivory/Olive Light Mode)
 */
function initThemeToggle() {
  const themeBtn = document.getElementById("theme-toggle-btn");
  const themeText = document.getElementById("theme-toggle-text");
  const metaThemeColor = document.getElementById("meta-theme-color");

  function getStoredTheme() {
    return document.documentElement.getAttribute("data-theme") || localStorage.getItem("atomverse_theme") || "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("atomverse_theme", theme);

    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "light" ? "#f5f8f5" : "#090e13");
    }

    if (themeBtn && themeText) {
      if (theme === "light") {
        themeBtn.innerHTML = `
          <span class="theme-icon-slot">
            <svg class="icon-moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </span>
          <span id="theme-toggle-text">Dark Mode</span>
        `;
        themeBtn.title = "Switch to Deep Ink Dark Mode";
      } else {
        themeBtn.innerHTML = `
          <span class="theme-icon-slot">
            <svg class="icon-sun" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
          </span>
          <span id="theme-toggle-text">Light Mode</span>
        `;
        themeBtn.title = "Switch to Crisp Olive Light Mode";
      }
    }

    // Broadcast theme change event for active canvases
    window.dispatchEvent(new CustomEvent("atomverseThemeChanged", { detail: { theme } }));
  }

  const currentTheme = getStoredTheme();
  applyTheme(currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const active = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = active === "light" ? "dark" : "light";
      applyTheme(next);
    });
  }
}

/**
 * Lightweight, Low-Overhead Ambient Particle Drift Canvas
 * Uses <= 30 particles for zero CPU lag on low-spec hardware.
 */
function initAmbientParticles() {
  const canvas = document.getElementById("ambient-bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 28;
  const particles = [];

  function getThemeColors() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      return {
        c1: "rgba(79, 115, 36, ",   // Heritage olive
        c2: "rgba(71, 85, 105, ",    // Slate ink
        c3: "rgba(180, 83, 9, "      // Warm brass
      };
    } else {
      return {
        c1: "rgba(112, 141, 50, ",  // Vibrant olive
        c2: "rgba(82, 194, 173, ",   // Sage cyan
        c3: "rgba(245, 158, 11, "   // Warm gold amber
      };
    }
  }

  let palette = getThemeColors();

  window.addEventListener("atomverseThemeChanged", () => {
    palette = getThemeColors();
    particles.forEach(p => {
      const r = Math.random();
      p.colorPrefix = r > 0.6 ? palette.c1 : (r > 0.3 ? palette.c2 : palette.c3);
    });
  });

  for (let i = 0; i < particleCount; i++) {
    const r = Math.random();
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      radius: Math.random() * 2 + 1,
      colorPrefix: r > 0.6 ? palette.c1 : (r > 0.3 ? palette.c2 : palette.c3),
      alpha: Math.random() * 0.25 + 0.1
    });
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.fillStyle = p.colorPrefix + p.alpha + ")";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(loop);
  }

  loop();
}

/**
 * Nav ScrollSpy & Smooth Scrolling
 */
function initNavScrollSpy() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  function updateActiveLink() {
    let currentId = "";
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = sec.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  // Mobile menu toggle
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-links-menu");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }
}

/**
 * Synthesized Web Audio API subtle click sounds (Zero external sound files)
 */
let audioCtx = null;
let soundEnabled = true;

function initAudioClicks() {
  const soundBtn = document.getElementById("sound-toggle-btn");

  function playTone(freq, type = "sine", dur = 0.04) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + dur);
    } catch (e) {
      // Audio context may be restricted before user interaction
    }
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("button, .ptable-cell, .mol-tab-btn, .preset-chip, .q-pill")) {
      playTone(520, "triangle", 0.03);
    }
  });

  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      soundBtn.innerHTML = soundEnabled ?
        `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> Audio ON` :
        `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg> Muted`;
    });
  }
}
