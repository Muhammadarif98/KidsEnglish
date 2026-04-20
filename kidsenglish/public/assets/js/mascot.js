// mascot.js — Rex the Robo-Dino 🦖🤖 (inline SVG, no external assets).

/**
 * Produce SVG markup for the mascot.
 * @param {Object} opts
 * @param {number} opts.size    Width/height in pixels (default 140).
 * @param {string} opts.mood    'happy' | 'wink' | 'sad' | 'cheer'
 * @param {boolean} opts.glow   Purple drop-shadow (default true)
 */
export function mascotSVG({ size = 140, mood = 'happy', glow = true } = {}) {
  const eyes = {
    happy:  { L: 'M18 28 Q24 22 30 28', R: 'M66 28 Q72 22 78 28' },
    wink:   { L: 'M18 28 Q24 22 30 28', R: 'M66 28 L78 28' },
    sad:    { L: 'M18 24 Q24 30 30 24', R: 'M66 24 Q72 30 78 24' },
    cheer:  { L: 'M18 28 Q24 20 30 28', R: 'M66 28 Q72 20 78 28' },
  }[mood] || { L: 'M18 28 Q24 22 30 28', R: 'M66 28 Q72 22 78 28' };

  const filter = glow ? 'filter: drop-shadow(0 10px 24px rgba(139,92,246,0.5));' : '';
  const uid = 'm' + Math.random().toString(36).slice(2, 8);

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" style="${filter} overflow: visible;" role="img" aria-label="Rex the robo-dino">
      <defs>
        <linearGradient id="body${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#A78BFA"/>
          <stop offset="0.5" stop-color="#8B5CF6"/>
          <stop offset="1" stop-color="#6D28D9"/>
        </linearGradient>
        <linearGradient id="belly${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#FBCFE8"/>
          <stop offset="1" stop-color="#F472B6"/>
        </linearGradient>
        <radialGradient id="eye${uid}" cx="0.3" cy="0.3">
          <stop offset="0" stop-color="#fff"/>
          <stop offset="0.4" stop-color="#E0F2FE"/>
          <stop offset="1" stop-color="#22D3EE"/>
        </radialGradient>
        <linearGradient id="spikes${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#FACC15"/>
          <stop offset="1" stop-color="#FB923C"/>
        </linearGradient>
      </defs>
      <!-- Tail -->
      <path d="M22 78 Q6 72 10 58 Q14 52 20 56" fill="url(#body${uid})" stroke="rgba(0,0,0,0.15)" stroke-width="1.5"/>
      <!-- Body -->
      <ellipse cx="60" cy="82" rx="38" ry="28" fill="url(#body${uid})" stroke="rgba(0,0,0,0.18)" stroke-width="1.5"/>
      <ellipse cx="60" cy="88" rx="22" ry="14" fill="url(#belly${uid})" opacity="0.95"/>
      <!-- Feet + toe lights -->
      <ellipse cx="42" cy="108" rx="10" ry="5" fill="#4C1D95"/>
      <ellipse cx="78" cy="108" rx="10" ry="5" fill="#4C1D95"/>
      <circle cx="36" cy="107" r="1.8" fill="#FACC15"/><circle cx="42" cy="107" r="1.8" fill="#FACC15"/><circle cx="48" cy="107" r="1.8" fill="#FACC15"/>
      <circle cx="72" cy="107" r="1.8" fill="#FACC15"/><circle cx="78" cy="107" r="1.8" fill="#FACC15"/><circle cx="84" cy="107" r="1.8" fill="#FACC15"/>
      <!-- Head -->
      <g transform="translate(12 6)">
        <ellipse cx="48" cy="40" rx="40" ry="34" fill="url(#body${uid})" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>
        <path d="M16 18 Q20 8 26 16 M26 12 Q32 2 38 12 M40 8 Q48 -2 56 10" fill="url(#spikes${uid})" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" stroke-linejoin="round"/>
        <ellipse cx="16" cy="50" rx="8" ry="5" fill="#F472B6" opacity="0.55"/>
        <ellipse cx="80" cy="50" rx="8" ry="5" fill="#F472B6" opacity="0.55"/>
        <ellipse cx="24" cy="38" rx="14" ry="15" fill="#140A36"/>
        <ellipse cx="72" cy="38" rx="14" ry="15" fill="#140A36"/>
        <circle cx="24" cy="38" r="8" fill="url(#eye${uid})"/>
        <circle cx="72" cy="38" r="8" fill="url(#eye${uid})"/>
        <circle cx="21" cy="35" r="2.4" fill="#fff"/>
        <circle cx="69" cy="35" r="2.4" fill="#fff"/>
        ${mood === 'sad'
          ? `<path d="M38 64 Q48 58 58 64" fill="none" stroke="#140A36" stroke-width="3" stroke-linecap="round"/>`
          : `<path d="M38 58 Q48 66 58 58" fill="none" stroke="#140A36" stroke-width="3" stroke-linecap="round"/>
             <rect x="44" y="58" width="4" height="5" rx="1" fill="#fff" stroke="rgba(0,0,0,0.2)" stroke-width="0.6"/>`}
        <line x1="48" y1="6" x2="48" y2="-4" stroke="#6D28D9" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="48" cy="-6" r="4" fill="#22D3EE"/>
        <circle cx="47" cy="-7.5" r="1.2" fill="#fff"/>
      </g>
      <!-- Waving arm -->
      <path d="M26 80 Q18 72 22 66" fill="none" stroke="#6D28D9" stroke-width="6" stroke-linecap="round"/>
      <circle cx="22" cy="66" r="5" fill="#A78BFA" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
    </svg>`;
}

// Tiny head-only variant (used in logo)
export function mascotHeadSVG({ size = 32 } = {}) {
  const uid = 'h' + Math.random().toString(36).slice(2, 8);
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 60 60" aria-hidden="true">
      <defs>
        <linearGradient id="${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#A78BFA"/>
          <stop offset="1" stop-color="#6D28D9"/>
        </linearGradient>
      </defs>
      <circle cx="30" cy="32" r="24" fill="url(#${uid})" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
      <circle cx="22" cy="30" r="6" fill="#140A36"/>
      <circle cx="38" cy="30" r="6" fill="#140A36"/>
      <circle cx="22" cy="30" r="3" fill="#22D3EE"/>
      <circle cx="38" cy="30" r="3" fill="#22D3EE"/>
      <circle cx="21" cy="29" r="1" fill="#fff"/>
      <circle cx="37" cy="29" r="1" fill="#fff"/>
      <path d="M22 42 Q30 47 38 42" stroke="#140A36" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="30" cy="6" r="2.2" fill="#22D3EE"/>
      <line x1="30" y1="8" x2="30" y2="12" stroke="#6D28D9" stroke-width="1.5"/>
    </svg>`;
}
