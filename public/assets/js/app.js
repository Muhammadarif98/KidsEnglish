// app.js — Entry point. Wires router with page modules for the multi-tenant site.
//
// URL структура:
//
//   Детская часть:
//     /                                  — landing с полем "код класса"
//     /class/:code                        — список тем класса
//     /class/:code/topic/:id              — задания
//     /class/:code/topic/:id/result       — результат
//     /course                               — курс A1→A2 (общий)
//     /class/:code/course                   — курс A1→A2 (привязка к классу)
//
//   Преподавательская часть:
//     /teacher                            — вход / регистрация (табы)
//     /teacher/topics                     — CRUD тем препода
//     /teacher/topics/:id                 — редактор заданий в теме
//
//   Legacy (для удобства перехода):
//     /admin, /dashboard                  → /teacher

import * as router from './router.js';
import { IS_FIREBASE_ENABLED } from './firebase-config.js';

window.__keFirebaseOn = IS_FIREBASE_ENABLED;

router.add('/',                                   () => import('./pages/landing.js').then(m => m.renderLanding()));

router.add('/class/:code',                        (ctx) => import('./pages/class-home.js').then(m => m.renderClassHome(ctx.params.code)));
router.add('/class/:code/topic/:id',              (ctx) => import('./pages/topic.js').then(m => m.renderTopic(ctx.params.code, ctx.params.id)));
router.add('/class/:code/topic/:id/result',       (ctx) => import('./pages/result.js').then(m => m.renderResult(ctx.params.code, ctx.params.id)));

router.add('/course',                             () => import('./pages/course.js').then(m => m.renderCourse()));
router.add('/class/:code/course',                 (ctx) => import('./pages/course.js').then(m => m.renderCourse(ctx.params.code)));

router.add('/teacher',                            () => import('./pages/teacher-auth.js').then(m => m.renderTeacherAuth()));
router.add('/teacher/topics',                     () => import('./pages/teacher-topics.js').then(m => m.renderTeacherTopics()));
router.add('/teacher/topics/:id',                 (ctx) => import('./pages/teacher-editor.js').then(m => m.renderTeacherEditor(ctx.params.id)));
router.add('/teacher/students',                   () => import('./pages/teacher-students.js').then(m => m.renderTeacherStudents()));
router.add('/teacher/profile',                    () => import('./pages/teacher-profile.js').then(m => m.renderTeacherProfile()));

// Legacy redirects
router.add('/admin',                              () => router.navigate('/teacher', { replace: true }));
router.add('/admin/topics',                       () => router.navigate('/teacher/topics', { replace: true }));
router.add('/dashboard',                          () => router.navigate('/teacher', { replace: true }));

router.start();

window.addEventListener('unhandledrejection', (e) => {
  console.error('[KidsEnglish] Unhandled:', e.reason);
});
