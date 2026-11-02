"use client";

import Link from "next/link";
import { useEight } from "@/lib/useEight";
import Onboarding from "@/components/Onboarding";
import { zangToday } from "@/lib/store";
import GuiThay from "@/components/zang/GuiThay";
import DailyChallenge from "@/components/DailyChallenge";
import GrowTree from "@/components/GrowTree";
import { levelOf, starCount, weekActivity } from "@/lib/stars";
import { lessonById, nextTodoLessonId } from "@/lib/content";

const STEPS = [
  { n: 1, href: "/tu", title: "Từ vựng" },
  { n: 2, href: "/cum", title: "Cụm từ" },
  { n: 3, href: "/hai", title: "Nghe hài" },
  { n: 4, href: "/nhat-ky", title: "Nhật ký" },
];

export default function Today() {
  const { s, commit, ready } = useEight();
  if (!ready || !s) return <div className="p-10 text-mute">Đang tải…</div>;
  if (!s.profile.onboarding) return <Onboarding onDone={commit} />;

  const { done, count } = zangToday(s);
  const stars = starCount(s);
  const lv = levelOf(stars);
  const week = weekActivity(s);
  const nextId = nextTodoLessonId(s.profile.completed);
  const lesson = nextId ? lessonById(nextId) : null;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-8 lg:px-10 lg:py-12">
      <p className="text-sm text-mute">
        ⭐ {stars} sao · Chuỗi {s.profile.streak.count} ngày · Cấp {lv.index + 1} {lv.level.name}
      </p>

      {lesson ? (
        <Link href={`/lesson/${nextId}`} className="panel mt-6 block border-lime p-6 transition hover:bg-lime/5">
          <p className="text-xs uppercase tracking-wider text-lime">Bài tiếp theo trong lộ trình</p>
          <p className="mt-2 font-serif text-3xl leading-tight">{lesson.title}</p>
          <p className="mt-1 text-sm text-mute">Khoảng {lesson.minutes} phút · học xong mở bài kế tiếp</p>
          <span className="btn-lime mt-4 inline-flex">Học ngay →</span>
        </Link>
      ) : (
        <div className="panel mt-6 border-lime p-6">
          <p className="font-serif text-2xl">Em đã học hết lộ trình!</p>
          <p className="mt-1 text-sm text-mute">
            Vào <Link href="/kho" className="text-lime">Kho</Link> để ôn lại hoặc luyện đề nhé.
          </p>
        </div>
      )}

      <p className="mt-8 text-xs uppercase tracking-wider text-mute">Luyện thêm mỗi ngày · đã xong {count}/4</p>
      <ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STEPS.map((x) => {
          const on = done.has(x.n);
          return (
            <li key={x.n}>
              <Link
                href={x.href}
                className={`panel block p-3 text-center transition hover:border-lime ${on ? "opacity-50" : ""}`}
              >
                <p className="text-sm">{on ? "✓ " : ""}{x.title}</p>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="panel mt-6 p-5">
        <div className="flex items-baseline justify-between">
          <p className="text-sm">Cấp {lv.index + 1} · {lv.level.name}</p>
          <p className="text-xs text-mute">
            {lv.next ? `còn ${lv.next.need - stars} sao lên cấp ${lv.index + 2}` : "cấp cao nhất"}
          </p>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-lime transition-all" style={{ width: `${Math.round(lv.progress * 100)}%` }} />
        </div>
        <div className="mt-4 border-t border-line pt-4">
          <GrowTree stars={stars} />
        </div>
        <div className="mt-4 flex gap-1.5">
          {week.map((d) => (
            <div
              key={d.day}
              className={`flex-1 rounded-lg border py-1.5 text-center text-[11px] ${
                d.active ? "border-lime bg-lime/10 text-lime" : "border-line text-mute"
              } ${d.isToday ? "ring-1 ring-lime" : ""}`}
              title={d.day}
            >
              <p className="font-semibold">{d.label}</p>
              <p>{d.active ? "✓" : "·"}</p>
            </div>
          ))}
        </div>
      </div>

      <DailyChallenge s={s} />

      <p className="mt-auto pt-8 text-sm text-mute">
        Muốn luyện đề IELTS hay học tự do thì vào{" "}
        <Link className="text-lime" href="/kho">
          Kho
        </Link>{" "}
        nhé.
      </p>
      {s.profile.userId === "zang" && <GuiThay s={s} />}
    </div>
  );
}
