"use client";

import { levelOf } from "@/lib/stars";

/** Cây tiến độ: càng nhiều sao cây càng lớn — từ mầm non tới cây sai quả.
 *  Vẽ bằng SVG, cấp càng cao thân càng cao, tán càng rộng, cuối cùng kết trái. */
export default function GrowTree({ stars }: { stars: number }) {
  const lv = levelOf(stars);
  const stage = lv.index; // 0..6
  const t = stage / 6; // 0..1

  const trunkH = 14 + t * 46;
  const trunkW = 2.5 + t * 3.5;
  const crownR = 6 + t * 22;
  const cx = 60;
  const groundY = 96;
  const topY = groundY - trunkH;
  const fruits = stage >= 5 ? Math.min(8, (stage - 4) * 4) : 0;

  // vị trí quả rải quanh tán
  const fruitPos = Array.from({ length: fruits }, (_, i) => {
    const a = (i / Math.max(fruits, 1)) * Math.PI * 2 + 0.6;
    return { x: cx + Math.cos(a) * crownR * 0.62, y: topY + Math.sin(a) * crownR * 0.62 };
  });

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 120 100" className="h-24 w-28 shrink-0" aria-label={`Cây tiến độ giai đoạn ${stage + 1}`}>
        {/* mặt đất */}
        <line x1="8" y1={groundY} x2="112" y2={groundY} stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
        {/* thân */}
        <rect x={cx - trunkW / 2} y={topY} width={trunkW} height={trunkH} rx={trunkW / 2} fill="#8b5e3c" />
        {/* tán lá: mầm thì chỉ 1 chấm nhỏ, càng lớn càng nhiều tầng */}
        {stage === 0 ? (
          <circle cx={cx} cy={topY - 3} r="4" fill="#a3e635" />
        ) : (
          <>
            <circle cx={cx} cy={topY - crownR * 0.55} r={crownR * 0.72} fill="#65a30d" opacity="0.9" />
            <circle cx={cx - crownR * 0.45} cy={topY - crownR * 0.1} r={crownR * 0.5} fill="#84cc16" opacity="0.85" />
            <circle cx={cx + crownR * 0.45} cy={topY - crownR * 0.08} r={crownR * 0.5} fill="#84cc16" opacity="0.85" />
          </>
        )}
        {/* quả */}
        {fruitPos.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.6" fill="#f87171" />
        ))}
      </svg>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-lime">Cây của em · giai đoạn {stage + 1}/7</p>
        <p className="mt-1 text-sm text-mute">
          {stage === 0 && "Mới gieo mầm — mỗi ngày học là một giọt nước."}
          {stage === 1 && "Mầm đã nhú — giữ nhịp đều là cây lên nhanh."}
          {stage === 2 && "Cây con vươn cao — rễ đang đâm sâu đấy."}
          {stage === 3 && "Cành lá sum suê — vốn từ của em đang xum xuê."}
          {stage === 4 && "Cây đứng vững — gió nào cũng qua được."}
          {stage === 5 && "Bắt đầu kết trái — công sức đang chín dần."}
          {stage === 6 && "Cây sai quả — vườn này là của em trồng."}
        </p>
      </div>
    </div>
  );
}
