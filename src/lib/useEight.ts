"use client";

import { useEffect, useState } from "react";
import { load, save, type State } from "./store";

export function useEight() {
  const [s, setS] = useState<State | null>(null);

  useEffect(() => {
    setS(load());
    const on = () => setS(load());
    window.addEventListener("eight", on);
    window.addEventListener("storage", on);
    return () => {
      window.removeEventListener("eight", on);
      window.removeEventListener("storage", on);
    };
  }, []);

  const commit = (next: State) => {
    save(next);
    setS(next);
  };

  return { s, commit, ready: s !== null };
}
