"use client";

import { useEffect, useState } from "react";
import { useEight } from "@/lib/useEight";
import { addLexItems } from "@/lib/store";
import { lexSearch, type LexItem } from "@/lib/lexicon";
import { POS_VI } from "@/lib/pos";
import { mnemonicOf } from "@/lib/mnemonic";
import Studio from "@/components/Studio";
import Hear from "@/components/Hear";
import WordPic from "@/components/WordPic";
import ExampleLine from "@/components/ExampleLine";
import AccentPick from "@/components/AccentPick";
import PronCheck from "@/components/PronCheck";

type ApiMeaning = {
  partOfSpeech: string;
  definitions: { definition: string; example?: string }[];
};
type ApiEntry = {
  word: string;
  phonetic?: string;
  phonetics: { text?: string; audio?: string }[];
  meanings: ApiMeaning[];
};

function DictCard({ item, onAdd }: { item: LexItem; onAdd: () => void }) {
  const mn = mnemonicOf(item.word);
  return (
    <div className="panel p-5">
      <div className="flex items-start gap-4">
        <WordPic word={item.word} vi={item.vi} pos={item.pos} topic={item.topic} size="sm" className="!h-20 !w-20 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-serif text-3xl">{item.word}</p>
            <Hear text={item.word} />
          </div>
          <p className="mt-1 text-mute">{item.ipa}</p>
          <p className="mt-1 text-sm">
            <span className="text-lime">{POS_VI[item.pos]}</span> · {item.vi}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <ExampleLine en={item.example} />
        <div className="mt-1 flex items-center gap-2">
          <Hear text={item.example} label="Nghe câu" rate={0.88} />
        </div>
      </div>
      {mn && (
        <div className="mt-3 rounded-xl border border-lime/30 bg-lime/5 p-3 text-sm">
          <p className="text-lime">Mẹo nhớ âm điệu: «{mn.sound}»</p>
          <p className="mt-0.5 text-mute">{mn.img}</p>
          <p className="mt-1 text-[11px] text-mute">Mẹo liên tưởng để nhớ — không phải cách đọc chuẩn. Đọc đúng theo IPA ở trên.</p>
        </div>
      )}
      <div className="mt-4">
        <PronCheck text={item.word} />
      </div>
      <button className="btn-lime mt-4" onClick={onAdd}>
        Thêm vào thẻ ôn
      </button>
    </div>
  );
}

export default function DictPage() {
  const { s, commit, ready } = useEight();
  const [q, setQ] = useState("");
  const [local, setLocal] = useState<LexItem[]>([]);
  const [api, setApi] = useState<ApiEntry[] | null>(null);
  const [apiErr, setApiErr] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = q.trim();
    if (!t) {
      setLocal([]);
      setApi(null);
      setApiErr(false);
      return;
    }
    setLocal(lexSearch(t).slice(0, 30));
    setLoading(true);
    setApiErr(false);
    const h = setTimeout(async () => {
      if (!/^[a-zA-Z' -]+$/.test(t)) {
        setLoading(false);
        return;
      }
      try {
        const r = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(t.toLowerCase())}`);
        if (!r.ok) throw new Error("nf");
        setApi(await r.json());
      } catch {
        setApi(null);
        setApiErr(true);
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(h);
  }, [q]);

  if (!ready || !s) return null;

  return (
    <Studio
      title="Từ điển"
      kicker="Tra Anh–Việt · nghe · luyện nói"
      next={{ href: "/kho", label: "Kho" }}
      stage={
        <div className="mx-auto max-w-lg">
          <input
            className="field"
            autoFocus
            placeholder="Gõ từ tiếng Anh hoặc tiếng Việt: tiny, đói bụng…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <AccentPick compact />
          </div>
          {!q.trim() && (
            <p className="mt-6 text-sm text-mute">
              Tra 3500 từ trong kho (có nghĩa Việt, IPA, ví dụ) và từ điển mở bên ngoài. Gõ tiếng Việt để tìm ngược sang tiếng Anh.
            </p>
          )}
          <div className="mt-5 space-y-4">
            {local.map((x) => (
              <DictCard key={x.word} item={x} onAdd={() => commit(addLexItems(s, [x]))} />
            ))}
            {loading && <p className="text-sm text-mute">Đang tra thêm nguồn ngoài…</p>}
            {api?.map((e) => (
              <div key={e.word} className="panel p-5">
                <div className="flex items-center justify-between">
                  <p className="font-serif text-2xl">{e.word}</p>
                  <Hear text={e.word} />
                </div>
                {e.phonetic && <p className="mt-0.5 text-mute">{e.phonetic}</p>}
                <p className="mt-1 text-[11px] uppercase tracking-wider text-mute">Từ điển mở (định nghĩa tiếng Anh)</p>
                {e.meanings.slice(0, 3).map((m, i) => (
                  <div key={i} className="mt-3">
                    <p className="text-sm font-semibold text-lime">{m.partOfSpeech}</p>
                    <ul className="mt-1 space-y-1.5 text-sm">
                      {m.definitions.slice(0, 3).map((d, j) => (
                        <li key={j}>
                          <p>{d.definition}</p>
                          {d.example && <p className="text-xs text-mute">“{d.example}”</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
            {apiErr && !local.length && q.trim() && !loading && (
              <p className="text-sm text-mute">Không tìm thấy «{q.trim()}». Thử từ gần nghĩa hoặc kiểm tra chính tả.</p>
            )}
          </div>
        </div>
      }
    />
  );
}
