---
name: Input Wrapper System
type: system
category: wrappers
description: Form field components built on InputWrapperDirective with ControlValueAccessor integration
components:
  - name: InputTextWrapperComponent
    selector: input-text-wrapper
    extends: "InputWrapperDirective<string, IInputTextWrapperConfig>"
    value_type: string
    extra_inputs:
      - { name: type, type: EInputTextWrapperType, required: false, default: TEXT, description: HTML input type }
    enums:
      EInputTextWrapperType: [TEXT, EMAIL, PASSWORD, URL]
  - name: InputPasswordWrapperComponent
    selector: input-password-wrapper
    extends: "InputWrapperDirective<string, IInputTextWrapperConfig>"
    value_type: string
    description: Password field with show/hide toggle button
base:
  name: InputWrapperDirective
  abstract: true
  extends: BaseDirective
  implements: ControlValueAccessor
  integrations:
    - { token: DISABLE_ON_LOADING, optional: true, description: Auto-disables during loading state }
  common_inputs:
    - { name: label, type: "string | undefined" }
    - { name: tooltip, type: "string | undefined", description: Tooltip shown on external label }
    - { name: placeholder, type: "string | undefined" }
    - { name: required, type: "boolean | undefined" }
    - { name: icon, type: "string | undefined", description: Material Icons prefix }
    - { name: hint, type: "string | undefined" }
    - { name: errorMessage, type: "string | undefined" }
    - { name: tabindex, type: "number | undefined" }
    - { name: hideInternalLabel, type: "boolean | undefined", default: true }
    - { name: hideExternalLabel, type: "boolean | undefined", default: false }
    - { name: config, type: IInputWrapperConfig, description: Config object alternative to individual inputs }
interfaces:
  IInputWrapperConfig:
    - { name: label, type: string, required: true }
    - { name: tooltip, type: string, required: false }
    - { name: hideInternalLabel, type: boolean, required: false, default: true }
    - { name: hideExternalLabel, type: boolean, required: false, default: false }
    - { name: placeholder, type: string, required: false }
    - { name: required, type: boolean, required: false }
    - { name: icon, type: string, required: false }
    - { name: hint, type: string, required: false }
    - { name: errorMessage, type: string, required: false }
    - { name: tabindex, type: number, required: false }
  IInputTextWrapperConfig:
    extends: IInputWrapperConfig
    extra:
      - { name: type, type: EInputTextWrapperType, required: false }
---

# Input Wrappers

Sistema de campos de formulario construido sobre `InputWrapperDirective`, que implementa `ControlValueAccessor` para integrarse nativamente con Angular Reactive Forms.

## Componentes disponibles

| Selector | Descripción |
|---|---|
| `<input-text-wrapper>` | Campo de texto genérico (`text`, `email`, `url`) |
| `<input-password-wrapper>` | Campo de contraseña con toggle de visibilidad |
| `<checkbox-wrapper>` | Checkbox (ver [README propio](../checkbox-wrapper/README.md)) |

---

## InputWrapperDirective (base abstracta)

Todos los wrappers de input extienden esta directiva. Provee:
- Implementación de `ControlValueAccessor` (integración con `FormControl` / `formControlName`)
- Gestión del estado `disabled` (manual + via `DISABLE_ON_LOADING` token)
- Sistema dual de configuración: inputs directos **o** objeto `config`

### Inputs comunes

| Input | Tipo | Descripción |
|---|---|---|
| `label` | `string` | Etiqueta del campo |
| `tooltip` | `string` | Tooltip mostrado sobre la etiqueta externa |
| `placeholder` | `string` | Placeholder del input |
| `required` | `boolean` | Marca el campo como requerido |
| `icon` | `string` | Icono prefijo (nombre Material Icons) |
| `hint` | `string` | Texto de ayuda debajo del campo |
| `errorMessage` | `string` | Mensaje de error personalizado |
| `tabindex` | `number` | Índice de tabulación |
| `hideInternalLabel` | `boolean` | Oculta el label dentro del `mat-form-field` |
| `hideExternalLabel` | `boolean` | Oculta el label externo encima del campo |
| `config` | `IInputWrapperConfig` | Objeto que agrupa todos los inputs anteriores |

---

## InputTextWrapperComponent

### Selector

```html
<input-text-wrapper>
```

### Inputs adicionales

| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `type` | `EInputTextWrapperType` | `TEXT` | Tipo del input HTML |

### `EInputTextWrapperType`

`TEXT` · `EMAIL` · `PASSWORD` · `URL`

---

## InputPasswordWrapperComponent

### Selector

```html
<input-password-wrapper>
```

Campo de contraseña con botón de ojo para alternar visibilidad entre `password` y `text`.

---

## Uso con Reactive Forms

### Con `formControlName`

```html
<ui-form-container [formGroup]="form" (formSubmit)="onSubmit()">
  <input-text-wrapper
    formControlName="email"
    label="Correo electrónico"
    [type]="EInputTextWrapperType.EMAIL"
    icon="email"
    placeholder="tu@email.com"
    [required]="true"
  />

  <input-password-wrapper
    formControlName="password"
    label="Contraseña"
    [required]="true"
  />
</ui-form-container>
```

### Con objeto `config` (recomendado para formularios complejos)

```typescript
public readonly emailConfig: IInputTextWrapperConfig = {
  label: 'Correo electrónico',
  tooltip: 'Introduce tu email corporativo',
  placeholder: 'tu@email.com',
  required: true,
  icon: 'email',
  type: EInputTextWrapperType.EMAIL,
};
```

```html
<input-text-wrapper formControlName="email" [config]="emailConfig" />
```

### Con `FormControl` directo

```html
<input-text-wrapper [formControl]="searchControl" label="Buscar" />
```

---

## `IInputWrapperConfig`

```typescript
interface IInputWrapperConfig {
  label: string;
  tooltip?: string;
  hideInternalLabel?: boolean;  // default: true
  hideExternalLabel?: boolean;  // default: false
  placeholder?: string;
  required?: boolean;
  icon?: string;
  hint?: string;
  errorMessage?: string;
  tabindex?: number;
}

interface IInputTextWrapperConfig extends IInputWrapperConfig {
  type?: EInputTextWrapperType;
}
```
