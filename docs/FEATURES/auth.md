# AUTH Feature

## Objetivo

Gestionar autenticación de usuario:
- login
- registro
- recuperación básica de contraseña (mock UI actual)

## Alcance Y Límites

Incluye:
- páginas en `src/app/features/auth/pages/*`
- helpers de mapeo y consumo HTTP en `src/app/features/auth/helpers/*`
- interfaces de formularios en `src/app/features/auth/interfaces/*`
- claves i18n y constantes de feature en `src/app/features/auth/constants/*`

No incluye:
- guardas y sesión global (`src/app/core/*`)
- layout privado/dashboard

## Rutas

- `/login`
- `/signup`
- `/forgot-password`

Definidas vía `ROUTES_CONSTANTS` y cargadas lazy en `src/app/app.routes.ts`.

## Flujo De Datos

1. UI valida formularios reactivos en cada página.
2. `AuthHelper` transforma forms a DTOs de API (`LoginRequest`, `RegisterRequest`).
3. `AuthHttpHelper` consume `@api/auth`:
   - `authControllerLogin` devuelve `LoginResponse` (`data`).
   - `authControllerRegister` devuelve `success` boolean.
4. En login exitoso:
   - `SessionService.setTokens(accessToken, refreshToken)`
   - `UserService.setUser({ email })`
   - notificación success
   - navegación a `/dashboard`
5. Errores HTTP pasan por interceptor global de mapeo (`core/interceptors`).

## Contratos Clave

Entrada:
- `ILoginForm { email, password, rememberMe }`
- `ISignupForm { email, password, confirmPassword }`
- `IForgotPasswordForm { email }`

Salida backend usada:
- `LoginResponse { accessToken, refreshToken }`
- registro: `success: boolean`

## Dependencias

- API: `@api/auth`
- Core: `SessionService`, `UserService`, `DisableOnLoadingDirective`, i18n
- UI: componentes de `@libs/components` y wrappers de `@libs/wrappers`
- Seguridad (fuente de verdad): [`SECURITY.md`](../SECURITY.md)

## Known Decisions

- La feature usa `AuthHttpHelper` como único punto de acceso HTTP; no se hacen llamadas directas desde componentes.
- Login persiste sesión con `SessionService` y perfil mínimo con `UserService` antes de navegar.
- `forgot-password` es actualmente flujo UI/local (sin endpoint backend integrado).

## Reglas De Cambio Seguro

- Mantener consistencia entre validaciones de `login/signup/forgot-password`.
- Si cambia DTO auth backend, regenerar cliente (`npm run api:generate`) y ajustar `AuthHelper/AuthHttpHelper`.
- No escribir llamadas HTTP directas en componentes; usar `AuthHttpHelper`.
- Si cambian mensajes/keys, actualizar constantes `*keys.constants.ts` y traducciones de scope `auth`.
- Si cambia flujo, alcance o contratos de auth, actualizar este archivo en la misma PR.

## Checklist De PR (Auth)

- `npm run check`
- `npm run test:unit`
- Revisar specs de:
  - `src/app/features/auth/pages/login/login.component.spec.ts`
  - `src/app/features/auth/pages/signup/signup.component.spec.ts`
  - `src/app/features/auth/pages/forgot-password/forgot-password.component.spec.ts`
  - `src/app/features/auth/helpers/auth-http.helper.spec.ts`
  - `src/app/features/auth/helpers/auth.helper.spec.ts`
