// test-firestore.js — Тест записи в Firestore
const { chromium } = require('playwright');

const TARGET_URL = 'https://kidsenglish-51c58.web.app';
const CLASS_CODE = 'K422X8';
const STUDENT_PASSWORD = 'cloud85';

(async () => {
  console.log('🚀 Запускаю браузер...');
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Перехватываем ВСЕ network requests
  const failedRequests = [];
  page.on('requestfailed', request => {
    failedRequests.push({
      url: request.url(),
      failure: request.failure()?.errorText
    });
  });

  // Логируем все response
  page.on('response', response => {
    if (response.url().includes('firestore') || response.url().includes('googleapis')) {
      console.log(`   [NETWORK] ${response.status()} ${response.url().substring(0, 80)}...`);
    }
  });

  // Собираем console
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('error') || text.includes('Error') || text.includes('fail') || text.includes('progress')) {
      console.log(`   [CONSOLE ${msg.type()}] ${text}`);
    }
  });

  try {
    // 1. Логин
    console.log('\n📍 Шаг 1: Логинюсь...');
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
    const inputs = page.locator('input');
    await inputs.first().fill(CLASS_CODE);
    await inputs.nth(1).fill(STUDENT_PASSWORD);
    await page.locator('button').first().click();

    await page.waitForSelector('.ke-topic-card', { timeout: 15000 });
    console.log('✅ Залогинился');

    // 2. Проверяем сессию
    const session = await page.evaluate(() => {
      const s = sessionStorage.getItem('ke_student_session');
      return s ? JSON.parse(s) : null;
    });
    console.log(`📦 Student ID: ${session?.id}`);

    // 3. Открываем тему и проходим
    console.log('\n📍 Шаг 2: Прохожу тему...');
    await page.locator('.ke-topic-card').first().click();
    await page.waitForSelector('.ke-answer', { timeout: 10000 });

    let exerciseCount = 0;
    while (exerciseCount < 20) {
      exerciseCount++;
      const options = page.locator('.ke-answer:not([disabled])');
      if (await options.count() === 0) break;

      // Кликаем по правильному ответу (ищем его по data-idx)
      const correctIdx = await page.evaluate(() => {
        const btns = document.querySelectorAll('.ke-answer');
        // Просто кликаем первый для теста
        return 0;
      });

      await options.nth(correctIdx).click();
      await page.waitForTimeout(500);

      const nextBtn = page.locator('#ke-next-btn');
      if (await nextBtn.isVisible().catch(() => false)) {
        await nextBtn.click();
        await page.waitForTimeout(500);
      } else {
        break;
      }

      if (page.url().includes('/result')) {
        console.log('   📊 Дошёл до результатов');
        break;
      }
    }

    // 4. На странице результатов - здесь происходит сохранение
    if (page.url().includes('/result')) {
      console.log('\n📍 Шаг 3: Страница результатов (сохранение прогресса)...');

      // Ждём сетевых запросов к Firestore
      await page.waitForTimeout(3000);

      // Проверяем, были ли запросы
      console.log('\n📍 Сетевые запросы к Firestore:');
      // Уже логировались через page.on('response')

      // Проверяем failed requests
      if (failedRequests.length > 0) {
        console.log('\n❌ Неудачные запросы:');
        failedRequests.forEach(r => console.log(`   ${r.url} - ${r.failure}`));
      }

      // Проверяем результат
      const score = await page.locator('.ke-result__digits').textContent().catch(() => '?');
      console.log(`\n📊 Результат: ${score}`);

      // Инжектируем код для прямого вызова и логирования
      console.log('\n📍 Шаг 4: Прямой тест сохранения прогресса...');

      const saveResult = await page.evaluate(async (studentId) => {
        try {
          // Импортируем модуль
          const db = await import('/assets/js/db.js');

          // Пробуем сохранить тестовый прогресс
          const result = await db.saveTopicProgress(studentId, 'test_topic', {
            score: 5,
            maxScore: 10
          });

          return { success: true, result };
        } catch (error) {
          return { success: false, error: error.message, stack: error.stack };
        }
      }, session?.id);

      console.log('📦 Результат прямого сохранения:', JSON.stringify(saveResult, null, 2));

      // Возвращаемся домой и проверяем
      console.log('\n📍 Шаг 5: Проверяю сохранение...');
      await page.locator('a:has-text("К темам")').click();
      await page.waitForSelector('.ke-topic-card', { timeout: 10000 });
      await page.waitForTimeout(2000);

      // Проверяем прогресс через evaluate
      const progressCheck = await page.evaluate(async (studentId) => {
        try {
          const db = await import('/assets/js/db.js');
          const stats = await db.getStudentStats(studentId);
          const isFirebase = db.isFirebaseMode();
          return { success: true, stats, isFirebase };
        } catch (error) {
          return { success: false, error: error.message };
        }
      }, session?.id);

      console.log('📊 Проверка прогресса:', JSON.stringify(progressCheck, null, 2));
    }

  } catch (error) {
    console.error('\n❌ Ошибка:', error.message);
  } finally {
    console.log('\n⏳ Закрываю через 5 сек...');
    await page.waitForTimeout(5000);
    await browser.close();
  }
})();
