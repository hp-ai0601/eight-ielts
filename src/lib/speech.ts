type SpeakHooks = {
  onProgress?: (p: number) => void;
  onEnd?: () => void;
};

let hooks: SpeakHooks | undefined;
let startedAt = 0;
let elapsedMs = 0;
let estMs = 1;
let tick: ReturnType<typeof setInterval> | undefined;

function clearTick() {
  if (tick) {
    clearInterval(tick);
    tick = undefined;
  }
}

function report(p: number) {
  hooks?.onProgress?.(Math.max(0, Math.min(1, p)));
}

function startTick() {
  clearTick();
  tick = setInterval(() => {
    const p = (elapsedMs + Date.now() - startedAt) / estMs;
    report(p);
    if (p >= 1) clearTick();
  }, 200);
}

export function speak(text: string, rate = 0.92, next?: SpeakHooks) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  clearTick();
  hooks = next;
  const words = text.trim().split(/\s+/).filter(Boolean);
  estMs = Math.max(1600, (words.length / (2.55 * rate)) * 1000);
  elapsedMs = 0;
  startedAt = Date.now();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-GB";
  u.rate = rate;
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find((x) => /en-GB|en-US|English/i.test(x.lang));
  if (v) u.voice = v;
  let wi = 0;
  u.onboundary = (e) => {
    if (e.name === "word" || e.name === "sentence") {
      wi += 1;
      report(Math.min(0.98, wi / Math.max(words.length, 1)));
    }
  };
  u.onend = () => {
    clearTick();
    report(1);
    hooks?.onEnd?.();
  };
  u.onerror = () => {
    clearTick();
    hooks?.onEnd?.();
  };
  window.speechSynthesis.speak(u);
  startTick();
}

export function pauseSpeak() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  if (!window.speechSynthesis.speaking) return;
  window.speechSynthesis.pause();
  elapsedMs += Date.now() - startedAt;
  clearTick();
}

export function resumeSpeak() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.resume();
  startedAt = Date.now();
  startTick();
}

export function stopSpeak() {
  if (typeof window === "undefined") return;
  window.speechSynthesis?.cancel();
  clearTick();
  elapsedMs = 0;
}

export function isSpeakPaused() {
  return typeof window !== "undefined" && !!window.speechSynthesis?.paused;
}
