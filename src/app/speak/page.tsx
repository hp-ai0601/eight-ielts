"use client";

import { useMemo, useState } from "react";
import { BAND8, EXAM } from "@/lib/ielts";
import { SPEAK } from "@/lib/content";
import SpeakBox from "@/components/SpeakBox";
import PlayBar from "@/components/PlayBar";
import { load, recordPractice } from "@/lib/store";
import { useEight } from "@/lib/useEight";

const PARTS = [0, 1, 2, 3] as const;
const LABELS = ["Tất cả", "Part 1", "Part 2", "Part 3"];

export default function SpeakPage() {
  const { commit, ready, s } = useEight();
  const [part, setPart] = useState<(typeof PARTS)[number]>(0);
  const [i, setI] = useState(0);
  const pool = useMemo(() => (part === 0 ? SPEAK : SPEAK.filter((x) => x.part === part)), [part]);
  const cue = pool[i % pool.length];
  if (!ready || !s || !cue) return null;

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 pb-28 lg:px-10">
      <h1 className="font-serif text-4xl">Nói</h1>
      <p className="mt-3 text-mute">
        {EXAM.speaking.minutes} phút, 3 phần. {SPEAK.length} cue theo chủ đề IELTS — luyện trong phòng này không cần đợi
        tới bài trên lộ trình.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {PARTS.map((p, idx) => (
          <button
            key={p}
            className={part === p ? "btn-lime" : "btn-ghost"}
            onClick={() => {
              setPart(p);
              setI(0);
            }}
          >
            {LABELS[idx]}
          </button>
        ))}
        <button className="btn-ghost" onClick={() => setI((n) => n + 1)}>
          Đề khác
        </button>
      </div>
      <p className="mt-3 text-sm text-mute">
        {cue.topic} · {i % pool.length + 1}/{pool.length}
      </p>
      <ul className="mt-6 space-y-2 text-sm text-mute">
        {BAND8.speaking.map((x) => (
          <li key={x}>— {x}</li>
        ))}
      </ul>
      <div className="panel mt-8 p-6 pb-28" key={cue.id}>
        <SpeakBox
          cue={cue.cue}
          bullets={cue.bullets}
          onScored={(band) => commit(recordPractice(load(), 10, { s: band }))}
        />
      </div>
      <PlayBar minutes={cue.part === 2 ? 2 : 5} audio={cue.cue} />
    </div>
  );
}
