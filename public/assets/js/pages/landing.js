// pages/landing.js — Landing: авторизация ученика (код класса + пароль) или войти как препод.

import { getTeacherByCode, getStudentByPassword, listStudents, isFirebaseMode, LOCAL_DEMO_CODE } from '../db.js';
import { auroraHTML, starfieldHTML, esc, toast } from '../ui.js';
import { mascotSVG } from '../mascot.js';
import { navigate } from '../router.js';

const LS_LAST_CODE = 'ke_last_code';
const LS_STUDENT_SESSION = 'ke_student_session';

// Экспортируем для использования в других модулях
export function getStudentSession() {
  try {
    const raw = sessionStorage.getItem(LS_STUDENT_SESSION);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

export function setStudentSession(student, classCode) {
  sessionStorage.setItem(LS_STUDENT_SESSION, JSON.stringify({ ...student, classCode }));
}

export function clearStudentSession() {
  sessionStorage.removeItem(LS_STUDENT_SESSION);
  localStorage.removeItem(LS_LAST_CODE);
}

export async function renderLanding() {
  // Если есть активная сессия ученика — редирект
  const session = getStudentSession();
  if (session?.classCode) {
    const teacher = await getTeacherByCode(session.classCode);
    if (teacher) {
      navigate(`/class/${encodeURIComponent(session.classCode)}`, { replace: true });
      return;
    }
    clearStudentSession();
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
          Введи код класса и свой пароль —<br>
          и начнём весёлые задания.
        </p>

        <form class="ke-code-form ke-code-form--two-fields" id="ke-code-form" autocomplete="off">
          <div class="ke-code-form__row">
            <div class="ke-code-form__field">
              <label class="ke-code-form__label">Код класса</label>
              <input
                class="ke-code-input"
                id="ke-code-input"
                type="text"
                placeholder="ABCD12"
                maxlength="12"
                autocapitalize="characters"
                autocorrect="off"
                spellcheck="false"
                aria-label="Код класса"
              >
            </div>
            <div class="ke-code-form__field">
              <label class="ke-code-form__label">Твой пароль</label>
              <input
                class="ke-code-input ke-code-input--password"
                id="ke-password-input"
                type="text"
                placeholder="tiger42"
                maxlength="20"
                autocapitalize="none"
                autocorrect="off"
                spellcheck="false"
                aria-label="Пароль"
              >
            </div>
          </div>
          <button type="submit" class="ke-btn ke-btn--primary ke-code-submit ke-code-submit--full">
            Войти <span style="font-size: 22px;">→</span>
          </button>
        </form>

        ${hint}

        <div class="ke-landing__divider"></div>

        <a href="/teacher" class="ke-landing__teacher-link">
          👨‍🏫 Я преподаватель — войти или зарегистрироваться
        </a>

        <a href="/course" class="ke-landing__course-link">
          📚 Курс A1 → A2 — методика и программа
        </a>
      </div>
    </section>`;

  const codeInput = document.getElementById('ke-code-input');
  const passwordInput = document.getElementById('ke-password-input');
  const form = document.getElementById('ke-code-form');

  // Auto-uppercase код класса
  codeInput.addEventListener('input', (e) => {
    const start = e.target.selectionStart;
    e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    e.target.setSelectionRange(start, start);
  });

  // Пароль — lowercase, буквы и цифры
  passwordInput.addEventListener('input', (e) => {
    const start = e.target.selectionStart;
    e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '');
    e.target.setSelectionRange(start, start);
  });

  setTimeout(() => codeInput.focus(), 100);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = codeInput.value.trim().toUpperCase();
    const password = passwordInput.value.trim().toLowerCase();

    if (!code) { toast('Введи код класса', { type: 'error' }); codeInput.focus(); return; }
    if (!password) { toast('Введи свой пароль', { type: 'error' }); passwordInput.focus(); return; }

    const btn = form.querySelector('button');
    btn.disabled = true;
    const origText = btn.innerHTML;
    btn.innerHTML = 'Проверяем…';

    try {
      const teacher = await getTeacherByCode(code);
      if (!teacher) {
        toast('Код класса не найден. Проверь ещё раз.', { type: 'error' });
        codeInput.focus();
        codeInput.select();
        btn.disabled = false;
        btn.innerHTML = origText;
        return;
      }

      // Проверяем, есть ли ученики в классе
      const students = await listStudents(code);

      if (students.length === 0) {
        // Если учеников нет — пускаем как гостя (для демо/превью)
        localStorage.setItem(LS_LAST_CODE, code);
        navigate(`/class/${encodeURIComponent(code)}`);
        return;
      }

      // Ищем ученика по паролю
      const student = await getStudentByPassword(code, password);
      if (!student) {
        toast('Неверный пароль. Спроси у учителя.', { type: 'error' });
        passwordInput.focus();
        passwordInput.select();
        btn.disabled = false;
        btn.innerHTML = origText;
        return;
      }

      // Сохраняем сессию и переходим
      setStudentSession(student, code);
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
