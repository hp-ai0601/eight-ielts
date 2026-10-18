"use client";

import { useEffect, useState } from "react";

interface Score {
  band: number;
  fc: number;
  lr: number;
  gra: number;
  extra: number;
  notes: string[];
  rewrite?: string;
}

export default function WriteBox({
  prompt,
  min,
  data,
  minutes = 20,
  onScored,
}: {
  prompt: string;
  min: number;
  data?: string;
  minutes?: number;
  onScored?: (band: number) => void;
}) {
  const [text, setText] = useState("");
  const [left, setLeft] = useState(minutes * 60);
  const [run, setRun] = useState(false);
  const [score, setScore] = useState<Score | null>(null);
  const [busy, setBusy] = useState(false);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  useEffect(() => {
    if (!run) return;
    const t = setInterval(() => setLeft((x) => (x > 0 ? x - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [run]);

  async function send() {
    setBusy(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "write", prompt, min, text }),
      });
      const data = await res.json();
      setScore(data.score);
      if (data.score?.band) onScored?.(data.score.band);
    } finally {
      setBusy(false);
    }
  }

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div>
      <p className="font-serif text-lg leading-relaxed">{prompt}</p>
      {data && <p className="mt-3 rounded-xl bg-bg p-3 font-serif text-sm text-mute">{data}</p>}
      <div className="mt-4 flex items-center justify-between text-sm text-mute">
        <span>
          {words} / {min} từ
        </span>
        <button className="btn-ghost" onClick={() => setRun(true)}>
          {run ? `${mm}:${ss}` : `Bấm giờ ${minutes}′`}
        </button>
      </div>
      <textarea
        className="field mt-3 min-h-56 font-serif"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="The chart illustrates…"
      />
      <button className="btn-lime mt-4" disabled={busy || words < 40} onClick={send}>
        {busy ? "Đang chấm…" : "Chấm writing"}
      </button>
      {score && (
        <div className="mt-6 border-t border-line pt-5">
          <p className="font-serif text-3xl">{score.band}</p>
          <p className="mt-1 text-xs text-mute">
            TA/TR {score.fc} · CC {score.extra} · LR {score.lr} · GRA {score.gra}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {score.notes.map((n) => (
              <li key={n}>— {n}</li>
            ))}
          </ul>
          {score.rewrite && <p className="mt-4 font-serif text-sm text-mute">{score.rewrite}</p>}
        </div>
      )}
    </div>
  );
}
