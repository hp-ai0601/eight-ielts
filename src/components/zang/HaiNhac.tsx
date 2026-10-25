"use client";

import { useMemo, useState } from "react";
import { HAI_SETS, NHAC_SETS, dayNum, pickSet, tracksOf } from "@/lib/zang/content";
import { bumpZangLot, saveZangListen, zangLot, type State } from "@/lib/store";
import Recorder from "./Recorder";
import Hear from "@/components/Hear";
import ExampleLine from "@/components/ExampleLine";
import StoryVocab from "@/components/StoryVocab";
import PronCheck from "@/components/PronCheck";
import { glossInline } from "@/lib/gloss";
import Studio, { Pills, RailPick } from "@/components/Studio";

const STEPS = ["Nghĩa", "Nghe", "Đoán", "Ghép", "Ghi âm"] as const;

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

  if (!track) return null;

  return (
    <Studio
      step={3}
      title={pack.title}
      kicker={`Đợt ${lot + 1} · ${list.length} mẩu`}
      swap="Đổi tập khác"
      onSwap={() => {
        onDone(bumpZangLot(s, "hai"));
        pickTrack(0);
      }}
      next={{ href: "/nhat-ky", label: "Nhật ký" }}
      tabs={
        <Pills
          value={kind}
          onChange={(id) => {
            setKind(id as "hai" | "nhac");
            pickTrack(0);
          }}
          items={[
            { id: "hai", label: "Hài" },
            { id: "nhac", label: "Nhạc" },
          ]}
        />
      }
      rail={list.map((t, idx) => (
        <RailPick key={t.id} on={idx === ti} done={done.has(t.id)} onClick={() => pickTrack(idx)}>
          <p className="text-[11px] text-lime">Mẩu {idx + 1}</p>
          <p className="mt-0.5 font-serif text-lg leading-tight">{t.title}</p>
        </RailPick>
      ))}
      stage={
        <div className="mx-auto max-w-lg">
          <p className="font-serif text-3xl">{track.title}</p>
          <div className="mt-4">
            <Pills
              value={String(step)}
              onChange={(id) => setStep(Number(id))}
              items={STEPS.map((label, idx) => ({ id: String(idx), label }))}
            />
          </div>
          <div className="mt-5">
            {step === 0 && (
              <div>
                <p className="text-sm text-mute">Bước đầu chỉ đọc nghĩa thôi, chưa nghe vội.</p>
                <p className="mt-4 leading-8">{track.vi}</p>
                <div className="mt-4">
                  <StoryVocab en={track.en} />
                </div>
                <button className="btn-lime mt-6" onClick={() => setStep(1)}>
                  Nghe không chữ →
                </button>
              </div>
            )}
            {step === 1 && (
              <div>
                <p className="text-sm text-mute">Bây giờ nghe không nhìn chữ — cứ đoán trong đầu xem họ nói gì.</p>
                <div className="mt-4">
                  <Hear text={track.en} rate={0.86} label="Nghe" />
                </div>
                <button className="btn-lime mt-6" onClick={() => setStep(2)}>
                  Đoán →
                </button>
              </div>
            )}
            {step === 2 && (
              <div>
                <p className="text-sm text-mute">Gõ lại những gì em hiểu — viết tiếng Việt cũng được.</p>
                <textarea className="field mt-3 min-h-28" value={guess} onChange={(e) => setGuess(e.target.value)} />
                <button className="btn-lime mt-3" disabled={!guess.trim()} onClick={() => setStep(3)}>
                  Đối chiếu →
                </button>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-mute">Em đoán</p>
                  <p className="mt-1">{guess}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-lime">Nghĩa + ngữ pháp</p>
                  <Hear text={track.en} rate={0.86} />
                </div>
                <ExampleLine en={track.en} vi={track.vi} grammar={track.grammar} />
                <div className="rounded-xl border border-line p-3">
                  <p className="text-[11px] uppercase tracking-wider text-mute">Đọc lại câu — nghĩa ghi trong ngoặc</p>
                  <p className="mt-1.5 text-sm leading-7">{glossInline(track.en)}</p>
                </div>
                <StoryVocab en={track.en} />
                <button className="btn-lime" onClick={() => setStep(4)}>
                  Ghi âm →
                </button>
              </div>
            )}
            {step === 4 && (
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-mute">Đọc cho thuộc rồi ghi âm lại giọng mình.</p>
                  <Hear text={track.en} rate={0.8} label="Chậm" />
                </div>
                <ExampleLine en={track.en} vi={track.vi} grammar={track.grammar} />
                <div className="mt-3">
                  <PronCheck text={track.en} />
                </div>
                <Recorder />
                <button
                  className="btn-lime mt-4"
                  onClick={() => {
                    onDone(saveZangListen(s, track.id));
                    setStep(0);
                    setGuess("");
                  }}
                >
                  Hoàn thành mẩu này
                </button>
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}
