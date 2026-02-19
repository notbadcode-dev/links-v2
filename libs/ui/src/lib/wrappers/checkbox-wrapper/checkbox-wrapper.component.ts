import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

import { InputWrapperDirective } from '../input-wrapper/input-wrapper.directive';

@Component({
  selector: 'checkbox-wrapper',
  templateUrl: './checkbox-wrapper.component.html',
  styleUrl: './checkbox-wrapper.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MatCheckboxModule, MatTooltipModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,

      useExisting: forwardRef(() => CheckboxWrapperComponent),
      multi: true,
    },
  ],
})
export class CheckboxWrapperComponent extends InputWrapperDirective<boolean> {}
