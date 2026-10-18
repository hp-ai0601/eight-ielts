import { testsFromTopic } from "./engine";
import type { BankTest, Topic } from "./types";
import TOPICS from "./topics";
import { TOPICS2 } from "./topics2";
import { TOPICS3 } from "./topics3";
import { TOPICS4 } from "./topics4";
import { extraTopicsFromLex } from "./fromLex";
import { MOCKS } from "./mocks";

export const TOPICS_ALL: Topic[] = [...TOPICS, ...TOPICS2, ...TOPICS3, ...TOPICS4, ...extraTopicsFromLex()];

export const TESTS: BankTest[] = [...TOPICS_ALL.flatMap(testsFromTopic), ...MOCKS];

export function testById(id: string) {
  return TESTS.find((t) => t.id === id);
}

export function testsByTopic(topicId: string) {
  return TESTS.filter((t) => t.topicId === topicId);
}

export function homeworkTests() {
  return TESTS.filter((t) => t.homework);
}

export function mockTests() {
  return TESTS.filter((t) => t.kind.startsWith("mock"));
}

export { KIND_LABEL } from "./types";
export type { BankTest, Topic, TestKind } from "./types";
