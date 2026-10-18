"use client";

import type { Check } from "@/lib/zang/check";

export default function ChamCau({ check }: { check: Check }) {
  const good = check.score >= 8;
  return (
    <div className="panel mt-5 p-4">
      <p className="text-xs uppercase tracking-wider text-lime">Chấm cho Zang</p>
      <p className={`mt-2 font-serif text-4xl ${good ? "text-lime" : "text-warn"}`}>{check.score}/10</p>
      {check.spelling.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-warn">Chính tả</p>
          <ul className="mt-1 space-y-1 text-sm">
            {check.spelling.map((x) => (
              <li key={x.from}>
                <span className="line-through text-mute">{x.from}</span>
                {" → "}
                <span className="text-lime">{x.to}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-mute">Sổ chính tả: nhìn từ đúng, che lại, viết 3 lần.</p>
        </div>
      )}
      {check.grammar.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-warn">Ngữ pháp</p>
          <ul className="mt-1 space-y-1 text-sm">
            {check.grammar.map((x) => (
              <li key={x.vi}>— {x.vi}</li>
            ))}
          </ul>
        </div>
      )}
      {check.spelling.length === 0 && check.grammar.length === 0 && (
        <p className="mt-3 text-sm text-lime">Sạch chính tả và ngữ pháp cơ bản. Giữ câu này.</p>
      )}
      <p className="mt-4 text-xs text-mute">Câu sửa</p>
      <p className="mt-1 font-serif text-lg">{check.rewrite}</p>
    </div>
  );
}
