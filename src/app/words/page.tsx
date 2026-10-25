"use client";

import { useMemo, useState } from "react";
import { due, addLexItems } from "@/lib/store";
import { useEight } from "@/lib/useEight";
import SrsDeck from "@/components/SrsDeck";
import { LEX_COUNT, LEX_TOPICS, lexByTopic, lexSearch } from "@/lib/lexicon";
import { POS_VI } from "@/lib/pos";
import { mnemonicOf } from "@/lib/mnemonic";
import WordPic from "@/components/WordPic";
import ExampleLine from "@/components/ExampleLine";
import Hear from "@/components/Hear";
import Studio, { RailPick } from "@/components/Studio";
import type { LexItem } from "@/lib/lexicon";

export default function WordsPage() {
  const { s, commit, ready } = useEight();
  const [topic, setTopic] = useState(LEX_TOPICS[0].id);
  const [q, setQ] = useState("");
  const [deck, setDeck] = useState(false);
  const [wi, setWi] = useState(0);
  const items = useMemo(() => (q.trim() ? lexSearch(q) : lexByTopic(topic)), [q, topic]);
  const word: LexItem | undefined = items[Math.min(wi, Math.max(items.length - 1, 0))] ?? items[0];
  if (!ready || !s) return null;
  const n = due(s).length;
  const meta = LEX_TOPICS.find((t) => t.id === topic);
  const i = word ? Math.max(0, items.indexOf(word)) : 0;

  return (
    <Studio
      title="3500 từ"
      kicker={`${LEX_COUNT} từ · ${n} thẻ đến hạn`}
      next={{ href: "/kho", label: "Kho" }}
      rail={LEX_TOPICS.map((t) => (
        <RailPick
          key={t.id}
          on={!q && t.id === topic}
          onClick={() => {
            setTopic(t.id);
            setQ("");
            setWi(0);
            setDeck(false);
          }}
        >
          <p className="font-serif text-base leading-tight">{t.vi}</p>
          <p className="mt-0.5 truncate text-[11px] text-mute">{t.name}</p>
        </RailPick>
      ))}
      stage={
        <div className="mx-auto max-w-lg">
          <input
            className="field"
            placeholder="Tìm: tuition, học phí…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setWi(0);
            }}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="btn-lime" onClick={() => commit(addLexItems(s, items.slice(0, 20)))}>
              Học 20 từ
            </button>
            <button className="btn-ghost" onClick={() => setDeck((x) => !x)}>
              {deck ? "Thẻ từ" : `Ôn thẻ (${n})`}
            </button>
          </div>
          {deck ? (
            <div className="mt-6">
              <SrsDeck state={s} onDone={commit} />
            </div>
          ) : word ? (
            <>
              <p className="mt-6 text-[11px] uppercase tracking-wider text-lime">
                {q ? `«${q}»` : meta?.vi} · {i + 1}/{items.length}
              </p>
              <div className="mt-3 flex items-start gap-4">
                <WordPic word={word.word} vi={word.vi} pos={word.pos} topic={word.topic} size="sm" className="!h-24 !w-24 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-serif text-3xl leading-none">{word.word}</p>
                    <Hear text={word.word} />
                  </div>
                  <p className="mt-2 text-mute">{word.ipa}</p>
                  <p className="mt-1 text-sm">
                    <span className="text-lime">{POS_VI[word.pos]}</span> · {word.vi}
                  </p>
                </div>
              </div>
              <ExampleLine en={word.example} />
              <div className="mt-1">
                <Hear text={word.example} label="Nghe cả câu" rate={0.88} />
              </div>
              {mnemonicOf(word.word) && (
                <div className="mt-3 rounded-xl border border-lime/30 bg-lime/5 p-3 text-sm">
                  <p className="text-lime">Mẹo nhớ âm điệu: «{mnemonicOf(word.word)!.sound}»</p>
                  <p className="mt-0.5 text-mute">{mnemonicOf(word.word)!.img}</p>
                  <p className="mt-1 text-[11px] text-mute">Mẹo liên tưởng để nhớ — đọc đúng theo IPA.</p>
                </div>
              )}
              <div className="mt-6 flex items-center justify-between gap-3">
                <button className="btn-ghost" disabled={i <= 0} onClick={() => setWi(i - 1)}>
                  Trước
                </button>
                <button className="btn-ghost" disabled={i >= items.length - 1} onClick={() => setWi(i + 1)}>
                  Sau
                </button>
              </div>
            </>
          ) : (
            <p className="mt-6 text-mute">Không có từ.</p>
          )}
        </div>
      }
    />
  );
}
