# Feature Specification: Landing UI Simplification

**Feature Branch**: `001-simplify-ui`  
**Created**: 2025-11-09  
**Status**: Draft  
**Input**: User description:
- the main UI has too much text. Remove the explained, keep it simple with just a title and a subtitle (one line)
- the file upload / drag and drop area should be the main UI element when a user lands.
- add a small "for nerds" button beside the theme toggle to bring up a modal with more technical details

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Upload-First Landing (Priority: P1)

When a new visitor arrives on the landing page, they only see concise headline and subheadline copy and the upload area draws immediate attention so they can start compressing a video without distraction.

**Why this priority**: Uploading a video is the primary task; reducing friction here directly impacts conversion from visitor to engaged user.

**Independent Test**: Load the landing page with default settings and confirm a user can identify the upload control and begin an upload without scrolling or reading more than one line of copy.

**Acceptance Scenarios**:

1. **Given** a fresh visit to the landing page, **When** the page finishes loading, **Then** only a title and one-line subtitle are displayed as explanatory text.
2. **Given** focus is set to the page body, **When** the user presses `Tab`, **Then** the first interactive element reached is the upload/drag-and-drop area.

---

### User Story 2 - Technical Details On Demand (Priority: P2)

A power user wants to understand technical specifics—codec handling, compression approach, limits—without cluttering the main view, so they click a "For nerds" control to read the details in a modal.

**Why this priority**: Providing depth for advanced users builds trust and reduces support requests while keeping the main experience simple.

**Independent Test**: From the landing page, activate the "For nerds" button and validate that a modal appears with the agreed technical details and can be dismissed without affecting theme state.

**Acceptance Scenarios**:

1. **Given** the landing page is visible, **When** the user activates the "For nerds" button beside the theme toggle, **Then** a modal appears containing technical detail content.
2. **Given** the technical modal is open, **When** the user selects the close control or presses `Esc`, **Then** the modal closes and focus returns to the trigger button.

---

### User Story 3 - Responsive Focus on Upload Area (Priority: P3)

A user on any supported screen size or theme needs the upload area to remain the dominant visual and functional element so they can act quickly.

**Why this priority**: Maintaining visual hierarchy across breakpoints ensures consistent usability and brand perception.

**Independent Test**: View the landing page on desktop, tablet, and mobile widths and confirm the upload area remains above the fold and visually prominent relative to other elements.

**Acceptance Scenarios**:

1. **Given** the landing page is viewed on a small-screen device, **When** the page loads, **Then** the upload area remains visible without scrolling and retains primary emphasis.
2. **Given** the user toggles between light and dark themes, **When** the landing page re-renders, **Then** the upload area styling remains consistent and readable.

### Edge Cases

- What happens when no files are dragged but the user clicks within the upload area expecting guidance?
- How does the system handle keyboard-only navigation to open and close the "For nerds" modal?
- What happens when the modal is open and the user attempts to drag a file onto the page?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render the landing headline and subtitle as the only textual explanation above the fold on initial load.
- **FR-002**: System MUST present the upload/drag-and-drop component as the first actionable element in the tab order and place it above the fold on standard desktop and mobile viewports.
- **FR-003**: System MUST support both drag-and-drop and manual file selection within the primary upload area without requiring additional navigation.
- **FR-004**: System MUST display a clearly labeled "For nerds" button adjacent to the existing theme toggle in all supported viewports.
- **FR-005**: System MUST open a modal containing agreed technical details when the "For nerds" button is activated and provide close controls via click and `Esc`.

### Key Entities *(include if feature involves data)*

- **Landing Layout**: Represents the simplified hero area composed of the title, subtitle, theme toggle, "For nerds" control, and primary upload zone.
- **Technical Detail Modal**: Contains structured content (e.g., supported codecs, compression behaviour, file size limits) surfaced on demand and not persisted after dismissal.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 90% of usability test participants identify the upload action within 3 seconds of the landing page loading.
- **SC-002**: 80% of first-time users initiate an upload without scrolling or interacting with secondary controls during moderated testing.
- **SC-003**: 90% of surveyed technical users report the modal answers their top technical questions about compression behaviour.
- **SC-004**: Support inquiries about “how to start uploading” or “technical specs” decrease by 50% in the first month after release.

## Assumptions

- Theme toggle is already implemented and remains in the header area on all viewports.
- Technical details include supported formats, size limits, and compression approach supplied by product/engineering.
- Landing page loads without authenticated state differences; the simplified layout applies to all users.
