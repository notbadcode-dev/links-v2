import { ENotificationType } from './notification.enum';

const NOTIFICATION_ICON_KEYS = {
  SUCCESS: 'check_circle',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export const NOTIFICATION_CONSTANTS = {
  DEFAULT_DURATION: 5000,
  MAX_VISIBLE: 5,
  IMMEDIATE_DURATION: 0,
  ICONS: {
    [ENotificationType.SUCCESS]: NOTIFICATION_ICON_KEYS.SUCCESS,
    [ENotificationType.ERROR]: NOTIFICATION_ICON_KEYS.ERROR,
    [ENotificationType.WARNING]: NOTIFICATION_ICON_KEYS.WARNING,
    [ENotificationType.INFO]: NOTIFICATION_ICON_KEYS.INFO,
  },
} as const;
