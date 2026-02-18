import { ILanguage } from './i18n.types';

export const I18N_CONSTANTS = {
  LANGUAGES: [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ] as ILanguage[],
  DEFAULT_LANGUAGE: { code: 'en', name: 'English', flag: '🇺🇸' } as ILanguage,
  AVAILABLE_LANG_CODES: ['en', 'es'] as string[],
} as const;
