import { LESSONS } from "@/lib/content";

export function generateStaticParams() {
  return Object.keys(LESSONS).map((id) => ({ id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
