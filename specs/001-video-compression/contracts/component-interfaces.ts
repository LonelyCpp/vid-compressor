/**
 * Component Interfaces: Video Compression
 * 
 * TypeScript interfaces defining component contracts for the video compression feature.
 * These interfaces ensure type safety and define the expected behavior of components.
 */

import type { SelectedFile } from "@/lib/types/file-upload";

/**
 * Compressed Video State
 * Represents a compressed video with compression metadata
 */
export interface CompressedVideo extends SelectedFile {
  compressedFile: Blob | File | null;
  originalSize: number;
  compressedSize: number;
  sizeSavings: number;
  sizeSavingsPercent: number;
  compressionStatus: "idle" | "compressing" | "complete" | "error";
  compressionProgress: number;
  compressionError: string | null;
  processingTime: number | null;
}

/**
 * Compression Progress Component Props
 * Props for the compression progress bar component
 */
export interface CompressionProgressProps {
  progress: number; // 0-100
  status: "compressing" | "complete" | "error";
  error?: string | null;
}

/**
 * Compression Results Component Props
 * Props for displaying compression results
 */
export interface CompressionResultsProps {
  compressedVideo: CompressedVideo;
  onDownload: () => void;
  onRetry?: () => void;
}

/**
 * Video Compressor Service Interface
 * Service for compressing videos using mediabunny
 */
export interface VideoCompressor {
  compress: (
    file: File,
    onProgress?: (progress: number) => void
  ) => Promise<Blob | File>;
  getCompressionConfig: () => CompressionConfig;
}

/**
 * Compression Configuration
 * Settings for video compression
 */
export interface CompressionConfig {
  crf: number; // Constant Rate Factor (23-28, lower = better quality)
  codec: string; // Video codec (e.g., "libx264")
  preset: string; // Encoding preset (e.g., "medium", "fast")
  maxWidth?: number; // Optional max width for resolution reduction
  maxHeight?: number; // Optional max height for resolution reduction
}

/**
 * Default Compression Configuration
 * Optimized for maximum compression with acceptable quality
 */
export const DEFAULT_COMPRESSION_CONFIG: CompressionConfig = {
  crf: 25,
  codec: "libx264",
  preset: "medium",
};

/**
 * Compression Result
 * Result of compression operation
 */
export interface CompressionResult {
  success: boolean;
  compressedFile?: Blob | File;
  error?: string;
  originalSize: number;
  compressedSize?: number;
}

