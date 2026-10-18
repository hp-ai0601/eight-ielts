"use client";

import { STAGES, STARTER_VOCAB, lessonById, type Lesson } from "./content";
import { makeCard, review, dueCards, type Card, type Grade } from "./srs";
import { clampBand, overall, type Skill } from "./ielts";
import { TESTS, homeworkTests, type BankTest } from "./bank";
import { userById } from "./users";
import { answersToBand } from "./ielts";
import type { LexItem } from "./lexicon";
import { posVi } from "./pos";

const SESSION = "eight.session";

export function sessionId() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION);
}

export function setSession(id: string | null) {
  if (typeof window === "undefined") return;
  if (!id) localStorage.removeItem(SESSION);
  else localStorage.setItem(SESSION, id);
  window.dispatchEvent(new Event("eight"));
}

function KEY() {
  return `eight.v2.${sessionId() || "guest"}`;
}

export interface Bands {
  l: number;
  r: number;
  w: number;
  s: number;
}

export interface Profile {
  minutes: 20 | 40 | 60;
  stageId: (typeof STAGES)[number]["id"];
  completed: string[];
  bands: Bands;
  streak: { count: number; last: string };
  minutesToday: number;
  day: string;
  onboarding: boolean;
  userId?: string;
  userName?: string;
}

export interface Attempt {
  testId: string;
  at: number;
  ok: number;
  total: number;
  minutes: number;
}

export interface Homework {
  id: string;
  testId: string;
  title: string;
  due: string;
  done: boolean;
}

export interface ZangSentence {
  at: number;
  word: string;
  mode: "class" | "antonym";
  text: string;
  score?: number;
  rewrite?: string;
  spelling?: string[];
  grammar?: string[];
}

export interface ZangSpell {
  at: number;
  target: string;
  wrote: string;
  ok: boolean;
}

export interface ZangDraft {
  at: number;
  kind: "sentence" | "mimic" | "diary" | "spell";
  word?: string;
  text: string;
  score: number;
  spelling: string[];
  grammar: string[];
}

export interface ZangMimic {
  at: number;
  storyId: string;
  text: string;
}

export interface ZangDiary {
  at: number;
  day: string;
  text: string;
}

export interface ZangState {
  sentences: ZangSentence[];
  mimics: ZangMimic[];
  listenDone: string[];
  diaries: ZangDiary[];
  steps: Record<string, number[]>;
  spells: ZangSpell[];
  drafts: ZangDraft[];
  lots: Record<string, number>;
}

export interface State {
  profile: Profile;
  cards: Card[];
  log: { at: number; skill: string; note: string }[];
  attempts: Attempt[];
  homework: Homework[];
  testsDone: string[];
  zang: ZangState;
}

function emptyZang(): ZangState {
  return { sentences: [], mimics: [], listenDone: [], diaries: [], steps: {}, spells: [], drafts: [], lots: {} };
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function empty(): State {
  return {
    profile: {
      minutes: 40,
      stageId: "foundation",
      completed: [],
      bands: { l: 3, r: 3, w: 3, s: 3 },
      streak: { count: 0, last: "" },
      minutesToday: 0,
      day: today(),
      onboarding: false,
    },
    cards: STARTER_VOCAB.map((v) => makeCard(v.id, v.word, `${posVi(v.word, v.vi, v.example, v.pos)} · ${v.vi}  ${v.ipa}`, v.example)),
    log: [],
    attempts: [],
    homework: [],
    testsDone: [],
    zang: emptyZang(),
  };
}

function migrate(s: State): State {
  const uid = sessionId();
  const u = uid ? userById(uid) : undefined;
  return {
    ...s,
    attempts: s.attempts ?? [],
    homework: s.homework ?? [],
    testsDone: s.testsDone ?? [],
    zang: {
      ...emptyZang(),
      ...(s.zang ?? {}),
      spells: s.zang?.spells ?? [],
      drafts: s.zang?.drafts ?? [],
      lots: s.zang?.lots ?? {},
    },
    profile: {
      ...s.profile,
      userId: s.profile.userId || u?.id,
      userName: s.profile.userName || u?.name,
    },
  };
}

function rollDay(s: State): State {
  const d = today();
  if (s.profile.day === d) return s;
  const yest = new Date();
  yest.setDate(yest.getDate() - 1);
  const y = yest.toISOString().slice(0, 10);
  const streak =
    s.profile.streak.last === y
      ? { count: s.profile.streak.count, last: s.profile.streak.last }
      : { count: 0, last: "" };
  return { ...s, profile: { ...s.profile, day: d, minutesToday: 0, streak } };
}

export function load(): State {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(KEY()) ?? localStorage.getItem("eight.v1");
    if (!raw) {
      const s = empty();
      const uid = sessionId();
      const u = uid ? userById(uid) : undefined;
      if (u) {
        s.profile.userId = u.id;
        s.profile.userName = u.name;
        if (u.role === "student") s.profile.onboarding = true;
      }
      return ensureHomework(rollDay(s));
    }
    return ensureHomework(rollDay(migrate(JSON.parse(raw) as State)));
  } catch {
    return empty();
  }
}

export function save(s: State) {
  localStorage.setItem(KEY(), JSON.stringify(s));
  if (sessionId() === "zang") {
    void import("./report").then((m) => m.writeInbox(s)).catch(() => undefined);
  }
  window.dispatchEvent(new Event("eight"));
  void fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: sessionId(), state: s }),
  }).catch(() => undefined);
}

export function reset() {
  localStorage.removeItem(KEY());
  window.dispatchEvent(new Event("eight"));
}

export function bumpStreak(p: Profile): Profile {
  const d = today();
  if (p.streak.last === d) return p;
  const yest = new Date();
  yest.setDate(yest.getDate() - 1);
  const y = yest.toISOString().slice(0, 10);
  const count = p.streak.last === y ? p.streak.count + 1 : 1;
  return { ...p, streak: { count, last: d } };
}

export function completeLesson(s: State, lesson: Lesson, minutes: number, skillDelta?: Partial<Bands>): State {
  const completed = s.profile.completed.includes(lesson.id)
    ? s.profile.completed
    : [...s.profile.completed, lesson.id];
  let bands = { ...s.profile.bands };
  if (skillDelta) {
    (Object.keys(skillDelta) as Skill[]).forEach((k) => {
      if (skillDelta[k] != null) bands[k] = clampBand(skillDelta[k] as number);
    });
  }
  const loc = STAGES.findIndex((st) => st.id === s.profile.stageId);
  const stage = STAGES[loc];
  const stageLessons = stage.units.flatMap((u) => u.lessons);
  const doneStage = stageLessons.every((id) => completed.includes(id));
  const stageId = doneStage && loc < STAGES.length - 1 ? STAGES[loc + 1].id : s.profile.stageId;
  return {
    ...s,
    profile: bumpStreak({
      ...s.profile,
      completed,
      bands,
      stageId,
      minutesToday: s.profile.minutesToday + minutes,
    }),
  };
}

export function gradeCard(s: State, id: string, g: Grade): State {
  return { ...s, cards: s.cards.map((c) => (c.id === id ? review(c, g) : c)) };
}

export function addCardsFromLesson(s: State, lesson: Lesson): State {
  const extra = (lesson.vocab ?? []).filter((v) => !s.cards.some((c) => c.id === v.id));
  if (!extra.length) return s;
  return {
    ...s,
    cards: [...s.cards, ...extra.map((v) => makeCard(v.id, v.word, `${posVi(v.word, v.vi, v.example, v.pos)} · ${v.vi}  ${v.ipa}`, v.example))],
  };
}

export function addLexItems(s: State, items: LexItem[]): State {
  const extra = items.filter(
    (v) => !s.cards.some((c) => c.id === `lex-${v.topic}-${v.word}` || c.front.toLowerCase() === v.word.toLowerCase()),
  );
  if (!extra.length) return s;
  return {
    ...s,
    cards: [...s.cards, ...extra.map((v) => makeCard(`lex-${v.topic}-${v.word}`, v.word, `${posVi(v.word, v.vi, v.example, v.pos)} · ${v.vi}  ${v.ipa}`, v.example))],
  };
}

export function addError(s: State, skill: string, note: string): State {
  return { ...s, log: [{ at: Date.now(), skill, note }, ...s.log].slice(0, 80) };
}

export function recordPractice(s: State, minutes: number, skillDelta?: Partial<Bands>): State {
  let bands = { ...s.profile.bands };
  if (skillDelta) {
    (Object.keys(skillDelta) as Skill[]).forEach((k) => {
      if (skillDelta[k] != null) bands[k] = clampBand(skillDelta[k] as number);
    });
  }
  return {
    ...s,
    profile: bumpStreak({
      ...s.profile,
      bands,
      minutesToday: s.profile.minutesToday + minutes,
    }),
  };
}

export function nextLesson(s: State): Lesson | undefined {
  const stage = STAGES.find((st) => st.id === s.profile.stageId) ?? STAGES[0];
  for (const u of stage.units) {
    for (const id of u.lessons) {
      if (!s.profile.completed.includes(id)) return lessonById(id);
    }
  }
  for (const st of STAGES) {
    for (const u of st.units) {
      for (const id of u.lessons) {
        if (!s.profile.completed.includes(id)) return lessonById(id);
      }
    }
  }
  return lessonById("e-write");
}

export function due(s: State) {
  return dueCards(s.cards, Date.now(), s.profile.minutes <= 20 ? 8 : 15);
}

export function progress(s: State) {
  const all = STAGES.flatMap((st) => st.units.flatMap((u) => u.lessons));
  const uniq = [...new Set(all)];
  return { done: s.profile.completed.filter((id) => uniq.includes(id)).length, total: uniq.length };
}

export function overallBand(s: State) {
  return overall(s.profile.bands);
}

export function recordTest(s: State, test: BankTest, ok: number, total: number, minutes: number): State {
  const testsDone = s.testsDone.includes(test.id) ? s.testsDone : [...s.testsDone, test.id];
  const extra = (test.vocab ?? []).filter((v) => !s.cards.some((c) => c.id === `${test.topicId}-${v.word}`));
  const cards = extra.length
    ? [...s.cards, ...extra.map((v) => makeCard(`${test.topicId}-${v.word}`, v.word, `${posVi(v.word, v.vi, v.example, v.pos)} · ${v.vi}  ${v.ipa}`, v.example))]
    : s.cards;
  let bands = { ...s.profile.bands };
  if (total >= 8 && (test.kind === "listen" || test.kind === "mock-l")) bands.l = answersToBand(ok, total);
  if (total >= 8 && (test.kind === "read" || test.kind === "tfng" || test.kind === "mock-r")) bands.r = answersToBand(ok, total);
  const homework = s.homework.map((h) => (h.testId === test.id ? { ...h, done: true } : h));
  return ensureHomework({
    ...s,
    cards,
    testsDone,
    homework,
    attempts: [{ testId: test.id, at: Date.now(), ok, total, minutes }, ...s.attempts].slice(0, 200),
    profile: bumpStreak({ ...s.profile, bands, minutesToday: s.profile.minutesToday + minutes }),
  });
}

function addDays(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export function ensureHomework(s: State): State {
  const open = s.homework.filter((h) => !h.done);
  if (open.length >= 3) return s;
  const more = homeworkTests().filter((t) => !s.testsDone.includes(t.id) && !s.homework.some((h) => h.testId === t.id));
  const add = more.slice(0, 3 - open.length).map((t, i) => ({
    id: `hw-${t.id}`,
    testId: t.id,
    title: t.title,
    due: addDays(i === 0 ? 0 : 1),
    done: false,
  }));
  if (!add.length) return s;
  return { ...s, homework: [...s.homework, ...add] };
}

export function testProgress(s: State) {
  return { done: s.testsDone.filter((id) => TESTS.some((t) => t.id === id)).length, total: TESTS.length };
}

export function markZangStep(s: State, step: number): State {
  const d = today();
  const cur = s.zang.steps[d] ?? [];
  const steps = cur.includes(step) ? cur : [...cur, step];
  return {
    ...s,
    zang: { ...s.zang, steps: { ...s.zang.steps, [d]: steps } },
    profile: bumpStreak({ ...s.profile, minutesToday: s.profile.minutesToday + 8 }),
  };
}

export function saveZangSentence(s: State, row: Omit<ZangSentence, "at">): State {
  return markZangStep(
    { ...s, zang: { ...s.zang, sentences: [{ ...row, at: Date.now() }, ...s.zang.sentences].slice(0, 200) } },
    1,
  );
}

export function saveZangSpell(s: State, row: Omit<ZangSpell, "at">): State {
  return { ...s, zang: { ...s.zang, spells: [{ ...row, at: Date.now() }, ...s.zang.spells].slice(0, 200) } };
}

export function saveZangDraft(s: State, row: Omit<ZangDraft, "at">): State {
  return { ...s, zang: { ...s.zang, drafts: [{ ...row, at: Date.now() }, ...s.zang.drafts].slice(0, 120) } };
}

export function zangLot(s: State) {
  return s.zang.lots?.[today()] ?? 0;
}

export function bumpZangLot(s: State): State {
  const d = today();
  return { ...s, zang: { ...s.zang, lots: { ...s.zang.lots, [d]: (s.zang.lots?.[d] ?? 0) + 1 } } };
}

export function saveZangMimic(s: State, storyId: string, text: string): State {
  return markZangStep(
    { ...s, zang: { ...s.zang, mimics: [{ at: Date.now(), storyId, text }, ...s.zang.mimics].slice(0, 200) } },
    2,
  );
}

export function saveZangListen(s: State, id: string): State {
  const listenDone = s.zang.listenDone.includes(id) ? s.zang.listenDone : [...s.zang.listenDone, id];
  return markZangStep({ ...s, zang: { ...s.zang, listenDone } }, 3);
}

export function saveZangDiary(s: State, text: string): State {
  const day = today();
  const diaries = [{ at: Date.now(), day, text }, ...s.zang.diaries.filter((x) => x.day !== day)].slice(0, 120);
  return markZangStep({ ...s, zang: { ...s.zang, diaries } }, 4);
}

export function zangToday(s: State) {
  const d = today();
  const done = new Set(s.zang.steps[d] ?? []);
  return { done, count: done.size };
}
