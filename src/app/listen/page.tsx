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
      <h1 className="font-serif text-4xl">Luyện nghe</h1>
      <p className="mt-3 text-mute">
        Academic Listening gồm 4 phần, 40 câu, khoảng 30 phút. Bẫy hay gặp nhất là thông tin bị người nói sửa lại giữa
        chừng. Có {items.length} bài trong lộ trình — audio đọc bằng giọng máy, đủ để luyện tai trước khi làm đề Cambridge.
      </p>
      <SkillList items={items} />
    </div>
  );
}
