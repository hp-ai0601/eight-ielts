"use client";

import { useState } from "react";
import { useEight } from "@/lib/useEight";
import { STAGES } from "@/lib/content";
import { overallBand } from "@/lib/store";
import ReactMarkdown from "react-markdown";
import Studio from "@/components/Studio";

export default function CoachPage() {
  const { s, ready } = useEight();
  const [q, setQ] = useState("");
  const [a, setA] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  if (!ready || !s) return null;
  const state = s;
  const stage = STAGES.find((x) => x.id === state.profile.stageId);

  async function send() {
    setBusy(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "coach",
          text: q,
          history: `Tầng ${stage?.title}, overall ${overallBand(state)}, đã học ${state.profile.completed.length} bài, streak ${state.profile.streak.count}.`,
        }),
      });
      const data = await res.json();
      setA(data.content || data.error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Studio
      title="Gia sư"
      kicker={stage?.title}
      next={{ href: "/kho", label: "Kho" }}
      stage={
        <div className="mx-auto max-w-lg">
          <p className="text-sm text-mute">Hỏi một câu đang sai, một đoạn Task 2, một collocation. Đừng hỏi “làm sao 8.0” chung.</p>
          <textarea
            className="field mt-5 min-h-32"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Câu mình vừa nói: I am live in Hanoi since 3 years…"
          />
          <button className="btn-lime mt-3" disabled={busy || !q.trim()} onClick={send}>
            {busy ? "Đang đọc…" : "Hỏi"}
          </button>
          {a && (
            <div className="prose prose-invert mt-8 max-w-none text-[15.5px] leading-7">
              <ReactMarkdown>{a}</ReactMarkdown>
            </div>
          )}
        </div>
      }
    />
  );
}
