# Implementation Plan: Video Compression For Dummies

**Branch**: `001-video-compression-spec` | **Date**: November 9, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-video-compression-spec/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Update the video compression guide with a beginner-friendly title "Video Compression For Dummies", ensure all content uses layman-friendly language without technical jargon, refine desktop layout to utilize full screen width (80%+ on screens ≥1280px), and implement dark/light mode theming with system preference detection and persistent user choice. The theme toggle will be located in the header, and both themes must meet WCAG AA contrast standards.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Next.js 16.0.1, React 19.2.0, shadcn/ui, Tailwind CSS 4.x  
**Storage**: Browser localStorage (for theme preference persistence)  
**Testing**: Biome for linting/formatting (test framework not yet established per constitution)  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge)  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: Theme switching responds instantly (<100ms), page layout adapts smoothly on resize  
**Constraints**: Must work client-side only (no server required), must respect system dark mode preference, WCAG AA contrast compliance  
**Scale/Scope**: Single-page application, desktop-first responsive design

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle Compliance

✅ **Principle 1 (Ship Fast)**: UI updates and theme implementation are straightforward changes that can ship quickly without over-engineering.

✅ **Principle 2 (Minimal Process)**: No new process overhead; using existing Next.js patterns and shadcn/ui components.

✅ **Principle 3 (Practical Over Perfect)**: Using browser localStorage for theme persistence (simple, works) rather than complex state management. Using shadcn/ui theme toggle component instead of custom implementation.

✅ **Principle 4 (Output-Driven)**: All changes directly improve user experience: better title, clearer language, better layout, theme support.

✅ **Principle 5 (Quick Decisions, Easy Reversals)**: Theme implementation is easily reversible. Layout changes are CSS-only and can be adjusted quickly.

✅ **Principle 6 (Next.js/React Stack)**: All changes use existing Next.js App Router and React patterns. No framework changes.

✅ **Principle 7 (shadcn/ui)**: Will use shadcn/ui components for theme toggle and any other UI elements needed.

### Gate Status: **PASS** ✅

No violations detected. Feature aligns with all constitution principles.

### Post-Phase 1 Re-check

After Phase 1 design completion:

✅ **Principle 1 (Ship Fast)**: Design uses `next-themes` (standard library) and shadcn/ui components - fast to implement.

✅ **Principle 2 (Minimal Process)**: No new processes introduced. Standard Next.js patterns followed.

✅ **Principle 3 (Practical Over Perfect)**: Using `next-themes` instead of custom theme management. Using Tailwind default colors instead of custom palette.

✅ **Principle 4 (Output-Driven)**: All design decisions directly serve user experience improvements.

✅ **Principle 5 (Quick Decisions, Easy Reversals)**: Theme implementation is library-based and easily reversible. Layout changes are CSS-only.

✅ **Principle 6 (Next.js/React Stack)**: All design uses Next.js App Router and React patterns exclusively.

✅ **Principle 7 (shadcn/ui)**: Theme toggle built using shadcn/ui Button component.

### Post-Phase 1 Gate Status: **PASS** ✅

Design phase complete. No violations detected. Ready for implementation.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
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
│   ├── layout.tsx          # Root layout (will add theme provider)
│   ├── page.tsx            # Main page (update title, layout, content)
│   └── globals.css         # Global styles (theme variables)
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   └── [theme-toggle component]
│   ├── file-upload/        # Existing file upload components
│   └── video-compression/  # Existing compression components
└── lib/
    ├── types/              # TypeScript type definitions
    ├── utils.ts            # Utility functions
    └── theme.ts            # Theme management utilities (NEW)
```

**Structure Decision**: Using existing Next.js App Router structure. New files:
- `src/lib/theme.ts` - Theme detection, localStorage management, system preference detection
- `src/components/ui/theme-toggle.tsx` - shadcn/ui theme toggle component (or use existing if available)
- Updates to `src/app/layout.tsx` - Add theme provider
- Updates to `src/app/page.tsx` - Update title, refine layout, update content language
- Updates to `src/app/globals.css` - Add CSS variables for light/dark themes

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected. No complexity tracking needed.

## Phase Completion Summary

### Phase 0: Research ✅

**Completed**: November 9, 2025

**Research Topics Resolved**:
1. Dark/Light Mode Implementation - Decision: Use `next-themes` library
2. shadcn/ui Theme Toggle - Decision: Build using shadcn/ui Button component
3. WCAG AA Contrast Standards - Decision: Use Tailwind CSS default colors with `dark:` variants
4. System Dark Mode Detection - Decision: Rely on `next-themes` automatic detection

**Output**: `research.md` with all technical decisions documented.

### Phase 1: Design & Contracts ✅

**Completed**: November 9, 2025

**Design Artifacts Created**:
1. **data-model.md** - Theme preference entity model (localStorage-based)
2. **contracts/component-interfaces.ts** - TypeScript interfaces for theme components
3. **contracts/README.md** - Contract documentation
4. **quickstart.md** - Step-by-step implementation guide

**Agent Context Updated**: Added `next-themes` and theme management patterns to Cursor IDE context.

**Key Design Decisions**:
- Use `next-themes` for theme management (industry standard, handles system preference)
- Build theme toggle using shadcn/ui Button component (aligns with constitution)
- Use Tailwind CSS default colors with `dark:` variants (WCAG AA compliant, simple)
- Store theme preference in localStorage (client-side only, simple persistence)

### Phase 2: Task Generation

**Status**: Pending (run `/speckit.tasks` to generate)

**Next Steps**: Run `/speckit.tasks` command to generate detailed implementation tasks from this plan.
