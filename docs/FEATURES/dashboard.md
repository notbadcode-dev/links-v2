# DASHBOARD Feature

## Objetivo

Ser el punto de entrada autenticado de la app después del login.

Estado actual:
- placeholder visual de bienvenida
- sin widgets ni consumo de datos de negocio todavía

## Alcance Y Límites

Incluye:
- `src/app/features/dashboard/dashboard.component.*`
- barrel de feature (`src/app/features/dashboard/index.ts`)

No incluye:
- control de acceso (se gestiona en `authGuard`)
- layout principal (`src/app/core/layouts/main-layout/*`)

## Ruta

- `/dashboard` (protegida con `authGuard` desde `src/app/app.routes.ts`)

## Flujo De Render

1. Si `SessionService.isAuthenticated()` es `true`, `authGuard` permite acceso.
2. Se carga `MainLayoutComponent`.
3. Ruta hija vacía carga `DashboardComponent`.

## Dependencias

- I18n scope: `provideTranslocoScope('dashboard')`
- Base UI behavior: `BaseDirective`

## Known Decisions

- Dashboard actual se mantiene como placeholder para desacoplar entrega de shell/layout de widgets de negocio.
- La protección de acceso vive en routing (`authGuard`), no en lógica interna del componente.

## Reglas De Cambio Seguro

- Mantener feature desacoplada de auth HTTP.
- Si se agregan widgets, modelar estados (loading/error/empty/success) explícitamente.
- Si se agregan llamadas API, crear helper/servicio de feature y no meter lógica HTTP en el componente.
- Mantener lazy-load y guard en rutas.
- Si cambia flujo, alcance o contratos de dashboard, actualizar este archivo en la misma PR.

## Checklist De PR (Dashboard)

- `npm run check`
- `npm run test:unit`
- Revisar specs de:
  - `src/app/features/dashboard/dashboard.component.spec.ts`
  - `src/app/features/dashboard/index.spec.ts`
