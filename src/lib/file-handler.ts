import type { FileValidationResult } from "./types/file-upload";
import { ALLOWED_VIDEO_TYPES, DEFAULT_MAX_FILE_SIZE } from "./types/file-upload";

/**
 * Validates a file against type and size constraints
 * @param file - The file to validate
 * @param maxSize - Maximum file size in bytes (default: DEFAULT_MAX_FILE_SIZE)
 * @param allowedTypes - Array of allowed MIME types (default: ALLOWED_VIDEO_TYPES)
 * @returns Validation result with isValid flag and optional error message
 */
export function validateFile(
  file: File,
  maxSize: number = DEFAULT_MAX_FILE_SIZE,
  allowedTypes: readonly string[] = ALLOWED_VIDEO_TYPES
): FileValidationResult {
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    const supportedTypes = allowedTypes.join(", ");
    return {
      isValid: false,
      error: `Unsupported file type. Supported types: ${supportedTypes}`,
    };
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(0);
    return {
      isValid: false,
      error: `File size exceeds the maximum limit of ${maxSizeMB}MB`,
    };
  }

  return { isValid: true };
}

/**
 * Formats file size in bytes to human-readable format (KB, MB, GB)
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.5 MB", "500 KB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

/**
 * Truncates a filename if it exceeds the maximum length, preserving the extension
 * @param fileName - The filename to truncate
 * @param maxLength - Maximum length for the filename (default: 50)
 * @returns Truncated filename with ellipsis if needed
 */
export function truncateFileName(fileName: string, maxLength: number = 50): string {
  if (fileName.length <= maxLength) return fileName;

  // Find the last dot to preserve extension
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1) {
    // No extension, just truncate
    return `${fileName.substring(0, maxLength - 3)}...`;
  }

  const extension = fileName.substring(lastDotIndex);
  const nameWithoutExt = fileName.substring(0, lastDotIndex);
  const availableLength = maxLength - extension.length - 3; // 3 for "..."

  if (availableLength <= 0) {
    // Extension is longer than maxLength, just return extension
    return extension;
  }

  return `${nameWithoutExt.substring(0, availableLength)}...${extension}`;
}

// Re-export constants for convenience
export { ALLOWED_VIDEO_TYPES, DEFAULT_MAX_FILE_SIZE };

