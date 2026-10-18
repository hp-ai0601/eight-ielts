"use client";

import { useMemo, useState } from "react";
import { ANTONYMS, CLASS_FRAMES, dayNum, pick } from "@/lib/zang/content";
import { LEXICON } from "@/lib/lexicon";
import { speak } from "@/lib/speech";
import { saveZangSentence, type State } from "@/lib/store";
import { POS_VI, guessPos, posHint } from "@/lib/pos";

export default function TuCau({ s, onDone }: { s: State; onDone: (next: State) => void }) {
  const n = dayNum();
  const word = useMemo(() => {
    const easy = LEXICON.filter((x) => ["daily", "family", "school", "friend", "feel", "person", "house", "food"].includes(x.topic));
    return pick(easy.length ? easy : LEXICON, n);
  }, [n]);
  const pair = pick(ANTONYMS, n);
  const frame = pick(CLASS_FRAMES, n);
  const [mode, setMode] = useState<"class" | "antonym">("class");
  const [text, setText] = useState("");
  const [ok, setOk] = useState("");

  function save() {
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
    setOk("Đã cất câu của em.");
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button className={mode === "class" ? "btn-lime" : "btn-ghost"} onClick={() => setMode("class")}>
          1 từ → 1 câu lớp
        </button>
        <button className={mode === "antonym" ? "btn-lime" : "btn-ghost"} onClick={() => setMode("antonym")}>
          Trái nghĩa → câu đối lập
        </button>
      </div>

      {mode === "class" ? (
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-lime">Từ hôm nay</p>
          <p className="mt-2 font-serif text-3xl">{word.word}</p>
          <p className="mt-1 text-mute">
            {word.ipa} · <span className="text-lime">{POS_VI[word.pos]}</span> · {word.vi}
          </p>
          <button className="btn-ghost mt-3" onClick={() => speak(word.word)}>
            Nghe từ
          </button>
          <p className="mt-6 text-sm text-mute">
            {posHint(word.pos)} Gợi ý khung: <span className="text-text">{frame}</span>
          </p>
          <p className="mt-2 text-sm">Ví dụ: There are five people in my class. One of them is very quiet.</p>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-lime">Cặp trái nghĩa</p>
          <p className="mt-2 font-serif text-3xl">
            {pair.a} <span className="text-mute">/</span> {pair.b}
          </p>
          <p className="mt-1 text-mute">
            <span className="text-lime">{POS_VI[guessPos(pair.a, pair.aVi)]}</span> {pair.aVi}
            {" · "}
            <span className="text-lime">{POS_VI[guessPos(pair.b, pair.bVi)]}</span> {pair.bVi}
          </p>
          <p className="mt-6 text-sm">Gợi ý Zang: {pair.hint}</p>
          <p className="mt-2 text-sm text-mute">{pair.sample}</p>
          <button className="btn-ghost mt-3" onClick={() => speak(pair.sample)}>
            Nghe câu mẫu
          </button>
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
