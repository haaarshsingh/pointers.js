import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CursorProvider, useCursor } from "../cursor-provider";
import type { CursorComponentProps } from "../types";

const TestCursor = ({ variant, x, y }: CursorComponentProps) => (
  <div data-testid="cursor" data-variant={variant} style={{ left: x, top: y }}>
    {variant}
  </div>
);

const TestComponent = () => {
  const { variant, setVariant, pushVariant, popVariant } = useCursor();

  return (
    <div>
      <div data-testid="current-variant">{variant}</div>
      <button onClick={() => setVariant("hover")}>Set Hover</button>
      <button onClick={() => pushVariant("loading", { timeout: 100 })}>
        Push Loading
      </button>
      <button onClick={() => popVariant()}>Pop Variant</button>
    </div>
  );
};

describe("CursorProvider", () => {
  const variants = {
    default: TestCursor,
    hover: TestCursor,
    loading: TestCursor,
  };

  beforeEach(() => {
    // Reset document state
    document.documentElement.classList.remove("cursor-none");
  });

  it("should render with default variant", () => {
    render(
      <CursorProvider variants={variants}>
        <TestComponent />
      </CursorProvider>
    );

    expect(screen.getByTestId("current-variant")).toHaveTextContent("default");
  });

  it("should change variant when setVariant is called", () => {
    render(
      <CursorProvider variants={variants}>
        <TestComponent />
      </CursorProvider>
    );

    fireEvent.click(screen.getByText("Set Hover"));
    expect(screen.getByTestId("current-variant")).toHaveTextContent("hover");
  });

  it("should push and pop variants correctly", async () => {
    render(
      <CursorProvider variants={variants}>
        <TestComponent />
      </CursorProvider>
    );

    // Initially default
    expect(screen.getByTestId("current-variant")).toHaveTextContent("default");

    // Push loading variant
    fireEvent.click(screen.getByText("Push Loading"));
    expect(screen.getByTestId("current-variant")).toHaveTextContent("loading");

    // Pop back to default
    fireEvent.click(screen.getByText("Pop Variant"));
    expect(screen.getByTestId("current-variant")).toHaveTextContent("default");
  });

  it("should auto-pop variant after timeout", async () => {
    vi.useFakeTimers();

    render(
      <CursorProvider variants={variants}>
        <TestComponent />
      </CursorProvider>
    );

    // Push with timeout
    fireEvent.click(screen.getByText("Push Loading"));
    expect(screen.getByTestId("current-variant")).toHaveTextContent("loading");

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByTestId("current-variant")).toHaveTextContent("default");

    vi.useRealTimers();
  });

  it("should add cursor-none class when enabled", () => {
    render(
      <CursorProvider variants={variants}>
        <TestComponent />
      </CursorProvider>
    );

    expect(document.documentElement).toHaveClass("cursor-none");
  });

  it("should not add cursor-none class when disabled", () => {
    render(
      <CursorProvider variants={variants} config={{ enabled: false }}>
        <TestComponent />
      </CursorProvider>
    );

    expect(document.documentElement).not.toHaveClass("cursor-none");
  });
});
