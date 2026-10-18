"use client";

import Link from "next/link";
import { useEight } from "@/lib/useEight";
import NhatKy from "@/components/zang/NhatKy";

export default function NhatKyPage() {
  const { s, commit, ready } = useEight();
  if (!ready || !s) return null;
  return (
    <div className="mx-auto max-w-xl px-5 py-10 lg:px-10">
      <p className="text-xs uppercase tracking-wider text-lime">Bước 4 / 4</p>
      <h1 className="mt-2 font-serif text-4xl">Nhật ký</h1>
      <p className="mt-3 text-mute">
        Mỗi đợt 4 chủ đề, 4 từ, 4 thì — chọn rồi viết journal. Không phải 1 từ/ngày, cũng không phải luận IELTS.
      </p>
      <div className="mt-8">
        <NhatKy s={s} onDone={commit} />
      </div>
      <Link href="/" className="mt-10 inline-block text-sm text-lime">
        Về bốn bước hôm nay
      </Link>
    </div>
  );
}
