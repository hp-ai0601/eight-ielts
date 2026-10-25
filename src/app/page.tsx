"use client";

import Link from "next/link";
import { useEight } from "@/lib/useEight";
import Onboarding from "@/components/Onboarding";
import { zangToday } from "@/lib/store";
import GuiThay from "@/components/zang/GuiThay";
import DailyChallenge from "@/components/DailyChallenge";
import { levelOf, starCount } from "@/lib/stars";

const STEPS = [
  { n: 1, href: "/tu", title: "Từ vựng", why: "Học 8 từ rồi đặt câu" },
  { n: 2, href: "/cum", title: "Cụm từ", why: "6 tình huống có sẵn kịch bản" },
  { n: 3, href: "/hai", title: "Nghe hài", why: "Nghe 4 mẩu chuyện cười" },
  { n: 4, href: "/nhat-ky", title: "Nhật ký", why: "Viết vài câu về ngày hôm nay" },
];

export default function Today() {
  const { s, commit, ready } = useEight();
  if (!ready || !s) return <div className="p-10 text-mute">Đang tải…</div>;
  if (!s.profile.onboarding) return <Onboarding onDone={commit} />;

  const { done, count } = zangToday(s);
  const next = STEPS.find((x) => !done.has(x.n)) ?? STEPS[0];
  const stars = starCount(s);
  const lv = levelOf(stars);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-8 lg:px-10 lg:py-12">
      <p className="text-sm text-lime">Hôm nay đã xong {count}/4 bước · Chuỗi {s.profile.streak.count} ngày</p>
      <h1 className="mt-2 font-serif text-4xl leading-none lg:text-5xl">Mỗi ngày bốn bước nhỏ.</h1>
      <Link href={next.href} className="btn-lime mt-6 inline-flex w-fit">
        {count === 4 ? "Xem nhật ký" : `Học tiếp: ${next.title}`}
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
                <p className="text-xs text-lime">{on ? "Đã xong" : `Bước ${x.n}`}</p>
                <p className="mt-2 font-serif text-3xl leading-none">{x.title}</p>
                <p className="mt-2 text-sm text-mute">{x.why}</p>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="panel mt-6 p-5">
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] uppercase tracking-wider text-lime">Cấp độ của em</p>
          <p className="text-sm text-mute">{stars} sao</p>
        </div>
        <p className="mt-2 font-serif text-3xl">
          Cấp {lv.index + 1} · {lv.level.name}
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-lime transition-all" style={{ width: `${Math.round(lv.progress * 100)}%` }} />
        </div>
        <p className="mt-2 text-sm text-mute">
          {lv.next
            ? `Còn ${lv.next.need - stars} sao nữa lên cấp ${lv.index + 2} (${lv.next.name}) — cứ học mỗi ngày là sao tự tăng.`
            : "Cấp cao nhất rồi — giữ phong độ nhé, chiến binh 8.0!"}
        </p>
      </div>

      <DailyChallenge s={s} />

      <p className="mt-auto pt-10 text-sm text-mute">
        Muốn luyện đề IELTS thì vào{" "}
        <Link className="text-lime" href="/kho">
          Kho
        </Link>{" "}
        nhé.
      </p>
      {s.profile.userId === "zang" && <GuiThay s={s} />}
    </div>
  );
}
