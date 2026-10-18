"use client";

import { useState } from "react";
import { speak } from "@/lib/speech";

interface Score {
  band: number;
  fc: number;
  lr: number;
  gra: number;
  extra: number;
  notes: string[];
  rewrite?: string;
}

export default function SpeakBox({
  cue,
  bullets,
  onScored,
}: {
  cue: string;
  bullets?: string[];
  onScored?: (band: number) => void;
}) {
  const [text, setText] = useState("");
  const [score, setScore] = useState<Score | null>(null);
  const [busy, setBusy] = useState(false);
  const [prep, setPrep] = useState(false);

  async function send() {
    if (!text.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "speak", prompt: cue, text }),
      });
      const data = await res.json();
      setScore(data.score);
      if (data.score?.band) onScored?.(data.score.band);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-mute">Cue</p>
      <p className="mt-2 font-serif text-xl leading-snug">{cue}</p>
      {bullets && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mute">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex gap-2">
        <button className="btn-ghost" onClick={() => speak(cue)}>
          Nghe câu hỏi
        </button>
        <button
          className="btn-ghost"
          onClick={() => {
            setPrep(true);
            setTimeout(() => setPrep(false), 60_000);
          }}
        >
          {prep ? "Đang 1 phút chuẩn bị…" : "Bấm 1 phút chuẩn bị"}
        </button>
      </div>
      <p className="mt-6 text-sm text-mute">
        Nói thành tiếng, rồi gõ lại (hoặc dán transcript). Chấm 4 tiêu chí: Fluency, Lexical, Grammar, Pron.
      </p>
      <textarea className="field mt-3 min-h-36" value={text} onChange={(e) => setText(e.target.value)} placeholder="I usually…" />
      <button className="btn-lime mt-4" disabled={busy || !text.trim()} onClick={send}>
        {busy ? "Đang chấm…" : "Chấm speaking"}
      </button>
      {score && (
        <div className="mt-6 border-t border-line pt-5">
          <p className="font-serif text-3xl">{score.band}</p>
          <p className="mt-1 text-xs text-mute">
            FC {score.fc} · LR {score.lr} · GRA {score.gra} · Pron {score.extra}
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
