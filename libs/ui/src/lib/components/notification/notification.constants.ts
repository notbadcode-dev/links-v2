import { ENotificationType } from './notification.enums';

const NOTIFICATION_ICON_KEYS = {
  SUCCESS: 'notification-success',
  ERROR: 'notification-error',
  WARNING: 'notification-warning',
  INFO: 'notification-info',
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
