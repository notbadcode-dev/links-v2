---
name: InlineTextComponent
type: component
category: components
selector: ui-inline-text
description: Inline text container applying design system typography to projected content
inputs: []
slots:
  - { name: default, description: Inline text or link content }
---

# InlineTextComponent

Contenedor inline para fragmentos de texto con estilos consistentes.

## Selector

```html
<ui-inline-text>
```

## Propósito

Envuelve texto en línea aplicando los estilos tipográficos del design system, útil para resaltar fragmentos dentro de un párrafo o para texto complementario junto a otros elementos.

## Uso

```html
<p>
  ¿No tienes cuenta?
  <ui-inline-text>
    <ui-link route="/signup" label="Regístrate aquí" />
  </ui-inline-text>
</p>
```
