"use client";

import { useState } from "react";
import { TRACKS, dayNum, pick } from "@/lib/zang/content";
import { speak, stopSpeak } from "@/lib/speech";
import { saveZangListen, type State } from "@/lib/store";
import Recorder from "./Recorder";

const STEPS = ["Nghĩa trước", "Nghe không chữ", "Đoán", "Ghép lại", "Phát âm + ghi âm"] as const;

export default function HaiNhac({ s, onDone }: { s: State; onDone: (next: State) => void }) {
  const [kind, setKind] = useState<"hai" | "nhac">("hai");
  const pool = TRACKS.filter((t) => t.kind === kind);
  const track = pick(pool, dayNum());
  const [step, setStep] = useState(0);
  const [guess, setGuess] = useState("");

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button className={kind === "hai" ? "btn-lime" : "btn-ghost"} onClick={() => { setKind("hai"); setStep(0); }}>
          Truyện hài
        </button>
        <button className={kind === "nhac" ? "btn-lime" : "btn-ghost"} onClick={() => { setKind("nhac"); setStep(0); }}>
          Nhạc / lời
        </button>
      </div>
      <p className="mt-4 text-xs uppercase tracking-wider text-lime">
        Bước {step + 1}/5 · {STEPS[step]}
      </p>
      <h2 className="mt-2 font-serif text-2xl">{track.title}</h2>

      {step === 0 && (
        <div className="mt-4">
          <p className="text-sm text-mute">Xem nghĩa tiếng Việt trước. Chưa nghe.</p>
          <p className="mt-4 leading-8">{track.vi}</p>
          <button className="btn-lime mt-6" onClick={() => setStep(1)}>
            Đã đọc nghĩa → nghe không chữ
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="mt-4">
          <p className="text-sm text-mute">Không phụ đề. Bấm nghe, đoán trong đầu.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="btn-lime" onClick={() => speak(track.en, 0.86)}>
              Nghe
            </button>
            <button className="btn-ghost" onClick={() => speak(track.en, 0.7)}>
              Chậm
            </button>
            <button className="btn-ghost" onClick={stopSpeak}>
              Dừng
            </button>
          </div>
          <button className="btn-lime mt-6" onClick={() => setStep(2)}>
            Đoán nghĩa
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-4">
          <p className="text-sm text-mute">Gõ những gì em hiểu, tiếng Việt cũng được.</p>
          <textarea className="field mt-3 min-h-28" value={guess} onChange={(e) => setGuess(e.target.value)} />
          <button className="btn-lime mt-4" disabled={!guess.trim()} onClick={() => setStep(3)}>
            Đối chiếu
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="mt-4 space-y-4">
          <div className="panel p-4">
            <p className="text-xs text-mute">Em đoán</p>
            <p className="mt-2">{guess}</p>
          </div>
          <div className="panel p-4">
            <p className="text-xs text-mute">Nghĩa</p>
            <p className="mt-2">{track.vi}</p>
            <p className="mt-4 text-xs text-mute">Tiếng Anh</p>
            <p className="mt-2">{track.en}</p>
            <p className="mt-4 text-xs text-mute">Ngữ pháp</p>
            <p className="mt-2">{track.grammar}</p>
          </div>
          <button className="btn-lime" onClick={() => setStep(4)}>
            Nghe lại + ghi âm
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="mt-4">
          <p className="text-sm text-mute">Nghe phát âm, học thuộc rồi ghi âm lại giọng em.</p>
          <p className="mt-3 text-sm">{track.en}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="btn-ghost" onClick={() => speak(track.en, 0.8)}>
              Nghe lại
            </button>
            <button className="btn-ghost" onClick={() => speak(track.en, 1)}>
              Nhanh hơn
            </button>
          </div>
          <Recorder />
          <button
            className="btn-lime mt-6"
            onClick={() => onDone(saveZangListen(s, track.id))}
          >
            Xong bài nghe hôm nay
          </button>
        </div>
      )}
    </div>
  );
}
