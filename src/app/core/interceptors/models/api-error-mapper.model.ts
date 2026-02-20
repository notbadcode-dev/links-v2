import { ApiResponseMessageModel } from '@api/auth/models/api-response-message-model';

import { NotificationService } from '@libs/components';

export type TNotificationMethod = keyof Pick<
  NotificationService,
  'success' | 'warning' | 'info' | 'error'
>;

export interface IApiFailureResponse {
  success: false;
  data: null;
  messageList: ApiResponseMessageModel[];
  code?: string;
}
