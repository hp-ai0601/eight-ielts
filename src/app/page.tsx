"use client";

import Link from "next/link";
import { useEight } from "@/lib/useEight";
import Onboarding from "@/components/Onboarding";
import { zangToday } from "@/lib/store";
import GuiThay from "@/components/zang/GuiThay";

const STEPS = [
  { n: 1, href: "/tu", title: "Từ", why: "8 từ → câu" },
  { n: 2, href: "/cum", title: "Cụm", why: "6 cảnh kịch bản" },
  { n: 3, href: "/hai", title: "Hài", why: "4 mẩu nghe" },
  { n: 4, href: "/nhat-ky", title: "Nhật ký", why: "Viết vài câu" },
];

export default function Today() {
  const { s, commit, ready } = useEight();
  if (!ready || !s) return <div className="p-10 text-mute">Đang mở studio…</div>;
  if (!s.profile.onboarding) return <Onboarding onDone={commit} />;

  const { done, count } = zangToday(s);
  const next = STEPS.find((x) => !done.has(x.n)) ?? STEPS[0];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-8 lg:px-10 lg:py-12">
      <p className="text-sm text-lime">Hôm nay · {count}/4 · streak {s.profile.streak.count}</p>
      <h1 className="mt-2 font-serif text-4xl leading-none lg:text-5xl">Bốn bước. Rồi ngủ.</h1>
      <Link href={next.href} className="btn-lime mt-6 inline-flex w-fit">
        {count === 4 ? "Xem nhật ký" : `Tiếp · ${next.title}`}
      </Link>
      <ol className="mt-10 grid gap-3 sm:grid-cols-2">
        {STEPS.map((x) => {
          const on = done.has(x.n);
          return (
            <li key={x.n}>
              <Link
                href={x.href}
                className={`panel block p-5 transition hover:border-lime ${on ? "opacity-60" : ""}`}
              >
                <p className="text-xs text-lime">{on ? "xong" : `bước ${x.n}`}</p>
                <p className="mt-2 font-serif text-3xl leading-none">{x.title}</p>
                <p className="mt-2 text-sm text-mute">{x.why}</p>
              </Link>
            </li>
          );
        })}
      </ol>
      <p className="mt-auto pt-10 text-sm text-mute">
        Đề IELTS để ở{" "}
        <Link className="text-lime" href="/kho">
          Kho
        </Link>
        .
      </p>
      {s.profile.userId === "zang" && <GuiThay s={s} />}
    </div>
  );
}
