import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { InputWrapperDirective } from '../input-wrapper.directive';
import { EInputTextWrapperType } from './input-text-wrapper.enum';

import { IInputTextWrapperConfig } from '../input-wrapper.types';

@Component({
  selector: 'input-text-wrapper',
  templateUrl: './input-text-wrapper.component.html',
  styleUrl: './input-text-wrapper.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,

      useExisting: forwardRef(() => InputTextWrapperComponent),
      multi: true,
    },
  ],
})
export class InputTextWrapperComponent extends InputWrapperDirective<
  string,
  IInputTextWrapperConfig
> {
  public readonly type: InputSignal<EInputTextWrapperType | undefined> = input<
    EInputTextWrapperType | undefined
  >(undefined);

  public readonly effectiveType: Signal<EInputTextWrapperType> = computed(
    () => this.type() ?? this.config()?.type ?? EInputTextWrapperType.TEXT,
  );
}
