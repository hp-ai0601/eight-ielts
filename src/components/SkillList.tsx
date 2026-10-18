"use client";

import Link from "next/link";
import type { Lesson } from "@/lib/content";

export default function SkillList({ items }: { items: Lesson[] }) {
  const groups = new Map<string, Lesson[]>();
  for (const l of items) {
    const g = l.topic || "khác";
    groups.set(g, [...(groups.get(g) ?? []), l]);
  }
  return (
    <div className="mt-8 space-y-8">
      {[...groups.entries()].map(([topic, ls]) => (
        <section key={topic}>
          <p className="text-xs uppercase tracking-wider text-lime">{topic}</p>
          <ul className="mt-3 space-y-2">
            {ls.map((l) => (
              <li key={l.id} className="panel p-4">
                <Link href={`/lesson/${l.id}`} className="block">
                  <p className="font-medium">{l.title}</p>
                  <p className="text-sm text-mute">
                    {l.kicker} · {l.minutes}′
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
