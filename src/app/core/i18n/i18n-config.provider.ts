import { isDevMode, Provider } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { I18N_CONSTANTS } from './i18n.constants';
import { II18nConfig } from './i18n.types';
import { TranslocoHttpLoader } from './transloco-loader';

export function provideI18n(config?: Partial<II18nConfig>): Provider[] {
  const defaultConfig: II18nConfig = {
    defaultLang: I18N_CONSTANTS.DEFAULT_LANGUAGE.code,
    fallbackLang: I18N_CONSTANTS.DEFAULT_LANGUAGE.code,
    availableLangs: I18N_CONSTANTS.AVAILABLE_LANG_CODES,
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

export function provideI18nScope(scope: string): Provider {

  return {
    provide: `I18N_SCOPE_${scope.toUpperCase()}`,
    useValue: scope,
  };
}

export const I18N_SCOPE_TOKEN = 'I18N_SCOPE_TOKEN';
