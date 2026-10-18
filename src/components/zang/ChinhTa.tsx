"use client";

import { useState } from "react";
import { speak } from "@/lib/speech";
import { checkDictation } from "@/lib/zang/check";

export default function ChinhTa({
  target,
  ipa,
  onResult,
}: {
  target: string;
  ipa?: string;
  onResult?: (ok: boolean, wrote: string) => void;
}) {
  const [wrote, setWrote] = useState("");
  const [copies, setCopies] = useState(["", "", ""]);
  const [done, setDone] = useState<boolean | null>(null);

  function mark() {
    const ok = checkDictation(wrote, target);
    setDone(ok);
    onResult?.(ok, wrote.trim());
  }

  const copied = copies.every((x) => checkDictation(x, target));

  return (
    <div className="panel mt-5 p-4">
      <p className="text-xs uppercase tracking-wider text-lime">Chính tả</p>
      <p className="mt-2 text-sm text-mute">Nghe, đừng nhìn từ. Viết lại. Sai thì chép 3 lần.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button className="btn-ghost" onClick={() => speak(target, 0.85)}>
          Nghe từ
        </button>
        <button className="btn-ghost" onClick={() => speak(target, 0.65)}>
          Chậm
        </button>
      </div>
      <input
        className="field mt-3"
        value={wrote}
        onChange={(e) => {
          setWrote(e.target.value);
          setDone(null);
        }}
        placeholder="Gõ những gì em nghe"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
      <button className="btn-lime mt-3" disabled={!wrote.trim()} onClick={mark}>
        Kiểm tra chính tả
      </button>
      {done === true && <p className="mt-3 text-sm text-lime">Đúng. {ipa ? ipa : ""}</p>}
      {done === false && (
        <div className="mt-3">
          <p className="text-sm text-bad">
            Sai. Đúng là <span className="text-lime">{target}</span> {ipa}
          </p>
          <p className="mt-2 text-xs text-mute">Chép đúng 3 lần:</p>
          {copies.map((c, i) => (
            <input
              key={i}
              className="field mt-2"
              value={c}
              onChange={(e) => setCopies(copies.map((x, j) => (j === i ? e.target.value : x)))}
              placeholder={`Lần ${i + 1}`}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          ))}
          {copied && <p className="mt-2 text-sm text-lime">Đã chép 3 lần. Nghe lại lần nữa cho chắc.</p>}
        </div>
      )}
    </div>
  );
}
