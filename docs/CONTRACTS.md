# CONTRACTS

Define contratos de integración entre frontend y backend, y el formato esperado de éxito/error.

Para decisiones de seguridad (tokens, sesión, refresh, logout), ver [`SECURITY.md`](SECURITY.md).

## Fuente De Verdad

- Contratos HTTP generados en `src/api/**` por `ng-openapi-gen`.
- No editar archivos generados manualmente.
- Si cambia un endpoint o DTO backend: regenerar con `npm run api:generate`.

## Flujo Operativo De API Generada

Cuando cambie el contrato backend:

1. Actualizar spec backend/OpenAPI.
2. Ejecutar `npm run api:generate`.
3. Verificar cambios en `src/api/**` (archivos generados).
4. Ajustar adaptadores/consumidores de app (`helpers`, `interceptors`, `features`) según nuevos DTOs.
5. Ejecutar al menos `npm run check` y `npm run test:unit`.

Regla:
- Nunca parchear manualmente `src/api/**`; el ajuste correcto es regenerar.

## Envelope De Respuesta (Patrón Actual)

Patrón observado en modelos generados:

- `success: boolean`
- `data: <DTO principal>`
- `messageList?: ApiResponseMessageModel[]`
- `code?: string`

Ejemplo de modelo: `ApiResponseWrapper` en `src/api/auth/models/api-response-wrapper.ts`.

## Mensajes De API

`ApiResponseMessageModel`:
- `message: string`
- `type: EApiResponseMessageType`

Tipos soportados actualmente:
- `info`
- `success`
- `warning`
- `error`
- `critical`

## Contrato De Error Normalizado En Frontend

Los errores HTTP se mapean en `core/interceptors` al tipo:

```ts
interface IApiFailureResponse {
  success: false;
  data: null;
  messageList: ApiResponseMessageModel[];
  code?: string;
}
```

Reglas de normalización:
- Si `messageList` no existe o es inválido, se usa mensaje por defecto.
- Si existe `message` string o array de strings, se transforma a `messageList`.
- Si `type` de mensaje no es soportado, se convierte a `error`.

## DTOs Principales (Estado Actual)

Auth:
- `LoginRequest { email, password }`
- `RegisterRequest { email, password }`
- `LoginResponse { accessToken, refreshToken }`
- `RefreshRequest`

Links:
- `CreateLinkRequest`, `UpdateLinkRequest`
- `CreateGroupLinkRequest`, `UpdateGroupLinkRequest`
- `LinkBasicResponse`, `GroupLinkBasicResponse`
- `PaginatedResponseForModel`

## Reglas Para Nuevos Contratos

- Mantener naming consistente con OpenAPI + convención del repo.
- Evitar DTOs ambiguos; separar request/response.
- Si una respuesta puede fallar parcialmente, usar DTO explícito (ej. `SuccessFailureResponse`).
- Documentar cambios de contrato en PR y regenerar cliente antes de merge.

## Puntos De Integración En La App

- Configuración de base URLs API:
  - `src/app/app.config.ts` via `provideApiConfiguration` (`@api/auth`, `@api/links`).
- Manejo transversal de errores:
  - `src/app/core/interceptors/api-error-mapper.interceptor.ts`
  - `src/app/core/interceptors/helpers/api-error-mapper.helper.ts`
- Consumo de contratos en feature auth:
  - `src/app/features/auth/helpers/auth-http.helper.ts`
