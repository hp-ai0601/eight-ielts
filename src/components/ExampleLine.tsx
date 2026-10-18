"use client";

import { glossVi, grammarOf } from "@/lib/example";

export default function ExampleLine({
  en,
  vi,
  grammar,
}: {
  en: string;
  vi?: string;
  grammar?: string;
}) {
  const trans = (vi && vi.trim()) || glossVi(en);
  const g = (grammar && grammar.trim()) || grammarOf(en);
  return (
    <div className="mt-2">
      <p className="font-serif text-[15.5px] leading-7">{en}</p>
      {trans && <p className="mt-1 text-sm">{trans}</p>}
      {g && <p className="mt-1 text-xs text-lime">{g}</p>}
    </div>
  );
}
