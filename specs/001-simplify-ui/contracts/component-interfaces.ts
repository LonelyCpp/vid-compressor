/**
 * Component Interface Contracts
 * Feature: 001-simplify-ui
 * Date: 2025-11-09
 *
 * These interfaces define the contracts for components modified or created
 * in this feature. They ensure type safety and consistent component APIs.
 */

/**
 * TechnicalDetailsModal Component Contract
 *
 * Displays technical information about video compression in a modal dialog.
 * Opens when "For nerds" button is clicked, closes on ESC or close action.
 */
export interface TechnicalDetailsModalProps {
  /**
   * Controls whether the modal is open or closed
   */
  open: boolean;

  /**
   * Callback invoked when modal open state changes
   * @param open - New open state (true = open, false = closed)
   */
  onOpenChange: (open: boolean) => void;
}

/**
 * ForNerdsButton Component Contract
 *
 * Button that triggers the technical details modal.
 * Positioned adjacent to the theme toggle in the header.
 */
export interface ForNerdsButtonProps {
  /**
   * Callback invoked when button is clicked
   */
  onClick: () => void;

  /**
   * Optional className for styling
   */
  className?: string;

  /**
   * Accessibility label for the button
   * @default "Show technical details"
   */
  "aria-label"?: string;
}

/**
 * Simplified GuidePage Hero Section Contract
 *
 * Reduced hero section with only title and subtitle.
 * No props changes, only content/structure simplification.
 */
export interface GuidePageHeroProps {
  /**
   * Main title text
   */
  title: string;

  /**
   * Single-line subtitle text
   */
  subtitle: string;
}

/**
 * Header Actions Group Contract
 *
 * Container for theme toggle and "For nerds" button in header.
 * Ensures proper spacing and alignment.
 */
export interface HeaderActionsProps {
  /**
   * Optional className for container styling
   */
  className?: string;
}
