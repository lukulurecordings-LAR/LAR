import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Next layouts intentionally export route metadata alongside the layout component.
// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Lukulu Academy | Learn. Create. Release.",
  description:
    "Practical online music-production and music-business education for South African creators.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/lukulu-brand-mark.webp",
    shortcut: "/lukulu-brand-mark.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
