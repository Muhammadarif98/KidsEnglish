// seed.js — Расширенный контент для KidsEnglish
// 24 темы, 250+ упражнений для детей 6-10 лет

export const SEED_TOPICS = [
  // Базовые темы
  { id: 'animals',      title: 'Животные',       emoji: '🐶', order: 1,  enabled: true },
  { id: 'animals_wild', title: 'Дикие животные', emoji: '🦁', order: 2,  enabled: true },
  { id: 'animals_sea',  title: 'Морские животные', emoji: '🐬', order: 3,  enabled: true },
  { id: 'colors',       title: 'Цвета',          emoji: '🎨', order: 4,  enabled: true },
  { id: 'family',       title: 'Семья',          emoji: '👨‍👩‍👧', order: 5,  enabled: true },
  { id: 'numbers',      title: 'Цифры 1-10',     emoji: '🔢', order: 6,  enabled: true },
  { id: 'numbers2',     title: 'Цифры 11-20',    emoji: '🔟', order: 7,  enabled: true },
  { id: 'food_fruits',  title: 'Фрукты',         emoji: '🍎', order: 8,  enabled: true },
  { id: 'food_vegs',    title: 'Овощи',          emoji: '🥕', order: 9,  enabled: true },
  { id: 'food_drinks',  title: 'Напитки',        emoji: '🥤', order: 10, enabled: true },
  { id: 'toys',         title: 'Игрушки',        emoji: '🧸', order: 11, enabled: true },
  { id: 'body',         title: 'Тело',           emoji: '👀', order: 12, enabled: true },
  { id: 'body_face',    title: 'Лицо',           emoji: '😊', order: 13, enabled: true },
  { id: 'school',       title: 'Школа',          emoji: '📚', order: 14, enabled: true },
  { id: 'clothes',      title: 'Одежда',         emoji: '👕', order: 15, enabled: true },
  { id: 'weather',      title: 'Погода',         emoji: '☀️', order: 16, enabled: true },
  { id: 'house',        title: 'Дом',            emoji: '🏠', order: 17, enabled: true },
  { id: 'furniture',    title: 'Мебель',         emoji: '🛋️', order: 18, enabled: true },
  { id: 'transport',    title: 'Транспорт',      emoji: '🚗', order: 19, enabled: true },
  { id: 'professions',  title: 'Профессии',      emoji: '👨‍⚕️', order: 20, enabled: true },
  { id: 'actions',      title: 'Действия',       emoji: '🏃', order: 21, enabled: true },
  { id: 'days',         title: 'Дни недели',     emoji: '📅', order: 22, enabled: true },
  { id: 'seasons',      title: 'Времена года',   emoji: '🌸', order: 23, enabled: true },
  { id: 'emotions',     title: 'Эмоции',         emoji: '😀', order: 24, enabled: true },
];

export const SEED_EXERCISES = [
  // ══════════════════════════════════════════════════════════════
  // ANIMALS (Домашние животные)
  // ══════════════════════════════════════════════════════════════
  { id: 'animals_01', topicId: 'animals', type: 'A', order: 1, question: 'Dog', options: ['Кот', 'Собака', 'Птица', 'Рыба'], answer: 1, explanation: 'Dog — это собака 🐶', imageUrl: '' },
  { id: 'animals_02', topicId: 'animals', type: 'A', order: 2, question: 'Cat', options: ['Мышь', 'Лиса', 'Кот', 'Волк'], answer: 2, explanation: 'Cat — это кот 🐱', imageUrl: '' },
  { id: 'animals_03', topicId: 'animals', type: 'A', order: 3, question: 'Bird', options: ['Птица', 'Рыба', 'Заяц', 'Змея'], answer: 0, explanation: 'Bird — это птица 🐦', imageUrl: '' },
  { id: 'animals_04', topicId: 'animals', type: 'A', order: 4, question: 'Fish', options: ['Лягушка', 'Краб', 'Кит', 'Рыба'], answer: 3, explanation: 'Fish — это рыба 🐟', imageUrl: '' },
  { id: 'animals_05', topicId: 'animals', type: 'A', order: 5, question: 'Horse', options: ['Корова', 'Лошадь', 'Свинья', 'Овца'], answer: 1, explanation: 'Horse — это лошадь 🐴', imageUrl: '' },
  { id: 'animals_06', topicId: 'animals', type: 'A', order: 6, question: 'Cow', options: ['Коза', 'Овца', 'Корова', 'Свинья'], answer: 2, explanation: 'Cow — это корова 🐄', imageUrl: '' },
  { id: 'animals_07', topicId: 'animals', type: 'A', order: 7, question: 'Pig', options: ['Свинья', 'Курица', 'Утка', 'Гусь'], answer: 0, explanation: 'Pig — это свинья 🐷', imageUrl: '' },
  { id: 'animals_08', topicId: 'animals', type: 'A', order: 8, question: 'Rabbit', options: ['Кролик', 'Мышь', 'Белка', 'Ёж'], answer: 0, explanation: 'Rabbit — это кролик 🐰', imageUrl: '' },
  { id: 'animals_09', topicId: 'animals', type: 'A', order: 9, question: 'Duck', options: ['Гусь', 'Курица', 'Утка', 'Индейка'], answer: 2, explanation: 'Duck — это утка 🦆', imageUrl: '' },
  { id: 'animals_10', topicId: 'animals', type: 'A', order: 10, question: 'Chicken', options: ['Петух', 'Курица', 'Утка', 'Гусь'], answer: 1, explanation: 'Chicken — это курица 🐔', imageUrl: '' },
  { id: 'animals_11', topicId: 'animals', type: 'B', order: 11, question: 'The ___ says woof!', options: ['cat', 'dog', 'fish', 'bird'], answer: 1, explanation: 'Собаки говорят «гав-гав» 🐶', imageUrl: '' },
  { id: 'animals_12', topicId: 'animals', type: 'B', order: 12, question: 'A ___ lives in water.', options: ['dog', 'cat', 'fish', 'bird'], answer: 2, explanation: 'Рыба живёт в воде 🐟', imageUrl: '' },
  { id: 'animals_13', topicId: 'animals', type: 'B', order: 13, question: 'The ___ gives us milk.', options: ['pig', 'cow', 'horse', 'dog'], answer: 1, explanation: 'Корова даёт молоко 🐄', imageUrl: '' },
  { id: 'animals_14', topicId: 'animals', type: 'B', order: 14, question: 'A ___ can fly.', options: ['fish', 'dog', 'bird', 'cat'], answer: 2, explanation: 'Птица умеет летать 🐦', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // ANIMALS_WILD (Дикие животные)
  // ══════════════════════════════════════════════════════════════
  { id: 'wild_01', topicId: 'animals_wild', type: 'A', order: 1, question: 'Lion', options: ['Тигр', 'Лев', 'Медведь', 'Волк'], answer: 1, explanation: 'Lion — это лев 🦁', imageUrl: '' },
  { id: 'wild_02', topicId: 'animals_wild', type: 'A', order: 2, question: 'Tiger', options: ['Лев', 'Леопард', 'Тигр', 'Пантера'], answer: 2, explanation: 'Tiger — это тигр 🐯', imageUrl: '' },
  { id: 'wild_03', topicId: 'animals_wild', type: 'A', order: 3, question: 'Bear', options: ['Медведь', 'Волк', 'Лиса', 'Олень'], answer: 0, explanation: 'Bear — это медведь 🐻', imageUrl: '' },
  { id: 'wild_04', topicId: 'animals_wild', type: 'A', order: 4, question: 'Wolf', options: ['Лиса', 'Заяц', 'Волк', 'Олень'], answer: 2, explanation: 'Wolf — это волк 🐺', imageUrl: '' },
  { id: 'wild_05', topicId: 'animals_wild', type: 'A', order: 5, question: 'Fox', options: ['Волк', 'Лиса', 'Заяц', 'Белка'], answer: 1, explanation: 'Fox — это лиса 🦊', imageUrl: '' },
  { id: 'wild_06', topicId: 'animals_wild', type: 'A', order: 6, question: 'Elephant', options: ['Жираф', 'Бегемот', 'Слон', 'Носорог'], answer: 2, explanation: 'Elephant — это слон 🐘', imageUrl: '' },
  { id: 'wild_07', topicId: 'animals_wild', type: 'A', order: 7, question: 'Giraffe', options: ['Зебра', 'Жираф', 'Верблюд', 'Страус'], answer: 1, explanation: 'Giraffe — это жираф 🦒', imageUrl: '' },
  { id: 'wild_08', topicId: 'animals_wild', type: 'A', order: 8, question: 'Monkey', options: ['Обезьяна', 'Горилла', 'Лемур', 'Панда'], answer: 0, explanation: 'Monkey — это обезьяна 🐒', imageUrl: '' },
  { id: 'wild_09', topicId: 'animals_wild', type: 'A', order: 9, question: 'Zebra', options: ['Лошадь', 'Осёл', 'Зебра', 'Антилопа'], answer: 2, explanation: 'Zebra — это зебра 🦓', imageUrl: '' },
  { id: 'wild_10', topicId: 'animals_wild', type: 'A', order: 10, question: 'Snake', options: ['Ящерица', 'Крокодил', 'Черепаха', 'Змея'], answer: 3, explanation: 'Snake — это змея 🐍', imageUrl: '' },
  { id: 'wild_11', topicId: 'animals_wild', type: 'B', order: 11, question: 'The ___ is the king of animals.', options: ['tiger', 'bear', 'lion', 'wolf'], answer: 2, explanation: 'Льва называют царём зверей 🦁', imageUrl: '' },
  { id: 'wild_12', topicId: 'animals_wild', type: 'B', order: 12, question: 'A ___ has a very long neck.', options: ['elephant', 'giraffe', 'monkey', 'bear'], answer: 1, explanation: 'У жирафа очень длинная шея 🦒', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // ANIMALS_SEA (Морские животные)
  // ══════════════════════════════════════════════════════════════
  { id: 'sea_01', topicId: 'animals_sea', type: 'A', order: 1, question: 'Dolphin', options: ['Кит', 'Дельфин', 'Акула', 'Тюлень'], answer: 1, explanation: 'Dolphin — это дельфин 🐬', imageUrl: '' },
  { id: 'sea_02', topicId: 'animals_sea', type: 'A', order: 2, question: 'Whale', options: ['Кит', 'Дельфин', 'Акула', 'Осьминог'], answer: 0, explanation: 'Whale — это кит 🐋', imageUrl: '' },
  { id: 'sea_03', topicId: 'animals_sea', type: 'A', order: 3, question: 'Shark', options: ['Скат', 'Акула', 'Кит', 'Морж'], answer: 1, explanation: 'Shark — это акула 🦈', imageUrl: '' },
  { id: 'sea_04', topicId: 'animals_sea', type: 'A', order: 4, question: 'Octopus', options: ['Краб', 'Медуза', 'Осьминог', 'Креветка'], answer: 2, explanation: 'Octopus — это осьминог 🐙', imageUrl: '' },
  { id: 'sea_05', topicId: 'animals_sea', type: 'A', order: 5, question: 'Crab', options: ['Краб', 'Омар', 'Креветка', 'Устрица'], answer: 0, explanation: 'Crab — это краб 🦀', imageUrl: '' },
  { id: 'sea_06', topicId: 'animals_sea', type: 'A', order: 6, question: 'Jellyfish', options: ['Морская звезда', 'Медуза', 'Коралл', 'Морской ёж'], answer: 1, explanation: 'Jellyfish — это медуза 🪼', imageUrl: '' },
  { id: 'sea_07', topicId: 'animals_sea', type: 'A', order: 7, question: 'Turtle', options: ['Черепаха', 'Крокодил', 'Лягушка', 'Ящерица'], answer: 0, explanation: 'Turtle — это черепаха 🐢', imageUrl: '' },
  { id: 'sea_08', topicId: 'animals_sea', type: 'A', order: 8, question: 'Starfish', options: ['Медуза', 'Морской конёк', 'Морская звезда', 'Морской ёж'], answer: 2, explanation: 'Starfish — это морская звезда ⭐', imageUrl: '' },
  { id: 'sea_09', topicId: 'animals_sea', type: 'B', order: 9, question: 'A ___ is very smart and friendly.', options: ['shark', 'dolphin', 'crab', 'jellyfish'], answer: 1, explanation: 'Дельфины очень умные и дружелюбные 🐬', imageUrl: '' },
  { id: 'sea_10', topicId: 'animals_sea', type: 'B', order: 10, question: 'The ___ has eight arms.', options: ['crab', 'starfish', 'octopus', 'whale'], answer: 2, explanation: 'У осьминога восемь щупалец 🐙', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // COLORS (Цвета)
  // ══════════════════════════════════════════════════════════════
  { id: 'colors_01', topicId: 'colors', type: 'A', order: 1, question: 'Red', options: ['Синий', 'Зелёный', 'Красный', 'Жёлтый'], answer: 2, explanation: 'Red — это красный ❤️', imageUrl: '' },
  { id: 'colors_02', topicId: 'colors', type: 'A', order: 2, question: 'Blue', options: ['Синий', 'Чёрный', 'Белый', 'Серый'], answer: 0, explanation: 'Blue — это синий 💙', imageUrl: '' },
  { id: 'colors_03', topicId: 'colors', type: 'A', order: 3, question: 'Green', options: ['Розовый', 'Зелёный', 'Оранжевый', 'Жёлтый'], answer: 1, explanation: 'Green — это зелёный 💚', imageUrl: '' },
  { id: 'colors_04', topicId: 'colors', type: 'A', order: 4, question: 'Yellow', options: ['Фиолетовый', 'Жёлтый', 'Белый', 'Коричневый'], answer: 1, explanation: 'Yellow — это жёлтый 💛', imageUrl: '' },
  { id: 'colors_05', topicId: 'colors', type: 'A', order: 5, question: 'Orange', options: ['Красный', 'Жёлтый', 'Оранжевый', 'Розовый'], answer: 2, explanation: 'Orange — это оранжевый 🧡', imageUrl: '' },
  { id: 'colors_06', topicId: 'colors', type: 'A', order: 6, question: 'Purple', options: ['Синий', 'Розовый', 'Фиолетовый', 'Голубой'], answer: 2, explanation: 'Purple — это фиолетовый 💜', imageUrl: '' },
  { id: 'colors_07', topicId: 'colors', type: 'A', order: 7, question: 'Pink', options: ['Розовый', 'Красный', 'Оранжевый', 'Фиолетовый'], answer: 0, explanation: 'Pink — это розовый 💗', imageUrl: '' },
  { id: 'colors_08', topicId: 'colors', type: 'A', order: 8, question: 'Black', options: ['Белый', 'Серый', 'Коричневый', 'Чёрный'], answer: 3, explanation: 'Black — это чёрный 🖤', imageUrl: '' },
  { id: 'colors_09', topicId: 'colors', type: 'A', order: 9, question: 'White', options: ['Серый', 'Белый', 'Бежевый', 'Голубой'], answer: 1, explanation: 'White — это белый 🤍', imageUrl: '' },
  { id: 'colors_10', topicId: 'colors', type: 'A', order: 10, question: 'Brown', options: ['Чёрный', 'Серый', 'Коричневый', 'Бежевый'], answer: 2, explanation: 'Brown — это коричневый 🤎', imageUrl: '' },
  { id: 'colors_11', topicId: 'colors', type: 'B', order: 11, question: 'The sun is ___.', options: ['blue', 'green', 'yellow', 'black'], answer: 2, explanation: 'Солнце жёлтое ☀️', imageUrl: '' },
  { id: 'colors_12', topicId: 'colors', type: 'B', order: 12, question: 'Grass is ___.', options: ['red', 'blue', 'green', 'black'], answer: 2, explanation: 'Трава зелёная 🌿', imageUrl: '' },
  { id: 'colors_13', topicId: 'colors', type: 'B', order: 13, question: 'The sky is ___.', options: ['green', 'blue', 'red', 'brown'], answer: 1, explanation: 'Небо голубое ☁️', imageUrl: '' },
  { id: 'colors_14', topicId: 'colors', type: 'B', order: 14, question: 'Snow is ___.', options: ['black', 'gray', 'white', 'blue'], answer: 2, explanation: 'Снег белый ❄️', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // FAMILY (Семья)
  // ══════════════════════════════════════════════════════════════
  { id: 'family_01', topicId: 'family', type: 'A', order: 1, question: 'Mother', options: ['Папа', 'Мама', 'Сестра', 'Брат'], answer: 1, explanation: 'Mother — это мама 👩', imageUrl: '' },
  { id: 'family_02', topicId: 'family', type: 'A', order: 2, question: 'Father', options: ['Дедушка', 'Дядя', 'Папа', 'Брат'], answer: 2, explanation: 'Father — это папа 👨', imageUrl: '' },
  { id: 'family_03', topicId: 'family', type: 'A', order: 3, question: 'Sister', options: ['Сестра', 'Подруга', 'Тётя', 'Мама'], answer: 0, explanation: 'Sister — это сестра 👧', imageUrl: '' },
  { id: 'family_04', topicId: 'family', type: 'A', order: 4, question: 'Brother', options: ['Друг', 'Дядя', 'Брат', 'Сын'], answer: 2, explanation: 'Brother — это брат 👦', imageUrl: '' },
  { id: 'family_05', topicId: 'family', type: 'A', order: 5, question: 'Grandmother', options: ['Мама', 'Бабушка', 'Дедушка', 'Тётя'], answer: 1, explanation: 'Grandmother — это бабушка 👵', imageUrl: '' },
  { id: 'family_06', topicId: 'family', type: 'A', order: 6, question: 'Grandfather', options: ['Папа', 'Дедушка', 'Брат', 'Дядя'], answer: 1, explanation: 'Grandfather — это дедушка 👴', imageUrl: '' },
  { id: 'family_07', topicId: 'family', type: 'A', order: 7, question: 'Uncle', options: ['Тётя', 'Дядя', 'Брат', 'Дедушка'], answer: 1, explanation: 'Uncle — это дядя 👨', imageUrl: '' },
  { id: 'family_08', topicId: 'family', type: 'A', order: 8, question: 'Aunt', options: ['Бабушка', 'Сестра', 'Тётя', 'Мама'], answer: 2, explanation: 'Aunt — это тётя 👩', imageUrl: '' },
  { id: 'family_09', topicId: 'family', type: 'A', order: 9, question: 'Son', options: ['Дочь', 'Сын', 'Брат', 'Племянник'], answer: 1, explanation: 'Son — это сын 👦', imageUrl: '' },
  { id: 'family_10', topicId: 'family', type: 'A', order: 10, question: 'Daughter', options: ['Сестра', 'Племянница', 'Дочь', 'Внучка'], answer: 2, explanation: 'Daughter — это дочь 👧', imageUrl: '' },
  { id: 'family_11', topicId: 'family', type: 'B', order: 11, question: 'My ___ cooks the best food.', options: ['brother', 'mother', 'dog', 'friend'], answer: 1, explanation: 'Мама готовит лучше всех 👩‍🍳', imageUrl: '' },
  { id: 'family_12', topicId: 'family', type: 'B', order: 12, question: 'My ___ and grandmother are very kind.', options: ['father', 'grandfather', 'sister', 'brother'], answer: 1, explanation: 'Дедушка и бабушка очень добрые 👴👵', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // NUMBERS 1-10
  // ══════════════════════════════════════════════════════════════
  { id: 'num_01', topicId: 'numbers', type: 'A', order: 1, question: 'One', options: ['Два', 'Три', 'Один', 'Четыре'], answer: 2, explanation: 'One — один 1️⃣', imageUrl: '' },
  { id: 'num_02', topicId: 'numbers', type: 'A', order: 2, question: 'Two', options: ['Два', 'Пять', 'Семь', 'Девять'], answer: 0, explanation: 'Two — два 2️⃣', imageUrl: '' },
  { id: 'num_03', topicId: 'numbers', type: 'A', order: 3, question: 'Three', options: ['Один', 'Четыре', 'Шесть', 'Три'], answer: 3, explanation: 'Three — три 3️⃣', imageUrl: '' },
  { id: 'num_04', topicId: 'numbers', type: 'A', order: 4, question: 'Four', options: ['Три', 'Четыре', 'Пять', 'Два'], answer: 1, explanation: 'Four — четыре 4️⃣', imageUrl: '' },
  { id: 'num_05', topicId: 'numbers', type: 'A', order: 5, question: 'Five', options: ['Пять', 'Восемь', 'Десять', 'Два'], answer: 0, explanation: 'Five — пять 5️⃣', imageUrl: '' },
  { id: 'num_06', topicId: 'numbers', type: 'A', order: 6, question: 'Six', options: ['Семь', 'Четыре', 'Шесть', 'Девять'], answer: 2, explanation: 'Six — шесть 6️⃣', imageUrl: '' },
  { id: 'num_07', topicId: 'numbers', type: 'A', order: 7, question: 'Seven', options: ['Пять', 'Шесть', 'Семь', 'Восемь'], answer: 2, explanation: 'Seven — семь 7️⃣', imageUrl: '' },
  { id: 'num_08', topicId: 'numbers', type: 'A', order: 8, question: 'Eight', options: ['Девять', 'Восемь', 'Семь', 'Десять'], answer: 1, explanation: 'Eight — восемь 8️⃣', imageUrl: '' },
  { id: 'num_09', topicId: 'numbers', type: 'A', order: 9, question: 'Nine', options: ['Восемь', 'Десять', 'Девять', 'Шесть'], answer: 2, explanation: 'Nine — девять 9️⃣', imageUrl: '' },
  { id: 'num_10', topicId: 'numbers', type: 'A', order: 10, question: 'Ten', options: ['Один', 'Пять', 'Семь', 'Десять'], answer: 3, explanation: 'Ten — десять 🔟', imageUrl: '' },
  { id: 'num_11', topicId: 'numbers', type: 'B', order: 11, question: 'I have ___ fingers on one hand.', options: ['three', 'four', 'five', 'six'], answer: 2, explanation: 'На одной руке пять пальцев ✋', imageUrl: '' },
  { id: 'num_12', topicId: 'numbers', type: 'B', order: 12, question: 'A cat has ___ legs.', options: ['two', 'three', 'four', 'five'], answer: 2, explanation: 'У кошки четыре лапы 🐱', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // NUMBERS 11-20
  // ══════════════════════════════════════════════════════════════
  { id: 'num2_01', topicId: 'numbers2', type: 'A', order: 1, question: 'Eleven', options: ['Десять', 'Одиннадцать', 'Двенадцать', 'Тринадцать'], answer: 1, explanation: 'Eleven — одиннадцать 11', imageUrl: '' },
  { id: 'num2_02', topicId: 'numbers2', type: 'A', order: 2, question: 'Twelve', options: ['Одиннадцать', 'Двенадцать', 'Тринадцать', 'Четырнадцать'], answer: 1, explanation: 'Twelve — двенадцать 12', imageUrl: '' },
  { id: 'num2_03', topicId: 'numbers2', type: 'A', order: 3, question: 'Thirteen', options: ['Двенадцать', 'Тринадцать', 'Четырнадцать', 'Пятнадцать'], answer: 1, explanation: 'Thirteen — тринадцать 13', imageUrl: '' },
  { id: 'num2_04', topicId: 'numbers2', type: 'A', order: 4, question: 'Fourteen', options: ['Тринадцать', 'Четырнадцать', 'Пятнадцать', 'Шестнадцать'], answer: 1, explanation: 'Fourteen — четырнадцать 14', imageUrl: '' },
  { id: 'num2_05', topicId: 'numbers2', type: 'A', order: 5, question: 'Fifteen', options: ['Четырнадцать', 'Пятнадцать', 'Шестнадцать', 'Семнадцать'], answer: 1, explanation: 'Fifteen — пятнадцать 15', imageUrl: '' },
  { id: 'num2_06', topicId: 'numbers2', type: 'A', order: 6, question: 'Sixteen', options: ['Пятнадцать', 'Шестнадцать', 'Семнадцать', 'Восемнадцать'], answer: 1, explanation: 'Sixteen — шестнадцать 16', imageUrl: '' },
  { id: 'num2_07', topicId: 'numbers2', type: 'A', order: 7, question: 'Seventeen', options: ['Шестнадцать', 'Семнадцать', 'Восемнадцать', 'Девятнадцать'], answer: 1, explanation: 'Seventeen — семнадцать 17', imageUrl: '' },
  { id: 'num2_08', topicId: 'numbers2', type: 'A', order: 8, question: 'Eighteen', options: ['Семнадцать', 'Восемнадцать', 'Девятнадцать', 'Двадцать'], answer: 1, explanation: 'Eighteen — восемнадцать 18', imageUrl: '' },
  { id: 'num2_09', topicId: 'numbers2', type: 'A', order: 9, question: 'Nineteen', options: ['Восемнадцать', 'Девятнадцать', 'Двадцать', 'Двадцать один'], answer: 1, explanation: 'Nineteen — девятнадцать 19', imageUrl: '' },
  { id: 'num2_10', topicId: 'numbers2', type: 'A', order: 10, question: 'Twenty', options: ['Восемнадцать', 'Девятнадцать', 'Двадцать', 'Тридцать'], answer: 2, explanation: 'Twenty — двадцать 20', imageUrl: '' },
  { id: 'num2_11', topicId: 'numbers2', type: 'B', order: 11, question: 'There are ___ months in a year.', options: ['ten', 'eleven', 'twelve', 'thirteen'], answer: 2, explanation: 'В году двенадцать месяцев 📅', imageUrl: '' },
  { id: 'num2_12', topicId: 'numbers2', type: 'B', order: 12, question: 'I am ___ years old.', options: ['fifteen', 'sixteen', 'eleven', 'twenty'], answer: 2, explanation: 'Мне одиннадцать лет (пример)', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // FOOD_FRUITS (Фрукты)
  // ══════════════════════════════════════════════════════════════
  { id: 'fruit_01', topicId: 'food_fruits', type: 'A', order: 1, question: 'Apple', options: ['Банан', 'Яблоко', 'Груша', 'Слива'], answer: 1, explanation: 'Apple — это яблоко 🍎', imageUrl: '' },
  { id: 'fruit_02', topicId: 'food_fruits', type: 'A', order: 2, question: 'Banana', options: ['Банан', 'Виноград', 'Апельсин', 'Лимон'], answer: 0, explanation: 'Banana — это банан 🍌', imageUrl: '' },
  { id: 'fruit_03', topicId: 'food_fruits', type: 'A', order: 3, question: 'Orange', options: ['Лимон', 'Мандарин', 'Апельсин', 'Грейпфрут'], answer: 2, explanation: 'Orange — это апельсин 🍊', imageUrl: '' },
  { id: 'fruit_04', topicId: 'food_fruits', type: 'A', order: 4, question: 'Grapes', options: ['Вишня', 'Виноград', 'Клубника', 'Малина'], answer: 1, explanation: 'Grapes — это виноград 🍇', imageUrl: '' },
  { id: 'fruit_05', topicId: 'food_fruits', type: 'A', order: 5, question: 'Strawberry', options: ['Малина', 'Черника', 'Клубника', 'Ежевика'], answer: 2, explanation: 'Strawberry — это клубника 🍓', imageUrl: '' },
  { id: 'fruit_06', topicId: 'food_fruits', type: 'A', order: 6, question: 'Watermelon', options: ['Дыня', 'Арбуз', 'Тыква', 'Ананас'], answer: 1, explanation: 'Watermelon — это арбуз 🍉', imageUrl: '' },
  { id: 'fruit_07', topicId: 'food_fruits', type: 'A', order: 7, question: 'Pear', options: ['Яблоко', 'Персик', 'Груша', 'Слива'], answer: 2, explanation: 'Pear — это груша 🍐', imageUrl: '' },
  { id: 'fruit_08', topicId: 'food_fruits', type: 'A', order: 8, question: 'Lemon', options: ['Апельсин', 'Лайм', 'Лимон', 'Мандарин'], answer: 2, explanation: 'Lemon — это лимон 🍋', imageUrl: '' },
  { id: 'fruit_09', topicId: 'food_fruits', type: 'A', order: 9, question: 'Peach', options: ['Абрикос', 'Персик', 'Нектарин', 'Слива'], answer: 1, explanation: 'Peach — это персик 🍑', imageUrl: '' },
  { id: 'fruit_10', topicId: 'food_fruits', type: 'A', order: 10, question: 'Cherry', options: ['Вишня', 'Клубника', 'Малина', 'Слива'], answer: 0, explanation: 'Cherry — это вишня 🍒', imageUrl: '' },
  { id: 'fruit_11', topicId: 'food_fruits', type: 'B', order: 11, question: 'An ___ a day keeps the doctor away.', options: ['banana', 'apple', 'orange', 'grape'], answer: 1, explanation: 'Известная поговорка про яблоко 🍎', imageUrl: '' },
  { id: 'fruit_12', topicId: 'food_fruits', type: 'B', order: 12, question: 'Monkeys love to eat ___.', options: ['apples', 'bananas', 'grapes', 'lemons'], answer: 1, explanation: 'Обезьяны любят бананы 🍌🐒', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // FOOD_VEGS (Овощи)
  // ══════════════════════════════════════════════════════════════
  { id: 'veg_01', topicId: 'food_vegs', type: 'A', order: 1, question: 'Carrot', options: ['Огурец', 'Морковь', 'Помидор', 'Картофель'], answer: 1, explanation: 'Carrot — это морковь 🥕', imageUrl: '' },
  { id: 'veg_02', topicId: 'food_vegs', type: 'A', order: 2, question: 'Tomato', options: ['Перец', 'Баклажан', 'Помидор', 'Лук'], answer: 2, explanation: 'Tomato — это помидор 🍅', imageUrl: '' },
  { id: 'veg_03', topicId: 'food_vegs', type: 'A', order: 3, question: 'Cucumber', options: ['Огурец', 'Кабачок', 'Перец', 'Горох'], answer: 0, explanation: 'Cucumber — это огурец 🥒', imageUrl: '' },
  { id: 'veg_04', topicId: 'food_vegs', type: 'A', order: 4, question: 'Potato', options: ['Морковь', 'Свёкла', 'Картофель', 'Репа'], answer: 2, explanation: 'Potato — это картофель 🥔', imageUrl: '' },
  { id: 'veg_05', topicId: 'food_vegs', type: 'A', order: 5, question: 'Onion', options: ['Чеснок', 'Лук', 'Редис', 'Капуста'], answer: 1, explanation: 'Onion — это лук 🧅', imageUrl: '' },
  { id: 'veg_06', topicId: 'food_vegs', type: 'A', order: 6, question: 'Cabbage', options: ['Салат', 'Капуста', 'Шпинат', 'Брокколи'], answer: 1, explanation: 'Cabbage — это капуста 🥬', imageUrl: '' },
  { id: 'veg_07', topicId: 'food_vegs', type: 'A', order: 7, question: 'Pepper', options: ['Помидор', 'Огурец', 'Перец', 'Баклажан'], answer: 2, explanation: 'Pepper — это перец 🫑', imageUrl: '' },
  { id: 'veg_08', topicId: 'food_vegs', type: 'A', order: 8, question: 'Corn', options: ['Горох', 'Фасоль', 'Кукуруза', 'Рис'], answer: 2, explanation: 'Corn — это кукуруза 🌽', imageUrl: '' },
  { id: 'veg_09', topicId: 'food_vegs', type: 'A', order: 9, question: 'Pumpkin', options: ['Арбуз', 'Дыня', 'Тыква', 'Кабачок'], answer: 2, explanation: 'Pumpkin — это тыква 🎃', imageUrl: '' },
  { id: 'veg_10', topicId: 'food_vegs', type: 'B', order: 10, question: 'Rabbits love to eat ___.', options: ['potatoes', 'carrots', 'onions', 'peppers'], answer: 1, explanation: 'Кролики любят морковку 🥕🐰', imageUrl: '' },
  { id: 'veg_11', topicId: 'food_vegs', type: 'B', order: 11, question: 'French fries are made from ___.', options: ['carrots', 'tomatoes', 'potatoes', 'corn'], answer: 2, explanation: 'Картошка фри из картофеля 🍟', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // FOOD_DRINKS (Напитки)
  // ══════════════════════════════════════════════════════════════
  { id: 'drink_01', topicId: 'food_drinks', type: 'A', order: 1, question: 'Water', options: ['Сок', 'Молоко', 'Вода', 'Чай'], answer: 2, explanation: 'Water — это вода 💧', imageUrl: '' },
  { id: 'drink_02', topicId: 'food_drinks', type: 'A', order: 2, question: 'Milk', options: ['Сок', 'Молоко', 'Вода', 'Кофе'], answer: 1, explanation: 'Milk — это молоко 🥛', imageUrl: '' },
  { id: 'drink_03', topicId: 'food_drinks', type: 'A', order: 3, question: 'Juice', options: ['Чай', 'Кофе', 'Сок', 'Компот'], answer: 2, explanation: 'Juice — это сок 🧃', imageUrl: '' },
  { id: 'drink_04', topicId: 'food_drinks', type: 'A', order: 4, question: 'Tea', options: ['Кофе', 'Чай', 'Какао', 'Молоко'], answer: 1, explanation: 'Tea — это чай 🍵', imageUrl: '' },
  { id: 'drink_05', topicId: 'food_drinks', type: 'A', order: 5, question: 'Coffee', options: ['Чай', 'Какао', 'Кофе', 'Сок'], answer: 2, explanation: 'Coffee — это кофе ☕', imageUrl: '' },
  { id: 'drink_06', topicId: 'food_drinks', type: 'A', order: 6, question: 'Lemonade', options: ['Лимонад', 'Компот', 'Морс', 'Кисель'], answer: 0, explanation: 'Lemonade — это лимонад 🍋', imageUrl: '' },
  { id: 'drink_07', topicId: 'food_drinks', type: 'A', order: 7, question: 'Hot chocolate', options: ['Чай', 'Кофе', 'Какао', 'Молоко'], answer: 2, explanation: 'Hot chocolate — это горячий шоколад/какао 🍫', imageUrl: '' },
  { id: 'drink_08', topicId: 'food_drinks', type: 'B', order: 8, question: 'I drink ___ every morning.', options: ['bread', 'milk', 'cake', 'fish'], answer: 1, explanation: 'По утрам пьют молоко 🥛', imageUrl: '' },
  { id: 'drink_09', topicId: 'food_drinks', type: 'B', order: 9, question: 'Fish live in ___.', options: ['milk', 'juice', 'water', 'tea'], answer: 2, explanation: 'Рыбы живут в воде 🐟💧', imageUrl: '' },
  { id: 'drink_10', topicId: 'food_drinks', type: 'B', order: 10, question: '___ is made from oranges.', options: ['Milk', 'Tea', 'Orange juice', 'Coffee'], answer: 2, explanation: 'Апельсиновый сок из апельсинов 🍊', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // TOYS (Игрушки)
  // ══════════════════════════════════════════════════════════════
  { id: 'toys_01', topicId: 'toys', type: 'A', order: 1, question: 'Ball', options: ['Кукла', 'Мяч', 'Машинка', 'Робот'], answer: 1, explanation: 'Ball — это мяч ⚽', imageUrl: '' },
  { id: 'toys_02', topicId: 'toys', type: 'A', order: 2, question: 'Doll', options: ['Кукла', 'Медвежонок', 'Книга', 'Мяч'], answer: 0, explanation: 'Doll — это кукла 👸', imageUrl: '' },
  { id: 'toys_03', topicId: 'toys', type: 'A', order: 3, question: 'Car', options: ['Поезд', 'Самолёт', 'Машина', 'Корабль'], answer: 2, explanation: 'Car — это машина 🚗', imageUrl: '' },
  { id: 'toys_04', topicId: 'toys', type: 'A', order: 4, question: 'Robot', options: ['Мяч', 'Динозавр', 'Робот', 'Кукла'], answer: 2, explanation: 'Robot — это робот 🤖', imageUrl: '' },
  { id: 'toys_05', topicId: 'toys', type: 'A', order: 5, question: 'Teddy bear', options: ['Кукла', 'Плюшевый мишка', 'Робот', 'Машинка'], answer: 1, explanation: 'Teddy bear — плюшевый мишка 🧸', imageUrl: '' },
  { id: 'toys_06', topicId: 'toys', type: 'A', order: 6, question: 'Puzzle', options: ['Конструктор', 'Пазл', 'Кубики', 'Карты'], answer: 1, explanation: 'Puzzle — это пазл 🧩', imageUrl: '' },
  { id: 'toys_07', topicId: 'toys', type: 'A', order: 7, question: 'Blocks', options: ['Мяч', 'Кубики', 'Карты', 'Пазл'], answer: 1, explanation: 'Blocks — это кубики 🧱', imageUrl: '' },
  { id: 'toys_08', topicId: 'toys', type: 'A', order: 8, question: 'Kite', options: ['Самолёт', 'Воздушный змей', 'Шар', 'Ракета'], answer: 1, explanation: 'Kite — это воздушный змей 🪁', imageUrl: '' },
  { id: 'toys_09', topicId: 'toys', type: 'B', order: 9, question: 'Kick the ___ to score a goal!', options: ['doll', 'ball', 'car', 'book'], answer: 1, explanation: 'В футбол играют мячом ⚽', imageUrl: '' },
  { id: 'toys_10', topicId: 'toys', type: 'B', order: 10, question: 'Girls often play with a ___.', options: ['robot', 'car', 'doll', 'ball'], answer: 2, explanation: 'Девочки часто играют с куклами 👸', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // BODY (Тело)
  // ══════════════════════════════════════════════════════════════
  { id: 'body_01', topicId: 'body', type: 'A', order: 1, question: 'Head', options: ['Рука', 'Нога', 'Голова', 'Живот'], answer: 2, explanation: 'Head — это голова 🗣️', imageUrl: '' },
  { id: 'body_02', topicId: 'body', type: 'A', order: 2, question: 'Hand', options: ['Нога', 'Рука', 'Голова', 'Плечо'], answer: 1, explanation: 'Hand — это рука ✋', imageUrl: '' },
  { id: 'body_03', topicId: 'body', type: 'A', order: 3, question: 'Leg', options: ['Рука', 'Шея', 'Нога', 'Спина'], answer: 2, explanation: 'Leg — это нога 🦵', imageUrl: '' },
  { id: 'body_04', topicId: 'body', type: 'A', order: 4, question: 'Arm', options: ['Рука (от плеча)', 'Нога', 'Шея', 'Спина'], answer: 0, explanation: 'Arm — это рука (от плеча до кисти) 💪', imageUrl: '' },
  { id: 'body_05', topicId: 'body', type: 'A', order: 5, question: 'Foot', options: ['Рука', 'Колено', 'Ступня', 'Палец'], answer: 2, explanation: 'Foot — это ступня 🦶', imageUrl: '' },
  { id: 'body_06', topicId: 'body', type: 'A', order: 6, question: 'Finger', options: ['Палец руки', 'Палец ноги', 'Ноготь', 'Кисть'], answer: 0, explanation: 'Finger — это палец руки ☝️', imageUrl: '' },
  { id: 'body_07', topicId: 'body', type: 'A', order: 7, question: 'Knee', options: ['Локоть', 'Колено', 'Плечо', 'Бедро'], answer: 1, explanation: 'Knee — это колено 🦵', imageUrl: '' },
  { id: 'body_08', topicId: 'body', type: 'A', order: 8, question: 'Shoulder', options: ['Локоть', 'Колено', 'Плечо', 'Спина'], answer: 2, explanation: 'Shoulder — это плечо 💪', imageUrl: '' },
  { id: 'body_09', topicId: 'body', type: 'B', order: 9, question: 'I write with my ___.', options: ['leg', 'head', 'hand', 'foot'], answer: 2, explanation: 'Пишем рукой ✍️', imageUrl: '' },
  { id: 'body_10', topicId: 'body', type: 'B', order: 10, question: 'I kick the ball with my ___.', options: ['hand', 'head', 'arm', 'foot'], answer: 3, explanation: 'Мяч бьём ногой ⚽🦶', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // BODY_FACE (Лицо)
  // ══════════════════════════════════════════════════════════════
  { id: 'face_01', topicId: 'body_face', type: 'A', order: 1, question: 'Eye', options: ['Ухо', 'Нос', 'Глаз', 'Рот'], answer: 2, explanation: 'Eye — это глаз 👁️', imageUrl: '' },
  { id: 'face_02', topicId: 'body_face', type: 'A', order: 2, question: 'Nose', options: ['Глаз', 'Нос', 'Губа', 'Зуб'], answer: 1, explanation: 'Nose — это нос 👃', imageUrl: '' },
  { id: 'face_03', topicId: 'body_face', type: 'A', order: 3, question: 'Mouth', options: ['Зуб', 'Губа', 'Рот', 'Нос'], answer: 2, explanation: 'Mouth — это рот 👄', imageUrl: '' },
  { id: 'face_04', topicId: 'body_face', type: 'A', order: 4, question: 'Ear', options: ['Ухо', 'Рот', 'Глаз', 'Рука'], answer: 0, explanation: 'Ear — это ухо 👂', imageUrl: '' },
  { id: 'face_05', topicId: 'body_face', type: 'A', order: 5, question: 'Tooth', options: ['Язык', 'Губа', 'Зуб', 'Щека'], answer: 2, explanation: 'Tooth — это зуб 🦷', imageUrl: '' },
  { id: 'face_06', topicId: 'body_face', type: 'A', order: 6, question: 'Tongue', options: ['Зуб', 'Язык', 'Губа', 'Щека'], answer: 1, explanation: 'Tongue — это язык 👅', imageUrl: '' },
  { id: 'face_07', topicId: 'body_face', type: 'A', order: 7, question: 'Hair', options: ['Бровь', 'Ресницы', 'Волосы', 'Борода'], answer: 2, explanation: 'Hair — это волосы 💇', imageUrl: '' },
  { id: 'face_08', topicId: 'body_face', type: 'A', order: 8, question: 'Cheek', options: ['Лоб', 'Подбородок', 'Щека', 'Шея'], answer: 2, explanation: 'Cheek — это щека 😊', imageUrl: '' },
  { id: 'face_09', topicId: 'body_face', type: 'B', order: 9, question: 'I see with my ___.', options: ['ears', 'nose', 'eyes', 'mouth'], answer: 2, explanation: 'Видим глазами 👀', imageUrl: '' },
  { id: 'face_10', topicId: 'body_face', type: 'B', order: 10, question: 'I hear with my ___.', options: ['eyes', 'ears', 'nose', 'mouth'], answer: 1, explanation: 'Слышим ушами 👂', imageUrl: '' },
  { id: 'face_11', topicId: 'body_face', type: 'B', order: 11, question: 'I smell with my ___.', options: ['eyes', 'ears', 'nose', 'mouth'], answer: 2, explanation: 'Чувствуем запах носом 👃', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // SCHOOL (Школа)
  // ══════════════════════════════════════════════════════════════
  { id: 'school_01', topicId: 'school', type: 'A', order: 1, question: 'Book', options: ['Тетрадь', 'Книга', 'Ручка', 'Сумка'], answer: 1, explanation: 'Book — это книга 📘', imageUrl: '' },
  { id: 'school_02', topicId: 'school', type: 'A', order: 2, question: 'Pen', options: ['Ручка', 'Карандаш', 'Ластик', 'Линейка'], answer: 0, explanation: 'Pen — это ручка 🖊️', imageUrl: '' },
  { id: 'school_03', topicId: 'school', type: 'A', order: 3, question: 'Pencil', options: ['Ручка', 'Карандаш', 'Мел', 'Кисть'], answer: 1, explanation: 'Pencil — это карандаш ✏️', imageUrl: '' },
  { id: 'school_04', topicId: 'school', type: 'A', order: 4, question: 'Notebook', options: ['Книга', 'Дневник', 'Тетрадь', 'Альбом'], answer: 2, explanation: 'Notebook — это тетрадь 📓', imageUrl: '' },
  { id: 'school_05', topicId: 'school', type: 'A', order: 5, question: 'Eraser', options: ['Точилка', 'Ластик', 'Линейка', 'Скрепка'], answer: 1, explanation: 'Eraser — это ластик 🧹', imageUrl: '' },
  { id: 'school_06', topicId: 'school', type: 'A', order: 6, question: 'Ruler', options: ['Ластик', 'Карандаш', 'Линейка', 'Циркуль'], answer: 2, explanation: 'Ruler — это линейка 📏', imageUrl: '' },
  { id: 'school_07', topicId: 'school', type: 'A', order: 7, question: 'Backpack', options: ['Коробка', 'Папка', 'Рюкзак', 'Стол'], answer: 2, explanation: 'Backpack — это рюкзак 🎒', imageUrl: '' },
  { id: 'school_08', topicId: 'school', type: 'A', order: 8, question: 'Desk', options: ['Стул', 'Парта', 'Доска', 'Окно'], answer: 1, explanation: 'Desk — это парта/стол 📚', imageUrl: '' },
  { id: 'school_09', topicId: 'school', type: 'A', order: 9, question: 'Teacher', options: ['Доктор', 'Ученик', 'Учитель', 'Родитель'], answer: 2, explanation: 'Teacher — это учитель 🧑‍🏫', imageUrl: '' },
  { id: 'school_10', topicId: 'school', type: 'A', order: 10, question: 'Student', options: ['Учитель', 'Ученик', 'Директор', 'Родитель'], answer: 1, explanation: 'Student — это ученик 🧑‍🎓', imageUrl: '' },
  { id: 'school_11', topicId: 'school', type: 'B', order: 11, question: 'I read a ___ every day.', options: ['pen', 'desk', 'book', 'eraser'], answer: 2, explanation: 'Каждый день читаю книгу 📖', imageUrl: '' },
  { id: 'school_12', topicId: 'school', type: 'B', order: 12, question: 'Put your books in your ___.', options: ['pen', 'desk', 'backpack', 'chair'], answer: 2, explanation: 'Книги кладут в рюкзак 🎒', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // CLOTHES (Одежда)
  // ══════════════════════════════════════════════════════════════
  { id: 'cloth_01', topicId: 'clothes', type: 'A', order: 1, question: 'T-shirt', options: ['Рубашка', 'Футболка', 'Свитер', 'Куртка'], answer: 1, explanation: 'T-shirt — это футболка 👕', imageUrl: '' },
  { id: 'cloth_02', topicId: 'clothes', type: 'A', order: 2, question: 'Pants', options: ['Шорты', 'Юбка', 'Брюки', 'Платье'], answer: 2, explanation: 'Pants — это брюки 👖', imageUrl: '' },
  { id: 'cloth_03', topicId: 'clothes', type: 'A', order: 3, question: 'Dress', options: ['Юбка', 'Платье', 'Блузка', 'Пальто'], answer: 1, explanation: 'Dress — это платье 👗', imageUrl: '' },
  { id: 'cloth_04', topicId: 'clothes', type: 'A', order: 4, question: 'Shoes', options: ['Носки', 'Ботинки', 'Туфли/Обувь', 'Тапочки'], answer: 2, explanation: 'Shoes — это туфли/обувь 👟', imageUrl: '' },
  { id: 'cloth_05', topicId: 'clothes', type: 'A', order: 5, question: 'Hat', options: ['Шарф', 'Перчатки', 'Шапка', 'Носки'], answer: 2, explanation: 'Hat — это шапка 🎩', imageUrl: '' },
  { id: 'cloth_06', topicId: 'clothes', type: 'A', order: 6, question: 'Jacket', options: ['Рубашка', 'Куртка', 'Свитер', 'Пальто'], answer: 1, explanation: 'Jacket — это куртка 🧥', imageUrl: '' },
  { id: 'cloth_07', topicId: 'clothes', type: 'A', order: 7, question: 'Socks', options: ['Перчатки', 'Носки', 'Ботинки', 'Шарф'], answer: 1, explanation: 'Socks — это носки 🧦', imageUrl: '' },
  { id: 'cloth_08', topicId: 'clothes', type: 'A', order: 8, question: 'Sweater', options: ['Футболка', 'Рубашка', 'Свитер', 'Жилет'], answer: 2, explanation: 'Sweater — это свитер 🧶', imageUrl: '' },
  { id: 'cloth_09', topicId: 'clothes', type: 'A', order: 9, question: 'Skirt', options: ['Платье', 'Юбка', 'Брюки', 'Шорты'], answer: 1, explanation: 'Skirt — это юбка 👗', imageUrl: '' },
  { id: 'cloth_10', topicId: 'clothes', type: 'A', order: 10, question: 'Gloves', options: ['Носки', 'Шарф', 'Перчатки', 'Шапка'], answer: 2, explanation: 'Gloves — это перчатки 🧤', imageUrl: '' },
  { id: 'cloth_11', topicId: 'clothes', type: 'B', order: 11, question: 'I wear a ___ on my head.', options: ['shoe', 'hat', 'glove', 'sock'], answer: 1, explanation: 'На голове носят шапку 🎩', imageUrl: '' },
  { id: 'cloth_12', topicId: 'clothes', type: 'B', order: 12, question: 'I put ___ on my feet.', options: ['gloves', 'hat', 'shoes', 'sweater'], answer: 2, explanation: 'На ноги надевают обувь 👟', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // WEATHER (Погода)
  // ══════════════════════════════════════════════════════════════
  { id: 'weather_01', topicId: 'weather', type: 'A', order: 1, question: 'Sun', options: ['Луна', 'Звезда', 'Солнце', 'Облако'], answer: 2, explanation: 'Sun — это солнце ☀️', imageUrl: '' },
  { id: 'weather_02', topicId: 'weather', type: 'A', order: 2, question: 'Cloud', options: ['Солнце', 'Облако', 'Дождь', 'Снег'], answer: 1, explanation: 'Cloud — это облако ☁️', imageUrl: '' },
  { id: 'weather_03', topicId: 'weather', type: 'A', order: 3, question: 'Rain', options: ['Снег', 'Град', 'Дождь', 'Ветер'], answer: 2, explanation: 'Rain — это дождь 🌧️', imageUrl: '' },
  { id: 'weather_04', topicId: 'weather', type: 'A', order: 4, question: 'Snow', options: ['Дождь', 'Снег', 'Лёд', 'Град'], answer: 1, explanation: 'Snow — это снег ❄️', imageUrl: '' },
  { id: 'weather_05', topicId: 'weather', type: 'A', order: 5, question: 'Wind', options: ['Дождь', 'Снег', 'Солнце', 'Ветер'], answer: 3, explanation: 'Wind — это ветер 💨', imageUrl: '' },
  { id: 'weather_06', topicId: 'weather', type: 'A', order: 6, question: 'Rainbow', options: ['Молния', 'Радуга', 'Облако', 'Туман'], answer: 1, explanation: 'Rainbow — это радуга 🌈', imageUrl: '' },
  { id: 'weather_07', topicId: 'weather', type: 'A', order: 7, question: 'Storm', options: ['Туман', 'Гроза', 'Ветер', 'Снег'], answer: 1, explanation: 'Storm — это гроза ⛈️', imageUrl: '' },
  { id: 'weather_08', topicId: 'weather', type: 'A', order: 8, question: 'Hot', options: ['Холодно', 'Тепло', 'Жарко', 'Прохладно'], answer: 2, explanation: 'Hot — это жарко 🥵', imageUrl: '' },
  { id: 'weather_09', topicId: 'weather', type: 'A', order: 9, question: 'Cold', options: ['Жарко', 'Холодно', 'Тепло', 'Прохладно'], answer: 1, explanation: 'Cold — это холодно 🥶', imageUrl: '' },
  { id: 'weather_10', topicId: 'weather', type: 'B', order: 10, question: 'Take an umbrella, it\'s ___.', options: ['sunny', 'windy', 'rainy', 'snowy'], answer: 2, explanation: 'Возьми зонт — идёт дождь ☔', imageUrl: '' },
  { id: 'weather_11', topicId: 'weather', type: 'B', order: 11, question: 'In winter it\'s ___ outside.', options: ['hot', 'cold', 'rainy', 'sunny'], answer: 1, explanation: 'Зимой холодно ❄️', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // HOUSE (Дом)
  // ══════════════════════════════════════════════════════════════
  { id: 'house_01', topicId: 'house', type: 'A', order: 1, question: 'House', options: ['Квартира', 'Дом', 'Комната', 'Здание'], answer: 1, explanation: 'House — это дом 🏠', imageUrl: '' },
  { id: 'house_02', topicId: 'house', type: 'A', order: 2, question: 'Room', options: ['Дом', 'Этаж', 'Комната', 'Квартира'], answer: 2, explanation: 'Room — это комната 🚪', imageUrl: '' },
  { id: 'house_03', topicId: 'house', type: 'A', order: 3, question: 'Kitchen', options: ['Спальня', 'Кухня', 'Ванная', 'Гостиная'], answer: 1, explanation: 'Kitchen — это кухня 🍳', imageUrl: '' },
  { id: 'house_04', topicId: 'house', type: 'A', order: 4, question: 'Bedroom', options: ['Кухня', 'Ванная', 'Спальня', 'Прихожая'], answer: 2, explanation: 'Bedroom — это спальня 🛏️', imageUrl: '' },
  { id: 'house_05', topicId: 'house', type: 'A', order: 5, question: 'Bathroom', options: ['Туалет', 'Ванная', 'Кухня', 'Коридор'], answer: 1, explanation: 'Bathroom — это ванная 🛁', imageUrl: '' },
  { id: 'house_06', topicId: 'house', type: 'A', order: 6, question: 'Living room', options: ['Спальня', 'Кухня', 'Гостиная', 'Детская'], answer: 2, explanation: 'Living room — это гостиная 🛋️', imageUrl: '' },
  { id: 'house_07', topicId: 'house', type: 'A', order: 7, question: 'Door', options: ['Окно', 'Дверь', 'Стена', 'Пол'], answer: 1, explanation: 'Door — это дверь 🚪', imageUrl: '' },
  { id: 'house_08', topicId: 'house', type: 'A', order: 8, question: 'Window', options: ['Дверь', 'Окно', 'Крыша', 'Стена'], answer: 1, explanation: 'Window — это окно 🪟', imageUrl: '' },
  { id: 'house_09', topicId: 'house', type: 'A', order: 9, question: 'Garden', options: ['Двор', 'Балкон', 'Сад', 'Парк'], answer: 2, explanation: 'Garden — это сад 🌻', imageUrl: '' },
  { id: 'house_10', topicId: 'house', type: 'B', order: 10, question: 'We cook food in the ___.', options: ['bedroom', 'bathroom', 'kitchen', 'garden'], answer: 2, explanation: 'Готовим еду на кухне 🍳', imageUrl: '' },
  { id: 'house_11', topicId: 'house', type: 'B', order: 11, question: 'I sleep in my ___.', options: ['kitchen', 'bedroom', 'bathroom', 'garden'], answer: 1, explanation: 'Спим в спальне 🛏️', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // FURNITURE (Мебель)
  // ══════════════════════════════════════════════════════════════
  { id: 'furn_01', topicId: 'furniture', type: 'A', order: 1, question: 'Table', options: ['Стул', 'Стол', 'Шкаф', 'Кровать'], answer: 1, explanation: 'Table — это стол 🪑', imageUrl: '' },
  { id: 'furn_02', topicId: 'furniture', type: 'A', order: 2, question: 'Chair', options: ['Стол', 'Стул', 'Кресло', 'Диван'], answer: 1, explanation: 'Chair — это стул 🪑', imageUrl: '' },
  { id: 'furn_03', topicId: 'furniture', type: 'A', order: 3, question: 'Bed', options: ['Диван', 'Кресло', 'Кровать', 'Шкаф'], answer: 2, explanation: 'Bed — это кровать 🛏️', imageUrl: '' },
  { id: 'furn_04', topicId: 'furniture', type: 'A', order: 4, question: 'Sofa', options: ['Кресло', 'Диван', 'Стул', 'Кровать'], answer: 1, explanation: 'Sofa — это диван 🛋️', imageUrl: '' },
  { id: 'furn_05', topicId: 'furniture', type: 'A', order: 5, question: 'Wardrobe', options: ['Комод', 'Шкаф для одежды', 'Полка', 'Тумбочка'], answer: 1, explanation: 'Wardrobe — это шкаф для одежды 🚪', imageUrl: '' },
  { id: 'furn_06', topicId: 'furniture', type: 'A', order: 6, question: 'Lamp', options: ['Люстра', 'Лампа', 'Свеча', 'Фонарь'], answer: 1, explanation: 'Lamp — это лампа 💡', imageUrl: '' },
  { id: 'furn_07', topicId: 'furniture', type: 'A', order: 7, question: 'Mirror', options: ['Картина', 'Окно', 'Зеркало', 'Рама'], answer: 2, explanation: 'Mirror — это зеркало 🪞', imageUrl: '' },
  { id: 'furn_08', topicId: 'furniture', type: 'A', order: 8, question: 'Shelf', options: ['Ящик', 'Полка', 'Шкаф', 'Стол'], answer: 1, explanation: 'Shelf — это полка 📚', imageUrl: '' },
  { id: 'furn_09', topicId: 'furniture', type: 'B', order: 9, question: 'I sit on a ___ to eat dinner.', options: ['bed', 'chair', 'lamp', 'mirror'], answer: 1, explanation: 'За ужином сидим на стуле 🪑', imageUrl: '' },
  { id: 'furn_10', topicId: 'furniture', type: 'B', order: 10, question: 'My clothes are in the ___.', options: ['table', 'chair', 'wardrobe', 'bed'], answer: 2, explanation: 'Одежда в шкафу 👕', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // TRANSPORT (Транспорт)
  // ══════════════════════════════════════════════════════════════
  { id: 'trans_01', topicId: 'transport', type: 'A', order: 1, question: 'Car', options: ['Автобус', 'Машина', 'Поезд', 'Велосипед'], answer: 1, explanation: 'Car — это машина 🚗', imageUrl: '' },
  { id: 'trans_02', topicId: 'transport', type: 'A', order: 2, question: 'Bus', options: ['Машина', 'Автобус', 'Трамвай', 'Такси'], answer: 1, explanation: 'Bus — это автобус 🚌', imageUrl: '' },
  { id: 'trans_03', topicId: 'transport', type: 'A', order: 3, question: 'Train', options: ['Автобус', 'Метро', 'Поезд', 'Трамвай'], answer: 2, explanation: 'Train — это поезд 🚂', imageUrl: '' },
  { id: 'trans_04', topicId: 'transport', type: 'A', order: 4, question: 'Plane', options: ['Вертолёт', 'Ракета', 'Самолёт', 'Дирижабль'], answer: 2, explanation: 'Plane — это самолёт ✈️', imageUrl: '' },
  { id: 'trans_05', topicId: 'transport', type: 'A', order: 5, question: 'Bicycle', options: ['Мотоцикл', 'Велосипед', 'Самокат', 'Скейт'], answer: 1, explanation: 'Bicycle — это велосипед 🚲', imageUrl: '' },
  { id: 'trans_06', topicId: 'transport', type: 'A', order: 6, question: 'Ship', options: ['Лодка', 'Яхта', 'Корабль', 'Катер'], answer: 2, explanation: 'Ship — это корабль 🚢', imageUrl: '' },
  { id: 'trans_07', topicId: 'transport', type: 'A', order: 7, question: 'Helicopter', options: ['Самолёт', 'Ракета', 'Вертолёт', 'Дрон'], answer: 2, explanation: 'Helicopter — это вертолёт 🚁', imageUrl: '' },
  { id: 'trans_08', topicId: 'transport', type: 'A', order: 8, question: 'Boat', options: ['Корабль', 'Лодка', 'Яхта', 'Плот'], answer: 1, explanation: 'Boat — это лодка ⛵', imageUrl: '' },
  { id: 'trans_09', topicId: 'transport', type: 'A', order: 9, question: 'Motorcycle', options: ['Велосипед', 'Мотоцикл', 'Скутер', 'Квадроцикл'], answer: 1, explanation: 'Motorcycle — это мотоцикл 🏍️', imageUrl: '' },
  { id: 'trans_10', topicId: 'transport', type: 'B', order: 10, question: 'A ___ flies in the sky.', options: ['car', 'bus', 'plane', 'boat'], answer: 2, explanation: 'Самолёт летает в небе ✈️', imageUrl: '' },
  { id: 'trans_11', topicId: 'transport', type: 'B', order: 11, question: 'A ___ travels on water.', options: ['car', 'train', 'plane', 'ship'], answer: 3, explanation: 'Корабль плывёт по воде 🚢', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // PROFESSIONS (Профессии)
  // ══════════════════════════════════════════════════════════════
  { id: 'prof_01', topicId: 'professions', type: 'A', order: 1, question: 'Doctor', options: ['Учитель', 'Доктор', 'Повар', 'Полицейский'], answer: 1, explanation: 'Doctor — это доктор 👨‍⚕️', imageUrl: '' },
  { id: 'prof_02', topicId: 'professions', type: 'A', order: 2, question: 'Teacher', options: ['Врач', 'Пожарный', 'Учитель', 'Строитель'], answer: 2, explanation: 'Teacher — это учитель 🧑‍🏫', imageUrl: '' },
  { id: 'prof_03', topicId: 'professions', type: 'A', order: 3, question: 'Police officer', options: ['Пожарный', 'Полицейский', 'Охранник', 'Солдат'], answer: 1, explanation: 'Police officer — полицейский 👮', imageUrl: '' },
  { id: 'prof_04', topicId: 'professions', type: 'A', order: 4, question: 'Firefighter', options: ['Полицейский', 'Спасатель', 'Пожарный', 'Строитель'], answer: 2, explanation: 'Firefighter — это пожарный 🧑‍🚒', imageUrl: '' },
  { id: 'prof_05', topicId: 'professions', type: 'A', order: 5, question: 'Cook', options: ['Официант', 'Повар', 'Пекарь', 'Фермер'], answer: 1, explanation: 'Cook — это повар 👨‍🍳', imageUrl: '' },
  { id: 'prof_06', topicId: 'professions', type: 'A', order: 6, question: 'Pilot', options: ['Водитель', 'Капитан', 'Пилот', 'Машинист'], answer: 2, explanation: 'Pilot — это пилот 👨‍✈️', imageUrl: '' },
  { id: 'prof_07', topicId: 'professions', type: 'A', order: 7, question: 'Driver', options: ['Пилот', 'Водитель', 'Механик', 'Машинист'], answer: 1, explanation: 'Driver — это водитель 🚗', imageUrl: '' },
  { id: 'prof_08', topicId: 'professions', type: 'A', order: 8, question: 'Farmer', options: ['Садовник', 'Фермер', 'Охотник', 'Рыбак'], answer: 1, explanation: 'Farmer — это фермер 👨‍🌾', imageUrl: '' },
  { id: 'prof_09', topicId: 'professions', type: 'A', order: 9, question: 'Singer', options: ['Танцор', 'Музыкант', 'Певец', 'Актёр'], answer: 2, explanation: 'Singer — это певец 🎤', imageUrl: '' },
  { id: 'prof_10', topicId: 'professions', type: 'B', order: 10, question: 'A ___ helps sick people.', options: ['teacher', 'doctor', 'driver', 'cook'], answer: 1, explanation: 'Доктор помогает больным 👨‍⚕️', imageUrl: '' },
  { id: 'prof_11', topicId: 'professions', type: 'B', order: 11, question: 'A ___ puts out fires.', options: ['police officer', 'firefighter', 'pilot', 'driver'], answer: 1, explanation: 'Пожарный тушит огонь 🧑‍🚒', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // ACTIONS (Действия/Глаголы)
  // ══════════════════════════════════════════════════════════════
  { id: 'act_01', topicId: 'actions', type: 'A', order: 1, question: 'Run', options: ['Идти', 'Бежать', 'Прыгать', 'Плавать'], answer: 1, explanation: 'Run — это бежать 🏃', imageUrl: '' },
  { id: 'act_02', topicId: 'actions', type: 'A', order: 2, question: 'Walk', options: ['Бежать', 'Идти', 'Стоять', 'Сидеть'], answer: 1, explanation: 'Walk — это идти 🚶', imageUrl: '' },
  { id: 'act_03', topicId: 'actions', type: 'A', order: 3, question: 'Jump', options: ['Бежать', 'Падать', 'Прыгать', 'Летать'], answer: 2, explanation: 'Jump — это прыгать 🦘', imageUrl: '' },
  { id: 'act_04', topicId: 'actions', type: 'A', order: 4, question: 'Swim', options: ['Плавать', 'Нырять', 'Грести', 'Тонуть'], answer: 0, explanation: 'Swim — это плавать 🏊', imageUrl: '' },
  { id: 'act_05', topicId: 'actions', type: 'A', order: 5, question: 'Eat', options: ['Пить', 'Есть', 'Готовить', 'Жевать'], answer: 1, explanation: 'Eat — это есть 🍽️', imageUrl: '' },
  { id: 'act_06', topicId: 'actions', type: 'A', order: 6, question: 'Drink', options: ['Есть', 'Пить', 'Глотать', 'Лизать'], answer: 1, explanation: 'Drink — это пить 🥤', imageUrl: '' },
  { id: 'act_07', topicId: 'actions', type: 'A', order: 7, question: 'Sleep', options: ['Отдыхать', 'Лежать', 'Спать', 'Мечтать'], answer: 2, explanation: 'Sleep — это спать 😴', imageUrl: '' },
  { id: 'act_08', topicId: 'actions', type: 'A', order: 8, question: 'Read', options: ['Писать', 'Читать', 'Рисовать', 'Считать'], answer: 1, explanation: 'Read — это читать 📖', imageUrl: '' },
  { id: 'act_09', topicId: 'actions', type: 'A', order: 9, question: 'Write', options: ['Читать', 'Рисовать', 'Писать', 'Печатать'], answer: 2, explanation: 'Write — это писать ✍️', imageUrl: '' },
  { id: 'act_10', topicId: 'actions', type: 'A', order: 10, question: 'Dance', options: ['Петь', 'Танцевать', 'Играть', 'Хлопать'], answer: 1, explanation: 'Dance — это танцевать 💃', imageUrl: '' },
  { id: 'act_11', topicId: 'actions', type: 'A', order: 11, question: 'Sing', options: ['Петь', 'Говорить', 'Кричать', 'Шептать'], answer: 0, explanation: 'Sing — это петь 🎤', imageUrl: '' },
  { id: 'act_12', topicId: 'actions', type: 'B', order: 12, question: 'Fish ___ in the water.', options: ['run', 'fly', 'swim', 'walk'], answer: 2, explanation: 'Рыбы плавают в воде 🐟', imageUrl: '' },
  { id: 'act_13', topicId: 'actions', type: 'B', order: 13, question: 'Birds can ___.', options: ['swim', 'fly', 'run', 'dig'], answer: 1, explanation: 'Птицы умеют летать 🐦', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // DAYS (Дни недели)
  // ══════════════════════════════════════════════════════════════
  { id: 'days_01', topicId: 'days', type: 'A', order: 1, question: 'Monday', options: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда'], answer: 1, explanation: 'Monday — это понедельник 📅', imageUrl: '' },
  { id: 'days_02', topicId: 'days', type: 'A', order: 2, question: 'Tuesday', options: ['Понедельник', 'Вторник', 'Среда', 'Четверг'], answer: 1, explanation: 'Tuesday — это вторник 📅', imageUrl: '' },
  { id: 'days_03', topicId: 'days', type: 'A', order: 3, question: 'Wednesday', options: ['Вторник', 'Среда', 'Четверг', 'Пятница'], answer: 1, explanation: 'Wednesday — это среда 📅', imageUrl: '' },
  { id: 'days_04', topicId: 'days', type: 'A', order: 4, question: 'Thursday', options: ['Среда', 'Четверг', 'Пятница', 'Суббота'], answer: 1, explanation: 'Thursday — это четверг 📅', imageUrl: '' },
  { id: 'days_05', topicId: 'days', type: 'A', order: 5, question: 'Friday', options: ['Четверг', 'Пятница', 'Суббота', 'Воскресенье'], answer: 1, explanation: 'Friday — это пятница 📅', imageUrl: '' },
  { id: 'days_06', topicId: 'days', type: 'A', order: 6, question: 'Saturday', options: ['Пятница', 'Суббота', 'Воскресенье', 'Понедельник'], answer: 1, explanation: 'Saturday — это суббота 📅', imageUrl: '' },
  { id: 'days_07', topicId: 'days', type: 'A', order: 7, question: 'Sunday', options: ['Суббота', 'Воскресенье', 'Понедельник', 'Пятница'], answer: 1, explanation: 'Sunday — это воскресенье 📅', imageUrl: '' },
  { id: 'days_08', topicId: 'days', type: 'B', order: 8, question: 'The first day of the week is ___.', options: ['Sunday', 'Monday', 'Friday', 'Saturday'], answer: 1, explanation: 'Первый день недели — понедельник 📅', imageUrl: '' },
  { id: 'days_09', topicId: 'days', type: 'B', order: 9, question: 'The weekend is ___ and Sunday.', options: ['Friday', 'Monday', 'Saturday', 'Thursday'], answer: 2, explanation: 'Выходные — суббота и воскресенье 🎉', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // SEASONS (Времена года)
  // ══════════════════════════════════════════════════════════════
  { id: 'season_01', topicId: 'seasons', type: 'A', order: 1, question: 'Spring', options: ['Лето', 'Весна', 'Осень', 'Зима'], answer: 1, explanation: 'Spring — это весна 🌸', imageUrl: '' },
  { id: 'season_02', topicId: 'seasons', type: 'A', order: 2, question: 'Summer', options: ['Весна', 'Лето', 'Осень', 'Зима'], answer: 1, explanation: 'Summer — это лето ☀️', imageUrl: '' },
  { id: 'season_03', topicId: 'seasons', type: 'A', order: 3, question: 'Autumn', options: ['Весна', 'Лето', 'Осень', 'Зима'], answer: 2, explanation: 'Autumn — это осень 🍂', imageUrl: '' },
  { id: 'season_04', topicId: 'seasons', type: 'A', order: 4, question: 'Winter', options: ['Весна', 'Лето', 'Осень', 'Зима'], answer: 3, explanation: 'Winter — это зима ❄️', imageUrl: '' },
  { id: 'season_05', topicId: 'seasons', type: 'A', order: 5, question: 'January', options: ['Февраль', 'Январь', 'Март', 'Декабрь'], answer: 1, explanation: 'January — это январь 📅', imageUrl: '' },
  { id: 'season_06', topicId: 'seasons', type: 'A', order: 6, question: 'July', options: ['Июнь', 'Июль', 'Август', 'Май'], answer: 1, explanation: 'July — это июль 📅', imageUrl: '' },
  { id: 'season_07', topicId: 'seasons', type: 'A', order: 7, question: 'December', options: ['Ноябрь', 'Октябрь', 'Декабрь', 'Январь'], answer: 2, explanation: 'December — это декабрь 📅', imageUrl: '' },
  { id: 'season_08', topicId: 'seasons', type: 'B', order: 8, question: 'It snows in ___.', options: ['summer', 'spring', 'winter', 'autumn'], answer: 2, explanation: 'Снег идёт зимой ❄️', imageUrl: '' },
  { id: 'season_09', topicId: 'seasons', type: 'B', order: 9, question: 'Flowers bloom in ___.', options: ['winter', 'autumn', 'spring', 'December'], answer: 2, explanation: 'Цветы цветут весной 🌸', imageUrl: '' },
  { id: 'season_10', topicId: 'seasons', type: 'B', order: 10, question: 'We go swimming in ___.', options: ['winter', 'autumn', 'spring', 'summer'], answer: 3, explanation: 'Купаемся летом 🏊', imageUrl: '' },

  // ══════════════════════════════════════════════════════════════
  // EMOTIONS (Эмоции)
  // ══════════════════════════════════════════════════════════════
  { id: 'emo_01', topicId: 'emotions', type: 'A', order: 1, question: 'Happy', options: ['Грустный', 'Счастливый', 'Злой', 'Усталый'], answer: 1, explanation: 'Happy — это счастливый 😊', imageUrl: '' },
  { id: 'emo_02', topicId: 'emotions', type: 'A', order: 2, question: 'Sad', options: ['Весёлый', 'Злой', 'Грустный', 'Испуганный'], answer: 2, explanation: 'Sad — это грустный 😢', imageUrl: '' },
  { id: 'emo_03', topicId: 'emotions', type: 'A', order: 3, question: 'Angry', options: ['Счастливый', 'Грустный', 'Злой', 'Удивлённый'], answer: 2, explanation: 'Angry — это злой 😠', imageUrl: '' },
  { id: 'emo_04', topicId: 'emotions', type: 'A', order: 4, question: 'Scared', options: ['Весёлый', 'Испуганный', 'Злой', 'Сонный'], answer: 1, explanation: 'Scared — это испуганный 😨', imageUrl: '' },
  { id: 'emo_05', topicId: 'emotions', type: 'A', order: 5, question: 'Tired', options: ['Бодрый', 'Злой', 'Грустный', 'Усталый'], answer: 3, explanation: 'Tired — это усталый 😴', imageUrl: '' },
  { id: 'emo_06', topicId: 'emotions', type: 'A', order: 6, question: 'Surprised', options: ['Удивлённый', 'Злой', 'Грустный', 'Скучающий'], answer: 0, explanation: 'Surprised — это удивлённый 😮', imageUrl: '' },
  { id: 'emo_07', topicId: 'emotions', type: 'A', order: 7, question: 'Excited', options: ['Скучающий', 'Грустный', 'Взволнованный', 'Усталый'], answer: 2, explanation: 'Excited — это взволнованный/в восторге 🤩', imageUrl: '' },
  { id: 'emo_08', topicId: 'emotions', type: 'A', order: 8, question: 'Bored', options: ['Весёлый', 'Скучающий', 'Злой', 'Испуганный'], answer: 1, explanation: 'Bored — это скучающий 😐', imageUrl: '' },
  { id: 'emo_09', topicId: 'emotions', type: 'B', order: 9, question: 'When I get a gift, I feel ___.', options: ['sad', 'angry', 'happy', 'scared'], answer: 2, explanation: 'Получая подарок, мы счастливы 🎁😊', imageUrl: '' },
  { id: 'emo_10', topicId: 'emotions', type: 'B', order: 10, question: 'When I lose my toy, I feel ___.', options: ['happy', 'sad', 'excited', 'bored'], answer: 1, explanation: 'Потеряв игрушку, мы грустим 😢', imageUrl: '' },
  { id: 'emo_11', topicId: 'emotions', type: 'B', order: 11, question: 'After a long day, I feel ___.', options: ['excited', 'angry', 'tired', 'surprised'], answer: 2, explanation: 'После долгого дня мы устаём 😴', imageUrl: '' },
];
