"use client";

import { formatFileSize } from "@/lib/file-handler";
import type { CompressionResultsProps } from "@/lib/types/video-compression";

/**
 * Compression Results Component
 * Displays compression results including original size, compressed size, and savings
 */
export function CompressionResults({ compressedVideo, onDownload, onRetry }: CompressionResultsProps) {
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
  };

  return (
    <div className="w-full space-y-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Compression Results
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Original Size */}
          <div className="space-y-1">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Original Size</p>
            <p className="text-base font-medium text-zinc-900 dark:text-zinc-50">
              {formatFileSize(compressedVideo.originalSize)}
            </p>
          </div>

          {/* Compressed Size */}
          <div className="space-y-1">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Compressed Size</p>
            <p className="text-base font-medium text-zinc-900 dark:text-zinc-50">
              {formatFileSize(compressedVideo.compressedSize)}
            </p>
          </div>
        </div>

        {/* Size Savings - Highlighted */}
        <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4 space-y-2">
          <p className="text-sm font-medium text-green-900 dark:text-green-100">Size Savings</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
              {formatFileSize(compressedVideo.sizeSavings)}
            </p>
            <p className="text-lg font-semibold text-green-600 dark:text-green-500">
              ({compressedVideo.sizeSavingsPercent.toFixed(1)}%)
            </p>
          </div>
        </div>

        {/* Processing Time */}
        {compressedVideo.processingTime !== null && (
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Processing time: {(compressedVideo.processingTime / 1000).toFixed(1)}s
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleDownload}
          className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Download Compressed Video
        </button>
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

