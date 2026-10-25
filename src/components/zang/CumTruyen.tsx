"use client";

import { useMemo, useState } from "react";
import { SCRIPT_SETS, beatsOf, dayNum, pickSet } from "@/lib/zang/content";
import { STORY_EXTRA } from "@/lib/zang/samples";
import { bumpZangLot, saveZangDraft, saveZangMimic, zangLot, type State } from "@/lib/store";
import { checkText, type Check } from "@/lib/zang/check";
import ChamCau from "./ChamCau";
import ExampleLine from "@/components/ExampleLine";
import Hear from "@/components/Hear";
import Studio, { Pills, RailPick } from "@/components/Studio";

export default function CumTruyen({ s, onDone }: { s: State; onDone: (next: State) => void }) {
  const n = dayNum();
  const lot = zangLot(s, "cum");
  const script = useMemo(() => pickSet(SCRIPT_SETS, n, lot), [n, lot]);
  const beats = useMemo(() => beatsOf(script.scenes), [script]);
  const [i, setI] = useState(0);
  const [pane, setPane] = useState("xem");
  const [showEn, setShowEn] = useState(false);
  const [mimic, setMimic] = useState("");
  const [ok, setOk] = useState("");
  const [mark, setMark] = useState<Check | null>(null);
  const beat = beats[i] ?? beats[0];
  const extra = beat ? STORY_EXTRA[beat.id] : undefined;
  const done = new Set(s.zang.mimics.map((m) => m.storyId));

  function select(idx: number) {
    setI(idx);
    setPane("xem");
    setShowEn(false);
    setMimic("");
    setOk("");
    setMark(null);
  }

  function cham() {
    if (!beat) return;
    const t = mimic.trim();
    if (t.split(/\s+/).length < 6) {
      setOk("Viết một câu tiếng Anh đủ dài, dùng cùng cấu trúc mẫu nhé.");
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
    setOk(c.clean ? "Câu sạch rồi — bấm «Lưu câu đã đúng» nhé." : "Còn lỗi thì hoặc ngữ pháp — viết lại đến khi hết chữ đỏ nhé.");
  }

  function cat(cleanText: string, c: Check) {
    if (!beat) return;
    onDone(saveZangMimic(s, beat.id, cleanText));
    setOk("Đã lưu câu của cảnh này.");
    setMark(null);
    setMimic("");
    void c;
  }

  if (!beat) return null;

  return (
    <Studio
      step={2}
      title={script.title}
      kicker={`Đợt ${lot + 1} · ${beats.length} cảnh`}
      swap="Đổi kịch bản"
      onSwap={() => {
        onDone(bumpZangLot(s, "cum"));
        select(0);
      }}
      next={{ href: "/hai", label: "Hài" }}
      rail={beats.map((b, idx) => (
        <RailPick key={b.id} on={idx === i} done={done.has(b.id)} onClick={() => select(idx)}>
          <p className="text-[11px] text-lime">Cảnh {idx + 1}</p>
          <p className="mt-0.5 font-serif text-lg leading-tight">{b.title}</p>
          <p className="mt-0.5 truncate text-xs text-mute">{b.tense}</p>
        </RailPick>
      ))}
      stage={
        <div className="mx-auto max-w-lg">
          <p className="text-xs uppercase tracking-wider text-lime">
            Cảnh {i + 1}/{beats.length} · {beat.tense}
          </p>
          <div className="mt-4">
            <Pills
              value={pane}
              onChange={setPane}
              items={[
                { id: "xem", label: "Cảnh" },
                { id: "mau", label: "Mẫu" },
                { id: "viet", label: "Viết" },
              ]}
            />
          </div>
          <div className="mt-5">
            {pane === "xem" && (
              <div>
                <p className="font-serif text-2xl leading-snug">{beat.vi}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="btn-ghost" onClick={() => setShowEn((x) => !x)}>
                    {showEn ? "Ẩn tiếng Anh" : "Hiện tiếng Anh"}
                  </button>
                  {showEn && <Hear text={beat.en} rate={0.88} label="Nghe" />}
                </div>
                {showEn && (
                  <div className="mt-4">
                    <ExampleLine en={beat.en} vi={beat.vi} grammar={`${beat.tense} · ${beat.structure}`} />
                  </div>
                )}
                <button className="btn-lime mt-6" onClick={() => setPane("mau")}>
                  Câu mẫu →
                </button>
              </div>
            )}
            {pane === "mau" && (
              <div>
                <p className="text-sm">
                  <span className="text-mute">Cấu trúc · </span>
                  {beat.structure}
                </p>
                <p className="mt-1 text-sm text-mute">{beat.structureVi}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-lime">Câu mẫu</p>
                  <Hear text={beat.sample} rate={0.88} />
                </div>
                <ExampleLine en={beat.sample} vi={extra?.vi} grammar={extra?.g ?? beat.tense} />
                <button className="btn-lime mt-6" onClick={() => setPane("viet")}>
                  Viết câu →
                </button>
              </div>
            )}
            {pane === "viet" && (
              <div>
                <p className="text-sm text-mute">Viết câu của riêng em, dùng đúng thì và cấu trúc trên — kể chuyện lớp mình cũng được.</p>
                <textarea
                  className={`field mt-3 min-h-32 ${mark && !mark.clean ? "border-bad" : ""}`}
                  value={mimic}
                  onChange={(e) => {
                    setMimic(e.target.value);
                    setMark(null);
                  }}
                />
                <button className="btn-lime mt-3" onClick={cham}>
                  Chấm
                </button>
                {ok && <p className={`mt-3 text-sm ${mark && !mark.clean ? "text-bad" : "text-lime"}`}>{ok}</p>}
                {mark && <ChamCau check={mark} text={mimic} tense={beat.tense} onClean={cat} />}
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}
