import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

import { EAlign } from '../../enums/ui.enums';
import { FORM_ROW_CONSTANTS } from './form-row.constants';

@Component({
  selector: 'ui-form-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-row.component.html',
  styleUrl: './form-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': `"${FORM_ROW_CONSTANTS.CSS_CLASS_PREFIX}" + align()`,
  },
})
export class FormRowComponent {
  public readonly align: InputSignal<EAlign> = input<EAlign>(EAlign.START);
}
