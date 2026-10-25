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
    format: "Hội thoại đời thường, 10 câu. Điền từ và số, đúng số lượng từ đề yêu cầu (ONE WORD AND/OR A NUMBER).",
    do: [
      "Đọc trước phiếu trả lời khi băng chưa chạy: đoán xem chỗ trống cần loại từ gì (tên, số, ngày, giá).",
      "Viết đúng chính tả: số nhà, mã bưu điện, ngày tháng (the twelfth).",
      "Cẩn thận bẫy đổi ý giữa chừng: ‘the fifth — sorry, the twelfth’.",
      "Nghe kỹ số: 30 khác 13. Không chắc thì viết bằng chữ (thirty).",
    ],
    dont: [
      "Đừng viết quá số từ cho phép.",
      "Đừng bỏ trống — đoán theo ngữ pháp vẫn hơn.",
      "Đừng mải sửa bài khi Part 2 đang chạy.",
    ],
  },
  {
    id: "l-map",
    skill: "l",
    title: "Listening — Map / plan labelling",
    format: "Bản đồ tòa nhà, khuôn viên trường hoặc con phố. Mũi tên là chỗ người nói đang đứng.",
    do: [
      "Trước khi nghe: xác định hướng Bắc và vị trí ‘you are here’.",
      "Ghi nhớ từ chỉ hướng: opposite, next to, beyond, just past, on your left.",
      "Để ngón tay đi theo lời nói trên bản đồ. Đánh dấu nháp, cuối giờ tô đáp án sau.",
    ],
    dont: ["Đừng chỉ nhìn đáp án A–G mà quên nhìn hình.", "Đừng đảo trái/phải theo hướng mặt mình — phải theo hướng đi của người nói."],
  },
  {
    id: "l-mcq",
    skill: "l",
    title: "Listening — Multiple choice",
    format: "Part 2 hoặc 3. Ba lựa chọn — đáp án thường được diễn đạt lại (paraphrase), không trùng nguyên từ.",
    do: [
      "Gạch từ khóa trong câu hỏi (chứ không phải trong cả 3 đáp án).",
      "Loại đáp án được nhắc sớm rồi bị phủ nhận (‘we used to… but now…’).",
      "Đáp án đúng thường là ý được nhắc cuối cùng, sau khi người nói sửa lại.",
    ],
    dont: ["Đừng chọn chỉ vì nghe trùng một từ trong đáp án — đó là bẫy."],
  },
  {
    id: "l-p4",
    skill: "l",
    title: "Listening Part 4 — Bài giảng",
    format: "Một người nói, nội dung học thuật. Dạng điền ghi chú, băng chạy một mạch không dừng.",
    do: [
      "Đọc trước 10 chỗ trống: đoán xem cần danh từ, con số hay ngày tháng.",
      "Bám theo các tiêu đề nhỏ trong ghi chú — đó chính là dàn ý bài giảng.",
      "Lỡ mất một câu thì bỏ qua, nhảy theo tiêu đề kế tiếp — đừng mắc kẹt.",
    ],
    dont: ["Đừng dịch từng câu trong đầu.", "Đừng viết cả cụm dài — chỉ điền đúng số từ cho phép."],
  },
  {
    id: "r-tfng",
    skill: "r",
    title: "Reading — True / False / Not Given",
    format: "True = bài đọc nói cùng ý (có thể diễn đạt khác). False = bài đọc nói ngược. Not Given = bài đọc không nhắc tới ý đó.",
    do: [
      "Gạch tên riêng, số, so sánh (more than, the first, only) trong câu hỏi.",
      "Tìm đoạn liên quan bằng từ khóa, đọc kỹ 2 câu xung quanh.",
      "False: có mâu thuẫn rõ ràng (tăng ≠ giảm, bắt buộc ≠ stop short of).",
      "Not Given: bài không có thông tin — đừng suy diễn theo kiểu ‘nghe hợp lý’.",
    ],
    dont: [
      "Đừng chọn True chỉ vì ‘thực tế chắc là vậy’.",
      "Bài không nhắc tới thì đừng chọn False — không nhắc là Not Given.",
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
