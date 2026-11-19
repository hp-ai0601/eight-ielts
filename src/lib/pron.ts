import { LEXICON } from "@/lib/lexicon";
import { CLASS_WORDS } from "@/lib/zang/content";

export type PronHit = {
  word: string;
  ok: boolean;
  heard?: string;
  ipa?: string;
  tip?: string;
};

export type PronCoach = {
  pct: number;
  hits: PronHit[];
  heard: string;
  notes: string[];
};

const SKIP_TIP = new Set(
  "a an the to of in on at for and or but so i you he she it we they my your me him her his their our is are am was were be".split(" "),
);

let IPA: Map<string, string> | null = null;
function ipaMap() {
  if (IPA) return IPA;
  const m = new Map<string, string>();
  for (const w of CLASS_WORDS) if (w.ipa) m.set(w.word.toLowerCase(), w.ipa);
  for (const x of LEXICON) {
    const k = x.word.toLowerCase();
    if (x.ipa && !m.has(k)) m.set(k, x.ipa);
  }
  IPA = m;
  return m;
}

export function ipaOf(word: string): string | undefined {
  const w = word.toLowerCase().replace(/[^a-z']/g, "");
  const m = ipaMap();
  if (m.has(w)) return m.get(w);
  if (w.endsWith("s") && m.has(w.slice(0, -1))) return m.get(w.slice(0, -1));
  if (w.endsWith("ed") && m.has(w.slice(0, -2))) return m.get(w.slice(0, -2));
  if (w.endsWith("ing") && m.has(w.slice(0, -3))) return m.get(w.slice(0, -3));
  return undefined;
}

function lev(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array<number>(n).fill(0)]);
  for (let j = 1; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[m][n];
}

const norm = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
const close = (a: string, b: string) => a === b || lev(a, b) <= (a.length > 5 ? 2 : 1);

export function soundTip(word: string, heard?: string): string {
  const w = word.toLowerCase();
  const h = (heard ?? "").toLowerCase();

  if (h && h !== w) {
    if ((/^th/.test(w) || w === "the") && /^[tdz]/.test(h)) {
      return "Âm th: đặt đầu lưỡi giữa hai hàm răng rồi thổi hơi. think là /θ/, the là /ð/ — không đọc thành t hay d.";
    }
    if (/^ch/.test(w) && /^(sh|s|k)/.test(h)) {
      return "Âm /tʃ/ (cheap, chair, much): đầu lưỡi chạm nướu rồi bật hơi. Không đọc thành she (/ʃ/) hay kip.";
    }
    if (/^sh/.test(w) && /^s[^h]/.test(h)) {
      return "Âm /ʃ/ (she, ship, wash): môi hơi chu, lưỡi lên vòm miệng. Không đọc thành s thường.";
    }
    if ((w.includes("ee") || w.endsWith("ea") || w.includes("ea")) && h.length <= w.length) {
      return "Nguyên âm dài /iː/ (cheap, sheep, eat): kéo hơi, miệng hơi cười. Đừng cắt ngắn thành /ɪ/ như chip / ship.";
    }
    if (/ing$/.test(w) && /in$/.test(h)) {
      return "Âm cuối /ŋ/ (singing, clothing): kéo mũi, lưỡi chạm vòm miệng sau. Đừng nuốt thành -in.";
    }
    if (/s$/.test(w) && !/s$/.test(h)) {
      return "Nhớ đọc phụ âm cuối -s: buys = /baɪz/, cheap không có -s thì khỏi thêm.";
    }
    if (/ed$/.test(w) && !/d$|t$|ed$/.test(h)) {
      return "Đuôi -ed: liked = /laɪkt/, needed = /ˈniːdɪd/, played = /pleɪd/. Đừng nuốt âm cuối.";
    }
    if (w.endsWith("l") && !h.endsWith("l") && !h.endsWith("el")) {
      return "Phụ âm cuối /l/: đầu lưỡi chạm nướu. people = /ˈpiːpl/, không phải peopo.";
    }
  }

  if (/th/.test(w)) return "Có âm th: lưỡi giữa răng, thổi hơi nhẹ. think /θɪŋk/, this /ðɪs/.";
  if (/^ch|ch$/.test(w)) return "Âm /tʃ/: cheap /tʃiːp/, much /mʌtʃ/. Đầu lưỡi chạm nướu rồi bật.";
  if (/sh/.test(w)) return "Âm /ʃ/: she /ʃiː/, wash /wɒʃ/. Môi chu, lưỡi lên vòm miệng.";
  if (/ing$/.test(w)) return "Âm cuối /ɪŋ/: clothing /ˈkləʊðɪŋ/. Kéo mũi, đừng đọc -in.";
  if (/ed$/.test(w)) return "Đuôi -ed phải nghe được /t/, /d/ hoặc /ɪd/.";
  if (/[aeiou]s$/.test(w) || /ys$/.test(w)) return "Đuôi -s: sau nguyên âm thường là /z/ (buys /baɪz/, days /deɪz/).";
  if (w.endsWith("p") || w.endsWith("t") || w.endsWith("k") || w.endsWith("d")) {
    return "Đọc rõ phụ âm cuối — nuốt mất -p/-t/-k/-d là mất điểm phát âm.";
  }
  return "Đọc chậm từng âm tiết, nhấn trọng âm, đọc rõ phụ âm cuối.";
}

export function coachPron(target: string, heard: string): PronCoach {
  const tWords = target
    .split(/\s+/)
    .map((raw) => ({ raw: raw.replace(/^[“”"'(]+|[“”"').,!?;:]+$/g, ""), n: norm(raw) }))
    .filter((x) => x.n);
  const hWords = heard.split(/\s+/).map(norm).filter(Boolean);
  const used = new Set<number>();

  const hits: PronHit[] = tWords.map((tw) => {
    let found = -1;
    for (let i = 0; i < hWords.length; i++) {
      if (used.has(i)) continue;
      if (close(hWords[i], tw.n)) {
        found = i;
        break;
      }
    }
    if (found < 0) {
      for (let i = 0; i < hWords.length; i++) {
        if (used.has(i)) continue;
        if (lev(hWords[i], tw.n) <= Math.max(2, Math.floor(tw.n.length / 3))) {
          found = i;
          break;
        }
      }
    }
    if (found >= 0) used.add(found);
    const heardWord = found >= 0 ? hWords[found] : undefined;
    const ok = found >= 0 && close(hWords[found], tw.n);
    const skip = SKIP_TIP.has(tw.n);
    return {
      word: tw.raw || tw.n,
      ok,
      heard: !ok ? heardWord : undefined,
      ipa: ipaOf(tw.n),
      tip: !ok && !skip ? soundTip(tw.n, heardWord) : undefined,
    };
  });

  const content = hits.filter((h) => !SKIP_TIP.has(h.word.toLowerCase()));
  const pool = content.length ? content : hits;
  const pct = Math.round((pool.filter((h) => h.ok).length / Math.max(1, pool.length)) * 100);

  const notes: string[] = [];
  const missed = hits.filter((h) => !h.ok && h.tip);
  if (pct >= 85) notes.push("Đọc rõ rồi — lần sau nhấn giọng ở từ mang nghĩa, hạ giọng ở cuối câu.");
  else if (missed[0]) notes.push(`Từ cần luyện trước: “${missed[0].word}”. Nghe mẫu chậm, rồi đọc lại đúng từ đó.`);
  else notes.push("Máy chưa nghe đủ — em đọc to hơn, chậm hơn một chút.");

  return { pct, hits, heard: heard.trim(), notes };
}
