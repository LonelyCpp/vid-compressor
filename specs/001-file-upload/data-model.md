# Data Model: File Upload Landing Page

**Feature**: 001-file-upload  
**Date**: 2025-01-27

## Overview

This feature handles file selection and validation entirely in the browser. No persistent storage is required. The data model consists of client-side state representing the selected file and its validation status.

## Entities

### SelectedFile

Represents a file selected by the user. This is a transient entity that exists only in browser memory during the user's session.

**Attributes**:
- `file`: File (native browser File object)
- `name`: string - File name from File.name
- `type`: string - MIME type from File.type (e.g., "video/mp4")
- `size`: number - File size in bytes from File.size
- `validationStatus`: "pending" | "valid" | "invalid" - Current validation state
- `validationError`: string | null - Error message if validation fails
- `processingStatus`: "idle" | "processing" | "complete" - Current processing state

**Relationships**: None (standalone entity)

**Lifecycle**:
1. Created when user selects/drops a file
2. Validated immediately after creation
3. Updated with processing status as file is processed
4. Discarded when user selects a new file or navigates away

**Validation Rules**:
- File type must be in allowed list: ["video/mp4", "video/quicktime", "video/x-msvideo", "video/webm"]
- File size must not exceed maximum (500MB default, configurable)
- File must be a valid File object (not null/undefined)

**State Transitions**:
```
[File Selected] → validationStatus: "pending"
                 ↓
[Validation Check] → validationStatus: "valid" | "invalid"
                     ↓ (if valid)
[Processing Starts] → processingStatus: "processing"
                     ↓
[Processing Complete] → processingStatus: "complete"
```

## Client-Side State

### Component State (React)

**FileUploadState**:
```typescript
{
  selectedFile: SelectedFile | null
  dragActive: boolean
  error: string | null
}
```

**State Management**: 
- Local component state using React useState
- No global state management needed (single page feature)
- State resets when new file is selected

## Data Flow

1. **File Selection**:
   - User drags/drops or clicks to select file
   - Browser File API creates File object
   - File object stored in component state

2. **Validation**:
   - File.type checked against allowed MIME types
   - File.size checked against maximum limit
   - Validation result stored in SelectedFile.validationStatus

3. **Display**:
   - File information (name, size) displayed to user
   - Processing status updated as file is processed
   - Error messages displayed if validation fails

4. **Transition**:
   - After successful validation and file info display
   - Component transitions to next step (out of scope for this feature)

## Constraints

- **Memory**: Files exist only in browser memory, limited by available RAM
- **Persistence**: No persistence - files are lost on page refresh/navigation
- **Concurrency**: Only one file can be selected at a time (multiple files silently ignored)
- **Browser Support**: Requires File API support (all modern browsers)

## Notes

- No database or server-side storage required
- File object is native browser API, no custom serialization needed
- State is ephemeral and component-scoped
- File data is not transmitted over network (client-side processing only)

