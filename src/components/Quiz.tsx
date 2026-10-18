"use client";

import { useMemo, useState } from "react";
import type { Question } from "@/lib/content/types";

export default function Quiz({
  questions,
  onDone,
  onFilled,
  onReveal,
}: {
  questions: Question[];
  onDone: (ok: number) => void;
  onFilled?: (n: number) => void;
  onReveal?: (ok: number) => void;
}) {
  const [pick, setPick] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);
  const [ok, setOk] = useState<number | null>(null);

  const keys = useMemo(() => questions.map((q, i) => q.id || String(i)), [questions]);

  function setAns(key: string, v: string) {
    if (revealed) return;
    const next = { ...pick, [key]: v };
    setPick(next);
    onFilled?.(Object.values(next).filter((x) => x.trim()).length);
  }

  function submit() {
    let n = 0;
    questions.forEach((q, i) => {
      const a = (pick[keys[i]] ?? "").trim().toLowerCase();
      if (a && a === q.answer.trim().toLowerCase()) n += 1;
    });
    setOk(n);
    setRevealed(true);
    onReveal?.(n);
  }

  if (!questions.length) return null;
  const filled = Object.values(pick).filter((x) => x.trim()).length;

  return (
    <div className="mt-6">
      <div className="sticky top-0 z-20 -mx-1 mb-4 border-b border-line bg-bg/95 px-1 py-2 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-mute">
            {questions.length} câu · hiện hết
          </p>
          {!revealed && (
            <button className="btn-lime shrink-0" onClick={submit}>
              Nộp bài
            </button>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {questions.map((q, i) => {
            const k = keys[i];
            const a = pick[k];
            const right = revealed && a?.trim().toLowerCase() === q.answer.trim().toLowerCase();
            const wrong = revealed && a && !right;
            return (
              <a
                key={k}
                href={`#q-${k}`}
                className={`grid h-7 w-7 place-items-center rounded-md text-xs ${
                  right
                    ? "bg-lime text-bg"
                    : wrong
                      ? "bg-bad text-bg"
                      : a
                        ? "border border-lime text-lime"
                        : "border border-line text-mute"
                }`}
              >
                {i + 1}
              </a>
            );
          })}
        </div>
      </div>

      <ol className="space-y-8">
        {questions.map((q, i) => {
          const k = keys[i];
          const a = pick[k] ?? "";
          const correct = a.trim().toLowerCase() === q.answer.trim().toLowerCase();
          return (
            <li key={k} id={`q-${k}`} className="scroll-mt-16">
              <p className="text-xs text-mute">Câu {i + 1}</p>
              <p className="mt-1 text-lg">{q.prompt}</p>
              {q.options ? (
                <div className="mt-3 grid gap-2">
                  {q.options.map((o) => {
                    const on = a === o;
                    let cls = on ? "border-lime" : "border-line";
                    if (revealed && o === q.answer) cls = "border-lime bg-lime/10";
                    else if (revealed && on && o !== q.answer) cls = "border-bad";
                    return (
                      <button
                        key={o}
                        className={`rounded-xl border px-3 py-2 text-left text-sm ${cls}`}
                        onClick={() => setAns(k, o)}
                        disabled={revealed}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <input
                  className="field mt-3"
                  value={a}
                  onChange={(e) => setAns(k, e.target.value)}
                  disabled={revealed}
                />
              )}
              {revealed && (
                <div className="mt-3">
                  <p className={correct ? "text-lime" : "text-bad"}>
                    {correct ? "Đúng." : `Sai. Đáp: ${q.answer}`}
                  </p>
                  <p className="mt-1 text-sm text-mute">{q.why}</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {!revealed ? (
        <button className="btn-lime mt-8" onClick={submit}>
          Nộp bài · đã làm {filled}/{questions.length}
        </button>
      ) : (
        <div className="mt-8">
          <p className="font-serif text-2xl">
            {ok}/{questions.length}
          </p>
          <button className="btn-lime mt-4" onClick={() => onDone(ok ?? 0)}>
            Xong bài
          </button>
        </div>
      )}
    </div>
  );
}
