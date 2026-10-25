"use client";

import { useState } from "react";
import { speak } from "@/lib/speech";
import { checkDictation, letterMarks } from "@/lib/zang/check";

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
  const [tries, setTries] = useState(0);
  const [flash, setFlash] = useState(false);
  const [needCopy, setNeedCopy] = useState(false);
  const [done, setDone] = useState(false);

  const okNow = checkDictation(wrote, target);
  const marks = letterMarks(wrote, target);
  const copied = copies.every((x) => checkDictation(x, target));
  const locked = done && (!needCopy || copied);

  function pass(value: string) {
    setDone(true);
    onResult?.(true, value.trim());
  }

  function onType(v: string) {
    setWrote(v);
    if (checkDictation(v, target)) {
      if (needCopy && !copied) return;
      pass(v);
    } else if (done) {
      setDone(false);
    }
  }

  function mark() {
    if (checkDictation(wrote, target)) {
      pass(wrote);
      return;
    }
    const n = tries + 1;
    setTries(n);
    onResult?.(false, wrote.trim());
    if (n >= 3 && !flash) {
      setFlash(true);
      setNeedCopy(true);
      window.setTimeout(() => setFlash(false), 5000);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xs uppercase tracking-wider text-lime">Chính tả</p>
        <button type="button" className="btn-ghost text-xs" onClick={() => speak(target, 0.85)}>
          Nghe
        </button>
        <button type="button" className="btn-ghost text-xs" onClick={() => speak(target, 0.65)}>
          Chậm
        </button>
      </div>
      <input
        className={`field mt-3 ${wrote && !okNow ? "border-bad" : okNow ? "border-lime" : ""}`}
        value={wrote}
        onChange={(e) => onType(e.target.value)}
        placeholder="Nghe rồi gõ lại từ em nghe được…"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        disabled={locked}
      />
      {wrote.length > 0 && (
        <p className="mt-2 font-serif text-2xl tracking-wide">
          {marks.map((m, i) => (
            <span key={i} className={m.ok ? "text-lime" : "text-bad"}>
              {m.ch === " " ? "\u00a0" : m.ch}
            </span>
          ))}
        </p>
      )}
      {flash && (
        <p className="mt-3 font-serif text-2xl text-lime">
          {target} <span className="text-sm text-mute">{ipa}</span>
        </p>
      )}
      {!locked && (
        <button type="button" className="btn-lime mt-3" disabled={!wrote.trim()} onClick={mark}>
          Kiểm tra
        </button>
      )}
      {okNow && (!needCopy || copied) && <p className="mt-3 text-sm text-lime">Đúng rồi! {ipa ?? ""}</p>}
      {tries > 0 && !okNow && (
        <p className="mt-3 text-sm text-bad">Chưa đúng — chữ nào đỏ thì viết lại chữ đó cho xanh. {tries >= 3 ? "Từ sẽ hiện 5 giây rồi tắt." : `Lần ${tries}/3.`}</p>
      )}
      {needCopy && !copied && (
        <div className="mt-3">
          <p className="text-xs text-mute">Từ vừa hiện rồi — em chép lại đúng 3 lần, sau đó gõ lại từ trí nhớ nhé.</p>
          {copies.map((c, i) => (
            <input
              key={i}
              className={`field mt-2 ${c && !checkDictation(c, target) ? "border-bad" : c && checkDictation(c, target) ? "border-lime" : ""}`}
              value={c}
              onChange={(e) => {
                const next = copies.map((x, j) => (j === i ? e.target.value : x));
                setCopies(next);
                if (next.every((x) => checkDictation(x, target)) && checkDictation(wrote, target)) pass(wrote);
              }}
              placeholder={`Lần ${i + 1}`}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
