"use client";

import { useMemo, useState } from "react";
import { CLASS_WORDS, DIARY_PROMPTS, STORIES, dayNum, pickMany } from "@/lib/zang/content";
import { CLASS_SAMPLES } from "@/lib/zang/samples";
import { bumpZangLot, savePaper, saveZangDiary, saveZangDraft, zangLot, type State } from "@/lib/store";
import { scoreWriting } from "@/lib/score/write";
import { checkText, type Check } from "@/lib/zang/check";
import ChamCau from "./ChamCau";
import ExampleLine from "@/components/ExampleLine";
import Studio, { RailPick } from "@/components/Studio";

export default function NhatKy({ s, onDone }: { s: State; onDone: (next: State) => void }) {
  const n = dayNum();
  const lot = zangLot(s, "nhat");
  const prompts = useMemo(() => pickMany(DIARY_PROMPTS, n + lot * 9, 4), [n, lot]);
  const words = useMemo(() => pickMany(CLASS_WORDS, n + lot * 19, 4), [n, lot]);
  const beats = useMemo(() => pickMany(STORIES, n + lot * 11, 4), [n, lot]);
  const [pi, setPi] = useState(0);
  const [wi, setWi] = useState(0);
  const [bi, setBi] = useState(0);
  const existing = s.zang.diaries.find((d) => d.day === new Date().toISOString().slice(0, 10));
  const [text, setText] = useState(existing?.text ?? "");
  const [ok, setOk] = useState("");
  const [mark, setMark] = useState<Check | null>(null);
  const prompt = prompts[pi] ?? prompts[0];
  const word = words[wi] ?? words[0];
  const beat = beats[bi] ?? beats[0];
  const count = text.trim() ? text.trim().split(/\s+/).length : 0;
  const extra = word ? [word.word] : [];
  const sample = word ? CLASS_SAMPLES[word.word] : undefined;

  function cham() {
    if (count < 20) {
      setOk("Viết khoảng 20 từ trở lên.");
      return;
    }
    const c = checkText(text.trim(), extra, beat?.tense);
    setMark(c);
    onDone(
      saveZangDraft(s, {
        kind: "diary",
        word: beat?.tense,
        text: text.trim(),
        score: c.score,
        spelling: c.spelling.map((x) => `${x.from}→${x.to}`),
        grammar: c.grammar.map((x) => x.vi),
      }),
    );
    setOk(c.clean ? "Sạch. Bấm Cất câu sạch." : "Chữ đỏ / thì sai — viết lại đến khi hết đỏ.");
  }

  function cat(cleanText: string) {
    const auto = scoreWriting(cleanText, 40, "diary");
    onDone(
      savePaper(saveZangDiary(s, cleanText), {
        kind: "diary",
        prompt: prompt?.title ?? "Nhật ký",
        text: cleanText,
        auto,
      }),
    );
    setOk("Đã cất nhật ký. Thầy thấy trên live.");
    setMark(null);
  }

  return (
    <Studio
      step={4}
      title="Nhật ký"
      kicker={`đợt ${lot + 1}`}
      swap="Đổi gợi ý"
      onSwap={() => {
        onDone(bumpZangLot(s, "nhat"));
        setPi(0);
        setWi(0);
        setBi(0);
        setMark(null);
      }}
      next={{ href: "/", label: "Hôm nay" }}
      rail={prompts.map((p, idx) => (
        <RailPick key={p.id} on={idx === pi} onClick={() => setPi(idx)}>
          <p className="font-serif text-lg leading-tight">{p.title}</p>
          <p className="mt-0.5 line-clamp-2 text-xs text-mute">{p.vi}</p>
        </RailPick>
      ))}
      stage={
        <div className="mx-auto max-w-lg">
          {prompt && <p className="text-sm text-mute">{prompt.vi}</p>}
          <p className="mt-5 text-[11px] uppercase tracking-wider text-lime">Từ — nhớ thì nhét</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {words.map((w, idx) => (
              <button
                key={w.word}
                type="button"
                className={`rounded-full px-3 py-1.5 text-sm ${idx === wi ? "bg-lime text-bg" : "border border-line"}`}
                onClick={() => setWi(idx)}
              >
                {w.word}
              </button>
            ))}
          </div>
          {word && sample && <ExampleLine en={sample.en} vi={sample.vi} grammar={sample.g} />}
          <p className="mt-5 text-[11px] uppercase tracking-wider text-lime">Thì</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {beats.map((b, idx) => (
              <button
                key={b.id}
                type="button"
                className={`rounded-full px-3 py-1.5 text-sm ${idx === bi ? "bg-lime text-bg" : "border border-line"}`}
                onClick={() => setBi(idx)}
              >
                {b.tense}
              </button>
            ))}
          </div>
          {beat && <p className="mt-2 text-xs text-mute">{beat.structureVi}</p>}
          <textarea
            className={`field mt-5 min-h-40 ${mark && !mark.clean ? "border-bad" : ""}`}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setMark(null);
            }}
            placeholder={prompt ? `${prompt.title} — Dear diary...` : "Dear diary..."}
          />
          <p className="mt-2 text-xs text-mute">{count} từ</p>
          <button className="btn-lime mt-3" onClick={cham}>
            Chấm
          </button>
          {ok && <p className={`mt-3 text-sm ${mark && !mark.clean ? "text-bad" : "text-lime"}`}>{ok}</p>}
          {mark && <ChamCau check={mark} text={text} extra={extra} tense={beat?.tense} onClean={cat} />}
        </div>
      }
    />
  );
}
