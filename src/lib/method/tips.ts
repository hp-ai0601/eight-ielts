export type Tip = {
  id: string;
  skill: "l" | "r" | "w" | "s" | "day";
  title: string;
  why: string;
  do: string[];
  dont: string[];
};

/** Mẹo thi Academic — gốc British Council / IELTS.org, viết lại cho Zang, không chép đề. */
export const TIPS: Tip[] = [
  {
    id: "day-clock",
    skill: "day",
    title: "Đồng hồ thật: 30 + 60 + 60",
    why: "Cùng ngày, không nghỉ giữa Listening–Reading–Writing. Speaking có thể khác buổi.",
    do: [
      "Listening 30′ + 10′ chuyển đáp án trên giấy (máy tính thì không có 10′ thừa).",
      "Reading 60′ = 20′ mỗi đoạn. Hết 20′ thì bỏ, sang đoạn 2.",
      "Writing 20′ Task 1 + 40′ Task 2. Task 2 nặng điểm hơn — đừng viết Task 1 35 phút.",
    ],
    dont: ["Không ‘làm hết đoạn 1 cho đẹp’ rồi 12 phút cho đoạn 3.", "Không bỏ trống Listening — đoán còn hơn."],
  },
  {
    id: "l-trap",
    skill: "l",
    title: "Nghe: speaker sửa lời",
    why: "Band chết vì chọn thông tin đầu tiên. Đề thi sống bằng ‘sorry, I mean…’.",
    do: [
      "Đọc câu hỏi trước khi băng. Đoán từ loại.",
      "Nghe đến hết chỗ trống — đáp án hay nằm sau từ phủ (not, instead, actually).",
      "Số: thirteen / thirty. Viết chữ nếu không chắc.",
    ],
    dont: ["Không dừng bút khi vừa nghe một con số.", "Không viết quá số từ đề cho."],
  },
  {
    id: "r-ng",
    skill: "r",
    title: "TFNG: im = Not Given",
    why: "False là đoạn nói NGƯỢC. Không có trong bài = NG, dù đời ‘chắc vậy’.",
    do: [
      "Gạch so sánh, only, all, the first, always trong câu hỏi.",
      "True = paraphrase cùng ý. False = mâu thuẫn rõ.",
      "Yes/No/NG là ý TÁC GIẢ, không phải sự kiện — đừng lẫn bộ.",
    ],
    dont: ["Không suy từ kiến thức ngoài bài.", "Không chọn False vì ‘thiếu chi tiết’ — thiếu = NG."],
  },
  {
    id: "w-overview",
    skill: "w",
    title: "Task 1: câu overview quyết định TA",
    why: "Thiếu overview = Task Achievement kẹt dưới 6, dù số đúng.",
    do: [
      "Câu 1 paraphrase đề. Câu 2: 2–3 nét lớn, không số vụn.",
      "So sánh, không liệt kê từng năm.",
      "Quy trình: bị động + thứ tự. Bản đồ: was converted into.",
    ],
    dont: ["Không I think.", "Không copy trục từ đề.", "Không kết luận đạo đức."],
  },
  {
    id: "w-tr",
    skill: "w",
    title: "Task 2: lập trường + PEEL",
    why: "Lạc đề một thân = TR sụp. 250 từ mà 2 ý mơ = band 6.",
    do: [
      "Intro có lập trường. Mỗi thân: Point → because → ví dụ nhóm người/nơi → link.",
      "Discuss both: đủ 2 phe. Two-part: đủ 2 câu hỏi.",
      "Kết 2 câu, không ý mới. Hedging: might… if…",
    ],
    dont: ["Không template nguyên đoạn.", "Không ví dụ ‘tôi và bạn’.", "Không definitely / everyone knows."],
  },
  {
    id: "s-extend",
    skill: "s",
    title: "Nói: 3 nhịp, phụ âm cuối",
    why: "Part 1 yes/no rồi im = Fluency 5. Nuốt -s/-t = Pron kẹt.",
    do: [
      "Trả lời + because + một chi tiết (chỗ, lần, số).",
      "Part 2: một chuyện cụ thể, gần 2 phút, thì quá khứ.",
      "Part 3: it depends on… rồi chọn 1 nhánh + ví dụ thành phố/nghề.",
    ],
    dont: ["Không học thuộc 2 phút.", "Không dịch từng chữ Việt.", "Không bỏ phụ âm cuối want/liked/bags."],
  },
  {
    id: "l-r-key",
    skill: "r",
    title: "Listening/Reading chấm theo đáp án",
    why: "Mỗi câu 1 điểm. Quy đổi band ~ 30/40 ≈ 7, 35–36/40 ≈ 8 Academic.",
    do: [
      "Nộp là máy so đáp án, không cần thầy.",
      "Chính tả Listening: đúng form đề (số nhiều, hyphen).",
      "American/British spelling đều nhận nếu đề không khóa một dạng.",
    ],
    dont: ["Không để trống.", "Không đổi số từ (one word / no more than two)."],
  },
  {
    id: "ws-teacher",
    skill: "w",
    title: "Writing/Speaking: thầy chấm 4 ô",
    why: "Máy ước TA/CC/LR/GRA hoặc FC/LR/GRA/Pron. Band luyện = thầy Hiệp.",
    do: [
      "Zang nộp văn / ghi âm. Máy hiện 4 số ước lượng.",
      "Thầy kéo 4 ô + 1 câu nhận xét. Zang thấy trên Hôm nay.",
      "Official descriptors: ielts.org — không học thuộc bảng, học từng lỗi.",
    ],
    dont: ["Không tin band máy là điểm thi.", "Không sửa theo AI nếu thầy chưa nói."],
  },
];
