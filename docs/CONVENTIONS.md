# CONVENTIONS

Convenciones aplicadas por ESLint/TypeScript y estándares actuales del repo.

## Naming

- Clases: `PascalCase` y sufijos Angular válidos:
  - Componentes: `*Component`, `*Page`, `*Dialog`, `*Modal`
  - Directivas: `*Directive`
- Interfaces: prefijo obligatorio `I` (ej. `IAuthSession`).
- Type aliases: prefijo obligatorio `T` (ej. `TLanguageCode`).
- Enums: prefijo obligatorio `E` y archivo `*.enums.ts`.
- Constantes:
  - Archivo: `*.constants.ts`
  - Evitar `*.constant.ts` y `*.enum.ts`.
- Miembros privados/protegidos: `camelCase` con `_` inicial (ej. `_http`, `_sessionService`).

## Imports

- Orden de imports obligatorio:
  1. `builtin`
  2. `external`
  3. `internal` (`@api/**`, `@app/**`, `@libs/**`)
  4. `parent/sibling/index`
  5. `object`
  6. `type`
- Evitar imports duplicados.
- Preferir aliases de `tsconfig.json`; no usar rutas relativas profundas si existe alias.

## Estilo De Código

- `strict` habilitado en TypeScript y Angular templates.
- `any` y operaciones inseguras prohibidas.
- Tipos de retorno explícitos en funciones públicas.
- `eqeqeq`, `curly`, `prefer-const`, `prefer-template` y reglas anti-code-smell activas.
- Componentes productivos con `OnPush` (en tests de host está exento).
- Evitar `console.log` en código final (`warn`), permitir solo `console.warn/error`.

## Frontend Y Design Tokens

- Crear token cuando:
  - el valor aparece en 3+ lugares o en 2+ dominios (`src/app` y `libs/ui`);
  - representa semántica de sistema (success/error/warning/info, surface/texto);
  - debe responder a tema light/dark.
- Mantener estilo local cuando:
  - es one-off visual de un solo componente/story;
  - es experimento temporal;
  - no requiere semántica compartida.
- Nombrado de tokens:
  - preferir nombres semánticos (`--ui-color-success-text`);
  - usar sufijos de escala (`-500`, `-600`) solo cuando realmente son escala.
- Guardrail:
  - no eliminar tokens semánticos de estado solo por bajo uso puntual.

## Angular

- Selectores de componentes: `kebab-case` sin prefijo.
- Selectores de directivas: `camelCase` sin prefijo.
- Preferir standalone/signals cuando sea viable (advertencia, no error).
- Evitar inline template/styles/animations en componentes productivos.

## Testing

- Unit tests con Vitest (`*.spec.ts`).
- E2E con Playwright (`e2e/*.spec.ts`).
- Mantener cobertura en código crítico de `core`, `interceptors` y `helpers`.
- Story tests con `@storybook/test-runner`:
  - usar `tags: ['interaction']` en stories con `play`;
  - mantener separación smoke vs interaction.

## Referencias

- Convención de trabajo por feature: [`FEATURES/README.md`](FEATURES/README.md) + archivo de feature.
- Documentación de componentes reutilizables:
  - [`src/app/shared/components/README.md`](../src/app/shared/components/README.md)
  - [`libs/ui/src/lib/components/README.md`](../libs/ui/src/lib/components/README.md)
  - [`libs/ui/src/lib/wrappers/README.md`](../libs/ui/src/lib/wrappers/README.md)
