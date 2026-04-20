// seed.js — Starter content for local (demo) mode and first-time Firestore init.
//
// Соответствует разделу 3.1 ТЗ: 8 базовых тем и 6–8 заданий в каждой,
// поровну типа A (выбор перевода) и типа B (вставить слово).

export const SEED_TOPICS = [
  { id: 'animals',  title: 'Животные', emoji: '🐶', order: 1, enabled: true },
  { id: 'colors',   title: 'Цвета',    emoji: '🎨', order: 2, enabled: true },
  { id: 'family',   title: 'Семья',    emoji: '👨‍👩‍👧', order: 3, enabled: true },
  { id: 'numbers',  title: 'Цифры',    emoji: '🔢', order: 4, enabled: true },
  { id: 'food',     title: 'Еда',      emoji: '🍎', order: 5, enabled: true },
  { id: 'toys',     title: 'Игрушки',  emoji: '🧸', order: 6, enabled: true },
  { id: 'body',     title: 'Тело',     emoji: '👀', order: 7, enabled: true },
  { id: 'school',   title: 'Школа',    emoji: '📚', order: 8, enabled: true },
];

// Exercises — topicId is the FK to SEED_TOPICS[].id.
// type: 'A' → question = English word, options = 4 russian translations, answer = index 0..3.
// type: 'B' → question = sentence with "___" placeholder, options = 4 english words, answer = index 0..3.
export const SEED_EXERCISES = [
  // ── animals ──
  { id: 'animals_01', topicId: 'animals', type: 'A', order: 1, question: 'Dog',    options: ['Кот', 'Собака', 'Птица', 'Рыба'],          answer: 1, explanation: 'Dog — это собака 🐶', imageUrl: '' },
  { id: 'animals_02', topicId: 'animals', type: 'A', order: 2, question: 'Cat',    options: ['Мышь', 'Лиса', 'Кот', 'Волк'],             answer: 2, explanation: 'Cat — это кот 🐱', imageUrl: '' },
  { id: 'animals_03', topicId: 'animals', type: 'B', order: 3, question: 'The ___ says woof!', options: ['cat', 'dog', 'fish', 'bird'], answer: 1, explanation: 'Собаки говорят «гав-гав» 🐶', imageUrl: '' },
  { id: 'animals_04', topicId: 'animals', type: 'A', order: 4, question: 'Bird',   options: ['Птица', 'Рыба', 'Заяц', 'Змея'],           answer: 0, explanation: 'Bird — это птица 🐦', imageUrl: '' },
  { id: 'animals_05', topicId: 'animals', type: 'A', order: 5, question: 'Fish',   options: ['Лягушка', 'Краб', 'Кит', 'Рыба'],          answer: 3, explanation: 'Fish — это рыба 🐟', imageUrl: '' },
  { id: 'animals_06', topicId: 'animals', type: 'B', order: 6, question: 'A ___ lives in water.', options: ['dog', 'cat', 'fish', 'bird'], answer: 2, explanation: 'Рыба живёт в воде 🐟', imageUrl: '' },
  { id: 'animals_07', topicId: 'animals', type: 'A', order: 7, question: 'Horse',  options: ['Корова', 'Лошадь', 'Свинья', 'Овца'],      answer: 1, explanation: 'Horse — это лошадь 🐴', imageUrl: '' },
  { id: 'animals_08', topicId: 'animals', type: 'A', order: 8, question: 'Rabbit', options: ['Кролик', 'Мышь', 'Белка', 'Ёж'],           answer: 0, explanation: 'Rabbit — это кролик 🐰', imageUrl: '' },

  // ── colors ──
  { id: 'colors_01', topicId: 'colors', type: 'A', order: 1, question: 'Red',    options: ['Синий', 'Зелёный', 'Красный', 'Жёлтый'],    answer: 2, explanation: 'Red — это красный ❤️', imageUrl: '' },
  { id: 'colors_02', topicId: 'colors', type: 'A', order: 2, question: 'Blue',   options: ['Синий', 'Чёрный', 'Белый', 'Серый'],        answer: 0, explanation: 'Blue — это синий 💙', imageUrl: '' },
  { id: 'colors_03', topicId: 'colors', type: 'A', order: 3, question: 'Green',  options: ['Розовый', 'Зелёный', 'Оранжевый', 'Жёлтый'], answer: 1, explanation: 'Green — это зелёный 💚', imageUrl: '' },
  { id: 'colors_04', topicId: 'colors', type: 'B', order: 4, question: 'The sun is ___.', options: ['blue', 'green', 'yellow', 'black'], answer: 2, explanation: 'Солнце жёлтое ☀️', imageUrl: '' },
  { id: 'colors_05', topicId: 'colors', type: 'A', order: 5, question: 'Yellow', options: ['Фиолетовый', 'Жёлтый', 'Белый', 'Коричневый'], answer: 1, explanation: 'Yellow — это жёлтый 💛', imageUrl: '' },
  { id: 'colors_06', topicId: 'colors', type: 'B', order: 6, question: 'Grass is ___.', options: ['red', 'blue', 'green', 'black'],       answer: 2, explanation: 'Трава зелёная 🌿', imageUrl: '' },

  // ── family ──
  { id: 'family_01', topicId: 'family', type: 'A', order: 1, question: 'Mom',     options: ['Папа', 'Мама', 'Сестра', 'Брат'],          answer: 1, explanation: 'Mom — это мама ❤️', imageUrl: '' },
  { id: 'family_02', topicId: 'family', type: 'A', order: 2, question: 'Dad',     options: ['Дедушка', 'Дядя', 'Папа', 'Брат'],         answer: 2, explanation: 'Dad — это папа 👨', imageUrl: '' },
  { id: 'family_03', topicId: 'family', type: 'A', order: 3, question: 'Sister',  options: ['Сестра', 'Подруга', 'Тётя', 'Мама'],       answer: 0, explanation: 'Sister — это сестра 👧', imageUrl: '' },
  { id: 'family_04', topicId: 'family', type: 'A', order: 4, question: 'Brother', options: ['Друг', 'Дядя', 'Брат', 'Сын'],             answer: 2, explanation: 'Brother — это брат 👦', imageUrl: '' },
  { id: 'family_05', topicId: 'family', type: 'B', order: 5, question: 'My ___ is the best cook.', options: ['dad', 'mom', 'dog', 'cat'], answer: 1, explanation: 'Мама — лучший повар 🍲', imageUrl: '' },
  { id: 'family_06', topicId: 'family', type: 'A', order: 6, question: 'Grandma', options: ['Мама', 'Бабушка', 'Дедушка', 'Тётя'],      answer: 1, explanation: 'Grandma — это бабушка 👵', imageUrl: '' },
  { id: 'family_07', topicId: 'family', type: 'A', order: 7, question: 'Grandpa', options: ['Папа', 'Дедушка', 'Брат', 'Сын'],          answer: 1, explanation: 'Grandpa — это дедушка 👴', imageUrl: '' },

  // ── numbers ──
  { id: 'numbers_01', topicId: 'numbers', type: 'A', order: 1, question: 'One',   options: ['Два', 'Три', 'Один', 'Четыре'],            answer: 2, explanation: 'One — один 1️⃣', imageUrl: '' },
  { id: 'numbers_02', topicId: 'numbers', type: 'A', order: 2, question: 'Two',   options: ['Два', 'Пять', 'Семь', 'Девять'],           answer: 0, explanation: 'Two — два 2️⃣', imageUrl: '' },
  { id: 'numbers_03', topicId: 'numbers', type: 'A', order: 3, question: 'Three', options: ['Один', 'Четыре', 'Шесть', 'Три'],          answer: 3, explanation: 'Three — три 3️⃣', imageUrl: '' },
  { id: 'numbers_04', topicId: 'numbers', type: 'A', order: 4, question: 'Five',  options: ['Пять', 'Восемь', 'Десять', 'Два'],         answer: 0, explanation: 'Five — пять 5️⃣', imageUrl: '' },
  { id: 'numbers_05', topicId: 'numbers', type: 'B', order: 5, question: 'I have ___ apples.', options: ['one', 'two', 'three', 'four'], answer: 1, explanation: 'Two — означает «два» 2️⃣', imageUrl: '' },
  { id: 'numbers_06', topicId: 'numbers', type: 'A', order: 6, question: 'Ten',   options: ['Один', 'Пять', 'Семь', 'Десять'],          answer: 3, explanation: 'Ten — десять 🔟', imageUrl: '' },

  // ── food ──
  { id: 'food_01', topicId: 'food', type: 'A', order: 1, question: 'Apple',  options: ['Банан', 'Яблоко', 'Груша', 'Слива'],            answer: 1, explanation: 'Apple — это яблоко 🍎', imageUrl: '' },
  { id: 'food_02', topicId: 'food', type: 'A', order: 2, question: 'Bread',  options: ['Сыр', 'Молоко', 'Хлеб', 'Масло'],               answer: 2, explanation: 'Bread — это хлеб 🍞', imageUrl: '' },
  { id: 'food_03', topicId: 'food', type: 'A', order: 3, question: 'Milk',   options: ['Сок', 'Молоко', 'Вода', 'Чай'],                 answer: 1, explanation: 'Milk — это молоко 🥛', imageUrl: '' },
  { id: 'food_04', topicId: 'food', type: 'A', order: 4, question: 'Cake',   options: ['Конфета', 'Торт', 'Печенье', 'Мороженое'],       answer: 1, explanation: 'Cake — это торт 🎂', imageUrl: '' },
  { id: 'food_05', topicId: 'food', type: 'B', order: 5, question: 'I drink ___ every morning.', options: ['bread', 'milk', 'cake', 'fish'], answer: 1, explanation: 'По утрам пьют молоко 🥛', imageUrl: '' },
  { id: 'food_06', topicId: 'food', type: 'A', order: 6, question: 'Banana', options: ['Банан', 'Виноград', 'Апельсин', 'Лимон'],       answer: 0, explanation: 'Banana — это банан 🍌', imageUrl: '' },
  { id: 'food_07', topicId: 'food', type: 'B', order: 7, question: 'An ___ a day keeps the doctor away.', options: ['apple', 'cake', 'milk', 'fish'], answer: 0, explanation: 'Известная поговорка про яблоко 🍎', imageUrl: '' },
  { id: 'food_08', topicId: 'food', type: 'A', order: 8, question: 'Egg',    options: ['Яйцо', 'Рыба', 'Сыр', 'Йогурт'],                answer: 0, explanation: 'Egg — это яйцо 🥚', imageUrl: '' },

  // ── toys ──
  { id: 'toys_01', topicId: 'toys', type: 'A', order: 1, question: 'Ball',   options: ['Кукла', 'Мяч', 'Машинка', 'Робот'],             answer: 1, explanation: 'Ball — это мяч ⚽', imageUrl: '' },
  { id: 'toys_02', topicId: 'toys', type: 'A', order: 2, question: 'Doll',   options: ['Кукла', 'Медвежонок', 'Книга', 'Мяч'],          answer: 0, explanation: 'Doll — это кукла 👸', imageUrl: '' },
  { id: 'toys_03', topicId: 'toys', type: 'A', order: 3, question: 'Car',    options: ['Поезд', 'Самолёт', 'Машина', 'Корабль'],        answer: 2, explanation: 'Car — это машина 🚗', imageUrl: '' },
  { id: 'toys_04', topicId: 'toys', type: 'A', order: 4, question: 'Robot',  options: ['Мяч', 'Динозавр', 'Робот', 'Кукла'],            answer: 2, explanation: 'Robot — это робот 🤖', imageUrl: '' },
  { id: 'toys_05', topicId: 'toys', type: 'B', order: 5, question: 'Kick the ___ to score a goal!', options: ['doll', 'ball', 'car', 'book'], answer: 1, explanation: 'В футбол играют мячом ⚽', imageUrl: '' },
  { id: 'toys_06', topicId: 'toys', type: 'A', order: 6, question: 'Bear',   options: ['Медведь', 'Лев', 'Тигр', 'Слон'],               answer: 0, explanation: 'Bear (toy) — плюшевый мишка 🧸', imageUrl: '' },

  // ── body ──
  { id: 'body_01', topicId: 'body', type: 'A', order: 1, question: 'Eye',   options: ['Ухо', 'Нос', 'Глаз', 'Рот'],                    answer: 2, explanation: 'Eye — это глаз 👁', imageUrl: '' },
  { id: 'body_02', topicId: 'body', type: 'A', order: 2, question: 'Hand',  options: ['Нога', 'Рука', 'Голова', 'Плечо'],              answer: 1, explanation: 'Hand — это рука ✋', imageUrl: '' },
  { id: 'body_03', topicId: 'body', type: 'A', order: 3, question: 'Leg',   options: ['Рука', 'Шея', 'Нога', 'Спина'],                 answer: 2, explanation: 'Leg — это нога 🦵', imageUrl: '' },
  { id: 'body_04', topicId: 'body', type: 'A', order: 4, question: 'Nose',  options: ['Глаз', 'Нос', 'Губа', 'Зуб'],                   answer: 1, explanation: 'Nose — это нос 👃', imageUrl: '' },
  { id: 'body_05', topicId: 'body', type: 'B', order: 5, question: 'I see with my ___.', options: ['hand', 'leg', 'eye', 'nose'],       answer: 2, explanation: 'Видим глазами 👁', imageUrl: '' },
  { id: 'body_06', topicId: 'body', type: 'A', order: 6, question: 'Ear',   options: ['Ухо', 'Рот', 'Глаз', 'Рука'],                   answer: 0, explanation: 'Ear — это ухо 👂', imageUrl: '' },
  { id: 'body_07', topicId: 'body', type: 'A', order: 7, question: 'Mouth', options: ['Зуб', 'Губа', 'Рот', 'Нос'],                    answer: 2, explanation: 'Mouth — это рот 👄', imageUrl: '' },

  // ── school ──
  { id: 'school_01', topicId: 'school', type: 'A', order: 1, question: 'Book',    options: ['Тетрадь', 'Книга', 'Ручка', 'Сумка'],      answer: 1, explanation: 'Book — это книга 📘', imageUrl: '' },
  { id: 'school_02', topicId: 'school', type: 'A', order: 2, question: 'Pen',     options: ['Ручка', 'Карандаш', 'Ластик', 'Линейка'],  answer: 0, explanation: 'Pen — это ручка 🖊️', imageUrl: '' },
  { id: 'school_03', topicId: 'school', type: 'A', order: 3, question: 'Desk',    options: ['Стул', 'Парта', 'Доска', 'Окно'],          answer: 1, explanation: 'Desk — это парта 📚', imageUrl: '' },
  { id: 'school_04', topicId: 'school', type: 'A', order: 4, question: 'Bag',     options: ['Коробка', 'Папка', 'Сумка/рюкзак', 'Стол'], answer: 2, explanation: 'Bag — сумка или рюкзак 🎒', imageUrl: '' },
  { id: 'school_05', topicId: 'school', type: 'B', order: 5, question: 'I read a ___ every night.', options: ['bag', 'pen', 'book', 'desk'], answer: 2, explanation: 'Каждый вечер читают книгу 📖', imageUrl: '' },
  { id: 'school_06', topicId: 'school', type: 'A', order: 6, question: 'Pencil',  options: ['Ручка', 'Карандаш', 'Мел', 'Кисть'],       answer: 1, explanation: 'Pencil — это карандаш ✏️', imageUrl: '' },
  { id: 'school_07', topicId: 'school', type: 'B', order: 7, question: 'Put your books in your ___.', options: ['pen', 'desk', 'bag', 'chair'], answer: 2, explanation: 'Книги кладут в рюкзак 🎒', imageUrl: '' },
  { id: 'school_08', topicId: 'school', type: 'A', order: 8, question: 'Teacher', options: ['Доктор', 'Ученик', 'Учитель', 'Родитель'], answer: 2, explanation: 'Teacher — это учитель 🧑‍🏫', imageUrl: '' },
];
