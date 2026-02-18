---
name: ViewportCenterComponent
selector: viewport-center
type: component
category: component
standalone: true
changeDetection: OnPush
wraps: null
extends: null
implements: []
import: '@app/shared/ui'
inputs: []
outputs: []
---

# ViewportCenter Component

Componente de layout que centra su contenido vertical y horizontalmente ocupando el 100% del viewport.

## Uso

### Importar

```typescript
import { ViewportCenterComponent } from '@app/shared/ui';
```

### Ejemplo basico

```html
<viewport-center>
  <h1>Contenido centrado</h1>
</viewport-center>
```

### Con formulario

```html
<viewport-center>
  <card-wrapper title="Login">
    <form [formGroup]="loginForm">...</form>
  </card-wrapper>
</viewport-center>
```

## Inputs

Este componente no tiene inputs. Renderiza el contenido proyectado (`ng-content`) centrado en el viewport.

## Caracteristicas

- Standalone component
- OnPush change detection
- Centra contenido con flexbox (`justify-content: center`, `align-items: center`)
- Ocupa el 100% del viewport (`min-height: 100vh`)
- Padding de `1rem` para evitar que el contenido toque los bordes
