import { LEX_TOPICS, lexByTopic } from "@/lib/lexicon";
import { mini } from "./mini";
import type { Topic } from "./types";

/** Bank cũ 40 chủ đề (id trong topics*.ts). Phần còn lại lấy từ lexicon. */
const CORE = new Set([
  "edu", "work", "env", "tech", "health", "city", "media", "culture", "crime", "global",
  "family", "housing", "food", "sport", "travel", "shop", "lang", "sci", "energy", "water",
  "animal", "climate", "ads", "gov", "money", "child", "aging", "leisure", "music", "books",
  "film", "fashion", "comm", "net", "space", "farm", "arch", "history", "happy", "volunteer",
]);

export function extraTopicsFromLex(): Topic[] {
  return LEX_TOPICS.filter((t) => !CORE.has(t.id)).map((t) => {
    const words = lexByTopic(t.id);
    const take = words.slice(0, 12);
    const w = take[0];
    const w1 = take[1];
    const w2 = take[2];
    const w3 = take[3];
    const script = `The briefing starts on the twelfth of May, not the fifth. The fee is 2.4 million if you book before 20 April, otherwise 2.6. There are twelve sessions; the first is orientation, so eleven teaching hours. It runs 6.15 to 7.45, not 6.00. A speaker used the word "${w?.word ?? "policy"}": ${w?.example ?? "The policy changed."} Then: ${w1?.example ?? ""}`;
    const passage = take
      .slice(0, 6)
      .map((x) => x.example)
      .join(" ");
    return mini({
      id: t.id,
      name: t.name,
      vi: t.vi,
      stage: t.group === "daily" ? "foundation" : "fluency",
      vocab: take.map((x) => [x.word, x.ipa, x.vi, x.example] as [string, string, string, string]),
      script,
      lq: [
        ["Khai giảng ngày nào?", ["5/5", "12/5", "20/4", "11/5"], "12/5", "twelfth of May, not the fifth."],
        ["Giá nếu đặt trước 20/4?", ["2.6 triệu", "2.4 triệu", "12 triệu", "Miễn phí"], "2.4 triệu", "2.4 if before 20 April."],
        ["Buổi dạy (không tính orientation)?", ["12", "11", "1", "15"], "11", "first is orientation."],
        ["Giờ?", ["6:00–7:45", "6:15–7:45", "6:15–8:00", "7:45–9"], "6:15–7:45", "6.15 to 7.45, not 6.00."],
      ],
      passage,
      rq: [
        [
          `Đoạn có dùng từ «${w?.word ?? ""}» theo nghĩa nào gần nhất?`,
          [w?.vi ?? "—", w1?.vi ?? "—", w2?.vi ?? "—", w3?.vi ?? "—"],
          w?.vi ?? "—",
          w?.example ?? "",
        ],
        [
          `Câu ví dụ của «${w1?.word ?? ""}» nói về điều gì?`,
          [w1?.vi ?? "—", w2?.vi ?? "—", "Không có trong đoạn", w3?.vi ?? "—"],
          w1?.vi ?? "—",
          w1?.example ?? "",
        ],
      ],
      claims: [
        [w?.example ?? "Có nêu ví dụ chủ đề.", "True", "câu lấy từ ngân hàng từ của chủ đề."],
        [`Đoạn bắt buộc mọi người phải dùng từ "${w2?.word ?? "X"}" mỗi ngày.`, "False", "ví dụ, không phải mệnh lệnh."],
        ["Lương khởi điểm được nêu bằng số cụ thể.", "Not Given", "không có số lương."],
        [w1?.example ?? "Có câu thứ hai.", "True", "nằm trong passage."],
      ],
      write: `Some people think ${t.name.toLowerCase()} should be a priority for governments. To what extent do you agree or disagree?`,
      speak: { part: 2, cue: `Describe something related to ${t.name.toLowerCase()} that affected you.`, bullets: ["what it was", "when", "what happened", "why it still matters"] },
      hw: `Ôn 20 từ chủ đề ${t.vi}. Viết 150 từ. Ghi âm 90 giây Part 2.`,
    });
  });
}
