// icons.js — SVG icons for exercises
// Using inline SVGs for fast loading and no external dependencies

// Icon mapping: word → SVG icon
// Categories: animals, colors, family, numbers, food, toys, body, school, clothes, weather, house, transport, professions, actions, days, seasons, emotions

export const WORD_ICONS = {
  // ═══════════════════════════════════════════════════════
  // ANIMALS (domestic)
  // ═══════════════════════════════════════════════════════
  'dog': `<svg viewBox="0 0 64 64"><path fill="#C4A574" d="M52 28c0 14-10 26-20 26S12 42 12 28s10-18 20-18 20 4 20 18z"/><ellipse fill="#8B6914" cx="22" cy="26" rx="4" ry="5"/><ellipse fill="#8B6914" cx="42" cy="26" rx="4" ry="5"/><circle fill="#333" cx="22" cy="25" r="2"/><circle fill="#333" cx="42" cy="25" r="2"/><ellipse fill="#333" cx="32" cy="36" rx="5" ry="4"/><path fill="#FF9999" d="M32 38c-2 0-3 2-3 3s1.5 2 3 2 3-1 3-2-1-3-3-3z"/><path fill="#C4A574" d="M8 20c-2-8 4-14 8-12s2 10-2 14-4 6-6-2z"/><path fill="#C4A574" d="M56 20c2-8-4-14-8-12s-2 10 2 14 4 6 6-2z"/></svg>`,

  'cat': `<svg viewBox="0 0 64 64"><ellipse fill="#808080" cx="32" cy="36" rx="18" ry="16"/><circle fill="#808080" cx="32" cy="24" r="14"/><polygon fill="#808080" points="20,14 14,2 22,12"/><polygon fill="#808080" points="44,14 50,2 42,12"/><polygon fill="#FFB6C1" points="20,14 16,6 22,12"/><polygon fill="#FFB6C1" points="44,14 48,6 42,12"/><ellipse fill="#90EE90" cx="26" cy="22" rx="4" ry="5"/><ellipse fill="#90EE90" cx="38" cy="22" rx="4" ry="5"/><ellipse fill="#333" cx="26" cy="23" rx="2" ry="3"/><ellipse fill="#333" cx="38" cy="23" rx="2" ry="3"/><ellipse fill="#FFB6C1" cx="32" cy="30" rx="3" ry="2"/><path fill="none" stroke="#333" stroke-width="1" d="M16 28 Q10 26 4 28 M16 30 Q10 30 4 32 M48 28 Q54 26 60 28 M48 30 Q54 30 60 32"/></svg>`,

  'bird': `<svg viewBox="0 0 64 64"><ellipse fill="#4169E1" cx="32" cy="32" rx="16" ry="12"/><circle fill="#4169E1" cx="42" cy="24" r="8"/><circle fill="#fff" cx="44" cy="22" r="3"/><circle fill="#333" cx="45" cy="22" r="1.5"/><polygon fill="#FFA500" points="50,24 58,22 50,26"/><path fill="#4169E1" d="M20 30 Q8 36 6 44 Q14 40 20 36z"/><polygon fill="#4169E1" points="18,44 10,56 26,44"/><ellipse fill="#87CEEB" cx="30" cy="34" rx="8" ry="4"/></svg>`,

  'fish': `<svg viewBox="0 0 64 64"><ellipse fill="#FF6347" cx="30" cy="32" rx="18" ry="12"/><polygon fill="#FF6347" points="48,32 60,20 60,44"/><circle fill="#fff" cx="20" cy="28" r="4"/><circle fill="#333" cx="21" cy="28" r="2"/><path fill="#FF8C00" d="M26 32 Q30 28 34 32 Q30 36 26 32"/><ellipse fill="#FF8C00" cx="38" cy="32" rx="4" ry="6"/></svg>`,

  'horse': `<svg viewBox="0 0 64 64"><ellipse fill="#8B4513" cx="32" cy="36" rx="16" ry="12"/><ellipse fill="#8B4513" cx="48" cy="26" rx="8" ry="10"/><rect fill="#8B4513" x="20" y="44" width="6" height="14" rx="2"/><rect fill="#8B4513" x="38" y="44" width="6" height="14" rx="2"/><ellipse fill="#333" cx="54" cy="24" rx="2" ry="3"/><circle fill="#333" cx="52" cy="22" r="1"/><path fill="#4a3728" d="M44 16 Q48 8 52 16 Q48 14 44 16"/></svg>`,

  'cow': `<svg viewBox="0 0 64 64"><ellipse fill="#fff" cx="32" cy="36" rx="18" ry="14"/><ellipse fill="#333" cx="24" cy="34" rx="6" ry="5"/><ellipse fill="#333" cx="40" cy="38" rx="5" ry="4"/><ellipse fill="#fff" cx="32" cy="22" rx="12" ry="10"/><ellipse fill="#FFB6C1" cx="32" cy="28" rx="6" ry="4"/><circle fill="#333" cx="28" cy="18" r="2"/><circle fill="#333" cx="36" cy="18" r="2"/><path fill="#8B4513" d="M22 12 Q18 4 14 10 Q18 12 22 12z"/><path fill="#8B4513" d="M42 12 Q46 4 50 10 Q46 12 42 12z"/></svg>`,

  'pig': `<svg viewBox="0 0 64 64"><ellipse fill="#FFB6C1" cx="32" cy="34" rx="18" ry="14"/><circle fill="#FFB6C1" cx="32" cy="24" r="12"/><ellipse fill="#FF69B4" cx="32" cy="28" rx="6" ry="4"/><circle fill="#333" cx="30" cy="26" r="1"/><circle fill="#333" cx="34" cy="26" r="1"/><circle fill="#333" cx="26" cy="20" r="2"/><circle fill="#333" cx="38" cy="20" r="2"/><path fill="#FFB6C1" d="M20 16 Q16 10 20 8 Q22 12 20 16z"/><path fill="#FFB6C1" d="M44 16 Q48 10 44 8 Q42 12 44 16z"/></svg>`,

  'rabbit': `<svg viewBox="0 0 64 64"><ellipse fill="#D3D3D3" cx="32" cy="40" rx="14" ry="12"/><circle fill="#D3D3D3" cx="32" cy="28" r="10"/><ellipse fill="#D3D3D3" cx="24" cy="12" rx="4" ry="12"/><ellipse fill="#D3D3D3" cx="40" cy="12" rx="4" ry="12"/><ellipse fill="#FFB6C1" cx="24" cy="12" rx="2" ry="8"/><ellipse fill="#FFB6C1" cx="40" cy="12" rx="2" ry="8"/><circle fill="#333" cx="28" cy="26" r="2"/><circle fill="#333" cx="36" cy="26" r="2"/><ellipse fill="#FFB6C1" cx="32" cy="32" rx="2" ry="1.5"/></svg>`,

  'duck': `<svg viewBox="0 0 64 64"><ellipse fill="#FFD700" cx="30" cy="38" rx="16" ry="12"/><circle fill="#FFD700" cx="44" cy="26" r="10"/><ellipse fill="#FFA500" cx="54" cy="28" rx="6" ry="3"/><circle fill="#333" cx="46" cy="24" r="2"/><path fill="#FFD700" d="M16 36 Q10 38 8 44 Q14 40 18 38z"/></svg>`,

  'chicken': `<svg viewBox="0 0 64 64"><ellipse fill="#F5DEB3" cx="32" cy="38" rx="14" ry="12"/><circle fill="#F5DEB3" cx="32" cy="24" r="10"/><polygon fill="#FF0000" points="32,14 28,8 36,8"/><polygon fill="#FFA500" points="32,28 40,26 32,32"/><circle fill="#333" cx="28" cy="22" r="2"/><circle fill="#333" cx="36" cy="22" r="2"/><path fill="#FF0000" d="M28 28 Q32 32 28 34 Q26 32 28 28z"/></svg>`,

  // ═══════════════════════════════════════════════════════
  // ANIMALS (wild)
  // ═══════════════════════════════════════════════════════
  'lion': `<svg viewBox="0 0 64 64"><circle fill="#DAA520" cx="32" cy="32" r="20"/><circle fill="#FFD700" cx="32" cy="34" r="14"/><circle fill="#333" cx="26" cy="30" r="2"/><circle fill="#333" cx="38" cy="30" r="2"/><ellipse fill="#333" cx="32" cy="38" rx="3" ry="2"/><path fill="none" stroke="#333" d="M28 42 Q32 46 36 42"/></svg>`,

  'tiger': `<svg viewBox="0 0 64 64"><ellipse fill="#FFA500" cx="32" cy="34" rx="16" ry="14"/><circle fill="#FFA500" cx="32" cy="22" r="12"/><path fill="#333" d="M24 18 L26 26 M28 16 L28 24 M32 14 L32 22 M36 16 L36 24 M40 18 L38 26"/><circle fill="#333" cx="26" cy="20" r="2"/><circle fill="#333" cx="38" cy="20" r="2"/><ellipse fill="#fff" cx="32" cy="28" rx="6" ry="4"/><ellipse fill="#333" cx="32" cy="28" rx="3" ry="2"/></svg>`,

  'bear': `<svg viewBox="0 0 64 64"><ellipse fill="#8B4513" cx="32" cy="36" rx="18" ry="16"/><circle fill="#8B4513" cx="32" cy="22" r="14"/><circle fill="#8B4513" cx="16" cy="14" r="6"/><circle fill="#8B4513" cx="48" cy="14" r="6"/><circle fill="#D2691E" cx="16" cy="14" r="3"/><circle fill="#D2691E" cx="48" cy="14" r="3"/><circle fill="#333" cx="26" cy="20" r="2"/><circle fill="#333" cx="38" cy="20" r="2"/><ellipse fill="#333" cx="32" cy="28" rx="4" ry="3"/></svg>`,

  'wolf': `<svg viewBox="0 0 64 64"><ellipse fill="#696969" cx="32" cy="36" rx="16" ry="14"/><ellipse fill="#696969" cx="32" cy="22" rx="12" ry="10"/><polygon fill="#696969" points="20,18 14,4 24,14"/><polygon fill="#696969" points="44,18 50,4 40,14"/><ellipse fill="#333" cx="28" cy="20" rx="2" ry="3"/><ellipse fill="#333" cx="36" cy="20" rx="2" ry="3"/><ellipse fill="#333" cx="32" cy="28" rx="3" ry="2"/></svg>`,

  'fox': `<svg viewBox="0 0 64 64"><ellipse fill="#FF6600" cx="32" cy="36" rx="14" ry="12"/><ellipse fill="#FF6600" cx="32" cy="22" rx="14" ry="12"/><polygon fill="#FF6600" points="18,18 8,4 22,14"/><polygon fill="#FF6600" points="46,18 56,4 42,14"/><ellipse fill="#fff" cx="32" cy="32" rx="8" ry="10"/><ellipse fill="#333" cx="26" cy="20" rx="2" ry="3"/><ellipse fill="#333" cx="38" cy="20" rx="2" ry="3"/><ellipse fill="#333" cx="32" cy="28" rx="2" ry="1.5"/></svg>`,

  'elephant': `<svg viewBox="0 0 64 64"><ellipse fill="#808080" cx="32" cy="34" rx="20" ry="16"/><circle fill="#808080" cx="32" cy="20" r="14"/><ellipse fill="#808080" cx="14" cy="24" rx="8" ry="12"/><ellipse fill="#808080" cx="50" cy="24" rx="8" ry="12"/><path fill="#808080" d="M32 30 Q36 40 32 54 Q28 40 32 30" stroke="#666" stroke-width="1"/><circle fill="#333" cx="26" cy="18" r="2"/><circle fill="#333" cx="38" cy="18" r="2"/></svg>`,

  'giraffe': `<svg viewBox="0 0 64 64"><ellipse fill="#DAA520" cx="32" cy="50" rx="12" ry="10"/><rect fill="#DAA520" x="28" y="20" width="8" height="32" rx="4"/><circle fill="#DAA520" cx="32" cy="16" r="10"/><circle fill="#8B4513" cx="26" cy="40" r="3"/><circle fill="#8B4513" cx="36" cy="32" r="2"/><circle fill="#8B4513" cx="30" cy="26" r="2"/><circle fill="#333" cx="28" cy="14" r="2"/><circle fill="#333" cx="36" cy="14" r="2"/><path fill="#DAA520" d="M28 8 Q30 2 32 8 M36 8 Q34 2 32 8"/></svg>`,

  'monkey': `<svg viewBox="0 0 64 64"><circle fill="#8B4513" cx="32" cy="32" r="16"/><circle fill="#DEB887" cx="32" cy="36" rx="10" ry="8"/><circle fill="#8B4513" cx="14" cy="28" r="6"/><circle fill="#DEB887" cx="14" cy="28" r="4"/><circle fill="#8B4513" cx="50" cy="28" r="6"/><circle fill="#DEB887" cx="50" cy="28" r="4"/><circle fill="#333" cx="26" cy="28" r="2"/><circle fill="#333" cx="38" cy="28" r="2"/><ellipse fill="#333" cx="32" cy="36" rx="2" ry="1.5"/></svg>`,

  'zebra': `<svg viewBox="0 0 64 64"><ellipse fill="#fff" cx="32" cy="36" rx="16" ry="12"/><ellipse fill="#fff" cx="44" cy="24" rx="10" ry="12"/><path fill="#333" d="M20 30 L24 42 M28 28 L28 44 M36 28 L36 44 M44 28 L40 42"/><path fill="#333" d="M38 16 L42 28 M46 14 L48 26 M52 18 L50 28"/><circle fill="#333" cx="50" cy="22" r="2"/></svg>`,

  'snake': `<svg viewBox="0 0 64 64"><path fill="#228B22" d="M10 32 Q20 20 32 32 Q44 44 54 32" stroke="#228B22" stroke-width="8" fill="none" stroke-linecap="round"/><circle fill="#228B22" cx="54" cy="32" r="6"/><circle fill="#333" cx="56" cy="30" r="1.5"/><path fill="#FF0000" d="M60 32 L64 30 L64 34 Z"/></svg>`,

  // ═══════════════════════════════════════════════════════
  // ANIMALS (sea)
  // ═══════════════════════════════════════════════════════
  'dolphin': `<svg viewBox="0 0 64 64"><path fill="#4682B4" d="M8 32 Q16 20 32 24 Q48 28 56 32 Q48 44 32 40 Q16 36 8 32"/><path fill="#4682B4" d="M46 20 Q52 12 56 16 Q52 20 48 24"/><circle fill="#333" cx="20" cy="30" r="2"/></svg>`,

  'whale': `<svg viewBox="0 0 64 64"><ellipse fill="#1E90FF" cx="32" cy="36" rx="24" ry="14"/><path fill="#1E90FF" d="M54 28 Q60 20 58 16 Q56 24 54 28"/><circle fill="#333" cx="16" cy="32" r="2"/><path fill="#87CEEB" d="M28 40 Q32 46 36 40"/></svg>`,

  'shark': `<svg viewBox="0 0 64 64"><ellipse fill="#708090" cx="32" cy="32" rx="22" ry="10"/><polygon fill="#708090" points="32,18 28,32 36,32"/><polygon fill="#708090" points="54,32 62,26 62,38"/><circle fill="#333" cx="16" cy="30" r="2"/><path fill="#fff" d="M20 34 L22 38 L24 34 L26 38 L28 34 L30 38 L32 34"/></svg>`,

  'octopus': `<svg viewBox="0 0 64 64"><ellipse fill="#9370DB" cx="32" cy="24" rx="16" ry="12"/><path fill="#9370DB" d="M16 32 Q12 44 8 52 Q14 48 18 36"/><path fill="#9370DB" d="M22 34 Q20 46 18 54 Q24 50 26 38"/><path fill="#9370DB" d="M32 36 Q32 48 32 56 Q36 50 36 38"/><path fill="#9370DB" d="M42 34 Q44 46 46 54 Q40 50 38 38"/><path fill="#9370DB" d="M48 32 Q52 44 56 52 Q50 48 46 36"/><circle fill="#fff" cx="26" cy="22" r="4"/><circle fill="#fff" cx="38" cy="22" r="4"/><circle fill="#333" cx="27" cy="22" r="2"/><circle fill="#333" cx="39" cy="22" r="2"/></svg>`,

  'crab': `<svg viewBox="0 0 64 64"><ellipse fill="#FF6347" cx="32" cy="36" rx="16" ry="10"/><circle fill="#333" cx="26" cy="32" r="2"/><circle fill="#333" cx="38" cy="32" r="2"/><path fill="#FF6347" d="M12 32 Q8 28 4 32 Q8 36 12 36" stroke="#FF6347" stroke-width="4"/><path fill="#FF6347" d="M52 32 Q56 28 60 32 Q56 36 52 36" stroke="#FF6347" stroke-width="4"/><circle fill="#FF6347" cx="4" cy="32" r="4"/><circle fill="#FF6347" cx="60" cy="32" r="4"/></svg>`,

  'jellyfish': `<svg viewBox="0 0 64 64"><ellipse fill="#FFB6C1" cx="32" cy="24" rx="16" ry="12" opacity="0.8"/><path fill="none" stroke="#FFB6C1" stroke-width="3" d="M20 36 Q18 44 20 52"/><path fill="none" stroke="#FFB6C1" stroke-width="3" d="M28 36 Q26 46 28 56"/><path fill="none" stroke="#FFB6C1" stroke-width="3" d="M36 36 Q38 46 36 56"/><path fill="none" stroke="#FFB6C1" stroke-width="3" d="M44 36 Q46 44 44 52"/></svg>`,

  'turtle': `<svg viewBox="0 0 64 64"><ellipse fill="#228B22" cx="32" cy="36" rx="18" ry="12"/><ellipse fill="#8B4513" cx="32" cy="36" rx="14" ry="8"/><circle fill="#228B22" cx="48" cy="32" r="6"/><circle fill="#228B22" cx="16" cy="36" r="5"/><circle fill="#228B22" cx="48" cy="40" r="5"/><circle fill="#228B22" cx="20" cy="44" r="4"/><circle fill="#228B22" cx="44" cy="44" r="4"/><circle fill="#333" cx="50" cy="30" r="1.5"/></svg>`,

  'starfish': `<svg viewBox="0 0 64 64"><polygon fill="#FFA500" points="32,8 38,24 56,24 42,36 48,54 32,44 16,54 22,36 8,24 26,24" stroke="#FF8C00" stroke-width="2"/></svg>`,

  // ═══════════════════════════════════════════════════════
  // COLORS
  // ═══════════════════════════════════════════════════════
  'red': `<svg viewBox="0 0 64 64"><circle fill="#EF4444" cx="32" cy="32" r="24"/></svg>`,
  'blue': `<svg viewBox="0 0 64 64"><circle fill="#3B82F6" cx="32" cy="32" r="24"/></svg>`,
  'green': `<svg viewBox="0 0 64 64"><circle fill="#22C55E" cx="32" cy="32" r="24"/></svg>`,
  'yellow': `<svg viewBox="0 0 64 64"><circle fill="#EAB308" cx="32" cy="32" r="24"/></svg>`,
  'orange': `<svg viewBox="0 0 64 64"><circle fill="#F97316" cx="32" cy="32" r="24"/></svg>`,
  'purple': `<svg viewBox="0 0 64 64"><circle fill="#A855F7" cx="32" cy="32" r="24"/></svg>`,
  'pink': `<svg viewBox="0 0 64 64"><circle fill="#EC4899" cx="32" cy="32" r="24"/></svg>`,
  'black': `<svg viewBox="0 0 64 64"><circle fill="#1F2937" cx="32" cy="32" r="24"/></svg>`,
  'white': `<svg viewBox="0 0 64 64"><circle fill="#F9FAFB" cx="32" cy="32" r="24" stroke="#E5E7EB" stroke-width="2"/></svg>`,
  'brown': `<svg viewBox="0 0 64 64"><circle fill="#92400E" cx="32" cy="32" r="24"/></svg>`,
  'gray': `<svg viewBox="0 0 64 64"><circle fill="#6B7280" cx="32" cy="32" r="24"/></svg>`,
  'grey': `<svg viewBox="0 0 64 64"><circle fill="#6B7280" cx="32" cy="32" r="24"/></svg>`,

  // ═══════════════════════════════════════════════════════
  // FAMILY
  // ═══════════════════════════════════════════════════════
  'mother': `<svg viewBox="0 0 64 64"><circle fill="#FDBCB4" cx="32" cy="18" r="12"/><path fill="#8B4513" d="M20 12 Q20 4 32 4 Q44 4 44 12 Q44 20 32 18 Q20 20 20 12"/><ellipse fill="#FF69B4" cx="32" cy="48" rx="14" ry="18"/><circle fill="#333" cx="28" cy="16" r="1.5"/><circle fill="#333" cx="36" cy="16" r="1.5"/><path fill="none" stroke="#333" d="M28 22 Q32 24 36 22"/></svg>`,

  'father': `<svg viewBox="0 0 64 64"><circle fill="#FDBCB4" cx="32" cy="18" r="12"/><path fill="#333" d="M20 14 Q20 6 32 6 Q44 6 44 14"/><ellipse fill="#4169E1" cx="32" cy="48" rx="14" ry="18"/><circle fill="#333" cx="28" cy="16" r="1.5"/><circle fill="#333" cx="36" cy="16" r="1.5"/><path fill="none" stroke="#333" d="M28 22 Q32 24 36 22"/></svg>`,

  'brother': `<svg viewBox="0 0 64 64"><circle fill="#FDBCB4" cx="32" cy="20" r="10"/><path fill="#333" d="M22 16 Q22 10 32 10 Q42 10 42 16"/><ellipse fill="#22C55E" cx="32" cy="46" rx="12" ry="16"/><circle fill="#333" cx="28" cy="18" r="1.5"/><circle fill="#333" cx="36" cy="18" r="1.5"/><path fill="none" stroke="#333" d="M28 24 Q32 26 36 24"/></svg>`,

  'sister': `<svg viewBox="0 0 64 64"><circle fill="#FDBCB4" cx="32" cy="20" r="10"/><path fill="#FFA500" d="M22 16 Q20 8 32 8 Q44 8 42 16 Q42 22 32 20 Q22 22 22 16"/><ellipse fill="#EC4899" cx="32" cy="46" rx="12" ry="16"/><circle fill="#333" cx="28" cy="18" r="1.5"/><circle fill="#333" cx="36" cy="18" r="1.5"/><path fill="none" stroke="#333" d="M28 24 Q32 26 36 24"/></svg>`,

  'grandmother': `<svg viewBox="0 0 64 64"><circle fill="#FDBCB4" cx="32" cy="18" r="12"/><path fill="#C0C0C0" d="M20 12 Q18 4 32 4 Q46 4 44 12 Q44 22 32 20 Q20 22 20 12"/><ellipse fill="#9370DB" cx="32" cy="48" rx="14" ry="18"/><circle fill="#333" cx="28" cy="16" r="1.5"/><circle fill="#333" cx="36" cy="16" r="1.5"/><path fill="none" stroke="#333" d="M28 22 Q32 24 36 22"/><rect fill="#87CEEB" x="24" y="14" width="4" height="2" rx="1"/><rect fill="#87CEEB" x="36" y="14" width="4" height="2" rx="1"/></svg>`,

  'grandfather': `<svg viewBox="0 0 64 64"><circle fill="#FDBCB4" cx="32" cy="18" r="12"/><path fill="#C0C0C0" d="M22 16 Q22 10 32 10 Q42 10 42 16"/><ellipse fill="#4B5563" cx="32" cy="48" rx="14" ry="18"/><circle fill="#333" cx="28" cy="16" r="1.5"/><circle fill="#333" cx="36" cy="16" r="1.5"/><path fill="none" stroke="#333" d="M28 22 Q32 24 36 22"/><rect fill="#87CEEB" x="24" y="14" width="4" height="2" rx="1"/><rect fill="#87CEEB" x="36" y="14" width="4" height="2" rx="1"/></svg>`,

  'baby': `<svg viewBox="0 0 64 64"><circle fill="#FDBCB4" cx="32" cy="28" r="14"/><circle fill="#333" cx="26" cy="26" r="2"/><circle fill="#333" cx="38" cy="26" r="2"/><ellipse fill="#FFB6C1" cx="32" cy="34" rx="3" ry="2"/><path fill="#FFD700" d="M20 20 Q18 14 24 14 Q28 14 26 18"/><path fill="#FFD700" d="M44 20 Q46 14 40 14 Q36 14 38 18"/><ellipse fill="#87CEEB" cx="32" cy="50" rx="10" ry="10"/></svg>`,

  // ═══════════════════════════════════════════════════════
  // NUMBERS
  // ═══════════════════════════════════════════════════════
  'one': `<svg viewBox="0 0 64 64"><rect fill="#8B5CF6" rx="12" width="64" height="64"/><text x="32" y="44" text-anchor="middle" fill="#fff" font-size="36" font-weight="bold" font-family="sans-serif">1</text></svg>`,
  'two': `<svg viewBox="0 0 64 64"><rect fill="#EC4899" rx="12" width="64" height="64"/><text x="32" y="44" text-anchor="middle" fill="#fff" font-size="36" font-weight="bold" font-family="sans-serif">2</text></svg>`,
  'three': `<svg viewBox="0 0 64 64"><rect fill="#F97316" rx="12" width="64" height="64"/><text x="32" y="44" text-anchor="middle" fill="#fff" font-size="36" font-weight="bold" font-family="sans-serif">3</text></svg>`,
  'four': `<svg viewBox="0 0 64 64"><rect fill="#22C55E" rx="12" width="64" height="64"/><text x="32" y="44" text-anchor="middle" fill="#fff" font-size="36" font-weight="bold" font-family="sans-serif">4</text></svg>`,
  'five': `<svg viewBox="0 0 64 64"><rect fill="#3B82F6" rx="12" width="64" height="64"/><text x="32" y="44" text-anchor="middle" fill="#fff" font-size="36" font-weight="bold" font-family="sans-serif">5</text></svg>`,
  'six': `<svg viewBox="0 0 64 64"><rect fill="#EAB308" rx="12" width="64" height="64"/><text x="32" y="44" text-anchor="middle" fill="#fff" font-size="36" font-weight="bold" font-family="sans-serif">6</text></svg>`,
  'seven': `<svg viewBox="0 0 64 64"><rect fill="#14B8A6" rx="12" width="64" height="64"/><text x="32" y="44" text-anchor="middle" fill="#fff" font-size="36" font-weight="bold" font-family="sans-serif">7</text></svg>`,
  'eight': `<svg viewBox="0 0 64 64"><rect fill="#EF4444" rx="12" width="64" height="64"/><text x="32" y="44" text-anchor="middle" fill="#fff" font-size="36" font-weight="bold" font-family="sans-serif">8</text></svg>`,
  'nine': `<svg viewBox="0 0 64 64"><rect fill="#6366F1" rx="12" width="64" height="64"/><text x="32" y="44" text-anchor="middle" fill="#fff" font-size="36" font-weight="bold" font-family="sans-serif">9</text></svg>`,
  'ten': `<svg viewBox="0 0 64 64"><rect fill="#84CC16" rx="12" width="64" height="64"/><text x="32" y="44" text-anchor="middle" fill="#fff" font-size="32" font-weight="bold" font-family="sans-serif">10</text></svg>`,

  // ═══════════════════════════════════════════════════════
  // FOOD - Fruits
  // ═══════════════════════════════════════════════════════
  'apple': `<svg viewBox="0 0 64 64"><ellipse fill="#EF4444" cx="32" cy="36" rx="18" ry="20"/><path fill="#22C55E" d="M32 16 Q36 8 42 10 Q38 14 36 18 L32 16"/><ellipse fill="#fff" cx="24" cy="28" rx="4" ry="6" opacity="0.3"/></svg>`,

  'banana': `<svg viewBox="0 0 64 64"><path fill="#FDE047" d="M16 48 Q8 36 12 24 Q18 12 32 8 Q46 12 52 24 Q48 24 36 26 Q24 28 20 36 Q18 42 16 48" stroke="#EAB308" stroke-width="2"/></svg>`,

  'orange': `<svg viewBox="0 0 64 64"><circle fill="#F97316" cx="32" cy="34" r="22"/><path fill="#22C55E" d="M32 12 L34 8 L30 8 Z"/><ellipse fill="#fff" cx="24" cy="26" rx="4" ry="6" opacity="0.2"/></svg>`,

  'grape': `<svg viewBox="0 0 64 64"><circle fill="#7C3AED" cx="26" cy="28" r="8"/><circle fill="#7C3AED" cx="38" cy="28" r="8"/><circle fill="#7C3AED" cx="32" cy="38" r="8"/><circle fill="#7C3AED" cx="22" cy="40" r="8"/><circle fill="#7C3AED" cx="42" cy="40" r="8"/><circle fill="#7C3AED" cx="32" cy="50" r="8"/><path fill="#22C55E" d="M32 20 Q36 12 40 16"/></svg>`,

  'strawberry': `<svg viewBox="0 0 64 64"><path fill="#EF4444" d="M32 54 Q16 42 16 28 Q16 18 32 14 Q48 18 48 28 Q48 42 32 54"/><ellipse fill="#22C55E" cx="32" cy="14" rx="10" ry="4"/><circle fill="#FDE047" cx="26" cy="28" r="1.5"/><circle fill="#FDE047" cx="38" cy="28" r="1.5"/><circle fill="#FDE047" cx="32" cy="36" r="1.5"/><circle fill="#FDE047" cx="26" cy="42" r="1.5"/><circle fill="#FDE047" cx="38" cy="42" r="1.5"/></svg>`,

  'watermelon': `<svg viewBox="0 0 64 64"><path fill="#22C55E" d="M8 48 Q32 8 56 48 Z"/><path fill="#EF4444" d="M12 46 Q32 14 52 46 Z"/><circle fill="#1F2937" cx="24" cy="36" r="2"/><circle fill="#1F2937" cx="32" cy="40" r="2"/><circle fill="#1F2937" cx="40" cy="36" r="2"/><circle fill="#1F2937" cx="28" cy="30" r="2"/><circle fill="#1F2937" cx="36" cy="30" r="2"/></svg>`,

  'pear': `<svg viewBox="0 0 64 64"><path fill="#84CC16" d="M32 56 Q16 48 16 36 Q16 28 24 24 Q28 18 32 12 Q36 18 40 24 Q48 28 48 36 Q48 48 32 56"/><path fill="#22C55E" d="M32 12 Q36 6 40 10"/></svg>`,

  'cherry': `<svg viewBox="0 0 64 64"><path fill="#22C55E" d="M32 8 Q24 16 22 28 M32 8 Q40 16 42 28" stroke="#22C55E" stroke-width="3" fill="none"/><circle fill="#EF4444" cx="22" cy="40" r="14"/><circle fill="#EF4444" cx="42" cy="40" r="14"/><ellipse fill="#fff" cx="18" cy="36" rx="3" ry="4" opacity="0.3"/><ellipse fill="#fff" cx="38" cy="36" rx="3" ry="4" opacity="0.3"/></svg>`,

  // ═══════════════════════════════════════════════════════
  // FOOD - Vegetables
  // ═══════════════════════════════════════════════════════
  'carrot': `<svg viewBox="0 0 64 64"><path fill="#F97316" d="M32 56 L20 20 L44 20 Z"/><path fill="#22C55E" d="M26 20 Q24 12 28 8 M32 20 Q32 10 32 6 M38 20 Q40 12 36 8"/></svg>`,

  'tomato': `<svg viewBox="0 0 64 64"><circle fill="#EF4444" cx="32" cy="36" r="20"/><path fill="#22C55E" d="M24 18 Q28 14 32 16 Q36 14 40 18 L38 22 L26 22 Z"/><ellipse fill="#fff" cx="24" cy="30" rx="4" ry="6" opacity="0.2"/></svg>`,

  'cucumber': `<svg viewBox="0 0 64 64"><ellipse fill="#22C55E" cx="32" cy="32" rx="24" ry="10" transform="rotate(-20 32 32)"/><ellipse fill="#166534" cx="32" cy="32" rx="20" ry="6" transform="rotate(-20 32 32)"/></svg>`,

  'potato': `<svg viewBox="0 0 64 64"><ellipse fill="#92400E" cx="32" cy="32" rx="22" ry="16"/><circle fill="#78350F" cx="24" cy="28" r="2"/><circle fill="#78350F" cx="36" cy="24" r="2"/><circle fill="#78350F" cx="40" cy="34" r="2"/><circle fill="#78350F" cx="28" cy="38" r="2"/></svg>`,

  'onion': `<svg viewBox="0 0 64 64"><ellipse fill="#F3E8FF" cx="32" cy="38" rx="18" ry="16"/><path fill="#E9D5FF" d="M20 38 Q32 20 44 38"/><path fill="#22C55E" d="M32 22 Q28 12 32 6 Q36 12 32 22"/></svg>`,

  'corn': `<svg viewBox="0 0 64 64"><ellipse fill="#FDE047" cx="32" cy="32" rx="12" ry="22"/><path fill="#22C55E" d="M20 14 Q24 10 28 16 M44 14 Q40 10 36 16 M18 20 Q22 16 26 22 M46 20 Q42 16 38 22"/><circle fill="#EAB308" cx="28" cy="24" r="3"/><circle fill="#EAB308" cx="36" cy="24" r="3"/><circle fill="#EAB308" cx="28" cy="32" r="3"/><circle fill="#EAB308" cx="36" cy="32" r="3"/><circle fill="#EAB308" cx="28" cy="40" r="3"/><circle fill="#EAB308" cx="36" cy="40" r="3"/></svg>`,

  // ═══════════════════════════════════════════════════════
  // DRINKS
  // ═══════════════════════════════════════════════════════
  'water': `<svg viewBox="0 0 64 64"><path fill="#60A5FA" d="M20 16 L44 16 L42 52 Q32 58 22 52 Z"/><rect fill="#93C5FD" x="20" y="16" width="24" height="8" rx="2"/></svg>`,

  'milk': `<svg viewBox="0 0 64 64"><rect fill="#F9FAFB" x="18" y="20" width="28" height="36" rx="4" stroke="#E5E7EB" stroke-width="2"/><rect fill="#E5E7EB" x="22" y="14" width="20" height="10" rx="2"/><rect fill="#3B82F6" x="22" y="32" width="20" height="16" rx="2"/><text x="32" y="44" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">MILK</text></svg>`,

  'juice': `<svg viewBox="0 0 64 64"><path fill="#F97316" d="M22 18 L42 18 L40 52 Q32 56 24 52 Z"/><ellipse fill="#FDBA74" cx="32" cy="18" rx="10" ry="4"/><circle fill="#F97316" cx="36" cy="8" r="6"/><path fill="#22C55E" d="M36 4 L38 2"/></svg>`,

  'tea': `<svg viewBox="0 0 64 64"><ellipse fill="#92400E" cx="32" cy="44" rx="16" ry="8"/><path fill="#F5F5DC" d="M16 28 L16 44 Q32 56 48 44 L48 28 Z"/><ellipse fill="#F5F5DC" cx="32" cy="28" rx="16" ry="6"/><ellipse fill="#D4A373" cx="32" cy="36" rx="12" ry="4"/><path fill="#F5F5DC" d="M48 32 Q56 32 56 40 Q56 48 48 48" stroke="#F5F5DC" stroke-width="4" fill="none"/></svg>`,

  'coffee': `<svg viewBox="0 0 64 64"><path fill="#F5F5DC" d="M14 24 L14 46 Q32 58 50 46 L50 24 Z"/><ellipse fill="#F5F5DC" cx="32" cy="24" rx="18" ry="6"/><ellipse fill="#6B4423" cx="32" cy="32" rx="14" ry="5"/><path fill="#F5F5DC" d="M50 28 Q60 28 60 38 Q60 48 50 48" stroke="#F5F5DC" stroke-width="4" fill="none"/></svg>`,

  // ═══════════════════════════════════════════════════════
  // WEATHER
  // ═══════════════════════════════════════════════════════
  'sun': `<svg viewBox="0 0 64 64"><circle fill="#FDE047" cx="32" cy="32" r="14"/><g stroke="#FDE047" stroke-width="4" stroke-linecap="round"><line x1="32" y1="6" x2="32" y2="14"/><line x1="32" y1="50" x2="32" y2="58"/><line x1="6" y1="32" x2="14" y2="32"/><line x1="50" y1="32" x2="58" y2="32"/><line x1="13" y1="13" x2="19" y2="19"/><line x1="45" y1="45" x2="51" y2="51"/><line x1="13" y1="51" x2="19" y2="45"/><line x1="45" y1="19" x2="51" y2="13"/></g></svg>`,

  'cloud': `<svg viewBox="0 0 64 64"><ellipse fill="#E5E7EB" cx="24" cy="38" rx="14" ry="12"/><ellipse fill="#E5E7EB" cx="40" cy="38" rx="16" ry="14"/><ellipse fill="#E5E7EB" cx="32" cy="28" rx="12" ry="10"/></svg>`,

  'rain': `<svg viewBox="0 0 64 64"><ellipse fill="#9CA3AF" cx="24" cy="24" rx="12" ry="10"/><ellipse fill="#9CA3AF" cx="40" cy="24" rx="14" ry="12"/><ellipse fill="#9CA3AF" cx="32" cy="16" rx="10" ry="8"/><path fill="#60A5FA" d="M20 40 L18 48 Q20 50 22 48 L20 40"/><path fill="#60A5FA" d="M32 42 L30 50 Q32 52 34 50 L32 42"/><path fill="#60A5FA" d="M44 40 L42 48 Q44 50 46 48 L44 40"/></svg>`,

  'snow': `<svg viewBox="0 0 64 64"><ellipse fill="#D1D5DB" cx="24" cy="20" rx="12" ry="10"/><ellipse fill="#D1D5DB" cx="40" cy="20" rx="14" ry="12"/><ellipse fill="#D1D5DB" cx="32" cy="12" rx="10" ry="8"/><text x="20" y="44" fill="#60A5FA" font-size="12">❄</text><text x="32" y="52" fill="#60A5FA" font-size="12">❄</text><text x="44" y="44" fill="#60A5FA" font-size="12">❄</text></svg>`,

  'wind': `<svg viewBox="0 0 64 64"><path fill="none" stroke="#9CA3AF" stroke-width="4" stroke-linecap="round" d="M8 24 Q20 24 24 20 Q28 16 32 20 Q36 24 44 24"/><path fill="none" stroke="#9CA3AF" stroke-width="4" stroke-linecap="round" d="M12 36 Q24 36 32 32 Q40 28 48 32 Q56 36 56 32"/><path fill="none" stroke="#9CA3AF" stroke-width="4" stroke-linecap="round" d="M8 48 Q16 48 20 44 Q24 40 32 44"/></svg>`,

  'rainbow': `<svg viewBox="0 0 64 64"><path fill="none" stroke="#EF4444" stroke-width="4" d="M8 48 Q32 8 56 48"/><path fill="none" stroke="#F97316" stroke-width="4" d="M12 48 Q32 14 52 48"/><path fill="none" stroke="#FDE047" stroke-width="4" d="M16 48 Q32 20 48 48"/><path fill="none" stroke="#22C55E" stroke-width="4" d="M20 48 Q32 26 44 48"/><path fill="none" stroke="#3B82F6" stroke-width="4" d="M24 48 Q32 32 40 48"/><path fill="none" stroke="#8B5CF6" stroke-width="4" d="M28 48 Q32 38 36 48"/></svg>`,

  // ═══════════════════════════════════════════════════════
  // TRANSPORT
  // ═══════════════════════════════════════════════════════
  'car': `<svg viewBox="0 0 64 64"><rect fill="#EF4444" x="8" y="28" width="48" height="16" rx="4"/><path fill="#EF4444" d="M16 28 L20 16 L44 16 L48 28"/><rect fill="#87CEEB" x="22" y="18" width="8" height="8" rx="2"/><rect fill="#87CEEB" x="34" y="18" width="8" height="8" rx="2"/><circle fill="#1F2937" cx="18" cy="44" r="6"/><circle fill="#1F2937" cx="46" cy="44" r="6"/><circle fill="#9CA3AF" cx="18" cy="44" r="3"/><circle fill="#9CA3AF" cx="46" cy="44" r="3"/></svg>`,

  'bus': `<svg viewBox="0 0 64 64"><rect fill="#FDE047" x="8" y="16" width="48" height="32" rx="4"/><rect fill="#87CEEB" x="12" y="20" width="10" height="12" rx="2"/><rect fill="#87CEEB" x="26" y="20" width="10" height="12" rx="2"/><rect fill="#87CEEB" x="40" y="20" width="12" height="12" rx="2"/><rect fill="#1F2937" x="8" y="40" width="48" height="4"/><circle fill="#1F2937" cx="18" cy="48" r="5"/><circle fill="#1F2937" cx="46" cy="48" r="5"/></svg>`,

  'train': `<svg viewBox="0 0 64 64"><rect fill="#3B82F6" x="12" y="16" width="40" height="32" rx="4"/><rect fill="#87CEEB" x="16" y="20" width="14" height="12" rx="2"/><rect fill="#87CEEB" x="34" y="20" width="14" height="12" rx="2"/><rect fill="#1E3A8A" x="12" y="36" width="40" height="8"/><circle fill="#FDE047" cx="22" cy="40" r="3"/><circle fill="#FDE047" cx="42" cy="40" r="3"/><rect fill="#1F2937" x="10" y="48" width="44" height="4" rx="2"/></svg>`,

  'airplane': `<svg viewBox="0 0 64 64"><ellipse fill="#E5E7EB" cx="32" cy="32" rx="24" ry="6" transform="rotate(-15 32 32)"/><path fill="#E5E7EB" d="M20 28 L8 20 L8 28 L20 32"/><path fill="#E5E7EB" d="M44 36 L56 44 L56 36 L44 32"/><ellipse fill="#87CEEB" cx="24" cy="30" rx="3" ry="2" transform="rotate(-15 24 30)"/><ellipse fill="#87CEEB" cx="32" cy="32" rx="3" ry="2" transform="rotate(-15 32 32)"/></svg>`,

  'ship': `<svg viewBox="0 0 64 64"><path fill="#6B7280" d="M8 40 L16 24 L48 24 L56 40 Z"/><rect fill="#EF4444" x="24" y="16" width="16" height="10"/><rect fill="#F9FAFB" x="28" y="18" width="4" height="6" rx="1"/><rect fill="#F9FAFB" x="36" y="18" width="4" height="6" rx="1"/><path fill="#3B82F6" d="M4 44 Q32 52 60 44 L56 48 Q32 56 8 48 Z"/></svg>`,

  'bicycle': `<svg viewBox="0 0 64 64"><circle fill="none" stroke="#1F2937" stroke-width="4" cx="16" cy="40" r="10"/><circle fill="none" stroke="#1F2937" stroke-width="4" cx="48" cy="40" r="10"/><path fill="none" stroke="#EF4444" stroke-width="3" d="M16 40 L28 24 L40 24 L48 40 M28 24 L32 40 L40 24"/><circle fill="#1F2937" cx="40" cy="24" r="4"/></svg>`,

  'helicopter': `<svg viewBox="0 0 64 64"><ellipse fill="#22C55E" cx="28" cy="36" rx="16" ry="10"/><path fill="#22C55E" d="M44 36 L56 44 L56 28 Z"/><rect fill="#1F2937" x="8" y="22" width="40" height="4" rx="2"/><rect fill="#1F2937" x="26" y="18" width="4" height="8"/><circle fill="#87CEEB" cx="20" cy="34" rx="6" ry="4"/><rect fill="#1F2937" x="24" y="46" width="8" height="4" rx="1"/></svg>`,

  // ═══════════════════════════════════════════════════════
  // SCHOOL
  // ═══════════════════════════════════════════════════════
  'book': `<svg viewBox="0 0 64 64"><rect fill="#3B82F6" x="12" y="12" width="40" height="44" rx="2"/><rect fill="#F9FAFB" x="18" y="16" width="32" height="36" rx="2"/><line x1="18" y1="16" x2="18" y2="52" stroke="#1E3A8A" stroke-width="2"/><rect fill="#93C5FD" x="22" y="22" width="24" height="3" rx="1"/><rect fill="#93C5FD" x="22" y="28" width="20" height="3" rx="1"/><rect fill="#93C5FD" x="22" y="34" width="22" height="3" rx="1"/></svg>`,

  'pencil': `<svg viewBox="0 0 64 64"><rect fill="#FDE047" x="16" y="8" width="12" height="44" rx="2" transform="rotate(15 22 30)"/><polygon fill="#FDBCB4" points="22,52 18,60 26,60"/><polygon fill="#1F2937" points="22,56 20,60 24,60"/><rect fill="#EF4444" x="16" y="8" width="12" height="8" rx="2" transform="rotate(15 22 12)"/></svg>`,

  'pen': `<svg viewBox="0 0 64 64"><rect fill="#3B82F6" x="18" y="8" width="8" height="40" rx="2" transform="rotate(10 22 28)"/><polygon fill="#1F2937" points="22,48 20,58 24,58"/><rect fill="#1E3A8A" x="18" y="8" width="8" height="6" rx="1" transform="rotate(10 22 11)"/></svg>`,

  'ruler': `<svg viewBox="0 0 64 64"><rect fill="#F97316" x="8" y="24" width="48" height="16" rx="2"/><line x1="16" y1="24" x2="16" y2="30" stroke="#fff" stroke-width="2"/><line x1="24" y1="24" x2="24" y2="34" stroke="#fff" stroke-width="2"/><line x1="32" y1="24" x2="32" y2="30" stroke="#fff" stroke-width="2"/><line x1="40" y1="24" x2="40" y2="34" stroke="#fff" stroke-width="2"/><line x1="48" y1="24" x2="48" y2="30" stroke="#fff" stroke-width="2"/></svg>`,

  'eraser': `<svg viewBox="0 0 64 64"><rect fill="#EC4899" x="12" y="28" width="40" height="16" rx="4" transform="rotate(-10 32 36)"/><rect fill="#F472B6" x="12" y="28" width="16" height="16" rx="4" transform="rotate(-10 20 36)"/></svg>`,

  'scissors': `<svg viewBox="0 0 64 64"><circle fill="#9CA3AF" cx="18" cy="18" r="8" stroke="#6B7280" stroke-width="2" fill="none"/><circle fill="#9CA3AF" cx="18" cy="46" r="8" stroke="#6B7280" stroke-width="2" fill="none"/><path fill="#6B7280" d="M24 20 L48 32 L24 44 Z"/></svg>`,

  'backpack': `<svg viewBox="0 0 64 64"><rect fill="#EF4444" x="14" y="16" width="36" height="40" rx="6"/><rect fill="#B91C1C" x="20" y="28" width="24" height="12" rx="3"/><path fill="#EF4444" d="M20 16 Q20 8 32 8 Q44 8 44 16" stroke="#B91C1C" stroke-width="3" fill="none"/><rect fill="#FDE047" x="28" y="32" width="8" height="4" rx="1"/></svg>`,

  'desk': `<svg viewBox="0 0 64 64"><rect fill="#92400E" x="8" y="24" width="48" height="6" rx="2"/><rect fill="#78350F" x="12" y="30" width="6" height="26"/><rect fill="#78350F" x="46" y="30" width="6" height="26"/></svg>`,

  'chair': `<svg viewBox="0 0 64 64"><rect fill="#92400E" x="16" y="20" width="32" height="6" rx="2"/><rect fill="#78350F" x="18" y="26" width="4" height="30"/><rect fill="#78350F" x="42" y="26" width="4" height="30"/><rect fill="#92400E" x="16" y="8" width="32" height="14" rx="2"/></svg>`,
};

// Get icon for a word (case-insensitive)
export function getWordIcon(word) {
  if (!word) return null;
  const key = word.toLowerCase().trim();
  return WORD_ICONS[key] || null;
}

// Get icon as data URL for use in img src
export function getWordIconDataUrl(word) {
  const svg = getWordIcon(word);
  if (!svg) return null;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}