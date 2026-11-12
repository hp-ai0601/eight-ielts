import { gap, mcq, tf } from "@/lib/content/types";

export const GRAMMAR_MORE = [
  {
    id: "ps-pc",
    title: "Hiện tại đơn hay hiện tại tiếp diễn",
    band: "4–7",
    vnTrap: "Người Việt hay viết: I am go to school. / I living in Da Nang. / Every day I am eating rice.",
    rule: "Dùng thì hiện tại đơn cho thói quen, sự thật hiển nhiên và lịch trình cố định: I live in Da Nang (tôi sống ở Đà Nẵng), The lecture starts at 9 (buổi học bắt đầu lúc 9 giờ). Dùng thì hiện tại tiếp diễn cho việc đang xảy ra lúc nói hoặc kế hoạch đã sắp xếp: I'm staying with my aunt this week (tuần này tôi ở nhà dì). Một số động từ chỉ trạng thái thì hầu như không bao giờ chia tiếp diễn: know, believe, want, like, seem, belong — nói I know, không nói I am knowing.",
    steps: [
      "Gặp câu hỏi What do you do? (bạn làm nghề gì) → trả lời thì hiện tại đơn.",
      "Gặp câu hỏi What are you doing these days? (dạo này bạn đang làm gì) → trả lời thì hiện tại tiếp diễn.",
      "Tuyệt đối không viết: I am knowing, I am wanting — những động từ này chỉ dùng thì đơn.",
    ],
    questions: [
      mcq("g-ps1", "She ______ to campus by bus every day.", ["is going", "go", "goes", "going"], "goes", "Every day là thói quen nên dùng hiện tại đơn; ngôi thứ ba số ít (she) thì động từ thêm -es: goes."),
      tf("g-ps2", "I am knowing the answer. đúng.", "False", "Know là động từ chỉ trạng thái nên không chia tiếp diễn — phải viết I know the answer."),
    ],
  },
  {
    id: "pp-past",
    title: "Hiện tại hoàn thành hay quá khứ đơn",
    band: "5–8",
    vnTrap: "Người Việt hay viết: Last year I have went. / I have seen him yesterday. / I lived here since 2020.",
    rule: "Dùng quá khứ đơn khi việc đã kết thúc hẳn tại một mốc quá khứ xác định: yesterday, in 2019, when I was 10. Dùng hiện tại hoàn thành khi việc vẫn còn liên quan đến hiện tại, thường đi với since (từ), for (trong khoảng), already, yet, recently, ever, never. Nhớ công thức have/has + quá khứ phân từ: have gone, have written, have taken — tuyệt đối không dùng have went.",
    steps: [
      "Gạch chân mốc thời gian trong câu trước. Có yesterday hay in 2019 → dùng quá khứ đơn. Có since/for và việc vẫn còn tiếp diễn → dùng hiện tại hoàn thành.",
      "Khi giám khảo hỏi How long have you...? thì phải trả lời I have lived..., không trả lời I lived.",
    ],
    questions: [
      mcq("g-pp1", "I ______ this neighbourhood since 2018.", ["lived", "have lived", "was live", "am lived"], "have lived", "Có since 2018 và vẫn đang sống ở đây nên dùng hiện tại hoàn thành: have lived."),
      gap("g-pp2", "She has already ______ the essay. (write)", "written", "Sau has phải dùng quá khứ phân từ; write có dạng bất quy tắc là written."),
    ],
  },
  {
    id: "ppc",
    title: "Hiện tại hoàn thành tiếp diễn",
    band: "6.5–8",
    vnTrap: "Chỉ biết nói I have studied English for 3 years — thiếu cảm giác việc vẫn đang tiếp tục.",
    rule: "Công thức have/has been + V-ing diễn tả việc bắt đầu từ trước, kéo dài đến hiện tại và có thể vẫn đang tiếp tục: I have been waiting for an hour (tôi đã đợi một tiếng rồi — và vẫn đang đợi). Muốn nhấn kết quả đã xong thì dùng hiện tại hoàn thành thường: I have written 250 words. Động từ chỉ trạng thái không dùng được dạng này: không nói I have been knowing.",
    steps: [
      "Câu hỏi How long + việc còn đang diễn ra → dùng have been + V-ing.",
      "Trong Speaking Part 1, nói I've been living in Da Nang for ten years nghe tự nhiên và giàu thì hơn I live.",
    ],
    questions: [
      mcq("g-ppc1", "He ______ for the bus for twenty minutes.", ["waits", "has waited", "has been waiting", "is wait"], "has been waiting", "Việc đợi bắt đầu từ trước và kéo dài đến lúc nói nên dùng has been waiting."),
      tf("g-ppc2", "I have been knowing her since school. đúng.", "False", "Know là động từ chỉ trạng thái nên không chia tiếp diễn — phải nói I have known her since school."),
    ],
  },
  {
    id: "past-perf",
    title: "Quá khứ hoàn thành",
    band: "6–8",
    vnTrap: "Kể chuyện có hai mốc quá khứ mà câu nào cũng dùng V2, khiến người nghe không biết việc nào xảy ra trước.",
    rule: "Dùng had + quá khứ phân từ cho việc xảy ra TRƯỚC một mốc quá khứ khác: When I arrived, the class had started (khi tôi đến thì lớp đã vào học rồi). Trong Task 1 dạng bản đồ cũng rất hay dùng: A park had been replaced by a car park (công viên đã bị thay bằng bãi đỗ xe). Đừng lạm dụng — chỉ dùng khi cần làm rõ thứ tự trước sau.",
    steps: [
      "Có hai hành động quá khứ thì hỏi: việc nào xảy ra trước? Việc xảy ra trước dùng had + V3.",
      "Khi kể chuyện ở Speaking Part 2, câu Before that, I had never tried it giúp câu chuyện rõ thứ tự hơn hẳn.",
    ],
    questions: [
      mcq("g-pap1", "By the time the bus came, we ______ for an hour.", ["waited", "have waited", "had waited", "are waiting"], "had waited", "Việc chờ xảy ra trước lúc xe buýt đến (một mốc quá khứ) nên dùng quá khứ hoàn thành: had waited."),
      tf("g-pap2", "Mọi câu quá khứ đều phải dùng quá khứ hoàn thành.", "False", "Chỉ dùng khi cần nói rõ việc nào xảy ra trước việc nào; nếu không thì quá khứ đơn là đủ."),
    ],
  },
  {
    id: "future",
    title: "Tương lai — will, going to hay thì hiện tại",
    band: "5–8",
    vnTrap: "Người Việt hay viết: I will going. / If I will have time... / câu nào về tương lai cũng nhét will.",
    rule: "Dùng will cho quyết định ngay lúc nói và cho dự đoán: I think it will rain. Dùng be going to khi đã có ý định từ trước hoặc khi thấy dấu hiệu rõ ràng: Look at those clouds — it's going to rain. Dùng hiện tại tiếp diễn cho kế hoạch đã sắp xếp cụ thể: I'm taking the 7am train tomorrow. Dùng hiện tại đơn cho lịch trình cố định: The exam starts at 9. Sau if điều kiện loại 1 thì không dùng will — phải nói If I have time, không nói If I will have time.",
    steps: [
      "Khi bàn về tương lai của xã hội trong Speaking Part 3, dùng governments are likely to... hoặc may... nghe chín chắn hơn là chắc nịch will definitely.",
      "Lịch tàu xe, lịch thi đã cố định thì dùng hiện tại đơn: The train leaves at 7.",
    ],
    questions: [
      mcq("g-fu1", "Look at the sky — it ______ rain.", ["will", "is going to", "goes to", "going"], "is going to", "Nhìn thấy dấu hiệu ngay trước mắt (bầu trời) nên dùng be going to."),
      tf("g-fu2", "If I will have time, I will revise. đúng.", "False", "Sau if điều kiện loại 1 dùng thì hiện tại — phải viết If I have time, I will revise."),
    ],
  },
  {
    id: "modals",
    title: "Động từ khuyết thiếu — must, should, might, have to",
    band: "5–8",
    vnTrap: "Người Việt hay viết: must to go / should to study / can to swim / must have go.",
    rule: "Sau động từ khuyết thiếu luôn là động từ nguyên mẫu không to: must reduce, should study, can swim. Về nghĩa: have to là bắt buộc do hoàn cảnh bên ngoài (nội quy, luật), must là người nói tự thấy cần thiết, should là lời khuyên, might/may/could là không chắc chắn. Dạng hoàn thành: should have + V3 diễn tả tiếc nuối (You should have told me — đáng lẽ bạn phải nói với tôi), must have + V3 diễn tả suy luận về quá khứ (He must have forgotten — chắc là anh ấy quên rồi).",
    steps: [
      "Khi đưa lời khuyên trong Task 2, dùng Governments should... là vừa; lạm dụng must cho mọi câu nghe rất nặng nề.",
      "Trong Speaking, câu I might be wrong, but... giúp ý kiến nghe mềm mỏng và tự nhiên hơn.",
    ],
    questions: [
      mcq("g-md1", "Câu nào đúng?", ["must to cut", "must cut", "must cutting", "must to cutting"], "must cut", "Sau động từ khuyết thiếu dùng động từ nguyên mẫu, không có to và không thêm -ing."),
      gap("g-md2", "You should have ______ earlier. (start)", "started", "Should have + quá khứ phân từ: should have started (đáng lẽ phải bắt đầu sớm hơn)."),
    ],
  },
  {
    id: "gerund",
    title: "V-ing hay to-V",
    band: "6–8",
    vnTrap: "Người Việt hay viết: I suggest to go. / I want going. / I'm interested to learn. / I look forward to meet you.",
    rule: "Sau enjoy, avoid, consider, suggest, finish, mind thì dùng V-ing: I suggest going early. Sau want, decide, hope, refuse, promise thì dùng to-V: I decided to leave. Hai cặp dễ nhầm: stop smoking nghĩa là bỏ hút thuốc, còn stop to smoke nghĩa là dừng lại để hút thuốc. Trong look forward to thì to là giới từ nên phải dùng V-ing: I look forward to meeting you. Tương tự interested in + V-ing. Sau make và let thì dùng động từ nguyên mẫu không to: She made me rewrite it.",
    steps: [
      "Học từng cụm động từ + dạng theo sau như một khối, đừng dịch to thành chữ để rồi nhét to vào mọi chỗ.",
      "Cụm hay dùng trong Task 2: prevent people from driving (ngăn người dân lái xe).",
    ],
    questions: [
      mcq("g-ge1", "She suggested ______ the overview first.", ["to write", "writing", "write", "wrote"], "writing", "Sau suggest luôn dùng V-ing: suggested writing."),
      tf("g-ge2", "I look forward to meet you. đúng.", "False", "Trong look forward to thì to là giới từ nên phải dùng V-ing: I look forward to meeting you."),
    ],
  },
  {
    id: "reported",
    title: "Câu tường thuật",
    band: "6–8",
    vnTrap: "Người Việt hay viết: He said me that... / He told that he was late. / She asked did I live here.",
    rule: "Tell luôn cần người nghe: She told me that... Còn say không cần: She said that... (không nói She said me that). Khi tường thuật câu hỏi, không đảo ngữ nữa: She asked where I lived, không phải She asked where did I live. Khi động từ tường thuật ở quá khứ thì thì trong câu lùi lại một bậc: 'I live here' → He said he lived there. Tường thuật lời khuyên: She advised me to rest.",
    steps: [
      "Trong bài nghe, người nói hay tự sửa mình — hãy tường thuật ý CUỐI CÙNG, không phải ý đầu tiên.",
      "Không bao giờ viết: He said me to go.",
    ],
    questions: [
      mcq("g-rp1", "She asked me ______ I had finished.", ["did", "whether", "that did", "if did"], "whether", "Tường thuật câu hỏi có/không thì dùng whether hoặc if, và không đảo ngữ: whether I had finished."),
      tf("g-rp2", "He told that he was late. đúng.", "False", "Tell bắt buộc phải có người nghe: He told me that he was late."),
    ],
  },
  {
    id: "preps",
    title: "Giới từ — in, on, at và giới từ theo sau động từ",
    band: "5–8",
    vnTrap: "Người Việt hay viết: in Monday / discuss about the problem / depend of / interested on.",
    rule: "Về thời gian: at + giờ (at 9am), on + ngày (on Monday), in + tháng/năm/buổi (in 2019, in the morning). Về động từ đi kèm giới từ cố định: depend on, interested in, good at, consist of, responsible for. Riêng discuss là ngoại động từ nên không cần about: We discussed the problem. Trong Task 1 nhớ các cụm: from 2010 to 2020, between A and B, increase by 20% (tăng 20%), an increase of 20% (mức tăng là 20%).",
    steps: [
      "Học động từ cùng giới từ của nó như một cụm không tách rời: depend ON, interested IN, good AT.",
      "Phân biệt kỹ trong Task 1: rose by 20% nói về độ lớn thay đổi, còn a rise of 20% nói về mức tăng.",
    ],
    questions: [
      mcq("g-pr1", "The figure rose ______ 12%.", ["of", "by", "with", "at"], "by", "Rise by + con số: tăng bao nhiêu; rose by 12% nghĩa là tăng thêm 12%."),
      tf("g-pr2", "We discussed about the graph. đúng.", "False", "Discuss là ngoại động từ nên đi thẳng với tân ngữ: We discussed the graph."),
    ],
  },
  {
    id: "participle",
    title: "Mệnh đề phân từ",
    band: "7–8",
    vnTrap: "Lỗi chủ ngữ treo: Walking down the street, the rain started. (nghe như cơn mưa đang đi bộ).",
    rule: "Dùng V-ing hoặc V3 đứng đầu câu để rút gọn khi hai vế cùng chủ ngữ: Built in 2012, the plant employs 400 people (được xây năm 2012, nhà máy có 400 công nhân). Dùng Having + V3 khi việc xảy ra trước: Having finished the report, I went home. Điều kiện bắt buộc: chủ ngữ của câu chính phải chính là người/vật thực hiện hành động ở phân từ. Trong Task 1 dạng bản đồ rất hữu ích: Located in the north, the park was replaced by a mall.",
    steps: [
      "Viết hai câu đơn cùng chủ ngữ trước, rồi mới rút gọn thành một câu phân từ.",
      "Đọc lại và tự hỏi: ai đang walking? Nếu chủ ngữ câu chính không phải người đó thì câu sai.",
    ],
    questions: [
      mcq("g-pt1", "Câu nào đúng?", ["Walking home, the rain started.", "Walking home, I got wet.", "Walking home, it rained me.", "Walking home, rain was."], "Walking home, I got wet.", "Chủ ngữ câu chính là I — chính tôi là người đang đi bộ về nhà, nên câu không bị treo."),
      tf("g-pt2", "Having finished the overview, the numbers were added. đúng.", "False", "Numbers (các con số) không thể tự viết overview — chủ ngữ bị treo, phải sửa thành Having finished the overview, I added the numbers."),
    ],
  },
  {
    id: "inversion",
    title: "Đảo ngữ cho band cao",
    band: "7.5–8",
    vnTrap: "Nhồi Not only vào bốn năm câu một bài, hoặc đảo sai trợ động từ.",
    rule: "Sau Not only, Rarely, Seldom, Under no circumstances thì phải đảo trợ động từ lên trước chủ ngữ: Not only did air quality fall, but clinics also filled. Câu điều kiện cũng có thể đảo: Were governments to tax parking, fewer cars would enter (nếu chính quyền đánh thuế đỗ xe...). Một bài viết chỉ cần một, nhiều nhất hai chỗ đảo ngữ là đủ ấn tượng.",
    steps: [
      "Mẫu an toàn nhất: Not only does X..., but it also...",
      "Nếu chưa chắc cách đảo trợ động từ thì đừng đảo — một câu phức viết đúng vẫn tốt hơn một câu đảo viết sai.",
    ],
    questions: [
      mcq("g-inv1", "Not only ______ air quality fall, but clinics filled.", ["the", "did", "does the", "did the"], "did the", "Câu ở quá khứ nên đảo did lên trước chủ ngữ: Not only did air quality fall..."),
      tf("g-inv2", "Càng dùng nhiều đảo ngữ càng được band cao.", "False", "Một câu đảo đúng có giá trị hơn năm câu đảo sai; giám khảo chấm độ chính xác, không đếm số lần đảo."),
    ],
  },
  {
    id: "nominal",
    title: "Biến động từ thành danh từ (văn học thuật)",
    band: "7–8",
    vnTrap: "Viết People are destroying forests a lot nghe rất yếu — văn học thuật sẽ là The destruction of forests...",
    rule: "Đưa động từ thành danh từ giúp câu nghe trang trọng: reduce → a reduction in, pollute → pollution, they decided → their decision to. Trong Task 1: a sharp increase in car use (sự gia tăng mạnh trong việc dùng ô tô). Nhưng đừng biến câu nào cũng thành danh từ — câu vẫn phải đọc được tự nhiên.",
    steps: [
      "Mẫu overview cho Task 1: There was a rise in X, while Y fell.",
      "Tránh lặp people liên tục — thay bằng commuters (người đi làm), households (các hộ gia đình), first-year students (sinh viên năm nhất).",
    ],
    questions: [
      mcq("g-no1", "Câu nào nghe học thuật nhất?", ["People cut trees a lot.", "There was a significant reduction in forest cover.", "They reduced.", "Cutting is happening."], "There was a significant reduction in forest cover.", "Câu dùng danh từ hóa (a significant reduction) nên nghe trang trọng và rõ ràng hơn hẳn."),
      tf("g-no2", "Biến mọi câu thành danh từ sẽ được band 8.", "False", "Lạm dụng danh từ hóa làm bài khó đọc; chỉ dùng ở những chỗ thật sự cần trang trọng."),
    ],
  },
  {
    id: "quant",
    title: "Lượng từ — few, little, each, a number of",
    band: "5–8",
    vnTrap: "Người Việt hay viết: few informations / less people / a number of student is.",
    rule: "Few và a few đi với danh từ đếm được; little và a little đi với danh từ không đếm được. Nói fewer people chứ không nói less people; nói less traffic vì traffic không đếm được. Each và every đi với động từ số ít: Each student has a book. Phân biệt kỹ: a number of + danh từ số nhiều + động từ số nhiều (A number of students are late), còn the number of + động từ số ít (The number of students is rising). Nói most people, không nói most of people.",
    steps: [
      "Trong Task 1 dùng các cụm: a smaller proportion of, the majority of.",
      "Không bao giờ viết: less students, few information.",
    ],
    questions: [
      mcq("g-qu1", "______ students were late.", ["A number of", "The number of", "Little", "Each"], "A number of", "Động từ were là số nhiều nên chọn a number of (nhiều học sinh); the number of sẽ cần động từ số ít."),
      tf("g-qu2", "Less cars entered the city. là câu đúng chuẩn học thuật.", "False", "Cars đếm được nên phải dùng fewer cars; less chỉ dùng cho danh từ không đếm được."),
    ],
  },
  {
    id: "ref",
    title: "Từ tham chiếu — this, which, the former",
    band: "6.5–8",
    vnTrap: "Viết This is good. rồi lặp this tám lần mà người đọc không biết this là cái gì.",
    rule: "This/these phải chỉ rõ một danh từ hoặc một ý vừa nêu. Cách an toàn là thêm danh từ sau this: this delay, this trend. Which sau dấu phẩy tham chiếu cả mệnh đề đứng trước: Prices rose sharply, which worried many families. Khi vừa nhắc hai thứ thì dùng the former (thứ nhất) và the latter (thứ hai). Trong tiêu chí Coherence & Cohesion, this mơ hồ sẽ bị trừ điểm.",
    steps: [
      "Thay this trơ trụi bằng this + danh từ: this delay, this trend, this problem.",
      "Đọc lại đoạn văn và tự hỏi: một người ngoài đọc có biết this chỉ cái gì không?",
    ],
    questions: [
      mcq("g-rf1", "Cars fell. Buses rose. ______ is healthier for streets.", ["This", "The latter", "It cars", "Them"], "The latter", "Vừa nhắc hai thứ (cars và buses) nên the latter chỉ thứ hai — tức buses; viết This thì người đọc không biết ý nào."),
      tf("g-rf2", "Dùng this không cần danh từ cũng được, miễn 'mọi người tự hiểu'.", "False", "Giám khảo không đoán giùm — this mơ hồ là lỗi mạch lạc và sẽ bị trừ điểm."),
    ],
  },
  {
    id: "comma",
    title: "Dấu câu — lỗi nối câu bằng dấu phẩy và câu khuyết",
    band: "5–7",
    vnTrap: "Viết Cities grow, pollution rises. — hai câu độc lập mà chỉ nối bằng một dấu phẩy.",
    rule: "Hai mệnh đề độc lập muốn đứng cạnh nhau thì phải dùng dấu chấm, dấu chấm phẩy, hoặc dấu phẩy kèm liên từ (and, but, so): Cities grow; pollution rises. hoặc Cities grow, and pollution rises. Lỗi ngược lại là câu khuyết: Because traffic is heavy. — viết một mình như vậy là thiếu mệnh đề chính. Trong bài thi viết không được dùng gạch đầu dòng.",
    steps: [
      "Đọc to bài viết: chỗ nào hết hẳn một ý thì dùng dấu chấm.",
      "Nhớ công thức Although X, Y — chỉ một dấu phẩy ở giữa, tuyệt đối không thêm but.",
    ],
    questions: [
      mcq("g-cm1", "Câu nào đúng?", ["Cities grow, pollution rises.", "Cities grow; pollution rises.", "Cities grow pollution rises.", "Because cities grow."], "Cities grow; pollution rises.", "Hai mệnh đề độc lập phải nối bằng dấu chấm phẩy (hoặc dấu chấm) — chỉ dùng dấu phẩy là sai."),
      tf("g-cm2", "Although it is costly, but it works. đúng.", "False", "Although không bao giờ đi với but — chọn một trong hai: Although it is costly, it works."),
    ],
  },
];
