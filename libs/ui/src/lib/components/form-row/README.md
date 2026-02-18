---
name: FormRowComponent
type: component
category: components
selector: ui-form-row
description: Form row container with configurable horizontal alignment via host CSS classes
inputs:
  - { name: align, type: EAlign, required: false, default: EAlign.START, description: Horizontal alignment of children }
enums:
  EAlign: [START, CENTER, END, BETWEEN, STRETCH]
---

# FormRowComponent

Contenedor de una fila dentro de un formulario, con alineación configurable.

## Selector

```html
<ui-form-row>
```

## Propósito

Aplica clases CSS de alineación (`align-start`, `align-center`, etc.) al host para organizar los campos de un formulario en filas con control de layout.

## API

| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `align` | `EAlign` | `EAlign.START` | Alineación horizontal del contenido |

### `EAlign`

| Valor | CSS Class |
|---|---|
| `START` | `align-start` |
| `CENTER` | `align-center` |
| `END` | `align-end` |
| `BETWEEN` | `align-between` |
| `STRETCH` | `align-stretch` |

## Uso

```html
<ui-form-row>
  <input-text-wrapper [config]="nameConfig" />
  <input-text-wrapper [config]="emailConfig" />
</ui-form-row>

<ui-form-row [align]="EAlign.END">
  <button-wrapper title="Cancelar" [variant]="EButtonWrapperVariant.STROKED" />
  <button-wrapper title="Guardar" />
</ui-form-row>
```
