import type { Lesson } from "./types";
import { gap, mcq, tf, tfng } from "./types";
import { vocabByTopic } from "./vocab";

export const BUILDER_LESSONS: Record<string, Lesson> = {
  "b-perfect": {
    id: "b-perfect",
    title: "Present Perfect: đã… và còn liên quan",
    minutes: 14,
    skill: "g",
    kind: "grammar",
    kicker: "Ngữ pháp",
    topic: "grammar",
    body: `Have/has + V3.

Dùng khi: việc xảy ra trong khoảng chưa đóng (today, this week, since 2020, already, yet, ever, never) HOẶC kết quả còn hiện.

I have lived here for three years. (vẫn ở)
I lived there in 2019. (xong)

Không dùng với mốc chết: yesterday, last year, in 2019 → Past Simple.`,
    questions: [
      mcq("q1", "Câu nào đúng?", ["I have seen him yesterday", "I saw him yesterday", "I have saw him yesterday", "I seen him yesterday"], "I saw him yesterday", "yesterday = Past Simple."),
      gap("q2", "I ______ here since 2021. (live)", "have lived", "since + mốc → present perfect."),
      mcq("q3", "She hasn't finished the essay ______.", ["ago", "yesterday", "yet", "last night"], "yet", "yet đi với hoàn thành phủ định/nghi vấn."),
    ],
  },
  "b-compare": {
    id: "b-compare",
    title: "So sánh: hơn, nhất, as…as",
    minutes: 12,
    skill: "g",
    kind: "grammar",
    kicker: "Ngữ pháp",
    topic: "grammar",
    body: `Ngắn: cheaper, bigger, the cheapest.
Dài: more efficient, the most efficient.
Bất quy tắc: good-better-best, bad-worse-worst, far-further-furthest.

Task 1 sống nhờ so sánh: Metro use was higher in 2024 than in 2010, whereas bus use was lower.

as + adj + as: The 2024 figure was almost as high as the peak.`,
    questions: [
      mcq("q1", "This bus is ______ than the metro.", ["more cheap", "cheaper", "cheapest", "more cheaper"], "cheaper", "cheap 1 âm → -er. Không more cheaper."),
      gap("q2", "The metro is the ______ option in rush hour. (efficient)", "most efficient", "efficient dài → most."),
      mcq("q3", "Câu Task 1 nào sạch hơn?", ["The number was very increase", "There was a marked increase in metro use", "Metro use increase very much", "It is increase"], "There was a marked increase in metro use", "danh từ hóa + collocation."),
    ],
  },
  "b-linkers": {
    id: "b-linkers",
    title: "Nối ý: however không phải but",
    minutes: 12,
    skill: "g",
    kind: "grammar",
    kicker: "Ngữ pháp",
    topic: "linking",
    vocab: vocabByTopic("linking"),
    body: `But nối hai mệnh đề trong một câu.
However đứng đầu câu mới, có phẩy: The idea is popular. However, the evidence is weak.

Therefore / as a result = hệ quả.
In addition / furthermore = thêm ý (không lặp same idea bằng từ khác).
For instance = ví dụ cụ thể, không phải "for example for example".`,
    questions: [
      mcq("q1", "Câu nào đúng?", ["The idea is popular, however the evidence is weak.", "The idea is popular; however, the evidence is weak.", "The idea is popular however, the evidence is weak.", "However the idea is popular but weak."], "The idea is popular; however, the evidence is weak.", "however là trạng từ liên kết, cần câu/chấm phẩy."),
      mcq("q2", "Furthermore dùng để", ["đối lập", "thêm một ý cùng hướng", "đưa ví dụ", "kết bài"], "thêm một ý cùng hướng", "thêm ý, không đối lập."),
    ],
  },
  "b-modal": {
    id: "b-modal",
    title: "can / should / must / might",
    minutes: 12,
    skill: "g",
    kind: "grammar",
    kicker: "Ngữ pháp",
    topic: "grammar",
    body: `can = khả năng / phép.
should = lời khuyên.
must = bắt buộc mạnh (hoặc suy luận chắc).
might / may = không chắc — vàng của band 7–8 khi nêu policy.

Cities might cut congestion if buses run every five minutes.
Không: Cities will definitely solve traffic. (đoán chắc quá)`,
    questions: [
      mcq("q1", "Câu hedging nào gần band 7+?", ["This will solve pollution.", "This might reduce pollution if it is enforced.", "This solve pollution.", "Pollution is solved."], "This might reduce pollution if it is enforced.", "might + điều kiện."),
      gap("q2", "You ______ record your answers; scripts are banned. (must/might)", "must", "nội quy = bắt buộc."),
    ],
  },
  "b-collocation": {
    id: "b-collocation",
    title: "Collocation, không dịch từng chữ",
    minutes: 12,
    skill: "v",
    kind: "vocab",
    kicker: "Từ vựng",
    topic: "collocation",
    vocab: vocabByTopic("collocation"),
    body: "Band 6 dịch. Band 8 ghép từ như người bản ngữ. Học cụm.",
    questions: [
      mcq("q1", "Cụm đúng?", ["do a decision", "make a decision", "create a decision", "build a decision"], "make a decision", "make a decision."),
      mcq("q2", "Air pollution ______ a threat to children.", ["makes", "does", "poses", "gives"], "poses", "pose a threat."),
      gap("q3", "There was a ______ increase in metro use. (marked/very)", "marked", "a marked increase."),
    ],
  },
  "b-phrasal": {
    id: "b-phrasal",
    title: "Cụm động từ hay gặp trong nghe",
    minutes: 10,
    skill: "v",
    kind: "vocab",
    kicker: "Từ vựng",
    topic: "collocation",
    body: `Listening Part 1–2 đầy phrasal verbs:

- fill in a form
- drop off (đưa tới / giảm)
- pick up
- call off = hủy
- put off = hoãn
- look after
- run out of

Nghĩa không phải tổng các từ. Ghi cả cụm vào thẻ.`,
    questions: [
      mcq("q1", "The tour was called off. Nghĩa?", ["Bắt đầu", "Hoãn", "Hủy", "Đổi chỗ"], "Hủy", "call off = cancel."),
      mcq("q2", "They put off the meeting until Friday.", ["Hủy", "Hoãn", "Rút ngắn", "Tổ chức sớm"], "Hoãn", "put off = postpone."),
    ],
  },
  "b-listen-change": {
    id: "b-listen-change",
    title: "Nghe: đổi ý giữa chừng",
    minutes: 10,
    skill: "l",
    kind: "listen",
    kicker: "Listening trap",
    topic: "daily",
    script:
      "The library tour was going to start at nine, but they changed it. It now starts at nine thirty, next to the main desk, not at the cafe. Also, bring a photo ID. A student card is not enough this week.",
    questions: [
      mcq("q1", "Tour bắt đầu lúc nào?", ["9:00", "9:30", "10:00", "Cafe time"], "9:30", "Câu đầu là bẫy. IELTS hay sửa thông tin."),
      mcq("q2", "Cần mang gì?", ["Thẻ sinh viên", "Photo ID", "Cà phê", "Không cần gì"], "Photo ID", "A student card is not enough."),
      tf("q3", "Tụp tại quán cà phê.", "False", "next to the main desk, not at the cafe."),
    ],
  },
  "b-listen-map": {
    id: "b-listen-map",
    title: "Nghe: hướng dẫn chỗ",
    minutes: 12,
    skill: "l",
    kind: "listen",
    kicker: "Listening P2",
    topic: "city",
    script:
      "When you enter the test centre, the reception is on your left. The waiting area is straight ahead, next to the water fountain. Toilets are down the corridor on the right, opposite room B. Do not wait by the lockers — that corridor is for staff only. If you arrive early, sit in the waiting area, not on the stairs. The speaking rooms are behind reception, rooms C and D.",
    questions: [
      mcq("q1", "Reception ở đâu khi bước vào?", ["Bên phải", "Bên trái", "Đối diện room B", "Cạnh locker"], "Bên trái", "on your left."),
      mcq("q2", "Không được đứng chờ ở đâu?", ["Waiting area", "Water fountain", "Lockers", "Room B"], "Lockers", "Do not wait by the lockers."),
      mcq("q3", "Phòng speaking là", ["A và B", "C và D", "Chỉ B", "Sau toilet"], "C và D", "behind reception, rooms C and D."),
    ],
  },
  "b-listen-numbers": {
    id: "b-listen-numbers",
    title: "Nghe: số bị sửa",
    minutes: 10,
    skill: "l",
    kind: "listen",
    kicker: "Listening trap",
    topic: "daily",
    script:
      "The course fee is 2.4 million dong… sorry, that's the old price. From May it's 2.6 million, unless you book before the 20th of April, in which case you still pay 2.4. Classes run from 6.15 to 7.45, not 6.00. There are twelve sessions, but the first one is an orientation, so eleven teaching nights.",
    questions: [
      mcq("q1", "Giá nếu đặt trước 20/4?", ["2.6 triệu", "2.4 triệu", "12 triệu", "Miễn phí"], "2.4 triệu", "before 20 April still 2.4."),
      mcq("q2", "Có bao nhiêu buổi dạy?", ["12", "11", "15", "1"], "11", "twelve sessions, first is orientation → 11 teaching nights."),
      mcq("q3", "Giờ học?", ["6:00–7:45", "6:15–7:45", "6:15–8:00", "7:45–9:00"], "6:15–7:45", "not 6.00."),
    ],
  },
  "b-read-para": {
    id: "b-read-para",
    title: "Đọc: paraphrase",
    minutes: 12,
    skill: "r",
    kind: "read",
    kicker: "Reading",
    topic: "city",
    passage: `Cities that invest in late-night buses often report a drop in drink-driving, although the effect is not uniform. In two trials, accidents fell by roughly a fifth on Friday nights. Critics argue that the money would be better spent on police patrols. The authors, however, note that patrols are expensive to sustain, whereas a bus route, once established, is relatively efficient.`,
    questions: [
      mcq("q1", "Ý chính?", ["Xe buýt đêm luôn thất bại", "Xe buýt đêm có thể giảm tai nạn, dù gây tranh cãi", "Cảnh sát rẻ hơn xe buýt", "Tai nạn tăng vào thứ Sáu"], "Xe buýt đêm có thể giảm tai nạn, dù gây tranh cãi", "Câu đầu nêu benefit, sau đó nêu critics."),
      tf("q2", "Tác giả cho rằng tuần tra cảnh sát rẻ và dễ duy trì.", "False", "patrols are expensive to sustain."),
      mcq("q3", "fell by roughly a fifth ≈", ["giảm 5%", "giảm ~20%", "giảm 50%", "tăng 20%"], "giảm ~20%", "a fifth = 1/5."),
    ],
  },
  "b-read-tfng": {
    id: "b-read-tfng",
    title: "Đọc: True / False / Not Given",
    minutes: 14,
    skill: "r",
    kind: "read",
    kicker: "Reading TFNG",
    topic: "education",
    passage: `A 2023 survey of 1,200 graduates in three Vietnamese cities found that 41% were working in a field unrelated to their degree within two years. The figure was higher among arts graduates than among engineers. The authors did not claim that university is a waste of money; they noted that many students choose a major before they have done any work experience. Internships were more common in private universities than in public ones, according to the same survey. Starting salaries were not reported.`,
    questions: [
      tfng("q1", "Hơn 40% người tốt nghiệp làm trái ngành trong vòng hai năm.", "True", "41% were working in a field unrelated… within two years."),
      tfng("q2", "Kỹ sư trái ngành nhiều hơn sinh viên nghệ thuật.", "False", "higher among arts graduates than among engineers — ngược."),
      tfng("q3", "Lương khởi điểm của kỹ sư cao hơn nghệ thuật.", "Not Given", "Starting salaries were not reported."),
      tfng("q4", "Thực tập phổ biến hơn ở đại học tư.", "True", "Internships were more common in private universities."),
    ],
  },
  "b-read-heading": {
    id: "b-read-heading",
    title: "Đọc: chọn heading",
    minutes: 12,
    skill: "r",
    kind: "read",
    kicker: "Reading headings",
    topic: "health",
    passage: `Paragraph A. Walking meetings sounded like a gimmick until a hospital in Da Nang timed them. Blood pressure in the trial group fell slightly; more importantly, the meetings ended on time because people got tired of looping the car park.

Paragraph B. Critics said the sample was small and that winter rain would kill the habit. The hospital kept the policy anyway, with an indoor corridor route as backup. Six months later, 60% of scheduled walking meetings still happened.

Paragraph C. The broader lesson is not that every office should walk. It is that health policies fail when they depend on willpower alone. Changing the default — the meeting is a walk unless someone objects — beat posters about exercise.`,
    questions: [
      mcq("q1", "Heading tốt nhất cho A?", ["Mưa làm hỏng thói quen", "Một thử nghiệm có số và tác dụng phụ bất ngờ", "Ai cũng nên họp đi bộ", "Bệnh viện hết chỗ họp"], "Một thử nghiệm có số và tác dụng phụ bất ngờ", "Có trial, huyết áp, và họp đúng giờ."),
      mcq("q2", "Heading tốt nhất cho C?", ["Poster hiệu quả hơn policy", "Đổi mặc định thắng khẩu hiệu", "Mùa đông không đi bộ được", "Huyết áp giảm mạnh"], "Đổi mặc định thắng khẩu hiệu", "Changing the default beat posters."),
      tf("q3", "Đoạn B nói policy bị bỏ sau sáu tháng.", "False", "60% still happened."),
    ],
  },
  "b-speak-p1": {
    id: "b-speak-p1",
    title: "Nói Part 1: trả lời 3 nhịp",
    minutes: 10,
    skill: "s",
    kind: "speak",
    kicker: "Speaking Part 1",
    topic: "daily",
    body: "Nhịp: trả lời trực tiếp → lý do hoặc chi tiết → ví dụ ngắn. Đừng độc thoại 2 phút. Đừng yes/no rồi im.",
    speak: {
      part: 1,
      cue: "What do you do in the evening when you are tired of screens? Do you think you spend too much time on your phone?",
    },
  },
  "b-speak-p2-person": {
    id: "b-speak-p2-person",
    title: "Nói Part 2: một người",
    minutes: 12,
    skill: "s",
    kind: "speak",
    kicker: "Speaking Part 2",
    topic: "people",
    speak: {
      part: 2,
      cue: "Describe a friend you enjoy talking to.",
      bullets: ["who they are", "how you met", "what you talk about", "and why you enjoy the conversations"],
    },
  },
  "b-speak-p2-place": {
    id: "b-speak-p2-place",
    title: "Nói Part 2: một nơi",
    minutes: 12,
    skill: "s",
    kind: "speak",
    kicker: "Speaking Part 2",
    topic: "place",
    speak: {
      part: 2,
      cue: "Describe a place in your city where you can think clearly.",
      bullets: ["where it is", "how often you go", "what you do there", "and why it helps you think"],
    },
  },
  "b-write-position": {
    id: "b-write-position",
    title: "Viết: câu 1 phải có lập trường",
    minutes: 15,
    skill: "w",
    kind: "write",
    kicker: "Writing Task 2",
    topic: "work",
    write: {
      task: 2,
      min: 120,
      prompt:
        "Some people think adults should spend more time with family than at work. To what extent do you agree or disagree? Write at least 120 words. Sentence one must take a clear position. No 'In today's modern society'.",
    },
  },
  "b-write-peel": {
    id: "b-write-peel",
    title: "Viết: đoạn PEEL",
    minutes: 16,
    skill: "w",
    kind: "write",
    kicker: "Writing Task 2",
    topic: "education",
    body: "PEEL: Point – Explain – Example – Link. Một đoạn một ý. Ví dụ phải có tên chỗ / số / tình huống, không 'for example, it is important'.",
    write: {
      task: 2,
      min: 150,
      prompt:
        "Write one PEEL paragraph answering: Should universities focus on job skills rather than theory? At least 150 words. Include one concrete example (a course, a country, or a number).",
    },
  },
  "b-task1-overview": {
    id: "b-task1-overview",
    title: "Task 1: câu overview trước đã",
    minutes: 16,
    skill: "w",
    kind: "write",
    kicker: "Writing Task 1",
    topic: "city",
    body: "Overview = 1–2 câu xu hướng lớn, không số lẻ. Không overview = trần band Task Achievement.",
    write: {
      task: 1,
      min: 150,
      data: "Da Nang commute share. 2010: buses 40%, metro 15%, cars 45%. 2024: buses 28%, metro 37%, cars 35%.",
      prompt:
        "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. First two sentences = overview with NO lists of every figure. Then one paragraph of support. Write at least 150 words.",
    },
  },
};
