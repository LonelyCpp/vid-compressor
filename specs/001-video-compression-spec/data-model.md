# Data Model: Video Compression For Dummies

**Feature**: 001-video-compression-spec  
**Date**: November 9, 2025

## Entities

### Theme Preference

**Description**: Stores the user's preferred theme (light or dark mode) for the application.

**Storage**: Browser localStorage (client-side only, no server storage)

**Fields**:

- `theme` (string, required): The selected theme value
  - Values: `"light"` | `"dark"` | `"system"`
  - Default: `"system"` (respects system preference)
  - When `"system"`: Application detects and uses OS/browser preference

**State Transitions**:

1. **Initial State**: No preference stored → Detect system preference → Apply theme
2. **User Selection**: User clicks theme toggle → Update localStorage → Apply theme immediately
3. **Return Visit**: Load from localStorage → Apply stored theme (or system if "system")
4. **System Change**: If theme is "system" and OS preference changes → Re-detect and apply

**Validation Rules**:

- Must be one of: `"light"`, `"dark"`, or `"system"`
- If invalid value in localStorage, fall back to `"system"`
- If localStorage unavailable (private browsing, disabled), use system preference only

**Persistence**:

- Stored in browser localStorage with key: `"vid-compressor-theme"` (or similar)
- Persists across browser sessions
- Cleared when user clears browser data (graceful fallback to system preference)

**Relationships**:

- None (standalone preference, no relationships to other entities)

---

## No Additional Entities

This feature is primarily UI/UX focused. The only data entity is the theme preference, which is stored client-side in localStorage. No database entities, API models, or complex data relationships are required.

