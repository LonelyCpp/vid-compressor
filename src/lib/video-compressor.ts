/**
 * Video Compressor Service
 *
 * Service for compressing videos using mediabunny library.
 * All compression happens client-side in the browser.
 */

import type { CompressionConfig } from "@/lib/types/video-compression";
import { DEFAULT_COMPRESSION_CONFIG } from "@/lib/types/video-compression";

type MediabunnyModule = typeof import("mediabunny");

// Import mediabunny - using dynamic import for client-side only
let mediabunny: MediabunnyModule | null = null;

/**
 * Initialize mediabunny library (client-side only)
 */
async function initMediabunny() {
  if (typeof window === "undefined") {
    throw new Error("Video compression is only available in the browser");
  }

  if (!mediabunny) {
    try {
      mediabunny = await import("mediabunny");
    } catch (_error) {
      throw new Error(
        "Failed to load mediabunny library. Please ensure it is installed."
      );
    }
  }

  return mediabunny;
}

/**
 * Get compression configuration
 * Returns the default compression config optimized for maximum compression with acceptable quality
 */
export function getCompressionConfig(): CompressionConfig {
  return { ...DEFAULT_COMPRESSION_CONFIG };
}

/**
 * Calculate size savings (absolute and percentage)
 * @param originalSize - Original file size in bytes
 * @param compressedSize - Compressed file size in bytes
 * @returns Object with absolute savings (bytes) and percentage savings
 */
export function calculateSizeSavings(
  originalSize: number,
  compressedSize: number
): { absolute: number; percent: number } {
  if (originalSize <= 0) {
    return { absolute: 0, percent: 0 };
  }

  const absolute = Math.max(0, originalSize - compressedSize);
  const percent = (absolute / originalSize) * 100;

  return { absolute, percent };
}

/**
 * Compress a video file using mediabunny
 * @param file - The video file to compress
 * @param onProgress - Optional callback for progress updates (0-100)
 * @returns Promise resolving to compressed Blob/File
 */
export async function compress(
  file: File,
  onProgress?: (progress: number) => void
): Promise<Blob | File> {
  if (typeof window === "undefined") {
    throw new Error("Video compression is only available in the browser");
  }

  const mb = await initMediabunny();

  let progressInterval: ReturnType<typeof setInterval> | null = null;

  try {
    // Initialize progress tracking
    let lastProgress = 0;
    progressInterval = setInterval(() => {
      if (onProgress && lastProgress < 90) {
        // Estimate progress based on time (fallback if mediabunny doesn't provide progress)
        lastProgress += 2;
        onProgress(Math.min(lastProgress, 90));
      }
    }, 500);

    // Create input from file using BlobSource
    const source = new mb.BlobSource(file);
    const input = new mb.Input({
      source,
      formats: [
        mb.MP4, // MP4 is a singleton instance
        new mb.QuickTimeInputFormat(), // MOV format
        new mb.WebMInputFormat(), // WebM format
        new mb.MatroskaInputFormat(), // MKV format
      ],
    });

    // Create output with BufferTarget and Mp4OutputFormat
    const target = new mb.BufferTarget();
    const output = new mb.Output({
      format: new mb.Mp4OutputFormat(),
      target,
    });

    // Create conversion with video compression options
    // mediabunny uses bitrate (number) or Quality enum for compression
    // Using "avc" codec (H.264) and QUALITY_MEDIUM for balanced compression
    const conversion = await mb.Conversion.init({
      input,
      output,
      video: {
        codec: "hevc" as const, // H.264 codec
        bitrate: mb.QUALITY_MEDIUM, // Use quality preset for compression
      },
    });

    // Tie mediabunny progress into the provided callback
    conversion.onProgress = (progress: number) => {
      if (!onProgress) {
        return;
      }

      const percent = Math.min(100, Math.max(0, Math.round(progress * 100)));
      lastProgress = percent;
      onProgress(percent);
    };

    // Run conversion
    await conversion.execute();

    if (onProgress) {
      onProgress(100);
    }

    // Get buffer from target and convert to Blob
    if (!target.buffer) {
      throw new Error("Compression completed but no output buffer was created");
    }

    const blob = new Blob([target.buffer], { type: "video/mp4" });
    return blob;
  } catch (error) {
    console.log(error);
    // Map technical errors to user-friendly messages
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown error occurred during compression";

    // Provide more specific error messages
    if (errorMessage.includes("codec") || errorMessage.includes("format")) {
      throw new Error(
        "Unsupported video format or codec. Please try a different video file."
      );
    }
    if (errorMessage.includes("memory") || errorMessage.includes("Memory")) {
      throw new Error(
        "File is too large to compress. Please try a smaller video file."
      );
    }
    if (errorMessage.includes("corrupt") || errorMessage.includes("invalid")) {
      throw new Error(
        "Video file appears to be corrupted. Please try a different file."
      );
    }

    throw new Error(`Compression failed: ${errorMessage}`);
  } finally {
    if (progressInterval) {
      clearInterval(progressInterval);
    }
  }
}

/**
 * Video Compressor Service Object
 */
export const videoCompressor = {
  compress,
  getCompressionConfig,
};
