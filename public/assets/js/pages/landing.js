// pages/landing.js — Landing: "введи код класса" или войти как препод.

import { getTeacherByCode, isFirebaseMode, LOCAL_DEMO_CODE } from '../db.js';
import { auroraHTML, starfieldHTML, esc, toast } from '../ui.js';
import { mascotSVG } from '../mascot.js';
import { navigate } from '../router.js';

const LS_LAST_CODE = 'ke_last_code';

export async function renderLanding() {
  // If the user has been here before, auto-redirect to their class
  const lastCode = localStorage.getItem(LS_LAST_CODE);
  if (lastCode) {
    const teacher = await getTeacherByCode(lastCode);
    if (teacher) {
      navigate(`/class/${encodeURIComponent(lastCode)}`, { replace: true });
      return;
    }
    // Code no longer valid — clear it
    localStorage.removeItem(LS_LAST_CODE);
  }

  const root = document.getElementById('root');
  const hint = isFirebaseMode()
    ? ''
    : `<div class="ke-landing__demo-hint">
         Демо-режим: попробуйте код <strong>${esc(LOCAL_DEMO_CODE)}</strong>
       </div>`;

  root.innerHTML = `
    <section class="ke-page ke-landing">
      ${auroraHTML()}
      ${starfieldHTML(60)}

      <div class="ke-landing__inner">
        <div class="ke-landing__mascot">${mascotSVG({ size: 160, mood: 'happy' })}</div>

        <div class="ke-landing__badge"><span>✨</span> Привет, друг!</div>
        <h1 class="ke-landing__title">
          Учим <span class="ke-home__title-accent">английский</span><br>играя!
        </h1>
        <p class="ke-landing__subtitle">
          Введи код класса, который дал тебе учитель —<br>
          и начнём весёлые задания.
        </p>

        <form class="ke-code-form" id="ke-code-form" autocomplete="off">
          <input
            class="ke-code-input"
            id="ke-code-input"
            type="text"
            placeholder="CODE"
            maxlength="12"
            autocapitalize="characters"
            autocorrect="off"
            spellcheck="false"
            aria-label="Код класса"
          >
          <button type="submit" class="ke-btn ke-btn--primary ke-code-submit">
            Вперёд <span style="font-size: 22px;">→</span>
          </button>
        </form>

        ${hint}

        <div class="ke-landing__divider"></div>

        <a href="/teacher" class="ke-landing__teacher-link">
          👨‍🏫 Я преподаватель — войти или зарегистрироваться
        </a>
      </div>
    </section>`;

  const input = document.getElementById('ke-code-input');
  const form = document.getElementById('ke-code-form');

  // Auto-uppercase as user types
  input.addEventListener('input', (e) => {
    const start = e.target.selectionStart;
    e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    e.target.setSelectionRange(start, start);
  });

  setTimeout(() => input.focus(), 100);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = input.value.trim().toUpperCase();
    if (!code) { toast('Введите код класса', { type: 'error' }); input.focus(); return; }

    const btn = form.querySelector('button');
    btn.disabled = true;
    const origText = btn.innerHTML;
    btn.innerHTML = 'Проверяем…';

    try {
      const teacher = await getTeacherByCode(code);
      if (!teacher) {
        toast('Такой код не найден. Проверь ещё раз.', { type: 'error' });
        input.focus();
        input.select();
        btn.disabled = false;
        btn.innerHTML = origText;
        return;
      }
      localStorage.setItem(LS_LAST_CODE, code);
      navigate(`/class/${encodeURIComponent(code)}`);
    } catch (err) {
      console.error(err);
      toast('Ошибка соединения. Попробуй ещё раз.', { type: 'error' });
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  });
}
