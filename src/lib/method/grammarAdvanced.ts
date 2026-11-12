import { gap, mcq, tf } from "@/lib/content/types";

export const GRAMMAR_ADVANCED = [
  {
    id: "zero-article",
    title: "Khi nào KHÔNG dùng mạo từ",
    band: "6–8",
    vnTrap: "Người Việt hay bỏ the ở mọi danh từ nói chung, nhưng lại nhét a/an vào danh từ không đếm được.",
    rule: "Không dùng mạo từ trong các trường hợp: danh từ không đếm được khi nói chung chung (information, advice, money, water), danh từ số nhiều nói chung (Students need sleep), tên bữa ăn (have lunch), phương tiện sau by (by bus), ngôn ngữ (in English), tên riêng. Dùng the khi người nghe biết rõ đang nói vật nào, với vật duy nhất (the sun) và một số tên địa lý (the US, the north of England).",
    steps: [
      "Tự hỏi: danh từ này đang nói chung chung hay nói một cái cụ thể?",
      "Trong Task 2, các từ education, health, transport khi nói chung thường không cần mạo từ.",
      "Không viết: the society, the nature, the traffic — trừ khi đã cụ thể hóa, ví dụ the traffic in big cities.",
    ],
    questions: [
      mcq("g-za1", "Câu nào đúng?", ["The nature is beautiful.", "Nature is beautiful.", "A nature is beautiful.", "The natures are beautiful."], "Nature is beautiful.", "Nature ở đây nói về thiên nhiên nói chung nên không dùng mạo từ."),
      mcq("g-za2", "He goes to work by ______.", ["the bus", "a bus", "bus", "buses"], "bus", "Sau by, phương tiện đi lại không dùng mạo từ: by bus, by train, by car."),
      tf("g-za3", "The students need the sleep. đúng.", "False", "Cả students lẫn sleep đều nói chung chung nên bỏ hết mạo từ: Students need sleep."),
    ],
  },
  {
    id: "cleft",
    title: "Câu chẻ — cách nhấn mạnh cho band cao",
    band: "7–8",
    vnTrap: "Nhồi cấu trúc It is ... that vào mọi câu, hoặc nhấn sai thành phần.",
    rule: "Câu chẻ dùng It is/was + thành phần muốn nhấn + that/who: It is the government that should act (chính là chính quyền phải hành động). Một dạng khác dùng What: What I like most is the convenience (điều tôi thích nhất là sự tiện lợi). Trong Speaking Part 3, mở đầu bằng What worries me is that... rất ấn tượng. Một bài Task 2 chỉ nên dùng một đến hai lần.",
    steps: [
      "Chọn rõ thành phần muốn nhấn: chủ ngữ, tân ngữ hay trạng ngữ.",
      "Mẫu với What: What + mệnh đề + is + danh từ — What surprised me was the speed.",
      "Đừng dùng câu chẻ cho mọi câu — càng ít càng quý.",
    ],
    questions: [
      mcq("g-cl1", "Nhấn mạnh chủ ngữ: ______ the policy that reduced emissions.", ["It is", "There is", "This is", "That is"], "It is", "Câu chẻ luôn bắt đầu bằng It is/was: It is the policy that reduced emissions."),
      gap("g-cl2", "What I liked most ______ the clean streets. (is/are)", "is", "Cụm What I liked most được xem như số ít nên dùng is."),
      tf("g-cl3", "It was in 2010 when sales peaked. đúng.", "False", "Câu chẻ dùng that chứ không dùng when: It was in 2010 that sales peaked."),
    ],
  },
  {
    id: "ellipsis",
    title: "Lược bớt và thay thế để khỏi lặp câu",
    band: "7–8",
    vnTrap: "Lặp nguyên cả cụm: I like it and he likes it too. / I don't like it and he doesn't like it either.",
    rule: "Thay vì lặp lại, tiếng Anh dùng các mẫu gọn: So do I / Neither do I (tôi cũng vậy / tôi cũng không), I think so (tôi nghĩ vậy), I hope so. Dùng one/ones thay danh từ đã nêu: I prefer the blue one. Dùng do/does/did thay động từ đã nêu: I went and he did too. Trong hội thoại tự nhiên: Do you? / I suppose so.",
    steps: [
      "Mỗi khi thấy mình sắp lặp lại y nguyên một cụm, dừng lại và dùng so, neither, do hoặc one.",
      "Hai mẫu hay dùng nhất: I prefer the blue one. — I went and he did too.",
    ],
    questions: [
      mcq("g-el1", "Câu nào gọn và đúng?", ["I like coffee and he likes coffee too.", "I like coffee and so does he.", "I like coffee and he likes too.", "I like coffee and so he does."], "I like coffee and so does he.", "Mẫu đồng tình khẳng định: so + trợ động từ + chủ ngữ — so does he."),
      mcq("g-el2", "I don't drive and ______.", ["neither does he", "so does he", "he does too", "he doesn't too"], "neither does he", "Câu đồng tình phủ định dùng neither + trợ động từ + chủ ngữ: neither does he."),
      tf("g-el3", "'Are they coming?' 'I hope so.' đúng.", "True", "I hope so đúng ngữ pháp và tự nhiên — nghĩa là tôi hy vọng họ sẽ đến, không cần lặp lại cả câu."),
    ],
  },
  {
    id: "discourse",
    title: "Từ nối đoạn — giữ mạch văn mạch lạc",
    band: "6–8",
    vnTrap: "Câu nào cũng bắt đầu bằng However, Moreover, In addition — hoặc ngược lại, không có một từ nối nào.",
    rule: "Thêm ý: in addition, furthermore, also, besides. Đối lập: however, nevertheless, on the other hand, whereas. Kết quả: therefore, consequently, as a result. Ví dụ: for example, for instance, such as. Thứ tự: first, then, after that, finally. Nguyên tắc quan trọng: đừng nhồi từ nối vào đầu mọi câu — mỗi đoạn chỉ cần hai ba từ nối, thuộc các loại khác nhau.",
    steps: [
      "Kiểm tra lại đoạn văn: nếu ba câu liên tiếp cùng mở đầu bằng từ nối thì xóa bớt.",
      "Ngoài từ nối, hãy dùng this và which để gắn các câu với nhau — cách này tự nhiên hơn.",
    ],
    questions: [
      mcq("g-dm1", "Nối ý kết quả: Rain was heavy. ______, the match was cancelled.", ["However", "Therefore", "Moreover", "For example"], "Therefore", "Trận đấu bị hủy là kết quả của mưa to nên dùng therefore (vì vậy)."),
      mcq("g-dm2", "Many cities face congestion, ______ London.", ["therefore", "however", "such as", "consequently"], "such as", "London là một ví dụ cho các thành phố tắc nghẽn nên dùng such as (chẳng hạn như)."),
      tf("g-dm3", "Mỗi câu nên bắt đầu bằng However hoặc Moreover.", "False", "Nhồi từ nối vào đầu mọi câu làm bài mất tự nhiên — giám khảo nhìn ra ngay."),
    ],
  },
  {
    id: "phrasal",
    title: "Cụm động từ — khi nào tách, khi nào không",
    band: "6–8",
    vnTrap: "Tách sai: turn the complicated plan off. / Đặt sai đại từ: look up it (đúng là look it up).",
    rule: "Cụm động từ tách được (turn off, pick up, put off): nếu tân ngữ là đại từ thì BẮT BUỘC đặt ở giữa — turn it off, không bao giờ nói turn off it. Nếu tân ngữ là danh từ thì đặt giữa hay sau đều được: turn off the lights = turn the lights off. Cụm không tách được (look after, run into, come across): tân ngữ luôn đứng sau — look after the baby. Cụm ba từ: keep up with, look forward to, put up with.",
    steps: [
      "Học mỗi cụm động từ kèm luôn cách đặt tân ngữ của nó, đừng chỉ học nghĩa.",
      "Trong Speaking, dùng cụm động từ nghe rất tự nhiên: I came across a great podcast (tôi tình cờ nghe được một podcast hay).",
    ],
    questions: [
      mcq("g-pv1", "Câu nào đúng?", ["Turn off it.", "Turn it off.", "Turn off the it.", "Turn off."], "Turn it off.", "Turn off là cụm tách được và tân ngữ là đại từ nên bắt buộc đặt ở giữa: turn it off."),
      mcq("g-pv2", "I ran ______ an old friend.", ["into", "to", "after", "up"], "into", "Run into somebody nghĩa là tình cờ gặp ai đó."),
      tf("g-pv3", "Look after it. đúng.", "True", "Look after là cụm không tách được nên tân ngữ đứng sau — câu này đúng."),
    ],
  },
  {
    id: "adverb-pos",
    title: "Vị trí của trạng từ trong câu",
    band: "6–8",
    vnTrap: "Người Việt hay viết: He speaks very well English. / I every day go to school.",
    rule: "Trạng từ chỉ cách (well, fast, carefully) đứng sau động từ hoặc sau tân ngữ: He speaks English well — không nói He speaks well English. Trạng từ tần suất (always, usually, never) đứng trước động từ thường (I always walk) nhưng đứng sau động từ be (He is always late). Trạng từ mức độ (very, quite, extremely) đứng trước tính từ hoặc trạng từ khác. Từ nối câu (However, Therefore) đứng đầu câu và theo sau là dấu phẩy.",
    steps: [
      "Ghi nhớ trật tự câu: chủ ngữ + động từ + tân ngữ + trạng từ chỉ cách.",
      "However đứng đầu câu thì sau nó phải có dấu phẩy.",
    ],
    questions: [
      mcq("g-ap1", "Câu nào đúng?", ["He speaks well English.", "He speaks English well.", "He well speaks English.", "He English speaks well."], "He speaks English well.", "Trạng từ chỉ cách (well) đứng sau tân ngữ (English)."),
      mcq("g-ap2", "She ______ late for class.", ["is always", "always is", "always", "is late always"], "is always", "Trạng từ tần suất đứng sau động từ be: She is always late."),
      tf("g-ap3", "I every day practise English. đúng.", "False", "Trạng ngữ thời gian đứng cuối câu: I practise English every day."),
    ],
  },
  {
    id: "determiners",
    title: "Another, other, the other, others",
    band: "6–7.5",
    vnTrap: "Người Việt hay viết: I have two books. One is mine, another is yours. / I need other pen.",
    rule: "Another + danh từ đếm được số ít, nghĩa là một cái khác nữa: another student. Other + danh từ số nhiều: other students. The other chỉ cái còn lại khi chỉ có hai: I have two pens — one is red, the other is blue. Others nghĩa là những cái khác nói chung: Some students passed; others failed. The others chỉ những cái còn lại trong một nhóm cụ thể.",
    steps: [
      "Quy tắc nhanh: another đi với số ít, other đi với số nhiều.",
      "Khi chỉ có hai vật: one ... the other. Khi nói chung chung: some ... others.",
    ],
    questions: [
      mcq("g-dt1", "I need ______ cup of coffee.", ["other", "another", "the other", "others"], "another", "Cup là danh từ đếm được số ít nên dùng another (một tách nữa)."),
      mcq("g-dt2", "Some students passed; ______ failed.", ["other", "another", "the other", "others"], "others", "Cần một đại từ đứng một mình chỉ những người khác — others; other phải đi kèm danh từ."),
      tf("g-dt3", "I have two pens. One is red and another is blue. đúng.", "False", "Khi chỉ có hai vật thì cái còn lại phải là the other: One is red and the other is blue."),
    ],
  },
  {
    id: "purpose",
    title: "Nói mục đích — to, so that, in order to",
    band: "6–8",
    vnTrap: "Người Việt hay viết: I study hard for pass the exam. / I study hard so to pass.",
    rule: "Chỉ mục đích không đổi chủ ngữ: to-V, in order to V hoặc so as to V — I study hard to pass. Khi vế sau có chủ ngữ khác thì dùng so that + chủ ngữ + can/could/will/would: He left early so that his wife could sleep. For + V-ing dùng để nói công dụng của vật: This tool is for cutting. Tuyệt đối không dùng for + động từ nguyên mẫu.",
    steps: [
      "Thấy vế sau có chủ ngữ riêng → chọn so that.",
      "Mẫu hay dùng trong Task 2: The law was introduced to reduce traffic (luật được ban hành nhằm giảm tắc nghẽn).",
    ],
    questions: [
      mcq("g-pu1", "He left early ______ catch the train.", ["for", "to", "so that", "in order"], "to", "Cùng một chủ ngữ (he) nên dùng to + động từ nguyên mẫu để chỉ mục đích."),
      mcq("g-pu2", "He left early ______ his wife could sleep.", ["for", "to", "so that", "in order to"], "so that", "Vế sau có chủ ngữ riêng (his wife) nên phải dùng so that."),
      tf("g-pu3", "This knife is for cut bread. đúng.", "False", "Sau for phải dùng V-ing: This knife is for cutting bread."),
    ],
  },
  {
    id: "result",
    title: "Nói kết quả — so...that và such...that",
    band: "6–8",
    vnTrap: "Người Việt hay viết: It was so difficult question. / It was such difficult.",
    rule: "So + tính từ/trạng từ + that: The traffic was so heavy that we arrived late (tắc đến mức chúng tôi đến muộn). Such + (a/an) + tính từ + danh từ + that: It was such a difficult question that nobody answered. Cách nhớ đơn giản: có danh từ thì dùng such, không có danh từ thì dùng so. Riêng so much/many + danh từ + that: There was so much traffic that...",
    steps: [
      "Nhìn sau tính từ có danh từ không: có → such, không → so.",
      "Với lượng nhiều/ít: so much, so many, so few, so little + danh từ + that.",
    ],
    questions: [
      mcq("g-rs1", "It was ______ hot that we stayed inside.", ["such", "so", "very", "too"], "so", "Hot là tính từ đứng một mình, không có danh từ theo sau nên dùng so."),
      mcq("g-rs2", "It was ______ a boring lecture that I fell asleep.", ["so", "such", "very", "too"], "such", "Có cụm danh từ a boring lecture nên dùng such: such a boring lecture."),
      tf("g-rs3", "It was so difficult question that I gave up. đúng.", "False", "Có danh từ question nên phải dùng such: It was such a difficult question that I gave up."),
    ],
  },
  {
    id: "concessive",
    title: "Nhượng bộ — although, despite, even though, while",
    band: "6.5–8",
    vnTrap: "Người Việt hay viết: Despite it was expensive. / Although expensive but useful. / Even although...",
    rule: "Although và even though đi với một mệnh đề đầy đủ (chủ ngữ + động từ): Although it was costly, it worked. Despite và in spite of đi với danh từ hoặc V-ing: Despite the cost, it worked. / Despite being costly, it worked. Sau although tuyệt đối không dùng but. While và whereas đặt giữa hai mệnh đề đối lập: Cities are crowded, whereas the countryside is quiet.",
    steps: [
      "Quy tắc nhanh: theo sau là danh từ/V-ing → despite; theo sau là mệnh đề đủ → although.",
      "Gạch ngay chữ but nếu câu đã có although — hai từ này không bao giờ đi cùng nhau.",
    ],
    questions: [
      mcq("g-cs1", "______ the rain, the match continued.", ["Although", "Despite", "But", "However"], "Despite", "The rain là danh từ nên dùng despite; although cần một mệnh đề đầy đủ."),
      mcq("g-cs2", "______ it was raining, the match continued.", ["Despite", "In spite of", "Although", "But"], "Although", "It was raining là mệnh đề đủ (chủ ngữ + động từ) nên dùng although."),
      tf("g-cs3", "Although it was expensive, but it was worth it. đúng.", "False", "Although không đi với but — bỏ but: Although it was expensive, it was worth it."),
    ],
  },
  {
    id: "future-past",
    title: "Tương lai trong quá khứ",
    band: "6.5–8",
    vnTrap: "Người Việt hay viết: He said he will go. / I was sure I can do it.",
    rule: "Khi động từ chính ở quá khứ (said, knew, thought) thì thì tương lai trong câu phải lùi lại: will → would, can → could, may → might, is going to → was going to. He said he would come (anh ấy nói anh ấy sẽ đến). I knew it was going to rain (tôi biết trời sắp mưa).",
    steps: [
      "Gặp câu tường thuật, đầu tiên lùi thì: will thành would, can thành could.",
      "Trong Speaking Part 2 khi kể chuyện: I thought it would be easy (tôi cứ tưởng sẽ dễ).",
    ],
    questions: [
      mcq("g-fp1", "She said she ______ help me.", ["will", "would", "can", "is going to"], "would", "Động từ chính said ở quá khứ nên will phải lùi thành would."),
      mcq("g-fp2", "I knew he ______ late.", ["will be", "would be", "can be", "may be"], "would be", "Knew là quá khứ nên dùng would be, không dùng will be."),
      tf("g-fp3", "He promised he can finish it. đúng.", "False", "Promised là quá khứ nên can phải lùi thành could: He promised he could finish it."),
    ],
  },
  {
    id: "mixed-cond",
    title: "Câu điều kiện hỗn hợp",
    band: "7–8",
    vnTrap: "Người Việt hay viết: If I studied hard, I would pass the exam yesterday. (lẫn lộn mốc thời gian).",
    rule: "Điều kiện hỗn hợp là khi giả định và kết quả thuộc hai thời điểm khác nhau. Giả định hiện tại → kết quả quá khứ: If I were richer, I would have bought that house (giá mà tôi giàu hơn thì tôi đã mua căn nhà đó rồi). Giả định quá khứ → kết quả hiện tại: If I had listened to her, I wouldn't be in trouble now (giá mà tôi nghe lời cô ấy thì giờ tôi đã không gặp rắc rối).",
    steps: [
      "Tách riêng hai mốc thời gian: giả định thuộc lúc nào, kết quả thuộc lúc nào — rồi chia thì cho từng vế.",
      "Mẫu hay dùng trong Part 3: If cities had invested in metro earlier, traffic would be lighter now.",
    ],
    questions: [
      mcq("g-mc1", "If I ______ harder at school, I would have a better job now.", ["study", "studied", "had studied", "have studied"], "studied", "Giả định về hiện tại (nói chung mình học hành) nên vế if dùng quá khứ đơn: studied."),
      mcq("g-mc2", "If I had woken up earlier, I ______ late now.", ["am not", "wouldn't be", "wouldn't have been", "wasn't"], "wouldn't be", "Kết quả thuộc hiện tại (now) nên dùng wouldn't be; wouldn't have been dành cho kết quả quá khứ."),
      tf("g-mc3", "Câu điều kiện hỗn hợp chỉ dùng trong bài viết.", "False", "Trong Speaking Part 3 cũng dùng rất tốt, ví dụ khi bàn về thay đổi trong quá khứ ảnh hưởng đến hiện tại."),
    ],
  },
  {
    id: "subjunctive",
    title: "Thể giả định (subjunctive)",
    band: "7–8",
    vnTrap: "Người Việt hay viết: I suggest that he goes. / It is important that he is on time. / If I was you.",
    rule: "Sau các động từ suggest, insist, demand, recommend + that thì động từ sau đó dùng nguyên mẫu cho mọi ngôi: I suggest that he go early — không phải goes. Tương tự sau It is essential/important/vital that: It is important that he be on time. Trong câu If I were you, luôn dùng were cho mọi ngôi, kể cả ngôi thứ ba số ít.",
    steps: [
      "Gặp suggest that... thì động từ theo sau luôn ở nguyên mẫu: suggest that he go.",
      "Thuộc lòng cụm If I were you — không bao giờ là If I was you trong văn viết.",
    ],
    questions: [
      mcq("g-sv1", "I recommend that he ______ earlier.", ["arrives", "arrive", "arrived", "will arrive"], "arrive", "Sau recommend that, động từ dùng nguyên mẫu cho mọi ngôi: that he arrive."),
      mcq("g-sv2", "If I ______ you, I would take the offer.", ["am", "was", "were", "be"], "were", "Cụm cố định If I were you — luôn dùng were."),
      tf("g-sv3", "It is important that he is on time. đúng.", "False", "Trong văn trang trọng phải dùng nguyên mẫu: It is important that he be on time."),
    ],
  },
  {
    id: "wishes",
    title: "Wish — ước điều không có thật",
    band: "6.5–8",
    vnTrap: "Người Việt hay viết: I wish I am taller. / I wish I can fly. / I wish I didn't went.",
    rule: "Ước về hiện tại (không có thật): I wish + quá khứ đơn — I wish I were taller (ước gì tôi cao hơn). Ước về quá khứ (tiếc nuối): I wish + had + V3 — I wish I had studied harder (ước gì tôi đã học chăm hơn). Ước về tương lai hoặc phàn nàn: I wish + would/could — I wish it would stop raining. If only nghe mạnh và sâu sắc hơn I wish. Regret + V-ing là hối tiếc vì đã làm gì.",
    steps: [
      "Ước điều trái với hiện tại → lùi về quá khứ đơn. Ước điều trái với quá khứ → lùi về quá khứ hoàn thành.",
      "Trong Speaking Part 2: I wish I had taken the chance (ước gì tôi đã nắm lấy cơ hội đó).",
    ],
    questions: [
      mcq("g-ws1", "I wish I ______ taller.", ["am", "was", "were", "be"], "were", "Ước về hiện tại dùng quá khứ đơn, và với be thì dùng were cho mọi ngôi."),
      mcq("g-ws2", "I wish I ______ harder yesterday.", ["study", "studied", "had studied", "have studied"], "had studied", "Có yesterday nên đây là tiếc nuối về quá khứ — dùng had + V3."),
      tf("g-ws3", "I wish I can speak French. đúng.", "False", "Sau wish không dùng can — phải lùi thành could: I wish I could speak French."),
    ],
  },
  {
    id: "causative",
    title: "Thể sai khiến — have, get, make",
    band: "6.5–8",
    vnTrap: "Người Việt hay viết: I made him to do it. / I had my hair cutted. / He got me do it.",
    rule: "Have/get + vật + V3: nhờ hoặc thuê ai làm gì cho mình — I had my hair cut (tôi đi cắt tóc). Make + người + động từ nguyên mẫu: bắt hoặc khiến ai làm gì — He made me laugh (anh ấy làm tôi cười). Get + người + to-V: thuyết phục ai làm gì — I got him to help (tôi thuyết phục được anh ấy giúp). Chú ý cut có V3 vẫn là cut, không phải cutted.",
    steps: [
      "Have something done = nhờ người khác làm: I had my car repaired.",
      "Make somebody do = bắt ai làm; get somebody to do = thuyết phục ai làm.",
    ],
    questions: [
      mcq("g-cv1", "I ______ my car repaired yesterday.", ["made", "had", "got", "let"], "had", "Mẫu have something done: I had my car repaired — tôi đem xe đi sửa (người khác sửa)."),
      mcq("g-cv2", "She made him ______ the room.", ["to clean", "clean", "cleaning", "cleaned"], "clean", "Sau make + người, động từ dùng nguyên mẫu không to: made him clean."),
      tf("g-cv3", "I got him repair the bike. đúng.", "False", "Get đi với to-V: I got him to repair the bike."),
    ],
  },
  {
    id: "emphatic",
    title: "Nhấn mạnh bằng do, does, did",
    band: "6.5–8",
    vnTrap: "Người Việt hay viết: I very like it. / He did went there. / She doesn't speaks.",
    rule: "Thêm do/does/did trước động từ nguyên mẫu để nhấn mạnh: I do believe you (tôi thực sự tin bạn), He did finish it (anh ấy thật sự đã làm xong). Động từ chính sau đó luôn ở nguyên mẫu — did finish, không phải did finished. Không dùng very trước động từ; muốn nói rất thích thì dùng really like.",
    steps: [
      "Khi muốn nhấn trong nói hoặc viết: I do think that... (tôi thực sự nghĩ rằng...).",
      "Nhớ: sau do/does/did, động từ chính quay về nguyên mẫu.",
    ],
    questions: [
      mcq("g-em1", "Câu nào đúng?", ["I very like it.", "I do like it.", "I did liked it.", "He does likes it."], "I do like it.", "Do + động từ nguyên mẫu để nhấn mạnh; không dùng very trước động từ."),
      mcq("g-em2", "She ______ finish on time.", ["do", "does", "did", "done"], "did", "Nhấn mạnh việc đã xảy ra trong quá khứ dùng did + nguyên mẫu: did finish."),
      tf("g-em3", "I really enjoy the class. đúng.", "True", "Really đứng trước động từ là đúng; lỗi là dùng very trước động từ (I very enjoy)."),
    ],
  },
];
