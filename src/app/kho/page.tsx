"use client";

import Link from "next/link";

const GROUPS: { name: string; hint: string; items: { href: string; title: string; why: string }[] }[] = [
  {
    name: "Học chính",
    hint: "Đi theo lộ trình là đủ — mấy mục dưới để luyện thêm",
    items: [
      { href: "/path", title: "Lộ trình 8.0", why: "84 bài học, mở khóa tuần tự — bắt đầu từ đây" },
      { href: "/gquiz", title: "Quiz ngữ pháp 3 mức", why: "12 chủ đề, mỗi chủ đề Dễ – Vừa – Khó" },
      { href: "/grammar", title: "Ngữ pháp", why: "Hơn 40 bài giải quy tắc, từ các thì đến câu phức" },
      { href: "/homework", title: "Bài tập về nhà", why: "Bài thầy đang giao" },
    ],
  },
  {
    name: "Từ vựng",
    hint: "Kho 5.000 từ tự viết, học theo chủ đề",
    items: [
      { href: "/words", title: "Kho từ theo chủ đề", why: "100 chủ đề, mỗi lần học 20 từ" },
      { href: "/dict", title: "Từ điển", why: "Tra nghĩa Anh–Việt, nghe mẫu, luyện nói theo" },
      { href: "/irregular", title: "Động từ bất quy tắc", why: "Hơn 200 động từ V1–V2–V3, chia nhóm dễ nhớ" },
      { href: "/idioms", title: "Thành ngữ & châm ngôn", why: "Đời thường, tiền bạc, tu dưỡng — dịch sát nghĩa" },
      { href: "/songs", title: "Học qua nhạc Anh", why: "24 bài kinh điển kèm mẹo luyện nghe từng bài" },
    ],
  },
  {
    name: "Luyện thi IELTS",
    hint: "Khi nào thầy cho luyện đề thì vào đây",
    items: [
      { href: "/tests", title: "Ngân hàng đề", why: "101 chủ đề và đề thi thử" },
      { href: "/exam", title: "Thi thử", why: "Có bấm giờ, chấm band" },
      { href: "/method", title: "Cách làm đề + mẹo", why: "Cách làm TFNG, Task 1, phát âm, quản lý thời gian" },
    ],
  },
  {
    name: "Công cụ",
    hint: "Trợ giúp khi bí",
    items: [{ href: "/coach", title: "Gia sư", why: "Hỏi khi bí" }],
  },
];

export default function KhoPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-8 lg:px-10 lg:py-12">
      <p className="text-sm text-lime">Kho học liệu</p>
      <h1 className="mt-2 font-serif text-4xl leading-none lg:text-5xl">Mọi thứ để luyện, xếp theo nhóm.</h1>
      {GROUPS.map((g) => (
        <div key={g.name} className="mt-10">
          <p className="text-xs uppercase tracking-wider text-lime">{g.name}</p>
          <p className="mt-1 text-sm text-mute">{g.hint}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {g.items.map((x) => (
              <li key={x.href}>
                <Link href={x.href} className="panel block p-5 transition hover:border-lime">
                  <p className="font-serif text-2xl leading-none">{x.title}</p>
                  <p className="mt-2 text-sm text-mute">{x.why}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
