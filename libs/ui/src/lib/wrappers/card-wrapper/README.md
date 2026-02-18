---
name: CardWrapperComponent
selector: card-wrapper
type: component
category: wrapper
standalone: true
changeDetection: OnPush
wraps: MatCardModule
extends: null
implements: []
import: "@app/shared/ui"
inputs:
  - name: title
    type: string
    required: false
  - name: subtitle
    type: string
    required: false
  - name: appearance
    type: ECardWrapperAppearance
    required: false
    default: raised
  - name: alignHeader
    type: ECardWrapperAlignHeader
    required: false
    default: start
  - name: customClass
    type: string
    required: false
    default: ""
outputs: []
---

# CardWrapper Component

Componente wrapper que envuelve Angular Material Card con soporte para titulo, subtitulo, apariencia y alineacion del header.

## Uso

### Importar

```typescript
import { CardWrapperComponent } from '@app/shared/ui';
```

### Ejemplo basico

```html
<card-wrapper title="Mi tarjeta">
  <p>Contenido de la tarjeta</p>
</card-wrapper>
```

### Con subtitulo

```html
<card-wrapper
  title="Usuarios"
  subtitle="Listado de usuarios registrados"
>
  <table>...</table>
</card-wrapper>
```

### Variantes de apariencia

```html
<card-wrapper title="Raised" appearance="raised">...</card-wrapper>
<card-wrapper title="Outlined" appearance="outlined">...</card-wrapper>
<card-wrapper title="Filled" appearance="filled">...</card-wrapper>
```

### Header centrado

```html
<card-wrapper
  title="Login"
  subtitle="Ingrese sus credenciales"
  alignHeader="center"
>
  <form>...</form>
</card-wrapper>
```

### Con clase personalizada

```html
<card-wrapper
  title="Dashboard"
  customClass="dashboard-card"
>
  ...
</card-wrapper>
```

## Inputs

| Input         | Tipo                       | Default     | Descripcion                                                   |
| ------------- | -------------------------- | ----------- | ------------------------------------------------------------- |
| `title`       | `string`                   | -           | Titulo de la tarjeta                                          |
| `subtitle`    | `string`                   | -           | Subtitulo de la tarjeta                                       |
| `appearance`  | `ECardWrapperAppearance`   | `'raised'`  | Apariencia: `'raised' \| 'outlined' \| 'filled'`             |
| `alignHeader` | `ECardWrapperAlignHeader`  | `'start'`   | Alineacion del header: `'start' \| 'center' \| 'end'`        |
| `customClass` | `string`                   | `''`        | Clase CSS personalizada para el `mat-card`                    |

## Caracteristicas

- Standalone component
- OnPush change detection
- Integracion con Angular Material Card
- Header condicional (solo se renderiza si hay `title` o `subtitle`)
- Contenido proyectado via `ng-content` dentro de `mat-card-content`
- Soporte para clases CSS personalizadas
