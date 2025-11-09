import type { Metadata } from "next";

import { GuidePage } from "@/components/video-compression/guide-page";

export const metadata: Metadata = {
  title: "Video Compression For Dummies",
  description:
    "A plain-language helper that guides beginners through shrinking large video files with confidence.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-none px-4 md:px-8 lg:px-12">
        <main className="mx-auto w-full max-w-[90%] lg:max-w-[85%] xl:max-w-[80%]">
          <GuidePage />
        </main>
      </div>
    </div>
  );
}
