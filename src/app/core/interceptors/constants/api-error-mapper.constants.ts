import { EApiResponseMessageType } from '@api/auth/models/e-api-response-message-type';

import { TNotificationMethod } from '../models/api-error-mapper.model';

export const NOTIFICATION_TYPE_MAP: Record<EApiResponseMessageType, TNotificationMethod> = {
  success: 'success',
  warning: 'warning',
  info: 'info',
  error: 'error',
  critical: 'error',
};

export const API_ERROR_MAPPER_CONSTANTS = {
  DEFAULT_ERROR_MESSAGE: 'Unexpected error',
} as const;
