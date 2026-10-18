/** Cách học của Zang — nội dung gốc, không lấy tiểu thuyết có bản quyền. */

import type { Pos } from "@/lib/pos";

export type ClassWord = { word: string; ipa: string; vi: string; pos: Pos };

export const CLASS_WORDS: ClassWord[] = [
  { word: "quiet", ipa: "/ˈkwaɪət/", vi: "trầm / yên", pos: "adj" },
  { word: "loud", ipa: "/laʊd/", vi: "ồn", pos: "adj" },
  { word: "tall", ipa: "/tɔːl/", vi: "cao", pos: "adj" },
  { word: "short", ipa: "/ʃɔːt/", vi: "thấp / ngắn", pos: "adj" },
  { word: "thin", ipa: "/θɪn/", vi: "gầy", pos: "adj" },
  { word: "chubby", ipa: "/ˈtʃʌbi/", vi: "béo / mũm mĩm", pos: "adj" },
  { word: "shy", ipa: "/ʃaɪ/", vi: "nhút nhát", pos: "adj" },
  { word: "kind", ipa: "/kaɪnd/", vi: "hiền", pos: "adj" },
  { word: "lazy", ipa: "/ˈleɪzi/", vi: "lười", pos: "adj" },
  { word: "messy", ipa: "/ˈmesi/", vi: "bừa", pos: "adj" },
  { word: "tidy", ipa: "/ˈtaɪdi/", vi: "gọn", pos: "adj" },
  { word: "early", ipa: "/ˈɜːli/", vi: "sớm", pos: "adj" },
  { word: "late", ipa: "/leɪt/", vi: "trễ", pos: "adj" },
  { word: "funny", ipa: "/ˈfʌni/", vi: "buồn cười", pos: "adj" },
  { word: "serious", ipa: "/ˈsɪəriəs/", vi: "nghiêm túc", pos: "adj" },
  { word: "clever", ipa: "/ˈklevə(r)/", vi: "thông minh", pos: "adj" },
  { word: "sleepy", ipa: "/ˈsliːpi/", vi: "buồn ngủ", pos: "adj" },
  { word: "hungry", ipa: "/ˈhʌŋɡri/", vi: "đói", pos: "adj" },
  { word: "tired", ipa: "/ˈtaɪəd/", vi: "mệt", pos: "adj" },
  { word: "bored", ipa: "/bɔːd/", vi: "chán", pos: "adj" },
  { word: "nervous", ipa: "/ˈnɜːvəs/", vi: "hồi hộp", pos: "adj" },
  { word: "brave", ipa: "/breɪv/", vi: "can đảm", pos: "adj" },
  { word: "friendly", ipa: "/ˈfrendli/", vi: "thân thiện", pos: "adj" },
  { word: "polite", ipa: "/pəˈlaɪt/", vi: "lịch sự", pos: "adj" },
  { word: "happy", ipa: "/ˈhæpi/", vi: "vui", pos: "adj" },
  { word: "sad", ipa: "/sæd/", vi: "buồn", pos: "adj" },
  { word: "busy", ipa: "/ˈbɪzi/", vi: "bận", pos: "adj" },
  { word: "free", ipa: "/friː/", vi: "rảnh", pos: "adj" },
  { word: "new", ipa: "/njuː/", vi: "mới", pos: "adj" },
  { word: "old", ipa: "/əʊld/", vi: "cũ / già", pos: "adj" },
  { word: "big", ipa: "/bɪɡ/", vi: "to", pos: "adj" },
  { word: "small", ipa: "/smɔːl/", vi: "nhỏ", pos: "adj" },
  { word: "clean", ipa: "/kliːn/", vi: "sạch", pos: "adj" },
  { word: "dirty", ipa: "/ˈdɜːti/", vi: "bẩn", pos: "adj" },
  { word: "strong", ipa: "/strɒŋ/", vi: "khoẻ", pos: "adj" },
  { word: "weak", ipa: "/wiːk/", vi: "yếu", pos: "adj" },
  { word: "fast", ipa: "/fɑːst/", vi: "nhanh", pos: "adj" },
  { word: "slow", ipa: "/sləʊ/", vi: "chậm", pos: "adj" },
  { word: "warm", ipa: "/wɔːm/", vi: "ấm", pos: "adj" },
  { word: "cold", ipa: "/kəʊld/", vi: "lạnh", pos: "adj" },
  { word: "classmate", ipa: "/ˈklɑːsmeɪt/", vi: "bạn cùng lớp", pos: "n" },
  { word: "desk", ipa: "/desk/", vi: "bàn học", pos: "n" },
  { word: "bag", ipa: "/bæɡ/", vi: "cặp", pos: "n" },
  { word: "notebook", ipa: "/ˈnəʊtbʊk/", vi: "vở", pos: "n" },
  { word: "pen", ipa: "/pen/", vi: "bút", pos: "n" },
  { word: "teacher", ipa: "/ˈtiːtʃə(r)/", vi: "cô / thầy", pos: "n" },
  { word: "break", ipa: "/breɪk/", vi: "giờ ra chơi", pos: "n" },
  { word: "lunch", ipa: "/lʌntʃ/", vi: "bữa trưa", pos: "n" },
  { word: "umbrella", ipa: "/ʌmˈbrelə/", vi: "ô", pos: "n" },
  { word: "jacket", ipa: "/ˈdʒækɪt/", vi: "áo khoác", pos: "n" },
  { word: "glasses", ipa: "/ˈɡlɑːsɪz/", vi: "kính", pos: "n" },
  { word: "smile", ipa: "/smaɪl/", vi: "nụ cười", pos: "n" },
  { word: "voice", ipa: "/vɔɪs/", vi: "giọng", pos: "n" },
  { word: "seat", ipa: "/siːt/", vi: "chỗ ngồi", pos: "n" },
  { word: "window", ipa: "/ˈwɪndəʊ/", vi: "cửa sổ", pos: "n" },
  { word: "phone", ipa: "/fəʊn/", vi: "điện thoại", pos: "n" },
  { word: "homework", ipa: "/ˈhəʊmwɜːk/", vi: "bài tập", pos: "n" },
  { word: "library", ipa: "/ˈlaɪbrəri/", vi: "thư viện", pos: "n" },
  { word: "gate", ipa: "/ɡeɪt/", vi: "cổng", pos: "n" },
  { word: "rain", ipa: "/reɪn/", vi: "mưa", pos: "n" },
  { word: "sit", ipa: "/sɪt/", vi: "ngồi", pos: "v" },
  { word: "stand", ipa: "/stænd/", vi: "đứng", pos: "v" },
  { word: "talk", ipa: "/tɔːk/", vi: "nói chuyện", pos: "v" },
  { word: "listen", ipa: "/ˈlɪsn/", vi: "nghe", pos: "v" },
  { word: "write", ipa: "/raɪt/", vi: "viết", pos: "v" },
  { word: "read", ipa: "/riːd/", vi: "đọc", pos: "v" },
  { word: "draw", ipa: "/drɔː/", vi: "vẽ", pos: "v" },
  { word: "share", ipa: "/ʃeə(r)/", vi: "chia", pos: "v" },
  { word: "wait", ipa: "/weɪt/", vi: "đợi", pos: "v" },
  { word: "walk", ipa: "/wɔːk/", vi: "đi bộ", pos: "v" },
  { word: "laugh", ipa: "/lɑːf/", vi: "cười", pos: "v" },
  { word: "forget", ipa: "/fəˈɡet/", vi: "quên", pos: "v" },
  { word: "bring", ipa: "/brɪŋ/", vi: "mang", pos: "v" },
  { word: "wear", ipa: "/weə(r)/", vi: "mặc / đeo", pos: "v" },
  { word: "always", ipa: "/ˈɔːlweɪz/", vi: "luôn luôn", pos: "adv" },
  { word: "often", ipa: "/ˈɒfn/", vi: "thường", pos: "adv" },
  { word: "never", ipa: "/ˈnevə(r)/", vi: "không bao giờ", pos: "adv" },
  { word: "together", ipa: "/təˈɡeðə(r)/", vi: "cùng nhau", pos: "adv" },
  { word: "quietly", ipa: "/ˈkwaɪətli/", vi: "một cách yên", pos: "adv" },
  { word: "slowly", ipa: "/ˈsləʊli/", vi: "một cách chậm", pos: "adv" },
];


export type Antonym = {
  a: string;
  aIpa: string;
  aVi: string;
  b: string;
  bIpa: string;
  bVi: string;
  pos: Pos;
  hint: string;
  sample: string;
};

export const ANTONYMS: Antonym[] = [
  { a: "thin", aIpa: "/θɪn/", aVi: "gầy", b: "chubby", bIpa: "/ˈtʃʌbi/", bVi: "béo", pos: "adj", hint: "cô ấy gầy còn bạn kia béo, họ vẫn là đôi bạn thân", sample: "She is thin while her friend is chubby; they are still best friends." },
  { a: "quiet", aIpa: "/ˈkwaɪət/", aVi: "trầm", b: "loud", bIpa: "/laʊd/", bVi: "ồn", pos: "adj", hint: "một bạn trầm, một bạn ồn, ngồi cạnh nhau", sample: "Minh is quiet but Khoa is loud, and they sit together every day." },
  { a: "early", aIpa: "/ˈɜːli/", aVi: "sớm", b: "late", bIpa: "/leɪt/", bVi: "trễ", pos: "adj", hint: "một đứa tới sớm, một đứa trễ", sample: "Han Han is always early, while Linh is often late." },
  { a: "cheap", aIpa: "/tʃiːp/", aVi: "rẻ", b: "expensive", bIpa: "/ɪkˈspensɪv/", bVi: "đắt", pos: "adj", hint: "sách này rẻ, cuốn kia đắt", sample: "This book is cheap, but that one is expensive." },
  { a: "short", aIpa: "/ʃɔːt/", aVi: "thấp", b: "tall", bIpa: "/tɔːl/", bVi: "cao", pos: "adj", hint: "hai đứa một cao một thấp", sample: "Khoa is tall and Minh is short, so they share one umbrella easily." },
  { a: "shy", aIpa: "/ʃaɪ/", aVi: "nhút nhát", b: "outgoing", bIpa: "/ˌaʊtˈɡəʊɪŋ/", bVi: "cởi mở", pos: "adj", hint: "một nhút nhát một cởi mở", sample: "Linh is shy whereas Han Han is outgoing." },
  { a: "messy", aIpa: "/ˈmesi/", aVi: "bừa", b: "tidy", bIpa: "/ˈtaɪdi/", bVi: "gọn", pos: "adj", hint: "bàn một đứa bừa, một đứa gọn", sample: "My desk is messy, but hers is tidy." },
  { a: "hard", aIpa: "/hɑːd/", aVi: "khó", b: "easy", bIpa: "/ˈiːzi/", bVi: "dễ", pos: "adj", hint: "bài này khó, bài kia dễ", sample: "This exercise is hard, yet the next one is easy." },
  { a: "cold", aIpa: "/kəʊld/", aVi: "lạnh", b: "warm", bIpa: "/wɔːm/", bVi: "ấm", pos: "adj", hint: "sáng lạnh, phòng lớp ấm", sample: "The street is cold, but the classroom is warm." },
  { a: "busy", aIpa: "/ˈbɪzi/", aVi: "bận", b: "free", bIpa: "/friː/", bVi: "rảnh", pos: "adj", hint: "hôm nay bận, Chủ nhật rảnh", sample: "I am busy on weekdays and free on Sunday." },
  { a: "lazy", aIpa: "/ˈleɪzi/", aVi: "lười", b: "hard-working", bIpa: "/ˌhɑːd ˈwɜːkɪŋ/", bVi: "chăm", pos: "adj", hint: "một bạn lười, một bạn chăm", sample: "Khoa is lazy in the morning, but Minh is hard-working." },
  { a: "kind", aIpa: "/kaɪnd/", aVi: "hiền", b: "mean", bIpa: "/miːn/", bVi: "ác", pos: "adj", hint: "cô ấy hiền còn bạn kia hơi ác, vẫn thân", sample: "Han Han is kind, while that boy is mean; they are still in one class." },
  { a: "fast", aIpa: "/fɑːst/", aVi: "nhanh", b: "slow", bIpa: "/sləʊ/", bVi: "chậm", pos: "adj", hint: "một đứa viết nhanh, một đứa chậm", sample: "Linh is fast at writing, but Khoa is slow." },
  { a: "happy", aIpa: "/ˈhæpi/", aVi: "vui", b: "sad", bIpa: "/sæd/", bVi: "buồn", pos: "adj", hint: "hôm nay vui, hôm qua buồn", sample: "She is happy today, but she was sad yesterday." },
  { a: "clean", aIpa: "/kliːn/", aVi: "sạch", b: "dirty", bIpa: "/ˈdɜːti/", bVi: "bẩn", pos: "adj", hint: "bàn này sạch, bàn kia bẩn", sample: "My side of the desk is clean, and his side is dirty." },
  { a: "strong", aIpa: "/strɒŋ/", aVi: "khoẻ", b: "weak", bIpa: "/wiːk/", bVi: "yếu", pos: "adj", hint: "một khoẻ một yếu, vẫn đá bóng chung", sample: "Minh is strong and Khoa is weak, but they play football together." },
  { a: "big", aIpa: "/bɪɡ/", aVi: "to", b: "small", bIpa: "/smɔːl/", bVi: "nhỏ", pos: "adj", hint: "cặp to, hộp bút nhỏ", sample: "Her bag is big, but her pencil case is small." },
  { a: "new", aIpa: "/njuː/", aVi: "mới", b: "old", bIpa: "/əʊld/", bVi: "cũ", pos: "adj", hint: "sách mới, áo cũ", sample: "This book is new, and that jacket is old." },
];

export const CLASS_FRAMES = [
  "There are five people in my class. ______________.",
  "In my class of five, ______________.",
  "My class has five people, and ______________.",
];

export interface StoryBeat {
  id: string;
  title: string;
  vi: string;
  en: string;
  tense: string;
  structure: string;
  structureVi: string;
  sample: string;
}

export const STORIES: StoryBeat[] = [
  {
    id: "s1",
    title: "Cuốn sách",
    vi: "Hôm qua sau khi Hân Hân mua sách về, cô ấy đã mang nó tặng cho cô bé gần nhà.",
    en: "Yesterday, after Han Han bought a book and went home, she gave it to the girl who lives nearby.",
    tense: "Past Simple",
    structure: "Yesterday, after + S + V2 ..., S + V2 ...",
    structureVi: "Hôm qua, sau khi + chủ ngữ + động từ quá khứ ..., chủ ngữ + động từ quá khứ ...",
    sample: "Yesterday, after Minh finished class, he walked home with Khoa.",
  },
  {
    id: "s2",
    title: "Cặp sách",
    vi: "Khi Khoa mở cặp, cậu ấy thấy một mẩu giấy Hân Hân để từ sáng.",
    en: "When Khoa opened his bag, he found a note Han Han had left in the morning.",
    tense: "Past Simple + Past Perfect",
    structure: "When + S + V2, S + V2 + (that) S + had V3 ...",
    structureVi: "Khi + chủ ngữ + V2, chủ ngữ + V2 + (rằng) chủ ngữ + had + V3",
    sample: "When Linh opened the locker, she found the book Minh had borrowed.",
  },
  {
    id: "s3",
    title: "Mưa",
    vi: "Họ đang đứng dưới mái hiên thì mưa tạnh, nên cả hai chạy vào lớp.",
    en: "They were standing under the roof when the rain stopped, so both of them ran into class.",
    tense: "Past Continuous + Past Simple",
    structure: "S + were/was V-ing when + S + V2, so + S + V2",
    structureVi: "đang làm thì chuyện khác xảy ra, nên ...",
    sample: "I was waiting at the gate when the bus came, so I got on quickly.",
  },
  {
    id: "s4",
    title: "Thư viện",
    vi: "Mỗi chiều Hân Hân đều ngồi góc thư viện, nơi Khoa không dám nói to.",
    en: "Every afternoon Han Han sits in the library corner, where Khoa does not dare to speak loudly.",
    tense: "Present Simple",
    structure: "Every + time, S + V(s) ..., where + S + do/does not + V",
    structureVi: "Mỗi + thời điểm, chủ ngữ + hiện tại ..., nơi + chủ ngữ + không + V",
    sample: "Every morning Minh waits at the gate, where the bus does not stop for long.",
  },
  {
    id: "s5",
    title: "Bánh",
    vi: "Vì Linh quên bữa trưa, Khoa đã chia bánh cho bạn ấy.",
    en: "Because Linh had forgotten lunch, Khoa shared his bread with her.",
    tense: "Past Perfect + Past Simple",
    structure: "Because + S + had V3, S + V2 ...",
    structureVi: "Vì + chủ ngữ + had V3, chủ ngữ + V2",
    sample: "Because I had forgotten my pen, Han Han lent me hers.",
  },
  {
    id: "s6",
    title: "Tin nhắn",
    vi: "Nếu mai trời nắng, họ sẽ đi bộ ra sông sau tan học.",
    en: "If it is sunny tomorrow, they will walk to the river after school.",
    tense: "First conditional",
    structure: "If + S + V (hiện tại), S + will + V",
    structureVi: "Nếu + hiện tại, will + động từ nguyên mẫu",
    sample: "If I finish homework early, I will call Khoa.",
  },
  {
    id: "s7",
    title: "Ghế cuối",
    vi: "Mặc dù lớp ồn, hai đứa vẫn thì thầm được vì ngồi ghế cuối.",
    en: "Although the class was noisy, the two of them could still whisper because they sat at the back.",
    tense: "Past Simple + although",
    structure: "Although + S + V2, S + could/V2 ... because ...",
    structureVi: "Mặc dù + mệnh đề, mệnh đề (không đi với but)",
    sample: "Although the shop was crowded, we found the book because Linh knew the shelf.",
  },
  {
    id: "s8",
    title: "Xe buýt",
    vi: "Trước khi lên xe, Minh đã kiểm tra xem Khoa mang dù chưa.",
    en: "Before he got on the bus, Minh checked whether Khoa had brought an umbrella.",
    tense: "Past Simple + whether + Past Perfect",
    structure: "Before + S + V2, S + V2 + whether + S + had V3",
    structureVi: "Trước khi + V2, chủ ngữ + kiểm tra liệu + had V3",
    sample: "Before class started, Han Han asked whether I had brought the worksheet.",
  },
  {
    id: "s9",
    title: "Bài hát",
    vi: "Khoa hay hát nhỏ, còn Hân Hân thì chỉ nghe và cười.",
    en: "Khoa often sings quietly, while Han Han just listens and smiles.",
    tense: "Present Simple (habit) + while",
    structure: "S + often + V, while + S + just + V",
    structureVi: "Hay / thường + V, trong khi + V",
    sample: "Minh often draws in the margin, while I just watch.",
  },
  {
    id: "s10",
    title: "Đêm thi",
    vi: "Họ đã học cùng nhau suốt ba tối để không ai phải thức một mình.",
    en: "They studied together for three nights so that neither of them would stay up alone.",
    tense: "Past Simple + so that + would",
    structure: "S + V2 ... so that + S + would + V",
    structureVi: "đã làm ... để mà ... would + V",
    sample: "I packed extra snacks so that Khoa would not get hungry.",
  },
  {
    id: "s11",
    title: "Áo",
    vi: "Chiếc áo mà Linh cho mượn vẫn còn mùi nắng sân trường.",
    en: "The jacket that Linh lent him still smelled like the school yard in the sun.",
    tense: "Past Simple + relative that",
    structure: "The N that + S + V2 + still + V2 ...",
    structureVi: "Cái mà + ai đó + V2 + vẫn còn ...",
    sample: "The pen that Han Han gave me still works.",
  },
  {
    id: "s12",
    title: "Cửa sổ",
    vi: "Hân Hân ngồi cạnh cửa sổ, nơi ánh sáng đủ để Khoa chép bài.",
    en: "Han Han sat by the window, where the light was enough for Khoa to copy the notes.",
    tense: "Past Simple + where",
    structure: "S + V2 + by/at ..., where + S + was/were + adj + enough for + O + to V",
    structureVi: "ngồi ở ..., nơi ... đủ để ai đó làm gì",
    sample: "We stood by the gate, where it was quiet enough to talk.",
  },
  {
    id: "s13",
    title: "Điện thoại",
    vi: "Cậu ấy định nhắn tin rồi lại tắt máy, vì sợ làm Hân Hân thức.",
    en: "He was going to text her, but then he switched the phone off because he did not want to wake Han Han.",
    tense: "was going to + but then + Past Simple",
    structure: "S + was going to + V, but then + S + V2 because ...",
    structureVi: "định làm thì thôi, vì ...",
    sample: "I was going to call, but then I waited because it was too late.",
  },
  {
    id: "s14",
    title: "Chỗ ngồi",
    vi: "Ai đến trước thì được chọn chỗ; Khoa luôn đến sớm vì lý do đó.",
    en: "Whoever arrives first can choose the seat; Khoa always comes early for that reason.",
    tense: "Present Simple + whoever",
    structure: "Whoever + V, S + can + V; S + always + V ...",
    structureVi: "Ai ... thì ...; vì thế ... luôn ...",
    sample: "Whoever finishes first can leave; Minh always writes slowly.",
  },
  {
    id: "s15",
    title: "Quà",
    vi: "Không phải vì món quà đắt, mà vì Khoa nhớ ngày Hân Hân thi trượt.",
    en: "It was not because the gift was expensive, but because Khoa remembered the day Han Han failed the test.",
    tense: "Past Simple + not because ... but because",
    structure: "It was not because ..., but because + S + V2 ...",
    structureVi: "Không phải vì A, mà vì B",
    sample: "It was not because the cake was sweet, but because Linh baked it.",
  },
  {
    id: "s16",
    title: "Hành lang",
    vi: "Họ vẫn chưa nói hết thì chuông reo, nên câu chuyện phải để ngày mai.",
    en: "They had not finished talking when the bell rang, so the rest of the story had to wait until tomorrow.",
    tense: "Past Perfect negative + when + Past Simple",
    structure: "S + had not V3 when + S + V2, so + S + had to + V",
    structureVi: "chưa xong thì chuông/chuyện khác tới, nên phải để sau",
    sample: "I had not packed my bag when the teacher came in, so I had to wait.",
  },
];

export interface Track {
  id: string;
  kind: "hai" | "nhac";
  title: string;
  vi: string;
  en: string;
  grammar: string;
}

export const TRACKS: Track[] = [
  {
    id: "h1",
    kind: "hai",
    title: "Cơm hộp",
    vi: "Khoa mở hộp cơm thì thấy toàn dưa leo. Cậu hỏi Hân Hân: «Em nấu gì vậy?» Hân Hân: «Hôm nay cửa hàng hết thịt. Em thêm tình cảm.» Khoa: «Tình cảm không chiên được.»",
    en: "Khoa opened his lunch box and saw only cucumber. He asked Han Han, 'What did you cook?' Han Han said, 'The shop had no meat today. I added feelings.' Khoa said, 'Feelings cannot be fried.'",
    grammar: "Past Simple: opened, saw, asked, said, had. cannot + V.",
  },
  {
    id: "h2",
    kind: "hai",
    title: "Điểm danh",
    vi: "Thầy gọi: «Khoa?» Im. «Khoa Bếu?» Một giọng từ gầm bàn: «Em đây, em rớt bút.» Cả lớp: «Bút không biết trả lời.»",
    en: "The teacher called, 'Khoa?' Silence. 'Khoa Beu?' A voice under the desk said, 'I am here. I dropped my pen.' The class said, 'A pen cannot answer the register.'",
    grammar: "Past Simple called, said, dropped. cannot + V.",
  },
  {
    id: "h3",
    kind: "hai",
    title: "Dù",
    vi: "Mưa. Khoa có một cái dù. Hân Hân cũng có một cái. Họ vẫn chen dưới một dù, vì dù kia để... trông dù.",
    en: "It was raining. Khoa had an umbrella. Han Han had one too. They still squeezed under one umbrella, because the other one was used to watch the first.",
    grammar: "Past Simple + still + because. had = có (quá khứ).",
  },
  {
    id: "h4",
    kind: "hai",
    title: "Wifi",
    vi: "Linh: «Wifi nhà em tên gì?» Minh: «NguoiYeuCu_DungVao.» Linh vào được. Minh: «Thế là em không phải người yêu cũ.»",
    en: "Linh asked, 'What is your wifi called?' Minh said, 'ExDontJoin.' Linh got in. Minh said, 'Then you are not my ex.'",
    grammar: "Present Simple in quotes. asked / said = Past. got in = vào được.",
  },
  {
    id: "h5",
    kind: "hai",
    title: "Từ mới",
    vi: "Hân Hân học từ 'tiny'. Cô viết: My class is tiny. It has five people. Khoa đọc: «Vậy em là người thứ sáu?» «Không, em là cái bàn.»",
    en: "Han Han learned the word 'tiny'. She wrote: My class is tiny. It has five people. Khoa read it and asked, 'So am I the sixth person?' 'No. You are the desk.'",
    grammar: "learned, wrote, read, asked. has = Present (câu ví dụ).",
  },
  {
    id: "h6",
    kind: "hai",
    title: "Bài tập",
    vi: "Thầy: «Ai chưa làm bài?» Cả lớp chỉ Khoa. Khoa chỉ Hân Hân. Hân Hân: «Em làm rồi, chữ em xấu nên giống chưa làm.»",
    en: "The teacher asked, 'Who has not done the homework?' The whole class pointed at Khoa. Khoa pointed at Han Han. Han Han said, 'I have done it. My writing is just ugly, so it looks unfinished.'",
    grammar: "Present Perfect: has not done / have done. so + it looks ...",
  },
  {
    id: "h7",
    kind: "hai",
    title: "Ảnh",
    vi: "Khoa chụp ảnh lớp. Hân Hân nhắm mắt. Khoa: «Chụp lại.» Hân Hân nhắm mắt lần nữa. Khoa đăng ảnh và caption: 'Sleeping beauty, five people, one desk.'",
    en: "Khoa took a class photo. Han Han closed her eyes. Khoa said, 'One more.' She closed them again. He posted the picture with the caption: 'Sleeping beauty, five people, one desk.'",
    grammar: "Past Simple took, closed, said, posted.",
  },
  {
    id: "h8",
    kind: "hai",
    title: "Từ trái nghĩa",
    vi: "Cô bảo viết câu trái nghĩa. Hân Hân viết: She is thin, and he is not. Khoa đọc: «Em tiết kiệm từ chubby.»",
    en: "The teacher told them to write a contrast sentence. Han Han wrote: She is thin, and he is not. Khoa read it and said, 'You saved the word chubby.'",
    grammar: "told + O + to V. wrote, read, said.",
  },
  {
    id: "n1",
    kind: "nhac",
    title: "Năm người",
    vi: "Lớp nhỏ năm người, một cửa sổ. Ai cũng mang một chuyện không nói. Tan học, đường ướt, ta đi chung một đoạn.",
    en: "A small class of five, one window. Everyone carries a story they do not tell. After school the road is wet, and we walk one stretch together.",
    grammar: "Present Simple. do not + V. After + N, S + V.",
  },
  {
    id: "n2",
    kind: "nhac",
    title: "Góc thư viện",
    vi: "Em ngồi góc ấy, mình ngồi góc này. Sách mở, miệng không mở. Chuông reo, ta gấp trang như gấp một lời chưa nói.",
    en: "You sit in that corner, I sit in this one. The book is open, the mouth is not. The bell rings, and we close the page as if we fold an unspoken line.",
    grammar: "Present Simple. as if + S + V. not = phủ định ngắn.",
  },
  {
    id: "n3",
    kind: "nhac",
    title: "Sau mưa",
    vi: "Mưa tạnh thì đường sáng hơn. Không ai giữ dù trên đầu nữa. Chỉ còn hai bóng, rồi một, rồi cổng trường.",
    en: "When the rain stops, the road looks brighter. Nobody holds an umbrella over a head any more. Only two shadows, then one, then the school gate.",
    grammar: "When + S + V, S + V. nobody + V(s). not ... any more.",
  },
  {
    id: "n4",
    kind: "nhac",
    title: "Nhật ký",
    vi: "Tối viết bốn dòng: hôm nay học một từ, một cụm, một bài hát, rồi ngủ. Mai mở ra, chữ vẫn nguệch, nghĩa thì nhớ.",
    en: "At night I write four lines: today I learned one word, one chunk, one song, then I slept. Tomorrow I open it; the letters are messy, but the meaning stays.",
    grammar: "At night + S + V. then + S + V2. but ...",
  },
];

export const DIARY_HINTS = [
  "Viết 4–8 câu như nhật ký tối nay. Dùng từ hôm nay nếu nhớ. Không cần đẹp. Cần đúng thì.",
  "Kể một chuyện nhỏ trong lớp 5 người. Past Simple nếu đã xảy ra.",
  "Viết về đi về nhà / mưa / cơm hộp / thư viện. Mỗi câu một ý.",
];

export function dayNum(d = new Date().toISOString().slice(0, 10)) {
  let h = 0;
  for (const c of d) h = (h * 33 + c.charCodeAt(0)) >>> 0;
  return h;
}

export function pick<T>(arr: T[], n: number) {
  return arr[n % arr.length];
}

export function pickMany<T>(arr: T[], n: number, count: number) {
  const out: T[] = [];
  const seen = new Set<number>();
  let i = 0;
  while (out.length < Math.min(count, arr.length) && i < arr.length * 3) {
    const idx = (n + i * 17) % arr.length;
    if (!seen.has(idx)) {
      seen.add(idx);
      out.push(arr[idx]);
    }
    i += 1;
  }
  return out;
}
