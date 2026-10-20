/** Ảnh từ vựng: emoji hiện ngay, ảnh Wikimedia Commons tải sau. */

const EMOJI: Record<string, string> = {
  quiet: "🤫",
  loud: "📢",
  tall: "🦒",
  short: "🦆",
  thin: "🥢",
  chubby: "🥟",
  shy: "😳",
  kind: "💛",
  lazy: "🛌",
  messy: "🌪️",
  tidy: "✨",
  early: "🌅",
  late: "🌙",
  funny: "😂",
  serious: "😐",
  clever: "🧠",
  sleepy: "😴",
  hungry: "🍽️",
  tired: "😮‍💨",
  bored: "😑",
  nervous: "😬",
  brave: "🦁",
  friendly: "🤝",
  polite: "🙇",
  happy: "😄",
  sad: "😢",
  busy: "📅",
  free: "🍃",
  new: "🆕",
  old: "📜",
  big: "🐘",
  small: "🐭",
  clean: "🧼",
  dirty: "🧦",
  strong: "💪",
  weak: "🥀",
  fast: "🏃",
  slow: "🐢",
  warm: "☀️",
  cold: "❄️",
  classmate: "👥",
  desk: "🪵",
  bag: "🎒",
  notebook: "📓",
  pen: "🖊️",
  teacher: "👩‍🏫",
  break: "🔔",
  lunch: "🍱",
  umbrella: "☂️",
  jacket: "🧥",
  glasses: "👓",
  smile: "😊",
  voice: "🗣️",
  seat: "🪑",
  window: "🪟",
  phone: "📱",
  homework: "📝",
  library: "📚",
  gate: "🚪",
  rain: "🌧️",
  sit: "🪑",
  stand: "🧍",
  talk: "💬",
  listen: "👂",
  write: "✍️",
  read: "📖",
  draw: "🎨",
  share: "🤲",
  wait: "⏳",
  walk: "🚶",
  laugh: "😆",
  forget: "🤔",
  bring: "📦",
  wear: "👕",
  always: "♾️",
  often: "🔁",
  never: "🚫",
  together: "🫂",
  quietly: "🤫",
  slowly: "🐢",
  cheap: "🪙",
  expensive: "💎",
  outgoing: "🎉",
  hard: "🪨",
  easy: "🎈",
  mean: "😠",
  "hard-working": "🐝",
};

const SEARCH: Record<string, string> = {
  quiet: "silent library",
  loud: "shouting children classroom",
  tall: "tall person standing",
  short: "short child school",
  thin: "thin teenager",
  chubby: "chubby child smiling",
  shy: "shy student",
  kind: "kindness children",
  lazy: "sleeping student desk",
  messy: "messy desk papers",
  tidy: "tidy desk notebook",
  early: "sunrise school",
  late: "running late school",
  funny: "laughing students",
  serious: "exam classroom",
  clever: "student blackboard",
  sleepy: "yawning student",
  hungry: "school lunch box",
  tired: "tired student backpack",
  bored: "classroom window",
  nervous: "exam pencil",
  brave: "student speech",
  friendly: "classmates smiling",
  polite: "student teacher bow",
  happy: "happy student",
  sad: "sad student window",
  busy: "busy student books",
  free: "park grass student",
  new: "new notebook",
  old: "old jacket",
  big: "large backpack",
  small: "pencil case",
  clean: "clean classroom",
  dirty: "muddy shoes",
  strong: "carrying books",
  weak: "heavy backpack",
  fast: "running schoolyard",
  slow: "turtle",
  warm: "sunny classroom",
  cold: "winter rain school",
  classmate: "classroom students",
  desk: "school desk",
  bag: "school backpack",
  notebook: "school notebook",
  pen: "fountain pen paper",
  teacher: "teacher blackboard",
  break: "school playground recess",
  lunch: "packed lunch box",
  umbrella: "umbrella rain",
  jacket: "jacket coat",
  glasses: "eyeglasses book",
  smile: "student smiling",
  voice: "speaking microphone",
  seat: "school chair",
  window: "classroom window",
  phone: "smartphone desk",
  homework: "homework notebook",
  library: "school library",
  gate: "school gate",
  rain: "rain school",
  sit: "sitting desk",
  stand: "standing classroom",
  talk: "students talking",
  listen: "listening classroom",
  write: "handwriting notebook",
  read: "reading book library",
  draw: "drawing notebook",
  share: "sharing food",
  wait: "waiting school gate",
  walk: "walking school",
  laugh: "students laughing",
  forget: "empty bag",
  bring: "lunch box school",
  wear: "wearing jacket",
  always: "school clock",
  often: "reading window",
  never: "empty classroom",
  together: "students walking together",
  quietly: "quiet library",
  slowly: "slow writing",
  cheap: "paperback book",
  expensive: "hardcover textbook",
  outgoing: "friends talking school",
  hard: "difficult exam",
  easy: "homework tick",
  mean: "angry student",
  "hard-working": "student studying night",
};

const POS_EMOJI: Record<string, string> = { n: "📦", v: "▶️", adj: "🎨", adv: "💫", phr: "💬", conj: "🔗", prep: "📍" };

export function picEmoji(word: string, pos?: string) {
  return EMOJI[word.toLowerCase()] ?? (pos ? POS_EMOJI[pos] : "🖼️") ?? "🖼️";
}

type CommonsPage = { title?: string; imageinfo?: { thumburl?: string }[] };

const SKIP = /ship|boat|vessel|flag|coat of arms|logo|map of|svg|icon|diagram|chart/i;

export async function resolvePic(word: string, vi?: string): Promise<string | null> {
  const w = word.toLowerCase();
  if (EMOJI[w]) return null;
  const key = `eight.pic.v3.${w}`;
  try {
    const hit = sessionStorage.getItem(key);
    if (hit === "none") return null;
    if (hit) return hit;
  } catch {
    /* ignore */
  }
  const q = SEARCH[w] ?? `"${word}" ${vi ?? ""} photograph`;
  const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(`${q} -ship -boat -flag -logo filetype:bitmap`)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url&iiurlwidth=480&format=json&origin=*`;
  try {
    const d = (await fetch(api).then((r) => r.json())) as { query?: { pages?: Record<string, CommonsPage> } };
    const pages = Object.values(d.query?.pages ?? {});
    const hit = pages.find((p) => {
      const title = (p.title ?? "").replace(/^File:/i, "");
      if (SKIP.test(title)) return false;
      const stem = w.split(/\s+/)[0];
      return stem.length >= 4 && title.toLowerCase().includes(stem);
    });
    const url = (hit ?? pages.find((p) => !SKIP.test(p.title ?? "")))?.imageinfo?.[0]?.thumburl ?? null;
    try {
      sessionStorage.setItem(key, url ?? "none");
    } catch {
      /* ignore */
    }
    return url;
  } catch {
    return null;
  }
}
