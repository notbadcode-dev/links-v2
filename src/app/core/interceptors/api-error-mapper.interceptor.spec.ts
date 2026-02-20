import { HttpClient, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';

import { NotificationService } from '@libs/components';

import { apiErrorMapperInterceptor } from './api-error-mapper.interceptor';
import { API_ERROR_MAPPER_CONSTANTS } from './constants/api-error-mapper.constants';

describe('apiErrorMapperInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  const notificationMock = {
    success: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiErrorMapperInterceptor])),
        provideHttpClientTesting(),
        { provide: NotificationService, useValue: notificationMock },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('shows notifications based on API message types from HttpErrorResponse', () => {
    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    req.flush(
      {
        messageList: [
          { message: 'Saved', type: 'success' },
          { message: 'Review this', type: 'warning' },
          { message: 'Info message', type: 'info' },
          { message: 'Critical failure', type: 'critical' },
        ],
      },
      { status: 400, statusText: 'Bad Request' },
    );

    expect(notificationMock.success).toHaveBeenCalledWith('Saved');
    expect(notificationMock.warning).toHaveBeenCalledWith('Review this');
    expect(notificationMock.info).toHaveBeenCalledWith('Info message');
    expect(notificationMock.error).toHaveBeenCalledWith('Critical failure');
  });

  it('shows default error message for non-HttpErrorResponse errors', () => {
    const request = new HttpRequest('GET', '/test');

    TestBed.runInInjectionContext(() => {
      apiErrorMapperInterceptor(request, () =>
        throwError(() => new Error('Unexpected failure')),
      ).subscribe();
    });

    expect(notificationMock.error).toHaveBeenCalledWith(
      API_ERROR_MAPPER_CONSTANTS.DEFAULT_ERROR_MESSAGE,
    );
  });
});
