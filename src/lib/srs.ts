export interface Card {
  id: string;
  front: string;
  back: string;
  example?: string;
  due: number;
  ease: number;
  interval: number;
  reps: number;
  lapses: number;
}

export type Grade = "again" | "hard" | "good" | "easy";

const MIN = 60_000;
const DAY = 86_400_000;

export function makeCard(id: string, front: string, back: string, example?: string): Card {
  return { id, front, back, example, due: Date.now(), ease: 2.5, interval: 0, reps: 0, lapses: 0 };
}

export function dueCards(cards: Card[], now = Date.now(), cap = 20): Card[] {
  return cards.filter((c) => c.due <= now).sort((a, b) => a.due - b.due).slice(0, cap);
}

export function review(card: Card, grade: Grade, now = Date.now()): Card {
  const next = { ...card };
  if (grade === "again") {
    next.reps = 0;
    next.lapses += 1;
    next.ease = Math.max(1.3, next.ease - 0.2);
    next.interval = 0;
    next.due = now + 10 * MIN;
    return next;
  }
  if (next.reps === 0) {
    next.interval = grade === "easy" ? 4 : grade === "hard" ? 0.5 : 1;
  } else if (next.reps === 1) {
    next.interval = grade === "easy" ? 7 : grade === "hard" ? 2 : 3;
  } else if (next.reps === 2) {
    next.interval = grade === "easy" ? 14 : grade === "hard" ? 4 : 7;
  } else if (next.reps === 3) {
    next.interval = grade === "easy" ? 45 : grade === "hard" ? 10 : 16;
  } else if (next.reps === 4) {
    next.interval = grade === "easy" ? 90 : grade === "hard" ? 20 : 35;
  } else {
    const mul = grade === "easy" ? next.ease * 1.3 : grade === "hard" ? 1.2 : next.ease;
    next.interval = Math.round(next.interval * mul * 10) / 10;
  }
  if (grade === "hard") next.ease = Math.max(1.3, next.ease - 0.15);
  if (grade === "easy") next.ease += 0.15;
  next.reps += 1;
  next.due = now + next.interval * DAY;
  return next;
}

/** Khoảng ôn kế tiếp nếu chấm mức `grade` — để hiển thị trên nút (kiểu Anki). */
export function nextInterval(card: Card, grade: Grade): number {
  return review(card, grade).interval;
}

export function fmtInterval(days: number): string {
  if (days <= 0) return "10 phút";
  if (days < 1) return `${Math.round(days * 24)} giờ`;
  if (days < 30) return `${Math.round(days)} ngày`;
  return `${Math.round(days / 30)} tháng`;
}
