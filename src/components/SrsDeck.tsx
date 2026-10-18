"use client";

import { useState } from "react";
import { speak } from "@/lib/speech";
import type { Grade } from "@/lib/srs";
import { due, gradeCard, type State } from "@/lib/store";
import WordPic from "@/components/WordPic";

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
        <p className="text-sm text-mute">Không có thẻ đến hạn.</p>
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
        <p>Xong bộ thẻ hôm nay.</p>
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
      <WordPic word={card.front} size="md" className="mt-6" />
      <p className="mt-4 font-serif text-4xl">{card.front}</p>
      <button className="mt-3 text-sm text-lime" onClick={() => speak(card.front)}>
        Nghe
      </button>
      {!show ? (
        <button className="btn-ghost mt-10" onClick={() => setShow(true)}>
          Lật
        </button>
      ) : (
        <>
          <p className="mt-6 text-lg">{card.back}</p>
          {card.example && <p className="mt-2 font-serif text-mute">{card.example}</p>}
          <div className="mt-8 grid grid-cols-4 gap-2">
            {(["again", "hard", "good", "easy"] as Grade[]).map((g) => (
              <button key={g} className="btn-ghost capitalize" onClick={() => mark(g)}>
                {g === "again" ? "Lại" : g === "hard" ? "Khó" : g === "good" ? "Được" : "Dễ"}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
