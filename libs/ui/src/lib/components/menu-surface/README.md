---
name: MenuSurfaceComponent
type: component
category: components
selector: ui-menu-surface
description: Reusable menu surface with unified style for list and grid selectors
inputs:
  - {
      name: layout,
      type: EMenuSurfaceLayout,
      required: false,
      default: 'EMenuSurfaceLayout.LIST',
      description: Menu layout mode,
    }
  - {
      name: columns,
      type: number,
      required: false,
      default: 1,
      description: Number of columns when layout is grid,
    }
related:
  - {
      directive: uiMenuOption,
      description: Marks projected options and supports active visual state,
    }
---

# MenuSurfaceComponent

Base reutilizable para menus de seleccion con estilo unificado (lista o grid).

## Selector

```html
<ui-menu-surface></ui-menu-surface>
```

## Uso

```html
<ui-menu-surface [layout]="EMenuSurfaceLayout.LIST">
  <button uiMenuOption [uiMenuOptionActive]="true">English</button>
  <button uiMenuOption>Spanish</button>
</ui-menu-surface>
```

```html
<ui-menu-surface [layout]="EMenuSurfaceLayout.GRID" [columns]="5">
  <button-wrapper uiMenuOption [uiMenuOptionActive]="selected === icon" [svgIcon]="icon" />
</ui-menu-surface>
```
