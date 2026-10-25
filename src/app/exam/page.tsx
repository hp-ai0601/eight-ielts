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
            <p className="font-serif text-lg leading-tight">Khi nào thi thử</p>
          </RailPick>
        </>
      }
      stage={
        <div className="mx-auto max-w-lg">
          {pane === "lich" && (
            <div>
              <BandMeter bands={s.profile.bands} />
              <p className="mt-5 text-sm leading-7 text-mute">
                Ba bài thi trong cùng một ngày: Listening {EXAM.listening.minutes} phút → Reading {EXAM.reading.minutes}{" "}
                phút → Writing {EXAM.writing.minutes} phút, không có giờ nghỉ giữa các bài. Speaking {EXAM.speaking.minutes}{" "}
                phút có thể thi vào ngày khác.
              </p>
            </div>
          )}
          {pane === "doi" && (
            <div>
              <label className="block text-sm">Listening đúng bao nhiêu câu / 40</label>
              <input className="field mt-1" type="number" min={0} max={40} value={l} onChange={(e) => setL(Number(e.target.value))} />
              <p className="mt-2 text-lime">≈ band {answersToBand(l)}</p>
              <label className="mt-4 block text-sm">Reading đúng bao nhiêu câu / 40</label>
              <input className="field mt-1" type="number" min={0} max={40} value={r} onChange={(e) => setR(Number(e.target.value))} />
              <p className="mt-2 text-lime">≈ band {answersToBand(r)}</p>
              <p className="mt-4 text-xs text-mute">Muốn đạt band 8 ở Listening/Reading thường cần đúng khoảng 35–36/40 câu.</p>
            </div>
          )}
          {pane === "mock" && (
            <div className="text-sm leading-7 text-mute">
              <p className="text-text">Chỉ nên thi thử khi đã xong tầng Trôi chảy.</p>
              <p className="mt-3">
                Làm một đề mất 2 tiếng 45 phút, cộng thêm thời gian chấm writing. Xem lại lỗi sai phải kỹ hơn cả lúc làm
                bài. Đừng dồn làm nhiều đề khi ngữ pháp còn yếu.
              </p>
              <p className="mt-4">
                Các bài có bấm giờ sẵn:{" "}
                <Link className="text-lime" href="/lesson/x-listen-lecture">
                  nghe phần 4
                </Link>
                ,{" "}
                <Link className="text-lime" href="/lesson/x-read-long">
                  đọc đoạn dài
                </Link>
                ,{" "}
                <Link className="text-lime" href="/lesson/x-speak-timed">
                  nói 2 phút
                </Link>
                ,{" "}
                <Link className="text-lime" href="/lesson/x-write-timed">
                  viết 40 phút
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
