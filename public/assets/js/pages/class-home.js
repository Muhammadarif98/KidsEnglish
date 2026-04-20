// pages/class-home.js — Student view: topic catalogue for one teacher's class.

import { getTeacherByCode, listTopics, listExercises, getStudentStats } from '../db.js';
import { topicColorPair } from '../tokens.js';
import { topBarHTML, auroraHTML, starfieldHTML, esc } from '../ui.js';
import { mascotSVG } from '../mascot.js';
import { navigate } from '../router.js';
import { getStudentSession, clearStudentSession } from './landing.js';

const LS_LAST_CODE = 'ke_last_code';

export async function renderClassHome(code) {
  const root = document.getElementById('root');

  // Early shell
  root.innerHTML = `
    <section class="ke-page ke-home">
      ${auroraHTML()}
      ${starfieldHTML(40)}
      ${topBarHTML({ stars: 0, right: `<a href="/" class="ke-topbar__exit" title="Выйти из класса">✕</a>` })}
      <div style="padding: 80px 20px; text-align: center; color: var(--ke-text-muted);">Загружаем класс…</div>
    </section>`;

  const teacher = await getTeacherByCode(code);
  if (!teacher) {
    root.innerHTML = `
      <section class="ke-page">${auroraHTML()}${starfieldHTML(30)}
        ${topBarHTML({ backHref: '/' })}
        <div style="padding: 60px 20px; text-align: center;">
          <div style="font-size: 56px;">🔍</div>
          <h2 style="font-family: var(--ke-font-display); font-weight: 600; margin-top: 12px;">Класс не найден</h2>
          <p style="color: var(--ke-text-soft);">Код <code style="background:rgba(255,255,255,0.1);padding:2px 8px;border-radius:6px;font-family:var(--ke-font-mono);">${esc(code)}</code> не существует или был удалён.</p>
          <a href="/" class="ke-btn ke-btn--primary" style="margin-top: 16px;">← Ввести другой код</a>
        </div>
      </section>`;
    return;
  }

  // Remember code for next visit
  localStorage.setItem(LS_LAST_CODE, teacher.classCode);

  const topics = await listTopics({ ownerId: teacher.uid, onlyEnabled: true });
  const counts = await Promise.all(topics.map(t =>
    listExercises({ ownerId: teacher.uid, topicId: t.id }).then(xs => xs.length).catch(() => 0)
  ));

  // Получаем сессию ученика и его прогресс
  const session = getStudentSession();
  let stats = { totalStars: 0, completedTopics: 0, progress: [] };
  let studentName = '';
  let isPreview = new URLSearchParams(window.location.search).has('preview');

  if (session?.id) {
    stats = await getStudentStats(session.id);
    studentName = `${session.firstName || ''}`.trim();
  }

  // Создаём map прогресса для быстрого поиска
  const progressMap = new Map(stats.progress.map(p => [p.topicId, p]));

  const greeting = studentName ? `Привет, ${esc(studentName)}!` : 'Привет!';
  const previewBadge = isPreview ? '<div class="ke-preview-badge">👁 Режим просмотра</div>' : '';

  root.innerHTML = `
    <section class="ke-page ke-home">
      ${auroraHTML()}
      ${starfieldHTML(40)}
      ${topBarHTML({
        stars: stats.totalStars,
        right: `<a href="/" class="ke-topbar__exit" title="Выйти из класса" aria-label="Выйти из класса">✕</a>`
      })}

      ${previewBadge}

      <div class="ke-home__hero">
        <div class="ke-home__mascot">${mascotSVG({ size: 120, mood: 'happy' })}</div>
        <div class="ke-home__hero-text">
          <div class="ke-home__badge"><span>👨‍🏫</span> Класс ${esc(teacher.displayName)}</div>
          <h1 class="ke-home__title">${greeting}<br>Выбери <span class="ke-home__title-accent">тему</span></h1>
          <p class="ke-home__subtitle">Зарабатывай звёзды ⭐ за правильные ответы.</p>
        </div>
      </div>

      <div class="ke-stats">
        <div class="ke-stat"><div class="ke-stat__icon">⭐</div><div class="ke-stat__value" style="color:#FACC15">${stats.totalStars}</div><div class="ke-stat__label">Звёзды</div></div>
        <div class="ke-stat"><div class="ke-stat__icon">🔥</div><div class="ke-stat__value" style="color:#FB923C">${stats.completedTopics > 0 ? stats.completedTopics : '—'}</div><div class="ke-stat__label">Пройдено</div></div>
        <div class="ke-stat"><div class="ke-stat__icon">🏆</div><div class="ke-stat__value" style="color:#A3E635">${stats.completedTopics} / ${topics.length}</div><div class="ke-stat__label">Тем</div></div>
      </div>

      <div class="ke-course-link-wrap">
        <a href="/class/${esc(teacher.classCode)}/course" class="ke-course-link-btn">
          📚 Курс A1 → A2 — методика и программа
        </a>
      </div>

      <div class="ke-topics-header">
        <h2>Темы</h2>
        <span>${topics.length} ${pluralCat(topics.length)}</span>
      </div>

      <div class="ke-topic-grid" id="ke-topic-grid">
        ${topics.length === 0
          ? `<div style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; color: var(--ke-text-muted);">
               <div style="font-size: 48px; margin-bottom: 12px;">🎒</div>
               <div style="font-family: var(--ke-font-display); font-weight: 600; font-size: 20px; color: #fff;">Тем пока нет</div>
               <div style="margin-top: 8px;">Учитель скоро их добавит.</div>
             </div>`
          : topics.map((t, i) => {
              const [c1, c2] = topicColorPair(t.id.split('_').slice(1, 2).join('_') || t.id);
              const cc1 = hexToRgba(c1, 0.35);
              const glow = cc1;
              const count = counts[i];
              const isEmpty = count === 0;
              const topicProgress = progressMap.get(t.id);
              const stars = topicProgress?.stars || 0;
              const starsHTML = stars > 0 ? `<div class="ke-topic-card__stars">${'⭐'.repeat(stars)}</div>` : '';
              const completedClass = stars > 0 ? 'ke-topic-card--completed' : '';
              return `
                <button class="ke-topic-card ${completedClass}"
                        data-id="${esc(t.id)}"
                        data-code="${esc(teacher.classCode)}"
                        ${isEmpty ? 'disabled title="Нет заданий"' : ''}
                        style="--card-c1:${c1}; --card-c2:${c2}; --card-c1-35:${cc1}; --card-glow:${glow}; --card-delay:${i * 0.06}s;">
                  <div class="ke-topic-card__blob"></div>
                  ${starsHTML}
                  <div class="ke-topic-card__tile"><span>${esc(t.emoji || '📚')}</span></div>
                  <div class="ke-topic-card__name">${esc(t.title)}</div>
                  <div class="ke-topic-card__meta">${count} ${pluralTasks(count)}</div>
                </button>`;
            }).join('')
        }
      </div>
    </section>`;

  // Topic click
  document.getElementById('ke-topic-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('.ke-topic-card');
    if (!btn || btn.disabled) return;
    const id = btn.dataset.id;
    navigate(`/class/${encodeURIComponent(teacher.classCode)}/topic/${encodeURIComponent(id)}`);
  });

  // "Exit class" button clears the remembered code and session
  const exit = document.querySelector('.ke-topbar__exit');
  if (exit) {
    exit.addEventListener('click', (e) => {
      e.preventDefault();
      clearStudentSession();
      navigate('/', { replace: true });
    });
  }
}

function hexToRgba(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
function pluralCat(n) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return 'категория';
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'категории';
  return 'категорий';
}
function pluralTasks(n) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return 'задание';
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'задания';
  return 'заданий';
}
