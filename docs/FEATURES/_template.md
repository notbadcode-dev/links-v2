# <FEATURE_NAME> Feature

## Objetivo

Describe en 2-4 líneas qué problema resuelve esta feature.

## Alcance Y Límites

Incluye:
- Rutas/páginas que pertenecen a la feature.
- Helpers/servicios/estado propio.

No incluye:
- Dependencias de otras features o `core` que no formen parte del dominio.

## Rutas

- Lista de rutas públicas/privadas de la feature.

## Flujo De Datos

1. Evento UI principal.
2. Transformaciones y validaciones.
3. Llamadas a API/helpers.
4. Efectos laterales (session, navegación, notificaciones, etc.).

## Contratos Clave

Entrada:
- Formularios/DTOs de entrada.

Salida:
- DTOs/respuestas usadas por la UI.

## Dependencias

- API (`@api/*`)
- Core (`@app/core/*`)
- UI (`@libs/*`)

## Known Decisions

- Lista breve de decisiones no obvias que afectan cambios futuros.
- Incluir contexto mínimo (por qué existe la decisión).

## Reglas De Cambio Seguro

- Reglas específicas para evitar regresiones.
- Qué no se debe hacer en componentes/páginas.
- Criterios de actualización de traducciones/keys/constantes.
- Si cambia flujo, alcance o contratos de la feature, actualizar este archivo en la misma PR.

## Checklist De PR (<FEATURE_NAME>)

- `npm run check`
- `npm run test:unit`
- Lista de `*.spec.ts` críticas de esta feature.
