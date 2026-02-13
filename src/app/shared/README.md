# Shared Module

Contiene código reutilizable en toda la aplicación.

## Estructura

```
shared/
├── ui/              # Componentes UI reutilizables (design system)
│   ├── button/      # Componente button (wrapper de Material)
│   ├── input/       # Componente input (wrapper de Material)
│   └── index.ts     # Public API para exports
├── layout/          # Componentes de layout (header, footer, sidebar)
├── directives/      # Directivas compartidas
├── pipes/           # Pipes personalizados
├── utils/           # Funciones utilitarias
└── models/          # Interfaces y tipos compartidos
```

## Uso

### Importar componentes UI

```typescript
import { ButtonComponent, InputComponent } from '@app/shared/ui';
```

### Estructura de un componente UI

Cada componente debe seguir esta estructura:

```
button/
├── button.component.ts
├── button.component.html
├── button.component.scss
├── button.component.spec.ts
└── index.ts           # Export público
```

## Convenciones

- **UI Components**: Encapsulan componentes de Material Angular con estilos propios
- **Layout Components**: Componentes estructurales de la aplicación
- **Directives**: Comportamientos reutilizables (ej: clickOutside, autoFocus)
- **Pipes**: Transformaciones de datos (ej: formatDate, truncate)
- **Utils**: Funciones puras sin estado
- **Models**: Tipos e interfaces NO generadas por la API
