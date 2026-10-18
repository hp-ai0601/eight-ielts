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

export function userById(id: string) {
  return USERS.find((u) => u.id === id);
}

export function checkPin(id: string, pin: string) {
  const u = userById(id);
  return u && u.pin === pin.trim() ? u : null;
}
