import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { I18nService } from '@app/core/i18n';

import { languageInterceptor } from './language.interceptor';

describe('languageInterceptor', () => {
  const i18nServiceMock = {
    currentLanguageSignal: signal('es'),
    currentLanguage: 'en',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    i18nServiceMock.currentLanguageSignal.set('es');
    i18nServiceMock.currentLanguage = 'en';

    TestBed.configureTestingModule({
      providers: [{ provide: I18nService, useValue: i18nServiceMock }],
    });
  });

  it('adds Accept-Language header', () => {
    const req = new HttpRequest('GET', '/test');
    let capturedReq: HttpRequest<unknown> | null = null;
    const next: HttpHandlerFn = (request: HttpRequest<unknown>) => {
      capturedReq = request;
      return of(new HttpResponse({ status: 200 }));
    };

    TestBed.runInInjectionContext(() => {
      languageInterceptor(req, next).subscribe();
    });

    expect(capturedReq?.headers.get('Accept-Language')).toBe('es');
  });

  it('falls back to currentLanguage when signal is empty', () => {
    i18nServiceMock.currentLanguageSignal.set('');
    i18nServiceMock.currentLanguage = 'en';

    const req = new HttpRequest('GET', '/test');
    let capturedReq: HttpRequest<unknown> | null = null;
    const next: HttpHandlerFn = (request: HttpRequest<unknown>) => {
      capturedReq = request;
      return of(new HttpResponse({ status: 200 }));
    };

    TestBed.runInInjectionContext(() => {
      languageInterceptor(req, next).subscribe();
    });

    expect(capturedReq?.headers.get('Accept-Language')).toBe('en');
  });
});
