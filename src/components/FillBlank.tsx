"use client";

import { useMemo, useState } from "react";
import { LEXICON } from "@/lib/lexicon";
import { checkDictation } from "@/lib/zang/check";
import Hear from "@/components/Hear";

function blankOf(sentence: string, word: string): string | null {
  const re = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
  if (!re.test(sentence)) return null;
  return sentence.replace(re, "_____");
}

/** Bài tập điền từ: nhìn câu ví dụ khuyết một từ, gõ lại từ đó.
 *  Có dịch nghĩa tiếng Việt của từ cần điền để người học đoán được. */
export default function FillBlank({ seedWords }: { seedWords?: string[] }) {
  const round = useMemo(() => {
    const pool = seedWords?.length
      ? LEXICON.filter((x) => seedWords.includes(x.word))
      : LEXICON.filter((x) => x.example);
    const usable = pool.filter((x) => blankOf(x.example, x.word));
    const start = Math.floor(Math.random() * usable.length);
    const out = [];
    for (let k = 0; k < usable.length && out.length < 8; k++) {
      out.push(usable[(start + k) % usable.length]);
    }
    return out;
  }, [seedWords]);

  const [i, setI] = useState(0);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [ok, setOk] = useState(0);

  if (!round.length) return <p className="text-sm text-mute">Chưa có câu nào để luyện.</p>;
  const it = round[i];
  const blank = blankOf(it.example, it.word) ?? it.example;
  const right = checked && checkDictation(typed, it.word);

  if (i >= round.length) {
    return (
      <div className="panel mt-4 p-5">
        <p className="font-serif text-3xl">
          Điền đúng {ok}/{round.length} từ
        </p>
        <p className="mt-2 text-sm text-mute">
          {ok === round.length ? "Xuất sắc — từ nào cũng nhớ mặt chữ." : "Mấy từ chưa đúng lát lướt lại danh sách từ là nhớ thôi."}
        </p>
      </div>
    );
  }

  return (
    <div className="panel mt-4 p-5">
      <p className="text-[11px] uppercase tracking-wider text-lime">
        Điền từ · câu {i + 1}/{round.length} · đúng {ok}
      </p>
      <p className="mt-3 leading-8">{blank}</p>
      <p className="mt-1 text-sm text-mute">
        Nghĩa của từ cần điền: {it.vi} <span className="text-lime">({it.pos === "n" ? "danh từ" : it.pos === "v" ? "động từ" : it.pos === "adj" ? "tính từ" : "từ"})</span>
      </p>
      <div className="mt-3 flex gap-2">
        <input
          className="field"
          value={typed}
          disabled={checked}
          onChange={(e) => setTyped(e.target.value)}
          placeholder="Gõ từ tiếng Anh…"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
        />
        <Hear text={it.word} />
      </div>
      {!checked ? (
        <button className="btn-lime mt-3" disabled={!typed.trim()} onClick={() => setChecked(true)}>
          Kiểm tra
        </button>
      ) : (
        <>
          <p className={`mt-3 text-sm ${right ? "text-lime" : "text-red-400"}`}>
            {right ? "Chính xác!" : `Chưa đúng — đáp án là “${it.word}”.`}
          </p>
          <button
            className="btn-lime mt-3"
            onClick={() => {
              if (right) setOk((n) => n + 1);
              setChecked(false);
              setTyped("");
              setI(i + 1);
            }}
          >
            {i + 1 >= round.length ? "Xem kết quả" : "Câu tiếp"}
          </button>
        </>
      )}
    </div>
  );
}
