---
name: StackComponent
type: component
category: components
selector: ui-stack
description: Vertical flex container with configurable cross-axis alignment and gap spacing
inputs:
  - { name: align, type: EAlign, required: false, default: EAlign.STRETCH, description: cross-axis alignment (align-items) }
  - { name: gap, type: ESpacing, required: false, default: ESpacing.MD, description: Gap between child elements }
enums:
  EAlign: [START, CENTER, END, BETWEEN, STRETCH]
  ESpacing: [NONE, SM, MD, LG, XL]
---

# StackComponent

Contenedor flex vertical con alineación y espaciado configurables.

## Selector

```html
<ui-stack>
```

## Propósito

Organiza elementos hijos en columna aplicando `gap` y `align-items` via clases CSS del design system. Evita repetir utilidades de layout en cada feature.

## API

| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `align` | `EAlign` | `EAlign.STRETCH` | Alineación cross-axis (`align-items`) |
| `gap` | `ESpacing` | `ESpacing.MD` | Espaciado entre elementos hijos |

### `EAlign`

`START` · `CENTER` · `END` · `BETWEEN` · `STRETCH`

### `ESpacing`

`NONE` · `SM` · `MD` · `LG` · `XL`

## Uso

```html
<ui-stack [gap]="ESpacing.LG" [align]="EAlign.CENTER">
  <ui-title title="Bienvenido" />
  <input-text-wrapper [config]="emailConfig" />
  <button-wrapper title="Continuar" />
</ui-stack>
```
