/** Thành ngữ & châm ngôn Anh–Việt, dịch hoa mĩ, kèm ví dụ tự viết. */
export type Idiom = { en: string; vi: string; note: string; topic: string; ex: string };

export const IDIOM_TOPICS = [
  { id: "life", vi: "Đời sống" },
  { id: "money", vi: "Tiền bạc & kinh doanh" },
  { id: "study", vi: "Học tập & tri thức" },
  { id: "mind", vi: "Tu tâm & nghị lực" },
  { id: "people", vi: "Con người & tình bạn" },
] as const;

const I = (en: string, vi: string, note: string, topic: string, ex: string): Idiom => ({ en, vi, note, topic, ex });

export const IDIOMS: Idiom[] = [
  // Đời sống
  I("Actions speak louder than words", "Hành động có tiếng nói hơn lời nói", "Nói hay không bằng làm thật.", "life", "He promised to help, but actions speak louder than words."),
  I("Better late than never", "Thà muộn còn hơn không", "Làm chậm vẫn hơn bỏ cuộc.", "life", "She started learning English at 40 — better late than never."),
  I("Every cloud has a silver lining", "Trong cái rủi có cái may", "Sau cơn mưa trời lại sáng.", "life", "Losing that job was hard, but every cloud has a silver lining."),
  I("When in Rome, do as the Romans do", "Nhập gia tuỳ tục", "Đến đất khách, theo phép nhà.", "life", "When in Rome, do as the Romans do — try the local food!"),
  I("The early bird catches the worm", "Chim dậy sớm mới bắt được sâu", "Ai siêng năng sớm giờ sẽ được phần trước.", "life", "The early bird catches the worm, so I review vocab at 6 a.m."),
  I("Don't judge a book by its cover", "Đừng đánh giá cuốn sách qua bìa ngoài", "Tốt xấu không nằm ở vẻ bề ngoài.", "life", "He looks quiet, but don't judge a book by its cover."),
  I("Time flies", "Thời gian thấm thoắt thoi đưa", "Năm tháng trôi nhanh như gió.", "life", "Time flies — Zang is already in grade five."),
  I("Practice makes perfect", "Có công mài sắt, có ngày nên kim", "Luyện tập đi đôi với hoàn hảo.", "life", "Keep speaking every day; practice makes perfect."),
  I("No pain, no gain", "Không gian nan, không thành tựu", "Muốn hái quả ngọt phải đổ mồ hôi.", "life", "The dictation was hard, but no pain, no gain."),
  I("A blessing in disguise", "Hoạ hoá ra lại là phúc", "Điều tưởng xấu đôi khi là điều tốt đội lốt.", "life", "Missing the bus was a blessing in disguise — I met an old friend."),
  I("Once in a blue moon", "Ngàn năm có một", "Hiếm hoi như trăng xanh.", "life", "Zang eats candy only once in a blue moon."),
  I("The best of both worlds", "Được cả đôi đường", "Hưởng trọn vẹn cả hai điều tốt.", "life", "Studying songs gives you the best of both worlds: fun and English."),
  I("Hit the nail on the head", "Nói trúng tim đen", "Nhận xét chính xác đến từng ly.", "life", "You hit the nail on the head — that was exactly my mistake."),
  I("A picture is worth a thousand words", "Một hình ảnh đáng giá ngàn lời", "Nhìn một lần hơn nghe trăm lần.", "life", "Show me the chart; a picture is worth a thousand words."),
  I("Rome wasn't built in a day", "Thành Rome không xây trong một ngày", "Việc lớn cần ngày tháng bền bỉ.", "life", "Your writing is improving — Rome wasn't built in a day."),
  // Tiền bạc & kinh doanh
  I("Time is money", "Thời gian là vàng bạc", "Bỏ phí giờ giấc là bỏ phí tiền của.", "money", "In business, time is money, so plan your week."),
  I("Money doesn't grow on trees", "Tiền đâu có mọc trên cây", "Đồng tiền phải đổi bằng công sức.", "money", "Money doesn't grow on trees — save your allowance."),
  I("A penny saved is a penny earned", "Tiết kiệm một xu cũng là kiếm được một xu", "Giữ được bao nhiêu, lời bấy nhiêu.", "money", "Skip the snack; a penny saved is a penny earned."),
  I("Don't put all your eggs in one basket", "Đừng bỏ hết trứng vào một giỏ", "Chia nhỏ rủi ro, đừng dồn một chỗ.", "money", "Invest in many skills; don't put all your eggs in one basket."),
  I("The customer is always right", "Khách hàng là thượng đế", "Phục vụ người mua trước hết bằng sự lắng nghe.", "money", "Smile and listen — the customer is always right."),
  I("You get what you pay for", "Tiền nào của nấy", "Rẻ quá thường đi kèm chất lượng kém.", "money", "The cheap pen broke in a day; you get what you pay for."),
  I("Cut your coat according to your cloth", "Liệu cơm gắp mắm", "Chi tiêu theo túi tiền mình có.", "money", "Cut your coat according to your cloth and avoid debt."),
  I("Easy come, easy go", "Được dễ thì mất cũng nhanh", "Của trời cho khó bền lâu.", "money", "He won the prize but spent it all — easy come, easy go."),
  I("Put your money where your mouth is", "Đã nói thì phải làm bằng tiền thật", "Khẳng định bằng hành động, không bằng lời.", "money", "If you believe in the idea, put your money where your mouth is."),
  I("Save for a rainy day", "Để dành phòng lúc hoạn nạn", "Ngày nắng nhớ giữ lúc mưa.", "money", "She saves a little each month for a rainy day."),
  I("Break even", "Hoà vốn", "Thu đủ bù chi, không lời cũng không lỗ.", "money", "The coffee stall finally broke even after three months."),
  I("Start from scratch", "Bắt đầu từ hai bàn tay trắng", "Dựng nghiệp từ con số không.", "money", "The shop started from scratch and grew step by step."),
  // Học tập & tri thức
  I("Knowledge is power", "Tri thức là sức mạnh", "Hiểu biết mở ra mọi cánh cửa.", "study", "Read every day — knowledge is power."),
  I("Learn the ropes", "Nắm được bí quyết nghề nghiệp", "Học được cách làm cơ bản của một việc.", "study", "It took a month to learn the ropes of the new job."),
  I("Hit the books", "Cắm mặt vào sách", "Học hành chăm chỉ, tập trung.", "study", "Exam week is here — time to hit the books."),
  I("Learn something by heart", "Học thuộc lòng", "Khắc vào trí nhớ, không cần nhìn.", "study", "Zang learned the poem by heart."),
  I("Think outside the box", "Nghĩ vượt ra ngoài khuôn khổ", "Đổi góc nhìn để thấy lối mới.", "study", "For the story task, think outside the box."),
  I("Burn the midnight oil", "Thức khuya cày sách", "Dật dìu ngọn đèn đêm để học.", "study", "She burned the midnight oil before the IELTS test."),
  I("Pass with flying colours", "Đỗ rực rỡ cờ hoa", "Vượt qua bài thi với điểm cao.", "study", "He passed the speaking test with flying colours."),
  I("You can't teach an old dog new tricks", "Cây già khó uốn", "Người lớn tuổi khó đổi thói quen — nhưng không phải không thể.", "study", "Grandpa says you can't teach an old dog new tricks, yet he still tries."),
  I("A little learning is a dangerous thing", "Biết lơ tơ mơ còn nguy hơn không biết", "Hiểu nửa vời dễ sinh tự tin mù quáng.", "study", "Check the full rule; a little learning is a dangerous thing."),
  I("Live and learn", "Sống là học, học đến hơi thở cuối", "Mỗi ngày là một bài học mới.", "study", "I forgot the past tense again — well, live and learn."),
  I("Two heads are better than one", "Một cây làm chẳng nên non", "Hai cái đầu suy nghĩ hơn một.", "study", "Let's plan the essay together; two heads are better than one."),
  // Tu tâm & nghị lực
  I("Where there is a will, there is a way", "Ở đâu có ý chí, ở đó có con đường", "Chí hướng mạnh mẽ mở lối đi.", "mind", "Where there is a will, there is a way — keep practising."),
  I("Fall seven times, stand up eight", "Ngã bảy lần, đứng dậy tám lần", "Thất bại không đáng sợ, bỏ cuộc mới đáng sợ.", "mind", "The band score fell, but fall seven times, stand up eight."),
  I("Patience is a virtue", "Nhẫn nại là đức tính quý", "Chậm mà chắc thắng hơn nóng mà hỏng.", "mind", "Grammar takes time; patience is a virtue."),
  I("Honesty is the best policy", "Thật thà là sách lược tốt nhất", "Ngay thẳng đi đường dài nhất.", "mind", "Tell the teacher the truth; honesty is the best policy."),
  I("Silence is golden", "Im lặng là vàng", "Đôi lúc không nói mới là câu trả lời.", "mind", "In the library, silence is golden."),
  I("Don't count your chickens before they hatch", "Đừng vẽ rắn thêm chân, đừng đếm gà khi trứng chưa nở", "Chưa chắc thì đừng mừng trước.", "mind", "Wait for the result; don't count your chickens before they hatch."),
  I("If you want peace, prepare for war", "Muốn hoà bình, hãy chuẩn bị cho chiến tranh", "Sẵn sàng kỹ lưỡng mới giữ được bình yên.", "mind", "Mock tests every week — if you want peace, prepare for war."),
  I("The calm before the storm", "Sự yên lặng trước cơn bão", "Tĩnh lặng bất thường báo hiệu biến lớn.", "mind", "The quiet classroom was the calm before the storm of exams."),
  I("Keep your chin up", "Ngẩng cao đầu bước tiếp", "Đừng gục ngã trước khó khăn.", "mind", "You missed one question; keep your chin up."),
  I("Let bygones be bygones", "Chuyện qua rồi hãy để trôi", "Tha thứ quá khứ để sống hiện tại.", "mind", "They argued last year, but now let bygones be bygones."),
  // Con người & tình bạn
  I("A friend in need is a friend indeed", "Hoạn nạn mới biết bạn hiền", "Lúc khó khăn mới thấy tình nghĩa thật.", "people", "Linh shared her lunch; a friend in need is a friend indeed."),
  I("Birds of a feather flock together", "Ngưu tầm ngưu, mã tầm mã", "Người cùng chí hướng thường tụ về một bầy.", "people", "The two book lovers sit together — birds of a feather flock together."),
  I("It takes two to tango", "Lửa gần rơm lâu ngày cũng bén", "Một cuộc cãi vã không bao giờ chỉ do một phía.", "people", "They both shouted; it takes two to tango."),
  I("Give someone the benefit of the doubt", "Cho người ta niềm tin khi chưa rõ trắng đen", "Nghi ngờ thì hãy nghi về phía tốt.", "people", "He was late once; give him the benefit of the doubt."),
  I("See eye to eye", "Nhìn cùng một hướng", "Đồng quan điểm, đồng lòng.", "people", "Zang and Khoa don't always see eye to eye about games."),
  I("Speak of the devil", "Nhắc Tào Tháo, Tào Tháo tới", "Vừa nhắc người nào, người ấy xuất hiện.", "people", "Speak of the devil — here comes the teacher!"),
  I("The apple doesn't fall far from the tree", "Con nhà tông không giống lông cũng giống cánh", "Con cái thường giống cha mẹ.", "people", "He loves books like his mother; the apple doesn't fall far from the tree."),
  I("Make a long story short", "Nói gọn lại", "Tóm tắt cho nhanh gọn.", "people", "To make a long story short, we won the game."),
];

export function idiomSearch(q: string): Idiom[] {
  const s = q.trim().toLowerCase();
  if (!s) return IDIOMS;
  return IDIOMS.filter((x) => x.en.toLowerCase().includes(s) || x.vi.toLowerCase().includes(s));
}
