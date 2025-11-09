"use client";

import { formatFileSize } from "@/lib/file-handler";
import type { CompressionResultsProps } from "@/lib/types/video-compression";

/**
 * Compression Results Component
 * Displays compression results including original size, compressed size, and savings
 */
export function CompressionResults({
  compressedVideo,
  onDownload,
  onRetry,
}: CompressionResultsProps) {
  const handleDownload = () => {
    if (!compressedVideo.compressedFile) return;

    const url = URL.createObjectURL(compressedVideo.compressedFile);
    const a = document.createElement("a");
    a.href = url;

    // Create filename with "-compressed" suffix
    const originalName = compressedVideo.name;
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
    const extension = originalName.match(/\.[^/.]+$/) || ".mp4";
    a.download = `${nameWithoutExt}-compressed${extension}`;

    a.click();
    URL.revokeObjectURL(url);
    onDownload?.();
  };

  return (
    <div className="w-full space-y-4 rounded-2xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">
          Your smaller video is ready
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Original Size */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Original size (before)
            </p>
            <p className="text-base font-medium text-foreground">
              {formatFileSize(compressedVideo.originalSize)}
            </p>
          </div>

          {/* Compressed Size */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">New size (after)</p>
            <p className="text-base font-medium text-foreground">
              {formatFileSize(compressedVideo.compressedSize)}
            </p>
          </div>
        </div>

        {/* Size Savings - Highlighted */}
        <div className="space-y-2 rounded-lg bg-emerald-500/10 p-4 text-sm text-emerald-700 shadow-inner dark:bg-emerald-400/10 dark:text-emerald-200">
          <p className="font-medium uppercase tracking-wide">Space saved</p>
          <div className="flex items-baseline gap-2 text-emerald-700 dark:text-emerald-200">
            <p className="text-2xl font-bold">
              {formatFileSize(compressedVideo.sizeSavings)}
            </p>
            <p className="text-lg font-semibold">
              ({compressedVideo.sizeSavingsPercent.toFixed(1)}%)
            </p>
          </div>
        </div>

        {/* Processing Time */}
        {compressedVideo.processingTime !== null && (
          <div className="text-sm text-muted-foreground">
            Time taken: {(compressedVideo.processingTime / 1000).toFixed(1)}{" "}
            seconds
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button
          type="button"
          onClick={handleDownload}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:flex-1"
        >
          Download the smaller video
        </button>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
