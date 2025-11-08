# Quick Start: File Upload Landing Page

**Feature**: 001-file-upload  
**Date**: 2025-01-27

## Overview

This guide helps you quickly understand and implement the file upload landing page feature. The feature allows users to select video files via drag-and-drop or click-to-browse, validates files client-side, and displays file information.

## Key Concepts

1. **Client-Side Only**: All file handling happens in the browser - no server upload
2. **Native APIs**: Uses HTML5 Drag and Drop API and File API (no heavy dependencies)
3. **shadcn/ui**: Uses shadcn/ui components for UI elements
4. **Next.js App Router**: Built as a page component in the App Router

## Implementation Steps

### 1. Create File Drop Zone Component

**Location**: `src/components/file-upload/file-drop-zone.tsx`

**Key Features**:
- Handle drag-and-drop events (dragover, dragleave, drop)
- Handle click-to-browse via hidden file input
- Provide visual feedback during drag
- Accept only first valid file from multiple selections

**Implementation Notes**:
- Use native HTML5 drag events
- Prevent default browser behavior on drop
- Use state to track drag active status for styling
- Trigger file input click programmatically for browse option

### 2. Create File Validation Logic

**Location**: `src/lib/file-handler.ts`

**Key Functions**:
- `validateFile(file, maxSize, allowedTypes)`: Validate file type and size
- `formatFileSize(bytes)`: Convert bytes to human-readable format (KB/MB/GB)
- `truncateFileName(name, maxLength)`: Truncate long filenames

**Validation Rules**:
- Check MIME type against allowed list: ["video/mp4", "video/quicktime", "video/x-msvideo", "video/webm"]
- Check file size against maximum (default 500MB)
- Return validation result with error message if invalid

### 3. Create File Info Display Component

**Location**: `src/components/file-upload/file-info.tsx`

**Key Features**:
- Display file name (truncated if too long)
- Display file size (formatted)
- Show processing status
- Display validation errors if any

**Implementation Notes**:
- Use shadcn/ui Card component for display
- Format file size using utility function
- Show loading indicator during processing

### 4. Update Landing Page

**Location**: `src/app/page.tsx`

**Key Features**:
- Integrate FileDropZone component
- Manage selected file state
- Handle file validation
- Display file info after selection
- Transition to next step after file info display

**State Management**:
```typescript
const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
const [dragActive, setDragActive] = useState(false);
const [error, setError] = useState<string | null>(null);
```

## Component Structure

```
src/
├── app/
│   └── page.tsx                    # Main landing page
├── components/
│   ├── ui/                         # shadcn/ui components
│   └── file-upload/
│       ├── file-drop-zone.tsx      # Drag-and-drop area
│       └── file-info.tsx           # File information display
└── lib/
    └── file-handler.ts              # Validation and utility functions
```

## Key Implementation Details

### Drag-and-Drop Events

```typescript
// Prevent default to avoid browser opening file
onDragOver={(e) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(true);
}}

onDrop={(e) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFile(files[0]); // Only first file
  }
}}
```

### File Validation

```typescript
const validateFile = (file: File): FileValidationResult => {
  // Check type
  if (!ALLOWED_VIDEO_TYPES.includes(file.type as any)) {
    return { isValid: false, error: "Unsupported file type" };
  }
  
  // Check size
  if (file.size > DEFAULT_MAX_FILE_SIZE) {
    return { isValid: false, error: "File too large" };
  }
  
  return { isValid: true };
};
```

### File Size Formatting

```typescript
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB";
};
```

## Testing Checklist

- [ ] Drag-and-drop works on desktop browsers
- [ ] Click-to-browse works on all devices
- [ ] Visual feedback appears during drag
- [ ] File validation works for supported types
- [ ] File validation rejects unsupported types
- [ ] File size validation works
- [ ] Error messages display correctly
- [ ] File info displays after selection
- [ ] Multiple files handled correctly (only first accepted)
- [ ] Mobile devices use click-to-browse (no drag-and-drop)

## Next Steps

After implementing this feature:
1. Test on multiple browsers (Chrome, Firefox, Safari, Edge)
2. Test on mobile devices (iOS Safari, Chrome Mobile)
3. Verify performance meets success criteria (2s load, 100ms drag feedback, 1s validation)
4. Proceed to next feature (compression options/processing)

## References

- [Specification](./spec.md)
- [Data Model](./data-model.md)
- [Research](./research.md)
- [Component Contracts](./contracts/component-interfaces.ts)

