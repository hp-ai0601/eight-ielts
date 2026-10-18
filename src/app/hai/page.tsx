"use client";

import Link from "next/link";
import { useEight } from "@/lib/useEight";
import HaiNhac from "@/components/zang/HaiNhac";

export default function HaiPage() {
  const { s, commit, ready } = useEight();
  if (!ready || !s) return null;
  return (
    <div className="mx-auto max-w-xl px-5 py-10 lg:px-10">
      <p className="text-xs uppercase tracking-wider text-lime">Bước 3 / 4</p>
      <h1 className="mt-2 font-serif text-4xl">Hài & nhạc</h1>
      <p className="mt-3 text-mute">
        Mỗi đợt 4 mẩu hài hoặc 3 bài nhạc — chọn bài, không kẹt 1 bài/ngày. Nghĩa trước → nghe không chữ → đoán → nghĩa +
        ngữ pháp → ghi âm. Đổi đợt được.
      </p>
      <div className="mt-8">
        <HaiNhac s={s} onDone={commit} />
      </div>
      <Link href="/nhat-ky" className="mt-10 inline-block text-sm text-lime">
        Sang nhật ký →
      </Link>
    </div>
  );
}
