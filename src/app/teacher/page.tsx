"use client";

import { useEffect, useState } from "react";
import { useEight } from "@/lib/useEight";
import { overallBand, testProgress, type State } from "@/lib/store";
import { STAGES } from "@/lib/content";
import { readInbox, readZangState, unpack, type Report } from "@/lib/report";

function fromState(z: State): Report {
  const day = z.profile.day;
  return {
    v: 1,
    at: Date.now(),
    day,
    streak: z.profile.streak.count,
    minutes: z.profile.minutesToday,
    steps: z.zang.steps[day] ?? [],
    sentences: z.zang.sentences.slice(0, 24),
    drafts: z.zang.drafts ?? [],
    spells: (z.zang.spells ?? []).slice(0, 24),
    mimics: z.zang.mimics.slice(0, 12),
    diaries: z.zang.diaries.slice(0, 10),
  };
}

export default function TeacherPage() {
  const { s, ready } = useEight();
  const [report, setReport] = useState<Report | null>(null);
  const [paste, setPaste] = useState("");
  const [hint, setHint] = useState("");
  const [remote, setRemote] = useState<State | null>(null);

  useEffect(() => {
    const local = readZangState();
    const inbox = readInbox();
    if (local) setReport(fromState(local));
    else if (inbox) setReport(inbox);
    fetch("/api/progress?user=zang")
      .then((r) => r.json())
      .then((d) => {
        const st = (d.state?.state ?? d.state) as State | undefined;
        if (st?.zang) {
          setRemote(st);
          setReport((cur) => cur ?? fromState(st));
        }
      })
      .catch(() => undefined);
  }, []);

  if (!ready || !s) return null;
  if (s.profile.userId && s.profile.userId !== "hiep") {
    return <p className="p-10 text-mute">Trang này cho thầy Hiệp. Zang vào Hôm nay.</p>;
  }

  function eat() {
    const r = unpack(paste.trim());
    if (!r) {
      setHint("Mã không đọc được. Zang bấm Copy mã gửi thầy rồi gửi lại.");
      return;
    }
    setReport(r);
    setHint("Đã nhận bài Zang.");
  }

  const z = remote;
  const red = (report?.drafts ?? []).filter((d) => d.score < 10).slice(0, 8);
  const wrongSpell = (report?.spells ?? []).filter((x) => !x.ok).slice(0, 8);

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 lg:px-10">
      <h1 className="font-serif text-4xl">Zang Bếu</h1>
      <p className="mt-3 text-mute">
        GitHub Pages không có database. Cùng máy với Zang thì tự hiện. Máy khác: Zang copy mã, thầy dán dưới.
      </p>

      <div className="panel mt-8 p-5">
        <p className="text-xs uppercase tracking-wider text-lime">Dán mã Zang gửi</p>
        <textarea className="field mt-3 min-h-24" value={paste} onChange={(e) => setPaste(e.target.value)} placeholder="Dán mã…" />
        <button type="button" className="btn-lime mt-3" disabled={!paste.trim()} onClick={eat}>
          Nhận bài
        </button>
        {hint && <p className="mt-2 text-sm text-lime">{hint}</p>}
      </div>

      {!report && !z && <p className="mt-8 text-mute">Chưa có bài. Zang học xong bấm Gửi thầy.</p>}

      {report && (
        <div className="panel mt-8 space-y-2 p-5">
          <p>
            {report.day} · hôm nay {report.steps.length}/4 bước · {report.minutes} phút · streak {report.streak}
          </p>
          <p>
            Câu sạch {report.sentences.length} · lần còn đỏ {red.length} · chính tả sai {wrongSpell.length} · nhật ký{" "}
            {report.diaries.length}
          </p>
        </div>
      )}

      {wrongSpell.length > 0 && (
        <div className="mt-8">
          <p className="text-xs uppercase tracking-wider text-lime">Chính tả sai</p>
          <ul className="mt-2 space-y-1 text-sm">
            {wrongSpell.map((x, i) => (
              <li key={`${x.target}-${i}`}>
                <span className="text-bad line-through">{x.wrote}</span>
                {" → "}
                <span className="text-lime">{x.target}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {red.length > 0 && (
        <div className="mt-8">
          <p className="text-xs uppercase tracking-wider text-lime">Câu còn đỏ (chưa được cất)</p>
          <ul className="mt-2 space-y-3 text-sm">
            {red.map((d) => (
              <li key={d.at} className="panel p-4">
                <p className="text-xs text-bad">
                  {d.kind} · {d.score}/10 {d.word ?? ""}
                </p>
                <p className="mt-2">{d.text}</p>
                {d.grammar[0] && <p className="mt-2 text-bad">{d.grammar[0]}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {report && report.sentences.length > 0 && (
        <div className="mt-8">
          <p className="text-xs uppercase tracking-wider text-lime">Câu đã sạch</p>
          <ul className="mt-2 space-y-3 text-sm">
            {report.sentences.slice(0, 12).map((x, i) => (
              <li key={`${x.word}-${i}`} className="panel p-4">
                <p className="text-xs text-mute">
                  {x.word} · {x.score ?? 10}/10
                </p>
                <p className="mt-2">{x.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {report && report.diaries[0] && (
        <div className="panel mt-8 p-5">
          <p className="text-xs text-mute">Nhật ký {report.diaries[0].day}</p>
          <p className="mt-2 whitespace-pre-wrap">{report.diaries[0].text}</p>
        </div>
      )}

      {z && !report && (
        <div className="panel mt-8 space-y-2 p-5">
          <p>Overall {overallBand(z).toFixed(1)}</p>
          <p>Tầng {STAGES.find((x) => x.id === z.profile.stageId)?.title}</p>
          <p>
            Bài lộ trình {z.profile.completed.length} · đề {testProgress(z).done}/{testProgress(z).total}
          </p>
        </div>
      )}
    </div>
  );
}
