import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService, provideTranslocoScope } from '@jsverse/transloco';
import { tap } from 'rxjs';

import { COMMON_KEYS } from '@app/constants/i18n-keys.constants';
import { ICONS_CONSTANTS } from '@app/constants/icons.constants';
import { PATTERNS_CONSTANTS } from '@app/constants/pattern.constants';
import { ROUTES_CONSTANTS } from '@app/constants/routes.constants';
import {
  VALIDATION_CONSTANTS,
  VALIDATION_KEYS_CONSTANTS,
} from '@app/constants/validation.constants';
import { DisableOnLoadingDirective } from '@app/core/directives/disable-on-loading.directive';
import { I18nDirective } from '@app/core/i18n';
import { AUTH_FORM_KEYS } from '@app/features/auth/constants/auth-form-keys.constants';
import { SIGNUP_KEYS } from '@app/features/auth/constants/signup-keys.constants';
import { AuthHttpHelper } from '@app/features/auth/helpers';
import { ISignupForm } from '@app/features/auth/interfaces/auth.interfaces';
import { pickRandomItem } from '@app/shared/utils/random.utils';

import {
  FormContainerComponent,
  InlineTextComponent,
  LinkComponent,
  NotificationService,
  PageComponent,
  SurfaceComponent,
  TitleComponent,
  UiPageSectionComponent,
} from '@libs/components';
import { BaseDirective } from '@libs/directives';
import {
  EButtonWrapperVariant,
  EInputTextWrapperType,
  EPageLayout,
  ESpacing,
  ESurfaceVariant,
} from '@libs/enums';
import { TFormGroupType } from '@libs/types';
import {
  ButtonWrapperComponent,
  IInputTextWrapperConfig,
  InputPasswordWrapperComponent,
  InputTextWrapperComponent,
} from '@libs/wrappers';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslocoScope('auth')],
  imports: [
    ReactiveFormsModule,
    I18nDirective,
    DisableOnLoadingDirective,
    PageComponent,
    UiPageSectionComponent,
    TitleComponent,
    SurfaceComponent,
    FormContainerComponent,
    InlineTextComponent,
    LinkComponent,
    InputTextWrapperComponent,
    InputPasswordWrapperComponent,
    ButtonWrapperComponent,
  ],
})
export class SignupComponent extends BaseDirective {
  public readonly icons: typeof ICONS_CONSTANTS = ICONS_CONSTANTS;
  public readonly i18nKeys: typeof SIGNUP_KEYS = SIGNUP_KEYS;
  public readonly routes: { readonly LOGIN: typeof ROUTES_CONSTANTS.AUTH.LOGIN } = {
    LOGIN: ROUTES_CONSTANTS.AUTH.LOGIN,
  };

  public readonly EButtonWrapperVariant: typeof EButtonWrapperVariant = EButtonWrapperVariant;
  public readonly EPageLayout: typeof EPageLayout = EPageLayout;
  public readonly ESpacing: typeof ESpacing = ESpacing;
  public readonly ESurfaceVariant: typeof ESurfaceVariant = ESurfaceVariant;

  public readonly signupForm: FormGroup<TFormGroupType<ISignupForm>> = new FormGroup<
    TFormGroupType<ISignupForm>
  >(
    {
      email: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email,
          Validators.pattern(PATTERNS_CONSTANTS.EMAIL),
        ],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(VALIDATION_CONSTANTS.MIN_PASSWORD_LENGTH),
        ],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    {
      validators: [this._passwordsMatchValidator()],
    },
  );
  public readonly submitButtonTooltipKey: (typeof SIGNUP_KEYS.TOOLTIPS.SUBMIT_BUTTON_OPTIONS)[number] =
    pickRandomItem(SIGNUP_KEYS.TOOLTIPS.SUBMIT_BUTTON_OPTIONS) ??
    SIGNUP_KEYS.TOOLTIPS.SUBMIT_BUTTON_OPTIONS[0];

  private readonly _translocoService: TranslocoService = inject(TranslocoService);
  private readonly _authHttpHelper: AuthHttpHelper = inject(AuthHttpHelper);
  private readonly _router: Router = inject(Router);
  private readonly _notification: NotificationService = inject(NotificationService);

  public get emailConfig(): IInputTextWrapperConfig {
    return {
      label: this._translocoService.translate(AUTH_FORM_KEYS.EMAIL.LABEL),
      svgIcon: ICONS_CONSTANTS.AUTH.EMAIL_INPUT,
      placeholder: this._translocoService.translate(AUTH_FORM_KEYS.EMAIL.PLACEHOLDER),
      type: EInputTextWrapperType.EMAIL,
      required: this.signupForm.controls.email.hasValidator(Validators.required),
    };
  }

  public get passwordConfig(): IInputTextWrapperConfig {
    return {
      label: this._translocoService.translate(AUTH_FORM_KEYS.PASSWORD.LABEL),
      svgIcon: ICONS_CONSTANTS.AUTH.PASSWORD_INPUT,
      placeholder: this._translocoService.translate(AUTH_FORM_KEYS.PASSWORD.PLACEHOLDER),
      required: this.signupForm.controls.password.hasValidator(Validators.required),
    };
  }

  public get confirmPasswordConfig(): IInputTextWrapperConfig {
    return {
      label: this._translocoService.translate(AUTH_FORM_KEYS.CONFIRM_PASSWORD.LABEL),
      svgIcon: ICONS_CONSTANTS.AUTH.PASSWORD_INPUT,
      placeholder: this._translocoService.translate(AUTH_FORM_KEYS.CONFIRM_PASSWORD.PLACEHOLDER),
      required: this.signupForm.controls.confirmPassword.hasValidator(Validators.required),
    };
  }

  public get emailErrorMessage(): string {
    const control = this.signupForm.controls.email;

    if (!this._hasVisibleError(control)) {
      return '';
    }

    if (control.hasError(VALIDATION_KEYS_CONSTANTS.REQUIRED)) {
      return this._translocoService.translate(COMMON_KEYS.VALIDATION.REQUIRED);
    }

    if (
      control.hasError(VALIDATION_KEYS_CONSTANTS.EMAIL) ||
      control.hasError(VALIDATION_KEYS_CONSTANTS.PATTERN)
    ) {
      return this._translocoService.translate(COMMON_KEYS.VALIDATION.INVALID_EMAIL);
    }
    return '';
  }

  public get passwordErrorMessage(): string {
    const control = this.signupForm.controls.password;
    const emailControl = this.signupForm.controls.email;

    if (this._hasVisibleError(emailControl) || !this._hasVisibleError(control)) {
      return '';
    }

    if (control.hasError(VALIDATION_KEYS_CONSTANTS.REQUIRED)) {
      return this._translocoService.translate(COMMON_KEYS.VALIDATION.REQUIRED);
    }

    if (control.hasError(VALIDATION_KEYS_CONSTANTS.MIN_LENGTH)) {
      return this._translocoService.translate(COMMON_KEYS.VALIDATION.MIN_LENGTH);
    }

    return '';
  }

  public get confirmPasswordErrorMessage(): string {
    const control = this.signupForm.controls.confirmPassword;
    const emailControl = this.signupForm.controls.email;
    const passwordControl = this.signupForm.controls.password;
    const hasPasswordMismatch = this.signupForm.hasError(
      VALIDATION_KEYS_CONSTANTS.PASSWORD_MISMATCH,
    );
    const hasInteractedWithConfirmPassword = control.touched || control.dirty;

    if (
      this._hasVisibleError(emailControl) ||
      this._hasVisibleError(passwordControl) ||
      !(this._hasVisibleError(control) || (hasPasswordMismatch && hasInteractedWithConfirmPassword))
    ) {
      return '';
    }

    if (control.hasError(VALIDATION_KEYS_CONSTANTS.REQUIRED)) {
      return this._translocoService.translate(COMMON_KEYS.VALIDATION.REQUIRED);
    }

    if (hasPasswordMismatch) {
      return this._translocoService.translate(COMMON_KEYS.VALIDATION.PASSWORD_MISMATCH);
    }

    return '';
  }

  public onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const formData = this.signupForm.getRawValue();

    this._authHttpHelper
      .register(formData)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((isRegistered: boolean) => {
          if (isRegistered) {
            this._notification.success(
              this._translocoService.translate(SIGNUP_KEYS.MESSAGES.SUCCESS),
            );
            void this._router.navigate([this.routes.LOGIN]);
          } else {
            this._notification.error(this._translocoService.translate(SIGNUP_KEYS.MESSAGES.FAILED));
          }
        }),
      )
      .subscribe();
  }

  private _hasVisibleError(control: FormControl<string>): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  private _passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.get('password') as FormControl<string> | null;
      const confirmPasswordControl = control.get('confirmPassword') as FormControl<string> | null;
      const password = passwordControl?.value;
      const confirmPassword = confirmPasswordControl?.value;

      if (!password || !confirmPassword) {
        return null;
      }

      return password === confirmPassword
        ? null
        : { [VALIDATION_KEYS_CONSTANTS.PASSWORD_MISMATCH]: true };
    };
  }
}
