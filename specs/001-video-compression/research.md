# Research: Video Compression

**Date**: 2025-01-27  
**Feature**: 001-video-compression

## Research Questions

### 1. mediabunny Compression Configuration

**Question**: How to configure mediabunny for maximum compression while maintaining acceptable quality?

**Research Context**: Need to determine optimal compression settings using mediabunny library. Must balance file size reduction with video quality preservation. Settings should work for general audience use cases.

**Findings**:

- mediabunny uses FFmpeg-based compression in the browser via WebAssembly
- Compression quality is typically controlled by bitrate and codec settings
- For maximum compression with acceptable quality:
  - Use H.264 codec (most compatible)
  - Set CRF (Constant Rate Factor) between 23-28 (lower = better quality, higher = more compression)
  - Use preset "medium" or "fast" for reasonable speed
  - Reduce resolution if original is very high (optional, but increases compression)
  - Use two-pass encoding for better compression (slower but better results)

**Decision**: Use CRF value of 25 with H.264 codec, medium preset. This provides good balance between compression and quality.

**Rationale**: 
- CRF 25 provides good compression (~30-50% reduction) while maintaining acceptable quality
- H.264 is widely supported and compatible
- Medium preset balances speed and compression efficiency
- Can be adjusted easily if results don't meet expectations

**Alternatives Considered**:
- CRF 23: Better quality but less compression
- CRF 28: More compression but noticeable quality loss
- Variable bitrate: More complex, CRF is simpler and effective
- Resolution reduction: Could compress more but changes video dimensions (defer unless needed)

**Implementation Notes**: 
- mediabunny API allows setting encoder options
- Configuration can be adjusted based on user feedback
- Start with CRF 25, iterate if needed

---

### 2. Progress Tracking with mediabunny

**Question**: How to track compression progress and provide real-time feedback to users?

**Research Context**: Need to show progress bar during compression. mediabunny processes videos which can take time, so users need feedback.

**Findings**:

- mediabunny processes videos asynchronously
- Progress can be tracked through:
  - Event callbacks during processing
  - File size estimation (if available)
  - Time-based estimation (less accurate)
  - Frame-based progress (if mediabunny exposes this)
- For accurate progress, need to use mediabunny's progress events or callbacks
- If progress events not available, can use time-based estimation with periodic updates

**Decision**: Use mediabunny progress events/callbacks if available, otherwise use time-based estimation with periodic state updates.

**Rationale**:
- Progress events provide most accurate feedback
- Time-based estimation is fallback if events not available
- Periodic updates (every 100-500ms) provide smooth progress bar animation
- Can combine with file size changes for better accuracy

**Alternatives Considered**:
- No progress tracking: Poor UX, users don't know if system is working
- Only completion notification: Users wait without feedback (frustrating)
- Frame counting: More accurate but may not be exposed by mediabunny API

**Implementation Notes**:
- Check mediabunny API for progress callbacks/events
- Implement progress state management in React
- Update progress bar component every 100-500ms
- Show indeterminate progress if exact progress unavailable

---

### 3. Compression Error Handling

**Question**: How to handle compression errors gracefully (unsupported codecs, memory limits, corrupted files)?

**Research Context**: Compression can fail for various reasons. Need to handle errors and provide clear feedback to users.

**Findings**:

- Common compression errors:
  - Unsupported codec/format
  - Browser memory limits exceeded
  - Corrupted video file
  - WebAssembly initialization failures
  - Processing timeout (very large files)
- Error handling should:
  - Catch errors from mediabunny API
  - Display user-friendly error messages
  - Allow user to retry or select different file
  - Log technical details for debugging (optional)

**Decision**: Implement try-catch error handling around compression calls, display user-friendly error messages, allow retry.

**Rationale**:
- Try-catch is standard JavaScript error handling
- User-friendly messages prevent confusion
- Retry option gives users second chance
- Technical details can be logged for debugging without confusing users

**Implementation Notes**:
- Wrap compression logic in try-catch
- Map technical errors to user-friendly messages
- Provide "Try again" button on error
- Clear error state when new file is selected

---

### 4. Download Compressed Video

**Question**: How to enable users to download the compressed video file after compression completes?

**Research Context**: After compression, users need to download the compressed file. File exists in browser memory.

**Findings**:

- Compressed video will be a Blob or File object in browser memory
- Browser download can be triggered using:
  - `URL.createObjectURL()` to create download link
  - `<a>` element with `download` attribute
  - `Blob` object with appropriate MIME type
- File should be named appropriately (e.g., "original-name-compressed.mp4")
- Download should happen automatically or via button click

**Decision**: Use `URL.createObjectURL()` with `<a>` element and `download` attribute. Provide download button after compression completes.

**Rationale**:
- Standard browser API, well-supported
- Simple implementation
- User controls when to download (better UX than auto-download)
- Can name file appropriately

**Implementation Notes**:
- Create Blob URL from compressed video data
- Trigger download via button click
- Clean up object URL after download
- Name file with "-compressed" suffix

---

### 5. Size Savings Calculation

**Question**: How to calculate and display size savings (absolute size and percentage)?

**Research Context**: Need to show original size, compressed size, and savings to users.

**Findings**:

- Original size: Available from File.size property
- Compressed size: Available from compressed Blob/File size
- Absolute savings: Original size - Compressed size
- Percentage savings: (Absolute savings / Original size) * 100
- Format sizes using existing formatFileSize utility
- Display savings prominently to show value

**Decision**: Calculate savings from original and compressed file sizes, format using existing utility, display prominently.

**Rationale**:
- Simple calculation using file sizes
- Reuse existing formatFileSize utility
- Clear display helps users understand value
- Percentage and absolute size both useful

**Implementation Notes**:
- Store original size when file selected
- Get compressed size after compression
- Calculate savings (absolute and percentage)
- Display in human-readable format
- Highlight savings prominently

---

## Summary

All research questions resolved. Key decisions:
1. **Compression Settings**: CRF 25, H.264 codec, medium preset
2. **Progress Tracking**: Use mediabunny progress events if available, otherwise time-based estimation
3. **Error Handling**: Try-catch with user-friendly messages and retry option
4. **Download**: Use URL.createObjectURL() with download button
5. **Size Savings**: Calculate from file sizes, format with existing utility

All decisions align with constitution principles: using existing library (mediabunny), practical solutions, and fast iteration.

