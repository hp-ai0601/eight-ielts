import { BUILDER_LESSONS } from "./builder";
import { EIGHT_LESSONS, EXAM_LESSONS } from "./exam";
import { FLUENCY_LESSONS } from "./fluency";
import { FOUNDATION_LESSONS } from "./foundation";
import type { Lesson, Stage } from "./types";

export * from "./types";
export * from "./vocab";
export * from "./banks";

export const LESSONS: Record<string, Lesson> = {
  ...FOUNDATION_LESSONS,
  ...BUILDER_LESSONS,
  ...FLUENCY_LESSONS,
  ...EXAM_LESSONS,
  ...EIGHT_LESSONS,
};

const ALIAS: Record<string, string> = {
  "f-vocab": "f-vocab-core",
  "f-listen": "f-listen-day",
  "f-read": "f-read-notice",
  "f-speak": "f-speak-intro",
  "b-listen": "b-listen-change",
  "b-read": "b-read-para",
  "b-write": "b-write-position",
  "b-speak": "b-speak-p2-person",
  "u-essay": "u-edu-write",
  "u-task1": "b-task1-overview",
  "u-speak3": "u-city-speak",
  "u-listen-map": "b-listen-map",
};

export const STAGES: Stage[] = [
  {
    id: "foundation",
    band: "0 – 4.5",
    title: "Nền",
    promise: "Câu sạch, thì đúng, nghe được số và tên, không nuốt âm cuối.",
    units: [
      { id: "f-sound", title: "Âm người Việt", why: "Giám khảo hiểu sai từ Part 1 nếu mất phụ âm cuối.", lessons: ["f-sounds", "f-vowels", "f-stress"] },
      { id: "f-gram", title: "Ngữ pháp xương", why: "Tiếng Việt không chia thì — phải lắp máy trước khi viết luận.", lessons: ["f-be-do", "f-present", "f-past", "f-articles", "f-count"] },
      { id: "f-words", title: "Từ mỗi ngày", why: "Cụm trong câu, không cột từ.", lessons: ["f-vocab-core", "f-vocab-home", "f-vocab-time"] },
      { id: "f-ear", title: "Nghe số, tên, form", why: "Listening Part 1 là bài dễ lấy điểm nếu tai quen.", lessons: ["f-listen-day", "f-listen-form", "f-listen-spell"] },
      { id: "f-eye", title: "Đọc thông báo", why: "Đọc đúng chi tiết trước khi đọc Academic.", lessons: ["f-read-notice", "f-read-email"] },
      { id: "f-mouth", title: "Nói về mình", why: "Part 1: nhà, việc, ngày thường.", lessons: ["f-speak-intro", "f-speak-home", "f-speak-work"] },
      { id: "f-pen", title: "Từ câu tới đoạn", why: "Chưa 250 từ. Sạch đã.", lessons: ["f-write-sentence", "f-write-para"] },
    ],
  },
  {
    id: "builder",
    band: "4.5 – 6.0",
    title: "Dựng",
    promise: "Paraphrase, bẫy Listening, đoạn có lập trường, Task 1 có overview.",
    units: [
      { id: "b-gram", title: "Thì và nối ý", why: "Present Perfect, so sánh, however, hedging.", lessons: ["b-perfect", "b-compare", "b-linkers", "b-modal"] },
      { id: "b-chunk", title: "Cụm từ", why: "Band 6 dịch từng chữ. Band 8 ghép cụm.", lessons: ["b-collocation", "b-phrasal"] },
      { id: "b-ear", title: "Bẫy nghe", why: "Thông tin đầu tiên thường là mồi.", lessons: ["b-listen-change", "b-listen-map", "b-listen-numbers"] },
      { id: "b-eye", title: "Đọc như đề thi", why: "Paraphrase, TFNG, heading.", lessons: ["b-read-para", "b-read-tfng", "b-read-heading"] },
      { id: "b-mouth", title: "Part 1 dài hơn, Part 2 ra đời", why: "Ba nhịp trả lời. Cue card 2 phút.", lessons: ["b-speak-p1", "b-speak-p2-person", "b-speak-p2-place"] },
      { id: "b-pen", title: "Lập trường và overview", why: "Câu 1 phải chọn phe. Task 1 phải có bức tranh lớn.", lessons: ["b-write-position", "b-write-peel", "b-task1-overview"] },
    ],
  },
  {
    id: "fluency",
    band: "6.0 – 7.0",
    title: "Trôi",
    promise: "Đủ chủ đề Academic. Part 2–3. Task 1 mọi dạng. Task 2 250 từ.",
    units: [
      { id: "u-edu", title: "Giáo dục", why: "Học phí, trái ngành, lý thuyết vs nghề.", lessons: ["u-edu-vocab", "u-edu-read", "u-edu-speak", "u-edu-write"] },
      { id: "u-work", title: "Công việc", why: "Remote, gig, năng suất có điều kiện.", lessons: ["u-work-vocab", "u-work-listen", "u-work-speak", "u-work-write"] },
      { id: "u-env", title: "Môi trường", why: "Khí thải, cây đô thị, trách nhiệm.", lessons: ["u-env-vocab", "u-env-read", "u-env-speak", "u-env-write"] },
      { id: "u-tech", title: "Công nghệ", why: "Chú ý, thuật toán, điện thoại trong phòng.", lessons: ["u-tech-vocab", "u-tech-listen", "u-tech-speak", "u-tech-write"] },
      { id: "u-health", title: "Sức khỏe", why: "Sống lâu chưa chắc khỏe. Phòng vs chữa.", lessons: ["u-health-vocab", "u-health-read", "u-health-speak", "u-health-write"] },
      { id: "u-city", title: "Đô thị", why: "Ùn tắc, xe buýt đêm, nhà ở.", lessons: ["u-city-vocab", "u-city-listen", "u-city-speak", "u-city-write"] },
      { id: "u-media", title: "Truyền thông", why: "Tin sai, bias, báo còn đáng tin không.", lessons: ["u-media-vocab", "u-media-speak", "u-media-write"] },
      { id: "u-culture", title: "Văn hóa", why: "Di sản, lễ hội, tiền cho nghệ thuật.", lessons: ["u-culture-vocab", "u-culture-speak", "u-culture-write"] },
      { id: "u-charts", title: "Task 1 đủ dạng", why: "Đường, bảng, quy trình, bản đồ.", lessons: ["u-task1-line", "u-task1-table", "u-task1-process", "u-task1-map"] },
    ],
  },
  {
    id: "exam",
    band: "7.0 – 7.5",
    title: "Thi",
    promise: "Có đồng hồ. Sửa theo 4 tiêu chí. Bài giảng và đoạn Academic.",
    units: [
      { id: "x1", title: "Đồng hồ và điều kiện", why: "7.5 thường vướng Writing/Speaking, không phải thiếu mẹo.", lessons: ["x-academic", "x-listen-lecture", "x-read-long", "x-speak-timed", "x-write-timed", "x-error"] },
    ],
  },
  {
    id: "eight",
    band: "7.5 – 8.0",
    title: "Eight",
    promise: "Ít lỗi, hedging, câu phức sạch. Không phô từ khó.",
    units: [
      { id: "e1", title: "Sạch và sắc", why: "8.0 = chính xác + linh hoạt.", lessons: ["e-precision", "e-complex", "e-speak-abstract", "e-write", "e-write-nuance"] },
    ],
  },
];

export function lessonById(id: string) {
  return LESSONS[ALIAS[id] ?? id];
}

export function allLessonIds() {
  return STAGES.flatMap((s) => s.units.flatMap((u) => u.lessons));
}

export function locate(lessonId: string) {
  const id = ALIAS[lessonId] ?? lessonId;
  for (const [si, s] of STAGES.entries()) {
    for (const [ui, u] of s.units.entries()) {
      const li = u.lessons.indexOf(id);
      if (li >= 0) return { stage: s, unit: u, si, ui, li };
    }
  }
  return null;
}

export function lessonsOfKind(kind: Lesson["kind"]) {
  return Object.values(LESSONS).filter((l) => l.kind === kind);
}
