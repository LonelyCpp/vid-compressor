"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DEFAULT_MAX_FILE_SIZE } from "@/lib/types/file-upload";
import type { TechnicalDetailsModalProps } from "../../../specs/001-simplify-ui/contracts/component-interfaces";

const SUPPORTED_FORMATS = ["MP4 (H.264/AVC)", "MOV (QuickTime)", "AVI", "WebM"];

export function TechnicalDetailsModal({
  open,
  onOpenChange,
}: TechnicalDetailsModalProps) {
  const maxFileSizeMB = Math.round(DEFAULT_MAX_FILE_SIZE / (1024 * 1024));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Technical details</DialogTitle>
          <DialogDescription>
            Everything you need to know before compressing your video.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 text-sm">
          <section>
            <h3 className="mb-2 font-semibold text-foreground">
              Supported formats
            </h3>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              {SUPPORTED_FORMATS.map((format) => (
                <li key={format}>{format}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-foreground">
              File size limits
            </h3>
            <p className="text-muted-foreground">
              Maximum file size: {maxFileSizeMB} MB per video.
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-foreground">
              Compression method
            </h3>
            <p className="text-muted-foreground">
              Client-side compression powered by the WebCodecs API via the
              mediabunny library. Your video stays on your device—nothing is
              uploaded.
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-foreground">
              Browser requirements
            </h3>
            <p className="text-muted-foreground">
              Works best in modern browsers with WebCodecs support (Chrome 94+,
              Edge 94+, Safari 16.4+).
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
