"use client";

import Link from "next/link";
import { KIND_LABEL, TESTS, TOPICS_ALL, mockTests } from "@/lib/bank";
import { useEight } from "@/lib/useEight";
import { testProgress } from "@/lib/store";

export default function TestsPage() {
  const { s, ready } = useEight();
  if (!ready || !s) return null;
  const prog = testProgress(s);
  const mocks = mockTests();
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 lg:px-10">
      <h1 className="font-serif text-4xl">Ngân hàng đề</h1>
      <p className="mt-3 text-mute">
        {TOPICS_ALL.length} chủ đề IELTS · {TESTS.length} bài test (gồm bài tập về nhà và 2 đề thi Academic đủ 4 kỹ năng). Đã
        làm {prog.done}/{prog.total}.
      </p>
      <section className="mt-8">
        <p className="text-xs uppercase tracking-wider text-lime">Bài thi thật</p>
        <ul className="mt-3 space-y-2">
          {mocks.map((t) => (
            <li key={t.id} className="panel p-4">
              <Link href={`/tests/${t.id}`} className="block">
                <p className={s.testsDone.includes(t.id) ? "text-mute line-through" : "font-medium"}>{t.title}</p>
                <p className="text-sm text-mute">
                  {KIND_LABEL[t.kind]} · {t.minutes}′ {t.questions ? `· ${t.questions.length} câu` : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {TOPICS_ALL.map((topic) => {
        const items = TESTS.filter((t) => t.topicId === topic.id);
        const done = items.filter((t) => s.testsDone.includes(t.id)).length;
        return (
          <details key={topic.id} className="mt-4">
            <summary className="cursor-pointer text-xs uppercase tracking-wider text-lime">
              {topic.vi} · {done}/{items.length}
            </summary>
            <ul className="mt-3 space-y-2">
              {items.map((t) => (
                <li key={t.id} className="panel p-4">
                  <Link href={`/tests/${t.id}`} className="block">
                    <p className={s.testsDone.includes(t.id) ? "text-mute line-through" : "font-medium"}>{t.title}</p>
                    <p className="text-sm text-mute">
                      {KIND_LABEL[t.kind]} · {t.minutes}′
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        );
      })}
    </div>
  );
}
