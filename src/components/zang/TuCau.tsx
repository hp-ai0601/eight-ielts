"use client";

import { useMemo, useState } from "react";
import { ANTONYMS, CLASS_FRAMES, CLASS_WORDS, dayNum, pick, pickMany } from "@/lib/zang/content";
import { ANTONYM_EXTRA, CLASS_SAMPLES, FRAME_VI } from "@/lib/zang/samples";
import { speak } from "@/lib/speech";
import { bumpZangLot, saveZangDraft, saveZangSentence, saveZangSpell, zangLot, type State } from "@/lib/store";
import { POS_VI, posHint, type Pos } from "@/lib/pos";
import { checkText, type Check } from "@/lib/zang/check";
import ChamCau from "./ChamCau";
import ChinhTa from "./ChinhTa";
import WordPic from "@/components/WordPic";
import ExampleLine from "@/components/ExampleLine";
import Hear from "@/components/Hear";

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

  function pickWord(i: number) {
    setWi(i);
    setOk("");
    setMark(null);
    const w = words[i];
    if (w) speak(w.word);
  }

  function pickPair(i: number) {
    setPi(i);
    setOk("");
    setMark(null);
    const p = pairs[i];
    if (p) speak(`${p.a}. ${p.b}`);
  }

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

  const writeBox = (
    <>
      <textarea
        className={`field mt-4 min-h-24 ${mark && !mark.clean ? "border-bad" : ""}`}
        placeholder="Câu của em, tiếng Anh — nhét từ đang chọn vào câu."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setMark(null);
        }}
      />
      <button className="btn-lime mt-3" onClick={cham}>
        Chấm thì + ngữ pháp
      </button>
      {ok && <p className={`mt-3 text-sm ${mark && !mark.clean ? "text-bad" : "text-lime"}`}>{ok}</p>}
      {mark && <ChamCau check={mark} text={text} extra={extra} onClean={cat} />}
    </>
  );

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
        <div className="mt-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-mute">
              8 từ · <span className="text-lime">đợt {lot + 1} hôm nay</span>
            </p>
            <button
              type="button"
              className="btn-ghost text-xs"
              onClick={() => {
                onDone(bumpZangLot(s));
                setWi(0);
                setSpelled({});
                setMark(null);
              }}
            >
              Đổi 8 từ khác
            </button>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {words.map((w, i) => {
              const on = i === wi;
              const ex = CLASS_SAMPLES[w.word];
              return (
                <div
                  key={w.word}
                  className={`rounded-2xl border p-3 ${on ? "border-lime bg-lime/10 sm:col-span-2" : "border-line"}`}
                >
                  <div className="flex items-start gap-3">
                    <button type="button" className="min-w-0 flex-1 text-left" onClick={() => pickWord(i)}>
                      <div className="flex gap-3">
                        <WordPic word={w.word} vi={w.vi} pos={w.pos} size="thumb" />
                        <div className="min-w-0">
                          <p className="font-serif text-xl leading-tight">{w.word}</p>
                          <p className="mt-0.5 text-sm text-mute">{w.ipa}</p>
                          <p className="mt-0.5 text-sm">
                            <span className="text-lime">{POS_VI[w.pos]}</span> · {w.vi}
                            {spelled[w.word] ? <span className="ml-2 text-xs text-lime">chính tả ok</span> : null}
                          </p>
                        </div>
                      </div>
                    </button>
                    <Hear text={w.word} />
                  </div>
                  {on && (
                    <div className="mt-4 border-t border-line pt-4">
                      <p className="text-xs text-mute">{posHint(w.pos)}</p>
                      <p className="mt-2 text-sm text-mute">
                        Khung: <span className="text-text">{frame}</span>
                      </p>
                      <p className="mt-1 text-sm">{FRAME_VI[frame] ?? ""}</p>
                      {ex && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs uppercase tracking-wider text-lime">Câu ví dụ</p>
                            <Hear text={ex.en} rate={0.88} label="Nghe câu" />
                          </div>
                          <ExampleLine en={ex.en} vi={ex.vi} grammar={ex.g} />
                        </div>
                      )}
                      <ChinhTa
                        key={`${lot}-${w.word}`}
                        target={w.word}
                        ipa={w.ipa}
                        onResult={(okSpell, wrote) => {
                          if (okSpell) setSpelled((x) => ({ ...x, [w.word]: true }));
                          onDone(saveZangSpell(s, { target: w.word, wrote, ok: okSpell }));
                        }}
                      />
                      {writeBox}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {mode === "antonym" && pair && (
        <div className="mt-5">
          <p className="text-sm text-mute">
            3 cặp · <span className="text-lime">đợt {lot + 1} hôm nay</span>
          </p>
          <div className="mt-3 grid gap-2">
            {pairs.map((p, i) => {
              const on = i === pi;
              const extraSample = ANTONYM_EXTRA[p.sample];
              return (
                <div key={`${p.a}-${p.b}`} className={`rounded-2xl border p-3 ${on ? "border-lime bg-lime/10" : "border-line"}`}>
                  <button type="button" className="w-full text-left" onClick={() => pickPair(i)}>
                    <div className="grid grid-cols-2 gap-3">
                      <Half word={p.a} ipa={p.aIpa} vi={p.aVi} pos={p.pos} />
                      <Half word={p.b} ipa={p.bIpa} vi={p.bVi} pos={p.pos} />
                    </div>
                  </button>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Hear text={p.a} label={p.a} />
                    <Hear text={p.b} label={p.b} />
                    <Hear text={p.sample} rate={0.88} label="Câu mẫu" />
                  </div>
                  {on && (
                    <div className="mt-4 border-t border-line pt-4">
                      <p className="text-sm">Gợi ý Zang: {p.hint}</p>
                      <ExampleLine en={p.sample} vi={extraSample?.vi} grammar={extraSample?.g} />
                      <ChinhTa
                        key={`${lot}-${p.a}`}
                        target={p.a}
                        ipa={p.aIpa}
                        onResult={(okSpell, wrote) => {
                          if (okSpell) setSpelled((x) => ({ ...x, [p.a]: true }));
                          onDone(saveZangSpell(s, { target: p.a, wrote, ok: okSpell }));
                        }}
                      />
                      <ChinhTa
                        key={`${lot}-${p.b}`}
                        target={p.b}
                        ipa={p.bIpa}
                        onResult={(okSpell, wrote) => {
                          if (okSpell) setSpelled((x) => ({ ...x, [p.b]: true }));
                          onDone(saveZangSpell(s, { target: p.b, wrote, ok: okSpell }));
                        }}
                      />
                      {writeBox}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

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
      <WordPic word={word} vi={vi} pos={pos} size="thumb" />
      <p className="mt-2 font-serif text-xl leading-tight">{word}</p>
      <p className="mt-1 text-sm text-mute">{ipa}</p>
      <p className="mt-1 text-sm">
        <span className="text-lime">{POS_VI[pos]}</span> · {vi}
      </p>
    </div>
  );
}
