"use client";

import { useState } from "react";
import { speak } from "@/lib/speech";
import { listenOnce } from "@/lib/score/speak";
import { coachPron, type PronCoach } from "@/lib/pron";

/** Nói theo mẫu rồi so khớp từng từ — chỉ từ nào đọc chưa rõ, kèm mẹo phát âm. */
export default function PronCheck({ text, slow = true }: { text: string; slow?: boolean }) {
  const [coach, setCoach] = useState<PronCoach | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const missed = coach?.hits.filter((h) => !h.ok && h.tip) ?? [];

  async function listen() {
    setErr("");
    setBusy(true);
    setCoach(null);
    try {
      const h = await listenOnce();
      setCoach(coachPron(text, h));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Máy không nghe được — em cho phép micro rồi bấm lại nhé.");
    } finally {
      setBusy(false);
    }
  }

  const pct = coach?.pct ?? 0;

  return (
    <div className="rounded-xl border border-line p-3">
      <p className="text-[11px] uppercase tracking-wider text-mute">Ghi âm và chỉnh phát âm</p>
      <p className="mt-1 text-xs text-mute">Đọc to câu mẫu. Máy nghe rồi chỉ những từ chưa rõ, kèm cách đặt miệng.</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {slow && (
          <button type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={() => speak(text, 0.6)}>
            Nghe chậm
          </button>
        )}
        <button type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={() => speak(text, 1)}>
          Nghe mẫu
        </button>
        <button type="button" className="btn-lime !px-3 !py-1.5 text-xs" disabled={busy} onClick={listen}>
          {busy ? "Đang nghe…" : "Em đọc thử"}
        </button>
      </div>
      {err && <p className="mt-2 text-sm text-bad">{err}</p>}
      {busy && <p className="mt-2 text-xs text-mute">Hãy đọc to và rõ: “{text}”</p>}
      {coach && (
        <div className="mt-3">
          <p className="text-sm">
            Giống mẫu:{" "}
            <span className={pct >= 80 ? "text-lime" : pct >= 50 ? "text-yellow-400" : "text-bad"}>{pct}%</span>
            {pct >= 80 ? " — đọc tốt lắm!" : " — nghe lại mẫu chậm, rồi đọc lại những từ màu đỏ."}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed">
            {coach.hits.map((r, i) => (
              <span key={`${r.word}-${i}`} className={`mr-1.5 ${r.ok ? "text-text" : "text-bad underline decoration-wavy"}`}>
                {r.word}
              </span>
            ))}
          </p>
          <p className="mt-1 text-xs text-mute">Máy nghe được là: “{coach.heard}”.</p>
          {coach.notes[0] && <p className="mt-2 text-sm">{coach.notes[0]}</p>}
          {missed.length > 0 && (
            <ul className="mt-3 space-y-2">
              {missed.slice(0, 4).map((r, i) => (
                <li key={`${r.word}-tip-${i}`} className="rounded-lg border border-line p-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm">
                      <span className="text-bad">{r.word}</span>
                      {r.ipa ? <span className="ml-1.5 text-mute">{r.ipa}</span> : null}
                      {r.heard ? <span className="ml-1.5 text-xs text-mute">máy nghe thành “{r.heard}”</span> : null}
                    </p>
                    <button
                      type="button"
                      className="btn-ghost !px-2 !py-1 text-[11px]"
                      onClick={() => speak(r.word, 0.55)}
                    >
                      Nghe từ này
                    </button>
                  </div>
                  {r.tip && <p className="mt-1 text-xs leading-relaxed text-mute">{r.tip}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
