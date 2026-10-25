"use client";

import { useEffect, useState, type ReactNode } from "react";
import { pauseSpeak, resumeSpeak, speak, stopSpeak } from "@/lib/speech";

function clock(sec: number) {
  const s = Math.max(0, Math.floor(sec));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function PlayBar({
  minutes,
  audio,
  rate = 0.9,
  answered,
  total,
  extra,
}: {
  minutes?: number;
  audio?: string;
  rate?: number;
  answered?: number;
  total?: number;
  extra?: ReactNode;
}) {
  const [frozen, setFrozen] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [prog, setProg] = useState(0);
  const [left, setLeft] = useState((minutes ?? 0) * 60);

  useEffect(() => {
    setLeft((minutes ?? 0) * 60);
    setFrozen(false);
  }, [minutes]);

  useEffect(() => {
    setAudioOn(false);
    setProg(0);
    stopSpeak();
    return () => stopSpeak();
  }, [audio]);

  useEffect(() => {
    if (frozen || !minutes) return;
    const t = setInterval(() => setLeft((x) => (x > 0 ? x - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [frozen, minutes]);

  function play(slow = false) {
    if (!audio) return;
    setFrozen(false);
    setAudioOn(true);
    setProg(0);
    speak(audio, slow ? Math.min(rate, 0.72) : rate, {
      onProgress: setProg,
      onEnd: () => {
        setAudioOn(false);
        setProg(1);
      },
    });
  }

  function freeze() {
    setFrozen(true);
    pauseSpeak();
  }

  function unfreeze() {
    setFrozen(false);
    if (audioOn) resumeSpeak();
  }

  const hasAudio = !!audio;
  const hasTimer = !!minutes;

  return (
    <div className="playbar">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-2 px-4 py-2.5">
        {frozen ? (
          <button className="btn-lime" onClick={unfreeze}>
            Tiếp
          </button>
        ) : (
          <button className="btn-ghost" onClick={freeze}>
            Dừng
          </button>
        )}

        {hasAudio && (
          <>
            <button className="btn-ghost" onClick={() => play(false)}>
              {audioOn ? "Phát lại" : "Phát"}
            </button>
            <button className="btn-ghost" onClick={() => play(true)}>
              Phát chậm
            </button>
            <div className="min-w-[120px] flex-1">
              <div className="h-1.5 overflow-hidden rounded-full bg-line">
                <div className="h-full bg-lime transition-[width] duration-200" style={{ width: `${Math.round(prog * 100)}%` }} />
              </div>
            </div>
          </>
        )}

        {hasTimer && (
          <p className={`font-mono text-sm tabular-nums ${left === 0 ? "text-bad" : frozen ? "text-warn" : "text-text"}`}>
            {clock(left)}
            {frozen ? " · đang tạm dừng" : ""}
            {left === 0 ? " · hết giờ" : ""}
          </p>
        )}

        {typeof answered === "number" && typeof total === "number" && total > 0 && (
          <p className="text-xs text-mute">
            {answered}/{total} câu
          </p>
        )}

        {extra}
      </div>
    </div>
  );
}
