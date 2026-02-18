---
name: InputWrapperDirective
selector: null
type: directive
category: wrapper
standalone: false
changeDetection: null
wraps: null
extends: null
implements:
  - ControlValueAccessor
import: "@app/shared/ui/wrappers/input-wrapper"
generic: "T = string, C extends IInputWrapperConfig = IInputWrapperConfig"
abstract: true
inputs:
  - name: label
    type: string
    required: false
  - name: hideInternalLabel
    type: boolean
    required: false
    default: true
  - name: hideExternalLabel
    type: boolean
    required: false
    default: false
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
    type: IInputWrapperConfig
    required: false
outputs: []
---

# InputWrapper Directive (Base)

Directiva abstracta base para todos los componentes de input. Implementa `ControlValueAccessor` y proporciona funcionalidad comun.

## Proposito

Esta clase base permite:
- Reutilizacion de codigo: la logica de `ControlValueAccessor` se implementa una sola vez
- Consistencia: todos los inputs tienen el mismo comportamiento y API
- Escalabilidad: facil creacion de nuevos tipos de inputs

## Uso

### Crear un nuevo componente de input

```typescript
import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputWrapperDirective } from '../input-wrapper.directive';

@Component({
  selector: 'input-custom-wrapper',
  templateUrl: './input-custom-wrapper.component.html',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCustomWrapperComponent),
      multi: true,
    },
  ],
})
export class InputCustomWrapperComponent extends InputWrapperDirective<YourType> {
  readonly customInput = input<string>();
}
```

## Inputs comunes (heredados por todos)

| Input               | Tipo                  | Default     | Descripcion                                      |
| ------------------- | --------------------- | ----------- | ------------------------------------------------ |
| `label`             | `string`              | -           | Etiqueta del input                               |
| `hideInternalLabel`  | `boolean`            | `true`      | Ocultar label interno del mat-form-field         |
| `hideExternalLabel`  | `boolean`            | `false`     | Ocultar label externo sobre el input             |
| `placeholder`       | `string`              | `''`        | Texto de placeholder                             |
| `required`          | `boolean`             | `false`     | Si el input es requerido                         |
| `icon`              | `string`              | -           | Nombre del icono de Material Icons               |
| `hint`              | `string`              | -           | Texto de ayuda debajo del input                  |
| `errorMessage`      | `string`              | -           | Mensaje de error cuando es invalido              |
| `tabindex`          | `number \| undefined` | -           | Orden de tabulacion del input                    |
| `config`            | `IInputWrapperConfig` | -           | Configuracion alternativa via objeto             |

## Signals internos

| Signal       | Tipo             | Descripcion                  |
| ------------ | ---------------- | ---------------------------- |
| `value`      | `Signal<T\|null>`| Valor actual del input       |
| `isDisabled` | `Signal<boolean>`| Estado deshabilitado         |

## Metodos

| Metodo              | Descripcion                                              |
| ------------------- | -------------------------------------------------------- |
| `writeValue`        | Escribe un nuevo valor (llamado por Angular Forms)       |
| `registerOnChange`  | Registra callback para cambios de valor                  |
| `registerOnTouched` | Registra callback para evento blur                       |
| `setDisabledState`  | Habilita o deshabilita el input                          |
| `onChange`          | Maneja cambio de valor (puede ser sobrescrito)           |
| `onBlur`            | Maneja evento blur, marca el input como touched          |

## Componentes que extienden de InputWrapperDirective

- **input-text-wrapper**: `InputWrapperDirective<string, IInputTextWrapperConfig>`
- **input-password-wrapper**: `InputWrapperDirective<string, IInputTextWrapperConfig>`
- **checkbox-wrapper**: `InputWrapperDirective<boolean>`

## Caracteristicas

- Directiva abstracta generica `InputWrapperDirective<T, C>`
- Implementa `ControlValueAccessor`
- Inputs configurables via propiedades individuales o via objeto `config`
- Computed signals para resolver valores efectivos (input individual > config > default)
- Compatible con Reactive Forms y Template-driven Forms
