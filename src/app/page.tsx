"use client";

import Link from "next/link";
import { useEight } from "@/lib/useEight";
import Onboarding from "@/components/Onboarding";
import { zangToday } from "@/lib/store";
import GuiThay from "@/components/zang/GuiThay";

const STEPS = [
  { n: 1, href: "/tu", title: "Từ → câu", why: "Một từ, bỏ vào câu lớp. Hoặc hai từ trái nghĩa, viết câu đối lập." },
  { n: 2, href: "/cum", title: "Cụm truyện", why: "Đọc câu chuyện, thì + cấu trúc, viết thêm một câu cùng khuôn." },
  { n: 3, href: "/hai", title: "Hài & nhạc", why: "Xem nghĩa trước. Nghe không chữ. Đoán. Ghép lại. Ghi âm khi thuộc." },
  { n: 4, href: "/nhat-ky", title: "Nhật ký", why: "Từ và ngữ pháp hôm nay đã chắc thì viết vài câu như journal." },
];

export default function Today() {
  const { s, commit, ready } = useEight();
  if (!ready || !s) return <div className="p-10 text-mute">Đang mở studio…</div>;
  if (!s.profile.onboarding) return <Onboarding onDone={commit} />;

  const { done, count } = zangToday(s);
  const next = STEPS.find((x) => !done.has(x.n)) ?? STEPS[0];

  return (
    <div className="mx-auto max-w-xl px-5 py-10 lg:px-10">
      <p className="text-sm text-lime">Cách Zang</p>
      <h1 className="mt-2 font-serif text-4xl leading-tight">Bốn bước. Rồi ngủ.</h1>
      <p className="mt-3 text-mute">
        Không nhảy đề IELTS. Hôm nay {count}/4 bước · streak {s.profile.streak.count} ngày.
      </p>
      <Link href={next.href} className="btn-lime mt-8 inline-flex">
        {count === 4 ? "Xem lại nhật ký" : `Tiếp: ${next.title}`}
      </Link>
      <ol className="mt-10 space-y-3">
        {STEPS.map((x) => {
          const on = done.has(x.n);
          return (
            <li key={x.n}>
              <Link href={x.href} className="panel block p-4 hover:border-lime">
                <p className="text-xs text-lime">
                  {x.n} {on ? "xong" : ""}
                </p>
                <p className={`mt-1 text-lg ${on ? "text-mute line-through" : "font-medium"}`}>{x.title}</p>
                <p className="mt-1 text-sm text-mute">{x.why}</p>
              </Link>
            </li>
          );
        })}
      </ol>
      <p className="mt-8 text-sm text-mute">
        Đề thi, 3500 từ, lộ trình 8.0 để ở{" "}
        <Link className="text-lime" href="/kho">
          Kho
        </Link>{" "}
        — khi em muốn, không phải hôm nay.
      </p>
      {s.profile.userId === "zang" && <GuiThay s={s} />}
    </div>
  );
}
