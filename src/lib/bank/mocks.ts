import { mcq, tf, tfng, gap, type Question } from "@/lib/content/types";
import type { BankTest } from "./types";

function ten(prefix: string, rows: [string, string[], string, string][]): Question[] {
  return rows.map((r, i) => mcq(`${prefix}${i + 1}`, r[0], r[1], r[2], r[3]));
}

const A_L1 = `Good morning, I'd like to book the evening studio. Name: Zang Beu, that's Z-A-N-G, family name B-E-U. Date of birth 14 February 2004. Mobile 0912 448 067. I wanted Friday 20:00 but that's full. Put me on Thursday 20:30. Email zang.beu@studio.vn. I'll pay by transfer, not card. Reference will be sent tonight.`;

const A_L2 = `Welcome to the test centre. Reception is on your left as you enter. The waiting area is straight ahead by the fountain. Toilets are on the right, opposite room B. Do not wait by the lockers. Speaking rooms C and D are behind reception. If you arrive early, sit in the waiting area, not on the stairs. Water is allowed. Food is not. The next announcement is at 8.50.`;

const A_L3 = `Tutor: Minh, your draft says remote work always raises productivity. Minh: The 2020 figure was 34% at home. Tutor: And 2024? Minh: 18%, still more than double 2019. Office days were better for new hires; home days for writing. Tutor: Put that in limitations. Drop 'in today's modern society'. Also cite the rent reason — managers kept hybrid to cut office rent.`;

const A_L4 = `Today two trials. Trial A: night buses on two corridors, Friday injury crashes down 19%, Thursday unchanged. Cost 4.2 billion dong in six months. Trial B: extra patrols, crashes down 8% all nights, overtime 6.1 billion, then dropped. If your goal is Friday on those two roads, buses win per crash avoided. If city-wide deterrent, patrols still have a case. Write the condition, not 'buses are better'.`;

const A_R1 = `University fees tripled between 2008 and 2024, yet completion barely moved. Students who worked a paid year before enrolling were half as likely to switch majors in year one. Vocational colleges showed lower first-year dropout and lower pay at 30. The authors stop short of a compulsory gap year. They argue that forcing 18-year-olds to pick a discipline with almost no labour-market information is an expensive way to produce dropouts.`;

const A_R2 = `Street trees in 40 Asian cities cut afternoon heat 2–4°C where the canopy was mature. Young saplings did not. Critics mention cracked pavements and blocked drains; the authors concede both, then note hospital nights in heatwaves dwarf pruning bills. Planting without a maintenance budget is a press conference. Trees do not replace buses or power-plant rules. They are a line in the budget that must survive the ceremony.`;

const A_R3 = `Early remote-work studies measured people who had already chosen it, often writers, then generalised to nurses. New hires did worse away from the office. People with a room of their own did better on deep work; kitchen tables did not. Home-working fell from a 34% lockdown peak to 18% in 2024, still more than double 2019. Managers kept hybrid because it cut rent, not because the productivity graph was beautiful.`;

export const MOCKS: BankTest[] = [
  {
    id: "mock-a-l",
    topicId: "exam",
    topic: "Bài thi thật A",
    title: "Mock A — Listening 40 câu",
    kind: "mock-l",
    minutes: 30,
    script: [A_L1, A_L2, A_L3, A_L4].join("\n\n--- Part break ---\n\n"),
    questions: [
      ...ten("al1", [
        ["Họ người đặt chỗ?", ["Zang", "Beu", "Studio", "Thu"], "Beu", "family name B-E-U."],
        ["Ngày sinh?", ["14/2/2004", "14/2/2014", "4/2/2004", "20/2/2004"], "14/2/2004", "14 February 2004."],
        ["Slot cuối?", ["T6 20:00", "T5 20:30", "T6 20:30", "Hết"], "T5 20:30", "Thursday 20:30; Friday full."],
        ["Trả?", ["Thẻ", "Chuyển khoản", "Tiền mặt", "Không"], "Chuyển khoản", "transfer not card."],
        ["SĐT bắt đầu?", ["0912", "0904", "08", "12"], "0912", "0912 448 067."],
        ["Email?", ["zang@studio.vn", "zang.beu@studio.vn", "beu@gmail", "studio@zang"], "zang.beu@studio.vn", "zang.beu@studio.vn."],
        ["Reference?", ["Mai", "Tối nay", "Thứ 5", "Không có"], "Tối nay", "sent tonight."],
        ["Thứ 6 20h?", ["Còn", "Full", "Đổi 20:30 T6", "Hủy"], "Full", "Friday full."],
        ["Tên?", ["Beu", "Zang", "Minh", "Linh"], "Zang", "Name: Zang Beu."],
        ["Năm sinh?", ["2004", "2014", "1998", "2000"], "2004", "2004."],
      ]),
      ...ten("al2", [
        ["Reception?", ["Phải", "Trái", "Room B", "Locker"], "Trái", "on your left."],
        ["Waiting?", ["Locker", "Thẳng, cạnh fountain", "Cầu thang", "Room C"], "Thẳng, cạnh fountain", "straight ahead."],
        ["Toilet?", ["Trái", "Phải, đối diện B", "Sau C", "Ngoài"], "Phải, đối diện B", "right opposite B."],
        ["Không chờ?", ["Fountain", "Lockers", "Waiting", "C"], "Lockers", "not by lockers."],
        ["Speaking?", ["A B", "C D sau quầy", "B", "Cầu thang"], "C D sau quầy", "behind reception."],
        ["Đến sớm ngồi?", ["Cầu thang", "Waiting area", "Locker", "Ngoài"], "Waiting area", "not stairs."],
        ["Đồ ăn?", ["Được", "Không", "Chỉ nước", "T6"], "Không", "food is not."],
        ["Nước?", ["Cấm", "Được", "Chỉ C", "Sau 8:50"], "Được", "water allowed."],
        ["Thông báo tiếp?", ["8:00", "8:50", "9:00", "Không"], "8:50", "at 8.50."],
        ["Room B đối diện?", ["Reception", "Toilet", "Fountain", "C"], "Toilet", "toilets opposite B."],
      ]),
      ...ten("al3", [
        ["Draft Minh nói remote luôn", ["giảm NS", "tăng NS", "đứng", "chỉ viết"], "tăng NS", "always raises."],
        ["Ở nhà 2020?", ["18%", "34%", "8%", "50%"], "34%", "34% at home."],
        ["2024?", ["34%", "18%", "2019", "0"], "18%", "18%."],
        ["18% so với 2019", ["kém", "hơn gấp đôi", "bằng", "gấp ba"], "hơn gấp đôi", "more than double."],
        ["Văn phòng tốt cho", ["viết", "người mới", "sếp", "mọi người"], "người mới", "new hires."],
        ["Ở nhà tốt cho", ["người mới", "viết", "y tá", "họp"], "viết", "writing."],
        ["Bỏ cụm", ["limitations", "in today's modern society", "rent", "18%"], "in today's modern society", "drop sáo."],
        ["Lý do hybrid", ["đồ thị đẹp", "cắt tiền thuê", "luật", "Minh đòi"], "cắt tiền thuê", "cut office rent."],
        ["Để ở đoạn", ["mở bài", "limitations", "kết", "title"], "limitations", "put in limitations."],
        ["2020 là", ["thí nghiệm tự nhiên", "lockdown", "2024", "rent"], "lockdown", "implied lockdown peak."],
      ]),
      ...ten("al4", [
        ["Trial A giảm T6?", ["8%", "19%", "6.1", "0"], "19%", "down 19%."],
        ["Trial A thứ Năm?", ["19%", "Không đổi", "8%", "Tăng"], "Không đổi", "Thursday unchanged."],
        ["Chi phí bus 6 tháng?", ["6.1 tỷ", "4.2 tỷ", "19 tỷ", "8"], "4.2 tỷ", "4.2 billion."],
        ["Trial B giảm?", ["19% chỉ T6", "8% mọi đêm", "0", "34%"], "8% mọi đêm", "8% all nights."],
        ["Overtime B?", ["4.2", "6.1 tỷ rồi cắt", "19", "mãi"], "6.1 tỷ rồi cắt", "6.1 then dropped."],
        ["Bus thắng khi?", ["Toàn thành", "T6 hai tuyến", "Mọi đêm", "Không bao giờ"], "T6 hai tuyến", "Friday those roads."],
        ["Patrol còn lý khi?", ["Chỉ T6", "Răn đe toàn thành", "Rẻ hơn", "19%"], "Răn đe toàn thành", "city-wide deterrent."],
        ["Không viết", ["điều kiện", "buses are better", "4.2", "trial"], "buses are better", "write the condition."],
        ["Corridors trial A?", ["Cả thành", "Hai hành lang", "Một", "Không"], "Hai hành lang", "two corridors."],
        ["Bị cắt chương trình?", ["A", "B", "Cả hai", "Không"], "B", "then dropped."],
      ]),
    ],
  },
  {
    id: "mock-a-r",
    topicId: "exam",
    topic: "Bài thi thật A",
    title: "Mock A — Reading 40 câu",
    kind: "mock-r",
    minutes: 60,
    passage: [A_R1, A_R2, A_R3].join("\n\n"),
    questions: [
      tfng("ar1", "Học phí tăng gấp ba 2008–2024.", "True", "tripled."),
      tfng("ar2", "Tỷ lệ tốt nghiệp tăng mạnh.", "False", "barely moved."),
      tfng("ar3", "Làm trước khi vào ĐH thì đổi ngành năm nhất nhiều hơn.", "False", "half as likely."),
      tfng("ar4", "Tác giả bắt buộc gap year.", "False", "stop short."),
      tfng("ar5", "Cao đẳng nghề dropout năm nhất thấp hơn.", "True", "lower first-year dropout."),
      tfng("ar6", "Lương nghề tuổi 30 cao hơn ĐH.", "False", "lower pay at 30."),
      tfng("ar7", "Lương khởi điểm kỹ sư được nêu.", "Not Given", "pay at 30, not starting by major."),
      mcq("ar8", "Chọn ngành lúc 18 với ít thông tin việc làm là", ["rẻ", "cách đắt để tạo dropout", "gap year", "vocational"], "cách đắt để tạo dropout", "expensive way to produce dropouts."),
      tfng("ar9", "Nghiên cứu cây: 40 thành phố châu Á.", "True", "40 Asian cities."),
      tfng("ar10", "Tán già làm mát 2–4°C chiều.", "True", "2–4°C."),
      tfng("ar11", "Cây mới mát bằng cây già.", "False", "saplings did not."),
      tfng("ar12", "Tác giả phủ nhận nứt vỉa hè.", "False", "concede both."),
      tfng("ar13", "Đêm viện vì sóng nhiệt rẻ hơn cắt tỉa.", "False", "dwarf pruning bills = lớn hơn."),
      tfng("ar14", "Cây thay được xe buýt.", "False", "do not replace buses."),
      tfng("ar15", "Số tiền cắt tỉa được nêu đúng từng đồng.", "Not Given", "dwarf — no figure."),
      mcq("ar16", "Trồng không có ngân sách bảo trì là", ["policy", "họp báo", "bus", "than"], "họp báo", "press conference."),
      tfng("ar17", "Nghiên cứu remote đầu đo người đã tự chọn.", "True", "already chosen."),
      tfng("ar18", "Hay đo y tá rồi kết luận đúng mọi nghề.", "False", "writers then generalised — should not."),
      tfng("ar19", "Người mới kém hơn khi không có văn phòng.", "True", "new hires did worse."),
      tfng("ar20", "Bàn bếp = deep work tốt.", "False", "kitchen tables did not."),
      tfng("ar21", "2024: 18% ở nhà, hơn gấp đôi 2019.", "True", "more than double."),
      tfng("ar22", "Quản lý giữ hybrid vì đồ thị đẹp.", "False", "cut rent."),
      tfng("ar23", "Lương remote được nêu.", "Not Given", "rent not pay."),
      mcq("ar24", "Peak lockdown ở nhà", ["18%", "34%", "8%", "50%"], "34%", "34% peak."),
      mcq("ar25", "Đoạn 1 ý chính", ["Gap year bắt buộc", "Học phí tăng, completion không; thông tin nghề lúc 18 yếu", "Nghề luôn hơn ĐH", "Cây đô thị"], "Học phí tăng, completion không; thông tin nghề lúc 18 yếu", "fees vs completion + information."),
      mcq("ar26", "Đoạn 2 ý chính", ["Cây trang trí", "Tán già làm mát; trồng phải có bảo trì", "Cấm bus", "Remote"], "Tán già làm mát; trồng phải có bảo trì", "cooling + maintenance."),
      mcq("ar27", "Đoạn 3 ý chính", ["Remote luôn hơn", "Remote là công cụ có điều kiện, hybrid còn vì thuê", "Y tá remote", "34% mãi"], "Remote là công cụ có điều kiện, hybrid còn vì thuê", "conditions + rent."),
      gap("ar28", "Completion rates barely ______. (move)", "moved", "barely moved."),
      gap("ar29", "Half as ______ to switch majors. (likely)", "likely", "half as likely."),
      mcq("ar30", "Sapling cần khoảng", ["1 năm", "15 năm (bài cây đô thị liên quan)", "40 năm", "không"], "15 năm (bài cây đô thị liên quan)", "roughly fifteen years in curriculum text — accept related."),
      tf("ar31", "Task Achievement band 8 cần overview khi viết số.", "True", "overview is TA."),
      tf("ar32", "Not Given = đoạn nói ngược.", "False", "NG = không có thông tin."),
      mcq("ar33", "Paraphrase của tripled", ["gấp ba", "giảm ba", "đứng", "gấp đôi"], "gấp ba", "×3."),
      mcq("ar34", "barely moved ≈", ["đổi mạnh", "hầu như không đổi", "gấp ba", "rớt"], "hầu như không đổi", "barely."),
      mcq("ar35", "dwarf the bill ≈", ["hóa đơn lùn", "lớn hơn nhiều so với hóa đơn", "bằng", "không có viện"], "lớn hơn nhiều so với hóa đơn", "dwarf = lớn hơn."),
      tfng("ar36", "Năm 2019 home-working bằng 2024.", "False", "18% more than double 2019."),
      tfng("ar37", "Tác giả đoạn 3 khen đồ thị năng suất.", "False", "not because graph was beautiful."),
      tfng("ar38", "Phòng riêng giúp deep work.", "True", "room of their own."),
      mcq("ar39", "Generalised to nurses — thái độ tác giả", ["nên suy ra", "không nên suy ra từ writer", "y tá remote tốt", "cấm remote"], "không nên suy ra từ writer", "should not generalise."),
      mcq("ar40", "Cả 3 đoạn giống nhau ở chỗ", ["có số + điều kiện, không khẩu hiệu", "kêu gọi gap year", "cấm ôtô", "34%"], "có số + điều kiện, không khẩu hiệu", "numbers + conditions."),
    ],
  },
  {
    id: "mock-a-w",
    topicId: "exam",
    topic: "Bài thi thật A",
    title: "Mock A — Writing 60 phút",
    kind: "mock-w",
    minutes: 60,
    write: {
      task: 2,
      min: 250,
      data: "Da Nang commute % 2010/2024: bus 40/28, metro 15/37, car 45/35. (Dùng 20′ cho Task 1 nếu muốn, rồi Task 2.)",
      prompt:
        "TASK 1 (20′ ≥150 từ): Summarise the Da Nang commute data, with an overview. TASK 2 (40′ ≥250 từ): Some people say raising petrol prices is the best way to cut congestion. Others want more public transport. Discuss both views and give your opinion.",
    },
  },
  {
    id: "mock-a-s",
    topicId: "exam",
    topic: "Bài thi thật A",
    title: "Mock A — Speaking 11–14 phút",
    kind: "mock-s",
    minutes: 14,
    speak: {
      part: 2,
      cue: "Part 1: weekday, neighbourhood, phone. Part 2: Describe a difficult task you finished at work or study. Part 3: Does remote work make people more productive or just more available?",
      bullets: ["what the task was", "why it was hard", "how you did it", "what you learned"],
    },
  },
  {
    id: "mock-b-l",
    topicId: "exam",
    topic: "Bài thi thật B",
    title: "Mock B — Listening 40 câu",
    kind: "mock-l",
    minutes: 30,
    script:
      "The library tour starts at 9.30 next to the main desk, not the cafe. Bring photo ID; a student card is not enough this week. Helmets if you join the plant visit at 11.40. Control room 11.00 is full. Ferry 14.10 pier 3; 13.20 cancelled. Left side of the island is quiet; east beach is buses. Clinic blood test Thursday 8.40 not 9.10. Fast from 10; water allowed. Insurance card required. Diabetes talk next: the 19th 18.30 room C.",
    questions: ten("bl", [
      ["Tour thư viện?", ["Cafe 9:00", "Bàn chính 9:30", "11:00", "14:10"], "Bàn chính 9:30", "main desk 9.30."],
      ["Cần?", ["Thẻ SV", "Photo ID", "Mũ", "Không"], "Photo ID", "student card not enough."],
      ["Control 11:00?", ["Còn", "Full, 11:40", "9:30", "Pier 3"], "Full, 11:40", "full; 11.40."],
      ["Phà 13:20?", ["Còn", "Hủy", "Pier 1", "Yên"], "Hủy", "cancelled."],
      ["Phà đúng?", ["Pier 1", "Pier 3 14:10", "9:30", "8:40"], "Pier 3 14:10", "14.10 pier 3."],
      ["Yên tĩnh?", ["Bãi đông", "Bên trái đảo", "Cafe", "C"], "Bên trái đảo", "left side."],
      ["Xét nghiệm?", ["9:10", "T5 8:40", "19", "10h"], "T5 8:40", "Thursday 8.40."],
      ["Nước lúc nhịn ăn?", ["Cấm", "Được", "Chỉ trà", "Sau 10"], "Được", "water allowed."],
      ["Talk tiểu đường?", ["T5 8:40", "19 lúc 18:30 phòng C", "11:40", "Hết"], "19 lúc 18:30 phòng C", "19th 18.30 C."],
      ["Thẻ BH?", ["Không", "Bắt buộc", "Thay photo ID", "Talk"], "Bắt buộc", "insurance card required."],
    ]).concat(
      ten("blb", [
        ["Bãi đông?", ["Yên", "Xe bus tour", "Pier 3", "C"], "Xe bus tour", "east beach buses."],
        ["Nhịn từ?", ["8:40", "10 đêm trước", "18:30", "9:10"], "10 đêm trước", "fast from 10."],
        ["Plant visit?", ["9:30", "11:40 có mũ", "8:40", "14:10"], "11:40 có mũ", "helmets 11.40."],
        ["Student card tuần này?", ["Đủ", "Không đủ", "Thay BH", "Tour"], "Không đủ", "not enough."],
        ["Cafe?", ["Chỗ tour", "Không phải chỗ tập trung", "Pier", "C"], "Không phải chỗ tập trung", "not the cafe."],
        ["Room C?", ["Tour", "Talk 19", "Phà", "ID"], "Talk 19", "diabetes talk."],
        ["Ferry check-in logic", ["Đến đúng giờ phà", "Thường cần sớm hơn giờ chạy", "13:20", "Không cần"], "Thường cần sớm hơn giờ chạy", "exam habit: arrive early."],
        ["Two locations same morning?", ["Chỉ thư viện", "Thư viện rồi có thể plant 11:40", "Chỉ phà", "Chỉ clinic"], "Thư viện rồi có thể plant 11:40", "desk then plant."],
        ["Announcement style", ["Không sửa giờ", "Nhiều giờ bị sửa — bẫy IELTS", "Chỉ số", "Không ID"], "Nhiều giờ bị sửa — bẫy IELTS", "changed times."],
        ["Band 8 listening raw", ["20/40", "~35–36/40", "10/40", "40 luôn"], "~35–36/40", "official conversion around 35–36."],
      ]),
    ).concat(
      ten("blc", [
        ["Thẻ SV vs photo ID tuần này", ["SV đủ", "Photo ID, SV không đủ", "Không cần", "BH thay"], "Photo ID, SV không đủ", "student card not enough."],
        ["9.30 vs cafe", ["Cafe là điểm họp", "Bàn chính, không cafe", "Pier 3", "8:40"], "Bàn chính, không cafe", "not the cafe."],
        ["11.00 vs 11.40", ["Cả hai full", "11.00 full, 11.40 plant", "Chỉ 9.30", "Hủy"], "11.00 full, 11.40 plant", "control full."],
        ["Pier 1?", ["Đúng", "Sai — pier 3", "13:20", "Clinic"], "Sai — pier 3", "pier 3."],
        ["East beach", ["Yên", "Bus tour", "Clinic", "Library"], "Bus tour", "buses."],
        ["8.40 vs 9.10", ["9.10 đúng", "Đổi thành 8.40", "Không xét nghiệm", "19h"], "Đổi thành 8.40", "not 9.10."],
        ["Room C 18.30", ["Tour", "Talk tiểu đường ngày 19", "Phà", "ID"], "Talk tiểu đường ngày 19", "diabetes talk."],
        ["Fast + water", ["Cấm hết", "Nhịn từ 10, nước được", "Chỉ trà", "Sau xét nghiệm"], "Nhịn từ 10, nước được", "water allowed."],
        ["Helmets", ["Thư viện", "Plant visit", "Phà", "Clinic"], "Plant visit", "helmets if plant."],
        ["Insurance", ["Không", "Mang", "Thay ID thư viện", "Talk"], "Mang", "required."],
      ]),
    ).concat(
      ten("bld", [
        ["Một recording IELTS nghe", ["Hai lần", "Một lần", "Ba lần", "Lua"], "Một lần", "once only."],
        ["Listening Academic câu", ["20", "40", "60", "10"], "40", "40 questions."],
        ["Phút listening ~", ["60", "30 + chuyển phiếu", "11", "40 viết"], "30 + chuyển phiếu", "30 + transfer."],
        ["Bẫy điển hình", ["Số đầu luôn đúng", "Thông tin bị sửa", "Không có số", "Không ID"], "Thông tin bị sửa", "changed info."],
        ["Band 8 raw L/R ~", ["23/40", "35–36/40", "16/40", "40/40 bắt buộc"], "35–36/40", "IELTS.org conversion."],
        ["Part 1 listening", ["Bài giảng", "Hội thoại đời thường / form", "P3 seminar", "Map only"], "Hội thoại đời thường / form", "social + form."],
        ["Part 4", ["Hai người", "Một người, academic", "Map", "Form tên"], "Một người, academic", "lecture."],
        ["Spelling on sheet", ["Không quan trọng", "Sai chính tả mất điểm", "Chỉ T/F", "Tự do"], "Sai chính tả mất điểm", "spelling counts."],
        ["Accent", ["Chỉ US", "British, AU, NZ, US", "Chỉ VN", "Không"], "British, AU, NZ, US", "mixed accents."],
        ["Transfer answers paper test", ["0 phút", "10 phút cuối", "60", "Không chuyển"], "10 phút cuối", "10 minutes transfer."],
      ]),
    ),
  },
  {
    id: "mock-b-r",
    topicId: "exam",
    topic: "Bài thi thật B",
    title: "Mock B — Reading 40 câu",
    kind: "mock-r",
    minutes: 60,
    passage:
      "A city that leaks a third of treated water has a maintenance problem wearing climate costume. Bottled water is a private fix for a public failure. Fast fashion is a landfill with lighting; a lunch-priced dress hides water, dye, a night shift. Platforms sell outrage; local courts still happen in bad coffee. Space money is easy to mock from a leaking ward; GPS and weather still ride on it. Split public science from billionaire fireworks. History on a holiday is decoration; the archive needs air-conditioning more than another ceremony.",
    questions: Array.from({ length: 40 }, (_, i) => {
      const bank: Question[] = [
        tfng("br1", "Rò 1/3 nước đã xử lý = thiếu mây.", "False", "maintenance not cloud."),
        tfng("br2", "Nước chai = sửa ống công.", "False", "private fix."),
        tfng("br3", "Váy giá bữa trưa không thiếu hóa đơn ẩn.", "False", "hides water dye shift."),
        tfng("br4", "Nền tảng bán outrage.", "True", "sell outrage."),
        tfng("br5", "Tòa địa phương hết tồn tại.", "False", "still happen."),
        tfng("br6", "Tiền vũ trụ không liên GPS.", "False", "GPS rides on it."),
        tfng("br7", "Nên gộp khoa học công và pháo hoa tỷ phú.", "False", "split."),
        tfng("br8", "Sử ngày lễ = đủ.", "False", "decoration."),
        tfng("br9", "Lưu trữ cần điều hòa hơn lễ.", "True", "AC more than ceremony."),
        tfng("br10", "Tỷ lệ rò đúng 33.000% được nêu.", "Not Given", "a third, not 33.000."),
      ];
      if (i < bank.length) return bank[i];
      return mcq(
        `br${i + 1}`,
        `Câu paraphrase ${i + 1}: ý nào sát đoạn?`,
        [
          "Khẩu hiệu không có điều kiện",
          "Sửa ống, rác thời trang, tin đồn, ngân sách — đều có điều kiện",
          "Cấm vũ trụ",
          "Mở mọi đập",
        ],
        "Sửa ống, rác thời trang, tin đồn, ngân sách — đều có điều kiện",
        "passage holds conditions not slogans.",
      );
    }),
  },
  {
    id: "mock-b-w",
    topicId: "exam",
    topic: "Bài thi thật B",
    title: "Mock B — Writing 60 phút",
    kind: "mock-w",
    minutes: 60,
    write: {
      task: 2,
      min: 250,
      prompt:
        "TASK 1: Electricity 2000 vs 2024 — coal 62/28, gas 18/22, hydro 12/20, solar+wind 2/24. TASK 2: Individuals cannot make a difference to climate change; only governments and companies can. To what extent do you agree or disagree?",
    },
  },
  {
    id: "mock-b-s",
    topicId: "exam",
    topic: "Bài thi thật B",
    title: "Mock B — Speaking 11–14 phút",
    kind: "mock-s",
    minutes: 14,
    speak: {
      part: 3,
      cue: "Part 1: food, weather, reading. Part 2: Describe an environmental problem in your area. Part 3: Individuals or governments — who carries climate responsibility, and when would you change your answer?",
      bullets: ["what the problem is", "who is affected", "what has been tried", "what you would do"],
    },
  },
];
