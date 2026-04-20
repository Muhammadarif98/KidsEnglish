// tokens.js — Design system for KidsEnglish
// Neon-night direction: deep indigo/violet backgrounds, candy accents,
// 3D "clay" cards with layered shadows. Original tokens — no mimicry.

export const KE_TOKENS = {
  dark: {
    bg0: '#0B0724',
    bg1: '#140A36',
    bg2: '#1E0F4A',
    surface: '#2A1766',
    surface2: '#3B1F8F',
    border: 'rgba(255,255,255,0.08)',
    borderStrong: 'rgba(255,255,255,0.18)',
    text: '#FFFFFF',
    textSoft: 'rgba(255,255,255,0.72)',
    textMuted: 'rgba(255,255,255,0.5)',
  },

  // Candy accent ramps
  accents: {
    violet:  { base: '#8B5CF6', deep: '#6D28D9', glow: 'rgba(139,92,246,0.55)' },
    pink:    { base: '#F472B6', deep: '#DB2777', glow: 'rgba(244,114,182,0.55)' },
    cyan:    { base: '#22D3EE', deep: '#0891B2', glow: 'rgba(34,211,238,0.55)' },
    lime:    { base: '#A3E635', deep: '#65A30D', glow: 'rgba(163,230,53,0.55)' },
    orange:  { base: '#FB923C', deep: '#EA580C', glow: 'rgba(251,146,60,0.55)' },
    yellow:  { base: '#FACC15', deep: '#CA8A04', glow: 'rgba(250,204,21,0.55)' },
  },

  success: '#10B981',
  danger:  '#EF4444',

  // Topic color mapping (by id) — two-colour gradient seed per topic.
  // Unknown topics fall back to violet/pink.
  topicColors: {
    animals:  ['#8B5CF6', '#F472B6'],
    colors:   ['#FB923C', '#FACC15'],
    family:   ['#22D3EE', '#8B5CF6'],
    food:     ['#F472B6', '#FB923C'],
    numbers:  ['#6366F1', '#22D3EE'],
    toys:     ['#FACC15', '#A3E635'],
    body:     ['#EC4899', '#6366F1'],
    school:   ['#A3E635', '#22D3EE'],
  },

  font: {
    display: "'Fredoka', 'Fredoka One', system-ui, sans-serif",
    body:    "'Nunito', system-ui, sans-serif",
    mono:    "ui-monospace, 'SF Mono', Menlo, monospace",
  },
};

// Fallback colour pair for a topic id that is not in the map
export function topicColorPair(id) {
  return KE_TOKENS.topicColors[id] || ['#8B5CF6', '#F472B6'];
}

// Pick accent from topic id (for per-topic exercise glow)
export function topicAccent(id) {
  const [c1] = topicColorPair(id);
  // Map first hex colour to a named accent (by closest base) — a very rough
  // classifier that is "good enough" for glow colour purposes.
  const entries = Object.entries(KE_TOKENS.accents);
  let best = entries[0];
  let bestDist = Infinity;
  const rgb = hexToRgb(c1);
  for (const entry of entries) {
    const [, acc] = entry;
    const accRgb = hexToRgb(acc.base);
    const d = (rgb.r - accRgb.r) ** 2 + (rgb.g - accRgb.g) ** 2 + (rgb.b - accRgb.b) ** 2;
    if (d < bestDist) { bestDist = d; best = entry; }
  }
  return best[1];
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}
