// router.js — Minimal history-API router.
//
// Использование:
//   const r = createRouter();
//   r.add('/',                  ctx => renderHome());
//   r.add('/topic/:id',         ctx => renderTopic(ctx.params.id));
//   r.add('/topic/:id/result',  ctx => renderResult(ctx.params.id));
//   r.add('/admin',             ctx => renderAdminLogin());
//   r.add('/admin/topics',      ctx => renderAdminTopics());
//   r.add('/admin/topics/:id',  ctx => renderAdminEditor(ctx.params.id));
//   r.start();
//
// navigate('/topic/animals') — програмная навигация через pushState.

const routes = [];
let currentCleanup = null;

function compile(pattern) {
  const keys = [];
  const re = new RegExp('^' + pattern.replace(/:[^/]+/g, m => {
    keys.push(m.slice(1));
    return '([^/]+)';
  }).replace(/\//g, '\\/') + '\\/?$');
  return { re, keys };
}

export function add(pattern, handler) {
  routes.push({ pattern, ...compile(pattern), handler });
}

function match(path) {
  for (const r of routes) {
    const m = path.match(r.re);
    if (m) {
      const params = {};
      r.keys.forEach((k, i) => { params[k] = decodeURIComponent(m[i + 1]); });
      return { handler: r.handler, params };
    }
  }
  return null;
}

async function render(path) {
  if (typeof currentCleanup === 'function') {
    try { currentCleanup(); } catch (e) { console.warn(e); }
    currentCleanup = null;
  }
  const hit = match(path);
  const ctx = { path, params: hit?.params || {} };
  const root = document.getElementById('root');
  // Trigger enter animation by reflow
  root.classList.remove('ke-page-enter');
  void root.offsetWidth;
  root.classList.add('ke-page-enter');
  window.scrollTo(0, 0);

  if (!hit) {
    root.innerHTML = `
      <section class="ke-404">
        <div class="ke-404-mark">🦖</div>
        <h1>Упс! Страница не найдена</h1>
        <p>Похоже, ты зашёл в неизвестный мир.</p>
        <a href="/" class="ke-btn ke-btn--primary">← На главную</a>
      </section>`;
    return;
  }
  const res = hit.handler(ctx);
  const maybe = await Promise.resolve(res);
  if (typeof maybe === 'function') currentCleanup = maybe;
}

export function navigate(path, { replace = false } = {}) {
  if (location.pathname === path) return;
  if (replace) history.replaceState({}, '', path);
  else history.pushState({}, '', path);
  render(path);
}

export function start() {
  // Intercept link clicks for SPA navigation
  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(href);
  });

  window.addEventListener('popstate', () => render(location.pathname));

  render(location.pathname || '/');
}
