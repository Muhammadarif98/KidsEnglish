// pages/teacher-students.js — Teacher's student management.

import {
  listStudents, createStudent, updateStudent, deleteStudent,
  regenerateStudentPassword, getTeacher, getStudentStats
} from '../db.js';
import { getCurrentUser, signOut } from '../auth.js';
import { esc, toast, confirmDialog } from '../ui.js';
import { navigate } from '../router.js';
import { teacherHeaderHTML, attachTeacherHeaderHandlers, classCodeBannerHTML, attachClassCodeBannerHandlers } from './teacher-topics.js';

export async function renderTeacherStudents() {
  const user = await getCurrentUser();
  if (!user) { navigate('/teacher', { replace: true }); return; }

  const teacher = await getTeacher(user.uid);
  if (!teacher) {
    toast('Профиль не найден', { type: 'error' });
    await signOut();
    navigate('/teacher', { replace: true });
    return;
  }

  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="ke-admin">
      ${teacherHeaderHTML(user, teacher, 'students')}
      <div class="ke-admin-content ke-admin-content-narrow">
        ${classCodeBannerHTML(teacher)}

        <div class="ke-admin-pageheader">
          <div>
            <div class="ke-admin-pageheader__label">Управление</div>
            <h2 id="ke-th">Мои ученики <span class="ke-dim" id="ke-th-count">(…)</span></h2>
          </div>
          <button class="ke-admin-addbtn" id="ke-add-student">
            <span style="font-size: 18px; line-height: 1;">＋</span> Добавить ученика
          </button>
        </div>

        <div class="ke-admin-info-box" style="margin-bottom: 20px;">
          <div style="font-weight: 600; margin-bottom: 8px;">📋 Как это работает</div>
          <div style="color: #666; font-size: 14px; line-height: 1.6;">
            1. Добавьте учеников в класс (имя и фамилия)<br>
            2. Каждому ученику автоматически генерируется уникальный пароль<br>
            3. Ученик заходит: вводит <strong>код класса</strong> и свой <strong>пароль</strong><br>
            4. Прогресс ученика сохраняется автоматически
          </div>
        </div>

        <div id="ke-students-box">
          <div class="ke-admin-empty">Загружаем учеников…</div>
        </div>
      </div>
    </div>`;

  attachTeacherHeaderHandlers();
  attachClassCodeBannerHandlers(teacher);
  document.getElementById('ke-add-student').addEventListener('click', () => openAddStudentModal(teacher.classCode, refresh));

  await refresh();

  async function refresh() {
    const students = await listStudents(teacher.classCode);
    const box = document.getElementById('ke-students-box');
    const counter = document.getElementById('ke-th-count');
    counter.textContent = `(${students.length})`;

    if (students.length === 0) {
      box.innerHTML = `
        <div class="ke-admin-empty">
          <div style="font-size: 40px; margin-bottom: 10px;">👦</div>
          <div style="font-weight:700; color:#140A36; font-size:16px;">Учеников пока нет</div>
          <div style="margin-top: 4px;">Нажми «Добавить ученика», чтобы добавить первого.</div>
        </div>`;
      return;
    }

    // Получаем статистику для каждого ученика
    const statsPromises = students.map(s => getStudentStats(s.id));
    const allStats = await Promise.all(statsPromises);

    box.innerHTML = `
      <div class="ke-admin-table ke-admin-table--students">
        <div class="ke-admin-table__head">
          <div>№</div>
          <div>Ученик</div>
          <div>Пароль</div>
          <div class="ke-hide-mobile">Прогресс</div>
          <div style="text-align: right">Действия</div>
        </div>
        ${students.map((s, i) => {
          const stats = allStats[i];
          return `
            <div class="ke-admin-table__row" data-id="${esc(s.id)}">
              <div><span class="ke-admin-table__num">${i + 1}</span></div>
              <div class="ke-admin-table__student">
                <div class="ke-admin-table__avatar">${getInitials(s.firstName, s.lastName)}</div>
                <div>
                  <div class="ke-admin-table__name">${esc(s.lastName)} ${esc(s.firstName)}</div>
                  <div class="ke-admin-table__id">id: ${esc(s.id)}</div>
                </div>
              </div>
              <div class="ke-admin-table__password">
                <code class="ke-password-code">${esc(s.password)}</code>
                <button class="ke-admin-iconbtn ke-admin-iconbtn--small" title="Скопировать" data-action="copy-password" data-password="${esc(s.password)}">📋</button>
              </div>
              <div class="ke-admin-table__progress ke-hide-mobile">
                <span style="color: #FACC15;">⭐ ${stats.totalStars}</span>
                <span style="color: #A3E635; margin-left: 8px;">🏆 ${stats.completedTopics} тем</span>
              </div>
              <div class="ke-admin-table__actions">
                <button class="ke-admin-iconbtn" title="Редактировать" data-action="edit" data-id="${esc(s.id)}">✏️</button>
                <button class="ke-admin-iconbtn" title="Новый пароль" data-action="regenerate" data-id="${esc(s.id)}">🔄</button>
                <button class="ke-admin-iconbtn" title="Удалить" data-action="delete" data-id="${esc(s.id)}">🗑</button>
              </div>
            </div>`;
        }).join('')}
      </div>

      <div class="ke-admin-bulk-actions" style="margin-top: 20px;">
        <button class="ke-btn ke-btn--ghost" id="ke-print-passwords">🖨️ Распечатать пароли</button>
      </div>`;

    // Обработчики действий
    box.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const action = btn.dataset.action;
        const id = btn.dataset.id;

        if (action === 'copy-password') {
          const password = btn.dataset.password;
          try {
            await navigator.clipboard.writeText(password);
            toast('Пароль скопирован');
          } catch {
            toast('Не удалось скопировать', { type: 'error' });
          }
          return;
        }

        const student = students.find(s => s.id === id);
        if (!student) return;

        if (action === 'edit') {
          openEditStudentModal(student, async (patch) => {
            await updateStudent(id, patch);
            toast('Данные ученика обновлены');
            await refresh();
          });
        }

        if (action === 'regenerate') {
          const ok = await confirmDialog(`Сгенерировать новый пароль для ${student.firstName}? Старый пароль перестанет работать.`);
          if (!ok) return;
          const updated = await regenerateStudentPassword(id);
          toast(`Новый пароль: ${updated.password}`);
          await refresh();
        }

        if (action === 'delete') {
          const ok = await confirmDialog(`Удалить ученика «${student.lastName} ${student.firstName}» и весь его прогресс?`);
          if (!ok) return;
          await deleteStudent(id);
          toast('Ученик удалён');
          await refresh();
        }
      });
    });

    // Печать паролей
    document.getElementById('ke-print-passwords')?.addEventListener('click', () => {
      printPasswordCards(students, teacher);
    });
  }
}

function getInitials(firstName, lastName) {
  const f = (firstName || '').charAt(0).toUpperCase();
  const l = (lastName || '').charAt(0).toUpperCase();
  return `${l}${f}` || '??';
}

function openAddStudentModal(classCode, onDone) {
  const wrap = document.createElement('div');
  wrap.className = 'ke-modal-backdrop';
  wrap.innerHTML = `
    <div class="ke-modal">
      <h3>Добавить ученика</h3>
      <p>Ученику автоматически сгенерируется пароль</p>
      <div class="ke-field">
        <label class="ke-field__label">Фамилия</label>
        <input class="ke-field__input" id="ns-last" placeholder="Иванов">
      </div>
      <div class="ke-field">
        <label class="ke-field__label">Имя</label>
        <input class="ke-field__input" id="ns-first" placeholder="Петя">
      </div>
      <div class="ke-modal__actions">
        <button class="ke-btn ke-btn--ghost" data-close>Отмена</button>
        <button class="ke-admin-btn-primary" id="ns-create" style="margin:0">Добавить</button>
      </div>
    </div>`;
  document.body.appendChild(wrap);

  wrap.addEventListener('click', (e) => { if (e.target === wrap || e.target.matches('[data-close]')) wrap.remove(); });

  document.getElementById('ns-create').addEventListener('click', async () => {
    const lastName = document.getElementById('ns-last').value.trim();
    const firstName = document.getElementById('ns-first').value.trim();
    if (!lastName || !firstName) { toast('Введите имя и фамилию', { type: 'error' }); return; }

    const student = await createStudent(classCode, { firstName, lastName });
    toast(`Ученик добавлен. Пароль: ${student.password}`);
    wrap.remove();
    await onDone();
  });
}

function openEditStudentModal(student, onSave) {
  const wrap = document.createElement('div');
  wrap.className = 'ke-modal-backdrop';
  wrap.innerHTML = `
    <div class="ke-modal">
      <h3>Редактировать ученика</h3>
      <p>id: <code>${esc(student.id)}</code></p>
      <div class="ke-field">
        <label class="ke-field__label">Фамилия</label>
        <input class="ke-field__input" id="es-last" value="${esc(student.lastName)}">
      </div>
      <div class="ke-field">
        <label class="ke-field__label">Имя</label>
        <input class="ke-field__input" id="es-first" value="${esc(student.firstName)}">
      </div>
      <div class="ke-modal__actions">
        <button class="ke-btn ke-btn--ghost" data-close>Отмена</button>
        <button class="ke-admin-btn-primary" id="es-save" style="margin:0">Сохранить</button>
      </div>
    </div>`;
  document.body.appendChild(wrap);

  wrap.addEventListener('click', (e) => { if (e.target === wrap || e.target.matches('[data-close]')) wrap.remove(); });

  document.getElementById('es-save').addEventListener('click', async () => {
    const lastName = document.getElementById('es-last').value.trim();
    const firstName = document.getElementById('es-first').value.trim();
    if (!lastName || !firstName) { toast('Введите имя и фамилию', { type: 'error' }); return; }
    await onSave({ lastName, firstName });
    wrap.remove();
  });
}

function printPasswordCards(students, teacher) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    toast('Браузер заблокировал всплывающее окно', { type: 'error' });
    return;
  }

  const cards = students.map(s => `
    <div class="card">
      <div class="card-header">🦖 KidsEnglish</div>
      <div class="card-name">${esc(s.lastName)} ${esc(s.firstName)}</div>
      <div class="card-row">
        <span class="card-label">Код класса:</span>
        <span class="card-value">${esc(teacher.classCode)}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Твой пароль:</span>
        <span class="card-value card-password">${esc(s.password)}</span>
      </div>
      <div class="card-footer">Зайди на сайт и введи код и пароль!</div>
    </div>
  `).join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Пароли учеников — ${esc(teacher.displayName)}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 20px; background: #f5f5f5; }
        h1 { text-align: center; margin-bottom: 20px; color: #333; }
        .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .card {
          background: white;
          border: 2px dashed #ccc;
          border-radius: 12px;
          padding: 20px;
          break-inside: avoid;
        }
        .card-header { font-size: 18px; font-weight: bold; color: #6D28D9; margin-bottom: 12px; }
        .card-name { font-size: 20px; font-weight: bold; margin-bottom: 16px; color: #333; }
        .card-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .card-label { color: #666; }
        .card-value { font-weight: bold; font-family: monospace; font-size: 16px; }
        .card-password { color: #6D28D9; font-size: 18px; }
        .card-footer { margin-top: 16px; font-size: 12px; color: #999; text-align: center; border-top: 1px solid #eee; padding-top: 12px; }
        @media print {
          body { padding: 0; background: white; }
          .card { border: 1px solid #ccc; page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <h1>Класс: ${esc(teacher.displayName)} (${esc(teacher.classCode)})</h1>
      <div class="cards">${cards}</div>
      <script>window.onload = () => window.print();</script>
    </body>
    </html>
  `);
  printWindow.document.close();
}
