import type { NextConfig } from "next";

const gh = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(gh
    ? {
        output: "export" as const,
        basePath: "/eight-ielts",
        assetPrefix: "/eight-ielts",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "X-Frame-Options", value: "DENY" },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
