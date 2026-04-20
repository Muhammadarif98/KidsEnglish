// firebase-config.js
//
// Конфигурация Firebase для проекта kidsenglish-51c58.
//
// ВНИМАНИЕ: эти ключи — публичные. Firebase Web API key не является
// секретом; доступ к БД контролируется через `firestore.rules` + Firebase
// Authentication, а не через сокрытие ключей. Не переживайте, что они
// видны в исходниках — так и задумано.
//
// Если нужно пересоздать / поменять эти значения, сходите:
//   Firebase Console → ⚙ Project Settings → раздел "Your apps" →
//   блок "SDK setup and configuration" → вариант "Config".

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD7cr8y8a5LVI5Ieb71zgUbcZLRG8gbFQ0",
  authDomain: "kidsenglish-51c58.firebaseapp.com",
  projectId: "kidsenglish-51c58",
  storageBucket: "kidsenglish-51c58.firebasestorage.app",
  messagingSenderId: "421545798249",
  appId: "1:421545798249:web:b8747c54d02dcdef2710f8",
  measurementId: "G-89KVTRDLTX",
};

// Переключатель режима — выставляется автоматически на основании того,
// заполнен ли apiKey. Сейчас apiKey заполнен, поэтому сайт будет
// работать в Firestore-режиме (данные из Firebase, а не localStorage).
export const IS_FIREBASE_ENABLED = Boolean(FIREBASE_CONFIG.apiKey);
