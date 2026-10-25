"use client";

import { useEffect, useState } from "react";
import Studio, { RailPick } from "@/components/Studio";
import { useEight } from "@/lib/useEight";
import { liveGrade, onLive } from "@/lib/live";
import { readInbox, readZangState, unpack, type Report } from "@/lib/report";
import { clampBand } from "@/lib/ielts";
import {
  addAssignment,
  addStudent,
  getAssignments,
  getClassroom,
  getCustomMnemonics,
  getQuizResults,
  readStudentState,
  removeAssignment,
  removeStudent,
  saveCustomMnemonic,
  weakWords,
  type Assignment,
} from "@/lib/classroom";
import { LEX_TOPICS, lexByTopic } from "@/lib/lexicon";

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

type Pane = "live" | "write" | "speak" | "key" | "class" | "assign" | "weak" | "quiz" | "memo";

export default function TeacherPage() {
  const { s, ready } = useEight();
  const [report, setReport] = useState<Report | null>(null);
  const [pane, setPane] = useState<Pane>("live");
  const [paste, setPaste] = useState("");
  const [hint, setHint] = useState("");
  const [ta, setTa] = useState(6);
  const [cc, setCc] = useState(6);
  const [lr, setLr] = useState(6);
  const [gra, setGra] = useState(6);
  const [fc, setFc] = useState(6);
  const [pron, setPron] = useState(6);
  const [note, setNote] = useState("");
  // lớp học
  const [newName, setNewName] = useState("");
  const [clsTick, setClsTick] = useState(0);
  // giao bài
  const [asTitle, setAsTitle] = useState("");
  const [asTopic, setAsTopic] = useState(LEX_TOPICS[0]?.id ?? "");
  const [asWords, setAsWords] = useState("");
  const [asNote, setAsNote] = useState("");
  const [asFor, setAsFor] = useState("");
  // mẹo nhớ
  const [mnWord, setMnWord] = useState("");
  const [mnSound, setMnSound] = useState("");
  const [mnImg, setMnImg] = useState("");

  useEffect(() => {
    setReport(fromLocal());
    return onLive((r) => {
      setReport(r);
    });
  }, []);

  const cls = getClassroom();
  const assignments = getAssignments();
  const quizResults = getQuizResults();
  const customMn = getCustomMnemonics();
  const bump = () => setClsTick((x) => x + 1);
  void clsTick;

  const students = [
    { id: "zang", name: "Zang Bếu" },
    ...cls.students.map((x) => ({ id: x.id, name: x.name })),
  ];

  if (!ready || !s) return null;
  if (s.profile.userId && s.profile.userId !== "hiep") {
    return <p className="p-10 text-mute">Trang này dành cho thầy Hiệp. Học trò vui lòng quay lại trang Hôm nay.</p>;
  }

  const paper = report?.papers[0];
  const speak = report?.speaks[0];
  const wBand = clampBand((ta + cc + lr + gra) / 4);
  const sBand = clampBand((fc + lr + gra + pron) / 4);

  return (
    <Studio
      title="Zang Bếu"
      kicker={report ? "Đã kết nối kho chung" : "Chưa có dữ liệu"}
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
          <RailPick on={pane === "class"} onClick={() => setPane("class")}>
            <p className="font-serif text-lg leading-tight">Lớp học</p>
            <p className="mt-0.5 text-[11px] text-mute">{students.length} học trò</p>
          </RailPick>
          <RailPick on={pane === "assign"} onClick={() => setPane("assign")}>
            <p className="font-serif text-lg leading-tight">Giao bài</p>
            <p className="mt-0.5 text-[11px] text-mute">{assignments.length} bài</p>
          </RailPick>
          <RailPick on={pane === "weak"} onClick={() => setPane("weak")}>
            <p className="font-serif text-lg leading-tight">Từ hay sai</p>
            <p className="mt-0.5 text-[11px] text-mute">theo từng em</p>
          </RailPick>
          <RailPick on={pane === "quiz"} onClick={() => setPane("quiz")}>
            <p className="font-serif text-lg leading-tight">Kiểm tra nhanh</p>
            <p className="mt-0.5 text-[11px] text-mute">{quizResults.length} lượt</p>
          </RailPick>
          <RailPick on={pane === "memo"} onClick={() => setPane("memo")}>
            <p className="font-serif text-lg leading-tight">Mẹo nhớ</p>
            <p className="mt-0.5 text-[11px] text-mute">{Object.keys(customMn).length} mẹo của thầy</p>
          </RailPick>
        </>
      }
      stage={
        <div className="mx-auto max-w-lg pb-10">
          {pane === "live" && (
            <>
              <p className="text-sm text-mute">
                Nhờ kho chung, Zang học ở máy nào thầy cũng xem được tiến trình — kể cả khi Zang đã tắt máy.
              </p>
              <textarea className="field mt-4 min-h-20" value={paste} onChange={(e) => setPaste(e.target.value)} placeholder="Nếu kho chung bị lỗi, dán mã dự phòng vào đây…" />
              <button
                type="button"
                className="btn-ghost mt-2"
                disabled={!paste.trim()}
                onClick={() => {
                  const r = unpack(paste.trim());
                  if (!r) setHint("Mã này không đọc được, thầy kiểm tra lại nhé.");
                  else {
                    setReport(r);
                    setHint("Đã nhận mã thành công.");
                  }
                }}
              >
                Nhận mã
              </button>
              {hint && <p className="mt-2 text-sm text-lime">{hint}</p>}
              {report && (
                <div className="panel mt-6 space-y-2 p-5 text-sm">
                  <p>
                    {report.day} · xong {report.steps.length}/4 bước · học {report.minutes} phút · chuỗi {report.streak} ngày
                  </p>
                  <p>
                    Giai đoạn {report.stage ?? "—"} · đã xong {report.completed ?? 0} bài · L {report.bands?.l ?? "—"} · R{" "}
                    {report.bands?.r ?? "—"} · W {report.bands?.w ?? "—"} · S {report.bands?.s ?? "—"}
                  </p>
                  <p>
                    {report.sentences.length} câu đặt đúng · {report.diaries.length} bài nhật ký · {report.papers.length} bài writing ·
                    {" "}{report.speaks.length} lần nói
                  </p>
                  <p className="text-xs text-mute">Cập nhật lúc {new Date(report.at).toLocaleString("vi-VN")}</p>
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
              {!paper && <p className="text-mute">Chưa có bài writing nào. Zang nộp bài ở phần luyện viết hoặc nhật ký thì sẽ hiện ở đây.</p>}
              {paper && (
                <>
                  <p className="text-xs text-mute">{paper.kind === "t1" ? "Task 1" : paper.kind === "t2" ? "Task 2" : "Nhật ký"}</p>
                  <p className="mt-2 font-serif text-lg">{paper.prompt}</p>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7">{paper.text}</p>
                  <p className="mt-4 text-xs text-mute">
                    Máy chấm thử: TR/TA {paper.auto.ta} · CC {paper.auto.cc} · LR {paper.auto.lr} · GRA {paper.auto.gra} → band {paper.auto.band}
                  </p>
                  <div className="mt-6 space-y-3">
                    <Band label={paper.kind === "t1" ? "Task Achievement" : "Task Response"} value={ta} onChange={setTa} />
                    <Band label="Coherence & Cohesion" value={cc} onChange={setCc} />
                    <Band label="Lexical Resource" value={lr} onChange={setLr} />
                    <Band label="Grammar" value={gra} onChange={setGra} />
                  </div>
                  <p className="mt-3 font-serif text-2xl">{wBand}</p>
                  <textarea className="field mt-3 min-h-24" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Nhận xét cho trò: một lỗi ngữ pháp, một việc cần làm lại…" />
                  <button
                    className="btn-lime mt-3"
                    onClick={() => {
                      void liveGrade({ kind: "write", paperAt: paper.at, ta, cc, lr, gra, band: wBand, note, at: Date.now() });
                      setHint("Đã gửi điểm cho Zang.");
                    }}
                  >
                    Gửi điểm cho Zang
                  </button>
                  {paper.teacher && <p className="mt-2 text-sm text-lime">Thầy đã chấm {paper.teacher.band}: {paper.teacher.note}</p>}
                </>
              )}
            </>
          )}

          {pane === "speak" && (
            <>
              {!speak && <p className="text-mute">Chưa có bài nói nào. Zang bấm Nói rồi chọn Nộp cho thầy thì sẽ hiện ở đây.</p>}
              {speak && (
                <>
                  <p className="font-serif text-lg">{speak.cue}</p>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7">{speak.text}</p>
                  <p className="mt-4 text-xs text-mute">
                    Máy chấm thử: FC {speak.auto.fc} · LR {speak.auto.lr} · GRA {speak.auto.gra} · Pron {speak.auto.pron} → band {speak.auto.band}
                  </p>
                  <div className="mt-6 space-y-3">
                    <Band label="Fluency & Coherence" value={fc} onChange={setFc} />
                    <Band label="Lexical Resource" value={lr} onChange={setLr} />
                    <Band label="Grammar" value={gra} onChange={setGra} />
                    <Band label="Pronunciation" value={pron} onChange={setPron} />
                  </div>
                  <p className="mt-3 font-serif text-2xl">{sBand}</p>
                  <textarea className="field mt-3 min-h-24" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Nhận xét cho trò: phụ âm cuối, thì động từ, một câu mẫu…" />
                  <button
                    className="btn-lime mt-3"
                    onClick={() => {
                      void liveGrade({ kind: "speak", speakAt: speak.at, fc, lr, gra, pron, band: sBand, note, at: Date.now() });
                      setHint("Đã gửi điểm cho Zang.");
                    }}
                  >
                    Gửi điểm cho Zang
                  </button>
                </>
              )}
            </>
          )}

          {pane === "key" && (
            <>
              <p className="text-sm text-mute">
                Listening và Reading máy tự chấm theo đáp án. Tham khảo: khoảng 30/40 là band 7, khoảng 35–36/40 là band 8 Academic.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {(report?.tests ?? []).map((t) => (
                  <li key={`${t.testId}-${t.at}`}>
                    {t.testId} · đúng {t.ok}/{t.total}
                  </li>
                ))}
                {!report?.tests.length && <li className="text-mute">Chưa làm đề nào.</li>}
              </ul>
            </>
          )}

          {pane === "class" && (
            <>
              <p className="text-sm text-mute">
                Thêm học trò vào lớp — app sẽ tự cấp tên đăng nhập và PIN 4 số. Các em chỉ cần chọn tên mình ở trang đăng nhập rồi nhập PIN.
              </p>
              <div className="mt-4 flex gap-2">
                <input className="field" placeholder="Tên học trò mới…" value={newName} onChange={(e) => setNewName(e.target.value)} />
                <button
                  className="btn-lime shrink-0"
                  disabled={!newName.trim()}
                  onClick={() => {
                    addStudent(newName.trim());
                    setNewName("");
                    bump();
                  }}
                >
                  Thêm
                </button>
              </div>
              <div className="mt-5 space-y-2">
                {students.map((st) => {
                  const st2 = readStudentState(st.id);
                  const pin = st.id === "zang" ? "8800" : cls.students.find((x) => x.id === st.id)?.pin;
                  return (
                    <div key={st.id} className="panel flex items-center gap-3 px-4 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{st.name}</p>
                        <p className="text-xs text-mute">
                          {pin ? `PIN ${pin} · ` : ""}
                          {st2
                            ? `chuỗi ${st2.profile.streak.count} ngày · ${st2.cards.length} thẻ · ${st2.attempts.length} đề · hôm nay học ${st2.profile.minutesToday} phút`
                            : "chưa học lần nào trên máy này"}
                        </p>
                      </div>
                      {st.id !== "zang" && (
                        <button
                          className="text-xs text-mute hover:text-red-400"
                          onClick={() => {
                            removeStudent(st.id);
                            bump();
                          }}
                        >
                          Xoá
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {pane === "assign" && (
            <>
              <p className="text-sm text-mute">Giao từ vựng theo chủ đề (mặc định 20 từ đầu) hoặc thầy tự nhập danh sách. Học trò sẽ thấy bài ở trang 3500 từ.</p>
              <input className="field mt-4" placeholder="Tên bài: Tuần này học chủ đề Thời tiết…" value={asTitle} onChange={(e) => setAsTitle(e.target.value)} />
              <div className="mt-2 grid grid-cols-2 gap-2">
                <select className="field" value={asTopic} onChange={(e) => setAsTopic(e.target.value)}>
                  {LEX_TOPICS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.vi} ({t.name})
                    </option>
                  ))}
                </select>
                <select className="field" value={asFor} onChange={(e) => setAsFor(e.target.value)}>
                  <option value="">Cả lớp</option>
                  {students.map((x) => (
                    <option key={x.id} value={x.id}>
                      Riêng {x.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                className="field mt-2"
                placeholder="Hoặc tự nhập các từ, cách nhau bằng dấu phẩy: rain, storm, cloud…"
                value={asWords}
                onChange={(e) => setAsWords(e.target.value)}
              />
              <textarea className="field mt-2 min-h-16" placeholder="Lời dặn của thầy (không bắt buộc)…" value={asNote} onChange={(e) => setAsNote(e.target.value)} />
              <button
                className="btn-lime mt-3"
                disabled={!asTitle.trim()}
                onClick={() => {
                  const words = asWords.trim()
                    ? asWords.split(/[,;\n]+/).map((w) => w.trim()).filter(Boolean)
                    : lexByTopic(asTopic).slice(0, 20).map((x) => x.word);
                  addAssignment({
                    title: asTitle.trim(),
                    topicId: asWords.trim() ? undefined : asTopic,
                    words,
                    note: asNote.trim(),
                    due: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
                    forId: asFor || undefined,
                  });
                  setAsTitle("");
                  setAsWords("");
                  setAsNote("");
                  bump();
                }}
              >
                Giao bài
              </button>
              <div className="mt-5 space-y-2">
                {assignments.map((a: Assignment) => (
                  <div key={a.id} className="panel flex items-center gap-3 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{a.title}</p>
                      <p className="text-xs text-mute">
                        {a.words.length} từ · hạn nộp {a.due}
                        {a.forId ? ` · riêng ${students.find((x) => x.id === a.forId)?.name ?? a.forId}` : " · cả lớp"}
                        {a.note ? ` · “${a.note}”` : ""}
                      </p>
                    </div>
                    <button
                      className="text-xs text-mute hover:text-red-400"
                      onClick={() => {
                        removeAssignment(a.id);
                        bump();
                      }}
                    >
                      Xoá
                    </button>
                  </div>
                ))}
                {!assignments.length && <p className="text-sm text-mute">Chưa giao bài nào.</p>}
              </div>
            </>
          )}

          {pane === "weak" && (
            <>
              <p className="text-sm text-mute">Những từ các em bấm «Học lại» nhiều nhất trong thẻ ôn — thầy có thể cho ôn miệng đầu giờ.</p>
              <div className="mt-4 space-y-4">
                {students.map((st) => {
                  const ws = weakWords(st.id);
                  return (
                    <div key={st.id} className="panel p-4">
                      <p className="text-sm font-semibold">{st.name}</p>
                      {ws.length ? (
                        <p className="mt-1.5 text-sm leading-7">
                          {ws.map((w) => (
                            <span key={w.word} className="mr-2 inline-block">
                              <span className="text-lime">{w.word}</span>
                              <span className="text-xs text-mute"> ×{w.lapses}</span>
                            </span>
                          ))}
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-mute">Chưa có dữ liệu thẻ ôn trên máy này.</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {pane === "quiz" && (
            <>
              <p className="text-sm text-mute">
                Kết quả «Kiểm tra nhanh» — học trò làm ngay dưới mỗi bài được giao ở trang 3500 từ.
              </p>
              <div className="mt-4 space-y-2">
                {quizResults.map((r, i) => (
                  <div key={i} className="panel flex items-center justify-between px-4 py-3 text-sm">
                    <p>
                      <span className="font-semibold">{students.find((x) => x.id === r.studentId)?.name ?? r.studentId}</span>
                      <span className="text-mute"> · {assignments.find((a) => a.id === r.assignmentId)?.title ?? "bài đã xoá"}</span>
                    </p>
                    <p className={r.ok / Math.max(1, r.total) >= 0.8 ? "text-lime" : "text-red-400"}>
                      {r.ok}/{r.total}
                    </p>
                  </div>
                ))}
                {!quizResults.length && <p className="text-sm text-mute">Chưa có lượt kiểm tra nào.</p>}
              </div>
            </>
          )}

          {pane === "memo" && (
            <>
              <p className="text-sm text-mute">
                Thầy tự tạo mẹo đọc âm gần giống cho từ khó — mẹo sẽ hiện ngay ở Từ điển, trang 3500 từ và truyện của các em.
              </p>
              <input className="field mt-4" placeholder="Từ tiếng Anh: elephant…" value={mnWord} onChange={(e) => setMnWord(e.target.value)} />
              <input className="field mt-2" placeholder="Đọc gần giống tiếng Việt: «ê lê phờn»…" value={mnSound} onChange={(e) => setMnSound(e.target.value)} />
              <input className="field mt-2" placeholder="Hình ảnh gợi nhớ: con voi ê a kéo theo cái phờn…" value={mnImg} onChange={(e) => setMnImg(e.target.value)} />
              <button
                className="btn-lime mt-3"
                disabled={!mnWord.trim() || !mnSound.trim()}
                onClick={() => {
                  saveCustomMnemonic(mnWord, mnSound, mnImg || "Tự nhớ theo mẹo của thầy.");
                  setMnWord("");
                  setMnSound("");
                  setMnImg("");
                  bump();
                }}
              >
                Lưu mẹo
              </button>
              <div className="mt-5 space-y-2">
                {Object.entries(customMn).map(([w, m]) => (
                  <div key={w} className="panel px-4 py-3 text-sm">
                    <p className="font-semibold text-lime">{w}</p>
                    <p className="mt-0.5">«{m.sound}»</p>
                    <p className="text-xs text-mute">{m.img}</p>
                  </div>
                ))}
                {!Object.keys(customMn).length && <p className="text-sm text-mute">Thầy chưa tạo mẹo nào.</p>}
              </div>
            </>
          )}
        </div>
      }
    />
  );
}
