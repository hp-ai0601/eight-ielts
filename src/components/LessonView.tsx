"use client";

import { useState } from "react";
import type { Lesson, Question } from "@/lib/content";
import { speak } from "@/lib/speech";
import SpeakBox from "./SpeakBox";
import WriteBox from "./WriteBox";

function Quiz({ questions, onDone }: { questions: Question[]; onDone: (ok: number) => void }) {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState("");
  const [ok, setOk] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const q = questions[i];
  if (!q) return null;
  const correct = pick.trim().toLowerCase() === q.answer.trim().toLowerCase();

  return (
    <div className="mt-6">
      <p className="text-xs text-mute">
        {i + 1}/{questions.length}
      </p>
      <p className="mt-2 text-lg">{q.prompt}</p>
      {q.options ? (
        <div className="mt-3 grid gap-2">
          {q.options.map((o) => (
            <button
              key={o}
              className={`rounded-xl border px-3 py-2 text-left text-sm ${pick === o ? "border-lime" : "border-line"}`}
              onClick={() => setPick(o)}
              disabled={revealed}
            >
              {o}
            </button>
          ))}
        </div>
      ) : (
        <input className="field mt-3" value={pick} onChange={(e) => setPick(e.target.value)} disabled={revealed} />
      )}
      {!revealed ? (
        <button className="btn-ghost mt-4" disabled={!pick} onClick={() => setRevealed(true)}>
          Kiểm tra
        </button>
      ) : (
        <div className="mt-4">
          <p className={correct ? "text-lime" : "text-bad"}>{correct ? "Đúng." : `Sai. Đáp: ${q.answer}`}</p>
          <p className="mt-2 text-sm text-mute">{q.why}</p>
          <button
            className="btn-lime mt-4"
            onClick={() => {
              const n = ok + (correct ? 1 : 0);
              if (i + 1 >= questions.length) onDone(n);
              else {
                setOk(n);
                setI(i + 1);
                setPick("");
                setRevealed(false);
              }
            }}
          >
            {i + 1 >= questions.length ? "Xong bài" : "Câu tiếp"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function LessonView({
  lesson,
  onComplete,
}: {
  lesson: Lesson;
  onComplete: (info: { minutes: number; skillBand?: number; skill?: "l" | "r" | "w" | "s" }) => void;
}) {
  const [heard, setHeard] = useState(false);
  const [showScript, setShowScript] = useState(false);

  const finish = (skillBand?: number) =>
    onComplete({
      minutes: lesson.minutes,
      skillBand,
      skill: lesson.skill === "v" || lesson.skill === "g" ? undefined : lesson.skill,
    });

  return (
    <article>
      <p className="text-xs uppercase tracking-wider text-lime">{lesson.kicker}</p>
      <h1 className="mt-2 font-serif text-3xl">{lesson.title}</h1>
      <p className="mt-1 text-sm text-mute">{lesson.minutes} phút</p>

      {lesson.body && <div className="mt-6 whitespace-pre-wrap text-[15.5px] leading-7 text-text/90">{lesson.body}</div>}

      {lesson.vocab && (
        <ul className="mt-6 divide-y divide-line">
          {lesson.vocab.map((v) => (
            <li key={v.id} className="flex items-start justify-between gap-4 py-3">
              <div>
                <p className="font-medium">
                  {v.word} <span className="font-normal text-mute">{v.ipa}</span>
                </p>
                <p className="text-sm text-mute">{v.vi}</p>
                <p className="mt-1 font-serif text-sm">{v.example}</p>
                {v.trap && <p className="mt-1 text-xs text-warn">{v.trap}</p>}
              </div>
              <button className="btn-ghost shrink-0" onClick={() => speak(v.word)}>
                Nghe
              </button>
            </li>
          ))}
        </ul>
      )}

      {lesson.kind === "listen" && lesson.script && (
        <div className="mt-6">
          <button
            className="btn-lime"
            onClick={() => {
              speak(lesson.script!);
              setHeard(true);
            }}
          >
            Phát audio
          </button>
          <p className="mt-3 text-sm text-mute">Nghe trước, trả lời sau. Script mở khi xong quiz.</p>
          {showScript && <p className="panel mt-4 p-4 text-sm leading-7 text-mute">{lesson.script}</p>}
        </div>
      )}

      {lesson.passage && (
        <div className="panel mt-6 p-5 font-serif text-[16.5px] leading-8">{lesson.passage}</div>
      )}

      {lesson.kind === "listen" && !heard && (
        <p className="mt-4 text-sm text-warn">Bấm phát audio trước, rồi mới làm câu hỏi.</p>
      )}

      {lesson.questions && lesson.kind !== "speak" && lesson.kind !== "write" && (lesson.kind !== "listen" || heard) && (
        <Quiz
          questions={lesson.questions}
          onDone={(ok) => {
            if (lesson.kind === "listen") setShowScript(true);
            const p = ok / lesson.questions!.length;
            const band = p >= 0.85 ? 7 : p >= 0.6 ? 6 : p >= 0.4 ? 5 : 4;
            finish(lesson.skill === "l" || lesson.skill === "r" ? band : undefined);
          }}
        />
      )}

      {lesson.kind === "speak" && lesson.speak && (
        <div className="mt-8">
          <SpeakBox cue={lesson.speak.cue} bullets={lesson.speak.bullets} onScored={(b) => finish(b)} />
          <button className="btn-ghost mt-4" onClick={() => finish()}>
            Đánh dấu xong
          </button>
        </div>
      )}

      {lesson.kind === "write" && lesson.write && (
        <div className="mt-8">
          <WriteBox
            prompt={lesson.write.prompt}
            min={lesson.write.min}
            data={lesson.write.data}
            minutes={lesson.minutes}
            onScored={(b) => finish(b)}
          />
          <button className="btn-ghost mt-4" onClick={() => finish()}>
            Đánh dấu xong
          </button>
        </div>
      )}

      {lesson.kind === "vocab" && !lesson.questions && (
        <button className="btn-lime mt-8" onClick={() => finish()}>
          Đã học — thêm vào bộ thẻ
        </button>
      )}

      {lesson.kind === "grammar" && !lesson.questions && (
        <button className="btn-lime mt-8" onClick={() => finish()}>
          Xong bài
        </button>
      )}
    </article>
  );
}
