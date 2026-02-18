---
name: TreeWrapperComponent
type: wrapper
category: wrappers
selector: tree-wrapper
description: Material Design hierarchical tree with typed generic nodes, icons and selection events
extends: BaseDirective
generic: "TNode = unknown"
inputs:
  - { name: dataSource, type: "ITreeNode<TNode>[]", required: true, description: Root nodes array }
  - { name: config, type: "ITreeWrapperConfig | undefined", required: false, description: Tree appearance configuration }
outputs:
  - { name: nodeSelected, type: "ITreeNode<TNode>", description: Emitted when user clicks a node }
  - { name: nodeToggle, type: "{ node: ITreeNode<TNode>, expanded: boolean }", description: Emitted when a branch node expands or collapses }
interfaces:
  ITreeNode:
    generic: "TNode = unknown"
    fields:
      - { name: id, type: "string | number", required: true }
      - { name: label, type: string, required: true }
      - { name: icon, type: string, required: false, description: Material Icons name }
      - { name: data, type: TNode, required: false, description: Domain data attached to the node }
      - { name: children, type: "ITreeNode<TNode>[]", required: false, description: Child nodes (omit for leaf nodes) }
  ITreeWrapperConfig:
    - { name: expandedIcon, type: string, required: false, default: expand_more }
    - { name: collapsedIcon, type: string, required: false, default: chevron_right }
    - { name: customClass, type: string, required: false }
---

# TreeWrapperComponent

Árbol jerárquico de Material Design con soporte para nodos anidados, iconos y selección.

## Selector

```html
<tree-wrapper>
```

## Propósito

Encapsula `MatTree` con una interfaz tipada genérica (`ITreeNode<TNode>`). Gestiona automáticamente los nodos hoja vs nodos con hijos, y expone eventos de selección y toggle de expansión.

## API

| Input | Tipo | Requerido | Descripción |
|---|---|---|---|
| `dataSource` | `ITreeNode<TNode>[]` | ✅ | Array de nodos raíz del árbol |
| `config` | `ITreeWrapperConfig` | ❌ | Configuración opcional del árbol |

| Output | Tipo | Descripción |
|---|---|---|
| `nodeSelected` | `ITreeNode<TNode>` | Emite el nodo al hacer click sobre él |
| `nodeToggle` | `{ node, expanded }` | Emite cuando un nodo se expande o colapsa |

### `ITreeNode<TNode>`

```typescript
interface ITreeNode<TNode = unknown> {
  id: string | number;
  label: string;
  icon?: string;       // Nombre de icono Material
  data?: TNode;        // Datos del dominio asociados al nodo
  children?: ITreeNode<TNode>[];
}
```

### `ITreeWrapperConfig`

```typescript
interface ITreeWrapperConfig {
  expandedIcon?: string;   // default: 'expand_more'
  collapsedIcon?: string;  // default: 'chevron_right'
  customClass?: string;
}
```

## Uso

```typescript
public readonly categories: ITreeNode<ICategory>[] = [
  {
    id: 1,
    label: 'Desarrollo',
    icon: 'code',
    children: [
      { id: 2, label: 'Angular', icon: 'code', data: angularCategory },
      { id: 3, label: 'TypeScript', icon: 'code', data: tsCategory },
    ],
  },
  {
    id: 4,
    label: 'Diseño',
    icon: 'palette',
    children: [
      { id: 5, label: 'Figma', data: figmaCategory },
    ],
  },
];
```

```html
<tree-wrapper
  [dataSource]="categories"
  (nodeSelected)="onCategorySelect($event)"
/>
```

### Con config personalizada

```html
<tree-wrapper
  [dataSource]="categories"
  [config]="{ expandedIcon: 'folder_open', collapsedIcon: 'folder' }"
  (nodeSelected)="onSelect($event)"
/>
```
