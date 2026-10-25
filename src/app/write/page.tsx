"use client";

import { useMemo, useState } from "react";
import { BAND8, EXAM } from "@/lib/ielts";
import { WRITE } from "@/lib/content";
import WriteBox from "@/components/WriteBox";
import PlayBar from "@/components/PlayBar";
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
    <div className="mx-auto max-w-2xl px-5 py-10 pb-28 lg:px-10">
      <h1 className="font-serif text-4xl">Luyện viết</h1>
      <p className="mt-3 text-mute">
        Tổng {EXAM.writing.minutes} phút: Task 1 viết ít nhất {EXAM.writing.task1} từ (khoảng 20 phút), Task 2 ít nhất{" "}
        {EXAM.writing.task2} từ (khoảng 40 phút). Có {WRITE.filter((w) => w.task === 1).length} đề biểu đồ và{" "}
        {WRITE.filter((w) => w.task === 2).length} đề luận, đủ các dạng agree / discuss / problem / two-part.
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
          Đổi đề khác
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
      <div className="panel mt-8 p-6 pb-28" key={prompt.id}>
        <WriteBox
          prompt={prompt.prompt}
          min={prompt.min}
          data={prompt.data}
          onScored={(band) => commit(recordPractice(load(), task === 1 ? 20 : 40, { w: band }))}
        />
      </div>
      <PlayBar key={`${task}-${prompt.id}`} minutes={task === 1 ? 20 : 40} />
    </div>
  );
}
