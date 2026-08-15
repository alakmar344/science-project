# ⚛️ ATOMVERSE — Class 9 Atoms & Molecules Interactive Museum

> **Museum-quality, offline-capable, low-spec laptop optimized interactive web application teaching Atoms & Molecules at the NCERT Class 9 level.**

---

## 🌟 Key Features & Architecture

### 1. Hero Journey (Visual Microcosm Zoom)
- **5 Progressive Beats**: Macroscopic Matter $\to$ Molecular Networks $\to$ The Atomic Horizon $\to$ The Atomic Nucleus $\to$ Chemical Synthesis.
- Interactive stepper controls, scale indicators, and smooth SVG visualizations.

### 2. Atom Explorer (Interactive Bohr Model Builder)
- Dynamic `+` and `-` counters for **Protons ($p$)**, **Neutrons ($n$)**, and **Electrons ($e$)**.
- Strict Bohr shell fill order (**2-8-8** across shells $K, L, M$).
- **Deterministic Live Logic**:
  - $\text{Atomic Number } (Z) = p \to$ Matched element name & symbol; no match = `"Unknown/Unstable"`.
  - $\text{Mass Number } (A) = p + n$.
  - $\text{Charge } (q) = p - e \to 0 = \text{"Neutral Atom"}$; $\neq 0 = \text{"Cation (+q)" or "Anion (q)"}$.
  - $\text{Isotope Check} \to$ Identifies ground-state vs. non-standard isotopes (`"Element-[mass number], isotope of [Element]"`).
- Consistent color-coding: **Proton (Amber)**, **Neutron (Slate/Olive)**, **Electron (Cyan)**.

### 3. Element Explorer (Interactive Periodic Table)
- Complete periodic table grid with atomic numbers, symbols, names, and masses.
- Color classifications: Alkali Metals, Alkaline Earth Metals, Transition Metals, Post-Transition Metals, Metalloids, Reactive Nonmetals, Halogens, Noble Gases, Lanthanides, and Actinides.
- Real-time search by name, symbol, or atomic number + category filters.
- Museum inspector dossier with verified facts and one-click export into Atom Explorer.

### 4. Molecule Explorer (3D Ball-and-Stick Renderer)
- Pure 2D Canvas 3D Orthographic projection engine (**No WebGL / No heavy libraries**, 60fps on low-spec hardware).
- Supports continuous auto-rotation & interactive mouse/touch orbit dragging.
- **Exactly 7 required molecules**:
  1. $\text{H}_2\text{O}$ (Water) — Bent (~104.5°)
  2. $\text{CO}_2$ (Carbon Dioxide) — Linear (180°)
  3. $\text{O}_2$ (Oxygen Gas) — Linear Diatomic (Double Bond)
  4. $\text{N}_2$ (Nitrogen Gas) — Linear Diatomic (Triple Bond)
  5. $\text{CH}_4$ (Methane) — Tetrahedral (109.5°)
  6. $\text{NH}_3$ (Ammonia) — Trigonal Pyramidal (~107°)
  7. $\text{NaCl}$ (Sodium Chloride) — Ionic Crystal Unit ($\text{Na}^+$ & $\text{Cl}^-$)
- Stoichiometric atom count breakdown + verified chemical explanation + real-world relevance.

### 5. Quick Challenges
- **15 verified Class 9 MCQs and True/False questions** drawn strictly from in-app verified data.
- Instant color-coded feedback with one-line explanations.
- Session-only score tracking and completion summary (zero timers).

### 6. Contributor Library (11 Historical Pioneers)
- Exhibits for **Democritus, John Dalton, J.J. Thomson, Ernest Rutherford, Niels Bohr, James Chadwick, Dmitri Mendeleev, Antoine Lavoisier, Amedeo Avogadro, Marie Curie, Robert Boyle**.
- Standardized 5-field verified dossiers:
  1. *Who they were*
  2. *What they discovered*
  3. *How they did it*
  4. *Why it mattered*
  5. *Link to modern science*
- Live search by scientist name or keyword.

---

## 🔒 Non-Negotiable Engineering Standards

- **Zero External AI / LLM / Chatbots**: All facts, descriptions, and questions are hardcoded into structured, verified data files (`elements.js`, `molecules.js`, `scientists.js`, `questions.js`).
- **100% Offline-Capable**: Zero CDN fonts or scripts; double-click `index.html` anywhere to run immediately.
- **Low-Spec Hardware Performance**: Lightweight HTML5 2D Canvas and SVG rendering with strict particle caps.
- **Vercel Optimized**: Includes `vercel.json` for edge caching and security headers.

---

## 🚀 Local Development

To run locally:
```bash
# Double click index.html or run a local static server:
npx serve .
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
