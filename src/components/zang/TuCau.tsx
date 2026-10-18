"use client";

import { useMemo, useState } from "react";
import { ANTONYMS, CLASS_FRAMES, CLASS_WORDS, dayNum, pick, pickMany, type ClassWord } from "@/lib/zang/content";
import { speak } from "@/lib/speech";
import { saveZangSentence, type State } from "@/lib/store";
import { POS_VI, posHint, type Pos } from "@/lib/pos";

export default function TuCau({ s, onDone }: { s: State; onDone: (next: State) => void }) {
  const n = dayNum();
  const words = useMemo(() => pickMany(CLASS_WORDS, n, 8), [n]);
  const pairs = useMemo(() => pickMany(ANTONYMS, n, 3), [n]);
  const frame = pick(CLASS_FRAMES, n);
  const [mode, setMode] = useState<"class" | "antonym">("class");
  const [wi, setWi] = useState(0);
  const [pi, setPi] = useState(0);
  const [text, setText] = useState("");
  const [ok, setOk] = useState("");

  const word = words[wi] ?? words[0];
  const pair = pairs[pi] ?? pairs[0];

  function save() {
    if (!word || !pair) return;
    const t = text.trim();
    if (t.split(/\s+/).length < 5) {
      setOk("Viết đủ một câu (khoảng 5 từ trở lên).");
      return;
    }
    const need = mode === "class" ? [word.word] : [pair.a, pair.b];
    const low = t.toLowerCase();
    const missing = need.filter((w) => !low.includes(w.toLowerCase()));
    if (missing.length) {
      setOk(`Nhét từ vào câu: ${missing.join(" / ")}`);
      return;
    }
    onDone(saveZangSentence(s, { word: mode === "class" ? word.word : `${pair.a}/${pair.b}`, mode, text: t }));
    setOk("Đã cất. Bấm từ khác, viết câu nữa.");
    setText("");
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          className={mode === "class" ? "btn-lime" : "btn-ghost"}
          onClick={() => {
            setMode("class");
            setOk("");
          }}
        >
          Từ → câu lớp
        </button>
        <button
          className={mode === "antonym" ? "btn-lime" : "btn-ghost"}
          onClick={() => {
            setMode("antonym");
            setOk("");
          }}
        >
          Trái nghĩa → câu đối lập
        </button>
      </div>

      {mode === "class" && word && (
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-lime">Hôm nay {words.length} từ — bấm một từ, viết một câu</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {words.map((w, i) => (
              <button
                key={w.word}
                className={`rounded-2xl border px-3 py-3 text-left ${i === wi ? "border-lime bg-lime/10" : "border-line"}`}
                onClick={() => {
                  setWi(i);
                  setOk("");
                }}
              >
                <p className="font-serif text-xl">{w.word}</p>
                <p className="mt-1 text-sm text-mute">{w.ipa}</p>
                <p className="mt-1 text-sm">
                  <span className="text-lime">{POS_VI[w.pos]}</span> · {w.vi}
                </p>
              </button>
            ))}
          </div>
          <WordFocus word={word} frame={frame} />
        </div>
      )}

      {mode === "antonym" && pair && (
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-lime">Hôm nay {pairs.length} cặp — bấm một cặp</p>
          <div className="mt-3 grid gap-2">
            {pairs.map((p, i) => (
              <button
                key={`${p.a}-${p.b}`}
                className={`rounded-2xl border px-3 py-3 text-left ${i === pi ? "border-lime bg-lime/10" : "border-line"}`}
                onClick={() => {
                  setPi(i);
                  setOk("");
                }}
              >
                <div className="grid grid-cols-2 gap-3">
                  <Half word={p.a} ipa={p.aIpa} vi={p.aVi} pos={p.pos} />
                  <Half word={p.b} ipa={p.bIpa} vi={p.bVi} pos={p.pos} />
                </div>
              </button>
            ))}
          </div>
          <p className="mt-6 text-sm">Gợi ý Zang: {pair.hint}</p>
          <p className="mt-2 font-serif text-lg">{pair.sample}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="btn-ghost" onClick={() => speak(pair.a)}>
              Nghe {pair.a}
            </button>
            <button className="btn-ghost" onClick={() => speak(pair.b)}>
              Nghe {pair.b}
            </button>
            <button className="btn-ghost" onClick={() => speak(pair.sample, 0.88)}>
              Nghe câu mẫu
            </button>
          </div>
        </div>
      )}

      <textarea className="field mt-6 min-h-28" placeholder="Câu của em, tiếng Anh." value={text} onChange={(e) => setText(e.target.value)} />
      <button className="btn-lime mt-4" onClick={save}>
        Cất câu
      </button>
      {ok && <p className="mt-3 text-sm text-lime">{ok}</p>}
    </div>
  );
}

function Half({ word, ipa, vi, pos }: { word: string; ipa: string; vi: string; pos: Pos }) {
  const label = POS_VI[pos];
  return (
    <div>
      <p className="font-serif text-2xl">{word}</p>
      <p className="mt-1 text-sm text-mute">{ipa}</p>
      <p className="mt-1 text-sm">
        <span className="text-lime">{label}</span> · {vi}
      </p>
    </div>
  );
}

function WordFocus({ word, frame }: { word: ClassWord; frame: string }) {
  const pos: Pos = word.pos;
  return (
    <div className="mt-6">
      <p className="text-sm text-mute">{posHint(pos)}</p>
      <p className="mt-2 text-sm text-mute">
        Khung: <span className="text-text">{frame}</span>
      </p>
      <p className="mt-2 text-sm">Ví dụ: There are five people in my class. One of them is very quiet.</p>
      <button className="btn-ghost mt-3" onClick={() => speak(word.word)}>
        Nghe {word.word}
      </button>
    </div>
  );
}
