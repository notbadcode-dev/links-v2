import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SessionService } from '@app/core/services/session.service';

import { authorizationInterceptor } from './authorization.interceptor';

describe('authorizationInterceptor', () => {
  const sessionServiceMock = {
    accessToken: vi.fn<string, []>(() => ''),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    sessionServiceMock.accessToken.mockReturnValue('');

    TestBed.configureTestingModule({
      providers: [{ provide: SessionService, useValue: sessionServiceMock }],
    });
  });

  it('adds Authorization header when access token exists', () => {
    sessionServiceMock.accessToken.mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6Ik...');

    const req = new HttpRequest('GET', '/test');
    let capturedReq: HttpRequest<unknown> | null = null;
    const next: HttpHandlerFn = (request: HttpRequest<unknown>) => {
      capturedReq = request;
      return of(new HttpResponse({ status: 200 }));
    };

    TestBed.runInInjectionContext(() => {
      authorizationInterceptor(req, next).subscribe();
    });

    expect(capturedReq?.headers.get('Authorization')).toBe(
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ik...',
    );
  });

  it('does not add Authorization header when access token is empty', () => {
    sessionServiceMock.accessToken.mockReturnValue('');

    const req = new HttpRequest('GET', '/test');
    let capturedReq: HttpRequest<unknown> | null = null;
    const next: HttpHandlerFn = (request: HttpRequest<unknown>) => {
      capturedReq = request;
      return of(new HttpResponse({ status: 200 }));
    };

    TestBed.runInInjectionContext(() => {
      authorizationInterceptor(req, next).subscribe();
    });

    expect(capturedReq?.headers.has('Authorization')).toBe(false);
  });
});
