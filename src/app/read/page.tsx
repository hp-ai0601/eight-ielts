"use client";

import { lessonsOfKind } from "@/lib/content";
import { useEight } from "@/lib/useEight";
import SkillList from "@/components/SkillList";

export default function ReadPage() {
  const { s, ready } = useEight();
  if (!ready || !s) return null;
  const items = lessonsOfKind("read");
  return (
    <div className="mx-auto max-w-2xl px-5 py-10 lg:px-10">
      <h1 className="font-serif text-4xl">Luyện đọc</h1>
      <p className="mt-3 text-mute">
        Academic Reading gồm 3 đoạn, 60 phút, 40 câu. Kỹ năng quan trọng nhất là nhận ra paraphrase và làm dạng
        True/False/Not Given. Có {items.length} bài luyện, từ thông báo ngắn đến đoạn học thuật.
      </p>
      <SkillList items={items} />
    </div>
  );
}
