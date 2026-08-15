/**
 * ATOMVERSE - Verified Molecule Data
 * Standard Reference: NCERT Class 9 Chemistry & IUPAC Chemical Geometry
 * Strictly the 7 required molecules with exact formulas, geometries, breakdowns, and verified explanations.
 */

window.ATOMVERSE_DATA = window.ATOMVERSE_DATA || {};

window.ATOMVERSE_DATA.MOLECULES = [
  {
    id: "h2o",
    name: "Water",
    formula: "H₂O",
    formattedFormula: "H<sub>2</sub>O",
    geometry: "Bent (~104.5°)",
    bondType: "Polar Covalent",
    breakdown: [
      { element: "Hydrogen", symbol: "H", count: 2, color: "#e2e8f0" },
      { element: "Oxygen", symbol: "O", count: 1, color: "#ef4444" }
    ],
    totalAtoms: 3,
    explanation: "A polar covalent molecule formed when two hydrogen atoms share valence electrons with one central oxygen atom. The two non-bonding lone pairs of electrons on the oxygen atom strongly repel the bonding pairs, bending the molecule into a V-shape with a 104.5° angle.",
    relevance: "Known as the universal solvent, its bent polar structure is the direct reason why ice floats on liquid water and why cellular biochemical reactions can occur.",
    atoms: [
      { symbol: "O", name: "Oxygen", x: 0, y: 15, z: 0, radius: 24, color: "#ef4444", charge: "δ-" },
      { symbol: "H", name: "Hydrogen", x: -38, y: -22, z: 0, radius: 14, color: "#e2e8f0", charge: "δ+" },
      { symbol: "H", name: "Hydrogen", x: 38, y: -22, z: 0, radius: 14, color: "#e2e8f0", charge: "δ+" }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 }
    ]
  },
  {
    id: "co2",
    name: "Carbon Dioxide",
    formula: "CO₂",
    formattedFormula: "CO<sub>2</sub>",
    geometry: "Linear (180°)",
    bondType: "Nonpolar Covalent",
    breakdown: [
      { element: "Carbon", symbol: "C", count: 1, color: "#64748b" },
      { element: "Oxygen", symbol: "O", count: 2, color: "#ef4444" }
    ],
    totalAtoms: 3,
    explanation: "A symmetrical linear molecule where a central carbon atom forms double covalent bonds with two oxygen atoms. Because the two double bonds experience equal electrostatic repulsion with no lone pairs on carbon, they orient exactly 180° apart.",
    relevance: "A vital greenhouse gas produced during cellular respiration and combustion, and consumed by photosynthetic plants to synthesize glucose and oxygen.",
    atoms: [
      { symbol: "C", name: "Carbon", x: 0, y: 0, z: 0, radius: 22, color: "#64748b", charge: "δ+" },
      { symbol: "O", name: "Oxygen", x: -62, y: 0, z: 0, radius: 24, color: "#ef4444", charge: "δ-" },
      { symbol: "O", name: "Oxygen", x: 62, y: 0, z: 0, radius: 24, color: "#ef4444", charge: "δ-" }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 2 }
    ]
  },
  {
    id: "o2",
    name: "Oxygen Gas",
    formula: "O₂",
    formattedFormula: "O<sub>2</sub>",
    geometry: "Linear Diatomic",
    bondType: "Nonpolar Covalent",
    breakdown: [
      { element: "Oxygen", symbol: "O", count: 2, color: "#ef4444" }
    ],
    totalAtoms: 2,
    explanation: "A homonuclear diatomic molecule consisting of two oxygen atoms connected by a strong covalent double bond. Each oxygen atom contributes two valence electrons to the shared bond, enabling both atoms to achieve a stable octet configuration.",
    relevance: "Essential for aerobic respiration across complex multicellular life on Earth and drives rapid chemical combustion reactions.",
    atoms: [
      { symbol: "O", name: "Oxygen", x: -35, y: 0, z: 0, radius: 24, color: "#ef4444", charge: "0" },
      { symbol: "O", name: "Oxygen", x: 35, y: 0, z: 0, radius: 24, color: "#ef4444", charge: "0" }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 }
    ]
  },
  {
    id: "n2",
    name: "Nitrogen Gas",
    formula: "N₂",
    formattedFormula: "N<sub>2</sub>",
    geometry: "Linear Diatomic",
    bondType: "Nonpolar Covalent",
    breakdown: [
      { element: "Nitrogen", symbol: "N", count: 2, color: "#3b82f6" }
    ],
    totalAtoms: 2,
    explanation: "A diatomic gas where two nitrogen atoms share three pairs of electrons in an exceptionally strong covalent triple bond. This intense bond energy makes nitrogen gas extremely unreactive and chemically inert under ambient conditions.",
    relevance: "Makes up approximately 78% of Earth's atmosphere by volume, diluting atmospheric oxygen and moderating natural combustion rates.",
    atoms: [
      { symbol: "N", name: "Nitrogen", x: -33, y: 0, z: 0, radius: 22, color: "#3b82f6", charge: "0" },
      { symbol: "N", name: "Nitrogen", x: 33, y: 0, z: 0, radius: 22, color: "#3b82f6", charge: "0" }
    ],
    bonds: [
      { from: 0, to: 1, order: 3 }
    ]
  },
  {
    id: "ch4",
    name: "Methane",
    formula: "CH₄",
    formattedFormula: "CH<sub>4</sub>",
    geometry: "Tetrahedral (109.5°)",
    bondType: "Covalent",
    breakdown: [
      { element: "Carbon", symbol: "C", count: 1, color: "#64748b" },
      { element: "Hydrogen", symbol: "H", count: 4, color: "#e2e8f0" }
    ],
    totalAtoms: 5,
    explanation: "The simplest organic hydrocarbon, consisting of a central tetravalent carbon atom sharing single covalent bonds with four hydrogen atoms. Electrostatic repulsion pushes the four identical bonds into a symmetrical three-dimensional tetrahedral geometry with bond angles of 109.5°.",
    relevance: "The principal component of natural gas (CNG/LNG), widely utilized globally as a clean-burning fuel for thermal heating and electricity generation.",
    atoms: [
      { symbol: "C", name: "Carbon", x: 0, y: 0, z: 0, radius: 22, color: "#64748b", charge: "0" },
      { symbol: "H", name: "Hydrogen", x: 0, y: 48, z: 0, radius: 14, color: "#e2e8f0", charge: "0" },
      { symbol: "H", name: "Hydrogen", x: 45.2, y: -16, z: 0, radius: 14, color: "#e2e8f0", charge: "0" },
      { symbol: "H", name: "Hydrogen", x: -22.6, y: -16, z: 39.2, radius: 14, color: "#e2e8f0", charge: "0" },
      { symbol: "H", name: "Hydrogen", x: -22.6, y: -16, z: -39.2, radius: 14, color: "#e2e8f0", charge: "0" }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 }
    ]
  },
  {
    id: "nh3",
    name: "Ammonia",
    formula: "NH₃",
    formattedFormula: "NH<sub>3</sub>",
    geometry: "Trigonal Pyramidal (~107°)",
    bondType: "Polar Covalent",
    breakdown: [
      { element: "Nitrogen", symbol: "N", count: 1, color: "#3b82f6" },
      { element: "Hydrogen", symbol: "H", count: 3, color: "#e2e8f0" }
    ],
    totalAtoms: 4,
    explanation: "A nitrogen atom covalently bonded to three hydrogen atoms, with one non-bonding lone pair of valence electrons positioned at the apex. The strong repulsive force of this lone pair pushes the three N-H bonds downward into a three-sided pyramid with bond angles of 107°.",
    relevance: "The foundational industrial feedstock used to synthesize nitrogen-rich agricultural fertilizers, which sustain global crop yields and food security.",
    atoms: [
      { symbol: "N", name: "Nitrogen", x: 0, y: 22, z: 0, radius: 22, color: "#3b82f6", charge: "δ-" },
      { symbol: "H", name: "Hydrogen", x: 0, y: -20, z: 42, radius: 14, color: "#e2e8f0", charge: "δ+" },
      { symbol: "H", name: "Hydrogen", x: -36.4, y: -20, z: -21, radius: 14, color: "#e2e8f0", charge: "δ+" },
      { symbol: "H", name: "Hydrogen", x: 36.4, y: -20, z: -21, radius: 14, color: "#e2e8f0", charge: "δ+" }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 }
    ]
  },
  {
    id: "nacl",
    name: "Sodium Chloride",
    formula: "NaCl",
    formattedFormula: "NaCl",
    geometry: "Ionic Crystal Lattice (1:1 Ratio)",
    bondType: "Ionic (Electrostatic)",
    breakdown: [
      { element: "Sodium (Na⁺)", symbol: "Na", count: 1, color: "#818cf8" },
      { element: "Chlorine (Cl⁻)", symbol: "Cl", count: 1, color: "#22c55e" }
    ],
    totalAtoms: 2,
    explanation: "An ionic compound formed by full electron transfer from a sodium atom to a chlorine atom. Sodium loses its single valence electron to become a positive cation (Na⁺), while chlorine gains it to become a negative anion (Cl⁻), locking into a giant crystalline lattice.",
    relevance: "Common culinary table salt, vital in biology for regulating osmotic pressure, fluid equilibrium, and nerve signal conductivity.",
    atoms: [
      { symbol: "Na⁺", name: "Sodium Ion", x: -32, y: 0, z: 0, radius: 20, color: "#818cf8", charge: "+1" },
      { symbol: "Cl⁻", name: "Chloride Ion", x: 38, y: 0, z: 0, radius: 28, color: "#22c55e", charge: "-1" }
    ],
    bonds: [
      { from: 0, to: 1, order: 1, isIonic: true }
    ]
  }
];
