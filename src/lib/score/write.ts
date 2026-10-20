import { checkText } from "@/lib/zang/check";
import { clampBand } from "@/lib/ielts";

/** Ước lượng máy theo 4 tiêu chí IELTS (TA/TR, CC, LR, GRA). Không thay giám khảo. */

export type WriteMark = {
  ta: number;
  cc: number;
  lr: number;
  gra: number;
  band: number;
  notes: string[];
  words: number;
};

const LINK = /\b(however|therefore|because|although|whereas|while|overall|in contrast|for example|as a result|furthermore|moreover|meanwhile|nevertheless|consequently|in addition|on the other hand|in conclusion|to sum up)\b/gi;
const OVERVIEW = /\b(overall|in general|it is clear that|the most (?:striking|noticeable)|the largest|the smallest|rose|fell|increased|decreased|remained|fluctuated|peaked|plunged|soared)\b/i;
const POSITION = /\b(i (?:agree|disagree|believe|argue|think)|this essay|in my view|the main reason|on balance|i (?:strongly|tend to|partially) (?:agree|disagree))\b/i;
const HEDGE = /\b(may|might|tend to|appear to|in some cases|not necessarily|to some extent|could|would|is likely to)\b/gi;
const ABSOLUTE = /\b(definitely|obviously|everyone knows|all people|always|never|in today's (?:modern )?society|in the modern world|nowadays)\b/gi;
const EXAMPLE = /\b(for example|for instance|such as|like|take|consider)\b/i;
const CONCLUSION = /\b(in conclusion|to conclude|in summary|to sum up)\b/i;
const FIRST_PERSON_TASK1 = /\b(I think|I believe|In my opinion|I would say)\b/i;

export function scoreWriting(text: string, min: number, kind: "t1" | "t2" | "diary" = "t2"): WriteMark {
  const t = text.trim();
  const words = t ? t.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w)).length : 0;
  const rawParas = t.split(/\n\s*\n/).filter((p) => p.trim().length > 20);
  const paras = rawParas.length || (words > 80 ? 1 : 0);
  const check = t ? checkText(t) : { score: 0, spelling: [], grammar: [], rewrite: "", clean: false };
  const notes: string[] = [];

  let ta = 4;
  if (words >= min) ta += 1.5;
  else notes.push(`Thiếu từ: ${words}/${min}. Academic Task ${kind === "t1" ? "1 = 150" : "2 = 250"}.`);

  if (kind === "t1") {
    if (OVERVIEW.test(t)) ta += 1.5;
    else notes.push("Task 1 cần overview (overall / nét lớn), không nhồi số ở câu 2.");
    if (!FIRST_PERSON_TASK1.test(t)) ta += 0.5;
    else {
      ta -= 0.5;
      notes.push("Task 1 không nêu ý kiến cá nhân.");
    }
  } else if (kind === "t2") {
    if (POSITION.test(t)) ta += 1;
    else notes.push("Task 2: nêu lập trường ngay intro — không ‘I will discuss both sides’ rồi biến.");
    if (paras >= 4) ta += 0.5;
    if (EXAMPLE.test(t)) ta += 0.5;
    if (CONCLUSION.test(t)) ta += 0.5;
    else notes.push("Thiếu kết luận ngắn.");
  } else {
    if (words >= 30) ta += 1;
    if (words >= 60) ta += 1;
  }
  ta = clampBand(ta);

  let cc = 4;
  const targetParas = kind === "diary" ? 1 : kind === "t1" ? 3 : 4;
  if (paras >= targetParas) cc += 1.5;
  else notes.push(`Chia đoạn: cần khoảng ${targetParas} đoạn (intro / thân / kết).`);
  const links = t.match(LINK)?.length ?? 0;
  if (links >= 3) cc += 1;
  else notes.push("Nối ý: however / whereas / as a result / furthermore — vừa đủ.");
  if (links > words / 15) {
    cc -= 0.5;
    notes.push("Từ nối quá dày — CC band 6 hay vỡ chỗ này.");
  }
  if (kind === "t2" && !EXAMPLE.test(t)) {
    cc -= 0.5;
    notes.push("Mỗi ý cần ví dụ cụ thể (người, nơi, thời gian, số).");
  }
  cc = clampBand(cc);

  let lr = 4;
  const tokens = t.toLowerCase().split(/\s+/).filter((w) => /[a-z]/.test(w));
  const uniq = new Set(tokens.filter((w) => w.length > 4));
  const ratio = tokens.length ? uniq.size / tokens.length : 0;
  if (ratio > 0.3) lr += 0.5;
  if (ratio > 0.4) lr += 0.5;
  if (HEDGE.test(t) && kind !== "t1") lr += 0.5;
  if (ABSOLUTE.test(t)) {
    lr -= 0.5;
    notes.push("Bỏ definitely / everyone knows / in today's society / always / never.");
  }
  const academicVerbs = /\b(increase|decrease|rise|fall|decline|fluctuate|remain|constitute|account for|contribute to|lead to|result in|stem from|exacerbate|alleviate|implement|investigate|demonstrate|illustrate|indicate|suggest|argue|claim|acknowledge)\b/gi;
  if ((t.match(academicVerbs)?.length ?? 0) >= 3) lr += 0.5;
  if (check.spelling.length) {
    lr -= Math.min(1.5, check.spelling.length * 0.25);
    notes.push(`Chính tả: ${check.spelling.slice(0, 4).map((x) => x.from).join(", ")}.`);
  }
  lr = clampBand(lr);

  let gra = clampBand(4 + check.score / 2.5);
  if (check.grammar[0]) notes.push(check.grammar[0].vi);
  const complex = /\b(which|although|if|because|while|whereas|who|whose|that|despite|in spite of|provided that|unless)\b/gi;
  const complexCount = t.match(complex)?.length ?? 0;
  if (complexCount >= 2 && words > 80) gra += 0.5;
  if (!complex.test(t) && words > 80) {
    gra = clampBand(gra - 0.5);
    notes.push("Thêm câu phức sạch (although / which / if / while) — GRA 7 cần range.");
  }
  if (/\b(am|is|are|was|were)\s+(go|went|eat|ate|take|took|write|wrote|read|come|came)\b/i.test(t)) {
    gra = clampBand(gra - 0.5);
    notes.push("be + V nguyên/V2 sai. Dùng be + V-ing hoặc bỏ be rồi chia thì.");
  }
  gra = clampBand(gra);

  const band = clampBand((ta + cc + lr + gra) / 4);
  if (!notes.length) notes.push("Máy chỉ ước. Thầy Hiệp chấm 4 ô mới ra band luyện.");
  return { ta, cc, lr, gra, band, notes: notes.slice(0, 8), words };
}

/** Chấm câu Zang viết từ từ vựng/ngữ pháp — như thầy chấm bài tập về nhà. */
export function scoreSentence(text: string, targetWord: string, expectTense?: string) {
  const check = checkText(text, [targetWord], expectTense);
  const words = text.trim().split(/\s+/).filter((w) => /[a-z0-9]/i.test(w)).length;
  const notes = [...check.grammar.map((g) => g.vi), ...check.spelling.map((s) => `${s.from} → ${s.to}`)];
  let band = 5;
  if (check.clean) band = 9;
  else if (check.score >= 8) band = 7.5;
  else if (check.score >= 6) band = 6.5;
  else if (check.score >= 4) band = 6;
  else band = 5;
  if (words < 4) {
    band = Math.min(band, 5);
    notes.unshift("Câu quá ngắn — viết đủ chủ ngữ + động từ + tân ngữ.");
  }
  if (!new RegExp(`\\b${targetWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text)) {
    band = Math.min(band, 5);
    notes.unshift(`Câu chưa dùng từ '${targetWord}'.`);
  }
  return { band: clampBand(band), score: check.score, notes: notes.slice(0, 5), clean: check.clean, rewrite: check.rewrite };
}
