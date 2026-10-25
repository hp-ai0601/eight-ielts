"use client";

import { useState } from "react";
import { scoreWriting } from "@/lib/score/write";
import { savePaper } from "@/lib/store";
import { useEight } from "@/lib/useEight";

export default function WriteBox({
  prompt,
  min,
  data,
  onScored,
}: {
  prompt: string;
  min: number;
  data?: string;
  minutes?: number;
  onScored?: (band: number) => void;
}) {
  const { s, commit } = useEight();
  const [text, setText] = useState("");
  const kind = min >= 220 ? "t2" : "t1";
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const mark = text.trim().length > 40 ? scoreWriting(text, min, kind) : null;

  function send() {
    if (!mark) return;
    if (s) commit(savePaper(s, { kind, prompt, text, auto: mark }));
    onScored?.(mark.band);
  }

  return (
    <div>
      <p className="font-serif text-lg leading-relaxed">{prompt}</p>
      {data && <p className="mt-3 rounded-xl bg-bg p-3 font-serif text-sm text-mute">{data}</p>}
      <p className="mt-4 text-sm text-mute">
        Đã viết {words} / {min} từ · máy sẽ chấm thử 4 tiêu chí, band chính thức do thầy Hiệp chấm
      </p>
      <textarea
        className="field mt-3 min-h-56 font-serif"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={kind === "t1" ? "The chart illustrates…" : "This essay argues that…"}
      />
      <button className="btn-lime mt-4" disabled={words < 40} onClick={send}>
        Nộp cho thầy
      </button>
      {mark && (
        <div className="mt-6 border-t border-line pt-5">
          <p className="font-serif text-3xl">{mark.band}</p>
          <p className="mt-1 text-xs text-mute">
            {kind === "t1" ? "TA" : "TR"} {mark.ta} · CC {mark.cc} · LR {mark.lr} · GRA {mark.gra} · máy chấm thử
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {mark.notes.map((n) => (
              <li key={n}>— {n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
