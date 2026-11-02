"use client";

import { useState } from "react";
import { GQ_BANK, GQ_LEVELS, GQ_TOPICS } from "@/lib/gquiz";
import Quiz from "@/components/Quiz";
import { addError, recordPractice } from "@/lib/store";
import { useEight } from "@/lib/useEight";
import Studio, { RailPick } from "@/components/Studio";

export default function GQuizPage() {
  const { s, commit, ready } = useEight();
  const [topic, setTopic] = useState(GQ_TOPICS[0].id);
  const [level, setLevel] = useState(0);
  if (!ready || !s) return null;
  const t = GQ_TOPICS.find((x) => x.id === topic) ?? GQ_TOPICS[0];
  const questions = (GQ_BANK[t.id] ?? [])[level] ?? [];

  return (
    <Studio
      title={t.vi}
      kicker={`${GQ_LEVELS[level].vi} ${GQ_LEVELS[level].stars} · ${t.en}`}
      next={{ href: "/grammar", label: "Ngữ pháp" }}
      rail={GQ_TOPICS.map((g) => (
        <RailPick key={g.id} on={topic === g.id} onClick={() => setTopic(g.id)}>
          <p className="font-serif text-base leading-tight">{g.vi}</p>
          <p className="mt-0.5 text-[11px] text-mute">{g.en}</p>
        </RailPick>
      ))}
      stage={
        <div className="mx-auto max-w-lg pb-8">
          <div className="flex gap-2">
            {GQ_LEVELS.map((l) => (
              <button
                key={l.lv}
                onClick={() => setLevel(l.lv)}
                className={`rounded-xl border px-3 py-2 text-sm ${
                  level === l.lv ? "border-lime text-lime" : "border-line text-mute hover:text-text"
                }`}
              >
                {l.vi} {l.stars}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-mute">
            Chọn đáp án đúng cho {questions.length} câu. Làm hết rồi bấm Nộp bài.
          </p>
          <Quiz
            key={`${t.id}-${level}`}
            questions={questions}
            onDone={(ok) => {
              let next = recordPractice(s, 8, { w: s.profile.bands.w + (ok >= questions.length - 1 ? 0.1 : 0) });
              if (ok < questions.length) next = addError(next, "g", `${t.vi} (${GQ_LEVELS[level].vi}): ${ok}/${questions.length}`);
              commit(next);
            }}
          />
        </div>
      }
    />
  );
}
