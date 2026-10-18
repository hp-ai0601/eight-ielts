"use client";

import { useState } from "react";
import type { Lesson } from "@/lib/content";
import { speak } from "@/lib/speech";
import { POS_VI, guessPos } from "@/lib/pos";
import SpeakBox from "./SpeakBox";
import WriteBox from "./WriteBox";
import Quiz from "./Quiz";
import PlayBar from "./PlayBar";
import WordPic from "./WordPic";

export default function LessonView({
  lesson,
  onComplete,
}: {
  lesson: Lesson;
  onComplete: (info: { minutes: number; skillBand?: number; skill?: "l" | "r" | "w" | "s" }) => void;
}) {
  const [showScript, setShowScript] = useState(false);
  const [filled, setFilled] = useState(0);

  const finish = (skillBand?: number) =>
    onComplete({
      minutes: lesson.minutes,
      skillBand,
      skill: lesson.skill === "v" || lesson.skill === "g" ? undefined : lesson.skill,
    });

  const showQuiz = !!lesson.questions && lesson.kind !== "speak" && lesson.kind !== "write";

  return (
    <>
      <article className="pb-28">
        <p className="text-xs uppercase tracking-wider text-lime">{lesson.kicker}</p>
        <h1 className="mt-2 font-serif text-3xl">{lesson.title}</h1>
        <p className="mt-1 text-sm text-mute">
          {lesson.minutes} phút
          {lesson.questions ? ` · ${lesson.questions.length} câu hiện hết` : ""}
        </p>

        {lesson.body && <div className="mt-6 whitespace-pre-wrap text-[15.5px] leading-7 text-text/90">{lesson.body}</div>}

        {lesson.vocab && (
          <ul className="mt-6 divide-y divide-line">
            {lesson.vocab.map((v) => (
              <li key={v.id} className="flex items-start justify-between gap-4 py-3">
                <WordPic word={v.word} vi={v.vi} pos={v.pos} size="thumb" className="shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">
                    {v.word} <span className="font-normal text-mute">{v.ipa}</span>
                    {" · "}
                    <span className="text-lime">{POS_VI[v.pos ?? guessPos(v.word, v.vi, v.example)]}</span>
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
          <p className="mt-4 text-sm text-mute">Câu hỏi hiện hết. Phát / Dừng ở thanh dưới.</p>
        )}

        {lesson.passage && <div className="panel mt-6 p-5 font-serif text-[16.5px] leading-8">{lesson.passage}</div>}

        {showQuiz && (
          <Quiz
            questions={lesson.questions!}
            onFilled={setFilled}
            onReveal={() => {
              if (lesson.kind === "listen") setShowScript(true);
            }}
            onDone={(ok) => {
              const p = ok / lesson.questions!.length;
              const band = p >= 0.85 ? 7 : p >= 0.6 ? 6 : p >= 0.4 ? 5 : 4;
              finish(lesson.skill === "l" || lesson.skill === "r" ? band : undefined);
            }}
          />
        )}

        {showScript && lesson.script && <p className="panel mt-6 p-4 text-sm leading-7 text-mute">{lesson.script}</p>}

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
            <WriteBox prompt={lesson.write.prompt} min={lesson.write.min} data={lesson.write.data} />
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
      <PlayBar
        minutes={lesson.minutes}
        audio={lesson.kind === "listen" ? lesson.script : undefined}
        answered={showQuiz ? filled : undefined}
        total={showQuiz ? lesson.questions!.length : undefined}
      />
    </>
  );
}
