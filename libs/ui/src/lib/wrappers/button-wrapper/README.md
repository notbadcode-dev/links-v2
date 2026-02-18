---
name: ButtonWrapperComponent
selector: button-wrapper
type: component
category: wrapper
standalone: true
changeDetection: OnPush
wraps: MatButtonModule
extends: null
implements: []
import: "@app/shared/ui"
inputs:
  - name: title
    type: string
    required: true
  - name: tooltip
    type: string
    required: false
  - name: icon
    type: string
    required: false
  - name: variant
    type: EButtonWrapperVariant
    required: false
    default: raised
  - name: color
    type: EButtonWrapperColor
    required: false
    default: primary
  - name: disabled
    type: boolean
    required: false
    default: false
  - name: fullWidth
    type: boolean
    required: false
    default: false
  - name: tabindex
    type: number
    required: false
outputs:
  - name: clicked
    type: Event
---

# ButtonWrapper Component

Componente wrapper que envuelve Angular Material Button con tooltip, iconos y proteccion anti-double-click.

## Uso

### Importar

```typescript
import { ButtonWrapperComponent } from '@app/shared/ui';
```

### Ejemplo basico

```html
<button-wrapper
  title="Guardar"
  (clicked)="onSave($event)"
/>
```

### Con icono

```html
<button-wrapper
  title="Eliminar"
  icon="delete"
  color="warn"
  (clicked)="onDelete($event)"
/>
```

### Con tooltip personalizado

```html
<button-wrapper
  title="Editar"
  tooltip="Editar este registro"
  icon="edit"
  (clicked)="onEdit($event)"
/>
```

### Variantes de estilo

```html
<button-wrapper title="Raised" variant="raised" />
<button-wrapper title="Flat" variant="flat" />
<button-wrapper title="Stroked" variant="stroked" />
<button-wrapper title="Basic" variant="basic" />
```

### Ancho completo

```html
<button-wrapper
  title="Enviar"
  [fullWidth]="true"
  [disabled]="!form.valid"
  (clicked)="onSubmit($event)"
/>
```

## Inputs

| Input       | Tipo                    | Default     | Descripcion                                          |
| ----------- | ----------------------- | ----------- | ---------------------------------------------------- |
| `title`     | `string`                | -           | **Requerido**. Texto del boton                       |
| `tooltip`   | `string`                | `title`     | Tooltip personalizado (si no se proporciona usa title)|
| `icon`      | `string`                | -           | Nombre del icono de Material Icons                   |
| `variant`   | `EButtonWrapperVariant` | `'raised'`  | Estilo: `'raised' \| 'flat' \| 'stroked' \| 'basic'`|
| `color`     | `EButtonWrapperColor`   | `'primary'` | Color: `'primary' \| 'accent' \| 'warn'`            |
| `disabled`  | `boolean`               | `false`     | Deshabilitar boton                                   |
| `fullWidth` | `boolean`               | `false`     | Boton ancho completo                                 |
| `tabindex`  | `number \| undefined`   | -           | Orden de tabulacion del boton                        |

## Outputs

| Output    | Tipo    | Descripcion                                            |
| --------- | ------- | ------------------------------------------------------ |
| `clicked` | `Event` | Emite cuando se hace click (con proteccion anti-double-click) |

## Caracteristicas

- Standalone component
- OnPush change detection
- Integracion con Angular Material Button
- Proteccion anti-double-click con `queueMicrotask`
- Tooltip automatico (usa `title` como fallback)
- Soporte para iconos de Material Icons
- Multiples variantes de estilo via `ButtonWrapperBaseDirective`
