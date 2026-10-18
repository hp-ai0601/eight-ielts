"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { sessionId, setSession } from "@/lib/store";
import { useEight } from "@/lib/useEight";
import { testProgress } from "@/lib/store";

const NAV = [
  { href: "/", label: "Hôm nay" },
  { href: "/path", label: "Lộ trình" },
  { href: "/tests", label: "Đề" },
  { href: "/homework", label: "BTVN" },
  { href: "/words", label: "Từ" },
  { href: "/listen", label: "Nghe" },
  { href: "/read", label: "Đọc" },
  { href: "/speak", label: "Nói" },
  { href: "/write", label: "Viết" },
  { href: "/exam", label: "Thi" },
  { href: "/coach", label: "Gia sư" },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { s, ready } = useEight();

  useEffect(() => {
    if (path === "/login") return;
    if (typeof window !== "undefined" && !sessionId()) router.replace("/login");
  }, [path, router]);

  const prog = s ? testProgress(s) : null;

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[220px_1fr]">
      <aside className="border-b border-line lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-4 lg:block lg:px-6 lg:py-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Eight<span className="text-lime">.</span>
          </Link>
          <p className="hidden text-xs text-mute lg:mt-2 lg:block">IELTS Academic 8.0</p>
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
          <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-0.5 lg:px-3 lg:pb-8">
            {NAV.map((n) => {
              const on = n.href === "/" ? path === "/" : path.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`block shrink-0 rounded-full px-3 py-2 text-sm lg:rounded-xl ${
                    on ? "bg-lime text-bg" : "text-mute hover:text-text"
                  }`}
                >
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
      <div className="min-w-0">{children}</div>
    </div>
  );
}
