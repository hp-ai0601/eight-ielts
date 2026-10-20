import { gap, mcq, tf } from "@/lib/content/types";

export const GRAMMAR_ADVANCED = [
  {
    id: "zero-article",
    title: "Zero article: không mạo từ",
    band: "6–8",
    vnTrap: "Bỏ the trước mọi danh từ chung, nhưng vẫn nhồi a/an vào từ không đếm.",
    rule: "Không mạo từ: danh từ không đếm khi nói chung (information, advice, money, water), số nhiều chung (students need sleep), bữa ăn, phương tiện (by bus), ngôn ngữ (in English), tên riêng. Có the: người nghe biết cụ thể, danh từ duy nhất (the sun), vùng địa lý (the US, the north of England).",
    steps: [
      "Hỏi: danh từ nói chung hay cụ thể?",
      "Task 2: education, health, transport — thường zero article khi nói chung.",
      "Không: the society / the nature / the traffic (trừ the traffic in cities = cụ thể).",
    ],
    questions: [
      mcq("g-za1", "Câu đúng?", ["The nature is beautiful.", "Nature is beautiful.", "A nature is beautiful.", "The natures are beautiful."], "Nature is beautiful.", "nature nói chung không mạo từ."),
      mcq("g-za2", "He goes to work by ______.", ["the bus", "a bus", "bus", "buses"], "bus", "by + phương tiện, không mạo từ."),
      tf("g-za3", "The students need the sleep. đúng.", "False", "students chung + sleep chung → Students need sleep."),
    ],
  },
  {
    id: "cleft",
    title: "Cleft sentences: nhấn mạnh band 8",
    band: "7–8",
    vnTrap: "Nhồi it is ... that mọi câu, hoặc nhấn sai thành phần.",
    rule: "It is/was + thành phần cần nhấn + that/who. It is the government that should act. What I like most is the convenience. Speaking Part 3: What worries me is that... Một bài Task 2 dùng 1–2 lần là đủ.",
    steps: [
      "Chọn thành phần muốn nhấn: chủ ngữ, tân ngữ, trạng ngữ.",
      "What + mệnh đề + is + noun: What surprised me was the speed.",
      "Đừng dùng cleft cho mọi câu.",
    ],
    questions: [
      mcq("g-cl1", "Nhấn chủ ngữ: ______ the policy that reduced emissions.", ["It is", "There is", "This is", "That is"], "It is", "It is ... that cleft."),
      gap("g-cl2", "What I liked most ______ the clean streets. (is/are)", "is", "What-clause = số ít."),
      tf("g-cl3", "It was in 2010 when sales peaked. đúng.", "False", "It was ... that/which, không when cho năm."),
    ],
  },
  {
    id: "ellipsis",
    title: "Ellipsis & substitution",
    band: "7–8",
    vnTrap: "Lặp nguyên câu: I like it and he likes it too. / I don't like it and he doesn't like it.",
    rule: "So do I / Neither do I. I think so. I hope so. So it is. I want to (go). Đại từ: one/ones thay danh từ; do/does/did thay động từ. Speaking tự nhiên: Do you? / I suppose so.",
    steps: [
      "Thay vì lặp, dùng so/neither/do/one.",
      "I prefer the blue one. I went and he did too.",
    ],
    questions: [
      mcq("g-el1", "Câu sạch?", ["I like coffee and he likes coffee too.", "I like coffee and so does he.", "I like coffee and he likes too.", "I like coffee and so he does."], "I like coffee and so does he.", "so + trợ + chủ ngữ."),
      mcq("g-el2", "I don't drive and ______.", ["neither does he", "so does he", "he does too", "he doesn't too"], "neither does he", "phủ định + neither + trợ + chủ ngữ."),
      tf("g-el3", "'Are they coming?' 'I hope so.' đúng.", "True", "I hope so = I hope they are coming."),
    ],
  },
  {
    id: "discourse",
    title: "Discourse markers: nối mạch lạc",
    band: "6–8",
    vnTrap: "Bắt đầu mọi câu bằng However / Moreover / In addition. Hoặc không có connector nào.",
    rule: "Thêm ý: in addition, furthermore, moreover, also, besides. Đối lập: however, nevertheless, on the other hand, whereas, while. Kết quả: therefore, consequently, as a result, thus. Ví dụ: for example, for instance, such as. Thứ tự: first(ly), then, after that, finally. Không nhồi đầu mỗi câu.",
    steps: [
      "Mỗi đoạn 2–3 marker, đủ loại.",
      "Dùng this/which để nối nội bộ câu, đừng chỉ dùng connector.",
    ],
    questions: [
      mcq("g-dm1", "Nối kết quả: Rain was heavy. ______, the match was cancelled.", ["However", "Therefore", "Moreover", "For example"], "Therefore", "kết quả → therefore."),
      mcq("g-dm2", "Ý ví dụ: Many cities face congestion, ______ London.", ["therefore", "however", "such as", "consequently"], "such as", "such as + ví dụ."),
      tf("g-dm3", "Mỗi câu nên bắt đầu bằng However hoặc Moreover.", "False", "Quá dày connector gây mất tự nhiên."),
    ],
  },
  {
    id: "phrasal",
    title: "Phrasal verbs: tách/ không tách",
    band: "6–8",
    vnTrap: "Tách phrasal với tân ngữ dài: turn the complicated plan off. / Dùng look it up thành look up it.",
    rule: "Separable: turn off, pick up, put off — tân ngữ đại từ ở giữa (turn it off). Tân ngữ dài có thể giữa hoặc sau (turn off the lights / turn the lights off). Inseparable: look after, run into, come across — tân ngữ luôn sau. Three-part: keep up with, look forward to, put up with.",
    steps: [
      "Học phrasal verbs theo cụm và cách dùng tân ngữ.",
      "Speaking dùng tự nhiên: I came across a great podcast.",
    ],
    questions: [
      mcq("g-pv1", "Câu đúng?", ["Turn off it.", "Turn it off.", "Turn off the it.", "Turn off."], "Turn it off.", "đại từ ở giữa separable phrasal."),
      mcq("g-pv2", "I ran ______ an old friend.", ["into", "to", "after", "up"], "into", "run into somebody = tình cờ gặp."),
      tf("g-pv3", "Look after it. đúng.", "True", "look after inseparable."),
    ],
  },
  {
    id: "adverb-pos",
    title: "Vị trí trạng từ",
    band: "6–8",
    vnTrap: "He speaks very well English. / I every day go to school.",
    rule: "Trạng từ chỉ cách thường sau động từ/tân ngữ (speak English well). Trạng từ tần suất (always, usually, never) trước động từ chính (I always walk) hoặc sau tobe (He is always late). Trạng từ mức độ (very, quite, extremely) trước tính từ/trạng từ. Nối câu: However, Therefore ở đầu câu + dấu phẩy.",
    steps: [
      "Kiểm tra vị trí: S + V + O + Adv (cách).",
      "However ở đầu câu, có dấu phẩy.",
    ],
    questions: [
      mcq("g-ap1", "Câu đúng?", ["He speaks well English.", "He speaks English well.", "He well speaks English.", "He English speaks well."], "He speaks English well.", "trạng từ cách sau tân ngữ."),
      mcq("g-ap2", "She ______ late for class.", ["is always", "always is", "always", "is late always"], "is always", "always sau tobe."),
      tf("g-ap3", "I every day practise English. đúng.", "False", "I practise English every day."),
    ],
  },
  {
    id: "determiners",
    title: "Determiners: another / other / the other / others",
    band: "6–7.5",
    vnTrap: "I have two books. One is mine, another is yours. / I need other pen.",
    rule: "another + số ít đếm được (another student). other + số nhiều (other students). the other = cái còn lại trong 2 (one ... the other). others = những cái khác nói chung. the others = những cái còn lại cụ thể.",
    steps: [
      "another + danh từ số ít. other + số nhiều.",
      "one ... the other (trong 2). some ... others (nói chung).",
    ],
    questions: [
      mcq("g-dt1", "I need ______ cup of coffee.", ["other", "another", "the other", "others"], "another", "another + số ít."),
      mcq("g-dt2", "Some students passed; ______ failed.", ["other", "another", "the other", "others"], "others", "others = những người khác."),
      tf("g-dt3", "I have two pens. One is red and another is blue. đúng.", "False", "trong 2 → one ... the other."),
    ],
  },
  {
    id: "purpose",
    title: "Mệnh đề mục đích: to / so that / in order to",
    band: "6–8",
    vnTrap: "I study hard for pass the exam. / I study hard so to pass.",
    rule: "to V / in order to V / so as to V: mục đích. so that + S + can/could/will/would: mục đích có chủ ngữ. for + V-ing (dụng cụ/mục đích): This tool is for cutting. Không dùng for + V nguyên.",
    steps: [
      "Có chủ ngữ mới → so that + S + modal.",
      "Task 2: The law was introduced to reduce...",
    ],
    questions: [
      mcq("g-pu1", "He left early ______ catch the train.", ["for", "to", "so that", "in order"], "to", "to + V nguyên = mục đích."),
      mcq("g-pu2", "He left early ______ his wife could sleep.", ["for", "to", "so that", "in order to"], "so that", "so that + S + modal."),
      tf("g-pu3", "This knife is for cut bread. đúng.", "False", "for + V-ing: for cutting bread."),
    ],
  },
  {
    id: "result",
    title: "Mệnh đề kết quả: so...that / such...that",
    band: "6–8",
    vnTrap: "It was so difficult question. / It was such difficult.",
    rule: "so + adj/adv + that. such + (a/an) + adj + noun + that. The traffic was so heavy that we arrived late. It was such a difficult question that nobody answered.",
    steps: [
      "Có danh từ → such. Không danh từ → so.",
      "so much / many + noun + that.",
    ],
    questions: [
      mcq("g-rs1", "It was ______ hot that we stayed inside.", ["such", "so", "very", "too"], "so", "so + adj + that."),
      mcq("g-rs2", "It was ______ a boring lecture that I fell asleep.", ["so", "such", "very", "too"], "such", "such + a/an + adj + noun + that."),
      tf("g-rs3", "It was so difficult question that I gave up. đúng.", "False", "such + a difficult question."),
    ],
  },
  {
    id: "concessive",
    title: "Mệnh đề nhượng bộ: despite / although / even though / while",
    band: "6.5–8",
    vnTrap: "Despite it was expensive / Although expensive but / Even although.",
    rule: "although / even though + S + V. despite / in spite of + N / V-ing. Despite the cost, it worked. Although it was costly, it worked. Although ... but sai. while/whereas + S + V: đối lập hai mệnh đề.",
    steps: [
      "despite + N/V-ing. although + S + V.",
      "Không although ... but.",
    ],
    questions: [
      mcq("g-cs1", "______ the rain, the match continued.", ["Although", "Despite", "But", "However"], "Despite", "despite + N."),
      mcq("g-cs2", "______ it was raining, the match continued.", ["Despite", "In spite of", "Although", "But"], "Although", "although + S + V."),
      tf("g-cs3", "Although it was expensive, but it was worth it. đúng.", "False", "although không đi với but."),
    ],
  },
  {
    id: "future-past",
    title: "Future in the past",
    band: "6.5–8",
    vnTrap: "He said he will go. / I was sure I can do it.",
    rule: "Khi động từ chính ở quá khứ, tương lai lùi thành would; can → could; may → might; is going to → was going to. He said he would come. I knew it was going to rain.",
    steps: [
      "will → would; can → could; may → might trong reported speech.",
      "Part 2 kể chuyện: I thought it would be easy.",
    ],
    questions: [
      mcq("g-fp1", "She said she ______ help me.", ["will", "would", "can", "is going to"], "would", "will lùi thành would."),
      mcq("g-fp2", "I knew he ______ late.", ["will be", "would be", "can be", "may be"], "would be", "knew quá khứ → would be."),
      tf("g-fp3", "He promised he can finish it. đúng.", "False", "can → could."),
    ],
  },
  {
    id: "mixed-cond",
    title: "Mixed conditionals",
    band: "7–8",
    vnTrap: "If I studied hard, I would pass the exam yesterday. / If I had money, I would have bought it.",
    rule: "Thường: If + Past Simple, would have + V3 (hiện tại khác → quá khứ khác). If I were richer, I would have bought the house. If I had listened, I wouldn't be in trouble now. Cũng có: If + had V3, would + V (quá khứ khác → hiện tại khác).",
    steps: [
      "Xác định thời của giả định và kết quả.",
      "Part 3: If cities had invested in metro earlier, traffic would be lighter now.",
    ],
    questions: [
      mcq("g-mc1", "If I ______ harder at school, I would have a better job now.", ["study", "studied", "had studied", "have studied"], "studied", "hiện tại khác → quá khứ khác: If + Past Simple, would + V."),
      mcq("g-mc2", "If I had woken up earlier, I ______ late now.", ["am not", "wouldn't be", "wouldn't have been", "wasn't"], "wouldn't be", "quá khứ khác → hiện tại khác."),
      tf("g-mc3", "Mixed conditional chỉ dùng trong writing.", "False", "Speaking Part 3 cũng dùng tốt."),
    ],
  },
  {
    id: "subjunctive",
    title: "Subjunctive & unreal uses",
    band: "7–8",
    vnTrap: "I suggest that he goes. / It is important that he is on time. / If I was you.",
    rule: "Sau suggest/insist/demand/recommend that + S + V nguyên (he go — subjunctive). It is essential/important/vital that + S + V nguyên. If I were you (were cho mọi người). As if / as though + past (unreal).",
    steps: [
      "suggest that he go, not goes.",
      "If I were you — dùng were.",
    ],
    questions: [
      mcq("g-sv1", "I recommend that he ______ earlier.", ["arrives", "arrive", "arrived", "will arrive"], "arrive", "subjunctive: V nguyên."),
      mcq("g-sv2", "If I ______ you, I would take the offer.", ["am", "was", "were", "be"], "were", "If I were you."),
      tf("g-sv3", "It is important that he is on time. đúng.", "False", "It is important that he be on time (subjunctive)."),
    ],
  },
  {
    id: "wishes",
    title: "Wishes & regrets",
    band: "6.5–8",
    vnTrap: "I wish I am taller. / I wish I can fly. / I wish I didn't went.",
    rule: "Wish hiện tại: I wish + S + Past Simple. Wish quá khứ: I wish + S + had + V3. Wish tương lai: I wish + S + would/could + V. If only mạnh hơn wish. Regret + V-ing (hối tiếc đã làm).",
    steps: [
      "Hiện tại khác → Past Simple. Quá khứ khác → had V3.",
      "Speaking Part 2: I wish I had taken the chance.",
    ],
    questions: [
      mcq("g-ws1", "I wish I ______ taller.", ["am", "was", "were", "be"], "were", "wish hiện tại: were."),
      mcq("g-ws2", "I wish I ______ harder yesterday.", ["study", "studied", "had studied", "have studied"], "had studied", "wish quá khứ: had + V3."),
      tf("g-ws3", "I wish I can speak French. đúng.", "False", "wish tương lai: could/would."),
    ],
  },
  {
    id: "causative",
    title: "Causative: have / get / make somebody do",
    band: "6.5–8",
    vnTrap: "I made him to do it. / I had my hair cutted. / He got me do it.",
    rule: "have/get + something + V3: nhờ ai đó làm (I had my hair cut). have/make + somebody + V: bắt/cho ai làm (He made me laugh). get + somebody + to V: thuyết phục/ nhờ ai làm (I got him to help).",
    steps: [
      "have something done = nhờ làm.",
      "make somebody do = bắt ai làm.",
      "get somebody to do = thuyết phục ai làm.",
    ],
    questions: [
      mcq("g-cv1", "I ______ my car repaired yesterday.", ["made", "had", "got", "let"], "had", "have something done."),
      mcq("g-cv2", "She made him ______ the room.", ["to clean", "clean", "cleaning", "cleaned"], "clean", "make somebody do."),
      tf("g-cv3", "I got him repair the bike. đúng.", "False", "get somebody to do something."),
    ],
  },
  {
    id: "emphatic",
    title: "Nhấn mạnh với do/does/did",
    band: "6.5–8",
    vnTrap: "I very like it. / He did went there. / She doesn't speaks.",
    rule: "Do/does/did + V nguyên để nhấn: I do believe you. He did finish it. Không very + like — dùng really like. So + adj/adv: so difficult, so quickly.",
    steps: [
      "Nhấn: I do think that...",
      "So + adj/adv (không very + adj/adv trong ngữ cảnh so...that).",
    ],
    questions: [
      mcq("g-em1", "Câu đúng?", ["I very like it.", "I do like it.", "I did liked it.", "He does likes it."], "I do like it.", "do/does/did + V nguyên."),
      mcq("g-em2", "She ______ finish on time.", ["do", "does", "did", "done"], "did", "did + V nguyên nhấn quá khứ."),
      tf("g-em3", "I really enjoy the class. đúng.", "True", "really + V; very không đứng trước V."),
    ],
  },
];
