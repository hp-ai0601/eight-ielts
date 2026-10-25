"use client";

import { useState } from "react";
import { speak } from "@/lib/speech";
import { glossInline } from "@/lib/gloss";
import { fmtInterval, nextInterval, type Grade } from "@/lib/srs";
import { due, gradeCard, type State } from "@/lib/store";
import WordPic from "@/components/WordPic";
import ExampleLine from "@/components/ExampleLine";
import Hear from "@/components/Hear";

export default function SrsDeck({
  state,
  onDone,
  doneLabel = "Xong",
}: {
  state: State;
  onDone: (s: State) => void;
  doneLabel?: string;
}) {
  const queue = due(state);
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const [s, setS] = useState(state);

  if (!queue.length) {
    return (
      <div className="panel p-6">
        <p className="text-sm text-mute">Hôm nay không có thẻ nào cần ôn.</p>
        <button className="btn-lime mt-4" onClick={() => onDone(s)}>
          {doneLabel}
        </button>
      </div>
    );
  }

  const card = queue[Math.min(i, queue.length - 1)];
  if (!card) {
    return (
      <div className="panel p-6">
        <p>Ôn xong bộ thẻ hôm nay rồi!</p>
        <button className="btn-lime mt-4" onClick={() => onDone(s)}>
          {doneLabel}
        </button>
      </div>
    );
  }

  function mark(g: Grade) {
    const next = gradeCard(s, card.id, g);
    setS(next);
    setShow(false);
    if (i + 1 >= queue.length) onDone(next);
    else setI(i + 1);
  }

  return (
    <div className="panel p-6">
      <p className="text-xs text-mute">
        Thẻ {i + 1}/{queue.length}
      </p>
      <WordPic word={card.front} vi={card.back} size="md" className="mt-6" />
      <p className="mt-4 font-serif text-4xl">{card.front}</p>
      <button className="mt-3 text-sm text-lime" onClick={() => speak(card.front)}>
        Nghe
      </button>
      {!show ? (
        <button className="btn-ghost mt-10" onClick={() => setShow(true)}>
          Lật thẻ
        </button>
      ) : (
        <>
          <p className="mt-6 text-lg">{card.back}</p>
          {card.example && (
            <>
              <ExampleLine en={card.example} />
              <div className="mt-1">
                <Hear text={card.example} label="Nghe cả câu" rate={0.88} />
              </div>
              <p className="mt-1.5 text-sm leading-7 text-mute">{glossInline(card.example)}</p>
            </>
          )}
          <p className="mt-6 text-[11px] uppercase tracking-wider text-mute">Tự chấm mức nhớ — app sẽ nhắc ôn lại đúng lúc</p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {(["again", "hard", "good", "easy"] as Grade[]).map((g) => (
              <button key={g} className="btn-ghost !py-2" onClick={() => mark(g)}>
                <span className="block text-sm">{g === "again" ? "Học lại" : g === "hard" ? "Còn khó" : g === "good" ? "Nhớ được" : "Quá dễ"}</span>
                <span className="block text-[10px] text-mute">{fmtInterval(nextInterval(card, g))}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
