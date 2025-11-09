"use client";

import { formatFileSize, truncateFileName } from "@/lib/file-handler";
import type { FileInfoProps } from "@/lib/types/file-upload";

export function FileInfo({ file, onClear }: FileInfoProps) {
  const displayName = truncateFileName(file.name, 50);
  const formattedSize = formatFileSize(file.size);

  return (
    <div className="w-full rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
            >
              <title>Video file icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <h3 className="font-semibold text-card-foreground">
              {displayName}
            </h3>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{formattedSize}</span>
            <span className="capitalize">{file.type.split("/")[1]}</span>
            {file.validationStatus === "valid" && (
              <span className="text-green-600 dark:text-green-400 transition-opacity">
                ✓ Valid
              </span>
            )}
            {file.validationStatus === "invalid" && (
              <span className="text-destructive transition-opacity">
                ✗ Invalid
              </span>
            )}
          </div>
          {file.validationError && (
            <div className="rounded-md bg-destructive/10 p-2 text-sm text-destructive animate-in fade-in slide-in-from-top-2 duration-300">
              {file.validationError}
            </div>
          )}
          {file.processingStatus === "processing" && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-in fade-in slide-in-from-left-2 duration-300">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span>Processing...</span>
            </div>
          )}
          {file.processingStatus === "complete" && (
            <div className="text-sm text-green-600 dark:text-green-400 animate-in fade-in slide-in-from-left-2 duration-300">
              ✓ Processing complete
            </div>
          )}
        </div>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Clear file"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
            >
              <title>Remove this video</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
