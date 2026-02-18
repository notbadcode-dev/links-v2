<p align="center">
  <img src="https://angular.dev/assets/images/press-kit/angular_icon_gradient.gif" width="120" alt="Angular Logo" />
</p>

<h1 align="center">Links v2</h1>

<p align="center">
  <strong>Cliente web para la gestion de enlaces de NotBadCode</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-21-dd0031?logo=angular" alt="Angular" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Material-21-757575?logo=materialdesign" alt="Angular Material" />
  <img src="https://img.shields.io/badge/Storybook-10-ff4785?logo=storybook" alt="Storybook" />
  <img src="https://img.shields.io/badge/license-UNLICENSED-lightgrey" alt="License" />
</p>

---

## Sobre el proyecto

Links v2 es la interfaz web de la plataforma [NotBadCode](https://github.com/notbadcode-dev). Consume los microservicios de [NotBadCode API v4](https://github.com/notbadcode-dev/notbadcode-api-v4) (Auth y Links) a traves de clientes TypeScript generados automaticamente desde sus especificaciones OpenAPI.

El proyecto esta construido sobre Angular 21 con standalone components, lazy loading por ruta, Angular Material como sistema de UI y Storybook para documentacion visual de componentes.

---

## Primeros pasos

### Requisitos previos

- **Node.js** >= 22.14.0 (recomendado via [nvm](https://github.com/nvm-sh/nvm))
- **npm** >= 10.9.2
- Los microservicios de backend corriendo localmente:
  - Auth Service en `https://localhost:60200`
  - Links Service en `https://localhost:60201`

### Puesta en marcha

```bash
git clone https://github.com/notbadcode-dev/links-v2.git
cd links-v2
npm install
npm run api:generate   # genera los clientes API (backend debe estar corriendo)
npm start              # abre http://localhost:4200
```

---

## Scripts

| Script | Que hace |
|--------|----------|
| `npm start` | Levanta el servidor de desarrollo en `localhost:4200` |
| `npm run build` | Build de produccion en `dist/links-v2` |
| `npm test` | Tests unitarios con Karma + Jasmine |
| `npm run storybook` | Abre Storybook en `localhost:6006` |
| `npm run api:generate` | Regenera los clientes API desde OpenAPI |
| `npm run check` | Ejecuta format:check + lint + type-check |
| `npm run fix` | Ejecuta format + lint:fix |

<details>
<summary>Todos los scripts</summary>

```bash
# Desarrollo
npm start                       # ng serve
npm run watch                   # ng build --watch

# Calidad de codigo
npm run lint                    # ESLint en archivos .ts
npm run lint:fix                # ESLint con auto-fix
npm run lint:html               # ESLint en templates .html
npm run format                  # Prettier write
npm run format:check            # Prettier check
npm run type-check              # tsc --noEmit

# Generacion de API
npm run api:generate            # Auth + Links
npm run api:generate:auth       # Solo Auth
npm run api:generate:links      # Solo Links

# Storybook
npm run storybook               # Dev server
npm run build-storybook         # Build estatico
```

</details>

---

## Estructura

```
src/
├── api/                              # Clientes generados (ng-openapi-gen)
│   ├── auth/                         # Auth Service: login, registro, tokens
│   └── links/                        # Links Service: CRUD de enlaces
│
├── app/
│   ├── core/                         # Singletons: layouts, guards, interceptors
│   │   └── layouts/main-layout/      # Shell del dashboard (sidebar, toolbar)
│   │
│   ├── features/                     # Una carpeta por funcionalidad
│   │   ├── auth/                     # Login, signup, constantes, interfaces
│   │   └── dashboard/                # Vista principal post-login
│   │
│   └── shared/                       # Reutilizable entre features
│       ├── ui/
│       │   ├── components/           # UI propia (centered-content, ...)
│       │   └── wrappers/             # Wrappers sobre Material (button, input, card, ...)
│       ├── constants/                # Iconos, patrones, validaciones
│       ├── directives/               # Directivas compartidas
│       ├── models/                   # Interfaces y tipos globales
│       ├── pipes/                    # Pipes reutilizables
│       └── utils/                    # Funciones de utilidad
│
└── styles.scss                       # Estilos y theme global
```

### Decisiones clave

- **`core/`** contiene solo lo que debe existir una vez en la app (layouts, guards, servicios root). No se importa entre features.
- **`features/`** agrupa por dominio de negocio. Cada feature se carga con lazy loading via `loadComponent`.
- **`shared/ui/`** separa los componentes propios (`components/`) de los que encapsulan Angular Material (`wrappers/`). Los wrappers llevan sufijo `-wrapper` en su selector.
- **`api/`** esta fuera de `app/` porque es codigo auto-generado. Se regenera con `npm run api:generate` cada vez que cambia la API del backend.

---

## Clientes API

Los clientes se generan con [ng-openapi-gen](https://github.com/cyclosproject/ng-openapi-gen) a partir de los specs OpenAPI que exponen los microservicios.

```bash
npm run api:generate   # requiere que Auth (60200) y Links (60201) esten corriendo
```

La configuracion de cada generador vive en:
- `src/api/ng-openapi-gen-auth.json`
- `src/api/ng-openapi-gen-links.json`

Los archivos generados no se versionan — estan en `.gitignore`.

---

## Convenciones

### Componentes

Los selectores no llevan prefijo (`angular.json` > `prefix: ""`). Para distinguir componentes propios de wrappers:

```
centered-content          ← componente propio
button-wrapper            ← envuelve MatButton
input-wrapper             ← envuelve MatFormField + MatInput
```

### TypeScript

| Que | Como | Ejemplo |
|-----|------|---------|
| Interfaces | `I` + PascalCase | `IUser`, `ILoginResponse` |
| Enums | `E` + PascalCase | `EUserRole`, `ELinkStatus` |
| Types | `T` + PascalCase | `TUserId`, `TCallback` |
| Generics | `T` + PascalCase | `TEntity`, `TData` |
| Privados/Protected | `_` + camelCase | `_userId`, `_loadData()` |
| Constantes | UPPER_SNAKE | `API_URL`, `MAX_RETRIES` |

### Reglas de estilo

- Standalone components + `OnPush` siempre
- Tipos explicitos en parametros, propiedades y retornos
- Modificadores de acceso explicitos (`public`, `private`, `protected`)
- Prohibido `any` — usar generics o tipos concretos
- Max 500 lineas/archivo, 150 lineas/funcion, 5 parametros/funcion

### Path aliases

```typescript
import { ButtonComponent } from '@app/shared/ui';
import { AuthApi } from '@api/auth';
```

### Tooling

| Herramienta | Archivo | Funcion |
|-------------|---------|---------|
| ESLint | `eslint.config.mjs` | Reglas TS + Angular + Prettier integration |
| Prettier | `.prettierrc.json` | Single quotes, semicolons, 100 chars, 2 spaces |
| EditorConfig | `.editorconfig` | UTF-8, LF, trim whitespace |
| TypeScript | `tsconfig.json` | `strict: true` + todos los checks adicionales habilitados |

---

## Storybook

Cada componente de `shared/ui/` tiene (o deberia tener) stories asociados. Storybook corre en el puerto 6006 e incluye documentacion automatica via [Compodoc](https://compodoc.app/).

```bash
npm run storybook
```

---

## Testing

```bash
npm test   # Karma + Jasmine + Chrome headless
```

Los archivos de test son `*.spec.ts` junto al archivo que testean.

---

## Antes de hacer push

```bash
npm run check   # format:check + lint + type-check
```

O para corregir automaticamente lo que se pueda:

```bash
npm run fix     # format + lint:fix
```

---

<p align="center">
  <sub>Desarrollado con mass por el equipo de NotBadCode</sub>
</p>
