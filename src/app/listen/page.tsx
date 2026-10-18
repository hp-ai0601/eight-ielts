"use client";

import { lessonsOfKind } from "@/lib/content";
import { useEight } from "@/lib/useEight";
import SkillList from "@/components/SkillList";

export default function ListenPage() {
  const { s, ready } = useEight();
  if (!ready || !s) return null;
  const items = lessonsOfKind("listen");
  return (
    <div className="mx-auto max-w-2xl px-5 py-10 lg:px-10">
      <h1 className="font-serif text-4xl">Nghe</h1>
      <p className="mt-3 text-mute">
        Academic Listening: 4 phần, 40 câu, ~30 phút. Bẫy kinh điển là thông tin bị sửa giữa chừng. {items.length} bài
        trong lộ trình — audio giọng máy, đủ để luyện tai trước khi mua đề Cambridge.
      </p>
      <SkillList items={items} />
    </div>
  );
}
