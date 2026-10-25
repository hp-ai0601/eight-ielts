import { CLASS_WORDS } from "@/lib/zang/content";
import { LEXICON } from "@/lib/lexicon";
import { MNEMONICS, mnemonicOf, type Mnemonic } from "@/lib/mnemonic";

export type Gloss = { word: string; vi: string; ipa?: string; mn?: Mnemonic };

const CLASS_MAP = new Map(CLASS_WORDS.map((w) => [w.word.toLowerCase(), w]));

/** Nghĩa Việt cho cụm nhiều từ có mẹo riêng (không có trong CLASS_WORDS). */
const PHRASE_VI: Record<string, string> = {
  "boxed meal": "suất ăn đóng hộp (cơm hộp)",
  "lunch box": "hộp cơm trưa",
};

/** Nghĩa cho từ có mẹo nhớ nhưng chưa có trong CLASS_WORDS/LEXICON. */
const EXTRA_VI: Record<string, string> = {
  tiny: "nhỏ xíu, tí hon",
  cucumber: "dưa chuột",
  chubby: "mũm mĩm",
  serious: "nghiêm túc",
  nervous: "lo lắng, hồi hộp",
  brave: "dũng cảm",
  friendly: "thân thiện",
  polite: "lễ phép",
  jacket: "áo khoác",
  glasses: "kính mắt",
  smile: "nụ cười",
  seat: "chỗ ngồi",
  homework: "bài tập về nhà",
  gate: "cổng",
  share: "chia sẻ",
  wait: "chờ đợi",
  forget: "quên",
  bring: "mang theo",
  delicious: "ngon",
  beautiful: "xinh đẹp",
  important: "quan trọng",
  remember: "ghi nhớ",
  difficult: "khó",
  breakfast: "bữa sáng",
  dinner: "bữa tối",
  weather: "thời tiết",
  together: "cùng nhau",
  because: "bởi vì",
};

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Tìm các từ/cụm đáng dịch trong câu truyện: cụm có mẹo → từ lớp → từ kho (dài > 4). */
export function glossIn(en: string, max = 8): Gloss[] {
  const words = en
    .replace(/[“”«»"'’‘?!.,;:()]/g, " ")
    .split(/\s+/)
    .map((w) => w.toLowerCase().replace(/'s$/, ""))
    .filter(Boolean);
  const out: Gloss[] = [];
  const seen = new Set<string>();

  // 1) cụm nhiều từ có mẹo riêng (boxed meal, lunch box…)
  for (const key of Object.keys(MNEMONICS)) {
    if (!key.includes(" ")) continue;
    if (new RegExp(`\\b${esc(key)}\\b`, "i").test(en)) {
      seen.add(key);
      for (const part of key.split(" ")) seen.add(part);
      out.push({ word: key, vi: PHRASE_VI[key] ?? key, mn: MNEMONICS[key] });
      if (out.length >= max) return out;
    }
  }
  // 2) từ lớp
  for (const w of words) {
    if (seen.has(w)) continue;
    const c = CLASS_MAP.get(w);
    if (c) {
      seen.add(w);
      out.push({ word: c.word, vi: c.vi, ipa: c.ipa, mn: mnemonicOf(c.word) });
      if (out.length >= max) return out;
    }
  }
  // 3) từ có mẹo nhớ riêng (chưa có ở nguồn nào)
  for (const w of words) {
    if (seen.has(w)) continue;
    if (EXTRA_VI[w] && MNEMONICS[w]) {
      seen.add(w);
      out.push({ word: w, vi: EXTRA_VI[w], mn: MNEMONICS[w] });
      if (out.length >= max) return out;
    }
  }
  // 4) từ trong kho 3500
  for (const w of words) {
    if (seen.has(w) || w.length < 4) continue;
    const hit = LEXICON.find((x) => x.word.toLowerCase() === w);
    if (hit) {
      seen.add(w);
      out.push({ word: hit.word, vi: hit.vi, ipa: hit.ipa, mn: mnemonicOf(hit.word) });
      if (out.length >= max) return out;
    }
  }
  return out;
}

/** Chèn (nghĩa Việt) ngay sau từ vựng trong câu — chỉ lần xuất hiện đầu tiên của mỗi từ. */
export function glossInline(en: string): string {
  const gs = glossIn(en);
  // chèn cụm dài trước để không bị từ đơn chèn đè
  const ordered = [...gs].sort((a, b) => b.word.length - a.word.length);
  let out = en;
  for (const g of ordered) {
    const re = new RegExp(`\\b${esc(g.word)}\\b`, "i");
    out = out.replace(re, (m) => `${m} (${g.vi})`);
  }
  return out;
}
