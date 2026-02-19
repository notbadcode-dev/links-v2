import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiConfiguration } from '@api/auth';

import { AuthHttpHelper } from './auth-http.helper';

describe('AuthHttpHelper', () => {
  let service: AuthHttpHelper;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ApiConfiguration,
          useValue: { rootUrl: 'http://api.test' },
        },
      ],
    });

    service = TestBed.inject(AuthHttpHelper);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('posts login form and returns response data', () => {
    let result: unknown;

    service
      .login({
        email: 'user@test.com',
        password: 'secret123',
        rememberMe: true,
      })
      .subscribe((response) => {
        result = response;
      });

    const request = httpMock.expectOne('http://api.test/auth/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      email: 'user@test.com',
      password: 'secret123',
    });

    request.flush({
      success: true,
      data: {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      },
      messageList: [],
    });

    expect(result).toEqual({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });
  });
});
