"use client";

import { useParams, useRouter } from "next/navigation";
import { lessonById } from "@/lib/content";
import { addCardsFromLesson, completeLesson } from "@/lib/store";
import { useEight } from "@/lib/useEight";
import LessonView from "@/components/LessonView";

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { s, commit, ready } = useEight();
  const lesson = lessonById(id);
  if (!ready || !s) return null;
  if (!lesson) return <p className="p-10">Không tìm thấy bài học này.</p>;
  return (
    <div className="mx-auto max-w-2xl px-5 py-10 pb-28 lg:px-10">
      <LessonView
        lesson={lesson}
        onComplete={({ minutes, skillBand, skill }) => {
          let next = addCardsFromLesson(s, lesson);
          next = completeLesson(next, lesson, minutes, skill && skillBand ? { [skill]: skillBand } : undefined);
          commit(next);
          router.push("/");
        }}
      />
    </div>
  );
}
