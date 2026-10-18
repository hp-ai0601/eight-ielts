export type Skill = "l" | "r" | "w" | "s";

export const SKILL_LABEL: Record<Skill, string> = {
  l: "Listening",
  r: "Reading",
  w: "Writing",
  s: "Speaking",
};

export function clampBand(n: number) {
  const x = Math.max(1, Math.min(9, n));
  return Math.round(x * 2) / 2;
}

export function overall(bands: Record<Skill, number>) {
  return clampBand((bands.l + bands.r + bands.w + bands.s) / 4);
}

/** Academic listening/reading: approximate official conversion. */
export function answersToBand(correct: number, total = 40) {
  const p = correct / total;
  if (p >= 0.975) return 9;
  if (p >= 0.925) return 8.5;
  if (p >= 0.875) return 8;
  if (p >= 0.8) return 7.5;
  if (p >= 0.75) return 7;
  if (p >= 0.65) return 6.5;
  if (p >= 0.575) return 6;
  if (p >= 0.5) return 5.5;
  if (p >= 0.4) return 5;
  if (p >= 0.3) return 4.5;
  return 4;
}

export const BAND8 = {
  meaning:
    "Band 8: dùng tiếng Anh thành thạo. Chỉ thỉnh thoảng lệch từ / ngữ pháp không hệ thống. Xử lý lập luận phức tạp tốt.",
  writing: [
    "Task: đủ ý, rõ lập trường, ý được mở và chứng minh.",
    "CC: đọc một mạch, đoạn văn đúng chỗ.",
    "LR: từ vựng rộng, collocation tự nhiên, paraphrase được.",
    "GRA: đa số câu không lỗi; câu phức dùng linh hoạt.",
  ],
  speaking: [
    "Fluency: trôi, ngập ngừng chủ yếu vì nghĩ ý chứ không vì tìm từ.",
    "LR: paraphrased được, dùng được idiomatic item.",
    "GRA: đa số câu sạch; vài lỗi cơ bản còn sót cũng không sao.",
    "Pron: nhịp và ngữ điệu giữ được cả câu dài; accent không cản hiểu.",
  ],
};

export const EXAM = {
  listening: { minutes: 30, questions: 40, parts: 4 },
  reading: { minutes: 60, questions: 40, passages: 3 },
  writing: { minutes: 60, task1: 150, task2: 250 },
  speaking: { minutes: "11–14", parts: 3 },
};
