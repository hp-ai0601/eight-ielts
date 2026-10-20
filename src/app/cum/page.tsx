"use client";

import { useEight } from "@/lib/useEight";
import CumTruyen from "@/components/zang/CumTruyen";

export default function CumPage() {
  const { s, commit, ready } = useEight();
  if (!ready || !s) return null;
  return <CumTruyen s={s} onDone={commit} />;
}
