import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { EAlign, ESpacing } from '../../enums/ui.enums';
import { STACK_CONSTANTS } from './stack.constants';

@Component({
  selector: 'ui-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': `"${STACK_CONSTANTS.CSS_CLASS_BASE} ${STACK_CONSTANTS.CSS_CLASS_ALIGN_PREFIX}" + align() + " ${STACK_CONSTANTS.CSS_CLASS_GAP_PREFIX}" + gap()`,
  },
})
export class StackComponent {
  public readonly align: InputSignal<EAlign> = input<EAlign>(EAlign.STRETCH);
  public readonly gap: InputSignal<ESpacing> = input<ESpacing>(ESpacing.MD);
}
