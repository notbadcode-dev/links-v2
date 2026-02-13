# InputBase Component

Clase abstracta base para todos los componentes de input. Implementa `ControlValueAccessor` y proporciona funcionalidad común para todos los inputs.

## Propósito

Esta clase base permite:
- ✅ **Reutilización de código**: La lógica de `ControlValueAccessor` se implementa una sola vez
- ✅ **Consistencia**: Todos los inputs tienen el mismo comportamiento y API
- ✅ **Mantenibilidad**: Cambios en la lógica común solo se hacen en un lugar
- ✅ **Escalabilidad**: Fácil creación de nuevos tipos de inputs

## Estructura

```typescript
@Directive()
export abstract class InputBaseComponent<T = string> implements ControlValueAccessor {
  // Common inputs
  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly required = input<boolean>(false);
  readonly icon = input<string>();
  readonly hint = input<string>();
  readonly errorMessage = input<string>();
  readonly tabindex = input<number | undefined>(undefined);

  // Internal state
  readonly value = signal<T | null>(null);
  readonly isDisabled = signal<boolean>(false);

  // ControlValueAccessor methods
  public writeValue(value: T | null): void { ... }
  public registerOnChange(fn: (value: T | null) => void): void { ... }
  public registerOnTouched(fn: () => void): void { ... }
  public setDisabledState(isDisabled: boolean): void { ... }

  // Common methods
  public onChange(value: T | null): void { ... }
  public onBlur(): void { ... }
}
```

## Uso

### Crear un nuevo componente de input

```typescript
import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBaseComponent } from '../input-base';

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
export class InputCustomWrapperComponent extends InputBaseComponent<YourType> {
  // Agregar inputs específicos del componente
  readonly customInput = input<string>();

  // Override métodos si es necesario
  public override onChange(value: YourType | null): void {
    // Lógica personalizada antes de llamar al método base
    super.onChange(value);
  }
}
```

## Componentes que extienden de InputBase

- **input-text-wrapper**: Input de texto (text, email, password, url, tel)
  - Generic type: `string`
  - Inputs específicos: `type`

- **input-number-wrapper**: Input numérico
  - Generic type: `number`
  - Inputs específicos: `min`, `max`, `step`
  - Override: `onChange` para parsear string → number

## Inputs comunes (heredados por todos)

| Input          | Tipo                  | Default | Descripción                                    |
| -------------- | --------------------- | ------- | ---------------------------------------------- |
| `label`        | `string`              | -       | **Requerido**. Etiqueta del input              |
| `placeholder`  | `string`              | `''`    | Texto de placeholder                           |
| `required`     | `boolean`             | `false` | Si el input es requerido                       |
| `icon`         | `string`              | -       | Nombre del ícono de Material Icons             |
| `hint`         | `string`              | -       | Texto de ayuda debajo del input                |
| `errorMessage` | `string`              | -       | Mensaje de error a mostrar cuando es inválido  |
| `tabindex`     | `number \| undefined` | -       | Orden de tabulación del input                  |

## Métodos comunes (heredados por todos)

### `writeValue(value: T | null): void`
Escribe un nuevo valor en el componente (llamado por Angular Forms).

### `registerOnChange(fn: (value: T | null) => void): void`
Registra la función callback para cuando el valor cambie.

### `registerOnTouched(fn: () => void): void`
Registra la función callback para cuando el input sea tocado (blur).

### `setDisabledState(isDisabled: boolean): void`
Habilita o deshabilita el input.

### `onChange(value: T | null): void`
Maneja el cambio de valor. Puede ser sobrescrito en componentes hijos.

### `onBlur(): void`
Maneja el evento blur. Marca el input como touched.

## Signals comunes

### `value: Signal<T | null>`
El valor actual del input.

### `isDisabled: Signal<boolean>`
Estado deshabilitado del input.

## Agregar nuevos componentes

Para agregar un nuevo tipo de input:

1. **Crear el componente** que extienda de `InputBaseComponent<T>`
2. **Definir el tipo genérico** apropiado (string, number, Date, etc.)
3. **Agregar inputs específicos** si son necesarios
4. **Sobrescribir métodos** si necesitas lógica personalizada
5. **Crear el template** HTML con Material components
6. **Configurar el provider** NG_VALUE_ACCESSOR

## Ejemplo: Input de fecha

```typescript
@Component({
  selector: 'input-date-wrapper',
  template: `...`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateWrapperComponent),
      multi: true,
    },
  ],
})
export class InputDateWrapperComponent extends InputBaseComponent<Date> {
  readonly minDate = input<Date>();
  readonly maxDate = input<Date>();

  // Override para convertir string a Date
  public override onChange(value: string | Date | null): void {
    const dateValue = value instanceof Date ? value : value ? new Date(value) : null;
    this.value.set(dateValue);
    this._onChange(dateValue);
  }
}
```

## Ventajas de esta arquitectura

✅ **DRY (Don't Repeat Yourself)**: La lógica de `ControlValueAccessor` está en un solo lugar

✅ **Type-safe**: Generic type parameter asegura type safety

✅ **Consistencia**: Todos los inputs tienen la misma API y comportamiento

✅ **Mantenibilidad**: Fácil de mantener y actualizar

✅ **Testeable**: Lógica común se testea una vez

✅ **Extensible**: Fácil agregar nuevos tipos de inputs
