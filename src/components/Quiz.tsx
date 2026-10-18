"use client";

import { useState } from "react";
import type { Question } from "@/lib/content/types";

export default function Quiz({ questions, onDone }: { questions: Question[]; onDone: (ok: number) => void }) {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState("");
  const [ok, setOk] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const q = questions[i];
  if (!q) return null;
  const correct = pick.trim().toLowerCase() === q.answer.trim().toLowerCase();

  return (
    <div className="mt-6">
      <p className="text-xs text-mute">
        {i + 1}/{questions.length}
      </p>
      <p className="mt-2 text-lg">{q.prompt}</p>
      {q.options ? (
        <div className="mt-3 grid gap-2">
          {q.options.map((o) => (
            <button
              key={o}
              className={`rounded-xl border px-3 py-2 text-left text-sm ${pick === o ? "border-lime" : "border-line"}`}
              onClick={() => setPick(o)}
              disabled={revealed}
            >
              {o}
            </button>
          ))}
        </div>
      ) : (
        <input className="field mt-3" value={pick} onChange={(e) => setPick(e.target.value)} disabled={revealed} />
      )}
      {!revealed ? (
        <button className="btn-ghost mt-4" disabled={!pick} onClick={() => setRevealed(true)}>
          Kiểm tra
        </button>
      ) : (
        <div className="mt-4">
          <p className={correct ? "text-lime" : "text-bad"}>{correct ? "Đúng." : `Sai. Đáp: ${q.answer}`}</p>
          <p className="mt-2 text-sm text-mute">{q.why}</p>
          <button
            className="btn-lime mt-4"
            onClick={() => {
              const n = ok + (correct ? 1 : 0);
              if (i + 1 >= questions.length) onDone(n);
              else {
                setOk(n);
                setI(i + 1);
                setPick("");
                setRevealed(false);
              }
            }}
          >
            {i + 1 >= questions.length ? "Xong bài" : "Câu tiếp"}
          </button>
        </div>
      )}
    </div>
  );
}
