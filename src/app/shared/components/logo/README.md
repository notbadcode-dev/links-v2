---
name: LogoComponent
type: component
category: shared
selector: logo-component
description: App logo renderer with variant, letter fill and size controls based on registered SVG icons
inputs:
  - { name: variant, type: ELogoVariant, required: false, default: BOOKMARK_ANIMATED, description: Logo visual variant/icon key }
  - { name: letterFill, type: ELogoLetterFill, required: false, default: TRANSPARENT, description: Fill color for bookmark letter overlay CSS variable }
  - { name: size, type: ESpacing, required: false, default: MD, description: Logo size scale mapped to CSS size token }
outputs: []
enums:
  ELogoVariant: [BOOKMARK, BOOKMARK_ANIMATED, BOOKMARK_S, BOOKMARK_S_MIN, BOOKMARK_ANIMATED_S, BOOKMARK_OUTLINE, BOOKMARK_OUTLINE_S, BOOKMARK_OUTLINE_ANIMATED, BOOKMARK_OUTLINE_ANIMATED_S]
  ELogoLetterFill: [TRANSPARENT, WHITE]
---

# LogoComponent

Componente de logo para renderizar variantes SVG de marca.

## Selector

```html
<logo-component>
```

## Propósito

Encapsula la selección de icono del logo y la configuración visual mediante CSS custom properties:
- `--logo-size`
- `--bookmark-letter-color`

El SVG se renderiza con `icon-wrapper` usando el nombre resuelto desde `LOGO_ICON_BY_VARIANT`.

## API

| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `variant` | `ELogoVariant` | `BOOKMARK_ANIMATED` | Variante del logo a mostrar |
| `letterFill` | `ELogoLetterFill` | `TRANSPARENT` | Color de relleno de la letra del marcador |
| `size` | `ESpacing` | `MD` | Escala de tamaño del logo |

## Uso

```html
<logo-component />

<logo-component
  [variant]="ELogoVariant.BOOKMARK_OUTLINE_ANIMATED"
  [letterFill]="ELogoLetterFill.WHITE"
  [size]="ESpacing.XL"
/>
```

