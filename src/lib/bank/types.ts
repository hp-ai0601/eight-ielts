import type { Question } from "@/lib/content/types";
import type { Pos } from "@/lib/pos";

export type TestKind =
  | "vocab"
  | "collocation"
  | "listen"
  | "read"
  | "grammar"
  | "tfng"
  | "speak"
  | "write"
  | "mixed"
  | "homework"
  | "mock-l"
  | "mock-r"
  | "mock-w"
  | "mock-s";

export interface TopicVocab {
  word: string;
  ipa: string;
  vi: string;
  example: string;
  trap?: string;
  pos?: Pos;
}

export interface Topic {
  id: string;
  name: string;
  vi: string;
  stage: "foundation" | "builder" | "fluency" | "exam";
  vocab: TopicVocab[];
  chunks: { chunk: string; vi: string; wrong: string }[];
  script: string;
  listenQs: Question[];
  passage: string;
  readQs: Question[];
  claims: { prompt: string; answer: "True" | "False" | "Not Given"; why: string }[];
  write: { prompt: string; min: number; task: 1 | 2; data?: string };
  speak: { part: 1 | 2 | 3; cue: string; bullets?: string[] };
  homework: string;
}

export interface BankTest {
  id: string;
  topicId: string;
  topic: string;
  title: string;
  kind: TestKind;
  minutes: number;
  homework?: boolean;
  questions?: Question[];
  script?: string;
  passage?: string;
  speak?: Topic["speak"];
  write?: Topic["write"];
  vocab?: TopicVocab[];
}

export const KIND_LABEL: Record<TestKind, string> = {
  vocab: "Từ vựng",
  collocation: "Cụm từ",
  listen: "Nghe",
  read: "Đọc",
  grammar: "Ngữ pháp",
  tfng: "True/False/NG",
  speak: "Nói",
  write: "Viết",
  mixed: "Tổng hợp",
  homework: "Bài tập về nhà",
  "mock-l": "Mock Listening 40",
  "mock-r": "Mock Reading 40",
  "mock-w": "Mock Writing",
  "mock-s": "Mock Speaking",
};
