import { TestBed } from '@angular/core/testing';

import { ESpacing } from '@libs/enums';

import { LogoComponent } from './logo.component';
import { LOGO_COLORS, LOGO_ICON_BY_VARIANT, LOGO_SIZES } from './logo.constants';
import { ELogoLetterFill, ELogoVariant } from './logo.enums';

describe('LogoComponent', () => {
  const createComponent = (): LogoComponent =>
    TestBed.runInInjectionContext(() => new LogoComponent());

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('uses bookmark animated variant and medium size by default', () => {
    const component = createComponent() as unknown as Record<string, () => string>;
    const iconName = component['_iconName'] as () => string;
    const bookmarkLetterColor = component['_bookmarkLetterColor'] as () => string;
    const logoSize = component['_logoSize'] as () => string;

    expect(iconName()).toBe(LOGO_ICON_BY_VARIANT[ELogoVariant.BOOKMARK_ANIMATED]);
    expect(bookmarkLetterColor()).toBe(LOGO_COLORS.TRANSPARENT);
    expect(logoSize()).toBe(LOGO_SIZES.MD);
  });

  it('maps letter fill and spacing to expected token values', () => {
    const component = createComponent() as unknown as Record<string, () => string>;
    const bookmarkLetterColor = component['_bookmarkLetterColor'] as () => string;
    const logoSize = component['_logoSize'] as () => string;

    component['letterFill'] = () => ELogoLetterFill.WHITE;
    component['size'] = () => ESpacing.SM;

    expect(bookmarkLetterColor()).toBe(LOGO_COLORS.WHITE);
    expect(logoSize()).toBe(LOGO_SIZES.SM);
  });

  it('maps extra large size to expected token value', () => {
    const component = createComponent() as unknown as Record<string, () => string>;
    const logoSize = component['_logoSize'] as () => string;

    component['size'] = () => ESpacing.XL;

    expect(String(logoSize())).toBe(LOGO_SIZES.XL);
  });

  it('maps none and large sizes to their expected tokens', () => {
    const componentNone = createComponent() as unknown as Record<string, () => string>;
    const logoSizeNone = componentNone['_logoSize'] as () => string;

    componentNone['size'] = () => ESpacing.NONE;
    expect(String(logoSizeNone())).toBe(LOGO_SIZES.SM);

    const componentLarge = createComponent() as unknown as Record<string, () => string>;
    const logoSizeLarge = componentLarge['_logoSize'] as () => string;
    componentLarge['size'] = () => ESpacing.LG;
    expect(String(logoSizeLarge())).toBe(LOGO_SIZES.XL);
  });
});
