import { APP_INITIALIZER, Provider } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { CUSTOM_ICONS_CONSTANTS } from './icons.constants';

const ICONS_PATHS = {
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
