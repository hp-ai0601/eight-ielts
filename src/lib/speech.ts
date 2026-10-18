export function speak(text: string, rate = 0.92) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-GB";
  u.rate = rate;
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find((x) => /en-GB|en-US|English/i.test(x.lang));
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

export function stopSpeak() {
  if (typeof window !== "undefined") window.speechSynthesis?.cancel();
}
