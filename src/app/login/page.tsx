"use client";

import { useEffect, useState } from "react";
import { USERS, checkPin, type User } from "@/lib/users";
import { setSession } from "@/lib/store";
import { allStudents } from "@/lib/classroom";

export default function LoginPage() {
  const [id, setId] = useState("zang");
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const [extra, setExtra] = useState<User[]>([]);

  useEffect(() => {
    setExtra(allStudents().map((x) => ({ id: x.id, name: x.name, pin: x.pin, role: "student" as const })));
  }, []);

  function go() {
    const u = checkPin(id, pin);
    if (!u) {
      setErr("PIN chưa đúng, bạn thử lại nhé.");
      return;
    }
    setSession(u.id);
    const dest = u.role === "teacher" ? "/teacher/" : "/";
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    window.location.assign(base + dest);
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <p className="text-sm text-lime">Eight</p>
      <h1 className="mt-3 font-serif text-4xl">Đăng nhập</h1>
      <p className="mt-3 text-mute">Chọn tên của bạn, rồi nhập PIN do thầy Hiệp cấp.</p>
      <div className="mt-8 grid gap-2">
        {[...USERS, ...extra].map((u) => (
          <button
            key={u.id}
            className={`rounded-xl border px-4 py-3 text-left ${id === u.id ? "border-lime bg-lime/10" : "border-line"}`}
            onClick={() => setId(u.id)}
          >
            {u.name}
            <span className="ml-2 text-sm text-mute">{u.role === "student" ? "học trò" : "thầy"}</span>
          </button>
        ))}
      </div>
      <label className="mt-6 block text-sm text-mute">PIN</label>
      <input className="field mt-1" type="password" value={pin} onChange={(e) => setPin(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} />
      {err && <p className="mt-2 text-sm text-bad">{err}</p>}
      <button className="btn-lime mt-6" onClick={go}>
        Vào học
      </button>
    </div>
  );
}
