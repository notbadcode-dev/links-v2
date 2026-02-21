import { Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { I18nService } from '@app/core/i18n';

import { LanguageSelectorComponent } from './language-selector.component';

describe('LanguageSelectorComponent', () => {
  type TLanguageSelectorTestAccess = LanguageSelectorComponent & {
    _currentLang: Signal<string>;
  };

  const langChanges$ = new Subject<string>();
  let currentUiLanguage = 'en';

  const i18nMock = {
    availableLanguages: [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
    ],
    currentLanguage: 'en',
    langChanges$: langChanges$.asObservable(),
    translate: vi.fn((key: string) => {
      const translations: Record<string, Record<string, string>> = {
        en: {
          'language.names.en': 'English',
          'language.names.es': 'Spanish',
        },
        es: {
          'language.names.en': 'Ingles',
          'language.names.es': 'Espanol',
        },
      };
      return translations[currentUiLanguage]?.[key] ?? key;
    }),
    setLanguage: vi.fn(),
  };

  const createComponent = (): LanguageSelectorComponent =>
    TestBed.runInInjectionContext(() => new LanguageSelectorComponent());

  beforeEach(() => {
    vi.clearAllMocks();
    currentUiLanguage = 'en';
    TestBed.configureTestingModule({
      providers: [{ provide: I18nService, useValue: i18nMock }],
    });
  });

  it('delegates language change to I18nService', () => {
    const component = createComponent();

    component.setLanguage('es');

    expect(i18nMock.setLanguage).toHaveBeenCalledWith('es');
  });

  it('updates current language signal from i18n stream', () => {
    const component = createComponent() as TLanguageSelectorTestAccess;

    expect(component._currentLang()).toBe('en');

    langChanges$.next('es');

    expect(component._currentLang()).toBe('es');
  });

  it('localizes language labels based on current app language', () => {
    const component = createComponent() as TLanguageSelectorTestAccess;
    const getLanguageLabel = (
      (component as unknown as Record<string, unknown>)['_getLanguageLabel'] as (
        langCode: string,
      ) => string
    ).bind(component);

    expect(getLanguageLabel('es')).toBe('Spanish');
    expect(getLanguageLabel('en')).toBe('English');

    currentUiLanguage = 'es';
    langChanges$.next('es');

    expect(getLanguageLabel('en')).toBe('Ingles');
    expect(getLanguageLabel('es')).toBe('Espanol');
  });

  it('falls back to configured language name and never to uppercase code', () => {
    const component = createComponent() as TLanguageSelectorTestAccess;
    const getLanguageLabel = (
      (component as unknown as Record<string, unknown>)['_getLanguageLabel'] as (
        langCode: string,
      ) => string
    ).bind(component);

    i18nMock.translate.mockReturnValueOnce('language.names.en');

    expect(getLanguageLabel('en')).toBe('English');
  });
});
