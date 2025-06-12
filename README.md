![image](https://pointers.js.org/og.png)

<p align="center">
  <a href="https://pointers.js.org/">
    <h2 align="center">Pointers.js</h2>
  </a>
</p>

## What's inside?

This library is a monorepo built with [Turborepo](https://turbo.build/). It consists of the following:

### Apps

- [`web`](https://github.com/haaarshsingh/pointers-js/tree/master/apps/web) — the official website.

### Packages

- [`pointers-js`](https://github.com/haaarshsingh/pointers-js/tree/master/packages/pointers-js): the official NPM package.
- [`eslint-config`](https://github.com/haaarshsingh/pointers-js/tree/master/packages/eslint-config): `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`).
- [`typescript-config`](https://github.com/haaarshsingh/pointers-js/tree/master/packages/typescript-config): `tsconfig.json`s used throughout the monorepo.

## Quickstart

To build all apps and packages, run the following command:

```bash
bun run build
```

### Develop

To develop all apps and packages, run the following command:

```
bun dev
```
