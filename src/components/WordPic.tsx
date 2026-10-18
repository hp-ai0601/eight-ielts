"use client";

import { useEffect, useState } from "react";
import { picEmoji, resolvePic } from "@/lib/pic";
import type { Pos } from "@/lib/pos";

const BOX = {
  thumb: "h-14 w-20",
  sm: "h-28 w-full",
  md: "h-44 w-full",
  lg: "h-56 w-full",
} as const;

export default function WordPic({
  word,
  vi,
  pos,
  size = "sm",
  className = "",
}: {
  word: string;
  vi?: string;
  pos?: Pos;
  size?: keyof typeof BOX;
  className?: string;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const emoji = picEmoji(word, pos);

  useEffect(() => {
    let on = true;
    setSrc(null);
    void resolvePic(word, vi).then((url) => {
      if (on && url) setSrc(url);
    });
    return () => {
      on = false;
    };
  }, [word, vi]);

  return (
    <div className={`relative overflow-hidden rounded-xl bg-line/40 ${BOX[size]} ${className}`}>
      <span
        className={`absolute inset-0 grid place-items-center ${size === "thumb" ? "text-2xl" : "text-5xl"}`}
        aria-hidden
      >
        {emoji}
      </span>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="relative z-10 h-full w-full object-cover"
          onError={() => setSrc(null)}
        />
      )}
    </div>
  );
}
