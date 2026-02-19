import { HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { LoadingService } from '@app/core/services/loading.service';
import { loadingInterceptor } from './loading.interceptor';

describe('loadingInterceptor', () => {
  const loadingServiceMock = {
    increment: vi.fn(),
    decrement: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: LoadingService, useValue: loadingServiceMock }],
    });
  });

  it('increments before request and decrements on success', () => {
    const req = new HttpRequest('GET', '/test');
    const next = vi.fn(() => of({ ok: true }));

    TestBed.runInInjectionContext(() => {
      loadingInterceptor(req, next).subscribe();
    });

    expect(loadingServiceMock.increment).toHaveBeenCalledTimes(1);
    expect(loadingServiceMock.decrement).toHaveBeenCalledTimes(1);
  });

  it('decrements on error as well', () => {
    const req = new HttpRequest('GET', '/test');
    const next = vi.fn(() => throwError(() => new Error('network error')));

    TestBed.runInInjectionContext(() => {
      loadingInterceptor(req, next).subscribe({
        error: () => undefined,
      });
    });

    expect(loadingServiceMock.increment).toHaveBeenCalledTimes(1);
    expect(loadingServiceMock.decrement).toHaveBeenCalledTimes(1);
  });
});
