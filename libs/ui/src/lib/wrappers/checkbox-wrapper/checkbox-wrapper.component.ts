import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { InputWrapperDirective } from '../input-wrapper/input-wrapper.directive';

@Component({
  selector: 'checkbox-wrapper',
  templateUrl: './checkbox-wrapper.component.html',
  styleUrl: './checkbox-wrapper.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MatCheckboxModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @angular-eslint/no-forward-ref
      useExisting: forwardRef(() => CheckboxWrapperComponent),
      multi: true,
    },
  ],
})
export class CheckboxWrapperComponent extends InputWrapperDirective<boolean> {}
