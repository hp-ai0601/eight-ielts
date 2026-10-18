"use client";

import { speak } from "@/lib/speech";

export default function Hear({
  text,
  rate = 0.9,
  label = "Nghe",
  className = "",
}: {
  text: string;
  rate?: number;
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-line px-3 text-xs hover:border-lime ${className}`}
      aria-label={`Nghe ${text}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        speak(text, rate);
      }}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
        <path d="M4 9v6h3.2L12 19.8V4.2L7.2 9H4zm12.2 3A4.8 4.8 0 0 0 14 8.3v7.4a4.8 4.8 0 0 0 2.2-3.7zm2.6 0a7.4 7.4 0 0 0-3.4-6.3v2.2a5.2 5.2 0 0 1 0 8.2v2.2a7.4 7.4 0 0 0 3.4-6.3z" />
      </svg>
      {label}
    </button>
  );
}
