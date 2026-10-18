# Eight

Gia sư IELTS Academic 8.0. Next.js 15.

40 chủ đề thi thật (theo IDP/IELTS.org: education, environment, technology, health, work, cities, media, crime, globalisation…) · **408 đề** (10 dạng × 40 chủ đề + 2 mock Academic đủ Listening 40 / Reading 40 / Writing / Speaking) · bài tập về nhà · SRS · lộ trình 0 → 8.0.

## Học trò: Zang Bếu

1. Mở app → chọn **Zang Bếu**
2. PIN: `8800`
3. Học **Hôm nay** (lộ trình) + **Đề** (ngân hàng) + **BTVN**

Thầy Hiệp: PIN `0008` → trang Zang.

## Chạy local

```bash
npm install
npm run dev
```

Tiến độ: `localStorage` theo account + file `data/progress.json` khi server ghi được. Vercel serverless không giữ file — thêm Supabase (`supabase.sql`) nếu muốn thầy xem Zang trên máy khác.

## Public

Repo GitHub + Vercel. Không commit `.env.local`.
