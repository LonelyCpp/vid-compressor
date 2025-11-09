# Tasks: Video Compression

**Input**: Design documents from `/specs/001-video-compression/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL per constitution (Principle 1: Ship Fast). Not included in this task list.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create component directory structure at src/components/video-compression/
- [X] T002 [P] Copy component interfaces from contracts/component-interfaces.ts to src/lib/types/video-compression.ts
- [X] T003 [P] Verify mediabunny package is installed and accessible

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Create video compressor service in src/lib/video-compressor.ts with compress function using mediabunny
- [X] T005 [P] Implement getCompressionConfig function in src/lib/video-compressor.ts returning DEFAULT_COMPRESSION_CONFIG (CRF 25, H.264, medium preset)
- [X] T006 [P] Implement calculateSizeSavings utility function in src/lib/video-compressor.ts to calculate absolute and percentage savings
- [X] T007 Export CompressedVideo type and related interfaces from src/lib/types/video-compression.ts

**Checkpoint**: Foundation ready - video compression service and utilities are available. User story implementation can now begin.

---

## Phase 3: User Story 1 - Video Compression Processing (Priority: P1) 🎯 MVP

**Goal**: Automatically compress videos after file selection and validation. Compression happens entirely in browser without server upload.

**Independent Test**: Select a valid video file and verify that compression begins automatically after validation, completes successfully, and produces a compressed video file that is smaller than the original.

### Implementation for User Story 1

- [X] T008 [US1] Add compression state management to src/app/page.tsx (compressedVideo, compressionStatus, compressionError)
- [X] T009 [US1] Create useEffect hook in src/app/page.tsx to trigger compression when selectedFile.validationStatus is "valid"
- [X] T010 [US1] Implement startCompression function in src/app/page.tsx that calls videoCompressor.compress with file
- [X] T011 [US1] Handle compression completion in src/app/page.tsx by storing compressed file and updating compressionStatus to "complete"
- [X] T012 [US1] Calculate compressedSize, sizeSavings, and sizeSavingsPercent when compression completes in src/app/page.tsx
- [X] T013 [US1] Handle compression errors in src/app/page.tsx by catching errors and setting compressionStatus to "error" with user-friendly error message
- [X] T014 [US1] Update CompressedVideo state to include all required fields (compressedFile, originalSize, compressedSize, sizeSavings, sizeSavingsPercent, compressionStatus, compressionProgress, compressionError, processingTime)

**Checkpoint**: At this point, User Story 1 should be fully functional - videos compress automatically after selection and compressed files are stored. This is the MVP.

---

## Phase 4: User Story 2 - Compression Progress Feedback (Priority: P2)

**Goal**: Display real-time progress bar during compression showing completion percentage.

**Independent Test**: Start compression and verify that a progress bar appears, updates in real-time, and reaches 100% when compression completes.

### Implementation for User Story 2

- [X] T015 [US2] Create CompressionProgress component in src/components/video-compression/compression-progress.tsx
- [X] T016 [US2] Implement progress bar display in src/components/video-compression/compression-progress.tsx using shadcn/ui Progress component or custom implementation
- [X] T017 [US2] Add progress prop (0-100) to CompressionProgress component in src/components/video-compression/compression-progress.tsx
- [X] T018 [US2] Add status prop to CompressionProgress component in src/components/video-compression/compression-progress.tsx to handle "compressing", "complete", "error" states
- [X] T019 [US2] Implement progress callback in src/lib/video-compressor.ts compress function to call onProgress callback with progress percentage
- [X] T020 [US2] Update compression state in src/app/page.tsx to track compressionProgress (0-100) during compression
- [X] T021 [US2] Integrate CompressionProgress component into src/app/page.tsx to display during compression
- [X] T022 [US2] Update progress bar in real-time as compressionProgress updates in src/app/page.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - compression works and progress bar provides real-time feedback.

---

## Phase 5: User Story 3 - Compression Results and Size Savings Display (Priority: P3)

**Goal**: Display compression results including original file size, compressed file size, and size savings (absolute and percentage) after compression completes.

**Independent Test**: Complete compression and verify that original size, compressed size, and savings (both absolute size and percentage) are displayed clearly in human-readable format.

### Implementation for User Story 3

- [X] T023 [US3] Create CompressionResults component in src/components/video-compression/compression-results.tsx
- [X] T024 [US3] Display original file size in src/components/video-compression/compression-results.tsx using formatFileSize utility
- [X] T025 [US3] Display compressed file size in src/components/video-compression/compression-results.tsx using formatFileSize utility
- [X] T026 [US3] Calculate and display absolute size savings in src/components/video-compression/compression-results.tsx using formatFileSize utility
- [X] T027 [US3] Calculate and display percentage savings in src/components/video-compression/compression-results.tsx (format as percentage with 1 decimal place)
- [X] T028 [US3] Highlight size savings prominently in src/components/video-compression/compression-results.tsx (use visual emphasis like larger text, color, or badge)
- [X] T029 [US3] Integrate CompressionResults component into src/app/page.tsx to display when compressionStatus is "complete"
- [X] T030 [US3] Ensure all file sizes are formatted in human-readable format (KB, MB, GB) in src/components/video-compression/compression-results.tsx

**Checkpoint**: At this point, all user stories should be independently functional - compression works, progress is shown, and results are displayed clearly.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and edge case handling

- [X] T031 [P] Implement download functionality in src/components/video-compression/compression-results.tsx using URL.createObjectURL() and download button
- [X] T032 [P] Add download button to CompressionResults component in src/components/video-compression/compression-results.tsx
- [X] T033 [P] Implement file naming for downloaded compressed video (add "-compressed" suffix) in src/components/video-compression/compression-results.tsx
- [X] T034 [P] Clean up object URLs after download in src/components/video-compression/compression-results.tsx
- [X] T035 Handle compression errors gracefully in src/app/page.tsx with user-friendly error messages for unsupported codecs, memory limits, corrupted files
- [X] T036 Add retry functionality for failed compression in src/app/page.tsx (allow user to retry compression)
- [X] T037 Clear compression state when new file is selected in src/app/page.tsx
- [X] T038 Handle edge case where compressed file is larger than original (should not happen, but handle gracefully) in src/app/page.tsx
- [X] T039 Add processing time tracking in src/lib/video-compressor.ts (record start and end time, calculate duration)
- [X] T040 Display processing time in CompressionResults component in src/components/video-compression/compression-results.tsx
- [X] T041 Code cleanup and refactoring across all video-compression components
- [X] T042 Run quickstart.md validation checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories should proceed sequentially in priority order (P1 → P2 → P3) for MVP delivery
  - User Story 2 depends on User Story 1 (progress tracking needs compression to exist)
  - User Story 3 depends on User Story 1 (results display needs compression to complete)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories. This is the MVP.
- **User Story 2 (P2)**: Depends on User Story 1 - Progress tracking requires compression to be running. Can be implemented alongside US1 but needs compression state.
- **User Story 3 (P3)**: Depends on User Story 1 - Results display requires compression to complete. Can be implemented alongside US1 but needs compression results.

### Within Each User Story

- State management before component creation
- Service functions before component integration
- Core functionality before error handling
- Story complete before moving to next priority

### Parallel Opportunities

- Setup tasks T002 and T003 can run in parallel (different files)
- Foundational tasks T005, T006, T007 can run in parallel (different files, no dependencies)
- Polish tasks T031-T034 can run in parallel (download functionality is independent)
- Polish tasks T039-T040 can run in parallel (processing time tracking is independent)

---

## Parallel Example: User Story 1

```bash
# All tasks must be sequential for User Story 1 as they build on each other:
# T008 → T009 → T010 → T011 → T012 → T013 → T014
# Each task depends on the previous state management or compression logic
```

---

## Parallel Example: Foundational Phase

```bash
# These foundational tasks can run in parallel:
Task: "Implement getCompressionConfig function in src/lib/video-compressor.ts"
Task: "Implement calculateSizeSavings utility function in src/lib/video-compressor.ts"
Task: "Export CompressedVideo type and related interfaces from src/lib/types/video-compression.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently - verify compression works, compressed file is created, and is smaller than original
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo (Progress feedback)
4. Add User Story 3 → Test independently → Deploy/Demo (Results display)
5. Add Polish phase → Final polish and edge cases
6. Each story adds value without breaking previous stories

### Sequential Strategy (Recommended for Solo Developer)

With a single developer:

1. Complete Setup + Foundational together
2. Implement User Story 1 (MVP) → Test → Deploy
3. Implement User Story 2 (Progress) → Test → Deploy
4. Implement User Story 3 (Results) → Test → Deploy
5. Complete Polish phase → Final improvements

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Testing can be deferred per constitution Principle 1 (Ship Fast, Iterate Faster)
- mediabunny is already installed - no installation tasks needed
- All compression happens client-side - no server/API tasks needed

