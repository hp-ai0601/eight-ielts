import { ANTONYMS, CLASS_WORDS } from "./content";

export type SpellHit = { from: string; to: string };
export type GrammarHit = { vi: string };
export type Check = {
  score: number;
  spelling: SpellHit[];
  grammar: GrammarHit[];
  rewrite: string;
};

const COMMON = `
a an the i me my you your he she it we they them him her his their our
one ones someone everyone something anything nothing
am is are was were be been being have has had do does did
will would can could should must may might
not no yes and but or so because if when while although
in on at to for of with from into about
this that these those there here very really also too just still
already never always often sometimes today yesterday tomorrow
person people class friend boyfriend girlfriend desk bag book pen
teacher student school home house day time
one two three four five
khoa minh linh han
`.trim().split(/\s+/);

const TYPO: Record<string, string> = {
  recieve: "receive",
  freind: "friend",
  becuase: "because",
  teh: "the",
  adn: "and",
  dont: "don't",
  cant: "can't",
  wont: "won't",
  im: "I'm",
  ive: "I've",
  boyfreind: "boyfriend",
  girlfreind: "girlfriend",
  messsy: "messy",
  tiday: "tidy",
  personn: "person",
  definately: "definitely",
  seperate: "separate",
  occured: "occurred",
  untill: "until",
  whitch: "which",
  wich: "which",
  thier: "their",
  recieved: "received",
  realy: "really",
  alot: "a lot",
  becouse: "because",
  studing: "studying",
  writting: "writing",
  begining: "beginning",
};

const NAMES = new Set(["khoa", "minh", "linh", "han", "zang", "hiep"]);

const CONTRAST = new Set(
  ANTONYMS.flatMap((p) => [p.a.toLowerCase(), p.b.toLowerCase()]),
);

function dict() {
  const d = new Set(COMMON);
  for (const w of CLASS_WORDS) d.add(w.word.toLowerCase());
  for (const p of ANTONYMS) {
    d.add(p.a.toLowerCase());
    d.add(p.b.toLowerCase());
  }
  return d;
}

const DICT = dict();

function strip(w: string) {
  return w.replace(/^[^a-zA-Z']+|[^a-zA-Z']+$/g, "");
}

function lev(a: string, b: string) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = i - 1;
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cur = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
      prev = cur;
    }
  }
  return row[b.length];
}

function suggest(word: string): string | null {
  const w = word.toLowerCase();
  if (TYPO[w]) return TYPO[w];
  let best: string | null = null;
  let bestD = 99;
  const pool = [...DICT];
  for (const x of pool) {
    if (Math.abs(x.length - w.length) > 2) continue;
    const d = lev(w, x);
    if (d < bestD) {
      bestD = d;
      best = x;
    }
  }
  if (w.length >= 4 && (best?.length ?? 0) <= 3) return null;
  if (best && ((bestD === 1 && w.length >= 3) || (bestD === 2 && w.length >= 6))) return best;
  return null;
}

function known(word: string, extra: string[]) {
  const w = word.toLowerCase().replace(/'s$/, "");
  if (!w) return true;
  if (/^\d+$/.test(w)) return true;
  if (NAMES.has(w)) return true;
  if (DICT.has(w)) return true;
  if (extra.some((x) => x.toLowerCase() === w)) return true;
  if (w.endsWith("s") && DICT.has(w.slice(0, -1))) return true;
  if (w.endsWith("ed") && DICT.has(w.slice(0, -2))) return true;
  if (w.endsWith("ing") && DICT.has(w.slice(0, -3))) return true;
  return false;
}

function spelling(text: string, extra: string[]): SpellHit[] {
  const hits: SpellHit[] = [];
  const seen = new Set<string>();
  for (const raw of text.split(/\s+/)) {
    const w = strip(raw);
    if (!w || known(w, extra) || seen.has(w.toLowerCase())) continue;
    if (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(w)) {
      hits.push({ from: w, to: "(bỏ tiếng Việt — viết tiếng Anh)" });
      seen.add(w.toLowerCase());
      continue;
    }
    const to = suggest(w);
    if (to) {
      hits.push({ from: w, to });
      seen.add(w.toLowerCase());
    }
  }
  return hits;
}

function grammar(text: string): GrammarHit[] {
  const t = text.trim();
  const g: GrammarHit[] = [];
  if (!t) return g;
  if (t[0] !== t[0].toUpperCase()) g.push({ vi: "Chữ cái đầu câu viết hoa." });
  if (!/[.!?]$/.test(t)) g.push({ vi: "Thêm dấu chấm (.) cuối câu." });
  if (/,\s+(I|I'm|he|she|we|they|my|you|it|one)\b/i.test(t) && !/\b(and|but|so|or|because|while|whereas)\b/i.test(t)) {
    g.push({ vi: "Hai câu dính bằng dấu phẩy. Thêm and / but / so, hoặc đổi thành chấm phẩy." });
  }
  if (/\b(he|she|it)\s+(are|have|go|do|want|like|eat|sit|stand|write|read)\b/i.test(t)) {
    g.push({ vi: "He/she/it thì hiện tại thêm -s: she likes, he sits." });
  }
  if (/\b(they|we|you)\s+(is|was|has)\b/i.test(t)) g.push({ vi: "They/we/you đi với are/were/have, không dùng is/has." });
  if (/\bI\s+(is|are|has)\b/i.test(t)) g.push({ vi: "I đi với am / was / have." });
  if (/\ba\s+[aeiou]/i.test(t)) g.push({ vi: "a đứng trước phụ âm; nguyên âm dùng an (an umbrella)." });
  if (/\b(am|is|are|was|were)\s+(messy|tidy|quiet|loud|shy|kind|lazy|tall|short|thin|chubby)\s+person\b/i.test(t) && !/\ba\s+(messy|tidy|quiet|loud|shy|kind|lazy|tall|short|thin|chubby)\s+person\b/i.test(t)) {
    g.push({ vi: "Trước person cần mạo từ: a messy person." });
  }
  if (/\bI\s+(messy|tidy|quiet|loud|shy|tired|hungry|sleepy|bored)\b/i.test(t)) {
    g.push({ vi: "Thiếu động từ to be: I am messy, không viết I messy." });
  }
  if (/\ba\s+\w+\s+person,\s+.+?\bis\s+(messy|tidy|quiet|loud|shy|kind|thin|chubby|tall|short)\b/i.test(t)) {
    g.push({ vi: "Song song: a messy person … a tidy person. Hoặc cả hai chỉ tính từ: I am messy, and he is tidy." });
  }
  return g;
}

function rewrite(text: string, spellingHits: SpellHit[], grammarHits: GrammarHit[]): string {
  let out = text.trim();
  for (const s of spellingHits) {
    if (s.to.startsWith("(")) continue;
    out = out.replace(new RegExp(`\\b${s.from}\\b`, "gi"), s.to);
  }
  if (out && out[0] === out[0].toLowerCase()) out = out[0].toUpperCase() + out.slice(1);
  const contrast = [...CONTRAST].some((w) => out.toLowerCase().includes(w));
  if (/,\s+(I|I'm|he|she|we|they|my|you)\b/i.test(out) && !/\b(and|but|so|or|because|while|whereas)\b/i.test(out)) {
    const link = contrast ? ", but" : ", and";
    out = out.replace(/,\s+(?=(I|I'm|he|she|we|they|my|you|one)\b)/i, `${link} `);
  }
  out = out.replace(/\s+/g, " ");
  if (!/[.!?]$/.test(out)) out += ".";
  if (grammarHits.some((x) => x.vi.startsWith("Song song"))) {
    out = out.replace(/\bis\s+(messy|tidy|quiet|loud|shy|kind|thin|chubby|tall|short)\b/i, "is a $1 person");
  }
  return out;
}

export function checkText(text: string, extra: string[] = []): Check {
  const spellingHits = spelling(text, extra).filter((x) => x.from.toLowerCase() !== x.to.toLowerCase());
  const grammarHits = grammar(text);
  let score = 10;
  score -= spellingHits.length;
  score -= grammarHits.length;
  score = Math.max(3, Math.min(10, score));
  return {
    score,
    spelling: spellingHits,
    grammar: grammarHits,
    rewrite: rewrite(text, spellingHits, grammarHits),
  };
}

export function checkDictation(wrote: string, target: string) {
  const a = wrote.trim().toLowerCase().replace(/\s+/g, " ");
  const b = target.trim().toLowerCase();
  return a === b;
}
