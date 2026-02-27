---
name: IconCircleComponent
type: component
category: components
selector: ui-icon-circle
description: Circular icon picker with popup grid for selecting a svg icon
inputs:
  - {
      name: selectedIcon,
      type: 'string | undefined',
      required: false,
      description: Selected svg icon key,
    }
  - {
      name: icons,
      type: 'readonly string[]',
      required: false,
      default: 'animated icon list (5x5)',
      description: Available svg icons rendered in popup grid,
    }
  - {
      name: iconColor,
      type: string,
      required: false,
      default: 'var(--ui-color-text-default)',
      description: Icon color applied in trigger and grid,
    }
  - {
      name: tooltip,
      type: string,
      required: false,
      default: 'Select icon',
      description: Trigger tooltip text,
    }
  - {
      name: disabled,
      type: boolean,
      required: false,
      default: false,
      description: Disables trigger and popup opening,
    }
outputs:
  - {
      name: selectedIconChange,
      type: string,
      description: Emits selected icon (two-way binding ready),
    }
  - { name: iconSelected, type: string, description: Emits selected icon on user selection }
---

# IconCircleComponent

Selector visual de iconos con popup y cuadrícula.

## Selector

```html
<ui-icon-circle></ui-icon-circle>
```

## Propósito

- Mostrar un icono actual dentro de un contenedor circular.
- Permitir elegir otro icono desde un popup con cuadrícula.
- Homogeneizar el patrón visual con wrappers y tokens del sistema UI.

## API

| Input          | Tipo                  | Default                        | Descripción                   |
| -------------- | --------------------- | ------------------------------ | ----------------------------- |
| `selectedIcon` | `string \| undefined` | `undefined`                    | Icono seleccionado actual     |
| `icons`        | `readonly string[]`   | `animated icon list (5x5)`     | Listado de iconos disponibles |
| `iconColor`    | `string`              | `var(--ui-color-text-default)` | Color de iconos               |
| `tooltip`      | `string`              | `Select icon`                  | Tooltip del trigger           |
| `disabled`     | `boolean`             | `false`                        | Deshabilita apertura          |

| Output               | Tipo     | Descripción                          |
| -------------------- | -------- | ------------------------------------ |
| `selectedIconChange` | `string` | Emite selección para two-way binding |
| `iconSelected`       | `string` | Emite selección al elegir icono      |

## Uso

```html
<ui-icon-circle
  [selectedIcon]="icon"
  [icons]="['auth-user-sidebar', 'theme-toggle-animated', 'brand-bookmark-animated']"
  iconColor="var(--ui-color-primary-600)"
  tooltip="Seleccionar icono"
  (selectedIconChange)="icon = $event"
/>
```

```html
<ui-icon-circle
  [selectedIcon]="warnIcon"
  [icons]="['auth-logout-button', 'auth-login-button', 'auth-password-input']"
  iconColor="var(--ui-color-warn-700)"
  (iconSelected)="onIconSelected($event)"
/>
```
