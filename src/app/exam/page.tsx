"use client";

import { EXAM, answersToBand } from "@/lib/ielts";
import BandMeter from "@/components/BandMeter";
import { useEight } from "@/lib/useEight";
import { useState } from "react";

export default function ExamPage() {
  const { s, ready } = useEight();
  const [l, setL] = useState(30);
  const [r, setR] = useState(28);
  if (!ready || !s) return null;
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 lg:px-10">
      <h1 className="font-serif text-4xl">Thi</h1>
      <p className="mt-3 text-mute">
        Academic, cùng ngày: Listening {EXAM.listening.minutes}′ → Reading {EXAM.reading.minutes}′ → Writing {EXAM.writing.minutes}′. Speaking {EXAM.speaking.minutes}′ có thể khác ngày. Không nghỉ giữa 3 bài viết.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <BandMeter bands={s.profile.bands} />
        <div className="panel p-5">
          <p className="text-xs uppercase tracking-wider text-mute">Đổi raw score → band</p>
          <label className="mt-4 block text-sm">Listening đúng / 40</label>
          <input className="field mt-1" type="number" min={0} max={40} value={l} onChange={(e) => setL(Number(e.target.value))} />
          <p className="mt-2 text-lime">≈ {answersToBand(l)}</p>
          <label className="mt-4 block text-sm">Reading đúng / 40</label>
          <input className="field mt-1" type="number" min={0} max={40} value={r} onChange={(e) => setR(Number(e.target.value))} />
          <p className="mt-2 text-lime">≈ {answersToBand(r)}</p>
          <p className="mt-4 text-xs text-mute">Band 8 Listening/Reading thường ~35–36/40. Quy đổi xấp xỉ, đề thật có thể lệch nửa band.</p>
        </div>
      </div>
      <div className="panel mt-6 p-5 text-sm leading-7 text-mute">
        <p className="text-text">Khi nào mock full</p>
        Chỉ khi xong tầng Trôi. Một đề Cambridge = 2h45 + chấm writing. Review lỗi lâu hơn lúc làm bài. Đừng nhồi đề khi grammar còn vỡ.
        <p className="mt-3">
          Bài có đồng hồ sẵn trong lộ trình:{" "}
          <a className="text-lime" href="/lesson/x-listen-lecture">
            nghe P4
          </a>
          ,{" "}
          <a className="text-lime" href="/lesson/x-read-long">
            đọc Academic
          </a>
          ,{" "}
          <a className="text-lime" href="/lesson/x-speak-timed">
            nói 2 phút
          </a>
          ,{" "}
          <a className="text-lime" href="/lesson/x-write-timed">
            viết 40′
          </a>
          .
        </p>
      </div>
    </div>
  );
}
