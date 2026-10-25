"use client";

import { useState } from "react";
import { speak } from "@/lib/speech";
import { listenOnce } from "@/lib/score/speak";

const norm = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
function lev(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array<number>(n).fill(0)]);
  for (let j = 1; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[m][n];
}
const match = (a: string, b: string) => a === b || lev(a, b) <= (a.length > 5 ? 2 : 1);

/** Nói theo mẫu rồi so khớp từng từ — cho biết từ nào đọc chưa rõ. */
export default function PronCheck({ text, slow = true }: { text: string; slow?: boolean }) {
  const [heard, setHeard] = useState("");
  const [busy, setBusy] = useState(false);
  const target = text.split(/\s+/).map(norm).filter(Boolean);
  const said = heard.split(/\s+/).map(norm).filter(Boolean);
  const results = target.map((w) => ({ w, ok: said.some((x) => match(x, w)) }));
  const pct = heard ? Math.round((results.filter((r) => r.ok).length / Math.max(1, target.length)) * 100) : 0;

  return (
    <div className="rounded-xl border border-line p-3">
      <p className="text-[11px] uppercase tracking-wider text-mute">Nói theo mẫu</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {slow && (
          <button className="btn-ghost !px-3 !py-1.5 text-xs" onClick={() => speak(text, 0.6)}>
            Nghe chậm
          </button>
        )}
        <button className="btn-ghost !px-3 !py-1.5 text-xs" onClick={() => speak(text, 1)}>
          Nghe mẫu
        </button>
        <button
          className="btn-lime !px-3 !py-1.5 text-xs"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              const h = await listenOnce();
              setHeard(h);
            } catch {
              setHeard("");
            } finally {
              setBusy(false);
            }
          }}
        >
          {busy ? "Đang nghe…" : "Em đọc thử"}
        </button>
      </div>
      {heard ? (
        <div className="mt-3">
          <p className="text-sm">
            Giống mẫu: <span className={pct >= 80 ? "text-lime" : pct >= 50 ? "text-yellow-400" : "text-red-400"}>{pct}%</span>
            {pct >= 80 ? " — đọc tốt lắm!" : " — nghe lại mẫu chậm rồi đọc lại nhé."}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed">
            {results.map((r, i) => (
              <span key={i} className={`mr-1.5 ${r.ok ? "text-text" : "text-red-400 underline decoration-wavy"}`}>
                {text.split(/\s+/)[i]}
              </span>
            ))}
          </p>
          <p className="mt-1 text-xs text-mute">Máy nghe được là: “{heard}”. Từ gạch chân đỏ là từ máy chưa nghe rõ — em đọc lại từ đó nhé.</p>
        </div>
      ) : busy ? (
        <p className="mt-2 text-xs text-mute">Hãy đọc to và rõ: “{text}”</p>
      ) : null}
    </div>
  );
}
