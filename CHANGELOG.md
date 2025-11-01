# Changelog

## v4.7.1

[compare changes](https://codeberg.org/praz/pinia-plugin-persistedstate/compare/v4.7.0...v4.7.1)

### 🩹 Fixes

- Remove postinstall hook (8a06b54)

### ❤️ Contributors

- praz <dev@praz.me>

## v4.7.0

[compare changes](https://codeberg.org/praz/pinia-plugin-persistedstate/compare/v4.6.0...v4.7.0)

### 🚀 Enhancements

- Deserialize with JSON.parse (e7e5305)

### 🩹 Fixes

- Pick `null` values properly (883cc3a)

### 📦 Build

- Move to tsdown (#416)

### ❤️ Contributors

- praz <dev@praz.me>

## v4.6.0

[compare changes](https://codeberg.org/praz/pinia-plugin-persistedstate/compare/v4.5.0...v4.6.0)

### 🚀 Enhancements

- Allow function key option (#412)

### 🏡 Chore

- Move to codeberg (update references) (377a8dd)
- Update dependencies (7288c31)

### ❤️ Contributors

- praz <dev@praz.me>

## v4.5.0

[compare changes](https://github.com/prazdevs/pinia-plugin-persistedstate/compare/v4.4.1...v4.5.0)

### 🚀 Enhancements

- Export `Persist` type ([bc23d5a](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/bc23d5a))

### 🏡 Chore

- Upgrade dependencies ([be73362](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/be73362))

### ❤️ Contributors

- praz <dev@praz.me>

## v4.4.1

[compare changes](https://github.com/prazdevs/pinia-plugin-persistedstate/compare/v4.4.0...v4.4.1)

### 🩹 Fixes

- Remove node>=24 requirement ([d50bd4b](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/d50bd4b))

### ❤️ Contributors

- praz <dev@praz.me>

## v4.4.0

[compare changes](https://github.com/prazdevs/pinia-plugin-persistedstate/compare/v4.3.0...v4.4.0)

### 🚀 Enhancements

- Move @nuxt/kit to peerDependencies ([4cd2337](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/4cd2337))

### 📖 Documentation

- Restore setup store syntax ([739bd1f](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/739bd1f))
- **nuxt:** Add SSR/middleware limitation ([155511e](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/155511e))
- Add setup store persisted state (returned refs only) ([7324490](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/7324490))

### 🏡 Chore

- Upgrade dependencies ([52e879c](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/52e879c))

### ❤️ Contributors

- praz <dev@praz.me>

## v4.3.0

[compare changes](https://github.com/prazdevs/pinia-plugin-persistedstate/compare/v4.2.0...v4.3.0)

### 🚀 Enhancements

- **nuxt:** Add encode/decode to cookies options ([f377002](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/f377002))

### 🩹 Fixes

- Type aware rules ([0a62a72](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/0a62a72))

### 📖 Documentation

- Add limitations regarding Cookies and Cloudflare Workers ([#370](https://github.com/prazdevs/pinia-plugin-persistedstate/pull/370))
- Remove references to deprecated option syntax store declaration ([fde3b95](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/fde3b95))
- Add contributing guide ([fbeaf90](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/fbeaf90))

### 🏡 Chore

- ⚠️  Upgrade dependencies + pinia@3 ([ceac678](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/ceac678))
- Update dependencies ([40eddb2](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/40eddb2))

### 🤖 CI

- Prepare before linting ([8c6ae57](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/8c6ae57))

#### ⚠️ Breaking Changes

- ⚠️  Upgrade dependencies + pinia@3 ([ceac678](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/ceac678))

### ❤️ Contributors

- praz <dev@praz.me>
- Ian Jamieson <i@njamieson.co.uk>

## v4.2.0

[compare changes](https://github.com/prazdevs/pinia-plugin-persistedstate/compare/v4.1.3...v4.2.0)

### 🚀 Enhancements

- **nuxt:** Infer global `cookieOptions` to specified `cookie` storage without options ([3c55848](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/3c55848))
- **nuxt:** Explicit Nuxt plugin name (`pinia-plugin-persistedstate`) ([a0a4c51](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/a0a4c51))

### 🩹 Fixes

- **nuxt:** Check `@pinia/nuxt` module installation by `pinia` key ([#359](https://github.com/prazdevs/pinia-plugin-persistedstate/pull/359))

### 🏡 Chore

- Bump dependencies (incl. pinia^2.3.0 & @pinia/nuxt^0.9.0) ([c71d618](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/c71d618))

### ❤️ Contributors

- praz <dev@praz.me>
- Donald Shtjefni ([@dnldsht](http://github.com/dnldsht))

## v4.1.3

[compare changes](https://github.com/prazdevs/pinia-plugin-persistedstate/compare/v4.1.2...v4.1.3)

### 📖 Documentation

- Fix the afterHydrate describe ([#350](https://github.com/prazdevs/pinia-plugin-persistedstate/pull/350))
- Fix install script groups ([2bd0f25](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/2bd0f25))

### 📦 Build

- Bundle iife and umd with rollup ([fcad302](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/fcad302))

### 🏡 Chore

- Bump dependencies ([76df472](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/76df472))

### ❤️ Contributors

- praz <dev@praz.me>
- Erian ([@catcoal](http://github.com/catcoal))

## v4.1.2

[compare changes](https://github.com/prazdevs/pinia-plugin-persistedstate/compare/v4.1.1...v4.1.2)

### 📖 Documentation

- Add Chinese translation ([#338](https://github.com/prazdevs/pinia-plugin-persistedstate/pull/338))
- Add cookie max size info ([#343](https://github.com/prazdevs/pinia-plugin-persistedstate/pull/343))

### 📦 Build

- Export iife build ([#349](https://github.com/prazdevs/pinia-plugin-persistedstate/pull/349))

### 🏡 Chore

- Bump dependencies & lint ([3418005](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/3418005))

### ❤️ Contributors

- praz <dev@praz.me>
- Chong Li ([@TIX007](http://github.com/TIX007))

## v4.1.1

[compare changes](https://github.com/prazdevs/pinia-plugin-persistedstate/compare/v4.1.0...v4.1.1)

### 🩹 Fixes

- Bump deep-pick-omit to 1.2.1 (fixes falsy value persistence) ([7be6b42](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/7be6b42))

### ❤️ Contributors

- praz <dev@praz.me>

## v4.1.0

[compare changes](https://github.com/prazdevs/pinia-plugin-persistedstate/compare/v4.0.2...v4.1.0)

### 🚀 Enhancements

- Auto mode ([#327](https://github.com/prazdevs/pinia-plugin-persistedstate/pull/327))

### 📖 Documentation

- Update Nuxt links in README.md ([#340](https://github.com/prazdevs/pinia-plugin-persistedstate/pull/340))

### 🏡 Chore

- Upgrade dependencies ([e1c0036](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/e1c0036))

### ❤️ Contributors

- praz <dev@praz.me>
- Charlie ✨ ([@MIGU-EDU](http://github.com/MIGU-EDU))

## v4.0.2

[compare changes](https://github.com/prazdevs/pinia-plugin-persistedstate/compare/v4.0.1...v4.0.2)

### 🩹 Fixes

- Infer `CookieStorageOptions` from `@nuxt/schema` rather than `nuxt/schema` ([9e77053](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/9e77053))
- **nuxt:** Avoid calling runWithContext ([#334](https://github.com/prazdevs/pinia-plugin-persistedstate/pull/334))

### 📖 Documentation

- Improve readability (code group icons + code titles) ([13b6332](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/13b6332))

### 🏡 Chore

- Upgrade dependencies ([ba8cd49](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/ba8cd49))
- Upgrade dependencies ([c2ae5a0](https://github.com/prazdevs/pinia-plugin-persistedstate/commit/c2ae5a0))

### ❤️ Contributors

- praz <dev@praz.me>

## v4.0.1

[compare changes](https://github.com/prazdevs/pinia-plugin-persistedstate/compare/v4.0.0...v4.0.1)

### 🩹 Fixes

- Augment `@nuxt/schema` rather than `nuxt/schema` ([#330](https://github.com/prazdevs/pinia-plugin-persistedstate/pull/330))

### 📖 Documentation

- Add group icon plugin ([#329](https://github.com/prazdevs/pinia-plugin-persistedstate/pull/329))

### ❤️ Contributors

- Daniel Roe ([@danielroe](http://github.com/danielroe))
- Leo ([@yuyinws](http://github.com/yuyinws))

## v4.0.0

### 🚀 Enhancements

- Support excluding paths from persistence with `omit` option
- Support autocompletion for dot-notation paths in `pick` and `omit` options
- ⚠️ Rehydrate only picked/omitted paths (when specified) instead of the whole state
- ⚠️ Drop global `beforeRestore` and `afterRestore` options
- ⚠️ Drop `auto` mode
- **nuxt:** Include Nuxt module in the base package
- **nuxt:** Add global `key` option using template string

### 🔥 Performance

- Deserialize with `destr` instead of `JSON.parse`

### 🩹 Fixes

- **nuxt:** Improve SSR handling and store hdyration/persistence behavior in route middleware

### 💅 Refactors

- ⚠️ Rename `paths` option to `pick`
- ⚠️ Rename `beforeRestore` and `afterRestore` options to `beforeHydrate` and `afterHydrate`
- **nuxt:** ⚠️ Rename auto-imported storage object to `piniaPluginPersistedstate`
- **nuxt:** ⚠️ Rename Nuxt config option key to `piniaPluginPersistedstate`

### 📖 Documentation

- Rewrite documentation to match v4 API
- Add references and links to Nuxt-specific details and implementations

### 📦 Build

- Build standalone from Nuxt module's runtime

### 🎨 Styles

- Add a new identity and logo to the project

#### ⚠️ Breaking Changes

- ⚠️ Rehydrate only picked/omitted paths (when specified) instead of the whole state
- ⚠️ Drop global `beforeRestore` and `afterRestore` options
- ⚠️ Drop `auto` mode
- ⚠️ Rename `paths` option to `pick`
- ⚠️ Rename `beforeRestore` and `afterRestore` options to `beforeHydrate` and `afterHydrate`
- **nuxt:** ⚠️ Rename auto-imported storage object to `piniaPluginPersistedstate`
- **nuxt:** ⚠️ Rename Nuxt config option key to `piniaPluginPersistedstate`

### ❤️ Contributors

- praz <dev@praz.me>

***

_For changes prior to v4, please refer to the [GitHub Releases](https://github.com/prazdevs/pinia-plugin-persistedstate/releases)_
