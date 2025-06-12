## Installation

```js
<script src='https://cdn.jsdelivr.net/npm/pointers-js@1.0.0/dist/index.min.js'></script>
```

```sh
npm install pointers-js
```

## Usage

Initialize the cursor with the following function. Passing config object is optional. Check out the [API Reference](#) for all config options.

```js
const config = {
  /* ... */
}

initCursor(config)
```

## React

Somewhere in the root of your project:

```jsx
import { initCursor } from 'pointers-js'

function Layout() {
  useEffect(() => {
    initCursor()
  }, [])

  /* ... */
}
```

## Examples

The default states configured on the cursor can be on [the website](https://pointers.js.org).
