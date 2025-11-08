# Research: File Upload Landing Page

**Date**: 2025-01-27  
**Feature**: 001-file-upload

## Research Questions

### 1. Testing Framework Selection

**Question**: What testing approach should be used for a Next.js 16 + React 19 project?

**Research Context**: Need to determine testing framework that works well with Next.js App Router, React Server Components, and TypeScript. Must support component testing, integration testing, and be fast for iteration.

**Findings**:

- **Next.js 16** recommends Vitest for unit testing and Playwright for E2E testing
- **React 19** works with React Testing Library (latest version supports React 19)
- **Vitest** is faster than Jest, has better TypeScript support, and integrates well with Next.js
- **Playwright** is the recommended E2E testing tool for Next.js projects
- **React Testing Library** is the standard for component testing in React

**Decision**: Use Vitest + React Testing Library for unit/component tests, Playwright for E2E tests (if needed)

**Rationale**: 
- Vitest is faster and has better Next.js integration than Jest
- React Testing Library is the standard for React component testing
- Playwright is officially recommended by Next.js for E2E testing
- All tools work well with TypeScript and modern React patterns

**Alternatives Considered**:
- Jest: Slower, requires more configuration for Next.js
- Cypress: Good but Playwright is more modern and recommended by Next.js
- No testing: Violates best practices, but aligns with "ship fast" - deferred to later if needed

**Implementation Notes**: 
- Can start without tests and add later (aligns with constitution Principle 1: Ship Fast)
- If tests are added, use Vitest + React Testing Library
- E2E tests with Playwright can be added later if needed

---

### 2. File Validation Approach

**Question**: How to validate video file types and sizes in the browser?

**Research Context**: Need client-side validation for video files. Must check file type and size before processing.

**Findings**:

- **File.type** property provides MIME type (e.g., "video/mp4", "video/quicktime")
- **File.size** property provides file size in bytes
- Common video MIME types: video/mp4, video/quicktime (MOV), video/x-msvideo (AVI), video/webm
- Browser File API is well-supported across all modern browsers
- File validation should happen immediately on selection, before reading file contents

**Decision**: Use File.type for MIME type validation, File.size for size validation

**Rationale**:
- Native browser APIs, no dependencies needed
- Fast validation without reading file contents
- Well-supported across all target browsers
- Simple implementation aligns with "practical over perfect"

**Alternatives Considered**:
- Reading file headers: More accurate but slower and more complex
- Server-side validation: Not applicable since processing is client-side
- File extension checking: Less reliable than MIME type

**Implementation Notes**:
- Validate MIME type against allowed list: ["video/mp4", "video/quicktime", "video/x-msvideo", "video/webm"]
- File size limit: Start with 500MB, adjust based on browser memory constraints
- Show clear error messages for unsupported types or oversized files

---

### 3. Drag-and-Drop Implementation

**Question**: Best approach for drag-and-drop file selection in React?

**Research Context**: Need drag-and-drop functionality that works on desktop and has fallback for mobile. Must provide visual feedback.

**Findings**:

- **HTML5 Drag and Drop API** is native and well-supported
- **react-dropzone** is a popular library but adds dependency (violates "practical over perfect" if native works)
- Native API requires handling: dragover, dragleave, drop events
- Must prevent default browser behavior (opening file) on drop
- Click-to-browse uses standard `<input type="file">` element
- Mobile devices don't support drag-and-drop, so click-to-browse is primary method

**Decision**: Use native HTML5 Drag and Drop API with standard file input for click-to-browse

**Rationale**:
- No additional dependencies (aligns with constitution Principle 3)
- Native API is well-supported and performant
- Simple implementation for basic drag-and-drop needs
- Standard file input works everywhere including mobile

**Alternatives Considered**:
- react-dropzone: Popular but adds dependency; native API sufficient for needs
- Custom drag library: Over-engineering for simple use case

**Implementation Notes**:
- Handle dragover, dragleave, drop events
- Prevent default behavior to avoid browser opening files
- Use state to track drag state for visual feedback
- Hide file input, style drop zone, trigger input.click() for click-to-browse

---

### 4. File Information Display

**Question**: How to format and display file information (name, size) to users?

**Research Context**: Need to show file name and size after selection. Must handle long names gracefully.

**Findings**:

- **File.name** provides filename with extension
- **File.size** is in bytes, should be formatted (KB, MB, GB)
- Long filenames should be truncated with ellipsis
- File size formatting: Use standard conversion (1024 bytes = 1 KB)
- Display should be clear and readable for general audience

**Decision**: Format file size to human-readable format (KB/MB/GB), truncate long filenames with ellipsis

**Rationale**:
- Simple utility functions, no dependencies
- Standard formatting users expect
- Truncation prevents UI overflow

**Implementation Notes**:
- Format bytes: function to convert bytes to KB/MB/GB with 1-2 decimal places
- Truncate filename: Show first N characters + "..." + extension if too long
- Display in shadcn/ui Card or similar component for clean presentation

---

## Summary

All research questions resolved. Key decisions:
1. **Testing**: Vitest + React Testing Library (can defer to later)
2. **File Validation**: Native File API (type, size)
3. **Drag-and-Drop**: Native HTML5 API
4. **File Display**: Simple formatting utilities

All decisions align with constitution principles: using native APIs, minimal dependencies, practical solutions.

