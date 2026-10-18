import type { State, ZangDraft, ZangSentence } from "./store";

export const INBOX_KEY = "eight.inbox.zang";

export interface Report {
  v: 1;
  at: number;
  day: string;
  streak: number;
  minutes: number;
  steps: number[];
  sentences: Pick<ZangSentence, "word" | "mode" | "text" | "score" | "rewrite" | "spelling" | "grammar">[];
  drafts: ZangDraft[];
  spells: { target: string; wrote: string; ok: boolean }[];
  mimics: { text: string }[];
  diaries: { day: string; text: string }[];
}

export function makeReport(s: State): Report {
  const day = s.profile.day;
  return {
    v: 1,
    at: Date.now(),
    day,
    streak: s.profile.streak.count,
    minutes: s.profile.minutesToday,
    steps: s.zang.steps[day] ?? [],
    sentences: s.zang.sentences.slice(0, 24).map(({ word, mode, text, score, rewrite, spelling, grammar }) => ({
      word,
      mode,
      text,
      score,
      rewrite,
      spelling,
      grammar,
    })),
    drafts: (s.zang.drafts ?? []).slice(0, 24),
    spells: (s.zang.spells ?? []).slice(0, 24).map(({ target, wrote, ok }) => ({ target, wrote, ok })),
    mimics: s.zang.mimics.slice(0, 12).map(({ text }) => ({ text })),
    diaries: s.zang.diaries.slice(0, 10).map(({ day: d, text }) => ({ day: d, text })),
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
    const r = JSON.parse(json) as Report;
    if (r?.v !== 1) return null;
    return r;
  } catch {
    return null;
  }
}

export function writeInbox(s: State) {
  if (typeof window === "undefined") return;
  localStorage.setItem(INBOX_KEY, JSON.stringify(makeReport(s)));
}

export function readInbox(): Report | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(INBOX_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Report;
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
