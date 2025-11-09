# Component Contracts

This directory contains TypeScript interface definitions for components in the Video Compression For Dummies feature.

## Files

- `component-interfaces.ts` - TypeScript interfaces for theme toggle, theme provider, and page layout components

## Purpose

These contracts ensure:
- Type safety across components
- Consistent API for theme management
- Clear expectations for component behavior
- Easy integration with existing codebase

## Usage

Import interfaces in component files:

```typescript
import type { ThemeToggleProps, ThemeContextValue } from '@/specs/001-video-compression-spec/contracts/component-interfaces';
```

Or copy to `src/lib/types/` if preferred for easier imports.

