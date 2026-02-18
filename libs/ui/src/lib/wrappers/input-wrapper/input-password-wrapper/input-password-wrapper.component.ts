import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { EInputTextWrapperType } from '../input-text-wrapper/input-text-wrapper.enum';
import { InputWrapperDirective } from '../input-wrapper.directive';
import { IInputTextWrapperConfig } from '../input-wrapper.types';

const PASSWORD_ICONS = {
  VISIBILITY: 'visibility',
  VISIBILITY_OFF: 'visibility_off',
} as const;

@Component({
  selector: 'input-password-wrapper',
  templateUrl: './input-password-wrapper.component.html',
  styleUrl: './input-password-wrapper.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,

      useExisting: forwardRef(() => InputPasswordWrapperComponent),
      multi: true,
    },
  ],
})
export class InputPasswordWrapperComponent extends InputWrapperDirective<
  string,
  IInputTextWrapperConfig
> {
  public readonly passwordIcons: typeof PASSWORD_ICONS = PASSWORD_ICONS;
  public readonly hidePassword: WritableSignal<boolean> = signal(true);
  public readonly effectiveType: Signal<EInputTextWrapperType> = computed(() => {
    return this.hidePassword() ? EInputTextWrapperType.PASSWORD : EInputTextWrapperType.TEXT;
  });

  public togglePasswordVisibility(): void {
    this.hidePassword.update((v) => !v);
  }
}
