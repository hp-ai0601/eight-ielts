"use client";

import { useMemo, useState } from "react";
import { CLASS_WORDS, DIARY_PROMPTS, STORIES, dayNum, pickMany } from "@/lib/zang/content";
import { CLASS_SAMPLES } from "@/lib/zang/samples";
import { bumpZangLot, saveZangDiary, saveZangDraft, zangLot, type State } from "@/lib/store";
import { checkText, type Check } from "@/lib/zang/check";
import ChamCau from "./ChamCau";
import WordPic from "@/components/WordPic";
import ExampleLine from "@/components/ExampleLine";
import LotNote from "./LotNote";
import { POS_VI } from "@/lib/pos";

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
      setOk("Viết khoảng 20 từ trở lên — như nhật ký, không cần luận.");
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
    onDone(saveZangDiary(s, cleanText));
    setOk("Đã cất nhật ký. Ngữ pháp sạch.");
    setMark(null);
  }

  return (
    <div>
      <LotNote
        lot={lot}
        count={4}
        unit="gợi ý nhật ký"
        onBump={() => {
          onDone(bumpZangLot(s, "nhat"));
          setPi(0);
          setWi(0);
          setBi(0);
          setMark(null);
        }}
      />

      <p className="mt-5 text-xs uppercase tracking-wider text-lime">Chủ đề — chọn 1</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {prompts.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            className={`rounded-2xl border px-3 py-3 text-left ${idx === pi ? "border-lime bg-lime/10" : "border-line"}`}
            onClick={() => setPi(idx)}
          >
            <p className="font-serif text-lg">{p.title}</p>
            <p className="mt-1 text-xs text-mute">{p.vi}</p>
          </button>
        ))}
      </div>
      {prompt && <p className="mt-3 text-sm">{prompt.vi}</p>}

      <p className="mt-6 text-xs uppercase tracking-wider text-lime">Từ — nhớ thì nhét vào, không bắt buộc</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {words.map((w, idx) => (
          <button
            key={w.word}
            type="button"
            className={`rounded-2xl border px-3 py-3 text-left ${idx === wi ? "border-lime bg-lime/10" : "border-line"}`}
            onClick={() => setWi(idx)}
          >
            <WordPic word={w.word} vi={w.vi} pos={w.pos} size="thumb" />
            <p className="mt-2 font-serif text-xl">{w.word}</p>
            <p className="mt-1 text-sm">
              <span className="text-lime">{POS_VI[w.pos]}</span> · {w.vi}
            </p>
          </button>
        ))}
      </div>
      {word && sample && (
        <div className="mt-3">
          <ExampleLine en={sample.en} vi={sample.vi} grammar={sample.g} />
        </div>
      )}

      <p className="mt-6 text-xs uppercase tracking-wider text-lime">Thì / cấu trúc — viết nhật ký theo khuôn này</p>
      <div className="mt-3 grid gap-2">
        {beats.map((b, idx) => (
          <button
            key={b.id}
            type="button"
            className={`rounded-2xl border px-3 py-3 text-left ${idx === bi ? "border-lime bg-lime/10" : "border-line"}`}
            onClick={() => setBi(idx)}
          >
            <p className="text-sm text-lime">{b.tense}</p>
            <p className="mt-1 text-sm">{b.structure}</p>
            <p className="mt-1 text-xs text-mute">{b.structureVi}</p>
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-mute">
        Học chắc từ + ngữ pháp rồi mới viết. Kể chuyện lớp, mưa, cơm hộp, tan học — không cần Task 2.
      </p>
      <textarea
        className={`field mt-4 min-h-48 ${mark && !mark.clean ? "border-bad" : ""}`}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setMark(null);
        }}
        placeholder={prompt ? `${prompt.title} — Dear diary...` : "Dear diary — hôm nay..."}
      />
      <p className="mt-2 text-xs text-mute">{count} từ</p>
      <button className="btn-lime mt-4" onClick={cham}>
        Chấm thì + ngữ pháp
      </button>
      {ok && <p className={`mt-3 text-sm ${mark && !mark.clean ? "text-bad" : "text-lime"}`}>{ok}</p>}
      {mark && <ChamCau check={mark} text={text} extra={extra} tense={beat?.tense} onClean={cat} />}
    </div>
  );
}
