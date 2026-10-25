"use client";

import { useMemo, useState } from "react";
import Studio, { RailPick } from "@/components/Studio";
import Hear from "@/components/Hear";
import ExampleLine from "@/components/ExampleLine";
import { IDIOMS, IDIOM_TOPICS, idiomSearch } from "@/lib/method/idioms";

export default function IdiomsPage() {
  const [topic, setTopic] = useState(IDIOM_TOPICS[0].id as string);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const list = useMemo(() => {
    if (q.trim()) return idiomSearch(q);
    return IDIOMS.filter((x) => x.topic === topic);
  }, [q, topic]);
  const item = list[Math.min(i, Math.max(list.length - 1, 0))];

  return (
    <Studio
      title="Thành ngữ & châm ngôn"
      kicker={`${IDIOMS.length} câu · dịch sát nghĩa, kèm ví dụ`}
      next={{ href: "/kho", label: "Kho" }}
      rail={IDIOM_TOPICS.map((t) => (
        <RailPick
          key={t.id}
          on={!q && t.id === topic}
          onClick={() => {
            setTopic(t.id);
            setQ("");
            setI(0);
          }}
        >
          <p className="font-serif text-base leading-tight">{t.vi}</p>
          <p className="mt-0.5 text-[11px] text-mute">{IDIOMS.filter((x) => x.topic === t.id).length} câu</p>
        </RailPick>
      ))}
      stage={
        <div className="mx-auto max-w-lg">
          <input
            className="field"
            placeholder="Tìm: time, vàng, bạn bè…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setI(0);
            }}
          />
          {item ? (
            <div className="panel mt-5 p-6">
              <p className="text-[11px] uppercase tracking-wider text-lime">
                {IDIOM_TOPICS.find((t) => t.id === item.topic)?.vi} · {list.indexOf(item) + 1}/{list.length}
              </p>
              <div className="mt-3 flex items-start justify-between gap-3">
                <p className="font-serif text-2xl leading-snug">{item.en}</p>
                <Hear text={item.en} />
              </div>
              <p className="mt-3 text-lg text-lime">{item.vi}</p>
              <p className="mt-2 text-sm text-mute">{item.note}</p>
              <div className="mt-4 border-t border-line pt-4">
                <ExampleLine en={item.ex} />
                <div className="mt-1">
                  <Hear text={item.ex} label="Nghe ví dụ" rate={0.88} />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <button className="btn-ghost" disabled={list.indexOf(item) <= 0} onClick={() => setI(list.indexOf(item) - 1)}>
                  Trước
                </button>
                <button
                  className="btn-ghost"
                  disabled={list.indexOf(item) >= list.length - 1}
                  onClick={() => setI(list.indexOf(item) + 1)}
                >
                  Sau
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-mute">Không tìm thấy câu nào khớp.</p>
          )}
        </div>
      }
    />
  );
}
