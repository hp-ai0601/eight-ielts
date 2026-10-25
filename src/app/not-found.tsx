import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-8 py-24">
      <h1 className="font-serif text-3xl">Không tìm thấy trang này.</h1>
      <Link href="/" className="btn-lime mt-6">
        Về trang Hôm nay
      </Link>
    </div>
  );
}
