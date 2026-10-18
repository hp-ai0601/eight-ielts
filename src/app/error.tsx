"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="px-8 py-24">
      <h1 className="font-serif text-3xl">Studio gặp lỗi.</h1>
      <button className="btn-lime mt-6" onClick={reset}>
        Thử lại
      </button>
    </div>
  );
}
