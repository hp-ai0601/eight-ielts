"use client";

import { useMemo, useState } from "react";
import { BAND8, EXAM } from "@/lib/ielts";
import { WRITE } from "@/lib/content";
import WriteBox from "@/components/WriteBox";
import { load, recordPractice } from "@/lib/store";
import { useEight } from "@/lib/useEight";

export default function WritePage() {
  const { commit, ready, s } = useEight();
  const [task, setTask] = useState<1 | 2>(2);
  const [i, setI] = useState(0);
  const pool = useMemo(() => WRITE.filter((x) => x.task === task), [task]);
  const prompt = pool[i % pool.length];
  if (!ready || !s || !prompt) return null;

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 lg:px-10">
      <h1 className="font-serif text-4xl">Viết</h1>
      <p className="mt-3 text-mute">
        {EXAM.writing.minutes} phút. Task 1 ≥ {EXAM.writing.task1} từ (~20′). Task 2 ≥ {EXAM.writing.task2} từ (~40′).{" "}
        {WRITE.filter((w) => w.task === 1).length} đề biểu đồ · {WRITE.filter((w) => w.task === 2).length} đề luận, đủ dạng
        agree / discuss / problem / two-part.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className={task === 1 ? "btn-lime" : "btn-ghost"}
          onClick={() => {
            setTask(1);
            setI(0);
          }}
        >
          Task 1
        </button>
        <button
          className={task === 2 ? "btn-lime" : "btn-ghost"}
          onClick={() => {
            setTask(2);
            setI(0);
          }}
        >
          Task 2
        </button>
        <button className="btn-ghost" onClick={() => setI((n) => n + 1)}>
          Đề khác
        </button>
      </div>
      <p className="mt-3 text-sm text-mute">
        {prompt.topic} · {prompt.type} · {i % pool.length + 1}/{pool.length}
      </p>
      <ul className="mt-6 space-y-2 text-sm text-mute">
        {BAND8.writing.map((x) => (
          <li key={x}>— {x}</li>
        ))}
      </ul>
      <div className="panel mt-8 p-6" key={prompt.id}>
        <WriteBox
          prompt={prompt.prompt}
          min={prompt.min}
          data={prompt.data}
          minutes={task === 1 ? 20 : 40}
          onScored={(band) => commit(recordPractice(load(), task === 1 ? 20 : 40, { w: band }))}
        />
      </div>
    </div>
  );
}
