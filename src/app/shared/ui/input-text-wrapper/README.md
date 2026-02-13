# InputText Component

Un componente wrapper de input de texto reutilizable que envuelve componentes de Material Design e implementa `ControlValueAccessor` para integración completa con Angular Forms.

## Uso con Reactive Forms

```typescript
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from '@app/shared/ui';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, InputTextComponent],
  template: `
    <form [formGroup]="form">
      <input-text-wrapper
        label="Email"
        placeholder="Ingrese su email"
        type="email"
        icon="email"
        hint="Usaremos este email para contactarlo"
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

## Uso con ngModel

```typescript
import { FormsModule } from '@angular/forms';
import { InputTextComponent } from '@app/shared/ui';

@Component({
  standalone: true,
  imports: [FormsModule, InputTextComponent],
  template: `
    <input-text-wrapper
      label="Email"
      placeholder="Ingrese su email"
      type="email"
      icon="email"
      [(ngModel)]="email"
    />
  `,
})
export class MyComponent {
  email = '';
}
```

## Inputs

| Input          | Tipo                                                | Default | Descripción                                    |
| -------------- | --------------------------------------------------- | ------- | ---------------------------------------------- |
| `label`        | `string`                                            | -       | **Requerido**. Etiqueta del input              |
| `placeholder`  | `string`                                            | `''`    | Texto de placeholder                           |
| `required`     | `boolean`                                           | `false` | Si el input es requerido                       |
| `type`         | `'text' \| 'email' \| 'password' \| 'url' \| 'tel'` | `text`  | Tipo de input                                  |
| `icon`         | `string`                                            | -       | Nombre del ícono de Material Icons (opcional)  |
| `hint`         | `string`                                            | -       | Texto de ayuda debajo del input                |
| `errorMessage` | `string`                                            | -       | Mensaje de error a mostrar cuando es inválido  |
| `tabindex`     | `number \| undefined`                               | -       | Orden de tabulación del input                  |

## ControlValueAccessor

Este componente implementa `ControlValueAccessor`, lo que permite usarlo con:
- ✅ `formControlName` (Reactive Forms)
- ✅ `formControl` (Reactive Forms)
- ✅ `ngModel` (Template-driven Forms)
- ✅ Validaciones de Angular Forms
- ✅ Estados touched/dirty/pristine

## Características

- ✅ Standalone component
- ✅ OnPush change detection
- ✅ **Implementa ControlValueAccessor**
- ✅ Compatible con Reactive Forms y Template-driven Forms
- ✅ Integración con Angular Material
- ✅ Soporte para íconos
- ✅ Validación y mensajes de error
- ✅ Hints informativos
- ✅ Múltiples tipos de input (text, email, password, url, tel)
- ✅ Estado deshabilitado
- ✅ Soporte para tabindex
- ✅ Responsive (ancho completo)

## Ejemplos

### Input básico con ngModel

```typescript
<input-text-wrapper
  label="Nombre"
  [(ngModel)]="nombre"
/>
```

### Input con placeholder e ícono

```typescript
<input-text-wrapper
  label="Buscar"
  placeholder="Buscar productos..."
  icon="search"
  [(ngModel)]="searchTerm"
/>
```

### Input de email con validación (Reactive Forms)

```typescript
// En el componente
form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
});

// En el template
<input-text-wrapper
  label="Email"
  type="email"
  icon="email"
  [required]="true"
  errorMessage="Email inválido"
  formControlName="email"
/>
```

### Input de password

```typescript
<input-text-wrapper
  label="Contraseña"
  type="password"
  icon="lock"
  [required]="true"
  hint="Mínimo 8 caracteres"
  formControlName="password"
/>
```

### Input deshabilitado (Reactive Forms)

```typescript
// En el componente
form = new FormGroup({
  usuario: new FormControl({ value: 'admin@example.com', disabled: true }),
});

// En el template
<input-text-wrapper
  label="Usuario"
  icon="person"
  formControlName="usuario"
/>
```
