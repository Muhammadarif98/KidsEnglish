// pages/teacher-profile.js — Teacher profile management.

import { getTeacher, updateTeacher, listStudents } from '../db.js';
import { getCurrentUser, signOut } from '../auth.js';
import { esc, toast } from '../ui.js';
import { navigate } from '../router.js';
import { teacherHeaderHTML, attachTeacherHeaderHandlers, classCodeBannerHTML, attachClassCodeBannerHandlers } from './teacher-topics.js';

export async function renderTeacherProfile() {
  const user = await getCurrentUser();
  if (!user) { navigate('/teacher', { replace: true }); return; }

  const teacher = await getTeacher(user.uid);
  if (!teacher) {
    toast('Профиль не найден', { type: 'error' });
    await signOut();
    navigate('/teacher', { replace: true });
    return;
  }

  const students = await listStudents(teacher.classCode);

  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="ke-admin">
      ${teacherHeaderHTML(user, teacher, 'profile')}
      <div class="ke-admin-content ke-admin-content-narrow">
        ${classCodeBannerHTML(teacher)}

        <div class="ke-admin-pageheader">
          <div>
            <div class="ke-admin-pageheader__label">Настройки</div>
            <h2>Мой профиль</h2>
          </div>
        </div>

        <div class="ke-profile-card">
          <div class="ke-profile-avatar">${getInitials(teacher.displayName)}</div>
          <div class="ke-profile-info">
            <div class="ke-profile-name">${esc(teacher.displayName)}</div>
            <div class="ke-profile-email">${esc(teacher.email || user.email || 'Нет email')}</div>
            <div class="ke-profile-stats">
              <span>👨‍🎓 ${students.length} учеников</span>
              <span style="margin-left: 16px;">📅 Зарегистрирован: ${formatDate(teacher.createdAt)}</span>
            </div>
          </div>
        </div>

        <div class="ke-profile-section">
          <h3>Редактировать данные</h3>
          <form id="ke-profile-form" class="ke-profile-form">
            <div class="ke-field">
              <label class="ke-field__label">Отображаемое имя (видят ученики)</label>
              <input class="ke-field__input" id="pf-name" value="${esc(teacher.displayName)}" placeholder="Мария Ивановна">
            </div>
            <div class="ke-field">
              <label class="ke-field__label">Email</label>
              <input class="ke-field__input" id="pf-email" value="${esc(teacher.email || '')}" placeholder="teacher@example.com" type="email">
            </div>
            <button type="submit" class="ke-admin-btn-primary">Сохранить изменения</button>
          </form>
        </div>

        <div class="ke-profile-section">
          <h3>Код класса</h3>
          <p style="color: #666; margin-bottom: 12px;">
            Этот код используют ученики для входа в ваш класс. Код нельзя изменить.
          </p>
          <div class="ke-classcode-display">
            <code>${esc(teacher.classCode)}</code>
            <button class="ke-btn ke-btn--ghost" id="ke-copy-code">📋 Скопировать</button>
          </div>
        </div>

        <div class="ke-profile-section ke-profile-section--danger">
          <h3>Опасная зона</h3>
          <p style="color: #666; margin-bottom: 12px;">
            Выход из аккаунта. Вы сможете войти снова с теми же данными.
          </p>
          <button class="ke-btn ke-btn--danger" id="ke-logout">Выйти из аккаунта</button>
        </div>
      </div>
    </div>`;

  attachTeacherHeaderHandlers();
  attachClassCodeBannerHandlers(teacher);

  // Обработка формы
  document.getElementById('ke-profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const displayName = document.getElementById('pf-name').value.trim();
    const email = document.getElementById('pf-email').value.trim();

    if (!displayName) {
      toast('Введите имя', { type: 'error' });
      return;
    }

    try {
      await updateTeacher(user.uid, { displayName, email });
      toast('Профиль обновлён');
      // Обновляем страницу для отображения изменений
      await renderTeacherProfile();
    } catch (err) {
      console.error(err);
      toast('Ошибка при сохранении', { type: 'error' });
    }
  });

  // Копирование кода
  document.getElementById('ke-copy-code').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(teacher.classCode);
      toast('Код скопирован');
    } catch {
      toast('Не удалось скопировать', { type: 'error' });
    }
  });

  // Выход
  document.getElementById('ke-logout').addEventListener('click', async () => {
    await signOut();
    navigate('/teacher', { replace: true });
  });
}

function getInitials(name) {
  if (!name) return '??';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function formatDate(ts) {
  if (!ts) return 'Неизвестно';
  const d = new Date(ts);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}
