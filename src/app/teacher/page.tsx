"use client";

import { useEffect, useState } from "react";
import { useEight } from "@/lib/useEight";
import { overallBand, testProgress, type State } from "@/lib/store";
import { STAGES } from "@/lib/content";

export default function TeacherPage() {
  const { s, ready } = useEight();
  const [remote, setRemote] = useState<State | null>(null);

  useEffect(() => {
    fetch("/api/progress?user=zang")
      .then((r) => r.json())
      .then((d) => {
        if (d.state?.state) setRemote(d.state.state as State);
        else if (d.state) setRemote(d.state as State);
      })
      .catch(() => undefined);
  }, []);

  if (!ready || !s) return null;
  if (s.profile.userId && s.profile.userId !== "hiep") {
    return <p className="p-10 text-mute">Trang này cho thầy Hiệp. Zang vào Hôm nay.</p>;
  }

  const z = remote;
  return (
    <div className="mx-auto max-w-2xl px-5 py-10 lg:px-10">
      <h1 className="font-serif text-4xl">Zang Bếu</h1>
      <p className="mt-3 text-mute">Tiến độ học trò. Máy thầy đọc được nếu Zang đã nộp lên server (chạy local hoặc có file data).</p>
      {!z && <p className="mt-8 text-mute">Chưa có dữ liệu server. Zang học trên máy Zang — tiến độ nằm ở trình duyệt của em.</p>}
      {z && (
        <div className="panel mt-8 space-y-2 p-5">
          <p>Overall {overallBand(z).toFixed(1)}</p>
          <p>Tầng {STAGES.find((x) => x.id === z.profile.stageId)?.title}</p>
          <p>
            Bài lộ trình {z.profile.completed.length} · đề {testProgress(z).done}/{testProgress(z).total}
          </p>
          <p>
            BTVN xong {z.homework.filter((h) => h.done).length}/{z.homework.length}
          </p>
          <p>Streak {z.profile.streak.count} ngày</p>
          {z.zang && (
            <p>
              Cách Zang: {z.zang.sentences.length} câu · {z.zang.mimics.length} cụm · {z.zang.listenDone.length} bài nghe ·{" "}
              {z.zang.diaries.length} nhật ký
            </p>
          )}
        </div>
      )}
    </div>
  );
}
