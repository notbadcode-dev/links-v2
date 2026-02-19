import { I18N_CONSTANTS } from './i18n.constants';
import { I18N_SCOPE_TOKEN, provideI18n, provideI18nScope } from './i18n-config.provider';

describe('i18n config providers', () => {
  it('creates transloco providers array', () => {
    const providers = provideI18n();

    expect(Array.isArray(providers)).toBe(true);
    expect(providers.length).toBeGreaterThan(0);
  });

  it('accepts config overrides', () => {
    const providers = provideI18n({
      defaultLang: 'es',
      fallbackLang: I18N_CONSTANTS.DEFAULT_LANGUAGE.code,
      availableLangs: ['en', 'es'],
      logMissingKeys: false,
    });

    expect(Array.isArray(providers)).toBe(true);
    expect(providers.length).toBeGreaterThan(0);
  });

  it('creates scoped provider token', () => {
    const provider = provideI18nScope('auth') as { provide: string; useValue: string };

    expect(provider.provide).toBe('I18N_SCOPE_AUTH');
    expect(provider.useValue).toBe('auth');
    expect(I18N_SCOPE_TOKEN).toBe('I18N_SCOPE_TOKEN');
  });
});
