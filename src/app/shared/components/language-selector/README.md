---
name: LanguageSelectorComponent
type: component
category: shared
selector: language-selector
description: Global language picker dropdown connected to I18nService available languages
inputs: []
outputs: []
dependencies:
  - { name: I18nService, description: Provides current language, available languages and translation helpers }
  - { name: IconWrapperComponent, description: Renders translate icon in trigger }
---

# LanguageSelectorComponent

Selector de idioma global para cambiar el lenguaje activo de la app.

## Selector

```html
<language-selector>
```

## Propósito

Muestra el idioma actual y un menú desplegable con los idiomas disponibles de `I18nService`.  
Al seleccionar una opción, llama `setLanguage(langCode)` y cierra el menú.

## API

No expone `@Input()` ni `@Output()` públicos.

Comportamiento relevante:
- Cierra menú al click fuera del componente (`document:click`).
- Cierra menú con tecla `Escape` (`document:keydown.escape`).
- Traduce nombres de idioma con la key `language.names.<code>`.

## Uso

```html
<language-selector />
```

