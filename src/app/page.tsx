"use client";

import { useState, useEffect } from "react";
import { FileDropZone } from "@/components/file-upload/file-drop-zone";
import { FileInfo } from "@/components/file-upload/file-info";
import { CompressionProgress } from "@/components/video-compression/compression-progress";
import { CompressionResults } from "@/components/video-compression/compression-results";
import type { SelectedFile } from "@/lib/types/file-upload";
import type { CompressedVideo } from "@/lib/types/video-compression";
import { validateFile, DEFAULT_MAX_FILE_SIZE, ALLOWED_VIDEO_TYPES } from "@/lib/file-handler";
import { videoCompressor, calculateSizeSavings } from "@/lib/video-compressor";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Compression state management
  const [compressedVideo, setCompressedVideo] = useState<CompressedVideo | null>(null);
  const [compressionStatus, setCompressionStatus] = useState<"idle" | "compressing" | "complete" | "error">("idle");
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [compressionError, setCompressionError] = useState<string | null>(null);

  // Start compression when a valid file is selected
  useEffect(() => {
    if (selectedFile && selectedFile.validationStatus === "valid" && compressionStatus === "idle") {
      startCompression(selectedFile.file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  /**
   * Start compression function
   * Triggers video compression when file is validated
   */
  const startCompression = async (file: File) => {
    if (!selectedFile) return;

    // Reset compression state
    setCompressionStatus("compressing");
    setCompressionProgress(0);
    setCompressionError(null);
    setCompressedVideo(null);

    // Initialize compressed video state
    const initialCompressedVideo: CompressedVideo = {
      ...selectedFile,
      compressedFile: null,
      originalSize: file.size,
      compressedSize: 0,
      sizeSavings: 0,
      sizeSavingsPercent: 0,
      compressionStatus: "compressing",
      compressionProgress: 0,
      compressionError: null,
      processingTime: null,
    };
    setCompressedVideo(initialCompressedVideo);

    const startTime = Date.now();

    try {
      // Call video compressor with progress callback
      const compressedFile = await videoCompressor.compress(file, (progress) => {
        setCompressionProgress(progress);
        setCompressedVideo((prev) =>
          prev
            ? {
                ...prev,
                compressionProgress: progress,
              }
            : null
        );
      });

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      // Calculate size savings
      const compressedSize = compressedFile.size;
      
      // Handle edge case where compressed file is larger than original
      if (compressedSize > file.size) {
        console.warn(`Compressed file (${compressedSize} bytes) is larger than original (${file.size} bytes)`);
      }
      
      const savings = calculateSizeSavings(file.size, compressedSize);

      // Update compressed video state with completion
      const completedCompressedVideo: CompressedVideo = {
        ...selectedFile!,
        compressedFile,
        originalSize: file.size,
        compressedSize,
        sizeSavings: savings.absolute,
        sizeSavingsPercent: savings.percent,
        compressionStatus: "complete",
        compressionProgress: 100,
        compressionError: null,
        processingTime,
      };

      setCompressedVideo(completedCompressedVideo);
      setCompressionStatus("complete");
      setCompressionProgress(100);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Compression failed";
      setCompressionError(errorMessage);
      setCompressionStatus("error");

      // Update compressed video state with error
      setCompressedVideo((prev) =>
        prev
          ? {
              ...prev,
              compressionStatus: "error",
              compressionError: errorMessage,
            }
          : null
      );
    }
  };

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
    // Clear compression state when new file is selected
    setCompressedVideo(null);
    setCompressionStatus("idle");
    setCompressionProgress(0);
    setCompressionError(null);
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

            {/* Compression Progress */}
            {(compressionStatus === "compressing" || compressionStatus === "complete" || compressionStatus === "error") && (
              <CompressionProgress
                progress={compressionProgress}
                status={compressionStatus}
                error={compressionError}
              />
            )}

            {/* Compression Results */}
            {compressionStatus === "complete" && compressedVideo && (
              <CompressionResults
                compressedVideo={compressedVideo}
                onDownload={() => {
                  // Download handled in component
                }}
              />
            )}

            {/* Error Retry */}
            {compressionStatus === "error" && compressedVideo && (
              <div className="w-full space-y-3">
                <button
                  onClick={() => {
                    if (selectedFile) {
                      setCompressionStatus("idle");
                      startCompression(selectedFile.file);
                    }
                  }}
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Retry Compression
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
