"use client";

import { useRef, useState } from "react";

export default function Recorder() {
  const rec = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [url, setUrl] = useState<string | null>(null);
  const [on, setOn] = useState(false);
  const [err, setErr] = useState("");

  async function start() {
    setErr("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunks.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size) chunks.current.push(e.data);
      };
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks.current, { type: mr.mimeType || "audio/webm" });
        setUrl(URL.createObjectURL(blob));
      };
      rec.current = mr;
      mr.start();
      setOn(true);
    } catch {
      setErr("Cho phép micro rồi bấm lại. Trên điện thoại dùng Chrome/Safari.");
    }
  }

  function stop() {
    rec.current?.stop();
    setOn(false);
  }

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {!on ? (
          <button className="btn-lime" onClick={start}>
            Ghi âm lại
          </button>
        ) : (
          <button className="btn-ghost" onClick={stop}>
            Dừng
          </button>
        )}
      </div>
      {err && <p className="mt-2 text-sm text-bad">{err}</p>}
      {url && (
        <audio className="mt-3 w-full" controls src={url}>
          Ghi âm
        </audio>
      )}
    </div>
  );
}
