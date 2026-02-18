---
name: InputTextWrapperComponent
selector: input-text-wrapper
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
  - name: type
    type: EInputTextWrapperType
    required: false
    default: text
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

# InputTextWrapper Component

Componente wrapper que envuelve Angular Material Input para campos de texto e implementa `ControlValueAccessor` para integracion con Angular Forms.

## Uso

### Importar

```typescript
import { InputTextWrapperComponent } from '@app/shared/ui';
```

### Con Reactive Forms

```typescript
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, InputTextWrapperComponent],
  template: `
    <form [formGroup]="form">
      <input-text-wrapper
        label="Email"
        placeholder="Ingrese su email"
        type="email"
        icon="email"
        [required]="true"
        formControlName="email"
      />
    </form>
  `,
})
export class MyComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
}
```

### Con ngModel

```typescript
@Component({
  standalone: true,
  imports: [FormsModule, InputTextWrapperComponent],
  template: `
    <input-text-wrapper
      label="Nombre"
      placeholder="Ingrese su nombre"
      icon="person"
      [(ngModel)]="nombre"
    />
  `,
})
export class MyComponent {
  nombre = '';
}
```

### Con configuracion via objeto

```typescript
@Component({
  template: `
    <input-text-wrapper
      [config]="emailConfig"
      formControlName="email"
    />
  `,
})
export class MyComponent {
  emailConfig: IInputTextWrapperConfig = {
    label: 'Email',
    placeholder: 'Ingrese su email',
    type: EInputTextWrapperType.EMAIL,
    icon: 'email',
    required: true,
  };
}
```

## Inputs

| Input          | Tipo                    | Default  | Descripcion                                         |
| -------------- | ----------------------- | -------- | --------------------------------------------------- |
| `label`        | `string`                | -        | Etiqueta del input                                  |
| `placeholder`  | `string`                | `''`     | Texto de placeholder                                |
| `required`     | `boolean`               | `false`  | Si el input es requerido                            |
| `type`         | `EInputTextWrapperType` | `'text'` | Tipo de input: `'text' \| 'email' \| 'password' \| 'url'` |
| `icon`         | `string`                | -        | Nombre del icono de Material Icons                  |
| `hint`         | `string`                | -        | Texto de ayuda debajo del input                     |
| `errorMessage` | `string`                | -        | Mensaje de error cuando es invalido                 |
| `tabindex`     | `number \| undefined`   | -        | Orden de tabulacion del input                       |
| `config`       | `IInputTextWrapperConfig` | -      | Configuracion alternativa via objeto                |

## Caracteristicas

- Standalone component
- OnPush change detection
- Implementa `ControlValueAccessor` (hereda de `InputWrapperDirective<string>`)
- Compatible con Reactive Forms y Template-driven Forms
- Integracion con Angular Material Form Field e Input
- Multiples tipos de input (text, email, password, url)
- Soporte para iconos de Material Icons
- Validacion y mensajes de error
- Hints informativos
- Estado deshabilitado
- Configurable via inputs individuales o via objeto `config`
