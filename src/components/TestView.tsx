"use client";

import { useState } from "react";
import type { BankTest } from "@/lib/bank";
import Quiz from "./Quiz";
import SpeakBox from "./SpeakBox";
import WriteBox from "./WriteBox";
import PlayBar from "./PlayBar";
import { speak } from "@/lib/speech";
import { POS_VI, guessPos } from "@/lib/pos";
import WordPic from "./WordPic";

export default function TestView({
  test,
  onDone,
}: {
  test: BankTest;
  onDone: (ok: number, total: number) => void;
}) {
  const [showScript, setShowScript] = useState(false);
  const [filled, setFilled] = useState(0);
  const total = test.questions?.length ?? (test.kind === "speak" || test.kind === "mock-s" || test.kind === "write" || test.kind === "mock-w" ? 1 : 0);
  const isWrite = test.kind === "write" || test.kind === "mock-w" || (!!test.homework && !!test.write);
  const isSpeak = test.kind === "speak" || test.kind === "mock-s";

  return (
    <>
      <article className="pb-28">
        <p className="text-xs uppercase tracking-wider text-lime">{test.topic}</p>
        <h1 className="mt-2 font-serif text-3xl">{test.title}</h1>
        <p className="mt-1 text-sm text-mute">
          {test.minutes} phút{test.questions ? ` · ${test.questions.length} câu hiện hết` : ""}
          {test.homework ? " · bài tập về nhà" : ""}
        </p>

        {test.vocab && test.kind === "vocab" && (
          <ul className="mt-6 divide-y divide-line">
            {test.vocab.map((v) => (
              <li key={v.word} className="flex items-start justify-between gap-4 py-3">
                <WordPic word={v.word} vi={v.vi} pos={v.pos} size="thumb" className="shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">
                    {v.word} <span className="font-normal text-mute">{v.ipa}</span>
                    {" · "}
                    <span className="text-lime">{POS_VI[v.pos ?? guessPos(v.word, v.vi, v.example)]}</span>
                  </p>
                  <p className="text-sm text-mute">{v.vi}</p>
                  <p className="mt-1 font-serif text-sm">{v.example}</p>
                </div>
                <button className="btn-ghost shrink-0" onClick={() => speak(v.word)}>
                  Nghe
                </button>
              </li>
            ))}
          </ul>
        )}

        {test.script && (
          <p className="mt-4 text-sm text-mute">
            Câu hỏi hiện hết bên dưới. Phát audio ở thanh dừng — bấm Dừng khi cần.
          </p>
        )}

        {test.passage && <div className="panel mt-6 p-5 font-serif text-[16.5px] leading-8">{test.passage}</div>}

        {test.questions && (
          <Quiz
            questions={test.questions}
            onFilled={setFilled}
            onReveal={() => {
              if (test.script) setShowScript(true);
            }}
            onDone={(ok) => onDone(ok, test.questions!.length)}
          />
        )}

        {showScript && test.script && <p className="panel mt-6 p-4 text-sm leading-7 text-mute">{test.script}</p>}

        {isSpeak && test.speak && (
          <div className="mt-8">
            <SpeakBox cue={test.speak.cue} bullets={test.speak.bullets} onScored={() => onDone(1, 1)} />
            <button className="btn-ghost mt-4" onClick={() => onDone(1, 1)}>
              Đánh dấu xong
            </button>
          </div>
        )}

        {isWrite && test.write && (
          <div className="mt-8">
            <WriteBox prompt={test.write.prompt} min={test.write.min} data={test.write.data} />
            {test.homework && !test.questions && (
              <button className="btn-ghost mt-4" onClick={() => onDone(1, total || 1)}>
                Nộp bài tập
              </button>
            )}
            {!test.homework && (
              <button className="btn-ghost mt-4" onClick={() => onDone(1, 1)}>
                Đánh dấu xong
              </button>
            )}
          </div>
        )}
      </article>
      <PlayBar minutes={test.minutes} audio={test.script} answered={test.questions ? filled : undefined} total={test.questions ? test.questions.length : undefined} />
    </>
  );
}
