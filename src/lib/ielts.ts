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
    "Band 8 nghĩa là dùng tiếng Anh thành thạo: chỉ thỉnh thoảng mắc lỗi nhỏ về từ vựng hay ngữ pháp, và xử lý tốt cả những lập luận phức tạp.",
  writing: [
    "Task: bài có đủ ý, lập trường rõ ràng, ý nào cũng được triển khai và chứng minh.",
    "CC: bài đọc một mạch trôi chảy, chia đoạn hợp lý.",
    "LR: vốn từ phong phú, cụm từ ghép tự nhiên, biết diễn đạt lại một ý bằng nhiều cách.",
    "GRA: phần lớn câu không có lỗi, câu phức dùng linh hoạt.",
  ],
  speaking: [
    "Fluency: nói trôi chảy — nếu có ngập ngừng thì là do đang nghĩ ý, không phải do tìm từ.",
    "LR: biết diễn đạt lại khi quên từ, dùng được thành ngữ đúng chỗ.",
    "GRA: phần lớn câu đúng ngữ pháp; sót vài lỗi nhỏ cũng không ảnh hưởng.",
    "Pron: giữ được nhịp và ngữ điệu trong cả câu dài; giọng địa phương không gây khó hiểu.",
  ],
};

export const EXAM = {
  listening: { minutes: 30, questions: 40, parts: 4 },
  reading: { minutes: 60, questions: 40, passages: 3 },
  writing: { minutes: 60, task1: 150, task2: 250 },
  speaking: { minutes: "11–14", parts: 3 },
};
