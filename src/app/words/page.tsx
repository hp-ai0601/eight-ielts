"use client";

import { useMemo, useState } from "react";
import { due, addLexItems } from "@/lib/store";
import { useEight } from "@/lib/useEight";
import SrsDeck from "@/components/SrsDeck";
import { speak } from "@/lib/speech";
import { LEX_COUNT, LEX_TOPICS, lexByTopic, lexSearch } from "@/lib/lexicon";
import { POS_VI } from "@/lib/pos";
import WordPic from "@/components/WordPic";
import ExampleLine from "@/components/ExampleLine";

export default function WordsPage() {
  const { s, commit, ready } = useEight();
  const [topic, setTopic] = useState(LEX_TOPICS[0].id);
  const [q, setQ] = useState("");
  const [deck, setDeck] = useState(false);
  const items = useMemo(() => (q.trim() ? lexSearch(q) : lexByTopic(topic)), [q, topic]);
  if (!ready || !s) return null;
  const n = due(s).length;
  const inDeck = s.cards.length;
  const meta = LEX_TOPICS.find((t) => t.id === topic);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 lg:px-10">
      <h1 className="font-serif text-4xl">Từ vựng</h1>
      <p className="mt-2 text-mute">
        {LEX_COUNT} từ · 100 chủ đề (đời sống + Academic). SRS: {n} đến hạn · {inDeck} thẻ đang học. Không nhồi cả
        3500 một lúc — học 20 từ một chủ đề.
      </p>
      <input className="field mt-6" placeholder="Tìm: tuition, học phí, congestion…" value={q} onChange={(e) => setQ(e.target.value)} />
      {!q && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {LEX_TOPICS.map((t) => (
            <button
              key={t.id}
              className={`rounded-full px-3 py-1 text-xs ${topic === t.id ? "bg-lime text-bg" : "border border-line text-mute"}`}
              onClick={() => setTopic(t.id)}
            >
              {t.vi}
            </button>
          ))}
        </div>
      )}
      <div className="mt-6 flex flex-wrap gap-2">
        <button className="btn-lime" onClick={() => commit(addLexItems(s, items.slice(0, 20)))}>
          Học 20 từ {q ? "khớp tìm" : meta?.vi}
        </button>
        <button className="btn-ghost" onClick={() => setDeck((x) => !x)}>
          {deck ? "Ẩn thẻ" : "Ôn thẻ đến hạn"}
        </button>
      </div>
      {deck && (
        <div className="mt-6">
          <SrsDeck state={s} onDone={commit} />
        </div>
      )}
      <p className="mt-8 text-xs uppercase tracking-wider text-lime">
        {q ? `Kết quả «${q}»` : meta ? `${meta.vi} · ${meta.name}` : ""} · {items.length} từ
      </p>
      <ul className="mt-3 divide-y divide-line">
        {items.map((c) => (
          <li key={`${c.topic}-${c.word}`} className="flex items-start justify-between gap-3 py-3">
            <WordPic word={c.word} vi={c.vi} pos={c.pos} size="thumb" className="shrink-0" />
            <div className="min-w-0 flex-1">
              <p>
                <span className="font-medium">{c.word}</span>{" "}
                <span className="text-sm text-mute">{c.ipa}</span>
                {" · "}
                <span className="text-sm text-lime">{POS_VI[c.pos]}</span>
              </p>
              <p className="text-sm">{c.vi}</p>
              <ExampleLine en={c.example} />
            </div>
            <button className="btn-ghost shrink-0" onClick={() => speak(c.word)}>
              Nghe
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
