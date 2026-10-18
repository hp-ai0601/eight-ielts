"use client";

import Link from "next/link";
import { useEight } from "@/lib/useEight";

export default function HomeworkPage() {
  const { s, ready } = useEight();
  if (!ready || !s) return null;
  const open = s.homework.filter((h) => !h.done);
  const done = s.homework.filter((h) => h.done);
  return (
    <div className="mx-auto max-w-2xl px-5 py-10 lg:px-10">
      <h1 className="font-serif text-4xl">Bài tập về nhà</h1>
      <p className="mt-3 text-mute">
        Mỗi chủ đề có một bài nộp. Hạn hôm nay hoặc ngày mai. Xong thì từ trong bài vào SRS.
      </p>
      <ul className="mt-8 space-y-3">
        {open.map((h) => (
          <li key={h.id} className="panel p-4">
            <Link href={`/tests/${h.testId}`} className="block">
              <p className="font-medium">{h.title}</p>
              <p className="text-sm text-mute">Hạn {h.due}</p>
            </Link>
          </li>
        ))}
        {!open.length && <p className="text-mute">Không còn bài mở. Làm thêm đề trong Ngân hàng.</p>}
      </ul>
      {done.length > 0 && (
        <>
          <p className="mt-10 text-xs uppercase tracking-wider text-mute">Đã nộp</p>
          <ul className="mt-3 space-y-2 text-sm text-mute">
            {done.map((h) => (
              <li key={h.id} className="line-through">
                {h.title}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
