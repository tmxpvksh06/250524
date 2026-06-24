import type { Metadata } from "next";
import { brand } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: brand.name,
  description: `${brand.name} - Supabase 기반 사주 플랫폼`,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
