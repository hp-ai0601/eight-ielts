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
        {count} {unit}. Đây là <span className="text-lime">đợt {lot + 1} của hôm nay</span> — làm xong muốn luyện thêm thì
        bấm nút dưới để đổi bộ mới, không cần đợi đến mai. Qua nửa đêm app cũng tự đổi bộ.
      </p>
      <button type="button" className="btn-ghost mt-3 text-xs" onClick={onBump}>
        Đổi {count} {unit} khác
      </button>
    </div>
  );
}
