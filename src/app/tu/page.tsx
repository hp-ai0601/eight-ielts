"use client";

import { useEight } from "@/lib/useEight";
import TuCau from "@/components/zang/TuCau";

export default function TuPage() {
  const { s, commit, ready } = useEight();
  if (!ready || !s) return null;
  return <TuCau s={s} onDone={commit} />;
}
