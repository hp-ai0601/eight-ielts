"use client";

import { useEight } from "@/lib/useEight";
import HaiNhac from "@/components/zang/HaiNhac";

export default function HaiPage() {
  const { s, commit, ready } = useEight();
  if (!ready || !s) return null;
  return <HaiNhac s={s} onDone={commit} />;
}
