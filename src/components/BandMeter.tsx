import { SKILL_LABEL, overall, type Skill } from "@/lib/ielts";
import type { Bands } from "@/lib/store";

export default function BandMeter({ bands }: { bands: Bands }) {
  const o = overall(bands);
  const skills: Skill[] = ["l", "r", "w", "s"];
  return (
    <div className="panel p-5">
      <p className="text-xs uppercase tracking-wider text-mute">Ước lượng hiện tại</p>
      <p className="mt-2 font-serif text-5xl">{o.toFixed(1)}</p>
      <p className="mt-1 text-sm text-mute">mục tiêu 8.0 · không phải điểm thi chính thức</p>
      <ul className="mt-6 space-y-3">
        {skills.map((k) => (
          <li key={k}>
            <div className="mb-1 flex justify-between text-xs text-mute">
              <span>{SKILL_LABEL[k]}</span>
              <span>{bands[k].toFixed(1)}</span>
            </div>
            <div className="h-1 rounded-full bg-line">
              <div className="h-1 rounded-full bg-lime" style={{ width: `${(bands[k] / 9) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
