import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-8 py-24">
      <h1 className="font-serif text-3xl">Không có trang này.</h1>
      <Link href="/" className="btn-lime mt-6">
        Về hôm nay
      </Link>
    </div>
  );
}
