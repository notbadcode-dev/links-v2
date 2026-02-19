import { TestBed } from '@angular/core/testing';
import { Observable, Subject } from 'rxjs';

import { I18nService } from '@app/core/i18n';
import { LanguageSelectorComponent } from './language-selector.component';

describe('LanguageSelectorComponent', () => {
  const langChanges$ = new Subject<string>();

  const i18nMock = {
    availableLanguages: [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
    ],
    currentLanguage: 'en',
    langChanges$: langChanges$.asObservable() as Observable<string>,
    setLanguage: vi.fn(),
  };

  const createComponent = (): LanguageSelectorComponent =>
    TestBed.runInInjectionContext(() => new LanguageSelectorComponent());

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: I18nService, useValue: i18nMock }],
    });
  });

  it('delegates language change to I18nService', () => {
    const component = createComponent();

    component.setLanguage('es');

    expect(i18nMock.setLanguage).toHaveBeenCalledWith('es');
  });

  it('resolves current language info and falls back to first language when missing', () => {
    const component = createComponent();

    expect((component as any)._currentLangInfo().code).toBe('en');

    langChanges$.next('de');

    expect((component as any)._currentLangInfo().code).toBe('en');
  });
});
