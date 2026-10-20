/** Ảnh từ vựng: emoji đúng nghĩa ngay; ảnh chỉ hiện khi tên file / Wikipedia khớp từ. */

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
  reminder: "🔔",
  anxious: "😬",
  commute: "🚌",
  errand: "🏃",
  chore: "🧹",
  nap: "😴",
  snooze: "⏰",
};

const HINTS: [RegExp, string][] = [
  [/\b(apple|táo)\b/, "🍎"],
  [/\b(banana|chuối)\b/, "🍌"],
  [/\b(bread|bánh mì|gạo|rice|cơm|food|đồ ăn|meal|bữa)\b/, "🍚"],
  [/\b(coffee|cà phê|tea|trà)\b/, "☕"],
  [/\b(water|nước uống|drink|uống)\b/, "💧"],
  [/\b(cook|nấu|kitchen|bếp|recipe|công thức)\b/, "🍳"],
  [/\b(family|gia đình|parent|cha mẹ|mother|mother|father|bố|mẹ)\b/, "👨‍👩‍👧"],
  [/\b(child|trẻ em|kid|baby|em bé)\b/, "🧒"],
  [/\b(house|nhà|home|housing|căn hộ|apartment|flat)\b/, "🏠"],
  [/\b(door|cửa|window|cửa sổ)\b/, "🚪"],
  [/\b(bed|giường|sleep|ngủ|nap|snooze)\b/, "🛏️"],
  [/\b(clothes|quần áo|shirt|áo|dress|váy|wear|mặc)\b/, "👕"],
  [/\b(shoe|giày|boot)\b/, "👟"],
  [/\b(body|cơ thể|health|sức khỏe|doctor|bác sĩ|hospital|bệnh viện|medicine|thuốc)\b/, "🏥"],
  [/\b(sport|thể thao|football|bóng|swim|bơi|run|chạy|gym)\b/, "⚽"],
  [/\b(music|nhạc|song|bài hát|concert)\b/, "🎵"],
  [/\b(film|phim|movie|cinema)\b/, "🎬"],
  [/\b(book|sách|read|đọc|library|thư viện|novel)\b/, "📚"],
  [/\b(school|trường|class|lớp|student|học sinh|tuition|học phí|education|giáo dục|university|đại học|exam|thi)\b/, "🏫"],
  [/\b(job|việc làm|work|công việc|career|sự nghiệp|office|văn phòng)\b/, "💼"],
  [/\b(money|tiền|pay|trả|salary|lương|bank|ngân hàng|tax|thuế)\b/, "💰"],
  [/\b(shop|mua|shopping|store|chợ|market)\b/, "🛒"],
  [/\b(car|xe hơi|bus|xe buýt|train|tàu|plane|máy bay|bike|xe đạp|commute|đi lại|transport|giao thông)\b/, "🚌"],
  [/\b(travel|du lịch|holiday|kỳ nghỉ|tour|tourism)\b/, "✈️"],
  [/\b(weather|thời tiết|rain|mưa|storm|bão|cloud|mây)\b/, "🌦️"],
  [/\b(sun|nắng|hot|nóng|heat)\b/, "☀️"],
  [/\b(cold|lạnh|snow|tuyết|winter|đông)\b/, "❄️"],
  [/\b(tree|cây|forest|rừng|nature|thiên nhiên|garden|vườn)\b/, "🌳"],
  [/\b(animal|động vật|pet|thú|dog|chó|cat|mèo|bird|chim)\b/, "🐾"],
  [/\b(city|đô thị|urban|street|phố|traffic|kẹt xe)\b/, "🏙️"],
  [/\b(phone|điện thoại|internet|mạng|computer|máy tính|tech|công nghệ)\b/, "📱"],
  [/\b(ads|quảng cáo|media|truyền thông|news|tin)\b/, "📺"],
  [/\b(law|luật|crime|tội|police|cảnh sát|court|tòa)\b/, "⚖️"],
  [/\b(gov|government|chính quyền|vote|bầu|politics)\b/, "🏛️"],
  [/\b(climate|khí hậu|pollution|ô nhiễm|environment|môi trường|energy|năng lượng)\b/, "🌍"],
  [/\b(science|khoa học|research|nghiên cứu|lab|labo)\b/, "🔬"],
  [/\b(space|vũ trụ|planet|hành tinh|moon|trăng|star|sao)\b/, "🚀"],
  [/\b(art|nghệ thuật|paint|vẽ|museum|bảo tàng)\b/, "🎨"],
  [/\b(history|lịch sử|ancient|cổ)\b/, "🏺"],
  [/\b(culture|văn hóa|festival|lễ|tradition|truyền thống)\b/, "🎭"],
  [/\b(friend|bạn bè|together|cùng nhau)\b/, "🫂"],
  [/\b(happy|vui|smile|cười)\b/, "😄"],
  [/\b(sad|buồn|cry|khóc)\b/, "😢"],
  [/\b(angry|giận|mean)\b/, "😠"],
  [/\b(time|thời gian|clock|clock|hour|giờ)\b/, "⏰"],
  [/\b(chore|việc nhà|tidy|dọn)\b/, "🧹"],
  [/\b(errand|việc vặt)\b/, "🏃"],
  [/\b(language|ngôn ngữ|word|từ|grammar|ngữ pháp)\b/, "🔤"],
];

const POS_EMOJI: Record<string, string> = { n: "📦", v: "▶️", adj: "🎨", adv: "💫", phr: "💬", conj: "🔗", prep: "📍" };

const SKIP_FILE =
  /ship|boat|vessel|flag|coat of arms|logo|map of|svg|icon|diagram|chart|\.tif|scan|page \d|album|film poster|disambiguation|wikidata|screenshot|number plate|passport|stamp|store|iphone|macintosh|keyboard|company|inc\b|band\b|surname/i;

const SKIP_WIKI = new Set(
  "break kind mean free hard light match current general capital interest party state right left long short fair fine plain period article term class form case charge issue value power force order level range volume rate base key note band well just even still pretty quite rather".split(
    " ",
  ),
);

const NO_PHOTO_POS = new Set(["conj", "prep", "adv"]);

export function picEmoji(word: string, pos?: string, vi?: string) {
  const w = word.toLowerCase().trim();
  if (EMOJI[w]) return EMOJI[w];
  const blob = `${w} ${vi ?? ""}`.toLowerCase();
  for (const [re, em] of HINTS) {
    if (re.test(blob)) return em;
  }
  return (pos ? POS_EMOJI[pos] : undefined) ?? "🖼️";
}

type CommonsPage = { title?: string; imageinfo?: { thumburl?: string }[] };

function fileStem(title: string) {
  return title
    .replace(/^File:/i, "")
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[_-]+/g, " ")
    .toLowerCase()
    .trim();
}

function titleHits(title: string, word: string) {
  if (SKIP_FILE.test(title)) return false;
  const stem = fileStem(title);
  const w = word.toLowerCase().trim();
  if (!w) return false;
  if (stem === w) return true;
  if (!stem.startsWith(w + " ")) return false;
  const rest = stem.slice(w.length).trim();
  if (/^(store|inc|llc|company|band|album|logo|flag|map|kit|software|iphone)\b/.test(rest)) return false;
  if (/^\([\w\s,.-]+\)$/.test(rest) || /^\d/.test(rest)) return true;
  return rest.split(/\s+/).length <= 2;
}

async function fromWikipedia(word: string): Promise<string | null> {
  const w = word.trim();
  if (SKIP_WIKI.has(w.toLowerCase()) || w.length < 4) return null;
  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(w)}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return null;
  const d = (await res.json()) as {
    type?: string;
    title?: string;
    description?: string;
    extract?: string;
    thumbnail?: { source?: string };
  };
  if (d.type !== "standard") return null;
  if ((d.title ?? "").toLowerCase() !== w.toLowerCase()) return null;
  const blob = `${d.description ?? ""} ${d.extract ?? ""}`.toLowerCase();
  if (/\balbum\b|\bsingle\b|song by|\bfilm\b|\bsurname\b|given name|\bband\b|television|\bepisode\b|\bcompany\b|\bbrand\b|\bsoftware\b|\bvideo game\b/.test(blob))
    return null;
  return d.thumbnail?.source ?? null;
}

async function fromCommons(word: string): Promise<string | null> {
  const q = `intitle:"${word}" filetype:bitmap -svg -logo -flag -map`;
  const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url&iiurlwidth=480&format=json&origin=*`;
  const d = (await fetch(api).then((r) => r.json())) as { query?: { pages?: Record<string, CommonsPage> } };
  const pages = Object.values(d.query?.pages ?? {});
  const hit = pages.find((p) => titleHits(p.title ?? "", word));
  return hit?.imageinfo?.[0]?.thumburl ?? null;
}

export async function resolvePic(word: string, _vi?: string, pos?: string): Promise<string | null> {
  const w = word.toLowerCase().trim();
  if (!w || NO_PHOTO_POS.has(pos ?? "") || w.split(/\s+/).length > 4) return null;
  const key = `eight.pic.v4.${w}`;
  try {
    const hit = sessionStorage.getItem(key);
    if (hit === "none") return null;
    if (hit) return hit;
  } catch {
    /* ignore */
  }
  let url: string | null = null;
  try {
    url = await fromWikipedia(word.trim());
    if (!url) url = await fromCommons(word.trim());
  } catch {
    url = null;
  }
  try {
    sessionStorage.setItem(key, url ?? "none");
  } catch {
    /* ignore */
  }
  return url;
}
