# Implementation Tasks: Video Compression For Dummies

**Feature**: 001-video-compression-spec  
**Generated**: November 9, 2025  
**Based on**: [spec.md](./spec.md), [plan.md](./plan.md), [research.md](./research.md)

## Overview

This document contains actionable, dependency-ordered tasks for implementing the Video Compression For Dummies feature. Tasks are organized by user story to enable independent implementation and testing.

## Implementation Strategy

**MVP Scope**: User Story 1 (Friendly Guide Title) - This provides immediate value and sets the foundation.

**Incremental Delivery**:
1. **Phase 1-2**: Setup and foundational infrastructure
2. **Phase 3**: User Story 1 (Title) - Can ship independently
3. **Phase 4**: User Story 2 (Layout) - Can ship independently
4. **Phase 5**: User Story 3 (Theme) - Can ship independently
5. **Phase 6**: Polish and cross-cutting concerns

**Parallel Opportunities**: Tasks marked with [P] can be worked on in parallel if they touch different files and have no dependencies on incomplete tasks.

## Dependencies & Story Completion Order

```
Phase 1 (Setup) → Phase 2 (Foundational) → Phase 3 (US1) → Phase 4 (US2) → Phase 5 (US3) → Phase 6 (Polish)
```

**Story Independence**:
- **User Story 1** (Title): Independent - can be completed without US2 or US3
- **User Story 2** (Layout): Independent - can be completed without US3, but benefits from US1 title
- **User Story 3** (Theme): Independent - can be completed without US1 or US2, but enhances all stories

**Recommended Order**: US1 → US2 → US3 (by priority, but all can be done independently)

## Phase 1: Setup

**Goal**: Install dependencies and configure project for theme support.

**Independent Test**: Verify dependencies installed and Tailwind configured for dark mode.

### Tasks

- [X] T001 Install next-themes package via npm in project root
- [X] T002 Configure Tailwind CSS dark mode by updating tailwind.config.ts to set `darkMode: 'class'`
- [X] T003 Verify shadcn/ui Button component exists in src/components/ui/button.tsx (or install if missing)

## Phase 2: Foundational

**Goal**: Set up theme infrastructure that all user stories depend on.

**Independent Test**: Theme provider wraps application and system preference is detected.

### Tasks

- [X] T004 Update src/app/layout.tsx to import ThemeProvider from next-themes
- [X] T005 Update src/app/layout.tsx to wrap children with ThemeProvider component, setting attribute="class", defaultTheme="system", enableSystem={true}
- [X] T006 Update src/app/layout.tsx to add suppressHydrationWarning prop to <html> tag to prevent theme flash
- [X] T007 Create src/components/ui/theme-toggle.tsx with ThemeToggle component using shadcn/ui Button and next-themes useTheme hook
- [X] T008 Add theme CSS variables to src/app/globals.css for light and dark mode color schemes meeting WCAG AA contrast standards

## Phase 3: User Story 1 - Friendly Guide Title (Priority: P1)

**Goal**: Visitors see the video help guide listed as "Video Compression For Dummies," instantly understand it is written for beginners, and feel comfortable starting the process.

**Independent Test**: Show only the hero section to a tester and confirm they identify the guide name and feel it is meant for non-experts.

**Acceptance Criteria**:
- Page heading reads "Video Compression For Dummies"
- Browser tab title shows "Video Compression For Dummies"
- Navigation label (if exists) shows "Video Compression For Dummies"

### Tasks

- [X] T009 [US1] Update metadata.title in src/app/page.tsx to "Video Compression For Dummies"
- [X] T010 [US1] Update main heading (h1) in src/app/page.tsx to display "Video Compression For Dummies"
- [X] T011 [US1] Review and update all instructional text in src/app/page.tsx to use everyday language, removing technical jargon per FR-002
- [X] T012 [US1] Add inline explanations for any necessary technical terms in src/app/page.tsx content

## Phase 4: User Story 2 - Comfortable Reading Layout (Priority: P1)

**Goal**: Desktop readers want the content to use their screen without feeling cramped, so the page should stretch across wide displays while keeping easy-to-read margins.

**Independent Test**: Open the page on a desktop screen wider than 1440px and confirm the main text spans the available width while staying readable.

**Acceptance Criteria**:
- Main article area fills at least 80% of window width on screens ≥1280px
- Balanced side margins maintained
- Text remains readable without horizontal scrolling on screens <1024px

### Tasks

- [X] T013 [US2] Update container div in src/app/page.tsx to use full width with responsive padding: `w-full max-w-none px-4 md:px-8 lg:px-12`
- [X] T014 [US2] Update main content wrapper in src/app/page.tsx to use responsive max-width: `mx-auto w-full max-w-[90%] lg:max-w-[85%] xl:max-w-[80%]` for screens ≥1280px
- [X] T015 [US2] Verify layout uses 80%+ width on desktop screens ≥1280px per FR-003
- [X] T016 [US2] Ensure responsive breakpoints prevent horizontal scrolling on tablets and smaller screens per FR-004

## Phase 5: User Story 3 - Theme Choice (Priority: P2)

**Goal**: Readers can pick between a light appearance for bright rooms and a dark appearance for dim rooms, and the guide remembers their choice.

**Independent Test**: Change the appearance once, reload the page, and confirm the selected look returns automatically.

**Acceptance Criteria**:
- Theme toggle control visible in header/top navigation area
- Theme switches instantly (<100ms) without flashing
- System preference detected on first visit
- Theme persists across page reloads
- WCAG AA contrast ratios met (4.5:1 normal text, 3:1 large text)

### Tasks

- [X] T017 [US3] Add ThemeToggle component to header/navigation area in src/app/layout.tsx or create header component
- [X] T018 [US3] Ensure ThemeToggle is always visible at top of page per FR-005
- [X] T019 [US3] Verify ThemeProvider detects system preference on first visit per FR-006
- [X] T020 [US3] Verify theme preference persists in localStorage and loads on return visits per FR-007
- [X] T021 [US3] Test theme switching responds instantly (<100ms) without flashing or lag
- [X] T022 [US3] Verify WCAG AA contrast ratios (4.5:1 normal text, 3:1 large text) in both light and dark themes using browser DevTools per FR-008
- [X] T023 [US3] Test edge case: theme persists when switching multiple times in one session
- [X] T024 [US3] Test edge case: theme falls back to system preference when localStorage is cleared
- [X] T025 [US3] Test edge case: first-time visitor with system dark mode enabled automatically gets dark theme

## Phase 6: Polish & Cross-Cutting Concerns

**Goal**: Final refinements, accessibility, and cross-cutting concerns.

**Independent Test**: Complete feature verification checklist passes.

### Tasks

- [X] T026 Verify all text uses layman-friendly language throughout src/app/page.tsx and all components
- [X] T027 Test on ultra-wide monitors: layout centers content and avoids overly long line lengths
- [X] T028 Verify no theme flash occurs on page load (check suppressHydrationWarning and mounted state)
- [X] T029 Test theme functionality across target browsers (Chrome, Firefox, Safari, Edge)
- [X] T030 Verify responsive design works correctly at all breakpoints (mobile, tablet, desktop, ultra-wide)
- [X] T031 Run Biome linter and fix any formatting or linting issues
- [X] T032 Verify browser tab title, page heading, and navigation all display "Video Compression For Dummies" consistently

## Parallel Execution Examples

### User Story 1 (Title) - Can be done in parallel:
- T009, T010, T011, T012 can be worked on simultaneously (all update src/app/page.tsx but different sections)

### User Story 2 (Layout) - Can be done in parallel:
- T013, T014 can be done together (both update layout structure)
- T015, T016 can be tested in parallel after T013-T014 complete

### User Story 3 (Theme) - Can be done in parallel:
- T017, T018 can be done together (header integration)
- T019, T020, T021 can be tested in parallel after T017-T018 complete
- T022, T023, T024, T025 can be tested in parallel (different edge cases)

### Cross-cutting:
- T026, T027, T028, T029, T030 can be tested in parallel (different aspects)
- T031, T032 can be done in parallel (linting and final verification)

## Task Summary

**Total Tasks**: 32

**By Phase**:
- Phase 1 (Setup): 3 tasks
- Phase 2 (Foundational): 5 tasks
- Phase 3 (User Story 1): 4 tasks
- Phase 4 (User Story 2): 4 tasks
- Phase 5 (User Story 3): 9 tasks
- Phase 6 (Polish): 7 tasks

**By User Story**:
- User Story 1 (Title): 4 tasks
- User Story 2 (Layout): 4 tasks
- User Story 3 (Theme): 9 tasks
- Cross-cutting: 15 tasks (setup, foundational, polish)

**Parallel Opportunities**: 15+ tasks marked with [P] or can be parallelized within phases

**MVP Scope**: Phases 1-3 (Setup + Foundational + User Story 1) = 12 tasks

## Notes

- All tasks include specific file paths for clarity
- Tasks follow strict checklist format: `- [ ] T### [P] [US#] Description with file path`
- User Story tasks are marked with [US1], [US2], [US3] labels
- Parallelizable tasks are marked with [P] where applicable
- Each phase is independently testable per the spec requirements

