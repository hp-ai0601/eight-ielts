import type { Topic } from "./types";
import { ch, cl, lq, rq, topic, v } from "./make";

type Row = [string, string, string, string];
type Q = [string, string[], string, string];
type C = [string, "True" | "False" | "Not Given", string];

export function mini(p: {
  id: string;
  name: string;
  vi: string;
  stage: Topic["stage"];
  vocab: Row[];
  chunks?: Topic["chunks"];
  script: string;
  lq: Q[];
  passage: string;
  rq: Q[];
  claims: C[];
  write: string;
  min?: number;
  speak: Topic["speak"];
  hw: string;
}): Topic {
  const vocab = p.vocab.map(([w, ipa, vi, ex]) => v(w, ipa, vi, ex));
  const chunks =
    p.chunks ??
    vocab.slice(0, 6).map((x, i) =>
      ch(x.word, x.vi, i % 2 ? x.word + "s" : x.word.split(" ").reverse().join(" ")),
    );
  return topic({
    id: p.id,
    name: p.name,
    vi: p.vi,
    stage: p.stage,
    vocab,
    chunks,
    script: p.script,
    listenQs: p.lq.map((x, i) => lq(`${p.id}l${i}`, x[0], x[1], x[2], x[3])),
    passage: p.passage,
    readQs: p.rq.map((x, i) => rq(`${p.id}r${i}`, x[0], x[1], x[2], x[3])),
    claims: p.claims.map((x) => cl(x[0], x[1], x[2])),
    write: { task: 2, min: p.min ?? 250, prompt: p.write },
    speak: p.speak,
    homework: p.hw,
  });
}
