# Quickstart Guide: Landing UI Simplification

**Feature**: 001-simplify-ui  
**Date**: 2025-11-09

This guide provides step-by-step instructions for implementing the landing UI simplification feature.

## Prerequisites

- Node.js and npm installed
- Next.js development server running (`npm run dev`)
- Familiarity with React, TypeScript, and Tailwind CSS
- shadcn/ui CLI available (`npx shadcn@latest`)

## Implementation Steps

### Step 1: Install shadcn/ui Dialog Component

Add the Dialog component from shadcn/ui:

```bash
npx shadcn@latest add dialog
```

This will create `src/components/ui/dialog.tsx` with all necessary Dialog primitives.

**Expected Output**: Dialog component files created in `src/components/ui/`

---

### Step 2: Create TechnicalDetailsModal Component

Create `src/components/video-compression/technical-details-modal.tsx`:

```typescript
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DEFAULT_MAX_FILE_SIZE } from "@/lib/types/file-upload";

interface TechnicalDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TechnicalDetailsModal({
  open,
  onOpenChange,
}: TechnicalDetailsModalProps) {
  const maxFileSizeMB = (DEFAULT_MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Technical Details</DialogTitle>
          <DialogDescription>
            Technical specifications for video compression
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Supported Formats</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>MP4 (H.264/AVC)</li>
              <li>MOV (QuickTime)</li>
              <li>AVI</li>
              <li>WebM</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">File Size Limits</h3>
            <p className="text-muted-foreground">
              Maximum file size: {maxFileSizeMB} MB
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Compression Method</h3>
            <p className="text-muted-foreground">
              Client-side processing using WebCodecs API. Videos are compressed
              in your browser without uploading to a server.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Browser Requirements</h3>
            <p className="text-muted-foreground">
              Modern browsers with WebCodecs support (Chrome 94+, Edge 94+,
              Safari 16.4+)
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

**Verification**: Component should compile without errors and render a modal when `open={true}`.

---

### Step 3: Create "For Nerds" Button Component

Create `src/components/ui/for-nerds-button.tsx`:

```typescript
"use client";

import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ForNerdsButtonProps {
  onClick: () => void;
  className?: string;
  "aria-label"?: string;
}

export function ForNerdsButton({
  onClick,
  className,
  "aria-label": ariaLabel = "Show technical details",
}: ForNerdsButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn("text-xs", className)}
      aria-label={ariaLabel}
    >
      <Info className="h-4 w-4 mr-1.5" />
      For nerds
    </Button>
  );
}
```

**Verification**: Button should render with icon and text, trigger onClick when clicked.

---

### Step 4: Update Layout to Include "For Nerds" Button

Modify `src/app/layout.tsx`:

```typescript
// Add imports
import { useState } from "react";
import { ForNerdsButton } from "@/components/ui/for-nerds-button";
import { TechnicalDetailsModal } from "@/components/video-compression/technical-details-modal";

// Inside RootLayout component, add state management:
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isTechnicalModalOpen, setIsTechnicalModalOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="vid-compressor-theme"
        >
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
              <div className="mx-auto flex w-full max-w-[90%] items-center justify-between px-4 py-4 md:px-8 lg:px-12 xl:max-w-[80%]">
                <Link
                  href="/"
                  className="text-sm font-semibold uppercase tracking-wide text-primary"
                >
                  Video Compression For Dummies
                </Link>
                <div className="flex items-center gap-2">
                  <ForNerdsButton
                    onClick={() => setIsTechnicalModalOpen(true)}
                  />
                  <ThemeToggle aria-label="Toggle color theme" />
                </div>
              </div>
            </header>
            <div className="flex-1">{children}</div>
            <TechnicalDetailsModal
              open={isTechnicalModalOpen}
              onOpenChange={setIsTechnicalModalOpen}
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Note**: Since `layout.tsx` is a server component, you'll need to extract the header into a client component. See Step 4b.

---

### Step 4b: Create Client Header Component (Alternative)

Since `layout.tsx` is a server component, create `src/components/layout/header.tsx`:

```typescript
"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ForNerdsButton } from "@/components/ui/for-nerds-button";
import { TechnicalDetailsModal } from "@/components/video-compression/technical-details-modal";

export function Header() {
  const [isTechnicalModalOpen, setIsTechnicalModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[90%] items-center justify-between px-4 py-4 md:px-8 lg:px-12 xl:max-w-[80%]">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-wide text-primary"
          >
            Video Compression For Dummies
          </Link>
          <div className="flex items-center gap-2">
            <ForNerdsButton
              onClick={() => setIsTechnicalModalOpen(true)}
            />
            <ThemeToggle aria-label="Toggle color theme" />
          </div>
        </div>
      </header>
      <TechnicalDetailsModal
        open={isTechnicalModalOpen}
        onOpenChange={setIsTechnicalModalOpen}
      />
    </>
  );
}
```

Then update `layout.tsx` to use the Header component:

```typescript
import { Header } from "@/components/layout/header";

// In RootLayout:
<ThemeProvider>
  <div className="flex min-h-screen flex-col bg-background text-foreground">
    <Header />
    <div className="flex-1">{children}</div>
  </div>
</ThemeProvider>
```

**Verification**: Header should display both buttons, clicking "For nerds" opens modal.

---

### Step 5: Simplify GuidePage Hero Section

Modify `src/components/video-compression/guide-page.tsx`:

**Replace the hero section** (lines 203-225) with:

```typescript
<section className="space-y-4">
  <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
    Video Compression For Dummies
  </h1>
  <p className="max-w-3xl text-lg text-muted-foreground">
    Shrink your video files quickly and easily—no technical knowledge required.
  </p>
</section>
```

**Result**:
- Hero copy is now limited to the title and new single-line subtitle.
- The previous "Friendly how-to guide" label and supporting paragraphs are no longer present.

**Verification**: Hero section should be much shorter, upload area more prominent.

---

### Step 6: Ensure Upload Area Tab Order

Verify that `FileDropZone` is the first focusable element in the main content:

1. Check DOM order: Upload area should come before other interactive elements
2. Test keyboard navigation: Tab key should focus upload area first (after header)
3. Add `tabIndex={0}` to FileDropZone if needed (shouldn't be necessary as it's a button)

**Verification**: Tab navigation should focus upload area before other content.

---

### Step 7: Test Responsive Layout

Test on different screen sizes:

1. **Mobile (< 768px)**:
   - Upload area should be visible without scrolling
   - Hero text should be minimal
   - Modal should be full-width

2. **Tablet (768px - 1024px)**:
   - Grid layout should stack or adjust appropriately
   - Upload area remains prominent

3. **Desktop (> 1024px)**:
   - Two-column layout maintained
   - Upload area in right column, clearly visible

**Verification**: Upload area remains prominent across all breakpoints.

---

### Step 8: Test Accessibility

1. **Keyboard Navigation**:
   - Tab to "For nerds" button → Enter opens modal
   - ESC closes modal
   - Focus returns to trigger button

2. **Screen Reader**:
   - Modal has proper ARIA labels
   - Button has descriptive label
   - Dialog title and description are announced

3. **Focus Management**:
   - Focus trap inside modal
   - Focus returns on close

**Verification**: All accessibility requirements met.

---

### Step 9: Verify Theme Compatibility

Test in both light and dark themes:

1. Toggle theme using theme toggle
2. Verify modal styling works in both themes
3. Verify button styling is consistent
4. Check contrast ratios meet WCAG AA

**Verification**: Feature works correctly in both themes.

---

## Testing Checklist

- [ ] Dialog component installed and working
- [ ] "For nerds" button appears next to theme toggle
- [ ] Modal opens when button clicked
- [ ] Modal closes on ESC, backdrop click, and close button
- [ ] Focus returns to trigger button on close
- [ ] Hero section simplified to title + subtitle only
- [ ] Upload area is first focusable element (after header)
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Keyboard navigation works correctly
- [ ] Screen reader announces modal properly
- [ ] Theme toggle still works
- [ ] All existing functionality preserved

## Common Issues

**Issue**: Modal doesn't open
- **Solution**: Check that Dialog component is properly installed and imported

**Issue**: Layout breaks on mobile
- **Solution**: Verify Tailwind responsive classes are correct, check grid layout

**Issue**: Focus doesn't return to button
- **Solution**: Dialog component handles this automatically, verify `onOpenChange` is connected

**Issue**: Theme toggle and "For nerds" button overlap
- **Solution**: Add proper gap spacing in flex container (`gap-2`)

## Next Steps

After implementation:
1. Run `npm run lint` to check for code issues
2. Test in multiple browsers
3. Verify all acceptance scenarios from spec
4. Check performance (modal should open instantly)

