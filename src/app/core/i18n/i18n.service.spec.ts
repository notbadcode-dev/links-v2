import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { Observable, of, Subject } from 'rxjs';

import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;
  const langChanges$ = new Subject<string>();

  const translocoMock = {
    getActiveLang: vi.fn(() => 'en'),
    setActiveLang: vi.fn(),
    translate: vi.fn((key: string, _params?: unknown, scope?: string) =>
      scope ? `${scope}.${key}` : key,
    ),
    selectTranslate: vi.fn((_key: string) => of('translated value')),
    load: vi.fn((path: string) => of({ path })),
    langChanges$: langChanges$.asObservable() as Observable<string>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: TranslocoService, useValue: translocoMock }],
    });
    service = TestBed.inject(I18nService);
  });

  it('returns current language info from available languages', () => {
    translocoMock.getActiveLang.mockReturnValue('es');

    expect(service.currentLanguageInfo.code).toBe('es');
  });

  it('falls back to default language info when active language is unknown', () => {
    translocoMock.getActiveLang.mockReturnValue('fr');

    expect(service.currentLanguageInfo.code).toBe('en');
  });

  it('sets language only when available', () => {
    service.setLanguage('es');
    service.setLanguage('fr');

    expect(translocoMock.setActiveLang).toHaveBeenCalledTimes(1);
    expect(translocoMock.setActiveLang).toHaveBeenCalledWith('es');
  });

  it('checks hasKey by comparing translated value to key', () => {
    translocoMock.translate.mockReturnValueOnce('common.validation.required');
    translocoMock.translate.mockReturnValueOnce('Required');

    expect(service.hasKey('common.validation.required')).toBe(false);
    expect(service.hasKey('common.validation.required')).toBe(true);
  });

  it('loads global and scoped translations when scope is present', async () => {
    const result = await new Promise<unknown>((resolve) => {
      service.loadTranslations('auth').subscribe(resolve);
    });

    expect(translocoMock.load).toHaveBeenNthCalledWith(1, 'en');
    expect(translocoMock.load).toHaveBeenNthCalledWith(2, 'auth/en');
    expect(result).toEqual({
      globalTranslation: { path: 'en' },
      scopeTranslation: { path: 'auth/en' },
    });
  });

  it('translates multiple keys', () => {
    translocoMock.translate.mockImplementation((key: string) => `t:${key}`);

    const result = service.translateMultiple(['a', 'b']);

    expect(result).toEqual({
      a: 't:a',
      b: 't:b',
    });
  });
});
