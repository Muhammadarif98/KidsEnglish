// pages/course.js — A1→A2 Learning Course with methodology

import { auroraHTML, starfieldHTML, esc } from '../ui.js';
import { mascotSVG } from '../mascot.js';
import { navigate } from '../router.js';

// Структура курса A1→A2 с методологией
const COURSE_STRUCTURE = {
  levels: [
    {
      id: 'a1-starter',
      name: 'A1 Starter',
      subtitle: 'Первые шаги в английском',
      emoji: '🌱',
      color: '#22C55E',
      description: 'Учим самые базовые слова и фразы. Знакомимся с английскими звуками.',
      units: [
        {
          id: 'greetings',
          title: 'Приветствия',
          emoji: '👋',
          skills: ['Hello / Hi / Bye', 'What is your name?', 'My name is...'],
          methodology: 'TPR (Total Physical Response) — связываем слова с жестами'
        },
        {
          id: 'colors-basic',
          title: 'Цвета',
          emoji: '🎨',
          skills: ['Red, Blue, Green, Yellow', 'What color is it?', 'It is...'],
          methodology: 'Multisensory — показываем цветные карточки и предметы'
        },
        {
          id: 'numbers-1-10',
          title: 'Числа 1-10',
          emoji: '🔢',
          skills: ['One, Two, Three...', 'How many?', 'Counting objects'],
          methodology: 'Play-based — считаем игрушки, пальцы, предметы'
        },
        {
          id: 'animals-pets',
          title: 'Домашние животные',
          emoji: '🐶',
          skills: ['Dog, Cat, Fish, Bird', 'I have a...', 'Animal sounds'],
          methodology: 'TPR — имитируем движения и звуки животных'
        },
        {
          id: 'family-basic',
          title: 'Моя семья',
          emoji: '👨‍👩‍👧',
          skills: ['Mom, Dad, Sister, Brother', 'This is my...', 'Family members'],
          methodology: 'Personalization — говорим о своей семье'
        }
      ]
    },
    {
      id: 'a1-elementary',
      name: 'A1 Elementary',
      subtitle: 'Расширяем словарный запас',
      emoji: '🌿',
      color: '#3B82F6',
      description: 'Больше слов, простые предложения, базовые вопросы.',
      units: [
        {
          id: 'food-fruits',
          title: 'Фрукты и еда',
          emoji: '🍎',
          skills: ['Apple, Banana, Orange', 'I like / I don\'t like', 'Do you like...?'],
          methodology: 'Task-based — составляем меню, играем в магазин'
        },
        {
          id: 'body-parts',
          title: 'Части тела',
          emoji: '👀',
          skills: ['Eyes, Ears, Nose, Mouth', 'Touch your...', 'Head, shoulders...'],
          methodology: 'TPR — песня "Head, Shoulders, Knees and Toes"'
        },
        {
          id: 'clothes',
          title: 'Одежда',
          emoji: '👕',
          skills: ['T-shirt, Pants, Dress', 'I\'m wearing...', 'Put on / Take off'],
          methodology: 'Role-play — одеваем куклу, описываем одежду'
        },
        {
          id: 'weather',
          title: 'Погода',
          emoji: '☀️',
          skills: ['Sunny, Rainy, Cloudy', 'How is the weather?', 'It is...'],
          methodology: 'Daily routine — каждый урок начинаем с погоды'
        },
        {
          id: 'days-week',
          title: 'Дни недели',
          emoji: '📅',
          skills: ['Monday, Tuesday...', 'What day is it?', 'Today is...'],
          methodology: 'Song-based — поём песню про дни недели'
        }
      ]
    },
    {
      id: 'a1-plus',
      name: 'A1+',
      subtitle: 'Строим предложения',
      emoji: '🌳',
      color: '#8B5CF6',
      description: 'Составляем полные предложения, учим глаголы, описываем действия.',
      units: [
        {
          id: 'actions-verbs',
          title: 'Глаголы действия',
          emoji: '🏃',
          skills: ['Run, Jump, Swim, Eat', 'I can / I can\'t', 'He/She is...ing'],
          methodology: 'TPR + Drama — показываем действия, угадываем'
        },
        {
          id: 'house-rooms',
          title: 'Дом и комнаты',
          emoji: '🏠',
          skills: ['Kitchen, Bedroom, Bathroom', 'Where is...?', 'In/On/Under'],
          methodology: 'Project-based — рисуем свой дом и описываем'
        },
        {
          id: 'transport',
          title: 'Транспорт',
          emoji: '🚗',
          skills: ['Car, Bus, Bicycle, Plane', 'I go by...', 'How do you go?'],
          methodology: 'Storytelling — рассказываем о путешествии'
        },
        {
          id: 'professions',
          title: 'Профессии',
          emoji: '👨‍⚕️',
          skills: ['Doctor, Teacher, Pilot', 'What do you want to be?', 'He/She is a...'],
          methodology: 'Role-play — играем в разные профессии'
        },
        {
          id: 'emotions',
          title: 'Эмоции и чувства',
          emoji: '😀',
          skills: ['Happy, Sad, Angry, Tired', 'How are you?', 'I feel...'],
          methodology: 'Social-Emotional — обсуждаем чувства персонажей'
        }
      ]
    },
    {
      id: 'a2-beginner',
      name: 'A2 Beginner',
      subtitle: 'Общаемся на английском',
      emoji: '🌲',
      color: '#EC4899',
      description: 'Диалоги, рассказы, описания. Понимаем простые тексты.',
      units: [
        {
          id: 'daily-routine',
          title: 'Мой день',
          emoji: '⏰',
          skills: ['Wake up, Go to school', 'At 7 o\'clock...', 'Then/After that'],
          methodology: 'Communicative — описываем свой день партнёру'
        },
        {
          id: 'hobbies',
          title: 'Хобби',
          emoji: '⚽',
          skills: ['Play football, Read books', 'In my free time...', 'What do you like doing?'],
          methodology: 'Task-based — проводим опрос в классе'
        },
        {
          id: 'seasons-months',
          title: 'Времена года и месяцы',
          emoji: '🌸',
          skills: ['Spring, Summer, Fall, Winter', 'January, February...', 'My birthday is in...'],
          methodology: 'Calendar work — работаем с календарём каждый урок'
        },
        {
          id: 'shopping',
          title: 'В магазине',
          emoji: '🛒',
          skills: ['How much is it?', 'I\'d like...', 'Can I have...?'],
          methodology: 'Role-play — играем в магазин с настоящими диалогами'
        },
        {
          id: 'stories',
          title: 'Читаем истории',
          emoji: '📖',
          skills: ['Once upon a time...', 'Sequence words', 'Retelling stories'],
          methodology: 'Storytelling — читаем, обсуждаем, пересказываем'
        }
      ]
    }
  ],

  methodology: {
    title: 'Методология обучения',
    principles: [
      {
        name: 'TPR (Total Physical Response)',
        icon: '🏃',
        description: 'Связываем слова с движениями. Когда ребёнок слышит "jump" и прыгает — слово запоминается телом.',
        example: 'Говорим "Touch your nose" — ребёнок касается носа'
      },
      {
        name: 'Play-based Learning',
        icon: '🎮',
        description: 'Игра — главный способ обучения детей. Через игру обучение происходит естественно и без стресса.',
        example: 'Игра "Memory" с карточками слов'
      },
      {
        name: 'Multisensory Approach',
        icon: '👁️',
        description: 'Задействуем все каналы: зрение (картинки), слух (аудио), движение (жесты), осязание (карточки).',
        example: 'Смотрим картинку, слушаем слово, повторяем, показываем жест'
      },
      {
        name: 'Spaced Repetition',
        icon: '🔄',
        description: 'Повторяем материал через увеличивающиеся интервалы. Так информация переходит в долговременную память.',
        example: 'Новое слово: сегодня, завтра, через 3 дня, через неделю'
      },
      {
        name: 'Comprehensible Input',
        icon: '📚',
        description: 'Даём материал чуть выше текущего уровня (i+1). Понятно, но есть вызов.',
        example: 'Знаешь "cat" → учим "The cat is big"'
      },
      {
        name: 'Positive Reinforcement',
        icon: '⭐',
        description: 'Хвалим за попытки, а не только за правильные ответы. Создаём позитивный опыт.',
        example: 'Звёзды, значки, конфетти за каждый успех'
      }
    ]
  }
};

export async function renderCourse(classCode) {
  const root = document.getElementById('root');

  root.innerHTML = `
    <section class="ke-page ke-course">
      ${auroraHTML()}
      ${starfieldHTML(50)}

      <div class="ke-course__header">
        <a href="${classCode ? `/class/${esc(classCode)}` : '/'}" class="ke-back-btn">← Назад</a>
        <div class="ke-course__mascot">${mascotSVG({ size: 100, mood: 'happy' })}</div>
        <h1 class="ke-course__title">Курс <span class="ke-course__accent">A1 → A2</span></h1>
        <p class="ke-course__subtitle">Путь от нуля до свободного общения на базовые темы</p>
      </div>

      <div class="ke-course__nav">
        <button class="ke-course__nav-btn ke-course__nav-btn--active" data-tab="levels">📚 Уровни</button>
        <button class="ke-course__nav-btn" data-tab="methodology">🧠 Методология</button>
      </div>

      <div class="ke-course__content" id="ke-course-content">
        ${renderLevelsTab()}
      </div>
    </section>`;

  // Tab switching
  document.querySelectorAll('.ke-course__nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ke-course__nav-btn').forEach(b => b.classList.remove('ke-course__nav-btn--active'));
      btn.classList.add('ke-course__nav-btn--active');

      const tab = btn.dataset.tab;
      const content = document.getElementById('ke-course-content');
      content.innerHTML = tab === 'methodology' ? renderMethodologyTab() : renderLevelsTab();
    });
  });
}

function renderLevelsTab() {
  return `
    <div class="ke-levels">
      ${COURSE_STRUCTURE.levels.map(level => `
        <div class="ke-level" style="--level-color: ${level.color}">
          <div class="ke-level__header">
            <span class="ke-level__emoji">${level.emoji}</span>
            <div>
              <h2 class="ke-level__name">${esc(level.name)}</h2>
              <p class="ke-level__subtitle">${esc(level.subtitle)}</p>
            </div>
          </div>
          <p class="ke-level__description">${esc(level.description)}</p>

          <div class="ke-units">
            ${level.units.map(unit => `
              <div class="ke-unit">
                <div class="ke-unit__header">
                  <span class="ke-unit__emoji">${unit.emoji}</span>
                  <span class="ke-unit__title">${esc(unit.title)}</span>
                </div>
                <div class="ke-unit__skills">
                  ${unit.skills.map(s => `<span class="ke-unit__skill">${esc(s)}</span>`).join('')}
                </div>
                <div class="ke-unit__methodology">
                  <span class="ke-unit__method-label">💡 Метод:</span>
                  ${esc(unit.methodology)}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="ke-course__cta">
      <h3>Готов начать?</h3>
      <p>Выбери любую тему из списка тем своего класса и начни учиться!</p>
      <a href="/" class="ke-btn ke-btn--primary">🚀 Начать обучение</a>
    </div>
  `;
}

function renderMethodologyTab() {
  const m = COURSE_STRUCTURE.methodology;
  return `
    <div class="ke-methodology">
      <h2 class="ke-methodology__title">${esc(m.title)}</h2>
      <p class="ke-methodology__intro">
        Мы используем проверенные научные методы обучения детей иностранным языкам.
        Каждый метод подкреплён исследованиями и адаптирован для возраста 6-10 лет.
      </p>

      <div class="ke-principles">
        ${m.principles.map(p => `
          <div class="ke-principle">
            <div class="ke-principle__icon">${p.icon}</div>
            <div class="ke-principle__content">
              <h3 class="ke-principle__name">${esc(p.name)}</h3>
              <p class="ke-principle__description">${esc(p.description)}</p>
              <div class="ke-principle__example">
                <span class="ke-principle__example-label">Пример:</span>
                ${esc(p.example)}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="ke-methodology__tips">
        <h3>💡 Советы для родителей и учителей</h3>
        <ul>
          <li><strong>Регулярность важнее длительности</strong> — 15 минут каждый день лучше, чем час раз в неделю</li>
          <li><strong>Не исправляйте каждую ошибку</strong> — главное, чтобы ребёнок не боялся говорить</li>
          <li><strong>Хвалите попытки</strong> — "Отличная попытка!" работает лучше, чем "Неправильно"</li>
          <li><strong>Используйте контекст</strong> — учите слова в ситуациях: за столом, на прогулке, в игре</li>
          <li><strong>Повторяйте разнообразно</strong> — одно слово: карточка, песня, игра, рисунок</li>
        </ul>
      </div>
    </div>
  `;
}
