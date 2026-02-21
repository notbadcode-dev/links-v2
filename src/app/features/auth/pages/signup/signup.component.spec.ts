import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { of } from 'rxjs';

import { ROUTES_CONSTANTS } from '@app/constants/routes.constants';
import { AUTH_FORM_KEYS } from '@app/features/auth/constants/auth-form-keys.constants';
import { AuthHttpHelper } from '@app/features/auth/helpers';
import * as randomUtils from '@app/shared/utils/random.utils';

import { NotificationService } from '@libs/components';

import { SignupComponent } from './signup.component';
import { SIGNUP_KEYS } from '../../constants/signup-keys.constants';

describe('SignupComponent', () => {
  const authHttpHelperMock = {
    register: vi.fn(),
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

  const createComponent = (): SignupComponent =>
    TestBed.runInInjectionContext(() => new SignupComponent());

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

  it('marks form as touched and skips submit when form is invalid', () => {
    const component = createComponent();
    const markAllAsTouchedSpy = vi.spyOn(component.signupForm, 'markAllAsTouched');

    component.signupForm.patchValue({
      email: 'invalid-email',
      password: '123',
      confirmPassword: '123',
    });

    component.onSubmit();

    expect(component.signupForm.invalid).toBe(true);
    expect(markAllAsTouchedSpy).toHaveBeenCalledTimes(1);
    expect(authHttpHelperMock.register).not.toHaveBeenCalled();
  });

  it('submits form, notifies success and navigates on successful register', () => {
    const component = createComponent();

    authHttpHelperMock.register.mockReturnValue(of(true));

    component.signupForm.patchValue({
      email: 'john@doe.com',
      password: 'secret123',
      confirmPassword: 'secret123',
    });

    component.onSubmit();

    expect(authHttpHelperMock.register).toHaveBeenCalledWith({
      email: 'john@doe.com',
      password: 'secret123',
      confirmPassword: 'secret123',
    });
    expect(notificationMock.success).toHaveBeenCalledWith(`t:${SIGNUP_KEYS.MESSAGES.SUCCESS}`);
    expect(routerMock.navigate).toHaveBeenCalledWith([ROUTES_CONSTANTS.AUTH.LOGIN]);
  });

  it('notifies error when register response is false', () => {
    const component = createComponent();

    authHttpHelperMock.register.mockReturnValue(of(false));

    component.signupForm.patchValue({
      email: 'john@doe.com',
      password: 'secret123',
      confirmPassword: 'secret123',
    });

    component.onSubmit();

    expect(notificationMock.error).toHaveBeenCalledWith(`t:${SIGNUP_KEYS.MESSAGES.FAILED}`);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('returns password mismatch validation message when passwords differ', () => {
    const component = createComponent();

    component.signupForm.patchValue({
      email: 'john@doe.com',
      password: 'secret123',
      confirmPassword: 'different123',
    });
    component.signupForm.controls.confirmPassword.markAsTouched();
    component.signupForm.updateValueAndValidity();

    expect(component.confirmPasswordErrorMessage).toBe('t:common.validation.password_mismatch');
  });

  it('builds translated input configs', () => {
    const component = createComponent();

    expect(component.emailConfig.label).toBe(`t:${AUTH_FORM_KEYS.EMAIL.LABEL}`);
    expect(component.passwordConfig.label).toBe(`t:${AUTH_FORM_KEYS.PASSWORD.LABEL}`);
    expect(component.confirmPasswordConfig.label).toBe(
      `t:${AUTH_FORM_KEYS.CONFIRM_PASSWORD.LABEL}`,
    );
  });

  it('returns validation messages for email/password/confirm-password required cases', () => {
    const component = createComponent();

    expect(component.emailErrorMessage).toBe('');
    expect(component.confirmPasswordErrorMessage).toBe('');

    component.signupForm.controls.email.setValue('');
    component.signupForm.controls.email.markAsTouched();
    component.signupForm.controls.email.updateValueAndValidity();
    expect(component.emailErrorMessage).toBe('t:common.validation.required');

    component.signupForm.controls.email.setValue('john@doe.com');
    component.signupForm.controls.email.updateValueAndValidity();
    component.signupForm.controls.password.setValue('');
    component.signupForm.controls.password.markAsTouched();
    component.signupForm.controls.password.updateValueAndValidity();
    expect(component.passwordErrorMessage).toBe('t:common.validation.required');

    component.signupForm.controls.password.setValue('secret123');
    component.signupForm.controls.password.updateValueAndValidity();
    component.signupForm.controls.confirmPassword.setValue('');
    component.signupForm.controls.confirmPassword.markAsTouched();
    component.signupForm.controls.confirmPassword.updateValueAndValidity();
    component.signupForm.updateValueAndValidity();
    expect(component.confirmPasswordErrorMessage).toBe('t:common.validation.required');
  });

  it('returns invalid email and min length messages when values are malformed', () => {
    const component = createComponent();

    component.signupForm.controls.email.setValue('invalid-email');
    component.signupForm.controls.email.markAsTouched();
    component.signupForm.controls.email.updateValueAndValidity();
    expect(component.emailErrorMessage).toBe('t:common.validation.invalid_email');

    component.signupForm.controls.email.setValue('john@doe.com');
    component.signupForm.controls.email.updateValueAndValidity();
    component.signupForm.controls.password.setValue('123');
    component.signupForm.controls.password.markAsTouched();
    component.signupForm.controls.password.updateValueAndValidity();
    expect(component.passwordErrorMessage).toBe('t:common.validation.min_length');
  });

  it('returns invalid email when only pattern validation fails', () => {
    const component = createComponent();

    component.signupForm.controls.email.setErrors({ pattern: true });
    component.signupForm.controls.email.markAsTouched();

    expect(component.emailErrorMessage).toBe('t:common.validation.invalid_email');
  });

  it('returns empty fallback messages for unknown errors', () => {
    const component = createComponent();

    component.signupForm.controls.email.setErrors({ custom: true });
    component.signupForm.controls.email.markAsTouched();
    expect(component.emailErrorMessage).toBe('');

    component.signupForm.controls.email.setValue('john@doe.com');
    component.signupForm.controls.email.updateValueAndValidity();
    component.signupForm.controls.password.setErrors({ custom: true });
    component.signupForm.controls.password.markAsTouched();
    expect(component.passwordErrorMessage).toBe('');

    component.signupForm.controls.password.setValue('secret123');
    component.signupForm.controls.password.updateValueAndValidity();
    component.signupForm.controls.confirmPassword.setErrors({ custom: true });
    component.signupForm.controls.confirmPassword.markAsTouched();
    component.signupForm.updateValueAndValidity();
    expect(component.confirmPasswordErrorMessage).toBe('');
  });

  it('returns empty password message when email has visible error', () => {
    const component = createComponent();

    component.signupForm.controls.email.setValue('');
    component.signupForm.controls.email.markAsTouched();
    component.signupForm.controls.email.updateValueAndValidity();
    component.signupForm.controls.password.setValue('123');
    component.signupForm.controls.password.markAsTouched();
    component.signupForm.controls.password.updateValueAndValidity();

    expect(component.passwordErrorMessage).toBe('');
  });

  it('falls back to first submit tooltip key when random picker returns undefined', () => {
    vi.spyOn(randomUtils, 'pickRandomItem').mockReturnValue(undefined);

    const component = createComponent();

    expect(component.submitButtonTooltipKey).toBe(SIGNUP_KEYS.TOOLTIPS.SUBMIT_BUTTON_OPTIONS[0]);
  });
});
