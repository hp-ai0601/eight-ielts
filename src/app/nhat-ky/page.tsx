"use client";

import { useEight } from "@/lib/useEight";
import NhatKy from "@/components/zang/NhatKy";

export default function NhatKyPage() {
  const { s, commit, ready } = useEight();
  if (!ready || !s) return null;
  return <NhatKy s={s} onDone={commit} />;
}
