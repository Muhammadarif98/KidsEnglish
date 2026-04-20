// pages/teacher-editor.js — Per-topic exercise CRUD + editor with preview.

import { getTopic, listExercises, createExercise, updateExercise, deleteExercise, reorderExercises, getTeacher } from '../db.js';
import { getCurrentUser } from '../auth.js';
import { esc, toast, confirmDialog } from '../ui.js';
import { navigate } from '../router.js';
import { teacherHeaderHTML, attachTeacherHeaderHandlers, classCodeBannerHTML, attachClassCodeBannerHandlers } from './teacher-topics.js';

export async function renderTeacherEditor(topicId) {
  const user = await getCurrentUser();
  if (!user) { navigate('/teacher', { replace: true }); return; }

  const teacher = await getTeacher(user.uid);
  if (!teacher) { navigate('/teacher', { replace: true }); return; }

  const topic = await getTopic(topicId);
  if (!topic || topic.ownerId !== user.uid) {
    toast('Тема не найдена или принадлежит другому преподавателю', { type: 'error' });
    navigate('/teacher/topics', { replace: true });
    return;
  }

  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="ke-admin">
      ${teacherHeaderHTML(user, teacher, 'topics')}
      <div class="ke-admin-content">
        ${classCodeBannerHTML(teacher)}

        <div class="ke-admin-crumbs">
          <a href="/teacher/topics">Мои темы</a>
          <span>/</span>
          <span class="ke-current">${esc(topic.emoji)} ${esc(topic.title)}</span>
        </div>

        <div class="ke-admin-pageheader">
          <div>
            <div class="ke-admin-pageheader__label">Задания темы</div>
            <h2>${esc(topic.title)} <span class="ke-dim" id="ke-ex-count">(…)</span></h2>
          </div>
          <button class="ke-admin-addbtn" id="ke-add-ex">
            <span style="font-size: 18px; line-height: 1;">＋</span> Новое задание
          </button>
        </div>

        <div id="ke-editor-box"></div>

        <div class="ke-admin-footer-note" id="ke-mode-note"></div>
      </div>
    </div>`;

  attachTeacherHeaderHandlers();
  attachClassCodeBannerHandlers(teacher);

  let view = 'list';
  document.getElementById('ke-add-ex').addEventListener('click', () => { view = { mode: 'new' }; paint(); });

  await paint();

  async function paint() {
    const exercises = await listExercises({ ownerId: user.uid, topicId });
    document.getElementById('ke-ex-count').textContent = `(${exercises.length})`;
    const box = document.getElementById('ke-editor-box');

    if (view === 'list') {
      box.innerHTML = renderListHTML(exercises);
      wireListHandlers(exercises);
    } else {
      box.innerHTML = renderEditorHTML(view.mode === 'new' ? blankExercise() : view.ex);
      wireEditorHandlers(view.mode === 'new' ? null : view.ex);
    }

    document.getElementById('ke-mode-note').innerHTML = window.__keFirebaseOn
      ? `Данные синхронизируются с Firestore, topicId = <code>${esc(topicId)}</code>.`
      : 'Данные хранятся локально (localStorage). Настройте Firebase для продакшна.';
  }

  function blankExercise() {
    return {
      id: null, topicId, type: 'A', order: 999,
      question: '', options: ['', '', '', ''], answer: 0,
      explanation: '', imageUrl: '',
    };
  }

  function renderListHTML(exercises) {
    if (exercises.length === 0) {
      return `
        <div class="ke-admin-empty">
          <div style="font-size: 40px; margin-bottom: 10px;">📝</div>
          <div style="font-weight:700; color:#140A36; font-size:16px;">Заданий пока нет</div>
          <div style="margin-top: 4px;">Нажми «Новое задание», чтобы добавить первое.</div>
        </div>`;
    }
    return `
      <div class="ke-admin-table ke-admin-table--exercises">
        <div class="ke-admin-table__head">
          <div>№</div>
          <div>Тип</div>
          <div>Вопрос</div>
          <div class="ke-hide-mobile">Правильный ответ</div>
          <div class="ke-hide-mobile">Порядок</div>
          <div style="text-align: right">Действия</div>
        </div>
        ${exercises.map((e, i) => `
          <div class="ke-admin-table__row" data-id="${esc(e.id)}">
            <div><span class="ke-admin-table__num">${i + 1}</span></div>
            <div>
              <span style="display:inline-block; padding:4px 10px; border-radius:999px;
                background:${e.type === 'A' ? 'rgba(139,92,246,0.1)' : 'rgba(34,211,238,0.1)'};
                color:${e.type === 'A' ? '#6D28D9' : '#0E7490'};
                font-weight:800; font-size:11px; letter-spacing:0.5px;">${e.type}</span>
            </div>
            <div style="font-weight:700; color:#140A36; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${esc(e.question || '—')}</div>
            <div class="ke-hide-mobile" style="color:#059669; font-weight:700;">${esc(e.options?.[e.answer] ?? '—')}</div>
            <div class="ke-hide-mobile" style="color:#6B7280;">
              <button class="ke-admin-iconbtn" data-action="up" data-id="${esc(e.id)}" title="Вверх" ${i === 0 ? 'disabled style="opacity:0.3;cursor:default"' : ''}>↑</button>
              <button class="ke-admin-iconbtn" data-action="down" data-id="${esc(e.id)}" title="Вниз" ${i === exercises.length - 1 ? 'disabled style="opacity:0.3;cursor:default"' : ''}>↓</button>
            </div>
            <div class="ke-admin-table__actions">
              <button class="ke-admin-iconbtn" title="Редактировать" data-action="edit" data-id="${esc(e.id)}">✏️</button>
              <button class="ke-admin-iconbtn" title="Удалить" data-action="delete" data-id="${esc(e.id)}">🗑</button>
            </div>
          </div>
        `).join('')}
      </div>`;
  }

  function wireListHandlers(exercises) {
    document.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (btn.disabled) return;
        const action = btn.dataset.action;
        const id = btn.dataset.id;
        const ex = exercises.find(e => e.id === id);
        if (!ex) return;

        if (action === 'edit') { view = { mode: 'edit', ex }; await paint(); }
        if (action === 'delete') {
          const ok = await confirmDialog(`Удалить задание «${ex.question}»?`);
          if (!ok) return;
          await deleteExercise(id, user.uid);
          toast('Задание удалено');
          await paint();
        }
        if (action === 'up' || action === 'down') {
          const idx = exercises.findIndex(e => e.id === id);
          const swapIdx = action === 'up' ? idx - 1 : idx + 1;
          if (swapIdx < 0 || swapIdx >= exercises.length) return;
          const order = exercises.map(e => e.id);
          [order[idx], order[swapIdx]] = [order[swapIdx], order[idx]];
          await reorderExercises(user.uid, topicId, order);
          await paint();
        }
      });
    });
  }

  function renderEditorHTML(ex) {
    return `
      <div class="ke-editor-grid">
        <div class="ke-editor-form">
          <h3 class="ke-editor-title">Параметры задания</h3>

          <div class="ke-field">
            <label class="ke-field__label">Тип задания</label>
            <div class="ke-type-toggle">
              <button type="button" class="ke-type-toggle__opt ${ex.type === 'A' ? 'ke-type-toggle__opt--active' : ''}" data-type="A">
                <div class="ke-type-toggle__label">A — Перевод слова</div>
                <div class="ke-type-toggle__desc">Англ. слово → выбор русского</div>
              </button>
              <button type="button" class="ke-type-toggle__opt ${ex.type === 'B' ? 'ke-type-toggle__opt--active' : ''}" data-type="B">
                <div class="ke-type-toggle__label">B — Пропуск в фразе</div>
                <div class="ke-type-toggle__desc">Фраза → вставь слово</div>
              </button>
            </div>
          </div>

          <div class="ke-field" id="ke-q-field">
            <label class="ke-field__label" id="ke-q-label">${ex.type === 'A' ? 'Английское слово' : 'Предложение (используй ___ для пропуска)'}</label>
            <input class="ke-field__input" id="ke-q" value="${esc(ex.question)}" placeholder="${ex.type === 'A' ? 'Dog' : 'The ___ is my friend.'}">
          </div>

          <div class="ke-field">
            <label class="ke-field__label">Варианты ответа (выбери правильный)</label>
            <div class="ke-options-grid">
              ${[0,1,2,3].map(i => `
                <div class="ke-option-row ${ex.answer === i ? 'ke-option-row--correct' : ''}" data-i="${i}">
                  <input class="ke-option-input" value="${esc(ex.options[i] || '')}" placeholder="Вариант ${i + 1}">
                  <button type="button" class="ke-option-correct-btn" title="Отметить правильным">${ex.answer === i ? '✓' : ''}</button>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="ke-field">
            <label class="ke-field__label">Пояснение после ответа</label>
            <textarea class="ke-field__textarea" id="ke-explain" rows="2">${esc(ex.explanation)}</textarea>
          </div>

          <div class="ke-field">
            <label class="ke-field__label">URL картинки (опционально)</label>
            <input class="ke-field__input" id="ke-img" value="${esc(ex.imageUrl)}" placeholder="https://... или оставь пустым">
          </div>

          <div class="ke-field">
            <label class="ke-field__label">Порядок в теме</label>
            <input class="ke-field__input" id="ke-order" type="number" min="1" value="${esc(ex.order ?? 999)}">
          </div>

          <div class="ke-editor-actions">
            <button class="ke-btn ke-btn--ghost" id="ke-cancel">Отмена</button>
            <div class="ke-spacer"></div>
            <button class="ke-admin-btn-primary" id="ke-save" style="width:auto; margin:0; padding:12px 24px;">${ex.id ? 'Сохранить' : 'Создать задание'}</button>
          </div>
        </div>

        <div>
          <div class="ke-editor-preview-label">Предпросмотр</div>
          <div class="ke-editor-preview" id="ke-preview"></div>
          <div class="ke-editor-preview-label" style="margin-top:14px;">
            ⓘ Сохранится как запись в Firestore <code style="background: #F1EBFA; padding: 2px 6px; border-radius: 4px; color: #6D28D9;">exercises/…</code>
          </div>
        </div>
      </div>`;
  }

  function wireEditorHandlers(originalEx) {
    const ex = originalEx ? { ...originalEx, options: [...originalEx.options] } : blankExercise();

    const rebuildPreview = () => {
      const p = document.getElementById('ke-preview');
      const filled = ex.type === 'A'
        ? esc(ex.question || 'Dog')
        : esc((ex.question || 'The ___ is my friend.').replace(/___/g, '____'));
      p.innerHTML = `
        <div class="ke-editor-preview-tag">${ex.type === 'A' ? 'Переведи слово' : 'Вставь нужное слово'}</div>
        <div class="ke-editor-preview-big ke-editor-preview-big--${ex.type}">${filled || '—'}</div>
        <div class="ke-editor-preview-options">
          ${(ex.options || []).map((o, i) => `
            <div class="ke-editor-preview-option ${ex.answer === i ? 'ke-editor-preview-option--correct' : ''}">${esc(o || `Вариант ${i + 1}`)}</div>
          `).join('')}
        </div>
        ${ex.explanation ? `<div class="ke-editor-preview-hint">💡 ${esc(ex.explanation)}</div>` : ''}`;
    };

    document.querySelectorAll('.ke-type-toggle__opt').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.ke-type-toggle__opt').forEach(b => b.classList.remove('ke-type-toggle__opt--active'));
        btn.classList.add('ke-type-toggle__opt--active');
        ex.type = btn.dataset.type;
        document.getElementById('ke-q-label').textContent = ex.type === 'A' ? 'Английское слово' : 'Предложение (используй ___ для пропуска)';
        document.getElementById('ke-q').placeholder = ex.type === 'A' ? 'Dog' : 'The ___ is my friend.';
        rebuildPreview();
      });
    });

    document.getElementById('ke-q').addEventListener('input', e => { ex.question = e.target.value; rebuildPreview(); });
    document.querySelectorAll('.ke-option-row').forEach(row => {
      const i = Number(row.dataset.i);
      row.querySelector('.ke-option-input').addEventListener('input', e => {
        ex.options[i] = e.target.value;
        rebuildPreview();
      });
      row.querySelector('.ke-option-correct-btn').addEventListener('click', () => {
        ex.answer = i;
        document.querySelectorAll('.ke-option-row').forEach((r, j) => {
          r.classList.toggle('ke-option-row--correct', j === i);
          r.querySelector('.ke-option-correct-btn').textContent = j === i ? '✓' : '';
        });
        rebuildPreview();
      });
    });
    document.getElementById('ke-explain').addEventListener('input', e => { ex.explanation = e.target.value; rebuildPreview(); });
    document.getElementById('ke-img').addEventListener('input', e => { ex.imageUrl = e.target.value; });
    document.getElementById('ke-order').addEventListener('input', e => { ex.order = Number(e.target.value) || 999; });

    document.getElementById('ke-cancel').addEventListener('click', async () => { view = 'list'; await paint(); });

    document.getElementById('ke-save').addEventListener('click', async () => {
      if (!ex.question.trim()) { toast('Введите вопрос', { type: 'error' }); return; }
      if (ex.options.some(o => !o.trim())) { toast('Заполните все 4 варианта', { type: 'error' }); return; }
      if (ex.type === 'B' && !ex.question.includes('___')) {
        toast('В предложении должен быть «___» для пропуска', { type: 'error' }); return;
      }
      const payload = {
        topicId,
        type: ex.type, order: ex.order,
        question: ex.question.trim(),
        options: ex.options.map(o => o.trim()),
        answer: ex.answer,
        explanation: (ex.explanation || '').trim(),
        imageUrl: (ex.imageUrl || '').trim(),
      };
      try {
        if (originalEx?.id) {
          await updateExercise(originalEx.id, user.uid, payload);
          toast('Задание обновлено');
        } else {
          await createExercise(user.uid, payload);
          toast('Задание создано');
        }
        view = 'list';
        await paint();
      } catch (err) {
        console.error(err);
        toast('Не удалось сохранить: ' + (err.message || ''), { type: 'error' });
      }
    });

    rebuildPreview();
  }
}
