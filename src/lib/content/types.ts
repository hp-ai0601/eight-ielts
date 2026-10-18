export type QKind = "mcq" | "tf" | "gap";

export interface Question {
  id: string;
  kind: QKind;
  prompt: string;
  options?: string[];
  answer: string;
  why: string;
}

export interface VocabItem {
  id: string;
  word: string;
  ipa: string;
  vi: string;
  example: string;
  trap?: string;
  topic: string;
}

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  skill: "l" | "r" | "w" | "s" | "v" | "g";
  kind: "vocab" | "listen" | "read" | "grammar" | "speak" | "write";
  kicker: string;
  topic: string;
  body?: string;
  script?: string;
  passage?: string;
  vocab?: VocabItem[];
  questions?: Question[];
  speak?: { part: 1 | 2 | 3; cue: string; bullets?: string[] };
  write?: { task: 1 | 2; min: number; prompt: string; data?: string };
}

export interface Unit {
  id: string;
  title: string;
  why: string;
  lessons: string[];
}

export interface Stage {
  id: "foundation" | "builder" | "fluency" | "exam" | "eight";
  band: string;
  title: string;
  promise: string;
  units: Unit[];
}

export interface SpeakCue {
  id: string;
  part: 1 | 2 | 3;
  topic: string;
  cue: string;
  bullets?: string[];
}

export interface WritePrompt {
  id: string;
  task: 1 | 2;
  topic: string;
  type: "agree" | "discuss" | "advantage" | "problem" | "two" | "chart" | "process" | "map";
  min: number;
  prompt: string;
  data?: string;
}

export function mcq(id: string, prompt: string, options: string[], answer: string, why: string): Question {
  return { id, kind: "mcq", prompt, options, answer, why };
}

export function tf(id: string, prompt: string, answer: "True" | "False", why: string): Question {
  return { id, kind: "tf", prompt, options: ["True", "False"], answer, why };
}

export function tfng(id: string, prompt: string, answer: "True" | "False" | "Not Given", why: string): Question {
  return { id, kind: "mcq", prompt, options: ["True", "False", "Not Given"], answer, why };
}

export function gap(id: string, prompt: string, answer: string, why: string): Question {
  return { id, kind: "gap", prompt, answer, why };
}

export function pack(items: VocabItem[], topic: string) {
  return items.filter((v) => v.topic === topic);
}
