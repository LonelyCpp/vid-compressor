# Research: Landing UI Simplification

**Feature**: 001-simplify-ui  
**Date**: 2025-11-09  
**Status**: Complete

## Research Tasks

### Task 1: shadcn/ui Dialog Component Implementation

**Question**: How to implement a modal dialog using shadcn/ui that follows accessibility best practices?

**Findings**:
- shadcn/ui Dialog component is built on Radix UI Dialog primitives
- Provides built-in accessibility features: focus trap, ARIA attributes, keyboard navigation
- Installation: `npx shadcn@latest add dialog`
- Uses `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription` components
- Supports `onOpenChange` callback for state management
- ESC key handling is built-in
- Focus management is automatic (returns focus to trigger on close)

**Decision**: Use shadcn/ui Dialog component for the "For nerds" modal.

**Rationale**: 
- Aligns with Principle 7 (use shadcn/ui components)
- Provides accessibility out of the box
- Minimal implementation effort
- Consistent with existing UI component patterns

**Alternatives Considered**:
- Custom modal implementation: Rejected - violates Principle 3 (practical over perfect) and Principle 7
- Headless UI Dialog: Rejected - shadcn/ui already wraps Radix UI which is similar, adds unnecessary dependency

---

### Task 2: Tab Order Management for Upload Area

**Question**: How to ensure the upload/drag-and-drop area is the first interactive element in tab order?

**Findings**:
- HTML `tabindex` attribute controls tab order
- `tabindex="0"` makes element focusable in natural tab order
- `tabindex="-1"` makes element programmatically focusable but not in tab order
- `tabindex="1"` or higher creates explicit tab order (not recommended)
- For button elements, they are naturally focusable
- CSS `:focus-visible` provides visual focus indicators
- React `useRef` and `useEffect` can programmatically focus elements on mount

**Decision**: 
- Ensure `FileDropZone` component (which renders as a `<button>`) is the first focusable element in the main content area
- Use natural DOM order (no explicit tabindex manipulation)
- Add `autoFocus` or programmatic focus on mount if needed
- Ensure header controls (theme toggle, "For nerds" button) come before main content in DOM order

**Rationale**:
- Natural tab order is most accessible and predictable
- Button elements are inherently focusable
- Programmatic focus can be added if needed without complexity

**Alternatives Considered**:
- Explicit `tabindex` values: Rejected - creates maintenance burden and accessibility issues
- Skip links: Not needed for this single-page application

---

### Task 3: Modal Content Structure for Technical Details

**Question**: What technical details should be included in the "For nerds" modal?

**Findings**:
- From spec assumptions: "supported formats, size limits, and compression approach"
- Current implementation supports: MP4, MOV, AVI, WebM
- File size limit: DEFAULT_MAX_FILE_SIZE (from file-handler.ts)
- Compression approach: Uses mediabunny library (client-side processing)

**Decision**: Include the following technical details in the modal:
- Supported video formats: MP4, MOV, AVI, WebM
- Maximum file size: Display current limit from configuration
- Compression method: Client-side processing using WebCodecs API (via mediabunny)
- Codec information: H.264/AVC encoding
- Browser requirements: Modern browsers with WebCodecs support

**Rationale**:
- Addresses power user needs for technical understanding
- Reduces support inquiries about technical specs
- Information is already available in codebase

**Alternatives Considered**:
- Detailed codec parameters: Rejected - too technical, may change with implementation
- Performance metrics: Rejected - not relevant for user decision-making

---

### Task 4: Responsive Layout Considerations

**Question**: How to ensure upload area remains prominent across all screen sizes?

**Findings**:
- Current layout uses Tailwind CSS responsive classes
- Grid layout: `lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]` splits content
- Upload area is in the right column (`<aside>`) on desktop
- On mobile, grid stacks vertically
- Hero section takes significant vertical space with current text

**Decision**:
- Remove verbose hero text, keep only title and subtitle
- Move upload area to be more prominent (consider full-width on mobile, or reorder grid)
- Ensure upload area is above the fold on mobile (no scrolling required)
- Use responsive spacing: reduce padding/margins on mobile

**Rationale**:
- Reduces vertical space consumption
- Makes upload area immediately visible
- Aligns with spec requirement for upload-first experience

**Alternatives Considered**:
- Keep two-column layout: Accepted - maintains desktop experience while mobile stacks
- Single column always: Rejected - wastes horizontal space on desktop

---

## Summary

All research tasks completed. No blocking clarifications remain. Implementation can proceed using:
1. shadcn/ui Dialog component for modal
2. Natural tab order for accessibility
3. Technical details from existing codebase
4. Responsive layout adjustments to prioritize upload area

