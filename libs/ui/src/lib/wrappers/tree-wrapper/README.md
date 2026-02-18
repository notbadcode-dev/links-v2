---
name: TreeWrapperComponent
selector: tree-wrapper
type: component
category: wrapper
standalone: true
changeDetection: OnPush
wraps: MatTreeModule
extends: null
implements: []
import: "@app/shared/ui"
generic: "T = any"
inputs:
  - name: dataSource
    type: ITreeNode<T>[]
    required: true
  - name: config
    type: ITreeWrapperConfig
    required: false
outputs:
  - name: nodeSelected
    type: ITreeNode<T>
  - name: nodeToggle
    type: "{ node: ITreeNode<T>, expanded: boolean }"
---

# TreeWrapper Component

Componente wrapper que envuelve Angular Material Tree para renderizar estructuras jerarquicas con nodos expandibles, iconos y seleccion de nodos.

## Uso

### Importar

```typescript
import { TreeWrapperComponent } from '@app/shared/ui';
```

### Ejemplo basico

```typescript
@Component({
  standalone: true,
  imports: [TreeWrapperComponent],
  template: `
    <tree-wrapper
      [dataSource]="treeData"
      (nodeSelected)="onNodeSelected($event)"
    />
  `,
})
export class MyComponent {
  treeData: ITreeNode[] = [
    {
      id: 1,
      label: 'Carpeta 1',
      icon: 'folder',
      children: [
        { id: 2, label: 'Archivo 1', icon: 'description' },
        { id: 3, label: 'Archivo 2', icon: 'description' },
      ],
    },
    {
      id: 4,
      label: 'Carpeta 2',
      icon: 'folder',
      children: [],
    },
  ];

  onNodeSelected(node: ITreeNode): void {
    console.log('Nodo seleccionado:', node);
  }
}
```

### Con configuracion personalizada

```html
<tree-wrapper
  [dataSource]="treeData"
  [config]="{
    expandedIcon: 'folder_open',
    collapsedIcon: 'folder',
    customClass: 'my-tree'
  }"
  (nodeSelected)="onNodeSelected($event)"
  (nodeToggle)="onNodeToggle($event)"
/>
```

### Con datos tipados

```typescript
interface IProject {
  name: string;
  status: string;
}

treeData: ITreeNode<IProject>[] = [
  {
    id: 1,
    label: 'Proyecto A',
    data: { name: 'Proyecto A', status: 'active' },
    children: [...],
  },
];
```

## Inputs

| Input        | Tipo                  | Default                          | Descripcion                                 |
| ------------ | --------------------- | -------------------------------- | ------------------------------------------- |
| `dataSource` | `ITreeNode<T>[]`      | -                                | **Requerido**. Datos del arbol              |
| `config`     | `ITreeWrapperConfig`  | -                                | Configuracion del arbol                     |

## Outputs

| Output         | Tipo                                          | Descripcion                            |
| -------------- | --------------------------------------------- | -------------------------------------- |
| `nodeSelected` | `ITreeNode<T>`                                | Emite cuando se hace click en un nodo  |
| `nodeToggle`   | `{ node: ITreeNode<T>; expanded: boolean }`   | Emite cuando se expande/colapsa un nodo|

## Interfaces

### ITreeNode\<T\>

```typescript
interface ITreeNode<T = any> {
  id: string | number;
  label: string;
  icon?: string;
  data?: T;
  children?: ITreeNode<T>[];
}
```

### ITreeWrapperConfig

```typescript
interface ITreeWrapperConfig {
  childrenField?: string;
  showLines?: boolean;
  expandedIcon?: string;
  collapsedIcon?: string;
  customClass?: string;
}
```

## Caracteristicas

- Standalone component
- OnPush change detection
- Integracion con Angular Material Tree
- Soporte generico `TreeWrapperComponent<T>` para datos tipados
- Iconos configurables para estados expandido/colapsado
- Soporte para iconos por nodo
- Nodos hoja y nodos rama con estilos diferenciados
- Clase CSS personalizable via `config.customClass`
