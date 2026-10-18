"use client";

import { useMemo, useState } from "react";
import { SCRIPT_SETS, beatsOf, dayNum, pickSet } from "@/lib/zang/content";
import { STORY_EXTRA } from "@/lib/zang/samples";
import { bumpZangLot, saveZangDraft, saveZangMimic, zangLot, type State } from "@/lib/store";
import PlayBar from "@/components/PlayBar";
import { checkText, type Check } from "@/lib/zang/check";
import ChamCau from "./ChamCau";
import ExampleLine from "@/components/ExampleLine";
import Hear from "@/components/Hear";

export default function CumTruyen({ s, onDone }: { s: State; onDone: (next: State) => void }) {
  const n = dayNum();
  const lot = zangLot(s, "cum");
  const script = useMemo(() => pickSet(SCRIPT_SETS, n, lot), [n, lot]);
  const beats = useMemo(() => beatsOf(script.scenes), [script]);
  const [i, setI] = useState(0);
  const [showEn, setShowEn] = useState(false);
  const [mimic, setMimic] = useState("");
  const [ok, setOk] = useState("");
  const [mark, setMark] = useState<Check | null>(null);
  const beat = beats[i] ?? beats[0];
  const extra = beat ? STORY_EXTRA[beat.id] : undefined;

  function select(idx: number) {
    setI(idx);
    setShowEn(false);
    setMimic("");
    setOk("");
    setMark(null);
  }

  function cham() {
    if (!beat) return;
    const t = mimic.trim();
    if (t.split(/\s+/).length < 6) {
      setOk("Viết một câu tiếng Anh đủ dài, cùng cấu trúc.");
      return;
    }
    const c = checkText(t, [], beat.tense);
    setMark(c);
    onDone(
      saveZangDraft(s, {
        kind: "mimic",
        word: beat.tense,
        text: t,
        score: c.score,
        spelling: c.spelling.map((x) => `${x.from}→${x.to}`),
        grammar: c.grammar.map((x) => x.vi),
      }),
    );
    setOk(c.clean ? "Sạch. Bấm Cất câu sạch." : "Thì / ngữ pháp đỏ — viết lại đến khi hết đỏ.");
  }

  function cat(cleanText: string, c: Check) {
    if (!beat) return;
    onDone(saveZangMimic(s, beat.id, cleanText));
    setOk(`Đã cất cảnh ${i + 1}. Chọn cảnh khác trong kịch bản, hoặc đổi tập.`);
    setMark(null);
    setMimic("");
    void c;
  }

  if (!beat) return null;

  return (
    <div className="pb-28">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wider text-lime">
            Kịch bản · đợt {lot + 1} hôm nay · {beats.length} cảnh
          </p>
          <h2 className="mt-1 font-serif text-2xl">{script.title}</h2>
          <p className="mt-1 text-sm text-mute">{script.blurb}</p>
        </div>
        <button
          type="button"
          className="btn-ghost text-xs"
          onClick={() => {
            onDone(bumpZangLot(s, "cum"));
            select(0);
          }}
        >
          Đổi kịch bản khác
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {beats.map((b, idx) => {
          const on = idx === i;
          const sample = STORY_EXTRA[b.id];
          return (
            <div key={b.id} className={`rounded-2xl border p-3 ${on ? "border-lime bg-lime/10" : "border-line"}`}>
              <button type="button" className="w-full text-left" onClick={() => select(idx)}>
                <p className="text-xs text-lime">Cảnh {idx + 1}/{beats.length}</p>
                <p className="mt-1 font-serif text-lg">{b.title}</p>
                <p className="mt-1 text-sm text-mute">{b.tense}</p>
              </button>
              {on && (
                <div className="mt-4 border-t border-line pt-4">
                  <p className="font-serif text-2xl leading-snug">{b.vi}</p>
                  <p className="mt-3 text-sm text-mute">Tự dịch trong đầu trước. Rồi mới hiện tiếng Anh.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button className="btn-ghost" onClick={() => setShowEn((x) => !x)}>
                      {showEn ? "Ẩn tiếng Anh" : "Hiện tiếng Anh"}
                    </button>
                    {showEn && <Hear text={b.en} rate={0.88} label="Nghe cảnh" />}
                  </div>
                  {showEn && (
                    <div className="panel mt-3 p-4">
                      <ExampleLine en={b.en} vi={b.vi} grammar={`${b.tense} · ${b.structure}`} />
                    </div>
                  )}
                  <div className="mt-4 space-y-1 text-sm">
                    <p>
                      <span className="text-mute">Thì: </span>
                      {b.tense}
                    </p>
                    <p>
                      <span className="text-mute">Cấu trúc: </span>
                      {b.structure}
                    </p>
                    <p className="text-mute">{b.structureVi}</p>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs uppercase tracking-wider text-lime">Câu mẫu</p>
                      <Hear text={b.sample} rate={0.88} label="Nghe câu" />
                    </div>
                    <ExampleLine en={b.sample} vi={sample?.vi} grammar={sample?.g ?? b.tense} />
                  </div>
                  <p className="mt-4 text-sm">Viết thêm 1 câu cùng thì + cấu trúc (chuyện lớp / Hân Hân / Khoa cũng được).</p>
                  <textarea
                    className={`field mt-3 min-h-24 ${mark && !mark.clean ? "border-bad" : ""}`}
                    value={mimic}
                    onChange={(e) => {
                      setMimic(e.target.value);
                      setMark(null);
                    }}
                  />
                  <button className="btn-lime mt-3" onClick={cham}>
                    Chấm thì + ngữ pháp
                  </button>
                  {ok && <p className={`mt-3 text-sm ${mark && !mark.clean ? "text-bad" : "text-lime"}`}>{ok}</p>}
                  {mark && <ChamCau check={mark} text={mimic} tense={b.tense} onClean={cat} />}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <PlayBar minutes={8} audio={showEn ? beat.en : undefined} rate={0.88} />
    </div>
  );
}
