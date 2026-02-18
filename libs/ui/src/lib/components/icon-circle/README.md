---
name: IconCircleComponent
type: component
category: components
selector: ui-icon-circle
description: Circular container for icons, avatars or small visual indicators
inputs: []
slots:
  - { name: default, description: Icon or image content }
---

# IconCircleComponent

Contenedor circular para iconos o imágenes pequeñas.

## Selector

```html
<ui-icon-circle>
```

## Propósito

Provee un contenedor con forma circular para mostrar iconos, avatares o indicadores visuales de estado. El estilo circular se aplica via SCSS al host.

## Uso

```html
<ui-icon-circle>
  <icon-wrapper icon="person" />
</ui-icon-circle>

<ui-icon-circle>
  <mat-icon>check</mat-icon>
</ui-icon-circle>
```
