---
name: PaginationComponent
type: component
category: components
selector: ui-pagination
description: Pagination component with 3-page window, boundary/step navigation and optional scroll mode
extends: BaseDirective
inputs:
  - { name: totalPages, type: number, required: true, description: Total number of available pages }
  - { name: currentPage, type: number, required: true, description: Current active page (controlled input) }
  - { name: config, type: "IPaginationConfig | undefined", required: false, description: Visual and behavior config object }
outputs:
  - { name: pageChange, type: number, description: Emitted with next selected page number }
interfaces:
  IPaginationConfig:
    - { name: showBoundaryButtons, type: boolean, required: false, default: true, description: Shows first/last buttons (double arrows) }
    - { name: showStepButtons, type: boolean, required: false, default: true, description: Shows previous/next buttons (single arrows) }
    - { name: scrollMode, type: boolean, required: false, default: false, description: Enables horizontal scroll behavior for page chips container }
    - { name: hideNavigationButtonsInScroll, type: boolean, required: false, default: true, description: Hides arrow buttons when scroll mode is enabled }
    - { name: ariaLabel, type: string, required: false, default: Pagination, description: Accessible label for nav element }
    - { name: customClass, type: string, required: false, default: "''", description: Extra CSS class for host root }
---

# PaginationComponent

Paginación custom con ventana de 3 páginas y navegación con flechas simples/dobles.

## Selector

```html
<ui-pagination>
```

## Comportamiento

- Muestra siempre 3 páginas visibles cuando `totalPages >= 3`.
- Si estás en primera página: muestra `1, 2, 3` y resalta `1`.
- Si estás en última página: muestra `n-2, n-1, n` y resalta `n`.
- Si estás en página intermedia: muestra `actual-1, actual, actual+1`.
- Flechas dobles: ir a primera/última.
- Flechas simples: ir a anterior/siguiente.
- En primera página se deshabilitan primera/anterior.
- En última página se deshabilitan siguiente/última.

## API

| Input | Tipo | Requerido | Descripción |
|---|---|---|---|
| `totalPages` | `number` | ✅ | Cantidad total de páginas |
| `currentPage` | `number` | ✅ | Página activa actual (controlada por input) |
| `config` | `IPaginationConfig` | ❌ | Configuración opcional de UI/comportamiento |

| Output | Tipo | Descripción |
|---|---|---|
| `pageChange` | `number` | Emite la siguiente página seleccionada |

### `IPaginationConfig`

```typescript
interface IPaginationConfig {
  showBoundaryButtons?: boolean; // default: true
  showStepButtons?: boolean; // default: true
  scrollMode?: boolean; // default: false
  hideNavigationButtonsInScroll?: boolean; // default: true
  ariaLabel?: string; // default: 'Pagination'
  customClass?: string; // default: ''
}
```

## Uso

```html
<ui-pagination
  [totalPages]="pagination.totalPages"
  [currentPage]="pagination.currentPage"
  (pageChange)="onPageChange($event)"
/>
```

### Con modo scroll (sin botones)

```html
<ui-pagination
  [totalPages]="pagination.totalPages"
  [currentPage]="pagination.currentPage"
  [config]="{
    scrollMode: true,
    hideNavigationButtonsInScroll: true,
    ariaLabel: 'Links pagination'
  }"
  (pageChange)="onPageChange($event)"
/>
```
