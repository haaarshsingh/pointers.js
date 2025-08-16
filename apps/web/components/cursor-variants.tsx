"use client";

import type { CursorComponentProps } from "qursor";

export const CustomCursor = ({ isHidden, variant }: CursorComponentProps) => {
  const isHover = variant === "hover";

  return (
    <div
      style={{
        width: 16,
        height: 16,
        backgroundColor: "white",
        borderRadius: "50%",
        transform: `translate(-50%, -50%) scale(${isHover ? 3 : 1})`,
        opacity: isHidden ? 0 : 0.5,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    />
  );
};

export const LoadingCursor = ({ isHidden }: CursorComponentProps) => (
  <div
    style={{
      width: 24,
      height: 24,
      transform: "translate(-50%, -50%)",
      opacity: isHidden ? 0 : 1,
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "2px solid #ff6b6b",
        borderTop: "2px solid transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
    <style jsx global>{`
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

export const DragCursor = ({ isHidden }: CursorComponentProps) => (
  <div
    style={{
      width: 20,
      height: 20,
      backgroundColor: "#10b981",
      borderRadius: 4,
      transform: "translate(-50%, -50%) rotate(45deg)",
      opacity: isHidden ? 0 : 1,
      transition: "opacity 0.2s ease",
    }}
  />
);

export const ClickableCursor = ({ isHidden }: CursorComponentProps) => (
  <div
    style={{
      transform: "translate(-50%, -50%)",
      opacity: isHidden ? 0 : 1,
    }}
  >
    <div
      style={{
        width: 12,
        height: 12,
        backgroundColor: "#8b5cf6",
        borderRadius: "50%",
      }}
    />
    <div
      style={{
        width: 24,
        height: 24,
        border: "1px solid #8b5cf6",
        borderRadius: "50%",
        position: "absolute",
        top: -6,
        left: -6,
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    />
    <style jsx global>{`
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.5;
          transform: scale(1.1);
        }
      }
    `}</style>
  </div>
);
