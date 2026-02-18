---
name: PageComponent
type: component
category: components
selector: ui-page
description: Page layout structure with named content projection slots for header, body and footer
inputs:
  - { name: layout, type: EPageLayout, required: false, default: EPageLayout.DEFAULT, description: Layout variant applied as CSS class }
slots:
  - { name: ui-page-header, description: Page header zone }
  - { name: ui-page-body, description: Main content zone }
  - { name: ui-page-footer, description: Page footer zone }
related:
  - { name: UiPageSectionComponent, selectors: [ui-page-header, ui-page-body, ui-page-footer] }
enums:
  EPageLayout: [DEFAULT, CENTERED]
---

# PageComponent

Estructura de página con header, body y footer mediante content projection con nombre.

## Selectores

```html
<ui-page>
<ui-page-header>
<ui-page-body>
<ui-page-footer>
```

## Propósito

Define el layout principal de una página, proyectando contenido en zonas semánticas (`header`, `main`, `footer`). El input `layout` aplica variaciones de CSS para distintos modos de visualización.

## API

### `ui-page`

| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `layout` | `EPageLayout` | `EPageLayout.DEFAULT` | Variante de layout aplicada como clase CSS |

### `EPageLayout`

| Valor | Descripción |
|---|---|
| `DEFAULT` | Layout de página estándar |
| `CENTERED` | Contenido centrado horizontalmente |

## Uso

```html
<ui-page [layout]="EPageLayout.DEFAULT">
  <ui-page-header>
    <h1>Mi App</h1>
  </ui-page-header>

  <ui-page-body>
    <router-outlet />
  </ui-page-body>

  <ui-page-footer>
    <p>© 2025</p>
  </ui-page-footer>
</ui-page>
```
