import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';

import { ROUTES_CONSTANTS } from '@app/constants/routes.constants';
import { SessionService } from '@app/core/services/session.service';

import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const sessionServiceMock = {
    isAuthenticated: vi.fn<boolean, []>(() => false),
  };

  const routerMock = {
    createUrlTree: vi.fn<UrlTree, [unknown[]]>(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    sessionServiceMock.isAuthenticated.mockReturnValue(false);
    routerMock.createUrlTree.mockReturnValue({} as UrlTree);

    TestBed.configureTestingModule({
      providers: [
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('allows access when session is authenticated', () => {
    sessionServiceMock.isAuthenticated.mockReturnValue(true);

    let result!: ReturnType<typeof authGuard>;
    TestBed.runInInjectionContext(() => {
      result = authGuard({} as never, {} as never);
    });

    expect(result).toBe(true);
    expect(routerMock.createUrlTree).not.toHaveBeenCalled();
  });

  it('redirects to login when session is not authenticated', () => {
    const expectedTree = { redirected: true } as unknown as UrlTree;
    routerMock.createUrlTree.mockReturnValue(expectedTree);

    let result!: ReturnType<typeof authGuard>;
    TestBed.runInInjectionContext(() => {
      result = authGuard({} as never, {} as never);
    });

    expect(routerMock.createUrlTree).toHaveBeenCalledWith([ROUTES_CONSTANTS.AUTH.LOGIN]);
    expect(result).toBe(expectedTree);
  });
});
