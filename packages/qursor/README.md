![image](https://qursor.harshsingh.me/og.png)

# Qursor [![qursor minzip package size](https://img.shields.io/bundlephobia/minzip/qursor)](https://www.npmjs.com/package/qursor?activeTab=code) [![qursor package version](https://img.shields.io/npm/v/qursor.svg?colorB=green)](https://www.npmjs.com/package/qursor)

A lightweight command menu library that supercharges your web app's navigation and feature discoverability. It's framework-agnostic, headless, composable, <6kB, and has no runtime dependencies.

## Installation

```bash
npm install qursor
```

## Quick Start

### 1. Import styles (required)

```tsx
import "qursor/styles.css";
```

### 2. Create cursor variants

```tsx
import type { CursorComponentProps } from "qursor";

const DefaultCursor = ({ isHidden }: CursorComponentProps) => (
  <div
    style={{
      width: 16,
      height: 16,
      backgroundColor: "#333",
      borderRadius: "50%",
      transform: "translate(-50%, -50%)",
      opacity: isHidden ? 0 : 1,
    }}
  />
);

const HoverCursor = ({ isHidden }: CursorComponentProps) => (
  <div
    style={{
      width: 32,
      height: 32,
      border: "2px solid #0066ff",
      borderRadius: "50%",
      transform: "translate(-50%, -50%)",
      opacity: isHidden ? 0 : 1,
    }}
  />
);
```

### 3. Set up the provider

```tsx
import { CursorProvider } from "qursor";

const variants = {
  default: DefaultCursor,
  hover: HoverCursor,
};

function App() {
  return (
    <CursorProvider variants={variants}>
      {/* Your app content */}
    </CursorProvider>
  );
}
```

### 4. Use in your components

```tsx
// Declarative approach
<button data-cursor="hover">Hover me!</button>

// Component approach
<CursorTarget variant="hover">
  <button>Hover me!</button>
</CursorTarget>

// Programmatic approach
function MyComponent() {
  const { setVariant } = useCursor();

  return (
    <button onClick={() => setVariant('hover')}>
      Click to change cursor
    </button>
  );
}
```

## Recipes

### Loading States

```tsx
function MyComponent() {
  const { pushVariant } = useCursor();

  const handleAsync = async () => {
    pushVariant("loading", { timeout: 3000 });
    await fetchData();
    // Cursor automatically reverts after timeout or you can popVariant()
  };
}
```

### Drag Interactions

```tsx
function DraggableItem() {
  const { pushVariant, popVariant } = useCursor();

  return (
    <div
      onMouseDown={() => pushVariant("drag")}
      onMouseUp={() => popVariant()}
      onMouseLeave={() => popVariant()}
    >
      Draggable content
    </div>
  );
}
```

### Per-Route Cursors

```tsx
function RoutePage() {
  const { setVariant } = useCursor();

  useEffect(() => {
    setVariant("page-specific");
    return () => setVariant("default");
  }, []);
}
```

### Dynamic Themes

```tsx
function ThemedApp() {
  const { setVariantComponent } = useCursor();

  const applyDarkTheme = () => {
    const DarkCursor = () => <div style={{ background: "#fff" }}>•</div>;
    setVariantComponent("default", DarkCursor);
  };
}
```

### Complex Interactions

```tsx
function InteractiveCanvas() {
  const { variant, pushVariant, popVariant } = useCursor();

  return (
    <div
      onMouseEnter={() => pushVariant("canvas")}
      onMouseLeave={() => popVariant()}
      onMouseDown={() => pushVariant("drawing")}
      onMouseUp={() => popVariant()}
    >
      Canvas content
    </div>
  );
}
```

## Notes

### Accessibility

- **Reduced Motion**: Automatically disabled when `prefers-reduced-motion: reduce`
- **Touch Devices**: Disabled on devices with coarse pointers
- **Input Fields**: System cursor automatically restored in text inputs
- **Focus Management**: Works with keyboard navigation via focus events

### Performance

- **Zero Re-renders**: Mouse movement doesn't trigger React re-renders
- **RAF Optimization**: Uses requestAnimationFrame for smooth 60fps tracking
- **Efficient Updates**: Only updates transform property for position changes
- **Memory Safe**: Proper cleanup prevents memory leaks
- **Bundle Size**: <5KB gzipped with zero dependencies

### Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

Falls back to system cursor on unsupported browsers.
