import type { Lesson } from "./types";
import { gap, mcq, tf, tfng } from "./types";
import { vocabByTopic } from "./vocab";

export const EXAM_LESSONS: Record<string, Lesson> = {
  "x-academic": {
    id: "x-academic",
    title: "Cụm học thuật: hedging",
    minutes: 12,
    skill: "v",
    kind: "vocab",
    kicker: "Accuracy",
    topic: "academic",
    vocab: vocabByTopic("academic"),
    body: "Band 8 không hô khẩu hiệu. It is often argued… to some extent… this does not necessarily mean…",
    questions: [
      mcq("q1", "Câu nào gần band 8?", ["This will definitely solve traffic.", "A congestion charge might work if buses already run frequently.", "Traffic is bad and government must act now!!!", "In today's modern society traffic is important."], "A congestion charge might work if buses already run frequently.", "hedging + điều kiện."),
      mcq("q2", "Correlation does not necessarily mean", ["nuance", "causation", "tuition", "heritage"], "causation", "tương quan ≠ nhân quả."),
    ],
  },
  "x-listen-lecture": {
    id: "x-listen-lecture",
    title: "Nghe P4: bài giảng có số",
    minutes: 14,
    skill: "l",
    kind: "listen",
    kicker: "Listening P4 timed",
    topic: "education",
    script:
      "Let me recap the two experiments. In trial A, night buses ran on two corridors for six months. Friday-night injury crashes fell by 19%, but Thursday was unchanged, which tells us the effect was local, not city-wide. In trial B, the same budget hired extra patrols. Crashes fell on all nights, but only by 8%, and the programme was dropped after overtime bills hit 6.1 billion dong. The policy implication is narrow: if your goal is Friday nights on those two roads, buses win on cost per crash avoided. If your goal is a city-wide deterrent, patrols still have a case. Do not write that 'buses are better'. Write the condition.",
    questions: [
      mcq("q1", "Trial A giảm tai nạn thứ Sáu khoảng", ["8%", "19%", "6.1%", "Không đổi"], "19%", "fell by 19%."),
      tf("q2", "Trial A làm giảm tai nạn thứ Năm.", "False", "Thursday was unchanged."),
      mcq("q3", "Kết luận đúng là", ["Xe buýt luôn hơn cảnh sát", "Tùy mục tiêu: tuyến cụ thể vs toàn thành", "Cả hai thất bại", "Không có số"], "Tùy mục tiêu: tuyến cụ thể vs toàn thành", "Write the condition."),
    ],
  },
  "x-read-long": {
    id: "x-read-long",
    title: "Đọc: một đoạn Academic dày",
    minutes: 16,
    skill: "r",
    kind: "read",
    kicker: "Reading timed",
    topic: "work",
    passage: `The first studies of working from home were, in retrospect, advertisements. They measured output among people who had already chosen remote work, often in writing-heavy jobs, and then generalised to nurses and machinists. Later papers split the sample. New hires did worse away from the office; people with a room of their own did better on deep-work tasks; people on kitchen tables did not. By 2024 the share of work done at home in the country series had fallen from the lockdown peak of 34% to 18% — still more than double 2019, not a revolution. Managers kept hybrid days because they reduced office rent, not because the productivity graph was beautiful. The honest Task 2 on this topic therefore has a split answer: remote work is a tool with conditions, not a moral identity. That sentence is harder to write than 'I totally agree'.`,
    questions: [
      tfng("q1", "Nghiên cứu đầu đo cả y tá và thợ máy rồi kết luận remote tốt.", "False", "writing-heavy jobs, then generalised — the point is they should not have generalised."),
      tfng("q2", "Người mới vào nghề làm kém hơn khi không có văn phòng.", "True", "New hires did worse away from the office."),
      tfng("q3", "Năm 2024, 18% việc làm ở nhà, hơn gấp đôi 2019.", "True", "18% — still more than double 2019."),
      mcq("q4", "Lý do quản lý giữ hybrid, theo đoạn:", ["biểu đồ năng suất đẹp", "giảm tiền thuê văn phòng", "nhân viên đòi", "luật mới"], "giảm tiền thuê văn phòng", "reduced office rent."),
    ],
  },
  "x-speak-timed": {
    id: "x-speak-timed",
    title: "Part 2 đủ 2 phút, có đồng hồ",
    minutes: 12,
    skill: "s",
    kind: "speak",
    kicker: "Exam condition",
    topic: "work",
    body: "1 phút ghi chú — 2 phút nói. Bốn bullet là xương, không phải đọc. Hết giờ vẫn phải có câu kết.",
    speak: {
      part: 2,
      cue: "Describe a difficult task you finished at work or in study.",
      bullets: ["what the task was", "why it was hard", "how you did it", "and what you learned"],
    },
  },
  "x-write-timed": {
    id: "x-write-timed",
    title: "Task 2 đúng 40 phút",
    minutes: 40,
    skill: "w",
    kind: "write",
    kicker: "Exam condition",
    topic: "city",
    write: {
      task: 2,
      min: 250,
      prompt:
        "Some people say that the best way to reduce traffic congestion is to increase the price of petrol. Others believe that more public transport should be provided instead. Discuss both views and give your own opinion.",
    },
  },
  "x-error": {
    id: "x-error",
    title: "Phẫu thuật lỗi: 7.5 chết ở đâu",
    minutes: 14,
    skill: "g",
    kind: "grammar",
    kicker: "Accuracy",
    topic: "grammar",
    body: `7.5 Writing/Speaking thường không thiếu ý. Thiếu sạch:

- articles (a/the) và số ít/nhiều
- collocation gần đúng (do a research)
- câu quá dài, mất chủ-vị
- lập trường mơ ở câu 1 rồi lật ở kết

Bài này: sửa 4 câu. Viết lại cho đủ ý, ít lỗi.`,
    questions: [
      mcq("q1", "Chọn câu sạch:", ["There are many evidences for this.", "There is a lot of evidences.", "There is substantial evidence for this.", "Evidences is many."], "There is substantial evidence for this.", "evidence không đếm."),
      mcq("q2", "Chọn câu sạch:", ["The government should to improve the transport.", "The government should improve public transport.", "Government should improving the transport.", "The government should improves transport."], "The government should improve public transport.", "should + V nguyên mẫu."),
      mcq("q3", "Câu mở Task 2 nào có lập trường?", ["This is a controversial issue.", "I agree that petrol taxes work only if buses already run often.", "There are two sides.", "Nowadays, traffic is important."], "I agree that petrol taxes work only if buses already run often.", "có vị trí + điều kiện."),
    ],
  },
};

export const EIGHT_LESSONS: Record<string, Lesson> = {
  "e-precision": {
    id: "e-precision",
    title: "Band 8: ít lỗi hơn, không phô chữ",
    minutes: 12,
    skill: "g",
    kind: "grammar",
    kicker: "Accuracy",
    topic: "academic",
    body: `Bước 7.0 → 8.0 không phải +2000 từ. Là:

- Bỏ sáo (In today's modern society…).
- Mỗi đoạn một ý, ý được examples.
- Collocation đúng.
- Phát âm: nhấn từ nội dung.

Hôm nay: chọn câu có thông tin, không câu rỗng.`,
    questions: [
      mcq("q1", "Câu nào gần band 8?", ["In today's modern society, education is very important.", "University fees have tripled since 2008, yet completion rates have barely moved.", "Education plays a vital role in our life.", "There are two sides to every coin."], "University fees have tripled since 2008, yet completion rates have barely moved.", "Có số, có đối lập, không sáo."),
      mcq("q2", "Band 8 Speaking khác 6 ở chỗ", ["dùng từ hiếm hơn", "ít sửa mình giữa chừng vì bí từ, ý đi hết", "nói nhanh hơn", "không được pause"], "ít sửa mình giữa chừng vì bí từ, ý đi hết", "fluency = mạch, không phải tốc độ."),
    ],
  },
  "e-complex": {
    id: "e-complex",
    title: "Câu phức sạch: although, which, if",
    minutes: 14,
    skill: "g",
    kind: "grammar",
    kicker: "Grammar",
    topic: "grammar",
    body: `Một câu phức đúng > ba câu phức gãy.

Although fees rose, completion stalled.
A policy which is not funded is a press conference.
If buses run every five minutes, a congestion charge becomes feasible.

Đừng nhồi inversion, cleft, idiom một lượt. Giám khảo 8.0 nghe tự nhiên, không nghe SAT.`,
    questions: [
      mcq("q1", "Câu nào đúng?", ["Although fees rose but completion stalled.", "Although fees rose, completion stalled.", "Although fees rose, but completion stalled.", "Although, fees rose completion stalled."], "Although fees rose, completion stalled.", "không kèm but."),
      gap("q2", "A route ______ is not funded will fail. (which)", "which", "mệnh đề quan hệ."),
      tf("q3", "Band 8 bắt buộc dùng đảo ngữ mỗi đoạn.", "False", "tự nhiên và chính xác hơn phô."),
    ],
  },
  "e-speak-abstract": {
    id: "e-speak-abstract",
    title: "Part 3: trả lời có điều kiện",
    minutes: 12,
    skill: "s",
    kind: "speak",
    kicker: "Speaking Part 3",
    topic: "academic",
    body: "Cấu trúc 8.0: trả lời → điều kiện / ngoại lệ → ví dụ. Tránh 'it depends' rồi im.",
    speak: {
      part: 3,
      cue: "Should individuals or governments carry most of the responsibility for climate change? Under what conditions would your answer change?",
    },
  },
  "e-write": {
    id: "e-write",
    title: "Task 2 timed: sắc, không sáo",
    minutes: 40,
    skill: "w",
    kind: "write",
    kicker: "Exam condition",
    topic: "environment",
    write: {
      task: 2,
      min: 250,
      prompt:
        "Individuals cannot make a difference to climate change; only governments and companies can. To what extent do you agree or disagree?",
    },
  },
  "e-write-nuance": {
    id: "e-write-nuance",
    title: "Task 2: đề hai phần, đủ cả hai",
    minutes: 40,
    skill: "w",
    kind: "write",
    kicker: "Task Response",
    topic: "city",
    body: "Đề two-part: thiếu một nửa = trần Task Response. Chia 2 đoạn thân đều.",
    write: {
      task: 2,
      min: 250,
      prompt: "Housing in large cities is becoming too expensive for young people. Why is this happening? What can governments do?",
    },
  },
};
