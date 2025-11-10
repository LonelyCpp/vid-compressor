# Data Model: Landing UI Simplification

**Feature**: 001-simplify-ui  
**Date**: 2025-11-09

## Overview

This feature is primarily a UI refactoring with minimal data model changes. The focus is on component state management for the modal and simplified content structure.

## Component State Models

### TechnicalDetailsModal Component

**State**:
- `isOpen: boolean` - Controls modal visibility
- Managed via Dialog component's `open` prop and `onOpenChange` callback

**Props**:
```typescript
interface TechnicalDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
```

**Behavior**:
- Opens when "For nerds" button is clicked
- Closes on ESC key press, backdrop click, or close button click
- Focus returns to trigger button on close

---

### GuidePage Component (Modified)

**State Changes**:
- No new state required
- Existing state remains: `selectedFile`, `dragActive`, `compressionStatus`, etc.

**Content Structure Changes**:
- **Before**: Verbose hero section with multiple paragraphs explaining compression
- **After**: Simple title and one-line subtitle only

**Layout Changes**:
- Hero section reduced to minimal text
- Upload area positioning adjusted for prominence
- Grid layout maintained but with reordered visual hierarchy

---

### Layout Component (Header Modification)

**New Elements**:
- "For nerds" button adjacent to theme toggle
- Button triggers TechnicalDetailsModal

**State**:
- Modal open/close state managed in parent component or via Dialog's internal state

---

## Data Flow

```
User clicks "For nerds" button
  ↓
Layout component (or dedicated handler)
  ↓
Sets modal open state to true
  ↓
TechnicalDetailsModal renders with open={true}
  ↓
User closes modal (ESC/click/button)
  ↓
onOpenChange(false) called
  ↓
Focus returns to trigger button
```

## No Persistent Data

This feature does not introduce any:
- Database entities
- API endpoints
- Local storage requirements
- Session state

All state is component-local and ephemeral (modal open/close state).

## Validation Rules

**Modal Content**:
- Technical details are static content (no user input)
- No validation required

**Upload Area**:
- Existing validation rules remain unchanged
- File type and size validation from `file-handler.ts` still applies

## State Transitions

### Modal State Machine

```
[Closed] --click "For nerds"--> [Open]
[Open] --ESC/close button/backdrop--> [Closed]
```

Simple binary state with no intermediate states required.

