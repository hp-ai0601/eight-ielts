import { mcq, tf, tfng, type Question } from "@/lib/content/types";
import type { Topic, TopicVocab } from "./types";
import { guessPos } from "@/lib/pos";

export function v(word: string, ipa: string, vi: string, example: string, trap?: string): TopicVocab {
  return { word, ipa, vi, example, trap, pos: guessPos(word, vi, example) };
}

export function ch(chunk: string, vi: string, wrong: string) {
  return { chunk, vi, wrong };
}

export function lq(id: string, prompt: string, options: string[], answer: string, why: string): Question {
  return mcq(id, prompt, options, answer, why);
}

export function rq(id: string, prompt: string, options: string[], answer: string, why: string): Question {
  return mcq(id, prompt, options, answer, why);
}

export function cl(prompt: string, answer: "True" | "False" | "Not Given", why: string) {
  return { prompt, answer, why };
}

export function topic(p: Topic): Topic {
  return p;
}

export { mcq, tf, tfng };
