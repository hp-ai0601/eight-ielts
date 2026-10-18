import { ANTONYMS, CLASS_WORDS } from "./content";

export type SpellHit = { from: string; to: string };
export type GrammarHit = { vi: string };
export type LetterMark = { ch: string; ok: boolean };
export type Check = {
  score: number;
  spelling: SpellHit[];
  grammar: GrammarHit[];
  rewrite: string;
  clean: boolean;
};

const COMMON = `
a an the i me my you your he she it we they them him her his their our
one ones someone everyone something anything nothing somebody anybody nobody
am is are was were be been being have has had do does did done
will would can could should must may might shall
not no yes and but or so because if when while although whereas yet
in on at to for of with from into about after before between under over
this that these those there here very really also too just still then than
already never always often sometimes usually today yesterday tomorrow tonight
person people class friend boyfriend girlfriend desk bag book pen
teacher student school home house day time week month year night morning
one two three four five six seven eight nine ten
what who which where why how some any many much more most other another
each every both few lot lots own same such only even well back
again once twice first last next during without through against among
until within along across behind inside outside around
box lunch cucumber phone window seat jacket rain library homework
because while still also very really then their there
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
  tommorow: "tomorrow",
  yesteday: "yesterday",
  alway: "always",
  finaly: "finally",
  truely: "truly",
  occured: "occurred",
};

const BAD_V3: Record<string, string> = {
  went: "gone",
  ate: "eaten",
  took: "taken",
  wrote: "written",
  came: "come",
  saw: "seen",
  did: "done",
  ran: "run",
  gave: "given",
  bought: "bought",
  spoke: "spoken",
  broke: "broken",
  chose: "chosen",
  drove: "driven",
  flew: "flown",
  grew: "grown",
  knew: "known",
  sang: "sung",
  swam: "swum",
  wore: "worn",
  forgot: "forgotten",
};

const BAD_PAST: Record<string, string> = {
  goed: "went",
  eated: "ate",
  writed: "wrote",
  buyed: "bought",
  teached: "taught",
  catched: "caught",
  bringed: "brought",
  forgeted: "forgot",
  readed: "read",
  sitted: "sat",
  standed: "stood",
  speaked: "spoke",
  taked: "took",
  gived: "gave",
  comed: "came",
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
  if (BAD_PAST[w]) return BAD_PAST[w];
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

function tenseHits(text: string, expect?: string): GrammarHit[] {
  const t = text.trim();
  const g: GrammarHit[] = [];
  const low = t.toLowerCase();

  if (/\b(he|she|it)\s+(are|have|go|do|want|like|eat|sit|stand|write|read|walk|talk|wait)\b/i.test(t)) {
    g.push({ vi: "Thì hiện tại: he/she/it thêm -s (she likes, he sits). Hoặc Past: she liked / he sat." });
  }
  if (/\b(they|we|you)\s+(is|was|has)\b/i.test(t)) g.push({ vi: "They/we/you đi với are/were/have, không is/has." });
  if (/\bI\s+(is|are|has)\b/i.test(t)) g.push({ vi: "I đi với am / was / have." });
  if (/\bI\s+am\s+(go|went|eat|sit|write|read|walk|talk)\b/i.test(t)) {
    g.push({ vi: "I am go là sai. Thói quen: I go. Đang làm: I am going. Quá khứ: I went." });
  }
  if (/\b(is|are|was|were|am)\s+(go|went|eat|ate|sit|write)\b/i.test(t)) {
    g.push({ vi: "be + V nguyên mẫu sai. Đúng: be + V-ing, hoặc bỏ be rồi chia thì (I go / I went)." });
  }
  if (/\b(have|has|had)\s+(went|ate|took|wrote|came|saw|did|ran|gave|spoke|broke)\b/i.test(t)) {
    const m = low.match(/\b(have|has|had)\s+(went|ate|took|wrote|came|saw|did|ran|gave|spoke|broke)\b/);
    const v2 = m?.[2] ?? "";
    g.push({ vi: `Present/Past Perfect: have/has/had + V3, không + V2. ${v2 ? `have ${BAD_V3[v2] ?? "gone"}` : "have gone"}` });
  }
  if (/\b(didn't|did not)\s+(went|ate|was|were|had|did|wrote|took|saw|came)\b/i.test(t)) {
    g.push({ vi: "didn't + V nguyên mẫu: didn't go, không didn't went." });
  }
  for (const [bad, good] of Object.entries(BAD_PAST)) {
    if (new RegExp(`\\b${bad}\\b`, "i").test(t)) g.push({ vi: `Quá khứ sai: ${bad} → ${good}.` });
  }
  if (/\b(yesterday|last\s+\w+|\d+\s+years?\s+ago|ago)\b/i.test(t) && /\b(have|has)\s+\w+/i.test(t) && !/\bhad\b/i.test(t)) {
    g.push({ vi: "yesterday / last / ago khóa Past Simple (I went), không Present Perfect (I have gone yesterday)." });
  }
  if (/\b(yesterday|last\s+\w+|ago)\b/i.test(t) && /\b(I|you|we|they)\s+(go|eat|sit|write|read|walk|talk|wait|bring|forget|wear|am|is|are)\b/i.test(t)) {
    g.push({ vi: "Có mốc quá khứ mà đang dùng hiện tại. Đổi: I went / I was, không I go / I am." });
  }
  if (/\bif\s+\w+\s+will\b/i.test(t)) g.push({ vi: "If + hiện tại, không If I will. If I have time, I will…" });
  if (/\balthough\b/i.test(t) && /\bbut\b/i.test(t)) g.push({ vi: "Although không đi với but trong cùng câu." });
  if (/\bmore\s+(cheaper|taller|bigger|smaller|shorter|faster|slower|easier|harder)\b/i.test(t)) {
    g.push({ vi: "Tính từ ngắn: cheaper / taller, không more cheaper." });
  }
  if (/\b(informations|homeworks|advices|furnitures|traffics|researches)\b/i.test(t)) {
    g.push({ vi: "Không đếm: information / homework / advice / furniture / traffic / research — không thêm -s." });
  }
  if (/\bpeople\s+is\b/i.test(t)) g.push({ vi: "people số nhiều: people are." });

  if (expect) {
    const e = expect.toLowerCase();
    const hasPast = /\b(was|were|went|had|did|said|saw|took|wrote|came|made|sat|stood|left|told|asked|opened|called|packed|waited|studied)\b/i.test(t) || /\b\w+ed\b/i.test(t);
    if (e.includes("past perfect") && !/\bhad\b/i.test(t)) {
      g.push({ vi: `Thì hôm nay: Past Perfect — had + V3. Khuôn: ${expect}` });
    } else if (e.includes("present perfect") && !/\b(have|has)\b/i.test(t)) {
      g.push({ vi: `Thì hôm nay: Present Perfect — have/has + V3. Khuôn: ${expect}` });
    } else if (e.includes("going to") && !/\bgoing to\b/i.test(t)) {
      g.push({ vi: `Thì hôm nay: was/am going to + V. Khuôn: ${expect}` });
    } else if (e.includes("past simple") && !hasPast) {
      g.push({ vi: `Thì hôm nay: Past Simple (V2). Khuôn: ${expect}` });
    }
  }
  return g;
}

function grammar(text: string, expectTense?: string): GrammarHit[] {
  const t = text.trim();
  const g: GrammarHit[] = [];
  if (!t) return g;
  if (t[0] !== t[0].toUpperCase()) g.push({ vi: "Chữ cái đầu câu viết hoa." });
  if (!/[.!?]$/.test(t)) g.push({ vi: "Thêm dấu chấm (.) cuối câu." });
  if (/,\s+(I|I'm|he|she|we|they|my|you|it|one)\b/i.test(t) && !/\b(and|but|so|or|because|while|whereas|yet)\b/i.test(t)) {
    g.push({ vi: "Hai câu dính bằng dấu phẩy. Thêm and / but / so, hoặc đổi thành chấm." });
  }
  if (/\ba\s+[aeiou]/i.test(t)) g.push({ vi: "a đứng trước phụ âm; nguyên âm dùng an (an umbrella)." });
  if (/\b(am|is|are|was|were)\s+(messy|tidy|quiet|loud|shy|kind|lazy|tall|short|thin|chubby)\s+person\b/i.test(t) && !/\ba\s+(messy|tidy|quiet|loud|shy|kind|lazy|tall|short|thin|chubby)\s+person\b/i.test(t)) {
    g.push({ vi: "Trước person cần mạo từ: a messy person." });
  }
  if (/\bI\s+(messy|tidy|quiet|loud|shy|tired|hungry|sleepy|bored)\b/i.test(t)) {
    g.push({ vi: "Thiếu động từ to be: I am messy, không viết I messy." });
  }
  if (/\ba\s+\w+\s+person,\s+.+?\bis\s+(messy|tidy|quiet|loud|shy|kind|thin|chubby|tall|short)\b/i.test(t)) {
    g.push({ vi: "Song song: a messy person … a tidy person. Hoặc cả hai chỉ tính từ: I am messy, but he is tidy." });
  }
  g.push(...tenseHits(t, expectTense));
  const seen = new Set<string>();
  return g.filter((x) => (seen.has(x.vi) ? false : (seen.add(x.vi), true)));
}

function rewrite(text: string, spellingHits: SpellHit[], grammarHits: GrammarHit[]): string {
  let out = text.trim();
  for (const s of spellingHits) {
    if (s.to.startsWith("(")) continue;
    out = out.replace(new RegExp(`\\b${s.from}\\b`, "gi"), s.to);
  }
  const pastMark = /\b(yesterday|last\s+\w+|\d+\s+years?\s+ago|ago)\b/i.test(out);
  if (pastMark) {
    out = out.replace(/\b(have|has)\s+(went|gone|eaten|taken|written|come|seen|done)\b/gi, (_, _aux, v: string) => {
      const back: Record<string, string> = {
        went: "went",
        gone: "went",
        eaten: "ate",
        taken: "took",
        written: "wrote",
        come: "came",
        seen: "saw",
        done: "did",
      };
      return back[v.toLowerCase()] ?? v;
    });
  } else {
    out = out.replace(/\b(have|has|had)\s+(went|ate|took|wrote|came|saw|did)\b/gi, (m, aux: string, v: string) => {
      const v3 = BAD_V3[v.toLowerCase()];
      return v3 ? `${aux} ${v3}` : m;
    });
  }
  out = out.replace(/\b(didn't|did not)\s+(went|ate|was|were|had|did|wrote|took|saw|came)\b/gi, "didn't go");
  if (out && out[0] === out[0].toLowerCase()) out = out[0].toUpperCase() + out.slice(1);
  const contrast = [...CONTRAST].some((w) => out.toLowerCase().includes(w));
  if (/,\s+(I|I'm|he|she|we|they|my|you|one)\b/i.test(out) && !/\b(and|but|so|or|because|while|whereas|yet)\b/i.test(out)) {
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

export function checkText(text: string, extra: string[] = [], expectTense?: string): Check {
  const spellingHits = spelling(text, extra).filter((x) => x.from.toLowerCase() !== x.to.toLowerCase());
  const grammarHits = grammar(text, expectTense);
  const clean = spellingHits.length === 0 && grammarHits.length === 0;
  let score = 10;
  score -= spellingHits.length;
  score -= grammarHits.length;
  score = Math.max(0, Math.min(10, score));
  return {
    score,
    spelling: spellingHits,
    grammar: grammarHits,
    rewrite: rewrite(text, spellingHits, grammarHits),
    clean,
  };
}

export function checkDictation(wrote: string, target: string) {
  const a = wrote.trim().toLowerCase().replace(/\s+/g, " ");
  const b = target.trim().toLowerCase();
  return a === b && a.length > 0;
}

export function letterMarks(wrote: string, target: string): LetterMark[] {
  const w = wrote;
  const tt = target.toLowerCase();
  const wt = w.toLowerCase();
  return [...w].map((ch, i) => ({ ch, ok: i < tt.length && wt[i] === tt[i] }));
}
