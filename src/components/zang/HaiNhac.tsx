"use client";

import { useMemo, useState } from "react";
import { HAI_SETS, NHAC_SETS, dayNum, pickSet, tracksOf } from "@/lib/zang/content";
import { bumpZangLot, saveZangListen, zangLot, type State } from "@/lib/store";
import Recorder from "./Recorder";
import PlayBar from "@/components/PlayBar";
import Hear from "@/components/Hear";
import ExampleLine from "@/components/ExampleLine";

const STEPS = ["Nghĩa trước", "Nghe không chữ", "Đoán", "Ghép lại", "Phát âm + ghi âm"] as const;

export default function HaiNhac({ s, onDone }: { s: State; onDone: (next: State) => void }) {
  const n = dayNum();
  const lot = zangLot(s, "hai");
  const show = useMemo(() => pickSet(HAI_SETS, n, lot), [n, lot]);
  const album = useMemo(() => pickSet(NHAC_SETS, n, lot), [n, lot]);
  const [kind, setKind] = useState<"hai" | "nhac">("hai");
  const [ti, setTi] = useState(0);
  const [step, setStep] = useState(0);
  const [guess, setGuess] = useState("");
  const pack = kind === "hai" ? show : album;
  const list = useMemo(() => tracksOf(pack.tracks), [pack]);
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
          Tập hài
        </button>
        <button className={kind === "nhac" ? "btn-lime" : "btn-ghost"} onClick={() => switchKind("nhac")}>
          Tập nhạc
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wider text-lime">
            {kind === "hai" ? "Kịch bản hài" : "Kịch bản nhạc"} · đợt {lot + 1} hôm nay · {list.length} mẩu
          </p>
          <h2 className="mt-1 font-serif text-2xl">{pack.title}</h2>
          <p className="mt-1 text-sm text-mute">{pack.blurb}</p>
        </div>
        <button
          type="button"
          className="btn-ghost text-xs"
          onClick={() => {
            onDone(bumpZangLot(s, "hai"));
            pickTrack(0);
          }}
        >
          Đổi tập khác
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {list.map((t, idx) => {
          const on = idx === ti;
          return (
            <div key={t.id} className={`rounded-2xl border p-3 ${on ? "border-lime bg-lime/10" : "border-line"}`}>
              <div className="flex items-start gap-3">
                <button type="button" className="min-w-0 flex-1 text-left" onClick={() => pickTrack(idx)}>
                  <p className="text-xs text-lime">
                    Mẩu {idx + 1}/{list.length}
                    {done.has(t.id) ? " · đã cất" : ""}
                  </p>
                  <p className="mt-1 font-serif text-lg">{t.title}</p>
                  {!on && <p className="mt-1 line-clamp-2 text-xs text-mute">{t.vi}</p>}
                </button>
                {step >= 1 && on ? <Hear text={t.en} rate={0.86} label="Nghe" /> : null}
              </div>

              {on && (
                <div className="mt-4 border-t border-line pt-4">
                  <p className="text-xs uppercase tracking-wider text-lime">
                    Bước {step + 1}/5 · {STEPS[step]}
                  </p>

                  {step === 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-mute">Xem nghĩa tiếng Việt trước. Chưa nghe.</p>
                      <p className="mt-3 leading-8">{t.vi}</p>
                      <button className="btn-lime mt-4" onClick={() => setStep(1)}>
                        Đã đọc nghĩa → nghe không chữ
                      </button>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="mt-3">
                      <p className="text-sm text-mute">Không phụ đề. Bấm Nghe trên thẻ, Dừng ở thanh dưới khi cần.</p>
                      <button className="btn-lime mt-4" onClick={() => setStep(2)}>
                        Đoán nghĩa
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="mt-3">
                      <p className="text-sm text-mute">Gõ những gì em hiểu, tiếng Việt cũng được.</p>
                      <textarea className="field mt-3 min-h-24" value={guess} onChange={(e) => setGuess(e.target.value)} />
                      <button className="btn-lime mt-3" disabled={!guess.trim()} onClick={() => setStep(3)}>
                        Đối chiếu
                      </button>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="mt-3 space-y-3">
                      <div className="panel p-4">
                        <p className="text-xs text-mute">Em đoán</p>
                        <p className="mt-2">{guess}</p>
                      </div>
                      <div className="panel p-4">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs text-mute">Nghĩa + tiếng Anh + ngữ pháp</p>
                          <Hear text={t.en} rate={0.86} label="Nghe lại" />
                        </div>
                        <ExampleLine en={t.en} vi={t.vi} grammar={t.grammar} />
                      </div>
                      <button className="btn-lime" onClick={() => setStep(4)}>
                        Nghe lại + ghi âm
                      </button>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="mt-3">
                      <p className="text-sm text-mute">Học thuộc rồi ghi âm giọng em.</p>
                      <div className="mt-2 flex justify-end">
                        <Hear text={t.en} rate={0.8} label="Nghe chậm" />
                      </div>
                      <ExampleLine en={t.en} vi={t.vi} grammar={t.grammar} />
                      <Recorder />
                      <button
                        className="btn-lime mt-4"
                        onClick={() => {
                          onDone(saveZangListen(s, t.id));
                          setStep(0);
                          setGuess("");
                        }}
                      >
                        Cất mẩu này
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <PlayBar key={track.id} minutes={8} audio={step >= 1 ? track.en : undefined} rate={step === 4 ? 0.8 : 0.86} />
    </div>
  );
}
