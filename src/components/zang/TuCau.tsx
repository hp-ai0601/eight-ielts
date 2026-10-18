"use client";

import { useMemo, useState } from "react";
import { ANTONYMS, CLASS_FRAMES, CLASS_WORDS, dayNum, pick, pickMany, type ClassWord } from "@/lib/zang/content";
import { speak } from "@/lib/speech";
import { saveZangSentence, saveZangSpell, type State } from "@/lib/store";
import { POS_VI, posHint, type Pos } from "@/lib/pos";
import { checkText, type Check } from "@/lib/zang/check";
import ChamCau from "./ChamCau";
import ChinhTa from "./ChinhTa";

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
  const [mark, setMark] = useState<Check | null>(null);
  const [seen, setSeen] = useState<Record<string, boolean>>({});

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
    const extra = mode === "class" ? [word.word] : [pair.a, pair.b];
    const c = checkText(t, extra);
    setMark(c);
    onDone(
      saveZangSentence(s, {
        word: mode === "class" ? word.word : `${pair.a}/${pair.b}`,
        mode,
        text: t,
        score: c.score,
        rewrite: c.rewrite,
        spelling: c.spelling.map((x) => `${x.from}→${x.to}`),
        grammar: c.grammar.map((x) => x.vi),
      }),
    );
    setOk(c.score >= 8 ? "Sạch. Bấm từ khác, viết câu nữa." : "Đã cất. Đọc chỗ đỏ, chép câu sửa.");
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
                <p className={`font-serif text-xl ${seen[w.word] ? "" : "select-none blur-[6px]"}`}>{w.word}</p>
                <p className={`mt-1 text-sm text-mute ${seen[w.word] ? "" : "select-none blur-[6px]"}`}>{w.ipa}</p>
                <p className="mt-1 text-sm">
                  <span className="text-lime">{POS_VI[w.pos]}</span> · {w.vi}
                </p>
              </button>
            ))}
          </div>
          <WordFocus word={word} frame={frame} />
          <ChinhTa
            key={word.word}
            target={word.word}
            ipa={word.ipa}
            onResult={(okSpell, wrote) => {
              if (okSpell) setSeen((x) => ({ ...x, [word.word]: true }));
              onDone(saveZangSpell(s, { target: word.word, wrote, ok: okSpell }));
            }}
          />
          <button className="btn-ghost mt-2 text-xs" onClick={() => setSeen((x) => ({ ...x, [word.word]: true }))}>
            Hiện chữ (nếu kẹt)
          </button>
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
                  <Half word={p.a} ipa={p.aIpa} vi={p.aVi} pos={p.pos} hide={!seen[p.a]} />
                  <Half word={p.b} ipa={p.bIpa} vi={p.bVi} pos={p.pos} hide={!seen[p.b]} />
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
          <ChinhTa
            key={pair.a}
            target={pair.a}
            ipa={pair.aIpa}
            onResult={(okSpell, wrote) => {
              if (okSpell) setSeen((x) => ({ ...x, [pair.a]: true }));
              onDone(saveZangSpell(s, { target: pair.a, wrote, ok: okSpell }));
            }}
          />
          <ChinhTa
            key={pair.b}
            target={pair.b}
            ipa={pair.bIpa}
            onResult={(okSpell, wrote) => {
              if (okSpell) setSeen((x) => ({ ...x, [pair.b]: true }));
              onDone(saveZangSpell(s, { target: pair.b, wrote, ok: okSpell }));
            }}
          />
          <button
            className="btn-ghost mt-2 text-xs"
            onClick={() => setSeen((x) => ({ ...x, [pair.a]: true, [pair.b]: true }))}
          >
            Hiện chữ (nếu kẹt)
          </button>
        </div>
      )}

      <textarea
        className="field mt-6 min-h-28"
        placeholder="Câu của em, tiếng Anh."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setMark(null);
        }}
      />
      <button className="btn-lime mt-4" onClick={save}>
        Chấm + cất
      </button>
      {ok && <p className="mt-3 text-sm text-lime">{ok}</p>}
      {mark && <ChamCau check={mark} />}
      {(s.zang.spells ?? []).filter((x) => !x.ok).length > 0 && (
        <div className="mt-8">
          <p className="text-xs uppercase tracking-wider text-lime">Sổ chính tả (từ sai)</p>
          <ul className="mt-2 space-y-1 text-sm">
            {(s.zang.spells ?? [])
              .filter((x) => !x.ok)
              .slice(0, 12)
              .map((x) => (
                <li key={x.at}>
                  <span className="line-through text-mute">{x.wrote}</span>
                  {" → "}
                  <span className="text-lime">{x.target}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Half({ word, ipa, vi, pos, hide }: { word: string; ipa: string; vi: string; pos: Pos; hide?: boolean }) {
  const label = POS_VI[pos];
  return (
    <div>
      <p className={`font-serif text-2xl ${hide ? "select-none blur-[6px]" : ""}`}>{word}</p>
      <p className={`mt-1 text-sm text-mute ${hide ? "select-none blur-[6px]" : ""}`}>{ipa}</p>
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
