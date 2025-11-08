# Contracts: File Upload Landing Page

**Feature**: 001-file-upload  
**Date**: 2025-01-27

## Overview

This feature is entirely client-side with no API endpoints. Contracts define TypeScript interfaces for component props and utility functions.

## Contract Files

### component-interfaces.ts

Defines TypeScript interfaces for:
- `SelectedFile`: File state with validation and processing status
- Component props: `FileUploadProps`, `FileDropZoneProps`, `FileInfoProps`
- Utility interfaces: `FileValidationResult`, `FileHandler`
- Constants: `ALLOWED_VIDEO_TYPES`, `DEFAULT_MAX_FILE_SIZE`

## Usage

These interfaces ensure type safety across components and provide a contract for:
- Component prop types
- File validation logic
- State management
- Utility functions

## Implementation Notes

- All interfaces are TypeScript-only (no runtime validation)
- Constants define default values that can be overridden
- Interfaces align with the data model defined in `data-model.md`

