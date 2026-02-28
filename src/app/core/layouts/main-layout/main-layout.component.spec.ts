import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { AuthSessionLifecycleService } from '@app/core/services/auth-session-lifecycle.service';
import { DashboardService, IDashboardTotals } from '@app/core/services/dashboard.service';
import { UserService } from '@app/core/services/user.service';
import * as randomUtils from '@app/shared/utils/random.utils';

import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {
  const authSessionLifecycleServiceMock = {
    logout: vi.fn(),
  };

  const userServiceMock = {
    clear: vi.fn(),
    email: signal('john@doe.com'),
  };

  const dashboardServiceMock = {
    getTotals: vi.fn(),
  };

  const createComponent = (): MainLayoutComponent =>
    TestBed.runInInjectionContext(() => new MainLayoutComponent());

  beforeEach(() => {
    vi.clearAllMocks();
    userServiceMock.email.set('john@doe.com');

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthSessionLifecycleService, useValue: authSessionLifecycleServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: DashboardService, useValue: dashboardServiceMock },
      ],
    });
  });

  it('exposes active user email and falls back to guest', () => {
    const component = createComponent();

    expect(component.activeEmail()).toBe('john@doe.com');

    userServiceMock.email.set('');

    expect(component.activeEmail()).toBe('guest@bookmarks.app');
  });

  it('delegates logout to auth session lifecycle service', () => {
    const component = createComponent();

    component.onLogout();

    expect(authSessionLifecycleServiceMock.logout).toHaveBeenCalledTimes(1);
  });

  it('falls back to first tooltip key when random picker returns undefined', () => {
    vi.spyOn(randomUtils, 'pickRandomItem').mockReturnValue(undefined);

    const component = createComponent() as unknown as {
      logoutTooltipKey: string;
    };

    expect(component.logoutTooltipKey).toBe('common.actions.tooltips.logout.option_1');
  });

  it('loads dashboard totals on init', () => {
    const mockTotals: IDashboardTotals = {
      totalLinks: 42,
      totalGroups: 12,
    };

    dashboardServiceMock.getTotals.mockReturnValue(of(mockTotals));

    const component = createComponent();
    component.ngOnInit();

    expect(dashboardServiceMock.getTotals).toHaveBeenCalledTimes(1);
    expect(component.totals()).toEqual(mockTotals);
    expect(component.isLoadingTotals()).toBe(false);
    expect(component.totalsError()).toBe(false);
  });

  it('sets loading state while fetching totals', () => {
    dashboardServiceMock.getTotals.mockReturnValue(of({ totalLinks: 0, totalGroups: 0 }));

    const component = createComponent();

    expect(component.isLoadingTotals()).toBe(false);

    component.ngOnInit();

    expect(component.isLoadingTotals()).toBe(false);
  });

  it('sets error state when loading totals fails', () => {
    dashboardServiceMock.getTotals.mockReturnValue(throwError(() => new Error('Network error')));

    const component = createComponent();
    component.ngOnInit();

    expect(dashboardServiceMock.getTotals).toHaveBeenCalledTimes(1);
    expect(component.totalsError()).toBe(true);
    expect(component.isLoadingTotals()).toBe(false);
    expect(component.totals()).toBeNull();
  });

  it('handles empty totals from backend', () => {
    const mockTotals: IDashboardTotals = {
      totalLinks: 0,
      totalGroups: 0,
    };

    dashboardServiceMock.getTotals.mockReturnValue(of(mockTotals));

    const component = createComponent();
    component.ngOnInit();

    expect(component.totals()).toEqual(mockTotals);
    expect(component.totals()?.totalLinks).toBe(0);
    expect(component.totals()?.totalGroups).toBe(0);
  });
});
