import { CUSTOM_ICONS_CONSTANTS } from '@app/core/icons/icons.constants';

import { ELogoLetterFill, ELogoVariant } from './logo.enums';

export const LOGO_ICON_BY_VARIANT: Readonly<Record<ELogoVariant, string>> = {
  [ELogoVariant.BOOKMARK]: CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK,
  [ELogoVariant.BOOKMARK_ANIMATED]: CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_ANIMATED,
  [ELogoVariant.BOOKMARK_S]: CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_S,
  [ELogoVariant.BOOKMARK_S_MIN]: CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_S_MIN,
  [ELogoVariant.BOOKMARK_ANIMATED_S]: CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_ANIMATED_S,
  [ELogoVariant.BOOKMARK_OUTLINE]: CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_OUTLINE,
  [ELogoVariant.BOOKMARK_OUTLINE_S]: CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_OUTLINE_S,
  [ELogoVariant.BOOKMARK_OUTLINE_ANIMATED]: CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_OUTLINE_ANIMATED,
  [ELogoVariant.BOOKMARK_OUTLINE_ANIMATED_S]:
    CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_OUTLINE_ANIMATED_S,
} as const satisfies Readonly<Record<ELogoVariant, string>>;

export const LOGO_SHOWCASE_VARIANTS: readonly ELogoVariant[] = [
  ELogoVariant.BOOKMARK,
  ELogoVariant.BOOKMARK_ANIMATED,
  ELogoVariant.BOOKMARK_S,
  ELogoVariant.BOOKMARK_ANIMATED_S,
  ELogoVariant.BOOKMARK_OUTLINE,
  ELogoVariant.BOOKMARK_OUTLINE_S,
  ELogoVariant.BOOKMARK_OUTLINE_ANIMATED,
  ELogoVariant.BOOKMARK_OUTLINE_ANIMATED_S,
] as const;

export const LOGO_COLORS = {
  TRANSPARENT: 'transparent',
  WHITE: 'white',
} as const;

export const LOGO_LETTER_FILL_COLOR_BY_VALUE: Readonly<Record<ELogoLetterFill, string>> = {
  [ELogoLetterFill.TRANSPARENT]: LOGO_COLORS.TRANSPARENT,
  [ELogoLetterFill.WHITE]: LOGO_COLORS.WHITE,
} as const;

export const LOGO_SIZES = {
  SM: '18px',
  MD: 'var(--ui-size-icon-lg)',
  XL_MULTIPLIER: 1.375,
  XL: 'calc(var(--ui-size-icon-lg) * 1.375)',
} as const;
