import { ANTONYMS, CLASS_WORDS } from "./content";

export type SpellHit = { from: string; to: string };
export type GrammarNote = { vi: string; en?: string; from?: string; to?: string };
export type GrammarHit = GrammarNote;
export type CheckResult = {
  score: number;
  spelling: SpellHit[];
  grammar: GrammarNote[];
  rewrite: string;
  clean: boolean;
};
export type Check = CheckResult;
export type LetterMark = { ch: string; ok: boolean };

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
adult adults people person family father mother brother sister child children
friend boyfriend girlfriend time work job happy sad love important
example think agree disagree conclusion balance spend give gave
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
  bussiness: "business",
  enviroment: "environment",
  goverment: "government",
  successfull: "successful",
  beautifull: "beautiful",
  recomend: "recommend",
  accomodation: "accommodation",
  seperated: "separated",
  occation: "occasion",
  pronounciation: "pronunciation",
  opertunity: "opportunity",
  comming: "coming",
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

const CONTRAST = new Set(ANTONYMS.flatMap((p) => [p.a.toLowerCase(), p.b.toLowerCase()]));

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

const badPatterns: { pattern: RegExp; vi: string; en?: string }[] = [
  { pattern: /\bi\s+(?:am\s+)?(?:is|are)\s/i, vi: "S + am/is/are: I + am." },
  { pattern: /\bhe\s+(?:am|are)\s/i, vi: "S + am/is/are: He/She/It + is." },
  { pattern: /\bthey\s+(?:is|was)\s/i, vi: "S + am/is/are: They + are/were." },
  { pattern: /\bwe\s+was\b/i, vi: "We + were." },
  { pattern: /\b(she|he|it|the dog|my friend)\s+don't\b/i, vi: "He/She/It + doesn't." },
  { pattern: /\b(i|you|we|they)\s+doesn't\b/i, vi: "I/you/we/they + don't." },
  { pattern: /\bdidn't\s+\w+ed\b/i, vi: "Didn't + V nguyên." },
  { pattern: /\bhas\s+\w+ed\s+\w/i, vi: "Has/Have + P2 dùng cho hiện tại hoàn thành, kiểm tra chủ ngữ số ít." },
  { pattern: /\bthere\s+is\s+(?:many|some|a lot of|lots of|several|these|those)/i, vi: "There are + danh từ số nhiều." },
  { pattern: /\bthere\s+are\s+a\s+\w/i, vi: "There is a/an + danh từ số ít." },
  { pattern: /\bthe\s+people\s+is\b/i, vi: "People luôn là số nhiều → people are." },
  { pattern: /\b(everyone|someone|anyone|nobody|each|every)\s+\w+\s+are\b/i, vi: "Bất định đại từ số ít → is." },
  { pattern: /\ba\s+(?:lot|many|few|several|some)\s+of\s+\w+s\s+is\b/i, vi: "A lot of + plural noun → are." },
  { pattern: /\b\w+\s+(?:is|are|was|were)\s+(?:go|went|eat|ate|take|took|write|wrote|read|come|came|give|gave|do|did|make|made)\b/i, vi: "Be + V nguyên/V2 sai. Dùng be + V-ing hoặc chia thì đúng." },
  { pattern: /\b(want|need|would like|hope|decide|plan|try|learn|forget|remember|start|stop)\s+\w+(?:ed|ing)\b/i, vi: "Sau want/need/would like... dùng to V." },
  { pattern: /\b(enjoy|finish|avoid|consider|suggest|practice|mind|keep|imagine|miss|postpone|delay|quit|resist|admit|deny|recall|regret|recommend|risk|spend|waste)\s+to\s+\w+\b/i, vi: "Sau enjoy/finish/avoid/practice + V-ing." },
  { pattern: /\bused\s+to\s+\w+ing\b/i, vi: "Used to + V nguyên (quá khứ) hay be used to + V-ing." },
  { pattern: /\bbe\s+used\s+to\s+\w+\b(?!ing)/i, vi: "Be used to + V-ing (quen với việc gì)." },
  { pattern: /\bwant\s+that\s+\w+\s+\w+\b/i, vi: "Want + O + to V, không dùng want that." },
  { pattern: /\bsuggest\s+(?:me|him|her|us|them)\s+to\b/i, vi: "Suggest + V-ing / suggest that + S + (should) V." },
  { pattern: /\bmake\s+(?:me|him|her|us|them)\s+to\s+\w+\b/i, vi: "Make + O + V nguyên (không to)." },
  { pattern: /\blet\s+(?:me|him|her|us|them)\s+to\s+\w+\b/i, vi: "Let + O + V nguyên." },
  { pattern: /\bhave\s+(?:me|him|her|us|them)\s+\w+ing\b/i, vi: "Have + O + V nguyên (nhờ ai làm gì)." },
  { pattern: /\b(tell|ask|advise|encourage|warn|remind|persuade|force|allow|permit|order|invite|teach)\s+\w+\s+\w+\b(?!\s+to)/i, vi: "Tell/ask/advise + O + to V." },
  { pattern: /\bif\s+i\s+(?:am|are|is|was|were)\s+\w+\b.*?\b\w+\s+(?:will|would|can|could)\b/i, vi: "If + present simple, S + will (loại 1)." },
  { pattern: /\bif\s+i\s+(?:would|could|can)\s+\w+\b.*?\b\w+\s+\w+\s+\w+\b/i, vi: "If loại 2: If + past simple, would + V." },
  { pattern: /\bif\s+i\s+(?:have|has)\s+\w+ed\b/i, vi: "If loại 3: If + had + P2, would have + P2." },
  { pattern: /\bwish\s+i\s+(?:am|are|is|was|were)\s+\w+ing\b/i, vi: "Wish hiện tại: I wish + S + past simple." },
  { pattern: /\bwish\s+i\s+(?:would|will)\s+\w+\b/i, vi: "Wish tương lai: I wish + S + would/could + V." },
  { pattern: /\bprefer\s+\w+\s+(?:than|to)\s+\w+ing\b/i, vi: "Prefer + V-ing to + V-ing." },
  { pattern: /\bwould\s+rather\s+(?:me|him|her|us|them)\s+\w+\b/i, vi: "Would rather + S + past simple." },
  { pattern: /\bit's\s+\w+\s+for\s+(?:me|him|her|us|them)\s+\w+(?!ing)\b/i, vi: "It's + adj + for + O + to V." },
  { pattern: /\bit's\s+\w+\s+of\s+(?:me|him|her|us|them)\s+\w+ing\b/i, vi: "It's + adj + of + O + to V." },
  { pattern: /\btoo\s+\w+\s+(?:for)\s+\w+\s+\w+\b/i, vi: "Too + adj + (for O) + to V." },
  { pattern: /\benough\s+\w+\s+(?:to)\b/i, vi: "Adj/adv + enough + to V." },
  { pattern: /\bso\s+\w+\s+that\s+\w+\s+(?:can|could|will|would)\b/i, vi: "So + adj/adv + that + S + modal — đúng. Kiểm tra enough...to." },
  { pattern: /\bsuch\s+a?\s+\w+\s+that\s/i, vi: "Such + (a/an) + adj + noun + that." },
  { pattern: /\balthough\s+.+?\s+but\s/i, vi: "Although và but không dùng chung trong một câu." },
  { pattern: /\bbecause\s+.+?\s+so\s/i, vi: "Because và so không dùng chung trong một câu." },
  { pattern: /\bdespite\s+of\b/i, vi: "Despite + N/V-ing, không có of. In spite of mới có of." },
  { pattern: /\bin\s+spite\b(?!\s+of)/i, vi: "In spite of + N/V-ing." },
  { pattern: /\bbecause\s+of\s+\w+ing\b/i, vi: "Because of + V-ing đúng; because + S + V." },
  { pattern: /\bdue\s+to\s+\w+\s+is\b/i, vi: "Due to + N/V-ing, không phải mệnh đề." },
  { pattern: /\bthanks\s+to\s+\w+\s+\w+ed\b/i, vi: "Thanks to + N/V-ing." },
  { pattern: /\bwhere\s+.+?\s+at\b/i, vi: "Where = at which — không thêm at." },
  { pattern: /\bwhen\s+.+?\s+on\b/i, vi: "When = on which — không thêm giới từ thừa." },
  { pattern: /\bthe\s+reason\s+is\s+because\b/i, vi: "The reason is that..., không dùng because." },
  { pattern: /\bthe\s+way\s+how\b/i, vi: "The way (that/in which), không dùng how." },
  { pattern: /\bwhat\s+is\s+it\s+(?:called|like)\b/i, vi: "Nếu hỏi ý kiến: What is it like?", en: "Use 'What is it like?' for description." },
  { pattern: /\bhave\s+been\s+\w+ing\s+for\b/i, vi: "Hiện tại hoàn thành tiếp diễn: have been + V-ing." },
  { pattern: /\bhad\s+been\s+\w+ing\s+when\b/i, vi: "Quá khứ hoàn thành tiếp diễn: had been + V-ing." },
  { pattern: /\bwill\s+have\s+been\s+\w+ing\b/i, vi: "Tương lai hoàn thành tiếp diễn: will have been + V-ing." },
  { pattern: /\bin\s+(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i, vi: "On + thứ trong tuần." },
  { pattern: /\bon\s+(?:january|february|march|april|may|june|july|august|september|october|november|december)\b/i, vi: "In + tháng." },
  { pattern: /\b(last|next|every|this)\s+(?:year|month|week|monday)\s+(?:at|on|in)\b/i, vi: "Last/next/this/every + thời gian — không dùng giới từ." },
  { pattern: /\ba\s+(?:apple|orange|umbrella|hour|honest|honour)\b/i, vi: "An + nguyên âm âm thanh /æ/.../əʊ/." },
  { pattern: /\ban\s+(?:university|uniform|union|unique|european|one|useful)\b/i, vi: "A + phụ âm âm thanh /j/ hoặc /w/." },
  { pattern: /\bmore\s+(?:better|worse|faster|bigger|easier|happier|more)\b/i, vi: "Comparative đã có -er — không thêm more." },
  { pattern: /\bmost\s+(?:best|worst|fastest|biggest|easiest|happiest|most)\b/i, vi: "Superlative đã có -est — không thêm most." },
  { pattern: /\bmuch\s+(?:cars|books|friends|students)\b/i, vi: "Much + danh từ không đếm được." },
  { pattern: /\bmany\s+(?:water|money|time|information|advice|furniture|equipment|knowledge)\b/i, vi: "Many + danh từ đếm được số nhiều." },
  { pattern: /\ba\s+(?:furniture|information|advice|equipment|knowledge|weather|news|bread|luggage|baggage)\b/i, vi: "Danh từ không đếm được — không dùng a/an." },
  { pattern: /\bfewer\s+(?:water|money|time|information)\b/i, vi: "Fewer + danh từ đếm được; less + không đếm được." },
  { pattern: /\bless\s+(?:students|books|friends|cars)\b/i, vi: "Less + không đếm được; fewer + đếm được." },
  { pattern: /\binterested\s+in\s+\w+ing\b/i, vi: "Interested in + V-ing đúng." },
  { pattern: /\bbored\s+of\b/i, vi: "Bored with (hoặc bored by)." },
  { pattern: /\bgood\s+in\b/i, vi: "Good at + V-ing." },
  { pattern: /\bmarried\s+with\b/i, vi: "Married to somebody." },
  { pattern: /\bdepending\s+of\b/i, vi: "Depending on." },
  { pattern: /\blisten\s+music\b/i, vi: "Listen to music." },
  { pattern: /\blook\s+the\s+picture\b/i, vi: "Look at the picture." },
  { pattern: /\bwait\s+\w+\s+at\b/i, vi: "Wait for somebody." },
  { pattern: /\bsearch\s+\w+\s+in\s+internet\b/i, vi: "Search for something on the Internet." },
  { pattern: /\btake\s+care\s+\w+\b(?!\s+of)/i, vi: "Take care of." },
  { pattern: /\bapply\s+\w+\s+a\s+job\b/i, vi: "Apply for a job." },
  { pattern: /\bspend\s+\w+\s+(?:to|for)\s+\w+ing\b/i, vi: "Spend time/money + V-ing." },
  { pattern: /\bwaste\s+\w+\s+(?:to|for)\s+\w+ing\b/i, vi: "Waste time/money + V-ing." },
  { pattern: /\bhave\s+difficulty\s+\w+(?!ing)\b/i, vi: "Have difficulty + V-ing." },
  { pattern: /\bhave\s+trouble\s+\w+(?!ing)\b/i, vi: "Have trouble + V-ing." },
  { pattern: /\bhave\s+a\s+hard\s+time\s+\w+(?!ing)\b/i, vi: "Have a hard time + V-ing." },
  { pattern: /\blook\s+forward\s+\w+(?!to)/i, vi: "Look forward to + V-ing/N." },
  { pattern: /\bget\s+used\s+to\s+\w+(?!ing)\b/i, vi: "Get used to + V-ing." },
  { pattern: /\bobject\s+to\s+\w+(?!ing)\b/i, vi: "Object to + V-ing." },
  { pattern: /\bwould\s+you\s+mind\s+\w+(?!ing)\b/i, vi: "Would you mind + V-ing." },
  { pattern: /\bcan't\s+help\s+\w+(?!ing)\b/i, vi: "Can't help + V-ing." },
  { pattern: /\bsomething\s+to\s+\w+ing\b/i, vi: "Something to V — động từ nguyên thể sau to." },
  { pattern: /\bthe\s+first\s+\w+\s+to\s+\w+ing\b/i, vi: "The first/last/best + N + to V." },
  { pattern: /\b(he|she|it|my\s+friend|my\s+brother|my\s+sister|my\s+father|my\s+mother|father|mother|brother|sister|friend|teacher|student)\s+(?:(?:often|always|usually|never|sometimes|really|seldom)\s+)?(go|work|give|take|eat|drink|sleep|read|write|walk|talk|live|study|play|want|like|need|know|think|forget|remember|start|begin)\b/i, vi: "Hiện tại: he/she/it + động từ thêm -s (he works / she gives / my friend forgets)." },
  { pattern: /\b(family|team|company|group|government|committee|audience)\s+(?:often\s+|always\s+|usually\s+|never\s+|sometimes\s+)?(give|work|want|need|have|has)\b(?!\s+(?:members?|people|players|staff))/i, vi: "Danh từ tập hợp (family, team, government) thường là số ít → family gives / The team works." },
  { pattern: /\bhe\s+will\s+(?:happy|sad|angry|tired|busy|ready|late|early|popular|famous|rich|poor|good|bad|difficult|easy)\b/i, vi: "Will + be + tính từ: he will be happy, không he will happy." },
  { pattern: /\bshe\s+will\s+(?:happy|sad|angry|tired|busy|ready|late|early|popular|famous|rich|poor|good|bad|difficult|easy)\b/i, vi: "Will + be + tính từ: she will be happy." },
  { pattern: /\b(he|she|it|I|we|they|my\s+father|my\s+mother)\s+not\s+(?:happy|sad|angry|tired|busy|ready|late|early|popular|famous|rich|poor|good|bad|difficult|easy)\b/i, vi: "Thiếu động từ to be: he is not happy / I am not tired." },
  { pattern: /\bif\s+he\s+spend\b/i, vi: "If + hiện tại: if he spends (he → -s)." },
  { pattern: /\bif\s+she\s+spend\b/i, vi: "If + hiện tại: if she spends." },
  { pattern: /\bif\s+it\s+spend\b/i, vi: "If + hiện tại: if it spends." },
  { pattern: /\bif\s+i\s+spend\b/i, vi: "If + hiện tại: if I spend." },
  { pattern: /\bthey\s+was\b/i, vi: "They + were." },
  { pattern: /\bhe\s+don't\b/i, vi: "He + doesn't." },
  { pattern: /\bshe\s+don't\b/i, vi: "She + doesn't." },
  { pattern: /\bit\s+don't\b/i, vi: "It + doesn't." },
];

function tenseHits(text: string, expect?: string): GrammarNote[] {
  const t = text.trim();
  const g: GrammarNote[] = [];
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

function punctuationAndBasic(text: string): GrammarNote[] {
  const t = text.trim();
  const g: GrammarNote[] = [];
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
  return g;
}

function grammar(text: string, extra: string[] = [], expectTense?: string): GrammarNote[] {
  const t = text.trim();
  const g: GrammarNote[] = [];
  if (!t) return g;

  g.push(...punctuationAndBasic(t));
  g.push(...tenseHits(t, expectTense));

  for (const { pattern, vi, en } of badPatterns) {
    if (pattern.test(t) && !g.some((x) => x.vi === vi)) {
      g.push({ vi, en });
    }
  }

  // required word check
  for (const rw of extra) {
    const re = new RegExp(`\\b${rw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    if (!re.test(t)) {
      g.push({ vi: `Chưa dùng từ yêu cầu: “${rw}”.` });
    }
  }

  const seen = new Set<string>();
  return g.filter((x) => (seen.has(x.vi) ? false : (seen.add(x.vi), true)));
}

function rewrite(text: string, spellingHits: SpellHit[], grammarHits: GrammarNote[]): string {
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
  return out;
}

export function checkText(text: string, extra: string[] = [], expectTense?: string): Check {
  const spellingHits = spelling(text, extra).filter((x) => x.from.toLowerCase() !== x.to.toLowerCase());
  const grammarHits = grammar(text, extra, expectTense);
  const clean = spellingHits.length === 0 && grammarHits.length === 0;
  let score = 10;
  score -= spellingHits.length;
  score -= grammarHits.length * 0.7;
  score = Math.max(0, Math.min(10, score));
  return {
    score: Math.round(score * 10) / 10,
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
