import { TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';

import { AuthSessionLifecycleService } from '@app/core/services/auth-session-lifecycle.service';
import { ThemeService } from '@app/core/services/theme.service';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const authSessionLifecycleServiceMock = {
    initialize: vi.fn(),
    confirmStillHere: vi.fn(),
    isInactivityPromptOpen: vi.fn(() => false),
  };
  const themeServiceMock = {
    initialize: vi.fn(),
  };
  const createComponent = (): AppComponent =>
    TestBed.runInInjectionContext(() => new AppComponent());

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthSessionLifecycleService, useValue: authSessionLifecycleServiceMock },
        { provide: ThemeService, useValue: themeServiceMock },
      ],
    });
  });

  it('should create the app', () => {
    const app = createComponent();
    expect(app).toBeTruthy();
  });

  it('initializes theme and session lifecycle in constructor', () => {
    createComponent();

    expect(themeServiceMock.initialize).toHaveBeenCalledTimes(1);
    expect(authSessionLifecycleServiceMock.initialize).toHaveBeenCalledTimes(1);
  });

  it('returns route animation when outlet data has a string value', () => {
    const component = createComponent();
    const outlet = {
      activatedRouteData: { animation: 'auth' },
    } as RouterOutlet;

    expect(component.getRouteAnimationState(outlet)).toBe('auth');
  });

  it('returns initial route animation when outlet data has a non-string value', () => {
    const component = createComponent();
    const outlet = {
      activatedRouteData: { animation: 1 },
    } as unknown as RouterOutlet;

    expect(component.getRouteAnimationState(outlet)).toBe('initial');
  });

  it('confirms session activity when user action is triggered', () => {
    const component = createComponent();

    component.onConfirmSessionStillActive();

    expect(authSessionLifecycleServiceMock.confirmStillHere).toHaveBeenCalledTimes(1);
  });
});
