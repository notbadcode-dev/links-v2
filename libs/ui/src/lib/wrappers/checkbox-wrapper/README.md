---
name: CheckboxWrapperComponent
selector: checkbox-wrapper
type: component
category: wrapper
standalone: true
changeDetection: OnPush
wraps: MatCheckboxModule
extends: InputWrapperDirective<boolean>
implements:
  - ControlValueAccessor
import: "@app/shared/ui"
inputs:
  - name: label
    type: string
    required: false
  - name: placeholder
    type: string
    required: false
  - name: required
    type: boolean
    required: false
    default: false
  - name: icon
    type: string
    required: false
  - name: hint
    type: string
    required: false
  - name: errorMessage
    type: string
    required: false
  - name: tabindex
    type: number
    required: false
  - name: config
    type: IInputWrapperConfig
    required: false
outputs: []
---

# CheckboxWrapper Component

Componente wrapper que envuelve Angular Material Checkbox e implementa `ControlValueAccessor` para integracion con Angular Forms.

## Uso

### Importar

```typescript
import { CheckboxWrapperComponent } from '@app/shared/ui';
```

### Con Reactive Forms

```typescript
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CheckboxWrapperComponent],
  template: `
    <form [formGroup]="form">
      <checkbox-wrapper
        label="Acepto los terminos"
        [required]="true"
        formControlName="terms"
      />
    </form>
  `,
})
export class MyComponent {
  form = new FormGroup({
    terms: new FormControl(false, [Validators.requiredTrue]),
  });
}
```

### Con ngModel

```typescript
@Component({
  standalone: true,
  imports: [FormsModule, CheckboxWrapperComponent],
  template: `
    <checkbox-wrapper
      label="Recordarme"
      [(ngModel)]="rememberMe"
    />
  `,
})
export class MyComponent {
  rememberMe = false;
}
```

## Inputs

| Input          | Tipo                  | Default | Descripcion                                   |
| -------------- | --------------------- | ------- | --------------------------------------------- |
| `label`        | `string`              | -       | Texto que se muestra junto al checkbox        |
| `placeholder`  | `string`              | -       | Texto de placeholder                          |
| `required`     | `boolean`             | `false` | Si el checkbox es requerido                   |
| `icon`         | `string`              | -       | Nombre del icono de Material Icons            |
| `hint`         | `string`              | -       | Texto de ayuda                                |
| `errorMessage` | `string`              | -       | Mensaje de error cuando es invalido           |
| `tabindex`     | `number \| undefined` | -       | Orden de tabulacion                           |
| `config`       | `IInputWrapperConfig` | -       | Configuracion alternativa via objeto          |

## Caracteristicas

- Standalone component
- OnPush change detection
- Implementa `ControlValueAccessor` (hereda de `InputWrapperDirective<boolean>`)
- Compatible con Reactive Forms y Template-driven Forms
- Integracion con Angular Material Checkbox
- Soporte para validaciones de Angular Forms
- Estados touched/dirty/pristine
- Estado deshabilitado
