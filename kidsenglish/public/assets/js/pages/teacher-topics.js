// pages/teacher-topics.js — Teacher's own topics CRUD.

import { listTopics, listExercises, createTopic, updateTopic, deleteTopic, getTeacher } from '../db.js';
import { getCurrentUser, signOut } from '../auth.js';
import { topicColorPair } from '../tokens.js';
import { esc, toast, confirmDialog } from '../ui.js';
import { navigate } from '../router.js';

export async function renderTeacherTopics() {
  const user = await getCurrentUser();
  if (!user) { navigate('/teacher', { replace: true }); return; }

  // Teacher profile might not exist yet in rare cases — if something went
  // wrong during signup. Send them to /teacher which will recreate it.
  const teacher = await getTeacher(user.uid);
  if (!teacher) {
    toast('Профиль не найден, переподпишитесь', { type: 'error' });
    await signOut();
    navigate('/teacher', { replace: true });
    return;
  }

  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="ke-admin">
      ${teacherHeaderHTML(user, teacher, 'topics')}
      <div class="ke-admin-content ke-admin-content-narrow">
        ${classCodeBannerHTML(teacher)}

        <div class="ke-admin-pageheader">
          <div>
            <div class="ke-admin-pageheader__label">Контент</div>
            <h2 id="ke-th">Мои темы <span class="ke-dim" id="ke-th-count">(…)</span></h2>
          </div>
          <button class="ke-admin-addbtn" id="ke-add-topic">
            <span style="font-size: 18px; line-height: 1;">＋</span> Создать тему
          </button>
        </div>

        <div id="ke-topics-box">
          <div class="ke-admin-empty">Загружаем темы…</div>
        </div>

        <div class="ke-admin-footer-note" id="ke-mode-note"></div>
      </div>
    </div>`;

  attachTeacherHeaderHandlers();
  attachClassCodeBannerHandlers(teacher);
  document.getElementById('ke-add-topic').addEventListener('click', () => openNewTopicModal(user.uid, refresh));

  await refresh();

  async function refresh() {
    const topics = await listTopics({ ownerId: user.uid });
    const counts = await Promise.all(topics.map(t =>
      listExercises({ ownerId: user.uid, topicId: t.id }).then(xs => xs.length).catch(() => 0)
    ));
    const box = document.getElementById('ke-topics-box');
    const counter = document.getElementById('ke-th-count');
    counter.textContent = `(${topics.length})`;

    if (topics.length === 0) {
      box.innerHTML = `
        <div class="ke-admin-empty">
          <div style="font-size: 40px; margin-bottom: 10px;">📂</div>
          <div style="font-weight:700; color:#140A36; font-size:16px;">Тем пока нет</div>
          <div style="margin-top: 4px;">Нажми «Создать тему», чтобы добавить первую.</div>
        </div>`;
      return;
    }

    box.innerHTML = `
      <div class="ke-admin-table ke-admin-table--topics">
        <div class="ke-admin-table__head">
          <div>№</div>
          <div>Тема</div>
          <div class="ke-hide-mobile">Заданий</div>
          <div class="ke-hide-mobile">Статус</div>
          <div style="text-align: right">Действия</div>
        </div>
        ${topics.map((t, i) => {
          const seedKey = t.id.split('_').slice(1, 2).join('_') || t.id;
          const [c1, c2] = topicColorPair(seedKey);
          return `
            <div class="ke-admin-table__row ${t.enabled === false ? 'ke-admin-table__row--disabled' : ''}" data-id="${esc(t.id)}">
              <div><span class="ke-admin-table__num">${i + 1}</span></div>
              <div class="ke-admin-table__topic">
                <div class="ke-admin-table__emoji" style="background:linear-gradient(135deg, ${c1}, ${c2});">${esc(t.emoji || '📚')}</div>
                <div>
                  <div class="ke-admin-table__title-ru">${esc(t.title)}</div>
                  <div class="ke-admin-table__id">id: ${esc(t.id)}</div>
                </div>
              </div>
              <div class="ke-admin-table__count ke-hide-mobile">${counts[i]}</div>
              <div class="ke-hide-mobile">
                <button class="ke-admin-toggle ${t.enabled !== false ? 'ke-admin-toggle--on' : ''}" data-action="toggle" data-id="${esc(t.id)}">
                  ${t.enabled !== false ? '● Активна' : '○ Скрыта'}
                </button>
              </div>
              <div class="ke-admin-table__actions">
                <button class="ke-admin-iconbtn" title="Редактировать" data-action="edit" data-id="${esc(t.id)}">✏️</button>
                <button class="ke-admin-iconbtn" title="Задания темы" data-action="exercises" data-id="${esc(t.id)}">📋</button>
                <button class="ke-admin-iconbtn" title="Удалить" data-action="delete" data-id="${esc(t.id)}">🗑</button>
              </div>
            </div>`;
        }).join('')}
      </div>`;

    box.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const action = btn.dataset.action;
        const id = btn.dataset.id;
        const topic = topics.find(t => t.id === id);
        if (!topic) return;

        if (action === 'toggle') {
          await updateTopic(id, user.uid, { enabled: topic.enabled === false });
          toast(topic.enabled === false ? 'Тема активирована' : 'Тема скрыта');
          await refresh();
        }
        if (action === 'edit') {
          openEditTopicModal(topic, async (patch) => {
            await updateTopic(id, user.uid, patch);
            toast('Тема обновлена');
            await refresh();
          });
        }
        if (action === 'exercises') {
          navigate(`/teacher/topics/${encodeURIComponent(id)}`);
        }
        if (action === 'delete') {
          const ok = await confirmDialog(`Удалить тему «${topic.title}» и все её задания?`);
          if (!ok) return;
          await deleteTopic(id, user.uid);
          toast('Тема удалена');
          await refresh();
        }
      });
    });

    document.getElementById('ke-mode-note').innerHTML = window.__keFirebaseOn
      ? `Данные синхронизируются с Firestore. Ваш ownerId: <code>${esc(user.uid)}</code>.`
      : 'Данные хранятся локально (localStorage). Настройте Firebase в <code>firebase-config.js</code> для продакшна.';
  }
}

function openNewTopicModal(ownerId, onDone) {
  const emojis = ['🌟','🦁','🚗','🌸','⚽','🌈','🧩','🎵','🍕','🌍','🎨','🔢'];
  const wrap = document.createElement('div');
  wrap.className = 'ke-modal-backdrop';
  wrap.innerHTML = `
    <div class="ke-modal">
      <h3>Новая тема</h3>
      <p>Создай категорию слов для детей</p>
      <div class="ke-field">
        <label class="ke-field__label">Название</label>
        <input class="ke-field__input" id="nt-name" placeholder="Например: Транспорт">
      </div>
      <div class="ke-field">
        <label class="ke-field__label">Эмодзи-иконка</label>
        <div class="ke-emoji-grid">
          ${emojis.map((e, i) => `<button class="ke-emoji-btn ${i === 0 ? 'ke-emoji-btn--active' : ''}" data-emoji="${esc(e)}">${esc(e)}</button>`).join('')}
        </div>
      </div>
      <div class="ke-modal__actions">
        <button class="ke-btn ke-btn--ghost" data-close>Отмена</button>
        <button class="ke-admin-btn-primary" id="nt-create" style="margin:0">Создать</button>
      </div>
    </div>`;
  document.body.appendChild(wrap);

  let chosen = emojis[0];
  wrap.querySelectorAll('.ke-emoji-btn').forEach(b => {
    b.addEventListener('click', () => {
      wrap.querySelectorAll('.ke-emoji-btn').forEach(x => x.classList.remove('ke-emoji-btn--active'));
      b.classList.add('ke-emoji-btn--active');
      chosen = b.dataset.emoji;
    });
  });
  wrap.addEventListener('click', (e) => { if (e.target === wrap || e.target.matches('[data-close]')) wrap.remove(); });

  document.getElementById('nt-create').addEventListener('click', async () => {
    const name = document.getElementById('nt-name').value.trim();
    if (!name) { toast('Введите название темы', { type: 'error' }); return; }
    const topics = await listTopics({ ownerId });
    const order = topics.length + 1;
    await createTopic(ownerId, { title: name, emoji: chosen, order, enabled: true });
    toast('Тема создана');
    wrap.remove();
    await onDone();
  });
}

function openEditTopicModal(topic, onSave) {
  const emojis = ['🌟','🦁','🚗','🌸','⚽','🌈','🧩','🎵','🐶','🎨','👨‍👩‍👧','🔢','🍎','🧸','👀','📚'];
  const wrap = document.createElement('div');
  wrap.className = 'ke-modal-backdrop';
  wrap.innerHTML = `
    <div class="ke-modal">
      <h3>Редактировать тему</h3>
      <p>id: <code>${esc(topic.id)}</code></p>
      <div class="ke-field">
        <label class="ke-field__label">Название</label>
        <input class="ke-field__input" id="et-name" value="${esc(topic.title)}">
      </div>
      <div class="ke-field">
        <label class="ke-field__label">Эмодзи-иконка</label>
        <div class="ke-emoji-grid">
          ${emojis.map(e => `<button class="ke-emoji-btn ${e === topic.emoji ? 'ke-emoji-btn--active' : ''}" data-emoji="${esc(e)}">${esc(e)}</button>`).join('')}
        </div>
      </div>
      <div class="ke-field">
        <label class="ke-field__label">Порядок отображения</label>
        <input class="ke-field__input" id="et-order" type="number" min="1" value="${esc(topic.order ?? 1)}">
      </div>
      <div class="ke-modal__actions">
        <button class="ke-btn ke-btn--ghost" data-close>Отмена</button>
        <button class="ke-admin-btn-primary" id="et-save" style="margin:0">Сохранить</button>
      </div>
    </div>`;
  document.body.appendChild(wrap);

  let chosen = topic.emoji || '🌟';
  wrap.querySelectorAll('.ke-emoji-btn').forEach(b => {
    b.addEventListener('click', () => {
      wrap.querySelectorAll('.ke-emoji-btn').forEach(x => x.classList.remove('ke-emoji-btn--active'));
      b.classList.add('ke-emoji-btn--active');
      chosen = b.dataset.emoji;
    });
  });
  wrap.addEventListener('click', (e) => { if (e.target === wrap || e.target.matches('[data-close]')) wrap.remove(); });

  document.getElementById('et-save').addEventListener('click', async () => {
    const title = document.getElementById('et-name').value.trim();
    const order = Number(document.getElementById('et-order').value) || 1;
    if (!title) { toast('Введите название', { type: 'error' }); return; }
    await onSave({ title, emoji: chosen, order });
    wrap.remove();
  });
}

// ─────────────────────────────────────────────────────────────────
// Shared admin header + class-code banner (exported for editor page)
// ─────────────────────────────────────────────────────────────────
export function teacherHeaderHTML(user, teacher, active = 'topics') {
  const initials = (user.displayName || teacher.displayName || user.email || 'AD').slice(0, 2).toUpperCase();
  return `
    <div class="ke-admin-header">
      <div style="display: flex; align-items: center; gap: 24px;">
        <a href="/teacher/topics" class="ke-logo">
          <span class="ke-logo__mark">🦖</span>
          <span class="ke-logo__text" style="background:linear-gradient(135deg, #140A36 0%, #6D28D9 100%);-webkit-background-clip:text;background-clip:text;color:transparent;">KidsEnglish</span>
        </a>
        <nav class="ke-admin-nav">
          <a href="/teacher/topics" class="ke-admin-nav__item ${active === 'topics' ? 'ke-admin-nav__item--active' : ''}">Мои темы</a>
        </nav>
      </div>
      <div class="ke-admin-user">
        <div class="ke-admin-user__email">${esc(teacher.displayName || user.email || 'Преподаватель')}</div>
        <div class="ke-admin-user__avatar">${esc(initials)}</div>
        <button class="ke-admin-user__signout" id="ke-signout">Выйти</button>
      </div>
    </div>`;
}

export function attachTeacherHeaderHandlers() {
  const btn = document.getElementById('ke-signout');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    await signOut();
    navigate('/teacher', { replace: true });
  });
}

export function classCodeBannerHTML(teacher) {
  const baseURL = location.origin;
  const classURL = `${baseURL}/class/${teacher.classCode}`;
  return `
    <div class="ke-classcode-banner">
      <div class="ke-classcode-banner__left">
        <div class="ke-classcode-banner__label">Код вашего класса</div>
        <div class="ke-classcode-banner__code" id="ke-cc-code">${esc(teacher.classCode)}</div>
      </div>
      <div class="ke-classcode-banner__right">
        <div class="ke-classcode-banner__sublabel">Ссылка для детей</div>
        <div class="ke-classcode-banner__url" id="ke-cc-url">${esc(classURL)}</div>
        <div class="ke-classcode-banner__actions">
          <button class="ke-classcode-btn" data-copy="code">📋 Код</button>
          <button class="ke-classcode-btn" data-copy="url">🔗 Ссылка</button>
          <a href="/class/${esc(teacher.classCode)}" target="_blank" class="ke-classcode-btn">👁 Открыть</a>
        </div>
      </div>
    </div>`;
}

export function attachClassCodeBannerHandlers(teacher) {
  const baseURL = location.origin;
  const classURL = `${baseURL}/class/${teacher.classCode}`;
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const kind = btn.dataset.copy;
      const text = kind === 'code' ? teacher.classCode : classURL;
      try {
        await navigator.clipboard.writeText(text);
        toast(kind === 'code' ? 'Код скопирован' : 'Ссылка скопирована');
      } catch {
        toast('Не удалось скопировать', { type: 'error' });
      }
    });
  });
}
