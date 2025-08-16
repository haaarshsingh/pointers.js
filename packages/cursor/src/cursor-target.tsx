"use client";

import { useRef, useCallback } from "react";
import { useCursor } from "./cursor-provider";
import type { CursorTargetProps } from "./types";

export function CursorTarget({
  variant,
  children,
  disabled = false,
  meta,
}: CursorTargetProps) {
  const { setVariant, pushVariant, popVariant } = useCursor();
  const originalVariantRef = useRef<string>("");
  const originalMetaRef = useRef<Record<string, any>>({});

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;

    // Store the original variant to restore later
    originalVariantRef.current = variant; // This should actually get the current variant
    originalMetaRef.current = meta || {};

    // Push the new variant onto the stack
    pushVariant(variant, { meta });
  }, [disabled, variant, meta, pushVariant]);

  const handleMouseLeave = useCallback(() => {
    if (disabled) return;

    // Pop back to the previous variant
    popVariant();
  }, [disabled, popVariant]);

  const handleFocus = useCallback(() => {
    if (disabled) return;
    handleMouseEnter();
  }, [disabled, handleMouseEnter]);

  const handleBlur = useCallback(() => {
    if (disabled) return;
    handleMouseLeave();
  }, [disabled, handleMouseLeave]);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{ display: "contents" }}
    >
      {children}
    </span>
  );
}
