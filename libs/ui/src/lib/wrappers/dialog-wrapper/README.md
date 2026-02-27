---
name: DialogWrapperComponent
type: wrapper
category: wrappers
selector: dialog-wrapper
description: Material dialog wrapper with configurable size, typed content mode and callback-based confirmation
extends: BaseDirective
inputs:
  - { name: title, type: string, required: true, description: Main dialog title }
  - { name: subtitle, type: "string | undefined", required: false, description: Optional subtitle below title }
  - { name: contentType, type: EDialogWrapperContentType, required: false, default: MESSAGE, description: Content mode for the dialog body }
  - { name: message, type: "string | undefined", required: false, description: Message text for MESSAGE mode }
  - { name: acceptText, type: string, required: false, default: Aceptar, description: Label for confirm action button }
  - { name: cancelText, type: string, required: false, default: Cancelar, description: Label for cancel action button }
  - { name: size, type: ESpacing, required: false, default: MD, description: Dialog width token that maps to concrete modal widths }
  - { name: onAccept, type: TDialogWrapperAcceptCallback, required: false, description: Callback executed before closing on confirm (return false to keep open) }
outputs:
  - { name: accepted, type: "TPayload | undefined", description: Emitted when confirm action is accepted }
  - { name: cancelled, type: void, description: Emitted when cancel action is triggered }
service:
  - { name: DialogWrapperService, method: open(config), description: Opens a Material dialog with disableClose=true and computed size by ESpacing }
enums:
  EDialogWrapperContentType: [MESSAGE, FORM, CUSTOM]
---

# DialogWrapperComponent

Wrapper de `MatDialog` con estilo alineado a la librería, contenido tipado y acciones configurables.

## Selector

```html
<dialog-wrapper>
```

## Propósito

- Renderizar un diálogo consistente con tus wrappers/componentes propios.
- Soportar contenido variable (mensaje, formulario o custom).
- Permitir callback tipado en confirmar.
- Forzar comportamiento seguro: sin aspa de cierre y sin cierre por click fuera.

## API

| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `title` | `string` | — | Título principal |
| `subtitle` | `string \| undefined` | `undefined` | Subtítulo opcional |
| `contentType` | `EDialogWrapperContentType` | `MESSAGE` | Tipo de contenido |
| `message` | `string \| undefined` | `''` | Mensaje para modo `MESSAGE` |
| `acceptText` | `string` | `Aceptar` | Texto del botón aceptar |
| `cancelText` | `string` | `Cancelar` | Texto del botón cancelar |
| `size` | `ESpacing` | `MD` | Tamaño del modal (`NONE/SM/MD/LG/XL`) |
| `onAccept` | `TDialogWrapperAcceptCallback` | `undefined` | Callback de confirmación; si retorna `false` no cierra |

| Output | Tipo | Descripción |
|---|---|---|
| `accepted` | `TPayload \| undefined` | Se emite al aceptar |
| `cancelled` | `void` | Se emite al cancelar |

## Servicio

`DialogWrapperService.open(config)` abre el diálogo con:
- `disableClose: true` (no cierra al click fuera)
- ancho calculado por `ESpacing`
- payload/callback/config tipados

## Uso (servicio + template dinámico)

```typescript
@ViewChild('formTpl', { static: true }) private readonly _formTpl!: TemplateRef<unknown>;

openEditDialog(): void {
  this._dialogWrapperService.open({
    title: 'Editar enlace',
    subtitle: 'Actualiza los datos y confirma',
    contentType: EDialogWrapperContentType.FORM,
    size: ESpacing.LG,
    acceptText: 'Guardar',
    cancelText: 'Cancelar',
    contentTemplate: this._formTpl,
    onAccept: async () => {
      const valid = this.form.valid;
      if (!valid) {
        this.form.markAllAsTouched();
      }
      return valid;
    },
  });
}
```

```html
<ng-template #formTpl>
  <ui-form-container [formGroup]="form">
    <input-text-wrapper [config]="nameConfig" />
    <input-text-wrapper [config]="urlConfig" />
  </ui-form-container>
</ng-template>
```
