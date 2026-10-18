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
      <h1 className="font-serif text-4xl">Đọc</h1>
      <p className="mt-3 text-mute">
        Academic Reading: 3 đoạn, 60 phút, 40 câu. Skill cốt lõi là paraphrase và True/False/Not Given. {items.length}{" "}
        bài, từ thông báo tới đoạn Academic.
      </p>
      <SkillList items={items} />
    </div>
  );
}
