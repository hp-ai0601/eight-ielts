import { sessionId, type State } from "@/lib/store";

/** Điểm sao tích luỹ — game hoá nhẹ: học gì cũng được sao, đủ sao thì lên cấp.
 *  Tính từ dữ liệu đã có trong state, không cần đổi schema. */

export type Level = { name: string; need: number };

export const LEVELS: Level[] = [
  { name: "Mới vào lớp", need: 0 },
  { name: "Siêng năng", need: 50 },
  { name: "Chăm chỉ", need: 120 },
  { name: "Cần cù", need: 250 },
  { name: "Bền bỉ", need: 500 },
  { name: "Không bỏ cuộc", need: 900 },
  { name: "Chiến binh 8.0", need: 1500 },
];

const CH_KEY = (uid: string) => `eight.challenge.${uid}`;

export function challengeRecord(uid?: string): { day: string; stars: number } {
  if (typeof window === "undefined") return { day: "", stars: 0 };
  const id = uid ?? sessionId() ?? "guest";
  try {
    const raw = localStorage.getItem(CH_KEY(id));
    if (!raw) return { day: "", stars: 0 };
    const j = JSON.parse(raw) as { day?: string; stars?: number };
    return { day: j.day ?? "", stars: j.stars ?? 0 };
  } catch {
    return { day: "", stars: 0 };
  }
}

export function saveChallengeStars(stars: number, uid?: string) {
  if (typeof window === "undefined") return;
  const id = uid ?? sessionId() ?? "guest";
  const day = new Date().toISOString().slice(0, 10);
  localStorage.setItem(CH_KEY(id), JSON.stringify({ day, stars }));
}

/** Sao kiếm được từ thử thách hằng ngày (cộng dồn nhiều ngày). */
function challengeTotal(uid?: string): number {
  if (typeof window === "undefined") return 0;
  const id = uid ?? sessionId() ?? "guest";
  try {
    let sum = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) ?? "";
      if (k.startsWith(`eight.chlog.${id}.`)) {
        const j = JSON.parse(localStorage.getItem(k) ?? "{}") as { stars?: number };
        sum += j.stars ?? 0;
      }
    }
    return sum;
  } catch {
    return 0;
  }
}

/** Ghi nhận sao của một ngày thử thách (mỗi ngày một key để cộng dồn). */
export function logChallengeDay(stars: number, uid?: string) {
  if (typeof window === "undefined") return;
  const id = uid ?? sessionId() ?? "guest";
  const day = new Date().toISOString().slice(0, 10);
  localStorage.setItem(`eight.chlog.${id}.${day}`, JSON.stringify({ day, stars }));
  saveChallengeStars(stars, id);
}

export function starCount(s: State): number {
  const z = s.zang;
  const base =
    s.profile.completed.length * 10 +
    s.testsDone.length * 10 +
    s.attempts.length * 5 +
    z.sentences.length * 2 +
    z.diaries.length * 5 +
    z.mimics.length * 2 +
    z.listenDone.length * 3 +
    (z.papers?.length ?? 0) * 5 +
    (z.speaks?.length ?? 0) * 5 +
    s.cards.filter((c) => c.reps > 0).length;
  return base + challengeTotal();
}

export function levelOf(stars: number): { level: Level; index: number; next: Level | null; progress: number } {
  let index = 0;
  for (let i = 0; i < LEVELS.length; i++) if (stars >= LEVELS[i].need) index = i;
  const level = LEVELS[index];
  const next = LEVELS[index + 1] ?? null;
  const progress = next ? Math.min(1, (stars - level.need) / (next.need - level.need)) : 1;
  return { level, index, next, progress };
}

const DAY_VI = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

function hasChallengeOn(id: string, day: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(`eight.chlog.${id}.${day}`) != null;
}

/** Lịch 7 ngày gần nhất: ngày nào đã học (làm bước trong ngày, làm thử thách, hoặc nằm trong chuỗi). */
export function weekActivity(s: State): { day: string; label: string; active: boolean; isToday: boolean }[] {
  const id = sessionId() ?? "guest";
  const out: { day: string; label: string; active: boolean; isToday: boolean }[] = [];
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  // cửa sổ chuỗi: streak.last lùi lại streak.count - 1 ngày
  const streakDays = new Set<string>();
  if (s.profile.streak.last) {
    const d = new Date(`${s.profile.streak.last}T00:00:00`);
    for (let i = 0; i < s.profile.streak.count; i++) {
      streakDays.add(d.toISOString().slice(0, 10));
      d.setDate(d.getDate() - 1);
    }
  }
  for (let back = 6; back >= 0; back--) {
    const d = new Date(now);
    d.setDate(now.getDate() - back);
    const key = d.toISOString().slice(0, 10);
    const active =
      (s.zang.steps[key]?.length ?? 0) > 0 || hasChallengeOn(id, key) || streakDays.has(key);
    out.push({ day: key, label: DAY_VI[d.getDay()], active, isToday: key === todayStr });
  }
  return out;
}
