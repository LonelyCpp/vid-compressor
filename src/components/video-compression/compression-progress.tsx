"use client";

import type { CompressionProgressProps } from "@/lib/types/video-compression";

/**
 * Compression Progress Component
 * Displays a progress bar during video compression with status and error handling
 */
export function CompressionProgress({ progress, status, error }: CompressionProgressProps) {
  if (status === "error") {
    return (
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-destructive font-medium">Compression Failed</span>
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
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-green-600 dark:text-green-400 font-medium">Compression Complete</span>
          <span className="text-zinc-600 dark:text-zinc-400">100%</span>
        </div>
        <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 dark:bg-green-500 transition-all duration-300 ease-out"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    );
  }

  // Compressing state
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-700 dark:text-zinc-300 font-medium">Compressing...</span>
        <span className="text-zinc-600 dark:text-zinc-400">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

