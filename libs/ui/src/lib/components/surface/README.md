---
name: SurfaceComponent
type: component
category: components
selector: ui-surface
description: Visual surface container with variant and padding for highlighted content areas
inputs:
  - { name: variant, type: ESurfaceVariant, required: false, default: ESurfaceVariant.CARD, description: Visual style of the surface }
  - { name: padding, type: ESpacing, required: false, default: ESpacing.MD, description: Inner padding }
enums:
  ESurfaceVariant: [CARD, PLAIN]
  ESpacing: [NONE, SM, MD, LG, XL]
---

# SurfaceComponent

Superficie visual con variante y padding configurables.

## Selector

```html
<ui-surface>
```

## Propósito

Aplica una capa de fondo/borde y espaciado interior al contenido proyectado, siguiendo las variantes del design system. Es la base semántica para áreas visuales destacadas (tarjetas, paneles planos).

## API

| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `variant` | `ESurfaceVariant` | `ESurfaceVariant.CARD` | Estilo visual de la superficie |
| `padding` | `ESpacing` | `ESpacing.MD` | Padding interior |

### `ESurfaceVariant`

| Valor | Descripción |
|---|---|
| `CARD` | Superficie con sombra y borde (tipo tarjeta) |
| `PLAIN` | Superficie plana sin sombra |

### `ESpacing`

`NONE` · `SM` · `MD` · `LG` · `XL`

## Uso

```html
<ui-surface [variant]="ESurfaceVariant.CARD" [padding]="ESpacing.LG">
  <ui-title title="Detalles" />
  <p>Contenido del panel.</p>
</ui-surface>
```
