import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nDirective } from '@app/core/i18n';
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
import { AUTH_FORM_KEYS } from '@app/features/auth/constants/auth-form-keys.constants';
import { LOGIN_KEYS } from '@app/features/auth/constants/login-keys.constants';
import { AuthHttpHelper } from '@app/features/auth/helpers';
import { ILoginForm } from '@app/features/auth/interfaces/auth.interfaces';
import {
  BaseDirective,
  ButtonWrapperComponent,
  CheckboxWrapperComponent,
  createKeys,
  EAlign,
  EButtonWrapperVariant,
  EInputTextWrapperType,
  EPageLayout,
  ESpacing,
  ESurfaceVariant,
  FormContainerComponent,
  FormRowComponent,
  IconCircleComponent,
  IconWrapperComponent,
  IInputTextWrapperConfig,
  InlineTextComponent,
  InputPasswordWrapperComponent,
  InputTextWrapperComponent,
  LinkComponent,
  NotificationService,
  PageComponent,
  StackComponent,
  SurfaceComponent,
  TFormGroupType,
  TitleComponent,
  UiPageSectionComponent,
} from '@libs/ui';

import { LOGIN_CONSTANTS } from '../../constants/login.constants';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslocoScope('auth')],
  imports: [
    ReactiveFormsModule,
    I18nDirective,
    DisableOnLoadingDirective,

    PageComponent,
    UiPageSectionComponent,
    StackComponent,
    IconCircleComponent,
    TitleComponent,
    SurfaceComponent,
    FormContainerComponent,
    FormRowComponent,
    InlineTextComponent,
    LinkComponent,

    IconWrapperComponent,
    ButtonWrapperComponent,
    CheckboxWrapperComponent,
    InputPasswordWrapperComponent,
    InputTextWrapperComponent,
  ],
})
export class LoginComponent extends BaseDirective {
  public readonly icons: typeof ICONS_CONSTANTS = ICONS_CONSTANTS;
  public readonly constants: typeof LOGIN_CONSTANTS = LOGIN_CONSTANTS;
  public readonly i18nKeys: typeof LOGIN_KEYS = LOGIN_KEYS;
  public readonly routes = {
    SIGNUP: ROUTES_CONSTANTS.AUTH.SIGNUP,
    FORGOT_PASSWORD: ROUTES_CONSTANTS.AUTH.FORGOT_PASSWORD,
    DASHBOARD: ROUTES_CONSTANTS.DASHBOARD,
  } as const;

  public readonly EButtonWrapperVariant: typeof EButtonWrapperVariant = EButtonWrapperVariant;
  public readonly EPageLayout: typeof EPageLayout = EPageLayout;
  public readonly EAlign: typeof EAlign = EAlign;
  public readonly ESpacing: typeof ESpacing = ESpacing;
  public readonly ESurfaceVariant: typeof ESurfaceVariant = ESurfaceVariant;

  public readonly loginFormKeys: Record<keyof ILoginForm, keyof ILoginForm> = createKeys(
    this.constants.FORM.SCHEMA,
  );

  public readonly loginForm: FormGroup<TFormGroupType<ILoginForm>> = this._getFormConfig();

  private readonly _authHttpHelper: AuthHttpHelper = inject(AuthHttpHelper);
  private readonly _router: Router = inject(Router);
  private readonly _notification: NotificationService = inject(NotificationService);
  private readonly _translocoService: TranslocoService = inject(TranslocoService);

  public get emailConfig(): IInputTextWrapperConfig {
    return {
      label: this._translocoService.translate(AUTH_FORM_KEYS.EMAIL.LABEL),
      tooltip: this._translocoService.translate(AUTH_FORM_KEYS.EMAIL.LABEL),
      icon: ICONS_CONSTANTS.AUTH.EMAIL,
      placeholder: this._translocoService.translate(AUTH_FORM_KEYS.EMAIL.PLACEHOLDER),
      type: EInputTextWrapperType.EMAIL,
      required: true,
    };
  }

  public get passwordConfig(): IInputTextWrapperConfig {
    return {
      label: this._translocoService.translate(AUTH_FORM_KEYS.PASSWORD.LABEL),
      tooltip: this._translocoService.translate(AUTH_FORM_KEYS.PASSWORD.LABEL),
      icon: ICONS_CONSTANTS.AUTH.PASSWORD,
      placeholder: this._translocoService.translate(AUTH_FORM_KEYS.PASSWORD.PLACEHOLDER),
      required: true,
    };
  }

  public get emailErrorMessage(): string {
    const control = this.loginForm.controls.email;

    if (control.hasError(VALIDATION_KEYS_CONSTANTS.REQUIRED)) {
      return this._translocoService.translate(COMMON_KEYS.VALIDATION.REQUIRED);
    }

    if (control.hasError(VALIDATION_KEYS_CONSTANTS.PATTERN)) {
      return this._translocoService.translate(COMMON_KEYS.VALIDATION.INVALID_EMAIL);
    }
    return '';
  }

  public get passwordErrorMessage(): string {
    const control = this.loginForm.controls.password;

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
        validators: [Validators.required, Validators.pattern(PATTERNS_CONSTANTS.EMAIL)],
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
}
