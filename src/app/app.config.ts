import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideApiConfiguration as provideAuthApi } from '@api/auth';
import { provideApiConfiguration as provideLinksApi } from '@api/links';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideI18n } from './core/i18n';
import { interceptors } from './core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors(interceptors)),
    provideAuthApi(environment.authApiUrl),
    provideLinksApi(environment.linksApiUrl),
    provideI18n({
      defaultLang: 'en',
      fallbackLang: 'en',
      availableLangs: ['en', 'es'],
    }),
  ],
};
