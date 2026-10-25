"use client";

import Link from "next/link";
import { useState } from "react";

type Song = { title: string; artist: string; year: number; why: string; tip: string };

/** Danh sách nhạc Anh kinh điển để luyện nghe.
 *  Ghi chú luyện nghe do Eight tự viết — em tự tìm bài hát trên YouTube/Spotify để nghe,
 *  app không chứa lời bài hát vì bản quyền. */
const SONGS: Song[] = [
  {
    title: "Let It Be",
    artist: "The Beatles",
    year: 1970,
    why: "Tempo chậm, phát âm rõ — bài nhập môn nghe nhạc Anh tốt nhất.",
    tip: "Nghe 3 lần không nhìn lời, lần 4 mở lyrics đối chiếu chỗ mình nghe sai.",
  },
  {
    title: "Hey Jude",
    artist: "The Beatles",
    year: 1968,
    why: "Câu dài, lặp cấu trúc — luyện nghe nhịp câu tiếng Anh.",
    tip: "Chú ý âm cuối 'd' của Jude hay bị nuốt khi hát nhanh.",
  },
  {
    title: "Yesterday",
    artist: "The Beatles",
    year: 1965,
    why: "Hát chậm từng chữ, từ vựng đời thường dễ bắt.",
    tip: "Tập shadowing: hát theo chậm 0.75x rồi tăng dần tốc độ.",
  },
  {
    title: "Imagine",
    artist: "John Lennon",
    year: 1971,
    why: "Giọng Anh chuẩn, câu ngắn, từ vựng về ước mơ và hoà bình.",
    tip: "Gạch chân các từ nối âm: 'imagine all' nghe như một cụm dài.",
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    year: 2017,
    why: "Nối âm dày đặc kiểu người Anh nói thật — luyện nghe nâng cao.",
    tip: "Nghe 0.75x trước để tách từng chữ, vì bản gốc nói rất nhanh.",
  },
  {
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    year: 2014,
    why: "Ballad chậm, ngữ pháp tương lai và hiện tại tiếp diễn đầy trong bài.",
    tip: "Để ý 'will be loving' — thì tương lai tiếp diễn trong văn nói.",
  },
  {
    title: "Someone Like You",
    artist: "Adele",
    year: 2011,
    why: "Giọng London rõ chữ, cảm xúc mạnh giúp nhớ từ lâu.",
    tip: "Nghe cách Adele nhấn trọng âm vào từ mang cảm xúc — học theo khi nói.",
  },
  {
    title: "Hello",
    artist: "Adele",
    year: 2015,
    why: "Mở đầu chậm, phù hợp nghe chép chính tả từng câu.",
    tip: "Chép tay 4 câu đầu rồi đối chiếu — luyện cả nghe lẫn chính tả.",
  },
  {
    title: "Rolling in the Deep",
    artist: "Adele",
    year: 2010,
    why: "Nhịp mạnh, luyện bắt âm tiết trong câu dài.",
    tip: "Vỗ tay theo nhịp để cảm nhận âm nào được nhấn.",
  },
  {
    title: "Fix You",
    artist: "Coldplay",
    year: 2005,
    why: "Từ vựng an ủi, chữa lành — hữu ích cho chủ đề cảm xúc.",
    tip: "Học cụm 'lights will guide you home' như một thành ngữ riêng.",
  },
  {
    title: "Yellow",
    artist: "Coldplay",
    year: 2000,
    why: "Câu ngắn lặp lại nhiều — dễ thuộc, dễ hát theo.",
    tip: "Chú ý âm /j/ đầu 'yellow' và 'you' nghe gần nhau thế nào.",
  },
  {
    title: "The Scientist",
    artist: "Coldplay",
    year: 2002,
    why: "Tempo chậm đều, giọng nam trầm dễ bắt chữ.",
    tip: "Nghe kỹ 'numbers and figures' — cụm danh từ ghép rất tự nhiên.",
  },
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    year: 1975,
    why: "Nhiều tông giọng trong một bài — luyện tai với mọi kiểu hát.",
    tip: "Không cần hiểu hết — chọn 1 đoạn 30 giây nghe đi nghe lại tới khi thuộc.",
  },
  {
    title: "We Are the Champions",
    artist: "Queen",
    year: 1977,
    why: "Phát âm hùng hồn, rõ ràng — tốt cho luyện nói tự tin.",
    tip: "Học cách nhấn 'champions' — trọng âm rơi âm đầu, kéo dài âm cuối.",
  },
  {
    title: "Your Song",
    artist: "Elton John",
    year: 1970,
    why: "Lời mộc mạc như nói chuyện — từ vựng đời thường chất lượng.",
    tip: "Đếm xem có bao nhiêu câu dùng thì hiện tại đơn.",
  },
  {
    title: "Rocket Man",
    artist: "Elton John",
    year: 1972,
    why: "Chủ đề vũ trụ, từ vựng khoa học viễn tưởng dễ nhớ.",
    tip: "Phân biệt 'rocket' /ˈrɒkɪt/ và 'rock it' — cặp hay nhầm.",
  },
  {
    title: "My Way",
    artist: "Frank Sinatra (bản UK nổi tiếng của Elvis tại Anh)",
    year: 1969,
    why: "Hát như kể chuyện — luyện nghe văn nói tự sự.",
    tip: "Nghe kỹ cách lên xuống giọng cuối câu — đó là ngữ điệu tự nhiên.",
  },
  {
    title: "Angels",
    artist: "Robbie Williams",
    year: 1997,
    why: "Quốc ca karaoke nước Anh — phát âm chuẩn, dễ hát theo.",
    tip: "Chú ý nối âm 'an angel' nghe như 'a-nan-gel'.",
  },
  {
    title: "Wannabe",
    artist: "Spice Girls",
    year: 1996,
    why: "Nhanh và vui — luyện nghe nói nhanh kiểu bạn bè.",
    tip: "Bật 0.75x tách chữ trước, sau đó thử rap theo bản gốc.",
  },
  {
    title: "Viva la Vida",
    artist: "Coldplay",
    year: 2008,
    why: "Từ vựng lịch sử, quyền lực — bổ sung vốn từ học thuật.",
    tip: "Tra nghĩa 'revolutionaries', 'missionaries' trước khi nghe.",
  },
  {
    title: "Chasing Cars",
    artist: "Snow Patrol",
    year: 2006,
    why: "Chậm, ít chữ, lặp nhiều — nhập môn cho người mới.",
    tip: "Bài này gần như không có nối âm khó — nghe để tự tin trước đã.",
  },
  {
    title: "Wonderwall",
    artist: "Oasis",
    year: 1995,
    why: "Giọng Manchester đặc trưng — làm quen accent vùng miền.",
    tip: "So sánh cách phát âm 'maybe' ở đây với giọng Mỹ em vẫn nghe.",
  },
  {
    title: "Don't Look Back in Anger",
    artist: "Oasis",
    year: 1996,
    why: "Câu dài có nhịp — luyện nghe cụm từ ghép.",
    tip: "Học cụm 'look back in anger' như một đơn vị, đừng dịch từng chữ.",
  },
  {
    title: "A Thousand Years",
    artist: "Christina Perri (hit lớn tại UK)",
    year: 2011,
    why: "Hát chậm rõ từng âm — tốt cho nghe chép chính tả.",
    tip: "Chú ý thì hiện tại hoàn thành 'I have loved' trong lời.",
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    year: 2017,
    why: "Ballad chậm, từ vựng tình cảm — dễ thuộc lòng.",
    tip: "Nghe cách 'dancing in the dark' nối âm thành một dải liền.",
  },
];

export default function SongsPage() {
  const [pick, setPick] = useState<Song | null>(null);
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-8 lg:px-10 lg:py-12">
      <p className="text-sm text-lime">Học qua nhạc Anh · {SONGS.length} bài kinh điển</p>
      <h1 className="mt-2 font-serif text-4xl leading-none lg:text-5xl">Nghe nhạc mà học tiếng Anh.</h1>
      <p className="mt-3 max-w-xl text-sm text-mute">
        Vì bản quyền nên app không chứa lời bài hát — em bấm nút để tìm bài trên YouTube, nghe theo gợi ý của từng
        bài. Cách học: nghe 2–3 lần không nhìn lời, sau đó mở lyrics đối chiếu, chép tay câu hay, hát theo.
      </p>
      {pick && (
        <div className="panel mt-6 border-lime/40 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-serif text-2xl">{pick.title}</p>
              <p className="mt-1 text-sm text-mute">
                {pick.artist} · {pick.year}
              </p>
            </div>
            <button className="btn-ghost !px-3 !py-1.5 text-xs" onClick={() => setPick(null)}>
              Đóng
            </button>
          </div>
          <p className="mt-3 text-sm">
            <span className="text-lime">Vì sao nên nghe:</span> {pick.why}
          </p>
          <p className="mt-2 text-sm">
            <span className="text-lime">Mẹo luyện:</span> {pick.tip}
          </p>
          <a
            className="btn-lime mt-4 inline-block"
            target="_blank"
            rel="noreferrer"
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${pick.title} ${pick.artist} lyrics`)}`}
          >
            Tìm bài trên YouTube
          </a>
        </div>
      )}
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {SONGS.map((x) => (
          <li key={x.title}>
            <button onClick={() => setPick(x)} className="panel block w-full p-5 text-left transition hover:border-lime">
              <p className="font-serif text-xl leading-tight">{x.title}</p>
              <p className="mt-1 text-sm text-mute">
                {x.artist} · {x.year}
              </p>
              <p className="mt-2 line-clamp-2 text-sm text-mute">{x.why}</p>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-10 text-sm text-mute">
        Muốn luyện thêm thì vào <Link className="text-lime" href="/kho">Kho</Link> nhé.
      </p>
    </div>
  );
}
