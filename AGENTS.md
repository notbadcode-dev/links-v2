# AGENTS

Este archivo es el punto de entrada para cualquier agente que trabaje en este repositorio.

## Orden De Lectura

1. `AGENTS.md` (este archivo)
2. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
3. [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md)
4. [`docs/CONTRACTS.md`](docs/CONTRACTS.md)
5. [`docs/SECURITY.md`](docs/SECURITY.md)
6. [`docs/FEATURES/README.md`](docs/FEATURES/README.md) + archivo específico de la feature a tocar

## Objetivo Del Proyecto

Aplicación Angular (`links-v2`) con:
- App principal en `src/`
- Librería UI compartida en `libs/ui`
- Cliente API generado con OpenAPI en `src/api`

## Comandos Rápidos

- `npm run start`: levantar app local
- `npm run check`: validaciones de formato, lint y type-check
- `npm run test:unit`: pruebas unitarias con Vitest
- `npm run test:e2e`: pruebas E2E con Playwright
- `npm run storybook`: entorno de componentes
- `npm run test:stories`: tests de stories contra Storybook en ejecución
- `npm run test:stories:smoke`: smoke tests (sin stories `interaction`)
- `npm run test:stories:interaction`: tests de interacción (`tags: ['interaction']`)
- `npm run test:stories:ci`: pipeline completo de Storybook testing en CI

## Reglas Operativas Para Agentes

- No editar archivos generados en `src/api/**` manualmente.
- Si cambia el contrato backend, regenerar API con `npm run api:generate`.
- Respetar aliases de `tsconfig.json` (`@app/*`, `@api/*`, `@libs/*`) en lugar de imports relativos largos.
- Hacer cambios pequeños y verificables; ejecutar al menos `npm run check` cuando sea posible.
- Mantener features encapsuladas dentro de `src/app/features/<feature>`.
- Si cambias comportamiento, API o contratos, actualiza la documentación afectada en la misma PR.

## Fuente De Verdad (Si Hay Conflicto)

Prioridad de decisión:

1. `docs/CONTRACTS.md` (contratos y forma de respuestas/errores)
2. [`docs/SECURITY.md`](docs/SECURITY.md) (decisiones de seguridad frontend)
3. [`docs/FEATURES/README.md`](docs/FEATURES/README.md) + `docs/FEATURES/*.md` (reglas y flujos de dominio por feature)
4. [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md) (naming, imports, estilo)
5. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) (estructura y ubicación de responsabilidades)
6. `README.md` locales (detalle operativo de carpetas/componentes)

## Definición De Hecho (DoD)

Una tarea se considera completa cuando:
- Compila y pasa `type-check`.
- Pasa lint para TS/HTML.
- Mantiene o agrega pruebas para el comportamiento tocado.
- No rompe los contratos descritos en [`docs/CONTRACTS.md`](docs/CONTRACTS.md).

## Estado De La Documentación

Documentación consolidada en `docs/`:
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): estructura y capas.
- [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md): normas de código y frontend.
- [`docs/CONTRACTS.md`](docs/CONTRACTS.md): contratos API/errores/DTOs.
- [`docs/SECURITY.md`](docs/SECURITY.md): decisiones de seguridad (tokens, sesión, refresh, logout).
- [`docs/FEATURES/README.md`](docs/FEATURES/README.md): índice de features documentadas.
- [`docs/FEATURES/_template.md`](docs/FEATURES/_template.md): plantilla para nuevas features.

Documentación por componentes:
- Shared app: [`src/app/shared/components/README.md`](src/app/shared/components/README.md)
- UI library (componentes): [`libs/ui/src/lib/components/README.md`](libs/ui/src/lib/components/README.md)
- UI library (wrappers): [`libs/ui/src/lib/wrappers/README.md`](libs/ui/src/lib/wrappers/README.md)
- UI library (contratos base no visuales): [`libs/ui/src/lib/README.md`](libs/ui/src/lib/README.md)
- UI library (estilos/tokens/reboots): [`libs/ui/src/styles/README.md`](libs/ui/src/styles/README.md)
