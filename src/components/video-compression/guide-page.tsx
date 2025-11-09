"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { FileDropZone } from "@/components/file-upload/file-drop-zone";
import { FileInfo } from "@/components/file-upload/file-info";
import { CompressionProgress } from "@/components/video-compression/compression-progress";
import { CompressionResults } from "@/components/video-compression/compression-results";
import {
  ALLOWED_VIDEO_TYPES,
  DEFAULT_MAX_FILE_SIZE,
  validateFile,
} from "@/lib/file-handler";
import type { SelectedFile } from "@/lib/types/file-upload";
import type { CompressedVideo } from "@/lib/types/video-compression";
import { calculateSizeSavings, videoCompressor } from "@/lib/video-compressor";

type CompressionState = "idle" | "compressing" | "complete" | "error";

const SUPPORTED_TYPE_LABELS = ["MP4", "MOV", "AVI", "WebM"] as const;

export function GuidePage() {
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [friendlyError, setFriendlyError] = useState<string | null>(null);
  const [compressedVideo, setCompressedVideo] =
    useState<CompressedVideo | null>(null);
  const [compressionStatus, setCompressionStatus] =
    useState<CompressionState>("idle");
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [compressionError, setCompressionError] = useState<string | null>(null);

  const maxFileSizeLabel = useMemo(() => {
    const megabytes = DEFAULT_MAX_FILE_SIZE / (1024 * 1024);
    return `${megabytes.toFixed(0)} MB`;
  }, []);

  const getFriendlyValidationMessage = (raw?: string) => {
    if (!raw) {
      return "This video doesn't meet our simple checklist. Please try another file.";
    }

    if (raw.includes("Unsupported file type")) {
      return "That video format isn't one we can shrink yet. Try MP4, MOV, AVI, or WebM instead.";
    }

    if (raw.includes("File size exceeds")) {
      return `That video is bigger than our easy limit of ${maxFileSizeLabel}. Pick a shorter clip or trim it first, then try again.`;
    }

    return raw;
  };

  const startCompression = useCallback(
    async (file: File, fileContext: SelectedFile) => {
      setCompressionStatus("compressing");
      setCompressionProgress(0);
      setCompressionError(null);
      setCompressedVideo(null);

      const initialCompressed: CompressedVideo = {
        ...fileContext,
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
      setCompressedVideo(initialCompressed);

      const startedAt = Date.now();

      try {
        const compressedFile = await videoCompressor.compress(
          file,
          (progress) => {
            setCompressionProgress(progress);
            setCompressedVideo((previous) =>
              previous
                ? {
                    ...previous,
                    compressionProgress: progress,
                  }
                : null
            );
          }
        );

        const finishedAt = Date.now();
        const processingTime = finishedAt - startedAt;

        const compressedSize = compressedFile.size;
        if (compressedSize > file.size) {
          console.warn(
            `Compressed file (${compressedSize} bytes) is larger than original (${file.size} bytes)`
          );
        }

        const savings = calculateSizeSavings(file.size, compressedSize);

        const completedCompressedVideo: CompressedVideo = {
          ...fileContext,
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
      } catch (error) {
        console.error(error);
        const friendlyMessage =
          "We couldn't finish squeezing your video this time. Please try again or pick another file.";
        setCompressionError(friendlyMessage);
        setFriendlyError(null);
        setCompressionStatus("error");
        setCompressedVideo((previous) =>
          previous
            ? {
                ...previous,
                compressionStatus: "error",
                compressionError: friendlyMessage,
              }
            : null
        );
      }
    },
    []
  );

  useEffect(() => {
    if (
      selectedFile &&
      selectedFile.validationStatus === "valid" &&
      compressionStatus === "idle"
    ) {
      void startCompression(selectedFile.file, selectedFile);
    }
  }, [compressionStatus, selectedFile, startCompression]);

  const handleFileDrop = (files: FileList) => {
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    setFriendlyError(null);

    const validation = validateFile(
      file,
      DEFAULT_MAX_FILE_SIZE,
      ALLOWED_VIDEO_TYPES
    );

    const fileDetails: SelectedFile = {
      file,
      name: file.name,
      type: file.type,
      size: file.size,
      validationStatus: validation.isValid ? "valid" : "invalid",
      validationError: validation.error || null,
      processingStatus: validation.isValid ? "idle" : "idle",
    };

    setSelectedFile(fileDetails);

    if (!validation.isValid) {
      setFriendlyError(getFriendlyValidationMessage(validation.error));
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
    setFriendlyError(null);
    setDragActive(false);
    setCompressedVideo(null);
    setCompressionStatus("idle");
    setCompressionProgress(0);
    setCompressionError(null);
  };

  return (
    <div className="space-y-12 py-16">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Friendly how-to guide
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Video Compression For Dummies
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Welcome! This page walks you through getting a big video down to a
          shareable size without needing any technical know-how. We keep the
          language plain so you always understand the next click.
        </p>
        <p className="max-w-3xl text-base text-muted-foreground">
          When we say{" "}
          <span className="font-semibold text-foreground">compression</span>, we
          simply mean{" "}
          <span className="font-semibold text-foreground">
            making the file smaller
          </span>{" "}
          so it emails, uploads, and downloads faster while staying clear to
          watch.
        </p>
      </section>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
        <article className="space-y-8 rounded-2xl border border-border bg-card/60 p-6 shadow-sm backdrop-blur">
          <h2 className="text-2xl font-semibold text-foreground">
            Follow these simple steps
          </h2>
          <ol className="space-y-5 text-base leading-relaxed text-muted-foreground marker:text-primary [&>li]:space-y-2 [&>li]:rounded-xl [&>li]:border [&>li]:border-transparent [&>li]:bg-background/60 [&>li]:p-5 [&>li]:shadow-sm [&>li]:transition hover:[&>li]:border-primary/40">
            <li>
              <p className="text-lg font-semibold text-foreground">
                1. Pick your video file
              </p>
              <p>
                Tap the big drop zone to choose a video. Formats like{" "}
                {SUPPORTED_TYPE_LABELS.map((type, index) => (
                  <span key={type}>
                    <span className="font-semibold text-foreground">
                      {type}
                    </span>
                    {index < SUPPORTED_TYPE_LABELS.length - 1 ? ", " : ""}
                  </span>
                ))}{" "}
                are all welcome — that simply refers to the kind of video your
                phone or camera saved.
              </p>
            </li>
            <li>
              <p className="text-lg font-semibold text-foreground">
                2. Let us run a quick check
              </p>
              <p>
                We double-check the file type and size (anything up to{" "}
                <span className="font-semibold text-foreground">
                  {maxFileSizeLabel}
                </span>
                ) so you know right away if it fits. If it doesn&apos;t,
                you&apos;ll see a friendly note explaining why.
              </p>
            </li>
            <li>
              <p className="text-lg font-semibold text-foreground">
                3. Watch the progress bar fill up
              </p>
              <p>
                Once the file is good to go, we start shrinking it. The progress
                bar keeps you posted — no tech talk, just a clear view of how
                far along we are.
              </p>
            </li>
            <li>
              <p className="text-lg font-semibold text-foreground">
                4. Download and share with confidence
              </p>
              <p>
                When the bar hits 100%, grab the new smaller file and share it.
                We also show how much space you saved so you can celebrate the
                win.
              </p>
            </li>
          </ol>
          <div className="rounded-xl border border-border bg-background/70 p-5 text-sm text-muted-foreground shadow-sm">
            <p className="font-semibold text-foreground">
              Need a quick refresher?
            </p>
            <p>
              <span className="font-semibold text-foreground">File size</span>{" "}
              is simply how much space your video takes up. Lower size means
              faster uploads and quicker sharing — like mailing a lighter
              package.
            </p>
          </div>
        </article>

        <aside className="space-y-6 rounded-2xl border border-border bg-card/60 p-6 shadow-md backdrop-blur">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              Try it right here
            </h2>
            <p className="text-base text-muted-foreground">
              Drop a video or pick one from your computer. We&apos;ll guide you
              through every step and explain anything that sounds techy.
            </p>
          </div>
          <div className="space-y-4">
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

            {(friendlyError || compressionError) && (
              <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive shadow-sm">
                {friendlyError ?? compressionError}
              </div>
            )}

            {(compressionStatus === "compressing" ||
              compressionStatus === "complete" ||
              compressionStatus === "error") && (
              <CompressionProgress
                progress={compressionProgress}
                status={compressionStatus}
                error={compressionError}
              />
            )}

            {compressionStatus === "complete" && compressedVideo && (
              <CompressionResults
                compressedVideo={compressedVideo}
                onDownload={() => {
                  // Download handled in component
                }}
              />
            )}

            {compressionStatus === "error" && selectedFile && (
              <button
                type="button"
                onClick={() => {
                  setCompressionStatus("idle");
                  void startCompression(selectedFile.file, selectedFile);
                }}
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Try compressing again
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
