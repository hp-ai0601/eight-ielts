"use client";

import { useMemo, useState } from "react";
import { ANTONYMS, CLASS_FRAMES, CLASS_WORDS, dayNum, pick, pickMany } from "@/lib/zang/content";
import { ANTONYM_EXTRA, CLASS_SAMPLES, FRAME_VI } from "@/lib/zang/samples";
import { speak } from "@/lib/speech";
import { bumpZangLot, saveZangDraft, saveZangSentence, saveZangSpell, zangLot, type State } from "@/lib/store";
import { POS_VI, posHint } from "@/lib/pos";
import { checkText, type Check } from "@/lib/zang/check";
import { mnemonicOf } from "@/lib/mnemonic";
import ChamCau from "./ChamCau";
import VocabExamples from "@/components/VocabExamples";
import ChinhTa from "./ChinhTa";
import WordPic from "@/components/WordPic";
import ExampleLine from "@/components/ExampleLine";
import Hear from "@/components/Hear";
import Studio, { Pills, RailPick } from "@/components/Studio";

const PER_LOT = 8;

export default function TuCau({ s, onDone }: { s: State; onDone: (next: State) => void }) {
  const n = dayNum();
  const lot = zangLot(s);
  const words = useMemo(() => pickMany(CLASS_WORDS, n + lot * 19, PER_LOT), [n, lot]);
  const pairs = useMemo(() => pickMany(ANTONYMS, n + lot * 13, 3), [n, lot]);
  const frame = pick(CLASS_FRAMES, n + lot);
  const [mode, setMode] = useState<"class" | "antonym">("class");
  const [pane, setPane] = useState("xem");
  const [wi, setWi] = useState(0);
  const [pi, setPi] = useState(0);
  const [text, setText] = useState("");
  const [ok, setOk] = useState("");
  const [mark, setMark] = useState<Check | null>(null);
  const [spelled, setSpelled] = useState<Record<string, boolean>>({});

  const word = words[wi] ?? words[0];
  const pair = pairs[pi] ?? pairs[0];
  const extra = mode === "class" ? (word ? [word.word] : []) : pair ? [pair.a, pair.b] : [];
  const ex = word ? CLASS_SAMPLES[word.word] : undefined;
  const pairEx = pair ? ANTONYM_EXTRA[pair.sample] : undefined;

  function resetMark() {
    setOk("");
    setMark(null);
  }

  function cham() {
    if (!word || !pair) return;
    const t = text.trim();
    if (t.split(/\s+/).length < 5) {
      setOk("Viết đủ một câu đã nhé (khoảng 5 từ trở lên).");
      return;
    }
    const missing = extra.filter((w) => !t.toLowerCase().includes(w.toLowerCase()));
    if (missing.length) {
      setOk(`Câu phải có từ này nữa: ${missing.join(" / ")}`);
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
    setOk(c.clean ? "Câu sạch rồi — bấm «Lưu câu đã đúng» nhé." : "Còn chữ đỏ hoặc sai thì — viết lại đến khi hết đỏ nhé.");
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
    setOk("Đã lưu câu.");
    setMark(null);
    setText("");
  }

  const write = (
    <>
      <textarea
        className={`field min-h-32 ${mark && !mark.clean ? "border-bad" : ""}`}
        placeholder="Viết một câu tiếng Anh có dùng từ đang chọn…"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setMark(null);
        }}
      />
      <button className="btn-lime mt-3" onClick={cham}>
        Chấm
      </button>
      {ok && <p className={`mt-3 text-sm ${mark && !mark.clean ? "text-bad" : "text-lime"}`}>{ok}</p>}
      {mark && <ChamCau check={mark} text={text} extra={extra} onClean={cat} />}
    </>
  );

  return (
    <Studio
      step={1}
      title="Từ → câu"
      kicker={`Đợt ${lot + 1} · ${mode === "class" ? "8 từ" : "3 cặp"}`}
      swap={mode === "class" ? "Đổi 8 từ khác" : "Đổi 3 cặp khác"}
      onSwap={() => {
        onDone(bumpZangLot(s));
        setWi(0);
        setPi(0);
        setSpelled({});
        resetMark();
      }}
      next={{ href: "/cum", label: "Cụm" }}
      tabs={
        <Pills
          value={mode}
          onChange={(id) => {
            setMode(id as "class" | "antonym");
            setPane("xem");
            resetMark();
          }}
          items={[
            { id: "class", label: "Từ lớp" },
            { id: "antonym", label: "Trái nghĩa" },
          ]}
        />
      }
      rail={
        mode === "class"
          ? words.map((w, i) => (
              <RailPick
                key={w.word}
                on={i === wi}
                done={!!spelled[w.word]}
                onClick={() => {
                  setWi(i);
                  setPane("xem");
                  resetMark();
                  speak(w.word);
                }}
              >
                <p className="font-serif text-lg leading-tight">{w.word}</p>
                <p className="mt-0.5 truncate text-xs text-mute">
                  {w.vi} · {POS_VI[w.pos]}
                </p>
              </RailPick>
            ))
          : pairs.map((p, i) => (
              <RailPick
                key={`${p.a}-${p.b}`}
                on={i === pi}
                onClick={() => {
                  setPi(i);
                  setPane("xem");
                  resetMark();
                  speak(`${p.a}. ${p.b}`);
                }}
              >
                <p className="font-serif text-lg leading-tight">
                  {p.a} <span className="text-mute">↔</span> {p.b}
                </p>
                <p className="mt-0.5 truncate text-xs text-mute">
                  {p.aVi} / {p.bVi}
                </p>
              </RailPick>
            ))
      }
      stage={
        mode === "class" && word ? (
          <div className="mx-auto max-w-lg">
            <div className="flex items-start gap-4">
              <WordPic word={word.word} vi={word.vi} pos={word.pos} size="sm" className="!h-24 !w-24 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-serif text-4xl leading-none">{word.word}</p>
                  <Hear text={word.word} />
                </div>
                <p className="mt-2 text-mute">{word.ipa}</p>
                <p className="mt-1 text-sm">
                  <span className="text-lime">{POS_VI[word.pos]}</span> · {word.vi}
                </p>
              </div>
            </div>
            <div className="mt-5">
              <Pills
                value={pane}
                onChange={setPane}
                items={[
                  { id: "xem", label: "Xem" },
                  { id: "go", label: "Gõ" },
                  { id: "viet", label: "Viết" },
                ]}
              />
            </div>
            <div className="mt-5">
              {pane === "xem" && (
                <div>
                  <p className="text-sm text-mute">{posHint(word.pos)}</p>
                  <p className="mt-2 text-sm">
                    {FRAME_VI[frame] ?? frame}
                  </p>
                  {mnemonicOf(word.word) && (
                    <div className="mt-4 rounded-xl border border-lime/30 bg-lime/5 p-3 text-sm">
                      <p className="text-lime">Mẹo nhớ: nghe giống «{mnemonicOf(word.word)!.sound}»</p>
                      <p className="mt-0.5 text-mute">{mnemonicOf(word.word)!.img}</p>
                      <p className="mt-1 text-[11px] text-mute">Mẹo này chỉ giúp dễ nhớ thôi — phát âm chuẩn thì theo phiên âm IPA ở trên nhé.</p>
                    </div>
                  )}
                  {ex && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs uppercase tracking-wider text-lime">Câu mẫu</p>
                        <Hear text={ex.en} rate={0.88} />
                      </div>
                      <ExampleLine en={ex.en} vi={ex.vi} grammar={ex.g} />
                    </div>
                  )}
                  <VocabExamples word={word.word} />
                  <button className="btn-lime mt-6" onClick={() => setPane("go")}>
                    Gõ chính tả →
                  </button>
                </div>
              )}
              {pane === "go" && (
                <div>
                  <ChinhTa
                    key={`${lot}-${word.word}`}
                    target={word.word}
                    ipa={word.ipa}
                    onResult={(okSpell, wrote) => {
                      if (okSpell) setSpelled((x) => ({ ...x, [word.word]: true }));
                      onDone(saveZangSpell(s, { target: word.word, wrote, ok: okSpell }));
                    }}
                  />
                  <button className="btn-lime mt-5" onClick={() => setPane("viet")}>
                    Viết câu →
                  </button>
                </div>
              )}
              {pane === "viet" && write}
            </div>
          </div>
        ) : pair ? (
          <div className="mx-auto max-w-lg">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="font-serif text-3xl leading-tight">
                {pair.a} <span className="text-mute">↔</span> {pair.b}
              </p>
              <div className="flex gap-2">
                <Hear text={pair.a} label={pair.a} />
                <Hear text={pair.b} label={pair.b} />
              </div>
            </div>
            <p className="mt-2 text-sm text-mute">{pair.hint}</p>
            <div className="mt-5">
              <Pills
                value={pane}
                onChange={setPane}
                items={[
                  { id: "xem", label: "Xem" },
                  { id: "go", label: "Gõ" },
                  { id: "viet", label: "Viết" },
                ]}
              />
            </div>
            <div className="mt-5">
              {pane === "xem" && (
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-wider text-lime">Câu mẫu</p>
                    <Hear text={pair.sample} rate={0.88} />
                  </div>
                  <ExampleLine en={pair.sample} vi={pairEx?.vi} grammar={pairEx?.g} />
                  <button className="btn-lime mt-6" onClick={() => setPane("go")}>
                    Gõ chính tả →
                  </button>
                </div>
              )}
              {pane === "go" && (
                <div className="space-y-6">
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
                  <button className="btn-lime" onClick={() => setPane("viet")}>
                    Viết câu →
                  </button>
                </div>
              )}
              {pane === "viet" && write}
            </div>
          </div>
        ) : null
      }
    />
  );
}
