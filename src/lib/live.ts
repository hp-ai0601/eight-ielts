"use client";

import { dbGet, dbPut } from "./db";
import type { Report } from "./report";

const POLL = 8000;
const GRADE_SEEN = "eight.grade.at";

export type Grade = {
  at: number;
  paperAt?: number;
  speakAt?: number;
  ta?: number;
  cc?: number;
  lr?: number;
  gra?: number;
  fc?: number;
  pron?: number;
  band: number;
  note: string;
  kind: "write" | "speak" | "sentence";
};

export async function livePush(report: Report) {
  await dbPut("zang", report);
  return true;
}

export async function liveGrade(g: Grade) {
  await dbPut("grade", g);
  const z = await dbGet<Report>("zang");
  if (!z) return true;
  if (g.kind === "write" && g.paperAt) {
    z.papers = (z.papers ?? []).map((p) =>
      p.at === g.paperAt
        ? {
            ...p,
            teacher: {
              ta: g.ta ?? p.auto.ta,
              cc: g.cc ?? p.auto.cc,
              lr: g.lr ?? p.auto.lr,
              gra: g.gra ?? p.auto.gra,
              band: g.band,
              note: g.note,
              at: g.at,
            },
          }
        : p,
    );
    z.at = g.at;
    await dbPut("zang", z);
  }
  if (g.kind === "speak" && g.speakAt) {
    z.speaks = (z.speaks ?? []).map((p) =>
      p.at === g.speakAt
        ? {
            ...p,
            teacher: {
              fc: g.fc ?? p.auto.fc,
              lr: g.lr ?? p.auto.lr,
              gra: g.gra ?? p.auto.gra,
              pron: g.pron ?? p.auto.pron,
              band: g.band,
              note: g.note,
              at: g.at,
            },
          }
        : p,
    );
    z.at = g.at;
    await dbPut("zang", z);
  }
  return true;
}

function poll<T>(id: "zang" | "grade", fn: (data: T) => void) {
  let stop = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const tick = async () => {
    try {
      const data = await dbGet<T>(id);
      if (data) fn(data);
    } catch {
      /* offline / CORS */
    }
    if (!stop) timer = setTimeout(tick, POLL);
  };
  void tick();
  return () => {
    stop = true;
    if (timer) clearTimeout(timer);
  };
}

export function onLive(fn: (r: Report) => void) {
  return poll<Report>("zang", (r) => {
    if (r && (r.v as number) >= 1) fn({ ...r, papers: r.papers ?? [], speaks: r.speaks ?? [], tests: r.tests ?? [], v: 2 });
  });
}

export function onGrade(fn: (g: Grade) => void) {
  return poll<Grade>("grade", (g) => {
    if (!g?.at || !g.kind) return;
    const seen = Number(typeof window !== "undefined" ? localStorage.getItem(GRADE_SEEN) : 0) || 0;
    if (g.at <= seen) return;
    localStorage.setItem(GRADE_SEEN, String(g.at));
    fn(g);
  });
}
