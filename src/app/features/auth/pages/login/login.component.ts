import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { provideTranslocoScope, TranslocoService } from '@jsverse/transloco';
import { tap } from 'rxjs';

import { LoginResponse } from '@api/auth';

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
import { SessionService } from '@app/core/services/session.service';
import { UserService } from '@app/core/services/user.service';
import { AUTH_FORM_KEYS } from '@app/features/auth/constants/auth-form-keys.constants';
import { LOGIN_KEYS } from '@app/features/auth/constants/login-keys.constants';
import { AuthHttpHelper } from '@app/features/auth/helpers';
import { ILoginForm } from '@app/features/auth/interfaces/auth.interfaces';
import { pickRandomItem } from '@app/shared/utils/random.utils';

import {
  FormContainerComponent,
  FormRowComponent,
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
  EAlign,
  EButtonWrapperVariant,
  EInputTextWrapperType,
  EPageLayout,
  ESpacing,
  ESurfaceVariant,
} from '@libs/enums';
import { TFormGroupType } from '@libs/types';
import { createKeys } from '@libs/utils';
import {
  ButtonWrapperComponent,
  CheckboxWrapperComponent,
  IInputTextWrapperConfig,
  InputPasswordWrapperComponent,
  InputTextWrapperComponent,
} from '@libs/wrappers';

import { LOGIN_CONSTANTS } from '../../constants/login.constants';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
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
    FormRowComponent,
    InlineTextComponent,
    LinkComponent,

    ButtonWrapperComponent,
    CheckboxWrapperComponent,
    InputPasswordWrapperComponent,
    InputTextWrapperComponent,
  ],
})
export class LoginComponent extends BaseDirective {
  public readonly constants: typeof LOGIN_CONSTANTS = LOGIN_CONSTANTS;
  public readonly icons: typeof ICONS_CONSTANTS = ICONS_CONSTANTS;
  public readonly i18nKeys: typeof LOGIN_KEYS = LOGIN_KEYS;
  public readonly routes: Readonly<{
    SIGNUP: string;
    FORGOT_PASSWORD: string;
    DASHBOARD: string;
  }> = {
    SIGNUP: ROUTES_CONSTANTS.AUTH.SIGNUP,
    FORGOT_PASSWORD: ROUTES_CONSTANTS.AUTH.FORGOT_PASSWORD,
    DASHBOARD: ROUTES_CONSTANTS.DASHBOARD,
  };

  public readonly EButtonWrapperVariant: typeof EButtonWrapperVariant = EButtonWrapperVariant;
  public readonly EAlign: typeof EAlign = EAlign;
  public readonly EPageLayout: typeof EPageLayout = EPageLayout;
  public readonly ESpacing: typeof ESpacing = ESpacing;
  public readonly ESurfaceVariant: typeof ESurfaceVariant = ESurfaceVariant;

  public readonly loginFormKeys: Record<keyof ILoginForm, keyof ILoginForm> = createKeys(
    this.constants.FORM.SCHEMA,
  );

  public readonly loginForm: FormGroup<TFormGroupType<ILoginForm>> = this._getFormConfig();
  public readonly submitButtonTooltipKey: (typeof LOGIN_KEYS.TOOLTIPS.SUBMIT_BUTTON_OPTIONS)[number] =
    pickRandomItem(LOGIN_KEYS.TOOLTIPS.SUBMIT_BUTTON_OPTIONS) ??
    LOGIN_KEYS.TOOLTIPS.SUBMIT_BUTTON_OPTIONS[0];

  private readonly _authHttpHelper: AuthHttpHelper = inject(AuthHttpHelper);
  private readonly _router: Router = inject(Router);
  private readonly _notification: NotificationService = inject(NotificationService);
  private readonly _translocoService: TranslocoService = inject(TranslocoService);
  private readonly _sessionService: SessionService = inject(SessionService);
  private readonly _userService: UserService = inject(UserService);

  public get emailConfig(): IInputTextWrapperConfig {
    return {
      label: this._translocoService.translate(AUTH_FORM_KEYS.EMAIL.LABEL),
      tooltip: this._translocoService.translate(AUTH_FORM_KEYS.EMAIL.LABEL),
      svgIcon: ICONS_CONSTANTS.AUTH.EMAIL_INPUT,
      placeholder: this._translocoService.translate(AUTH_FORM_KEYS.EMAIL.PLACEHOLDER),
      type: EInputTextWrapperType.EMAIL,
      required: this.loginForm.controls.email.hasValidator(Validators.required),
    };
  }

  public get passwordConfig(): IInputTextWrapperConfig {
    return {
      label: this._translocoService.translate(AUTH_FORM_KEYS.PASSWORD.LABEL),
      tooltip: this._translocoService.translate(AUTH_FORM_KEYS.PASSWORD.LABEL),
      svgIcon: ICONS_CONSTANTS.AUTH.PASSWORD_INPUT,
      placeholder: this._translocoService.translate(AUTH_FORM_KEYS.PASSWORD.PLACEHOLDER),
      required: this.loginForm.controls.password.hasValidator(Validators.required),
    };
  }

  public get emailErrorMessage(): string {
    const control = this.loginForm.controls.email;
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
    const control = this.loginForm.controls.password;
    const emailControl = this.loginForm.controls.email;

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

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formData = this.loginForm.getRawValue();

    this._authHttpHelper
      .login(formData)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((response: LoginResponse) => {
          if (response.accessToken && response.refreshToken) {
            this._sessionService.setTokens(response.accessToken, response.refreshToken);
            this._userService.setUser({ email: formData.email });
            this._notification.success(
              this._translocoService.translate(LOGIN_KEYS.MESSAGES.SUCCESS),
            );
            void this._router.navigate([this.routes.DASHBOARD]);
          } else {
            this._notification.error(this._translocoService.translate(LOGIN_KEYS.MESSAGES.FAILED));
          }
        }),
      )
      .subscribe();
  }

  private _getFormConfig(): FormGroup<TFormGroupType<ILoginForm>> {
    return new FormGroup<TFormGroupType<ILoginForm>>({
      email: new FormControl(LOGIN_CONSTANTS.FORM.DEFAULT_VALUES.EMAIL, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email,
          Validators.pattern(PATTERNS_CONSTANTS.EMAIL),
        ],
      }),
      password: new FormControl(LOGIN_CONSTANTS.FORM.DEFAULT_VALUES.PASSWORD, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(VALIDATION_CONSTANTS.MIN_PASSWORD_LENGTH),
        ],
      }),
      rememberMe: new FormControl(LOGIN_CONSTANTS.FORM.DEFAULT_VALUES.REMEMBER_ME, {
        nonNullable: true,
      }),
    });
  }

  private _hasVisibleError(control: FormControl<string | boolean>): boolean {
    return control.invalid && (control.touched || control.dirty);
  }
}
