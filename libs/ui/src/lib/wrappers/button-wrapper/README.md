---
name: ButtonWrapperComponent
type: wrapper
category: wrappers
selector: button-wrapper
description: Material Design button with variants, icon, tooltip and double-click protection
extends: BaseDirective
integrations:
  - { token: DISABLE_ON_LOADING, optional: true, description: Auto-disables during loading state }
inputs:
  - { name: title, type: string, required: true, description: Button label text }
  - { name: variant, type: EButtonWrapperVariant, required: false, default: RAISED, description: Visual style }
  - { name: color, type: EButtonWrapperColor, required: false, default: PRIMARY, description: Material color theme }
  - { name: icon, type: "string | undefined", required: false, description: Material Icons name displayed before text }
  - { name: tooltip, type: "string | undefined", required: false, description: Tooltip text, defaults to title }
  - { name: disabled, type: boolean, required: false, default: false, description: Manually disables the button }
  - { name: fullWidth, type: boolean, required: false, default: false, description: Stretches button to full container width }
  - { name: tabindex, type: "number | undefined", required: false, description: Tab navigation index }
outputs:
  - { name: clicked, type: Event, description: Emitted on click when not disabled or processing }
enums:
  EButtonWrapperVariant: [RAISED, FLAT, STROKED, BASIC]
  EButtonWrapperColor: [PRIMARY, ACCENT, WARN]
---

# ButtonWrapperComponent

Botón de Material Design con variantes, icono, tooltip y protección contra doble-click.

## Selector

```html
<button-wrapper>
```

## Propósito

Encapsula `MatButton` con lógica adicional:
- Cuatro variantes visuales (`raised`, `flat`, `stroked`, `basic`).
- Deshabilita automáticamente si `DISABLE_ON_LOADING` token está activo.
- Protege contra doble submit usando un flag `_isProcessing` con `queueMicrotask`.

## API

| Input | Tipo | Requerido | Default | Descripción |
|---|---|---|---|---|
| `title` | `string` | ✅ | — | Texto visible del botón |
| `variant` | `EButtonWrapperVariant` | ❌ | `RAISED` | Estilo visual del botón |
| `color` | `EButtonWrapperColor` | ❌ | `PRIMARY` | Color Material |
| `icon` | `string` | ❌ | — | Icono Material antes del texto |
| `tooltip` | `string` | ❌ | `title` | Texto del tooltip (usa `title` si no se especifica) |
| `disabled` | `boolean` | ❌ | `false` | Deshabilita el botón |
| `fullWidth` | `boolean` | ❌ | `false` | Ocupa todo el ancho disponible |
| `tabindex` | `number` | ❌ | — | Índice de tabulación |

| Output | Tipo | Descripción |
|---|---|---|
| `clicked` | `Event` | Se emite al hacer click (solo si no está deshabilitado) |

### `EButtonWrapperVariant`

`RAISED` · `FLAT` · `STROKED` · `BASIC`

### `EButtonWrapperColor`

`PRIMARY` · `ACCENT` · `WARN`

## Uso

```html
<!-- Botón primario simple -->
<button-wrapper title="Guardar" (clicked)="onSave()" />

<!-- Con icono y variante stroked -->
<button-wrapper
  title="Eliminar"
  icon="delete"
  [variant]="EButtonWrapperVariant.STROKED"
  [color]="EButtonWrapperColor.WARN"
  (clicked)="onDelete()"
/>

<!-- Botón de submit deshabilitado -->
<button-wrapper
  title="Enviar"
  [disabled]="form.invalid"
  [fullWidth]="true"
/>
```
