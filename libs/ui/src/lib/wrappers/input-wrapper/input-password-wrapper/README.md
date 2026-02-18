---
name: InputPasswordWrapperComponent
selector: input-password-wrapper
type: component
category: wrapper
standalone: true
changeDetection: OnPush
wraps: MatFormFieldModule, MatInputModule
extends: InputWrapperDirective<string, IInputTextWrapperConfig>
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
    default: ""
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
    type: IInputTextWrapperConfig
    required: false
outputs: []
---

# InputPasswordWrapper Component

Componente wrapper especializado para inputs de contrasena que extiende de `InputWrapperDirective`. Incluye funcionalidad integrada para mostrar/ocultar la contrasena.

## Uso

### Importar

```typescript
import { InputPasswordWrapperComponent } from '@app/shared/ui';
```

### Con Reactive Forms

```typescript
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, InputPasswordWrapperComponent],
  template: `
    <form [formGroup]="form">
      <input-password-wrapper
        label="Contrasena"
        placeholder="Ingrese su contrasena"
        icon="lock"
        [required]="true"
        formControlName="password"
      />
    </form>
  `,
})
export class MyComponent {
  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
}
```

### Con ngModel

```typescript
@Component({
  standalone: true,
  imports: [FormsModule, InputPasswordWrapperComponent],
  template: `
    <input-password-wrapper
      label="Contrasena"
      icon="lock"
      [(ngModel)]="password"
    />
  `,
})
export class MyComponent {
  password = '';
}
```

## Inputs

| Input          | Tipo                      | Default | Descripcion                                   |
| -------------- | ------------------------- | ------- | --------------------------------------------- |
| `label`        | `string`                  | -       | Etiqueta del input                            |
| `placeholder`  | `string`                  | `''`    | Texto de placeholder                          |
| `required`     | `boolean`                 | `false` | Si el input es requerido                      |
| `icon`         | `string`                  | -       | Nombre del icono de Material Icons            |
| `hint`         | `string`                  | -       | Texto de ayuda debajo del input               |
| `errorMessage` | `string`                  | -       | Mensaje de error cuando es invalido           |
| `tabindex`     | `number \| undefined`     | -       | Orden de tabulacion del input                 |
| `config`       | `IInputTextWrapperConfig` | -       | Configuracion alternativa via objeto          |

## Caracteristicas

- Standalone component
- OnPush change detection
- Implementa `ControlValueAccessor` (hereda de `InputWrapperDirective<string>`)
- Compatible con Reactive Forms y Template-driven Forms
- Integracion con Angular Material Form Field e Input
- Toggle de visibilidad: boton integrado para mostrar/ocultar contrasena
- Aria-labels para accesibilidad en el boton de visibilidad
- Soporte para iconos de Material Icons
- Validacion y mensajes de error
- Estado deshabilitado
- Configurable via inputs individuales o via objeto `config`
