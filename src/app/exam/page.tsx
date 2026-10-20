"use client";

import { useState } from "react";
import Link from "next/link";
import { EXAM, answersToBand } from "@/lib/ielts";
import BandMeter from "@/components/BandMeter";
import { useEight } from "@/lib/useEight";
import Studio, { RailPick } from "@/components/Studio";

export default function ExamPage() {
  const { s, ready } = useEight();
  const [pane, setPane] = useState<"lich" | "doi" | "mock">("lich");
  const [l, setL] = useState(30);
  const [r, setR] = useState(28);
  if (!ready || !s) return null;

  return (
    <Studio
      title="Thi"
      kicker="Academic"
      next={{ href: "/kho", label: "Kho" }}
      rail={
        <>
          <RailPick on={pane === "lich"} onClick={() => setPane("lich")}>
            <p className="font-serif text-lg leading-tight">Lịch thi</p>
          </RailPick>
          <RailPick on={pane === "doi"} onClick={() => setPane("doi")}>
            <p className="font-serif text-lg leading-tight">Đổi điểm</p>
          </RailPick>
          <RailPick on={pane === "mock"} onClick={() => setPane("mock")}>
            <p className="font-serif text-lg leading-tight">Khi nào mock</p>
          </RailPick>
        </>
      }
      stage={
        <div className="mx-auto max-w-lg">
          {pane === "lich" && (
            <div>
              <BandMeter bands={s.profile.bands} />
              <p className="mt-5 text-sm leading-7 text-mute">
                Cùng ngày: Listening {EXAM.listening.minutes}′ → Reading {EXAM.reading.minutes}′ → Writing {EXAM.writing.minutes}′.
                Speaking {EXAM.speaking.minutes}′ có thể khác ngày. Không nghỉ giữa 3 bài viết.
              </p>
            </div>
          )}
          {pane === "doi" && (
            <div>
              <label className="block text-sm">Listening đúng / 40</label>
              <input className="field mt-1" type="number" min={0} max={40} value={l} onChange={(e) => setL(Number(e.target.value))} />
              <p className="mt-2 text-lime">≈ {answersToBand(l)}</p>
              <label className="mt-4 block text-sm">Reading đúng / 40</label>
              <input className="field mt-1" type="number" min={0} max={40} value={r} onChange={(e) => setR(Number(e.target.value))} />
              <p className="mt-2 text-lime">≈ {answersToBand(r)}</p>
              <p className="mt-4 text-xs text-mute">Band 8 Listening/Reading thường ~35–36/40.</p>
            </div>
          )}
          {pane === "mock" && (
            <div className="text-sm leading-7 text-mute">
              <p className="text-text">Chỉ khi xong tầng Trôi.</p>
              <p className="mt-3">Một đề = 2h45 + chấm writing. Review lỗi lâu hơn lúc làm. Đừng nhồi đề khi grammar còn vỡ.</p>
              <p className="mt-4">
                Có đồng hồ sẵn:{" "}
                <Link className="text-lime" href="/lesson/x-listen-lecture">
                  nghe P4
                </Link>
                ,{" "}
                <Link className="text-lime" href="/lesson/x-read-long">
                  đọc
                </Link>
                ,{" "}
                <Link className="text-lime" href="/lesson/x-speak-timed">
                  nói 2′
                </Link>
                ,{" "}
                <Link className="text-lime" href="/lesson/x-write-timed">
                  viết 40′
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      }
    />
  );
}
