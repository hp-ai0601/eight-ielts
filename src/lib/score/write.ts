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

const LINK = /\b(however|therefore|because|although|whereas|while|overall|in contrast|for example|as a result|furthermore|meanwhile)\b/gi;
const OVERVIEW = /\b(overall|in general|it is clear that|the most (?:striking|noticeable)|the largest|the smallest|rose|fell|increased|decreased)\b/i;
const POSITION = /\b(i (?:agree|disagree|believe|argue|think)|this essay|in my view|the main reason|on balance)\b/i;
const HEDGE = /\b(may|might|tend to|appear to|in some cases|not necessarily|to some extent)\b/i;
const ABSOLUTE = /\b(definitely|obviously|everyone knows|all people|always|never|in today's (?:modern )?society)\b/i;

export function scoreWriting(text: string, min: number, kind: "t1" | "t2" | "diary" = "t2"): WriteMark {
  const t = text.trim();
  const words = t ? t.split(/\s+/).length : 0;
  const paras = t.split(/\n\s*\n/).filter((p) => p.trim().length > 40).length || (words > 80 ? 1 : 0);
  const check = t ? checkText(t) : { score: 0, spelling: [], grammar: [], rewrite: "", clean: false };
  const notes: string[] = [];

  let ta = 5;
  if (words >= min) ta += 1;
  else notes.push(`Thiếu từ: ${words}/${min}. Academic Task ${kind === "t1" ? "1 = 150" : "2 = 250"}.`);
  if (kind === "t1" && OVERVIEW.test(t)) ta += 1;
  else if (kind === "t1") notes.push("Task 1 cần overview (overall / nét lớn), không nhồi số ở câu 2.");
  if (kind === "t2" && POSITION.test(t)) ta += 1;
  else if (kind === "t2") notes.push("Task 2: nêu lập trường ngay intro — không ‘I will discuss both sides’ rồi biến.");
  if (kind === "t1" && /\bI think\b/i.test(t)) {
    ta -= 0.5;
    notes.push("Task 1 không nêu ý kiến.");
  }
  ta = clampBand(ta);

  let cc = 5;
  if (paras >= (kind === "diary" ? 1 : 3)) cc += 1;
  else notes.push("Chia đoạn: intro / overview hoặc lập trường / thân / kết.");
  const links = t.match(LINK)?.length ?? 0;
  if (links >= 3) cc += 1;
  else notes.push("Nối ý: however / whereas / as a result — vừa đủ, không mỗi câu một however.");
  if (links > words / 18) {
    cc -= 0.5;
    notes.push("Từ nối quá dày — CC band 6 hay vỡ chỗ này.");
  }
  cc = clampBand(cc);

  let lr = 5;
  const uniq = new Set(t.toLowerCase().split(/\s+/).filter((w) => w.length > 4));
  if (uniq.size > words * 0.35) lr += 0.5;
  if (HEDGE.test(t) && kind !== "t1") lr += 0.5;
  if (ABSOLUTE.test(t)) {
    lr -= 0.5;
    notes.push("Bỏ definitely / everyone knows / in today's society.");
  }
  if (check.spelling.length) {
    lr -= Math.min(1, check.spelling.length * 0.25);
    notes.push(`Chính tả: ${check.spelling.slice(0, 4).map((x) => x.from).join(", ")}.`);
  }
  lr = clampBand(lr);

  let gra = clampBand(4 + check.score / 2.5);
  if (check.grammar[0]) notes.push(check.grammar[0].vi);
  if (!/\b(which|although|if|because|while)\b/i.test(t) && words > 80) {
    gra = clampBand(gra - 0.5);
    notes.push("Thêm câu phức sạch (although / which / if) — GRA 7 cần range.");
  }

  const band = clampBand((ta + cc + lr + gra) / 4);
  if (!notes.length) notes.push("Máy chỉ ước. Thầy Hiệp chấm 4 ô mới ra band luyện.");
  return { ta, cc, lr, gra, band, notes: notes.slice(0, 6), words };
}
