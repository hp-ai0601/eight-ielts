"use client";

import { useState } from "react";
import Link from "next/link";
import { STAGES } from "@/lib/content";
import { addCardsFromLesson, completeLesson, due, nextLesson, overallBand, progress, testProgress } from "@/lib/store";
import { useEight } from "@/lib/useEight";
import Onboarding from "@/components/Onboarding";
import BandMeter from "@/components/BandMeter";
import SrsDeck from "@/components/SrsDeck";
import LessonView from "@/components/LessonView";

export default function Today() {
  const { s, commit, ready } = useEight();
  const [phase, setPhase] = useState<"idle" | "cards" | "lesson">("idle");

  if (!ready || !s) return <div className="p-10 text-mute">Đang mở studio…</div>;
  if (!s.profile.onboarding) return <Onboarding onDone={commit} />;

  const lesson = nextLesson(s);
  const dueN = due(s).length;
  const prog = progress(s);
  const stage = STAGES.find((x) => x.id === s.profile.stageId)!;

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-5 py-10 lg:grid-cols-[1fr_280px] lg:px-10">
      <div>
        {phase === "idle" && (
          <>
            <p className="text-sm text-mute">Hôm nay</p>
            <h1 className="mt-2 font-serif text-4xl">Một phiên. Rồi dừng.</h1>
            <p className="mt-3 max-w-xl text-mute">
              {dueN} thẻ đến hạn · tiếp theo: {lesson?.title}. Tầng {stage.title} ({stage.band}).
            </p>
            <button className="btn-lime mt-8" onClick={() => setPhase(dueN ? "cards" : "lesson")}>
              Bắt đầu phiên {s.profile.minutes}′
            </button>
            <p className="mt-6 text-sm text-mute">
              Đã học {prog.done}/{prog.total} bài lộ trình · đề {testProgress(s).done}/{testProgress(s).total} · streak{" "}
              {s.profile.streak.count} ngày · {s.profile.minutesToday}′ hôm nay
            </p>
            {s.homework.some((h) => !h.done) && (
              <Link href="/homework" className="mt-4 block text-sm text-lime">
                Bài tập về nhà: {s.homework.filter((h) => !h.done).length} bài mở
              </Link>
            )}
          </>
        )}

        {phase === "cards" && (
          <SrsDeck
            state={s}
            doneLabel="Sang bài học"
            onDone={(next) => {
              commit(next);
              setPhase("lesson");
            }}
          />
        )}

        {phase === "lesson" && lesson && (
          <LessonView
            lesson={lesson}
            onComplete={({ minutes, skillBand, skill }) => {
              let next = addCardsFromLesson(s, lesson);
              next = completeLesson(next, lesson, minutes, skill && skillBand ? { [skill]: skillBand } : undefined);
              commit(next);
              setPhase("idle");
            }}
          />
        )}
      </div>

      <div className="space-y-4">
        <BandMeter bands={s.profile.bands} />
        <div className="panel p-5">
          <p className="text-xs uppercase tracking-wider text-mute">Overall</p>
          <p className="mt-2 font-serif text-3xl">{overallBand(s).toFixed(1)} → 8.0</p>
          <Link href="/path" className="mt-3 inline-block text-sm text-lime">
            Xem lộ trình
          </Link>
        </div>
      </div>
    </div>
  );
}
