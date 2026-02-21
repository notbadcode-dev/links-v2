import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  Signal,
  computed,
  input,
} from '@angular/core';

import { ESpacing } from '@libs/enums';
import { IconWrapperComponent } from '@libs/wrappers';

import { ELogoVariant, LOGO_COLORS, LOGO_ICON_BY_VARIANT, LOGO_SIZES } from './logo.constants';

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
  public readonly size: InputSignal<ESpacing> = input<ESpacing>(ESpacing.MD);

  protected readonly _iconName: Signal<string> = computed(
    () => LOGO_ICON_BY_VARIANT[this.variant()],
  );
  protected readonly _bookmarkLetterColor: Signal<string> = computed(() => {
    switch (this.variant()) {
      case ELogoVariant.BOOKMARK_OUTLINE_S:
      case ELogoVariant.BOOKMARK_OUTLINE_ANIMATED_S:
        return LOGO_COLORS.PRIMARY;
      default:
        return LOGO_COLORS.SURFACE;
    }
  });
  protected readonly _logoSize: Signal<string> = computed(() => {
    switch (this.size()) {
      case ESpacing.SM:
        return LOGO_SIZES.SM;
      case ESpacing.XL:
        return `calc(${LOGO_SIZES.MD} * ${LOGO_SIZES.XL_MULTIPLIER})`;
      case ESpacing.MD:
      default:
        return LOGO_SIZES.MD;
    }
  });
}
