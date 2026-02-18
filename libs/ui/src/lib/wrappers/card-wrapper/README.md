---
name: CardWrapperComponent
type: wrapper
category: wrappers
selector: card-wrapper
description: Material Design card with optional header, appearance variants and content projection
extends: BaseDirective
inputs:
  - { name: title, type: "string | undefined", required: false, description: Card header title }
  - { name: subtitle, type: "string | undefined", required: false, description: Card header subtitle }
  - { name: appearance, type: ECardWrapperAppearance, required: false, default: RAISED, description: Visual card style }
  - { name: alignHeader, type: ECardWrapperAlignHeader, required: false, default: START, description: Header content alignment }
  - { name: customClass, type: string, required: false, default: "''" , description: Additional CSS class on mat-card }
slots:
  - { name: default, description: Card body content projected into mat-card-content }
enums:
  ECardWrapperAppearance: [RAISED, OUTLINED, FILLED]
  ECardWrapperAlignHeader: [START, CENTER, END]
---

# CardWrapperComponent

Tarjeta de Material Design con header opcional y variantes de apariencia.

## Selector

```html
<card-wrapper>
```

## Propósito

Encapsula `MatCard` con title, subtitle y alineación de header configurables. El contenido se proyecta dentro de `mat-card-content`.

## API

| Input | Tipo | Requerido | Default | Descripción |
|---|---|---|---|---|
| `title` | `string` | ❌ | — | Título de la tarjeta |
| `subtitle` | `string` | ❌ | — | Subtítulo debajo del título |
| `appearance` | `ECardWrapperAppearance` | ❌ | `RAISED` | Estilo visual de la tarjeta |
| `alignHeader` | `ECardWrapperAlignHeader` | ❌ | `START` | Alineación del header |
| `customClass` | `string` | ❌ | `''` | Clase CSS adicional para `mat-card` |

### `ECardWrapperAppearance`

| Valor | Descripción |
|---|---|
| `RAISED` | Con sombra elevada (por defecto) |
| `OUTLINED` | Con borde, sin sombra |
| `FILLED` | Con fondo relleno |

### `ECardWrapperAlignHeader`

`START` · `CENTER` · `END`

## Uso

```html
<!-- Tarjeta con header centrado -->
<card-wrapper
  title="Iniciar sesión"
  subtitle="Accede a tu cuenta"
  [alignHeader]="ECardWrapperAlignHeader.CENTER"
>
  <ui-form-container [formGroup]="form" (formSubmit)="onSubmit()">
    <input-text-wrapper [config]="emailConfig" />
    <button-wrapper title="Entrar" [fullWidth]="true" />
  </ui-form-container>
</card-wrapper>

<!-- Tarjeta outlined sin header -->
<card-wrapper [appearance]="ECardWrapperAppearance.OUTLINED">
  <p>Contenido libre</p>
</card-wrapper>
```
