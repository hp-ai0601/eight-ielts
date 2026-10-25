"use client";

import { useEffect, useState } from "react";
import { makeReport, pack } from "@/lib/report";
import type { State } from "@/lib/store";
import { onGrade, type Grade } from "@/lib/live";

export default function GuiThay({ s }: { s: State }) {
  const [copied, setCopied] = useState("");
  const [grade, setGrade] = useState<Grade | null>(null);
  const r = makeReport(s);
  const code = pack(r);
  const last = s.zang.papers[0]?.teacher ?? s.zang.speaks[0]?.teacher;

  useEffect(() => onGrade(setGrade), []);

  function copy() {
    void navigator.clipboard.writeText(code).then(
      () => setCopied("Đã sao chép. Mã này chỉ cần khi kho chung bị lỗi."),
      () => setCopied("Máy không cho sao chép tự động — em bôi đen đoạn mã rồi copy tay nhé."),
    );
  }

  return (
    <div className="panel mt-10 p-4">
      <p className="text-xs uppercase tracking-wider text-lime">Thầy Hiệp</p>
      <p className="mt-2 text-sm text-mute">
        Tiến trình của em được lưu vào kho chung — thầy mở máy khác cũng xem được, không cần em đang mở app.
      </p>
      <p className="mt-3 text-sm">
        Hôm nay xong {r.steps.length}/4 bước · đặt {r.sentences.length} câu · viết {r.papers.length} bài · chuỗi {r.streak} ngày
      </p>
      {(grade || last) && (
        <p className="mt-3 text-sm text-lime">
          Thầy chấm {(grade ?? last)?.band}: {(grade?.note || last?.note) ?? ""}
        </p>
      )}
      <button type="button" className="btn-ghost mt-4" onClick={copy}>
        Sao chép mã dự phòng (dùng khi mất mạng)
      </button>
      {copied && <p className="mt-2 text-sm text-lime">{copied}</p>}
    </div>
  );
}
