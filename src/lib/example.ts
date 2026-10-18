import { LEXICON } from "@/lib/lexicon";
import { ANTONYMS, CLASS_WORDS } from "@/lib/zang/content";

const FUNC: Record<string, string> = {
  a: "một",
  an: "một",
  the: "",
  i: "tôi",
  "i'm": "tôi",
  me: "tôi",
  my: "của tôi",
  mine: "của tôi",
  you: "bạn",
  your: "của bạn",
  he: "cậu ấy",
  she: "cô ấy",
  it: "nó",
  we: "chúng tôi",
  they: "họ",
  them: "họ",
  him: "cậu ấy",
  her: "cô ấy",
  his: "của cậu ấy",
  their: "của họ",
  our: "của chúng tôi",
  this: "cái này",
  that: "cái kia",
  these: "những cái này",
  those: "những cái kia",
  there: "có / ở đó",
  here: "ở đây",
  is: "thì / là",
  am: "thì / là",
  are: "thì / là",
  was: "đã",
  were: "đã",
  be: "là",
  been: "đã",
  being: "đang",
  have: "có / have",
  has: "có",
  had: "đã có",
  do: "làm",
  does: "làm",
  did: "đã",
  done: "xong",
  will: "sẽ",
  would: "sẽ",
  can: "có thể",
  could: "có thể",
  should: "nên",
  must: "phải",
  may: "có thể",
  might: "có thể",
  not: "không",
  no: "không",
  and: "và",
  but: "nhưng",
  or: "hoặc",
  so: "nên",
  because: "vì",
  if: "nếu",
  when: "khi",
  while: "trong khi",
  whereas: "trong khi",
  yet: "nhưng vẫn",
  although: "mặc dù",
  in: "trong",
  on: "trên",
  at: "ở",
  to: "tới / để",
  for: "cho",
  of: "của",
  with: "với",
  from: "từ",
  into: "vào",
  about: "về",
  after: "sau khi",
  before: "trước khi",
  during: "trong lúc",
  between: "giữa",
  under: "dưới",
  over: "trên",
  by: "bằng",
  without: "không có",
  very: "rất",
  really: "thật sự",
  also: "cũng",
  too: "cũng",
  just: "chỉ",
  still: "vẫn",
  already: "đã",
  never: "không bao giờ",
  always: "luôn",
  often: "thường",
  sometimes: "thỉnh thoảng",
  usually: "thường",
  today: "hôm nay",
  yesterday: "hôm qua",
  tomorrow: "ngày mai",
  tonight: "tối nay",
  many: "nhiều",
  much: "nhiều",
  more: "hơn",
  most: "hầu hết",
  some: "một vài",
  any: "bất kỳ",
  each: "mỗi",
  every: "mỗi",
  both: "cả hai",
  few: "ít",
  other: "khác",
  another: "một … khác",
  one: "một",
  two: "hai",
  three: "ba",
  four: "bốn",
  five: "năm",
  people: "người",
  person: "người",
  class: "lớp",
  school: "trường",
  student: "học sinh",
  teacher: "cô / thầy",
  friend: "bạn",
  home: "nhà",
  day: "ngày",
  time: "lúc / thời gian",
  week: "tuần",
  year: "năm",
  morning: "buổi sáng",
  night: "buổi tối",
  office: "văn phòng",
  staff: "nhân viên",
  train: "tàu",
  peak: "cao điểm",
  hours: "giờ",
  hour: "giờ",
  bank: "ngân hàng",
  closed: "đóng cửa",
  quick: "nhanh",
  ran: "đã chạy / đi làm",
  commute: "đi làm hàng ngày",
  khoa: "Khoa",
  minh: "Minh",
  linh: "Linh",
  han: "Hân",
};

let DICT: Map<string, string> | null = null;

function dict() {
  if (DICT) return DICT;
  const d = new Map<string, string>(Object.entries(FUNC));
  for (const w of CLASS_WORDS) d.set(w.word.toLowerCase(), w.vi.split(" / ")[0]);
  for (const p of ANTONYMS) {
    d.set(p.a.toLowerCase(), p.aVi);
    d.set(p.b.toLowerCase(), p.bVi);
  }
  for (const x of LEXICON) {
    const k = x.word.toLowerCase();
    if (!d.has(k)) d.set(k, x.vi.split(" / ")[0]);
  }
  DICT = d;
  return d;
}

export function grammarOf(text: string): string {
  const t = text.trim();
  if (!t) return "";
  const bits: string[] = [];
  if (/\b(while|whereas)\b/i.test(t)) bits.push("while / whereas — hai vế đối lập");
  if (/\b(but|yet)\b/i.test(t)) bits.push("but / yet — nối đối lập");
  if (/\bbecause\b/i.test(t)) bits.push("because — nguyên nhân");
  if (/\bso\b/i.test(t) && !/\balso\b/i.test(t)) bits.push("so — kết quả");
  if (/\band\b/i.test(t) && bits.length === 0) bits.push("and — nối hai ý");
  if (/\b(have|has)\s+(been|\w+ed|\w+en|gone|done|seen|written|taken|had)\b/i.test(t)) {
    bits.push("Present Perfect — have/has + V3");
  } else if (/\b(yesterday|last\s+\w+|\bago\b)\b/i.test(t) || /\b(was|were|went|did|had|said|took|made|ran|closed)\b/i.test(t)) {
    bits.push("Past Simple — quá khứ đơn (V2)");
  }
  if (/\b(am|is|are)\s+\w+ing\b/i.test(t)) bits.push("Present Continuous — be + V-ing");
  if (/\bthere (is|are)\b/i.test(t)) bits.push("There is/are — có…");
  if (/\bone of\b/i.test(t)) bits.push("one of + danh từ số nhiều");
  if (/\b(always|often|usually|never|sometimes)\b/i.test(t)) bits.push("trạng từ tần suất + hiện tại đơn");
  if (/\b(will|going to)\b/i.test(t)) bits.push("tương lai — will / going to");
  if (/\bif\b/i.test(t)) bits.push("if — điều kiện");
  if (/\b(who|which|that)\b/i.test(t)) bits.push("mệnh đề quan hệ who/which/that");
  if (/\b(am|is|are|was|were)\s+[a-z]/i.test(t) && !/\b(am|is|are)\s+\w+ing\b/i.test(t)) {
    bits.push("be + tính từ / danh từ");
  }
  if (!bits.length) bits.push("Present Simple — hiện tại đơn");
  return [...new Set(bits)].join(" · ");
}

const PHRASE: [string, string][] = [
  ["peak hours", "giờ cao điểm"],
  ["office staff", "nhân viên văn phòng"],
  ["by train", "bằng tàu"],
  ["by bus", "bằng xe buýt"],
  ["by car", "bằng xe"],
  ["every day", "mỗi ngày"],
  ["after school", "sau tan học"],
];

export function glossVi(text: string): string {
  const d = dict();
  let s = text;
  for (const [en, vi] of PHRASE) {
    s = s.replace(new RegExp(`\\b${en}\\b`, "gi"), vi);
  }
  const phrases = [...d.keys()].filter((k) => k.includes(" ")).sort((a, b) => b.length - a.length);
  for (const p of phrases) {
    const vi = d.get(p);
    if (!vi) continue;
    s = s.replace(new RegExp(`\\b${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi"), vi);
  }
  const out = s.split(/(\s+|[,.;:!?])/).map((tok) => {
    if (!tok || /^\s+$/.test(tok) || /^[,.;:!?]$/.test(tok)) return tok;
    const raw = tok.replace(/^[^a-zA-Z']+|[^a-zA-Z']+$/g, "");
    if (!raw) return tok;
    const low = raw.toLowerCase();
    const hit = d.get(low);
    if (hit) return tok.replace(raw, hit);
    if (low.endsWith("ies") && d.get(`${low.slice(0, -3)}y`)) return tok.replace(raw, d.get(`${low.slice(0, -3)}y`) ?? raw);
    if (low.endsWith("s") && d.get(low.slice(0, -1))) return tok.replace(raw, d.get(low.slice(0, -1)) ?? raw);
    if (low.endsWith("ed") && d.get(low.slice(0, -2))) return tok.replace(raw, `đã ${d.get(low.slice(0, -2))}`);
    if (low.endsWith("ing") && d.get(low.slice(0, -3))) return tok.replace(raw, `đang ${d.get(low.slice(0, -3))}`);
    return tok;
  });
  return out.join("").replace(/\s{2,}/g, " ").replace(/\s+([,.;:!?])/g, "$1").trim();
}
