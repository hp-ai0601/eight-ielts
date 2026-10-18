"use client";

import { useState } from "react";
import { STORIES, dayNum, pick } from "@/lib/zang/content";
import { saveZangMimic, type State } from "@/lib/store";
import PlayBar from "@/components/PlayBar";
import { checkText, type Check } from "@/lib/zang/check";
import ChamCau from "./ChamCau";

export default function CumTruyen({ s, onDone }: { s: State; onDone: (next: State) => void }) {
  const beat = pick(STORIES, dayNum());
  const [showEn, setShowEn] = useState(false);
  const [mimic, setMimic] = useState("");
  const [ok, setOk] = useState("");
  const [mark, setMark] = useState<Check | null>(null);

  function save() {
    const t = mimic.trim();
    if (t.split(/\s+/).length < 6) {
      setOk("Viết một câu tiếng Anh đủ dài, cùng cấu trúc.");
      return;
    }
    const c = checkText(t);
    setMark(c);
    onDone(saveZangMimic(s, beat.id, t));
    setOk(c.score >= 8 ? "Đã cất. Ngữ pháp sạch." : "Đã cất. Đọc chỗ chấm, viết lại cho đúng khuôn.");
  }

  return (
    <div className="pb-28">
      <p className="text-xs uppercase tracking-wider text-lime">{beat.title}</p>
      <p className="mt-3 font-serif text-2xl leading-snug">{beat.vi}</p>
      <p className="mt-4 text-sm text-mute">Dịch / đối chiếu tiếng Anh — bấm hiện, đừng nhìn trước khi tự dịch trong đầu.</p>
      <button className="btn-ghost mt-3" onClick={() => setShowEn((x) => !x)}>
        {showEn ? "Ẩn tiếng Anh" : "Hiện tiếng Anh"}
      </button>
      {showEn && (
        <div className="panel mt-4 p-4">
          <p>{beat.en}</p>
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
        <p>
          <span className="text-mute">Câu mẫu: </span>
          {beat.sample}
        </p>
      </div>
      <p className="mt-6 text-sm">Em viết thêm 1 câu cùng cấu trúc (chuyện lớp / Hân Hân / Khoa cũng được).</p>
      <textarea className="field mt-3 min-h-28" value={mimic} onChange={(e) => setMimic(e.target.value)} />
      <button className="btn-lime mt-4" onClick={save}>
        Chấm + cất
      </button>
      {ok && <p className="mt-3 text-sm text-lime">{ok}</p>}
      {mark && <ChamCau check={mark} />}
      <PlayBar minutes={8} audio={showEn ? beat.en : undefined} rate={0.88} />
    </div>
  );
}
