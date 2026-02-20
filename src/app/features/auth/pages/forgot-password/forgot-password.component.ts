import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { provideTranslocoScope, TranslocoService } from '@jsverse/transloco';

import { COMMON_KEYS } from '@app/constants/i18n-keys.constants';
import { ICONS_CONSTANTS } from '@app/constants/icons.constants';
import { PATTERNS_CONSTANTS } from '@app/constants/pattern.constants';
import { ROUTES_CONSTANTS } from '@app/constants/routes.constants';
import { VALIDATION_KEYS_CONSTANTS } from '@app/constants/validation.constants';
import { DisableOnLoadingDirective } from '@app/core/directives/disable-on-loading.directive';
import { I18nDirective } from '@app/core/i18n';
import { AUTH_FORM_KEYS } from '@app/features/auth/constants/auth-form-keys.constants';
import { FORGOT_PASSWORD_KEYS } from '@app/features/auth/constants/forgot-password-keys.constants';
import { IForgotPasswordForm } from '@app/features/auth/interfaces/auth.interfaces';
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
  InputTextWrapperComponent,
} from '@libs/wrappers';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
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
    ButtonWrapperComponent,
  ],
})
export class ForgotPasswordComponent extends BaseDirective {
  public readonly icons: typeof ICONS_CONSTANTS = ICONS_CONSTANTS;
  public readonly i18nKeys: typeof FORGOT_PASSWORD_KEYS = FORGOT_PASSWORD_KEYS;
  public readonly routes: { readonly LOGIN: typeof ROUTES_CONSTANTS.AUTH.LOGIN } = {
    LOGIN: ROUTES_CONSTANTS.AUTH.LOGIN,
  };

  public readonly EButtonWrapperVariant: typeof EButtonWrapperVariant = EButtonWrapperVariant;
  public readonly EPageLayout: typeof EPageLayout = EPageLayout;
  public readonly ESpacing: typeof ESpacing = ESpacing;
  public readonly ESurfaceVariant: typeof ESurfaceVariant = ESurfaceVariant;

  public readonly forgotPasswordForm: FormGroup<TFormGroupType<IForgotPasswordForm>> =
    new FormGroup<TFormGroupType<IForgotPasswordForm>>({
      email: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email,
          Validators.pattern(PATTERNS_CONSTANTS.EMAIL),
        ],
      }),
    });

  public readonly submitButtonTooltipKey: (typeof FORGOT_PASSWORD_KEYS.TOOLTIPS.SUBMIT_BUTTON_OPTIONS)[number] =
    pickRandomItem(FORGOT_PASSWORD_KEYS.TOOLTIPS.SUBMIT_BUTTON_OPTIONS) ??
    FORGOT_PASSWORD_KEYS.TOOLTIPS.SUBMIT_BUTTON_OPTIONS[0];

  private readonly _translocoService: TranslocoService = inject(TranslocoService);
  private readonly _notification: NotificationService = inject(NotificationService);
  private readonly _router: Router = inject(Router);

  public get emailConfig(): IInputTextWrapperConfig {
    return {
      label: this._translocoService.translate(AUTH_FORM_KEYS.EMAIL.LABEL),
      tooltip: this._translocoService.translate(AUTH_FORM_KEYS.EMAIL.LABEL),
      svgIcon: ICONS_CONSTANTS.AUTH.EMAIL_INPUT,
      placeholder: this._translocoService.translate(AUTH_FORM_KEYS.EMAIL.PLACEHOLDER),
      type: EInputTextWrapperType.EMAIL,
      required: this.forgotPasswordForm.controls.email.hasValidator(Validators.required),
    };
  }

  public get emailErrorMessage(): string {
    const control = this.forgotPasswordForm.controls.email;

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

  public onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this._notification.success(
      this._translocoService.translate(FORGOT_PASSWORD_KEYS.MESSAGES.SUCCESS),
    );
    void this._router.navigate([this.routes.LOGIN]);
  }

  private _hasVisibleError(control: FormControl<string>): boolean {
    return control.invalid && (control.touched || control.dirty);
  }
}
