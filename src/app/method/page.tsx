"use client";

import { useState } from "react";
import { METHODS, SKILL_LABEL } from "@/lib/method/skills";
import Studio, { Pills, RailPick } from "@/components/Studio";

const SKILLS = ["l", "r", "w", "s"] as const;

export default function MethodPage() {
  const [skill, setSkill] = useState<(typeof SKILLS)[number]>("l");
  const items = METHODS.filter((m) => m.skill === skill);
  const [id, setId] = useState(items[0]?.id ?? "");
  const m = items.find((x) => x.id === id) ?? items[0];

  return (
    <Studio
      title={m?.title ?? "Cách làm đề"}
      kicker={SKILL_LABEL[skill]}
      next={{ href: "/kho", label: "Kho" }}
      tabs={
        <Pills
          value={skill}
          onChange={(k) => {
            const next = k as (typeof SKILLS)[number];
            setSkill(next);
            const first = METHODS.find((x) => x.skill === next);
            if (first) setId(first.id);
          }}
          items={SKILLS.map((k) => ({ id: k, label: SKILL_LABEL[k] }))}
        />
      }
      rail={items.map((x) => (
        <RailPick key={x.id} on={x.id === m?.id} onClick={() => setId(x.id)}>
          <p className="font-serif text-base leading-tight">{x.title}</p>
        </RailPick>
      ))}
      stage={
        m ? (
          <div className="mx-auto max-w-lg">
            <p className="text-sm text-mute">{m.format}</p>
            <p className="mt-5 text-xs uppercase tracking-wider text-lime">Làm</p>
            <ul className="mt-2 space-y-2 text-sm">
              {m.do.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p className="mt-5 text-xs uppercase tracking-wider text-bad">Đừng</p>
            <ul className="mt-2 space-y-2 text-sm text-mute">
              {m.dont.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ) : null
      }
    />
  );
}
