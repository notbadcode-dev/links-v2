# UI Styles

Contrato de estilos compartidos para app y librería UI.

## Archivos Clave

- `libs/ui/src/styles/_design-tokens.scss`
- `libs/ui/src/styles/_reboot-material-angular.scss`
- `libs/ui/src/styles/_reboot-variables.scss`
- `libs/ui/src/styles/_shared-mixins.scss`

Reboots por dominio Material:
- `*_button.scss`
- `*_form-field.scss`
- `*_card.scss`
- `*_tooltip.scss`
- `*_icon.scss`
- `*_typography.scss`
- `*_system.scss`

## Orden De Carga Real

Desde `src/styles.scss`:

1. `@use './styles/design-tokens'`
2. `@use './styles/reboot-material-angular'`

`_reboot-material-angular.scss` centraliza y carga todos los reboots de Angular Material.

## Qué Es Contrato Público

- Tokens CSS `--ui-*` definidos en `_design-tokens.scss`.
- Semántica de tema: `:root[data-theme='light']` y `:root[data-theme='dark']`.
- Variables Material sobrescritas por los reboots para mantener coherencia visual.

## Qué Es Interno

- Detalle de implementación SCSS en reboots específicos.
- Clases utilitarias usadas solo en stories/tests visuales.

## Reglas De Cambio

- No renombrar ni eliminar tokens `--ui-*` sin revisar impacto en `src/app` y `libs/ui`.
- Si agregas token nuevo, preferir nombre semántico sobre valor crudo.
- Si ajustas reboots Material, validar al menos:
  - `npm run storybook` (componentes base)
  - pantallas reales de auth (`/login`, `/signup`, `/forgot-password`)
- Mantener soporte de tema claro/oscuro en tokens semánticos.

