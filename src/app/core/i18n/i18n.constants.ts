import { ILanguage } from './i18n.types';

export const I18N_CONSTANTS = {
  LANGUAGES: [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ],
  DEFAULT_LANGUAGE: { code: 'en', name: 'English', flag: '🇺🇸' },
  AVAILABLE_LANG_CODES: ['en', 'es'],
} as const satisfies {
  LANGUAGES: readonly ILanguage[];
  DEFAULT_LANGUAGE: ILanguage;
  AVAILABLE_LANG_CODES: readonly string[];
};
