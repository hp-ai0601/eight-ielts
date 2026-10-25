import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";

const sans = IBM_Plex_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const serif = IBM_Plex_Serif({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Eight — gia sư IELTS 8.0", template: "%s — Eight" },
  description: "App tự học tiếng Anh từ con số không đến IELTS Academic 8.0. Mỗi ngày một buổi học: ôn thẻ, làm bài, luyện nói hoặc viết.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0B0C0F" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
