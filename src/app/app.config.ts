import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { provideApiConfiguration as provideAuthApi } from '@api/auth';
import { provideApiConfiguration as provideLinksApi } from '@api/links';

import { routes } from './app.routes';
import { provideI18n } from './core/i18n';
import { provideCustomIcons } from './core/icons/icons.provider';
import { interceptors } from './core/interceptors';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations(),
    provideHttpClient(withInterceptors(interceptors)),
    provideAuthApi(environment.authApiUrl),
    provideLinksApi(environment.linksApiUrl),
    provideCustomIcons(),
    provideI18n({
      defaultLang: 'en',
      fallbackLang: 'en',
      availableLangs: ['en', 'es'],
    }),
  ],
};
