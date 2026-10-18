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
        Mỗi đợt 4 cụm, không phải 1 câu/ngày. Tách thì + cấu trúc, viết thêm câu cùng khuôn. Câu mẫu có dịch và ngữ pháp.
        Đổi đợt bất lúc nào. Truyện gốc (Hân Hân / Khoa), không copy tiểu thuyết.
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
