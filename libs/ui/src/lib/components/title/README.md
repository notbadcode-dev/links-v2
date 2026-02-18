---
name: TitleComponent
type: component
category: components
selector: ui-title
description: Title and optional subtitle block with design system typography styles
inputs:
  - { name: title, type: string, required: true, description: Main heading text (renders as h1) }
  - { name: subtitle, type: "string | undefined", required: false, description: Secondary descriptive text (renders as p) }
---

# TitleComponent

Bloque de título y subtítulo con estilos tipográficos del design system.

## Selector

```html
<ui-title>
```

## Propósito

Renderiza un `<h1>` con título obligatorio y un `<p>` de subtítulo opcional, aplicando las clases tipográficas del design system de forma consistente en toda la app.

## API

| Input | Tipo | Requerido | Descripción |
|---|---|---|---|
| `title` | `string` | ✅ | Texto principal del título |
| `subtitle` | `string` | ❌ | Texto secundario descriptivo |

## Uso

```html
<ui-title title="Iniciar sesión" />

<ui-title
  title="Crear cuenta"
  subtitle="Completa el formulario para registrarte"
/>
```
