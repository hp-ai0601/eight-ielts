"use client";

import Link from "next/link";

const ITEMS = [
  { href: "/words", title: "3500 từ", why: "Kho từ đủ chủ đề. Học 20 từ khi muốn nhồi." },
  { href: "/grammar", title: "Ngữ pháp lý thuyết", why: "Thì, mạo từ, câu phức — khi cụm truyện chưa đủ." },
  { href: "/method", title: "Cách làm đề IELTS", why: "TFNG, Task 1, Part 2… khi sắp thi." },
  { href: "/tests", title: "Ngân hàng đề", why: "101 chủ đề, mock Academic." },
  { href: "/path", title: "Lộ trình 8.0", why: "84 bài theo tầng." },
  { href: "/homework", title: "BTVN", why: "Bài thầy/app giao." },
  { href: "/exam", title: "Thi", why: "Đồng hồ, đổi raw score." },
  { href: "/coach", title: "Gia sư", why: "Hỏi khi kẹt." },
];

export default function KhoPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-10 lg:px-10">
      <h1 className="font-serif text-4xl">Kho</h1>
      <p className="mt-3 text-mute">Để đây cho khỏi che bốn bước mỗi ngày. Vào khi em muốn, không bắt buộc.</p>
      <ul className="mt-8 space-y-2">
        {ITEMS.map((x) => (
          <li key={x.href} className="panel p-4">
            <Link href={x.href} className="block">
              <p className="font-medium">{x.title}</p>
              <p className="mt-1 text-sm text-mute">{x.why}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
