---
name: DropdownWrapperComponent
selector: dropdown-wrapper
type: component
category: wrapper
standalone: true
changeDetection: OnPush
wraps: MatMenuModule
extends: BaseDirective
implements: []
import: '@libs/ui'
inputs:
  - name: trigger
    type: EDropdownWrapperTrigger
    required: false
    default: click
  - name: position
    type: EDropdownWrapperPosition
    required: false
    default: below
  - name: disabled
    type: boolean
    required: false
    default: false
  - name: customClass
    type: string
    required: false
    default: ''
outputs:
  - name: itemSelected
    type: any
---

# DropdownWrapper Component

Componente wrapper que envuelve Angular Material Menu para proporcionar funcionalidad de dropdown con slots para contenido personalizable.

## Uso

### Importar

```typescript
import { DropdownWrapperComponent } from '@libs/ui';
```

### Ejemplo básico

```html
<dropdown-wrapper>
  <ng-container slot="trigger"> Click me </ng-container>

  <ng-container slot="content">
    <button class="dropdown-item">Option 1</button>
    <button class="dropdown-item">Option 2</button>
  </ng-container>
</dropdown-wrapper>
```

### Con icono en el trigger

```html
<dropdown-wrapper>
  <ng-container slot="trigger">
    <icon-wrapper icon="settings" />
    Settings
  </ng-container>

  <ng-container slot="content">
    <button class="dropdown-item">Preferences</button>
    <button class="dropdown-item">Profile</button>
  </ng-container>
</dropdown-wrapper>
```

### Configuración avanzada

```html
<dropdown-wrapper
  [trigger]="EDropdownWrapperTrigger.CLICK"
  [position]="EDropdownWrapperPosition.ABOVE"
  [disabled]="false"
  customClass="custom-dropdown"
  (itemSelected)="onItemSelected($event)"
>
  <ng-container slot="trigger"> Custom Trigger </ng-container>

  <ng-container slot="content">
    <!-- Content -->
  </ng-container>
</dropdown-wrapper>
```

## Slots

| Slot      | Descripción                                      |
| --------- | ------------------------------------------------ |
| `trigger` | Contenido que actúa como disparador del dropdown |
| `content` | Contenido del menú dropdown                      |

## Inputs

| Input         | Tipo                       | Default   | Descripción                                        |
| ------------- | -------------------------- | --------- | -------------------------------------------------- |
| `trigger`     | `EDropdownWrapperTrigger`  | `'click'` | Cómo se activa el dropdown: `'click' \| 'hover'`   |
| `position`    | `EDropdownWrapperPosition` | `'below'` | Posición relativa al trigger: `'below' \| 'above'` |
| `disabled`    | `boolean`                  | `false`   | Si el dropdown está deshabilitado                  |
| `customClass` | `string`                   | `''`      | Clase CSS personalizada para el botón trigger      |

## Outputs

| Output         | Tipo  | Descripción                                                   |
| -------------- | ----- | ------------------------------------------------------------- |
| `itemSelected` | `any` | Emite cuando se selecciona un elemento (usar en el contenido) |

## Estilos CSS

```scss
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.dropdown-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.dropdown-item.active {
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.08);
}
```

## Características

- Standalone component
- OnPush change detection
- Integración con Angular Material Menu
- Slots personalizables para trigger y content
- Soporte para diferentes posiciones
- Eventos de selección
- Clases CSS personalizables
