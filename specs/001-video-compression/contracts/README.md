# Contracts: Video Compression

**Feature**: 001-video-compression  
**Date**: 2025-01-27

## Overview

This feature is entirely client-side with no API endpoints. Contracts define TypeScript interfaces for component props, compression service, and data structures.

## Contract Files

### component-interfaces.ts

Defines TypeScript interfaces for:
- `CompressedVideo`: Extended SelectedFile with compression metadata
- Component props: `CompressionProgressProps`, `CompressionResultsProps`
- Service interfaces: `VideoCompressor`, `CompressionConfig`, `CompressionResult`
- Constants: `DEFAULT_COMPRESSION_CONFIG`

## Usage

These interfaces ensure type safety across components and provide a contract for:
- Component prop types
- Compression service interface
- State management
- Configuration management

## Implementation Notes

- All interfaces are TypeScript-only (no runtime validation)
- CompressedVideo extends SelectedFile from file-upload feature
- CompressionConfig can be adjusted based on user feedback
- Interfaces align with the data model defined in `data-model.md`

