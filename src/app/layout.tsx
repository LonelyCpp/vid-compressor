import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "next-themes";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Video Compression For Dummies",
  description:
    "Beginner-friendly video compression guide with plain-language steps, a roomy layout, and light or dark themes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="vid-compressor-theme"
        >
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
              <div className="mx-auto flex w-full max-w-[90%] items-center justify-between px-4 py-4 md:px-8 lg:px-12 xl:max-w-[80%]">
                <Link
                  href="/"
                  className="text-sm font-semibold uppercase tracking-wide text-primary"
                >
                  Video Compression For Dummies
                </Link>
                <ThemeToggle aria-label="Toggle color theme" />
              </div>
            </header>
            <div className="flex-1">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
