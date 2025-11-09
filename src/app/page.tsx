"use client";

import { useState, useEffect } from "react";
import { FileDropZone } from "@/components/file-upload/file-drop-zone";
import { FileInfo } from "@/components/file-upload/file-info";
import type { SelectedFile } from "@/lib/types/file-upload";
import { validateFile, DEFAULT_MAX_FILE_SIZE, ALLOWED_VIDEO_TYPES } from "@/lib/file-handler";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate processing when a valid file is selected
  useEffect(() => {
    if (selectedFile && selectedFile.validationStatus === "valid" && selectedFile.processingStatus === "idle") {
      // Start processing
      setSelectedFile((prev) =>
        prev
          ? {
              ...prev,
              processingStatus: "processing",
            }
          : null
      );

      // Simulate processing delay (in real app, this would be actual compression)
      const processingTimer = setTimeout(() => {
        setSelectedFile((prev) =>
          prev
            ? {
                ...prev,
                processingStatus: "complete",
              }
            : null
        );
      }, 2000); // 2 second simulation

      return () => clearTimeout(processingTimer);
    }
  }, [selectedFile]);

  const handleFileDrop = (files: FileList) => {
    if (files.length === 0) return;

    // Accept only first file (per clarification)
    const file = files[0];
    setError(null);

    // Validate file
    const validation = validateFile(file, DEFAULT_MAX_FILE_SIZE, ALLOWED_VIDEO_TYPES);

    const fileData: SelectedFile = {
      file,
      name: file.name,
      type: file.type,
      size: file.size,
      validationStatus: validation.isValid ? "valid" : "invalid",
      validationError: validation.error || null,
      processingStatus: validation.isValid ? "idle" : "idle",
    };

    setSelectedFile(fileData);

    if (!validation.isValid) {
      setError(validation.error || "File validation failed");
    }
  };

  const handleDragOver = () => {
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setError(null);
    setDragActive(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Video Compressor
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Upload your video file to get started. We support MP4, MOV, AVI, and WebM formats.
            </p>
          </div>

          <div className="w-full space-y-4">
            {!selectedFile ? (
              <FileDropZone
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                isDragActive={dragActive}
              />
            ) : (
              <FileInfo file={selectedFile} onClear={handleClearFile} />
            )}

            {error && (
              <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
                {error}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
