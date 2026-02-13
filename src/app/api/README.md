# API Clients

Este directorio contiene los clientes API generados automáticamente desde las especificaciones OpenAPI usando **ng-openapi-gen**.

## Servicios

### Auth Service
- **URL Base:** `http://localhost:60200`
- **Spec URL:** `http://localhost:60200/docs-json`
- **Carpeta generada:** `auth/`

### Links Service
- **URL Base:** `http://localhost:60201`
- **Spec URL:** `http://localhost:60201/docs-json`
- **Carpeta generada:** `links/`

## Generación de clientes

Para regenerar los clientes API, asegúrate de que los servicios estén corriendo y ejecuta:

```bash
# Generar ambos clientes
npm run api:generate

# Generar solo Auth
npm run api:generate:auth

# Generar solo Links
npm run api:generate:links
```

## Configuración

Los clientes usan `ApiConfiguration` para configurar la URL base. Configura esto en tu `app.config.ts`:

```typescript
import { ApiConfiguration as AuthApiConfig } from './api/auth/api-configuration';
import { ApiConfiguration as LinksApiConfig } from './api/links/api-configuration';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: AuthApiConfig,
      useFactory: () => ({ rootUrl: 'http://localhost:60200' })
    },
    {
      provide: LinksApiConfig,
      useFactory: () => ({ rootUrl: 'http://localhost:60201' })
    }
  ]
};
```

## Archivos generados

Los archivos en `auth/` y `links/` son generados automáticamente. **NO los edites manualmente** ya que tus cambios se perderán en la próxima generación.

## Estructura de archivos generados

Cada carpeta (`auth/` y `links/`) contendrá:
- `models/` - Interfaces TypeScript para todos los DTOs
- `services/` - Servicios Angular para cada controlador
- `api-configuration.ts` - Configuración de la API
- `base-service.ts` - Clase base para los servicios
- `models.ts` - Índice de todos los modelos
- `services.ts` - Índice de todos los servicios
