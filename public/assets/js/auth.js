// auth.js — Teacher authentication.
//
// API:
//   signUpEmail(email, password, displayName) — регистрация преподавателя
//   signInEmail(email, password)              — вход по email/паролю
//   signInGoogle()                            — вход/регистрация через Google (popup)
//   signOut()
//   getCurrentUser()                          — { uid, email, displayName } | null
//   onAuthStateChange(cb)                     — подписка на изменения
//
// На первом входе (signUp или Google-регистрация) автоматически создаётся
// документ teachers/{uid} с уникальным classCode и заливается seed-контент.

import { FIREBASE_CONFIG, IS_FIREBASE_ENABLED } from './firebase-config.js';
import { getTeacher, createTeacher, ensureTeacherSeeded } from './db.js';

const LOCAL_TEACHER_UID = 'local-teacher';
const LS_LOCAL_SESSION = 'ke_local_session_v2';

// ─── Firebase lazy-init ───
let _fbReady = null;
async function authCtx() {
  if (!IS_FIREBASE_ENABLED) return null;
  if (_fbReady) return _fbReady;
  _fbReady = (async () => {
    const [{ initializeApp, getApps, getApp }, auth] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js'),
    ]);
    const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
    const a = auth.getAuth(app);
    // 7-day persistence (aligns with ТЗ 4.1) — browserLocalPersistence lasts
    // indefinitely, but Firebase auto-refreshes tokens; the practical session
    // persists until the user clears storage or signs out.
    await auth.setPersistence(a, auth.browserLocalPersistence);
    return { app, auth: a, m: auth };
  })();
  return _fbReady;
}

/** Convert a Firebase user to our flat shape. */
function normalizeUser(u) {
  if (!u) return null;
  return {
    uid: u.uid,
    email: u.email || '',
    displayName: u.displayName || '',
  };
}

/** After any successful sign-in/up, make sure the teacher profile exists. */
async function ensureTeacherProfile(user, fallbackName) {
  let teacher = await getTeacher(user.uid);
  if (!teacher) {
    teacher = await createTeacher(user.uid, {
      displayName: user.displayName || fallbackName || deriveNameFromEmail(user.email),
      email: user.email,
    });
    await ensureTeacherSeeded(user.uid);
  }
  return teacher;
}

function deriveNameFromEmail(email) {
  if (!email) return 'Преподаватель';
  const local = email.split('@')[0] || 'Преподаватель';
  return local.replace(/[._-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ─── Public API ───
export async function signUpEmail(email, password, displayName) {
  const ctx = await authCtx();
  if (ctx) {
    const { auth, m } = ctx;
    const cred = await m.createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      try { await m.updateProfile(cred.user, { displayName }); } catch {}
    }
    await ensureTeacherProfile(normalizeUser(cred.user), displayName);
    return normalizeUser(cred.user);
  }
  // Local mode — "signup" just creates the single local teacher
  const { getTeacher: _g, createTeacher: _c } = await import('./db.js');
  let t = await _g(LOCAL_TEACHER_UID);
  if (!t) t = await _c(LOCAL_TEACHER_UID, { displayName, email });
  const user = { uid: LOCAL_TEACHER_UID, email, displayName };
  localStorage.setItem(LS_LOCAL_SESSION, JSON.stringify({ ...user, exp: Date.now() + 7 * 864e5 }));
  await ensureTeacherSeeded(LOCAL_TEACHER_UID);
  return user;
}

export async function signInEmail(email, password) {
  const ctx = await authCtx();
  if (ctx) {
    const { auth, m } = ctx;
    const cred = await m.signInWithEmailAndPassword(auth, email, password);
    // In case they registered before we had the ensureTeacherProfile step
    await ensureTeacherProfile(normalizeUser(cred.user));
    return normalizeUser(cred.user);
  }
  // Local mode — sign in as the single demo teacher (any password works,
  // this is local-only and not a security concern)
  const user = { uid: LOCAL_TEACHER_UID, email, displayName: '' };
  localStorage.setItem(LS_LOCAL_SESSION, JSON.stringify({ ...user, exp: Date.now() + 7 * 864e5 }));
  return user;
}

export async function signInGoogle() {
  const ctx = await authCtx();
  if (!ctx) {
    throw new Error('Google-вход доступен только с подключённым Firebase. Используйте email-регистрацию в локальном режиме.');
  }
  const { auth, m } = ctx;
  const provider = new m.GoogleAuthProvider();
  const cred = await m.signInWithPopup(auth, provider);
  await ensureTeacherProfile(normalizeUser(cred.user));
  return normalizeUser(cred.user);
}

export async function signOut() {
  const ctx = await authCtx();
  if (ctx) { await ctx.m.signOut(ctx.auth); return; }
  localStorage.removeItem(LS_LOCAL_SESSION);
}

export async function getCurrentUser() {
  const ctx = await authCtx();
  if (ctx) {
    return new Promise(resolve => {
      const unsub = ctx.m.onAuthStateChanged(ctx.auth, u => {
        unsub();
        resolve(normalizeUser(u));
      });
    });
  }
  const raw = localStorage.getItem(LS_LOCAL_SESSION);
  if (!raw) return null;
  try {
    const s = JSON.parse(raw);
    if (Date.now() > s.exp) { localStorage.removeItem(LS_LOCAL_SESSION); return null; }
    return { uid: s.uid, email: s.email, displayName: s.displayName };
  } catch { return null; }
}

export function onAuthStateChange(cb) {
  if (!IS_FIREBASE_ENABLED) {
    getCurrentUser().then(cb);
    return () => {};
  }
  let unsub = () => {};
  authCtx().then(({ auth, m }) => {
    unsub = m.onAuthStateChanged(auth, u => cb(normalizeUser(u)));
  });
  return () => unsub();
}

/** Translates Firebase auth error codes to Russian messages. */
export function friendlyAuthError(err) {
  const code = err?.code || '';
  const table = {
    'auth/invalid-email':            'Неверный формат email',
    'auth/email-already-in-use':     'На этот email уже зарегистрирован аккаунт',
    'auth/weak-password':            'Пароль слишком короткий (минимум 6 символов)',
    'auth/missing-password':         'Введите пароль',
    'auth/invalid-credential':       'Неверный email или пароль',
    'auth/user-not-found':           'Пользователь не найден',
    'auth/wrong-password':           'Неверный пароль',
    'auth/too-many-requests':        'Слишком много попыток. Подожди несколько минут.',
    'auth/network-request-failed':   'Нет связи с сервером. Проверь интернет.',
    'auth/popup-closed-by-user':     'Окно входа закрыто',
    'auth/cancelled-popup-request':  'Окно входа было закрыто',
    'auth/popup-blocked':            'Браузер заблокировал всплывающее окно. Разреши попапы для сайта.',
    'auth/operation-not-allowed':    'Этот способ входа не включён в Firebase. Включите его в консоли.',
  };
  for (const key of Object.keys(table)) {
    if (code.includes(key.split('/')[1])) return table[key];
  }
  return err?.message || 'Не удалось выполнить действие. Попробуй ещё раз.';
}
