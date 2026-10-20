"use client";

import { useState } from "react";
import { GRAMMAR } from "@/lib/method/grammar";
import Quiz from "@/components/Quiz";
import { addError, recordPractice } from "@/lib/store";
import { useEight } from "@/lib/useEight";
import Studio, { RailPick } from "@/components/Studio";

export default function GrammarPage() {
  const { s, commit, ready } = useEight();
  const [open, setOpen] = useState(GRAMMAR[0].id);
  if (!ready || !s) return null;
  const u = GRAMMAR.find((x) => x.id === open) ?? GRAMMAR[0];

  return (
    <Studio
      title={u.title.split(":")[0]}
      kicker={u.band}
      next={{ href: "/kho", label: "Kho" }}
      rail={GRAMMAR.map((g) => (
        <RailPick key={g.id} on={open === g.id} onClick={() => setOpen(g.id)}>
          <p className="font-serif text-base leading-tight">{g.title.split(":")[0]}</p>
          <p className="mt-0.5 text-[11px] text-mute">{g.band}</p>
        </RailPick>
      ))}
      stage={
        <div className="mx-auto max-w-lg pb-8">
          <p className="text-sm text-bad">{u.vnTrap}</p>
          <p className="mt-4 leading-7">{u.rule}</p>
          <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-mute">
            {u.steps.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
          <div className="mt-8">
            <Quiz
              key={u.id}
              questions={u.questions}
              onDone={(ok) => {
                let next = recordPractice(s, 8, { w: s.profile.bands.w + (ok >= u.questions.length - 1 ? 0.1 : 0) });
                if (ok < u.questions.length) next = addError(next, "g", `${u.title}: ${ok}/${u.questions.length}`);
                commit(next);
              }}
            />
          </div>
        </div>
      }
    />
  );
}
