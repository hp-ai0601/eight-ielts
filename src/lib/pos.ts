export type Pos = "n" | "v" | "adj" | "adv" | "phr" | "conj" | "prep";

export const POS_VI: Record<Pos, string> = {
  n: "danh từ",
  v: "động từ",
  adj: "tính từ",
  adv: "trạng từ",
  phr: "cụm từ",
  conj: "liên từ",
  prep: "giới từ",
};

const ADJ_LY = new Set(
  "friendly lonely lovely likely ugly monthly daily weekly yearly early costly deadly lively elderly cowardly leisurely worldly earthly scholarly kindly".split(
    " ",
  ),
);

/** Common words endings get wrong. */
const FIX: Record<string, Pos> = {
  commute: "v",
  nap: "n",
  snooze: "v",
  errand: "n",
  chore: "n",
  tidy: "adj",
  quiet: "adj",
  loud: "adj",
  thin: "adj",
  chubby: "adj",
  shy: "adj",
  outgoing: "adj",
  messy: "adj",
  hard: "adj",
  easy: "adj",
  cheap: "adj",
  expensive: "adj",
  short: "adj",
  tall: "adj",
  cold: "adj",
  warm: "adj",
  busy: "adj",
  free: "adj",
  late: "adj",
  well: "adv",
  often: "adv",
  always: "adv",
  never: "adv",
  still: "adv",
  already: "adv",
  quite: "adv",
  rather: "adv",
  very: "adv",
  too: "adv",
  also: "adv",
  just: "adv",
  even: "adv",
  almost: "adv",
  enough: "adv",
  fast: "adj",
  slow: "adj",
  good: "adj",
  bad: "adj",
  better: "adj",
  worse: "adj",
  best: "adj",
  worst: "adj",
  little: "adj",
  much: "adj",
  many: "adj",
  few: "adj",
  more: "adj",
  most: "adj",
  less: "adj",
  same: "adj",
  other: "adj",
  own: "adj",
  like: "v",
  want: "v",
  need: "v",
  make: "v",
  take: "v",
  give: "v",
  get: "v",
  go: "v",
  come: "v",
  see: "v",
  know: "v",
  think: "v",
  feel: "v",
  look: "v",
  seem: "v",
  become: "v",
  keep: "v",
  let: "v",
  put: "v",
  mean: "v",
  say: "v",
  tell: "v",
  ask: "v",
  try: "v",
  use: "v",
  work: "v",
  play: "v",
  live: "v",
  study: "v",
  learn: "v",
  teach: "v",
  help: "v",
  start: "v",
  stop: "v",
  change: "v",
  increase: "v",
  decrease: "v",
  rise: "v",
  fall: "v",
  cause: "v",
  allow: "v",
  require: "v",
  provide: "v",
  include: "v",
  remain: "v",
  occur: "v",
  happen: "v",
  exist: "v",
  argue: "v",
  claim: "v",
  suggest: "v",
  consider: "v",
  believe: "v",
  prefer: "v",
  choose: "v",
  decide: "v",
  develop: "v",
  produce: "v",
  create: "v",
  reduce: "v",
  improve: "v",
  affect: "v",
  effect: "n",
  research: "n",
  impact: "n",
  issue: "n",
  problem: "n",
  solution: "n",
  people: "n",
  person: "n",
  child: "n",
  children: "n",
  government: "n",
  data: "n",
  information: "n",
  evidence: "n",
  figure: "n",
  number: "n",
  rate: "n",
  level: "n",
  system: "n",
  process: "n",
  result: "n",
  reason: "n",
  example: "n",
  way: "n",
  time: "n",
  year: "n",
  day: "n",
  life: "n",
  world: "n",
  city: "n",
  country: "n",
  school: "n",
  class: "n",
  student: "n",
  teacher: "n",
  family: "n",
  friend: "n",
  home: "n",
  house: "n",
  food: "n",
  water: "n",
  money: "n",
  job: "n",
  health: "n",
  climate: "n",
  environment: "n",
  technology: "n",
  internet: "n",
  media: "n",
  culture: "n",
  language: "n",
  book: "n",
  music: "n",
  film: "n",
  art: "n",
  law: "n",
  crime: "n",
  energy: "n",
  pollution: "n",
  tuition: "n",
  curriculum: "n",
  literacy: "n",
  assessment: "n",
  dropout: "n",
  grant: "n",
  thesis: "n",
  faculty: "n",
  lecture: "n",
  seminar: "n",
  syllabus: "n",
  inclusive: "adj",
  remedial: "adj",
  vocational: "adj",
  standardised: "adj",
  standardized: "adj",
  extra: "adj",
  public: "adj",
  private: "adj",
  local: "adj",
  global: "adj",
  social: "adj",
  economic: "adj",
  environmental: "adj",
  digital: "adj",
  mental: "adj",
  physical: "adj",
  urban: "adj",
  rural: "adj",
  suburban: "adj",
  appointment: "n",
  schedule: "n",
  household: "n",
  academic: "adj",
  significant: "adj",
  major: "adj",
  minor: "adj",
  common: "adj",
  rare: "adj",
  possible: "adj",
  likely: "adj",
  however: "adv",
  therefore: "adv",
  moreover: "adv",
  furthermore: "adv",
  nevertheless: "adv",
  meanwhile: "adv",
  currently: "adv",
  recently: "adv",
  particularly: "adv",
  especially: "adv",
  increasingly: "adv",
  significantly: "adv",
  automatically: "adv",
  although: "conj",
  because: "conj",
  if: "conj",
  when: "conj",
  while: "conj",
  whereas: "conj",
  unless: "conj",
  until: "conj",
  whether: "conj",
  before: "conj",
  after: "conj",
  of: "prep",
  in: "prep",
  on: "prep",
  at: "prep",
  for: "prep",
  from: "prep",
  with: "prep",
  about: "prep",
  between: "prep",
  among: "prep",
  during: "prep",
  without: "prep",
  within: "prep",
  into: "prep",
  through: "prep",
  festival: "n",
  hospital: "n",
  animal: "n",
  material: "n",
  capital: "n",
  trial: "n",
  ritual: "n",
  arrival: "n",
  proposal: "n",
  tutorial: "n",
  journal: "n",
  signal: "n",
  professional: "adj",
  accurate: "adj",
  efficient: "adj",
  responsible: "adj",
  usually: "adv",
  instead: "adv",
  tend: "v",
  consistency: "n",
  plagiarism: "n",
  citation: "n",
  dissertation: "n",
  accreditation: "n",
  retention: "n",
  enrolment: "n",
  enrollment: "n",
  attendance: "n",
  truancy: "n",
  discipline: "n",
  scholarship: "n",
  apprenticeship: "n",
  mentorship: "n",
  pedagogy: "n",
  numeracy: "n",
  streaming: "n",
  routine: "n",
};

const PARTICLE = new Set("up out off on in over away down back through around about".split(" "));

function lastWord(s: string) {
  const p = s.trim().toLowerCase().split(/\s+/);
  return p[p.length - 1] ?? s;
}

function fromExample(word: string, example: string): Pos | null {
  const head = lastWord(word);
  const esc = head.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const ex = example;
  if (new RegExp(`\\bto\\s+${esc}\\b`, "i").test(ex)) return "v";
  if (new RegExp(`\\b(very|more|most|so|too|quite|rather|extremely|fairly)\\s+${esc}\\b`, "i").test(ex)) return "adj";
  if (new RegExp(`\\b(is|are|was|were|be|been|being|seem|seems|look|looks|become|became)\\s+${esc}\\b`, "i").test(ex))
    return "adj";
  if (new RegExp(`\\b(the|a|an|this|that|his|her|their|our|my|its|these|those)\\s+${esc}\\b`, "i").test(ex)) return "n";
  if (new RegExp(`\\b${esc}(s|ed|ing)?\\s+(by|with|from|into|that)\\b`, "i").test(ex)) return "v";
  return null;
}

function fromVi(vi: string): Pos | null {
  const s = vi.trim().toLowerCase();
  if (/^một cách\b/.test(s) || /ly$/.test(s)) return "adv";
  if (/^(sự|việc|người|kẻ|nền|tỷ lệ|mức|cách|nơi|kẻ|đứa|bọn|nhóm|hệ|ngành|lĩnh vực)\b/.test(s)) return "n";
  if (/^(đi|làm|bấm|dọn|ngủ|mở|đóng|nói|viết|đọc|nghe|ăn|uống|mua|bán|học|dạy|chạy|đứng|ngồi|mang|đưa|cho|nhận|chia|gặp|thấy|nhìn|nghĩ|cảm|thích|muốn|cần|giúp|bắt|dừng|tăng|giảm|gây|cho phép|yêu cầu|cung cấp)\b/.test(s))
    return "v";
  if (/^(rất |khá |hơi )/.test(s)) return "adj";
  return null;
}

function fromSuffix(word: string): Pos | null {
  const w = lastWord(word);
  if (ADJ_LY.has(w)) return "adj";
  if (/(tion|sion|ment|ness|ity|ism|ance|ence|ship|hood|ology|graphy|phobia|isation|ization|ability|ibility)$/.test(w))
    return "n";
  if (/(ically|ously|ively|fully|lessly|ingly|ward|wards)$/.test(w) || /ly$/.test(w)) return "adv";
  if (/(ous|ful|less|ive|able|ible|ical|ish|esque|al)$/.test(w) && !/(ical|vival|recital|festival|hospital|animal|material|capital|signal|trial|ritual)$/.test(w))
    return "adj";
  if (/(ize|ise|ify)$/.test(w) && !/(precise|concise|expertise|merchandise)$/.test(w)) return "v";
  if (/(tion|sion|ment)$/.test(w)) return "n";
  if (/al$/.test(w) && /(tion|sion)/.test(w.slice(0, -2))) return "adj";
  return null;
}

export function guessPos(word: string, vi = "", example = ""): Pos {
  const key = word.trim().toLowerCase();
  if (FIX[key]) return FIX[key];
  const parts = key.split(/\s+/).filter(Boolean);
  if (parts.length > 1) {
    if (FIX[parts[0]]) {
      if (FIX[parts[0]] === "v" || PARTICLE.has(parts[parts.length - 1])) return "v";
    }
    if (PARTICLE.has(parts[parts.length - 1])) return "v";
    const byEx = fromExample(key, example);
    if (byEx) return byEx === "v" ? "v" : "phr";
    return "phr";
  }
  return fromExample(key, example) || fromVi(vi) || fromSuffix(key) || FIX[lastWord(key)] || "n";
}

export function posVi(word: string, vi = "", example = "", known?: Pos): string {
  return POS_VI[known ?? guessPos(word, vi, example)];
}

export function posHint(pos: Pos): string {
  if (pos === "n") return "Danh từ — bỏ vào câu: There are five people in my class. One of them has a ____.";
  if (pos === "v") return "Động từ — bỏ vào câu: In my class, one of them always ____.";
  if (pos === "adj") return "Tính từ — bỏ vào câu: One of them is very ____.";
  if (pos === "adv") return "Trạng từ — bỏ vào câu: She speaks ____ in class.";
  if (pos === "phr") return "Cụm từ — nhét nguyên cụm vào một câu lớp.";
  if (pos === "conj") return "Liên từ — nối hai vế: She is quiet, whereas Khoa is loud.";
  return "Giới từ — đứng trước danh từ: in my class, at the desk.";
}
