// test-site.js — Тестирование KidsEnglish
const { chromium } = require('playwright');

const TARGET_URL = 'https://kidsenglish-51c58.web.app';
const CLASS_CODE = 'K422X8';
const STUDENT_PASSWORD = 'cloud85';

(async () => {
  console.log('🚀 Запускаю браузер...');
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();

  try {
    // 1. Переходим на главную
    console.log('\n📍 Шаг 1: Открываю главную страницу...');
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
    await page.screenshot({ path: '/tmp/01-landing.png', fullPage: true });
    console.log('📸 Скриншот: /tmp/01-landing.png');

    // 2. Вводим код класса
    console.log('\n📍 Шаг 2: Ввожу код класса...');
    // На странице два input поля - первый для кода, второй для пароля
    const inputs = page.locator('input');
    const inputCount = await inputs.count();
    console.log(`   Найдено ${inputCount} input полей`);

    const codeInput = inputs.first();
    await codeInput.waitFor({ state: 'visible', timeout: 10000 });
    await codeInput.fill(CLASS_CODE);

    // 3. Вводим пароль
    console.log('\n📍 Шаг 3: Ввожу пароль ученика...');
    const passwordInput = inputs.nth(1);
    await passwordInput.fill(STUDENT_PASSWORD);
    await page.screenshot({ path: '/tmp/02-credentials.png', fullPage: true });
    console.log('📸 Скриншот: /tmp/02-credentials.png');

    // 4. Нажимаем кнопку входа
    console.log('\n📍 Шаг 4: Вхожу в класс...');
    const loginBtn = page.locator('button[type="submit"], button:has-text("Войти"), button:has-text("войти")').first();
    await loginBtn.click();

    // 5. Ждём загрузку страницы класса
    console.log('   Ожидаю загрузку страницы...');
    // Ждём пока загрузится контент (исчезнет "Загружаем класс...")
    await page.waitForSelector('.ke-topic-card, .ke-admin-empty, .ke-home__grid', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000); // Дополнительная пауза для анимаций
    await page.screenshot({ path: '/tmp/03-class-home.png', fullPage: true });
    console.log('📸 Скриншот: /tmp/03-class-home.png');

    // 6. Считаем количество тем
    console.log('\n📍 Шаг 5: Считаю количество тем...');
    const topicCards = page.locator('.ke-topic-card');
    const topicCount = await topicCards.count();
    console.log(`📊 Найдено тем: ${topicCount}`);

    // Получаем названия тем
    const topicTitles = await page.locator('.ke-topic-card__name').allTextContents();
    console.log('📝 Темы:', topicTitles.slice(0, 10).join(', ') + (topicTitles.length > 10 ? '...' : ''));

    // 7. Проверяем звёзды в хедере
    const starsInHeader = await page.locator('.ke-star-pill').textContent().catch(() => 'не найдено');
    console.log(`⭐ Звёзды в хедере: ${starsInHeader}`);

    // 8. Кликаем на первую тему (если есть)
    if (topicCount === 0) {
      console.log('\n⚠️ Темы не найдены! Проверяю HTML страницы...');
      const bodyHTML = await page.locator('body').innerHTML();
      console.log('   HTML (первые 500 символов):', bodyHTML.substring(0, 500));
      await page.screenshot({ path: '/tmp/no-topics.png', fullPage: true });
      console.log('📸 Скриншот: /tmp/no-topics.png');
      throw new Error('Темы не загрузились');
    }

    console.log('\n📍 Шаг 6: Открываю первую тему...');
    const firstTopic = topicCards.first();
    const topicTitle = await firstTopic.locator('.ke-topic-card__name').textContent();
    console.log(`🎯 Выбрана тема: ${topicTitle}`);

    // Кликаем и ждём навигации
    await Promise.all([
      page.waitForURL('**/topic/**', { timeout: 10000 }),
      firstTopic.click()
    ]);
    console.log('   Перешли на страницу темы');

    // Ждём загрузки контента упражнения
    await page.waitForSelector('.ke-quiz, .ke-exercise, .ke-card', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/04-topic.png', fullPage: true });
    console.log('📸 Скриншот: /tmp/04-topic.png');

    // 9. Проходим все упражнения темы
    console.log('\n📍 Шаг 7: Прохожу упражнения...');

    let exerciseNum = 0;
    const maxExercises = 15; // Лимит на случай бесконечного цикла

    while (exerciseNum < maxExercises) {
      exerciseNum++;

      // Ждём появления вариантов ответа (класс .ke-answer)
      await page.waitForSelector('.ke-answer', { timeout: 5000 }).catch(() => {});
      const options = page.locator('.ke-answer:not([disabled])');
      const optionCount = await options.count();

      if (optionCount === 0) {
        console.log(`   Упражнение ${exerciseNum}: варианты не найдены (возможно конец)`);
        break;
      }

      console.log(`   Упражнение ${exerciseNum}: найдено ${optionCount} вариантов`);

      // Получаем вопрос
      const question = await page.locator('.ke-qcard__q, .ke-qcard').textContent().catch(() => '');
      console.log(`      Вопрос: ${question.substring(0, 50)}...`);

      // Кликаем на первый вариант
      await options.first().click();
      await page.waitForTimeout(1000);

      // Ждём кнопку "Далее" и кликаем
      const nextBtn = page.locator('#ke-next-btn');
      if (await nextBtn.isVisible().catch(() => false)) {
        await nextBtn.click();
        await page.waitForTimeout(1000);
      } else {
        console.log(`      Кнопка Далее не найдена`);
        break;
      }

      // Проверяем, не перешли ли на страницу результатов
      if (page.url().includes('/result')) {
        console.log('   📊 Перешли на страницу результатов!');
        break;
      }
    }

    await page.screenshot({ path: '/tmp/05-exercises.png', fullPage: true });
    console.log('📸 Скриншот: /tmp/05-exercises.png');

    // 10. Проверяем страницу результатов
    const currentUrl = page.url();
    console.log(`\n📍 Текущий URL: ${currentUrl}`);

    if (currentUrl.includes('/result')) {
      console.log('\n📍 Шаг 8: Проверяю страницу результатов...');
      await page.waitForTimeout(2000);
      await page.screenshot({ path: '/tmp/07-result.png', fullPage: true });
      console.log('📸 Скриншот: /tmp/07-result.png');

      // Получаем результат
      const resultScore = await page.locator('.ke-result__digits').textContent().catch(() => 'не найдено');
      console.log(`📊 Результат: ${resultScore}`);

      const starsOnResult = await page.locator('.ke-star--on').count();
      console.log(`⭐ Звёзд на результате: ${starsOnResult}`);

      // Возвращаемся к темам
      console.log('\n📍 Шаг 9: Возвращаюсь к списку тем...');
      const backBtn = page.locator('a:has-text("К темам"), a[href*="/class/"]').first();
      if (await backBtn.isVisible().catch(() => false)) {
        await backBtn.click();
        await page.waitForSelector('.ke-topic-card', { timeout: 10000 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: '/tmp/08-after-complete.png', fullPage: true });
        console.log('📸 Скриншот: /tmp/08-after-complete.png');

        // Проверяем обновился ли прогресс
        const starsAfter = await page.locator('.ke-stats-card').first().textContent().catch(() => '');
        console.log(`📊 Статистика после прохождения: ${starsAfter}`);

        const completedTopics = await page.locator('.ke-topic-card--completed').count();
        console.log(`✅ Пройденных тем: ${completedTopics}`);
      }
    }

    // 11. Проверяем наличие картинок и их src
    console.log('\n📍 Шаг 8: Проверяю картинки...');
    const images = page.locator('img');
    const imgCount = await images.count();
    console.log(`🖼️ Найдено картинок: ${imgCount}`);

    for (let i = 0; i < Math.min(5, imgCount); i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src').catch(() => '');
      const alt = await img.getAttribute('alt').catch(() => '');
      const isVisible = await img.isVisible().catch(() => false);
      const box = await img.boundingBox().catch(() => null);
      console.log(`   Картинка ${i + 1}: ${src?.substring(0, 60)}... (alt: "${alt}", visible: ${isVisible}, size: ${box?.width}x${box?.height})`);
    }

    // 12. Финальный скриншот
    await page.screenshot({ path: '/tmp/06-final.png', fullPage: true });
    console.log('\n📸 Финальный скриншот: /tmp/06-final.png');

    console.log('\n✅ Тестирование завершено!');
    console.log('\n📋 Итоги:');
    console.log(`   - Тем на странице: ${topicCount}`);
    console.log(`   - Звёзды: ${starsInHeader}`);
    console.log(`   - Картинок: ${imgCount}`);

  } catch (error) {
    console.error('\n❌ Ошибка:', error.message);
    await page.screenshot({ path: '/tmp/error.png', fullPage: true });
    console.log('📸 Скриншот ошибки: /tmp/error.png');
  } finally {
    // Ждём 5 секунд перед закрытием чтобы можно было посмотреть
    console.log('\n⏳ Закрываю браузер через 5 секунд...');
    await page.waitForTimeout(5000);
    await browser.close();
  }
})();
