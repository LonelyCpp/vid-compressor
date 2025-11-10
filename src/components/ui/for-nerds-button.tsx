"use client";

import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ForNerdsButtonProps } from "../../../specs/001-simplify-ui/contracts/component-interfaces";

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
      <Info className="mr-1.5 h-4 w-4" aria-hidden="true" />
      For nerds
    </Button>
  );
}
