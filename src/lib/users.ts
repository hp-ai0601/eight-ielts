export type Role = "student" | "teacher";

export interface User {
  id: string;
  name: string;
  pin: string;
  role: Role;
}

/** Học trò được cấp sẵn. PIN nói miệng cho Zang, đổi được bằng env. */
export const USERS: User[] = [
  { id: "zang", name: "Zang Bếu", pin: process.env.NEXT_PUBLIC_ZANG_PIN || "8800", role: "student" },
  { id: "hiep", name: "Thầy Hiệp", pin: process.env.NEXT_PUBLIC_TEACHER_PIN || "0008", role: "teacher" },
];

export function userById(id: string): User | undefined {
  const base = USERS.find((u) => u.id === id);
  if (base) return base;
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("eight.classroom");
      const st = raw ? (JSON.parse(raw) as { students?: { id: string; name: string; pin: string }[] }).students : [];
      const c = (st ?? []).find((x) => x.id === id);
      if (c) return { id: c.id, name: c.name, pin: c.pin, role: "student" };
    } catch {
      /* bỏ qua */
    }
  }
  return undefined;
}

export function checkPin(id: string, pin: string) {
  const u = userById(id);
  return u && u.pin === pin.trim() ? u : null;
}
