---
name: IconWrapperComponent
type: wrapper
category: wrappers
selector: icon-wrapper
description: Standalone Material Icons wrapper to avoid importing MatIconModule in every consumer
inputs:
  - { name: icon, type: string, required: true, description: Material Icons ligature name }
---

# IconWrapperComponent

Icono de Material Icons como componente standalone.

## Selector

```html
<icon-wrapper>
```

## Propósito

Encapsula `MatIcon` para usar iconos de Material Design sin importar directamente `MatIconModule` en cada componente que los necesite.

## API

| Input | Tipo | Requerido | Descripción |
|---|---|---|---|
| `icon` | `string` | ✅ | Nombre del icono de Material Icons |

## Uso

```html
<icon-wrapper icon="person" />
<icon-wrapper icon="settings" />
<icon-wrapper icon="logout" />
```

Los nombres de icono disponibles están en [Material Symbols](https://fonts.google.com/icons). En el proyecto, usa las constantes de `ICONS_CONSTANTS` para evitar strings sueltos:

```typescript
import { ICONS_CONSTANTS } from '@app/constants/icons.constants';
```

```html
<icon-wrapper [icon]="ICONS_CONSTANTS.AUTH.USER" />
```
