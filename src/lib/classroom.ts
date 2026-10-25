"use client";

/** Khu giáo viên — lớp học, giao bài, kiểm tra nhanh, mẹo nhớ của thầy.
 *  Mọi dữ liệu nằm trong localStorage (kho chung trên máy / qua mã dự phòng). */

export type Student = { id: string; name: string; pin: string };
export type Classroom = { name: string; students: Student[] };
export type Assignment = {
  id: string;
  at: number;
  title: string;
  topicId?: string;
  words: string[];
  note: string;
  due: string;
  forId?: string; // giao riêng cho 1 học trò; trống = cả lớp
};
export type QuizResult = {
  assignmentId: string;
  studentId: string;
  ok: number;
  total: number;
  at: number;
};

const CLS = "eight.classroom";
const ASM = "eight.assignments";
const QR = "eight.quiz.results";
const CM = "eight.customMnemonics";

function read<T>(key: string, fb: T): T {
  if (typeof window === "undefined") return fb;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fb;
  } catch {
    return fb;
  }
}
function write(key: string, v: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(v));
  window.dispatchEvent(new Event("eight"));
}

// ---------- Lớp học ----------
export function getClassroom(): Classroom {
  return read<Classroom>(CLS, { name: "Lớp của thầy Hiệp", students: [] });
}
export function saveClassroom(c: Classroom) {
  write(CLS, c);
}
export function addStudent(name: string): Student {
  const c = getClassroom();
  const id = `hs-${name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 12)}-${Math.floor(100 + Math.random() * 900)}`;
  const pin = String(Math.floor(1000 + Math.random() * 9000));
  const st = { id, name: name.trim(), pin };
  saveClassroom({ ...c, students: [...c.students, st] });
  return st;
}
export function removeStudent(id: string) {
  const c = getClassroom();
  saveClassroom({ ...c, students: c.students.filter((s) => s.id !== id) });
}
export function allStudents(): Student[] {
  return getClassroom().students;
}

// ---------- Giao bài ----------
export function getAssignments(): Assignment[] {
  return read<Assignment[]>(ASM, []);
}
export function addAssignment(a: Omit<Assignment, "id" | "at">): Assignment {
  const row = { ...a, id: `as-${Date.now()}`, at: Date.now() };
  write(ASM, [row, ...getAssignments()].slice(0, 30));
  return row;
}
export function removeAssignment(id: string) {
  write(ASM, getAssignments().filter((a) => a.id !== id));
}
/** Bài giao cho học trò `uid` (cả lớp + riêng em), mới nhất trước. */
export function assignmentsFor(uid: string | null): Assignment[] {
  return getAssignments().filter((a) => !a.forId || a.forId === uid);
}

// ---------- Kiểm tra nhanh ----------
export function getQuizResults(): QuizResult[] {
  return read<QuizResult[]>(QR, []);
}
export function saveQuizResult(r: QuizResult) {
  write(QR, [r, ...getQuizResults()].slice(0, 100));
}

// ---------- Mẹo nhớ của thầy ----------
export function getCustomMnemonics(): Record<string, { sound: string; img: string }> {
  return read(CM, {});
}
export function saveCustomMnemonic(word: string, sound: string, img: string) {
  const m = getCustomMnemonics();
  m[word.trim().toLowerCase()] = { sound, img };
  write(CM, m);
}

// ---------- Đọc state của một học trò bất kỳ (cùng máy) ----------
export type AnyState = {
  profile: { day: string; minutesToday: number; streak: { count: number }; bands: { l: number; r: number; w: number; s: number } };
  cards: { front: string; back: string; lapses: number; reps: number; interval: number; due: number }[];
  attempts: { testId: string; ok: number; total: number; at: number }[];
  zang: { steps: Record<string, number[]> };
};
export function readStudentState(uid: string): AnyState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`eight.v2.${uid}`);
    return raw ? (JSON.parse(raw) as AnyState) : null;
  } catch {
    return null;
  }
}

/** Từ hay sai của một học trò: thẻ bấm "Lại" nhiều + chưa chắc (reps thấp). */
export function weakWords(uid: string, limit = 12): { word: string; lapses: number; reps: number }[] {
  const s = readStudentState(uid);
  if (!s) return [];
  return [...(s.cards ?? [])]
    .filter((c) => (c.lapses ?? 0) > 0 || (c.reps ?? 0) <= 1)
    .sort((a, b) => b.lapses - a.lapses || a.reps - b.reps)
    .slice(0, limit)
    .map((c) => ({ word: c.front, lapses: c.lapses ?? 0, reps: c.reps ?? 0 }));
}
