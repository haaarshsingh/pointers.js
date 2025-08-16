# custom-cursors

A production-ready custom cursor React library that lets you render any React component as the cursor with smooth tracking, variant management, and excellent UX defaults.

## Features

- 🎨 **Flexible**: Use any React component as cursor variants
- 🚀 **Performant**: RequestAnimationFrame-based tracking with zero re-renders
- 📱 **Smart UX**: Auto-disables on touch devices and respects reduced motion
- ⌨️ **Accessible**: Automatic fallback to system cursor in input fields
- 🔧 **Developer Friendly**: Full TypeScript support with intuitive API
- 📦 **Lightweight**: Minimal bundle size with zero external dependencies

## Installation

```bash
# npm
npm install custom-cursors

# yarn
yarn add custom-cursors

# pnpm
pnpm add custom-cursors

# bun
bun add custom-cursors
```

### Peer Dependencies

```bash
npm install react react-dom
```

## Quick Start

### 1. Import styles (required)

```tsx
import "custom-cursors/styles.css";
```

### 2. Create cursor variants

```tsx
import type { CursorComponentProps } from "custom-cursors";

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
import { CursorProvider } from "custom-cursors";

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

## API Reference

### CursorProvider

The main provider component that manages cursor state and rendering.

```tsx
interface CursorProviderProps {
  variants: CursorVariantMap;
  config?: CursorConfig;
  children: ReactNode;
}
```

#### Props

- **variants** (required): Map of variant names to React components
- **config**: Optional configuration object
- **children**: Your app content

#### Config Options

```tsx
interface CursorConfig {
  enabled?: boolean; // Enable/disable cursor (default: true)
  trailing?: number; // Lerp factor for trailing (0-1, default: 0)
  reducedMotionRespect?: boolean; // Respect prefers-reduced-motion (default: true)
  disableOnTouch?: boolean; // Disable on touch devices (default: true)
  cursorClassName?: string; // Additional CSS class for cursor container
}
```

### Cursor Component Props

Every cursor variant component receives these props:

```tsx
interface CursorComponentProps {
  x: number; // Mouse X position
  y: number; // Mouse Y position
  isHidden: boolean; // Whether cursor should be hidden
  variant: CursorVariantName; // Current variant name
  meta?: Record<string, any>; // Additional metadata
}
```

### useCursor Hook

Access cursor state and controls from any component within CursorProvider.

```tsx
const {
  variant, // Current variant name
  setVariant, // Set variant directly
  pushVariant, // Push variant to stack (with optional timeout)
  popVariant, // Pop previous variant from stack
  setVariantComponent, // Replace a variant component at runtime
  setMeta, // Set metadata for current variant
  isEnabled, // Whether cursor is currently enabled
} = useCursor();
```

#### Methods

##### setVariant(variant, meta?)

```tsx
setVariant("hover");
setVariant("loading", { progress: 50 });
```

##### pushVariant(variant, options?)

```tsx
// Push temporarily
pushVariant("loading");

// Push with auto-pop timeout
pushVariant("loading", { timeout: 2000 });

// Push with metadata
pushVariant("hover", { meta: { color: "red" } });
```

##### setVariantComponent(variant, component)

```tsx
// Replace hover variant at runtime
const NewHover = (props) => <div>New hover cursor</div>;
setVariantComponent("hover", NewHover);
```

### CursorTarget

Component wrapper for hover-based variant switching.

```tsx
interface CursorTargetProps {
  variant: CursorVariantName;
  children: ReactNode;
  disabled?: boolean;
  meta?: Record<string, any>;
}
```

```tsx
<CursorTarget variant="hover" meta={{ type: "button" }}>
  <button>Hover me</button>
</CursorTarget>
```

### Data Attributes

Use `data-cursor` attributes for simple hover interactions:

```tsx
<button data-cursor="hover">Hover me</button>
<a href="#" data-cursor="clickable">Click me</a>

// With metadata (JSON string)
<div data-cursor="hover" data-cursor-meta='{"type":"card"}'>
  Card content
</div>
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

## Accessibility

- **Reduced Motion**: Automatically disabled when `prefers-reduced-motion: reduce`
- **Touch Devices**: Disabled on devices with coarse pointers
- **Input Fields**: System cursor automatically restored in text inputs
- **Focus Management**: Works with keyboard navigation via focus events

## Performance

- **Zero Re-renders**: Mouse movement doesn't trigger React re-renders
- **RAF Optimization**: Uses requestAnimationFrame for smooth 60fps tracking
- **Efficient Updates**: Only updates transform property for position changes
- **Memory Safe**: Proper cleanup prevents memory leaks
- **Bundle Size**: <5KB gzipped with zero dependencies

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

Gracefully falls back to system cursor on unsupported browsers.

## Next.js Integration

### App Router (Recommended)

```tsx
// app/layout.tsx
import { CursorProvider } from "custom-cursors";
import "custom-cursors/styles.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CursorProvider variants={variants}>{children}</CursorProvider>
      </body>
    </html>
  );
}
```

### Pages Router

```tsx
// pages/_app.tsx
import { CursorProvider } from "custom-cursors";
import "custom-cursors/styles.css";

export default function App({ Component, pageProps }) {
  return (
    <CursorProvider variants={variants}>
      <Component {...pageProps} />
    </CursorProvider>
  );
}
```

## TypeScript

Full TypeScript support is included. The library exports all necessary types:

```tsx
import type {
  CursorComponentProps,
  CursorConfig,
  CursorVariantMap,
  // ... and more
} from "custom-cursors";
```

## Contributing

1. Clone the repository
2. Install dependencies: `bun install`
3. Run tests: `bun run test`
4. Build: `bun run build`

## License

MIT

---

Made with ❤️ for better web experiences.
