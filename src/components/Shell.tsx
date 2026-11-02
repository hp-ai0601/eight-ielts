"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { sessionId, setSession, testProgress, zangToday } from "@/lib/store";
import { useEight } from "@/lib/useEight";
import AccentPick from "@/components/AccentPick";

const NAV = [
  { href: "/", label: "Hôm nay" },
  { href: "/tu", label: "Từ", n: 1 },
  { href: "/cum", label: "Cụm", n: 2 },
  { href: "/hai", label: "Hài", n: 3 },
  { href: "/nhat-ky", label: "Nhật ký", n: 4 },
  { href: "/kho", label: "Kho" },
];

const KHO = ["/kho", "/words", "/grammar", "/gquiz", "/method", "/tests", "/path", "/homework", "/exam", "/coach", "/lesson", "/listen", "/read", "/write", "/speak", "/dict", "/irregular", "/idioms", "/songs"];

function navOn(href: string, path: string) {
  if (href === "/") return path === "/";
  if (href === "/kho") return KHO.some((p) => path === p || path.startsWith(`${p}/`));
  return path === href || path.startsWith(`${href}/`);
}

function norm(p: string) {
  if (!p) return "/";
  return p.length > 1 ? p.replace(/\/$/, "") : p;
}

type FontSize = "s" | "m" | "l";
const FONT_PX: Record<FontSize, string> = { s: "14px", m: "16px", l: "18px" };

function applyFont(f: FontSize) {
  if (typeof document === "undefined") return;
  document.documentElement.style.fontSize = FONT_PX[f];
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const path = norm(usePathname() || "/");
  const router = useRouter();
  const { s, ready } = useEight();
  const [font, setFont] = useState<FontSize>("m");

  useEffect(() => {
    const f = (localStorage.getItem("eight.fontsize") as FontSize) || "m";
    setFont(f);
    applyFont(f);
  }, []);

  useEffect(() => {
    if (path === "/login") return;
    if (typeof window !== "undefined" && !sessionId()) router.replace("/login");
  }, [path, router]);

  const prog = s ? testProgress(s) : null;
  const done = s ? zangToday(s).done : new Set<number>();

  return (
    <div className="flex min-h-dvh flex-col lg:h-dvh lg:flex-row lg:overflow-hidden">
      <aside className="shrink-0 border-b border-line lg:w-[13.5rem] lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-3 lg:block lg:px-5 lg:py-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Eight<span className="text-lime">.</span>
          </Link>
          <p className="hidden text-xs text-mute lg:mt-1.5 lg:block">Lớp học của Zang</p>
          {path !== "/login" && (
            <div className="mt-2 hidden lg:block">
              <AccentPick compact />
              <div className="mt-2 flex items-center gap-1" title="Cỡ chữ">
                {(["s", "m", "l"] as FontSize[]).map((f, idx) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFont(f);
                      applyFont(f);
                      localStorage.setItem("eight.fontsize", f);
                    }}
                    className={`rounded-md border px-2 py-0.5 ${font === f ? "border-lime text-lime" : "border-line text-mute hover:text-text"}`}
                    style={{ fontSize: [11, 13, 15][idx] }}
                    aria-label={["Cỡ chữ nhỏ", "Cỡ chữ vừa", "Cỡ chữ lớn"][idx]}
                  >
                    A
                  </button>
                ))}
                <span className="ml-1 text-[10px] text-mute">cỡ chữ</span>
              </div>
            </div>
          )}
          {ready && s?.profile.userName && (
            <p className="hidden lg:mt-3 lg:block">
              <span className="text-sm">{s.profile.userName}</span>
              {prog && (
                <span className="mt-1 block text-xs text-mute">
                  Đề đã làm: {prog.done}/{prog.total}
                </span>
              )}
              <button className="mt-2 text-xs text-mute hover:text-lime" onClick={() => { setSession(null); router.push("/login"); }}>
                Đăng xuất
              </button>
            </p>
          )}
        </div>
        {path !== "/login" && (
          <nav className="flex gap-1 overflow-x-auto px-3 pb-2.5 lg:block lg:space-y-0.5 lg:px-3 lg:pb-8">
            {NAV.map((n) => {
              const on = navOn(n.href, path);
              const ok = "n" in n && n.n != null && done.has(n.n);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`block shrink-0 rounded-full px-3 py-2 text-sm lg:rounded-xl ${
                    on ? "bg-lime text-bg" : ok ? "text-text" : "text-mute hover:text-text"
                  }`}
                >
                  {ok && !on ? "✓ " : ""}
                  {n.label}
                </Link>
              );
            })}
            {s?.profile.userId === "hiep" && (
              <Link href="/teacher" className="block shrink-0 rounded-full px-3 py-2 text-sm text-mute hover:text-text lg:rounded-xl">
                Lớp học
              </Link>
            )}
          </nav>
        )}
      </aside>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  );
}
