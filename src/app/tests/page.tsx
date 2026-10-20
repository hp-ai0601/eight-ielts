"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { KIND_LABEL, TESTS, TOPICS_ALL, mockTests } from "@/lib/bank";
import { useEight } from "@/lib/useEight";
import { testProgress } from "@/lib/store";
import Studio, { RailPick } from "@/components/Studio";

export default function TestsPage() {
  const { s, ready } = useEight();
  const [topic, setTopic] = useState("mock");
  const mocks = useMemo(() => mockTests(), []);
  if (!ready || !s) return null;
  const prog = testProgress(s);
  const items = topic === "mock" ? mocks : TESTS.filter((t) => t.topicId === topic);
  const meta = TOPICS_ALL.find((t) => t.id === topic);

  return (
    <Studio
      title={topic === "mock" ? "Bài thi thật" : meta?.vi ?? "Đề"}
      kicker={`${prog.done}/${prog.total} đã làm`}
      next={{ href: "/kho", label: "Kho" }}
      rail={
        <>
          <RailPick on={topic === "mock"} onClick={() => setTopic("mock")}>
            <p className="font-serif text-base leading-tight">Mock Academic</p>
            <p className="mt-0.5 text-[11px] text-mute">{mocks.length} đề</p>
          </RailPick>
          {TOPICS_ALL.map((t) => {
            const list = TESTS.filter((x) => x.topicId === t.id);
            const done = list.filter((x) => s.testsDone.includes(x.id)).length;
            return (
              <RailPick key={t.id} on={topic === t.id} done={done === list.length && list.length > 0} onClick={() => setTopic(t.id)}>
                <p className="font-serif text-base leading-tight">{t.vi}</p>
                <p className="mt-0.5 text-[11px] text-mute">
                  {done}/{list.length}
                </p>
              </RailPick>
            );
          })}
        </>
      }
      stage={
        <div className="mx-auto max-w-lg space-y-2">
          {items.map((t) => (
            <Link
              key={t.id}
              href={`/tests/${t.id}`}
              className={`block rounded-xl px-4 py-3 ring-1 ring-line hover:ring-lime ${
                s.testsDone.includes(t.id) ? "text-mute" : ""
              }`}
            >
              <p className={`font-medium ${s.testsDone.includes(t.id) ? "line-through" : ""}`}>{t.title}</p>
              <p className="mt-0.5 text-sm text-mute">
                {KIND_LABEL[t.kind]} · {t.minutes}′
                {t.questions ? ` · ${t.questions.length} câu` : ""}
              </p>
            </Link>
          ))}
          {!items.length && <p className="text-mute">Chưa có đề.</p>}
        </div>
      }
    />
  );
}
