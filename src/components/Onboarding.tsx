"use client";

import { useState } from "react";
import { load, save, type State } from "@/lib/store";
import { clampBand } from "@/lib/ielts";

const Qs = [
  {
    id: "q1",
    prompt: "I ______ in Da Nang.",
    options: ["live", "lives", "am live", "living"],
    answer: "live",
    skill: "g" as const,
  },
  {
    id: "q2",
    prompt: "Yesterday I ______ a mock test.",
    options: ["take", "took", "taken", "am taking"],
    answer: "took",
    skill: "g" as const,
  },
  {
    id: "q3",
    prompt: "There is little ______ that longer hours help.",
    options: ["evidences", "an evidence", "evidence", "evidencing"],
    answer: "evidence",
    skill: "v" as const,
  },
  {
    id: "q4",
    prompt: "The tour was at 9, but they changed it to 9.30. What time is it?",
    options: ["9:00", "9:30", "Không rõ", "Bị hủy"],
    answer: "9:30",
    skill: "l" as const,
  },
];

export default function Onboarding({ onDone }: { onDone: (s: State) => void }) {
  const [step, setStep] = useState(0);
  const [minutes, setMinutes] = useState<20 | 40 | 60>(40);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [self, setSelf] = useState(3);

  function finish() {
    const correct = Qs.filter((q) => picks[q.id] === q.answer).length;
    const start = clampBand(3 + correct * 0.5 + (self - 3) * 0.25);
    const stageId = start < 4.5 ? "foundation" : start < 6 ? "builder" : start < 7 ? "fluency" : "exam";
    const s = load();
    s.profile.onboarding = true;
    s.profile.minutes = minutes;
    s.profile.stageId = stageId as State["profile"]["stageId"];
    s.profile.bands = { l: start, r: start, w: Math.max(3, start - 0.5), s: Math.max(3, start - 0.5) };
    save(s);
    onDone(s);
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      {step === 0 && (
        <>
          <p className="text-sm text-lime">Eight</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight">Học lại từ đầu, mục tiêu 8.0.</h1>
          <p className="mt-4 text-mute">
            Mỗi ngày Zang làm bốn bước: học từ rồi đặt câu, đọc cụm truyện, nghe một mẩu hài, rồi viết nhật ký. Đề luyện IELTS nằm trong Kho.
          </p>
          <button className="btn-lime mt-8" onClick={() => setStep(1)}>
            Bắt đầu
          </button>
        </>
      )}

      {step === 1 && (
        <>
          <h1 className="font-serif text-3xl">Bạn dành được bao nhiêu phút mỗi ngày?</h1>
          <p className="mt-2 text-sm text-mute">Học ít mà đều mỗi ngày còn hơn học nhiều rồi bỏ giữa chừng.</p>
          <div className="mt-6 grid gap-2">
            {([20, 40, 60] as const).map((m) => (
              <button
                key={m}
                className={`rounded-xl border px-4 py-3 text-left ${minutes === m ? "border-lime bg-lime/10" : "border-line"}`}
                onClick={() => setMinutes(m)}
              >
                {m} phút
                <span className="ml-2 text-sm text-mute">{m === 20 ? "mức tối thiểu" : m === 40 ? "nên học" : "muốn lên band nhanh"}</span>
              </button>
            ))}
          </div>
          <button className="btn-lime mt-8" onClick={() => setStep(2)}>
            Tiếp
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="font-serif text-3xl">Bốn câu nhỏ thôi, không phải bài thi đâu.</h1>
          <p className="mt-2 text-sm text-mute">Làm thử để app xếp bạn vào đúng mức trong lộ trình.</p>
          <ol className="mt-6 space-y-6">
            {Qs.map((q, i) => (
              <li key={q.id}>
                <p className="font-medium">
                  {i + 1}. {q.prompt}
                </p>
                <div className="mt-2 grid gap-2">
                  {q.options.map((o) => (
                    <button
                      key={o}
                      className={`rounded-xl border px-3 py-2 text-left text-sm ${picks[q.id] === o ? "border-lime" : "border-line hover:border-mute"}`}
                      onClick={() => setPicks((p) => ({ ...p, [q.id]: o }))}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-mute">Bạn tự đánh giá khả năng nói tiếng Anh của mình: 1 là mới bắt đầu, 6 là gần band 6.</p>
          <input
            type="range"
            min={1}
            max={6}
            value={self}
            onChange={(e) => setSelf(Number(e.target.value))}
            className="mt-2 w-full accent-lime"
          />
          <button className="btn-lime mt-8" disabled={Qs.some((q) => !picks[q.id])} onClick={finish}>
            Vào học
          </button>
        </>
      )}
    </div>
  );
}
