// test-session.js — Проверка сессии и прогресса
const { chromium } = require('playwright');

const TARGET_URL = 'https://kidsenglish-51c58.web.app';
const CLASS_CODE = 'K422X8';
const STUDENT_PASSWORD = 'cloud85';

(async () => {
  console.log('🚀 Запускаю браузер...');
  const browser = await chromium.launch({ headless: false, slowMo: 200 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Собираем console.log и errors
  const consoleLogs = [];
  const consoleErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    } else {
      consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(`PAGE ERROR: ${err.message}`);
  });

  try {
    // 1. Логин
    console.log('\n📍 Логинюсь...');
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
    const inputs = page.locator('input');
    await inputs.first().fill(CLASS_CODE);
    await inputs.nth(1).fill(STUDENT_PASSWORD);
    await page.locator('button').first().click();

    // 2. Ждём загрузку класса
    await page.waitForSelector('.ke-topic-card', { timeout: 15000 });
    await page.waitForTimeout(2000);

    // 3. Проверяем sessionStorage
    console.log('\n📍 Проверяю sessionStorage...');
    const sessionData = await page.evaluate(() => {
      const session = sessionStorage.getItem('ke_student_session');
      return session ? JSON.parse(session) : null;
    });
    console.log('📦 Сессия ученика:', JSON.stringify(sessionData, null, 2));

    if (!sessionData || !sessionData.id) {
      console.log('❌ ПРОБЛЕМА: Сессия не создана или нет ID!');
    } else {
      console.log('✅ Сессия есть, ID:', sessionData.id);
    }

    // 4. Проходим тему полностью с правильными ответами
    console.log('\n📍 Прохожу тему "Цвета" (проще угадать)...');

    // Находим тему Цвета
    const colorTopic = page.locator('.ke-topic-card:has-text("Цвета")');
    if (await colorTopic.count() > 0) {
      await colorTopic.click();
      await page.waitForSelector('.ke-answer', { timeout: 10000 });
      await page.waitForTimeout(1000);

      // Проходим упражнения - угадываем ответы
      for (let i = 0; i < 10; i++) {
        const options = page.locator('.ke-answer:not([disabled])');
        const count = await options.count();
        if (count === 0) break;

        // Получаем текст вопроса чтобы угадать правильный ответ
        const questionText = await page.locator('.ke-qcard__q').textContent().catch(() => '');
        console.log(`   Вопрос ${i + 1}: ${questionText.trim().substring(0, 30)}`);

        // Простая эвристика для цветов
        let answerIdx = 0;
        const optionTexts = await options.allTextContents();

        if (questionText.includes('Red')) answerIdx = optionTexts.findIndex(t => t.includes('Красный'));
        else if (questionText.includes('Blue')) answerIdx = optionTexts.findIndex(t => t.includes('Синий'));
        else if (questionText.includes('Green')) answerIdx = optionTexts.findIndex(t => t.includes('Зелёный'));
        else if (questionText.includes('Yellow')) answerIdx = optionTexts.findIndex(t => t.includes('Жёлтый'));
        else if (questionText.includes('sun')) answerIdx = optionTexts.findIndex(t => t.includes('yellow'));
        else if (questionText.includes('grass')) answerIdx = optionTexts.findIndex(t => t.includes('green'));
        else if (questionText.includes('sky')) answerIdx = optionTexts.findIndex(t => t.includes('blue'));

        if (answerIdx < 0) answerIdx = 0;

        await options.nth(answerIdx).click();
        await page.waitForTimeout(800);

        const nextBtn = page.locator('#ke-next-btn');
        if (await nextBtn.isVisible().catch(() => false)) {
          await nextBtn.click();
          await page.waitForTimeout(800);
        }

        if (page.url().includes('/result')) {
          console.log('   📊 Дошёл до результатов!');
          break;
        }
      }

      // 5. Страница результатов
      if (page.url().includes('/result')) {
        await page.waitForTimeout(2000);
        await page.screenshot({ path: '/tmp/session-result.png', fullPage: true });

        const score = await page.locator('.ke-result__digits').textContent().catch(() => '?');
        console.log(`\n📊 Результат: ${score}`);

        // Проверяем console errors
        console.log('\n📍 Ошибки в консоли:');
        if (consoleErrors.length === 0) {
          console.log('   Нет ошибок');
        } else {
          consoleErrors.forEach(e => console.log(`   ❌ ${e}`));
        }

        // 6. Возвращаемся и проверяем прогресс
        console.log('\n📍 Возвращаюсь к темам...');
        await page.locator('a:has-text("К темам")').click();
        await page.waitForSelector('.ke-topic-card', { timeout: 10000 });
        await page.waitForTimeout(2000);

        // Проверяем статистику
        const statsText = await page.locator('.ke-stats-card').first().textContent().catch(() => '');
        console.log(`📊 Статистика: ${statsText}`);

        // Проверяем пройденные темы
        const completedCount = await page.locator('.ke-topic-card--completed').count();
        console.log(`✅ Пройдено тем: ${completedCount}`);

        await page.screenshot({ path: '/tmp/session-after.png', fullPage: true });

        // Проверяем localStorage/sessionStorage на прогресс
        const progressData = await page.evaluate(() => {
          return {
            localStorage: Object.keys(localStorage).filter(k => k.includes('progress') || k.includes('ke_')),
            sessionStorage: Object.keys(sessionStorage)
          };
        });
        console.log('\n📦 Данные в storage:', JSON.stringify(progressData, null, 2));
      }
    }

    console.log('\n📍 Все логи консоли:');
    consoleLogs.slice(-10).forEach(l => console.log(`   ${l}`));

  } catch (error) {
    console.error('\n❌ Ошибка:', error.message);
    await page.screenshot({ path: '/tmp/session-error.png', fullPage: true });

    console.log('\n📍 Ошибки консоли:');
    consoleErrors.forEach(e => console.log(`   ❌ ${e}`));
  } finally {
    console.log('\n⏳ Закрываю через 5 сек...');
    await page.waitForTimeout(5000);
    await browser.close();
  }
})();
