# Configuración de Clientes API con ng-openapi-gen

Este proyecto utiliza **ng-openapi-gen** para generar automáticamente clientes TypeScript desde especificaciones OpenAPI.

## Servicios Backend

- **Auth Service**: `http://localhost:60200` - Autenticación y usuarios
- **Links Service**: `http://localhost:60201` - Gestión de enlaces

## Instalación y Configuración

### 1. Generar los clientes API

Asegúrate de que ambos servicios backend estén corriendo, luego ejecuta:

```bash
npm run api:generate
```

O generar individualmente:

```bash
npm run api:generate:auth   # Solo Auth Service
npm run api:generate:links  # Solo Links Service
```

Esto creará múltiples archivos en cada carpeta:
- `src/app/api/auth/` - Modelos, servicios e índices del Auth Service
- `src/app/api/links/` - Modelos, servicios e índices del Links Service

### 2. Configurar las URLs base

Edita `src/app/app.config.ts` para proveer las URLs base:

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

// Importar cuando los clientes estén generados:
// import { ApiConfiguration as AuthApiConfig } from './api/auth/api-configuration';
// import { ApiConfiguration as LinksApiConfig } from './api/links/api-configuration';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // Descomentar después de generar los clientes:
    // {
    //   provide: AuthApiConfig,
    //   useFactory: () => ({ rootUrl: environment.authApiUrl })
    // },
    // {
    //   provide: LinksApiConfig,
    //   useFactory: () => ({ rootUrl: environment.linksApiUrl })
    // },
  ],
};
```

### 3. Usar los clientes en componentes/servicios

```typescript
import { Component, inject } from '@angular/core';
// Importar los servicios generados (los nombres dependerán de tu API)
import { AuthService } from './api/auth/services/auth.service';
import { LinksService } from './api/links/services/links.service';

@Component({
  selector: 'app-root',
  template: `...`,
})
export class AppComponent {
  private authService = inject(AuthService);
  private linksService = inject(LinksService);

  login() {
    this.authService.login({
      body: {
        email: 'user@example.com',
        password: 'password'
      }
    }).subscribe(response => {
      console.log('Logged in:', response);
    });
  }

  getLinks() {
    this.linksService.findAll().subscribe(links => {
      console.log('Links:', links);
    });
  }
}
```

## Archivos de Configuración

### `ng-openapi-gen-auth.json` (Auth Service)
Configuración para generar el cliente del Auth Service.

### `ng-openapi-gen-links.json` (Links Service)
Configuración para generar el cliente del Links Service.

## Opciones de Configuración

Los clientes generados incluyen:

- ✅ Servicios Angular con tipado completo
- ✅ Uso de `HttpClient` de Angular
- ✅ Soporte para RxJS (Observables)
- ✅ Inyección de dependencias nativa de Angular
- ✅ Modelos TypeScript para todos los DTOs
- ✅ Índices para imports simplificados
- ✅ Configuración de API con `ApiConfiguration`

## Regenerar Clientes

Cada vez que la API cambie (nuevos endpoints, cambios en DTOs, etc.), regenera los clientes:

```bash
npm run api:generate
```

Los archivos generados están en `.gitignore` y no se versiona en Git.

## Troubleshooting

### Error: Cannot connect to API
Asegúrate de que los servicios backend estén corriendo:
```bash
# En el proyecto backend
npm run start:dev
```

### Error: Module not found
Si los clientes aún no están generados, primero ejecuta:
```bash
npm run api:generate
```

### Error de tipos TypeScript
Si hay errores de tipos después de regenerar, verifica:
1. La versión de TypeScript en `tsconfig.json`
2. Las opciones `strict` en `tsconfig.json`
3. Reinicia el servidor de TypeScript en VS Code: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
