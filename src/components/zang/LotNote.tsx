"use client";

export default function LotNote({
  lot,
  count,
  unit,
  onBump,
}: {
  lot: number;
  count: number;
  unit: string;
  onBump: () => void;
}) {
  return (
    <div>
      <p className="text-sm text-mute">
        {count} {unit}. Đây là <span className="text-lime">đợt {lot + 1} hôm nay</span> — không phải bài {lot + 1} trên
        10. Muốn bộ khác thì bấm nút dưới, không cần đợi mai. Nửa đêm tự đổi bộ mới.
      </p>
      <button type="button" className="btn-ghost mt-3 text-xs" onClick={onBump}>
        Đổi {count} {unit} khác
      </button>
    </div>
  );
}
