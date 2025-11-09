"use client";

import type { CompressionProgressProps } from "@/lib/types/video-compression";

/**
 * Compression Progress Component
 * Displays a progress bar during video compression with status and error handling
 */
export function CompressionProgress({
  progress,
  status,
  error,
}: CompressionProgressProps) {
  if (status === "error") {
    return (
      <div className="w-full space-y-2" aria-live="polite">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-destructive">
            We couldn&apos;t finish shrinking the video
          </span>
        </div>
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
      </div>
    );
  }

  if (status === "complete") {
    return (
      <div className="w-full space-y-2" aria-live="polite">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-green-600 transition-colors dark:text-green-400">
            All done! Your video is smaller now
          </span>
          <span className="text-sm text-muted-foreground">100%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-green-600 transition-all duration-300 ease-out dark:bg-green-500"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    );
  }

  // Compressing state
  return (
    <div className="w-full space-y-2" aria-live="polite">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">
          Shrinking your video...
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out dark:bg-primary"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
