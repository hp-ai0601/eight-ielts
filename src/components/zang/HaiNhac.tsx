"use client";

import { useMemo, useState } from "react";
import { TRACKS, dayNum, pickMany } from "@/lib/zang/content";
import { bumpZangLot, saveZangListen, zangLot, type State } from "@/lib/store";
import Recorder from "./Recorder";
import PlayBar from "@/components/PlayBar";
import LotNote from "./LotNote";
import ExampleLine from "@/components/ExampleLine";

const STEPS = ["Nghĩa trước", "Nghe không chữ", "Đoán", "Ghép lại", "Phát âm + ghi âm"] as const;

export default function HaiNhac({ s, onDone }: { s: State; onDone: (next: State) => void }) {
  const n = dayNum();
  const lot = zangLot(s, "hai");
  const hai = useMemo(() => pickMany(TRACKS.filter((t) => t.kind === "hai"), n + lot * 7, 4), [n, lot]);
  const nhac = useMemo(() => pickMany(TRACKS.filter((t) => t.kind === "nhac"), n + lot * 5, 3), [n, lot]);
  const [kind, setKind] = useState<"hai" | "nhac">("hai");
  const [ti, setTi] = useState(0);
  const [step, setStep] = useState(0);
  const [guess, setGuess] = useState("");
  const list = kind === "hai" ? hai : nhac;
  const track = list[ti] ?? list[0];
  const done = new Set(s.zang.listenDone);

  function pickTrack(idx: number) {
    setTi(idx);
    setStep(0);
    setGuess("");
  }

  function switchKind(next: "hai" | "nhac") {
    setKind(next);
    pickTrack(0);
  }

  if (!track) return null;

  return (
    <div className="pb-28">
      <div className="flex flex-wrap gap-2">
        <button className={kind === "hai" ? "btn-lime" : "btn-ghost"} onClick={() => switchKind("hai")}>
          Truyện hài
        </button>
        <button className={kind === "nhac" ? "btn-lime" : "btn-ghost"} onClick={() => switchKind("nhac")}>
          Nhạc / lời
        </button>
      </div>
      <div className="mt-4">
        <LotNote
          lot={lot}
          count={list.length}
          unit={kind === "hai" ? "mẩu hài" : "bài nhạc"}
          onBump={() => {
            onDone(bumpZangLot(s, "hai"));
            pickTrack(0);
          }}
        />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {list.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            className={`rounded-2xl border px-3 py-3 text-left ${idx === ti ? "border-lime bg-lime/10" : "border-line"}`}
            onClick={() => pickTrack(idx)}
          >
            <p className="font-serif text-lg">{t.title}</p>
            <p className="mt-1 line-clamp-2 text-xs text-mute">{t.vi}</p>
            {done.has(t.id) ? <p className="mt-2 text-xs text-lime">đã cất</p> : null}
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs uppercase tracking-wider text-lime">
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
          <p className="text-sm text-mute">Không phụ đề. Phát ở thanh dưới, Dừng khi cần, đoán trong đầu.</p>
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
            <p className="text-xs text-mute">Nghĩa + tiếng Anh + ngữ pháp</p>
            <ExampleLine en={track.en} vi={track.vi} grammar={track.grammar} />
          </div>
          <button className="btn-lime" onClick={() => setStep(4)}>
            Nghe lại + ghi âm
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="mt-4">
          <p className="text-sm text-mute">Nghe phát âm, học thuộc rồi ghi âm lại giọng em.</p>
          <ExampleLine en={track.en} vi={track.vi} grammar={track.grammar} />
          <Recorder />
          <button
            className="btn-lime mt-6"
            onClick={() => {
              onDone(saveZangListen(s, track.id));
              setStep(0);
              setGuess("");
            }}
          >
            Cất bài này
          </button>
        </div>
      )}
      <PlayBar key={track.id} minutes={8} audio={step >= 1 ? track.en : undefined} rate={step === 4 ? 0.8 : 0.86} />
    </div>
  );
}
