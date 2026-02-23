---
name: ThemeToggleComponent
type: component
category: shared
selector: theme-toggle
description: Global light/dark theme toggle button connected to ThemeService with translated accessible label
inputs: []
outputs: []
dependencies:
  - { name: ThemeService, description: Toggles and reads current dark/light state }
  - { name: I18nService, description: Resolves translated aria-label/title strings }
  - { name: IconWrapperComponent, description: Renders theme toggle SVG icon }
---

# ThemeToggleComponent

Botón global para alternar entre tema claro y oscuro.

## Selector

```html
<theme-toggle>
```

## Propósito

Expone un control único de UI que:
- alterna el tema con `ThemeService.toggleTheme()`;
- aplica clases visuales por estado (`light-active` / `dark-active`);
- mantiene accesibilidad con `aria-label` y `title` traducidos.

## API

No expone `@Input()` ni `@Output()` públicos.

Métodos públicos usados por template:
- `toggleTheme()`
- `isLightThemeActive()`
- `isDarkThemeActive()`
- `getToggleLabel()`

## Uso

```html
<theme-toggle />
```

