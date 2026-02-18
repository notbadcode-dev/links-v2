---
name: BaseDirective
type: directive
category: directives
abstract: true
selector: null
description: Abstract base class providing DestroyRef and component name to all UI elements
provides:
  - { name: _destroyRef, type: DestroyRef, access: protected }
  - { name: _componentName, type: string, access: protected }
---

# BaseDirective

Clase base abstracta que deben extender todos los componentes y directivas de la librería.

## Propósito

Provee infraestructura común a todos los elementos de la UI:
- `_destroyRef` — referencia al ciclo de destrucción del componente, para limpiar suscripciones con `takeUntilDestroyed`.
- `_componentName` — nombre de la clase en runtime, útil para debugging.

## Uso

```typescript
import { BaseDirective } from '@libs/ui';

@Component({ ... })
export class MiComponente extends BaseDirective {
  // _destroyRef y _componentName disponibles automáticamente
}
```

## API

| Propiedad | Tipo | Descripción |
|---|---|---|
| `_destroyRef` | `DestroyRef` | Referencia de destrucción inyectada |
| `_componentName` | `string` | Nombre de la clase del componente |
