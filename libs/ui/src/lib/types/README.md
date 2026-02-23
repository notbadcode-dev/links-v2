# UI Types

Tipos compartidos exportados por `@libs/types`.

## Exportaciones

- `TFormGroupType<TValue>`

## Propósito

Mapear interfaces de formulario a `FormControl` tipados para `FormGroup`:

- entrada: `TValue` (shape del form)
- salida: `{ [K in keyof TValue]: FormControl<TValue[K]> }`

## Ubicación

- `libs/ui/src/lib/types/form.types.ts`

## Regla

Si cambias un type exportado, valida impacto en features que usen formularios tipados y actualiza este README.

