# ARCHITECTURE

## Capas Principales

1. Presentación (UI y páginas)
2. Dominio de feature (helpers, interfaces, constantes)
3. Infraestructura transversal (guards, interceptors, servicios core)
4. Integración API (cliente OpenAPI generado)

## Estructura De Carpetas

- `src/app/features/`
  - Módulos funcionales de producto (ej. `auth`, `dashboard`).
  - Cada feature contiene sus páginas, helpers, interfaces y constantes.
- `src/app/core/`
  - Infraestructura global: interceptors, guards, i18n, layouts, servicios de sesión/loading/theme.
  - No debe depender de una feature específica.
- `src/app/shared/`
  - Componentes y utilidades reutilizables de la app.
- `src/api/`
  - Cliente HTTP generado por `ng-openapi-gen` (auth, links, modelos y funciones).
- `libs/ui/`
  - Librería de componentes/directivas/wrappers reutilizable y Storybook.
- `src/assets/`
  - Recursos estáticos (i18n, íconos, etc.).

## Artefactos De Arquitectura Relacionados

- Storybook de UI: `.storybook/` + `libs/ui/stories/`
- Tokens de diseño: `libs/ui/src/styles/_design-tokens.scss`
- Config app y providers raíz: `src/app/app.config.ts`
- Rutas raíz: `src/app/app.routes.ts`
- Documentación de íconos:
  - `src/assets/icons/README.md`
  - `src/assets/icons/brand/README.md`

## Flujo Recomendado De Datos

1. Página/componente en `features/*` dispara acción de UI.
2. Helper/servicio de feature invoca funciones de `@api/*`.
3. Interceptors de `core/interceptors` aplican concerns transversales (auth header, idioma, loading, mapping de errores).
4. La UI consume DTOs de `src/api/**/models` o tipos propios de la feature.

## Enrutamiento

- Router central en `src/app/app.routes.ts`.
- Carga perezosa con `loadComponent`.
- Acceso protegido por `authGuard` para rutas privadas (`dashboard`).

## Dónde Va Cada Cambio

- Nueva pantalla de negocio: `src/app/features/<feature>/pages/...`
- Nueva lógica de negocio de feature: `src/app/features/<feature>/helpers/...`
- Nueva preocupación transversal: `src/app/core/...`
- Nuevo componente reutilizable de design system: `libs/ui/src/lib/...`
- Cambios de contrato API: spec backend + `npm run api:generate`

## Documentación Complementaria

- Reglas de testing de Storybook están resumidas en `AGENTS.md`.
- Convenciones de frontend/tokens están en `CONVENTIONS.md`.
