"use client";

import { useMemo, useState } from "react";
import { ANTONYMS, CLASS_FRAMES, CLASS_WORDS, dayNum, pick, pickMany, type ClassWord } from "@/lib/zang/content";
import { ANTONYM_EXTRA, CLASS_SAMPLES, FRAME_VI } from "@/lib/zang/samples";
import { speak } from "@/lib/speech";
import { bumpZangLot, saveZangDraft, saveZangSentence, saveZangSpell, zangLot, type State } from "@/lib/store";
import { POS_VI, posHint, type Pos } from "@/lib/pos";
import { checkText, type Check } from "@/lib/zang/check";
import ChamCau from "./ChamCau";
import ChinhTa from "./ChinhTa";
import WordPic from "@/components/WordPic";
import ExampleLine from "@/components/ExampleLine";

const PER_LOT = 8;

export default function TuCau({ s, onDone }: { s: State; onDone: (next: State) => void }) {
  const n = dayNum();
  const lot = zangLot(s);
  const words = useMemo(() => pickMany(CLASS_WORDS, n + lot * 19, PER_LOT), [n, lot]);
  const pairs = useMemo(() => pickMany(ANTONYMS, n + lot * 13, 3), [n, lot]);
  const frame = pick(CLASS_FRAMES, n + lot);
  const [mode, setMode] = useState<"class" | "antonym">("class");
  const [wi, setWi] = useState(0);
  const [pi, setPi] = useState(0);
  const [text, setText] = useState("");
  const [ok, setOk] = useState("");
  const [mark, setMark] = useState<Check | null>(null);
  const [spelled, setSpelled] = useState<Record<string, boolean>>({});

  const word = words[wi] ?? words[0];
  const pair = pairs[pi] ?? pairs[0];
  const extra = mode === "class" ? (word ? [word.word] : []) : pair ? [pair.a, pair.b] : [];

  function cham() {
    if (!word || !pair) return;
    const t = text.trim();
    if (t.split(/\s+/).length < 5) {
      setOk("Viết đủ một câu (khoảng 5 từ trở lên).");
      return;
    }
    const missing = extra.filter((w) => !t.toLowerCase().includes(w.toLowerCase()));
    if (missing.length) {
      setOk(`Nhét từ vào câu: ${missing.join(" / ")}`);
      return;
    }
    const c = checkText(t, extra);
    setMark(c);
    onDone(
      saveZangDraft(s, {
        kind: "sentence",
        word: mode === "class" ? word.word : `${pair.a}/${pair.b}`,
        text: t,
        score: c.score,
        spelling: c.spelling.map((x) => `${x.from}→${x.to}`),
        grammar: c.grammar.map((x) => x.vi),
      }),
    );
    setOk(c.clean ? "Sạch. Bấm Cất câu sạch." : "Chữ đỏ / thì sai — viết lại đến khi hết đỏ.");
  }

  function cat(cleanText: string, c: Check) {
    if (!word || !pair) return;
    onDone(
      saveZangSentence(s, {
        word: mode === "class" ? word.word : `${pair.a}/${pair.b}`,
        mode,
        text: cleanText,
        score: c.score,
        rewrite: c.rewrite,
        spelling: [],
        grammar: [],
      }),
    );
    setOk("Đã cất. Bấm từ khác, viết câu nữa.");
    setMark(null);
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
            setMark(null);
          }}
        >
          Từ → câu lớp
        </button>
        <button
          className={mode === "antonym" ? "btn-lime" : "btn-ghost"}
          onClick={() => {
            setMode("antonym");
            setOk("");
            setMark(null);
          }}
        >
          Trái nghĩa → câu đối lập
        </button>
      </div>

      {mode === "class" && word && (
        <div className="mt-6">
          <p className="text-sm text-mute">
            8 từ lớp. Đây là <span className="text-lime">đợt {lot + 1} hôm nay</span> — không phải bài 4 trên 10. Muốn bộ khác thì bấm
            nút dưới, không cần đợi mai. Nửa đêm tự đổi bộ mới.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {words.map((w, i) => (
              <button
                key={w.word}
                className={`rounded-2xl border px-3 py-3 text-left ${i === wi ? "border-lime bg-lime/10" : "border-line"}`}
                onClick={() => {
                  setWi(i);
                  setOk("");
                  setMark(null);
                }}
              >
                <WordPic word={w.word} vi={w.vi} pos={w.pos} size="sm" />
                <p className="mt-2 font-serif text-xl">{w.word}</p>
                <p className="mt-1 text-sm text-mute">{w.ipa}</p>
                <p className="mt-1 text-sm">
                  <span className="text-lime">{POS_VI[w.pos]}</span> · {w.vi}
                  {spelled[w.word] ? <span className="ml-2 text-xs text-lime">chính tả ok</span> : null}
                </p>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="btn-ghost mt-3 text-xs"
            onClick={() => {
              onDone(bumpZangLot(s));
              setWi(0);
              setSpelled({});
              setMark(null);
            }}
          >
            Đổi 8 từ khác
          </button>
          <WordFocus word={word} frame={frame} />
          <ChinhTa
            key={`${lot}-${word.word}`}
            target={word.word}
            ipa={word.ipa}
            onResult={(okSpell, wrote) => {
              if (okSpell) setSpelled((x) => ({ ...x, [word.word]: true }));
              onDone(saveZangSpell(s, { target: word.word, wrote, ok: okSpell }));
            }}
          />
        </div>
      )}

      {mode === "antonym" && pair && (
        <div className="mt-6">
          <p className="text-sm text-mute">3 cặp trái nghĩa của đợt {lot + 1} hôm nay.</p>
          <div className="mt-3 grid gap-2">
            {pairs.map((p, i) => (
              <button
                key={`${p.a}-${p.b}`}
                className={`rounded-2xl border px-3 py-3 text-left ${i === pi ? "border-lime bg-lime/10" : "border-line"}`}
                onClick={() => {
                  setPi(i);
                  setOk("");
                  setMark(null);
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
          <ExampleLine en={pair.sample} vi={ANTONYM_EXTRA[pair.sample]?.vi} grammar={ANTONYM_EXTRA[pair.sample]?.g} />
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
            key={`${lot}-${pair.a}`}
            target={pair.a}
            ipa={pair.aIpa}
            onResult={(okSpell, wrote) => {
              if (okSpell) setSpelled((x) => ({ ...x, [pair.a]: true }));
              onDone(saveZangSpell(s, { target: pair.a, wrote, ok: okSpell }));
            }}
          />
          <ChinhTa
            key={`${lot}-${pair.b}`}
            target={pair.b}
            ipa={pair.bIpa}
            onResult={(okSpell, wrote) => {
              if (okSpell) setSpelled((x) => ({ ...x, [pair.b]: true }));
              onDone(saveZangSpell(s, { target: pair.b, wrote, ok: okSpell }));
            }}
          />
        </div>
      )}

      <textarea
        className={`field mt-6 min-h-28 ${mark && !mark.clean ? "border-bad" : ""}`}
        placeholder="Câu của em, tiếng Anh — nhét từ đang chọn vào câu."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setMark(null);
        }}
      />
      <button className="btn-lime mt-4" onClick={cham}>
        Chấm thì + ngữ pháp
      </button>
      {ok && <p className={`mt-3 text-sm ${mark && !mark.clean ? "text-bad" : "text-lime"}`}>{ok}</p>}
      {mark && <ChamCau check={mark} text={text} extra={extra} onClean={cat} />}
      {(s.zang.spells ?? []).filter((x) => !x.ok).length > 0 && (
        <div className="mt-8">
          <p className="text-xs uppercase tracking-wider text-lime">Sổ chính tả (từ sai)</p>
          <ul className="mt-2 space-y-1 text-sm">
            {(s.zang.spells ?? [])
              .filter((x) => !x.ok)
              .slice(0, 12)
              .map((x) => (
                <li key={x.at}>
                  <span className="text-bad line-through">{x.wrote}</span>
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

function Half({ word, ipa, vi, pos }: { word: string; ipa: string; vi: string; pos: Pos }) {
  return (
    <div>
      <WordPic word={word} vi={vi} pos={pos} size="sm" />
      <p className="mt-2 font-serif text-2xl">{word}</p>
      <p className="mt-1 text-sm text-mute">{ipa}</p>
      <p className="mt-1 text-sm">
        <span className="text-lime">{POS_VI[pos]}</span> · {vi}
      </p>
    </div>
  );
}

function WordFocus({ word, frame }: { word: ClassWord; frame: string }) {
  const ex = CLASS_SAMPLES[word.word];
  return (
    <div className="mt-6">
      <WordPic word={word.word} vi={word.vi} pos={word.pos} size="md" />
      <p className="mt-3 text-sm text-mute">{posHint(word.pos)}</p>
      <p className="mt-2 text-sm text-mute">
        Khung: <span className="text-text">{frame}</span>
      </p>
      <p className="mt-1 text-sm">{FRAME_VI[frame] ?? ""}</p>
      {ex && (
        <div className="mt-3">
          <p className="text-xs uppercase tracking-wider text-lime">Câu ví dụ</p>
          <ExampleLine en={ex.en} vi={ex.vi} grammar={ex.g} />
        </div>
      )}
      <button className="btn-ghost mt-3" onClick={() => speak(word.word)}>
        Nghe {word.word}
      </button>
    </div>
  );
}
