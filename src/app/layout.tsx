import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GNBWrapper } from "@/components/GNBWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "나눗 - 우리 건물 공동구매",
  description: "이웃과 함께하는 스마트 공동구매 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <div className="mx-auto max-w-[440px] min-h-screen bg-white shadow-xl flex flex-col relative overflow-hidden">
          <GNBWrapper>
            {children}
          </GNBWrapper>
        </div>
      </body>
    </html>
  );
}
