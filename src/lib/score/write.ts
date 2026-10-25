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
  else notes.push(`Bài còn thiếu từ: ${words}/${min}. Task ${kind === "t1" ? "1 cần ít nhất 150" : "2 cần ít nhất 250"} từ.`);

  if (kind === "t1") {
    if (OVERVIEW.test(t)) ta += 1.5;
    else notes.push("Task 1 cần một câu overview nêu nét nổi bật nhất — đừng dồn số liệu ngay từ đầu bài.");
    if (!FIRST_PERSON_TASK1.test(t)) ta += 0.5;
    else {
      ta -= 0.5;
      notes.push("Task 1 chỉ tả số liệu, không nêu ý kiến cá nhân (I think…).");
    }
  } else if (kind === "t2") {
    if (POSITION.test(t)) ta += 1;
    else notes.push("Task 2 nên nêu rõ lập trường ngay trong mở bài — đừng chỉ viết “I will discuss both sides” rồi thôi.");
    if (paras >= 4) ta += 0.5;
    if (EXAMPLE.test(t)) ta += 0.5;
    if (CONCLUSION.test(t)) ta += 0.5;
    else notes.push("Bài còn thiếu một câu kết luận ngắn ở cuối.");
  } else {
    if (words >= 30) ta += 1;
    if (words >= 60) ta += 1;
  }
  ta = clampBand(ta);

  let cc = 4;
  const targetParas = kind === "diary" ? 1 : kind === "t1" ? 3 : 4;
  if (paras >= targetParas) cc += 1.5;
  else notes.push(`Nên chia bài thành khoảng ${targetParas} đoạn (mở bài / thân bài / kết luận).`);
  const links = t.match(LINK)?.length ?? 0;
  if (links >= 3) cc += 1;
  else notes.push("Nên dùng thêm từ nối ý như however / whereas / as a result / furthermore — ở mức vừa đủ.");
  if (links > words / 15) {
    cc -= 0.5;
    notes.push("Từ nối đang dùng quá dày — bài band 6 rất hay mất điểm CC ở chỗ này.");
  }
  if (kind === "t2" && !EXAMPLE.test(t)) {
    cc -= 0.5;
    notes.push("Mỗi ý nên có ví dụ cụ thể (người, nơi chốn, thời gian, con số).");
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
    notes.push("Nên bỏ những từ nói tuyệt đối kiểu definitely / everyone knows / in today's society / always / never.");
  }
  const academicVerbs = /\b(increase|decrease|rise|fall|decline|fluctuate|remain|constitute|account for|contribute to|lead to|result in|stem from|exacerbate|alleviate|implement|investigate|demonstrate|illustrate|indicate|suggest|argue|claim|acknowledge)\b/gi;
  if ((t.match(academicVerbs)?.length ?? 0) >= 3) lr += 0.5;
  if (check.spelling.length) {
    lr -= Math.min(1.5, check.spelling.length * 0.25);
    notes.push(`Lỗi chính tả: ${check.spelling.slice(0, 4).map((x) => x.from).join(", ")}.`);
  }
  lr = clampBand(lr);

  let gra = clampBand(4 + check.score / 2.5);
  if (check.grammar[0]) notes.push(check.grammar[0].vi);
  const complex = /\b(which|although|if|because|while|whereas|who|whose|that|despite|in spite of|provided that|unless)\b/gi;
  const complexCount = t.match(complex)?.length ?? 0;
  if (complexCount >= 2 && words > 80) gra += 0.5;
  if (!complex.test(t) && words > 80) {
    gra = clampBand(gra - 0.5);
    notes.push("Nên thêm câu phức (although / which / if / while) — muốn GRA 7 trở lên thì câu phải đa dạng hơn.");
  }
  if (/\b(am|is|are|was|were)\s+(go|went|eat|ate|take|took|write|wrote|read|come|came)\b/i.test(t)) {
    gra = clampBand(gra - 0.5);
    notes.push("Lỗi be + động từ nguyên mẫu/quá khứ. Hãy dùng be + V-ing, hoặc bỏ be rồi chia thì cho động từ.");
  }
  gra = clampBand(gra);

  const band = clampBand((ta + cc + lr + gra) / 4);
  if (!notes.length) notes.push("Máy chỉ chấm thử — band chính xác vẫn do thầy Hiệp chấm.");
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
    notes.unshift("Câu quá ngắn — hãy viết đủ chủ ngữ, động từ và tân ngữ.");
  }
  if (!new RegExp(`\\b${targetWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text)) {
    band = Math.min(band, 5);
    notes.unshift(`Câu chưa dùng từ “${targetWord}”.`);
  }
  return { band: clampBand(band), score: check.score, notes: notes.slice(0, 5), clean: check.clean, rewrite: check.rewrite };
}
