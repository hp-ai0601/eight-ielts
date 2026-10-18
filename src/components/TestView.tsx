"use client";

import { useState } from "react";
import type { BankTest } from "@/lib/bank";
import Quiz from "./Quiz";
import SpeakBox from "./SpeakBox";
import WriteBox from "./WriteBox";
import { speak } from "@/lib/speech";

export default function TestView({
  test,
  onDone,
}: {
  test: BankTest;
  onDone: (ok: number, total: number) => void;
}) {
  const [heard, setHeard] = useState(false);
  const [showScript, setShowScript] = useState(false);
  const total = test.questions?.length ?? (test.kind === "speak" || test.kind === "mock-s" || test.kind === "write" || test.kind === "mock-w" ? 1 : 0);

  return (
    <article>
      <p className="text-xs uppercase tracking-wider text-lime">{test.topic}</p>
      <h1 className="mt-2 font-serif text-3xl">{test.title}</h1>
      <p className="mt-1 text-sm text-mute">
        {test.minutes} phút{test.questions ? ` · ${test.questions.length} câu` : ""}
        {test.homework ? " · bài tập về nhà" : ""}
      </p>

      {test.vocab && test.kind === "vocab" && (
        <ul className="mt-6 divide-y divide-line">
          {test.vocab.map((v) => (
            <li key={v.word} className="flex items-start justify-between gap-4 py-3">
              <div>
                <p className="font-medium">
                  {v.word} <span className="font-normal text-mute">{v.ipa}</span>
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
        <div className="mt-6">
          <button
            className="btn-lime"
            onClick={() => {
              speak(test.script!);
              setHeard(true);
            }}
          >
            Phát audio
          </button>
          {showScript && <p className="panel mt-4 p-4 text-sm leading-7 text-mute">{test.script}</p>}
        </div>
      )}

      {test.passage && <div className="panel mt-6 p-5 font-serif text-[16.5px] leading-8">{test.passage}</div>}

      {test.script && !heard && test.questions && (
        <p className="mt-4 text-sm text-warn">Bấm phát audio trước.</p>
      )}

      {test.questions && (!test.script || heard) && (
        <Quiz
          questions={test.questions}
          onDone={(ok) => {
            if (test.script) setShowScript(true);
            onDone(ok, test.questions!.length);
          }}
        />
      )}

      {(test.kind === "speak" || test.kind === "mock-s") && test.speak && (
        <div className="mt-8">
          <SpeakBox cue={test.speak.cue} bullets={test.speak.bullets} onScored={() => onDone(1, 1)} />
          <button className="btn-ghost mt-4" onClick={() => onDone(1, 1)}>
            Đánh dấu xong
          </button>
        </div>
      )}

      {(test.kind === "write" || test.kind === "mock-w" || test.homework) && test.write && (
        <div className="mt-8">
          <WriteBox prompt={test.write.prompt} min={test.write.min} data={test.write.data} minutes={test.minutes} onScored={() => onDone(1, 1)} />
          {test.homework && !test.questions && (
            <button className="btn-ghost mt-4" onClick={() => onDone(1, total || 1)}>
              Nộp bài tập
            </button>
          )}
        </div>
      )}
    </article>
  );
}
