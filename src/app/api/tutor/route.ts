import { NextResponse } from "next/server";
import { callLLM, extractJSON, resolveProvider } from "@/lib/llm";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM = `Bạn là gia sư IELTS Academic cho một người Việt, mục tiêu band 8.0.
Chấm theo đúng 4 tiêu chí chính thức. Không khen sáo. Chỉ ra 1-3 lỗi cụ thể rồi cho bản sửa.
Trả lời tiếng Việt, giữ nguyên ví dụ tiếng Anh.
Nếu được yêu cầu JSON, chỉ trả JSON.`;

interface Score {
  band: number;
  fc: number;
  lr: number;
  gra: number;
  extra: number;
  notes: string[];
  rewrite?: string;
}

function heuristicWrite(text: string, min: number): Score {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const n = words.length;
  const hasPos = /(agree|disagree|however|therefore|because|although|whereas)/i.test(text);
  const short = n < min * 0.7;
  const template = /in today's (modern )?society|to sum up my opinion/i.test(text);
  let band = 5;
  if (n >= min) band += 0.5;
  if (n >= min * 1.1) band += 0.5;
  if (hasPos) band += 0.5;
  if (template) band -= 0.5;
  if (short) band -= 1;
  band = Math.max(4, Math.min(7, band));
  const notes = [
    short ? `Thiếu từ (hiện ${n}, cần ≥ ${min}).` : `Đủ độ dài (${n} từ).`,
    hasPos ? "Có từ nối lập luận." : "Thiếu từ nối (however / although / whereas).",
    template ? "Bỏ câu sáo. Band 8 cần thông tin, không khẩu hiệu." : "Tránh sáo — tốt.",
  ];
  return { band, fc: band, lr: band - 0.5, gra: band, extra: band, notes };
}

function heuristicSpeak(text: string): Score {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const n = words.length;
  let band = 4.5;
  if (n >= 40) band += 0.5;
  if (n >= 80) band += 0.5;
  if (/(because|for example|which|when I)/i.test(text)) band += 0.5;
  if (/\b(very very|I am go|I didn't went)\b/i.test(text)) band -= 0.5;
  band = Math.max(4, Math.min(7, band));
  return {
    band,
    fc: band,
    lr: band,
    gra: band - 0.5,
    extra: band,
    notes: [
      n < 40 ? "Câu trả lời quá ngắn cho band 8. Kéo thành 4–6 câu." : `Độ dài ổn (${n} từ).`,
      "Thêm 1 ví dụ cụ thể (năm, chỗ, người).",
      "Kiểm tra thì quá khứ nếu có mốc thời gian.",
    ],
  };
}

export async function POST(req: Request) {
  const body = (await req.json()) as {
    action: "write" | "speak" | "coach";
    text?: string;
    prompt?: string;
    min?: number;
    history?: string;
  };

  const provider = resolveProvider();

  try {
    if (body.action === "write") {
      if (provider === "mock") {
        return NextResponse.json({ provider, score: heuristicWrite(body.text || "", body.min || 150) });
      }
      const raw = await callLLM(
        `${SYSTEM}
Chấm Writing IELTS. JSON:
{"band":6.5,"fc":6.5,"lr":6,"gra":6.5,"extra":6.5,"notes":["..."],"rewrite":"một đoạn mẫu 80-120 từ"}
extra = Task Achievement hoặc Coherence.`,
        `Prompt: ${body.prompt}\nTối thiểu: ${body.min} từ\nBài:\n${body.text}`,
      );
      return NextResponse.json({ provider, score: extractJSON<Score>(raw) });
    }

    if (body.action === "speak") {
      if (provider === "mock") {
        return NextResponse.json({ provider, score: heuristicSpeak(body.text || "") });
      }
      const raw = await callLLM(
        `${SYSTEM}
Chấm Speaking. extra = Pronunciation (ước lượng từ văn bản). JSON:
{"band":6,"fc":6,"lr":6,"gra":5.5,"extra":6,"notes":["..."],"rewrite":"bản nói mẫu 80-120 từ"}`,
        `Câu hỏi: ${body.prompt}\nHọc viên nói/gõ:\n${body.text}`,
      );
      return NextResponse.json({ provider, score: extractJSON<Score>(raw) });
    }

    const user = body.history
      ? `${body.history}\n\nHọc viên: ${body.text}`
      : String(body.text);
    if (provider === "mock") {
      return NextResponse.json({
        provider,
        content:
          "Mình không chấm suông. Hôm nay làm xong **Hôm nay** rồi mở Words nếu còn thẻ đến hạn. Band 8 đến từ số phút sạch mỗi ngày, không từ mẹo.\n\nNếu đang kẹt thì gửi một câu bạn vừa nói — mình sửa collocation.",
      });
    }
    const content = await callLLM(
      `${SYSTEM} Trò chuyện ngắn. Tối đa 180 từ. Đưa đúng 1 việc làm tiếp theo.`,
      user,
    );
    return NextResponse.json({ provider, content });
  } catch {
    return NextResponse.json({ error: "Gia sư đang bận. Thử lại." }, { status: 502 });
  }
}
