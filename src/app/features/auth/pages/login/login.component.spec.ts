import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { NotificationService } from '@libs/ui';
import { of } from 'rxjs';

import { ROUTES_CONSTANTS } from '@app/constants/routes.constants';
import { AuthHttpHelper } from '@app/features/auth/helpers';
import { LOGIN_KEYS } from '../../constants/login-keys.constants';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  const authHttpHelperMock = {
    login: vi.fn(),
  };

  const routerMock = {
    navigate: vi.fn().mockResolvedValue(true),
  };

  const notificationMock = {
    success: vi.fn(),
    error: vi.fn(),
  };

  const translocoMock = {
    translate: vi.fn((key: string) => `t:${key}`),
  };

  const createComponent = (): LoginComponent =>
    TestBed.runInInjectionContext(() => new LoginComponent());

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthHttpHelper, useValue: authHttpHelperMock },
        { provide: Router, useValue: routerMock },
        { provide: NotificationService, useValue: notificationMock },
        { provide: TranslocoService, useValue: translocoMock },
      ],
    });
  });

  it('creates default form config as valid with expected defaults', () => {
    const component = createComponent();

    expect(component.loginForm.value).toEqual({
      email: 'one@test.com',
      password: '123456',
      rememberMe: false,
    });
    expect(component.loginForm.valid).toBe(true);
  });

  it('marks form as touched and skips login when form is invalid', () => {
    const component = createComponent();
    const markAllAsTouchedSpy = vi.spyOn(component.loginForm, 'markAllAsTouched');

    component.loginForm.patchValue({
      email: 'invalid-email',
      password: '123',
    });

    component.onSubmit();

    expect(component.loginForm.invalid).toBe(true);
    expect(markAllAsTouchedSpy).toHaveBeenCalledTimes(1);
    expect(authHttpHelperMock.login).not.toHaveBeenCalled();
  });

  it('logs in, shows success notification and navigates to dashboard when tokens are present', () => {
    const component = createComponent();

    authHttpHelperMock.login.mockReturnValue(
      of({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      }),
    );

    component.loginForm.patchValue({
      email: 'john@doe.com',
      password: 'secret123',
      rememberMe: true,
    });

    component.onSubmit();

    expect(authHttpHelperMock.login).toHaveBeenCalledWith({
      email: 'john@doe.com',
      password: 'secret123',
      rememberMe: true,
    });
    expect(notificationMock.success).toHaveBeenCalledWith(`t:${LOGIN_KEYS.MESSAGES.SUCCESS}`);
    expect(routerMock.navigate).toHaveBeenCalledWith([ROUTES_CONSTANTS.DASHBOARD]);
  });

  it('shows failed notification when response has no tokens', () => {
    const component = createComponent();

    authHttpHelperMock.login.mockReturnValue(
      of({
        accessToken: '',
        refreshToken: '',
      }),
    );

    component.onSubmit();

    expect(notificationMock.error).toHaveBeenCalledWith(`t:${LOGIN_KEYS.MESSAGES.FAILED}`);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('returns translated validation messages for email and password', () => {
    const component = createComponent();

    component.loginForm.controls.email.setValue('');
    component.loginForm.controls.email.markAsTouched();
    component.loginForm.controls.email.updateValueAndValidity();

    component.loginForm.controls.password.setValue('123');
    component.loginForm.controls.password.markAsTouched();
    component.loginForm.controls.password.updateValueAndValidity();

    expect(component.emailErrorMessage).toBe('t:common.validation.required');
    expect(component.passwordErrorMessage).toBe('t:common.validation.min_length');
  });

  it('selects a random submit button tooltip key from the configured list', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.41);

    const component = createComponent();

    const expectedIndex = Math.floor(0.41 * LOGIN_KEYS.TOOLTIPS.SUBMIT_BUTTON_OPTIONS.length);
    expect(component.submitButtonTooltipKey).toBe(
      LOGIN_KEYS.TOOLTIPS.SUBMIT_BUTTON_OPTIONS[expectedIndex],
    );
  });
});
