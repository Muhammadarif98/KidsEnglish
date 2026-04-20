// pages/result.js — End-of-topic result screen.

import { getTeacherByCode, getTopic } from '../db.js';
import { topicAccent } from '../tokens.js';
import { topBarHTML, auroraHTML, starfieldHTML, burstConfetti, esc } from '../ui.js';
import { mascotSVG } from '../mascot.js';
import { navigate } from '../router.js';

export async function renderResult(code, topicId) {
  const root = document.getElementById('root');

  const teacher = await getTeacherByCode(code);
  if (!teacher) { navigate('/', { replace: true }); return; }

  const topic = await getTopic(topicId);
  if (!topic || topic.ownerId !== teacher.uid) {
    navigate(`/class/${encodeURIComponent(code)}`, { replace: true });
    return;
  }

  const classHome = `/class/${encodeURIComponent(code)}`;
  let result;
  try { result = JSON.parse(sessionStorage.getItem('ke_last_result') || 'null'); }
  catch { result = null; }
  if (!result || result.topicId !== topicId || result.code !== code) {
    navigate(`/class/${encodeURIComponent(code)}/topic/${encodeURIComponent(topicId)}`, { replace: true });
    return;
  }

  const { score, total } = result;
  const pct = total > 0 ? score / total : 0;
  const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : pct >= 0.3 ? 1 : 0;
  const mood = pct >= 0.9 ? 'Шикарно!' : pct >= 0.6 ? 'Отлично!' : pct >= 0.3 ? 'Хорошо!' : 'Попробуй ещё!';
  const trophy = pct >= 0.9 ? '🏆' : pct >= 0.6 ? '🥇' : pct >= 0.3 ? '🎖️' : '💪';
  const mascotMood = pct >= 0.6 ? 'cheer' : 'happy';
  const acc = topicAccent(topic.id.split('_').slice(1, 2).join('_') || topic.id);

  root.innerHTML = `
    <section class="ke-page">
      ${auroraHTML()}
      ${starfieldHTML(50)}
      ${topBarHTML({ backHref: classHome })}
      <div class="ke-result">
        <div class="ke-result__trophy-wrap">
          <div class="ke-result__glow" style="background: radial-gradient(circle, ${acc.glow}, transparent 70%);"></div>
          <div class="ke-result__mascot">${mascotSVG({ size: 140, mood: mascotMood })}</div>
          <div class="ke-result__trophy">${trophy}</div>
        </div>
        <h1 class="ke-result__mood">${mood}</h1>
        <p class="ke-result__subtext">Тема «${esc(topic.title)}» ${pct >= 0.5 ? 'пройдена' : 'почти пройдена'}</p>

        <div class="ke-result__score" style="box-shadow: 0 1px 0 rgba(255,255,255,0.08) inset, 0 -3px 0 rgba(0,0,0,0.2) inset, 0 20px 40px -8px rgba(0,0,0,0.4), 0 0 60px -10px ${acc.glow};">
          <div class="ke-result__digits">${score}<span class="ke-result__digits-total"> / ${total}</span></div>
          <div class="ke-result__caption">правильных ответов</div>

          <div class="ke-result__stars">
            ${[0, 1, 2].map(i => `
              <div class="${i < stars ? 'ke-star--on' : 'ke-star--off'}" style="animation-delay:${0.6 + i * 0.15}s">⭐</div>
            `).join('')}
          </div>

          <div class="ke-result__chips">
            <div class="ke-chip ke-chip--yellow"><span>⭐</span>+${score * 5} звёзд</div>
            ${pct >= 0.6 ? '<div class="ke-chip ke-chip--cyan"><span>🎯</span>Меткий стрелок</div>' : ''}
            ${pct === 1 ? '<div class="ke-chip ke-chip--pink"><span>💎</span>Идеально</div>' : ''}
          </div>
        </div>

        <div class="ke-result__actions">
          <a href="${classHome}" class="ke-btn ke-btn--primary">К темам <span style="font-size: 22px;">🏠</span></a>
          <button class="ke-btn ke-btn--ghost" id="ke-replay">🔄 Пройти ещё раз</button>
        </div>
      </div>
    </section>`;

  burstConfetti();
  setTimeout(burstConfetti, 400);

  document.getElementById('ke-replay').addEventListener('click', () => {
    sessionStorage.removeItem('ke_last_result');
    navigate(`/class/${encodeURIComponent(code)}/topic/${encodeURIComponent(topicId)}`, { replace: true });
  });
}
