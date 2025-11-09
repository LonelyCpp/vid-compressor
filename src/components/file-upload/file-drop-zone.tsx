"use client";

import { useRef } from "react";
import type { FileDropZoneProps } from "@/lib/types/file-upload";
import { cn } from "@/lib/utils";

export function FileDropZone({
  onDrop,
  onDragOver,
  onDragLeave,
  isDragActive,
  disabled = false,
}: FileDropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && onDragOver) {
      onDragOver();
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && onDragLeave) {
      onDragLeave();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Accept only first file (per clarification)
      onDrop(files);
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Accept only first file (per clarification)
      onDrop(e.target.files);
    }
  };

  return (
    <button
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      type="button"
      className={cn(
        "relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-muted/50",
        disabled && "opacity-50 cursor-not-allowed",
      )}
      aria-label="Upload a video by dragging and dropping or selecting from your device"
      disabled={disabled}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <svg
          className="h-12 w-12 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
        >
          <title>Illustration of a cloud and arrow indicating upload</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <div className="space-y-2">
          <p className="text-lg font-medium text-foreground">
            {isDragActive
              ? "Drop your video file here"
              : "Drag and drop your video file"}
          </p>
          <p className="text-sm text-muted-foreground">or click to browse</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Supported formats: MP4, MOV, AVI, WebM
        </p>
      </div>
    </button>
  );
}
