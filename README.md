<p align="center">
  <img src="./src/assets/icons/brand/bookmark_animated_S_readme.svg" width="120" alt="StackMarkr Logo" />
</p>

<h1 align="center">StackMarkr (links-v2)</h1>

<p align="center">
  Frontend Angular con design system propio, i18n, cliente OpenAPI generado y testing completo (unit, e2e y story tests).
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-22-brightgreen?logo=node.js" alt="Node Version" />
  <img src="https://img.shields.io/badge/npm-10-red?logo=npm&logoColor=red" alt="npm Version" />
  <img src="https://img.shields.io/badge/Angular-21-dd0031?logo=angular&logoColor=dd0031" alt="Angular" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Storybook-10-ff4785?logo=storybook" alt="Storybook" />
  <img src="https://img.shields.io/badge/ESLint-9-4b32c3?logo=eslint&logoColor=4b32c3" alt="ESLint" />
</p>

---

## Tabla De Contenidos

- [Tabla De Contenidos](#tabla-de-contenidos)
- [Descripción](#descripción)
- [Stack](#stack)
- [Requisitos](#requisitos)
- [Inicio Rápido](#inicio-rápido)
- [Scripts Principales](#scripts-principales)
- [Estructura](#estructura)
- [Documentación](#documentación)
- [Notas](#notas)

---

## Descripción

`links-v2` es una aplicación frontend Angular centrada en gestión de enlaces, con:

- arquitectura por features (`src/app/features`)
- librería UI reusable (`libs/ui`)
- cliente API generado desde OpenAPI (`src/api`)
- documentación orientada a colaboración con agentes (`AGENTS.md` + `docs/`)

---

## Stack

- Angular 21 + TypeScript (`strict`)
- Angular Material + SCSS design tokens
- Transloco (i18n)
- Vitest + Testing Library
- Playwright (e2e)
- Storybook + test-runner

---

## Requisitos

- Node.js `>= 22.19.0`
- npm `>= 10.9.0`

---

## Inicio Rápido

```bash
npm ci
npm run start
```

App local: `http://localhost:4200`

---

## Scripts Principales

| Comando                    | Descripción                                  |
| -------------------------- | -------------------------------------------- |
| `npm run start`            | Levanta la app en local                      |
| `npm run check`            | Formato + lint TS/HTML + type-check          |
| `npm run test:unit`        | Ejecuta pruebas unitarias                    |
| `npm run test:e2e`         | Ejecuta pruebas end-to-end                   |
| `npm run storybook`        | Levanta Storybook                            |
| `npm run test:stories:ci`  | Build + smoke + interaction tests de stories |
| `npm run api:generate`     | Regenera cliente API (`src/api`)             |
| `npm run docs:check-links` | Valida enlaces relativos en `.md`            |

---

## Estructura

```text
src/
  app/
    core/        # infraestructura transversal
    features/    # dominio por feature
    shared/      # componentes compartidos de app
  api/           # cliente OpenAPI generado
  assets/
libs/
  ui/
    src/lib/     # componentes/wrappers/directivas/tipos/utils
    src/styles/  # tokens y reboots de estilo
docs/
  FEATURES/      # documentación por feature
```

---

## Documentación

- Entrada y reglas operativas: [`AGENTS.md`](AGENTS.md)
- Arquitectura: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- Convenciones: [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md)
- Contratos API: [`docs/CONTRACTS.md`](docs/CONTRACTS.md)
- Seguridad (tokens/sesión/refresh/logout): [`docs/SECURITY.md`](docs/SECURITY.md)
- Features: [`docs/FEATURES/README.md`](docs/FEATURES/README.md)
- Índice de `src/app/features`: [`src/app/features/README.md`](src/app/features/README.md)
- UI library (API TS): [`libs/ui/src/lib/README.md`](libs/ui/src/lib/README.md)
- UI library (styles/tokens): [`libs/ui/src/styles/README.md`](libs/ui/src/styles/README.md)

---

## Notas

- `src/api/**` es código generado: no editar manualmente.
- Si cambia el contrato backend, regenerar con `npm run api:generate`.
