"use client";

import { useState } from "react";
import { DIARY_HINTS, STORIES, dayNum, pick } from "@/lib/zang/content";
import { LEXICON } from "@/lib/lexicon";
import { saveZangDiary, saveZangDraft, type State } from "@/lib/store";
import { checkText, type Check } from "@/lib/zang/check";
import ChamCau from "./ChamCau";
import WordPic from "@/components/WordPic";

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

  function cham() {
    if (words < 20) {
      setOk("Viết khoảng 20 từ trở lên — như nhật ký, không cần luận.");
      return;
    }
    const c = checkText(text.trim(), word ? [word.word] : []);
    setMark(c);
    onDone(
      saveZangDraft(s, {
        kind: "diary",
        word: beat.tense,
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
      <p className="text-sm text-mute">{hint}</p>
      <ul className="mt-4 space-y-1 text-sm">
        <li className="flex items-center gap-3">
          <WordPic word={word.word} vi={word.vi} pos={word.pos} size="thumb" />
          <span>
            Từ hôm nay nếu nhớ: <span className="text-lime">{word.word}</span> ({word.vi})
          </span>
        </li>
        <li>
          Thì hôm nay: <span className="text-lime">{beat.tense}</span>
        </li>
        <li>
          Cấu trúc hôm nay: <span className="text-lime">{beat.structure}</span>
        </li>
      </ul>
      <p className="mt-4 text-sm text-mute">Học chắc từ + ngữ pháp rồi mới viết. Kể chuyện lớp, mưa, cơm hộp, tan học — không cần Task 2.</p>
      <textarea
        className={`field mt-4 min-h-48 ${mark && !mark.clean ? "border-bad" : ""}`}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setMark(null);
        }}
        placeholder="Dear diary — hôm nay..."
      />
      <p className="mt-2 text-xs text-mute">{words} từ</p>
      <button className="btn-lime mt-4" onClick={cham}>
        Chấm thì + ngữ pháp
      </button>
      {ok && <p className={`mt-3 text-sm ${mark && !mark.clean ? "text-bad" : "text-lime"}`}>{ok}</p>}
      {mark && <ChamCau check={mark} text={text} extra={word ? [word.word] : []} onClean={cat} />}
    </div>
  );
}
