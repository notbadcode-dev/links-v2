import { isDevMode, Provider } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { II18nConfig } from './i18n.types';
import { TranslocoHttpLoader } from './transloco-loader';

/**
 * I18n Configuration Provider
 *
 * Provides the translation system configuration in a centralized way.
 * This function encapsulates the specific translation library setup.
 */
export function provideI18n(config?: Partial<II18nConfig>): Provider[] {
  const defaultConfig: II18nConfig = {
    defaultLang: 'en',
    fallbackLang: 'en',
    availableLangs: ['en', 'es'],
    logMissingKeys: isDevMode(),
  };

  const mergedConfig = { ...defaultConfig, ...config };
  const missingHandler =
    mergedConfig.logMissingKeys === undefined
      ? { useFallbackTranslation: true }
      : {
          logMissingKey: mergedConfig.logMissingKeys,
          useFallbackTranslation: true,
        };

  return [
    provideTransloco({
      config: {
        availableLangs: mergedConfig.availableLangs,
        defaultLang: mergedConfig.defaultLang,
        fallbackLang: mergedConfig.fallbackLang,
        missingHandler,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ];
}

/**
 * Provides a scoped translation configuration for a component
 * @param scope The scope name (e.g., 'auth', 'dashboard')
 */
export function provideI18nScope(scope: string): Provider {
  // This is a wrapper around Transloco's provideTranslocoScope
  // In the future, we can replace this with our own implementation
  return {
    provide: `I18N_SCOPE_${scope.toUpperCase()}`,
    useValue: scope,
  };
}

/**
 * Injectable token for scope configuration (if needed)
 */
export const I18N_SCOPE_TOKEN = 'I18N_SCOPE_TOKEN';
