export interface MethodCard {
  id: string;
  skill: "l" | "r" | "w" | "s";
  title: string;
  format: string;
  do: string[];
  dont: string[];
}

export const METHODS: MethodCard[] = [
  {
    id: "l-form",
    skill: "l",
    title: "Listening Part 1 — Form / note completion",
    format: "Hội thoại đời thường, 10 câu. Điền TỪ VÀ SỐ, đúng số từ đề cho (ONE WORD AND/OR A NUMBER).",
    do: [
      "Đọc form trước khi băng chạy: đoán từ loại (tên, số, ngày, giá).",
      "Viết đúng chính tả đề thi: số nhà, postcode, ngày (the twelfth).",
      "Nghe bẫy đổi ý: ‘the fifth — sorry, the twelfth’.",
      "Chữ số: 30 vs 13. Nếu không chắc, viết chữ (thirty).",
    ],
    dont: [
      "Không chép quá số từ cho phép.",
      "Không bỏ trống — đoán theo ngữ pháp còn hơn.",
      "Không sửa lúc Part 2 đang chạy.",
    ],
  },
  {
    id: "l-map",
    skill: "l",
    title: "Listening — Map / plan labelling",
    format: "Bản đồ tòa nhà, khu campus, phố. Mũi tên = chỗ người nói đứng.",
    do: [
      "Trước khi nghe: định hướng North và chỗ ‘you are here’.",
      "Từ hướng: opposite, next to, beyond, just past, on your left.",
      "Ngón tay đi theo lời. Đánh nháp, tô đáp án lúc cuối.",
    ],
    dont: ["Không nhìn đáp án A–G mà không nhìn hình.", "Không đảo left/right theo mặt mình thay vì theo hướng đi của speaker."],
  },
  {
    id: "l-mcq",
    skill: "l",
    title: "Listening — Multiple choice",
    format: "Part 2 hoặc 3. Ba lựa chọn; paraphrase, không phải từ trùng.",
    do: [
      "Gạch từ khóa câu hỏi (không phải cả 3 option).",
      "Loại đáp án nói sớm rồi bị phủ (‘we used to… but now…’).",
      "Đáp án đúng thường là ý cuối sau khi sửa.",
    ],
    dont: ["Không chọn vì nghe đúng 1 từ trong option — đó là mồi."],
  },
  {
    id: "l-p4",
    skill: "l",
    title: "Listening Part 4 — Bài giảng",
    format: "Một người, Academic. Note completion, không dừng.",
    do: [
      "Đọc 10 chỗ trống: đoán noun/number/date.",
      "Theo heading của note — đó là outline bài giảng.",
      "Chấp nhận mất 1 câu, nhảy theo heading kế, đừng kẹt.",
    ],
    dont: ["Không dịch từng câu trong đầu.", "Không viết cả mệnh đề — chỉ đúng số từ."],
  },
  {
    id: "r-tfng",
    skill: "r",
    title: "Reading — True / False / Not Given",
    format: "True = đoạn nói cùng ý (paraphrase). False = đoạn nói ngược. NG = đoạn không đụng tới ý đó.",
    do: [
      "Gạch tên riêng, số, so sánh (more than, the first, only) trong câu hỏi.",
      "Tìm đoạn bằng từ khóa, đọc 2 câu quanh.",
      "False: có mâu thuẫn rõ (tăng ≠ giảm, bắt buộc ≠ stop short of).",
      "NG: thiếu thông tin, không được suy từ ‘hợp lý’.",
    ],
    dont: [
      "Không chọn True vì ‘chắc đời là vậy’.",
      "Không chọn False khi đoạn im. Im = NG.",
      "Yes/No/NG là ý TÁC GIẢ, không phải sự kiện. Đừng lẫn bộ.",
    ],
  },
  {
    id: "r-head",
    skill: "r",
    title: "Reading — Matching headings",
    format: "Chọn tiêu đề cho từng đoạn. Nhiều heading hơn số đoạn.",
    do: [
      "Đọc câu chủ đề (thường câu 1–2) + câu cuối đoạn.",
      "Heading là ý CHÍNH, không phải ví dụ giữa đoạn.",
      "Gạch heading đã dùng.",
    ],
    dont: ["Không match vì 1 từ trùng (namesake trap).", "Không đọc cả bài rồi mới làm — từng đoạn một."],
  },
  {
    id: "r-match",
    skill: "r",
    title: "Reading — Matching information / features",
    format: "Đoạn nào chứa ý? hoặc ai nói gì?",
    do: [
      "Câu hỏi không theo thứ tự đoạn — scan tên riêng, số, italic.",
      "Paraphrase: cut emissions = reduce greenhouse gases.",
    ],
    dont: ["Không dừng ở đoạn đầu tiên có từ giống."],
  },
  {
    id: "r-sum",
    skill: "r",
    title: "Reading — Summary / sentence completion",
    format: "Tóm tắt 1 phần bài, điền từ trong bài hoặc hộp từ.",
    do: [
      "Xác định đoạn tóm tắt (thường 2–3 đoạn liên tiếp).",
      "Từ loại chỗ trống (noun số ít/nhiều, số, adj).",
      "Copy đúng form từ bài nếu đề bảo FROM THE PASSAGE.",
    ],
    dont: ["Không bịa synonym nếu đề đòi lấy từ bài."],
  },
  {
    id: "w-t1",
    skill: "w",
    title: "Writing Task 1 — 20 phút, 150 từ",
    format: "Biểu đồ / bảng / quy trình / bản đồ. Báo cáo, không nêu ý kiến.",
    do: [
      "Câu 1: paraphrase đề (the chart illustrates…).",
      "Câu 2: OVERVIEW — 2–3 nét lớn (highest, lowest, xu hướng chính). Không số vụn.",
      "2 đoạn thân: nhóm (năm, hạng mục), so sánh, số chọn lọc.",
      "Quy trình: bị động + thứ tự (first, then, subsequently).",
      "Bản đồ: north/south, was converted into, a new X was added.",
    ],
    dont: [
      "Không liệt kê từng năm.",
      "Không: I think, this is good, in conclusion.",
      "Không copy trục từ đề nguyên xi.",
    ],
  },
  {
    id: "w-t2",
    skill: "w",
    title: "Writing Task 2 — 40 phút, 250 từ",
    format: "Agree / discuss both / advantages / problems / two-part. 4 tiêu chí: TA, CC, LR, GRA.",
    do: [
      "2 phút outline. Câu 1 intro PHẢI có lập trường (không I will discuss both sides rồi biến).",
      "Mỗi thân: PEEL — Point, Explanation, Example cụ thể (nơi, nhóm người), Link.",
      "Discuss both: 1 đoạn mỗi phe + đoạn ngắn chọn phe, hoặc 2 đoạn có trọng số.",
      "Two-part: trả lời đủ 2 câu hỏi, đừng viết lạc đề sang ‘giáo dục nói chung’.",
      "Kết: 2 câu, lập trường cũ, không ý mới.",
    ],
    dont: [
      "Không memorised template nguyên đoạn.",
      "Không ví dụ ‘tôi và bạn tôi’ cho Academic — dùng nhóm (commuters in Hanoi, first-year students).",
      "Không phô từ hiếm; GRA sạch > từ lạ sai.",
    ],
  },
  {
    id: "w-band",
    skill: "w",
    title: "Bốn tiêu chí chấm Writing",
    format: "Band = trung bình TA, CC, LR, GRA. 6.5 thường vỡ GRA hoặc TA lạc.",
    do: [
      "TA: trả đúng loại đề, đủ 250, overview Task 1, lập trường Task 2.",
      "CC: một đoạn một ý, logic, từ nối vừa đủ (however không phải mỗi câu).",
      "LR: collocation (make a decision, pose a threat), paraphrase, không lặp the graph shows 8 lần.",
      "GRA: thì, mạo từ, câu phức đúng, ít lỗi làm khó hiểu.",
    ],
    dont: ["Không tưởng band 8 = từ khó. Band 8 = ít lỗi + linh hoạt."],
  },
  {
    id: "s-p1",
    skill: "s",
    title: "Speaking Part 1 — 4–5 phút",
    format: "Câu ngắn về bạn: nhà, việc, ngày thường. Giám khảo cắt khi đủ.",
    do: [
      "3 nhịp: trả lời trực tiếp + 1 lý do + 1 chi tiết (chỗ, lần, số).",
      "Chia thì: last weekend = Past Simple.",
      "Kéo phụ âm cuối; không dịch từng chữ.",
    ],
    dont: ["Không độc thoại 1 phút — Part 1 không phải Part 2.", "Không yes/no rồi im."],
  },
  {
    id: "s-p2",
    skill: "s",
    title: "Speaking Part 2 — 1 phút nghĩ, 1–2 phút nói",
    format: "Cue card. Phải phủ 4 gạch đầu dòng.",
    do: [
      "Phút nghĩ: 4 từ khóa, 1 chuyện cụ thể (một người, một lần), thì quá khứ.",
      "Mở 1 câu: I’m going to talk about…",
      "Kể chuyện có mốc (when, where, who said what).",
      "Hết ý sớm: thêm cảm giác lúc đó + vì sao còn nhớ.",
    ],
    dont: ["Không đọc note thành bài.", "Không dừng ở 45 giây — giám khảo muốn gần 2 phút."],
  },
  {
    id: "s-p3",
    skill: "s",
    title: "Speaking Part 3 — 4–5 phút, trừu tượng",
    format: "Câu hỏi xã hội, so sánh, nguyên nhân, tương lai. Band 8 = điều kiện + ví dụ nhóm.",
    do: [
      "Câu 1: lập trường ngắn. Câu 2: vì sao. Câu 3: ví dụ (một thành phố, một nghề). Câu 4: ngoại lệ.",
      "Dùng if / unless / in some cases. It depends on… rồi chọn một nhánh.",
      "Không lặp Part 2 ‘tôi và gia đình tôi’ — nâng lên commuters, teenagers, small shops.",
    ],
    dont: ["Không memorised philosophy.", "Không ‘it is important to protect the environment’ không có because."],
  },
];

export const SKILL_LABEL = { l: "Nghe", r: "Đọc", w: "Viết", s: "Nói" } as const;
