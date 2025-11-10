# Tasks: Landing UI Simplification

**Input**: Design documents from `/specs/001-simplify-ui/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/
**Feature Branch**: `001-simplify-ui`

**Tests**: Not requested in specification - manual testing and browser DevTools for accessibility verification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install required dependencies and prepare component structure

- [X] T001 Install shadcn/ui Dialog component via `npx shadcn@latest add dialog` (creates `src/components/ui/dialog.tsx`)
- [X] T002 [P] Verify lucide-react icons are available (already in dependencies per package.json)
- [X] T003 [P] Verify next-themes is configured (already in layout.tsx per existing code)

**Checkpoint**: Dialog component available, dependencies confirmed

---

## Phase 2: User Story 1 - Upload-First Landing (Priority: P1) 🎯 MVP

**Goal**: Simplify hero section to title and subtitle only, ensure upload area is first focusable element and prominently displayed above the fold.

**Independent Test**: Load the landing page with default settings and confirm a user can identify the upload control and begin an upload without scrolling or reading more than one line of copy.

### Implementation for User Story 1

- [X] T004 [US1] Simplify hero section in `src/components/video-compression/guide-page.tsx` - remove verbose paragraphs, keep only title and one-line subtitle
- [X] T005 [US1] Update hero section title to "Video Compression For Dummies" in `src/components/video-compression/guide-page.tsx`
- [X] T006 [US1] Add one-line subtitle "Shrink your video files quickly and easily—no technical knowledge required." in `src/components/video-compression/guide-page.tsx`
- [X] T007 [US1] Remove "Friendly how-to guide" label and explanatory paragraphs from hero section in `src/components/video-compression/guide-page.tsx`
- [X] T008 [US1] Verify FileDropZone component is first focusable element in main content area (check DOM order in `src/components/video-compression/guide-page.tsx`)
- [X] T009 [US1] Ensure upload area remains above the fold on mobile viewports (adjust spacing/padding in `src/components/video-compression/guide-page.tsx`)

**Checkpoint**: At this point, User Story 1 should be fully functional - simplified hero with prominent upload area, independently testable

---

## Phase 3: User Story 2 - Technical Details On Demand (Priority: P2)

**Goal**: Add "For nerds" button beside theme toggle that opens a modal with technical details, accessible via keyboard and screen readers.

**Independent Test**: From the landing page, activate the "For nerds" button and validate that a modal appears with the agreed technical details and can be dismissed without affecting theme state.

### Implementation for User Story 2

- [X] T010 [P] [US2] Create ForNerdsButton component in `src/components/ui/for-nerds-button.tsx` implementing ForNerdsButtonProps interface from contracts
- [X] T011 [P] [US2] Create TechnicalDetailsModal component in `src/components/video-compression/technical-details-modal.tsx` implementing TechnicalDetailsModalProps interface from contracts
- [X] T012 [US2] Add technical details content to TechnicalDetailsModal: supported formats (MP4, MOV, AVI, WebM), file size limits from DEFAULT_MAX_FILE_SIZE, compression method (WebCodecs API), browser requirements in `src/components/video-compression/technical-details-modal.tsx`
- [X] T013 [US2] Create client Header component in `src/components/layout/header.tsx` with state management for modal open/close
- [X] T014 [US2] Add ForNerdsButton and ThemeToggle to Header component with proper spacing (gap-2) in `src/components/layout/header.tsx`
- [X] T015 [US2] Integrate TechnicalDetailsModal into Header component with open state management in `src/components/layout/header.tsx`
- [X] T016 [US2] Update `src/app/layout.tsx` to use new Header component instead of inline header markup
- [X] T017 [US2] Verify modal opens on button click, closes on ESC key, backdrop click, and close button in `src/components/video-compression/technical-details-modal.tsx`
- [X] T018 [US2] Verify focus returns to trigger button when modal closes (Dialog component handles this automatically) in `src/components/video-compression/technical-details-modal.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - simplified landing page with functional "For nerds" modal

---

## Phase 4: User Story 3 - Responsive Focus on Upload Area (Priority: P3)

**Goal**: Ensure upload area remains prominent and above the fold across all screen sizes and theme changes.

**Independent Test**: View the landing page on desktop, tablet, and mobile widths and confirm the upload area remains above the fold and visually prominent relative to other elements.

### Implementation for User Story 3

- [X] T019 [US3] Test responsive layout on mobile (< 768px) - verify upload area visible without scrolling in `src/components/video-compression/guide-page.tsx`
- [X] T020 [US3] Test responsive layout on tablet (768px - 1024px) - verify upload area remains prominent in `src/components/video-compression/guide-page.tsx`
- [X] T021 [US3] Test responsive layout on desktop (> 1024px) - verify two-column layout maintained with upload area in right column in `src/components/video-compression/guide-page.tsx`
- [X] T022 [US3] Adjust spacing/padding on mobile to ensure upload area above the fold (reduce vertical spacing if needed) in `src/components/video-compression/guide-page.tsx`
- [X] T023 [US3] Verify upload area styling remains consistent and readable when toggling between light and dark themes in `src/components/video-compression/guide-page.tsx`
- [X] T024 [US3] Test modal responsiveness - verify modal is full-width on mobile, properly sized on desktop in `src/components/video-compression/technical-details-modal.tsx`

**Checkpoint**: All user stories should now be independently functional - responsive design verified across breakpoints and themes

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility verification, edge case handling, and final polish

- [X] T025 [P] Verify keyboard navigation: Tab order flows from header → upload area → other content in `src/components/video-compression/guide-page.tsx`
- [X] T026 [P] Verify screen reader accessibility: modal has proper ARIA labels, button has descriptive label in `src/components/video-compression/technical-details-modal.tsx` and `src/components/ui/for-nerds-button.tsx`
- [X] T027 [P] Test edge case: modal open while dragging file - verify drag still works or modal closes appropriately
- [X] T028 [P] Test edge case: keyboard-only navigation to open/close modal - verify all interactions work without mouse
- [X] T029 [P] Verify WCAG AA contrast ratios for all text elements in both light and dark themes
- [X] T030 [P] Run `npm run lint` to check for code issues
- [X] T031 [P] Test in multiple browsers (Chrome, Firefox, Safari, Edge) for compatibility
- [X] T032 Verify all acceptance scenarios from spec.md are met
- [X] T033 Update any documentation referencing the old verbose hero section

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **User Story 1 (Phase 2)**: Depends on Setup completion (Dialog component needed for future stories)
- **User Story 2 (Phase 3)**: Depends on Setup completion (needs Dialog component) - Can start after US1 or in parallel
- **User Story 3 (Phase 4)**: Depends on US1 completion (needs simplified layout) - Can start after US1
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Setup (Phase 1) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Setup (Phase 1) - Independent of US1, but uses same Dialog component from Setup
- **User Story 3 (P3)**: Depends on US1 completion (needs simplified layout to verify) - Should complete US1 first

### Within Each User Story

- Component creation before integration
- State management setup before UI wiring
- Core functionality before edge cases
- Story complete before moving to next priority

### Parallel Opportunities

- Setup tasks T002 and T003 can run in parallel (verification only)
- User Story 2 tasks T010 and T011 can run in parallel (different components)
- Polish tasks T025-T031 can run in parallel (different verification areas)
- User Stories 1 and 2 can be worked on in parallel after Setup (different files, minimal overlap)

---

## Parallel Example: User Story 2

```bash
# Launch component creation tasks in parallel:
Task: "Create ForNerdsButton component in src/components/ui/for-nerds-button.tsx"
Task: "Create TechnicalDetailsModal component in src/components/video-compression/technical-details-modal.tsx"

# Launch polish verification tasks in parallel:
Task: "Verify keyboard navigation: Tab order flows from header → upload area → other content"
Task: "Verify screen reader accessibility: modal has proper ARIA labels"
Task: "Test edge case: modal open while dragging file"
Task: "Test edge case: keyboard-only navigation to open/close modal"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (install Dialog component)
2. Complete Phase 2: User Story 1 (simplify hero, prioritize upload area)
3. **STOP and VALIDATE**: Test User Story 1 independently
   - Load page, verify simplified hero
   - Verify upload area is prominent and first focusable element
   - Test on mobile - upload area above the fold
4. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup → Dialog component available
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
   - Simplified landing page with prominent upload area
3. Add User Story 2 → Test independently → Deploy/Demo
   - "For nerds" modal with technical details
4. Add User Story 3 → Test independently → Deploy/Demo
   - Responsive design verified across breakpoints
5. Add Polish → Final verification and edge cases
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup together (quick - just install Dialog)
2. Once Setup is done:
   - Developer A: User Story 1 (simplify hero, upload area)
   - Developer B: User Story 2 (modal components) - can start immediately after Setup
3. After US1 completes:
   - Developer A: User Story 3 (responsive testing)
   - Developer B: Polish tasks (accessibility, edge cases)
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Manual testing and browser DevTools for accessibility verification (no automated tests per spec)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- File paths are absolute from repository root
- All components use existing Next.js App Router and React patterns (Principle 6)
- All UI components use shadcn/ui (Principle 7)

