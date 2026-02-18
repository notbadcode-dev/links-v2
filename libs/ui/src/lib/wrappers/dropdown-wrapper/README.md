---
name: DropdownWrapperComponent
type: wrapper
category: wrappers
selector: dropdown-wrapper
description: Material Design dropdown menu with named slot content projection for trigger and items
extends: BaseDirective
inputs:
  - { name: trigger, type: EDropdownWrapperTrigger, required: false, default: CLICK, description: How the menu is activated }
  - { name: position, type: EDropdownWrapperPosition, required: false, default: BELOW, description: Menu position relative to trigger }
  - { name: disabled, type: boolean, required: false, default: false, description: Disables the trigger button }
  - { name: customClass, type: string, required: false, default: "''", description: Additional CSS class on trigger button }
outputs:
  - { name: itemSelected, type: unknown, description: Emitted when onItemClick(item) is called programmatically }
slots:
  - { name: "slot=trigger", description: Visible content that opens the menu on click }
  - { name: "slot=content", description: Menu items rendered inside MatMenu }
enums:
  EDropdownWrapperTrigger: [CLICK, HOVER]
  EDropdownWrapperPosition: [BELOW, ABOVE]
---

# DropdownWrapperComponent

Menú desplegable de Material Design con trigger y contenido por slots.

## Selector

```html
<dropdown-wrapper>
```

## Propósito

Encapsula `MatMenu` usando content projection con `slot="trigger"` y `slot="content"`, desacoplando el trigger visual del contenido del menú.

## API

| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `trigger` | `EDropdownWrapperTrigger` | `CLICK` | Cómo se activa el menú |
| `position` | `EDropdownWrapperPosition` | `BELOW` | Posición relativa al trigger |
| `disabled` | `boolean` | `false` | Deshabilita el trigger |
| `customClass` | `string` | `''` | Clase CSS adicional para el botón trigger |

| Output | Tipo | Descripción |
|---|---|---|
| `itemSelected` | `unknown` | Se emite cuando se llama a `onItemClick(item)` internamente |

### `EDropdownWrapperTrigger`

`CLICK` · `HOVER`

### `EDropdownWrapperPosition`

`BELOW` · `ABOVE`

## Slots

| Slot | Descripción |
|---|---|
| `slot="trigger"` | Contenido visible que abre el menú al hacer click |
| `slot="content"` | Elementos del menú (ítems, botones, etc.) |

## Uso

```html
<dropdown-wrapper>
  <ng-container slot="trigger">
    <icon-wrapper icon="more_vert" />
    Opciones
  </ng-container>

  <ng-container slot="content">
    <button class="dropdown-item" (click)="onEdit()">Editar</button>
    <button class="dropdown-item" (click)="onDelete()">Eliminar</button>
  </ng-container>
</dropdown-wrapper>
```
