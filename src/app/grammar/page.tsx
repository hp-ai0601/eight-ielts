"use client";

import { useState } from "react";
import { GRAMMAR } from "@/lib/method/grammar";
import Quiz from "@/components/Quiz";
import PlayBar from "@/components/PlayBar";
import { addError, recordPractice } from "@/lib/store";
import { useEight } from "@/lib/useEight";

export default function GrammarPage() {
  const { s, commit, ready } = useEight();
  const [open, setOpen] = useState(GRAMMAR[0].id);
  const [filled, setFilled] = useState(0);
  if (!ready || !s) return null;
  const u = GRAMMAR.find((x) => x.id === open) ?? GRAMMAR[0];

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 pb-28 lg:px-10">
      <h1 className="font-serif text-4xl">Ngữ pháp</h1>
      <p className="mt-3 text-mute">
        Luật trước, bài sau. Mỗi mục: lỗi người Việt, cách làm, quiz. Band 8 không phải từ khó — là ít lỗi làm
        giám khảo hiểu sai.
      </p>
      <div className="mt-6 flex flex-wrap gap-1.5">
        {GRAMMAR.map((g) => (
          <button
            key={g.id}
            className={`rounded-full px-3 py-1.5 text-xs ${open === g.id ? "bg-lime text-bg" : "border border-line text-mute"}`}
            onClick={() => {
              setOpen(g.id);
              setFilled(0);
            }}
          >
            {g.title.split(":")[0]}
          </button>
        ))}
      </div>
      <article className="mt-8 pb-28">
        <p className="text-xs uppercase tracking-wider text-lime">
          {u.band}
        </p>
        <h2 className="mt-2 text-2xl font-semibold">{u.title}</h2>
        <p className="mt-3 text-sm text-bad">{u.vnTrap}</p>
        <p className="mt-4 leading-7">{u.rule}</p>
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-mute">
          {u.steps.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ol>
        <Quiz
          key={u.id}
          questions={u.questions}
          onFilled={setFilled}
          onDone={(ok) => {
            let next = recordPractice(s, 8, { w: s.profile.bands.w + (ok >= u.questions.length - 1 ? 0.1 : 0) });
            if (ok < u.questions.length) next = addError(next, "g", `${u.title}: ${ok}/${u.questions.length}`);
            commit(next);
          }}
        />
      </article>
      <PlayBar key={u.id} minutes={10} answered={filled} total={u.questions.length} />
    </div>
  );
}
