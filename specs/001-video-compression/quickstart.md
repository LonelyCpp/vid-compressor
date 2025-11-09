# Quick Start: Video Compression

**Feature**: 001-video-compression  
**Date**: 2025-01-27

## Overview

This guide helps you quickly understand and implement the video compression feature. The feature automatically compresses videos after file selection, shows progress, and displays compression results with size savings.

## Key Concepts

1. **Client-Side Only**: All compression happens in the browser - no server upload
2. **mediabunny Library**: Uses mediabunny for video compression (already installed)
3. **Automatic Compression**: Starts automatically after file validation
4. **Progress Tracking**: Real-time progress bar during compression
5. **Results Display**: Shows original size, compressed size, and savings

## Implementation Steps

### 1. Create Video Compressor Service

**Location**: `src/lib/video-compressor.ts`

**Key Functions**:
- `compress(file, onProgress)`: Compress video file using mediabunny
- `getCompressionConfig()`: Get compression configuration (CRF, codec, preset)

**Implementation Notes**:
- Use mediabunny API to read and convert video
- Configure for maximum compression (CRF 25, H.264, medium preset)
- Call onProgress callback with progress percentage (0-100)
- Return compressed Blob/File when complete
- Handle errors gracefully

### 2. Create Compression Progress Component

**Location**: `src/components/video-compression/compression-progress.tsx`

**Key Features**:
- Display progress bar (0-100%)
- Show compression status text
- Display error messages if compression fails

**Implementation Notes**:
- Use shadcn/ui Progress component if available
- Update progress bar based on compressionProgress prop
- Show "Compressing..." text during compression
- Display error message if status is "error"

### 3. Create Compression Results Component

**Location**: `src/components/video-compression/compression-results.tsx`

**Key Features**:
- Display original file size
- Display compressed file size
- Display size savings (absolute and percentage)
- Provide download button for compressed file

**Implementation Notes**:
- Use formatFileSize utility for size display
- Calculate savings percentage: ((original - compressed) / original) * 100
- Highlight savings prominently
- Use URL.createObjectURL() for download
- Clean up object URL after download

### 4. Integrate Compression into Page

**Location**: `src/app/page.tsx`

**Key Features**:
- Trigger compression when file is validated
- Track compression state and progress
- Display progress component during compression
- Display results component after compression
- Handle compression errors

**State Management**:
```typescript
const [compressedVideo, setCompressedVideo] = useState<CompressedVideo | null>(null);
const [compressionProgress, setCompressionProgress] = useState(0);
const [compressionError, setCompressionError] = useState<string | null>(null);
```

## Component Structure

```
src/
├── app/
│   └── page.tsx                              # Main page (integrates compression)
├── components/
│   ├── ui/                                    # shadcn/ui components
│   └── video-compression/
│       ├── compression-progress.tsx          # Progress bar component
│       └── compression-results.tsx            # Results display component
└── lib/
    ├── file-handler.ts                        # File validation (existing)
    └── video-compressor.ts                    # Compression logic using mediabunny
```

## Key Implementation Details

### Compression Initiation

```typescript
// When file is validated and passes
if (selectedFile.validationStatus === "valid") {
  startCompression(selectedFile.file);
}
```

### Progress Tracking

```typescript
const compressVideo = async (file: File) => {
  const onProgress = (progress: number) => {
    setCompressionProgress(progress);
  };
  
  try {
    const compressed = await videoCompressor.compress(file, onProgress);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### Download Compressed File

```typescript
const handleDownload = () => {
  if (!compressedVideo?.compressedFile) return;
  
  const url = URL.createObjectURL(compressedVideo.compressedFile);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${compressedVideo.name.replace(/\.[^/.]+$/, "")}-compressed.mp4`;
  a.click();
  URL.revokeObjectURL(url);
};
```

### Size Savings Calculation

```typescript
const calculateSavings = (original: number, compressed: number) => {
  const absolute = original - compressed;
  const percent = (absolute / original) * 100;
  return { absolute, percent };
};
```

## Testing Checklist

- [ ] Compression starts automatically after file validation
- [ ] Progress bar appears and updates during compression
- [ ] Compression completes successfully for supported formats
- [ ] Compressed file is smaller than original
- [ ] Size savings are calculated and displayed correctly
- [ ] Download button works and downloads compressed file
- [ ] Error handling works for unsupported formats
- [ ] Error handling works for corrupted files
- [ ] Progress bar shows 100% when complete
- [ ] Results display shows original size, compressed size, and savings

## Next Steps

After implementing this feature:
1. Test with various video formats (MP4, MOV, AVI, WebM)
2. Test with different file sizes
3. Verify compression quality is acceptable
4. Verify progress tracking is accurate
5. Test error handling scenarios
6. Verify download functionality works

## References

- [Specification](./spec.md)
- [Data Model](./data-model.md)
- [Research](./research.md)
- [Component Contracts](./contracts/component-interfaces.ts)
- [mediabunny Documentation](https://mediabunny.dev/llms.txt)

