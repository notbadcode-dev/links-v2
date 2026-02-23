# UI Utils

Utilidades compartidas exportadas por `@libs/utils`.

## Exportaciones

- `createSchema<TValue>(schema)`
- `createKeys<TValue>(schema)`

## Propósito

- `createSchema`: devuelve `keys` tipadas + `schema` original.
- `createKeys`: genera un record `key -> key` tipado para evitar strings sueltos en formularios/constantes.

## Ubicación

- `libs/ui/src/lib/utils/object.utils.ts`

## Regla

Mantener estas utilidades puras y sin side effects. Si cambia firma o retorno, actualizar este README y usos en features.

