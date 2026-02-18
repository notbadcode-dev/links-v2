---
name: FormContainerComponent
type: component
category: components
selector: ui-form-container
description: Semantic form wrapper that binds a FormGroup and emits submit events
inputs:
  - { name: formGroup, type: FormGroup, required: true, description: Reactive form group to bind }
outputs:
  - { name: formSubmit, type: void, description: Emitted on form ngSubmit }
---

# FormContainerComponent

Wrapper semántico de `<form>` que conecta un `FormGroup` reactivo y emite el evento de submit.

## Selector

```html
<ui-form-container>
```

## Propósito

Encapsula la lógica de binding del formulario (`[formGroup]`, `(ngSubmit)`) para que los componentes de formulario no tengan que gestionar el elemento `<form>` directamente.

## API

| Input | Tipo | Requerido | Descripción |
|---|---|---|---|
| `formGroup` | `FormGroup` | ✅ | El grupo reactivo que controla el formulario |

| Output | Tipo | Descripción |
|---|---|---|
| `formSubmit` | `void` | Se emite cuando el formulario hace submit |

## Uso

```html
<ui-form-container [formGroup]="loginForm" (formSubmit)="onSubmit()">
  <input-text-wrapper [config]="emailConfig" />
  <button-wrapper title="Enviar" />
</ui-form-container>
```
