// pages/topic.js — Sequential exercise flow scoped to a class.

import { getTeacherByCode, getTopic, listExercises } from '../db.js';
import { topicAccent } from '../tokens.js';
import { topBarHTML, auroraHTML, starfieldHTML, progressHTML, burstConfetti, esc } from '../ui.js';
import { navigate } from '../router.js';

const sessionStore = new Map();

export async function renderTopic(code, topicId) {
  const root = document.getElementById('root');
  root.innerHTML = `<section class="ke-page">${auroraHTML()}${starfieldHTML(30)}
    <div style="padding: 80px 20px; text-align: center; color: var(--ke-text-muted);">Загружаем задания…</div></section>`;

  const teacher = await getTeacherByCode(code);
  if (!teacher) { navigate('/', { replace: true }); return; }

  const classHome = `/class/${encodeURIComponent(code)}`;
  const topic = await getTopic(topicId);

  if (!topic || topic.ownerId !== teacher.uid) {
    root.innerHTML = `
      <section class="ke-page">${auroraHTML()}${starfieldHTML(30)}
        ${topBarHTML({ backHref: classHome })}
        <div style="padding: 60px 20px; text-align: center;">
          <div style="font-size: 56px;">🤔</div>
          <h2 style="font-family: var(--ke-font-display); font-weight: 600; margin-top: 12px;">Тема не найдена</h2>
          <p style="color: var(--ke-text-soft);">Возможно, она была удалена.</p>
          <a href="${classHome}" class="ke-btn ke-btn--primary" style="margin-top: 16px;">← К темам</a>
        </div>
      </section>`;
    return;
  }

  const exercises = await listExercises({ ownerId: teacher.uid, topicId });
  if (exercises.length === 0) {
    root.innerHTML = `
      <section class="ke-page">${auroraHTML()}${starfieldHTML(30)}
        ${topBarHTML({ backHref: classHome, title: `<span style="display:inline-flex;align-items:center;gap:8px"><span style="font-size:20px">${esc(topic.emoji)}</span> ${esc(topic.title)}</span>` })}
        <div style="padding: 60px 20px; text-align: center;">
          <div style="font-size: 56px;">📝</div>
          <h2 style="font-family: var(--ke-font-display); font-weight: 600; margin-top: 12px;">Пока нет заданий</h2>
          <p style="color: var(--ke-text-soft);">Учитель скоро их добавит.</p>
          <a href="${classHome}" class="ke-btn ke-btn--primary" style="margin-top: 16px;">← К темам</a>
        </div>
      </section>`;
    return;
  }

  const state = {
    topic, exercises, code, teacher, classHome,
    idx: 0, score: 0, answered: null,
  };
  sessionStore.set(topicId, state);
  paint(state);
}

function paint(state) {
  const { topic, exercises, idx, answered, code, classHome } = state;
  const total = exercises.length;
  const q = exercises[idx];
  const acc = topicAccent(topic.id.split('_').slice(1, 2).join('_') || topic.id);

  const root = document.getElementById('root');
  const titleHTML = `<span style="display:inline-flex;align-items:center;gap:8px"><span style="font-size:20px">${esc(topic.emoji)}</span> ${esc(topic.title)}</span>`;

  let questionHTML = '';
  if (q.type === 'A') {
    questionHTML = `
      <div class="ke-qcard__image">
        ${q.imageUrl
          ? `<img src="${esc(q.imageUrl)}" alt="${esc(q.question)}">`
          : `<div class="ke-qcard__image-label">[ image: ${esc(q.question)} ]</div>`}
      </div>
      <div class="ke-qcard__tagline" style="color:${acc.base}">Переведи слово</div>
      <div class="ke-qcard__word" style="background:linear-gradient(135deg, #fff 0%, ${acc.base} 100%); -webkit-background-clip:text; background-clip:text; color:transparent; filter: drop-shadow(0 0 24px ${acc.glow});">${esc(q.question)}</div>
      <div class="ke-qcard__hint">Тапни правильный ответ</div>`;
  } else {
    const filled = answered ? esc(q.options[answered.picked]) : '___';
    const ok = answered && answered.correct;
    const blankClass = !answered ? 'ke-qcard__blank' :
      ok ? 'ke-qcard__blank ke-qcard__blank--ok' : 'ke-qcard__blank ke-qcard__blank--bad';
    const parts = String(q.question).split('___');
    questionHTML = `
      <div class="ke-qcard__tagline" style="color:${acc.base}">Вставь нужное слово</div>
      <div class="ke-qcard__sentence">
        ${esc(parts[0] || '')}<span class="${blankClass}" style="${!answered ? `border-color:${acc.base};background:${acc.glow.replace('0.55','0.13')};` : ''}">${filled}</span>${esc(parts[1] || '')}
      </div>
      <div class="ke-qcard__hint">Выбери слово из вариантов ниже</div>`;
  }

  const answersHTML = q.options.map((opt, i) => {
    let cls = 'ke-answer';
    if (q.type === 'B') cls += ' ke-answer--chip';
    if (answered) {
      if (i === q.answer) cls += ' ke-answer--correct';
      else if (i === answered.picked) cls += ' ke-answer--wrong';
      else cls += ' ke-answer--dim';
    }
    return `<button class="${cls}" data-idx="${i}" ${answered ? 'disabled' : ''}>${esc(opt)}</button>`;
  }).join('');

  const feedbackHTML = answered ? `
    <div class="ke-feedback ${answered.correct ? 'ke-feedback--ok' : 'ke-feedback--bad'}">
      <div class="ke-feedback__icon">${answered.correct ? '🎉' : '💡'}</div>
      <div>
        <div class="ke-feedback__title">${answered.correct ? 'Супер! Правильно!' : 'Не совсем. Смотри:'}</div>
        <div class="ke-feedback__text">${esc(q.explanation || '')}</div>
      </div>
    </div>` : '';

  const isLast = idx + 1 >= total;
  const nextHTML = answered ? `
    <button class="ke-btn ke-btn--primary ke-btn--full" id="ke-next-btn">
      ${isLast ? 'Посмотреть результат' : 'Следующее задание'}
      <span style="font-size: 22px;">${isLast ? '🏆' : '→'}</span>
    </button>` : '';

  root.innerHTML = `
    <section class="ke-page">
      ${auroraHTML()}
      ${starfieldHTML(30)}
      ${topBarHTML({ backHref: classHome, title: titleHTML })}
      ${progressHTML(idx + 1, total)}
      <div class="ke-exercise">
        <div class="ke-qcard" style="box-shadow: 0 1px 0 rgba(255,255,255,0.08) inset, 0 -3px 0 rgba(0,0,0,0.2) inset, 0 20px 40px -8px rgba(0,0,0,0.4), 0 0 60px -10px ${acc.glow};">
          ${questionHTML}
        </div>
        <div class="ke-answers ${q.type === 'B' ? 'ke-answers--chips' : ''}">
          ${answersHTML}
        </div>
        ${feedbackHTML}
        ${nextHTML}
      </div>
    </section>`;

  root.querySelectorAll('.ke-answer').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.answered) return;
      const picked = Number(btn.dataset.idx);
      const correct = picked === q.answer;
      state.answered = { correct, picked };
      if (correct) { state.score += 1; burstConfetti(); }
      paint(state);
    });
  });

  const next = document.getElementById('ke-next-btn');
  if (next) {
    next.addEventListener('click', () => {
      if (isLast) {
        sessionStorage.setItem('ke_last_result', JSON.stringify({
          code, topicId: topic.id, score: state.score, total,
        }));
        navigate(`/class/${encodeURIComponent(code)}/topic/${encodeURIComponent(topic.id)}/result`);
      } else {
        state.idx += 1;
        state.answered = null;
        paint(state);
      }
    });
  }
}
