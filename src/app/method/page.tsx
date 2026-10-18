"use client";

import { useState } from "react";
import Link from "next/link";
import { METHODS, SKILL_LABEL } from "@/lib/method/skills";

const SKILLS = ["l", "r", "w", "s"] as const;

export default function MethodPage() {
  const [skill, setSkill] = useState<(typeof SKILLS)[number]>("l");
  const items = METHODS.filter((m) => m.skill === skill);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 lg:px-10">
      <h1 className="font-serif text-4xl">Cách làm bài</h1>
      <p className="mt-3 text-mute">
        Từng dạng đề Academic: làm gì trước khi băng chạy / trước khi viết, bẫy nào, đừng làm gì. Ngữ pháp nằm ở{" "}
        <Link className="text-lime" href="/grammar">
          Ngữ pháp
        </Link>
        . Đề để luyện:{" "}
        <Link className="text-lime" href="/tests">
          Ngân hàng đề
        </Link>
        .
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {SKILLS.map((k) => (
          <button
            key={k}
            className={`rounded-full px-4 py-2 text-sm ${skill === k ? "bg-lime text-bg" : "border border-line text-mute"}`}
            onClick={() => setSkill(k)}
          >
            {SKILL_LABEL[k]}
          </button>
        ))}
      </div>
      <div className="mt-8 space-y-4">
        {items.map((m) => (
          <article key={m.id} className="panel p-5">
            <h2 className="text-lg font-semibold">{m.title}</h2>
            <p className="mt-2 text-sm text-mute">{m.format}</p>
            <p className="mt-4 text-xs uppercase tracking-wider text-lime">Làm</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {m.do.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs uppercase tracking-wider text-bad">Đừng</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-mute">
              {m.dont.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
