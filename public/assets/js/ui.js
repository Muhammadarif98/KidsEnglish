// ui.js — Shared chrome: top bar, back button, progress, starfield, aurora, confetti.
//
// All functions return HTML strings (easy to compose into templates).
// Effects (confetti, starfield population) can be triggered from any page.

import { mascotHeadSVG } from './mascot.js';

// ─────────────────────────────────────────────────────────────────
// Logo and top bar
// ─────────────────────────────────────────────────────────────────
export function logoHTML() {
  return `
    <a href="/" class="ke-logo" aria-label="На главную">
      <span class="ke-logo__mark">🦖</span>
      <span class="ke-logo__text">KidsEnglish</span>
    </a>`;
}

export function starPillHTML(count = 42) {
  return `
    <div class="ke-starpill" aria-label="Звёзды: ${count}">
      <span class="ke-starpill__icon">⭐</span>
      <span class="ke-starpill__count">${count}</span>
    </div>`;
}

/**
 * Top bar: either a logo OR a back button (+ optional title).
 * @param {Object} opts
 * @param {string} [opts.title]       Centre title (or subtitle to the right of back).
 * @param {string} [opts.backHref]    If set, shows a back button linking to this URL.
 * @param {number} [opts.stars]       Stars to show in the pill. Default 42.
 * @param {string} [opts.right]       Optional custom HTML for right slot (overrides star pill).
 */
export function topBarHTML({ title = '', backHref = '', stars = 42, right = '' } = {}) {
  const leftSlot = backHref
    ? `<a href="${backHref}" class="ke-backbtn" aria-label="Назад">
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
           <path d="M15 18L9 12l6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
       </a>`
    : logoHTML();

  const rightSlot = right || starPillHTML(stars);
  const titleHTML = title
    ? `<div class="ke-topbar__title ${backHref ? 'ke-topbar__title--left' : ''}">${title}</div>`
    : `<div class="ke-topbar__spacer"></div>`;

  return `
    <header class="ke-topbar">
      ${leftSlot}
      ${titleHTML}
      ${rightSlot}
    </header>`;
}

// ─────────────────────────────────────────────────────────────────
// Progress bar
// ─────────────────────────────────────────────────────────────────
export function progressHTML(current, total) {
  const pct = Math.max(2, Math.round((current / total) * 100));
  return `
    <div class="ke-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${current}">
      <div class="ke-progress__track">
        <div class="ke-progress__fill" style="width:${pct}%"></div>
      </div>
      <div class="ke-progress__label">
        <span class="ke-progress__cur">${current}</span>
        <span class="ke-progress__sep"> / ${total}</span>
      </div>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────
// Animated starfield (pure CSS + DOM — no canvas)
// ─────────────────────────────────────────────────────────────────
export function starfieldHTML(count = 40) {
  // Deterministic "random" so the pattern doesn't change between renders
  let seed = 42;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  let stars = '';
  for (let i = 0; i < count; i++) {
    const x = rnd() * 100;
    const y = rnd() * 100;
    const size = 1 + rnd() * 2.5;
    const delay = rnd() * 4;
    const dur = 2 + rnd() * 3;
    stars += `<div class="ke-star" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;animation-delay:${delay}s;animation-duration:${dur}s"></div>`;
  }
  return `<div class="ke-starfield" aria-hidden="true">${stars}</div>`;
}

// ─────────────────────────────────────────────────────────────────
// Aurora (soft neon gradient blobs)
// ─────────────────────────────────────────────────────────────────
export function auroraHTML() {
  return `
    <div class="ke-aurora" aria-hidden="true">
      <div class="ke-aurora__blob ke-aurora__blob--violet"></div>
      <div class="ke-aurora__blob ke-aurora__blob--pink"></div>
      <div class="ke-aurora__blob ke-aurora__blob--cyan"></div>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────
// Confetti burst
// ─────────────────────────────────────────────────────────────────
export function burstConfetti() {
  const host = document.getElementById('ke-confetti-host');
  if (!host) return;
  const colors = ['#8B5CF6', '#F472B6', '#FB923C', '#FACC15', '#22D3EE', '#A3E635'];
  for (let i = 0; i < 28; i++) {
    const c = document.createElement('div');
    const sz = 6 + Math.random() * 8;
    c.className = 'ke-confetti-piece';
    c.style.cssText = `
      position:absolute; top:35%; left:${40 + Math.random() * 20}%;
      width:${sz}px; height:${sz}px;
      background:${colors[i % colors.length]};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events:none;
      transform:translate(0,0) rotate(0deg);
      opacity:1;
      transition: transform 1.2s cubic-bezier(0.2,0.7,0.3,1), opacity 1.2s;
      z-index:999;`;
    host.appendChild(c);
    requestAnimationFrame(() => {
      const dx = (Math.random() - 0.5) * 400;
      const dy = 200 + Math.random() * 300;
      c.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random() * 720}deg)`;
      c.style.opacity = '0';
    });
    setTimeout(() => c.remove(), 1400);
  }
}

// ─────────────────────────────────────────────────────────────────
// Quick HTML escaper — for user-supplied content rendered verbatim
// ─────────────────────────────────────────────────────────────────
export function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);
}

// ─────────────────────────────────────────────────────────────────
// Simple toast (used in admin after save/delete)
// ─────────────────────────────────────────────────────────────────
let toastTimer = null;
export function toast(message, { type = 'success' } = {}) {
  let el = document.getElementById('ke-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'ke-toast';
    document.body.appendChild(el);
  }
  el.className = `ke-toast ke-toast--${type} ke-toast--visible`;
  el.textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.classList.remove('ke-toast--visible'); }, 2500);
}

// Simple confirm dialog — returns Promise<boolean>
export function confirmDialog(message) {
  return new Promise(resolve => {
    const wrap = document.createElement('div');
    wrap.className = 'ke-modal-backdrop';
    wrap.innerHTML = `
      <div class="ke-modal ke-modal--confirm">
        <div class="ke-modal__icon">⚠️</div>
        <div class="ke-modal__title">${esc(message)}</div>
        <div class="ke-modal__actions">
          <button class="ke-btn ke-btn--ghost" data-action="cancel">Отмена</button>
          <button class="ke-btn ke-btn--danger" data-action="ok">Удалить</button>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    const close = (val) => { wrap.remove(); resolve(val); };
    wrap.addEventListener('click', e => {
      if (e.target === wrap) close(false);
      const action = e.target.closest('[data-action]')?.dataset.action;
      if (action === 'cancel') close(false);
      if (action === 'ok') close(true);
    });
  });
}
