import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { I18nDirective } from '@app/core/i18n';
import { provideTranslocoScope } from '@jsverse/transloco';

import { ICONS_CONSTANTS } from '@app/constants/icons.constants';
import { PATTERNS_CONSTANTS } from '@app/constants/pattern.constants';
import { VALIDATION_KEYS_CONSTANTS } from '@app/constants/validation.constants';
import { DisableOnLoadingDirective } from '@app/core/directives/disable-on-loading.directive';
import { AUTH_CONSTANTS } from '@app/features/auth/constants/auth.constants';
import { SIGNUP_CONSTANTS } from '@app/features/auth/constants/signup.constants';
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
  public readonly nameConfig: IInputTextWrapperConfig = this._getNameConfig();
  public readonly emailConfig: IInputTextWrapperConfig = this._getEmailConfig();
  public readonly passwordConfig: IInputTextWrapperConfig = this._getPasswordConfig();

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
        Validators.minLength(AUTH_CONSTANTS.VALIDATION.MIN_PASSWORD_LENGTH),
      ],
    }),
  });

  public get nameErrorMessage(): string {
    const control = this.signupForm.get('name');
    if (control?.hasError(VALIDATION_KEYS_CONSTANTS.REQUIRED)) {
      return SIGNUP_CONSTANTS.ERROR_MESSAGES.NAME_REQUIRED;
    }
    return '';
  }

  public get emailErrorMessage(): string {
    const control = this.signupForm.get('email');

    if (control?.hasError(VALIDATION_KEYS_CONSTANTS.REQUIRED)) {
      return SIGNUP_CONSTANTS.ERROR_MESSAGES.EMAIL_REQUIRED;
    }

    if (control?.hasError(VALIDATION_KEYS_CONSTANTS.PATTERN)) {
      return SIGNUP_CONSTANTS.ERROR_MESSAGES.EMAIL_INVALID;
    }
    return '';
  }

  public get passwordErrorMessage(): string {
    const control = this.signupForm.get('password');

    if (control?.hasError(VALIDATION_KEYS_CONSTANTS.REQUIRED)) {
      return SIGNUP_CONSTANTS.ERROR_MESSAGES.PASSWORD_REQUIRED;
    }

    if (control?.hasError(VALIDATION_KEYS_CONSTANTS.MIN_LENGTH)) {
      return SIGNUP_CONSTANTS.ERROR_MESSAGES.PASSWORD_MIN_LENGTH;
    }

    return '';
  }

  public onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
    }

    // TODO: Implement signup logic
  }

  private _getNameConfig(): IInputTextWrapperConfig {
    return {
      label: SIGNUP_CONSTANTS.NAME.LABEL,
      icon: SIGNUP_CONSTANTS.NAME.ICON,
      placeholder: SIGNUP_CONSTANTS.NAME.PLACEHOLDER,
      required: true,
    };
  }

  private _getEmailConfig(): IInputTextWrapperConfig {
    return {
      label: SIGNUP_CONSTANTS.EMAIL.LABEL,
      icon: SIGNUP_CONSTANTS.EMAIL.ICON,
      placeholder: SIGNUP_CONSTANTS.EMAIL.PLACEHOLDER,
      type: EInputTextWrapperType.EMAIL,
      required: true,
    };
  }

  private _getPasswordConfig(): IInputTextWrapperConfig {
    return {
      label: SIGNUP_CONSTANTS.PASSWORD.LABEL,
      icon: SIGNUP_CONSTANTS.PASSWORD.ICON,
      placeholder: SIGNUP_CONSTANTS.PASSWORD.PLACEHOLDER,
      required: true,
    };
  }
}
