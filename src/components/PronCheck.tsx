"use client";

import { useEffect, useState } from "react";
import { speak } from "@/lib/speech";
import { listenOnce } from "@/lib/score/speak";
import { coachPron, type PronCoach } from "@/lib/pron";
import {
  assessPronunciation,
  errorVi,
  getSpeechCreds,
  scoreHue,
  setSpeechCreds,
  type PronReport,
  type PronWord,
} from "@/lib/azureSpeech";

function hueClass(n: number) {
  const h = scoreHue(n);
  return h === "lime" ? "text-lime" : h === "yellow" ? "text-yellow-400" : "text-bad";
}

function Bar({ label, n }: { label: string; n: number }) {
  return (
    <div>
      <div className="flex justify-between text-[11px]">
        <span className="text-mute">{label}</span>
        <span className={hueClass(n)}>{n}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className={`h-full ${scoreHue(n) === "lime" ? "bg-lime" : scoreHue(n) === "yellow" ? "bg-yellow-400" : "bg-bad"}`}
          style={{ width: `${Math.max(0, Math.min(100, n))}%` }}
        />
      </div>
    </div>
  );
}

function WordDrill({ w }: { w: PronWord }) {
  const bad = w.phonemes.filter((p) => p.score < 80);
  return (
    <div className="mt-3 rounded-lg border border-line p-2.5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm">
          <span className={hueClass(w.score)}>{w.word}</span>
          <span className="ml-1.5 text-mute">{w.score}/100</span>
          {w.error ? <span className="ml-1.5 text-xs text-bad">{errorVi(w.error)}</span> : null}
        </p>
        <button type="button" className="btn-ghost !px-2 !py-1 text-[11px]" onClick={() => speak(w.word, 0.55)}>
          Nghe từ này
        </button>
      </div>
      {w.phonemes.length > 0 && (
        <p className="mt-2 flex flex-wrap gap-1.5">
          {w.phonemes.map((p, i) => (
            <span
              key={`${p.ipa}-${i}`}
              className={`rounded-md px-1.5 py-0.5 text-xs ${
                p.score >= 80 ? "bg-lime/15 text-lime" : p.score >= 60 ? "bg-yellow-400/15 text-yellow-400" : "bg-bad/15 text-bad"
              }`}
              title={p.said ? `máy nghe gần /${p.said}/` : undefined}
            >
              /{p.ipa}/ {p.score}
            </span>
          ))}
        </p>
      )}
      {bad[0]?.said && (
        <p className="mt-1.5 text-xs text-mute">
          Âm /{bad[0].ipa}/ máy nghe gần /{bad[0].said}/.
        </p>
      )}
      {bad[0]?.tip && <p className="mt-1 text-xs leading-relaxed text-mute">{bad[0].tip}</p>}
    </div>
  );
}

function AzureResult({ report }: { report: PronReport }) {
  const [pick, setPick] = useState<number | null>(() => {
    const i = report.words.findIndex((w) => w.score < 80 || w.error);
    return i < 0 ? null : i;
  });
  const w = pick != null ? report.words[pick] : undefined;
  const weak = report.words.filter((x) => x.score < 80 || x.error);

  return (
    <div className="mt-3">
      <div className="flex items-end gap-4">
        <p className={`font-serif text-5xl leading-none ${hueClass(report.pron)}`}>{report.pron}</p>
        <p className="pb-1 text-sm text-mute">/100 · chấm từng âm (Azure)</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Bar label="Chính xác" n={report.accuracy} />
        <Bar label="Trôi chảy" n={report.fluency} />
        <Bar label="Đủ từ" n={report.completeness} />
        {report.prosody != null ? <Bar label="Ngữ điệu" n={report.prosody} /> : null}
      </div>
      <p className="mt-4 text-sm leading-relaxed">
        {report.words.map((word, i) => (
          <button
            key={`${word.word}-${i}`}
            type="button"
            className={`mr-1.5 ${hueClass(word.score)} ${word.score < 80 || word.error ? "underline decoration-wavy" : ""}`}
            onClick={() => setPick(i)}
          >
            {word.word}
          </button>
        ))}
      </p>
      {report.heard && <p className="mt-1 text-xs text-mute">Máy nghe: “{report.heard}”</p>}
      {w && <WordDrill w={w} />}
      {weak.length > 1 && pick != null && (
        <p className="mt-2 text-xs text-mute">Bấm từng từ màu đỏ/vàng để xem âm nào sai.</p>
      )}
    </div>
  );
}

function FallbackResult({ coach, text }: { coach: PronCoach; text: string }) {
  const missed = coach.hits.filter((h) => !h.ok && h.tip);
  const pct = coach.pct;
  return (
    <div className="mt-3">
      <p className="text-xs text-mute">Chế độ tạm — so chữ máy nghe được, chưa chấm từng âm.</p>
      <p className="mt-1 text-sm">
        Giống mẫu: <span className={pct >= 80 ? "text-lime" : pct >= 50 ? "text-yellow-400" : "text-bad"}>{pct}%</span>
      </p>
      <p className="mt-1.5 text-sm leading-relaxed">
        {coach.hits.map((r, i) => (
          <span key={`${r.word}-${i}`} className={`mr-1.5 ${r.ok ? "text-text" : "text-bad underline decoration-wavy"}`}>
            {text.split(/\s+/)[i] ?? r.word}
          </span>
        ))}
      </p>
      <p className="mt-1 text-xs text-mute">Máy nghe được là: “{coach.heard}”.</p>
      {missed.slice(0, 4).map((r, i) => (
        <p key={`${r.word}-t-${i}`} className="mt-2 text-xs text-mute">
          <span className="text-bad">{r.word}</span>
          {r.ipa ? ` ${r.ipa}` : ""} — {r.tip}
        </p>
      ))}
    </div>
  );
}

function SetupKey({ onSaved }: { onSaved: () => void }) {
  const [key, setKey] = useState("");
  const [region, setRegion] = useState("eastasia");
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3 rounded-lg border border-line p-3">
      <p className="text-sm">Chưa gắn máy chấm từng âm.</p>
      <p className="mt-1 text-xs leading-relaxed text-mute">
        Thầy tạo tài khoản Azure Speech miễn phí (5 giờ/tháng), rồi dán khóa vào đây — sau đó Zang đọc, máy chấm từng phoneme như ELSA.
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <a
          className="btn-ghost !px-3 !py-1.5 text-xs"
          href="https://portal.azure.com/#create/Microsoft.CognitiveServicesSpeechServices"
          target="_blank"
          rel="noreferrer"
        >
          Tạo khóa Azure
        </a>
        <button type="button" className="btn-lime !px-3 !py-1.5 text-xs" onClick={() => setOpen((x) => !x)}>
          {open ? "Đóng" : "Đã có khóa — dán vào"}
        </button>
      </div>
      {open && (
        <div className="mt-3 space-y-2">
          <input className="field" placeholder="Key" value={key} onChange={(e) => setKey(e.target.value)} autoComplete="off" />
          <input className="field" placeholder="Region, ví dụ eastasia" value={region} onChange={(e) => setRegion(e.target.value)} />
          <button
            type="button"
            className="btn-lime"
            disabled={!key.trim()}
            onClick={() => {
              setSpeechCreds({ key, region: region.trim() || "eastasia" });
              onSaved();
            }}
          >
            Lưu khóa trên máy này
          </button>
        </div>
      )}
    </div>
  );
}

/** Chấm phát âm: Azure phoneme (ELSA-style) khi có khóa; không có khóa thì so chữ tạm. */
export default function PronCheck({ text, slow = true }: { text: string; slow?: boolean }) {
  const [ready, setReady] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [report, setReport] = useState<PronReport | null>(null);
  const [coach, setCoach] = useState<PronCoach | null>(null);

  useEffect(() => {
    const sync = () => {
      setHasKey(!!getSpeechCreds());
      setReady(true);
    };
    sync();
    window.addEventListener("eight", sync);
    return () => window.removeEventListener("eight", sync);
  }, []);

  async function listenAzure() {
    setErr("");
    setBusy(true);
    setReport(null);
    setCoach(null);
    try {
      setReport(await assessPronunciation(text));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Không chấm được.");
    } finally {
      setBusy(false);
    }
  }

  async function listenFallback() {
    setErr("");
    setBusy(true);
    setReport(null);
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

  return (
    <div className="rounded-xl border border-line p-3">
      <p className="text-[11px] uppercase tracking-wider text-mute">Chấm phát âm từng âm</p>
      <p className="mt-1 text-xs text-mute">
        Nghe mẫu, rồi đọc cả câu. Máy chấm chính xác / trôi chảy / đủ từ / ngữ điệu, và chỉ âm nào sai.
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {slow && (
          <button type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={() => speak(text, 0.6)}>
            Nghe chậm
          </button>
        )}
        <button type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={() => speak(text, 1)}>
          Nghe mẫu
        </button>
        <button type="button" className="btn-lime !px-3 !py-1.5 text-xs" disabled={busy} onClick={hasKey ? listenAzure : listenFallback}>
          {busy ? "Đang nghe…" : "Em đọc thử"}
        </button>
      </div>
      {err && <p className="mt-2 text-sm text-bad">{err}</p>}
      {busy && <p className="mt-2 text-xs text-mute">Hãy đọc to và rõ: “{text}”</p>}
      {report && <AzureResult report={report} />}
      {coach && <FallbackResult coach={coach} text={text} />}
      {ready && !hasKey && <SetupKey onSaved={() => setHasKey(true)} />}
    </div>
  );
}
