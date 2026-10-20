"use client";

import Link from "next/link";

const ITEMS = [
  { href: "/words", title: "3500 từ", why: "100 chủ đề, 20 từ một lần" },
  { href: "/grammar", title: "Ngữ pháp", why: "40+ đơn vị · thì đến câu phức band 8" },
  { href: "/method", title: "Cách làm đề + mẹo", why: "TFNG, Task 1, Pron, đồng hồ" },
  { href: "/tests", title: "Ngân hàng đề", why: "101 chủ đề + mock" },
  { href: "/path", title: "Lộ trình 8.0", why: "84 bài theo tầng" },
  { href: "/homework", title: "BTVN", why: "Bài đang mở" },
  { href: "/exam", title: "Thi", why: "Đồng hồ, đổi điểm" },
  { href: "/coach", title: "Gia sư", why: "Hỏi khi kẹt" },
];

export default function KhoPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-8 lg:px-10 lg:py-12">
      <p className="text-sm text-lime">Kho · khi muốn, không bắt buộc</p>
      <h1 className="mt-2 font-serif text-4xl leading-none lg:text-5xl">Để đây. Đừng nhảy đề hôm nay.</h1>
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
