---
name: DeleteButtonComponent
type: component
category: components
selector: ui-delete-button
description: Delete action button that opens a confirmation dialog and emits only after user confirms
extends: BaseDirective
inputs:
  - { name: buttonConfig, type: "IDeleteButtonButtonConfig | undefined", required: false, description: Config for internal button-wrapper }
  - { name: dialogConfig, type: "IDeleteButtonDialogConfig | undefined", required: false, description: Config for dialog-wrapper confirmation modal }
  - { name: disabled, type: boolean, required: false, default: false, description: Disables button and prevents dialog opening }
outputs:
  - { name: confirmed, type: void, description: Emitted only when dialog confirmation is accepted }
---

# DeleteButtonComponent

Botón de eliminación que usa `button-wrapper` y confirma con `dialog-wrapper`.

## Selector

```html
<ui-delete-button>
```

## Propósito

- Encapsular un patrón común de eliminación con confirmación.
- Evitar emisión accidental cuando usuario cancela.
- Recibir configuración de botón y diálogo desde el caller.

## API

| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `buttonConfig` | `IDeleteButtonButtonConfig` | defaults internos | Configuración del botón (`button-wrapper`) |
| `dialogConfig` | `IDeleteButtonDialogConfig` | defaults internos | Configuración del diálogo (`dialog-wrapper`) |
| `disabled` | `boolean` | `false` | Deshabilita acción |

| Output | Tipo | Descripción |
|---|---|---|
| `confirmed` | `void` | Se emite solo al confirmar en el diálogo |

## Uso

```html
<ui-delete-button
  [buttonConfig]="{
    title: 'Eliminar',
    tooltip: 'Eliminar elemento'
  }"
  [dialogConfig]="{
    title: 'Confirmar eliminación',
    subtitle: 'Esta acción no se puede deshacer',
    message: '¿Quieres eliminar este elemento?',
    acceptText: 'Eliminar',
    cancelText: 'Cancelar'
  }"
  (confirmed)="onDelete()"
/>
```

```html
<ui-delete-button
  [buttonConfig]="{
    title: 'Remove',
    tooltip: 'Remove user'
  }"
  [dialogConfig]="{
    title: 'Delete user',
    message: 'Do you want to delete this user?',
    acceptText: 'Delete user',
    cancelText: 'Keep user',
    size: ESpacing.MD
  }"
  (confirmed)="onDeleteUser()"
/>
```
