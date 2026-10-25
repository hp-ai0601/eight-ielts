export type Tip = {
  id: string;
  skill: "l" | "r" | "w" | "s" | "v" | "day";
  title: string;
  why: string;
  do: string[];
  dont: string[];
};

/** Mẹo thi Academic — gốc British Council / IELTS.org / IDP, viết lại cho Eight, không chép đề. */
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
    id: "day-study-loop",
    skill: "day",
    title: "Lộ trình: nghe – đọc – nói – viết mỗi ngày",
    why: "Kỹ năng nói/viết phải nhận đầu vào từ nghe/đọc. Học tách kỹ năng thường chậm.",
    do: [
      "Nghe 1 podcast 5–7 phút → chép 5 collocations mới.",
      "Đọc 1 bài báo → tìm 3 câu phức.",
      "Nói/viết lại ý đó bằng từ vừa học.",
    ],
    dont: ["Không chỉ làm test mà không ôn lại từ sai.", "Không học từ lẻ mà bỏ qua cụm động từ."],
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
    id: "l-map",
    skill: "l",
    title: "Labelling maps/plans: đứng trên mũi tên",
    why: "Bản đồ mô tả theo hướng đi. Người nói di chuyển, mình phải theo.",
    do: [
      "Xác định North ở góc bản đồ trước.",
      "Dự đoán từ: entrance, path, gate, bridge, reception, courtyard.",
      "Chú ý tính từ: opposite, next to, at the rear, in the corner.",
    ],
    dont: ["Không viết tên địa điểm sai chính tả.", "Không bỏ qua hướng trên mũi tên."],
  },
  {
    id: "l-synonym",
    skill: "l",
    title: "Synonym là chìa khóa Listening",
    why: "Đề và băng hiếm khi dùng cùng từ. Band cao = nghe paraphrase.",
    do: [
      "expensive → affordable? cheap? reasonable?",
      "not enough → shortage / lack of / insufficient.",
      "happy with → satisfied with / pleased with.",
    ],
    dont: ["Không chờ nghe đúng từ trong câu hỏi.", "Không dịch nghĩa Việt ngay — nghĩ tiếng Anh."],
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
    id: "r-heading",
    skill: "r",
    title: "Matching headings: tìm main idea, không chi tiết",
    why: "Đa số chọn heading vì thấy 1 từ trùng — đó là bẫy.",
    do: [
      "Đọc topic sentence đầu/cuối đoạn.",
      "Tóm tắt đoạn bằng 3–4 từ của mình, rồi so headings.",
      "Loại headings quá chung (the general idea) hoặc quá hẹp (one fact).",
    ],
    dont: ["Không chọn vì 1 từ trùng.", "Không đọc cả đoạn từ đầu đến cuối trước."],
  },
  {
    id: "r-sentence",
    skill: "r",
    title: "Sentence completion: đúng ngữ pháp",
    why: "Đáp án phải vừa ý vừa vừa ngữ pháp.",
    do: [
      "Xem trước từ loại cần điền: danh từ? tính từ? động từ?",
      "Kiểm tra số nhiều nếu có these, many, several.",
      "Giữ nguyên dạng từ trong bài, không tự chia lung tung.",
    ],
    dont: ["Không điền vượt quá số từ cho phép.", "Không bỏ qua mạo từ a/an/the."],
  },
  {
    id: "r-skimming",
    skill: "r",
    title: "Skimming: 90 giây mỗi đoạn",
    why: "Reading IELTS không đọc từng chữ mà đọc để tìm.",
    do: [
      "Lướt topic sentences, tên riêng, số, ngày tháng.",
      "Đánh dấu câu hỏi theo thứ tự đoạn.",
      "Dùng từ khóa câu hỏi để locate nhanh.",
    ],
    dont: ["Không dịch từng từ.", "Không quay lại đọc lại toàn bộ đoạn."],
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
    id: "w-cohesion",
    skill: "w",
    title: "Cohesion: 1 ý 1 đoạn, 1 câu 1 ý",
    why: "Coherence and Cohesion cao khi đọc thấy mạch, không phải nhiều từ nối.",
    do: [
      "Mở đoạn bằng topic sentence.",
      "Dùng this/which để nối lại ý cũ.",
      "Từ nối đa dạng: whereas, consequently, in addition.",
    ],
    dont: ["Không viết câu dài 4 dòng.", "Không nối bằng moreover ở mọi đoạn."],
  },
  {
    id: "w-lexical",
    skill: "w",
    title: "LR: đo lường, không trang trí",
    why: "Band 7+ dùng từ chính xác, không dùng từ to để khoe.",
    do: [
      "rise dramatically → soar / rocket / surge.",
      "fall → plunge / slump / decline gradually.",
      "people think → argue / claim / acknowledge / contend.",
    ],
    dont: ["Không dùng từ mà chưa rõ collocations.", "Không lặp từ important ở cả bài."],
  },
  {
    id: "w-grammar-range",
    skill: "w",
    title: "GRA: range + accuracy cân bằng",
    why: "Câu phức sai nhiều còn tệ hơn câu đơn đúng.",
    do: [
      "Mỗi bài có: 1 câu điều kiện, 1 câu chỉ định, 1 bị động, 1 mệnh đề quan hệ.",
      "Dành 2 phút cuối sửa lỗi động từ và số nhiều.",
    ],
    dont: ["Không viết câu dài nếu chưa kiểm soát dấu phẩy.", "Không bỏ kiểm tra thì."],
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
    id: "s-fluency",
    skill: "s",
    title: "Fluency: nói chậm hơn 10%",
    why: "Nói vội để che lỗi thường tạo ra nhiều filler và ngắt hơi.",
    do: [
      "Hít nhẹ trước khi trả lời.",
      "Dùng silence 1 giây để nghĩ — giám khảo không trừ silence.",
      "Kéo dài trọng âm: com-FOR-ta-ble, pho-TO-graph.",
    ],
    dont: ["Không nói liên tục bằng cách lấp từ không rõ nghĩa.", "Không tăng tốc khi bối rối."],
  },
  {
    id: "s-pronunciation",
    skill: "s",
    title: "Pronunciation: âm /θ/, /ð/, trọng âm câu",
    why: "Accent không trừ; không hiểu mới trừ. 3 âm này hay khiến người nghe lạc.",
    do: [
      "think /θ/ thổi hơi; this /ð/ để lưỡi chạm răng.",
      "Nhấn content words, xuống giọng cuối câu.",
      "Luyện nối âm: an apple /əˈnæp.əl/, pick it up.",
    ],
    dont: ["Không phát âm every từ đều nhau.", "Không bỏ âm cuối -ed / -s."],
  },
  {
    id: "s-part2",
    skill: "s",
    title: "Part 2: kể chuyện 2 phút",
    why: "Cue card có 4 gợi ý. Trả lời đủ 4 gợi ý là đạt chuẩn.",
    do: [
      "Dùng 1 phút chuẩn bị: viết 5 từ khóa, không viết câu.",
      "Mở: I'd like to talk about… / S + V quá khứ.",
      "Kết: That's why… / So, that's the…",
    ],
    dont: ["Không đọc lại đề bài.", "Không dừng trước 1 phút 30 giây."],
  },
  {
    id: "s-part3",
    skill: "s",
    title: "Part 3: trả lời như viết thu nhỏ",
    why: "Part 3 đánh giá khả năng trừu tượng và argument.",
    do: [
      "Trả lời ý → giải thích → ví dụ → so sánh.",
      "Dùng it depends on… để mở rộng.",
      "So sánh: compared with / in contrast to / unlike.",
    ],
    dont: ["Không trả lời cá nhân ‘I like…’.", "Không trả lời ngắn dưới 3 câu."],
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
  {
    id: "w-transfer-answer",
    skill: "w",
    title: "Listening: chuyển đáp án gọn gàng",
    why: "10 phút cuối hay mất điểm vì viết ẩu.",
    do: [
      "Viết hoa đầu câu, tên riêng.",
      "Ngày tháng: 12 June / June 12 đều được, nhất quán.",
      "Một từ: book không được books nếu nghe số nhiều.",
    ],
    dont: ["Không sửa giữa dòng khiến khó đọc.", "Không để trống vì sợ sai chính tả."],
  },
  {
    id: "l-song",
    skill: "l",
    title: "Học qua bài hát (nhạc Anh)",
    why: "Giai điệu giúp não nhớ câu dài mà không cần cố gắng — từ vựng đi kèm cảm xúc thì khó quên.",
    do: [
      "Chọn ca sĩ phát âm rõ, nhịp vừa: Adele, Ed Sheeran, The Beatles, Westlife, Coldplay.",
      "Nghe lần 1 không chữ, đoán chủ đề. Lần 2 nhìn lời, gạch 3 từ mới tra ở mục Từ điển.",
      "Nghe chậm 0.75x, nhảy theo (shadowing) từng câu ngắn.",
      "Một tuần một bài: ngày 1 nghe, ngày 3 hát theo, ngày 7 viết lại 5 câu nhớ nhất.",
    ],
    dont: ["Không học quá một bài một tuần — nhai chưa kỹ.", "Không dịch máy cả bài; tự đoán trước."],
  },
  {
    id: "v-sound-memo",
    skill: "v",
    title: "Mẹo nhớ âm điệu (đồng âm)",
    why: "Não nhớ hình ảnh vui lâu hơn nhớ phiên âm khô. Gắn âm tiếng Anh với câu tiếng Việt nghe gần giống.",
    do: [
      "Ví dụ: boxed meal /ˌbɒkst ˈmiːl/ → «bóc mì sữa»: bóc hộp cơm thấy hộp sữa.",
      "Đọc mẹo xong phải đọc lại IPA chuẩn — mẹo chỉ để nhớ, không phải cách đọc.",
      "Mở trang Từ điển, tra từ hay quên, tự đặt mẹo riêng cho mình.",
    ],
    dont: ["Không đọc mẹo thay cho phát âm thật.", "Không lạm dụng với mọi từ — chỉ từ hay quên."],
  },
];
