"use client";

import { useEffect, useState } from "react";
import { ACCENTS, getAccent, setAccent, speak, type Accent } from "@/lib/speech";

export default function AccentPick({ compact = false }: { compact?: boolean }) {
  const [a, setA] = useState<Accent>("gb");
  useEffect(() => setA(getAccent()), []);
  return (
    <div className="flex items-center gap-1">
      {!compact && <span className="mr-1 text-[10px] uppercase tracking-wider text-mute">Giọng</span>}
      {ACCENTS.map((x) => (
        <button
          key={x.id}
          onClick={() => {
            setAccent(x.id);
            setA(x.id);
            speak("Hello! How are you today?");
          }}
          className={`rounded-full px-2.5 py-1 text-[11px] ${
            a === x.id ? "bg-lime text-bg" : "border border-line text-mute hover:text-text"
          }`}
        >
          {x.id === "gb" ? "Anh" : x.id === "us" ? "Mỹ" : "Úc"}
        </button>
      ))}
    </div>
  );
}
