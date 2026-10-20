"use client";

import { useState } from "react";
import Link from "next/link";
import { useEight } from "@/lib/useEight";
import Studio, { RailPick } from "@/components/Studio";

export default function HomeworkPage() {
  const { s, ready } = useEight();
  const [tab, setTab] = useState<"open" | "done">("open");
  if (!ready || !s) return null;
  const open = s.homework.filter((h) => !h.done);
  const done = s.homework.filter((h) => h.done);
  const list = tab === "open" ? open : done;

  return (
    <Studio
      title="BTVN"
      kicker={`${open.length} đang mở`}
      next={{ href: "/kho", label: "Kho" }}
      rail={
        <>
          <RailPick on={tab === "open"} onClick={() => setTab("open")}>
            <p className="font-serif text-lg leading-tight">Đang mở</p>
            <p className="mt-0.5 text-xs text-mute">{open.length} bài</p>
          </RailPick>
          <RailPick on={tab === "done"} onClick={() => setTab("done")}>
            <p className="font-serif text-lg leading-tight">Đã nộp</p>
            <p className="mt-0.5 text-xs text-mute">{done.length} bài</p>
          </RailPick>
        </>
      }
      stage={
        <div className="mx-auto max-w-lg space-y-2">
          {list.map((h) => (
            <Link key={h.id} href={`/tests/${h.testId}`} className="block rounded-xl px-4 py-3 ring-1 ring-line hover:ring-lime">
              <p className={`font-medium ${tab === "done" ? "text-mute line-through" : ""}`}>{h.title}</p>
              {tab === "open" && <p className="mt-0.5 text-sm text-mute">Hạn {h.due}</p>}
            </Link>
          ))}
          {!list.length && (
            <p className="text-mute">{tab === "open" ? "Không còn bài mở. Làm thêm ở Ngân hàng đề." : "Chưa nộp bài nào."}</p>
          )}
        </div>
      }
    />
  );
}
