"use client";

import { useState } from "react";
import Link from "next/link";
import { STAGES, allLessonIds, lessonById } from "@/lib/content";
import { useEight } from "@/lib/useEight";
import Studio, { RailPick } from "@/components/Studio";

export default function PathPage() {
  const { s, ready } = useEight();
  const [id, setId] = useState<string | null>(null);
  if (!ready || !s) return null;
  const total = allLessonIds().length;
  const done = s.profile.completed.filter((x) => allLessonIds().includes(x)).length;
  const st = STAGES.find((x) => x.id === (id ?? s.profile.stageId)) ?? STAGES[0];

  return (
    <Studio
      title={st.title}
      kicker={`${st.band} · ${done}/${total}`}
      next={{ href: "/kho", label: "Kho" }}
      rail={STAGES.map((x) => (
        <RailPick key={x.id} on={x.id === st.id} onClick={() => setId(x.id)}>
          <p className="text-[11px] text-lime">{x.band}</p>
          <p className="mt-0.5 font-serif text-lg leading-tight">{x.title}</p>
          {s.profile.stageId === x.id ? <p className="mt-0.5 text-[11px] text-mute">Bạn đang ở đây</p> : null}
        </RailPick>
      ))}
      stage={
        <div className="mx-auto max-w-lg">
          <p className="text-sm text-mute">{st.promise}</p>
          <div className="mt-6 space-y-5">
            {st.units.map((u) => (
              <div key={u.id}>
                <p className="font-medium">{u.title}</p>
                <p className="mt-0.5 text-sm text-mute">{u.why}</p>
                <ul className="mt-2 space-y-1">
                  {u.lessons.map((lid) => {
                    const l = lessonById(lid);
                    const ok = s.profile.completed.includes(lid);
                    return (
                      <li key={lid}>
                        <Link href={`/lesson/${lid}`} className={`text-sm ${ok ? "text-mute line-through" : "hover:text-lime"}`}>
                          {ok ? "✓ " : ""}
                          {l?.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}
