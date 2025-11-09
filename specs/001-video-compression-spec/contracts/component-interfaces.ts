/**
 * Component Interfaces: Video Compression For Dummies
 *
 * TypeScript interfaces defining component contracts for the UI improvements feature.
 * These interfaces ensure type safety and define the expected behavior of components.
 */

/**
 * Theme Toggle Component Props
 * Props for the theme toggle button component in the header
 */
export interface ThemeToggleProps {
  /**
   * Optional className for custom styling
   */
  className?: string;

  /**
   * Optional aria-label for accessibility
   * Defaults to "Toggle theme" if not provided
   */
  "aria-label"?: string;
}

/**
 * Theme Context Value
 * Value provided by next-themes ThemeProvider
 */
export interface ThemeContextValue {
  /**
   * Current theme value: "light" | "dark" | "system"
   */
  theme: string | undefined;

  /**
   * Resolved theme (actual theme being used, accounting for system preference)
   */
  resolvedTheme: string | undefined;

  /**
   * Function to set the theme
   */
  setTheme: (theme: string) => void;

  /**
   * Available theme options
   */
  themes: string[];

  /**
   * Whether system preference is enabled
   */
  systemTheme: string | undefined;
}

/**
 * Theme Provider Props
 * Props for next-themes ThemeProvider wrapper
 */
export interface ThemeProviderProps {
  /**
   * Child components
   */
  children: React.ReactNode;

  /**
   * HTML attribute to apply theme class to (default: "class")
   */
  attribute?: string;

  /**
   * Whether to enable system preference detection (default: true)
   */
  enableSystem?: boolean;

  /**
   * Default theme if no preference stored (default: "system")
   */
  defaultTheme?: string;

  /**
   * Storage key for theme preference (default: "theme")
   */
  storageKey?: string;

  /**
   * Whether to disable transition on theme change (default: false)
   */
  disableTransitionOnChange?: boolean;
}

/**
 * Page Layout Props
 * Props for the main page layout component
 */
export interface PageLayoutProps {
  /**
   * Page title (displayed in heading and browser tab)
   */
  title: string;

  /**
   * Main content of the page
   */
  children: React.ReactNode;

  /**
   * Optional className for custom styling
   */
  className?: string;
}

/**
 * Content Language Requirements
 * Guidelines for ensuring layman-friendly language
 */
export interface ContentLanguageRules {
  /**
   * Avoid technical jargon
   */
  avoidTechnicalTerms: boolean;

  /**
   * Explain necessary terms inline
   */
  explainTermsInline: boolean;

  /**
   * Use everyday language
   */
  useEverydayLanguage: boolean;

  /**
   * Target audience: adults with no video background
   */
  targetAudience: string;
}
