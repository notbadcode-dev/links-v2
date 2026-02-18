import { ENotificationType } from './notification.enum';

export const NOTIFICATION_CONSTANTS = {
  DEFAULT_DURATION: 5000,
  MAX_VISIBLE: 5,
  IMMEDIATE_DURATION: 0,
  ICONS: {
    [ENotificationType.SUCCESS]: 'check_circle',
    [ENotificationType.ERROR]: 'error',
    [ENotificationType.WARNING]: 'warning',
    [ENotificationType.INFO]: 'info',
  },
} as const;
