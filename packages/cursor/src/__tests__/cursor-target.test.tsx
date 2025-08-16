import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CursorProvider, useCursor } from "../cursor-provider";
import { CursorTarget } from "../cursor-target";
import type { CursorComponentProps } from "../types";

const TestCursor = ({ variant }: CursorComponentProps) => (
  <div data-testid="cursor" data-variant={variant}>
    {variant}
  </div>
);

const TestComponent = () => {
  const { variant } = useCursor();

  return (
    <div>
      <div data-testid="current-variant">{variant}</div>
      <CursorTarget variant="hover">
        <button data-testid="hover-button">Hover me</button>
      </CursorTarget>
      <CursorTarget variant="loading" disabled>
        <button data-testid="disabled-button">Disabled</button>
      </CursorTarget>
    </div>
  );
};

describe("CursorTarget", () => {
  const variants = {
    default: TestCursor,
    hover: TestCursor,
    loading: TestCursor,
  };

  it("should change variant on mouse enter and restore on mouse leave", () => {
    render(
      <CursorProvider variants={variants}>
        <TestComponent />
      </CursorProvider>
    );

    const button = screen.getByTestId("hover-button");

    // Initially default
    expect(screen.getByTestId("current-variant")).toHaveTextContent("default");

    // Hover should change to hover variant
    fireEvent.mouseEnter(button);
    expect(screen.getByTestId("current-variant")).toHaveTextContent("hover");

    // Leave should restore to default
    fireEvent.mouseLeave(button);
    expect(screen.getByTestId("current-variant")).toHaveTextContent("default");
  });

  it("should change variant on focus and restore on blur", () => {
    render(
      <CursorProvider variants={variants}>
        <TestComponent />
      </CursorProvider>
    );

    const button = screen.getByTestId("hover-button");

    // Initially default
    expect(screen.getByTestId("current-variant")).toHaveTextContent("default");

    // Focus should change to hover variant
    fireEvent.focus(button);
    expect(screen.getByTestId("current-variant")).toHaveTextContent("hover");

    // Blur should restore to default
    fireEvent.blur(button);
    expect(screen.getByTestId("current-variant")).toHaveTextContent("default");
  });

  it("should not change variant when disabled", () => {
    render(
      <CursorProvider variants={variants}>
        <TestComponent />
      </CursorProvider>
    );

    const disabledButton = screen.getByTestId("disabled-button");

    // Initially default
    expect(screen.getByTestId("current-variant")).toHaveTextContent("default");

    // Hover on disabled target should not change variant
    fireEvent.mouseEnter(disabledButton);
    expect(screen.getByTestId("current-variant")).toHaveTextContent("default");

    fireEvent.mouseLeave(disabledButton);
    expect(screen.getByTestId("current-variant")).toHaveTextContent("default");
  });
});
