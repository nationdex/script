# AGENTS.md

## Project

This repository is a fork of [ForgeScript](https://github.com/tryforge/ForgeScript) (a Discord bot scripting framework built on discord.js), published as `@nationdex/script`.

- `origin` → `https://github.com/nationdex/script.git` (this fork)
- `upstream` → `https://github.com/tryforge/ForgeScript.git` (upstream project)
- Default branch: `main` (tracks `origin/main`). Keep in sync with `upstream/dev` by merging.

## Changes made in this fork

1. **Package renamed** `@tryforge/forgescript` → `@nationdex/script`.
   - Never reintroduce the old name in source, docs, or generated output.
   - If a package-name reference needs to change, edit the source then regenerate with `npm run docgen` (rebuilds `dist/` and `docs/`).
   - `package-lock.json` is the npm lockfile and must stay named `@nationdex/script`.

2. **ESLint + Prettier replaced with Biome** (`@biomejs/biome` ^2.5.8, config in `biome.json`).
   - Removed `eslint.config.js`, `.prettierrc`, `.prettierignore`.
   - Code style (enforced by formatter): 4-space indent, double quotes, semicolons `asNeeded`, trailing commas `es5`, line width 120.
   - CI gate is `.github/workflows/biome.yml` → `npx biome ci ./src`.
   - Do not re-add ESLint/Prettier; keep all lint/format work in Biome.

3. **PNPM & Bun compatibility**.
   - `package.json` has `"pnpm": { "shamefullyHoist": true }` so pnpm produces a flat `node_modules` (matches npm resolution behavior). Bun already resolves flat by default.
   - `.gitignore` ignores `pnpm-lock.yaml`, `bun.lockb`, `.bun/`, `.pnpm-store/`, `.pnpm-debug.log*`. Only `package-lock.json` (npm) is committed.

4. **License header script made Biome-compatible** (`src/@build/license.ts`).
   - Headers now use a leading space after `*` (`/*\n * SPDX-License-Identifier: LGPL-3.0-or-later\n * Copyright © <year> BotForge\n */`).
   - This keeps `npm run build` from reverting `biome format` output. Keep both formats in sync if the header changes.

5. **Typecheck hardening** — `tsconfig.json` uses `strict: true`, `target: es2022`, `module: commonjs`. `tsc` is currently clean (see Verification).

## Biome rules intentionally disabled (`biome.json`)

These are off because the codebase relies on the patterns they flag. Do not re-enable without refactoring the underlying code:

- `complexity/useLiteralKeys` — bracket-notation private access (e.g. `tracker["init"]`).
- `correctness/noUnusedPrivateClassMembers` — private members invoked by string key.
- `correctness/noUnsafeOptionalChaining` — optional chaining over non-nullable exprs.
- `suspicious/noNonNullAssertedOptionalChain` — `!` combined with optional chains.
- `style/noNonNullAssertion` — codebase uses `!` non-null assertions liberally.

For one-off intentional violations elsewhere, prefer a scoped ignore comment over a global rule change:

```ts
// biome-ignore lint/correctness/noUnusedImports: required for type inference portability
import type { Message, PartialMessage } from "discord.js"
```

## Known remaining Biome diagnostics

As of this writing `npm run check` (biome ci) is **not fully green** — roughly 108 diagnostics remain. They are known and mostly intentional/dynamic code (interpreter internals, `unsafe/*` functions). Breakdown:

- 41 `noExplicitAny` (warning) — `any` in interpreter/manager internals and `unsafe` functions
- 27 `noAssignInExpressions` (error) — assignment inside `while`/`if` conditions in `Compiler`, `Context`, `FileReader`
- 16 `useIterableCallbackReturn` (error) — `.map()`/`.forEach()` callbacks
- 4 `noCommaOperator`, 4 `useLiteralEnumMembers`, 4 `noStaticOnlyClass`
- 3 `noBannedTypes` (`{}` / `Function`)
- 2 `noGlobalEval`, 2 `noAsyncPromiseExecutor`, 2 `noImplicitAnyLet`
- 1 `noUnusedVariables`, 1 `noVoidTypeReturn`, 1 `noSelfCompare`

If fixing: run `npx biome lint ./src` to enumerate, fix the clearly-wrong items first (`noSelfCompare`, `noUnusedVariables`, `noVoidTypeReturn` are likely real bugs), and re-check each rule's remaining count before touching the intentional ones.

## Verification

| Command | Purpose |
| --- | --- |
| `npm run build` | compile `dist/` (`tsc -p tsconfig.build.json` → `node dist/@build/license` → `tsc -p tsconfig.json`) |
| `npm run docgen` | build + regenerate `docs/` (typedoc) + `metadata/` (`node dist/docgen`) |
| `npm run lint` | `biome lint ./src` |
| `npm run format` | `biome format --write ./src` |
| `npm run check` | `biome ci ./src` (CI gate) |
| `npm run test` | build + run the test runner |
| `npx tsc -p tsconfig.json --noEmit` | typecheck (must pass) |
| `npm audit` | 0 vulnerabilities target |

After any source change that alters public API or docs-relevant info, run `npm run docgen` and commit the regenerated `dist/`, `docs/`, and `metadata/`.

## Notes

- `src/@build/` holds build tooling: `license.ts` (license headers) and `commit.ts` (used by `npm run commit`: docgen + metadata commit).
- `.npmignore` excludes `docs/`, `metadata/`, `src/`, `.github/`, markdown, tsconfigs, and `biome.json` — published package ships `dist/` + types only.
- `core.autocrlf=true`; git may warn about LF→CRLF on Windows. Ignore those warnings.
- `src/properties/bulk.ts` intentionally keeps a type-only `discord.js` import under a biome-ignore — do not remove it.