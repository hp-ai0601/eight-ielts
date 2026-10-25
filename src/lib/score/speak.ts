import { checkText } from "@/lib/zang/check";
import { clampBand } from "@/lib/ielts";

/** Đánh giá nhanh speaking transcript dựa trên 4 tiêu chí IELTS: FC, LR, GRA, Pron.
 *  Không thay thế giám khảo người. */

export type SpeakMark = {
  fc: number; // Fluency & Coherence
  lr: number; // Lexical Resource
  gra: number; // Grammatical Range & Accuracy
  pron: number; // Pronunciation
  band: number;
  notes: string[];
  seconds?: number;
  words: number;
  heard?: string;
};

const FILLER = /\b(uhm+|uh|um|erm|ah|like,|you know|so yeah|kind of|sort of|i mean|well,|basically,|actually,)\b/gi;
const DISCOURSE = /\b(first(ly)?|second(ly)?|finally|moreover|however|on the other hand|for example|such as|because|therefore|in addition|another reason|the main reason|as a result|to sum up)\b/gi;
const RANGE = /\b(noticeable|considerable|gradually|significantly|convenient|essential|contribute|fascinating|memorable|negotiate|preference|demanding|enthusiastic|influential|spacious|approximately|controversial|sustainable|infrastructure|demographic)\b/gi;
const COLL = /\b(make a decision|take into account|pay attention|catch up|keep in touch|come up with|look forward to|get on with|run out of|find out|figure out|take up|give up|turn out|put up with|make up for|make sense)\b/gi;
const TRAPS: { re: RegExp; tip: string }[] = [
  { re: /\b(tree|tank|tank you)\b/i, tip: "think / thank / three: âm /θ/ phải thổi hơi qua kẽ răng, không đọc thành /t/." },
  { re: /\b(dis|dat|de )\b/i, tip: "this / that / the: âm /ð/ — đặt đầu lưỡi chạm răng cửa." },
  { re: /\b(sip|sheet)\b/i, tip: "Phân biệt ship / sheep, sit / seat — một bên nguyên âm ngắn, một bên dài." },
  { re: /\b(liff|lif )\b/i, tip: "Phân biệt live / leave — nhớ kéo rõ âm cuối /v/." },
];
const PHONETIC_TRAP = /\b(thought|though|through|throughout|schedule|receipt|island|colonel|sword|cupboard|queue|vehicle|subtle|debt|doubt|psychology|phlegm|knight|recipe|column|autumn|handkerchief)\b/gi;
const COMMON_TRAP = /\b(bussiness|enviroment|goverment|occur|occured|successfull|beautifull|recomend|accomodation|definately|seperate|occation|pronounciation|opertunity|comming|begining|truely|untill)\b/gi;
const VELAR_NG = /\b(singin|thinkin|runnin|workin|goin|doin|talkin|walkin|eatin|sleepin|readin|watchin)\b/gi;
const FINAL_CONS = /\b(goin\b|comin\b|runnin\b|doin\b|seein\b|thinkin\b|eatin\b)/gi;

function overlap(a: string, b: string) {
  const A = new Set(a.toLowerCase().split(/\s+/).filter((w) => w.length > 2));
  const B = b.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  if (!B.length) return 0;
  return B.filter((w) => A.has(w)).length / B.length;
}

export function scoreSpeak(heard: string, cueOrSeconds?: string | number, seconds?: number): SpeakMark {
  const t = heard.trim();
  const words = t ? t.split(/\s+/).filter((w) => /[a-z]/i.test(w)).length : 0;
  const notes: string[] = [];

  const cue: string | undefined = typeof cueOrSeconds === "string" ? cueOrSeconds : undefined;
  const secs: number | undefined = typeof cueOrSeconds === "number" ? cueOrSeconds : seconds;

  let fc = 4;
  if (words >= 120 && secs && secs <= 120) fc += 1.5;
  else if (words >= 80 && secs && secs <= 120) fc += 1;
  else if (words >= 60) fc += 0.5;
  else if (words === 0) fc = 0;
  else notes.push("Nên nói dài hơn nữa — Part 2 cần khoảng 90–120 giây.");

  const fillerCount = t.match(FILLER)?.length ?? 0;
  const fillerRatio = words ? fillerCount / words : 0;
  if (fillerRatio < 0.04) fc += 0.5;
  else notes.push("Hãy giảm các từ đệm (um, like, you know) — hít một hơi trước khi trả lời.");
  if (fillerRatio > 0.12) {
    fc -= 1;
    notes.push("Từ đệm đang quá nhiều — tập ngừng lặng 1 giây thay vì nói um.");
  }

  const discourse = t.match(DISCOURSE)?.length ?? 0;
  if (discourse >= 2) fc += 0.5;
  else notes.push("Nên dùng từ nối ý rõ ràng: first, another reason, for example, therefore.");
  fc = clampBand(fc);

  let lr = 4;
  const uniq = new Set(t.toLowerCase().split(/\s+/).filter((w) => w.length > 4));
  const ratio = words ? uniq.size / words : 0;
  if (ratio > 0.35) lr += 0.5;
  if ((t.match(RANGE)?.length ?? 0) >= 3) lr += 1;
  else if ((t.match(RANGE)?.length ?? 0) >= 1) lr += 0.5;
  if ((t.match(COLL)?.length ?? 0) >= 2) lr += 0.5;
  if (cue && overlap(t, cue) > 0.5) {
    lr -= 0.5;
    notes.push("Đừng đọc lại y nguyên câu hỏi — hãy diễn đạt lại bằng lời của mình.");
  }
  if (COMMON_TRAP.test(t)) {
    lr -= 0.5;
    notes.push("Cẩn thận những từ hay bị đọc theo chữ viết: environment, government, accommodation, successful.");
  }
  lr = clampBand(lr);

  let gra = 4;
  const check = t ? checkText(t) : { score: 0, spelling: [], grammar: [], rewrite: "", clean: false };
  gra = clampBand(4 + check.score / 2.5);
  if (check.grammar[0]) notes.push(check.grammar[0].vi);
  const complex = /\b(which|although|because|while|whereas|if|who|that|despite|unless|provided that|even though)\b/gi;
  const complexCount = t.match(complex)?.length ?? 0;
  if (complexCount >= 2) gra += 1;
  else if (complexCount >= 1) gra += 0.5;
  const tenses = /\b(have been|has been|had been|will be|would be|used to|am going to|is going to|were going to)\b/gi;
  if (tenses.test(t)) gra += 0.5;
  const basicError = /\b\w+\s+(?:is|are|was|were)\s+(?:go|went|eat|ate|take|took|write|wrote|read|come|came|give|gave|do|did|make|made)\b/gi;
  if (basicError.test(t)) {
    gra -= 1;
    notes.push("Lỗi cấu trúc be + động từ — hãy dùng be + V-ing hoặc chia đúng thì.");
  }
  gra = clampBand(gra);

  let pron = 4;
  if (VELAR_NG.test(t)) {
    pron -= 0.5;
    notes.push("Âm cuối /ŋ/ đang bị nuốt: singing đọc là /ˈsɪŋɪŋ/, không phải singin.");
  }
  if (FINAL_CONS.test(t)) {
    pron -= 0.5;
    notes.push("Nhớ đọc rõ phụ âm cuối: -ed, -s, -t, -k, -d.");
  }
  for (const x of TRAPS) {
    if (x.re.test(t)) {
      pron -= 0.5;
      notes.push(x.tip);
    }
  }
  if (PHONETIC_TRAP.test(t)) {
    pron += 0.5;
    notes.push("Các từ dễ đọc sai: though /ðəʊ/, through /θruː/, schedule /ˈʃedjuːl/, receipt /rɪˈsiːt/.");
  }
  const finals = (t.match(/\b\w+[tksd]\b/gi) ?? []).length;
  if (words > 30 && finals < 4) {
    pron -= 0.5;
    notes.push("Nhớ đọc rõ phụ âm cuối: want, liked, bags — nuốt âm cuối là mất điểm Pronunciation.");
  }
  const vietnameseMonotone = /^[a-z\s]+$/i.test(t) && (t.match(/[.!?]/g) ?? []).length < words / 25;
  if (vietnameseMonotone && words > 10) {
    pron -= 0.5;
    notes.push("Giọng đang hơi đều — hãy nhấn giọng ở chủ ngữ và trạng ngữ, hạ giọng xuống ở cuối câu.");
  }
  pron = clampBand(pron);

  const band = clampBand((fc + lr + gra + pron) / 4);
  if (!notes.length) notes.push("Máy chỉ chấm thử — muốn chính xác cần thầy nghe trực tiếp trọng âm, nối âm và từng âm tiết.");
  return { fc, lr, gra, pron, band, notes: notes.slice(0, 8), words, seconds: secs, heard: t };
}

export function listenOnce(): Promise<string> {
  return new Promise((resolve, reject) => {
    const SR = (window as unknown as { webkitSpeechRecognition?: new () => SpeechRec; SpeechRecognition?: new () => SpeechRec }).webkitSpeechRecognition
      || (window as unknown as { SpeechRecognition?: new () => SpeechRec }).SpeechRecognition;
    if (!SR) {
      reject(new Error("Trình duyệt này không nhận giọng nói — em gõ lại lời mình nói, hoặc dùng Chrome nhé."));
      return;
    }
    const rec = new SR();
    rec.lang = "en-GB";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: { results: { 0: { 0: { transcript: string } } } }) => resolve(e.results[0][0].transcript);
    rec.onerror = () => reject(new Error("Máy không nghe được — em kiểm tra lại quyền micro nhé."));
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
