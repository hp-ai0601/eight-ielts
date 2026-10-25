"use client";

import { useState } from "react";
import { METHODS, SKILL_LABEL } from "@/lib/method/skills";
import { TIPS } from "@/lib/method/tips";
import Studio, { Pills, RailPick } from "@/components/Studio";

const SKILLS = ["l", "r", "w", "s", "tip"] as const;

export default function MethodPage() {
  const [skill, setSkill] = useState<(typeof SKILLS)[number]>("l");
  const methods = METHODS.filter((m) => m.skill === skill);
  const items = skill === "tip" ? TIPS : methods;
  const [id, setId] = useState(items[0]?.id ?? "");
  const m = items.find((x) => x.id === id) ?? items[0];

  return (
    <Studio
      title={m?.title ?? "Cách làm đề"}
      kicker={skill === "tip" ? "Mẹo thi" : SKILL_LABEL[skill]}
      next={{ href: "/kho", label: "Kho" }}
      tabs={
        <Pills
          value={skill}
          onChange={(k) => {
            const next = k as (typeof SKILLS)[number];
            setSkill(next);
            const first = next === "tip" ? TIPS[0] : METHODS.find((x) => x.skill === next);
            if (first) setId(first.id);
          }}
          items={[
            ...(["l", "r", "w", "s"] as const).map((k) => ({ id: k, label: SKILL_LABEL[k] })),
            { id: "tip", label: "Mẹo" },
          ]}
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
            <p className="text-sm text-mute">{"format" in m ? m.format : m.why}</p>
            <p className="mt-5 text-xs uppercase tracking-wider text-lime">Nên làm</p>
            <ul className="mt-2 space-y-2 text-sm">
              {m.do.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p className="mt-5 text-xs uppercase tracking-wider text-bad">Đừng làm</p>
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
