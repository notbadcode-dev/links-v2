import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

import { ROUTES_CONSTANTS } from '@app/constants/routes.constants';
import { AUTH_FORM_KEYS } from '@app/features/auth/constants/auth-form-keys.constants';
import { FORGOT_PASSWORD_KEYS } from '@app/features/auth/constants/forgot-password-keys.constants';
import * as randomUtils from '@app/shared/utils/random.utils';

import { NotificationService } from '@libs/components';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  const routerMock = {
    navigate: vi.fn().mockResolvedValue(true),
  };

  const notificationMock = {
    success: vi.fn(),
  };

  const translocoMock = {
    translate: vi.fn((key: string) => `t:${key}`),
  };

  const createComponent = (): ForgotPasswordComponent =>
    TestBed.runInInjectionContext(() => new ForgotPasswordComponent());

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: NotificationService, useValue: notificationMock },
        { provide: TranslocoService, useValue: translocoMock },
      ],
    });
  });

  it('creates form with email control as invalid by default', () => {
    const component = createComponent();

    expect(component.forgotPasswordForm.value).toEqual({
      email: '',
    });
    expect(component.forgotPasswordForm.valid).toBe(false);
  });

  it('marks form as touched and skips submit when form is invalid', () => {
    const component = createComponent();
    const markAllAsTouchedSpy = vi.spyOn(component.forgotPasswordForm, 'markAllAsTouched');

    component.forgotPasswordForm.patchValue({
      email: 'invalid-email',
    });

    component.onSubmit();

    expect(component.forgotPasswordForm.invalid).toBe(true);
    expect(markAllAsTouchedSpy).toHaveBeenCalledTimes(1);
    expect(notificationMock.success).not.toHaveBeenCalled();
  });

  it('shows success notification and navigates to login when form is valid', () => {
    const component = createComponent();

    component.forgotPasswordForm.patchValue({
      email: 'john@doe.com',
    });

    component.onSubmit();

    expect(notificationMock.success).toHaveBeenCalledWith(
      `t:${FORGOT_PASSWORD_KEYS.MESSAGES.SUCCESS}`,
    );
    expect(routerMock.navigate).toHaveBeenCalledWith([ROUTES_CONSTANTS.AUTH.LOGIN]);
  });

  it('returns translated validation messages for email', () => {
    const component = createComponent();

    expect(component.emailErrorMessage).toBe('');

    component.forgotPasswordForm.controls.email.setValue('');
    component.forgotPasswordForm.controls.email.markAsTouched();
    component.forgotPasswordForm.controls.email.updateValueAndValidity();

    expect(component.emailErrorMessage).toBe('t:common.validation.required');
  });

  it('returns invalid email message when email format is incorrect', () => {
    const component = createComponent();

    component.forgotPasswordForm.controls.email.setValue('invalid-email');
    component.forgotPasswordForm.controls.email.markAsTouched();
    component.forgotPasswordForm.controls.email.updateValueAndValidity();

    expect(component.emailErrorMessage).toBe('t:common.validation.invalid_email');
  });

  it('returns invalid email message when only pattern validation fails', () => {
    const component = createComponent();

    component.forgotPasswordForm.controls.email.setErrors({ pattern: true });
    component.forgotPasswordForm.controls.email.markAsTouched();

    expect(component.emailErrorMessage).toBe('t:common.validation.invalid_email');
  });

  it('returns empty email message for unknown errors', () => {
    const component = createComponent();

    component.forgotPasswordForm.controls.email.setErrors({ custom: true });
    component.forgotPasswordForm.controls.email.markAsTouched();

    expect(component.emailErrorMessage).toBe('');
  });

  it('builds translated email input config', () => {
    const component = createComponent();

    expect(component.emailConfig.label).toBe(`t:${AUTH_FORM_KEYS.EMAIL.LABEL}`);
    expect(component.emailConfig.tooltip).toBe(`t:${AUTH_FORM_KEYS.EMAIL.LABEL}`);
  });

  it('selects a random submit button tooltip key from the configured list', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.41);

    const component = createComponent();

    const expectedIndex = Math.floor(
      0.41 * FORGOT_PASSWORD_KEYS.TOOLTIPS.SUBMIT_BUTTON_OPTIONS.length,
    );
    expect(component.submitButtonTooltipKey).toBe(
      FORGOT_PASSWORD_KEYS.TOOLTIPS.SUBMIT_BUTTON_OPTIONS[expectedIndex],
    );
  });

  it('falls back to first submit tooltip key when random picker returns undefined', () => {
    vi.spyOn(randomUtils, 'pickRandomItem').mockReturnValue(undefined);

    const component = createComponent();

    expect(component.submitButtonTooltipKey).toBe(
      FORGOT_PASSWORD_KEYS.TOOLTIPS.SUBMIT_BUTTON_OPTIONS[0],
    );
  });
});
