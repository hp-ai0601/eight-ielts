"use client";

import { useEffect, useRef, useState } from "react";
import { speak } from "@/lib/speech";
import { listenOnce, scoreSpeak } from "@/lib/score/speak";
import { saveSpeakTake } from "@/lib/store";
import { useEight } from "@/lib/useEight";
import Recorder from "@/components/zang/Recorder";

export default function SpeakBox({
  cue,
  bullets,
  onScored,
}: {
  cue: string;
  bullets?: string[];
  onScored?: (band: number) => void;
}) {
  const { s, commit } = useEight();
  const [text, setText] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const startedRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (busy && startedRef.current === null) {
      startedRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setSeconds(Math.floor((Date.now() - (startedRef.current ?? Date.now())) / 1000));
      }, 500);
    }
    if (!busy && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [busy]);

  const mark = text.trim().length > 8 ? scoreSpeak(text, cue, seconds || undefined) : null;

  async function hear() {
    setErr("");
    setBusy(true);
    startedRef.current = null;
    setSeconds(0);
    try {
      const t = await listenOnce();
      setText(t);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Không nghe được.");
    } finally {
      setBusy(false);
    }
  }

  function send() {
    if (!mark) return;
    if (s) commit(saveSpeakTake(s, { cue, text, auto: mark }));
    onScored?.(mark.band);
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-mute">Thẻ chủ đề</p>
      <p className="mt-2 font-serif text-xl leading-snug">{cue}</p>
      {bullets && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mute">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="btn-ghost" onClick={() => speak(cue)}>
          Nghe câu hỏi
        </button>
        <button className="btn-lime" disabled={busy} onClick={hear}>
          {busy ? "Đang nghe…" : "Bấm rồi nói — máy sẽ ghi lại"}
        </button>
      </div>
      <p className="mt-6 text-sm text-mute">
        Nên dùng Chrome hoặc Safari. Máy sẽ chuyển giọng nói thành chữ rồi chấm thử 4 tiêu chí FC / LR / GRA / Pron — điểm chính thức vẫn do thầy Hiệp chấm.
      </p>
      {busy && seconds > 0 && (
        <p className="mt-2 text-sm font-medium text-lime">{seconds}s</p>
      )}
      <textarea className="field mt-3 min-h-36" value={text} onChange={(e) => setText(e.target.value)} placeholder="I usually…" />
      {err && <p className="mt-2 text-sm text-bad">{err}</p>}
      <Recorder />
      <button className="btn-lime mt-4" disabled={!text.trim()} onClick={send}>
        Nộp cho thầy
      </button>
      {mark && (
        <div className="mt-6 border-t border-line pt-5">
          <p className="font-serif text-3xl">{mark.band}</p>
          <p className="mt-1 text-xs text-mute">
            FC {mark.fc} · LR {mark.lr} · GRA {mark.gra} · Pron {mark.pron} · máy chấm thử
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {mark.notes.map((n) => (
              <li key={n}>— {n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
