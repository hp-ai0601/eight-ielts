"use client";

import Link from "next/link";
import { STAGES, allLessonIds, lessonById } from "@/lib/content";
import { useEight } from "@/lib/useEight";

export default function PathPage() {
  const { s, ready } = useEight();
  if (!ready || !s) return null;
  const total = allLessonIds().length;
  const done = s.profile.completed.filter((id) => allLessonIds().includes(id)).length;
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 lg:px-10">
      <h1 className="font-serif text-4xl">Lộ trình tới 8.0</h1>
      <p className="mt-3 text-mute">
        {total} bài, năm tầng. Không nhảy cóc. Band 8 nằm ở độ sạch, không phải số lượng mẹo. Đã xong {done}/{total}.
      </p>
      <ol className="mt-10 space-y-10">
        {STAGES.map((st) => {
          const here = s.profile.stageId === st.id;
          return (
            <li key={st.id}>
              <p className="text-xs uppercase tracking-wider text-lime">{st.band}</p>
              <h2 className="mt-1 text-2xl font-semibold">
                {st.title}
                {here && <span className="ml-2 text-sm font-normal text-lime">bạn đang đây</span>}
              </h2>
              <p className="mt-1 text-sm text-mute">{st.promise}</p>
              {st.units.map((u) => (
                <div key={u.id} className="mt-4 panel p-4">
                  <p className="font-medium">{u.title}</p>
                  <p className="text-sm text-mute">{u.why}</p>
                  <ul className="mt-3 space-y-1">
                    {u.lessons.map((id) => {
                      const l = lessonById(id);
                      const done = s.profile.completed.includes(id);
                      return (
                        <li key={id}>
                          <Link href={`/lesson/${id}`} className={`text-sm ${done ? "text-mute line-through" : "hover:text-lime"}`}>
                            {l?.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
