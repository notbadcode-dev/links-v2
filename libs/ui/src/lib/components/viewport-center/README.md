---
name: ViewportCenterComponent
type: component
category: components
selector: viewport-center
description: Full-viewport container that centers its content vertically and horizontally
extends: BaseDirective
inputs: []
slots:
  - { name: default, description: Content to center in the viewport }
---

# ViewportCenterComponent

Centra su contenido vertical y horizontalmente en el viewport.

## Selector

```html
<viewport-center>
```

## Propósito

Provee un contenedor que ocupa todo el viewport y centra su contenido con flexbox, útil para páginas de autenticación, errores o estados vacíos.

## Uso

```html
<viewport-center>
  <card-wrapper title="Iniciar sesión">
    <ui-form-container [formGroup]="form" (formSubmit)="onSubmit()">
      <input-text-wrapper [config]="emailConfig" />
      <button-wrapper title="Entrar" />
    </ui-form-container>
  </card-wrapper>
</viewport-center>
```
