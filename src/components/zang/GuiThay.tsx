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
      () => setCopied("Đã copy. Chỉ cần khi live chết."),
      () => setCopied("Copy tay đoạn mã dưới."),
    );
  }

  return (
    <div className="panel mt-10 p-4">
      <p className="text-xs uppercase tracking-wider text-lime">Thầy Hiệp</p>
      <p className="mt-2 text-sm text-mute">
        Máy Zang gửi live. Thầy mở mục Zang trên máy khác là thấy bài, chấm writing/speaking 4 ô. Không cần ngồi cùng máy.
      </p>
      <p className="mt-3 text-sm">
        Hôm nay {r.steps.length}/4 bước · {r.sentences.length} câu · {r.papers.length} bài viết · streak {r.streak}
      </p>
      {(grade || last) && (
        <p className="mt-3 text-sm text-lime">
          Thầy chấm {(grade ?? last)?.band}: {(grade?.note || last?.note) ?? ""}
        </p>
      )}
      <button type="button" className="btn-ghost mt-4" onClick={copy}>
        Copy mã dự phòng
      </button>
      {copied && <p className="mt-2 text-sm text-lime">{copied}</p>}
    </div>
  );
}
