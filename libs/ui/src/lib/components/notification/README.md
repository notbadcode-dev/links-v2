---
name: Notification System
type: system
category: components
description: Complete toast notification system with service, container and toast components
components:
  - name: NotificationService
    type: service
    injectable: root
    signals:
      - { name: notifications, type: "Signal<INotification[]>", description: Reactive list of active notifications (max 5) }
    methods:
      - { name: show, params: INotificationConfig, returns: string, description: Show custom notification }
      - { name: success, params: "message: string, duration?: number", returns: string }
      - { name: error, params: "message: string, duration?: number", returns: string }
      - { name: warning, params: "message: string, duration?: number", returns: string }
      - { name: info, params: "message: string, duration?: number", returns: string }
      - { name: dismiss, params: "id: string", returns: void }
  - name: NotificationContainerComponent
    selector: notification-container
    description: Root container, place once in AppComponent or root layout
  - name: NotificationToastComponent
    selector: notification-toast
    description: Individual toast, used internally by NotificationContainerComponent
interfaces:
  INotificationConfig:
    - { name: message, type: string, required: true }
    - { name: type, type: ENotificationType, required: false, default: INFO }
    - { name: duration, type: number, required: false, default: 5000, note: 0 means permanent }
enums:
  ENotificationType: [SUCCESS, ERROR, WARNING, INFO]
---

# Sistema de Notificaciones

Sistema completo de notificaciones toast compuesto por un servicio, un contenedor y el componente visual del toast.

## Componentes

| Elemento | Descripción |
|---|---|
| `NotificationService` | Servicio singleton que gestiona el estado de las notificaciones |
| `NotificationContainerComponent` | Contenedor que renderiza los toasts activos |
| `NotificationToastComponent` | Toast individual con icono, mensaje y botón de cierre |

---

## NotificationService

### Propósito

Gestiona la cola de notificaciones activas (máximo 5 visibles). Genera IDs únicos, inicia timers de auto-dismiss y expone las notificaciones como `Signal` reactivo.

### API

```typescript
inject(NotificationService)
```

| Método | Parámetros | Retorna | Descripción |
|---|---|---|---|
| `show(config)` | `INotificationConfig` | `string` (id) | Muestra una notificación personalizada |
| `success(message, duration?)` | `string, number?` | `string` (id) | Notificación de éxito |
| `error(message, duration?)` | `string, number?` | `string` (id) | Notificación de error |
| `warning(message, duration?)` | `string, number?` | `string` (id) | Notificación de advertencia |
| `info(message, duration?)` | `string, number?` | `string` (id) | Notificación informativa |
| `dismiss(id)` | `string` | `void` | Descarta una notificación por su ID |

| Propiedad | Tipo | Descripción |
|---|---|---|
| `notifications` | `Signal<INotification[]>` | Lista reactiva de notificaciones visibles (máx. 5) |

### `INotificationConfig`

```typescript
interface INotificationConfig {
  message: string;
  type?: ENotificationType;  // default: INFO
  duration?: number;          // default: 5000ms (0 = permanente)
}
```

### `ENotificationType`

`SUCCESS` · `ERROR` · `WARNING` · `INFO`

---

## NotificationContainerComponent

### Selector

```html
<notification-container>
```

### Propósito

Se coloca una sola vez en el `AppComponent` o en el layout raíz. Escucha el `NotificationService` y renderiza los toasts activos.

```html
<!-- app.component.html -->
<router-outlet />
<notification-container />
```

---

## NotificationToastComponent

### Selector

```html
<notification-toast>
```

Usado internamente por `NotificationContainerComponent`. No se instancia directamente.

---

## Ejemplo de uso

```typescript
// En cualquier componente o servicio
private readonly _notifications = inject(NotificationService);

onSave(): void {
  this._notifications.success('Cambios guardados correctamente');
}

onError(): void {
  this._notifications.error('Error al guardar. Inténtalo de nuevo.', 8000);
}

onCustom(): void {
  this._notifications.show({
    message: 'Operación en progreso...',
    type: ENotificationType.INFO,
    duration: 0, // No auto-dismiss
  });
}
```
