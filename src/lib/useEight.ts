"use client";

import { useEffect, useState } from "react";
import { applyTeacherGrade, load, save, sessionId, type State } from "./store";

export function useEight() {
  const [s, setS] = useState<State | null>(null);

  useEffect(() => {
    const cur = load();
    setS(cur);
    if (sessionId() === "zang") save(cur);
    const on = () => setS(load());
    window.addEventListener("eight", on);
    window.addEventListener("storage", on);
    let off: (() => void) | undefined;
    if (sessionId() === "zang") {
      void import("./live").then((m) => {
        off = m.onGrade((g) => {
          const cur = load();
          const next = applyTeacherGrade(cur, g);
          save(next);
          setS(next);
        });
      });
    }
    return () => {
      window.removeEventListener("eight", on);
      window.removeEventListener("storage", on);
      off?.();
    };
  }, []);

  const commit = (next: State) => {
    save(next);
    setS(next);
  };

  return { s, commit, ready: s !== null };
}
