# Button Component

Componente wrapper de button que envuelve Material Angular Button con características adicionales.

## Características

✅ **Obligatorios:**
- `title` - Texto del botón (obligatorio)

✅ **Opcionales:**
- `tooltip` - Tooltip personalizado (si no se proporciona, usa `title`)
- `icon` - Ícono de Material Icons
- `disabled` - Deshabilitar botón (default: `false`)
- `loading` - Estado de carga con spinner (default: `false`)
- `variant` - Estilo del botón: `'basic' | 'raised' | 'stroked' | 'flat' | 'icon'` (default: `'raised'`)
- `color` - Color: `'primary' | 'accent' | 'warn'` (default: `'primary'`)
- `type` - Tipo HTML: `'button' | 'submit' | 'reset'` (default: `'button'`)
- `size` - Tamaño: `'small' | 'medium' | 'large'` (default: `'medium'`)
- `fullWidth` - Botón ancho completo (default: `false`)
- `iconPosition` - Posición del ícono: `'left' | 'right'` (default: `'left'`)

✅ **Eventos:**
- `clicked` - Emite cuando se hace click (con protección anti-double-click)

## Uso

### Importar

```typescript
import { ButtonComponent } from '@app/shared/ui';
```

### Ejemplo básico

```html
<button-wrapper
  title="Guardar"
  (clicked)="onSave($event)"
/>
```

### Con ícono

```html
<button-wrapper
  title="Eliminar"
  icon="delete"
  color="warn"
  (clicked)="onDelete($event)"
/>
```

### Con tooltip personalizado

```html
<button-wrapper
  title="Editar"
  tooltip="Editar este registro"
  icon="edit"
  (clicked)="onEdit($event)"
/>
```

### Estado de carga

```html
<button-wrapper
  title="Guardar"
  [loading]="isSaving"
  icon="save"
  (clicked)="onSave($event)"
/>
```

### Deshabilitado

```html
<button-wrapper
  title="Enviar"
  [disabled]="!form.valid"
  (clicked)="onSubmit($event)"
/>
```

### Variantes de estilo

```html
<!-- Raised (default) -->
<button-wrapper title="Raised" variant="raised" />

<!-- Flat -->
<button-wrapper title="Flat" variant="flat" />

<!-- Stroked -->
<button-wrapper title="Stroked" variant="stroked" />

<!-- Basic -->
<button-wrapper title="Basic" variant="basic" />

<!-- Icon only -->
<button-wrapper title="Ícono" variant="icon" icon="home" />
```

### Tamaños

```html
<button-wrapper title="Pequeño" size="small" />
<button-wrapper title="Mediano" size="medium" />
<button-wrapper title="Grande" size="large" />
```

### Ancho completo

```html
<button-wrapper
  title="Botón ancho completo"
  [fullWidth]="true"
/>
```

### Ícono a la derecha

```html
<button-wrapper
  title="Siguiente"
  icon="arrow_forward"
  iconPosition="right"
  (clicked)="onNext($event)"
/>
```

### En formularios

```html
<form (ngSubmit)="onSubmit()">
  <button-wrapper
    title="Enviar"
    type="submit"
    icon="send"
    [disabled]="!form.valid"
    [loading]="isSubmitting"
  />
</form>
```

## Protección Anti-Double-Click

El componente incluye protección automática contra double-click con un debounce de 300ms. Esto significa que después de hacer click, el botón ignorará clicks adicionales durante 300ms.

```typescript
handleClick() {
  // Este método se ejecutará solo una vez, incluso si el usuario hace click múltiples veces
  this.service.save().subscribe(...);
}
```

## Ejemplos avanzados

### Botón con estado de carga

```typescript
@Component({
  template: `
    <button-wrapper
      title="Guardar cambios"
      icon="save"
      [loading]="isSaving"
      [disabled]="!hasChanges"
      (clicked)="saveChanges()"
    />
  `
})
export class MyComponent {
  isSaving = false;
  hasChanges = true;

  saveChanges() {
    this.isSaving = true;
    this.service.save().subscribe({
      next: () => this.isSaving = false,
      error: () => this.isSaving = false
    });
  }
}
```

### Botón de confirmación

```typescript
@Component({
  template: `
    <button-wrapper
      title="Eliminar"
      icon="delete"
      color="warn"
      tooltip="Esta acción no se puede deshacer"
      (clicked)="confirmDelete()"
    />
  `
})
export class MyComponent {
  confirmDelete() {
    if (confirm('¿Estás seguro?')) {
      this.service.delete().subscribe();
    }
  }
}
```
