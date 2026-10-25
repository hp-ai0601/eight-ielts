"use client";

import { useMemo, useState } from "react";
import Studio, { RailPick } from "@/components/Studio";
import Hear from "@/components/Hear";
import { IRR, IRR_COUNT, IRR_GROUPS, IRR_GROUP_VI, type IrrGroup, type IrrVerb } from "@/lib/method/irregular";

type Quiz = { v: IrrVerb; a2: string; a3: string; done: boolean; ok: boolean };

export default function IrregularPage() {
  const [g, setG] = useState<IrrGroup>("AAA");
  const [q, setQ] = useState("");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [score, setScore] = useState({ ok: 0, n: 0 });

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s) return IRR.filter((v) => `${v.v1} ${v.v2} ${v.v3} ${v.vi}`.includes(s));
    return IRR.filter((v) => v.g === g);
  }, [g, q]);

  const norm = (s: string) => s.trim().toLowerCase();

  function newQuiz() {
    const pool = IRR.filter((v) => !q.trim() || `${v.v1} ${v.v2} ${v.v3} ${v.vi}`.includes(q.trim().toLowerCase()));
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (pick) setQuiz({ v: pick, a2: "", a3: "", done: false, ok: false });
  }

  return (
    <Studio
      title="Động từ bất quy tắc"
      kicker={`${IRR_COUNT} động từ · V1 – V2 – V3`}
      next={{ href: "/kho", label: "Kho" }}
      rail={
        <>
          <RailPick on={!q} onClick={() => { setQ(""); }}>Tất cả các nhóm</RailPick>
          {IRR_GROUPS.map((x) => (
            <RailPick
              key={x}
              on={!q && g === x}
              onClick={() => {
                setG(x);
                setQ("");
                setQuiz(null);
              }}
            >
              <p className="font-serif text-base leading-tight">{x}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-mute">{IRR_GROUP_VI[x]}</p>
            </RailPick>
          ))}
        </>
      }
      stage={
        <div className="mx-auto max-w-lg">
          <input
            className="field"
            placeholder="Tìm: go, đi, went…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setQuiz(null);
            }}
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button className="btn-lime" onClick={newQuiz}>
              {quiz ? "Câu khác" : "Luyện nhanh"}
            </button>
            {score.n > 0 && (
              <p className="text-sm text-mute">
                Đúng {score.ok}/{score.n}
              </p>
            )}
          </div>

          {quiz && (
            <div className="panel mt-4 p-5">
              <p className="text-[11px] uppercase tracking-wider text-lime">Điền V2 và V3</p>
              <div className="mt-2 flex items-center gap-3">
                <p className="font-serif text-3xl">{quiz.v.v1}</p>
                <Hear text={quiz.v.v1} />
                <p className="text-sm text-mute">({quiz.v.vi})</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <input
                  className="field"
                  placeholder="V2 — quá khứ"
                  value={quiz.a2}
                  disabled={quiz.done}
                  onChange={(e) => setQuiz({ ...quiz, a2: e.target.value })}
                />
                <input
                  className="field"
                  placeholder="V3 — quá khứ phân từ"
                  value={quiz.a3}
                  disabled={quiz.done}
                  onChange={(e) => setQuiz({ ...quiz, a3: e.target.value })}
                />
              </div>
              {!quiz.done ? (
                <button
                  className="btn-lime mt-4"
                  onClick={() => {
                    const ok = norm(quiz.a2) === quiz.v.v2.toLowerCase() && norm(quiz.a3) === quiz.v.v3.toLowerCase();
                    setQuiz({ ...quiz, done: true, ok });
                    setScore((x) => ({ ok: x.ok + (ok ? 1 : 0), n: x.n + 1 }));
                  }}
                >
                  Kiểm tra
                </button>
              ) : (
                <div className="mt-4">
                  <p className={`text-sm ${quiz.ok ? "text-lime" : "text-red-400"}`}>
                    {quiz.ok ? "Chính xác! " : `Chưa đúng. Đáp án là: ${quiz.v.v1} – ${quiz.v.v2} – ${quiz.v.v3}. `}
                  </p>
                  <p className="mt-1 text-xs text-mute">
                    {quiz.ok
                      ? "Nhớ chắc các dạng quá khứ là khỏi mất điểm ngữ pháp oan — tiếp tục phát huy nhé."
                      : "Không sao, sai ở đây còn hơn sai trong phòng thi. Đọc to ba lần nào: "}
                    {!quiz.ok && `${quiz.v.v1} – ${quiz.v.v2} – ${quiz.v.v3}.`}
                  </p>
                  <button className="btn-ghost mt-3" onClick={newQuiz}>
                    Câu tiếp
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="mt-5 space-y-2">
            {list.map((v) => (
              <div key={v.v1} className="panel flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">{v.v1}</span>
                    <span className="text-mute"> – {v.v2} – {v.v3}</span>
                  </p>
                  <p className="text-xs text-mute">{v.vi}</p>
                </div>
                <Hear text={`${v.v1}. ${v.v2}. ${v.v3}`} />
              </div>
            ))}
          </div>
          {!list.length && <p className="mt-6 text-sm text-mute">Không tìm thấy động từ nào khớp.</p>}
        </div>
      }
    />
  );
}
