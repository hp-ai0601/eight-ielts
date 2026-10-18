"use client";

import { useState } from "react";
import { DIARY_HINTS, STORIES, dayNum, pick } from "@/lib/zang/content";
import { LEXICON } from "@/lib/lexicon";
import { saveZangDiary, type State } from "@/lib/store";
import { checkText, type Check } from "@/lib/zang/check";
import ChamCau from "./ChamCau";

export default function NhatKy({ s, onDone }: { s: State; onDone: (next: State) => void }) {
  const n = dayNum();
  const word = pick(LEXICON.filter((x) => ["daily", "family", "school", "friend"].includes(x.topic)), n);
  const beat = pick(STORIES, n);
  const hint = pick(DIARY_HINTS, n);
  const existing = s.zang.diaries.find((d) => d.day === new Date().toISOString().slice(0, 10));
  const [text, setText] = useState(existing?.text ?? "");
  const [ok, setOk] = useState("");
  const [mark, setMark] = useState<Check | null>(null);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  function save() {
    if (words < 20) {
      setOk("Viết khoảng 20 từ trở lên — như nhật ký, không cần luận.");
      return;
    }
    const c = checkText(text.trim(), word ? [word.word] : []);
    setMark(c);
    onDone(saveZangDiary(s, text.trim()));
    setOk(c.score >= 8 ? "Đã cất nhật ký. Ngữ pháp sạch." : "Đã cất. Đọc chỗ chấm rồi sửa lại.");
  }

  return (
    <div>
      <p className="text-sm text-mute">{hint}</p>
      <ul className="mt-4 space-y-1 text-sm">
        <li>
          Từ hôm nay nếu nhớ: <span className="text-lime">{word.word}</span> ({word.vi})
        </li>
        <li>
          Cấu trúc hôm nay: <span className="text-lime">{beat.structure}</span>
        </li>
      </ul>
      <p className="mt-4 text-sm text-mute">Học chắc từ + ngữ pháp rồi mới viết. Kể chuyện lớp, mưa, cơm hộp, tan học — không cần Task 2.</p>
      <textarea className="field mt-4 min-h-48" value={text} onChange={(e) => setText(e.target.value)} placeholder="Dear diary — hôm nay..." />
      <p className="mt-2 text-xs text-mute">{words} từ</p>
      <button className="btn-lime mt-4" onClick={save}>
        Chấm + cất nhật ký
      </button>
      {ok && <p className="mt-3 text-sm text-lime">{ok}</p>}
      {mark && <ChamCau check={mark} />}
    </div>
  );
}
