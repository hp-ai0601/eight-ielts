import { gap, mcq, tf, type Question } from "@/lib/content/types";

export interface GrammarUnit {
  id: string;
  title: string;
  band: string;
  vnTrap: string;
  rule: string;
  steps: string[];
  questions: Question[];
}

export const GRAMMAR: GrammarUnit[] = [
  {
    id: "tenses",
    title: "Thì: chọn thì theo mốc, không theo ‘cảm’",
    band: "0–6 rồi 8",
    vnTrap: "Tiếng Việt không chia thì. Part 1 chết vì I am go / I have went / last year I have studied.",
    rule: "Nhìn mốc thời gian trước, rồi chia. yesterday / last year / in 2019 → Past Simple. since / recently / for two years (còn liên quan) → Present Perfect. thói quen → Present Simple. đang xảy ra lúc nói → Present Continuous. Tương lai có kế hoạch cố định (vé, lịch) → Present Continuous hoặc going to, không nhét will bừa.",
    steps: [
      "Gạch mốc thời gian trong câu hỏi giám khảo.",
      "Past Simple nếu hành động đã khép (I started in 2022).",
      "Present Perfect nếu có mốc ‘từ lúc đó đến giờ’ (I have lived here since 2020).",
      "Không trộn have + V2 sai (have went). have + past participle.",
    ],
    questions: [
      gap("g-t1", "Last year I ______ the test for the first time. (take)", "took", "Last year khóa Past Simple."),
      mcq("g-t2", "I ______ in Da Nang since 2019.", ["lived", "have lived", "am living", "had live"], "have lived", "since + điểm trong quá khứ, còn ở đây → Present Perfect."),
      mcq("g-t3", "Câu nào sai?", ["I went yesterday.", "I have went yesterday.", "I have already eaten.", "I eat rice every day."], "I have went yesterday.", "went không phải past participle; yesterday không đi với Present Perfect."),
      tf("g-t4", "I am go to school every day. là câu đúng.", "False", "Thói quen: I go. Be không ghép go."),
    ],
  },
  {
    id: "articles",
    title: "a / an / the / không gì",
    band: "6–8",
    vnTrap: "Tiếng Việt không có mạo từ. Band 6 nhồi the vào mọi danh từ, hoặc bỏ hết.",
    rule: "a/an = một, chưa xác định, đếm được số ít (an hour vì /aʊə/ bắt đầu nguyên âm). the = người nghe biết cái nào (the graph, the government nếu đã nêu). Không mạo từ: danh từ không đếm khi nói chung (information, evidence, advice), số nhiều khi nói chung (Students need sleep).",
    steps: [
      "Hỏi: đếm được không? số ít hay số nhiều? đã nêu chưa?",
      "Task 1: the figure, the vertical axis, the year 2019. Không: a pollution.",
      "Không: an evidence / the informations / a research.",
    ],
    questions: [
      mcq("g-a1", "There is little ______ that longer hours help.", ["evidences", "an evidence", "evidence", "the evidences"], "evidence", "evidence không đếm."),
      mcq("g-a2", "______ graph shows a rise in 2016.", ["A", "An", "The", "(trống)"], "The", "Biểu đồ đề bài = đã xác định."),
      gap("g-a3", "She is ______ honest person. (a/an/the)", "an", "honest /ˈɒnɪst/ bắt đầu nguyên âm."),
      tf("g-a4", "Research are showing a new trend. đúng.", "False", "research không đếm + động từ số ít: Research is showing / shows."),
    ],
  },
  {
    id: "count",
    title: "Đếm được / không đếm được",
    band: "5–8",
    vnTrap: "many information, a news, furnitures, homeworks, advices.",
    rule: "Không đếm (đi với much / little / some, không a/an, không -s): information, advice, furniture, homework, news, evidence, research, traffic, accommodation, software, knowledge, progress. Đếm: fact, suggestion, chair, assignment, report.",
    steps: [
      "Học theo cụm: a piece of advice, two pieces of furniture, an item of news.",
      "Task 1: traffic (không a traffic), accommodation (không accommodations ở Academic BrE).",
    ],
    questions: [
      mcq("g-c1", "Câu đúng?", ["I need an advice.", "I need some advice.", "I need advices.", "I need many advice."], "I need some advice.", "advice không đếm."),
      gap("g-c2", "There is too much ______ in the centre. (traffic)", "traffic", "traffic không đếm."),
      tf("g-c3", "Homeworks is uncountable, nên không nói homeworks.", "True", "homework không đếm."),
    ],
  },
  {
    id: "complex",
    title: "Câu phức sạch: although / which / if",
    band: "7–8",
    vnTrap: "Although..., but... / In today's modern society... / câu 40 từ không chủ ngữ.",
    rule: "Band 8 = câu phức đúng, không câu dài. Although + mệnh đề, mệnh đề. Không but/however trong cùng cấu trúc. which thêm thông tin sau danh từ (The policy, which was delayed, failed). if + hiện tại, will/might + V. Một câu một ý chính.",
    steps: [
      "Viết 2 câu đơn đúng đã, rồi nối bằng although / which / if.",
      "Đọc lại: có 2 chủ ngữ 2 động từ không? Dấu phẩy đúng chỗ không?",
      "Xóa in today's modern society, it is clear that, all in all.",
    ],
    questions: [
      mcq("g-x1", "Câu đúng?", ["Although it is costly, but it works.", "Although it is costly, it works.", "Although it is costly, however it works.", "Although it is costly but however it works."], "Although it is costly, it works.", "Although không đi với but/however."),
      mcq("g-x2", "The metro, ______ opened in 2021, cut journey times.", ["who", "which", "what", "where"], "which", "metro = vật → which."),
      tf("g-x3", "Câu càng dài càng ra band 8.", "False", "Câu phức sạch, không câu rối."),
    ],
  },
  {
    id: "relative",
    title: "Mệnh đề quan hệ",
    band: "6.5–8",
    vnTrap: "who cho đồ vật, which cho người, that sau dấu phẩy.",
    rule: "Người: who / that. Vật: which / that. Nơi: where. Lý do: why. Mệnh đề không xác định (thêm thông tin, có phẩy) dùng which/who, không that. Bỏ đại từ khi nó là tân ngữ: the book I read (không bắt buộc that).",
    steps: [
      "Hỏi: bổ nghĩa người hay vật? Có phẩy không?",
      "Speaking: The teacher who made me rewrite every sentence…",
    ],
    questions: [
      mcq("g-r1", "People ______ live near the airport complain about noise.", ["which", "who", "where", "what"], "who", "people → who."),
      mcq("g-r2", "The policy, ______ was delayed, failed.", ["that", "which", "who", "what"], "which", "Có phẩy = non-defining → which, không that."),
    ],
  },
  {
    id: "cond",
    title: "Câu điều kiện",
    band: "6–8",
    vnTrap: "If I will... / If I would have...",
    rule: "Loại 0: If + HT, HT (sự thật). Loại 1: If + HT, will/might + V (có thể xảy ra). Loại 2: If + V2, would + V (giả định hiện tại). Loại 3: If + had V3, would have V3 (quá khứ không xảy ra). Band 8 hay dùng loại 2–3 ở Part 3: If cities priced parking properly, fewer people would drive.",
    steps: [
      "Part 3: trả lời có điều kiện, không có/không.",
      "Không: If the government will build more roads.",
    ],
    questions: [
      mcq("g-d1", "If the government ______ parking, fewer people would drive.", ["prices", "priced", "will price", "had priced"], "priced", "Loại 2: If + V2, would + V."),
      tf("g-d2", "If I will have time, I will practise. đúng.", "False", "If + hiện tại, không will."),
      gap("g-d3", "If I had started earlier, I ______ have finished. (would)", "would", "Loại 3: would have + V3. Ở đây điền would."),
    ],
  },
  {
    id: "passive",
    title: "Bị động — Task 1 quy trình",
    band: "6–8",
    vnTrap: "The water is took / People is built the factory.",
    rule: "be + past participle. Quy trình Task 1: The beans are roasted, then they are ground. Không cần người làm. Hiện tại: is/are + V3. Quá khứ: was/were + V3. Perfect: has been + V3.",
    steps: [
      "Quy trình / bản đồ: ưu tiên bị động.",
      "Biểu đồ số: chủ động (Sales rose) sạch hơn bị động giả.",
    ],
    questions: [
      mcq("g-p1", "The beans ______ roasted for twenty minutes.", ["is", "are", "been", "being"], "are", "beans số nhiều + bị động hiện tại."),
      gap("g-p2", "The factory was ______ in 2012. (build)", "built", "be + V3: built."),
    ],
  },
  {
    id: "hedge",
    title: "Hedging: Band 8 không tuyệt đối",
    band: "7.5–8",
    vnTrap: "This will definitely solve... / Everyone knows... / In conclusion, it is obvious...",
    rule: "may / might / tend to / appear to / it seems / not necessarily / to some extent / in some cases. Band 8 giữ điều kiện: This might reduce congestion if buses already run. Không phô từ hiếm; giảm từ chắc nịch.",
    steps: [
      "Mỗi khẳng định Task 2: thêm điều kiện hoặc mức độ.",
      "Xóa definitely, obviously, all people, always, never (trừ khi data Task 1 thật sự luôn).",
    ],
    questions: [
      mcq("g-h1", "Câu nào band 8 hơn?", ["This will definitely fix traffic.", "This might reduce traffic if fares stay low.", "Everyone knows cars are bad.", "In today's society traffic is a problem."], "This might reduce traffic if fares stay low.", "might + điều kiện."),
      tf("g-h2", "Hedging là viết yếu, né lập trường.", "False", "Lập trường rõ ở câu 1; hedging là không phóng đại bằng chứng."),
    ],
  },
  {
    id: "sva",
    title: "Chủ ngữ — động từ",
    band: "5–7",
    vnTrap: "People is / The number of students are / Data is vs are.",
    rule: "Số ít: The number of students is rising (number là chủ ngữ). Số nhiều: A number of students are late. people, police, data (thường số nhiều trong Academic) đi với are. each / everyone + V số ít.",
    steps: ["Khoanh chủ ngữ thật, bỏ cụm of... giữa chừng.", "Task 1: The proportion of women was..., not were."],
    questions: [
      mcq("g-s1", "The number of cars ______ doubled.", ["have", "has", "are", "were"], "has", "the number = số ít."),
      mcq("g-s2", "People ______ more than they did in 2000.", ["commutes", "commute", "is commuting", "has commute"], "commute", "people số nhiều."),
    ],
  },
  {
    id: "compare",
    title: "So sánh — xương Task 1",
    band: "6–8",
    vnTrap: "more cheaper / the most highest / like than.",
    rule: "Tính ngắn: higher / the highest. Dài: more expensive / the most expensive. Bất quy tắc: good–better–best, bad–worse–worst, far–further. So sánh ngang: as + adj + as. Khác: whereas / while / in contrast. Gấp: twice as high as, three times higher than (cẩn thận: three times as high as sạch hơn).",
    steps: [
      "Task 1 luôn so sánh ít nhất 2 đối tượng, không liệt kê từng năm.",
      "Overview: overall X was higher than Y / A rose while B fell.",
    ],
    questions: [
      mcq("g-k1", "Câu đúng?", ["more cheaper", "cheaper", "more cheaper than", "the more cheapest"], "cheaper", "cheap ngắn → cheaper."),
      gap("g-k2", "Car use was twice ______ high as bus use. (as/so/than)", "as", "twice as high as."),
    ],
  },
];
