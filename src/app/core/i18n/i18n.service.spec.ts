import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { of, Subject } from 'rxjs';

import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;
  let translocoMock: {
    getActiveLang: ReturnType<typeof vi.fn>;
    setActiveLang: ReturnType<typeof vi.fn>;
    translate: ReturnType<typeof vi.fn>;
    selectTranslate: ReturnType<typeof vi.fn>;
    load: ReturnType<typeof vi.fn>;
    langChanges$: ReturnType<Subject<string>['asObservable']>;
  };
  let langChanges$: Subject<string>;
  let activeLang = 'en';
  const languageStorageKey = 'links_v2.i18n.language';

  beforeEach(() => {
    activeLang = 'en';
    langChanges$ = new Subject<string>();
    translocoMock = {
      getActiveLang: vi.fn(() => activeLang),
      setActiveLang: vi.fn((lang: string) => {
        activeLang = lang;
      }),
      translate: vi.fn((key: string, _params?: unknown, scope?: string) =>
        scope ? `${scope}.${key}` : key,
      ),
      selectTranslate: vi.fn((_key: string) => of('translated value')),
      load: vi.fn((path: string) => of({ path })),
      langChanges$: langChanges$.asObservable(),
    };
    localStorage.clear();
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

  it('exposes current language as signal and updates on lang changes', () => {
    translocoMock.getActiveLang.mockReturnValue('en');

    expect(service.currentLanguageSignal()).toBe('en');

    langChanges$.next('es');

    expect(service.currentLanguageSignal()).toBe('es');
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
    expect(localStorage.getItem(languageStorageKey)).toBe('es');
  });

  it('initializes active language from localStorage when persisted value is valid', () => {
    localStorage.setItem(languageStorageKey, 'es');
    activeLang = 'en';
    vi.clearAllMocks();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: TranslocoService, useValue: translocoMock }],
    });

    service = TestBed.inject(I18nService);

    expect(translocoMock.setActiveLang).toHaveBeenCalledWith('es');
    expect(service.currentLanguageSignal()).toBe('es');
  });

  it('ignores persisted language when value is unsupported', () => {
    localStorage.setItem(languageStorageKey, 'fr');
    activeLang = 'en';
    vi.clearAllMocks();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: TranslocoService, useValue: translocoMock }],
    });

    service = TestBed.inject(I18nService);

    expect(translocoMock.setActiveLang).not.toHaveBeenCalledWith('fr');
    expect(service.currentLanguageSignal()).toBe('en');
  });

  it('falls back when reading persisted language throws', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage unavailable');
    });
    activeLang = 'en';
    vi.clearAllMocks();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: TranslocoService, useValue: translocoMock }],
    });

    service = TestBed.inject(I18nService);

    expect(translocoMock.setActiveLang).not.toHaveBeenCalled();
    expect(service.currentLanguageSignal()).toBe('en');
    getItemSpy.mockRestore();
  });

  it('checks hasKey by comparing translated value to key', () => {
    translocoMock.translate.mockReturnValueOnce('common.validation.required');
    translocoMock.translate.mockReturnValueOnce('Required');

    expect(service.hasKey('common.validation.required')).toBe(false);
    expect(service.hasKey('common.validation.required')).toBe(true);
  });

  it('returns false in hasKey when translate throws', () => {
    translocoMock.translate.mockImplementationOnce(() => {
      throw new Error('boom');
    });

    expect(service.hasKey('common.validation.required')).toBe(false);
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

  it('loads only global translations when scope is undefined or blank', async () => {
    const undefinedScopeResult = await new Promise<unknown>((resolve) => {
      service.loadTranslations(undefined).subscribe(resolve);
    });
    const blankScopeResult = await new Promise<unknown>((resolve) => {
      service.loadTranslations('   ').subscribe(resolve);
    });

    expect(undefinedScopeResult).toEqual({ path: 'en' });
    expect(blankScopeResult).toEqual({ path: 'en' });
  });

  it('translates multiple keys', () => {
    translocoMock.translate.mockImplementation((key: string) => `t:${key}`);

    const result = service.translateMultiple(['a', 'b']);

    expect(result).toEqual({
      a: 't:a',
      b: 't:b',
    });
  });

  it('proxies translate$, translate and langChanges$', async () => {
    translocoMock.selectTranslate.mockReturnValueOnce(of('stream-value'));

    expect(service.translate('x.key')).toBe('x.key');
    await expect(
      new Promise<string>((resolve) => service.translate$('x.key').subscribe(resolve)),
    ).resolves.toBe('stream-value');
    expect(service.langChanges$).toBe(translocoMock.langChanges$);
  });

  it('falls back to static fallback language when availableLanguages is empty', () => {
    (service as unknown as { availableLanguages: { code: string }[] }).availableLanguages = [];
    translocoMock.getActiveLang.mockReturnValue('zz');

    expect(service.currentLanguageInfo.code).toBe('en');
  });
});
