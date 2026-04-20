// pages/topic.js — Sequential exercise flow scoped to a class.

import { getTeacherByCode, getTopic, listExercises } from '../db.js';
import { topicAccent } from '../tokens.js';
import { topBarHTML, auroraHTML, starfieldHTML, progressHTML, burstConfetti, esc } from '../ui.js';
import { navigate } from '../router.js';
import { getWordIcon } from '../icons.js';

const sessionStore = new Map();

// Методологические подсказки по категориям тем
const METHODOLOGY_TIPS = {
  // TPR (Total Physical Response) — связываем с движениями
  tpr: {
    badge: '🏃 TPR',
    hint: 'Покажи это слово жестом!',
    feedback: 'Попробуй показать это слово руками — так оно лучше запомнится!',
    color: '#22D3EE'
  },
  // Multisensory — задействуем все каналы
  multisensory: {
    badge: '👁️ Мультисенсорный',
    hint: 'Смотри, слушай, повторяй!',
    feedback: 'Скажи это слово вслух 3 раза — и оно запомнится!',
    color: '#F472B6'
  },
  // Play-based — через игру
  play: {
    badge: '🎮 Игра',
    hint: 'Это как игра — найди правильный ответ!',
    feedback: 'Отличная игра! Попробуй ещё раз, чтобы запомнить лучше.',
    color: '#A3E635'
  },
  // Song-based — песни и ритм
  song: {
    badge: '🎵 Ритм',
    hint: 'Попробуй напеть это слово!',
    feedback: 'Слова легче запоминаются, если их петь или говорить ритмично!',
    color: '#FACC15'
  },
  // Storytelling — через истории
  story: {
    badge: '📖 История',
    hint: 'Представь это в истории!',
    feedback: 'Придумай историю с этим словом — это поможет запомнить!',
    color: '#FB923C'
  }
};

// Определяем метод по теме или слову
function getMethodologyForExercise(topic, exercise) {
  const topicId = (topic.id || '').toLowerCase();
  const word = (exercise.question || '').toLowerCase();

  // TPR — для животных, частей тела, действий
  if (topicId.includes('animal') || topicId.includes('body') || topicId.includes('action') ||
      topicId.includes('verbs') || word.includes('jump') || word.includes('run')) {
    return METHODOLOGY_TIPS.tpr;
  }

  // Multisensory — для цветов, чисел
  if (topicId.includes('color') || topicId.includes('number') || topicId.includes('shape')) {
    return METHODOLOGY_TIPS.multisensory;
  }

  // Song-based — для дней недели, месяцев, алфавита
  if (topicId.includes('week') || topicId.includes('month') || topicId.includes('alphabet') ||
      topicId.includes('season')) {
    return METHODOLOGY_TIPS.song;
  }

  // Storytelling — для еды, магазина, путешествий
  if (topicId.includes('food') || topicId.includes('shop') || topicId.includes('transport') ||
      topicId.includes('story') || topicId.includes('routine')) {
    return METHODOLOGY_TIPS.story;
  }

  // Play-based — по умолчанию для всего остального
  return METHODOLOGY_TIPS.play;
}

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
  const methodology = getMethodologyForExercise(topic, q);

  const root = document.getElementById('root');
  const titleHTML = `<span style="display:inline-flex;align-items:center;gap:8px"><span style="font-size:20px">${esc(topic.emoji)}</span> ${esc(topic.title)}</span>`;
  const methodBadgeHTML = `<div class="ke-method-badge" style="--method-color:${methodology.color}">${methodology.badge}</div>`;

  let questionHTML = '';
  if (q.type === 'A') {
    // Пытаемся получить SVG иконку для слова
    const wordIcon = getWordIcon(q.question);
    let imageContent = '';

    if (q.imageUrl) {
      // Если есть URL изображения — используем его
      imageContent = `<img src="${esc(q.imageUrl)}" alt="${esc(q.question)}">`;
    } else if (wordIcon) {
      // Если есть SVG иконка — используем её
      imageContent = `<div class="ke-qcard__svg-icon">${wordIcon}</div>`;
    } else {
      // Fallback — показываем эмодзи темы
      imageContent = `<div class="ke-qcard__emoji-fallback">${esc(topic.emoji || '📚')}</div>`;
    }

    questionHTML = `
      <div class="ke-qcard__image">
        ${imageContent}
      </div>
      <div class="ke-qcard__tagline" style="color:${acc.base}">Переведи слово</div>
      <div class="ke-qcard__word" style="background:linear-gradient(135deg, #fff 0%, ${acc.base} 100%); -webkit-background-clip:text; background-clip:text; color:transparent; filter: drop-shadow(0 0 24px ${acc.glow});">${esc(q.question)}</div>
      <div class="ke-qcard__hint">${esc(methodology.hint)}</div>`;
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
      <div class="ke-qcard__hint">${esc(methodology.hint)}</div>`;
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
        ${answered.correct ? `<div class="ke-feedback__method-tip">${esc(methodology.feedback)}</div>` : ''}
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
          ${methodBadgeHTML}
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
