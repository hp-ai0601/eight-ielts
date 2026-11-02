"use client";

import { useMemo, useState } from "react";
import { LEXICON } from "@/lib/lexicon";
import { checkDictation, letterMarks } from "@/lib/zang/check";
import Hear from "@/components/Hear";

/** Nghe viết: nghe từ tiếng Anh rồi gõ lại đúng chính tả.
 *  Gợi ý nghĩa tiếng Việt để biết mình đang nghe từ nào. */
export default function Dictation({ seedWords }: { seedWords?: string[] }) {
  const round = useMemo(() => {
    const pool = seedWords?.length ? LEXICON.filter((x) => seedWords.includes(x.word)) : LEXICON;
    if (!pool.length) return [];
    const start = Math.floor(Math.random() * pool.length);
    const out = [];
    for (let k = 0; k < pool.length && out.length < 8; k++) out.push(pool[(start + k) % pool.length]);
    return out;
  }, [seedWords]);

  const [i, setI] = useState(0);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [ok, setOk] = useState(0);

  if (!round.length) return <p className="text-sm text-mute">Chưa có từ nào để luyện.</p>;
  const it = round[i];
  const right = checked && checkDictation(typed, it.word);

  if (i >= round.length) {
    return (
      <div className="panel mt-4 p-5">
        <p className="font-serif text-3xl">
          Viết đúng {ok}/{round.length} từ
        </p>
        <p className="mt-2 text-sm text-mute">
          {ok === round.length
            ? "Tai và tay đều tốt — từ nào cũng chính xác."
            : "Từ nào chưa đúng thì bấm nghe lại vài lần, đọc to theo rồi viết lại."}
        </p>
      </div>
    );
  }

  return (
    <div className="panel mt-4 p-5">
      <p className="text-[11px] uppercase tracking-wider text-lime">
        Nghe viết · từ {i + 1}/{round.length} · đúng {ok}
      </p>
      <p className="mt-3 text-sm text-mute">Bấm nghe rồi gõ lại từ vừa nghe. Nghe chậm bao nhiêu lần cũng được.</p>
      <div className="mt-3 flex items-center gap-3">
        <Hear text={it.word} label="Nghe từ" rate={0.8} />
        <Hear text={it.word} label="Nghe chậm hơn" rate={0.55} />
      </div>
      <p className="mt-3 text-sm">
        Nghĩa: <span className="text-lime">{it.vi}</span> · {it.word.length} chữ cái
      </p>
      <input
        className="field mt-3"
        value={typed}
        disabled={checked}
        onChange={(e) => setTyped(e.target.value)}
        placeholder="Gõ từ vừa nghe…"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
      {!checked ? (
        <button className="btn-lime mt-3" disabled={!typed.trim()} onClick={() => setChecked(true)}>
          Kiểm tra
        </button>
      ) : (
        <>
          <p className={`mt-3 text-sm ${right ? "text-lime" : "text-red-400"}`}>
            {right ? "Chính xác!" : "Chưa đúng — soi từng chữ bên dưới nhé."}
          </p>
          {!right && (
            <p className="mt-2 font-mono text-lg tracking-widest">
              {letterMarks(typed, it.word).map((m, idx) => (
                <span key={idx} className={m.ok ? "text-lime" : "text-red-400"}>
                  {m.ch}
                </span>
              ))}
              <span className="ml-3 text-mute">đáp án: {it.word}</span>
            </p>
          )}
          <button
            className="btn-lime mt-3"
            onClick={() => {
              if (right) setOk((n) => n + 1);
              setChecked(false);
              setTyped("");
              setI(i + 1);
            }}
          >
            {i + 1 >= round.length ? "Xem kết quả" : "Từ tiếp"}
          </button>
        </>
      )}
    </div>
  );
}
