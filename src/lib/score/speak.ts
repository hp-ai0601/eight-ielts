import { checkText } from "@/lib/zang/check";
import { clampBand } from "@/lib/ielts";

export type SpeakMark = {
  fc: number;
  lr: number;
  gra: number;
  pron: number;
  band: number;
  notes: string[];
  heard: string;
};

const FILLER = /\b(um+|uh+|er+|like,|you know)\b/gi;
const TRAPS: { re: RegExp; tip: string }[] = [
  { re: /\b(tree|tank|tank you)\b/i, tip: "think / thank / three: /θ/ thổi hơi, không /t/." },
  { re: /\b(dis|dat|de )\b/i, tip: "this / that / the: /ð/, lưỡi chạm răng." },
  { re: /\b(sip|sheet)\b/i, tip: "ship / sheep, sit / seat — nguyên âm dài." },
  { re: /\b(liff|lif )\b/i, tip: "live / leave; kéo phụ âm cuối /v/." },
];

function overlap(a: string, b: string) {
  const A = new Set(a.toLowerCase().split(/\s+/).filter((w) => w.length > 2));
  const B = b.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  if (!B.length) return 0;
  return B.filter((w) => A.has(w)).length / B.length;
}

export function scoreSpeak(heard: string, cue?: string, seconds?: number): SpeakMark {
  const t = heard.trim();
  const words = t ? t.split(/\s+/).length : 0;
  const check = t ? checkText(t) : { score: 0, spelling: [], grammar: [], rewrite: "", clean: false };
  const notes: string[] = [];
  const fillers = t.match(FILLER)?.length ?? 0;

  let fc = 5;
  if (words >= 40) fc += 1;
  else notes.push("Part 2 cần gần 2 phút, khoảng 150–180 từ nói. Giờ còn ngắn.");
  if (fillers > 4) {
    fc -= 0.5;
    notes.push("Bớt um/uh — ngừng vì nghĩ ý, đừng vì tìm từ.");
  }
  if (seconds && seconds >= 90) fc += 0.5;
  fc = clampBand(fc);

  let lr = 5;
  const uniq = new Set(t.toLowerCase().split(/\s+/).filter((w) => w.length > 4));
  if (uniq.size > 20) lr += 0.5;
  if (cue && overlap(t, cue) > 0.5) {
    lr -= 0.5;
    notes.push("Đừng đọc lại cue. Paraphrase.");
  }
  lr = clampBand(lr);

  let gra = clampBand(4 + check.score / 2.5);
  if (check.grammar[0]) notes.push(check.grammar[0].vi);

  let pron = 6;
  for (const x of TRAPS) {
    if (x.re.test(t)) {
      pron -= 0.5;
      notes.push(x.tip);
    }
  }
  if (/\b(go|eat|live|want)\s+(to|in|at)\b/i.test(t) && /\bam go\b/i.test(t)) {
    pron -= 0.5;
  }
  const finals = (t.match(/\b\w+[tksd]\b/gi) ?? []).length;
  if (words > 30 && finals < 4) {
    pron -= 0.5;
    notes.push("Kéo phụ âm cuối: want, liked, bags — giám khảo mất điểm Pron vì nuốt.");
  }
  pron = clampBand(pron);

  const band = clampBand((fc + lr + gra + pron) / 4);
  if (!notes.length) notes.push("Máy nghe bằng nhận dạng giọng. Accent không trừ nếu giám khảo hiểu. Thầy chấm Pron mới chắc.");
  return { fc, lr, gra, pron, band, notes: notes.slice(0, 6), heard: t };
}

export function listenOnce(): Promise<string> {
  return new Promise((resolve, reject) => {
    const SR = (window as unknown as { webkitSpeechRecognition?: new () => SpeechRec; SpeechRecognition?: new () => SpeechRec }).webkitSpeechRecognition
      || (window as unknown as { SpeechRecognition?: new () => SpeechRec }).SpeechRecognition;
    if (!SR) {
      reject(new Error("Trình duyệt không nhận giọng. Gõ lại lời nói, hoặc dùng Chrome."));
      return;
    }
    const rec = new SR();
    rec.lang = "en-GB";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: { results: { 0: { 0: { transcript: string } } } }) => resolve(e.results[0][0].transcript);
    rec.onerror = () => reject(new Error("Không nghe được. Cho phép micro."));
    rec.onend = () => undefined;
    rec.start();
  });
}

type SpeechRec = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((e: { results: { 0: { 0: { transcript: string } } } }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
};
