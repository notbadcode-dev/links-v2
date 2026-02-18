---
name: CheckboxWrapperComponent
type: wrapper
category: wrappers
selector: checkbox-wrapper
description: Material Design checkbox integrated with Angular Reactive Forms via ControlValueAccessor
extends: "InputWrapperDirective<boolean>"
implements: ControlValueAccessor
integrations:
  - { token: DISABLE_ON_LOADING, optional: true, description: Auto-disables during loading state }
value_type: boolean
inherits_inputs_from: InputWrapperDirective
key_inputs:
  - { name: label, type: "string | undefined", description: Checkbox label text }
  - { name: required, type: "boolean | undefined", description: Marks field as required }
  - { name: config, type: IInputWrapperConfig, description: Config object alternative to individual inputs }
---

# CheckboxWrapperComponent

Checkbox de Material Design integrado con Angular Reactive Forms.

## Selector

```html
<checkbox-wrapper>
```

## Propósito

Encapsula `MatCheckbox` implementando `ControlValueAccessor`. Hereda toda la API de `InputWrapperDirective`, incluyendo soporte para deshabilitar con `DISABLE_ON_LOADING`.

## API

Hereda todos los inputs de [`InputWrapperDirective`](../input-wrapper/README.md).

Los más relevantes:

| Input | Tipo | Descripción |
|---|---|---|
| `label` | `string` | Texto visible junto al checkbox |
| `required` | `boolean` | Marca el campo como requerido |
| `config` | `IInputWrapperConfig` | Alternativa al paso individual de inputs |

## Uso

### Con `FormControl` directo

```html
<checkbox-wrapper
  label="Recuérdame"
  [formControl]="rememberMeControl"
/>
```

### Con `formControlName`

```html
<ui-form-container [formGroup]="form" (formSubmit)="onSubmit()">
  <checkbox-wrapper
    label="Acepto los términos y condiciones"
    formControlName="acceptTerms"
    [required]="true"
  />
</ui-form-container>
```

### Con config object

```typescript
public readonly termsConfig: IInputWrapperConfig = {
  label: 'Acepto los términos',
  required: true,
};
```

```html
<checkbox-wrapper formControlName="terms" [config]="termsConfig" />
```
