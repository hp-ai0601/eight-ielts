"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { sessionId, setSession, testProgress, zangToday } from "@/lib/store";
import { useEight } from "@/lib/useEight";

const NAV = [
  { href: "/", label: "Hôm nay" },
  { href: "/tu", label: "Từ", n: 1 },
  { href: "/cum", label: "Cụm", n: 2 },
  { href: "/hai", label: "Hài", n: 3 },
  { href: "/nhat-ky", label: "Nhật ký", n: 4 },
  { href: "/kho", label: "Kho" },
];

function norm(p: string) {
  if (!p) return "/";
  return p.length > 1 ? p.replace(/\/$/, "") : p;
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const path = norm(usePathname() || "/");
  const router = useRouter();
  const { s, ready } = useEight();

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
          <p className="hidden text-xs text-mute lg:mt-1.5 lg:block">Cách Zang</p>
          {ready && s?.profile.userName && (
            <p className="hidden lg:mt-3 lg:block">
              <span className="text-sm">{s.profile.userName}</span>
              {prog && (
                <span className="mt-1 block text-xs text-mute">
                  đề {prog.done}/{prog.total}
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
              const on = n.href === "/" ? path === "/" : path === n.href || path.startsWith(n.href + "/");
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
                Zang
              </Link>
            )}
          </nav>
        )}
      </aside>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  );
}
