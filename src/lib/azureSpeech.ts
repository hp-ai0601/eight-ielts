/** Azure Pronunciation Assessment — chấm từng phoneme như ELSA.
 *  IPA + ngữ điệu chỉ có ở locale en-US. SDK tải từ CDN, chạy trên máy học trò. */

const LS = "eight.azureSpeech";
const SDK_SRC = "https://aka.ms/csspeech/jsbrowserpackageraw";

export type SpeechCreds = { key: string; region: string };

export type PronPhoneme = {
  ipa: string;
  score: number;
  said?: string;
  tip?: string;
};

export type PronWord = {
  word: string;
  score: number;
  error: string;
  phonemes: PronPhoneme[];
};

export type PronReport = {
  heard: string;
  pron: number;
  accuracy: number;
  fluency: number;
  completeness: number;
  prosody?: number;
  words: PronWord[];
};

type SdkNs = {
  SpeechConfig: { fromSubscription: (key: string, region: string) => SpeechCfg };
  AudioConfig: { fromDefaultMicrophoneInput: () => unknown };
  SpeechRecognizer: new (cfg: SpeechCfg, audio: unknown) => Recognizer;
  OutputFormat?: { Detailed: number };
  PronunciationAssessmentConfig: new (
    text: string,
    grading: number,
    granularity: number,
    enableMiscue: boolean,
  ) => PaCfg;
  PronunciationAssessmentGradingSystem: { HundredMark: number };
  PronunciationAssessmentGranularity: { Phoneme: number };
  PropertyId: { SpeechServiceResponse_JsonResult: number };
  ResultReason: { RecognizedSpeech: number };
};

type SpeechCfg = { speechRecognitionLanguage: string; outputFormat?: number };
type PaCfg = {
  phonemeAlphabet: string;
  nbestPhonemeCount: number;
  enableProsodyAssessment: boolean | (() => void);
  applyTo: (r: Recognizer) => void;
};
type Recognizer = {
  recognizeOnceAsync: (ok: (r: RecResult) => void, err: (e: string) => void) => void;
  close: () => void;
};
type RecResult = {
  reason: number;
  text: string;
  errorDetails?: string;
  properties: { getProperty: (id: number) => string };
};

declare global {
  interface Window {
    SpeechSDK?: SdkNs;
  }
}

export function getSpeechCreds(): SpeechCreds | null {
  const envKey = (process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY || "").trim();
  const envRegion = (process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION || "").trim() || "eastasia";
  if (envKey) return { key: envKey, region: envRegion };
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS);
    if (!raw) return null;
    const j = JSON.parse(raw) as SpeechCreds;
    if (j?.key?.trim() && j?.region?.trim()) return { key: j.key.trim(), region: j.region.trim() };
  } catch {
    /* ignore */
  }
  return null;
}

export function setSpeechCreds(c: SpeechCreds | null) {
  if (typeof window === "undefined") return;
  if (!c?.key?.trim()) localStorage.removeItem(LS);
  else localStorage.setItem(LS, JSON.stringify({ key: c.key.trim(), region: (c.region || "eastasia").trim() }));
  window.dispatchEvent(new Event("eight"));
}

export function maskKey(key: string) {
  const k = key.trim();
  if (k.length < 8) return "••••";
  return `${k.slice(0, 4)}…${k.slice(-4)}`;
}

function loadSdk(): Promise<SdkNs> {
  if (typeof window === "undefined") return Promise.reject(new Error("server"));
  if (window.SpeechSDK) return Promise.resolve(window.SpeechSDK);
  return new Promise((resolve, reject) => {
    const existed = document.querySelector(`script[src="${SDK_SRC}"]`);
    if (existed) {
      const wait = () => {
        if (window.SpeechSDK) resolve(window.SpeechSDK);
        else setTimeout(wait, 80);
      };
      wait();
      return;
    }
    const s = document.createElement("script");
    s.src = SDK_SRC;
    s.async = true;
    s.onload = () => {
      if (window.SpeechSDK) resolve(window.SpeechSDK);
      else reject(new Error("Không tải được bộ chấm âm Azure."));
    };
    s.onerror = () => reject(new Error("Không tải được bộ chấm âm — kiểm tra mạng nhé."));
    document.head.appendChild(s);
  });
}

const IPA_TIP: Record<string, string> = {
  θ: "Âm /θ/ (think, three): lưỡi đặt giữa hai hàm răng, thổi hơi. Không đọc thành /t/.",
  ð: "Âm /ð/ (the, this, clothes): lưỡi giữa răng, rung nhẹ. Không đọc /d/ hay /z/.",
  ʃ: "Âm /ʃ/ (she, wash): môi chu, lưỡi lên vòm miệng.",
  tʃ: "Âm /tʃ/ (cheap, chair): đầu lưỡi chạm nướu rồi bật hơi — không đọc thành she.",
  dʒ: "Âm /dʒ/ (job, just): giống /tʃ/ nhưng có thanh.",
  ŋ: "Âm /ŋ/ (sing, clothing): kéo mũi, đừng nuốt thành -in.",
  æ: "Âm /æ/ (cat, bad): miệng mở ngang, ngắn.",
  ɪ: "Âm ngắn /ɪ/ (ship, sit): cắt hơi. Đừng kéo thành sheep /iː/.",
  i: "Âm dài /i/ (sheep, cheap): kéo hơi, miệng cười.",
  "iː": "Âm dài /iː/ (sheep, cheap): kéo hơi, miệng cười.",
  ɛ: "Âm /ɛ/ (bed, hello): miệng mở vừa, ngắn.",
  ə: "Âm schwa /ə/ (a, the): thả lỏng, rất ngắn.",
  ʌ: "Âm /ʌ/ (cup, luck): miệng mở, ngắn.",
  ɑ: "Âm /ɑ/ (hot, father): miệng mở rộng.",
  ɔ: "Âm /ɔ/ (thought, law): môi tròn.",
  ʊ: "Âm ngắn /ʊ/ (book, put).",
  u: "Âm dài /u/ (food, two): môi chu, kéo hơi.",
  "uː": "Âm dài /uː/ (food): môi chu, kéo hơi.",
  aɪ: "Nguyên âm đôi /aɪ/ (buy, my): từ a sang i.",
  aʊ: "Nguyên âm đôi /aʊ/ (now, how).",
  oʊ: "Nguyên âm đôi /oʊ/ (go, clothes): môi chu dần.",
  eɪ: "Nguyên âm đôi /eɪ/ (day, late).",
  ɔɪ: "Nguyên âm đôi /ɔɪ/ (boy, voice).",
  r: "Âm /r/ Mỹ: đầu lưỡi cong lên, không chạm nướu.",
  l: "Âm /l/: đầu lưỡi chạm nướu.",
  v: "Âm /v/: răng trên chạm môi dưới, có thanh. Không đọc thành /w/ hay /f/.",
  w: "Âm /w/: môi chu tròn.",
  f: "Âm /f/: răng trên chạm môi dưới, thổi hơi.",
  p: "Phụ âm /p/: ngậm rồi bật. Ở cuối từ đừng nuốt.",
  t: "Phụ âm /t/: đầu lưỡi chạm nướu rồi bật. Ở cuối từ phải nghe được.",
  k: "Phụ âm /k/: bật ở họng. Ở cuối từ (back, like) đừng nuốt.",
  b: "Âm /b/: như /p/ nhưng có thanh.",
  d: "Âm /d/: như /t/ nhưng có thanh.",
  g: "Âm /g/: như /k/ nhưng có thanh.",
  s: "Âm /s/: gió qua kẽ răng, không thanh.",
  z: "Âm /z/ (buys, days): như /s/ nhưng có thanh.",
  h: "Âm /h/: thở hơi qua họng.",
  n: "Âm /n/: mũi, lưỡi chạm nướu.",
  m: "Âm /m/: mũi, môi khép.",
  "ɝ": "Âm /ɝ/ (bird, her) Mỹ: lưỡi cong, kéo hơi.",
  ɚ: "Âm /ɚ/ (teacher): schwa + r.",
};

export function ipaTip(ipa: string): string | undefined {
  if (IPA_TIP[ipa]) return IPA_TIP[ipa];
  const compact = ipa.replace("ː", "");
  return IPA_TIP[compact] || IPA_TIP[ipa.slice(0, 1)];
}

export function errorVi(error: string): string {
  switch (error) {
    case "Mispronunciation":
      return "Đọc sai âm";
    case "Omission":
      return "Bỏ từ này";
    case "Insertion":
      return "Thêm từ không có trong câu";
    case "UnexpectedBreak":
      return "Ngắt hơi giữa chừng";
    case "MissingBreak":
      return "Đọc dính, thiếu ngừng";
    case "Monotone":
      return "Giọng đều — hãy lên xuống nhịp";
    default:
      return "";
  }
}

export function scoreHue(n: number) {
  if (n >= 80) return "lime" as const;
  if (n >= 60) return "yellow" as const;
  return "bad" as const;
}

type AzureJson = {
  DisplayText?: string;
  RecognitionStatus?: string | number;
  NBest?: {
    Display?: string;
    PronunciationAssessment?: {
      AccuracyScore?: number;
      FluencyScore?: number;
      CompletenessScore?: number;
      PronScore?: number;
      ProsodyScore?: number;
    };
    Words?: {
      Word: string;
      PronunciationAssessment?: { AccuracyScore?: number; ErrorType?: string };
      Phonemes?: {
        Phoneme: string;
        PronunciationAssessment?: {
          AccuracyScore?: number;
          NBestPhonemes?: { Phoneme: string; Score: number }[];
        };
      }[];
    }[];
  }[];
};

function parseReport(json: AzureJson, fallbackHeard: string): PronReport {
  const best = json.NBest?.[0];
  const pa = best?.PronunciationAssessment ?? {};
  const words: PronWord[] = (best?.Words ?? []).map((w) => {
    const err = w.PronunciationAssessment?.ErrorType ?? "None";
    const phonemes: PronPhoneme[] = (w.Phonemes ?? []).map((p) => {
      const score = p.PronunciationAssessment?.AccuracyScore ?? 0;
      const nbest = p.PronunciationAssessment?.NBestPhonemes ?? [];
      const top = nbest[0];
      const said = top && top.Phoneme !== p.Phoneme && score < 80 ? top.Phoneme : undefined;
      return {
        ipa: p.Phoneme,
        score: Math.round(score),
        said,
        tip: score < 80 ? ipaTip(p.Phoneme) : undefined,
      };
    });
    return {
      word: w.Word,
      score: Math.round(w.PronunciationAssessment?.AccuracyScore ?? 0),
      error: err === "None" ? "" : err,
      phonemes,
    };
  });
  return {
    heard: (best?.Display || json.DisplayText || fallbackHeard || "").trim(),
    pron: Math.round(pa.PronScore ?? 0),
    accuracy: Math.round(pa.AccuracyScore ?? 0),
    fluency: Math.round(pa.FluencyScore ?? 0),
    completeness: Math.round(pa.CompletenessScore ?? 0),
    prosody: pa.ProsodyScore == null ? undefined : Math.round(pa.ProsodyScore),
    words,
  };
}

export async function assessPronunciation(referenceText: string): Promise<PronReport> {
  const creds = getSpeechCreds();
  if (!creds) throw new Error("Chưa gắn khóa Azure Speech — thầy dán khóa ở trang Thầy → Chấm phát âm.");
  const sdk = await loadSdk();
  const cfg = sdk.SpeechConfig.fromSubscription(creds.key, creds.region);
  cfg.speechRecognitionLanguage = "en-US";
  if (sdk.OutputFormat) cfg.outputFormat = sdk.OutputFormat.Detailed;
  const audio = sdk.AudioConfig.fromDefaultMicrophoneInput();
  const rec = new sdk.SpeechRecognizer(cfg, audio);
  const pa = new sdk.PronunciationAssessmentConfig(
    referenceText,
    sdk.PronunciationAssessmentGradingSystem.HundredMark,
    sdk.PronunciationAssessmentGranularity.Phoneme,
    true,
  );
  pa.phonemeAlphabet = "IPA";
  pa.nbestPhonemeCount = 5;
  if (typeof pa.enableProsodyAssessment === "function") pa.enableProsodyAssessment();
  else pa.enableProsodyAssessment = true;
  pa.applyTo(rec);

  return new Promise((resolve, reject) => {
    rec.recognizeOnceAsync(
      (result) => {
        try {
          if (result.reason !== sdk.ResultReason.RecognizedSpeech) {
            rec.close();
            reject(new Error("Máy chưa nghe rõ câu — em đọc to hơn, chậm hơn một chút."));
            return;
          }
          const raw = result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult);
          const json = JSON.parse(raw || "{}") as AzureJson;
          rec.close();
          resolve(parseReport(json, result.text));
        } catch (e) {
          rec.close();
          reject(e instanceof Error ? e : new Error("Không đọc được kết quả chấm âm."));
        }
      },
      (err) => {
        rec.close();
        const msg = String(err || "");
        if (/401|unauthorized|forbidden/i.test(msg)) {
          reject(new Error("Khóa Azure chưa đúng — thầy kiểm tra lại key và region."));
        } else if (/microphone|permission|NotAllowed/i.test(msg)) {
          reject(new Error("Em cho phép dùng micro rồi bấm lại nhé."));
        } else {
          reject(new Error("Không chấm được — em thử lại. Nếu lặp lại, thầy kiểm tra khóa Azure."));
        }
      },
    );
  });
}
