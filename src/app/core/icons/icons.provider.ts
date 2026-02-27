import { APP_INITIALIZER, Provider } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { CUSTOM_ICONS_CONSTANTS } from './icons.constants';

const ICONS_PATHS = {
  APP: {
    LOGO: 'assets/icons/brand/bookmark_animated.svg',
    BOOKMARK: 'assets/icons/brand/bookmark.svg',
    BOOKMARK_ANIMATED: 'assets/icons/brand/bookmark_animated.svg',
    BOOKMARK_S: 'assets/icons/brand/bookmark_S.svg',
    BOOKMARK_S_MIN: 'assets/icons/brand/bookmark_S.min.svg',
    BOOKMARK_ANIMATED_S: 'assets/icons/brand/bookmark_animated_S.svg',
    BOOKMARK_OUTLINE: 'assets/icons/brand/bookmark_outline.svg',
    BOOKMARK_OUTLINE_S: 'assets/icons/brand/bookmark_outline_S.svg',
    BOOKMARK_OUTLINE_ANIMATED: 'assets/icons/brand/bookmark_outline_animated.svg',
    BOOKMARK_OUTLINE_ANIMATED_S: 'assets/icons/brand/bookmark_outline_animated_S.svg',
  },
  AUTH: {
    LOGIN_BUTTON: 'assets/icons/auth/login-enter-animated.svg',
    LOGOUT_BUTTON: 'assets/icons/auth/logout-exit-animated.svg',
    USER_SIDEBAR: 'assets/icons/auth/login-user-animated.svg',
    EMAIL_INPUT: 'assets/icons/auth/input-email-animated.svg',
    PASSWORD_INPUT: 'assets/icons/auth/input-password-animated.svg',
    VISIBILITY_ON: 'assets/icons/auth/visibility-on-animated.svg',
    VISIBILITY_OFF: 'assets/icons/auth/visibility-off-animated.svg',
  },
  THEME: {
    TOGGLE: 'assets/icons/theme/theme-toggle-animated.svg',
  },
  NOTIFICATION: {
    SUCCESS: 'assets/icons/notification/check.svg',
    ERROR: 'assets/icons/notification/error.svg',
    WARNING: 'assets/icons/notification/warning.svg',
    INFO: 'assets/icons/notification/info.svg',
  },
  MATERIAL: {
    CLOSE: 'assets/icons/material/close.svg',
    DELETE: 'assets/icons/material/delete_animated.svg',
    CHECK_CIRCLE: 'assets/icons/material/check_circle.svg',
    ERROR: 'assets/icons/material/error.svg',
    WARNING: 'assets/icons/material/warning.svg',
    INFO: 'assets/icons/material/info.svg',
    EXPAND_MORE: 'assets/icons/material/expand_more.svg',
    CHEVRON_RIGHT: 'assets/icons/material/chevron_right.svg',
    CODE: 'assets/icons/material/code.svg',
    PERSON: 'assets/icons/material/person.svg',
    SETTINGS: 'assets/icons/material/settings.svg',
    TRANSLATE: 'assets/icons/material/translate.svg',
    ECO: 'assets/icons/material/eco.svg',
    CONTRAST: 'assets/icons/material/contrast.svg',
    RESTAURANT: 'assets/icons/material/restaurant.svg',
    FLIGHT: 'assets/icons/material/flight.svg',
  },
} as const;

const registerCustomIcons = (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): void => {
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.AUTH.LOGIN_BUTTON,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.AUTH.LOGIN_BUTTON),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.AUTH.LOGOUT_BUTTON,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.AUTH.LOGOUT_BUTTON),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.AUTH.USER_SIDEBAR,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.AUTH.USER_SIDEBAR),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.AUTH.EMAIL_INPUT,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.AUTH.EMAIL_INPUT),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.AUTH.PASSWORD_INPUT,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.AUTH.PASSWORD_INPUT),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.AUTH.VISIBILITY_ON,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.AUTH.VISIBILITY_ON),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.AUTH.VISIBILITY_OFF,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.AUTH.VISIBILITY_OFF),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.THEME.TOGGLE,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.THEME.TOGGLE),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.NOTIFICATION.SUCCESS,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.NOTIFICATION.SUCCESS),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.NOTIFICATION.ERROR,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.NOTIFICATION.ERROR),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.NOTIFICATION.WARNING,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.NOTIFICATION.WARNING),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.NOTIFICATION.INFO,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.NOTIFICATION.INFO),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.APP.LOGO,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.APP.LOGO),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.APP.BOOKMARK),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_ANIMATED,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.APP.BOOKMARK_ANIMATED),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_S,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.APP.BOOKMARK_S),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_S_MIN,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.APP.BOOKMARK_S_MIN),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_ANIMATED_S,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.APP.BOOKMARK_ANIMATED_S),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_OUTLINE,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.APP.BOOKMARK_OUTLINE),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_OUTLINE_S,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.APP.BOOKMARK_OUTLINE_S),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_OUTLINE_ANIMATED,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.APP.BOOKMARK_OUTLINE_ANIMATED),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_OUTLINE_ANIMATED_S,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.APP.BOOKMARK_OUTLINE_ANIMATED_S),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.CLOSE,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.CLOSE),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.DELETE,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.DELETE),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.CHECK_CIRCLE,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.CHECK_CIRCLE),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.ERROR,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.ERROR),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.WARNING,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.WARNING),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.INFO,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.INFO),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.EXPAND_MORE,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.EXPAND_MORE),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.CHEVRON_RIGHT,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.CHEVRON_RIGHT),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.CODE,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.CODE),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.PERSON,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.PERSON),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.SETTINGS,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.SETTINGS),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.TRANSLATE,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.TRANSLATE),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.ECO,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.ECO),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.CONTRAST,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.CONTRAST),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.RESTAURANT,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.RESTAURANT),
  );
  iconRegistry.addSvgIcon(
    CUSTOM_ICONS_CONSTANTS.MATERIAL.FLIGHT,
    sanitizer.bypassSecurityTrustResourceUrl(ICONS_PATHS.MATERIAL.FLIGHT),
  );
};

const initializeIcons = (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => (): void => {
  registerCustomIcons(iconRegistry, sanitizer);
};

export const provideCustomIcons = (): Provider => ({
  provide: APP_INITIALIZER,
  multi: true,
  deps: [MatIconRegistry, DomSanitizer],
  useFactory: initializeIcons,
});
