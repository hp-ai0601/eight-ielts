"use client";

import { useParams, useRouter } from "next/navigation";
import { testById } from "@/lib/bank";
import TestView from "@/components/TestView";
import { load, recordTest } from "@/lib/store";
import { useEight } from "@/lib/useEight";

export default function OneTest() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { s, commit, ready } = useEight();
  const test = testById(id);
  if (!ready || !s) return null;
  if (!test) return <p className="p-10">Không có đề này.</p>;
  return (
    <div className="mx-auto max-w-2xl px-5 py-10 pb-28 lg:px-10">
      <TestView
        test={test}
        onDone={(ok, total) => {
          commit(recordTest(load(), test, ok, total, test.minutes));
          router.push(test.homework ? "/homework" : "/tests");
        }}
      />
    </div>
  );
}
