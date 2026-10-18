import { TESTS } from "@/lib/bank";

export function generateStaticParams() {
  return TESTS.map((t) => ({ id: t.id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
