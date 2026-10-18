import type { Lesson } from "./types";
import { gap, mcq, tf } from "./types";
import { vocabByTopic } from "./vocab";

export const FOUNDATION_LESSONS: Record<string, Lesson> = {
  "f-sounds": {
    id: "f-sounds",
    title: "Âm người Việt hay mất",
    minutes: 12,
    skill: "s",
    kind: "grammar",
    kicker: "Phát âm",
    topic: "pronunciation",
    body: `Ba lỗi làm giám khảo hiểu sai ngay Part 1:

1. Mất phụ âm cuối: *li* thay vì *live*, *goa* thay vì *goal*.
2. /θ/ và /ð/ thành /t/ /d/: *tree* / *day* khi bạn muốn *three* / *they*.
3. Nhịp đều đều, không nhấn từ nội dung.

Hôm nay: nói chậm, kẹp lưỡi cho /θ/, và kéo phụ âm cuối khoảng 0.3 giây.`,
    questions: [
      mcq("q1", "Từ nào người Việt hay nuốt âm cuối?", ["city", "live", "open", "happy"], "live", "live kết thúc /v/. Nuốt thành /laɪ/ thì nghe like hoặc lie."),
      mcq("q2", "Để nói three, lưỡi đặt ở đâu?", ["Cuối vòm miệng", "Kẹp nhẹ giữa răng", "Chạm lợi trên", "Không cần lưỡi"], "Kẹp nhẹ giữa răng", "/θ/ là âm xát răng."),
      mcq("q3", "Câu nào nhấn đúng từ nội dung?", ["I LIVE in DA NANG.", "I live IN da NANG.", "I LIVE in da nang.", "i live in da nang."], "I LIVE in DA NANG.", "Nhấn live và Da Nang — thông tin mới."),
    ],
  },
  "f-vowels": {
    id: "f-vowels",
    title: "ship / sheep, live / leave",
    minutes: 10,
    skill: "s",
    kind: "grammar",
    kicker: "Phát âm",
    topic: "pronunciation",
    body: `/ɪ/ ngắn: ship, live, sit. Môi thư giãn, âm chớp qua.
/iː/ dài: sheep, leave, seat. Kéo hơi, miệng hơi căng.

Một âm sai = một từ khác. Giám khảo không "đoán ý bạn".`,
    questions: [
      mcq("q1", "I ______ in Hanoi. (sống)", ["leave", "live", "leaf", "lift"], "live", "live /lɪv/ = sống. leave /liːv/ = rời đi."),
      mcq("q2", "Cặp nào khác nhau bởi độ dài nguyên âm?", ["cat / cut", "ship / sheep", "thin / this", "walk / work"], "ship / sheep", "/ɪ/ vs /iː/."),
      gap("q3", "Điền: Please ______ the room when you finish. (leave/live)", "leave", "leave = rời."),
    ],
  },
  "f-stress": {
    id: "f-stress",
    title: "Nhấn từ, không đọc đều",
    minutes: 10,
    skill: "s",
    kind: "grammar",
    kicker: "Phát âm",
    topic: "pronunciation",
    body: `Tiếng Anh có nhịp: từ nội dung (danh, động, tính, trạng) mang trọng âm. Từ chức năng (a, the, of, to) thường yếu.

*I went to the MARKET.* không phải *I WENT TO THE market.*

Trong từ: PHOto, deCIDE, inforMAtion — nhấn sai làm từ khó nhận.`,
    questions: [
      mcq("q1", "Trong computer, nhấn âm nào?", ["COM", "PU", "TER", "Cơm-pu-tơ đều"], "PU", "comPUter — âm hai."),
      mcq("q2", "Câu nào tự nhiên hơn?", ["I AM A deSIGNer.", "I am a deSIGNer.", "I AM A DESIGNER.", "i am a designer."], "I am a deSIGNer.", "Nhấn designer; am/a yếu."),
    ],
  },
  "f-be-do": {
    id: "f-be-do",
    title: "I am / I do / I did",
    minutes: 12,
    skill: "g",
    kind: "grammar",
    kicker: "Ngữ pháp",
    topic: "grammar",
    body: `Tiếng Việt không chia thì. IELTS Speaking Part 1 sống chết vì chuyện này.

- Be: I am a designer. She is late.
- Do/Does: I work from home. Does he commute?
- Did: I started last year. (không *I am started*)

Mốc quá khứ (yesterday, last year, in 2020) → Past Simple.`,
    questions: [
      gap("q1", "Last year I ______ IELTS for the first time. (take)", "took", "Last year khóa quá khứ. take → took."),
      mcq("q2", "Câu nào đúng?", ["I am live in Hanoi", "I live in Hanoi", "I living in Hanoi", "I lives in Hanoi"], "I live in Hanoi", "live là động từ thường."),
      mcq("q3", "She ______ coffee every morning.", ["drink", "drinks", "is drink", "drinking"], "drinks", "Ngôi 3 số ít, thói quen → drinks."),
    ],
  },
  "f-present": {
    id: "f-present",
    title: "Hiện tại: thói quen vs đang xảy ra",
    minutes: 12,
    skill: "g",
    kind: "grammar",
    kicker: "Ngữ pháp",
    topic: "grammar",
    body: `Present Simple = thói quen, sự thật: I take the bus.
Present Continuous = đang / tạm thời: I am taking a course this month.

Dấu hiệu Simple: usually, every day, often.
Dấu hiệu Continuous: now, at the moment, this week.`,
    questions: [
      mcq("q1", "Right now I ______ to a podcast.", ["listen", "listens", "am listening", "listened"], "am listening", "Right now → đang xảy ra."),
      mcq("q2", "He usually ______ at 6.", ["is getting up", "gets up", "get up", "got up"], "gets up", "usually + Simple, ngôi 3 thêm s."),
      gap("q3", "This week I ______ with a friend. (stay)", "am staying", "this week = tạm thời → continuous."),
    ],
  },
  "f-past": {
    id: "f-past",
    title: "Kể chuyện quá khứ",
    minutes: 12,
    skill: "g",
    kind: "grammar",
    kicker: "Ngữ pháp",
    topic: "grammar",
    body: `Part 2 sống nhờ Past Simple. Động từ bất quy tắc phải thuộc, không đoán.

go-went, take-took, see-saw, make-made, have-had, say-said, think-thought.

Câu nối: First… Then… After that… Finally…

Không nhảy về hiện tại giữa câu chuyện trừ khi nói thói quen vẫn còn.`,
    questions: [
      gap("q1", "Yesterday I ______ my neighbour at the market. (see)", "saw", "see → saw."),
      mcq("q2", "Câu nào đúng cho câu chuyện tối qua?", ["I go home and cook", "I went home and cooked", "I have gone home and cook", "I was go home"], "I went home and cooked", "Hai động từ cùng thì quá khứ."),
      mcq("q3", "I ______ English when I was 12.", ["start", "started", "have started", "was start"], "started", "when I was 12 = mốc xong."),
    ],
  },
  "f-articles": {
    id: "f-articles",
    title: "a / an / the / không gì",
    minutes: 12,
    skill: "g",
    kind: "grammar",
    kicker: "Ngữ pháp",
    topic: "grammar",
    body: `a/an = một cái chưa xác định, đếm được số ít: a bus, an hour (h câm).
the = cái đã biết / duy nhất: the sun, the bus I took.
Zero = chung chung số nhiều / không đếm: I like coffee. Cars pollute.

Người Việt hay quên a/the vì tiếng Việt không có. Band 5 Writing đầy lỗi này.`,
    questions: [
      mcq("q1", "I take ______ bus to work.", ["a", "an", "the", "Ø"], "the", "the bus = phương tiện quen / loại phương tiện cụ thể trong ngữ cảnh đi làm. Nếu lần đầu, a bus cũng chấp nhận — ở đây ngữ cảnh 'xe buýt mình đi' → the."),
      mcq("q2", "______ evidence is weak.", ["An", "A", "The", "Many"], "The", "evidence không đếm. The evidence = bằng chứng vừa nói."),
      gap("q3", "She is ______ engineer. (a/an)", "an", "engineer bắt đầu bằng nguyên âm /e/."),
    ],
  },
  "f-count": {
    id: "f-count",
    title: "Đếm được / không đếm được",
    minutes: 10,
    skill: "g",
    kind: "grammar",
    kicker: "Ngữ pháp",
    topic: "grammar",
    body: `Không đếm: information, advice, furniture, homework, research, evidence, traffic, news.
→ much / a piece of / little. Không thêm s. Không a/an.

Đếm: idea, job, problem, bus.
→ many / few / a/an / số.

I need some advice. There is heavy traffic.`,
    questions: [
      mcq("q1", "Câu nào đúng?", ["I need an advice", "I need some advice", "I need advices", "I need many advice"], "I need some advice", "advice không đếm."),
      mcq("q2", "There isn't ______ information in the chart.", ["many", "few", "much", "a"], "much", "information không đếm → much."),
      tf("q3", "News là số nhiều vì có s.", "False", "news không đếm, đi với is: The news is good."),
    ],
  },
  "f-vocab-core": {
    id: "f-vocab-core",
    title: "24 từ xương sống",
    minutes: 12,
    skill: "v",
    kind: "vocab",
    kicker: "Từ vựng",
    topic: "core",
    vocab: vocabByTopic("core"),
    body: "Thuộc cụm trong câu, không thuộc cột từ. Lật thẻ đến khi nói được ví dụ.",
    questions: [
      mcq("q1", "Không nói:", ["little evidence", "an evidence", "some evidence", "strong evidence"], "an evidence", "evidence không đếm."),
      mcq("q2", "Although đi với but trong cùng mệnh đề?", ["Có", "Không", "Chỉ trong Speaking", "Chỉ khi có however"], "Không", "Although … , [mệnh đề]. Không thêm but."),
      gap("q3", "I am ______ studying for IELTS. (currently/yesterday)", "currently", "currently + hiện tại."),
    ],
  },
  "f-vocab-home": {
    id: "f-vocab-home",
    title: "Nhà, phố, đi làm",
    minutes: 10,
    skill: "v",
    kind: "vocab",
    kicker: "Từ vựng",
    topic: "home",
    vocab: vocabByTopic("home"),
    questions: [
      mcq("q1", "Câu nào đúng?", ["The room has few furnitures", "The room has little furniture", "The room has a furniture", "The room has furnitures"], "The room has little furniture", "furniture không đếm."),
      gap("q2", "I ______ by bus for thirty minutes. (commute)", "commute", "commute = đi làm/đi học hằng ngày."),
    ],
  },
  "f-vocab-time": {
    id: "f-vocab-time",
    title: "Giờ, hạn, lịch",
    minutes: 10,
    skill: "v",
    kind: "vocab",
    kicker: "Từ vựng",
    topic: "time",
    vocab: vocabByTopic("time"),
    questions: [
      mcq("q1", "They ______ the tour until 9.30.", ["punctual", "postpone", "duration", "frequent"], "postpone", "postpone = hoãn."),
      tf("q2", "Punctual nghĩa là hay hoãn giờ.", "False", "punctual = đúng giờ."),
    ],
  },
  "f-listen-day": {
    id: "f-listen-day",
    title: "Nghe: một ngày",
    minutes: 10,
    skill: "l",
    kind: "listen",
    kicker: "Listening P1",
    topic: "daily",
    script:
      "I usually get up at six. I make coffee, then I review ten vocabulary cards before work. In the evening I walk and listen to a short podcast. I do not study for three hours. Forty focused minutes is enough if I do it every day.",
    questions: [
      mcq("q1", "Người nói ôn thẻ khi nào?", ["Sau tan làm", "Trước khi đi làm", "Cuối tuần", "Trong lúc đi bộ"], "Trước khi đi làm", "before work."),
      tf("q2", "Người nói học 3 tiếng mỗi tối.", "False", "I do not study for three hours."),
      gap("q3", "Mỗi ngày bao nhiêu phút là đủ? (số)", "40", "Forty focused minutes."),
    ],
  },
  "f-listen-form": {
    id: "f-listen-form",
    title: "Nghe: điền form",
    minutes: 12,
    skill: "l",
    kind: "listen",
    kicker: "Listening P1",
    topic: "daily",
    script:
      "Good morning. I need to book a speaking slot. The name is Linh Tran, that's L-I-N-H, family name Tran. The date of birth is the third of March, 1998. Mobile number 0904 226 118. I'd like Thursday at 8 p.m., not Friday — I work late on Fridays. Please send the confirmation to linh.tran@studio.vn.",
    questions: [
      mcq("q1", "Ngày sinh?", ["3 March 1989", "3 March 1998", "13 March 1998", "3 May 1998"], "3 March 1998", "the third of March, 1998."),
      mcq("q2", "Muốn slot nào?", ["Thứ Sáu 8h tối", "Thứ Năm 8h tối", "Sáng thứ Năm", "Chủ nhật"], "Thứ Năm 8h tối", "Thursday at 8 p.m., not Friday."),
      tf("q3", "Họ là Linh.", "False", "Linh là tên; family name Tran."),
    ],
  },
  "f-listen-spell": {
    id: "f-listen-spell",
    title: "Nghe: đánh vần và số",
    minutes: 10,
    skill: "l",
    kind: "listen",
    kicker: "Listening P1",
    topic: "daily",
    script:
      "The reference code is B for Bravo, 17, then P as in paper, 4, 4. The fee is 1,150,000 dong, that's one million one hundred and fifty thousand, paid by Friday the 12th. If you come on the 11th, the desk closes at 4.30, not 5.",
    questions: [
      mcq("q1", "Mã tham chiếu?", ["B17B44", "B17P44", "B70P44", "P17B44"], "B17P44", "B, 17, P, 4, 4."),
      mcq("q2", "Quầy đóng lúc nào ngày 11?", ["5:00", "4:30", "4:00", "Không mở"], "4:30", "closes at 4.30, not 5 — bẫy sửa giờ."),
    ],
  },
  "f-read-notice": {
    id: "f-read-notice",
    title: "Đọc: thông báo lớp",
    minutes: 8,
    skill: "r",
    kind: "read",
    kicker: "Reading",
    topic: "daily",
    passage: `EVENING STUDIO — NOTICE

The speaking room is open Monday to Thursday, 20:00–21:00. Please record your answers; do not read from a script. If you miss two sessions, your slot is given to the waitlist. Water is allowed. Food is not.

The next diagnostic is on Friday at 19:30. Bring headphones.`,
    questions: [
      mcq("q1", "Phòng speaking mở ngày nào?", ["Cả tuần", "Thứ 2–5", "Thứ 6", "Cuối tuần"], "Thứ 2–5", "Monday to Thursday."),
      tf("q2", "Được mang đồ ăn vào phòng.", "False", "Food is not."),
      mcq("q3", "Diagnostic lúc nào?", ["20:00 thứ 2", "19:30 thứ 6", "21:00 thứ 5", "Không ghi"], "19:30 thứ 6", "Friday at 19:30."),
    ],
  },
  "f-read-email": {
    id: "f-read-email",
    title: "Đọc: email đổi lịch",
    minutes: 10,
    skill: "r",
    kind: "read",
    kicker: "Reading",
    topic: "daily",
    passage: `From: desk@eight.studio
Subject: Thursday slot moved

Hi Linh,

Your 20:00 speaking slot on 18 April has been moved to 20:30 the same evening — the examiner is arriving late. If 20:30 does not work, reply by Tuesday noon and we will offer Monday 19:00 instead. Please do not come at 20:00; the room will still be in use.

Bring your ID card. A student card is not accepted this month.

Mina`,
    questions: [
      mcq("q1", "Slot mới là lúc nào?", ["20:00 18/4", "20:30 18/4", "19:00 18/4", "19:00 thứ 2 bắt buộc"], "20:30 18/4", "moved to 20:30 the same evening."),
      tf("q2", "Thẻ sinh viên được chấp nhận.", "False", "A student card is not accepted this month."),
      mcq("q3", "Muốn đổi sang thứ 2 thì phải trả lời trước khi nào?", ["Thứ 5 tối", "Trưa thứ 3", "18/4", "Không cần"], "Trưa thứ 3", "reply by Tuesday noon."),
    ],
  },
  "f-speak-intro": {
    id: "f-speak-intro",
    title: "Nói: giới thiệu 45 giây",
    minutes: 8,
    skill: "s",
    kind: "speak",
    kicker: "Speaking Part 1",
    topic: "daily",
    speak: {
      part: 1,
      cue: "Tell me about a typical weekday. What do you do in the morning, and how do you study English?",
    },
  },
  "f-speak-home": {
    id: "f-speak-home",
    title: "Nói: nhà và phố",
    minutes: 8,
    skill: "s",
    kind: "speak",
    kicker: "Speaking Part 1",
    topic: "home",
    speak: {
      part: 1,
      cue: "Do you live in a house or a flat? What do you like about your neighbourhood, and what would you change?",
    },
  },
  "f-speak-work": {
    id: "f-speak-work",
    title: "Nói: việc hoặc học",
    minutes: 8,
    skill: "s",
    kind: "speak",
    kicker: "Speaking Part 1",
    topic: "work",
    speak: {
      part: 1,
      cue: "Do you work or are you a student? What is the most tiring part of your day, and why?",
    },
  },
  "f-write-sentence": {
    id: "f-write-sentence",
    title: "Viết: câu sạch, có thì",
    minutes: 12,
    skill: "w",
    kind: "write",
    kicker: "Writing seed",
    topic: "grammar",
    write: {
      task: 2,
      min: 80,
      prompt:
        "Write 8–10 sentences about your weekday. Use Present Simple for habits and at least two Past Simple sentences about yesterday. No lists of words — full sentences only. About 80–120 words.",
    },
  },
  "f-write-para": {
    id: "f-write-para",
    title: "Viết: một đoạn một ý",
    minutes: 15,
    skill: "w",
    kind: "write",
    kicker: "Writing seed",
    topic: "work",
    write: {
      task: 2,
      min: 100,
      prompt:
        "Some people think adults should spend more time with family than at work. Write ONE paragraph: sentence 1 = your position, sentences 2–4 = one reason + example, last sentence = restatement. At least 100 words.",
    },
  },
};
