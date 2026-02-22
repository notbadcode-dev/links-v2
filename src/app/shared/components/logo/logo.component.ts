import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  Signal,
  computed,
  input,
} from '@angular/core';

import { ESpacing } from '@libs/enums';
import { IconWrapperComponent } from '@libs/wrappers/icon-wrapper/icon-wrapper.component';

import {
  LOGO_ICON_BY_VARIANT,
  LOGO_LETTER_FILL_COLOR_BY_VALUE,
  LOGO_SIZES,
} from './logo.constants';
import { ELogoLetterFill, ELogoVariant } from './logo.enums';

@Component({
  selector: 'logo-component',
  standalone: true,
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  imports: [IconWrapperComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--logo-size]': '_logoSize()',
    '[style.--bookmark-letter-color]': '_bookmarkLetterColor()',
  },
})
export class LogoComponent {
  public readonly variant: InputSignal<ELogoVariant> = input<ELogoVariant>(
    ELogoVariant.BOOKMARK_ANIMATED,
  );
  public readonly letterFill: InputSignal<ELogoLetterFill> = input<ELogoLetterFill>(
    ELogoLetterFill.TRANSPARENT,
  );
  public readonly size: InputSignal<ESpacing> = input<ESpacing>(ESpacing.MD);

  protected readonly _iconName: Signal<string> = computed(
    () => LOGO_ICON_BY_VARIANT[this.variant()],
  );
  protected readonly _bookmarkLetterColor: Signal<string> = computed(
    () => LOGO_LETTER_FILL_COLOR_BY_VALUE[this.letterFill()],
  );
  protected readonly _logoSize: Signal<string> = computed(() => {
    switch (this.size()) {
      case ESpacing.NONE:
      case ESpacing.SM:
        return LOGO_SIZES.SM;
      case ESpacing.LG:
      case ESpacing.XL:
        return LOGO_SIZES.XL;
      case ESpacing.MD:
        return LOGO_SIZES.MD;
    }
  });
}
