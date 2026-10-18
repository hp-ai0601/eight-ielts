"use client";

import Link from "next/link";
import { useEight } from "@/lib/useEight";
import TuCau from "@/components/zang/TuCau";

export default function TuPage() {
  const { s, commit, ready } = useEight();
  if (!ready || !s) return null;
  return (
    <div className="mx-auto max-w-xl px-5 py-10 lg:px-10">
      <p className="text-xs uppercase tracking-wider text-lime">Bước 1 / 4</p>
      <h1 className="mt-2 font-serif text-4xl">Từ → câu</h1>
      <p className="mt-3 text-mute">
        Zang: một từ bỏ vào câu lớp («lớp tôi có 5 người»). Hoặc trái nghĩa thành câu đối lập («cô ấy gầy còn bạn kia béo»).
      </p>
      <div className="mt-8">
        <TuCau s={s} onDone={commit} />
      </div>
      <Link href="/cum" className="mt-10 inline-block text-sm text-lime">
        Xong thì sang cụm truyện →
      </Link>
    </div>
  );
}
