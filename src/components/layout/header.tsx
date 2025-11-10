"use client";

import { useState } from "react";

import { ForNerdsButton } from "@/components/ui/for-nerds-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { TechnicalDetailsModal } from "@/components/video-compression/technical-details-modal";

export function Header() {
  const [isTechnicalModalOpen, setIsTechnicalModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[90%] items-center justify-between px-4 py-4 md:px-8 lg:px-12 xl:max-w-[80%]">
          <div className="text-sm font-semibold uppercase tracking-wide text-primary" />
          <div className="flex items-center gap-2">
            <ForNerdsButton onClick={() => setIsTechnicalModalOpen(true)} />
            <ThemeToggle aria-label="Toggle color theme" />
          </div>
        </div>
      </header>
      <TechnicalDetailsModal
        open={isTechnicalModalOpen}
        onOpenChange={setIsTechnicalModalOpen}
      />
    </>
  );
}
