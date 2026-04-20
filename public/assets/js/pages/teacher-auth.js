// pages/teacher-auth.js — Teacher login + registration (single page with tabs).

import { signInEmail, signUpEmail, signInGoogle, getCurrentUser, friendlyAuthError } from '../auth.js';
import { auroraHTML, starfieldHTML, esc } from '../ui.js';
import { mascotSVG } from '../mascot.js';
import { navigate } from '../router.js';
import { IS_FIREBASE_ENABLED } from '../firebase-config.js';

export async function renderTeacherAuth() {
  // If already signed in, skip auth screen
  const user = await getCurrentUser();
  if (user) { navigate('/teacher/topics', { replace: true }); return; }

  const root = document.getElementById('root');
  const modeNote = IS_FIREBASE_ENABLED
    ? '🔒 Firebase Authentication'
    : '⚙ Локальный демо-режим — любая пара email/пароль работает';

  root.innerHTML = `
    <section class="ke-admin-login">
      ${auroraHTML()}
      ${starfieldHTML(50)}
      <div class="ke-admin-login__card">
        <div class="ke-admin-login__header">
          ${mascotSVG({ size: 80, mood: 'happy', glow: false })}
          <h1 class="ke-admin-login__title">Кабинет преподавателя</h1>
          <p class="ke-admin-login__subtitle">KidsEnglish • создавайте свои уроки</p>
        </div>

        <div class="ke-auth-tabs">
          <button class="ke-auth-tab ke-auth-tab--active" data-tab="login">Войти</button>
          <button class="ke-auth-tab" data-tab="register">Регистрация</button>
        </div>

        <div id="ke-auth-error" style="display:none" class="ke-admin-login__error"></div>

        ${IS_FIREBASE_ENABLED ? `
          <button type="button" class="ke-google-btn" id="ke-google-btn">
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            Продолжить с Google
          </button>
          <div class="ke-auth-divider"><span>или</span></div>
        ` : ''}

        <!-- Login pane -->
        <form id="ke-login-form" autocomplete="on" novalidate data-pane="login">
          <div class="ke-field">
            <label class="ke-field__label" for="ke-login-email">Email</label>
            <input class="ke-field__input" id="ke-login-email" name="email" type="email" autocomplete="username" required>
          </div>
          <div class="ke-field">
            <label class="ke-field__label" for="ke-login-pass">Пароль</label>
            <input class="ke-field__input" id="ke-login-pass" name="password" type="password" autocomplete="current-password" required>
          </div>
          <button type="submit" class="ke-admin-btn-primary" id="ke-login-submit">Войти →</button>
        </form>

        <!-- Register pane -->
        <form id="ke-register-form" autocomplete="off" novalidate data-pane="register" style="display:none">
          <div class="ke-field">
            <label class="ke-field__label" for="ke-reg-name">Имя (как увидят дети)</label>
            <input class="ke-field__input" id="ke-reg-name" type="text" placeholder="Мария Ивановна" required>
          </div>
          <div class="ke-field">
            <label class="ke-field__label" for="ke-reg-email">Email</label>
            <input class="ke-field__input" id="ke-reg-email" type="email" autocomplete="email" required>
          </div>
          <div class="ke-field">
            <label class="ke-field__label" for="ke-reg-pass">Пароль (минимум 6 символов)</label>
            <input class="ke-field__input" id="ke-reg-pass" type="password" autocomplete="new-password" minlength="6" required>
          </div>
          <button type="submit" class="ke-admin-btn-primary" id="ke-reg-submit">Создать аккаунт →</button>
        </form>

        <div class="ke-admin-login__note">${esc(modeNote)}</div>

        <div style="margin-top: 16px; text-align: center;">
          <a href="/" style="color: #6D28D9; font-size: 13px; font-weight: 700;">← Вернуться на главную</a>
        </div>
      </div>
    </section>`;

  const errEl = document.getElementById('ke-auth-error');
  const showError = (msg) => { errEl.textContent = msg; errEl.style.display = ''; };
  const hideError = () => { errEl.style.display = 'none'; };

  // Tab switcher
  document.querySelectorAll('.ke-auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      hideError();
      document.querySelectorAll('.ke-auth-tab').forEach(t => t.classList.remove('ke-auth-tab--active'));
      tab.classList.add('ke-auth-tab--active');
      const target = tab.dataset.tab;
      document.querySelectorAll('[data-pane]').forEach(p => {
        p.style.display = p.dataset.pane === target ? '' : 'none';
      });
      // Focus first empty input
      const firstInput = document.querySelector(`[data-pane="${target}"] input`);
      if (firstInput) setTimeout(() => firstInput.focus(), 50);
    });
  });

  // Google sign-in
  const gBtn = document.getElementById('ke-google-btn');
  if (gBtn) {
    gBtn.addEventListener('click', async () => {
      hideError();
      gBtn.disabled = true;
      gBtn.style.opacity = '0.6';
      try {
        await signInGoogle();
        navigate('/teacher/topics', { replace: true });
      } catch (err) {
        showError(friendlyAuthError(err));
        gBtn.disabled = false;
        gBtn.style.opacity = '';
      }
    });
  }

  // Login
  document.getElementById('ke-login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();
    const email = document.getElementById('ke-login-email').value.trim();
    const pass = document.getElementById('ke-login-pass').value;
    if (!email || !pass) { showError('Заполните email и пароль'); return; }
    const btn = document.getElementById('ke-login-submit');
    btn.disabled = true; btn.textContent = 'Входим…';
    try {
      await signInEmail(email, pass);
      navigate('/teacher/topics', { replace: true });
    } catch (err) {
      showError(friendlyAuthError(err));
      btn.disabled = false; btn.textContent = 'Войти →';
    }
  });

  // Register
  document.getElementById('ke-register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();
    const name = document.getElementById('ke-reg-name').value.trim();
    const email = document.getElementById('ke-reg-email').value.trim();
    const pass = document.getElementById('ke-reg-pass').value;
    if (!name || !email || !pass) { showError('Заполните все поля'); return; }
    if (pass.length < 6) { showError('Пароль должен быть не короче 6 символов'); return; }
    const btn = document.getElementById('ke-reg-submit');
    btn.disabled = true; btn.textContent = 'Создаём…';
    try {
      await signUpEmail(email, pass, name);
      navigate('/teacher/topics', { replace: true });
    } catch (err) {
      showError(friendlyAuthError(err));
      btn.disabled = false; btn.textContent = 'Создать аккаунт →';
    }
  });

  // Autofocus
  setTimeout(() => document.getElementById('ke-login-email').focus(), 100);
}
