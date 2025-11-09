# Research: Video Compression For Dummies

**Feature**: 001-video-compression-spec  
**Date**: November 9, 2025

## Research Questions

### 1. Dark/Light Mode Implementation in Next.js

**Question**: How to implement dark/light mode theming in Next.js App Router with system preference detection and localStorage persistence?

**Research Context**: Need to detect system preference, persist user choice, and apply theme without flash of wrong theme.

**Findings**:

- Next.js App Router supports client-side theme providers using React Context
- `next-themes` library is the standard solution for Next.js theme management
- Provides `useTheme` hook, `ThemeProvider` component, and automatic system preference detection
- Supports localStorage persistence out of the box
- Prevents flash of wrong theme using `suppressHydrationWarning` on `<html>` tag
- Works seamlessly with Tailwind CSS dark mode

**Decision**: Use `next-themes` library for theme management.

**Rationale**: 
- Industry standard for Next.js theme management
- Handles system preference detection automatically
- Prevents theme flash on page load
- Simple API, aligns with constitution (practical over perfect)
- Well-maintained and widely used

**Alternatives Considered**:
- Custom implementation: More code to maintain, higher risk of bugs
- CSS-only solution: Doesn't handle system preference detection well
- Other libraries: Less popular, less documentation

**Implementation Notes**:
- Install: `npm install next-themes`
- Wrap app in `ThemeProvider` in `layout.tsx`
- Use `useTheme()` hook in components
- Configure Tailwind CSS dark mode: `darkMode: 'class'` in `tailwind.config`

---

### 2. shadcn/ui Theme Toggle Component

**Question**: Does shadcn/ui provide a theme toggle component, or do we need to build one?

**Research Context**: Constitution requires using shadcn/ui components. Need to check if theme toggle exists.

**Findings**:

- shadcn/ui does not include a pre-built theme toggle component in core
- However, shadcn/ui documentation provides examples and patterns for theme toggles
- Common pattern: Use shadcn/ui `Button` or `DropdownMenu` components with theme switching logic
- Can combine with `next-themes` `useTheme()` hook for functionality
- Icon support via `lucide-react` (already installed)

**Decision**: Build theme toggle using shadcn/ui `Button` component with `next-themes` integration.

**Rationale**:
- Uses existing shadcn/ui components (Button) - aligns with constitution
- Leverages `lucide-react` for icons (already in project)
- Simple implementation, easy to customize
- Follows shadcn/ui patterns and best practices

**Alternatives Considered**:
- Custom component from scratch: Violates constitution (should use shadcn/ui)
- Third-party theme toggle: Adds dependency, may not match design system

**Implementation Notes**:
- Create `src/components/ui/theme-toggle.tsx`
- Use shadcn/ui `Button` component
- Use `Moon` and `Sun` icons from `lucide-react`
- Integrate with `next-themes` `useTheme()` hook
- Place in header/navigation area per spec

---

### 3. WCAG AA Contrast Standards in Tailwind CSS

**Question**: How to ensure WCAG AA contrast compliance (4.5:1 for normal text, 3:1 for large text) when designing Tailwind CSS themes?

**Research Context**: Spec requires WCAG AA compliance for both light and dark themes.

**Findings**:

- Tailwind CSS provides built-in color palette that meets WCAG AA standards
- Tailwind's default `gray` scale (50-900) is designed with accessibility in mind
- For dark mode, use lighter shades (e.g., `gray-100` on `gray-900` background)
- For light mode, use darker shades (e.g., `gray-900` on `gray-50` background)
- Can use Tailwind's `dark:` variant to apply different colors in dark mode
- Tools available: Tailwind's contrast checker, browser DevTools accessibility panel

**Decision**: Use Tailwind CSS default color palette with `dark:` variants, verify contrast ratios during implementation.

**Rationale**:
- Tailwind colors are pre-designed for accessibility
- `dark:` variant makes theme switching straightforward
- No need for custom color calculations
- Can verify with browser tools during development

**Alternatives Considered**:
- Custom color palette: More work, risk of non-compliance
- CSS variables only: Less convenient than Tailwind's approach

**Implementation Notes**:
- Use Tailwind's semantic color names (e.g., `text-gray-900 dark:text-gray-100`)
- Test contrast ratios using browser DevTools
- Ensure all text meets 4.5:1 ratio (normal) or 3:1 (large text ≥18pt or ≥14pt bold)
- Document color choices in component code

---

### 4. System Dark Mode Detection in Browsers

**Question**: How do browsers expose system dark mode preference, and how does `next-themes` handle it?

**Research Context**: Spec requires detecting and matching system/browser preference on first visit.

**Findings**:

- Modern browsers expose preference via CSS media query: `@media (prefers-color-scheme: dark)`
- JavaScript can detect via `window.matchMedia('(prefers-color-scheme: dark)')`
- `next-themes` automatically detects system preference using this API
- Falls back gracefully if preference unavailable (defaults to light)
- Listens for changes to system preference (useful for testing)

**Decision**: Rely on `next-themes` automatic system preference detection.

**Rationale**:
- `next-themes` handles this automatically - no custom code needed
- Works across all modern browsers
- Handles edge cases (preference unavailable, changes during session)
- Aligns with constitution (practical over perfect)

**Alternatives Considered**:
- Custom detection code: Unnecessary when library handles it
- Server-side detection: Not applicable (client-side only per spec)

**Implementation Notes**:
- `next-themes` `ThemeProvider` automatically detects system preference
- Configure with `attribute="class"` and `enableSystem={true}` (default)
- No additional code needed for system detection

---

## Summary

All research questions resolved. Key decisions:
1. Use `next-themes` for theme management
2. Build theme toggle using shadcn/ui `Button` component
3. Use Tailwind CSS default colors with `dark:` variants for WCAG AA compliance
4. Rely on `next-themes` automatic system preference detection

No blocking unknowns remain. Ready to proceed to Phase 1 design.

