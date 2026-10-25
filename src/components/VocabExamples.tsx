"use client";

import { examplesOf } from "@/lib/vocabExamples";
import Hear from "@/components/Hear";

/** 3 ví dụ 3 ngữ cảnh (lớp học · nhà · bạn bè) kèm dịch Việt + nút nghe cả câu. */
export default function VocabExamples({ word, fallback }: { word: string; fallback?: string }) {
  const ex = examplesOf(word);
  if (!ex) {
    return fallback ? (
      <p className="text-xs text-mute">
        Một từ này có ví dụ gốc ở trên; tra thêm ví dụ ở mục Từ điển (nguồn mở) hoặc đặt câu với thầy.
      </p>
    ) : null;
  }
  return (
    <div className="mt-3 space-y-2.5">
      <p className="text-[11px] uppercase tracking-wider text-mute">3 ví dụ · 3 ngữ cảnh</p>
      {ex.map((x, i) => (
        <div key={i} className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm leading-6">
              <span className="mr-2 rounded-full border border-line px-1.5 py-0.5 text-[10px] text-mute">{x.ctx}</span>
              {x.en}
            </p>
            <p className="ml-0.5 text-xs text-mute">{x.vi}</p>
          </div>
          <Hear text={x.en} rate={0.88} />
        </div>
      ))}
    </div>
  );
}
