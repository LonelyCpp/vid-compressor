/**
 * Component Interfaces: File Upload Landing Page
 *
 * TypeScript interfaces defining component contracts for the file upload feature.
 * These interfaces ensure type safety and define the expected behavior of components.
 */

/**
 * Selected File State
 * Represents a file selected by the user with validation and processing status
 */
export interface SelectedFile {
  file: File;
  name: string;
  type: string;
  size: number;
  validationStatus: "pending" | "valid" | "invalid";
  validationError: string | null;
  processingStatus: "idle" | "processing" | "complete";
}

/**
 * File Upload Component Props
 * Props for the main file upload component
 */
export interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileValidationError: (error: string) => void;
  maxFileSize?: number; // in bytes, default 500MB
  allowedTypes?: string[]; // MIME types, default video types
}

/**
 * File Drop Zone Component Props
 * Props for the drag-and-drop zone component
 */
export interface FileDropZoneProps {
  onDrop: (files: FileList) => void;
  onDragOver?: () => void;
  onDragLeave?: () => void;
  isDragActive: boolean;
  disabled?: boolean;
}

/**
 * File Info Component Props
 * Props for displaying file information
 */
export interface FileInfoProps {
  file: SelectedFile;
  onClear?: () => void;
}

/**
 * File Validation Result
 * Result of file validation
 */
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * File Handler Functions
 * Utility functions for file handling
 */
export interface FileHandler {
  validateFile: (
    file: File,
    maxSize: number,
    allowedTypes: string[]
  ) => FileValidationResult;
  formatFileSize: (bytes: number) => string;
  truncateFileName: (fileName: string, maxLength: number) => string;
}

/**
 * Allowed Video MIME Types
 * Default list of supported video file types
 */
export const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/quicktime", // MOV
  "video/x-msvideo", // AVI
  "video/webm",
] as const;

/**
 * Default Maximum File Size
 * 500MB in bytes
 */
export const DEFAULT_MAX_FILE_SIZE = 2000 * 1024 * 1024; // 2GB
