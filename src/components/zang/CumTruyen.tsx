"use client";

import { useMemo, useState } from "react";
import { STORIES, dayNum, pickMany } from "@/lib/zang/content";
import { STORY_EXTRA } from "@/lib/zang/samples";
import { bumpZangLot, saveZangDraft, saveZangMimic, zangLot, type State } from "@/lib/store";
import PlayBar from "@/components/PlayBar";
import { checkText, type Check } from "@/lib/zang/check";
import ChamCau from "./ChamCau";
import ExampleLine from "@/components/ExampleLine";
import LotNote from "./LotNote";

const PER = 4;

export default function CumTruyen({ s, onDone }: { s: State; onDone: (next: State) => void }) {
  const n = dayNum();
  const lot = zangLot(s, "cum");
  const beats = useMemo(() => pickMany(STORIES, n + lot * 11, PER), [n, lot]);
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
    setOk(`Đã cất. Thì ${beat.tense} sạch. Chọn cụm khác hoặc đổi đợt.`);
    setMark(null);
    setMimic("");
    void c;
  }

  if (!beat) return null;

  return (
    <div className="pb-28">
      <LotNote
        lot={lot}
        count={PER}
        unit="cụm truyện"
        onBump={() => {
          onDone(bumpZangLot(s, "cum"));
          select(0);
        }}
      />
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {beats.map((b, idx) => (
          <button
            key={b.id}
            type="button"
            className={`rounded-2xl border px-3 py-3 text-left ${idx === i ? "border-lime bg-lime/10" : "border-line"}`}
            onClick={() => select(idx)}
          >
            <p className="font-serif text-lg">{b.title}</p>
            <p className="mt-1 text-sm text-lime">{b.tense}</p>
            <p className="mt-1 text-xs text-mute">{b.structureVi}</p>
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs uppercase tracking-wider text-lime">{beat.title}</p>
      <p className="mt-3 font-serif text-2xl leading-snug">{beat.vi}</p>
      <p className="mt-4 text-sm text-mute">Dịch / đối chiếu tiếng Anh — bấm hiện, đừng nhìn trước khi tự dịch trong đầu.</p>
      <button className="btn-ghost mt-3" onClick={() => setShowEn((x) => !x)}>
        {showEn ? "Ẩn tiếng Anh" : "Hiện tiếng Anh"}
      </button>
      {showEn && (
        <div className="panel mt-4 p-4">
          <ExampleLine en={beat.en} vi={beat.vi} grammar={`${beat.tense} · ${beat.structure}`} />
          <p className="mt-3 text-sm text-mute">Nghe / Dừng ở thanh dưới.</p>
        </div>
      )}
      <div className="mt-6 space-y-2 text-sm">
        <p>
          <span className="text-mute">Thì: </span>
          {beat.tense}
        </p>
        <p>
          <span className="text-mute">Cấu trúc: </span>
          {beat.structure}
        </p>
        <p className="text-mute">{beat.structureVi}</p>
        <div>
          <p className="text-mute">Câu mẫu</p>
          <ExampleLine en={beat.sample} vi={extra?.vi} grammar={extra?.g ?? beat.tense} />
        </div>
      </div>
      <p className="mt-6 text-sm">Em viết thêm 1 câu cùng thì + cấu trúc (chuyện lớp / Hân Hân / Khoa cũng được).</p>
      <textarea
        className={`field mt-3 min-h-28 ${mark && !mark.clean ? "border-bad" : ""}`}
        value={mimic}
        onChange={(e) => {
          setMimic(e.target.value);
          setMark(null);
        }}
      />
      <button className="btn-lime mt-4" onClick={cham}>
        Chấm thì + ngữ pháp
      </button>
      {ok && <p className={`mt-3 text-sm ${mark && !mark.clean ? "text-bad" : "text-lime"}`}>{ok}</p>}
      {mark && <ChamCau check={mark} text={mimic} tense={beat.tense} onClean={cat} />}
      <PlayBar minutes={8} audio={showEn ? beat.en : undefined} rate={0.88} />
    </div>
  );
}
