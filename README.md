# Electron + Vite + React + TypeScript Template

A template for using electron quickly.<br/>

<br />

## Browse Features

- TypeScript environment for fast development and build using electron & vite
- Pre-configuration of essential app elements such as automatic updates, storage, logs, etc.
- Development considering Windows, MacOS cross-platform

<br />

## Frameworks and libraries used

- App framework: [`electron`](https://www.electronjs.org/)
- App build tool: [`electron-builder`](https://www.electron.build/)
- App storage: [`electron-store`](https://github.com/sindresorhus/electron-store)
- App auto updater: [`electron-updater`](https://www.electron.build/auto-update)
- Bundle tool: [`vite`](https://vitejs.dev/)
- Frontend framework: `react` + `typescript`
- Code style: `eslint` + `prettier` + [`@trivago/prettier-plugin-sort-imports`](https://github.com/trivago/prettier-plugin-sort-imports)
- File system based router: [`react-router-dom v6`](https://reactrouter.com/docs/en/v6) + custom (src/components/FileSystemRoutes)

<br />

## Getting started

> If you do not need the layout or specific packages before use, you can remove them and start.

#### dev mode

```bash
yarn dev
```

#### vite & electron build (Based on current OS)

```bash
yarn build
```

#### vite & electron build (Based on current OS)

```bash
yarn build:all
```

<br />
