"use client";

import Link from "next/link";
import { useEight } from "@/lib/useEight";
import CumTruyen from "@/components/zang/CumTruyen";

export default function CumPage() {
  const { s, commit, ready } = useEight();
  if (!ready || !s) return null;
  return (
    <div className="mx-auto max-w-xl px-5 py-10 lg:px-10">
      <p className="text-xs uppercase tracking-wider text-lime">Bước 2 / 4</p>
      <h1 className="mt-2 font-serif text-4xl">Cụm truyện</h1>
      <p className="mt-3 text-mute">
        Zang dịch câu chuyện ra tiếng Việt, tách cụm: thì nào, cấu trúc nào, rồi viết thêm một câu cùng khuôn. Truyện
        gốc trong app (Hân Hân / Khoa), không copy tiểu thuyết.
      </p>
      <div className="mt-8">
        <CumTruyen s={s} onDone={commit} />
      </div>
      <Link href="/hai" className="mt-10 inline-block text-sm text-lime">
        Sang hài & nhạc →
      </Link>
    </div>
  );
}
