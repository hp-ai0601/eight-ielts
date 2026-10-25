"use client";

import { useMemo, useState } from "react";
import { LEXICON } from "@/lib/lexicon";
import { CLASS_WORDS } from "@/lib/zang/content";
import Hear from "@/components/Hear";
import type { Assignment } from "@/lib/classroom";

type Q = { word: string; vi: string; options: string[]; pick?: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Kiểm tra nhanh 10 câu trắc nghiệm nghĩa từ bài thầy giao. */
export default function QuickQuiz({
  assignment,
  onDone,
  onClose,
}: {
  assignment: Assignment;
  onDone: (ok: number, total: number) => void;
  onClose: () => void;
}) {
  const qs = useMemo<Q[]>(() => {
    const classMap = new Map(CLASS_WORDS.map((w) => [w.word.toLowerCase(), w.vi]));
    const picked = shuffle(assignment.words)
      .slice(0, 10)
      .map((w) => {
        const key = w.toLowerCase();
        const lex = LEXICON.find((x) => x.word.toLowerCase() === key);
        const vi = lex?.vi ?? classMap.get(key);
        if (!vi) return null;
        const pool = shuffle(LEXICON.filter((x) => x.vi !== vi)).slice(0, 3).map((x) => x.vi);
        return { word: w, vi, options: shuffle([vi, ...pool]) };
      })
      .filter((x): x is Q => !!x);
    return picked;
  }, [assignment]);

  const [i, setI] = useState(0);
  const [ok, setOk] = useState(0);
  const [answers, setAnswers] = useState<Q[]>(qs);
  const q = answers[i];

  if (!qs.length) {
    return (
      <div className="panel p-5">
        <p className="text-sm text-mute">Chưa tra được nghĩa các từ trong bài giao này.</p>
        <button className="btn-ghost mt-3" onClick={onClose}>
          Đóng
        </button>
      </div>
    );
  }

  if (!q) {
    return (
      <div className="panel p-6">
        <p className="font-serif text-3xl">
          {ok}/{qs.length}
        </p>
        <p className="mt-2 text-sm text-mute">
          {ok / qs.length >= 0.8 ? "Tốt lắm — báo thầy ngay!" : "Ôn lại rồi kiểm tra lần nữa nhé, sai bây giờ không sao cả."}
        </p>
        <button className="btn-lime mt-4" onClick={() => onDone(ok, qs.length)}>
          Nộp kết quả cho thầy
        </button>
      </div>
    );
  }

  return (
    <div className="panel p-5">
      <p className="text-[11px] uppercase tracking-wider text-mute">
        Kiểm tra nhanh · câu {i + 1}/{qs.length} · đúng {ok}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <p className="font-serif text-3xl">{q.word}</p>
        <Hear text={q.word} />
      </div>
      <p className="mt-1 text-sm text-mute">Chọn nghĩa tiếng Việt đúng:</p>
      <div className="mt-3 grid gap-2">
        {q.options.map((op) => {
          const chosen = q.pick === op;
          const right = q.pick != null && op === q.vi;
          const wrong = chosen && op !== q.vi;
          return (
            <button
              key={op}
              disabled={q.pick != null}
              onClick={() => {
                const next = answers.map((x, idx) => (idx === i ? { ...x, pick: op } : x));
                setAnswers(next);
                if (op === q.vi) setOk((n) => n + 1);
              }}
              className={`rounded-xl border px-4 py-2.5 text-left text-sm ${
                right ? "border-lime bg-lime/10" : wrong ? "border-red-400 bg-red-400/10" : "border-line"
              }`}
            >
              {op}
            </button>
          );
        })}
      </div>
      {q.pick != null && (
        <button className="btn-lime mt-4" onClick={() => setI(i + 1)}>
          {i + 1 >= qs.length ? "Xem kết quả" : "Câu tiếp"}
        </button>
      )}
    </div>
  );
}
