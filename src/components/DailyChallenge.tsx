"use client";

import { useMemo, useState } from "react";
import { LEXICON } from "@/lib/lexicon";
import { challengeRecord, logChallengeDay } from "@/lib/stars";
import Hear from "@/components/Hear";
import type { State } from "@/lib/store";

type Q =
  | { kind: "mcq"; word: string; vi: string; options: string[]; pick?: string }
  | { kind: "fill"; word: string; vi: string; sentence: string; answer?: string };

const today = () => new Date().toISOString().slice(0, 10);

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let x = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    x = (x * 1103515245 + 12345) % 2147483648;
    const j = x % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function blankOf(sentence: string, word: string): string | null {
  const re = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
  if (!re.test(sentence)) return null;
  return sentence.replace(re, "_____");
}

/** Thử thách 5 câu mỗi ngày (~5 phút): trắc nghiệm nghĩa + điền từ vào câu.
 *  Sai không sao — sai ở đây để nhớ lâu hơn, vẫn được sao cố gắng. */
export default function DailyChallenge({ s }: { s: State }) {
  const day = today();
  const already = challengeRecord();
  const doneToday = already.day === day;

  const qs = useMemo<Q[]>(() => {
    const seed = hash(day);
    const fromCards = s.cards
      .filter((c) => c.front && c.back)
      .map((c) => ({ word: c.front, vi: c.back, example: c.example ?? "" }));
    const fromLex = shuffle(LEXICON.filter((x) => x.example && x.vi), seed).slice(0, 40).map((x) => ({
      word: x.word,
      vi: x.vi,
      example: x.example,
    }));
    const pool = shuffle(fromCards.length >= 5 ? fromCards : fromLex, seed + 7);
    const viPool = shuffle(LEXICON, seed + 13).map((x) => x.vi);
    const out: Q[] = [];
    for (const it of pool) {
      if (out.length >= 5) break;
      if (out.length % 2 === 0) {
        const distract = viPool.filter((v) => v !== it.vi).slice(0, 3);
        if (distract.length < 3) continue;
        out.push({ kind: "mcq", word: it.word, vi: it.vi, options: shuffle([it.vi, ...distract], seed + out.length) });
      } else {
        const blank = it.example ? blankOf(it.example, it.word) : null;
        if (!blank) {
          const distract = viPool.filter((v) => v !== it.vi).slice(0, 3);
          if (distract.length < 3) continue;
          out.push({ kind: "mcq", word: it.word, vi: it.vi, options: shuffle([it.vi, ...distract], seed + out.length) });
        } else {
          out.push({ kind: "fill", word: it.word, vi: it.vi, sentence: blank });
        }
      }
    }
    return out;
  }, [day, s.cards]);

  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Q[]>(qs);
  const [typed, setTyped] = useState("");
  const [okCount, setOkCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = answers[i];

  if (!qs.length) return null;

  if (doneToday && !finished) {
    return (
      <div className="panel mt-6 p-5">
        <p className="text-[11px] uppercase tracking-wider text-lime">Thử thách hôm nay</p>
        <p className="mt-2 text-sm">
          Xong rồi — hôm nay em kiếm được <span className="text-lime">{already.stars} sao</span> từ thử thách. Mai quay
          lại có thử thách mới nhé.
        </p>
      </div>
    );
  }

  function grade(correct: boolean) {
    if (!q) return;
    if (correct) setOkCount((n) => n + 1);
    if (i + 1 >= answers.length) {
      const stars = (okCount + (correct ? 1 : 0)) * 2 + Math.max(0, answers.length - okCount - (correct ? 1 : 0));
      logChallengeDay(stars);
      setFinished(true);
    } else {
      setI(i + 1);
      setTyped("");
    }
  }

  if (finished || !q) {
    return (
      <div className="panel mt-6 p-5">
        <p className="text-[11px] uppercase tracking-wider text-lime">Thử thách hôm nay</p>
        <p className="mt-2 font-serif text-3xl">
          Đúng {okCount}/{answers.length} câu
        </p>
        <p className="mt-2 text-sm text-mute">
          {okCount === answers.length
            ? "Tuyệt vời — full sao luôn!"
            : okCount >= 3
              ? "Làm tốt lắm — mấy câu sai mai ôn lại là nhớ."
              : "Không sao cả — sai ở đây còn hơn sai trong bài thi. Mai thử lại nhé."}
        </p>
        <p className="mt-2 text-sm text-lime">
          +{okCount * 2 + Math.max(0, answers.length - okCount)} sao (sai vẫn được sao cố gắng)
        </p>
      </div>
    );
  }

  return (
    <div className="panel mt-6 p-5">
      <p className="text-[11px] uppercase tracking-wider text-lime">
        Thử thách hôm nay · câu {i + 1}/{answers.length} · đúng {okCount}
      </p>

      {q.kind === "mcq" ? (
        <>
          <div className="mt-3 flex items-center gap-3">
            <p className="font-serif text-2xl">{q.word}</p>
            <Hear text={q.word} />
          </div>
          <p className="mt-1 text-sm text-mute">Từ này nghĩa là gì?</p>
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
                    setAnswers(answers.map((x, idx) => (idx === i ? { ...x, pick: op } : x)));
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
            <button className="btn-lime mt-4" onClick={() => grade(q.pick === q.vi)}>
              {i + 1 >= answers.length ? "Xem kết quả" : "Câu tiếp"}
            </button>
          )}
        </>
      ) : (
        <>
          <p className="mt-3 text-sm text-mute">Điền từ còn thiếu vào câu:</p>
          <p className="mt-2 leading-7">{q.sentence}</p>
          <p className="mt-1 text-sm text-mute">Nghĩa của từ cần điền: {q.vi}</p>
          <div className="mt-3 flex gap-2">
            <input
              className="field"
              value={q.answer ?? typed}
              disabled={q.answer != null}
              onChange={(e) => setTyped(e.target.value)}
              placeholder="Gõ từ tiếng Anh…"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
            <Hear text={q.word} />
          </div>
          {q.answer == null ? (
            <button
              className="btn-lime mt-3"
              disabled={!typed.trim()}
              onClick={() => setAnswers(answers.map((x, idx) => (idx === i ? { ...x, answer: typed.trim() } : x)))}
            >
              Kiểm tra
            </button>
          ) : (
            <>
              <p className={`mt-3 text-sm ${q.answer.toLowerCase() === q.word.toLowerCase() ? "text-lime" : "text-red-400"}`}>
                {q.answer.toLowerCase() === q.word.toLowerCase() ? "Chính xác!" : `Chưa đúng — đáp án là “${q.word}”.`}
              </p>
              <button
                className="btn-lime mt-3"
                onClick={() => grade(q.answer?.toLowerCase() === q.word.toLowerCase())}
              >
                {i + 1 >= answers.length ? "Xem kết quả" : "Câu tiếp"}
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
