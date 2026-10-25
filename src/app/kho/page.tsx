"use client";

import Link from "next/link";

const ITEMS = [
  { href: "/dict", title: "Từ điển", why: "Tra nghĩa Anh–Việt, nghe mẫu, luyện nói theo" },
  { href: "/words", title: "3500 từ", why: "100 chủ đề, mỗi lần học 20 từ" },
  { href: "/irregular", title: "Động từ bất quy tắc", why: "Hơn 200 động từ V1–V2–V3, chia nhóm dễ nhớ" },
  { href: "/idioms", title: "Thành ngữ & châm ngôn", why: "Đời thường, tiền bạc, tu dưỡng — dịch sát nghĩa" },
  { href: "/grammar", title: "Ngữ pháp", why: "Hơn 40 bài, từ các thì đến câu phức band 8" },
  { href: "/method", title: "Cách làm đề + mẹo", why: "Cách làm TFNG, Task 1, phát âm, quản lý thời gian" },
  { href: "/tests", title: "Ngân hàng đề", why: "101 chủ đề và đề thi thử" },
  { href: "/path", title: "Lộ trình 8.0", why: "84 bài học theo từng mức" },
  { href: "/homework", title: "Bài tập về nhà", why: "Bài thầy đang giao" },
  { href: "/exam", title: "Thi thử", why: "Có bấm giờ, chấm band" },
  { href: "/coach", title: "Gia sư", why: "Hỏi khi bí" },
];

export default function KhoPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-8 lg:px-10 lg:py-12">
      <p className="text-sm text-lime">Kho học liệu · thích thì vào, không bắt buộc</p>
      <h1 className="mt-2 font-serif text-4xl leading-none lg:text-5xl">Đủ thứ để luyện — nhưng hôm nay cứ theo bốn bước đã.</h1>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {ITEMS.map((x) => (
          <li key={x.href}>
            <Link href={x.href} className="panel block p-5 transition hover:border-lime">
              <p className="font-serif text-2xl leading-none">{x.title}</p>
              <p className="mt-2 text-sm text-mute">{x.why}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
