import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { DashboardService, IDashboardTotals } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should get dashboard totals successfully', () => {
    const mockResponse: IDashboardTotals = {
      totalLinks: 42,
      totalGroups: 12,
    };

    let result: IDashboardTotals | undefined;

    service.getTotals().subscribe({
      next: (response) => {
        result = response;
      },
    });

    const req = httpMock.expectOne(`${environment.linksApiUrl}/dashboard-links/summary`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(result).toEqual(mockResponse);
    expect(result?.totalLinks).toBe(42);
    expect(result?.totalGroups).toBe(12);
  });

  it('should handle HTTP error responses', () => {
    let errorStatus: number | undefined;

    service.getTotals().subscribe({
      next: () => {
        throw new Error('should fail with error');
      },
      error: (error: { status: number }) => {
        errorStatus = error.status;
      },
    });

    const req = httpMock.expectOne(`${environment.linksApiUrl}/dashboard-links/summary`);
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });

    expect(errorStatus).toBe(500);
  });

  it('should handle network error', () => {
    let errorResult: unknown;

    service.getTotals().subscribe({
      next: () => {
        throw new Error('should fail with error');
      },
      error: (error: unknown) => {
        errorResult = error;
      },
    });

    const req = httpMock.expectOne(`${environment.linksApiUrl}/dashboard-links/summary`);
    req.error(new ProgressEvent('Network error'));

    expect(errorResult).toBeDefined();
  });

  it('should return empty totals when backend returns zeros', () => {
    const mockResponse: IDashboardTotals = {
      totalLinks: 0,
      totalGroups: 0,
    };

    let result: IDashboardTotals | undefined;

    service.getTotals().subscribe({
      next: (response) => {
        result = response;
      },
    });

    const req = httpMock.expectOne(`${environment.linksApiUrl}/dashboard-links/summary`);
    req.flush(mockResponse);

    expect(result?.totalLinks).toBe(0);
    expect(result?.totalGroups).toBe(0);
  });
});
