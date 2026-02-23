# SECURITY

Guía de seguridad del frontend para autenticación, tokens y sesión.

No duplica `CONTRACTS.md`:
- `CONTRACTS.md` define forma de payloads/respuestas.
- `SECURITY.md` define decisiones y reglas de protección.

## Estado Actual (Implementado)

## Tokens Y Sesión

- Access token y refresh token se almacenan en `localStorage`:
  - `links_v2.session.accessToken`
  - `links_v2.session.refreshToken`
- Email de usuario se almacena en `localStorage`:
  - `links_v2.user.email`
- Servicios fuente:
  - `src/app/core/services/session.service.ts`
  - `src/app/core/services/user.service.ts`

## Header Authorization

- Se agrega `Authorization: Bearer <accessToken>` vía interceptor:
  - `src/app/core/interceptors/authorization.interceptor.ts`
- Si no hay token, la request sale sin cabecera.

## Refresh Token

- Refresh automático por intervalo en:
  - `src/app/core/services/auth-session-lifecycle.service.ts`
- Si refresh falla o la respuesta no trae ambos tokens:
  - se ejecuta logout cliente.

## Inactividad Y Auto-logout

- Se escuchan eventos de actividad (`click`, `keydown`, `mousemove`, `scroll`, `touchstart`).
- Se abre prompt de inactividad tras el tiempo configurado.
- Si el usuario no confirma, se ejecuta logout automático.
- Configuración tomada de `environment.sessionInactivity`.

## Logout

- Logout intenta llamada backend best-effort (`authControllerLogout`) y luego limpia estado cliente.
- Limpieza actual:
  - `SessionService.clear()`
  - `UserService.clear()`
  - `localStorage.clear()`

## Riesgos Conocidos

- Uso de `localStorage` implica exposición a XSS si hay inyección de script.
- `localStorage.clear()` borra todo el storage del origen, no solo claves de la app.

## Reglas De Cambio Seguro

- No mover tokens a otro mecanismo sin actualizar:
  - `authorization.interceptor`
  - `auth-session-lifecycle.service`
  - `session.service`
  - `auth.guard`
- Si cambia política de expiración/refresh, documentar aquí el nuevo flujo.
- Si cambia estrategia de storage (ej. cookies httpOnly), actualizar este archivo y `FEATURES/auth.md` en la misma PR.
- Mantener `SECURITY.md` como fuente de verdad para decisiones de seguridad frontend.

