"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { USERS, checkPin } from "@/lib/users";
import { setSession } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const [id, setId] = useState("zang");
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");

  function go() {
    const u = checkPin(id, pin);
    if (!u) {
      setErr("Sai PIN.");
      return;
    }
    setSession(u.id);
    router.replace(u.role === "teacher" ? "/teacher" : "/");
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <p className="text-sm text-lime">Eight</p>
      <h1 className="mt-3 font-serif text-4xl">Vào studio</h1>
      <p className="mt-3 text-mute">Account học trò: Zang Bếu. PIN do thầy Hiệp cấp.</p>
      <div className="mt-8 grid gap-2">
        {USERS.map((u) => (
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
