"use client";

import { useState } from "react";
import { useEight } from "@/lib/useEight";
import { STAGES } from "@/lib/content";
import { overallBand } from "@/lib/store";
import ReactMarkdown from "react-markdown";

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
    <div className="mx-auto max-w-2xl px-5 py-10 lg:px-10">
      <h1 className="font-serif text-4xl">Gia sư</h1>
      <p className="mt-3 text-mute">
        Biết bạn đang ở tầng {stage?.title}. Hỏi một chuyện cụ thể — một câu đang sai, một đoạn Task 2, một collocation. Không hỏi “làm sao đạt 8.0” chung chung.
      </p>
      <textarea className="field mt-6 min-h-32" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Câu mình vừa nói: I am live in Hanoi since 3 years…" />
      <button className="btn-lime mt-4" disabled={busy || !q.trim()} onClick={send}>
        {busy ? "Đang đọc…" : "Hỏi"}
      </button>
      {a && (
        <div className="prose prose-invert mt-8 max-w-none text-[15.5px] leading-7">
          <ReactMarkdown>{a}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
