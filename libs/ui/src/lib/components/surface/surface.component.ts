import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

import { ESpacing, ESurfaceVariant } from '../../enums/ui.enums';
import { SURFACE_CONSTANTS } from './surface.constants';

@Component({
  selector: 'ui-surface',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './surface.component.html',
  styleUrl: './surface.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': `"${SURFACE_CONSTANTS.CSS_CLASS_BASE} ${SURFACE_CONSTANTS.CSS_CLASS_VARIANT_PREFIX}" + variant() + " ${SURFACE_CONSTANTS.CSS_CLASS_PADDING_PREFIX}" + padding()`,
  },
})
export class SurfaceComponent {
  public readonly variant: InputSignal<ESurfaceVariant> = input<ESurfaceVariant>(
    ESurfaceVariant.CARD,
  );
  public readonly padding: InputSignal<ESpacing> = input<ESpacing>(ESpacing.MD);
}
