"use client";

import { useEffect, useState } from "react";
import Studio, { RailPick } from "@/components/Studio";
import { useEight } from "@/lib/useEight";
import { liveGrade, onLive } from "@/lib/live";
import { readInbox, readZangState, unpack, type Report } from "@/lib/report";
import { clampBand } from "@/lib/ielts";

function fromLocal(): Report | null {
  const z = readZangState();
  const inbox = readInbox();
  return inbox ?? (z
    ? {
        v: 2 as const,
        at: Date.now(),
        day: z.profile.day,
        streak: z.profile.streak.count,
        minutes: z.profile.minutesToday,
        steps: z.zang.steps[z.profile.day] ?? [],
        stage: z.profile.stageId,
        bands: z.profile.bands,
        completed: z.profile.completed.length,
        sentences: z.zang.sentences.slice(0, 16),
        drafts: z.zang.drafts ?? [],
        spells: (z.zang.spells ?? []).slice(0, 16),
        mimics: z.zang.mimics.slice(0, 8),
        diaries: z.zang.diaries.slice(0, 6),
        papers: z.zang.papers ?? [],
        speaks: z.zang.speaks ?? [],
        tests: z.attempts.slice(0, 8).map(({ testId, ok, total, at }) => ({ testId, ok, total, at })),
      }
    : null);
}

function Band({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <label className="block text-sm">
      {label} · {value}
      <input className="mt-1 w-full" type="range" min={4} max={9} step={0.5} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

export default function TeacherPage() {
  const { s, ready } = useEight();
  const [report, setReport] = useState<Report | null>(null);
  const [pane, setPane] = useState<"live" | "write" | "speak" | "key">("live");
  const [paste, setPaste] = useState("");
  const [hint, setHint] = useState("");
  const [ta, setTa] = useState(6);
  const [cc, setCc] = useState(6);
  const [lr, setLr] = useState(6);
  const [gra, setGra] = useState(6);
  const [fc, setFc] = useState(6);
  const [pron, setPron] = useState(6);
  const [note, setNote] = useState("");

  useEffect(() => {
    setReport(fromLocal());
    return onLive((r) => {
      setReport(r);
    });
  }, []);

  if (!ready || !s) return null;
  if (s.profile.userId && s.profile.userId !== "hiep") {
    return <p className="p-10 text-mute">Trang này cho thầy Hiệp. Zang vào Hôm nay.</p>;
  }

  const paper = report?.papers[0];
  const speak = report?.speaks[0];
  const wBand = clampBand((ta + cc + lr + gra) / 4);
  const sBand = clampBand((fc + lr + gra + pron) / 4);

  return (
    <Studio
      title="Zang Bếu"
      kicker={report ? "kho chung" : "chưa có dữ liệu"}
      rail={
        <>
          <RailPick on={pane === "live"} onClick={() => setPane("live")}>
            <p className="font-serif text-lg leading-tight">Hôm nay</p>
            <p className="mt-0.5 text-[11px] text-mute">{report ? `${report.steps.length}/4 bước` : "—"}</p>
          </RailPick>
          <RailPick on={pane === "write"} onClick={() => setPane("write")}>
            <p className="font-serif text-lg leading-tight">Chấm writing</p>
            <p className="mt-0.5 text-[11px] text-mute">{report?.papers.length ?? 0} bài</p>
          </RailPick>
          <RailPick on={pane === "speak"} onClick={() => setPane("speak")}>
            <p className="font-serif text-lg leading-tight">Chấm speaking</p>
            <p className="mt-0.5 text-[11px] text-mute">{report?.speaks.length ?? 0} lần</p>
          </RailPick>
          <RailPick on={pane === "key"} onClick={() => setPane("key")}>
            <p className="font-serif text-lg leading-tight">L/R đáp án</p>
            <p className="mt-0.5 text-[11px] text-mute">{report?.tests.length ?? 0} đề</p>
          </RailPick>
        </>
      }
      stage={
        <div className="mx-auto max-w-lg pb-10">
          {pane === "live" && (
            <>
              <p className="text-sm text-mute">
                Kho chung: Zang học máy nào thì thầy mở máy khác vẫn thấy tiến trình, kể cả khi Zang đã tắt máy.
              </p>
              <textarea className="field mt-4 min-h-20" value={paste} onChange={(e) => setPaste(e.target.value)} placeholder="Dán mã dự phòng nếu kho chung lỗi…" />
              <button
                type="button"
                className="btn-ghost mt-2"
                disabled={!paste.trim()}
                onClick={() => {
                  const r = unpack(paste.trim());
                  if (!r) setHint("Mã không đọc được.");
                  else {
                    setReport(r);
                    setHint("Đã nhận mã.");
                  }
                }}
              >
                Nhận mã
              </button>
              {hint && <p className="mt-2 text-sm text-lime">{hint}</p>}
              {report && (
                <div className="panel mt-6 space-y-2 p-5 text-sm">
                  <p>
                    {report.day} · {report.steps.length}/4 bước · {report.minutes}′ · streak {report.streak}
                  </p>
                  <p>
                    Giai đoạn {report.stage ?? "—"} · xong {report.completed ?? 0} bài · L {report.bands?.l ?? "—"} · R{" "}
                    {report.bands?.r ?? "—"} · W {report.bands?.w ?? "—"} · S {report.bands?.s ?? "—"}
                  </p>
                  <p>
                    Câu sạch {report.sentences.length} · nhật ký {report.diaries.length} · writing {report.papers.length} ·
                    nói {report.speaks.length}
                  </p>
                  <p className="text-xs text-mute">Cập nhật {new Date(report.at).toLocaleString("vi-VN")}</p>
                </div>
              )}
              {report?.diaries[0] && (
                <div className="panel mt-4 p-5">
                  <p className="text-xs text-mute">Nhật ký {report.diaries[0].day}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm">{report.diaries[0].text}</p>
                </div>
              )}
              {(report?.sentences ?? []).slice(0, 5).map((x, i) => (
                <p key={`${x.word}-${i}`} className="mt-3 text-sm">
                  <span className="text-lime">{x.word}</span> · {x.text}
                </p>
              ))}
            </>
          )}

          {pane === "write" && (
            <>
              {!paper && <p className="text-mute">Chưa có bài writing. Zang nộp ở đề viết hoặc nhật ký.</p>}
              {paper && (
                <>
                  <p className="text-xs text-mute">{paper.kind === "t1" ? "Task 1" : paper.kind === "t2" ? "Task 2" : "Nhật ký"}</p>
                  <p className="mt-2 font-serif text-lg">{paper.prompt}</p>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7">{paper.text}</p>
                  <p className="mt-4 text-xs text-mute">
                    Máy ước TR/TA {paper.auto.ta} · CC {paper.auto.cc} · LR {paper.auto.lr} · GRA {paper.auto.gra} → {paper.auto.band}
                  </p>
                  <div className="mt-6 space-y-3">
                    <Band label={paper.kind === "t1" ? "Task Achievement" : "Task Response"} value={ta} onChange={setTa} />
                    <Band label="Coherence & Cohesion" value={cc} onChange={setCc} />
                    <Band label="Lexical Resource" value={lr} onChange={setLr} />
                    <Band label="Grammar" value={gra} onChange={setGra} />
                  </div>
                  <p className="mt-3 font-serif text-2xl">{wBand}</p>
                  <textarea className="field mt-3 min-h-24" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Một lỗi GRA, một việc làm lại…" />
                  <button
                    className="btn-lime mt-3"
                    onClick={() => {
                      void liveGrade({ kind: "write", paperAt: paper.at, ta, cc, lr, gra, band: wBand, note, at: Date.now() });
                      setHint("Đã gửi điểm cho Zang.");
                    }}
                  >
                    Gửi điểm Zang
                  </button>
                  {paper.teacher && <p className="mt-2 text-sm text-lime">Đã chấm {paper.teacher.band}: {paper.teacher.note}</p>}
                </>
              )}
            </>
          )}

          {pane === "speak" && (
            <>
              {!speak && <p className="text-mute">Chưa có lần nói. Zang bấm Nói rồi Nộp cho thầy.</p>}
              {speak && (
                <>
                  <p className="font-serif text-lg">{speak.cue}</p>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7">{speak.text}</p>
                  <p className="mt-4 text-xs text-mute">
                    Máy ước FC {speak.auto.fc} · LR {speak.auto.lr} · GRA {speak.auto.gra} · Pron {speak.auto.pron} → {speak.auto.band}
                  </p>
                  <div className="mt-6 space-y-3">
                    <Band label="Fluency & Coherence" value={fc} onChange={setFc} />
                    <Band label="Lexical Resource" value={lr} onChange={setLr} />
                    <Band label="Grammar" value={gra} onChange={setGra} />
                    <Band label="Pronunciation" value={pron} onChange={setPron} />
                  </div>
                  <p className="mt-3 font-serif text-2xl">{sBand}</p>
                  <textarea className="field mt-3 min-h-24" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Phụ âm cuối, thì, một câu mẫu…" />
                  <button
                    className="btn-lime mt-3"
                    onClick={() => {
                      void liveGrade({ kind: "speak", speakAt: speak.at, fc, lr, gra, pron, band: sBand, note, at: Date.now() });
                      setHint("Đã gửi điểm cho Zang.");
                    }}
                  >
                    Gửi điểm Zang
                  </button>
                </>
              )}
            </>
          )}

          {pane === "key" && (
            <>
              <p className="text-sm text-mute">
                Listening và Reading máy chấm đúng/sai theo đáp án. ~30/40 ≈ 7, ~35–36/40 ≈ 8 Academic.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {(report?.tests ?? []).map((t) => (
                  <li key={`${t.testId}-${t.at}`}>
                    {t.testId} · {t.ok}/{t.total}
                  </li>
                ))}
                {!report?.tests.length && <li className="text-mute">Chưa làm đề nào.</li>}
              </ul>
            </>
          )}
        </div>
      }
    />
  );
}
