// reseed-teacher.js
// Скрипт для пересидирования контента учителя
// Запускать в консоли браузера на странице kidsenglish-51c58.web.app
// после логина как учитель

(async function reseedTeacher() {
  // 1. Получаем текущего пользователя
  const { getCurrentUser } = await import('./assets/js/auth.js');
  const user = await getCurrentUser();

  if (!user) {
    console.error('Не залогинен! Сначала войдите как учитель.');
    return;
  }

  console.log('Пользователь:', user.uid);

  // 2. Импортируем Firebase
  const { initializeApp, getApps, getApp } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
  const fs = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
  const { FIREBASE_CONFIG } = await import('./assets/js/firebase-config.js');

  const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
  const db = fs.getFirestore(app);

  const uid = user.uid;

  // 3. Удаляем все существующие темы и упражнения
  console.log('Удаляем старые темы...');
  const topicsQuery = fs.query(fs.collection(db, 'topics'), fs.where('ownerId', '==', uid));
  const topicsSnap = await fs.getDocs(topicsQuery);
  console.log(`Найдено ${topicsSnap.size} тем для удаления`);

  for (const doc of topicsSnap.docs) {
    await fs.deleteDoc(doc.ref);
  }
  console.log('Темы удалены');

  console.log('Удаляем старые упражнения...');
  const exQuery = fs.query(fs.collection(db, 'exercises'), fs.where('ownerId', '==', uid));
  const exSnap = await fs.getDocs(exQuery);
  console.log(`Найдено ${exSnap.size} упражнений для удаления`);

  for (const doc of exSnap.docs) {
    await fs.deleteDoc(doc.ref);
  }
  console.log('Упражнения удалены');

  // 4. Очищаем localStorage флаг сидирования
  const seededKey = 'ke_seeded_sets_v2';
  const seededRaw = localStorage.getItem(seededKey);
  if (seededRaw) {
    try {
      const seeded = JSON.parse(seededRaw);
      const newSeeded = seeded.filter(id => id !== uid);
      localStorage.setItem(seededKey, JSON.stringify(newSeeded));
      console.log('Очищен флаг сидирования в localStorage');
    } catch (e) {
      localStorage.removeItem(seededKey);
    }
  }

  // 5. Загружаем seed данные
  console.log('Загружаем seed данные...');
  const { SEED_TOPICS, SEED_EXERCISES } = await import('./assets/js/seed.js');
  console.log(`SEED_TOPICS: ${SEED_TOPICS.length} тем`);
  console.log(`SEED_EXERCISES: ${SEED_EXERCISES.length} упражнений`);

  // 6. Записываем новые данные batch'ами по 400 операций (лимит 500)
  const BATCH_SIZE = 400;
  const tsuffix = Date.now().toString(36).slice(-4);
  const uidPrefix = uid.slice(0, 8);
  const topicIdMap = {};

  // Создаём маппинг ID тем
  for (const t of SEED_TOPICS) {
    topicIdMap[t.id] = `${uidPrefix}_${t.id}_${tsuffix}`;
  }

  // Собираем все операции
  const allOps = [];

  for (const t of SEED_TOPICS) {
    allOps.push({
      type: 'topic',
      id: topicIdMap[t.id],
      data: {
        ownerId: uid,
        title: t.title,
        emoji: t.emoji,
        order: t.order,
        enabled: t.enabled,
      }
    });
  }

  for (const e of SEED_EXERCISES) {
    allOps.push({
      type: 'exercise',
      id: `${uidPrefix}_${e.id}_${tsuffix}`,
      data: {
        ownerId: uid,
        topicId: topicIdMap[e.topicId],
        type: e.type,
        order: e.order,
        question: e.question,
        options: e.options,
        answer: e.answer,
        explanation: e.explanation,
        imageUrl: e.imageUrl,
      }
    });
  }

  console.log(`Всего операций: ${allOps.length}`);

  // Выполняем batch'ами
  for (let i = 0; i < allOps.length; i += BATCH_SIZE) {
    const chunk = allOps.slice(i, i + BATCH_SIZE);
    const batch = fs.writeBatch(db);

    for (const op of chunk) {
      const collection = op.type === 'topic' ? 'topics' : 'exercises';
      batch.set(fs.doc(db, collection, op.id), op.data);
    }

    await batch.commit();
    console.log(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: записано ${chunk.length} документов`);
  }

  // 7. Отмечаем как засидированного
  const seeded = JSON.parse(localStorage.getItem(seededKey) || '[]');
  if (!seeded.includes(uid)) {
    seeded.push(uid);
    localStorage.setItem(seededKey, JSON.stringify(seeded));
  }

  console.log('');
  console.log('='.repeat(50));
  console.log('ГОТОВО! Перезагрузите страницу чтобы увидеть все 24 темы.');
  console.log('='.repeat(50));
})();
