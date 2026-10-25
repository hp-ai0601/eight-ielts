"use client";

import { useState } from "react";
import { checkText, type Check } from "@/lib/zang/check";
import { scoreSentence } from "@/lib/score/write";

function RedWords({ text, check }: { text: string; check: Check }) {
  const bad = new Set(check.spelling.map((x) => x.from.toLowerCase()));
  return (
    <p className="font-serif text-lg leading-relaxed">
      {text.split(/(\s+)/).map((tok, i) => {
        const w = tok.replace(/^[^a-zA-Z']+|[^a-zA-Z']+$/g, "");
        const hit = w && bad.has(w.toLowerCase());
        return (
          <span key={i} className={hit ? "text-bad underline decoration-bad" : undefined}>
            {tok}
          </span>
        );
      })}
    </p>
  );
}

export default function ChamCau({
  check,
  text,
  extra = [],
  tense,
  onClean,
}: {
  check: Check;
  text: string;
  extra?: string[];
  tense?: string;
  onClean?: (text: string, c: Check) => void;
}) {
  const [fix, setFix] = useState(text);
  const live = checkText(fix, extra, tense);
  const good = live.clean;
  const target = extra[0] ?? "";
  const sentenceMark = scoreSentence(fix, target, tense);

  return (
    <div className="panel mt-5 p-4">
      <p className="text-xs uppercase tracking-wider text-lime">Chấm cho Zang</p>
      <div className="mt-2 flex items-baseline gap-3">
        <p className={`font-serif text-4xl ${good ? "text-lime" : "text-bad"}`}>{live.score}/10</p>
        <p className="text-sm text-mute">≈ IELTS {sentenceMark.band} · {sentenceMark.notes[0]}</p>
      </div>
      <div className="mt-4">
        <p className="text-xs text-mute">Câu em viết</p>
        <RedWords text={fix} check={live} />
      </div>
      {live.spelling.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-bad">Lỗi chính tả — các chữ màu đỏ</p>
          <ul className="mt-1 space-y-1 text-sm">
            {live.spelling.map((x) => (
              <li key={x.from}>
                <span className="text-bad line-through">{x.from}</span>
                {" → "}
                <span className="text-lime">{x.to}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {live.grammar.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-bad">Thì / ngữ pháp</p>
          <ul className="mt-1 space-y-1 text-sm">
            {live.grammar.map((x) => (
              <li key={x.vi} className="text-bad">
                — {x.vi}
              </li>
            ))}
          </ul>
        </div>
      )}
      {good ? (
        <p className="mt-3 text-sm text-lime">Câu đã sạch lỗi chính tả, thì và ngữ pháp.</p>
      ) : (
        <>
          <p className="mt-4 text-xs text-mute">Câu gợi ý sửa — nhìn rồi viết lại cho hết chữ đỏ</p>
          <p className="mt-1 font-serif text-lg text-lime">{live.rewrite}</p>
          <textarea
            className="field mt-3 min-h-24 border-bad"
            value={fix}
            onChange={(e) => setFix(e.target.value)}
          />
          <p className="mt-2 text-sm text-bad">Chưa lưu được đâu — viết lại đến khi hết chữ đỏ nhé.</p>
        </>
      )}
      {onClean && (
        <button
          type="button"
          className="btn-lime mt-4"
          disabled={!good}
          onClick={() => onClean(fix.trim(), live)}
        >
          Lưu câu đã đúng
        </button>
      )}
    </div>
  );
}
