import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TranslocoHttpLoader, TranslocoScopeLoader } from './transloco-loader';

describe('Transloco loaders', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loads global translation from assets path first', () => {
    const loader = TestBed.inject(TranslocoHttpLoader);
    let result: unknown;

    loader.getTranslation('en').subscribe((value) => {
      result = value;
    });

    const req = httpMock.expectOne('/assets/i18n/en.json');
    req.flush({ hello: 'world' });

    expect(result).toEqual({ hello: 'world' });
  });

  it('falls back to /i18n path when global assets request fails', () => {
    const loader = TestBed.inject(TranslocoHttpLoader);
    let result: unknown;

    loader.getTranslation('es').subscribe((value) => {
      result = value;
    });

    const assetsReq = httpMock.expectOne('/assets/i18n/es.json');
    assetsReq.flush({}, { status: 404, statusText: 'Not Found' });

    const fallbackReq = httpMock.expectOne('/i18n/es.json');
    fallbackReq.flush({ welcome: 'hola' });

    expect(result).toEqual({ welcome: 'hola' });
  });

  it('loads scoped translation and falls back when assets request fails', () => {
    const loader = TestBed.inject(TranslocoScopeLoader);
    let result: unknown;

    loader.getTranslation('auth/en').subscribe((value) => {
      result = value;
    });

    const assetsReq = httpMock.expectOne('/assets/i18n/auth/en.json');
    assetsReq.flush({}, { status: 404, statusText: 'Not Found' });

    const fallbackReq = httpMock.expectOne('/i18n/auth/en.json');
    fallbackReq.flush({ login: 'Login' });

    expect(result).toEqual({ login: 'Login' });
  });
});
