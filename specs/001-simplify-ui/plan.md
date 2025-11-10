# Implementation Plan: Landing UI Simplification

**Branch**: `001-simplify-ui` | **Date**: 2025-11-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-simplify-ui/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Simplify the landing page UI by reducing explanatory text to just a title and one-line subtitle, prioritizing the file upload/drag-and-drop area as the primary UI element, and adding a "For nerds" button beside the theme toggle that opens a modal with technical details. This improves conversion by reducing cognitive load and making the primary action immediately obvious.

## Technical Context

**Language/Version**: TypeScript 5.x, React 19.2.0, Next.js 16.0.1  
**Primary Dependencies**: next-themes (theme management), shadcn/ui (UI components), lucide-react (icons), Radix UI (Dialog primitives)  
**Storage**: N/A (client-side only UI changes)  
**Testing**: Manual testing, browser DevTools for accessibility  
**Target Platform**: Web browsers (desktop, tablet, mobile)  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: Page load < 2s, first contentful paint < 1s, modal open/close < 100ms  
**Constraints**: Must maintain existing theme toggle functionality, preserve accessibility (WCAG AA), responsive across breakpoints, keyboard navigation support  
**Scale/Scope**: Single-page application, client-side only, no backend changes required

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle 1: Ship Fast, Iterate Faster
✅ **PASS**: UI simplification is straightforward refactoring. No complex architecture needed.

### Principle 2: Minimal Process Overhead
✅ **PASS**: Direct component updates, no new processes or workflows.

### Principle 3: Practical Over Perfect
✅ **PASS**: Using existing shadcn/ui Dialog component rather than building custom modal.

### Principle 4: Output-Driven Decisions
✅ **PASS**: Changes directly improve user experience and conversion metrics.

### Principle 5: Quick Decisions, Easy Reversals
✅ **PASS**: Component structure changes are easily reversible.

### Principle 6: Next.js and React Stack
✅ **PASS**: All changes use existing Next.js App Router and React patterns.

### Principle 7: shadcn/ui for UI Components
✅ **PASS**: Using shadcn/ui Dialog component for modal, Button component already in use.

**Gate Status**: ✅ **ALL GATES PASSED** - Proceed to Phase 0

### Post-Phase 1 Re-evaluation

After completing Phase 1 design and research:

**Gate Status**: ✅ **ALL GATES STILL PASS** - Design decisions align with all principles:
- Using shadcn/ui Dialog confirms Principle 7 compliance
- Component structure remains simple and reversible (Principle 5)
- No new dependencies beyond shadcn/ui Dialog (Principle 3)
- Implementation approach maintains fast iteration (Principle 1)

## Project Structure

### Documentation (this feature)

```text
specs/001-simplify-ui/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx       # Header with theme toggle + "For nerds" button
│   ├── page.tsx         # Landing page wrapper
│   └── globals.css      # Theme variables
├── components/
│   ├── ui/
│   │   ├── button.tsx           # Existing shadcn/ui Button
│   │   ├── dialog.tsx           # NEW: shadcn/ui Dialog component
│   │   └── theme-toggle.tsx     # Existing theme toggle
│   ├── video-compression/
│   │   ├── guide-page.tsx        # MODIFY: Simplify hero section
│   │   └── technical-details-modal.tsx  # NEW: Modal component
│   └── file-upload/
│       └── file-drop-zone.tsx    # Existing (no changes)
└── lib/
    └── utils.ts         # Existing utility functions
```

**Structure Decision**: Single Next.js web application using existing App Router structure. Changes are limited to:
1. Simplifying `guide-page.tsx` hero section
2. Adding Dialog component from shadcn/ui
3. Creating new `technical-details-modal.tsx` component
4. Updating `layout.tsx` header to include "For nerds" button

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected. All changes align with project principles.
