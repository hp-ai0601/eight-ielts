"use client";

import { due } from "@/lib/store";
import { useEight } from "@/lib/useEight";
import SrsDeck from "@/components/SrsDeck";
import { speak } from "@/lib/speech";

export default function WordsPage() {
  const { s, commit, ready } = useEight();
  if (!ready || !s) return null;
  const n = due(s).length;
  return (
    <div className="mx-auto max-w-2xl px-5 py-10 lg:px-10">
      <h1 className="font-serif text-4xl">Từ</h1>
      <p className="mt-2 text-mute">
        Spaced repetition. {n} thẻ đến hạn · {s.cards.length} trong bộ.
      </p>
      <div className="mt-8">
        <SrsDeck state={s} onDone={commit} />
      </div>
      <ul className="mt-10 divide-y divide-line">
        {s.cards.map((c) => (
          <li key={c.id} className="flex items-center justify-between py-3">
            <div>
              <p>{c.front}</p>
              <p className="text-sm text-mute">{c.back}</p>
            </div>
            <button className="btn-ghost" onClick={() => speak(c.front)}>
              Nghe
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
