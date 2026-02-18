import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { I18nDirective } from '@app/core/i18n';
import { TranslocoService, provideTranslocoScope } from '@jsverse/transloco';

import { ICONS_CONSTANTS } from '@app/constants/icons.constants';
import { COMMON_KEYS } from '@app/constants/i18n-keys.constants';
import { PATTERNS_CONSTANTS } from '@app/constants/pattern.constants';
import { VALIDATION_CONSTANTS, VALIDATION_KEYS_CONSTANTS } from '@app/constants/validation.constants';
import { DisableOnLoadingDirective } from '@app/core/directives/disable-on-loading.directive';
import { AUTH_FORM_KEYS } from '@app/features/auth/constants/auth-form-keys.constants';
import { ISignupForm } from '@app/features/auth/interfaces/auth.interfaces';
import {
  BaseDirective,
  ButtonWrapperComponent,
  CardWrapperComponent,
  EButtonWrapperVariant,
  EInputTextWrapperType,
  IInputTextWrapperConfig,
  InputPasswordWrapperComponent,
  InputTextWrapperComponent,
  TFormGroupType,
  ViewportCenterComponent,
} from '@libs/ui';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslocoScope('auth')],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    I18nDirective,
    CardWrapperComponent,
    ViewportCenterComponent,
    InputTextWrapperComponent,
    InputPasswordWrapperComponent,
    ButtonWrapperComponent,
    DisableOnLoadingDirective,
  ],
})
export class SignupComponent extends BaseDirective {
  public readonly icons: typeof ICONS_CONSTANTS = ICONS_CONSTANTS;
  public readonly EButtonWrapperVariant: typeof EButtonWrapperVariant = EButtonWrapperVariant;

  public readonly signupForm: FormGroup<TFormGroupType<ISignupForm>> = new FormGroup<
    TFormGroupType<ISignupForm>
  >({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(PATTERNS_CONSTANTS.EMAIL)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(VALIDATION_CONSTANTS.MIN_PASSWORD_LENGTH),
      ],
    }),
  });

  private readonly _translocoService: TranslocoService = inject(TranslocoService);

  public get nameConfig(): IInputTextWrapperConfig {
    return {
      label: this._translocoService.translate(AUTH_FORM_KEYS.NAME.LABEL),
      icon: ICONS_CONSTANTS.AUTH.USER,
      placeholder: this._translocoService.translate(AUTH_FORM_KEYS.NAME.PLACEHOLDER),
      required: true,
    };
  }

  public get emailConfig(): IInputTextWrapperConfig {
    return {
      label: this._translocoService.translate(AUTH_FORM_KEYS.EMAIL.LABEL),
      icon: ICONS_CONSTANTS.AUTH.EMAIL,
      placeholder: this._translocoService.translate(AUTH_FORM_KEYS.EMAIL.PLACEHOLDER),
      type: EInputTextWrapperType.EMAIL,
      required: true,
    };
  }

  public get passwordConfig(): IInputTextWrapperConfig {
    return {
      label: this._translocoService.translate(AUTH_FORM_KEYS.PASSWORD.LABEL),
      icon: ICONS_CONSTANTS.AUTH.PASSWORD,
      placeholder: this._translocoService.translate(AUTH_FORM_KEYS.PASSWORD.PLACEHOLDER),
      required: true,
    };
  }

  public get nameErrorMessage(): string {
    const control = this.signupForm.get('name');
    if (control?.hasError(VALIDATION_KEYS_CONSTANTS.REQUIRED)) {
      return this._translocoService.translate(COMMON_KEYS.VALIDATION.REQUIRED);
    }
    return '';
  }

  public get emailErrorMessage(): string {
    const control = this.signupForm.get('email');

    if (control?.hasError(VALIDATION_KEYS_CONSTANTS.REQUIRED)) {
      return this._translocoService.translate(COMMON_KEYS.VALIDATION.REQUIRED);
    }

    if (control?.hasError(VALIDATION_KEYS_CONSTANTS.PATTERN)) {
      return this._translocoService.translate(COMMON_KEYS.VALIDATION.INVALID_EMAIL);
    }
    return '';
  }

  public get passwordErrorMessage(): string {
    const control = this.signupForm.get('password');

    if (control?.hasError(VALIDATION_KEYS_CONSTANTS.REQUIRED)) {
      return this._translocoService.translate(COMMON_KEYS.VALIDATION.REQUIRED);
    }

    if (control?.hasError(VALIDATION_KEYS_CONSTANTS.MIN_LENGTH)) {
      return this._translocoService.translate(COMMON_KEYS.VALIDATION.MIN_LENGTH);
    }

    return '';
  }

  public onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
    }
  }
}
