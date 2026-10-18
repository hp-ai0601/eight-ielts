"use client";

import { useState } from "react";
import { makeReport, pack } from "@/lib/report";
import type { State } from "@/lib/store";

export default function GuiThay({ s }: { s: State }) {
  const [copied, setCopied] = useState("");
  const r = makeReport(s);
  const code = pack(r);

  function copy() {
    void navigator.clipboard.writeText(code).then(
      () => setCopied("Đã copy mã. Thầy Hiệp dán vào trang Zang."),
      () => setCopied("Copy tay đoạn mã dưới."),
    );
  }

  return (
    <div className="panel mt-10 p-4">
      <p className="text-xs uppercase tracking-wider text-lime">Gửi thầy Hiệp</p>
      <p className="mt-2 text-sm text-mute">
        Chưa có database. Bài của Zang nằm ở máy Zang. Cùng một điện thoại/máy tính thì thầy đăng nhập là thấy. Máy khác:
        copy mã này, thầy dán.
      </p>
      <p className="mt-3 text-sm">
        Hôm nay {r.steps.length}/4 bước · {r.sentences.length} câu sạch · {r.drafts.filter((d) => d.score < 10).length} lần còn đỏ · streak {r.streak}
      </p>
      <button type="button" className="btn-lime mt-4" onClick={copy}>
        Copy mã gửi thầy
      </button>
      {copied && <p className="mt-2 text-sm text-lime">{copied}</p>}
    </div>
  );
}
