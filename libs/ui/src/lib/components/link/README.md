---
name: LinkComponent
type: component
category: components
selector: ui-link
description: Internal navigation link using Angular Router with design system styles
inputs:
  - { name: route, type: string, required: true, description: Angular router navigation path }
  - { name: label, type: string, required: true, description: Visible link text }
  - { name: tooltip, type: string, required: false, description: Optional tooltip text }
---

# LinkComponent

Enlace de navegación interna con Angular Router.

## Selector

```html
<ui-link>
```

## Propósito

Renderiza un `<a>` con `routerLink` aplicando los estilos de enlace del design system. Evita usar `routerLink` directamente en templates de features.

## API

| Input | Tipo | Requerido | Descripción |
|---|---|---|---|
| `route` | `string` | ✅ | Ruta de navegación (`/login`, `/dashboard`) |
| `label` | `string` | ✅ | Texto visible del enlace |
| `tooltip` | `string` | ❌ | Tooltip opcional del enlace |

## Uso

```html
<ui-link route="/signup" label="Crear cuenta" />
<ui-link route="/login" label="Iniciar sesión" />
<ui-link route="/dashboard" label="Dashboard" tooltip="Ir al panel principal" />
```
