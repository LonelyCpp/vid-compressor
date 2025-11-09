# Tasks: File Upload Landing Page

**Input**: Design documents from `/specs/001-file-upload/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are deferred per research.md (can be added later). No test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project structure and component directories

- [x] T001 Create component directory structure at src/components/file-upload/
- [x] T002 Verify shadcn/ui components directory exists at src/components/ui/
- [x] T003 [P] Copy component interfaces from contracts/component-interfaces.ts to src/lib/types/file-upload.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core utilities and types that all user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 [US1] [US2] Create file handler utilities in src/lib/file-handler.ts with validateFile function
- [x] T005 [US1] [US2] Implement formatFileSize function in src/lib/file-handler.ts
- [x] T006 [US1] [US2] Implement truncateFileName function in src/lib/file-handler.ts
- [x] T007 [US1] [US2] Export ALLOWED_VIDEO_TYPES and DEFAULT_MAX_FILE_SIZE constants from src/lib/file-handler.ts

**Checkpoint**: Foundation ready - file validation utilities available for all user stories

---

## Phase 3: User Story 1 - Initial Landing and File Selection (Priority: P1) 🎯 MVP

**Goal**: Create a landing page with drag-and-drop and click-to-browse file selection functionality. Users can select files and see basic visual feedback.

**Independent Test**: Visit homepage and verify drag-and-drop interface is visible and functional. Drag a file over the drop zone and see visual feedback. Click the upload area and verify file browser opens. After selecting a file, verify it's accepted and file information is displayed.

### Implementation for User Story 1

- [x] T008 [US1] Create FileDropZone component in src/components/file-upload/file-drop-zone.tsx with drag-and-drop event handlers
- [x] T009 [US1] Implement drag visual feedback state in src/components/file-upload/file-drop-zone.tsx (highlighting on dragover)
- [x] T010 [US1] Add hidden file input element in src/components/file-upload/file-drop-zone.tsx for click-to-browse functionality
- [x] T011 [US1] Implement file selection handler in src/components/file-upload/file-drop-zone.tsx that accepts only first file from multiple selections
- [x] T012 [US1] Create FileInfo component in src/components/file-upload/file-info.tsx to display file name and size
- [x] T013 [US1] Integrate FileDropZone component into src/app/page.tsx landing page
- [x] T014 [US1] Add state management for selectedFile in src/app/page.tsx using useState hook
- [x] T015 [US1] Connect file selection from FileDropZone to state in src/app/page.tsx
- [x] T016 [US1] Display FileInfo component in src/app/page.tsx when file is selected
- [x] T017 [US1] Add responsive styling for mobile devices in src/components/file-upload/file-drop-zone.tsx (ensure click-to-browse works on touch devices)
- [x] T018 [US1] Style landing page with simple, modern design using Tailwind CSS in src/app/page.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional - users can select files via drag-and-drop or click, see visual feedback, and view file information. This is the MVP.

---

## Phase 4: User Story 2 - File Validation and Error Handling (Priority: P2)

**Goal**: Validate selected files for supported video formats and size limits. Display clear error messages when validation fails.

**Independent Test**: Attempt to upload unsupported file types (e.g., .txt, .pdf) and verify error message appears. Attempt to upload oversized files and verify size limit error message. Upload valid video file and verify it passes validation and proceeds.

### Implementation for User Story 2

- [x] T019 [US2] Integrate validateFile function from src/lib/file-handler.ts into file selection handler in src/app/page.tsx
- [x] T020 [US2] Add validationStatus state to track validation result in src/app/page.tsx
- [x] T021 [US2] Create error display component or section in src/app/page.tsx for validation errors
- [x] T022 [US2] Display validation error messages when file type is unsupported in src/app/page.tsx
- [x] T023 [US2] Display validation error messages when file size exceeds limit in src/app/page.tsx
- [x] T024 [US2] Update FileInfo component in src/components/file-upload/file-info.tsx to show validation status
- [x] T025 [US2] Prevent file processing when validation fails in src/app/page.tsx
- [x] T026 [US2] Clear previous errors when new file is selected in src/app/page.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - file selection works and validation provides clear error feedback.

---

## Phase 5: User Story 3 - Visual Feedback and Loading States (Priority: P3)

**Goal**: Provide clear visual feedback during file processing, including loading indicators and status messages.

**Independent Test**: Select a valid file and verify loading indicator appears. Verify status text shows "Processing..." or similar. Verify smooth transition when processing completes.

### Implementation for User Story 3

- [x] T027 [US3] Add processingStatus state to track processing state in src/app/page.tsx
- [x] T028 [US3] Create loading indicator component or use shadcn/ui spinner in src/components/file-upload/file-info.tsx
- [x] T029 [US3] Display loading indicator when processingStatus is "processing" in src/components/file-upload/file-info.tsx
- [x] T030 [US3] Add status text display showing current processing stage in src/components/file-upload/file-info.tsx
- [x] T031 [US3] Update processingStatus state transitions (idle → processing → complete) in src/app/page.tsx
- [x] T032 [US3] Implement smooth transition animation when processing completes in src/components/file-upload/file-info.tsx
- [x] T033 [US3] Ensure processing status updates are visible and clear to users in src/components/file-upload/file-info.tsx

**Checkpoint**: All user stories should now be independently functional - file selection, validation, and processing feedback all work together.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and edge case handling

- [x] T034 [P] Handle multiple file selection edge case (accept only first valid file) in src/components/file-upload/file-drop-zone.tsx
- [x] T035 [P] Implement filename truncation for very long file names in src/components/file-upload/file-info.tsx using truncateFileName utility
- [x] T036 [P] Ensure click-to-browse fallback works when drag-and-drop is unsupported in src/components/file-upload/file-drop-zone.tsx
- [x] T037 [P] Handle special characters and spaces in filenames in src/components/file-upload/file-info.tsx
- [x] T038 [P] Add mobile-specific styling and ensure click-to-browse is primary method on touch devices in src/components/file-upload/file-drop-zone.tsx
- [x] T039 [P] Verify performance meets success criteria (2s load time, 100ms drag feedback, 1s validation) across all components
- [x] T040 [P] Test on multiple browsers (Chrome, Firefox, Safari, Edge) and verify compatibility
- [x] T041 [P] Test on mobile devices (iOS Safari, Chrome Mobile) and verify functionality
- [x] T042 Code cleanup and refactoring across all file-upload components
- [x] T043 Run quickstart.md validation checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed sequentially in priority order (P1 → P2 → P3)
  - US2 depends on US1 for file selection functionality
  - US3 depends on US1 and US2 for complete flow
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 file selection functionality - Validates files selected in US1
- **User Story 3 (P3)**: Depends on US1 and US2 - Shows processing feedback for validated files

### Within Each User Story

- File handler utilities before components
- Components before page integration
- Core implementation before edge cases
- Story complete before moving to next priority

### Parallel Opportunities

- Setup tasks T001-T003 can run in parallel (different directories/files)
- Foundational tasks T004-T007 can run in parallel (all in same file but different functions)
- Polish tasks T034-T041 can run in parallel (different edge cases and concerns)
- Different components within a story can be worked on in parallel if dependencies allow

---

## Parallel Example: User Story 1

```bash
# Can work on these in parallel (different files):
Task: "Create FileDropZone component in src/components/file-upload/file-drop-zone.tsx"
Task: "Create FileInfo component in src/components/file-upload/file-info.tsx"

# After components are created, integrate in parallel:
Task: "Integrate FileDropZone component into src/app/page.tsx"
Task: "Add state management for selectedFile in src/app/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T007) - CRITICAL, blocks all stories
3. Complete Phase 3: User Story 1 (T008-T018)
4. **STOP and VALIDATE**: Test User Story 1 independently
   - Visit homepage
   - Drag file over drop zone (see visual feedback)
   - Click to browse and select file
   - Verify file information displays
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add Polish phase → Final validation → Deploy

### Sequential Strategy (Recommended for Solo Developer)

1. Complete Setup + Foundational together
2. Implement User Story 1 completely
3. Test and validate User Story 1
4. Implement User Story 2 completely
5. Test and validate User Stories 1 + 2 together
6. Implement User Story 3 completely
7. Test and validate all stories together
8. Complete Polish phase

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All file paths are relative to repository root
- Use shadcn/ui components where possible (aligns with constitution Principle 7)
- Keep implementation simple and practical (aligns with constitution Principle 3)

