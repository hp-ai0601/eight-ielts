"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="px-8 py-24">
      <h1 className="font-serif text-3xl">Studio gặp lỗi.</h1>
      <p className="mt-3 max-w-xl text-sm text-mute">{error.message}</p>
      <button className="btn-lime mt-6" onClick={reset}>
        Thử lại
      </button>
    </div>
  );
}
