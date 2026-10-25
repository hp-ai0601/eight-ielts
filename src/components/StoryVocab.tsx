"use client";

import { glossIn } from "@/lib/gloss";
import Hear from "@/components/Hear";

/** Dải từ vựng trong mẩu truyện: từ (nghĩa) + IPA + nghe + mẹo đồng âm. */
export default function StoryVocab({ en }: { en: string }) {
  const gs = glossIn(en);
  if (!gs.length) return null;
  return (
    <div className="rounded-xl border border-line p-3">
      <p className="text-[11px] uppercase tracking-wider text-mute">Từ trong mẩu — dịch trong ngoặc</p>
      <div className="mt-2 space-y-2">
        {gs.map((g) => (
          <div key={g.word} className="flex items-start justify-between gap-3 text-sm">
            <div className="min-w-0">
              <p>
                <span className="font-semibold text-lime">{g.word}</span> <span className="text-mute">{g.ipa}</span> — {g.vi}
              </p>
              {g.mn && (
                <p className="mt-0.5 text-xs text-mute">
                  Mẹo nhớ: «{g.mn.sound}» — {g.mn.img} <span className="italic">(mẹo nhớ, không phải cách đọc)</span>
                </p>
              )}
            </div>
            <Hear text={g.word} />
          </div>
        ))}
      </div>
    </div>
  );
}
