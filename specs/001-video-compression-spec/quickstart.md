# Quick Start: Video Compression For Dummies

**Feature**: 001-video-compression-spec  
**Date**: November 9, 2025

## Overview

This guide provides a quick implementation path for updating the video compression guide with a beginner-friendly title, layman-friendly language, improved desktop layout, and dark/light mode theming.

## Prerequisites

- Next.js 16.0.1+ project with App Router
- React 19.2.0+
- Tailwind CSS 4.x configured
- shadcn/ui components available
- TypeScript 5.x

## Implementation Steps

### Step 1: Install Dependencies

```bash
npm install next-themes
```

### Step 2: Configure Tailwind CSS for Dark Mode

Update `tailwind.config.ts` (or `tailwind.config.js`):

```typescript
export default {
  darkMode: 'class', // Enable class-based dark mode
  // ... rest of config
}
```

### Step 3: Add Theme Provider to Root Layout

Update `src/app/layout.tsx`:

```typescript
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Step 4: Create Theme Toggle Component

Create `src/components/ui/theme-toggle.tsx`:

```typescript
"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

### Step 5: Add Theme Toggle to Header

Update `src/app/layout.tsx` or create a header component:

```typescript
import { ThemeToggle } from "@/components/ui/theme-toggle"

// In your header/navigation:
<header>
  <nav>
    {/* Other nav items */}
    <ThemeToggle />
  </nav>
</header>
```

### Step 6: Update Page Title

Update `src/app/page.tsx`:

```typescript
export const metadata = {
  title: "Video Compression For Dummies",
  // ... other metadata
}

// In component:
<h1>Video Compression For Dummies</h1>
```

### Step 7: Add Theme CSS Variables

Update `src/app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* Add other color variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* Add other dark mode color variables */
}

/* Ensure WCAG AA contrast */
body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

### Step 8: Update Desktop Layout

Update `src/app/page.tsx` to use full width on desktop:

```typescript
<div className="w-full max-w-none px-4 md:px-8 lg:px-12">
  {/* Content that uses 80%+ width on screens ≥1280px */}
  <main className="mx-auto w-full max-w-[90%] lg:max-w-[85%] xl:max-w-[80%]">
    {/* Page content */}
  </main>
</div>
```

### Step 9: Review and Update Content Language

- Review all text in `src/app/page.tsx` and components
- Replace technical terms with everyday language
- Add inline explanations for necessary technical terms
- Ensure language is accessible to adults with no video background

### Step 10: Test Theme Functionality

1. Test system preference detection (change OS dark mode setting)
2. Test manual theme toggle
3. Test theme persistence (reload page, clear/reload localStorage)
4. Verify WCAG AA contrast ratios using browser DevTools
5. Test on different screen sizes (desktop layout, mobile responsiveness)

## Verification Checklist

- [ ] Theme toggle appears in header
- [ ] Theme switches instantly (<100ms)
- [ ] System preference detected on first visit
- [ ] Theme persists across page reloads
- [ ] Page title shows "Video Compression For Dummies"
- [ ] Desktop layout uses 80%+ width on screens ≥1280px
- [ ] All text uses layman-friendly language
- [ ] WCAG AA contrast ratios met (4.5:1 normal, 3:1 large text)
- [ ] No theme flash on page load
- [ ] Works in all target browsers

## Common Issues

**Theme flash on load**: Ensure `suppressHydrationWarning` is on `<html>` tag and theme toggle checks `mounted` state.

**System preference not detected**: Verify `enableSystem={true}` in ThemeProvider (default).

**Contrast not meeting WCAG AA**: Use Tailwind's default color palette and verify with browser DevTools accessibility panel.

**Layout not using full width**: Check max-width constraints and ensure responsive breakpoints are correct.

## Next Steps

After implementation, run `/speckit.tasks` to generate detailed implementation tasks.

