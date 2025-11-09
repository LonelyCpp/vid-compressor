# Data Model: Video Compression

**Feature**: 001-video-compression  
**Date**: 2025-01-27

## Overview

This feature extends the file upload functionality to compress videos client-side. The data model includes compression state, progress tracking, and results. All data exists only in browser memory during the user's session.

## Entities

### CompressedVideo

Represents the result of video compression. This entity extends the SelectedFile entity from the file upload feature.

**Attributes**:
- `compressedFile`: Blob | File - The compressed video file data
- `originalSize`: number - Original file size in bytes
- `compressedSize`: number - Compressed file size in bytes
- `sizeSavings`: number - Absolute size saved in bytes (originalSize - compressedSize)
- `sizeSavingsPercent`: number - Percentage of size saved ((sizeSavings / originalSize) * 100)
- `compressionStatus`: "idle" | "compressing" | "complete" | "error" - Current compression state
- `compressionProgress`: number - Compression progress percentage (0-100)
- `compressionError`: string | null - Error message if compression fails
- `processingTime`: number | null - Time taken to compress in milliseconds

**Relationships**: 
- Extends SelectedFile entity (inherits file, name, type, validationStatus, etc.)
- Created from SelectedFile after validation passes

**Lifecycle**:
1. Created when compression starts (from SelectedFile)
2. Updated with progress during compression
3. Updated with compressed file data when compression completes
4. Discarded when user selects new file or navigates away

**Validation Rules**:
- originalSize must be greater than 0
- compressedSize must be less than or equal to originalSize (ideally less)
- compressionProgress must be between 0 and 100
- sizeSavingsPercent must be between 0 and 100 (ideally > 0)

**State Transitions**:
```
[File Validated] → compressionStatus: "idle"
                 ↓
[Compression Starts] → compressionStatus: "compressing", compressionProgress: 0
                 ↓
[Progress Updates] → compressionProgress: 1-99
                 ↓
[Compression Complete] → compressionStatus: "complete", compressionProgress: 100
                 OR
[Compression Error] → compressionStatus: "error", compressionError: "error message"
```

## Client-Side State

### Component State (React)

**CompressionState**:
```typescript
{
  compressedVideo: CompressedVideo | null
  isCompressing: boolean
  compressionProgress: number
  compressionError: string | null
}
```

**State Management**: 
- Local component state using React useState
- State updates triggered by compression progress callbacks
- State resets when new file is selected

## Data Flow

1. **Compression Initiation**:
   - User selects and validates file (from file upload feature)
   - SelectedFile with validationStatus: "valid" triggers compression
   - CompressedVideo entity created with originalSize from SelectedFile

2. **Compression Progress**:
   - Compression library processes video
   - Progress callbacks update compressionProgress (0-100)
   - State updates trigger UI progress bar updates

3. **Compression Completion**:
   - Compressed file data received
   - compressedSize calculated from compressed file
   - sizeSavings and sizeSavingsPercent calculated
   - processingTime recorded
   - compressionStatus set to "complete"

4. **Results Display**:
   - Original size, compressed size, and savings displayed
   - Download button enabled for compressed file
   - User can download or start new compression

5. **Error Handling**:
   - If compression fails, compressionStatus set to "error"
   - compressionError contains user-friendly error message
   - User can retry or select different file

## Constraints

- **Memory**: Compressed files exist only in browser memory, limited by available RAM
- **Persistence**: No persistence - files are lost on page refresh/navigation
- **Concurrency**: Only one compression can run at a time (per user session)
- **Browser Support**: Requires WebAssembly support for mediabunny
- **File Size**: Limited by browser memory constraints (typically 1-2GB depending on device)

## Notes

- No database or server-side storage required
- Compressed file is a Blob/File object, no custom serialization needed
- State is ephemeral and component-scoped
- Compression happens entirely client-side
- Progress tracking requires mediabunny progress callbacks or time-based estimation

