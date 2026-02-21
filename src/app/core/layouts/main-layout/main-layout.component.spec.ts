import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuthSessionLifecycleService } from '@app/core/services/auth-session-lifecycle.service';
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

  const createComponent = (): MainLayoutComponent =>
    TestBed.runInInjectionContext(() => new MainLayoutComponent());

  beforeEach(() => {
    vi.clearAllMocks();
    userServiceMock.email.set('john@doe.com');

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthSessionLifecycleService, useValue: authSessionLifecycleServiceMock },
        { provide: UserService, useValue: userServiceMock },
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
});
