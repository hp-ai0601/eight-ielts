"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { lessonById, lessonUnlocked, prevLessonId } from "@/lib/content";
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
  const done = s.profile.completed.includes(lesson.id);
  if (!done && !lessonUnlocked(lesson.id, s.profile.completed)) {
    const prev = prevLessonId(lesson.id);
    const prevLesson = prev ? lessonById(prev) : null;
    return (
      <div className="mx-auto max-w-lg px-5 py-16">
        <p className="text-3xl">🔒</p>
        <p className="mt-4 font-serif text-2xl">Bài này chưa mở</p>
        <p className="mt-2 text-sm text-mute">
          Học theo lộ trình: hoàn thành bài trước để mở khóa bài này.
        </p>
        {prevLesson && (
          <Link href={`/lesson/${prev}`} className="btn-lime mt-6 inline-block">
            Học bài trước: {prevLesson.title}
          </Link>
        )}
        <Link href="/path" className="btn-ghost mt-3 inline-block">
          Về lộ trình
        </Link>
      </div>
    );
  }
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
