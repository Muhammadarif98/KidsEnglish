// db.js — Multi-tenant data access layer.
//
// Схема Firestore:
//   teachers/{uid}       — профиль преподавателя (displayName, email, classCode)
//   classCodes/{CODE}    — публичный справочник: код класса → uid препода
//   topics/{id}          — тема (с ownerId — uid создателя)
//   exercises/{id}       — задание (topicId, ownerId)
//
// В локальном demo-режиме (без firebase-config) всё работает в одном юзере
// с фиктивным UID `local-teacher` и кодом класса `DEMO01`.

import { FIREBASE_CONFIG, IS_FIREBASE_ENABLED } from './firebase-config.js';
import { SEED_TOPICS, SEED_EXERCISES } from './seed.js';

// Local mode — single pseudo-teacher with a fixed code
const LOCAL_TEACHER_UID = 'local-teacher';
const LOCAL_TEACHER_CODE = 'DEMO01';

const LS = {
  teachers: 'ke_teachers_v2',
  codes: 'ke_codes_v2',
  topics: 'ke_topics_v2',
  exercises: 'ke_exercises_v2',
  seededSets: 'ke_seeded_sets_v2',
  students: 'ke_students_v2',
  progress: 'ke_progress_v2',
};

// ─── Password generator (simple words for kids) ───
const PASSWORD_WORDS = [
  // Животные (легко запомнить)
  'apple', 'banana', 'cherry', 'grape', 'lemon', 'mango', 'orange', 'peach',
  'tiger', 'lion', 'bear', 'wolf', 'fox', 'rabbit', 'panda', 'koala',
  'star', 'moon', 'sun', 'cloud', 'rain', 'snow', 'wind', 'storm',
  'happy', 'funny', 'sunny', 'lucky', 'brave', 'smart', 'cool', 'super',
  'red', 'blue', 'green', 'pink', 'gold', 'silver', 'ruby', 'jade',
  'rocket', 'robot', 'ninja', 'pirate', 'wizard', 'dragon', 'phoenix', 'unicorn',
];

export function generateStudentPassword() {
  const word = PASSWORD_WORDS[Math.floor(Math.random() * PASSWORD_WORDS.length)];
  const num = Math.floor(Math.random() * 90) + 10; // 10-99
  return `${word}${num}`;
}

// ─── Firebase lazy-init ───
let _fbReady = null;
async function fb() {
  if (!IS_FIREBASE_ENABLED) return null;
  if (_fbReady) return _fbReady;
  _fbReady = (async () => {
    const [{ initializeApp, getApps, getApp }, fs] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js'),
    ]);
    const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
    return { app, fs, db: fs.getFirestore(app) };
  })();
  return _fbReady;
}

// ─── Local storage helpers ───
function lsRead(key) { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } }
function lsWrite(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function lsReadObj(key) { try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch { return {}; } }
function lsWriteObj(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function makeId(prefix) { return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`; }

// ─── Class code generator (32 chars, excludes confusable O/0/I/1) ───
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function randomCode(len = 6) {
  let out = '';
  for (let i = 0; i < len; i++) out += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  return out;
}
export async function generateUniqueClassCode() {
  for (let i = 0; i < 10; i++) {
    const code = randomCode(6);
    const t = await getTeacherByCode(code);
    if (!t) return code;
  }
  throw new Error('Could not generate unique class code');
}

// ─── Teachers ───
export async function getTeacher(uid) {
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    const snap = await fs.getDoc(fs.doc(db, 'teachers', uid));
    return snap.exists() ? { uid: snap.id, ...snap.data() } : null;
  }
  const all = lsReadObj(LS.teachers);
  return all[uid] || null;
}

export async function getTeacherByCode(code) {
  code = String(code || '').toUpperCase().trim();
  if (!code) return null;
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    const codeSnap = await fs.getDoc(fs.doc(db, 'classCodes', code));
    if (!codeSnap.exists()) return null;
    return getTeacher(codeSnap.data().ownerId);
  }
  const codes = lsReadObj(LS.codes);
  const ownerId = codes[code];
  if (!ownerId) return null;
  return getTeacher(ownerId);
}

export async function createTeacher(uid, { displayName, email }) {
  const classCode = await generateUniqueClassCode();
  const doc = {
    displayName: displayName || 'Преподаватель',
    email: email || '',
    classCode,
    createdAt: Date.now(),
  };
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    const batch = fs.writeBatch(db);
    batch.set(fs.doc(db, 'teachers', uid), doc);
    batch.set(fs.doc(db, 'classCodes', classCode), { ownerId: uid, teacherName: doc.displayName });
    await batch.commit();
    return { uid, ...doc };
  }
  const teachers = lsReadObj(LS.teachers);
  teachers[uid] = { uid, ...doc };
  lsWriteObj(LS.teachers, teachers);
  const codes = lsReadObj(LS.codes);
  codes[classCode] = uid;
  lsWriteObj(LS.codes, codes);
  return { uid, ...doc };
}

export async function updateTeacher(uid, patch) {
  const safePatch = { ...patch };
  delete safePatch.uid;
  delete safePatch.classCode; // код класса не меняется
  delete safePatch.createdAt;

  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    await fs.updateDoc(fs.doc(db, 'teachers', uid), safePatch);
    // Обновляем имя в classCodes если изменилось displayName
    if (safePatch.displayName) {
      const teacher = await getTeacher(uid);
      if (teacher?.classCode) {
        await fs.updateDoc(fs.doc(db, 'classCodes', teacher.classCode), { teacherName: safePatch.displayName });
      }
    }
    const snap = await fs.getDoc(fs.doc(db, 'teachers', uid));
    return { uid: snap.id, ...snap.data() };
  }
  const teachers = lsReadObj(LS.teachers);
  if (!teachers[uid]) throw new Error('Teacher not found');
  teachers[uid] = { ...teachers[uid], ...safePatch };
  lsWriteObj(LS.teachers, teachers);
  return teachers[uid];
}

/** Copies seed topics + exercises into a teacher's account. Idempotent. */
export async function ensureTeacherSeeded(uid) {
  const seededSet = new Set(lsRead(LS.seededSets));
  if (seededSet.has(uid)) return;

  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    // Skip if they already have topics
    const q = fs.query(fs.collection(db, 'topics'), fs.where('ownerId', '==', uid));
    const existing = await fs.getDocs(q);
    if (!existing.empty) {
      seededSet.add(uid); lsWrite(LS.seededSets, [...seededSet]);
      return;
    }
    const batch = fs.writeBatch(db);
    const topicIdMap = {};
    const tsuffix = Date.now().toString(36).slice(-4);
    const uidPrefix = uid.slice(0, 8);
    for (const t of SEED_TOPICS) {
      const newId = `${uidPrefix}_${t.id}_${tsuffix}`;
      topicIdMap[t.id] = newId;
      batch.set(fs.doc(db, 'topics', newId), {
        ownerId: uid,
        title: t.title, emoji: t.emoji, order: t.order, enabled: t.enabled,
      });
    }
    for (const e of SEED_EXERCISES) {
      const newId = `${uidPrefix}_${e.id}_${tsuffix}`;
      batch.set(fs.doc(db, 'exercises', newId), {
        ownerId: uid,
        topicId: topicIdMap[e.topicId],
        type: e.type, order: e.order, question: e.question,
        options: e.options, answer: e.answer, explanation: e.explanation,
        imageUrl: e.imageUrl,
      });
    }
    await batch.commit();
    seededSet.add(uid); lsWrite(LS.seededSets, [...seededSet]);
    return;
  }

  // Local mode
  const topicIdMap = {};
  const topics = lsRead(LS.topics);
  for (const t of SEED_TOPICS) {
    const newId = `${uid}_${t.id}`;
    topicIdMap[t.id] = newId;
    topics.push({ id: newId, ownerId: uid, title: t.title, emoji: t.emoji, order: t.order, enabled: t.enabled });
  }
  lsWrite(LS.topics, topics);
  const exercises = lsRead(LS.exercises);
  for (const e of SEED_EXERCISES) {
    const newId = `${uid}_${e.id}`;
    exercises.push({
      id: newId, ownerId: uid, topicId: topicIdMap[e.topicId],
      type: e.type, order: e.order, question: e.question,
      options: e.options, answer: e.answer, explanation: e.explanation,
      imageUrl: e.imageUrl,
    });
  }
  lsWrite(LS.exercises, exercises);
  seededSet.add(uid); lsWrite(LS.seededSets, [...seededSet]);
}

async function ensureLocalTeacher() {
  if (IS_FIREBASE_ENABLED) return;
  const existing = await getTeacher(LOCAL_TEACHER_UID);
  if (existing) return;
  const doc = {
    displayName: 'Demo Teacher',
    email: 'demo@kidsenglish.app',
    classCode: LOCAL_TEACHER_CODE,
    createdAt: Date.now(),
  };
  const teachers = lsReadObj(LS.teachers);
  teachers[LOCAL_TEACHER_UID] = { uid: LOCAL_TEACHER_UID, ...doc };
  lsWriteObj(LS.teachers, teachers);
  const codes = lsReadObj(LS.codes);
  codes[LOCAL_TEACHER_CODE] = LOCAL_TEACHER_UID;
  lsWriteObj(LS.codes, codes);
  await ensureTeacherSeeded(LOCAL_TEACHER_UID);
}

// ─── Topics ───
export async function listTopics({ ownerId, onlyEnabled = false } = {}) {
  if (!ownerId) throw new Error('listTopics: ownerId required');
  await ensureLocalTeacher();
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    const q = fs.query(fs.collection(db, 'topics'), fs.where('ownerId', '==', ownerId));
    const snap = await fs.getDocs(q);
    const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return onlyEnabled ? arr.filter(t => t.enabled !== false) : arr;
  }
  const arr = lsRead(LS.topics).filter(t => t.ownerId === ownerId)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return onlyEnabled ? arr.filter(t => t.enabled !== false) : arr;
}

export async function getTopic(id) {
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    const snap = await fs.getDoc(fs.doc(db, 'topics', id));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  }
  await ensureLocalTeacher();
  return lsRead(LS.topics).find(t => t.id === id) || null;
}

export async function createTopic(ownerId, payload) {
  if (!ownerId) throw new Error('createTopic: ownerId required');
  const id = payload.id || makeId('topic');
  const doc = {
    ownerId,
    title: payload.title || 'Новая тема',
    emoji: payload.emoji || '🌟',
    order: Number.isFinite(payload.order) ? payload.order : 999,
    enabled: payload.enabled !== false,
  };
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    await fs.setDoc(fs.doc(db, 'topics', id), doc);
    return { id, ...doc };
  }
  const list = lsRead(LS.topics);
  list.push({ id, ...doc });
  lsWrite(LS.topics, list);
  return { id, ...doc };
}

export async function updateTopic(id, ownerId, patch) {
  const safePatch = { ...patch };
  delete safePatch.ownerId;
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    await fs.updateDoc(fs.doc(db, 'topics', id), safePatch);
    const snap = await fs.getDoc(fs.doc(db, 'topics', id));
    return { id: snap.id, ...snap.data() };
  }
  const list = lsRead(LS.topics);
  const idx = list.findIndex(t => t.id === id && t.ownerId === ownerId);
  if (idx < 0) throw new Error('Topic not found or not yours');
  list[idx] = { ...list[idx], ...safePatch };
  lsWrite(LS.topics, list);
  return list[idx];
}

export async function deleteTopic(id, ownerId) {
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    await fs.deleteDoc(fs.doc(db, 'topics', id));
    const q = fs.query(fs.collection(db, 'exercises'),
      fs.where('topicId', '==', id), fs.where('ownerId', '==', ownerId));
    const snap = await fs.getDocs(q);
    await Promise.all(snap.docs.map(d => fs.deleteDoc(d.ref)));
    return;
  }
  lsWrite(LS.topics, lsRead(LS.topics).filter(t => !(t.id === id && t.ownerId === ownerId)));
  lsWrite(LS.exercises, lsRead(LS.exercises).filter(e => !(e.topicId === id && e.ownerId === ownerId)));
}

// ─── Exercises ───
export async function listExercises({ ownerId, topicId }) {
  if (!ownerId || !topicId) throw new Error('listExercises: ownerId and topicId required');
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    const q = fs.query(fs.collection(db, 'exercises'),
      fs.where('ownerId', '==', ownerId), fs.where('topicId', '==', topicId));
    const snap = await fs.getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
  return lsRead(LS.exercises)
    .filter(e => e.ownerId === ownerId && e.topicId === topicId)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getExercise(id) {
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    const snap = await fs.getDoc(fs.doc(db, 'exercises', id));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  }
  return lsRead(LS.exercises).find(e => e.id === id) || null;
}

export async function createExercise(ownerId, payload) {
  if (!ownerId) throw new Error('createExercise: ownerId required');
  const id = payload.id || makeId('ex');
  const doc = {
    ownerId,
    topicId: payload.topicId,
    type: payload.type === 'B' ? 'B' : 'A',
    order: Number.isFinite(payload.order) ? payload.order : 999,
    question: payload.question || '',
    options: Array.isArray(payload.options) ? payload.options : ['', '', '', ''],
    answer: Number.isFinite(payload.answer) ? payload.answer : 0,
    explanation: payload.explanation || '',
    imageUrl: payload.imageUrl || '',
  };
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    await fs.setDoc(fs.doc(db, 'exercises', id), doc);
    return { id, ...doc };
  }
  const list = lsRead(LS.exercises);
  list.push({ id, ...doc });
  lsWrite(LS.exercises, list);
  return { id, ...doc };
}

export async function updateExercise(id, ownerId, patch) {
  const safePatch = { ...patch };
  delete safePatch.ownerId;
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    await fs.updateDoc(fs.doc(db, 'exercises', id), safePatch);
    const snap = await fs.getDoc(fs.doc(db, 'exercises', id));
    return { id: snap.id, ...snap.data() };
  }
  const list = lsRead(LS.exercises);
  const idx = list.findIndex(e => e.id === id && e.ownerId === ownerId);
  if (idx < 0) throw new Error('Exercise not found or not yours');
  list[idx] = { ...list[idx], ...safePatch };
  lsWrite(LS.exercises, list);
  return list[idx];
}

export async function deleteExercise(id, ownerId) {
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    await fs.deleteDoc(fs.doc(db, 'exercises', id));
    return;
  }
  lsWrite(LS.exercises, lsRead(LS.exercises).filter(e => !(e.id === id && e.ownerId === ownerId)));
}

export async function reorderExercises(ownerId, topicId, orderedIds) {
  const updates = orderedIds.map((id, i) => updateExercise(id, ownerId, { order: i + 1 }));
  await Promise.all(updates);
}

export function isFirebaseMode() { return IS_FIREBASE_ENABLED; }
export const LOCAL_DEMO_CODE = LOCAL_TEACHER_CODE;

// ─── Students (учеченики класса) ───
// Схема: students/{id} — { id, classCode, firstName, lastName, password, createdAt }

export async function listStudents(classCode) {
  if (!classCode) throw new Error('listStudents: classCode required');
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    const q = fs.query(fs.collection(db, 'students'), fs.where('classCode', '==', classCode));
    const snap = await fs.getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (a.lastName || '').localeCompare(b.lastName || '', 'ru'));
  }
  return lsRead(LS.students)
    .filter(s => s.classCode === classCode)
    .sort((a, b) => (a.lastName || '').localeCompare(b.lastName || '', 'ru'));
}

export async function getStudentByPassword(classCode, password) {
  if (!classCode || !password) return null;
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    const q = fs.query(
      fs.collection(db, 'students'),
      fs.where('classCode', '==', classCode),
      fs.where('password', '==', password)
    );
    const snap = await fs.getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() };
  }
  return lsRead(LS.students).find(s => s.classCode === classCode && s.password === password) || null;
}

export async function getStudent(id) {
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    const snap = await fs.getDoc(fs.doc(db, 'students', id));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  }
  return lsRead(LS.students).find(s => s.id === id) || null;
}

export async function createStudent(classCode, { firstName, lastName }) {
  if (!classCode) throw new Error('createStudent: classCode required');
  const id = makeId('stu');
  const password = generateStudentPassword();
  const doc = {
    classCode,
    firstName: firstName || '',
    lastName: lastName || '',
    password,
    createdAt: Date.now(),
  };
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    await fs.setDoc(fs.doc(db, 'students', id), doc);
    return { id, ...doc };
  }
  const list = lsRead(LS.students);
  list.push({ id, ...doc });
  lsWrite(LS.students, list);
  return { id, ...doc };
}

export async function updateStudent(id, patch) {
  const safePatch = { ...patch };
  delete safePatch.id;
  delete safePatch.classCode; // нельзя переносить в другой класс
  delete safePatch.password;  // пароль генерируется автоматически

  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    await fs.updateDoc(fs.doc(db, 'students', id), safePatch);
    const snap = await fs.getDoc(fs.doc(db, 'students', id));
    return { id: snap.id, ...snap.data() };
  }
  const list = lsRead(LS.students);
  const idx = list.findIndex(s => s.id === id);
  if (idx < 0) throw new Error('Student not found');
  list[idx] = { ...list[idx], ...safePatch };
  lsWrite(LS.students, list);
  return list[idx];
}

export async function deleteStudent(id) {
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    await fs.deleteDoc(fs.doc(db, 'students', id));
    // Удаляем прогресс ученика
    const q = fs.query(fs.collection(db, 'progress'), fs.where('studentId', '==', id));
    const snap = await fs.getDocs(q);
    await Promise.all(snap.docs.map(d => fs.deleteDoc(d.ref)));
    return;
  }
  lsWrite(LS.students, lsRead(LS.students).filter(s => s.id !== id));
  lsWrite(LS.progress, lsRead(LS.progress).filter(p => p.studentId !== id));
}

export async function regenerateStudentPassword(id) {
  const newPassword = generateStudentPassword();
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    await fs.updateDoc(fs.doc(db, 'students', id), { password: newPassword });
    const snap = await fs.getDoc(fs.doc(db, 'students', id));
    return { id: snap.id, ...snap.data() };
  }
  const list = lsRead(LS.students);
  const idx = list.findIndex(s => s.id === id);
  if (idx < 0) throw new Error('Student not found');
  list[idx].password = newPassword;
  lsWrite(LS.students, list);
  return list[idx];
}

// ─── Progress (прогресс учеников) ───
// Схема: progress/{id} — { studentId, topicId, score, maxScore, stars, completedAt }

export async function getStudentProgress(studentId) {
  if (!studentId) return [];
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    const q = fs.query(fs.collection(db, 'progress'), fs.where('studentId', '==', studentId));
    const snap = await fs.getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
  return lsRead(LS.progress).filter(p => p.studentId === studentId);
}

export async function getTopicProgress(studentId, topicId) {
  if (!studentId || !topicId) return null;
  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    const q = fs.query(
      fs.collection(db, 'progress'),
      fs.where('studentId', '==', studentId),
      fs.where('topicId', '==', topicId)
    );
    const snap = await fs.getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() };
  }
  return lsRead(LS.progress).find(p => p.studentId === studentId && p.topicId === topicId) || null;
}

export async function saveTopicProgress(studentId, topicId, { score, maxScore }) {
  if (!studentId || !topicId) throw new Error('saveTopicProgress: studentId and topicId required');

  // Рассчитываем звёзды: 3 за 100%, 2 за >=70%, 1 за >=50%, 0 иначе
  const percent = maxScore > 0 ? (score / maxScore) * 100 : 0;
  let stars = 0;
  if (percent >= 100) stars = 3;
  else if (percent >= 70) stars = 2;
  else if (percent >= 50) stars = 1;

  const ctx = await fb();
  if (ctx) {
    const { fs, db } = ctx;
    // Проверяем, есть ли уже запись
    const q = fs.query(
      fs.collection(db, 'progress'),
      fs.where('studentId', '==', studentId),
      fs.where('topicId', '==', topicId)
    );
    const snap = await fs.getDocs(q);

    if (!snap.empty) {
      // Обновляем только если результат лучше
      const existing = snap.docs[0];
      const existingData = existing.data();
      if (stars > existingData.stars || (stars === existingData.stars && score > existingData.score)) {
        await fs.updateDoc(existing.ref, { score, maxScore, stars, completedAt: Date.now() });
        return { id: existing.id, studentId, topicId, score, maxScore, stars };
      }
      return { id: existing.id, ...existingData };
    }

    // Создаём новую запись
    const id = makeId('prog');
    const doc = { studentId, topicId, score, maxScore, stars, completedAt: Date.now() };
    await fs.setDoc(fs.doc(db, 'progress', id), doc);
    return { id, ...doc };
  }

  // Local mode
  const list = lsRead(LS.progress);
  const idx = list.findIndex(p => p.studentId === studentId && p.topicId === topicId);

  if (idx >= 0) {
    const existing = list[idx];
    if (stars > existing.stars || (stars === existing.stars && score > existing.score)) {
      list[idx] = { ...existing, score, maxScore, stars, completedAt: Date.now() };
      lsWrite(LS.progress, list);
      return list[idx];
    }
    return existing;
  }

  const id = makeId('prog');
  const doc = { id, studentId, topicId, score, maxScore, stars, completedAt: Date.now() };
  list.push(doc);
  lsWrite(LS.progress, list);
  return doc;
}

export async function getStudentStats(studentId) {
  const progress = await getStudentProgress(studentId);
  const totalStars = progress.reduce((sum, p) => sum + (p.stars || 0), 0);
  // Тема считается пройденной если есть любая запись прогресса (даже с 0 звёзд)
  const completedTopics = progress.length;
  return { totalStars, completedTopics, progress };
}
