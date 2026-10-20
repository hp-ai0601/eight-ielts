import { dbPut } from "./db";
import type { Bands, Paper, SpeakTake, State, ZangDraft, ZangSentence } from "./store";

export const INBOX_KEY = "eight.inbox.zang";

export interface Report {
  v: 2;
  at: number;
  day: string;
  streak: number;
  minutes: number;
  steps: number[];
  stage?: string;
  bands?: Bands;
  completed?: number;
  sentences: Pick<ZangSentence, "word" | "mode" | "text" | "score" | "rewrite" | "spelling" | "grammar">[];
  drafts: ZangDraft[];
  spells: { target: string; wrote: string; ok: boolean }[];
  mimics: { text: string }[];
  diaries: { day: string; text: string }[];
  papers: Paper[];
  speaks: SpeakTake[];
  tests: { testId: string; ok: number; total: number; at: number }[];
}

export function makeReport(s: State): Report {
  const day = s.profile.day;
  return {
    v: 2,
    at: Date.now(),
    day,
    streak: s.profile.streak.count,
    minutes: s.profile.minutesToday,
    steps: s.zang.steps[day] ?? [],
    stage: s.profile.stageId,
    bands: s.profile.bands,
    completed: s.profile.completed.length,
    sentences: s.zang.sentences.slice(0, 16).map(({ word, mode, text, score, rewrite, spelling, grammar }) => ({
      word,
      mode,
      text,
      score,
      rewrite,
      spelling,
      grammar,
    })),
    drafts: (s.zang.drafts ?? []).slice(0, 12),
    spells: (s.zang.spells ?? []).slice(0, 16).map(({ target, wrote, ok }) => ({ target, wrote, ok })),
    mimics: s.zang.mimics.slice(0, 8).map(({ text }) => ({ text })),
    diaries: s.zang.diaries.slice(0, 6).map(({ day: d, text }) => ({ day: d, text })),
    papers: (s.zang.papers ?? []).slice(0, 8),
    speaks: (s.zang.speaks ?? []).slice(0, 8),
    tests: s.attempts.slice(0, 8).map(({ testId, ok, total, at }) => ({ testId, ok, total, at })),
  };
}

export function pack(r: Report) {
  const json = JSON.stringify(r);
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function unpack(code: string): Report | null {
  try {
    const pad = code.length % 4 === 0 ? "" : "=".repeat(4 - (code.length % 4));
    const json = decodeURIComponent(escape(atob(code.replace(/-/g, "+").replace(/_/g, "/") + pad)));
    const r = JSON.parse(json) as Omit<Report, "v"> & { v: number };
    if (r?.v !== 1 && r?.v !== 2) return null;
    return { ...r, papers: r.papers ?? [], speaks: r.speaks ?? [], tests: r.tests ?? [], v: 2 };
  } catch {
    return null;
  }
}

export function writeInbox(s: State) {
  if (typeof window === "undefined") return;
  localStorage.setItem(INBOX_KEY, JSON.stringify(makeReport(s)));
}

export async function pushLive(s: State) {
  try {
    await dbPut("zang", makeReport(s));
  } catch {
    /* kho chung offline */
  }
}

export function readInbox(): Report | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(INBOX_KEY);
    if (!raw) return null;
    const r = JSON.parse(raw) as Report;
    return { ...r, papers: r.papers ?? [], speaks: r.speaks ?? [], tests: r.tests ?? [], v: 2 };
  } catch {
    return null;
  }
}

export function readZangState(): State | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("eight.v2.zang");
    if (!raw) return null;
    return JSON.parse(raw) as State;
  } catch {
    return null;
  }
}
