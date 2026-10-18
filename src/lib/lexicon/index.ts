import pack1 from "./pack1.json";
import pack2 from "./pack2.json";
import pack3 from "./pack3.json";
import pack4 from "./pack4.json";
import { LEX_TOPICS } from "./catalog";
import type { VocabItem } from "@/lib/content/types";
import { guessPos, POS_VI, type Pos } from "@/lib/pos";

export type LexItem = {
  word: string;
  ipa: string;
  vi: string;
  example: string;
  topic: string;
  pos: Pos;
};

type RawLex = Omit<LexItem, "pos"> & { pos?: Pos };

const RAW_SRC = [...pack1, ...pack2, ...pack3, ...pack4] as RawLex[];

function withPos(x: RawLex): LexItem {
  return { ...x, pos: x.pos ?? guessPos(x.word, x.vi, x.example) };
}

const RAW = RAW_SRC.map(withPos);

/** Unique by word (keep first topic). 100 chủ đề, ≥3500 từ. */
export const LEXICON: LexItem[] = (() => {
  const seen = new Set<string>();
  const out: LexItem[] = [];
  for (const x of RAW) {
    const k = x.word.trim().toLowerCase();
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(x);
  }
  return out;
})();

export function lexByTopic(topic: string) {
  return RAW.filter((x) => x.topic === topic);
}

export function lexSearch(q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return LEXICON.filter(
    (x) =>
      x.word.toLowerCase().includes(s) ||
      x.vi.toLowerCase().includes(s) ||
      x.example.toLowerCase().includes(s) ||
      POS_VI[x.pos].includes(s),
  ).slice(0, 80);
}

export function lexAsVocab(items: LexItem[]): VocabItem[] {
  return items.map((x) => ({
    id: `lex-${x.topic}-${x.word}`,
    word: x.word,
    ipa: x.ipa,
    vi: x.vi,
    example: x.example,
    topic: x.topic,
    pos: x.pos,
  }));
}

export { LEX_TOPICS };
export const LEX_COUNT = LEXICON.length;
